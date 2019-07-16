import fetch from '@/utils/fetch'

export function tablelist(params) {
  return fetch({
    url: "/subcountlist",
    method: "post",
    params
  })
}

export function customelist(params) {
  return fetch({
    url: "/customelist",
    method: "post",
    params
  })
}
// 以上为模拟数据
// 账户子账户查询
export function checksubcount(data) {
  return fetch({
    url: "/merchant/101020",
    method: "post",
    data
  })
}

// 客户签约信息查询
export function checkcustome(data) {
  return fetch({
    url: "/merchant/101040",
    method: "post",
    data
  })
}

// 子账户绑定出入金结果查询
export function checkbindmoney(data) {
  return fetch({
    url: "/merchant/101080",
    method: "post",
    data
  })
}
// 商户信息查询
export function checkbusiness(data) {
  return fetch({
    url: "/merchant/101090",
    method: "post",
    data
  })
}

// 批量支付结果查询
export function checkbatchpay(data) {
  return fetch({
    url: "/merchant/102030",
    method: "post",
    data
  })
}

// 批量结息结果查询
export function checkinterestsettled(data) {
  return fetch({
    url: "/merchant/102070",
    method: "post",
    data
  })
}

// 商户本行出金审核结果查询
export function queryDeposit(data) {
  return fetch({
    url: "/merchant/103030",
    method: "post",
    data
  })
}

// 991转账入金电子账户查询
export function queryElectronic(data) {
  return fetch({
    url: "/merchant/103120",
    method: "post",
    data
  })
}

// 991转账入金待入账信息查询
export function queryCash(data) {
  return fetch({
    url: "/merchant/103130",
    method: "post",
    data
  })
}

// 账户余额查询
export function checkbalance(data) {
  return fetch({
    url: "/merchant/104020",
    method: "post",
    data
  })
}

// 子账户交易明细
export function checktradedetail(data) {
  return fetch({
    url: "/merchant/104030",
    method: "post",
    data
  })
}

// 支付单状态查询
export function checkpaystate(data) {
  return fetch({
    url: "/merchant/104040",
    method: "post",
    data
  })
}

// 账户计息查询
export function queryinterest(data) {
  return fetch({
    url: "/merchant/104060",
    method: "post",
    data
  })
}

// 子账户交易流水查询
export function queryflowing(data) {
  return fetch({
    url: "/merchant/104080",
    method: "post",
    data
  })
}
// 子账户交易明细查询
export function querytrading(data) {
  return fetch({
    url: "/merchant/104090",
    method: "post",
    data
  })
}
// 存管户当日交易明细查询
export function daytrade(data) {
  return fetch({
    url: "/merchant/104100",
    method: "post",
    data
  })
}
// 存管户历史交易明细查询
export function historytrade(data) {
  return fetch({
    url: "/merchant/104110",
    method: "post",
    data
  })
}
