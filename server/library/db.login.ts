Promise     = require('bluebird');
//let conn        = require('./config'); // conn จะกลายเป็นคลาสที่สร้าง instance object แล้ว แล้วก็เป็นชื่อว่า database
var conn = require('./config');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var url = conn.database;

module.exports = new function() {

/////////////////////////////   Create Login Method   /////////////////////////////////////////
  this.createLogin = function(loginname, password, displayname, callbackok, callbackerror) {
    // let db = conn.init(); //เรียก method init จาก class database
    let $scope: any = {};
    $scope.getListMember = [];

    let checkLoginDuplicate = function(){
      // let deferred = promise.pending();
      return new Promise(function(resolve,reject){
        MongoClient.connect(url, function(err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            // deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
            reject('Unable to connect to the mongoDB server. Error:' + err);
          }else {
    				let clt_member = db.collection('staff');
            let cursor = clt_member.find({"login_name":loginname, "password":password});

    				cursor.each(function(err, result) {
    					if(err){
                // deferred.reject(err);
                reject(err);
              } else if (result != null) {
      						$scope.getListMember.push(result);
    					} else{
                // Check length list.
    						if($scope.getListMember.length > 0){
    							// deferred.reject("Duplicate Data Can't use this Login");
                  reject("Duplicate Data Can't use this Login");
    						} else {
    							// deferred.resolve("Can use this Login name.");
                  resolve("Can use this Login name.");
    						}
                db.close();
    					}

    				});
          }
  			});
        // return deferred.promise;
      });
    }

    let insertLogin = function(){
      console.log("Arguments Duplicate = ",arguments);
      // let deferred = promise.pending();

      return new Promise(function(resolve, reject){
        MongoClient.connect(url, function (err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            // deferred.reject('Unable to connect to the mongoDB server. Error:' + err);
            reject('Unable to connect to the mongoDB server. Error:' + err);
          } else {
            // console.log('Connection established to', url);
            // Get the documents collection
            let clt_member = db.collection('staff');
            //Create some users
            let member = {
              "login_name": loginname,
              "password": password,
              "display_name": displayname,
              "status": "A"
            };
            // Insert some users
            clt_member.insertOne(member, function (err, result) {
              if (err) {
                console.log(err);
                // deferred.reject('Error create Login ' + err);
                reject('Error create Login ' + err);
              } else {
                // console.log('Inserted : ', result.insertedId);
                $scope.login_id = result.insertedId;
                // deferred.resolve(result.insertedId);
                resolve(result.insertedId);
              }
              //Close connection
              db.close();
            });
          }
        });
        // return deferred.promise;
      });
    }

    checkLoginDuplicate()
    .then(insertLogin)
    .then(function() {
      console.log("from promise = ", arguments);
      callbackok($scope.login_id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

/////////////// checl login method  //////////////////////////////////////////////////
  this.checkLogin = function(login, pass, callbackok, callbackerror) {
    let $scope: any = {};
    $scope.getLogin = [];

    let checkLoginPass = function(){
      //let deferred = Promise.pending();
      return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db) {
  				assert.equal(null, err);
  				let cursor = db.collection('staff').find({"login_name":login,"password":pass});
  				cursor.each(function(err, doc) {
            if(err){
              reject(err);
            }
  					assert.equal(err, null);
  					// console.log("err = ", err);
  					if (doc != null) {
  						$scope.getLogin.push(doc);
  					} else{
  						if($scope.getLogin.length > 0){
                // console.log("getLogin = ", $scope.getLogin);
  							//deferred.resolve("Login Ok");
                resolve("Login Ok");
  						} else {
  							// deferred.reject("Invalid login");
                reject("Invalid login");
  						}
  					}
  				});
  			});
        //return deferred.promise;
      });
    }


    checkLoginPass()
    .then(function() {
      // console.log("Login from mongo = ", $scope.getLogin);
      callbackok($scope.getLogin);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

//////////////////////////////  change username ////////////////////////////////
  this.updateStaff = function(data, callbackok, callbackerror){
    console.log("155: data is = ", data);
    let $scope: any = {};
    $scope.loginData = [];

    let _updateStaff = function(){
      return new Promise(function(resolve, reject){
        MongoClient.connect(url, function (err, db){
          if (err) {
              console.log('Unable to connect to the mongoDB server. Error:', err);
              reject('Unable to connect to the mongoDB server. Error:' + err);
          }else{
              let staff = db.collection('staff');
              let staffData = {
                login_name: data.user,
                display_name: data.name,
                password:data.password,
                status:"A"
              }
              staff.updateOne({"_id":ObjectId(data.id)}, staffData,
              function(err, result){
                // console.log("Update = ", err, " = ", result, " data = ", categoryData);
                if (err) {
                  console.log(err);
                  reject('Can not update data ' + err);
                } else {
                  // console.log('Inserted : ', result.insertedId);
                  resolve("update Ok");
                }
                db.close();
              });
          }
        });
      });
    }

    let _getLastUpdate = function(){
      return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          let cursor = db.collection('staff').find({"_id": ObjectId(data.id)});
          cursor.each(function(err, doc) {
            if(err){
              reject(err);
            }
            assert.equal(err, null);
            if (doc != null) {
              $scope.loginData.push(doc);
            } else{
              if($scope.loginData.length > 0){
                resolve("Login Ok");
              } else {
                reject("Invalid login");
              }
            }
          });
        });
      });
    }

    _updateStaff()
    .then(_getLastUpdate)
    .then(function() {
      // console.log("getCate from promise = ", arguments);
      callbackok($scope.loginData);
    }).catch(function(e){
      console.log("reject is = ", e);
      callbackerror(e);
    });

  }


////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
////////////////////////////////////////////////////////////////////////////////
