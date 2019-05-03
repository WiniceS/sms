import * as types from './types'
const mutations = {
  [types.SET_DEAL_LIST](state, list) {
    state.goodsDealList = list
  },
  [types.ADD_DEAL_LIST](state, good) {
    state.goodsDealList.push(good)
  },
  [types.DEL_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList.filter(e => {
      return e.goodsId !== id
    })
  },
  [types.CLEAR_DEAL_LIST](state) {
    state.goodsDealList = []
  },
  [types.SET_GOODINFO](state, info) {
    state.goodInfo = info
  }
}

export default mutations