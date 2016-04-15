'use strict'

module.exports = function (V) {
  require('./addition')(V)
  require('./expression')(V)
  require('./type')(V)
}
