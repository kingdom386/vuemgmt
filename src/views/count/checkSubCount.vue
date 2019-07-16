<template>
  <div class="subcount">
    <el-form ref="subcount" :model="subcount" :inline="true" label-width="100px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="开始日期:" prop="startTimes">
            <el-date-picker
              class="datepicker"
              value-format="yyyyMMdd"
              v-model="subcount.startTimes"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="截止日期:" prop="endTimes">
            <el-date-picker
              value-format="yyyyMMdd"
              v-model="subcount.endTimes"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="子账号:" prop="subAccount">
            <el-input placeholder="子账号" maxlength="20" clearable v-model="subcount.subAccount"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="上级会员代码:" prop="gradeCode">
            <el-input placeholder="上级会员代码" maxlength="10" clearable v-model="subcount.gradeCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="交易会员代码:" prop="memBerCode">
            <el-input v-model="subcount.memBerCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item>
            <el-button type="primary" @click="checkform('subcount')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="tables">
      <el-table :data="list" stripe border style="width: 100%" height="520">
        <el-table-column label="序号" prop="orders" width="100px"></el-table-column>
        <el-table-column width="150px" label="子账号" prop="subAccount"></el-table-column>
        <el-table-column label="交易会员名称" prop="tradeMemBerName"></el-table-column>
        <el-table-column width="100px" label="交易会员代码" prop="memBerCode"></el-table-column>
        <el-table-column label="交易会员级别" prop="tradeMemBerGrade"></el-table-column>
        <el-table-column label="上级会员代码" prop="gradeCode"></el-table-column>
        <el-table-column label="商户代码" prop="merchantNo"></el-table-column>
        <el-table-column label="子账号开户时间" prop="subAccountTime"></el-table-column>
        <el-table-column label="子账户当前状态">
          <template slot-scope="scope">
            <span v-if="scope.row.subAccountState === '0'">
              <el-tag type="success">正常</el-tag>
            </span>
            <span v-else-if="scope.row.subAccountState === '1'">
              <el-tag type="info">禁用</el-tag>
            </span>
            <span v-else-if="scope.row.subAccountState === '2'">
              <el-tag type="danger">销户</el-tag>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="contact"></el-table-column>
        <el-table-column label="联系电话" prop="contactPhone"></el-table-column>
        <el-table-column width="120px" label="手机号码" prop="phone"></el-table-column>
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
        <el-table-column width="155px" label="证件代码" prop="papersCode"></el-table-column>
        <el-table-column label="是否需要短信通知" prop="isMessager">
          <template slot-scope="scope">
            <span v-if="scope.row.isMessager === '1'">
              <el-tag type="primary">需要</el-tag>
            </span>
            <span v-else-if="scope.row.isMessager === '2'">
              <el-tag type="danger">不需要</el-tag>
            </span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column label="短信通知手机号码" prop="messagePhone"></el-table-column>
        <el-table-column width="160px" label="Email" prop="email"></el-table-column>
        <el-table-column label="备注1" prop="remark1"></el-table-column>
        <el-table-column label="备注2" prop="remark2"></el-table-column>
        <el-table-column label="备注3" prop="remark3"></el-table-column>
        <el-table-column label="备注4" prop="remark4"></el-table-column>
        <el-table-column label="备注5" prop="remark5"></el-table-column>
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
import { checksubcount } from "@/api/table/subcounttable";
import cookie from "js-cookie";

export default {
  data() {
    return {
      tabledata: [],
      list: [],
      dialogTableVisible: false,
      dialogTableBindVisible: false,
      dialogTableBalanceVisible: false,
      dialogTradeVisible: false,
      dialogJxVisible: false,
      merchantNo: window.merchantNo,
      customeinfo: {},
      moneyinfo: {},
      balanceinfo: {},
      tradeinfo: {},
      subcount: {
        startTimes: "",
        endTimes: "",
        subAccount: "",
        gradeCode: "",
        memBerCode: ""
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
      let ls = {
        merchantNo: _this.merchantNo,
        subAccount: _this.subcount.subAccount,
        gradeCode: _this.subcount.gradeCode,
        memBerCode: _this.subcount.memBerCode,
        startTimes: _this.subcount.startTimes,
        endTimes: _this.subcount.endTimes
      };
      checksubcount(ls).then(res => {
        _this.tabledata = res.cycles;
        _this.page.total = parseInt(res.count);
        _this.initlist();
      });
    },
    initlist() {
      const _this = this;
      _this.list = [];
      const startIndex = (_this.page.currentPage - 1) * _this.page.pagesize;
      const endIndex = _this.page.currentPage * _this.page.pagesize;
      const listlong =
        endIndex <= _this.tabledata.length - 1
          ? endIndex
          : _this.tabledata.length;
      for (let s = startIndex; s < listlong; s++) {
        _this.list.push(_this.tabledata[s]);
      }
    },
    // 查询
    checkform(formName) {
      this.initdom()
    },
    handleSizeChange(val) {
      this.page.pagesize = val;
      this.initlist();
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.initlist();
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
.subcount /deep/ .el-date-editor.el-input {
  width: 192px;
}
</style>
