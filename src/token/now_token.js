import Token from './token'
import {find} from '../util'

export default class NowToken extends Token {
  id = 'now'

  static match (string, locale) {
    return find(locale.now, string) >= 0
  }

  nud ({tokens}) {
    return {tokens, tree: this}
  }

  eval () {
    return {type: 'date', value: new Date()}
  }
}
