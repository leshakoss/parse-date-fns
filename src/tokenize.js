import tokenRegistry from './token_registry'
import LiteralToken from './token/literal_token'
import EndToken from './token/end_token'

const tokenDelimeter = /,?[ \t\n]/

export default function tokenize (dateString, locale) {
  const substrings = dateString.split(tokenDelimeter)
  let tokens = substrings.map(substring => {
    const MatchedToken = tokenRegistry.find(t => t.match(substring, locale)) || LiteralToken
    return new MatchedToken(substring, locale)
  })
  tokens.push(new EndToken())
  return tokens
}
