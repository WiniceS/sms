'use strict';
const egg = require('egg');
module.exports = class LoginService extends egg.Service {
    // 添加商品
    async sell(sellList) {
        const result = []
        sellList.forEach(async e => {
            const tmpResult = await app.mysql.beginTransactionScope(async conn => {
                // 获取销售信息
                const sellRecode = {
                    good_id: e.good_id,
                    sell_num: e.good_sell_number,
                    unit_price: e.good_sell,
                    total_price: e.subtotal,
                    sell_date: e.sell_date,
                    discounts: e.discounts,
                    earnings: e.subtotal - e.good_sell_number * e.good_cost
                }
                // 插入数据表
                await conn.insert('tb_sell', sellRecode)

                if (e.havfather === 1) {
                    // 如果商品有父商品
                    const fatherGoodNumberList = await this.app.mysql.get('v_good_info', {
                        good_id: e.father_good_id
                    })
                    const goodNumberList = await this.app.mysql.get('v_good_info', {
                        good_id: e.good_id
                    })
                    const options = {
                        where: {
                            good_id: e.good_id
                        }
                    }
                    const options2 = {
                        where: {
                            good_id: e.father_good_id
                        }
                    }
                    const row = {
                        good_number: goodNumberList[0].good_number - 1
                    }
                    // 判断子商品是否卖完了，是从父商品中拆出来的
                    if (goodNumberList[0].good_number == 0) {
                        // 将子父商品的数量都更改
                        row = {
                            good_number: ratio - 1
                        }
                        const row2 = {
                            good_number: fatherGoodNumberList[0].good_number - 1
                        }
                        await conn.update('tb_inventory', row, options)
                        await conn.update('tb_inventory', row2, options2)
                    } else {
                        // 只需更改子商品的数量
                        await conn.update('tb_inventory', row, options)
                    }
                } else {
                    // 更新商品数量
                    const goodNumberList = await this.app.mysql.get('v_good_info', {
                        good_id: e.good_id
                    })
                    const row = {
                        good_number: goodNumberList[0].good_number - 1
                    }
                    const options = {
                        where: {
                            good_id: e.good_id
                        }
                    }
                    await conn.update('tb_inventory', row, options)
                }
                return {
                    success: true
                }
            }, ctx)
            tmpResult.id = e.good_id
            result.push(tmpResult)
        });
        if (result.every(every => every.success === true)) {
            return {
                success: true
            }
        } else {
            return {
                result
            }
        }

    }
};