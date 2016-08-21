/**
 * Created by youpeng on 16/8/16.
 */

angular.module('webapp')
  .directive('itemList', [itemList])
  .directive('ngThumb', ['$window', ngThumb]);

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


function ngThumb($window) {
  var helper = {
    support: !!($window.FileReader && $window.CanvasRenderingContext2D),
    isFile: function(item) {
      return angular.isObject(item) && item instanceof $window.File;
    },
    isImage: function(file) {
      var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    }
  };

  return {
    restrict: 'A',
    template: '<canvas/>',
    link: function(scope, element, attributes) {
      if (!helper.support) return;

      var params = scope.$eval(attributes.ngThumb);

      if (!helper.isFile(params.file)) return;
      if (!helper.isImage(params.file)) return;

      var canvas = element.find('canvas');
      var reader = new FileReader();

      reader.onload = onLoadFile;
      reader.readAsDataURL(params.file);

      function onLoadFile(event) {
        var img = new Image();
        img.onload = onLoadImage;
        img.src = event.target.result;
      }

      function onLoadImage() {
        var width = params.width || this.width / this.height * params.height;
        var height = params.height || this.height / this.width * params.width;
        canvas.attr({ width: width, height: height });
        canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
      }
    }
  };
}
