<template>
  <div>
    <el-form ref="settled" :model="settled" :inline="true" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="批量结息流水号:" prop="batchAccintPayCode">
            <el-input placeholder="批量结息流水号" v-model="settled.batchAccintPayCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="initdom">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tables">
      <el-table :data="tabledata" stripe border style="width: 100%">
        <el-table-column label="执行状态" width="120">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.excuteState === '0'">未知</el-tag>
            <el-tag v-else-if="scope.row.excuteState === '1'">执行中</el-tag>
            <el-tag type="success" v-else-if="scope.row.excuteState === '2'">执行成功</el-tag>
            <el-tag type="danger" v-else-if="scope.row.excuteState === '3'">执行失败</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="回执文件名" prop="resultFileName"></el-table-column>
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
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <!-- clearfix -->
  </div>
</template>

<script>
import { checkinterestsettled } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
      tabledata: [],
      settled: {
        batchAccintPayCode: ""
      },
      rules: {
        batchAccintPayCode: [
          { required: true, message: "请输入批量结息流水号！", trigger: "blur" }
        ]
      },
      page: {
        currentPage: 1,
        pagesize: 20,
        total: 0
      },
      token: cookie.get("token")
    };
  },
  methods: {
    initdom() {
      // const _this = this;
      const ls = {
        merchantNo: window.merchantNo,
        batchAccintPayCode: this.settled.batchAccintPayCode
      };
      checkinterestsettled(ls).then(res => {
        console.log(res);
        // _this.tabledata = res || []
      });
    },
    deleteRow(index, rows) {
      const _this = this;
      _this
        .$confirm("确认删除这条数据么？", "提示", { type: "warning" })
        .then(() => {
          _this.$message({ message: "删除成功！", type: "success" });
          rows.splice(index, 1);
        })
        .catch(errro => {
          _this.$message({ message: "删除失败，用户已取消！", type: "info" });
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
