'use strict'

module.exports = function (V) {
  require('./expression')(V)
  require('./type')(V)
}
