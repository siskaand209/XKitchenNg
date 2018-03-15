var userModule = angular
    .module('userModule',[])
    .controller('userController', function($scope,$http){
        $scope.title = "List of User";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/users";
        //scope adalah req dari html

        //no.1 get
        $http.get($scope.base_url)
            .then(function(response){
                $scope.users = response.data;
            }) //get
        
            //no.2 add untuk menambahkan data baru
            $scope.add = function(){
                $http.post($scope.base_url, $scope.user)
                     .then(function(data, status){
                        $http.get($scope.base_url)
                        .then(function(response){
                            $scope.users = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        })
                     })
            }

            //edit
            $scope.edit = function(user){
                $http.get($scope.base_url + "/" + user._id)
                .then(function(response){
                    $scope.user = response.data;
                    $scope.createNew = false;
                })//end get
                .catch(function(response){
                    $scope.status = response;
                })
            } //end edit

            //update 
            $scope.update = function() {
                let editData = [
                    { 'propName' : 'badgeId', 'value': $scope.user.badgeId},
                    { 'propName' : 'nick', 'value': $scope.user.nick},
                    { 'propName' : 'fullName', 'value': $scope.user.fullName},  
                ];

                $http.patch($scope.base_url + "/" + $scope.user._id, editData)
                    .then(function(data,status){
                        $http.get($scope.base_url)
                        .then(function(response){
                            $scope.users = response.data;
                            $scope.createNew = true;
                            $scope.user = null;
                        });
                    });
            }//end update
        
            //Delete
            $scope.delete = function(user){
                $http.delete($scope.base_url + "/" + user._id)
                .then(function(data,status){
                    $http.get($scope.base_url)
                    .then(function(response){
                        $scope.users = response.data;
                        $scope.createNew = true;
                        $scope.user = null;

                    });
                });
            }
    });
