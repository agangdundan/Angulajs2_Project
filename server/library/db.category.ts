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
  				assert.equal(null, err);
  				let cursor = db.collection('category').find();
  				cursor.each(function(err, doc) {
            // console.log(" 19: err = ", err);
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
      console.log("getCate from promise = ", arguments);
      callbackok($scope.getCategoryList);
    }).catch(function(e){
  	  console.log("reject is = ", e);
      callbackerror(e);
  	});
  }

////////////////////////////////////////////////////////////////////////////////
} /* End module.exports here */
////////////////////////////////////////////////////////////////////////////////
