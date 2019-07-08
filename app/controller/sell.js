'use strict';
const egg = require('egg');
module.exports = class SellController extends egg.Controller {
    // 销售商品
    async sell(ctx) {
        const sellList = this.ctx.request.body
        const result = await ctx.service.sell.sell(sellList)
        this.ctx.body = result
    }
    // 获取销售记录
    async getSellRecord(ctx) {
        const condition = this.ctx.request.body
        const result = await ctx.service.sell.getSellRecord(condition)
        this.ctx.body = result
    }
};