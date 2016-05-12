import Token from './token'
import {expression, find} from '../util'
import * as add from '../add'

export default class ShiftToken extends Token {
  id = 'shift'
  lbp = 100

  static match (string, locale) {
    return find(locale.shift, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.shift, string) - 1
    super(value)
  }

  nud (prev) {
    const {tokens, tree} = expression(prev, this.lbp)
    this.child = tree
    return {tokens, tree: this}
  }

  eval () {
    const {value, child} = this
    if (child.is('unit')) {
      return {
        type: 'amount',
        value: {
          unit: child.eval().value,
          amount: value
        }
      }
    }

    return child.eval()
  }

  toDate () {
    const {value, child} = this
    if (child.is('weekday')) {
      const date = child.toDate()
      return add.week(date, value)
    } else if (child.is('month')) {
      const date = child.toDate()
      return add.year(date, value)
    } else if (child.is('unit')) {
      const unit = child.eval().value
      const date = add[unit](new Date(), value)
      return date
    } else {
      return child.toDate()
    }
  }

  toString () {
    const showId = {'-1': 'last', '0': 'this', '1': 'next'}[this.value]
    return `(shift_${showId} ${String(this.child || '?')})`
  }
}
