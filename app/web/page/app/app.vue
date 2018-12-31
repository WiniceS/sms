<template>
  <app-layout>
    <router-view></router-view>
  </app-layout>
</template>
<script type='text/babel'>
import 'babel-polyfill';
import { sync } from 'vuex-router-sync';
import store from './store';
import router from './router';
import { mapMutations } from 'vuex';

sync(store, router);

export default {
  data () {
    return {
    };
  },
  router,
  store,
  computed: {

  },
  mounted () {
    window.addEventListener('resize', () => {
      this.setHeight(window.innerHeight);
    });
  },
  methods: {
    ...mapMutations({
      setHeight: 'SET_WIN_HEIGHT'
    })
  }
};
</script>
