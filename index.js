import parse from './src/parse'

if (process.argv[2]) {
  parse(process.argv[2], undefined, true)
}

export default parse
