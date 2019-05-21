'use strict';
const egg = require('egg');
module.exports = class GoodsController extends egg.Controller {
    // 销售商品
    async sell(ctx) {
        const sellList = this.ctx.request.body
        const result = await ctx.service.sell(sellList)
        this.ctx.body = result
    }
};