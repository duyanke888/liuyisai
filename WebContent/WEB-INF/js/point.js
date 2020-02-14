function main(){
    //显示聚类结果
    //加载地图
    loadMap();

}

function loadMap(){

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
    var extent = [-20037508.342787,-3646008.8931214325,13626025.650947656,20037508.342787]; //全球范围
    var cjExtent = [11645799.848829,3337390.925879,13576525.097148,3808734.721170]  //长江水系范围	            

    var chartLayer =
    new ol.layer.Tile({
    title: "南京辖区", 
    source: new ol.source.TileWMS({
    url: 'http://218.61.5.72:8080/geowebcache/service/wms',
    params: {
    'LAYERS': '0212nj',
    'FORMAT': 'image/png',
    'VERSION':'1.1.1'
    },
    tileGrid: new ol.tilegrid.TileGrid({
    resolutions: resolutions,
    origin: [-2.0037508342787E7, 2.0037508342787E7],
    tileSize: 256
    }),
    extent: cjExtent
    })
    });

    var tdtLayer =new ol.layer.Tile({     
    title: "交通图", 
    type: 'base', 
    visible: true,   
    source: new ol.source.XYZ({ 
    url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e' ,
    //url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
    tileGrid: new ol.tilegrid.TileGrid({
    resolutions: resolutions,
    origin: [-2.0037508342787E7, 2.0037508342787E7]})   
    }) 
    }); 

    var tdtlayer1 =new ol.layer.Tile({     
    title: "卫星图", 
    type: 'base', 
    visible: false,   
    source: new ol.source.XYZ({         
    url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e' ,
    //url: 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
    tileGrid: new ol.tilegrid.TileGrid({
    resolutions: resolutions,
    origin: [-2.0037508342787E7, 2.0037508342787E7]})   
    }) 
    });	

    var tdtlayer2 =new ol.layer.Tile({     
    title: "地形图", 
    type: 'base', 
    visible: false,   
    source: new ol.source.XYZ({         
    url: 'http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e' ,
    //url: 'http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
    tileGrid: new ol.tilegrid.TileGrid({
    resolutions: resolutions,
    origin: [-2.0037508342787E7, 2.0037508342787E7]})   
    }) 
    });	

    var tdtlayer3 =new ol.layer.Tile({     
    title: "地名",     
    source: new ol.source.XYZ({         
    url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e' ,
    //url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
    tileGrid: new ol.tilegrid.TileGrid({
    resolutions: resolutions,
    origin: [-2.0037508342787E7, 2.0037508342787E7]})   
    }) 
    });

    var source_N01 = new ol.source.Vector({wrapX: true});
    var v_layer_N01 = new ol.layer.Vector({
    //    	title: "航段",
    source: source_N01,//航段
    visible: false
    });
    var source_N02 = new ol.source.Vector({wrapX: true});
    var v_layer_N02 = new ol.layer.Vector({
    source: source_N02,//水道
    visible: false

    });
    var source_N03 = new ol.source.Vector({wrapX: true});
    var v_layer_N03 = new ol.layer.Vector({
    source: source_N03//面
    });
    var source_N04 = new ol.source.Vector({wrapX: true});
    var v_layer_N04 = new ol.layer.Vector({
    source: source_N04//线
    });
    var source_N05 = new ol.source.Vector({wrapX: true});
    var v_layer_N05 = new ol.layer.Vector({
    source: source_N05//点
    });

    //**************************************************************************
    var source_point = new ol.source.Vector({wrapX:true});
    var v_layer_point = new ol.layer.Vector({
    source:source_point//画聚类后的点
    });
    //*****************************************************************************

    var NavlineSource = new ol.source.Vector({});
    var NavLineLayer = new ol.layer.Vector({
    title: "航线",
    source:NavlineSource,
    maxResolution: 2445.9849047851562,
    visible: false
    });
    //	map.addLayer(NavLineLayer);

    var NavPointSource = new ol.source.Vector({});
    var NavPointLayer = new ol.layer.Vector({
    title: "转向点",
    source:NavPointSource,
    maxResolution: 611.4962261962891,
    visible: false
    });
    //    map.addLayer(NavPointLayer);
    var routeGroup = new ol.layer.Group({
    title: '航线层',   
    layers: [NavLineLayer,NavPointLayer],
    });

    var msFeatureGroup = new ol.layer.Group({
    title: '要素层',   
    layers: [v_layer_N01,v_layer_N02,v_layer_N03,v_layer_N04,v_layer_N05]
    });

    var baseLayerGroup = new ol.layer.Group({
    'title': '地图',
    layers: [tdtLayer,tdtlayer1,tdtlayer2,tdtlayer3]	         
    })

    var overLayerGroup = new ol.layer.Group({
    'title': '航道图',
    layers: [chartLayer]
    })

    var view = new ol.View({
    projection: 'EPSG:3857',
    center: [13318007.46,3815018.525],
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
        new ol.control.ScaleLine({ }),
        //new ol.control.MeasureTool({
        //    sphereradius : 6378137,//sphere radius
        //})

        ]),
        interactions : ol.interaction.defaults({doubleClickZoom :false}),
        layers: [baseLayerGroup,overLayerGroup,msFeatureGroup,routeGroup],
        target: 'map',
        view: view
    });


    var mousePositionControl=new ol.control.MousePosition({
        coordinateFormat:ol.coordinate.createStringXY(4),
        projection:"EPSG:4326",
        className:"custom-mouse-position",
        target:document.getElementById("mouse-position"),
        undefinedHTML:"&nbsp"
    });
    map.addControl(mousePositionControl);

