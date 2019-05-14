import request from 'framework/network/request';
import * as Type from './types'
export default {
  // 通过id获取商品信息
  getGoodInfoById(store, {
    id
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.get(`/admin/api/goods/getGoodInfoById/${id}`, store).then(res => {
      commit(Type.SET_GOODINFO, res)
    }).catch(e => {
      console.log(e)
    })
  },
  // 获取商品信息，ID，每页数，当前页
  getGoodInfo(store, {
    id,
    pageSize,
    currentSize
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.get(`/admin/api/goods/getGoodInfo/${id}/${pageSize}/${currentSize}`, store).then(res => {
      commit(Type.SET_TOTAL, res.total)
      commit(Type.SET_GOODS_INPUT_LIST, res.date)
    }).catch(e => {
      console.log(e)
    })
  }
}