const fs = require('fs')

const resolver = require('./resolver.json')

const readline = require('readline')

const counter = {}

  
const visitsRl = readline.createInterface({
  input: fs.createReadStream('./v2_current_de_serlo.org_visits.csv'),
  output: process.stdout,
  terminal: false
})

visitsRl.on('line', (line) => {
  const parts = line.split(',')
  if (parts.length < 5) return // to short
  if (parts[0].includes('unix')) return //headline
  const date = parts[1].substring(0, 10)
  /*if (date.localeCompare(offsetToDate[-7]) < 0) {
    return // too old
  }*/
  
  
  const path = parts[2].replace('http://de.serlo.org', '').replace('https://de.serlo.org', '')
  
  let id = -1
  const m = /^(?:(?:\/[^\/]+)?\/([\d]+)\/[^\/]+|\/([\d]+)|\/taxonomy\/term\/get\/([\d]+))$/.exec(path)
    
  if (m) {
    id = parseInt(m[1] || m[2] || m[3])
  } else {
    const resolvedId = resolver.path2uuid[path]
    if (resolvedId > 0) {
      id = resolvedId
    }
  }

  if (id == -1) return // ignore
    
  if (!counter[id]) {
    counter[id] = 0
  }
  counter[id]++
})

visitsRl.on('close', () => {
  const arr = []
  for (const id in counter) {
    if (counter[id] > 0) {
      arr.push({id, count: counter[id]})
    }
  }
  arr.sort((a, b) => b.count - a.count)
  console.log(arr.length)
  fs.writeFileSync('quicklinks.json', JSON.stringify(arr))
})

