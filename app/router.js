'use strict';
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.admin.home);
  router.get('/admin(/.+)?', controller.admin.home);
  // 登录模块的路由
  router.get('/login', controller.admin.home);
  router.post('/login/api/login', controller.login.login);
  // 商品模块的路由
  router.get('/goods/api/goods/getGoodInfoById/:id', controller.goods.getGoodInfoById);
  router.get('/goods/api/goods/getGoodInfo', controller.goods.getGoodInfo);
  router.post('/goods/api/goods/delGoodById', controller.goods.delGoodById);
  router.post('/goods/api/goods/updateGoodById', controller.goods.updateGoodById);
  router.post('/goods/api/goods/addGood', controller.goods.addGood);
  router.post('/goods/api/goods/getGoodInventory', controller.goods.getGoodInventory);
  // 销售模块的路由
  router.post('/sell/api/sell', controller.sell.sell);
  router.post('/sell/api/getSellRecord', controller.sell.getSellRecord);
};
