Promise     = require('bluebird');

module.exports = new function(){
  this.database = 'mongodb://localhost:27017/mini_eq';

  this.url = function(){
    return this.database;
  }
}
