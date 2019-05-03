export function initState() {
  return {
    goodInfo: {},
    // 商品入库记录
    goodsInputData: [{
      goodsId: '6901939122846',
      goodsName: '雪菲力',
      goodsSpecification: '250毫升',
      goodsSell: '1',
      goodsCost: '0.8',
      goodsNumber: '100',
      goodsUnit: 'he',
      goodsVariety: '4'
    }, {
      goodsId: '6901939122846',
      goodsName: '雪菲力',
      goodsSpecification: '250毫升',
      goodsSell: '1',
      goodsCost: '0.8',
      goodsNumber: '100',
      goodsUnit: 'he',
      goodsVariety: '4'
    }, {
      goodsId: '6901939122846',
      goodsName: '雪菲力',
      goodsSpecification: '250毫升',
      goodsSell: '1',
      goodsCost: '0.8',
      goodsNumber: '100',
      goodsUnit: 'he',
      goodsVariety: '4'
    }, {
      goodsId: '6901939122846',
      goodsName: '雪菲力',
      goodsSpecification: '250毫升',
      goodsSell: '1',
      goodsCost: '0.8',
      goodsNumber: '100',
      goodsUnit: 'he',
      goodsVariety: '4'
    }],
    unitOption: [{
      label: '盒',
      value: 'he'
    }, {
      label: '瓶',
      value: 'ping'
    }, {
      label: '罐',
      value: 'guan'
    }, {
      label: '杯',
      value: 'bei'
    }, {
      label: '个',
      value: 'ge'
    }, {
      label: '包',
      value: 'bao'
    }, {
      label: '支',
      value: 'zhi'
    }, {
      label: '根',
      value: 'gen'
    }, {
      label: '碗',
      value: 'wan'
    }, {
      label: '捆',
      value: 'kun'
    }],
    varietyOption: [{
      label: '烟类',
      value: '1'
    }, {
      label: '酒类',
      value: '2'
    }, {
      label: '调味类',
      value: '3'
    }, {
      label: '饮料类',
      value: '4'
    }, {
      label: '食品类',
      value: '5'
    }, {
      label: '生活用品类',
      value: '6'
    }, {
      label: '冷饮类',
      value: '7'
    }, {
      label: '其他类',
      value: '0'
    }]
  }
}