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
    //读取url画航线
    readUrl(map);

//********************************************************************************************
//********************************************************************************************
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
                    width:3
                  })
                })
            );//end setStyle
            var source = new ol.source.Vector({
                features:[feature]
            });
            var layer = new ol.layer.Vector({
                source: source
            });
            map.addLayer(layer);    
        }//end for

    }//end successLoadRoute
}