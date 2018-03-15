var productModule = angular
    .module('productModule', [])
    .controller('productController', function ($scope, $http) {
       $scope.title = "List of Products" ;
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/products";//nomer 1
        //scope itu merupakan request dari html
        //nomer 1 get
        $http.get($scope.base_url)
             .then(function(response) {
                 $scope.products = response.data;

             })//end get

        //nomer 2
        $scope.category_url = "http://localhost:3000/api/categories"//nomer2
        $http.get($scope.category_url)
            .then(function (response) {
                $scope.categories = response.data;

            })//end 
            .catch(function (response) {
                $scope.status = response;
            })//end catch get
        
            $scope.add = function() {
                $http.post($scope.base_url, $scope.product)
                .then(function(data, status) {
                    $http.get($scope.base_url)
                        .then(function (response) {
                            $scope.products = response.data;
                            $scope.createNew = true;
                            $scope.product = null;
                        })//end get
                        .catch(function(response) {
                            $scope.status = response;
                        })
                })
            }//end post

            //edit
            $scope.edit = function(product) {
                $http.get($scope.base_url + "/" + product._id)
                .then(function(response){
                    $scope.product = response.data;
                    $scope.createNew = false;
                })//end get
                .catch(function(response) {
                    $scope.status = response;
                })
            }//end edit

            //update
            $scope.update = function() {
                let editData = [
                    { 'propName' : 'category', 'value': $scope.product.category},
                    { 'propName' : 'code', 'value': $scope.product.code},
                    { 'propName' : 'initial', 'value': $scope.product.initial},
                    { 'propName' : 'name', 'value': $scope.product.name},
                    { 'propName' : 'description', 'value': $scope.product.description},
                    { 'propName' : 'price', 'value': $scope.product.price},
                ];

                $http.patch($scope.base_url + "/" + $scope.product._id, editData)
                    .then(function(data, status) {
                        $http.get($scope.base_url)
                        .then(function(response) {
                            $scope.products = response.data;
                            $scope.createNew = true;
                            $scope.product = null;
                        });
                    });
            }//end update

            //Delete
            $scope.delete = function(product){
                $http.delete($scope.base_url + "/" + product._id)
                .then(function(data, status){
                    $http.get($scope.base_url)
                    .then(function(response){
                        $scope.products = response.data;
                        $scope.createNew = true;
                        $scope.product = null;
                    });

                });
            }
        
    });//end controller