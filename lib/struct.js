'use strict'
module.exports = function (V) {
  V.extend('struct', {
    User: {
      _id: 'MongoId',
      name: 'String',
      email: 'Email',
      emails: {
        $array: {
          openId: 'String',
          email: 'Email',
          state: {
            $in: [0, 1]
          }
        }
      },
      password: 'String',
      avatarUrl: 'Url:required',
      phoneForLogin: 'Phone'
    },
    Alien: {
      _id: 'MongoId',
      openId: 'String',
      refer: 'String',
      showname: 'String',
      _userId: 'MongoId',
      _organizationId: 'MongoId'
    }
  })
}
