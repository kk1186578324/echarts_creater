var setmap = {

    "line": {
        option: {
            title: {
                text: "折线图"
            },
            xAxis: {
                type: 'category',
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [],
                type: 'line'
            }],
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}

                }
            },
        },
        renderData: [{xAxis: "data"}, {series: "data"}]
    },

    "bar": {
        option: {
            title: {
                text: "柱状图"
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}

                }
            },
            xAxis: {
                type: 'category',
                data: []

            },
            yAxis: {
                type: 'value'
            },
            series: [{
                type: 'bar',
                data: []
            }]
        },
        renderData: [{xAxis: "data"}, {series: "data"}]

    },
    "pie": {
        option: {
            title: {
                text: '饼状图',
                subtext: '纯属虚构',
                x: 'center'
            },
            toolbox: {
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}

                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: []

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        },
        renderData: [{legend: "data"}, {series: "data"}]


    },

    "scatter":{
        option: {
            title: {
                text: '散点图',
            },
            xAxis: {},
            yAxis: {},
            series: [{
                symbolSize: 20,
                data: [],
                type: 'scatter'
            }]
        },
        renderData: [{series: "data"}]
    },

    "map": {
        option:{
            title: {
                text: '中国地图',
                subtext: '三级下钻',
                left: 'center',
                textStyle: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei"
                },
                subtextStyle: {
                    color: '#ccc',
                    fontSize: 13,
                    fontWeight: 'normal',
                    fontFamily: "Microsoft YaHei"
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}'
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                },
                iconStyle: {
                    normal: {
                        color: '#fff'
                    }
                }
            },
            animationDuration: 1000,
            animationEasing: 'cubicOut',
            animationDurationUpdate: 1000,
            series: [
                {

                    type: 'map',
                    roam: false,
                    nameMap: {
                        'china': '中国'
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#999',
                                fontSize: 13
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: '#fff',
                                fontSize: 13
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            areaColor: '#323c48',
                            borderColor: 'dodgerblue'
                        },
                        emphasis: {
                            areaColor: 'darkorange'
                        }
                    },
                    data:[],
                    name:"",
                    mapType:""
                }
            ]
        },
        renderData:[{series:"data"},{series:"mapType"},{series:"name"}]
    },


    "gauge":{
        option:{
            title:{
                text:'仪表盘'
            },
            tooltip:{
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    min: "",
                    max: "",
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data:[]
                }
            ]
        },
        renderData:[
            {series:"data"},
            {series:"min"},
            {series:"max"}
        ]
    },
    "radar":{
        option:{
            title: {
                text: '雷达图'
            },
            legend: {
                data: []
            },
            radar: {
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator:[]
            },
            series: [{
                type: 'radar',
                data: []
            }]
          },
         renderData:[
             {legend:"data"},
             {radar:"indicator"},
             {series:"data"}
           ]

        }

}