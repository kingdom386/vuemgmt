<template>
  <div>
    <el-form inline ref="historytrade" :model="historytrade" :rules="rules">
      <el-row>
        <el-col :span="7">
          <el-form-item prop="startDate" label="开始日期:">
            <el-date-picker
              value-format="yyyyMMdd"
              v-model="historytrade.startDate"
              type="date"
              clearable
              placeholder="开始日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="endDate" label="结束日期:">
            <el-date-picker
              value-format="yyyyMMdd"
              v-model="historytrade.endDate"
              type="date"
              clearable
              placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="金额下限:" prop="minAmt">
            <el-input placeholder="金额下限" clearable v-model="historytrade.minAmt" maxlength="17"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="金额上限:" prop="maxAmt">
            <el-input placeholder="金额上限" clearable v-model="historytrade.maxAmt" maxlength="17"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="交易币种:" prop="tradeCurrency">
            <el-select v-model="historytrade.tradeCurrency" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="账户类型:" prop="accountType">
            <el-select v-model="historytrade.accountType" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="收付标志:" prop="payPayeeSign">
            <el-select v-model="historytrade.payPayeeSign" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="queryflowings('historytrade')">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="historydata">
      <el-table-column label="总笔数" prop="recordNum"></el-table-column>
      <el-table-column width="150px" label="备注1" prop="remark1"></el-table-column>
      <el-table-column width="130px" label="备注2" prop="remark2"></el-table-column>
      <el-table-column label="回执文件名" prop="resultFileName"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { historytrade } from "@/api/table/subcounttable";
export default {
  data() {
    const checkminAmt = (rule, value, callback) => {
      const reg = /^([1-9][\d+]{0,200}|0)(\.[\d]{1,2})?$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("输入的金额有误！"));
      }
    };
    return {
      historydata: [],
      queryparam: {},
      historytrade: {
        startDate: "",
        endDate: "",
        minAmt: "",
        maxAmt: "",
        tradeCurrency: "",
        accountType: "",
        payPayeeSign: ""
      },
      rules: {
        startDate: [
          {
            required: true,
            message: "请选择你要查询开始日期时间段",
            tigger: "chagne"
          }
        ],
        endDate: [
          {
            required: true,
            message: "请选择你要查询结束日期时间段",
            tigger: "chagne"
          }
        ],
        minAmt: [
          { required: true, message: "请输入金额下限", tigger: "blur" },
          { validator: checkminAmt, trigger: "blur" }
        ],
        maxAmt: [
          { required: true, message: "金额上限不可为空！", trigger: "blur" },
          { validator: checkminAmt, trigger: "blur" }
        ],
        tradeCurrency: [
          { required: true, message: "请选择交易币种", trigger: "blur" }
        ],
        accountType: [
          { required: true, message: "请选择收付标志", trigger: "blur" }
        ],
        payPayeeSign: [
          { required: true, message: "请选择收付标志", trigger: "change" }
        ]
      },
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
      options1: [
        {
          value: "9",
          label: "资金监管账户"
        }
      ],
      options2: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "付"
        },
        {
          value: "2",
          label: "收"
        }
      ]
    };
  },
  methods: {
    queryflowings(formName) {
      const _this = this;
      _this.historydata = [];
      _this.$refs[formName].validate(valid => {
        if (valid) {
          _this.queryparam = {
            merchantNo: window.merchantNo,
            startDate: _this.$moment(_this.historytrade.startDate).format("YYYYMMDD"),
            endDate: _this.$moment(_this.historytrade.endDate).format("YYYYMMDD"),
            minAmt: _this.historytrade.minAmt,
            maxAmt: _this.historytrade.maxAmt,
            tradeCurrency: _this.historytrade.tradeCurrency,
            accountType: _this.historytrade.accountType,
            payPayeeSign: _this.historytrade.payPayeeSign
          };
          historytrade(_this.queryparam).then(res => {
            _this.historydata.push(res);
          });
        }
      });
    }
  }
};
</script>
