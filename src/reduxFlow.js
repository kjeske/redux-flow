export const reduxFlow = reduxFlows => store => next => action => {
  for (const flow of reduxFlows) {
    if (flow.predicate(action.type)) {
      flow.handler(action, store.dispatch);
    }
  }

  return next(action)
}

export const handle = (pattern, handler) => ({
  handler: handler,
  predicate: getActionTypePredicate(pattern)
})

const getActionTypePredicate = (pattern) => {
  if (!pattern) {
    throw new Error("Wrong pattern")
  }

  if (typeof pattern === 'function') {
    return pattern;
  }

  if (typeof pattern === 'string') {
    return (actionType) => pattern === "*" || pattern === actionType;
  }

  if (Array.isArray(pattern)) {
    return (actionType) => pattern.indexOf(actionType) !== -1;
  }
}
