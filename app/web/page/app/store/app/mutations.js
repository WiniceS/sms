'use strict';
import * as types from './mutation-type'
const mutations = {
  [types.SET_WIN_HEIGHT](state, height) {
    state.winHeight = height;
  },
};
export default mutations;