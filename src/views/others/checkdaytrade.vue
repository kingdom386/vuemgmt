<template>
  <div>
    <el-form inline ref="daytrade" :model="daytrade" :rules="rules">
      <el-row>
        <el-col :span="6">
          <el-form-item label="金额下限:" prop="minAmt">
            <el-input placeholder="金额下限" clearable v-model="daytrade.minAmt" maxlength="17"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="金额上限:" prop="maxAmt">
            <el-input placeholder="金额上限" clearable v-model="daytrade.maxAmt" maxlength="17"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交易币种:" prop="tradeCurrency">
            <el-select v-model="daytrade.tradeCurrency" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账户类型:" prop="accountType">
            <el-select v-model="daytrade.accountType" filterable clearable placeholder="请选择">
              <el-option
                v-for="(item, index) in options1"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="querydaytrade('daytrade')">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="daytradedata">
      <el-table-column prop="resultFileName" label="回执文件名"></el-table-column>
      <el-table-column prop="recordNum" label="总笔数"></el-table-column>
      <el-table-column prop="remark1" label="备注1"></el-table-column>
      <el-table-column prop="remark2" label="备注2"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { daytrade } from '@/api/table/subcounttable'
export default {
  data() {
    const checkminAmt = (rule, value, callback) => {
      const reg = /^([1-9][\d]{0,700000}|0)(\.[\d]{1,2})?$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("输入的金额有误！"));
      }
    };
    return {
      daytradedata: [],
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
          label: "资金监管账户",
          value: "9"
        }
      ],
      daytrade: {
        minAmt: "",
        maxAmt: "",
        tradeCurrency: "",
        accountType: ""
      },
      rules: {
        minAmt: [
          { required: true, message: "金额下限不可为空！", trigger: "blur" },
          { validator: checkminAmt, trigger: "blur" }
        ],
        maxAmt: [
          { required: true, message: "金额上限不可为空！", trigger: "blur" },
          { validator: checkminAmt, trigger: "blur" }
        ],
        tradeCurrency: [
          { required: true, message: "请选择交易币种！", trigger: "change" }
        ],
        accountType: [
          { required: true, message: "请选择账户类型！", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    querydaytrade(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        console.log(valid);
        const ls = {
          merchantNo: window.merchantNo,
          minAmt: _this.daytrade.minAmt,
          maxAmt: _this.daytrade.maxAmt,
          tradeCurrency: _this.daytrade.tradeCurrency,
          accountType: _this.daytrade.accountType
        }
        daytrade(ls).then(res => {
          console.log(res);
        })
      });
    }
  }
};
</script>
