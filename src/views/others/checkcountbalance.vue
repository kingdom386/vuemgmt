<template>
  <div>
    <el-form inline ref="countbalance" :model="countbalance" :rules="rules">
      <el-form-item label="账户类别:" prop="accountType">
        <el-select v-model="countbalance.accountType">
          <el-option label="子账户" value="1"></el-option>
          <el-option label="实体账户" value="2"></el-option>
          <el-option label="资金监管账户" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="账号:">
        <el-input placeholder="账号" v-model="countbalance.account"></el-input>
      </el-form-item>
      <el-form-item label="交易会员代码:">
        <el-input placeholder="交易会员代码" v-model="countbalance.MemBerCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="balancedata" stripe border style="width: 100%">
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="accountName" label="账户名称"></el-table-column>
      <el-table-column prop="subAccountMoney" label="子账户余额"></el-table-column>
      <el-table-column prop="freezeMoney" label="冻结金额"></el-table-column>
      <el-table-column prop="remark1" label="备注1"></el-table-column>
      <el-table-column prop="remark2" label="备注2"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { checkbalance } from "@/api/table/subcounttable";
export default {
  data() {
    return {
      balancedata: [],
      countbalance: {
        account: "",
        memBerCode: "",
        accountType: "3"
      },
      rules: {
        accountType: [
          {required: true, message: "请选择账户类别！", trigger: 'change'}
        ]
      }
    };
  },
  methods: {
    init() {
      const _this = this;
      _this.balancedata = [];
      const ls = {
        merchantNo: window.merchantNo,
        account: _this.countbalance.account,
        memBerCode: _this.countbalance.memBerCode,
        accountType: _this.countbalance.accountType
      }
      checkbalance(ls).then(res => {
        _this.balancedata.push(res);
      });
    }
  }
};
</script>
