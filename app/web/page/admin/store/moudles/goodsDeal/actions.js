import * as types from './types'
import request from 'framework/network/request';
export default {
  onSale({
    state,
    commit
  }, sale) {
    const tmp = {
      goodsId: '0000000000000',
      goodsName: '优惠金额',
      goodsSpecification: '',
      goodsSell: -sale,
      goodsSellNumber: 1
    }
    const tmpList = state.goodsDealList.filter(f => f.goodsId !== '0000000000000').concat([tmp])
    commit(types.SET_DEAL_LIST, tmpList)
  },
  // 获取商品信息
  getGoodInfoById(store, id) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.get(`/admin/api/goods/getGoodInfoById/${id}`, store).then(res => {
      if (res > 0) {
        commit('ADD_DEAL_LIST', res[0])
      } else {
        this.$message({
          type: 'error',
          $message: '没有找到此商品，请前往商品入库页面添加'
        })
      }
    })
  },
  // 商品销售
  sell(store) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.post('/admin/api/sell/sell', store.goodsDealList, store).then(res => {
      commit('CLEAR_DEAL_LIST')
    })
  }
}