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
    return request.get(`/admin/api/goods/getGoodInfoById/${id}`, store)
  },
  // 获取商品信息，ID，每页数，当前页
  getGoodInfo(store, {
    id
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.get(`/admin/api/goods/getGoodInfo/${id}/${state.pageSize}/${state.currentSize}`, store).then(res => {
      commit(Type.SET_TOTAL, res.total)
      commit(Type.SET_GOODS_INPUT_LIST, res.date)
    }).catch(e => {
      console.log(e)
    })
  },
  // 根据商品的id删除商品
  delGoodById(store, {
    id
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.post('/admin/api/goods/delGoodById', {
      id
    }, store).then(res => {
      this.$message({
        message: '删除成功',
        type: 'success'
      });
      dispatch('getGoodInfo', {
        id
      })
    })
  },
  // 根据ID更新商品信息
  updateGoodById(store, goodInfo) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.post('/admin/api/goods/updateGoodById', goodInfo, store)
  },
  // 添加商品信息
  addGood(store, goodInfo) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.post('/admin/api/goods/addGood', goodInfo, store)
  }
}