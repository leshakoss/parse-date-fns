import Token from './token'
import {find} from '../util'
import {startOfYesterday, startOfToday, startOfTomorrow} from 'date-fns'

export default class RelativeDateToken extends Token {
  id = 'relative date'
  lbp = 80

  static match (string, locale) {
    return find(locale.relativeDates, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.relativeDates, string) - 1
    super(value)
  }

  nud ({tokens}) {
    return {tokens, tree: this}
  }

  eval () {
    const type = 'date'
    if (this.value === -1) {
      return {type, value: startOfYesterday()}
    } else if (this.value === 0) {
      return {type, value: startOfToday()}
    } else {
      return {type, value: startOfTomorrow()}
    }
  }
}
