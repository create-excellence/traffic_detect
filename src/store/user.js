export var store = {
  state: {
    token: '',
    webSocket: {
      cid: '',
      socket: ''
    },
  },
  setToken(newValue) {
    this.state.token = newValue
  },
  clearToken() {
    this.state.toekn = ''
  },
  setWebSocket(v) {
      this.state.webSocket = v
  }
}
