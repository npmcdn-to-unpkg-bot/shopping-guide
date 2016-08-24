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
    sexType: [
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
    //有效性
    activityType: [
      {
        text: '有效', value: 0
      },
      {
        text: '无效', value: 1
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
    ],
    //有效性
    adType: [
      {
        text: '有效', value: 0
      },
      {
        text: '无效', value: 1
      }
    ],
    // 商品状态：
    // 0：已提交，待审核
    // 1：已驳回
    // 2：审核通过，未上架
    // 3：已上架
    shopType: [
      {
        text: '待审核', value: 0
      },
      {
        text: '已驳回', value: 1
      },
      {
        text: '审核通过', value: 2
      },
      {
        text: '上架', value: 3
      },
      {
        text: '下架', value: 4
      }
    ]

  });
