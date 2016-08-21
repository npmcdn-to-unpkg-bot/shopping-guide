angular.module('webapp')
  .constant('CONFIGS', {
    //用户类性
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
    //角色
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
    //性别
    sexType:[
      {
        text: '男', value: 0
      },
      {
        text: '女', value: 1
      }
    ],
    //商户审核
    merchantStatus: [
      {
        text: '待审核', value: 0
      },
      {
        text: '已驳回', value: 1
      },
      {
        text: '已通过', value: 2
      }
    ],
    //保证金审核
    moneyStatus: [
      {
        text: '待审核', value: 0
      },
      {
        text: '已驳回', value: 1
      },
      {
        text: '已通过', value: 2
      }
    ],
    //活动状态
    activityStatus: [
      {
        text: '未启用', value: 0
      },
      {
        text: '启用', value: 1
      },
      {
        text: '停止', value: 2
      }
    ],
    //广告审核状态
    adStatus: [
      {
        text: '待审核', value: 0
      },
      {
        text: '已驳回', value: 1
      },
      {
        text: '已通过', value: 2
      }
    ]
});
