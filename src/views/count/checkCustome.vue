<template>
  <div>
    <el-row>
      <el-form ref="customeform" :model="customeform" :rules="rules" inline>
        <el-form-item label="摊位号:" prop="BoothNo">
          <el-input placeholder="摊位号" v-model="customeform.BoothNo" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkform('customeform')">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="tables">
      <el-table :data="customedata" stripe border style="width: 100%;" height="500">
        <el-table-column label="子账号" prop="subAccount" width="150"></el-table-column>
        <el-table-column label="币种" prop="currency"></el-table-column>
        <el-table-column label="交易会员名称" prop="tradeMemBerName"></el-table-column>
        <el-table-column width="120" label="交易会员代码" prop="memBerCode"></el-table-column>
        <el-table-column label="交易会员级别" prop="tradeMemBerGrade"></el-table-column>
        <el-table-column label="上级会员代码" prop="gradeCode"></el-table-column>
        <el-table-column label="商户代码" prop="merchantNo"></el-table-column>
        <el-table-column label="交易会员性质">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.tradeMemberProperty === '0'" type="success">企业</el-tag>
            <el-tag v-else-if="scope.row.tradeMemberProperty === '1'" type="primary">个人</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="contact"></el-table-column>
        <el-table-column label="联系电话" prop="contactPhone"></el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column label="联系地址" prop="contactAddr"></el-table-column>
        <el-table-column label="法人姓名" prop="businessName"></el-table-column>
        <el-table-column label="证件类型">
          <template slot-scope="scope">
            <span v-if="scope.row.papersType === '10'">
              <el-tag type="info">身份证</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '11'">
              <el-tag type="info">护照</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '12'">
              <el-tag type="info">军官证</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '13'">
              <el-tag type="info">士兵证</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '14'">
              <el-tag type="info">回乡证</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '15'">
              <el-tag type="info">户口本</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '16'">
              <el-tag type="info">营业执照</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '17'">
              <el-tag type="info">组织机构代码证</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '19'">
              <el-tag type="info">外国护照</el-tag>
            </span>
            <span v-else-if="scope.row.papersType === '20'">
              <el-tag type="info">其他</el-tag>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="证件代码" prop="papersCode" width="150px"></el-table-column>
        <el-table-column label="是否需要短信通知">
          <template slot-scope="scope">
            <el-tag type="primary" v-if="scope.row.isMessager === '1'">需要</el-tag>
            <el-tag type="danger" v-if="scope.row.isMessager === '2'">不需要</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="短信通知手机号码" prop="messagePhone"></el-table-column>
        <el-table-column label="Email" prop="email" width="180px"></el-table-column>
        <el-table-column label="结算账号" prop="settleAccount"></el-table-column>
        <el-table-column label="结算账号户名" prop="settleAccountBank"></el-table-column>
        <el-table-column label="支付系统行号" prop="payBank"></el-table-column>
        <el-table-column label="个人/对公类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.othersType === 1">对公</el-tag>
            <el-tag v-else-if="scope.row.othersType === 2">个人</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="卡号/账号标识">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.signBank === 0">卡号</el-tag>
            <el-tag v-else-if="scope.row.signBank === 2">账号</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="跨行标识">
          <template slot-scope="scope">
            <span v-if="scope.row.signOtherBank === '0'">本行</span>
            <span v-else>{{scope.row.signOtherBank}}</span>
          </template>
        </el-table-column>
        <el-table-column label="签约状态">
          <template slot-scope="scope">
            <span v-if="scope.row.signState === '1'">失败</span>
            <span v-else-if="scope.row.signState === '2'">成功</span>
            <span v-else-if="scope.row.signState === '3'">未查询</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="是否授权">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.isOuath === '1'">不需要授权</el-tag>
            <el-tag type="danger" v-if="scope.row.isOuath === '2'">未授权</el-tag>
            <el-tag type="success" v-if="scope.row.isOuath === '3'">已授权</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="授权日期" prop="ouathTimes"></el-table-column>
        <el-table-column label="备注1" prop="remark1"></el-table-column>
        <el-table-column label="备注2" prop="remark2"></el-table-column>
      </el-table>
    </div>
    <!-- tables -->
  </div>
</template>

<script>
import { checkcustome } from "@/api/table/subcounttable";
import cookie from "js-cookie";
export default {
  data() {
    return {
      customedata: [],
      rules: {
        BoothNo: [{ required: true, message: "请输入摊位号", trigger: "blur" }]
      },
      customeform: {
        BoothNo: "354554197508237415"
      },
      token: cookie.get("token")
    };
  },
  methods: {
    // 查询
    checkform(formName) {
      const _this = this;
      _this.customedata = []; // 初始化
      const ls = {
        merchantNo: window.merchantNo || "",
        boothNo: window.merchantNo + _this.customeform.BoothNo || ""
      };
      _this.$refs[formName].validate(valid => {
        if (valid) {
          checkcustome(ls).then(res => {
            _this.customedata.push(res);
          });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.tables {
  clear: both;
}
</style>
