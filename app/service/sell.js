'use strict';
const egg = require('egg');
module.exports = class SellService extends egg.Service {
    // 添加销售记录
    async sell(sellList) {
        // 获取物料数量等于0的商品
        const zeroRecode = await this.app.mysql.select('v_good_info', {
            where: {
                good_number: 0
            },
            columns: ['good_id']
        })
        let fatherGoodList = []
        if (zeroRecode != null && zeroRecode.length > 0) {
            fatherGoodList = sellList.filter(f => {
                if (f.havfather == 1) {
                    return zeroRecode.some(s => s.good_id = f.father_good_id)
                } else {
                    return false
                }
            })
        }
        // 获取销售信息
        const sellRecode = sellList.map(e => {
            const tmp = {
                good_id: e.good_id,
                sell_num: e.good_sell_number,
                unit_price: e.good_sell,
                total_price: e.subtotal,
                sell_date: this.app.mysql.literals.now,
                discounts: e.discounts,
                earnings: e.subtotal - e.good_sell_number * e.good_cost
            }
            return tmp
        });
        // 更新商品数量
        const Literal = this.app.mysql.literals.Literal;
        // 更新商品数量
        const numberRecode = sellList.map(m => {
            let number = m.ratio * Math.ceil(m.good_sell_number / m.ratio) - m.good_sell_number
            let updateRecode = {
                row: {
                    good_number: m.havfather === '1' ? new Literal(`IF(good_number - ${m.good_sell_number}>-1,good_number -${m.good_sell_number},good_number + ${number})`) : new Literal(`IF(good_number - ${m.good_sell_number}>0,good_number - ${m.good_sell_number},0)`)
                },
                where: {
                    good_id: m.good_id
                }
            }
            return updateRecode
        })
        // 更新如果子商品为0的时候，父商品的数量
        const fatherRecode = fatherGoodList.length > 0 ? fatherGoodList.map(m => {
            const number = Math.ceil(m.good_sell_number / m.ratio)
            let updateRecode = {
                row: {
                    good_number: new Literal(`IF(good_number - ${number}>0,good_number - ${number},0)`)
                },
                where: {
                    good_id: m.father_good_id
                }
            }
            return updateRecode
        }) : []


        const result = await this.app.mysql.beginTransactionScope(async conn => {

            // 插入数据表
            await conn.insert('tb_sell', sellRecode)
            if (numberRecode.length > 0) {
                await conn.updateRows('tb_inventory', numberRecode)
            }
            if (fatherRecode.length > 0) {
                await conn.updateRows('tb_inventory', fatherRecode)
            }
            return {
                success: true
            }
        }, this.ctx)

        return {
            result
        }
    }

};