const geoCoordMap = {
  黑龙江省: [126.642464, 45.756967],
  内蒙古自治区: [111.670801, 40.818311],
  新疆自治区: [87.617733, 43.792818],
  吉林省: [125.3245, 43.886841],
  辽宁省: [123.429096, 41.796767],
  北京市: [116.405285, 39.904989],
  天津市: [117.190182, 39.125596],
  河北省: [114.502461, 38.045474],
  山西省: [112.549248, 37.857014],
  陕西省: [108.948024, 34.263161],
  宁夏自治区: [106.278179, 38.46637],
  甘肃省: [103.823557, 36.058039],
  青海省: [101.778916, 36.623178],
  西藏自治区: [91.132212, 29.660361],
  山东省: [117.000923, 36.675807],
  河南省: [113.665412, 34.757975],
  四川省: [104.065735, 30.659462],
  江苏省: [118.767413, 32.041544],
  上海市: [121.472644, 31.231706],
  安徽省: [117.283042, 31.86119],
  浙江省: [120.153576, 30.287459],
  湖北省: [114.298572, 30.584355],
  重庆市: [106.504962, 29.533155],
  福建省: [119.306239, 26.075302],
  江西省: [115.892151, 28.676493],
  湖南省: [112.982279, 28.19409],
  贵州省: [106.713478, 26.578343],
  云南省: [102.712251, 25.040609],
  广东省: [113.280637, 23.125178],
  广西省: [108.320004, 22.82402],
  海南: [110.33119, 20.031971],
  澳门: [113.54909, 22.198951],
  台湾省: [121.509062, 25.044332],
  香港: [114.173355, 22.320048]
};

