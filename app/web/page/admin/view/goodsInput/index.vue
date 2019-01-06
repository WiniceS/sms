<template>
  <div
    class="goods-input"
    :style="containerHeight"
  >
    <el-row class="goods-input-form">
      <h1>商品入库</h1>
      <el-form
        :model="goodsInputForm"
        :rules="rules"
        ref="goodsInputForm"
        label-width="80px"
        size="mini"
      >
        <el-form-item
          label="商品编号"
          prop="goodsId"
        >
          <el-input
            v-model="goodsInputForm.goodsId"
            placeholder="请输入商品编号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="goodsName"
        >
          <el-input
            v-model="goodsInputForm.goodsName"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="goodsSpecification"
        >
          <el-input
            v-model="goodsInputForm.goodsSpecification"
            placeholder="请输入商品规格"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品单位"
          prop="goodsUnit"
        >
          <el-select
            v-model="goodsInputForm.goodsUnit"
            placeholder="请选择单位"
          >
            <el-option
              v-for="item in unitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品品种"
          prop="goodsVariety"
        >
          <el-select
            v-model="goodsInputForm.goodsVariety"
            placeholder="请选择品类"
          >
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品售价"
          prop="goodsSell"
        >
          <el-input
            v-model="goodsInputForm.goodsSell"
            placeholder="请输入商品售价"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="商品成本"
          prop="goodsCost"
        >
          <el-input
            v-model="goodsInputForm.goodsCost"
            placeholder="请输入商品成本"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="商品数量"
          prop="goodsNumber"
        >
          <el-input
            v-model="goodsInputForm.goodsNumber"
            placeholder="请输入商品数量"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('goodsInputForm')"
            size="mini"
          >商品入库</el-button>
          <el-button
            @click="resetForm('goodsInputForm')"
            size="mini"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="goods-input-table">
      <h1>最近添加记录</h1>
      <el-table
        :data="goodsInputData"
        stripe
        :height="winHeight-100"
        border
      >
        <el-table-column
          prop="goodsId"
          label="商品编号"
          header-align="center"
          show-overflow-tooltip
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="goodsSpecification"
          label="商品规格"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="goodsSell"
          label="商品售价"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="goodsCost"
          label="商品成本"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="goodsNumber"
          label="商品数量"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          show-overflow-tooltip
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primay"
              @click="handleDelete(scope.row.goodsId)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.goodsId)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  name: 'GoodsInput',
  data () {
    return {
      goodsInputForm: {
        goodsId: '',
        goodsName: '',
        goodsSpecification: '',
        goodsUnit: '',
        goodsVariety: '',
        goodsSell: '',
        goodsCost: '',
        goodsNumber: ''
      },
      rules: {
        goodsId: [
          { required: true, message: '请输入商品编号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodsSpecification: [
          { required: true, message: '请输入商品规格', trigger: 'blur' }
        ],
        goodsUnit: [
          { required: true, message: '请选择单位', trigger: 'change' }
        ],
        goodsVariety: [
          { required: true, message: '请选择品类', trigger: 'change' }
        ],
        goodsSell: [
          { required: true, message: '请输入商品售价', trigger: 'blur' }
        ],
        goodsCost: [
          { required: true, message: '请输入商品成本', trigger: 'blur' }
        ],
        goodsNumber: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['winHeight']),
    ...mapState('goodsInput', ['goodsInputData']),
    ...mapGetters(['containerPageHeight']),
    containerHeight () {
      return `height:${this.containerPageHeight - 40}px;`
    }
  },
  methods: {
    ...mapActions('goodsInput', ['getGoodsDeal', 'del']),
    submitForm () {
      // this.$refs[formName].validate((valid) => {
      // if (valid) {
      // alert('submit!')
      console.log('this', this)
      console.log('this.getGoodsDeal', this.getGoodsDeal)
      this.getGoodsDeal().then(res => {
        console.log(res)
      })
      this.del().then(res => {
        console.log(res)
      })
      // } else {
      // console.log('error submit!!')
      // return false
      // }
      // })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">
.goods-input {
  display: flex;
  background-color: #fff;
  .goods-input-form {
    width: 300px;
    padding: 20px 10px;
  }
  .goods-input-table {
    flex: auto;
    padding: 10px 10px;
  }
}
</style>
