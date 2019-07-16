<template>
  <div>
    <el-form ref="bussiness" :model="bussiness" :rules="rules" :inline="true" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="币种:" prop="currency">
            <el-select v-model="bussiness.currency" filterable clearable placeholder="请选择">
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
          <el-form-item>
            <el-button type="primary" @click="checkform('bussiness')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tables">
      <el-table :data="businessdata" stripe border style="width: 100%" height="500">
        <el-table-column label="商户代码" prop="merchantNo" width="100px"></el-table-column>
        <el-table-column label="企业性质" prop="companyProperty"></el-table-column>
        <el-table-column label="经营范围" prop="creadScope"></el-table-column>
        <el-table-column label="营业执照" prop="businesLicence" width="160px"></el-table-column>
        <el-table-column label="商户地址" prop="commercialAddr"></el-table-column>
        <el-table-column label="邮政编码" prop="chinaCode"></el-table-column>
        <el-table-column label="商户主页URL" prop="commercialUrl"></el-table-column>
        <el-table-column label="法人代表姓名" prop="legalBusinessName"></el-table-column>
        <el-table-column label="法人代表证件类型">
          <template slot-scope="scope">
            <span v-if="scope.row.legalPapersType === '10'">
              <el-tag type="primary">身份证</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '11'">
              <el-tag type="primary">护照</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '12'">
              <el-tag type="primary">军官证</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '13'">
              <el-tag type="primary">士兵证</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '14'">
              <el-tag type="primary">回乡证</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '15'">
              <el-tag type="primary">户口本</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '16'">
              <el-tag type="primary">营业执照</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '17'">
              <el-tag type="primary">组织机构代码证</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '19'">
              <el-tag type="primary">外国护照</el-tag>
            </span>
            <span v-else-if="scope.row.legalPapersType === '20'">
              <el-tag type="primary">其他</el-tag>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="法人代表身份证件代码" width="160px" prop="legalPapersCode"></el-table-column>
        <el-table-column label="联系人" prop="contact"></el-table-column>
        <el-table-column label="联系电话" prop="contactPhone"></el-table-column>
        <el-table-column label="传真号码" prop="faxCode"></el-table-column>
        <el-table-column label="邮箱地址" prop="emailAddr"></el-table-column>
        <el-table-column label="商户交易平台IP地址" prop="businessIp"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.State === '0'">需要</el-tag>
            <el-tag v-else>停用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="商户日切日期" prop="commercialEndDay"></el-table-column>
        <el-table-column label="接口URL" prop="interUrl" width="150px"></el-table-column>
        <el-table-column label="客户经理代码" prop="cusManagerCode"></el-table-column>
        <el-table-column label="客户经理地区号" prop="cusManagerArea"></el-table-column>
        <el-table-column label="客户经理姓名" prop="cusManagerName"></el-table-column>
        <el-table-column label="是否需要短信服务">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.IsMessagerSever === '1'">需要</el-tag>
            <el-tag v-else-if="scope.row.IsMessagerSever === '2'">不需要</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="交易平台短信通知手机号码" prop="tradeMessagerPhone"></el-table-column>
        <el-table-column label="出金暂停标志">
          <template slot-scope="scope">
            <span v-if="scope.row.isStopOutMoney === '0'">正常</span>
            <span v-if="scope.row.isStopOutMoney === '1'">交易市场出金暂停</span>
            <span v-if="scope.row.isStopOutMoney === '2'">交易商出金暂停</span>
            <span v-if="scope.row.isStopOutMoney === '3'">全部暂停</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="入金暂停标">
          <template slot-scope="scope">
            <span v-if="scope.row.isStopInMoney === '0'">正常</span>
            <span v-if="scope.row.isStopInMoney === '1'">暂停</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="资金变动短信开关">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.isMoneyModifyState === '1'">允许发送短信</el-tag>
            <el-tag type="info" v-if="scope.row.isMoneyModifyState === '0'">不发送短信</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="接入方式">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.linkWay === '1'">互联网</el-tag>
            <el-tag type="info" v-if="scope.row.linkWay === '2'">专线</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="结算费商户占比" prop="settleAccountRatio"></el-table-column>
        <el-table-column label="结算费交易会员占比" prop="settleMemoRatio"></el-table-column>
        <el-table-column label="出入金账户授权标志" prop="inOutOuathSign"></el-table-column>
        <el-table-column label="子帐号" prop="subAccount"></el-table-column>
        <el-table-column label="出入金帐号" prop="outComeAccount"></el-table-column>
        <el-table-column label="出入金账户名" prop="outComeAccountName"></el-table-column>
        <el-table-column label="出入金开户行" prop="outComeAccountBank"></el-table-column>
        <el-table-column label="出入金账户证件类型">
          <template slot-scope="scope">
            <span v-if="scope.row.outComeAccountIDType === '10'">
              <el-tag type="primary">身份证</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '11'">
              <el-tag type="primary">护照</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '12'">
              <el-tag type="primary">军官证</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '13'">
              <el-tag type="primary">士兵证</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '14'">
              <el-tag type="primary">回乡证</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '15'">
              <el-tag type="primary">户口本</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '16'">
              <el-tag type="primary">营业执照</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '17'">
              <el-tag type="primary">组织机构代码证</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '19'">
              <el-tag type="primary">外国护照</el-tag>
            </span>
            <span v-else-if="scope.row.outComeAccountIDType === '20'">
              <el-tag type="primary">其他</el-tag>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="出入金账户证件号码" prop="outComeAccountIDCode"></el-table-column>
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
import { checkbusiness } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
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
      businessdata: [],
      bussiness: {
        currency: "CNY"
      },
      rules: {
        currency: [
          { required: true, message: "请选择币种!", trigger: "change" }
        ]
      },
      page: {
        currentPage: 1,
        pagesize: 25,
        total: 0
      },
      token: cookie.get("token")
    };
  },
  created() {
    this.initdom();
  },
  methods: {
    initdom() {
      const _this = this;
      _this.businessdata = [];
      const ls = {
        merchantNo: window.merchantNo,
        currency: _this.bussiness.currency
      };
      checkbusiness(ls).then(res => {
        _this.businessdata.push(res);
      });
    },
    // 查询
    checkform(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        if (valid) {
          this.initdom();
        }
      });
    },
    // 重置
    resetform(formName) {
      this.$refs[formName].resetFields();
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
