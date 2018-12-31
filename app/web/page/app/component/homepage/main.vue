<style lang="scss" scoped>
@import "./main.scss";
</style>
<template>
  <el-container class="system">
    <el-header class="system-header">
      <div class="system-header-title">
        <div
          class="system-header-title-text"
          :style="{width:isCollapse?'40px':'180px'}"
        >
          <div v-if="isCollapse">S</div>
          <div v-else>Supermarket</div>
        </div>
        <div class="system-header-title-button">
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            @click="isCollapse=!isCollapse"
          ></el-button>
        </div>
      </div>
      <div class="system-header-my">我的</div>
    </el-header>
    <el-container>
      <el-aside  :style="{width:isCollapse?'60px':'200px'}">
        <el-menu
          default-active="0"
          class=""
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
        >
          <el-menu-item v-for="(list,index) in menuList" :key="index" :index="index">
            <i :class="list.icon"></i>
            <span>{{list.name}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Cookies from 'js-cookie';
import util from 'framework/utils/utils.js';

export default {
  components: {
  },
  data () {
    return {
      isCollapse: true,
      menuList: [{
        icon: 'el-icon-edit',
        name: '商品结算',
        route: '/goodsDeal'
      },
      {
        icon: 'el-icon-edit',
        name: '商品入库',
        route: '/goodsInput'
      },
      {
        icon: 'el-icon-edit',
        name: '商品统计',
        route: '/goodsDeal'
      },
      {
        icon: 'el-icon-edit',
        name: '收支统计',
        route: '/goodsDeal'
      },
      {
        icon: 'el-icon-edit',
        name: '其他支出',
        route: '/goodsDeal'
      },
      {
        icon: 'el-icon-edit',
        name: '个人信息',
        route: '/goodsDeal'
      }],
      shrink: true,
      userName: '',
      isFullScreen: false
    };
  },
  computed: {
  },
  methods: {
    init () {
    
    },
    toggleClick () {
      this.shrink = !this.shrink;
    }
  },
  watch: {
    $route (to) {
      this.$store.commit('setCurrentPageName', to.name);
      const pathArr = util.setCurrentPath(this, to.name);
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name);
      }
      this.checkTag(to.name);
      localStorage.currentPageName = to.name;
    },
    lang () {
      util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    }
  },
  mounted () {
    this.init();
  },
  created () {
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList');
  }
};
</script>
