import { withLogger } from '@hyperapp/logger';

export const hyperlog = withLogger({ log(prevState, action, nextState) {
  console.groupCollapsed('%c[hyperapp] action', 'font-weight: lighter;', action.name)
  console.log('%c prev state', 'color: #9E9E9E; font-weight: bold;', prevState)
  console.log('%c data', 'color: #03A9F4; font-weight: bold;', action.data)
  console.log('%c next state', 'color: #4CAF50; font-weight: bold;', nextState)
  console.groupEnd()
  }
});
