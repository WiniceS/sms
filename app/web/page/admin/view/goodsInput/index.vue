<template>
  <div class="goods-input">
    <el-row class="goods-input-form">
      <el-form
        :model="goodsInputForm"
        :rules="rules"
        inline
        ref="goodsInputForm"
        label-width="100px"
        size="mini"
      >
        <el-form-item
          label="商品编号"
          prop="goodsId"
        >
          <el-input
            v-model="goodsInputForm.goodsId"
            placeholder="请输入商品编号"
            :style="{width:'194px'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品名称"
          prop="goodsName"
        >
          <el-input
            v-model="goodsInputForm.goodsName"
            placeholder="请输入商品名称"
            :style="{width:'194px'}"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="商品规格"
          prop="goodsSpecification"
        >
          <el-input
            v-model="goodsInputForm.goodsSpecification"
            placeholder="请输入商品规格"
            :style="{width:'194px'}"
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
            :style="{width:'194px'}"
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
            :style="{width:'194px'}"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="商品数量"
          prop="goodsNumber"
        >
          <el-input-number
            v-model="goodsInputForm.goodsNumber"
            placeholder="请输入商品数量"
            controls-position="right"
            :style="{width:'194px'}"
            :min="0"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('goodsInputForm')"
            size="mini"
            :style="{marginLeft:'30px'}"
          >商品入库</el-button>
          <el-button
            @click="resetForm('goodsInputForm')"
            size="mini"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="goods-input-table">
      <h5>最近添加记录</h5>
      <el-table
        :data="goodsInputData"
        stripe
        :height="winHeight-330"
        border
      >
        <el-table-column
          prop="goodsId"
          label="商品编号"
          header-align="center"
          align="center"
          show-overflow-tooltip
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          prop="goodsName"
          label="商品名称"
          align="center"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="goodsSpecification"
          label="商品规格"
          align="center"
          header-align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="goodsSell"
          label="商品售价"
          align="center"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="goodsCost"
          label="商品成本"
          align="center"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="goodsNumber"
          label="商品数量"
          align="center"
          header-align="center"
          show-overflow-tooltip
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          header-align="center"
          align="center"
          show-overflow-tooltip
          width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primay"
              @click="handleEdit(scope.row)"
            >修改</el-button>
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
        :current-page="currentPage"
        :style="{textAlign:'right',margin:'5px 0'}"
        :page-sizes="[20, 40, 60, 80]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
        goodsSell: 0,
        goodsCost: 0,
        goodsNumber: 0
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
      },
      pageSize: 20,
      currentPage: 1,
      total: 100
    }
  },
  computed: {
    ...mapState(['winHeight']),
    ...mapState('goodsInput', ['goodsInputData', 'varietyOption', 'unitOption'])
  },
  methods: {
    ...mapActions('goodsInput', ['getGoodInfo']),
    submitForm () {
      this.getGoodInfo({ id: this.goodsInputForm.goodsId })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleSizeChange (size) {
      this.pageSize = size
    },
    handleCurrentChange (page) {
      this.currentPage = page
    },
    handleEdit (item) {
      console.log(item)
      this.goodsInputForm.goodsId = item.goodsId
      this.goodsInputForm.goodsName = item.goodsName
      this.goodsInputForm.goodsSpecification = item.goodsSpecification
      this.goodsInputForm.goodsUnit = item.goodsUnit
      this.goodsInputForm.goodsVariety = item.goodsVariety
      this.goodsInputForm.goodsSell = item.goodsSell
      this.goodsInputForm.goodsCost = item.goodsCost
      this.goodsInputForm.goodsNumber = item.goodsNumber
    },
    handleDelete (id) {
      this.$confirm('此操作会删除其商品，库存中将不再有此商品，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss">
.goods-input {
  background-color: #fff;
  .goods-input-form {
    width: 100%;
    padding: 20px 10px;
  }
  .goods-input-table {
    flex: auto;
    padding: 10px 10px;
  }
}
</style>
