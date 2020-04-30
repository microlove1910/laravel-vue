<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar"/>

    <breadcrumb class="breadcrumb-container"/>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item>
            <el-button type="text" @click="dialogPwdVisible = true">修改密码</el-button>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <el-dialog width="65%" title="修改密码" :visible.sync="dialogPwdVisible" :close-on-click-modal="false">
      <el-form ref="tempForm" :model="temp" :rules="formRules" label-width="100px">
        <el-form-item prop="oPwd" label="原密码">
          <el-input type="password" v-model="temp.oPwd"></el-input>
        </el-form-item>
        <el-form-item prop="nPwd" label="新密码">
          <el-input type="password" v-model="temp.nPwd"></el-input>
        </el-form-item>
        <el-form-item prop="cPwd" label="确认密码">
          <el-input type="password" v-model="temp.cPwd"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPwdVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    data() {
      return {
        temp: {},
        formRules: {
          oPwd: [{required: true, min: 6, trigger: 'blur', message: '请输入大于6位的原密码'}],
          nPwd: [{required: true, min: 6, trigger: 'blur', message: '请输入大于6位的新密码'}],
          cPwd: [{
            required: true, validator: (r, v, c) => {
              if (this.temp.nPwd != this.temp.cPwd) {
                c(new Error('两次密码不相同'));
              } else {
                c();
              }
            }
          }]
        },
        dialogPwdVisible: false,
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
      handleSave() {
        this.$refs.tempForm.validate(valid => {
          if (valid) {
            this.$api.update('/system/changePwd', this.temp).then(res => {
              if (res === 'ok') {
                this.$message.success('修改成功,请重新登录');
                this.dialogPwdVisible = false;
                this.$store.dispatch('user/logout');
              } else {
                this.$message.error(res);
              }
            });
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
