const actions = {
  setBootScreenState: value => state => ({ showBootScreen: value }),
  setMode: value => state => ({ mode: value }),

  settings: {
    setVisibility: value => state => ({ isVisible: !state.isVisible })
  }
}

export default actions