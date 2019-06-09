<template>
  <div class="goods-input" :style="{height:(winHeight-70)+'px'}">
    <el-row :gutter="20" class="goods-input-header">
      <el-col :span="16">
        <el-input v-model="goodsInputForm.goodId" placeholder="请输入商品编号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getGood">查询</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button type="primary" @click="open">查看入库记录</el-button>
      </el-col>
    </el-row>
    <el-row class="goods-input-form" :style="{height:(winHeight-120)+'px'}">
      <el-form :model="goodsInputForm" :rules="rules" ref="goodsInputForm" label-width="120px">
        <el-row class="goods-input-form-body">
          <el-form-item label="商品编号" prop="goodId">
            <el-input v-model="goodsInputForm.goodId" placeholder="请输入商品编号" :style="{width:'90%'}"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodName">
            <el-input
              v-model="goodsInputForm.goodName"
              placeholder="请输入商品名称"
              :style="{width:'90%'}"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品规格" prop="goodSpecification">
            <el-input
              v-model="goodsInputForm.goodSpecification"
              placeholder="请输入商品规格"
              :style="{width:'90%'}"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品单位" prop="goodUnit">
            <el-select
              v-model="goodsInputForm.goodUnit"
              placeholder="请选择单位"
              :style="{width:'90%'}"
            >
              <el-option
                v-for="item in unitOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品品种" prop="goodVariety">
            <el-select
              v-model="goodsInputForm.goodVariety"
              placeholder="请选择品类"
              :style="{width:'90%'}"
            >
              <el-option
                v-for="item in varietyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品售价" prop="goodSell">
            <el-input
              v-model="goodsInputForm.goodSell"
              placeholder="请输入商品售价"
              :style="{width:'90%'}"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品成本" prop="goodCost">
            <el-input
              v-model="goodsInputForm.goodCost"
              placeholder="请输入商品成本"
              :style="{width:'90%'}"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品数量" prop="goodNumber">
            <el-input-number
              v-model="goodsInputForm.goodNumber"
              placeholder="请输入商品数量"
              :style="{width:'90%'}"
              :min="0"
              :max="9999"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="有无父商品" prop="havfather">
            <el-radio v-model="goodsInputForm.havfather" label="0">没有父商品</el-radio>
            <el-radio v-model="goodsInputForm.havfather" label="1">有父商品</el-radio>
          </el-form-item>
          <el-form-item label="父商品编号" >
            <el-input
              v-model="goodsInputForm.fatherGoodsId"
              :disabled="goodsInputForm.havfather=='0'"
              placeholder="请输入子商品编号"
              :style="{width:'90%'}"
            ></el-input>
          </el-form-item>
          <el-form-item label="关系比例" >
            <el-input-number
              v-model="goodsInputForm.ratio"
              :disabled="goodsInputForm.havfather=='0'"
              placeholder="请输入关系比例"
              :style="{width:'90%'}"
            ></el-input-number>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('goodsInputForm')">{{isNew?'商品入库':'更新商品'}}</el-button>
          <el-button
            type="warning"
            :style="{marginLeft:'50px'}"
            @click="resetForm('goodsInputForm')"
          >清空</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-dialog title="最近添加记录" :visible.sync="dialogVisible" width="80%">
      <el-row :style="{padding:'10px'}">
        <el-col :span="16">
          <el-input v-model="goodsInputForm.goodsId" placeholder="请输入商品编号"></el-input>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-button type="primary" :style="{width:'100%'}">查询</el-button>
        </el-col>
      </el-row>
      <el-row class="goods-input-table">
        <el-table :data="goodsInputData" stripe :height="winHeight*0.45" border>
          <el-table-column
            prop="good_id"
            label="商品编号"
            header-align="center"
            align="center"
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="good_name"
            label="商品名称"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="good_specification"
            label="商品规格"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="good_sell"
            label="商品售价"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="good_cost"
            label="商品成本"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="good_number"
            label="商品数量"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="入库时间"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="160"
          ></el-table-column>
          <el-table-column
            label="操作"
            header-align="center"
            align="center"
            show-overflow-tooltip
            width="150"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button size="mini" type="primay" @click="handleEdit(scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.goodsId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentSize"
          :style="{textAlign:'right',margin:'5px 0'}"
          :page-sizes="[20, 40, 60, 80]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "GoodsInput",
  data() {
    return {
      goodsInputForm: {
        goodId: "",
        goodName: "",
        goodSpecification: "",
        goodUnit: "",
        havfather: "0",
        goodVariety: "",
        fatherGoodsId: "",
        goodSell: 0,
        goodCost: 0,
        goodNumber: 0,
        ratio: 0
      },
      rules: {
        goodId: [
          { required: true, message: "请输入商品编号", trigger: "blur" }
        ],
        goodName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodSpecification: [
          { required: true, message: "请输入商品规格", trigger: "blur" }
        ],
        goodUnit: [
          { required: true, message: "请选择单位", trigger: "change" }
        ],
        goodVariety: [
          { required: true, message: "请选择品类", trigger: "change" }
        ],
        goodSell: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
        goodCost: [
          { required: true, message: "请输入商品成本", trigger: "blur" }
        ],
        goodNumber: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        havfather: [{ required: true, message: "请确认关系", trigger: "blur" }]
      },
      dialogVisible: false,
      isNew: true
    };
  },
  computed: {
    ...mapState(["winHeight"]),
    ...mapState("goodsInput", [
      "goodsInputData",
      "varietyOption",
      "unitOption",
      "goodInfo",
      "total",
      "pageSize",
      "currentSize"
    ])
  },
  methods: {
    ...mapActions("goodsInput", [
      "getGoodInfoById",
      "getGoodInfo",
      "delGoodById",
      "updateGoodById",
      "addGood"
    ]),
    ...mapMutations("goodsInput", {
      setPageSize: "SET_PAGESIZE",
      setCurrentSize: "SET_CURRENTSIZE"
    }),
    // 获取商品信息
    getGood() {
      const re = /^[0-9]{13}$/;
      let tmp = this.goodsInputForm.goodId.search(re);
      if (tmp > -1) {
        this.getGoodInfoById({ id: this.goodsInputForm.goodId }).then(res => {
          if (res.length > 0) {
            this.goodsInputForm.goodName = res.good_name;
            this.goodsInputForm.goodSpecification = res.good_specification;
            this.goodsInputForm.goodUnit = res.good_unit;
            this.goodsInputForm.goodVariety = res.good_variety;
            this.goodsInputForm.goodSell = res.good_sell;
            this.goodsInputForm.goodCost = res.good_cost;
            this.goodsInputForm.goodNumber = res.good_number;
            this.isNew = false;
          } else {
            this.isNew = true;
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "输入的商品编号不正确"
        });
      }
    },
    // 提交表单
    submitForm() {
      // this.getGoodInfoById({ id: this.goodsInputForm.goodsId });
      this.$refs['goodsInputForm'].validate(valid => {
        if (valid) {
          if (this.isNew) {
            this.addGood(this.goodsInputForm)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "新增成功"
                });
              })
              .catch(e => {
                console.log(e);
                this.$message({
                  type: "error",
                  message: "新增失败"
                });
              });
          } else {
            this.updateGoodById(this.goodsInputForm)
              .then(() => {
                this.$message({
                  type: "success",
                  message: "更新成功"
                });
              })
              .catch(e => {
                console.log(e);
                this.$message({
                  type: "error",
                  message: "更新失败"
                });
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置商品输入信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.goodsInputForm = {
        goodId: "",
        goodName: "",
        goodSpecification: "",
        goodUnit: "",
        goodVariety: "",
        goodSell: 0,
        goodCost: 0,
        goodNumber: 0,
        havfather:'0',
        fatherGoodsId:"",
        ratio:0
      };
    },
    // 打开入库详情页面
    open() {
      this.dialogVisible = true;
      this.setPageSize(10);
      this.setCurrentSize(1);
      this.getGoodInfo({ id: "" });
    },
    // 改变每页数
    handleSizeChange(size) {
      this.setPageSize(size);
      this.setCurrentSize(1);
    },
    // 改变当前页数
    handleCurrentChange(page) {
      this.setCurrentSize(page);
    },
    // 修改商品信息
    handleEdit(item) {
      console.log(item);
      this.goodsInputForm.goodId = item.goodId;
      this.goodsInputForm.goodName = item.goodName;
      this.goodsInputForm.goodSpecification = item.goodSpecification;
      this.goodsInputForm.goodUnit = item.goodUnit;
      this.goodsInputForm.goodVariety = item.goodVariety;
      this.goodsInputForm.goodSell = item.goodSell;
      this.goodsInputForm.goodCost = item.goodCost;
      this.goodsInputForm.goodNumber = item.goodNumber;
      this.goodsInputForm.havfather=item.havfather;
      this.goodsInputForm.fatherGoodsId=item.fatherGoodsId;
      this.goodsInputForm.ratio=item.ratio;
      this.isNew = false;
    },
    // 根据id删除商品
    handleDelete(id) {
      this.$confirm(
        "此操作会删除其商品，库存中将不再有此商品，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.delGoodById({
            id
          }).catch(e => {
            this.$message({
              type: "error",
              message: "删除失败"
            });
            console.log(e);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.goods-input {
  background-color: #fff;
  .goods-input-header {
    padding: 10px 20px;
  }
  .goods-input-form {
    width: 100%;
    padding: 10px 10px;
    &-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .el-form-item {
        width: 50%;
      }
    }
  }
  .goods-input-table {
    flex: auto;
    padding: 10px 10px;
  }
}
</style>
