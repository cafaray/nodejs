# beer-locker app

Sample app for use diferent levels in security, from simple user/password to oauth.

This sample use a mongodb database to keep records

> if you are running this on a new MacOS version as me, remember you can't write on root directory, so you need to start mongo with the default config file: `mongod --config /usr/local/etc/mongod.conf`

To start the application, use the command

node server.js

This sample is taken from the blog of Scott Smith, go [here](http://scottksmith.com/blog/2014/09/18/beer-locker-building-a-restful-api-with-node-username-and-password/) for more