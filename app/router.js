'use strict';
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/', controller.admin.home);
  router.post('/admin/api/article/list', controller.admin.list);
  router.post('/admin/api/article/add', controller.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.del);
  router.get('/admin/api/article/:id', controller.admin.detail);
  router.get('/admin(/.+)?', controller.admin.home);
};

// 登录模块的路由
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/login', controller.admin.home);
  router.post('/login/api/login', controller.login.login);
};

// 商品模块的路由
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.get('/admin/api/goods/getGoodInfoById/:id', controller.goods.getGoodInfoById);
  router.get('/admin/api/goods/getGoodInfo/:id/:pageSize/:currentSize', controller.goods.getGoodInfo);
  router.post('/admin/api/goods/delGoodById', controller.goods.delGoodById);
  router.post('/admin/api/goods/updateGoodById', controller.goods.updateGoodById);
  router.post('/admin/api/goods/addGood', controller.goods.addGood);
};


// 销售模块的路由
module.exports = app => {
  const {
    router,
    controller
  } = app;
  router.post('/admin/api/sell/sell', controller.sell.sell);
};