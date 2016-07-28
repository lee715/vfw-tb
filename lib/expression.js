'use strict'
module.exports = function (V) {
  V.extend('expression', {
    $commaArray: function (target, type) {
      var arr, i, item, len, res
      if (!(target && V.type('String', target) && type)) {
        return false
      }
      arr = target.split(',')
      res = true
      for (i = 0, len = arr.length; i < len; i++) {
        item = arr[i]
        if (!V.type(type, item)) {
          res = false
          break
        }
      }
      return res
    },

    $lte: function (target, len) {
      return target && target.length <= len
    },

    $gte: function (target, len) {
      return target && target.length >= len
    },

    $lt: function (target, len) {
      return target && target.length < len
    },

    $gt: function (target, len) {
      return target && target.length > len
    },

    $len: function (target, len) {
      return target && target.length === len
    },

    $struct: function (target, structName) {
      return V.struct(structName, target)
    }
  })
}
