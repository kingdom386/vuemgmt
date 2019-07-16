<template>
  <div>
    <el-form inline ref="countdetail" :model="countdetail" :rules="rules">
      <el-form-item label="支付单号:" prop="payCode">
        <el-input placeholder="支付单号" clearable v-model="countdetail.payCode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="init('countdetail')">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tabledata" border stripe style="width: 100%;" height="500">
      <el-table-column label="支付单号" prop="payCode"></el-table-column>
      <el-table-column label="支付单状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.payState === '1'">成功</el-tag>
          <el-tag type="danger" v-else-if="scope.row.payState === '2'">失败</el-tag>
          <el-tag type="info" v-else-if="scope.row.payState === '3'">未知</el-tag>
          <el-tag type="success" v-else-if="scope.row.payState === '4'">出金成功，大额转出已受理</el-tag>
          <el-tag type="danger" v-else-if="scope.row.payState === '5'">出金成功，大额系统失败</el-tag>
          <el-tag type="warning" v-else-if="scope.row.payState === '6'">出金失败，转大额成功</el-tag>
          <el-tag type="warning" v-else-if="scope.row.payState === '7'">出金失败，转大额未知</el-tag>
          <el-tag type="primary" v-else-if="scope.row.payState === '8'">待调账</el-tag>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="备注1" prop="remark1"></el-table-column>
      <el-table-column label="备注2" prop="remark2"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabledata: [],
      countdetail: {
        payCode: ""
      },
      rules: {
        payCode: [
          { required: true, message: "请输入支付单号！", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    init(formName) {
      const _this = this;
      _this.$refs[formName].validate(valid => {
        console.log(valid);
      });
    }
  }
};
</script>
