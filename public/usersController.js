var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});
app.controller('regiterDependentsCtrl', function($scope, $http,$window){
$scope.register=function(){
    console.log("dsfs");
    $http.post('/users/registerDependents/', {
        username : $scope.username,
        password: $scope.password,
        fullname: $scope.fullname,
    }).then(function(data){
       $window.location.href = '/users/success';
    },function(response){
        console.log(response);
    });
 };
});