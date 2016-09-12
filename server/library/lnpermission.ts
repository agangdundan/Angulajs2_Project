let promise = require('bluebird');
let jwt =  require('jwt-simple');

module.exports = new function() {
  this.secret     = "p@ssw0rd";
  this.cookieName = "user";

///////////// read tokem method  ///////////////////////////////////////////////
  this.readToken = function(req){
    let token = req.body.user;
    console.log("Before decode : ", token);
    if(token == undefined || token == "" || token == null){
      token = {id:0};
    }else {
      token = jwt.decode(token, this.secret)
    }
    console.log("permission readToken = ", token);
    return token;
  }

///////////// write tokem method  //////////////////////////////////////////////
  this.writeToken = function(res, id){
    let token = {id:id};
    token = jwt.encode(token, this.secret);
    console.log(token);
    // res.cookie(this.cookieName, token);
    return token;
  }

///////////// clear tokem method  //////////////////////////////////////////////
  this.clearToken = function(res){
    let token = this.writeToken(res, 0);
    return token;
  }

///////////// islogin tokem method  ////////////////////////////////////////////
  this.isLogin = function(req){
    let token = this.readToken(req);
    console.log("token is : ", token);
    if(token.id != 0){
      return true;
    }else {
      return false;
    }
  }

///////////// getid tokem method  //////////////////////////////////////////////
  this.getID = function(req) {
    let token = this.readToken(req);
    return token.id;
  }
};