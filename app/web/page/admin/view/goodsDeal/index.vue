<template>
  <div class="goods-deal">
    <div class="goods-deal-input">
      <div class="goods-deal-input-id">
        <el-input
          class="goods-deal-input-goodid"
          v-model="input"
          placeholder="请输入商品编号"
        ></el-input>
        <el-button
          class="goods-deal-input-add"
          type="primary"
        >添加</el-button>
      </div>
    </div>
    <el-table
      class="goods-deal-tabel"
      :data="computedDealList"
      :summary-method="getSummaries"
      show-summary
      stripe
      :height="winHeight-170"
      :style="{width: '100%;'}"
      border
    >
      <el-table-column
        prop="goodsId"
        label="商品编号"
        header-align="center"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="商品名称"
        header-align="center"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsSpecification"
        label="商品规格"
        header-align="center"
        show-overflow-tooltip
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="goodsSell"
        label="商品售价"
        header-align="center"
        show-overflow-tooltip
        align="center"
        min-width="80"
      >
      </el-table-column>
      <el-table-column
        prop="goodsSellNumber"
        label="商品数量"
        header-align="center"
        show-overflow-tooltip
        min-width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="subtotal"
        label="小计"
        header-align="center"
        show-overflow-tooltip
        min-width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        show-overflow-tooltip
        min-width="180"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            title="数量减1"
            @click="minusDealList(scope.row.goodsId)"
          >-</el-button>
          <el-button
            size="mini"
            title="数量加1"
            @click="plusDealList(scope.row.goodsId)"
          >+</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delDealList(scope.row.goodsId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="goods-deal-button">
      <div class="goods-deal-sale">
        <el-input-number
          v-model="sale"
          controls-position="right"
          :min="0" 
          placeholder="请输入优惠金额"
        ></el-input-number>
        <el-button
          type="primary"
          :style="{marginLeft:'20px'}"
          @click="onSaleNumber"
        >添加优惠</el-button>
      </div>
      <div>
        <el-button
          type="warning"
          @click="clearDeal"
        >清空</el-button>
        <el-button
          type="primary"
          :style="{width:'150px'}"
          @click="settleAccounts"
        >确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'GoodsDeal',
  data () {
    return {
      input: '',
      sale: 0,
      dialogVisible: false
    }
  },
  computed: {
    ...mapState('goodsDeal', []),
    ...mapState(['winHeight']),
    ...mapGetters('goodsDeal', ['computedDealList'])
  },
  methods: {
    ...mapActions('goodsDeal', ['onSale']),
    ...mapMutations('goodsDeal', {
      clearDealList: 'CLEAR_DEAL_LIST',
      delDealList: 'DEL_DEAL_LIST',
      plusDealList: 'PLUS_DEAL_LIST',
      minusDealList: 'MINUS_DEAL_LIST'
    }),
    // 自定义合计栏样式
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0);
          sums[index]
        } else {
          sums[index] = ''
        }
        if (column.property === 'goodsSell') {
          sums[index] = ''
        }
        if (column.property === 'subtotal') {
          sums[index] += ' 元'
        }
      })
      return sums
    },
    // 删除一行销售商品
    handleDelete (id) {
      this.delDealList(id)
    },
    onSaleNumber () {
      if (this.sale > 0) {
        this.onSale(this.sale)
      }
    },
    // 清空销售列表
    clearDeal () {
      this.$confirm('是否清空销售列表', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.clearDealList()
      }).catch(() => {
        console.log('取消清空')
      })
    },
    // 结算
    settleAccounts () {

    }
  }
}
</script>

<style lang="scss">
.goods-deal {
  .goods-deal-input {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-deal-input-id {
      width: 700px;
      display: flex;
      justify-content: space-between;
      .goods-deal-input-goodid {
        width: 500px;
      }
      .goods-deal-input-add {
        width: 150px;
      }
    }
  }
  .goods-deal-button {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .goods-deal-sale {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
