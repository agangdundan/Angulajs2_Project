Promise     = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mini_eq';

module.exports = new function() {

//////////////////////////////////////////////  get all category  ///////////////////////////////////////////
  this.getCategoryList = function(callbackok,callbackerror){
    let $scope:any = {};
    $scope.getCategoryList = [];

    let getAllCate = function(){
      // let deferred = promise.pending();
      return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            reject('Unable to connect to the mongoDB server. Error:' + err);
          }
  				assert.equal(null, err);
  				let cursor = db.collection('category').find({"status":"Y"});
  				cursor.each(function(err, doc) {
            if(err){
              // deferred.reject(err);
              reject(err);
            }
  					assert.equal(err, null);
  					if (doc != null) {
  						$scope.getCategoryList.push(doc);
  					} else{
  						if($scope.getCategoryList.length > 0){
                // console.log("category_list data = ", $scope.getCategoryList);
  							// deferred.resolve("have data.");
                resolve("have data.");
  						} else {
  							// deferred.reject("Don't have data.");
                reject("Don't have data.");
  						}
  					}
  				});
  			});
      //return deferred.promise;
      });
    }

    getAllCate()
    .then(function() {
      // console.log("getCate from promise = ", arguments);
      callbackok($scope.getCategoryList);
    }).catch(function(e){
  	  console.log("reject is = ", e);
      callbackerror(e);
  	});
  }


/////////////////////////////////////////  Save Category ////////////////////////////////////////////////////
  this.saveCategory = function(data, callbackok, callbackerror){
    let $scope:any = {};
    $scope.getListCategory = [];

    let getLastid = function(){
      return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
          if(err){
            reject("Can't connect to data base " + err);
          } else {
            let category = db.collection('category');
            let cursor = category.find({});

            cursor.sort({id: -1});
            cursor.each(function(err, result) {
              if(err){
                // console.log("err = ",  err);
                reject(err);
              } else if (result != null) {
                  $scope.getListCategory.push(result);
              } else{
                // Check length list.
                if($scope.getListCategory.length > 0){
                  $scope.lastId = $scope.getListCategory[0].id;
                  // console.log("last id = ", $scope.lastId);
                  resolve("That Ok");
                } else {
                  reject("On data Last ID !!!");
                }
                db.close();
              }
            });
          }
        });
      });
    }

    let insertCategory = function(){
      return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function (err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            reject('Unable to connect to the mongoDB server. Error:' + err);
          } else {
            // console.log('Connection established to', url);
            let category = db.collection('category');
            let categoryData = {
              cate_name: data.cate_name,
              cate_description: data.cate_description,
              status: data.cate_status,
              product_qty: 0,
              cover_img: "",
              created_date: new Date(),
              created_by: "Admin",
              updated_date: new Date(),
              updated_by: "Admin",
              id: $scope.lastId + 1
            }
            category.insertOne(categoryData, function (err, result) {
              if (err) {
                console.log(err);
                reject('Can not insert data ' + err);
              } else {
                // console.log('Inserted : ', result.insertedId);
                $scope.category_id = result.insertedId;
                resolve("Insert Ok");
              }
              db.close();
            });
          }
        });
      });
      // return deferred.promise;
    }


    getLastid()
    .then(insertCategory)
    .then(function() {
      // console.log("Data from promise = ", arguments);
      callbackok($scope.category_id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

//////////////////////////////////////////////// get 1 category /////////////////////////////////////////////

  this.getCategoryById = function(id, callbackok, callbackerror){
    let $scope:any = {};
    $scope.getCategoryById = [];

    let getAllCate = function(){
      // let deferred = promise.pending();
      return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function(err, db) {
          if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            reject('Unable to connect to the mongoDB server. Error:' + err);
          }
  				assert.equal(null, err);
          // console.log(id);
  				// let cursor = db.collection('category').find({"id": parseInt(id)});
          let cursor = db.collection('category').find({"_id": ObjectId(id)});
  				cursor.each(function(err, doc) {
            if(err){
              reject(err);
            }
  					assert.equal(err, null);
  					if (doc != null) {
  						$scope.getCategoryById.push(doc);
  					} else{
  						if($scope.getCategoryById.length > 0){
                resolve("have data.");
  						} else {
                resolve("Don't have data.");
  						}
  					}
  				});
  			});
      });
    }

    getAllCate()
    .then(function() {
      // console.log("getCate from promise = ", arguments);
      callbackok($scope.getCategoryById);
    }).catch(function(e){
  	  console.log("reject is = ", e);
      callbackerror(e);
  	});
  }

////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
////////////////////////////////////////////////////////////////////////////////
