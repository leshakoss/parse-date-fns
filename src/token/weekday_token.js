import Token from './token'
import {endOfExpression, expression, find} from '../util'
import {setDay, startOfDay} from 'date-fns'

export default class WeekdayToken extends Token {
  id = 'weekday'
  lbp = 80

  static match (string, locale) {
    return find(locale.dayNames, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.dayNames, string)
    super(value)
  }

  nud ({tokens}) {
    if (endOfExpression({tokens}, this.lbp)) {
      return {tokens, tree: this}
    } else {
      const result = expression({tokens}, this.lbp)
      this.child = result.tree
      return {tokens: result.tokens, tree: this}
    }
  }

  led ({tokens, tree}) {
    this.child = tree
    return {tokens, tree: this}
  }

  eval () {
    return {
      type: 'weekday',
      value: this.value
    }
  }

  toDate (baseDate = new Date()) {
    const {child, value} = this

    if (child) {
      const date = startOfDay(child.toDate())
      return setDay(date, value)
    } else {
      const date = startOfDay(baseDate)
      return setDay(date, value)
    }
  }

  toString () {
    if (this.child) {
      return `(weekday_${this.value} ${String(this.child)})`
    } else {
      return `(weekday_${this.value})`
    }
  }
}
