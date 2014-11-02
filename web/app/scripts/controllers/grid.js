'use strict';

/**
 * @ngdoc function
 * @name flexgrid.controller:GridCtrl
 * @description
 * # GridCtrl
 * Controller of the grid
 */
angular.module('flexgrid')
  .controller('GridCtrl', function ($scope) {
    var gridColumns = 12;
    $scope.containersPerRow = 4;
    $scope.randomContainersPerRow = false;
    $scope.fillEmptySpace = true;
    $scope.numRows = 1;
    $scope.rows = [];

    $scope.updateRows = function () {
      if ($scope.numRows < 0) {
        return;
      }

      while ($scope.numRows < $scope.rows.length) {
        $scope.rows.pop();
      }
      while ($scope.numRows > $scope.rows.length) {
        $scope.rows.push(generateRowForAllDevices());
      }
    };

    $scope.generateRows = function () {
      $scope.rows = generateRowsForAllDevices();
    };

    $scope.generateRows();

    function getRandom(max) {
      return Math.floor((Math.random() * max) + 1);
    }

    function generateRowForOneDevice(numContainers) {
      var values = [];
      var totalColsUsed = 0;
      while (numContainers) {
        var remainingCols = gridColumns - totalColsUsed;
        var numCols = ($scope.fillEmptySpace && numContainers === 1) ? remainingCols : getRandom(remainingCols - numContainers + 1);
        numContainers--;
        values.push(numCols);
        totalColsUsed += numCols;
      }

      return values;
    }

    function generateRowForAllDevices() {
      var numContainers = $scope.randomContainersPerRow ? getRandom($scope.containersPerRow) : $scope.containersPerRow;
      var devices = ['mobile', 'tablet', 'desktop'];
      var devicesValues = [];
      devices.forEach(function(device) {
        var values = generateRowForOneDevice(numContainers).map(function(value) {
          var obj = {};
          obj[device] = value;

          return obj;
        });
        devicesValues.push(values);
      });

      return _.merge.apply(this, devicesValues);
    }

    function generateRowsForAllDevices() {
      var rows = [];
      for (var i = 0; i < $scope.numRows; i++) {
        rows.push(generateRowForAllDevices());
      }

      return rows;
    }
  });

