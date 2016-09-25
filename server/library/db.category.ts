Promise     = require('bluebird');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/mini_eq';

module.exports = new function() {

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
  				let cursor = db.collection('category').find();
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

  this.saveCategory = function(data, callbackok, callbackerror){
    // console.log(" save data = ", data);
    let $scope:any = {};

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
              updated_by: "Admin"
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

    insertCategory()
    .then(function() {
      // console.log("Data from promise = ", arguments);
      callbackok($scope.category_id);
    }).catch(function(e){
  	  console.log(e);
      callbackerror(e);
  	});
  }

////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
////////////////////////////////////////////////////////////////////////////////
