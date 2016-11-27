angular.module('filterDirective', []).directive('filter', ['$filter', function($filter) {
return {
    restrict:'E',
    scope: {
       hotels:  '=',
       filteredHotels:  '=',
    },
    templateUrl:'js/directives/views/filter.html',
	controller: ['$scope', '$filter', function ($scope, $filter) {

		$scope.slider = {
		    options: {
		    }
		};

		$scope.slider.options.ceil = Math.max.apply(Math,$scope.hotels.map(function(o){return o.price;}));
		$scope.slider.maxValue = $scope.slider.options.ceil;
		$scope.slider.options.floor = Math.min.apply(Math,$scope.hotels.map(function(o){return o.price;}));
		$scope.slider.minValue = $scope.slider.options.floor;


		$scope.starsArray = {
			  '1': false
			, '2': false
			, '3': false
			, '4': false
			, '5': false
			, 'all': true
		};

	    $scope.$watch('hotels', function() {
			$scope.changeStarsFilter('all');
	    });


	    $scope.filterName = function(array){
	    	return $filter('filter')(array, {'name': $scope.nameToFind});

	    };

	    $scope.findNameHotel = function(){
	    	$scope.filteredHotels = $scope.filterStars($scope.filterPrice($scope.filterName($scope.hotels)));

	    };

	    $scope.filterPrice = function(array){
	    	return $filter('rangeFilter')(array, $scope.slider.minValue, $scope.slider.maxValue, 'price');

	    };


	    $scope.$watch('[slider.minValue, slider.maxValue]', function() {
	    	$scope.filteredHotels = $scope.filterStars($scope.filterPrice($scope.filterName($scope.hotels)));
	    });


	    $scope.filterStars = function(array){
			if (isUndefinedOrNullOrEmpty(array)) return [];
		    return array.filter(function (filtrado) {

		    	var result = false;
		    	angular.forEach(Object.keys($scope.starsArray), function(starsOp){
		    		if ($scope.starsArray[starsOp] && starsOp == filtrado.stars || $scope.starsArray['all']){
		    			result = true;
		    		}
		    	});
		    	return result;
		    });
		};

	    $scope.changeStarsFilter = function(op){
	    	if (op == 'all') {
	    	 $scope.starsArray['1'] = false;
	    	 $scope.starsArray['2']	= false;
	    	 $scope.starsArray['3'] = false;
	    	 $scope.starsArray['4'] = false;
	    	 $scope.starsArray['5'] = false;

	    	}else $scope.starsArray.all = false;

	    	$scope.filteredHotels = $scope.filterStars($scope.filterPrice($scope.filterName($scope.hotels)));

	    };


		var isUndefinedOrNullOrEmpty = function(val) {
		    return angular.isUndefined(val) || val === null  || val == '' 
		};
	}]
};
}]);