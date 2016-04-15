'use strict'
module.exports = function (V) {
  V.extendAddition({
    $empty: function (target, canEmpty, r) {
      if (canEmpty && target === '') {
        return r.VALID
      } else if (!canEmpty && target === '') {
        return r.UNVALID
      } else {
        return r.PASS
      }
    }
  })
}
