'use strict'
module.exports = function (V) {
  V.extend('struct', {
    User: {
      _id: 'MongoId:required',
      name: 'String',
      email: 'Email:required',
      emails: {
        $array: {
          email: 'Email:required',
          state: {
            $in: [0, 1]
          }
        }
      },
      password: 'String',
      avatarUrl: 'Url:required'
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
