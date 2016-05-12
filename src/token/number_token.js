import Token from './token'
import {find} from '../util'
import {setDate, setMonth, setYear, startOfDay, startOfMonth} from 'date-fns'

export default class NumberToken extends Token {
  id = 'number'
  lbp = 120

  static match (string, locale) {
    return find(locale.numbers, string) >= 0 ||
      find(locale.ordinalNumbers, string) >= 0 ||
      string.match(/^\d{1,4}(st|nd|rd|th)?$/)
  }

  constructor (string, locale) {
    const value = Math.max(
      find(locale.numbers, string) + 1,
      find(locale.ordinalNumbers, string) + 1,
      parseInt(string, 10) || -1
    )
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
      type: 'number',
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
      }, baseDate)
      return daySet ? startOfDay(date) : startOfMonth(date)
    } else {
      return new Date(value, 0, 1)
    }
  }

  toString () {
    if (this.child) {
      return `(${this.value} ${String(this.child)})`
    } else {
      return `(${this.value})`
    }
  }
}