const linesEndCoords = {
  黑龙江省: [
    {
      name: '黑龙江省',
      coord: geoCoordMap['黑龙江省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['黑龙江省'][0] + 6, geoCoordMap['黑龙江省'][1]],
      symbol: 'none'
    }
  ],
  内蒙古自治区: [
    {
      name: '内蒙古自治区',
      coord: geoCoordMap['内蒙古自治区'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['内蒙古自治区'][0], geoCoordMap['内蒙古自治区'][1] + 5],
      symbol: 'none'
    }
  ],
  新疆自治区: [
    {
      name: '新疆自治区',
      coord: geoCoordMap['新疆自治区'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['新疆自治区'][0] - 5, geoCoordMap['新疆自治区'][1]],
      symbol: 'none'
    }
  ],
  吉林省: [
    {
      name: '吉林省',
      coord: geoCoordMap['吉林省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['吉林省'][0] + 9, geoCoordMap['吉林省'][1]],
      symbol: 'none'
    }
  ],
  辽宁省: [
    {
      name: '辽宁省',
      coord: geoCoordMap['辽宁省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['辽宁省'][0] + 15, geoCoordMap['辽宁省'][1]],
      symbol: 'none'
    }
  ],
  北京市: [
    {
      name: '北京市',
      coord: geoCoordMap['北京市'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['北京市'][0] + 10, geoCoordMap['北京市'][1]],
      symbol: 'none'
    }
  ],
  天津市: [
    {
      name: '天津市',
      coord: geoCoordMap['天津市'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['天津市'][0] + 5, geoCoordMap['天津市'][1] + 14],
      symbol: 'none'
    }
  ],
  河北省: [
    {
      name: '河北省',
      coord: geoCoordMap['河北省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['河北省'][0] + 20, geoCoordMap['河北省'][1]],
      symbol: 'none'
    }
  ],
  山西省: [
    {
      name: '山西省',
      coord: geoCoordMap['山西省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['山西省'][0] + 3, geoCoordMap['山西省'][1] + 12],
      symbol: 'none'
    }
  ],
  陕西省: [
    {
      name: '陕西省',
      coord: geoCoordMap['陕西省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['陕西省'][0] - 50, geoCoordMap['陕西省'][1]],
      symbol: 'none'
    }
  ],
  宁夏自治区: [
    {
      name: '宁夏自治区',
      coord: geoCoordMap['宁夏自治区'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['宁夏自治区'][0], geoCoordMap['宁夏自治区'][1] + 10],
      symbol: 'none'
    }
  ],
  甘肃省: [
    {
      name: '甘肃省',
      coord: geoCoordMap['甘肃省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['甘肃省'][0]-3, geoCoordMap['甘肃省'][1] + 8],
      symbol: 'none'
    }
  ],
  青海省: [
    {
      name: '青海省',
      coord: geoCoordMap['青海省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['青海省'][0] - 30, geoCoordMap['青海省'][1]],
      symbol: 'none'
    }
  ],
  西藏自治区: [
    {
      name: '西藏自治区',
      coord: geoCoordMap['西藏自治区'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['西藏自治区'][0] - 10, geoCoordMap['西藏自治区'][1]],
      symbol: 'none'
    }
  ],
  山东省: [
    {
      name: '山东省',
      coord: geoCoordMap['山东省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['山东省'][0] + 10, geoCoordMap['山东省'][1]],
      symbol: 'none'
    }
  ],
  河南省: [
    {
      name: '河南省',
      coord: geoCoordMap['河南省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['河南省'][0] + 25, geoCoordMap['河南省'][1]],
      symbol: 'none'
    }
  ],
  四川省: [
    {
      name: '四川省',
      coord: geoCoordMap['四川省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['四川省'][0] - 40, geoCoordMap['四川省'][1] + 1],
      symbol: 'none'
    }
  ],
  江苏省: [
    {
      name: '江苏省',
      coord: geoCoordMap['江苏省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['江苏省'][0] + 5, geoCoordMap['江苏省'][1] + 1],
      symbol: 'none'
    }
  ],
  上海市: [
    {
      name: '上海市',
      coord: geoCoordMap['上海市'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['上海市'][0] + 25, geoCoordMap['上海市'][1]],
      symbol: 'none'
    }
  ],
  安徽省: [
    {
      name: '安徽省',
      coord: geoCoordMap['安徽省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['安徽省'][0] + 15, geoCoordMap['安徽省'][1]],
      symbol: 'none'
    }
  ],
  浙江省: [
    {
      name: '浙江省',
      coord: geoCoordMap['浙江省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['浙江省'][0] + 12, geoCoordMap['浙江省'][1]-1],
      symbol: 'none'
    }
  ],
  湖北省: [
    {
      name: '湖北省',
      coord: geoCoordMap['湖北省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['湖北省'][0] - 20, geoCoordMap['湖北省'][1] - 14],
      symbol: 'none'
    }
  ],
  重庆市: [
    {
      name: '重庆市',
      coord: geoCoordMap['重庆市'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['重庆市'][0] - 6, geoCoordMap['重庆市'][1] - 10],
      symbol: 'none'
    }
  ],
  福建省: [
    {
      name: '福建省',
      coord: geoCoordMap['福建省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['福建省'][0] + 13, geoCoordMap['福建省'][1] - 5],
      symbol: 'none'
    }
  ],
  江西省: [
    {
      name: '江西省',
      coord: geoCoordMap['江西省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['江西省'][0] + 25, geoCoordMap['江西省'][1]-2],
      symbol: 'none'
    }
  ],
  湖南省: [
    {
      name: '湖南省',
      coord: geoCoordMap['湖南省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['湖南省'][0] + 30, geoCoordMap['湖南省'][1]-5],
      symbol: 'none'
    }
  ],
  贵州省: [
    {
      name: '贵州省',
      coord: geoCoordMap['贵州省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['贵州省'][0] - 15, geoCoordMap['贵州省'][1]],
      symbol: 'none'
    }
  ],
  云南省: [
    {
      name: '云南省',
      coord: geoCoordMap['云南省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['云南省'][0] - 30, geoCoordMap['云南省'][1]],
      symbol: 'none'
    }
  ],
  广东省: [
    {
      name: '广东省',
      coord: geoCoordMap['广东省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['广东省'][0], geoCoordMap['广东省'][1] - 7],
      symbol: 'none'
    }
  ],
  广西省: [
    {
      name: '广西省',
      coord: geoCoordMap['广西省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['广西省'][0], geoCoordMap['广西省'][1] - 5],
      symbol: 'none'
    }
  ],
  海南: [
    {
      name: '海南',
      coord: geoCoordMap['海南'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['海南'][0] + 5, geoCoordMap['海南'][1]],
      symbol: 'none'
    }
  ],
  澳门: [
    {
      name: '澳门',
      coord: geoCoordMap['澳门'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['澳门'][0], geoCoordMap['澳门'][1] - 3],
      symbol: 'none'
    }
  ],
  香港: [
    {
      name: '香港',
      coord: geoCoordMap['香港'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['香港'][0]+5, geoCoordMap['香港'][1]],
      symbol: 'none'
    }
  ],
  台湾省: [
    {
      name: '台湾省',
      coord: geoCoordMap['台湾省'],
      symbol: 'circle',
      symbolSize: 5
    },
    {
      coord: [geoCoordMap['台湾省'][0] + 5, geoCoordMap['台湾省'][1]],
      symbol: 'none'
    }
  ],
  南海诸岛: [
    { name: '南海诸岛', x: '99%', y: '99%', symbol: 'none' },
    { x: '99%', y: '99%', symbol: 'none' }
  ]
};

export { linesEndCoords };
