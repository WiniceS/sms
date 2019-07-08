import request from 'framework/network/request';

// initial state
// shape: [{ id, quantity }]
const state = {
  topInventoryOption: {
    title: {
      text: "库存数量前五",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "库存",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      }
    }]
  },
  bottomInventoryOption: {
    title: {
      text: "库存数量后五",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "库存",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      }
    }]
  },
  topSellOption: {
    title: {
      text: "销售数量前五",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "销售量",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    }]
  },
  bottomSellOption: {
    title: {
      text: "销售数量后五",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "销售量",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    }]
  },
  sellOption: {
    title: {
      text: "销售数量",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "销售量",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    }]
  },
  inventoryOption: {
    title: {
      text: "库存数量",
      textAlign: "auto"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    xAxis: [{
      type: "value"
    }],
    yAxis: [{
      type: "category",
      axisTick: {
        show: false
      },
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }],
    series: [{
      name: "库存",
      type: "bar",
      label: {
        normal: {
          show: true,
          position: "inside"
        }
      },
      data: [200, 170, 240, 244, 200, 220, 210]
    }]
  },
  sellRecord: []
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({
      id,
      quantity
    }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    })
  }
}

// actions
const actions = {
  getSellRecode(store, {
    condition
  }) {
    const {
      commit,
      dispatch,
      state
    } = store
    return request.post('/sell/api/getSellRecord', {
      condition
    }, store).then(res => {
      commit('setSellRecord', res.data)
    })
  }
}

// mutations
const mutations = {
  setSellRecord(state, {
    data
  }) {
    state.sellRecord = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}