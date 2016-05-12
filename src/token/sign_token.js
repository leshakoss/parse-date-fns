import Token from './token'
import NowToken from './now_token'
import {endOfExpression, expression, find} from '../util'
import * as add from '../add'

export default class SignToken extends Token {
  id = 'sign'
  lbp = 20

  static match (string, locale) {
    return find(locale.sign, string) >= 0
  }

  constructor (string, locale) {
    const value = find(locale.sign, string) > 0 ? 1 : -1
    super(value)
  }

  nud (prev) {
    const {tokens, tree} = expression(prev, this.lbp)
    this.difference = tree
    this.baseDate = new NowToken()
    return {tokens, tree: this}
  }

  led ({tokens, tree}) {
    this.difference = tree
    if (endOfExpression({tokens}, this.lbp)) {
      this.baseDate = new NowToken()
      return {tokens, tree: this}
    } else {
      const result = expression({tokens, tree}, this.lbp)
      tokens = result.tokens
      this.baseDate = result.tree
      return {tokens: result.tokens, tree: this}
    }
  }

  toString () {
    return `(${String(this.difference || '?')} sign ${String(this.baseDate || '?')})`
  }

  eval () {
    const baseDate = this.baseDate.toDate()
    const difference = this.difference.eval()

    if (difference.type !== 'amount') {
      throw new Error()
    }

    const date = difference.value.reduce((date, modifier) => {
      const {unit, amount} = modifier
      const addUnit = add[unit]
      return addUnit(date, amount * this.value)
    }, baseDate)

    return {
      type: 'date',
      value: date
    }
  }

  toDate () {
    const baseDate = this.baseDate.toDate()
    const difference = this.difference.eval()

    if (difference.type === 'amount') {
      const {unit, amount} = difference.value
      const addUnit = add[unit]
      return addUnit(baseDate, (amount || 1) * this.value)
    } else if (difference.type === 'unit') {
      const unit = difference.value
      const addUnit = add[unit]
      return addUnit(baseDate, this.value)
    }
  }
}
