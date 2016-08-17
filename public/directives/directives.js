/**
 * Created by youpeng on 16/8/16.
 */

angular.module('webapp')
  .directive('itemList', [itemList]);

function itemList() {
  return {

    replace: false,

    restrict: 'E',

    scope: {},

    link: function(scope, element, attr) {
      var oLi = element[0].getElementsByClassName('meun-item');
      for (var i = 0; i < oLi.length; i++) {
        (function(n) {
          oLi[n].onclick = function() {
            for (var j = 0; j < oLi.length; j++) {
              if (n === j) {
                oLi[n].className = 'meun-item meun-item-active';
                // var item = oLi[n].getElementsByTagName('img')[0].attributes['src'];
                // oLi[n].getElementsByTagName('img')[0].setAttribute('src', item.value.replace("_grey.png", ".png"));
              } else {
                oLi[j].className = 'meun-item';
              }
            }
          };

        })(i);
      }
    }
  };
}
