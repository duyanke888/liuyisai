function main() {
    //显示聚类结果
    //加载地图
    loadMap1();

}

function loadMap1() {

    //--地图初始化--
    var resolutions = [
        156543.0339,
        78271.516953125,
        39135.7584765625,
        19567.87923828125,
        9783.939619140625,
        4891.9698095703125,
        2445.9849047851562,
        1222.9924523925781,
        611.4962261962891,
        305.74811309814453,
        152.87405654907226,
        76.43702827453613,
        38.218514137268066,
        19.109257068634033,
        9.554628534317016,
        4.777314267158508,
        2.388657133579254,
        1.194328566789627,
        0.5971642833948135
    ];
    var extent = [-20037508.342787, -3646008.8931214325, 13626025.650947656, 20037508.342787]; //全球范围
    var cjExtent = [11645799.848829, 3337390.925879, 13576525.097148, 3808734.721170]  //长江水系范围	            

    var chartLayer =
        new ol.layer.Tile({
            title: "南京辖区",
            source: new ol.source.TileWMS({
                url: 'http://218.61.5.72:8080/geowebcache/service/wms',
                params: {
                    'LAYERS': '0212nj',
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1'
                },
                tileGrid: new ol.tilegrid.TileGrid({
                    resolutions: resolutions,
                    origin: [-2.0037508342787E7, 2.0037508342787E7],
                    tileSize: 256
                }),
                extent: cjExtent
            })
        });

    var tdtLayer = new ol.layer.Tile({
        title: "交通图",
        type: 'base',
        visible: true,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer1 = new ol.layer.Tile({
        title: "卫星图",
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer2 = new ol.layer.Tile({
        title: "地形图",
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer3 = new ol.layer.Tile({
        title: "地名",
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var source_N01 = new ol.source.Vector({ wrapX: true });
    var v_layer_N01 = new ol.layer.Vector({
        //    	title: "航段",
        source: source_N01,//航段
        visible: false
    });
    var source_N02 = new ol.source.Vector({ wrapX: true });
    var v_layer_N02 = new ol.layer.Vector({
        source: source_N02,//水道
        visible: false

    });
    var source_N03 = new ol.source.Vector({ wrapX: true });
    var v_layer_N03 = new ol.layer.Vector({
        source: source_N03//面
    });
    var source_N04 = new ol.source.Vector({ wrapX: true });
    var v_layer_N04 = new ol.layer.Vector({
        source: source_N04//线
    });
    var source_N05 = new ol.source.Vector({ wrapX: true });
    var v_layer_N05 = new ol.layer.Vector({
        source: source_N05//点
    });

    //**************************************************************************
    var source_point = new ol.source.Vector({ wrapX: true });
    var v_layer_point = new ol.layer.Vector({
        source: source_point//画聚类后的点
    });
    //*****************************************************************************

    var NavlineSource = new ol.source.Vector({});
    var NavLineLayer = new ol.layer.Vector({
        title: "航线",
        source: NavlineSource,
        maxResolution: 2445.9849047851562,
        visible: false
    });
    //	map.addLayer(NavLineLayer);

    var NavPointSource = new ol.source.Vector({});
    var NavPointLayer = new ol.layer.Vector({
        title: "转向点",
        source: NavPointSource,
        maxResolution: 611.4962261962891,
        visible: false
    });
    //    map.addLayer(NavPointLayer);
    var routeGroup = new ol.layer.Group({
        title: '航线层',
        layers: [NavLineLayer, NavPointLayer],
    });

    var msFeatureGroup = new ol.layer.Group({
        title: '要素层',
        layers: [v_layer_N01, v_layer_N02, v_layer_N03, v_layer_N04, v_layer_N05]
    });

    var baseLayerGroup = new ol.layer.Group({
        'title': '地图',
        layers: [tdtLayer, tdtlayer1, tdtlayer2, tdtlayer3]
    })

    var overLayerGroup = new ol.layer.Group({
        'title': '航道图',
        layers: [chartLayer]
    })

    var view = new ol.View({
        projection: 'EPSG:3857',
        center: [13318007.46, 3815018.525],
        zoom: 10,
        // maxZoom:18,
        // minZoom:5,
        extent: cjExtent
    });

    var map = new ol.Map({
        controls: ol.control.defaults().extend([
            new ol.control.ZoomToExtent({
                extent: cjExtent
            }),
            new ol.control.ScaleLine({}),
            //new ol.control.MeasureTool({
            //    sphereradius : 6378137,//sphere radius
            //})

        ]),
        interactions: ol.interaction.defaults({ doubleClickZoom: false }),
        layers: [baseLayerGroup, overLayerGroup, msFeatureGroup, routeGroup],
        target: 'map',
        view: view
    });


    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: "EPSG:4326",
        className: "custom-mouse-position",
        target: document.getElementById("mouse-position"),
        undefinedHTML: "&nbsp"
    });
    map.addControl(mousePositionControl);

    var select = new ol.interaction.Select({
        // condition: click,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: "#0f5bce"
            }),
            stroke: new ol.style.Stroke({
                color: "red",
                width: 2
            })
        })
    });
    map.addInteraction(select);
    var selectFeature = select.getFeature;
    map.on('singleclick', function (evt) {
        alert("点击要素");
        var selectStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: "#0f5bce"
            }),
            stroke: new ol.style.Stroke({
                color: "red",
                width: 2
            })
        })
        routeGroup.setStyle(selectStyle)
    })

    //********************************************************************************************
    //********************************************************************************************
    //全局变量
    var pointDic = [];
    var jsonData = [{}];

    // //创建数据库连接对象
    // var conn = new ActiveXObject("ADODB.Connection");
    // //创建数据集对象
    // var rs = new ActiveXObject("ADODB.Recordset");
    // try {
    //     //数据库连接串，具体配置请参考：http://www.connectionstrings.com/
    //     //如果不知道如何配置连接串，可以通过配置UDL文件后用文本编辑器打开获得
    //     var connectionstring = "Server=59.46.172.133;Database=njwfw;User=njwfw; Password=njwfw0987;Port=1521";

    //     //打开连接
    //     conn.open(connectionstring);

    //     //查询语句
    //     var sql = " select * from D_SZHX_HX ";

    //     //打开数据集（即执行查询语句）
    //     rs.open(sql, conn);

    //     //遍历所有记录
    //     while (!rs.eof) {
    //         for (var i=0; i < rs.fields.count; i++) 
    //         {      
    //             alert(rs.fields(i).name + ":" + rs.fields(i).value); //依次输出查出的一行数据的各字段数据 
    //         } 
    //         //下一条记录
    //         rs.moveNext();
    //     }

    //     //关闭记录集
    //     rs.close();
    //     //关闭数据库连接
    //     conn.close();
    // } catch (e) {
    //     //异常报告
    //     WScript.Echo(e.message);
    // } finally {
    //     //
    // }

    //读取url画航线
    readUrl1(map);
    readUrl(map);
    //加载聚类点
    getPoint(map);
    drawGaocenghangxian(map);
    drawPointLine(map);

    //********************************************************************************************
    //********************************************************************************************
    function drawPointLine(map) {
        $.ajax({
            type: "POST",
            url: './WEB-INF/source/1002route.json',//应该换为远程接口
            asysnc: false,
            success: function (result) {
                successPointLine(result)
            }//end success
        })//end ajax
    }

    function successPointLine(result) {
        var result1 = result.split(/[\n]/);
        var length = result1.length;
        for (let i = 0; i < length; i++) {
            const element0 = result1[i];
            //"{"Type":"keypoint", "id":19887, "name":"高层节点1", "Coord":[121.32831875,31.55025]},{"Type":"waypoint", "id":17336, "name":"浏河口至天生港（上行）2", "Coord":[121.313446,31.569078]},{"Type":"keypoint", "id":19888, "name":"高层节点2", "Coord":[121.29176866666666,31.595125]}"
            var element = element0.replace(/\"/g, "");
            for (let j = 0; j < element.length; j++) {
                const ele = element[j];
                var coord = ele.Coord;
                var element1 = coord.replace(/\[|]/g, "");
                var element2 = element1.split(/[,]/);
            }
        }
    }

    function drawGaocenghangxian(map) {
        $.ajax({
            type: "POST",
            // url:'./WEB-INF/source/gaocenghangxian0928.txt',//应该换为远程接口
            url: './WEB-INF/source/gaocenghangxian0928.txt',//应该换为远程接口
            asysnc: false,
            success: function (result) {
                successLoadGCHX(result)
            }//end success
        })//end ajax
    }//end drawGaocenghangxian

    function successLoadGCHX(result) {
        var result1 = result.split(/[\n]/);
        var length = result1.length;
        for (let i = 0; i < length; i++) {
            const element = result1[i];
            var element1 = element.replace(/\[|]/g, "");
            var element2 = element1.split(/[,]/);
            var coords = new Array;//用来存放坐标
            for (let j = 0; j < element2.length; j = j + 2) {
                const ele = element2[j];
                const lel = element2[j + 1];
                var ff = parseFloat(ele);
                var gg = parseFloat(lel);
                var lineArray = new Array;
                lineArray.push(ff, gg)
                var poord = new ol.proj.transform(lineArray, 'EPSG:4326', 'EPSG:3857')
                coords.push(poord);
            }
            // alert(lineArray)
            var feature = new ol.Feature(
                new ol.geom.LineString(coords),
            );//end feature
            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'black',
                }),
                stroke: new ol.style.Stroke({
                    color: 'black',
                    width: 5
                })
            }))//end style
            var source = new ol.source.Vector({
                features: [feature]
            });
            var layer = new ol.layer.Vector({
                source: source
            });
            map.addLayer(layer);
        }//end for
    }

    function readUrl1(map) {
        $.ajax({
            type: "POST",
            // url:'./WEB-INF/source/hx.json',//应该换为远程接口
            url: './WEB-INF/source/hx0925.json',
            asysnc: false,
            dataType: 'json',
            success: function (result) {
                //getJSONData(data);//得到json数据
                successLoadRoute1(result);//成功读取JSON文件后加载此函数
            }//end success
        })//end ajax
    }//end readUrl(map)
    function successLoadRoute1(result) {
        var data = result.data;
        var road = data.nodes;

        for (let i = 0; i < road.length; i++) {
            var element = road[i];//
            var name = element.name;//
            var pointArray = element.pointarray;//
            var coords = new Array;//用来存放坐标
            for (let j = 0; j < pointArray.length; j++) {
                var details = pointArray[j];
                var lon = parseFloat(details.lon);
                var lat = parseFloat(details.lat);
                var lonlat = new Array;
                lonlat.push(lon, lat);
                var poord = new ol.proj.transform(lonlat, 'EPSG:4326', 'EPSG:3857')
                coords.push(poord);
            }//end for
            var feature = new ol.Feature(
                new ol.geom.LineString(coords),
            );//end feature
            if (name.search("高层航线") != -1) {
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'yellow',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'yellow',
                        width: 2
                    })
                })
                );//end setStyle
            } else {
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'red',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 1
                    })
                })
                );//end setStyle
            }
            // feature.setStyle(new ol.style.Style({
            //     fill: new ol.style.Fill({
            //         color: 'red',
            //       }),
            //       stroke: new ol.style.Stroke({
            //         color:'red',
            //         width:1
            //       })
            //     })
            // );//end setStyle
            feature.set("name", name);
            var source = new ol.source.Vector({
                features: [feature]
            });
            var layer = new ol.layer.Vector({
                source: source
            });
            map.addLayer(layer);
        }//end for

        // for (let i = 72; i < road.length; i++) {
        //     var element = road[i];//
        //     var name = element.name;//
        //     var pointArray = element.pointarray;//
        //     var coords = new Array;//用来存放坐标
        //     for (let j = 0; j < pointArray.length; j++) {
        //         var details = pointArray[j];
        //         var lon = parseFloat(details.lon);
        //         var lat = parseFloat(details.lat);
        //         var lonlat = new Array;
        //         lonlat.push(lon,lat);
        //         var poord = new ol.proj.transform(lonlat,'EPSG:4326', 'EPSG:3857')
        //         coords.push(poord);
        //     }//end for
        //     var feature = new ol.Feature(
        //         new ol.geom.LineString(coords),
        //     );//end feature
        //     feature.setStyle(new ol.style.Style({
        //         fill: new ol.style.Fill({
        //             color: 'blue',
        //           }),
        //           stroke: new ol.style.Stroke({
        //             color:'blue',
        //             width:3
        //           })
        //         })
        //     );//end setStyle
        //     feature.set("name",name);
        //     var source = new ol.source.Vector({
        //         features:[feature]
        //     });
        //     var layer = new ol.layer.Vector({
        //         source: source
        //     });
        //     map.addLayer(layer);    
        // }//end for

        //加载一个鼠标点击显示信息的事件
        /**
         * 点击要素
         */
        function clickMapFeature(event) {
            // this.$options.methods.showDtailsInMap(newfeature.values_.hdtgGeometry);
            var pixel = map.getEventPixel(event.originalEvent);
            map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                if (feature != undefined) {
                    if (feature.S.name != undefined) {
                        alert(feature.S.name);
                    } else {
                        alert(feature.S.id);
                    }
                }
            })
        };
        map.on('click', function (event) {
            // var pixel = map.getEventPixel(event.originalEvent);
            // map.forEachFeatureAtPixel(pixel,function(feature,layer){
            // if (feature != undefined) {
            //     var ddd = feature.getGeometry().A;
            //     var coord = new ol.proj.transform(ddd,'EPSG:3856','EPSG:4326')
            //     alert(coord);
            //     }
            // })
            clickMapFeature(event)
        })
    }//end successLoadRoute

    function readUrl(map) {
        $.ajax({
            type: "POST",
            // url:'./WEB-INF/source/hx.json',//应该换为远程接口
            url: './WEB-INF/source/hx0927.json',
            asysnc: false,
            dataType: 'json',
            success: function (result) {
                //getJSONData(data);//得到json数据
                successLoadRoute(result);//成功读取JSON文件后加载此函数
            }//end success
        })//end ajax
    }//end readUrl(map)
    function successLoadRoute(result) {
        var data = result.data;
        var road = data.nodes;

        for (let i = 0; i < road.length; i++) {
            var element = road[i];//
            var name = element.name;//
            var pointArray = element.pointarray;//
            var coords = new Array;//用来存放坐标
            for (let j = 0; j < pointArray.length; j++) {
                var details = pointArray[j];
                var lon = parseFloat(details.lon);
                var lat = parseFloat(details.lat);
                var lonlat = new Array;
                lonlat.push(lon, lat);
                var poord = new ol.proj.transform(lonlat, 'EPSG:4326', 'EPSG:3857')
                coords.push(poord);
            }//end for
            var feature = new ol.Feature(
                new ol.geom.LineString(coords),
            );//end feature
            if (name.search("高层航线") != -1) {
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'green',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'green',
                        width: 1
                    })
                })
                );//end setStyle
            } else {
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'red',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 1
                    })
                })
                );//end setStyle
            }
            // feature.setStyle(new ol.style.Style({
            //     fill: new ol.style.Fill({
            //         color: 'red',
            //       }),
            //       stroke: new ol.style.Stroke({
            //         color:'red',
            //         width:1
            //       })
            //     })
            // );//end setStyle
            feature.set("name", name);
            var source = new ol.source.Vector({
                features: [feature]
            });
            var layer = new ol.layer.Vector({
                source: source
            });
            map.addLayer(layer);
        }//end for

        // for (let i = 72; i < road.length; i++) {
        //     var element = road[i];//
        //     var name = element.name;//
        //     var pointArray = element.pointarray;//
        //     var coords = new Array;//用来存放坐标
        //     for (let j = 0; j < pointArray.length; j++) {
        //         var details = pointArray[j];
        //         var lon = parseFloat(details.lon);
        //         var lat = parseFloat(details.lat);
        //         var lonlat = new Array;
        //         lonlat.push(lon,lat);
        //         var poord = new ol.proj.transform(lonlat,'EPSG:4326', 'EPSG:3857')
        //         coords.push(poord);
        //     }//end for
        //     var feature = new ol.Feature(
        //         new ol.geom.LineString(coords),
        //     );//end feature
        //     feature.setStyle(new ol.style.Style({
        //         fill: new ol.style.Fill({
        //             color: 'blue',
        //           }),
        //           stroke: new ol.style.Stroke({
        //             color:'blue',
        //             width:3
        //           })
        //         })
        //     );//end setStyle
        //     feature.set("name",name);
        //     var source = new ol.source.Vector({
        //         features:[feature]
        //     });
        //     var layer = new ol.layer.Vector({
        //         source: source
        //     });
        //     map.addLayer(layer);    
        // }//end for

        //加载一个鼠标点击显示信息的事件
        /**
         * 点击要素
         */
        function clickMapFeature(event) {
            // this.$options.methods.showDtailsInMap(newfeature.values_.hdtgGeometry);
            var pixel = map.getEventPixel(event.originalEvent);
            map.forEachFeatureAtPixel(pixel, function (feature, layer) {
                if (feature != undefined) {
                    if (feature.S.name != undefined) {
                        alert(feature.S.name);
                    } else {
                        alert(feature.S.id);
                    }
                }
            })
        };
        map.on('click', function (event) {
            // var pixel = map.getEventPixel(event.originalEvent);
            // map.forEachFeatureAtPixel(pixel,function(feature,layer){
            // if (feature != undefined) {
            //     var ddd = feature.getGeometry().A;
            //     var coord = new ol.proj.transform(ddd,'EPSG:3856','EPSG:4326')
            //     alert(coord);
            //     }
            // })
            clickMapFeature(event)
        })
    }//end successLoadRoute
    //********************************************************************************************
    //********************************************************************************************
    //***点相关************************************************************************************
    //********************************************************************************************
    //定义聚类点函数
    function getPoint(map) {
        $.ajax({
            type: "POST",
            // url:'./WEB-INF/source/d_szhd_feature.json',
            url: './WEB-INF/source/jiedian092502.json',
            asysnc: false,
            dataType: 'json',
            success: function (data) {
                //getJSONData(data);//得到json数据
                successLoadPoint(data);//成功读取JSON文件后加载此函数
            }
        })
    }
    //点相关函数
    function successLoadPoint(data) {

        var records = data.RECORDS;
        //jsonData.push(records);
        var pointsArray = new Array;
        var pointsArray_putong = new Array;
        var pointsArray_clustering = new Array;
        var point_Important = new Array;
        var numberOfImportant = 0;
        var length = records.length;
        // var aaa = getByID(6050,records,"lat");
        // console.log("id:",aaa);

        for (var i = 0; i < length; i++) {
            jsonData.push(records[i]);
            var id = records[i].ID;
            var basetype = records[i].BASETYPE;

            /**把所有点放在一个数组里面 */
            if (id >= 17335) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray.push([end_lon, end_lat]);

                //pointDic[id] = [end_lon,end_lat];
                //pointDic.add(id,[end_lon,end_lat]);//存成字典的形式
                pointDic.push(id, [end_lon, end_lat]);
            }

            /*画聚类所需的点*/
            if (id >= 17335 && id < 19887) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray_putong.push([end_lon, end_lat]);
                /*画重点的点 */
                if (basetype != 2) {
                    var end_lat = records[i].END_LAT;
                    var end_lon = records[i].END_LON;
                    point_Important.push([end_lon, end_lat]);
                    numberOfImportant = numberOfImportant + 1;
                }
            }

            /*画聚类后的点*/
            if (id >= 19887) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray_clustering.push([end_lon, end_lat]);
            }



            // /*画所有的点*/
            // //定义两个数组，存放x和y值，全部存完后，再一个一个画
            // end_lat = records[i].END_LAT;
            // end_lon = records[i].END_LON;
            // pointsArray.push([end_lon,end_lat]);

        }
        console.log(numberOfImportant);

        //逐个画点
        for (var j = 0; j < 2572; j++) {
            var arr = pointsArray_putong[j];
            var id = records[j].ID;
            drawPoints(j, arr, id);
            if (j < 32) {
                var arr_clustering = pointsArray_clustering[j];
                drawClusteringPoints(j, arr_clustering, id);
            }
            // if (j<numberOfImportant) {
            //     var arr_import = point_Important[j];
            //     drawImportant(j,arr_import,id);
            // }              
        }

        // for (var j = 0; j < 2552; j++) {
        //     var arr = pointsArray[j];
        //     drawPoints(j,arr);
        // }
    }

    //画普通点函数
    function drawPoints(i, arr, id) {
        var point_feature = new ol.Feature({});
        var point_geom = new ol.geom.Point(ol.proj.fromLonLat(arr));
        point_feature.setGeometry(point_geom);
        point_feature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'red'
                })
            })
        })
        );
        point_feature.set("id", id);
        var source = new ol.source.Vector({
            features: [point_feature]
        });
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);
    }

    //画聚类点函数
    function drawClusteringPoints(i, arr, id) {
        var clusteringpoint_feature = new ol.Feature({});
        var point_geom1 = new ol.geom.Point(ol.proj.fromLonLat(arr));
        clusteringpoint_feature.setGeometry(point_geom1);
        clusteringpoint_feature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 10,
                fill: new ol.style.Fill({
                    color: 'green'
                })
            })
        })
        );
        clusteringpoint_feature.set("id", id);
        var source_clustering = new ol.source.Vector({
            features: [clusteringpoint_feature]
        });
        var layer_clustering = new ol.layer.Vector({
            source: source_clustering
        });
        map.addLayer(layer_clustering);
    }

    //画重点函数
    function drawImportant(i, arr, id) {
        var clusteringpoint_feature = new ol.Feature({});
        var point_geom1 = new ol.geom.Point(ol.proj.fromLonLat(arr));
        clusteringpoint_feature.setGeometry(point_geom1);
        clusteringpoint_feature.setStyle(new ol.style.Style({
            image: new ol.style.Icon({
                radius: 10,
                src: './WEB-INF/images/point.png'
            })
        })
        );
        clusteringpoint_feature.set("id", id);
        var source_clustering = new ol.source.Vector({
            features: [clusteringpoint_feature]
        });
        var layer_clustering = new ol.layer.Vector({
            source: source_clustering
        });
        map.addLayer(layer_clustering);
    }

}//end loadMap1