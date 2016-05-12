import Token from './token'
import {find} from '../util'

export default class EdgeToken extends Token {
  id = 'edge'
  lbp = 100

  static match (string, locale) {
    return find(locale.edge, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.edge, string) > 0 ? 1 : -1
    super(value)
  }

  nud ({tokens}) {
    return {tokens, tree: this}
  }

  eval () {
    return {
      type: 'edge',
      value: this.value
    }
  }

  toString () {
    return `(edge_${this.value})`
  }
}
