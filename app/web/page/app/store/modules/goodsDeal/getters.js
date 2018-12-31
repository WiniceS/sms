export default {
  computedDealList(state) {
    return state.goodsDealList.map(e => {
      e.subtotal = e.goodsSellNumber * e.goodsSell
      return e
    })
  }
}