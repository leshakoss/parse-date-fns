import Token from './token'
import {expression, find} from '../util'
import * as startOf from '../start_of'
import * as endOf from '../end_of'
import {setDay} from 'date-fns'

export default class OfToken extends Token {
  id = 'of'
  lbp = 60

  static match (string, locale) {
    return find(locale.of, string) >= 0
  }

  led (prev) {
    this.first = prev.tree
    const {tokens, tree} = expression(prev, 100)
    this.second = tree
    return {tokens, tree: this}
  }

  toDate () {
    const first = this.first.eval()
    const second = this.second.eval()

    if (first.type === 'edge') {
      const offset = second.value
      const edge = first.value === 1 ? startOf[offset.unit] : endOf[offset.unit]
      const date = edge(this.second.toDate())
      return date
    } else if (first.type === 'weekday') {
      const date = startOf.day(this.second.toDate())
      return setDay(date, first.value)
    } else {
      const baseDate = this.second.toDate()
      return this.first.toDate(baseDate)
    }
  }

  toString () {
    return `(${this.first || '?'} of ${this.second || '?'})`
  }
}
