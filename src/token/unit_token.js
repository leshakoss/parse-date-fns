import Token from './token'
import {find} from '../util'
import units from '../units'

export default class UnitToken extends Token {
  id = 'unit'
  lbp = 140

  static match (string, locale) {
    return find(locale.units, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.units, string)
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
    if (this.child) {
      const result = this.child.eval()

      if (result.type === 'number') {
        return {
          type: 'amount',
          value: {
            unit: units[this.value],
            amount: result.value
          }
        }
      }
    }

    return {
      type: 'unit',
      value: units[this.value]
    }
  }

  toString () {
    if (this.child) {
      return `(unit_${this.value} ${String(this.child)})`
    } else {
      return `(unit_${this.value})`
    }
  }
}
