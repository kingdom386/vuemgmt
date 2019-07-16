<template>
  <div>
    <el-form ref="bindmoney" :model="bindmoney" :rules="rules" inline>
      <el-form-item label="子账户号:" prop="subAccount">
        <el-input placeholder="子账户号" v-model="bindmoney.subAccount"></el-input>
      </el-form-item>
      <el-form-item label="交易会员代码:" prop="tradeMemCode">
        <el-input placeholder="交易会员代码" v-model="bindmoney.tradeMemCode"></el-input>
      </el-form-item>
      <el-form-item label="出入金账户类别:" prop="outComeAccountType">
        <el-select v-model="bindmoney.outComeAccountType">
          <el-option label="出入金" value="0"></el-option>
          <el-option label="白名单1" value="1"></el-option>
          <el-option label="白名单2" value="2"></el-option>
          <el-option label="白名单3" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="checkRow('bindmoney')">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="tables">
      <el-table :data="binddata" stripe border style="width: 100%" height="500">
        <el-table-column label="序号" prop="order"></el-table-column>
        <el-table-column width="140px" label="子账号" prop="subAccount"></el-table-column>
        <el-table-column width="100px" label="交易会员代码" prop="tradeMemCode"></el-table-column>
        <el-table-column label="商户代码" prop="merchantNo"></el-table-column>
        <el-table-column label="出入金账户类别">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.outComeAccountType === '0'">出入金</el-tag>
            <el-tag type="primary" v-else-if="scope.row.outComeAccountType === '1'">白名单1</el-tag>
            <el-tag type="primary" v-else-if="scope.row.outComeAccountType === '2'">白名单2</el-tag>
            <el-tag type="primary" v-else>白名单3</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="对公或对私">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.isOther === '1'">公司</el-tag>
            <el-tag type="success" v-else>个人</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="卡号/账号标识">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.accountSign === '0'">卡号</el-tag>
            <el-tag type="success" v-else>账号</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否跨行" prop="isOtherBank">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.accountSign === '0'">华夏银行</el-tag>
            <el-tag type="warning" v-else>其他银行</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="结算账号户名" prop="settleAccountName"></el-table-column>
        <el-table-column width="150px" label="结算账号" prop="settleAccount"></el-table-column>
        <el-table-column label="支付系统行号" prop="payBank"></el-table-column>
        <el-table-column label="开户行名称" prop="bankName"></el-table-column>
        <el-table-column label="变更日期" prop="modifyDate"></el-table-column>
        <el-table-column label="授权完成时间" prop="ouathEndTimes"></el-table-column>
        <el-table-column label="绑定状态" prop="linkState">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.accountSign === '0'">正常</el-tag>
            <el-tag type="danger" v-else>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="授权渠道" prop="ouathWay"></el-table-column>
        <el-table-column label="备注1" prop="remark1"></el-table-column>
        <el-table-column label="备注2" prop="Rremark2"></el-table-column>
      </el-table>
    </div>
    <!-- tables -->
  </div>
</template>

<script>
import { checkbindmoney } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
      binddata: [],
      token: cookie.get("token"),
      bindmoney: {
        merchantNo: "",
        subAccount: "201907081640352362",
        tradeMemCode: "0000501763",
        outComeAccountType: "0"
      },
      rules: {
        subAccount: [
          { required: true, message: "请输入子账号！", trigger: "blur" }
        ],
        tradeMemCode: [
          { required: true, message: "请输入交易会员代码！", trigger: "blur" }
        ],
        outComeAccountType: [
          {
            required: true,
            message: "请选择出入金账户类别！",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    checkRow(formName) {
      const _this = this;
      const ls = {
        merchantNo: window.merchantNo,
        subAccount: _this.bindmoney.subAccount,
        tradeMemCode: _this.bindmoney.tradeMemCode,
        outComeAccountType: _this.bindmoney.outComeAccountType
      };
      _this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          checkbindmoney(ls).then(res => {
            _this.binddata = res.cycles || [];
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tables {
  clear: both;
}
</style>
