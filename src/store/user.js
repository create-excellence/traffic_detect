export var store = {
  state: {
    token: '',
  },
  setToken(newValue) {
    this.state.token = newValue
  },
  clearToken() {
    this.state.toekn = ''
  },
}
