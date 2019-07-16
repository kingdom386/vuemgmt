<template>
  <div class="golden">
    <el-form ref="elcrzds" :model="elcrzds" inline :rules="rules" label-width="120px">
      <el-form-item label="交易会员代码:" prop="tradeMemCode">
        <el-input placeholder="交易会员代码" clearable v-model="elcrzds.tradeMemCode"></el-input>
      </el-form-item>
      <el-form-item label="子账号:" prop="subAccount">
        <el-input placeholder="子账号" clearable v-model="elcrzds.subAccount"></el-input>
      </el-form-item>
      <el-form-item label="币种:" prop="currency">
        <el-select v-model="elcrzds.currency" filterable clearable placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="initdom('elcrzds')">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tables">
      <el-table :data="tabledata" stripe border style="width: 100%">
        <el-table-column label="子账号" prop="subAccount"></el-table-column>
        <el-table-column label="子账户总余额" prop="subSumAccountMoney"></el-table-column>
        <el-table-column label="子账户冻结余额" prop="freezeMoney"></el-table-column>
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
import { queryCash } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
      rules: {
        tradeMemCode: [
          { required: true, message: "请输入交易会员代码！", trigger: "blur" }
        ],
        subAccount: [
          { required: true, message: "请输入子账号！", trigger: "blur" }
        ],
        currency: [
          { required: true, message: "请选择币种！", trigger: "change" }
        ]
      },
      tabledata: [],
      options: [
        {
          value: "CHF",
          label: "法国法郎"
        },
        {
          value: "AUD",
          label: "澳大利亚元"
        },
        {
          value: "EUR",
          label: "欧元"
        },
        {
          value: "JPY",
          label: "日元"
        },
        {
          value: "CHF",
          label: "瑞士法郎"
        },
        {
          value: "SGD",
          label: "新加坡元"
        },
        {
          value: "CAD",
          label: "加拿大元"
        },
        {
          value: "CNY",
          label: "人民币"
        },
        {
          value: "USD",
          label: "美元"
        },
        {
          value: "GBP",
          label: "英镑"
        },
        {
          value: "HKD",
          label: "港元"
        },
        {
          value: "SEK",
          label: "瑞典克朗"
        }
      ],
      elcrzds: {
        tradeMemCode: "0000501763",
        subAccount: "201907081640352362",
        currency: "CNY"
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
        tradeMemCode: _this.elcrzds.tradeMemCode,
        subAccount: _this.elcrzds.subAccount,
        currency: _this.elcrzds.currency
      };
      _this.$refs[formName].validate(valid => {
        if (valid) {
          queryCash(ls).then(res => {
            _this.tabledata.push(res);
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

<style scoped>
.golden /deep/ .el-date-editor.el-input {
  width: 192px;
}
</style>
