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
  [types.PLUS_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList.map(e => {
      if (e.goodsId === id) {
        e.goodsSellNumber++
      }
      return e
    })
  },
  [types.MINUS_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList.map(e => {
      if (e.goodsId === id) {
        e.goodsSellNumber--
      }
      return e
    }).filter(f => f.goodsSellNumber > 0)
  },
  [types.CLEAR_DEAL_LIST](state) {
    state.goodsDealList = []
  }
}

export default mutations