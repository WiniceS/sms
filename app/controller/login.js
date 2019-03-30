'use strict';
const egg = require('egg');
module.exports = class LoginController extends egg.Controller {
  async login() {
    const userInfo = this.ctx.request.body
    const result = await this.ctx.service.login.verifyUser(userInfo)
    this.ctx.body = result
  }
  async list(ctx) {
    this.ctx.body = await ctx.service.article.getArtilceList(ctx.request.body);
  }
};