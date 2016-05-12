import test from 'ava'
import sinon from 'sinon'
import parse from './'

test.beforeEach(t => {
  t.context.clock = sinon.useFakeTimers(
    new Date(2014, 8 /* Sep */, 25, 14, 30, 45, 500).getTime()
  )
})

test.afterEach(t => {
  t.context.clock.restore()
})

const map = new Map([
  ['2010', new Date(2010, 0, 1)],
  ['2010-05', new Date(2010, 4, 1)],
  ['2010-05-25', new Date(2010, 4, 25)],
  ['2010.05.25', new Date(2010, 4, 25)],
  ['2010/05/25', new Date(2010, 4, 25)],
  ['05-25-2010', new Date(2010, 4, 25)],
  ['05/25/2010', new Date(2010, 4, 25)],
  ['05.25.2010', new Date(2010, 4, 25)],
  ['25 May 2010', new Date(2010, 4, 25)],
  ['May 2010', new Date(2010, 4, 1)],
  ['Tuesday May 25th 2010', new Date(2010, 4, 25)],
  ['the day after tomorrow', new Date(2014, 8, 27)],
  ['one day before yesterday', new Date(2014, 8, 23)],
  ['2 days after Monday', new Date(2014, 8, 24)],
  ['2 weeks from Monday', new Date(2014, 9, 6)],
  ['a second ago', new Date(2014, 8, 25, 14, 30, 44, 500)],
  ['25 years from now', new Date(2039, 8, 25, 14, 30, 45, 500)],
  ['last Wednesday', new Date(2014, 8, 17)],
  ['next Friday', new Date(2014, 9, 3)],
  ['this week Tuesday', new Date(2014, 8, 23)],
  ['Monday of last week', new Date(2014, 8, 15)],
  ['May 25th of next year', new Date(2015, 4, 25)],
  ['the last day of March', new Date(2014, 2, 31)],
  ['the 23rd of last month', new Date(2014, 7, 23)],
  ['the beginning of this week', new Date(2014, 8, 21)],
  ['the end of next week', new Date(2014, 9, 4, 23, 59, 59, 999)],
  ['the last day of the year', new Date(2014, 11, 31)],
  ['last month', new Date(2014, 7, 25, 14, 30, 45, 500)],
  ['next year', new Date(2015, 8, 25, 14, 30, 45, 500)],
  ['12 pm', new Date(2014, 8, 25, 12)],
  ['12:30 pm', new Date(2014, 8, 25, 12, 30)],
  ['12:30:40', new Date(2014, 8, 25, 12, 30, 40)]
])

for (let [key, value] of map) {
  test(key, t => {
    const result = parse(key)
    t.deepEqual(result, value)
  })
}
