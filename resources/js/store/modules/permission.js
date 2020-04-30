import {asyncRoutes, constantRoutes} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param permissions
 * @param route
 */
function hasPermission(permissions, route) {
  return permissions.some(p => route.path + route.name === p.path + p.name);
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param permissions,
 * @param childMap
 */
export function filterAsyncRoutes(routes, permissions, childMap) {
  return routes.filter(r => {
    if (hasPermission(permissions, r)) {
      if (r.children && r.children.length) {
        r.children = filterAsyncRoutes(r.children, childMap[r.path + r.name]);
      }
      return true
    }
    return false
  });
}

const state = {
  routes: [],
  addRoutes: [],
  routePaths: [],
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    var routePaths = [];
    for (const r of state.routes) {
      routePaths.push(r.path);
      if (r.children && r.children.length > 0) {
        for (const c of r.children) {
          if (r.path === '' || r.path === '/') {
            if (c.path.indexOf('/') === 0) {
              routePaths.push(c.path);
              routePaths.push('/redirect' + c.path)
            } else {
              routePaths.push('/' + c.path);
              routePaths.push('/redirect' + c.path);
            }
          } else {
            routePaths.push(r.path + '/' + c.path);
            routePaths.push('/redirect' + r.path + '/' + c.path)
          }
        }
      }
    }
    routePaths.push('/404')
    routePaths.push('/401')
    routePaths.push('/')
    routePaths.push('/dashboard')
    routePaths.push('/redirect/dashboard')
    console.log(routes);
    state.routePaths = routePaths;
  }
}

const actions = {
  generateRoutes({commit}, {roles, permissions}) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        const childMap = {};
        for (const p of permissions) {
          childMap[p.path + p.name] = p.children;
        }
        console.log(childMap);
        accessedRoutes = filterAsyncRoutes(asyncRoutes, permissions, childMap)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
