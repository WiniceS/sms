'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import goodsDeal from './moudles/goodsDeal'
import goodsInput from './moudles/goodsInput'

Vue.use(Vuex);

export default function createStore(initState) {
  const state = {
    articleTotal: 0,
    articleList: [],
    article: {},
    ...initState
  };
  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
      goodsDeal,
      goodsInput
    },
  });
}