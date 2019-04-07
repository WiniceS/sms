'use strict';

import * as Type from './mutation-type';
import Vue from 'vue';
import Vuex from 'vuex';
import request from 'framework/network/request';

Vue.use(Vuex);

const actions = {

  SET_ARTICLE_LIST: (store, json) => {
    return request.post('/admin/api/article/list', json, store).then(response => {
      store.commit(Type.SET_ARTICLE_LIST, response.data);
    });
  },
  SET_ARTICLE_DETAIL: (store, {
    id
  }) => {
    const {
      commit,
      dispatch,
      state
    } = store;
    return request.get(`/admin/api/article/${id}`)
      .then(response => {
        commit(Type.SET_ARTICLE_DETAIL, response.data);
      });
  },
  SET_SAVE_ARTICLE: (store, json) => {
    const {
      commit,
      dispatch,
      state
    } = store;
    return request.post('/admin/api/article/add', json, store).then(response => {
      commit(Type.SET_SAVE_ARTICLE, json);
    });
  },
  DELETE_ARTICLE: (store, {
    id
  }) => {
    // 鉴权 TODO
    const {
      commit,
      dispatch,
      state
    } = store;
    return request.get(`/admin/api/article/del/${id}`, store)
      .then(response => {
        commit(Type.DELETE_ARTICLE, {
          id
        });
      });
  },
  verifyUser(store, {
    username,
    password
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    const userInfo = {
      username,
      password
    }
    return request.post('/login/api/login', userInfo, store).then(res => {
      commit(Type.SET_USERINFO, res)
    })
  }
};

export default actions;