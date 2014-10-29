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

    function getRandom(numContainers) {
      return Math.floor((Math.random() * numContainers) + 1);
    }

    function generateRow(numContainers) {
      var values = [];
      var totalColsUsed = 0;
      while (numContainers) {
        var numCols;

        if (numContainers === 1) {
          numCols = gridColumns - totalColsUsed;
        } else {
          do {
            numCols = getRandom(gridColumns - totalColsUsed);
          } while(numCols > numContainers || !numCols);
        }

        values.push(numCols);
        totalColsUsed += numCols;
        numContainers--;
      }
      return values;
    }

    var row = [];
    var numContainers = 4;
    var devices = ['mobile', 'tablet', 'desktop'];
    var devicesValues = [];
    devices.forEach(function(device) {
       var values = generateRow(numContainers).map(function(value) {
        var obj = {};
        obj[device] = value;
        return obj;
      });

      devicesValues.push(values);
    });
    $scope.row = _.merge.apply(_, devicesValues);
  });

