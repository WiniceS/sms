<template>
  <router-view></router-view>
</template>
<script type="text/babel">
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as types from './store/mutation-type.js'

Vue.use(ElementUI);

export default {
  computed: {},
  mounted () {
    this.$store.commit(types.SET_WINHEIGHT, window.innerHeight)
    window.onresize = () => {
      this.$store.commit(types.SET_WINHEIGHT, window.innerHeight)
    }
  },
};
</script>