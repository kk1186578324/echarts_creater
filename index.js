function createEcharts(option) {
    var defult = {
        "container": "",
         width: 500,
         height: 500
    }
    console.log(option)
    this.option = $.extend({}, defult, option);

    this._checkMap = this._checkMap.bind(this);//改变this指向

}

createEcharts.prototype = {
    init: function () {
        this._createLog(this.option.container);
        this._createChartsBox(this.option);
    },
    //创建图标组件
    _createdLogImg: function (btBox) {
        var chartData = setmap;
        var self = this;
        $.each(chartData, function (value, item) {
            $('<div class="img-wrap"><img  class="img-log" src="./img/' + value + '.png"/><p>' + item.option.title.text + '</p></div>').unbind("click").bind("click", {
                "type": value,
                "params": item
            }, self._checkMap).appendTo(btBox);
        })
    },
    //请求配置
    _checkMap: function (config) {

        console.log(this);
        var self = this;
        $.getJSON('tsconfig.json',function (result) {
            self._render(config, result)
        });
    },
    //获取配置参数
    _render: function (config, result) {
        console.log(config, result)
        var type = config.data.type;//图表类型
        var data = result.content[type];//获取的数据
        var option = config.data.params.option;//获取的配置
        var renderData = config.data.params["renderData"];//需要渲染的参数
        var self = this;
        if (type === "map") {
           this._initMap(function (data) {
               self._initEachData(option,renderData,data);
           }, result);
        }else {
              this._initEachData(option,renderData,data);
         }
    },
    //组装数据渲染
    _initEachData:function (option,renderData,data) {
        $.each(renderData, function (index, value) {
            $.each(value, function (param, item) {
                console.log(param, item)
                if (param === "series") {
                    option[param][0][item] = data[param][item]
                } else {
                    option[param][item] = data[param][item]
                }
            })
        })
        this._show(option);

    },

    //初始化地图
    _initMap: function (pramdata, result) {

        var initMap = result.content.map;
       console.log(initMap)
        //直辖市和特别行政区-只有二级地图，没有三级地图
        var special = ["北京", "天津", "上海", "重庆", "香港", "澳门"];
        var mapdata = {
            series:{
                data:[]
            }
        };
        var chart = echarts.init(document.getElementById('chartsBox'));
        $.getJSON('./map/china.json', function (data) {
            console.log(mapdata)
            d = [];
            for (var i = 0; i < data.features.length; i++) {
                d.push({
                    name: data.features[i].properties.name
                })
            }

            console.log(initMap)
            mapdata.series.data = d;
            mapdata.series.name = "china";
            mapdata.series.mapType = "china";
            //注册地图
            echarts.registerMap('china', data);

            pramdata(mapdata);
        });

        //地图点击事件
        chart.off('click')
        chart.on('click', function (params) {
            if (params.componentSubType === "map") {
                if (params.name in initMap.series.data) {

                    //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                    $.getJSON('./map/province/' + initMap.series.data[params.name] + '.json', function (data) {
                        echarts.registerMap(params.name, data);
                        var d= [];
                        var childData = {
                            series:{
                                data:[]
                            }
                        };
                        for (var i = 0; i < data.features.length; i++) {
                            d.push({
                                name: data.features[i].properties.name
                            })
                        }
                        childData.series.data = d;
                        childData.series.name = params.name;
                        childData.series.mapType = params.name;
                        pramdata(childData);
                    });
                } else if (params.seriesName in initMap.series.data) {
                    //如果是【直辖市/特别行政区】只有二级下钻
                    if (special.indexOf(params.seriesName) >= 0) {
                        pramdata(mapdata);
                    } else {
                        //显示县级地图
                        console.log(initMap.series.cityMap[params.name])
                        $.getJSON('./map/city/' + initMap.series.cityMap[params.name] + '.json', function (data) {
                            echarts.registerMap(params.name, data);
                            var d = [];
                            var childData = {
                                series:{
                                    data:[]
                                }
                            };
                            for (var i = 0; i < data.features.length; i++) {
                                d.push({
                                    name: data.features[i].properties.name
                                })
                            }
                            childData.series.data = d;
                            childData.series.name = params.name;
                            childData.series.mapType = params.name;
                            pramdata(childData);
                        });
                    }
                } else {
                    pramdata(mapdata);
                }
            }
        });

    },
    //展示图表
    _show: function (config) {
        var dom = document.getElementById("chartsBox");
        var myCharts = echarts.init(dom);
        this.option.config = config
        myCharts.clear();
        myCharts.setOption(config,true);
    },
    //创建图表容器
    _createChartsBox: function (option) {
        var $chatsBox = $('<div class="charts-box" id="chartsBox"></div>').appendTo($("#" + option.container))
        $chatsBox.css({
            width: option.width + "px",
            height: option.height + "px"
        })

    },
    //创建图标容器
    _createLog: function (cb) {
        var $logBox = $('<div class="log-box clearfloat"></div>').appendTo($("#" + cb));
        this._createdLogImg($logBox);
    },
    //返回配置
    getEchartsConfig: function () {
        return this.option.config;
    }

}
Object.defineProperty(createEcharts.prototype,'constructor',{
    enumerable:false,
    value:createEcharts
})

