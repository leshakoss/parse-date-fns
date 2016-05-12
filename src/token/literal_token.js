import Token from './token'
import {
  addMilliseconds, startOfDay, parse as parseISO
} from 'date-fns'

const MILLISECONDS_IN_HOUR = 3600000
const MILLISECONDS_IN_MINUTE = 60000

const parseTokenTime = /^\d{1,2}:/
const parseTokenHH = /^(\d{2}([.,]\d*)?)$/
const parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/
const parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/

export default class LiteralToken extends Token {
  id = 'literal'
  lbp = 40

  nud ({tokens}) {
    return {tokens, tree: this}
  }

  toString () {
    return `(${this.value})`
  }

  toDate (baseDate = new Date(), isTime, meridiem) {
    const {value} = this
    if (isTime) {
      const time = parseTime(this.value)
      const date = startOfDay(baseDate)
      const meridiemOffset = 12 *
        MILLISECONDS_IN_HOUR *
        (time >= (12 * MILLISECONDS_IN_HOUR) ? 1 - meridiem : meridiem)
      return addMilliseconds(date, time + meridiemOffset)
    } else if (parseTokenTime.exec(value)) {
      const time = parseTime(this.value)
      const date = startOfDay(baseDate)
      return addMilliseconds(date, time)
    } else {
      return parseISO(value)
    }
  }
}

function parseTime (timeString) {
  let token

  // hh
  token = parseTokenHH.exec(timeString)
  if (token) {
    const hours = parseFloat(token[1].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = parseTokenHHMM.exec(timeString)
  if (token) {
    const hours = parseInt(token[1], 10)
    const minutes = parseFloat(token[2].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = parseTokenHHMMSS.exec(timeString)
  if (token) {
    const hours = parseInt(token[1], 10)
    const minutes = parseInt(token[2], 10)
    const seconds = parseFloat(token[3].replace(',', '.'))
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}
