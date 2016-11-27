angular.module('HomeCtrl', []).controller('HomeController', function($scope, Hotel) {
	var vm = {};
	$scope.vm = vm;


	Hotel.getAll().then(function(hotels) {
		vm.hotels = hotels;
		console.log(hotels);
	}, function(data) {
	});


});