//********************************************************************************************
//********************************************************************************************

    //全局变量
    var pointDic = [];
    var jsonData = [{}];

        //读取url画航线
        // readUrl(map);
    //加载聚类点
    getPoint(map);
    console.log("jsonData:",jsonData);
    //加载聚类线
    // getLine(map);


//********************************************************************************************
//********************************************************************************************
//***点相关************************************************************************************
//********************************************************************************************
    //定义聚类点函数
    function getPoint(map){
        $.ajax({
            type:"POST",
            url:'./WEB-INF/source/d_szhd_feature.json',
            asysnc:false,
            dataType:'json',
            success:function(data){
                //getJSONData(data);//得到json数据
                successLoadPoint(data);//成功读取JSON文件后加载此函数
            }
        })
    }
    //得到json数据
    function getJSONData(data){
        jsonData = data.RECORDS;
        console.log(jsonData);
    }

    //点相关函数
    function successLoadPoint(data){

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
            if ( id >= 17335 ) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray.push([end_lon,end_lat]);
                
                //pointDic[id] = [end_lon,end_lat];
                //pointDic.add(id,[end_lon,end_lat]);//存成字典的形式
                pointDic.push(id,[end_lon,end_lat]);               
            }

            /*画聚类所需的点*/
            if ( id >= 17335 && id < 19887 ) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray_putong.push([end_lon,end_lat]);
                /*画重点的点 */
                if (basetype != 2) {
                    var end_lat = records[i].END_LAT;
                    var end_lon = records[i].END_LON;
                    point_Important.push([end_lon,end_lat]);
                    numberOfImportant = numberOfImportant+1 ;
                }                
            }

            /*画聚类后的点*/
            if (id >= 19887) {
                var end_lat = records[i].END_LAT;
                var end_lon = records[i].END_LON;
                pointsArray_clustering.push([end_lon,end_lat]);
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
            drawPoints(j,arr);
            if (j<20) { 
                var arr_clustering = pointsArray_clustering[j];
                drawClusteringPoints(j,arr_clustering);
            }
            if (j<numberOfImportant) {
                var arr_import = point_Important[j];
                drawImportant(j,arr_import);
            }              
        }

        // for (var j = 0; j < 2552; j++) {
        //     var arr = pointsArray[j];
        //     drawPoints(j,arr);
        // }
    }
    
    //画普通点函数
    function drawPoints(i,arr) {
        var point_feature = new ol.Feature({});
        var point_geom = new ol.geom.Point(ol.proj.fromLonLat(arr));
        point_feature.setGeometry(point_geom);
        point_feature.setStyle(new ol.style.Style({
                image:new ol.style.Circle({
                    radius:5,
                    fill:new ol.style.Fill({
                        color:'red'
                    })
                })
            })
        );
        var source = new ol.source.Vector({
            features:[point_feature]
        });
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);
    }

    //画聚类点函数
    function drawClusteringPoints(i,arr) {
        var clusteringpoint_feature = new ol.Feature({});
        var point_geom1 = new ol.geom.Point(ol.proj.fromLonLat(arr));
        clusteringpoint_feature.setGeometry(point_geom1);
        clusteringpoint_feature.setStyle(new ol.style.Style({
                image:new ol.style.Circle({
                    radius:30,
                    fill:new ol.style.Fill({
                        color:'green'
                    })
                })
            })
        );
        var source_clustering = new ol.source.Vector({
            features:[clusteringpoint_feature]
        });
        var layer_clustering = new ol.layer.Vector({
            source: source_clustering
        });
        map.addLayer(layer_clustering);
    }

        //画重点函数
        function drawImportant(i,arr) {
            var clusteringpoint_feature = new ol.Feature({});
            var point_geom1 = new ol.geom.Point(ol.proj.fromLonLat(arr));
            clusteringpoint_feature.setGeometry(point_geom1);
            clusteringpoint_feature.setStyle(new ol.style.Style({
                    image:new ol.style.Icon({
                        radius:10,
                        src:'./WEB-INF/images/point.png'
                    })
                })
            );
            var source_clustering = new ol.source.Vector({
                features:[clusteringpoint_feature]
            });
            var layer_clustering = new ol.layer.Vector({
                source: source_clustering
            });
            map.addLayer(layer_clustering);
        }

