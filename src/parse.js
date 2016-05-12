import tokenize from './tokenize'
import {expression} from './util'
import defaultLocale from '../locale/en_us'

/**
 * @summary Parse the human formatted date.
 *
 * @description
 * Parse the date string representation.
 *
 * @param {String} dateString - the date string representation
 * @param {Object} locale
 * @returns {Date} the parsed date in the local time zone.
 *
 * @example
 * // Parse string '2014-02-11T11:30:30':
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 */
export default function parse (dateString, locale = defaultLocale, debug) {
  if (debug) console.log('STRING', dateString)
  const tokens = tokenize(dateString, locale)
  if (debug) console.log('TOKENS', tokens.map(a => String(a)).join(' '))
  const {tree} = expression({tokens, tree: null}, 0)
  if (debug) console.log('PARSER', String(tree))
  const date = tree.toDate()
  if (debug) console.log('RESULT', date)
  if (debug) console.log('TODATE', String(date))
  return date
}
