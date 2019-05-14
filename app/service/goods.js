'use strict';
const egg = require('egg');
module.exports = class LoginService extends egg.Service {
  // 通过商品ID获取商品信息
  async getGoodById(goodId) {
    const id = goodId
    const goodInfo = await this.app.mysql.select('tb_goods', {
      where: {
        good_id: id,
        logout_flag: '0'
      },
      columns: ['good_id', 'good_name', 'good_specification', 'good_unit', 'good_variety', 'good_sell', 'good_cost']
    })
    const goodNumber = await this.app.mysql.select('tb_inventory', {
      where: {
        good_id: id,
        logout_flag: '0'
      },
      columns: ['good_number']
    })
    let good = {}
    if (goodInfo.length > 0) {
      good = goodInfo[0]
      if (goodNumber.length > 0) {
        Object.assign(good, goodNumber[0])
      }
    }

    return {
      good
    }
  }
  
  // 获取商品信息，包含分页
  async getGoodById(goodId, pageSize, currentSize) {
    const id = goodId
    const goodInfo = await this.app.mysql.select('tb_goods', {
      where: {
        good_id: id,
        logout_flag: '0'
      },
      columns: ['good_id', 'good_name', 'good_specification', 'good_unit', 'good_variety', 'good_sell', 'good_cost']
    })
    const goodNumber = await this.app.mysql.select('tb_inventory', {
      where: {
        good_id: id,
        logout_flag: '0'
      },
      columns: ['good_number']
    })
    let good = {}
    if (goodInfo.length > 0) {
      good = goodInfo[0]
      if (goodNumber.length > 0) {
        Object.assign(good, goodNumber[0])
      }
    }

    return {
      good
    }
  }
  // 添加商品
  async addGood(good) {
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.insert('tb_good', {
        good_id: good.goodId,
        good_name: good.goodName,
        good_specification: good.goodSpecification,
        good_unit: good.goodUnit,
        good_variety: good.goodVariety,
        good_sell: good.goodSell,
        good_cost: good.goodCost,
        create_time: this.app.mysql.literals.now
      })
      await conn.insert('tb_inventory', {
        good_id: good.goodId,
        good_number: good.goodNumber,
        update_time: this.app.mysql.literals.now
      })
      return {
        success: true
      }
    }, ctx)
    return {
      result
    }
  }
  // 更新商品
  async updateGood(good) {
    const row1 = {
      good_name: good.goodName,
      good_specification: good.goodSpecification,
      good_unit: good.goodUnit,
      good_variety: good.goodVariety,
      good_sell: good.goodSell,
      good_cost: good.goodCost,
      update_time: this.app.mysql.literals.now
    }
    const row2 = {
      good_number: good.goodNumber,
      update_time: this.app.mysql.literals.now
    }
    const options = {
      where: {
        good_id: good.goodId
      }
    }
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.update('tb_good', row1, options)
      await conn.update('tbtb_inventory', row2, options)
      return {
        success: true
      }
    }, ctx)
    return {
      result
    }
  }
  // 删除商品
  async delGood(goodId) {
    const row = {
      logout_flag: '1',
      logout_time: this.app.mysql.literals.now,
      update_time: this.app.mysql.literals.now
    }
    const options = {
      where: {
        good_id: good.goodId
      }
    }
    const result = await app.mysql.beginTransactionScope(async conn => {
      await conn.update('tb_good', row, options)
      await conn.update('tbtb_inventory', row, options)
      return {
        success: true
      }
    }, ctx)
    return {
      result
    }
  }
  // 获取所有商品
  async getAllGood() {
    return ''
  }
};