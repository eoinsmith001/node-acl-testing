'use strict';
var Acl = require('acl');
var acl = new Acl(new Acl.memoryBackend());

acl.allow('guest',  '/api/blogs', ['get']);
acl.allow('member', '/api/blogs', ['modify', 'delete', 'post']);

acl.addUserRoles('guest@home.com', 'guest')
acl.addUserRoles('member@home.com', 'member')
acl.addUserRoles('guest', 'guest')
acl.addUserRoles('member', 'member')

module.exports = acl;
