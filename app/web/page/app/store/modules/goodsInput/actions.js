export default {
  getGoodsDeal() {
    return goodsDealService.getGoodsDeal()
  },
  del() {
    console.log(goodsDealService)
    return Promise.resolve('lalala')
  }
}