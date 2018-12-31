'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import state from './app/state';
import actions from './app/actions';
import getters from './app/getters';
import mutations from './app/mutations';

import app from './modules/app';
import user from './modules/user';
import goodsDeal from './modules/goodsDeal';
import goodsInput from './modules/goodsInput';

Vue.use(Vuex);

const modules = {
  app,
  user,
  goodsDeal,
  goodsInput
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules
});