'use strict';
const egg = require('egg');
module.exports = class LoginService extends egg.Service {
  async verifyUser(userInfo) {
    const username = userInfo.username
    const password = userInfo.password
    const user = await this.app.mysql.get('tb_user', {
      userName: username,
      password: password
    })
    return {
      user
    }
  }
};