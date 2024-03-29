const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require("http-proxy-middleware")

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const devProxy = {
    '/app': {
        // target: 'http://localhost:8100/', 
        target: 'https://jyavs.com/', 
        pathRewrite: {
            '^/app': '/app'
        },
        changeOrigin: true
    }
}

app.prepare().then(() => {
  const server = express()
 
  if (dev && devProxy) {
    Object.keys(devProxy).forEach(function(context) {
        server.use(createProxyMiddleware (context, devProxy[context]))
    })
  }

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('Error:::::', err)
})