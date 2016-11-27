angular.module('HotelService', []).factory('Hotel', ['$http', '$q', function($http, $q) {

	  return {
      getAll: function getAll() {

		var defered = $q.defer();
	    var promise = defered.promise;

		$http.get('http://localhost:8100/hotel')
		.success(function(obj) {

			defered.resolve(obj.hotels);

		})
		.error(function(err) {
		    defered.reject(err)
		});

        return promise;

      }
  };

}]);