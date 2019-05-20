<template>
  <div class="goods-input" :style="{height:(winHeight-70)+'px'}">
    <el-row :gutter="20" class="goods-input-header">
      <el-col :span="16">
        <el-input v-model="goodsInputForm.goodsId" placeholder="请输入商品编号"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="getGoodInfo">查询</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
        <el-button type="primary" @click="open">查看入库记录</el-button>
      </el-col>
    </el-row>
    <el-row class="goods-input-form" :style="{height:(winHeight-120)+'px'}">
      <el-form :model="goodsInputForm" :rules="rules" ref="goodsInputForm" label-width="100px">
        <el-form-item label="商品编号" prop="goodsId">
          <el-input v-model="goodsInputForm.goodsId" placeholder="请输入商品编号" :style="{width:'71%'}"></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsInputForm.goodsName" placeholder="请输入商品名称" :style="{width:'71%'}"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="goodsSpecification">
          <el-input
            v-model="goodsInputForm.goodsSpecification"
            placeholder="请输入商品规格"
            :style="{width:'71%'}"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品单位" prop="goodsUnit">
          <el-select v-model="goodsInputForm.goodsUnit" placeholder="请选择单位" :style="{width:'71%'}">
            <el-option
              v-for="item in unitOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品品种" prop="goodsVariety">
          <el-select
            v-model="goodsInputForm.goodsVariety"
            placeholder="请选择品类"
            :style="{width:'71%'}"
          >
            <el-option
              v-for="item in varietyOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品售价" prop="goodsSell">
          <el-input v-model="goodsInputForm.goodsSell" placeholder="请输入商品售价" :style="{width:'71%'}">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品成本" prop="goodsCost">
          <el-input v-model="goodsInputForm.goodsCost" placeholder="请输入商品成本" :style="{width:'71%'}">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="goodsNumber">
          <el-input-number
            v-model="goodsInputForm.goodsNumber"
            placeholder="请输入商品数量"
            :style="{width:'71%'}"
            :min="0"
            :max="9999"
          ></el-input-number>
        </el-form-item>
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
            prop="goodsId"
            label="商品编号"
            header-align="center"
            align="center"
            show-overflow-tooltip
            min-width="150"
          ></el-table-column>
          <el-table-column
            prop="goodsName"
            label="商品名称"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="goodsSpecification"
            label="商品规格"
            align="center"
            header-align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="goodsSell"
            label="商品售价"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="goodsCost"
            label="商品成本"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="goodsNumber"
            label="商品数量"
            align="center"
            header-align="center"
            show-overflow-tooltip
            width="80"
          ></el-table-column>
          <el-table-column
            prop="updateDateTime"
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
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "GoodsInput",
  data() {
    return {
      goodsInputForm: {
        goodsId: "",
        goodsName: "",
        goodsSpecification: "",
        goodsUnit: "",
        goodsVariety: "",
        goodsSell: 0,
        goodsCost: 0,
        goodsNumber: 0
      },
      rules: {
        goodsId: [
          { required: true, message: "请输入商品编号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goodsSpecification: [
          { required: true, message: "请输入商品规格", trigger: "blur" }
        ],
        goodsUnit: [
          { required: true, message: "请选择单位", trigger: "change" }
        ],
        goodsVariety: [
          { required: true, message: "请选择品类", trigger: "change" }
        ],
        goodsSell: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
        goodsCost: [
          { required: true, message: "请输入商品成本", trigger: "blur" }
        ],
        goodsNumber: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ]
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
    ...maoMutaions("goodsInput", {
      setPageSize: "SET_PAGESIZE",
      setCurrentSize: "SET_CURRENTSIZE"
    }),
    // 获取商品信息
    getGoodInfo() {
      const re = /^[0-9]{13}$/;
      let tmp = this.goodsInputForm.goodsId.search(re);
      if (tmp > -1) {
        this.getGoodInfoById({ id: this.goodsInputForm.goodsId }).then(res => {
          if (res.length > 0) {
            this.goodsInputForm.goodsName = res.goodsName;
            this.goodsInputForm.goodsSpecification = res.goodsSpecification;
            this.goodsInputForm.goodsUnit = res.goodsUnit;
            this.goodsInputForm.goodsVariety = res.goodsVariety;
            this.goodsInputForm.goodsSell = res.goodsSell;
            this.goodsInputForm.goodsCost = res.goodsCost;
            this.goodsInputForm.goodsNumber = res.goodsNumber;
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
      this.getGoodInfoById({ id: this.goodsInputForm.goodsId });
      this.$refs[formName].validate(valid => {
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
        goodsId: "",
        goodsName: "",
        goodsSpecification: "",
        goodsUnit: "",
        goodsVariety: "",
        goodsSell: 0,
        goodsCost: 0,
        goodsNumber: 0
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
      this.goodsInputForm.goodsId = item.goodsId;
      this.goodsInputForm.goodsName = item.goodsName;
      this.goodsInputForm.goodsSpecification = item.goodsSpecification;
      this.goodsInputForm.goodsUnit = item.goodsUnit;
      this.goodsInputForm.goodsVariety = item.goodsVariety;
      this.goodsInputForm.goodsSell = item.goodsSell;
      this.goodsInputForm.goodsCost = item.goodsCost;
      this.goodsInputForm.goodsNumber = item.goodsNumber;
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
    padding: 5px 20px;
  }
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
