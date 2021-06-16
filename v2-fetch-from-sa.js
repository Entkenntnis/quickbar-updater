const api1 = "https://simpleanalytics.com/api/export/visits?hostname=de.serlo.org"

const api2 = "https://simpleanalytics.com/api/export/events?hostname=de.serlo.org"


const fetch = require('node-fetch')
const fs = require('fs')
const {pipeline} = require('stream');
const {promisify} = require('util');
const streamPipeline = promisify(pipeline);

const currentTime = Date.now()
const endTime = currentTime - 24 * 60 * 60 * 1000
const startTime = currentTime - 21 * 24 * 60 * 60 * 1000

const timeRange = `&start=${timestampToDate(startTime)}&end=${timestampToDate(endTime)}`

console.log(timeRange)

run()

async function run() {
  const resPW = await fetch(api1 + timeRange, {
    headers: {
      'Cookie': '------ insert valid token here -------'
    }
  })
  await streamPipeline(resPW.body, fs.createWriteStream('./v2_current_de_serlo.org_visits.csv'))
  
  const resE = await fetch(api2 + timeRange, {
    headers: {
      'Cookie': '------ insert valid token here -------'
    }
  })
  await streamPipeline(resE.body, fs.createWriteStream('./v2_current_de_serlo.org_events.csv'))
}

function timestampToDate(ts) {
  return new Date(ts).toISOString().substring(0, 10)
}
