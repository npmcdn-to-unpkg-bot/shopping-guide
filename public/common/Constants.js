angular.module('webapp')
  .constant('CONFIGS', {
    userType: [
      {
        text: '超级管理员', value: 0
      },
      {
        text: '普通用户', value: 1
      },
      {
        text: '商户', value: 2
      }
    ],
    roleType: [
      {
        text: '超级管理员', value: 0
      },
      {
        text: '普通用户', value: 1
      },
      {
        text: '商户', value: 2
      }
    ],
    sexType:[
      {
        text: '男', value: 0
      },
      {
        text: '女', value: 1
      }
    ]
});
