if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

module.exports = {
  env: {
    apiKey: process.env.apiKey,
  }
}