// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }],
    "semi": [0, "always"],//语句强制分号结尾
    "quotes": [0, "single"],//引号类型 `` "" ''
    "func-call-spacing": 0,
    "no-spaced-func": 0,//函数调用时 函数名与()之间不能有空格
    "space-before-function-paren": 0,//函数定义时括号前面要不要有空格
    "generator-star-spacing": 0,//生成器函数*的前后空格
  }
}
