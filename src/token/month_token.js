import Token from './token'
import {find} from '../util'
import {startOfDay, startOfMonth, setDate, setMonth, setYear} from 'date-fns'

export default class MonthToken extends Token {
  id = 'month'
  lbp = 120

  static match (string, locale) {
    return find(locale.months, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.months, string)
    super(value)
  }

  nud ({tokens}) {
    return {tokens, tree: this}
  }

  led ({tokens, tree}) {
    this.child = tree
    return {tokens, tree: this}
  }

  eval () {
    return {
      type: 'month',
      value: this.value
    }
  }

  toDate (baseDate = new Date()) {
    const {child, value} = this

    if (child) {
      let daySet = false
      const array = this.toArray()
      const date = array.reduce((date, result) => {
        const {type, value} = result
        if (type === 'month') {
          return setMonth(date, value)
        } else if (value > 31) {
          return setYear(date, value)
        } else {
          daySet = true
          return setDate(date, value)
        }
      }, new Date())
      return daySet ? startOfDay(date) : startOfMonth(date)
    } else {
      return setMonth(startOfMonth(new Date()), value)
    }
  }

  toString () {
    if (this.child) {
      return `(month_${this.value} ${String(this.child)})`
    } else {
      return `(month_${this.value})`
    }
  }
}
