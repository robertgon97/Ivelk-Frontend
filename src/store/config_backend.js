export default {
  state: {
    getAppConfig: null,
  },
  mutations: {
    setgetAppConfig: (state, value) => {
      state.getAppConfig = value
    }
  },
  getters: {
    getgetAppConfig: (state) => {
      return state.getAppConfig
    }
  }
}
