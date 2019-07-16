import vue from 'vue';
import vx from 'vuex';
import app from './modules/app'
import userlogin from './modules/userlogin'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

vue.use(vx);
const store = new vx.Store({
  modules: { app, userlogin, tagsView, permission, settings },
  getters
})

export default store
