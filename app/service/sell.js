'use strict';
const egg = require('egg');
module.exports = class LoginService extends egg.Service {
    // 添加商品
    async sell(sellList) {
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
};