import request from '@/utils/request';

class Api {

  remove(url, params) {
    return request({
      url: url,
      method: 'delete',
      params: params,
    });
  }

  fetch(url, params) {
    let queryString = [];
    Object.keys(params).forEach(key => params[key] != undefined && queryString.push(`${key}=${params[key]}`));
    if (queryString.length > 0) {
      queryString = queryString.join('&');
      url += `?${queryString}`;
    }
    return request({
      url: url,
      method: 'get',
    });
  }

  save(url, data) {
    return request({
      url: url,
      method: 'post',
      data,
    });
  }

  update(url, data) {
    return request({
      url: url,
      method: 'put',
      data,
    });
  }
}

export default Api;
