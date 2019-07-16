import cookie from 'js-cookie'
import { login, userinfo } from '@/api/user'

const state = {
  userinfo: "",
  token: "",
  role: ""
}

const mutations = {
  SET_USER_INFO: (state, userinfo) => {
    state.userinfo = userinfo
    if (userinfo.checked) {
      cookie.set('userinfo', JSON.stringify(userinfo))
    }
  },
  SET_USER_TOKEN: (state, usertoken) => {
    state.token = usertoken
    cookie.set('token', usertoken)
  },
  SET_USER_ROLE: (state, role) => {
    state.role = role
    cookie.set('role', role)
  },
  DEL_USER_TOKEN: (state) => {
    state.token = ''
    state.role = ''
    state.userinfo = ''
    cookie.remove('token')
    cookie.remove('role')
    cookie.remove('userinfo')
  }
}

const actions = {
  userlogin({ commit }, userinfo) {
    return new Promise((resolve, reject) => {
      login(userinfo).then(res => {
        commit('SET_USER_INFO', userinfo)
        commit('SET_USER_TOKEN', res.content.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getuserole({ commit }, token) {
    return new Promise((resolve, reject) => {
      userinfo({ token }).then(res => {
        if (res.code === 0) {
          const role = res.content.role || ''
          commit('SET_USER_ROLE', role)
          resolve(role)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({commit}) {
    return new Promise((resolve) => {
      commit('DEL_USER_TOKEN');
      resolve();
    })
  }
}

export default { state, mutations, actions }
