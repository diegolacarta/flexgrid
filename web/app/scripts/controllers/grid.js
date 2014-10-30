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
    var maxContainerPerRow = 3;

    $scope.generateRows = function () {
      $scope.rows = generateRowsForAllDevices(30);
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
        var numCols = (fillEmptySpace && numContainers === 1) ? remainingCols : getRandom(remainingCols - numContainers);
        values.push(numCols);
        totalColsUsed += numCols;
        numContainers--;
      }

      return values;
    }

    function generateRowForAllDevices(numContainers) {
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

    function generateRowsForAllDevices(numRows, numContainersPerRow) {
      var rows = [];
      for (var i = 0; i < numRows; i++) {
        rows.push(generateRowForAllDevices(numContainersPerRow || getRandom(maxContainerPerRow)));
      }

      return rows;
    }
  });

