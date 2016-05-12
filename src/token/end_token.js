import Token from './token'

export default class EndToken extends Token {
  id = 'end'
  lbp = 0

  toString () {
    return '$'
  }
}
