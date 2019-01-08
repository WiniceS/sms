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
      goodsSell: -sale,
      goodsSellNumber: 1
    }
    const tmpList = state.goodsDealList.filter(f => f.goodsId !== '0000000000000').concat([tmp])
    commit(types.SET_DEAL_LIST, tmpList)
  }
}