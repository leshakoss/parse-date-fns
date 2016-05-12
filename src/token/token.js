export default class Token {
  id = 'invalid token'
  lbp = 0

  constructor (value) {
    this.value = value
  }

  is (id) {
    return this.id === id
  }

  nud () {
    throw new Error(`Syntax error: ${this.toString()}`)
  }

  led () {
    throw new Error(`Unknown operator: ${this.toString()}`)
  }

  eval () {
    throw new Error(`Unexpected node: ${this.toString()}`)
  }

  toString () {
    return `(${this.id})`
  }

  toDate () {
    const result = this.eval()
    const {type, value} = result

    if (type === 'date') {
      return value
    } else {
      throw new Error(`Cannot convert to date: ${this.toString()}`)
    }
  }

  toArray () {
    const child = this.child ? this.child.toArray() : []
    return [this.eval()].concat(child)
  }
}
