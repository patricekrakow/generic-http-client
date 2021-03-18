const http = require('http')

const API_HOSTNAME = process.env.API_HOSTNAME || 'localhost'
const API_PORT = process.env.API_PORT || 8080
const API_GET_PATHS = process.env.API_GET_PATHS || '/hello;/hi'

console.log(`[INFO_] API_HOSTNAME: ${API_HOSTNAME}`)
console.log(`[INFO_] API_PORT: ${API_PORT}`)
console.log(`[INFO_] API_GET_PATHS: ${API_GET_PATHS}`)

function poll(hostname, port, paths, index) {
  if (index === undefined || index >= paths.length) index = 0
  const options = {
    method: 'GET',
    hostname: hostname,
    port: port,
    path: paths[index]
  }
  http.get(options, (res) => {
    var data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      try {
        const payload = JSON.parse(data);
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`[INFO_] ${options.method} ${options.hostname}:${options.port} ${options.path} | ${res.statusCode} | ${payload.message} | ${payload.debug.serviceName} (${payload.debug.serviceVersion}) | ${payload.debug.hostname.fromOS}`)
        } else {
          console.log(`[ERROR] ${options.method} ${options.hostname}:${options.port} ${options.path} | ${res.statusCode} | ${payload.errorMessage} | ${payload.debug.serviceName} (${payload.debug.serviceVersion}) | ${payload.debug.hostname.fromOS}`)
        }
      } catch (error) {
        console.log(`[ERROR] ${error.message} | ${data}`)
      };
      setTimeout(poll, 1000, hostname, port, paths, ++index)
    })
  }).end()
}

poll(API_HOSTNAME, API_PORT, API_GET_PATHS.split(';'))
