const getters = {
  userlogin: state => {
    return state.userlogin.role
  },
  permission: state => {
    return state.permission.routes
  },
  visitedViews: state => {
    return state.tagsView.visitedViews
  },
  sidebar: state => {
    return state.app.sidebar
  },
  size: state => {
    return state.app.size
  },
  device: state => {
    return state.app.device
  }
}
export default getters
