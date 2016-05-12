export function endOfExpression ({tokens}, rbp) {
  return tokens[0].lbp <= rbp
}

function leftBoundExpression ({tokens, tree}, rbp) {
  if (endOfExpression({tokens}, rbp)) {
    return {tokens, tree}
  } else {
    const [token, ...rest] = tokens
    const result = token.led({tokens: rest, tree})
    return leftBoundExpression(result, rbp)
  }
}

export function expression ({tokens}, rbp = 0) {
  const [token, ...rest] = tokens
  const result = token.nud({tokens: rest})
  return leftBoundExpression(result, rbp)
}

// TODO: remove
export function advance ({tokens, tree}, id) {
  const [token, ...rest] = tokens
  if (id && !token.is(id)) {
    throw new Error(`Expected token: ${id}, received instead: ${token.toString()}`)
  }

  return {tokens: rest, tree}
}

export function find (array, string) {
  return array.findIndex(e => e.split('|').indexOf(string) >= 0)
}
