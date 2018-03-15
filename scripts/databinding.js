var myModule = angular.module('myModule', [])
    .controller('myController', function ($scope) {

        $scope.title = "Employee";

       var employee = {
           firstName : "Siska",
           middleName : "",
           lastName : "Kamil"
       };

       $scope.employee = employee;
    });