<template>
  <div>
    <el-form inline ref="flowing" :model="flowing" :rules="rules">
      <el-row>
        <el-col :span="6">
          <el-form-item label="查询方式:" prop="queryMode">
            <el-select v-model="flowing.queryMode" clearable>
              <el-option label="按照交易日期查询" value="1"></el-option>
              <el-option label="按照交易时间查询" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- 按照交易日期查询 -->
        <el-col :span="12">
          <el-form-item label="日期:" v-if="flowing.queryMode === '1'" required>
            <el-row>
              <el-col :span="11">
                <el-form-item prop="startTimes">
                  <el-date-picker
                    value-format="yyyyMMdd"
                    v-model="flowing.startTimes"
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
                    v-model="flowing.endTimes"
                    type="date"
                    placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 按照交易时间查询 -->
          <el-form-item label="日期:" v-if="flowing.queryMode === '2'">
            <el-row>
              <el-col :span="11">
                <el-form-item prop="startTimes">
                  <el-date-picker value-format="yyyyMMddHHmmss" v-model="flowing.startTimes" type="datetime" placeholder="开始时间"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="1">-</el-col>
              <el-col :span="11" prop="endTimes">
                <el-date-picker value-format="yyyyMMddHHmmss" v-model="flowing.endTimes" type="datetime" placeholder="结束时间"></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易类型:" prop="appType">
            <el-select v-model="flowing.appType" clearable>
              <el-option label="全部" value="0"></el-option>
              <el-option label="入金" value="1"></el-option>
              <el-option label="出金" value="2"></el-option>
              <el-option label="支付" value="3"></el-option>
              <el-option label="资金冻结" value="4"></el-option>
              <el-option label="资金解冻" value="5"></el-option>
              <el-option label="入金同步" value="6"></el-option>
              <el-option label="出金同步" value="7"></el-option>
              <el-option label="结息" value="8"></el-option>
              <el-option label="991转账入金" value="9"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" @click="queryflowings('flowing')">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="flowingdata">
      <el-table-column label="序号" prop="order"></el-table-column>
      <el-table-column width="150px" label="子账号" prop="subAccount"></el-table-column>
      <el-table-column width="130px" label="支付单号" prop="payCode"></el-table-column>
      <el-table-column label="交易码" prop="transCode"></el-table-column>
      <el-table-column width="140px" label="付款账号" prop="payAcc"></el-table-column>
      <el-table-column label="付款账户名称" prop="payAccName"></el-table-column>
      <el-table-column label="付款方开户行名称" prop="payOpenBank"></el-table-column>
      <el-table-column label="收款账号" prop="revAcc"></el-table-column>
      <el-table-column label="收款账户名称" prop="revAccName"></el-table-column>
      <el-table-column label="收款方开户行名称" prop="revOpenBank"></el-table-column>
      <el-table-column label="交易额" prop="totalAmt"></el-table-column>
      <el-table-column label="发生额" prop="creMoney"></el-table-column>
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
      <el-table-column label="币种" prop="currCode"></el-table-column>
      <el-table-column label="手续费" prop="feeAmt"></el-table-column>
      <el-table-column label="客户自付手续费" prop="custPayFee"></el-table-column>
      <el-table-column label="商户代付手续费" prop="merchantPayFee"></el-table-column>
      <el-table-column label="错误码" prop="msgId"></el-table-column>
      <el-table-column label="错误信息" prop="msg"></el-table-column>
      <el-table-column label="交易日期" prop="tranDate"></el-table-column>
      <el-table-column label="商户流水号" prop="merchantSeqId"></el-table-column>
      <el-table-column label="交易状态" prop="tranStat"></el-table-column>
      <el-table-column label="处理状态" prop="sysStat"></el-table-column>
      <el-table-column label="子账户余额" prop="subAccountMoney"></el-table-column>
      <el-table-column label="系统流水号" prop="transCodeId"></el-table-column>
      <el-table-column label="交易时间" prop="tradeTimes"></el-table-column>
      <el-table-column label="交易摘要" prop="busiSummary"></el-table-column>
      <el-table-column label="备注1" prop="remark1"></el-table-column>
      <el-table-column label="备注2" prop="remark2"></el-table-column>
      <el-table-column label="备注3" prop="remark3"></el-table-column>
      <el-table-column label="备注4" prop="remark4"></el-table-column>
      <el-table-column label="备注5" prop="remark5"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryflowing } from '@/api/table/subcounttable'
export default {
  data() {
    return {
      flowingdata: [],
      queryparam: {},
      flowing: {
        queryMode: "",
        times: "",
        appType: "",
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
        ],
        appType: [
          {
            required: true,
            message: "请选择支付类型",
            tigger: "chagne"
          }
        ]
      }
    };
  },
  methods: {
    queryflowings(formName) {
      const _this = this;
      _this.flowingdata = []
      _this.$refs[formName].validate(valid => {
        if (valid) {
          if (_this.flowing.queryMode === "1") {
            _this.queryparam = {
              merchantNo: window.merchantNo,
              queryMode: _this.flowing.queryMode,
              startTimes: _this.flowing.startTimes + "000000",
              endTimes: _this.flowing.endTimes + "000000",
              paging: _this.flowing.paging,
              appType: _this.flowing.appType
            };
          } else {
            _this.queryparam = {
              merchantNo: window.merchantNo,
              queryMode: _this.flowing.queryMode,
              startTimes: _this.flowing.startTimes,
              endTimes: _this.flowing.endTimes,
              paging: _this.flowing.paging,
              appType: _this.flowing.appType
            };
          }
          queryflowing(_this.queryparam).then(res => {
            console.log(res);
            _this.flowingdata = res.cycles
          })
        }
      });
    }
  }
};
</script>
