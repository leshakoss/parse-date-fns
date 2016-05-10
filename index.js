import parseISO from 'date-fns/parse'

/**
 * @summary Parse the human formatted date.
 *
 * @description
 * Parse the date string representation.
 *
 * @param {String} dateString - the date string representation
 * @returns {Date} the parsed date in the local time zone.
 *
 * @example
 * // Parse string '2014-02-11T11:30:30':
 * var result = parse('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 */
export default function parse (dateString) {
  // I am not a good parser
  return parseISO(string)
}

