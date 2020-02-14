var markStyleCache = [];
var markStyleFunction = function(feature) {
   	var featureStyle = new ol.style.Style({
		image: new ol.style.Icon({
			src: "./"+feature.get("url"), //临时设置
			anchor: [feature.get("offsetX")*0.8, feature.get("offsetY")*0.8],
			anchorXUnits: 'pixels',
			anchorYUnits: 'pixels',
			anchorOrigin: 'bottom-left',
			scale: 0.8
		}),
	    text: new ol.style.Text({
            text: feature.get("name"),
			offsetY: -20,
            font: '14px Calibri,sans-serif',
			fill: new ol.style.Fill({
				color: '#000'
			}),
			stroke: new ol.style.Stroke({
			  color: '#fff',
			  width: 1
			})
        })
    });   	
   	markStyleCache.push(featureStyle);
   	featureStyle = null;
	return markStyleCache.pop();
}


var featureHighLightStyle = new ol.style.Style({   //要素的高亮样式,选中状态
	stroke: new ol.style.Stroke({
		width: 2.5,
		color: '#00ffff',		 
	}),
	image: new ol.style.Circle({
		radius: 6,
		fill: new ol.style.Fill({
		color: '#00ffff',
	  })
	}),
	fill: new ol.style.Fill({
	    color: 'rgba(0,255,255,0.4)',
	})
});

