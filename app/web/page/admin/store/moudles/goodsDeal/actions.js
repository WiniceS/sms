import * as types from './types'
export default {
  onSale({
    state,
    commit
  }, sale) {
    const tmp = {
      goodsId: '0000000000000',
      goodsName: '优惠金额',
      goodsSpecification: '',
      goodsSell: sale,
      goodsSellNumber: 1
    }
    commit('types.ADD_DEAL_LIST', tmp)
  }
}