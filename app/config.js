let apiUrl
const apiUrls = {
  // https://tic-tac-toe-api-production.herokuapp.com/
  production: '<replace-with-heroku-url>',
  development: 'http://localhost:4741'
  // https://tic-tac-toe-api-development.herokuapp.com/
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
