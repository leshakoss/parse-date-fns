import Token from './token'
import {find} from '../util'
import {setHours, startOfDay} from 'date-fns'

export default class MeridiemToken extends Token {
  id = 'meridiem'
  lbp = 140

  static match (string, locale) {
    return find(locale.meridiem, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.meridiem, string)
    super(value)
  }

  led ({tokens, tree}) {
    this.child = tree
    return {tokens, tree: this}
  }

  toDate () {
    const {child, value} = this
    if (child.is('number')) {
      const hours = child.value === 12 ? 0 : child.value
      return setHours(startOfDay(new Date()), hours + value * 12)
    } else {
      return this.child.toDate(new Date(), true, value)
    }
  }

  toString () {
    return `(meridiem_${this.value} ${String(this.child)})`
  }
}
