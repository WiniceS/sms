'use strict';
import * as types from './mutation-type';

const mutations = {
  [types.SET_ARTICLE_LIST](state, {
    list,
    total
  }) {
    state.articleTotal = total;
    state.articleList = list;
  },
  [types.SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [types.SET_SAVE_ARTICLE](state, data) {
    state.articleTotal += 1;
    state.articleList = [data].concat(state.articleList);
  },
  [types.DELETE_ARTICLE](state, {
    id
  }) {
    state.articleTotal -= 1;
    state.articleList = state.articleList.filter(item => {
      return item.id !== id;
    });
  },
  [types.SET_WINHEIGHT](state, height) {
    state.winHeight = height;
  },
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};
export default mutations;