//一般特征选中样式
var overlayStyle = (function() {
        var styles = {};
        styles['Polygon'] = [
          new ol.style.Style({
            fill: new ol.style.Fill({
              color: [255, 255, 255, 0.5]
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 255, 255, 1],
              width: 5
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [0, 153, 255, 1],
              width: 3
            })
          })
        ];
        styles['MultiPolygon'] = styles['Polygon'];

        styles['LineString'] = [
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 255, 255, 1],
              width: 5
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [0, 153, 255, 1],
              width: 3
            })
          })
        ];
        styles['MultiLineString'] = styles['LineString'];

        styles['Point'] = [
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 8,
              fill: new ol.style.Fill({
                color: [0, 153, 255, 1]
              }),
              stroke: new ol.style.Stroke({
                color: [255, 255, 255, 0.75],
                width: 1.5
              })
            }),
            zIndex: 100000
          })
        ];
        styles['MultiPoint'] = styles['Point'];

        styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

        return function(feature) {
          return styles[feature.getGeometry().getType()];
        };
})();
//一般特征报警样式
var overlayWarnStyle = (function() {
        var styles = {};
        styles['Polygon'] = [
          new ol.style.Style({
            fill: new ol.style.Fill({
              color: [255, 0, 0, 0.5]
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 5
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 3
            })
          })
        ];
        styles['MultiPolygon'] = styles['Polygon'];

        styles['LineString'] = [
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 5
            })
          }),
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 3
            })
          })
        ];
        styles['MultiLineString'] = styles['LineString'];

        styles['Point'] = [
          new ol.style.Style({
            image: new ol.style.Circle({
              radius: 8,
              fill: new ol.style.Fill({
                color: [255, 0, 0, 1]
              }),
              stroke: new ol.style.Stroke({
                color: [255, 0, 0, 0.75],
                width: 1.5
              })
            }),
            zIndex: 100000
          })
        ];
        styles['MultiPoint'] = styles['Point'];

        styles['GeometryCollection'] = styles['Polygon'].concat(styles['Point']);

        return function(feature) {
          return styles[feature.getGeometry().getType()];
        };
})();
//获取海事通告航标物标样式 
var noticeStyleCache = [];
var noticeStyleFunction = function(feature,state) {	
	var noticeStyle;
	if(state == "1") 
		return overlayStyle(feature);
	else if(state == "2") 
		return overlayWarnStyle(feature);
	if(feature.get("BaseType")=="0") {
		noticeStyle  = new ol.style.Style({
//			image: styleObj['N0301'].getImage(),
			stroke: styleObj['N0301'].getStroke(),
			fill: styleObj['N0301'].getFill(),
			text: new ol.style.Text({
				text: feature.get("name"),
				offsetY: -25,
				font: '16px Calibri,sans-serif',
				fill: new ol.style.Fill({
					color: '#000'
				}),
				stroke: new ol.style.Stroke({
					color: '#fff',
					width: 2
				})
			})
		});
	}else if(feature.get("BaseType")=="1") {
		noticeStyle = new ol.style.Style({
//			image: styleObj['N0302'].getImage(),
			stroke: styleObj['N0302'].getStroke(),
			fill: styleObj['N0302'].getFill(),
			text: new ol.style.Text({
				text: feature.get("name"),
				offsetY: -25,
				font: '16px Calibri,sans-serif',
				fill: new ol.style.Fill({
					color: '#000'
				}),
				stroke: new ol.style.Stroke({
					color: '#fff',
					width: 2
				})
			})
		});		
	}else if(feature.get("BaseType")=="2") {
		noticeStyle = new ol.style.Style({
//			image: styleObj['N0303'].getImage(),
			stroke: styleObj['N0303'].getStroke(),
			fill: styleObj['N0303'].getFill(),
			text: new ol.style.Text({
				text: feature.get("name"),
				offsetY: -25,
				font: '16px Calibri,sans-serif',
				fill: new ol.style.Fill({
					color: '#000'
				}),
				stroke: new ol.style.Stroke({
					color: '#fff',
					width: 2
				})
			})
		});
	}
	noticeStyleCache.push(noticeStyle);
	noticeStyle = null;
	return noticeStyleCache.pop();
}
//获取虚拟航标物标样式  
var atonStyleCache = [];
var atonStyleFunction = function(feature) {	
   	var atonStyle = new ol.style.Style({
		image: new ol.style.Icon({
			src: feature.get('cancelSign')=='1' ? "./images/aton/"+feature.get("atonType")+".png" : "./images/aton/"+feature.get("atonType")+"_0.png", 
			anchor: [65*0.15, 65*0.15],
			anchorXUnits: 'pixels',
			anchorYUnits: 'pixels',
			anchorOrigin: 'bottom-left',
			scale: 0.15
		}),
	    text: new ol.style.Text({
            text: feature.get("name"),
			offsetY: -20,
            font: '14px Calibri,sans-serif',
			fill: new ol.style.Fill({
				color: '#000'
			}),
			stroke: new ol.style.Stroke({
			  color: '#fff',
			  width: 1
			})
        })
    });   	
   	atonStyleCache.push(atonStyle);
   	atonStyle = null;
	return atonStyleCache.pop();
}
//小比例尺船舶物标样式
//绿点
var circleShipStyle = new ol.style.Style({
    image: new ol.style.Circle({
    	radius: 5,
	    snapToPixel: false,
	    fill: new ol.style.Fill({color: 'rgb(0,200,83)'}),
	    stroke: new ol.style.Stroke({color: 'rgb(0,200,83)', width: 1})
	})
});
//选中后
var circleShipHoverStyle = new ol.style.Style({ 
    image: new ol.style.Circle({
    	radius: 8,
	    snapToPixel: false,
	    fill: new ol.style.Fill({color: 'rgb(200,200,0)'}),
	    stroke: new ol.style.Stroke({color: 'green', width: 2})
	})
});
//关注后
var circleShipFocusedStyle = new ol.style.Style({
    image: new ol.style.Circle({
    	radius: 8,
	    snapToPixel: false,
	    fill: new ol.style.Fill({color: 'rgb(255,0,0)'}),
	    stroke: new ol.style.Stroke({color: 'rgb(255,100,0)', width: 2})
	})
});
//获取船舶物标样式
var shipStyleCache = [];
function shipStyleFunction(ship,state) {
	if(view.getZoom()<=18) {		
		if(state==0){			
			var focused = ship.get('focused');
			if(focused)
				return circleShipFocusedStyle;
			else
				return circleShipStyle;
		}
		else if(state==1)
			return circleShipHoverStyle;
	}
	var iconUrl
	if(ship.get('posstate')=="OLD") {
		iconUrl = "../image/icon/ship-O";
		if(ship.get('speed')<1)
			iconUrl += "-1";
		else if(ship.get('turnrate')>0)
			iconUrl += "-3";	
		else if(ship.get('turnrate')<0)
			iconUrl += "-4";
		else
			iconUrl += "-2";

		if(state==1) 
			iconUrl += "-S.png";			
		else
			iconUrl += ".png";		
	}
	else {
		iconUrl = "../image/icon/ship-";	
		var shipClass = ship.get('shipClass');
		if(shipClass=="客船")
			iconUrl += "C-";  //客、渡、游船舶；
		else if(shipClass=="危化品船")
			iconUrl += "B-";  //危、油、化 船舶；
		else if(shipClass=="工作船")
			iconUrl += "D-";  //执法船或航道工作船；浚、救、拖、牵引、布缆、交通、打捞、挖泥、测量、公务、工作、引航、趸
		else if(shipClass=="货船")
			iconUrl += "A-";  //其他通航船
		else
			iconUrl += "A-";  //其他通航船
		
		if(ship.get('speed')<1)
			iconUrl = iconUrl += "1";
		else if(ship.get('turnrate')>0)
			iconUrl = iconUrl += "3";	
		else if(ship.get('turnrate')<0)
			iconUrl = iconUrl += "4";
		else
			iconUrl = iconUrl += "2";
		
		if(state) 
			iconUrl = iconUrl += "-S.png";
		else 
			iconUrl = iconUrl += ".png";
	}
	var shipName = (ship.get('name')&& ship.get('name').length)?ship.get('name'):"船名未知";
	var shipStyle = new ol.style.Style({
	    image: new ol.style.Icon(({
		    anchor: [0.5, 0.7],
		    anchorXUnits: 'fraction',
		    anchorYUnits: 'fraction',
		    rotation:ship.get('course')*Math.PI/180,
			rotateWithView: true,
		    src: iconUrl
	    })),
		text: new ol.style.Text({
            text: ship.get('focused')?shipName:'',
			offsetY: -25,
			font: '14px Calibri,sans-serif',
			fill: new ol.style.Fill({
			  color: '#333'
			}),
			stroke: new ol.style.Stroke({
			  color: '#f00',
			  width: 1
			})
        })
	});
	shipStyleCache.push(shipStyle);
	shipStyle = null;
	return shipStyleCache.pop();
}
 