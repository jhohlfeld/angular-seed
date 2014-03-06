'use strict';

/* Controllers */

var hoodie = new Hoodie();
hoodie.account.signUp('test@example.com', 'test');
hoodie.account.signIn('test@example.com', 'test');


angular.module('myApp.controllers', []).
  controller('MyCtrl1', ['$scope', function($scope) {
    $scope.hoodie = 'logged in with hoodie - ' + hoodie.account.username;
  }])
  .controller('MyCtrl2', [function() {

  }]);