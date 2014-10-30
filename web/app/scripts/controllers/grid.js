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
    var containersPerRow = undefined;
    var maxContainersPerRow = 2;
    var fillEmptySpace = true;
    var numRows = 30;

    $scope.generateRows = function () {
      $scope.rows = generateRowsForAllDevices(numRows, containersPerRow, fillEmptySpace);
    };

    $scope.generateRows();

    function getRandom(max) {
      return Math.floor((Math.random() * max) + 1);
    }

    function generateRowForOneDevice(numContainers, fillEmptySpace) {
      var values = [];
      var totalColsUsed = 0;
      while (numContainers) {
        var remainingCols = gridColumns - totalColsUsed;
        var numCols = (fillEmptySpace && numContainers === 1) ? remainingCols : getRandom(remainingCols - numContainers + 1);
        numContainers--;
        values.push(numCols);
        totalColsUsed += numCols;
      }

      return values;
    }

    function generateRowForAllDevices(numContainers, fillEmptySpace) {
      numContainers = numContainers || getRandom(maxContainersPerRow);
      var devices = ['mobile', 'tablet', 'desktop'];
      var devicesValues = [];
      devices.forEach(function(device) {
        var values = generateRowForOneDevice(numContainers, fillEmptySpace).map(function(value) {
          var obj = {};
          obj[device] = value;

          return obj;
        });
        devicesValues.push(values);
      });

      return _.merge.apply(this, devicesValues);
    }

    function generateRowsForAllDevices(numRows, numContainersPerRow, fillEmptySpace) {
      var rows = [];
      for (var i = 0; i < numRows; i++) {
        rows.push(generateRowForAllDevices(numContainersPerRow, fillEmptySpace));
      }

      return rows;
    }
  });

