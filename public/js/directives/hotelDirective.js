angular.module('hotelDirective', []).directive('hotel', [function() {
return {
      restrict:'E',
      scope: {
         hotelname:  '=',
         stars: '=',
         price: '='
      },
      templateUrl:'js/directives/views/hotel.html',
      link: function (scope) {

        scope.getNumber = function(num) {
            return (new Array(parseInt(num)));   
        };

      }
   };
}]);