//********************************************************************************************
//********************************************************************************************
//***线相关************************************************************************************
//********************************************************************************************
//定义聚类点函数
function getLine(map){
    $.ajax({
        type:"POST",
        url:'./WEB-INF/source/d_szhd_hx.json',
        dataType:'json',
        success:function(data){
            successLoadLine(data);//成功读取JSON文件后加载此函数
        }
    })
    
    function successLoadLine(data){
        var records_line = data.RECORDS;
        
        for (var i = 0; i < records_line.length; i++) {
            var id = records_line[i].ID;
            var name = records_line[i].NAME;
            var pointArray__ = records_line[i].POINTARRAY;
            var pointArray = pointArray__.split(',');
            var points = new Array;
            for (var j = 0; j < pointArray.length; j++) {
                var id = pointArray[j];
                var lat = getByID(id,jsonData,"lat");
                var lon = getByID(id,jsonData,"lon");
                points.push([lon,lat]);
            }
            // drawLine(points);            
        }
    }
}

}

//*******************************************************************************************
/**根据id查找经度坐标 */
function getByID(id,array,latOrlon) {
    for (var i = 0; i < array.length; i++) {
        var record = array[i];
        if (record.ID == id){
            if(latOrlon == "lat") return record.END_LAT;
            if(latOrlon == "lon") return record.END_LON;
        }
    }
    return null;
}

