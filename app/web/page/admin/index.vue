<template>
  <AdminLayout>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </AdminLayout>
</template>
<script type="text/babel">
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AdminLayout from 'component/layout/admin/index.vue';
import * as types from './store/mutation-type.js'

Vue.use(ElementUI);

export default {
  components: {
    AdminLayout,
  },
  computed: {},
  mounted () {
    this.$store.commit(types.SET_WINHEIGHT, window.innerHeight)
    window.onresize = () => {
      this.$store.commit(types.SET_WINHEIGHT, window.innerHeight)
    }
  },
};
</script>