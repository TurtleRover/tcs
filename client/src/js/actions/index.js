const actions = {
  setBootScreenState: value => state => ({ showBootScreen: value }),
  setMode: value => state => ({ mode: value }),

  settings: {
    setVisibility: value => state => ({ isVisible: !state.isVisible }),
    setVisibleCategory: value => state => ({ category: value })
  }
}

export default actions