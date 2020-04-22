// This file was automatically added by xdn deploy.
// You should commit this file to source control.

const { Router } = require('@xdn/core/router')
const { createNextPlugin } = require('@xdn/next')

module.exports = app => {
  const { nextMiddleware } = createNextPlugin(app)
  return new Router().use(nextMiddleware)
}
