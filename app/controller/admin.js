'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    await ctx.renderClient('admin.js', {
      ctx,
      url
    });
  }
}; 