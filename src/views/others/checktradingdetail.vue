<template>
  <div>
    <el-form inline ref="trade" :model="trade" :rules="rules">
      <el-row>
        <el-col :span="6">
          <el-form-item label="查询方式:" prop="queryMode">
            <el-select v-model="trade.queryMode" clearable>
              <el-option label="按照交易日期查询" value="1"></el-option>
              <el-option label="按照交易时间查询" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 按照交易日期查询 -->
        <el-col :span="12">
          <el-form-item label="日期:" v-if="trade.queryMode === '1'" required>
            <el-row>
              <el-col :span="11">
                <el-form-item prop="startTimes">
                  <el-date-picker
                    value-format="yyyyMMdd"
                    v-model="trade.startTimes"
                    type="date"
                    placeholder="开始日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="text-align: center">
                <span>—</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="endTimes">
                  <el-date-picker
                    value-format="yyyyMMdd"
                    v-model="trade.endTimes"
                    type="date"
                    placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 按照交易时间查询 -->
          <el-form-item label="日期:" v-if="trade.queryMode === '2'">
            <el-row>
              <el-col :span="11">
                <el-form-item prop="startTimes">
                  <el-date-picker value-format="yyyyMMddHHmmss" v-model="trade.startTimes" type="datetime" placeholder="开始时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11" prop="endTimes">
                <el-date-picker value-format="yyyyMMddHHmmss" v-model="trade.endTimes" type="datetime" placeholder="结束时间"></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="queryflowings('trade')">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tradingdatas">
      <el-table-column label="序号" prop="order"></el-table-column>
      <el-table-column width="150px" label="子账号" prop="subAccount"></el-table-column>
      <el-table-column width="130px" label="子账号名称" prop="subAccName"></el-table-column>
      <el-table-column label="交易码" prop="transCode"></el-table-column>
      <el-table-column width="140px" label="对方账号" prop="otherSubAccount"></el-table-column>
      <el-table-column label="对方账户名" prop="otherSubAccName"></el-table-column>
      <el-table-column label="发生额" prop="creMoney"></el-table-column>
      <el-table-column label="收付款标志" prop="payPayeeSign"></el-table-column>
      <el-table-column label="子账户余额" prop="subAccountMoney"></el-table-column>
      <el-table-column label="商户流水号" prop="merchantSqlId"></el-table-column>
      <el-table-column label="系统流水号" prop="sysSqlId"></el-table-column>
      <el-table-column label="交易时间" prop="tradeTimes"></el-table-column>
      <el-table-column label="交易类型">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.appType === '1'">入金</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '2'">出金</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '3'">支付</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '4'">资金冻结</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '5'">资金解冻</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '6'">入金同步</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '7'">出金同步</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '8'">结息</el-tag>
          <el-tag type="primary" v-else-if="scope.row.appType === '9'">991转账入金</el-tag>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="支付单号" prop="payOrderid"></el-table-column>
      <el-table-column label="币种" prop="currCode"></el-table-column>
      <el-table-column label="第三方支付手续费" prop="feeAmt"></el-table-column>
      <el-table-column label="对方账号开户行名称" prop="payBankNo"></el-table-column>
      <el-table-column label="交易日期" prop="TranDate"></el-table-column>
      <el-table-column label="子账户冻结余额" prop="FreezeAccbal"></el-table-column>
      <el-table-column label="交易摘要" prop="BusiSummary"></el-table-column>
      <el-table-column label="客户自付手续费" prop="custPayFee"></el-table-column>
      <el-table-column label="商户自付手续费" prop="merchantFee"></el-table-column>
      <el-table-column label="明细标识" prop="FeeFlag">
        <template slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.appType === '1'">记发生金额明细</el-tag>
          <el-tag type="primary" v-if="scope.row.appType === '2'">记客户自付手续费明细</el-tag>
          <el-tag type="primary" v-if="scope.row.appType === '3'">记商户代付手续费明细</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注1" prop="remark1"></el-table-column>
      <el-table-column label="备注2" prop="remark2"></el-table-column>
      <el-table-column label="备注3" prop="remark3"></el-table-column>
      <el-table-column label="备注4" prop="remark4"></el-table-column>
      <el-table-column label="备注5" prop="remark5"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { querytrading } from "@/api/table/subcounttable";
export default {
  data() {
    return {
      tradingdatas: [],
      ishowing: 0,
      queryparam: {},
      trade: {
        queryMode: "",
        times: "",
        startTimes: "",
        endTimes: "",
        paging: 1
      },
      rules: {
        queryMode: [
          {
            required: true,
            message: "请选择查询模式",
            tigger: "chagne"
          }
        ],
        startTimes: [
          {
            required: true,
            message: "请选择你要查询开始日期时间段",
            tigger: "chagne"
          }
        ],
        endTimes: [
          {
            required: true,
            message: "请选择你要查询结束日期时间段",
            tigger: "chagne"
          }
        ]
      }
    };
  },
  methods: {
    queryflowings(formName) {
      const _this = this;
      _this.tradingdatas = [];
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.trade.queryMode === "1") {
            _this.queryparam = {
              merchantNo: window.merchantNo,
              queryMode: _this.trade.queryMode,
              startTimes: _this.trade.startTimes + "000000",
              endTimes: _this.trade.endTimes + "000000",
              paging: _this.trade.paging,
              appType: _this.trade.appType
            };
          } else {
            _this.queryparam = {
              merchantNo: window.merchantNo,
              queryMode: _this.trade.queryMode,
              startTimes: _this.trade.startTimes,
              endTimes: _this.trade.endTimes,
              paging: _this.trade.paging,
              appType: _this.trade.appType
            };
          }
          querytrading(_this.queryparam).then(res => {
            _this.tradingdatas = res.cycles;
          });
        }
      });
    }
  }
};
</script>
