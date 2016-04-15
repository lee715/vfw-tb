'use strict'
/* global describe, it */
var V = require('vfw')
var assert = require('assert')
require('../lib')

describe('addition test', function () {
  it('empty', function () {
    var rule = {
      a: 'String:empty'
    }
    var set = V.parse(rule)
    assert(set.check({a: ''}))
  })
})

describe('expression test', function () {
  it('$commaArray', function () {
    var rule = {
      a: {
        $commaArray: 'Money'
      }
    }
    var set = V.parse(rule)
    assert(set.check({a: '0.1,3.44,2,9.0'}))
    assert(!set.check({a: '0.001,2,34'}))
  })

  it('$lte', function () {
    assert(V.$('lte', 6, 'asd'))
    assert(V.$('lte', 6, 'asdasd'))
    assert(!V.$('lte', 6, 'asdasdasd'))
  })

  it('$lt', function () {
    assert(V.$('lt', 6, 'asd'))
    assert(!V.$('lt', 6, 'asdasd'))
    assert(!V.$('lt', 6, 'asdasdasd'))
  })

  it('$gte', function () {
    assert(!V.$('gte', 6, 'asd'))
    assert(V.$('gte', 6, 'asdasd'))
    assert(V.$('gte', 6, 'asdasdasd'))
  })

  it('$gt', function () {
    assert(!V.$('gt', 6, 'asd'))
    assert(!V.$('gt', 6, 'asdasd'))
    assert(V.$('gt', 6, 'asdasdasd'))
  })

  it('$len', function () {
    assert(V.$('len', 3, 'asd'))
    assert(!V.$('len', 3, 'asda'))
  })
})

describe('type extends from lodash', function () {
  it('PlainObject', function () {
    assert(V.type('PlainObject', {a: 1}))
    assert(!V.type('PlainObject', [1, 2]))
  })

  it('Integer', function () {
    assert(V.type('Integer', 12))
    assert(!V.type('Integer', Infinity))
  })

  it('ArrayLike', function () {
    assert(V.type('ArrayLike', [1, 2, 3]))
    assert(V.type('ArrayLike', arguments))
    assert(!V.type('ArrayLike', function () {}))
  })
})

describe('type extends from validator', function () {
  it('URL', function () {
    assert(V.type('URL', 'http://www.vfw.com'))
    assert(!V.type('URL', 'asd'))
  })

  it('Lowercase', function () {
    assert(!V.type('Lowercase', {a: 'as'}))
    assert(V.type('Lowercase', 'asdasd'))
  })

  it('Email', function () {
    assert(V.type('Email', 'lll@lll.com'))
    assert(!V.type('Email', 'www.llllll.com'))
  })
})

describe('type extends from tb', function () {
  it('Word', function () {
    assert(V.type('Word', 'axAs_'))
    assert(!V.type('Word', ''))
    assert(!V.type('Word', 'axAs_$'))
  })

  it('Password', function () {
    assert(V.type('Password', 'axAs_a12'))
    assert(!V.type('Password', ''))
    assert(!V.type('Password', 'asd12'))
    assert(!V.type('Password', 'axAs_$'))
  })

  it('StringLike', function () {
    assert(V.type('StringLike', 12345))
    assert(!V.type('StringLike', NaN))
    assert(!V.type('StringLike', 11.21))
    assert(V.type('StringLike', 'asc'))
  })

  it('NumberLike', function () {
    assert(V.type('NumberLike', '12'))
    assert(!V.type('NumberLike', 'as'))
  })

  it('DateString', function () {
    assert(V.type('DateString', (new Date()).toLocaleString()))
    assert(V.type('DateString', '2015-10-10'))
    assert(!V.type('DateString', 123123))
    assert(!V.type('DateString', (new Date())))
  })

  it('Date', function () {
    assert(V.type('Date', (new Date()).toLocaleString()))
    assert(V.type('Date', '2015-10-10'))
    assert(V.type('Date', (new Date())))
  })

  it('Money', function () {
    assert(V.type('Money', 1.21))
    assert(!V.type('Money', 1.2121))
    assert(!V.type('Money', '.21'))
    assert(!V.type('Money', Infinity))
  })

  it('HttpMethod', function () {
    assert(V.type('HttpMethod', 'get'))
    assert(V.type('HttpMethod', 'Get'))
    assert(V.type('HttpMethod', 'GET'))
  })

  it('Phone', function () {
    assert(V.type('Phone', 18571501333))
    assert(V.type('Phone', '+8618571501333'))
    assert(V.type('Phone', '+12122223333'))
    assert(!V.type('Phone', '+11002223333'))
  })

  it('MobileAgent', function () {
    assert(V.type('MobileAgent', 'iPhone xxx'))
    assert(V.type('MobileAgent', 'iPod xxx'))
  })

  it('ClientId', function () {
    assert(V.type('ClientId', 'e56f7d80-7ece-11e5-893b-f7aeeaaaf495'))
    assert(!V.type('ClientId', 'e56f7d807ece11e5893bf7aeeaaaf495'))
  })

  it('MongoObject', function () {
    assert(V.type('MongoObject', {_id: '559a3390708305a6115cc957'}))
    assert(!V.type('MongoObject', {}))
  })

  it('ObjectId', function () {
    assert(V.type('ObjectId', '559a3390708305a6115cc957'))
    assert(!V.type('ObjectId', '559a3390708305a611c957'))
  })
})
