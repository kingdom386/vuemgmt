<template>
  <div>
    <el-row>
      <el-form inline :model="interest" ref="interest">
        <el-col :span="7">
          <el-form-item label="交易会员代码:">
            <el-input placeholder="交易会员代码" v-model="interest.memBerCode" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="checkform('interest')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="interestdata" border strip style="width: 100%">
      <el-table-column prop="subAccintHfrozen" label="待结转利息">
      </el-table-column>
      <el-table-column prop="subAccintNum" label="利息积数">
      </el-table-column>
      <el-table-column prop="lastIntDate" label="上次计息日期">
      </el-table-column>
      <el-table-column prop="remark1" label="备注1">
      </el-table-column>
      <el-table-column prop="remark2" label="备注2">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { queryinterest } from '@/api/table/subcounttable'
export default {
  data() {
    return {
      interestdata: [],
      interest: {
        memBerCode: ""
      }
    };
  },
  mounted() {
  },
  methods: {
    checkform(formName) {
      console.log(this.interest.memBerCode);
      queryinterest({merchantNo: window.merchantNo, memBerCode: this.interest.memBerCode}).then(res => {
        this.interestdata.push(res)
      })
    }
  }
};
</script>
