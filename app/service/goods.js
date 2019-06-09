'use strict';
const egg = require('egg');
module.exports = class LoginService extends egg.Service {
  // 通过商品ID获取商品信息
  async getGoodById(goodId) {
    const id = goodId
    const goodInfo = await this.app.mysql.select('v_good_info', {
      where: {
        good_id: id,
        logout_flag: '0'
      },
      columns: ['good_id', 'good_name', 'good_specification', 'good_unit', 'good_variety', 'good_sell', 'good_cost', 'good_number', 'havfather', 'father_good_id', 'ratio']
    })
    return {
      goodInfo
    }
  }

  // 获取商品信息，包含分页
  async getGood(goodId, pageSize, currentSize) {
    const id = goodId
    let goodInfo = []
    if (id === "" || id === null) {
      goodInfo = await this.app.mysql.select('v_good_info', {
        where: {
          logout_flag: '0'
        },
        columns: ['good_id', 'good_name', 'good_specification', 'good_unit', 'good_variety', 'good_sell', 'good_cost', 'update_time', 'good_number'],
        orders: [
          ['update_time', 'desc']
        ], // 排序方式
        limit: pageSize, // 返回数据量
        offset: pageSize * (currentSize - 1) // 数据偏移量
      })
    } else {
      goodInfo = await this.app.mysql.select('v_good_info', {
        where: {
          good_id: id,
          logout_flag: '0'
        },
        columns: ['good_id', 'good_name', 'good_specification', 'good_unit', 'good_variety', 'good_sell', 'good_cost', 'update_time', 'good_number'],
        orders: [
          ['update_time', 'desc']
        ], // 排序方式
        limit: pageSize, // 返回数据量
        offset: pageSize * (currentSize - 1) // 数据偏移量
      })
    }

    return {
      goodInfo
    }
  }
  // 添加商品
  async addGood(good) {
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await conn.insert('tb_goods', {
        good_id: good.goodId,
        good_name: good.goodName,
        good_specification: good.goodSpecification,
        good_unit: good.goodUnit,
        good_variety: good.goodVariety,
        good_sell: good.goodSell,
        good_cost: good.goodCost,
        havfather: good.havfather,
        create_time: this.app.mysql.literals.now,
        update_time: this.app.mysql.literals.now
      })
      await conn.insert('tb_inventory', {
        good_id: good.goodId,
        good_number: good.goodNumber,
        update_time: this.app.mysql.literals.now
      })
      if (good.havfather === "1") {
        await conn.insert('tb_relevancy', {
          son_good_id: good.goodId,
          father_good_id: good.father_good_id,
          ratio: good.ratio,
          update_time: this.app.mysql.literals.now
        })
      }
      return {
        success: true
      }
    }, this.ctx)
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
      havfather: good.havfather,
      update_time: this.app.mysql.literals.now
    }
    const row2 = {
      good_number: good.goodNumber,
      update_time: this.app.mysql.literals.now
    }
    const row3 = {
      father_good_id: good.father_good_id,
      ratio: good.ratio,
      update_time: this.app.mysql.literals.now
    }
    const options = {
      where: {
        good_id: good.goodId
      }
    }
    const options2 = {
      where: {
        son_good_id: good.goodId
      }
    }
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await conn.update('tb_good', row1, options)
      await conn.update('tb_inventory', row2, options)
      if (good.havfather === "1") {
        await conn.update('tb_relevancy', row3, options2)
      }
      return {
        success: true
      }
    }, this.ctx)
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
    const result = await this.app.mysql.beginTransactionScope(async conn => {
      await conn.update('tb_good', row, options)
      await conn.update('tb_inventory', row, options)
      return {
        success: true
      }
    }, this.ctx)
    return {
      result
    }
  }
};