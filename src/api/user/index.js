import fetch from '@/utils/fetch'

export function login(params) {
  return fetch({
    url: "/usertoken",
    method: "post",
    params
  })
}

export function userinfo(params) {
  return fetch({
    url: "/userole",
    method: "post",
    params
  })
}
