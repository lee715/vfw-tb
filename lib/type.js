'use strict'
var NodeValidator = require('validator')
var _ = require('lodash')
var Phone = require('phone')

module.exports = function (V) {
  // node-validator只验证字符串 其他类型会报错
  var _NodeValidator = {}
  Object.keys(NodeValidator).forEach(function (key) {
    if (/^is/.test(key)) {
      _NodeValidator[key.slice(2)] = function () {
        try {
          return NodeValidator[key].apply(NodeValidator, arguments)
        } catch (e) {
          return false
        }
      }
    }
  })

  var _lodash = {}
  Object.keys(_).forEach(function (key) {
    if (/^is/.test(key)) {
      _lodash[key.slice(2)] = function () {
        return _[key].apply(_, arguments)
      }
    }
  })

  V.include('type', _lodash)
  V.include('type', _NodeValidator)

  var u = {}
  // matches a-zA-Z0-9_
  u.Word = function (str) {
    return /^\w+$/.test(str)
  }

  u.Password = function (str) {
    return V.type('Word', str) && V.$('gte', 6, str)
  }

  u.StringLike = function (str) {
    return V.type('String', str) || V.type('Integer', str)
  }

  u.NumberLike = function (str) {
    return V.type('Number', +str) && ((+str).toString() !== 'NaN')
  }

  u.DateString = function (str) {
    return V.type('String', str) && NodeValidator.isDate(str)
  }

  // date string or date object
  u.Date = function (str) {
    return _.isDate(str) || V.type('DateString', str)
  }

  u.Money = function (str) {
    return /^\d+\.?\d{0,2}$/.test(str + '')
  }

  u.HttpMethod = function (str) {
    var _str = V.type('String', str) && str.toLowerCase()
    return _str && V.$('in', ['get', 'put', 'post', 'del', 'delete', 'option'], _str)
  }

  u.Phone = function (str) {
    if (!(_.isString(str)) && _.startsWith(str, '+')) return false
    return !!Phone(str).length
  }

  u.MobileAgent = function (str) {
    return (/(iPhone|iPod|Android|ios)/i).test(str)
  }

  u.ClientId = function (str) {
    return V.type('UUID', str)
  }

  u.MongoObject = function (str) {
    return str && V.type('MongoId', str._id)
  }

  u.ObjectId = _NodeValidator.MongoId

  u.Url = _NodeValidator.URL

  V.extend('type', u)
}