function readUrl(map) {
    $.ajax({
        type:"POST",
        url:'./WEB-INF/source/hangxian.json',//应该换为远程接口
        asysnc:false,
        dataType:'json',
        success:function(result){
            //getJSONData(data);//得到json数据
            successLoadRoute(result);//成功读取JSON文件后加载此函数
        }//end success
    })//end ajax
}//end readUrl(map)
function successLoadRoute(result) {
    var data = result.data;
    var road = data.road;

    for (let i = 0; i < 72; i++) {
        var element = road[i];//
        var name = element.name;//
        var pointArray = element.pointarray;//
        var coords = new Array;//用来存放坐标
        for (let j = 0; j < pointArray.length; j++) {
            var details = pointArray[j];
            var lon = parseFloat(details.lon);
            var lat = parseFloat(details.lat);
            var lonlat = new Array;
            lonlat.push(lon,lat);
            var poord = new ol.proj.transform(lonlat,'EPSG:4326', 'EPSG:3857')
            coords.push(poord);
        }//end for
        var feature = new ol.Feature(
            new ol.geom.LineString(coords),
        );//end feature
        feature.setStyle(new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'red',
              }),
              stroke: new ol.style.Stroke({
                color:'red',
                width:1
              })
            })
        );//end setStyle
        // feature.set("name",name);
        var source_line = new ol.source.Vector({
            features:[feature]
        });
        var layer_line = new ol.layer.Vector({
            source: source_line
        });
        map.addLayer(layer_line);    
    }//end for

    for (let i = 72; i < road.length; i++) {
        var element = road[i];//
        var name = element.name;//
        var pointArray = element.pointarray;//
        var coords = new Array;//用来存放坐标
        for (let j = 0; j < pointArray.length; j++) {
            var details = pointArray[j];
            var lon = parseFloat(details.lon);
            var lat = parseFloat(details.lat);
            var lonlat = new Array;
            lonlat.push(lon,lat);
            var poord = new ol.proj.transform(lonlat,'EPSG:4326', 'EPSG:3857')
            coords.push(poord);
        }//end for
        var feature = new ol.Feature(
            new ol.geom.LineString(coords),
        );//end feature
        feature.setStyle(new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'blue',
              }),
              stroke: new ol.style.Stroke({
                color:'blue',
                width:3
              })
            })
        );//end setStyle
        feature.set("name",name);
        var source = new ol.source.Vector({
            features:[feature]
        });
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);    
    }//end for

    //加载一个鼠标点击显示信息的事件
    /**
     * 点击要素
     */
    function clickMapFeature(event){
        // this.$options.methods.showDtailsInMap(newfeature.values_.hdtgGeometry);
        var pixel = map.getEventPixel(event.originalEvent);
        map.forEachFeatureAtPixel(pixel,function(feature,layer){
        if (feature != undefined) {
            console.log("选择的要素：",feature.name);
        }
        })
    };
    map.on('click',function(event){
        var pixel = map.getEventPixel(event.originalEvent);
        map.forEachFeatureAtPixel(pixel,function(feature,layer){
        if (feature != undefined) {
            alert(feature.S.name);
            }
        })
    })
}//end successLoadRoute

/**根据id查找纬度坐标 */


//*******************************************************************************************
/**新建字典类 */
function Dictionary () {
    this.dataStore = [];
    this.add = add;         // 添加元素
    this.find = find;       // 查找元素
    this.remove = remove;   // 删除元素
    this.count = count;     // 字典中元素个数
    this.showAll = showAll; // 显示字典元素
    this.clear = clear;     // 清空字典
}
//向字典添加元素
function add( key , value ){
    this.dataStore[key] = value;
}
//查找字典中的元素
function find( key ){
    return this.dataStore[key];
}
//删除一个元素
function remove( key ){
    if( this.dataStore[key] ) delete this.dataStore[key];
    else return 'Not Found';
}
//显示字典元素
function showAll () {
    for( var key in this.dataStore ){
        console.log( key + '->' + this.dataStore[key] );
    }
}
//查看字典中元素的个数
function count(){
    var n = 0 ;
    for ( var key in this.dataStore ){
        ++n;
    }
    return n;
}
//清空字典
function clear(){
    for( var key in this.dataStore ){
        delete this.dataStore[key];
    }
}
//*******************************************************************************************