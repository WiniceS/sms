'use strict';
const egg = require('egg');
module.exports = class GoodsController extends egg.Controller {
  // 根据id获取商品信息
  async getGoodInfoById(ctx) {
    const {
      id
    } = ctx.params;
    this.ctx.body = await ctx.service.goods.getGoodById(id)
  }
  // 获取商品信息，分页
  async getGoodInfo(ctx) {
    const {
      id,
      pageSize,
      currentSize
    } = ctx.params;
    this.ctx.body = await ctx.service.goods.getGood(id, pageSize, currentSize)
  }
  // 删除商品
  async delGoodById(ctx) {
    const id = this.ctx.request.body.id
    const result = await ctx.service.goods.delGood(id)
    this.ctx.body = result
  }
  // 更新商品
  async updateGoodById(ctx) {
    const goodInfo = this.ctx.request.body
    const result = await ctx.service.goods.updateGood(goodInfo)
    this.ctx.body = result
  }
  // 添加商品
  async addGood(ctx) {
    const goodInfo = this.ctx.request.body
    const result = await ctx.service.goods.addGood(goodInfo)
    this.ctx.body = result
  }
};