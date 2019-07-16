<template>
  <div>
    <el-form ref="batchpay" :model="batchpay" :inline="true" :rules="rules" label-width="130px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="批量支付流水号:" prop="batchPayCode">
            <el-input placeholder="批量支付流水号" v-model="batchpay.batchPayCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="initdom('batchpay')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tables">
      <el-table :data="tabledata" stripe border style="width: 100%" height="500">
        <el-table-column label="执行状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.excuteState === '0'">未知</el-tag>
            <el-tag v-else-if="scope.row.excuteState === '1'">执行中</el-tag>
            <el-tag type="success" v-else-if="scope.row.excuteState === '2'">执行成功</el-tag>
            <el-tag type="danger" v-else-if="scope.row.excuteState === '3'">执行失败</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column width="120" label="回执文件名" prop="resultFileName"></el-table-column>
        <el-table-column label="备注1" prop="remark1"></el-table-column>
        <el-table-column label="备注2" prop="remark2"></el-table-column>
      </el-table>
    </div>
    <!-- tables -->
    <div class="clearfix">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[25, 50, 75, 100]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- clearfix -->
  </div>
</template>

<script>
import { checkbatchpay } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
      tabledata: [],
      rules: {
        batchPayCode: [
          { required: true, message: "请输入批量支付流水号！", trigger: "blur" }
        ]
      },
      batchpay: {
        batchPayCode: ""
      },
      page: {
        currentPage: 1,
        pagesize: 25,
        total: 0
      },
      token: cookie.get("token")
    };
  },
  methods: {
    initdom(formName) {
      const _this = this;
      const ls = {
        merchantNo: window.merchantNo,
        batchPayCode: this.batchpay.batchPayCode
      };
      _this.$refs[formName].validate(valid => {
        if (valid) {
          checkbatchpay(ls).then(res => {
            console.log(res);
            // _this.tabledata = res || [];
          });
        }
      });
    },
    handleSizeChange(val) {
      this.page.pagesize = val;
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.tables {
  clear: both;
}
.clearfix {
  margin-top: 20px;
  text-align: right;
  overflow: hidden;
}
</style>
