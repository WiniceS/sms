import request from 'framework/network/request';
import * as Type from './types'
export default {
  getGoodInfo(store, {
    id
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.get(`/admin/api/goods/getGoodsInfo/${id}`, store).then(res => {
      commit(Type.SET_GOODINFO, res)
    }).catch(e => {
      console.log(e)
    })
  }
}