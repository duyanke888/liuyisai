var coordinates;//3875坐标系下的坐标串
var polygoncoords=[];
var UserName = $("#UserName").val()
//添加、编辑、导入等面板可拖动
$(function() {
    $("#addFeature" ).drags();
    $("#EntryFeature" ).drags();
    $("#line_panel" ).drags();
    $("#img_panel" ).drags();
    $("#layer_style_change" ).drags();
    $("#editFeature" ).drags();
    $("#featureFileUplaod" ).drags();
    $("#swChart" ).drags();
    $("#WHCD" ).drags();
    $("#editHDTG" ).drags();
	$('#ShowHisWHCD').drags();
	$('#edit_btns').drags();
	$('#ShowHisNotice').drags();
	
	$('#addNavLine').drags();
	$('#addNavPoint').drags();
	$('#editNavLine').drags();
	$('#createNavPointbtn').drags();
	$('#orderNavPoint').drags();
	$('#editNavPoint_btn_').drags();
	$('#editNavPointbtn').drags();
	$('#editNavLInebtn').drags();
});

	//创建航线
$('#createNavLine1').click(function(){
	if(lockSelectLine){//编辑航线时，不让创建
	if(lockNewline){//创建航线时，禁止再次点击
		LockOtherFeatures();
	click_n=7;
	lockNewline=false;
	$('#choosetype').val(10);
	if(selectLineID.length>2){//选中航线后，恢复航线颜色
		var linefeatures=eval("NavlineSource").getFeatureById(selectLineID);
		 linefeatures.setStyle(navLineStyle( linefeatures));
		 selectLineID='';
	}
	}
	}
})

		  //鼠标移动事件
	var PickPointBol=true;
	var tmpstoreFeature='';
	  map.on('pointermove', function(evt) {		  

		var coor = evt.coordinate;		   //添加要素时，绘制获取经纬度
		var stringifyFunc = ol.coordinate.createStringXY(4);
		var out = ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');
		var lonlat = stringifyFunc(out).split(","); 
		$("#mouse_lon").html(lonlat[0]);
		$("#mouse_lat").html(lonlat[1]);
	   	 var status=$('#choosetype').val();
  	      if(status==10){//创建航线时，鼠标选取转向点
	    		 var closeFeature = eval("NavPointSource").getClosestFeatureToCoordinate(coor);
	    		 if(closeFeature!=null){	   
	    			 var Pointid=closeFeature.getId();
	    			 var id=pickedIDarr[Pointid];//作用禁止重复选择
	    			 if(id==null){//这个点，之前没有选取过，
	    				 tmpstoreFeature=closeFeature;
	    			    var dis=pixelDis(coor,closeFeature);
	    					var pointName=closeFeature.get('name');
	    					if(dis<9){//
	    						PickPointBol=false;
	    						 closeFeature.setStyle(editLineStyle(pointName));
	    						map.getTargetElement().style.cursor = 'pointer';
	    						popupLayer.setPosition(coor); //鼠标位置
	    			            $(popupElement).popover({
	    			                'placement': function (context, source) {                
	    				            	var mapExtent = map.getView().calculateExtent(map.getSize()); 	                
	    					            if (popupLayer.getPosition()[0]>mapExtent[0]+(mapExtent[2]-mapExtent[0])/2) 
	    					                return 'left';
	    					            else
	    					                return 'right';
	    					         },
	    			                'trigger':'hover',
	    			                'container':'body',
	    			                'html': true,
	    			                'offset':'20 -3',
	    			                'content': "<table style='max-width:100%;background-color:white;z-index: 10;'><tr><td><div style='padding:8px;z-index: 10;'><p>"+'选取转向点'+"</p></div></td></tr></table>"
	    			              });
	    			            $(popupElement).popover('show'); 
	    					}else{
	    						PickPointBol=true;
	    						if(tmpstoreFeature!=''){
	    							var type=tmpstoreFeature.get('PointType');
		    						showPointStyle(closeFeature,type,pointName);	
	    						}
	    						tmpstoreFeature='';
	    		        		map.getTargetElement().style.cursor = mouseCursor;
	    		        		$(popupElement).popover('dispose');  	
	    					}
	    					
	    		 }
	    			 
	    			 
	    			 
	    			 
	    			 
	    		 }
	    	 
	    		      }

      });
		
	var click_n=0;//标识地图点击事件的类别
	var clicked_feature;//上一次点击的要素
	var styleold; //上一次点击要素的样式	
	var NoticeID=[];
   var selectedFeatureID;
   var pickstatus=true;

	var selectClick = new ol.interaction.Select({
        condition: ol.events.condition.click
    });
	map.addInteraction(selectClick);
	 //地图上的鼠标点击事件处理
    selectClick.on('select', function(e) {	

    var x,y,x1,y1; //记录鼠标点击获取的坐标及转换后的经纬度
    var lay,new_feature;
    var modify;
    var edit_linecoords=[];
    var edit_polygoncoords=[];
    var clickmovedInfo=[];
    //变形(仅线/面可使用)
    var NodeEditInfo=[];
    var modify_feature;
    var modify_coor=[];
    var deletePointID;
    //框选删除的要素的数组
    var features_geodelete=[];
    //定义一个要素变量用于存储点击时候的要素
    var clicked_feature;
    //存储一个航线上的航向点
   var NavPointLine=[];
   //单个航向点
   var singleNavpoint=[];
   var navPointcollecttion=[];
   var oldFeatures=new ol.Collection();
map.on('dblclick', function(evt) {
	
if(click_n==10){//创建航线状态下
		var coor = evt.coordinate;		   //添加要素时，绘制获取经纬度
		var lanlon=ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');//绘制点的坐标
		var closeFeature = eval("NavPointSource").getClosestFeatureToCoordinate(coor);
		if(closeFeature !=null){
			var coord= closeFeature.getGeometry().getClosestPoint(coor);
			var dis=pixelDis(coor,closeFeature);;
			if(dis>9){//
				var bol=AvoidRepeatPoint(coor,navPointcollecttion);
				if(bol){
					navPointcollecttion.push(coor );
					var geo = new ol.geom.Point(coor );
					var feature = new ol.Feature({geometry: geo});
					feature.set("BaseType", "0");//0为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
					feature.set("name", "");
					feature.set("Status", 1);
					feature.set("attr_C",4);
					feature.set("attr_D",0);
					feature.set("Describe",'');
					feature.set("PointType",4);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
					feature.setStyle(finishPointStyle(""));
					eval("editNavPointSource").addFeature(feature);	
				}
			}else{//获取这个转向点
				PickPointBol=true;
				var Pointid=closeFeature.getId();
				var id=pickedIDarr[Pointid];
				if(id==null){//只能选取一次，不能重复选取
					pickedIDarr[Pointid]=Pointid;
				var type=closeFeature.get("PointType");
				closeFeature.set("restoreType",type);
			
				var pointName=closeFeature.get("name");
			
				var count=closeFeature.get("Status");
				var describe=closeFeature.get("Describe");
				var attrC=closeFeature.get("attr_C");
				var attr_D=closeFeature.get("attr_D");
				if(type==3){//首
                 	closeFeature.setStyle(ImportantPointStyle(pointName));	
						type=1;
				}else if(type==4){//尾
					closeFeature.setStyle(finishPointStyle(pointName));
				}else if(type==2||type==6){//普通
				closeFeature.setStyle(ImportantPointStyle(pointName));	
						type=1;
				}else if(type==1){//交叉点
				closeFeature.setStyle(ImportantPointStyle(pointName));	
						type=1;
				} if(type==5){
					closeFeature.setStyle(DoubelEndStyle(pointName));
				}
				navPointcollecttion.push(coord);
				closeFeature.set("BaseType", "1");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
				closeFeature.set("name", pointName);
				closeFeature.set("Status",Number(count)+1);
				closeFeature.set("attr_C",attrC);
				closeFeature.set("attr_D",attr_D);
				closeFeature.set("Describe",describe);//
				closeFeature.set("PointType",type);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				eval("editNavPointSource").addFeature(closeFeature);
				}
			}
		}else{//转向点附近没有转向点，创建转向点	
			var bol=AvoidRepeatPoint(coor,navPointcollecttion);
			if(bol){
				navPointcollecttion.push(coor );
				var geo = new ol.geom.Point(coor );
				var feature = new ol.Feature({geometry: geo});
				feature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
				feature.set("name", "");
				feature.set("Status", 1);
				feature.set("attr_C",4);
				feature.set("attr_D",0);
				feature.set("Describe",'');//
				feature.set("PointType",4);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				feature.setStyle(finishPointStyle(""));
				eval("editNavPointSource").addFeature(feature);	
			}


		}
		var linefeature=eval("tmpNavlineSource").getFeatures()[0];
		linefeature.setGeometry(new ol.geom.LineString(	navPointcollecttion));
	$('#line_creatorid').val(UserName);
				$('#NavLine_type').val("");
				$('#NavLine_name').val("");
				$('#Line_width').val("");
				$('#Line_depth').val("");
				$('#Line_height').val("");
				$('#Line_rule').val("");
				$('#Line_results').text('');
				$('#addNavLine').show();
				unlockFeatures();
				 $(".blackoverlayer").css("display","block"); 
				navPointcollecttion=[];
				click_n=0;
				 pickedIDarr=[];
}
});
var remainPointID=[];
var StoreLine;
var pickedIDarr=[];
createPointsCollection = new ol.Collection();//重置要素集
	map.on('singleclick', function(evt) {
		if (evt.dragging) {
			return;
		};
			switch (click_n) {
				case 0:
					wfsSource.clear(true);
					break;
				case 100:
					var coor = evt.coordinate;		   
					getWFS(coor);
					break;
				case 11://编辑航线中，平移航线
					click_n=0;
					map.removeInteraction(translate_single);
					var pixel = map.getEventPixel(evt.originalEvent);//
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						var idd=feature.getId();
						var lineid=$('#NavLineID').val();
						if(Number(idd)==Number(lineid)) {//只选取目标图层
						
							fea_coll = new ol.Collection();//重置要素集
	
							fea_coll.push(feature);
							var features= eval("editNavPointSource").getFeatures();
							 for(var j=0;j< features.length;j++){
								 var pointfeature=features[j];
								 var Name=pointfeature.get('name');
								 var PointType=pointfeature.get('PointType');  
								 showPointStyle(pointfeature,PointType,Name);
									}
							translate_single = new ol.interaction.Translate({
								features: fea_coll
							});
							map.addInteraction(translate_single);
							translate_single.on('translatestart',function(evt){
								oldFeatures.clear();
								var lineid=$('#NavLineID').val();
								var linefeatures=eval("NavlineSource").getFeatureById(lineid);
								var coordinates=linefeatures.getGeometry().getCoordinates();
								 for(var j=0;j< coordinates.length;j++){
								var pointfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(coordinates[j]);
								pointfeature.setStyle(removeShadow());
								oldFeatures.push(pointfeature);
								 }
							});
							
							translate_single.on('translateend', function (evt) {
								var len = fea_coll.getLength();
								for (var j = 0; j < len; j++) {
									var BaseType = fea_coll.item(j).get("BaseType");
								var trans_coor = fea_coll.item(j).getGeometry().getCoordinates();
								 var PointArray= fea_coll.item(j).get("PointArray");
							     var linefeature=fea_coll.item(j);
							     var direction=fea_coll.item(j).get("Direction");
								}
								//平移前与平移后，航线的坐标排列顺序和个数一致，平移前坐标点平移到对应移动坐标上
								//交叉点，平移产生分离，需要创建一个点，。
								var remainPointID=[];
								for (var j = 0; j < trans_coor.length; j++) {
									 var pointfeature=oldFeatures.item(j);//平移前的点
										var PointType=pointfeature.get("PointType");
										var pointID=pointfeature.getId();
										var Name=pointfeature.get("name");
										var Count=pointfeature.get("Status");
					            		 if(Count!="1"){//平移后的转向点坐标与平移之前的坐标比较
					            			 //Count!="1" 说明平移前是交叉点，平移后要创建一个新的，
					            			 //原来点不动，航线降1
					                        	var count=pointfeature.get("Status");
					                        	var olFeatures= eval("editNavPointSource").getFeatures();
					                        	deletePointStyle(pointfeature,pointID,count,linefeature,olFeatures);
										var geo = new ol.geom.Point(trans_coor[j]);
										var feature = new ol.Feature({geometry: geo,});
										feature.set("SmallClass", "createNavPoint");
										var name=linefeature.get('name')+RandomWord();
										 feature.set("name",name);
										 feature.set("BaseType","0");
										  feature.set("attr_C",2);
										  feature.set("attr_D",0);
										  feature.set("PointType",2);
										 feature.set("creator",UserName);
										 feature.set("Status",1);
										 feature.set("Describe",pointfeature.get("Describe"));
										 feature.setStyle(PointStyle(name));	
										eval("editNavPointSource").addFeature(feature);

					                        	
			                        }else{//count==1/直接移动
			                        	 pointfeature.getGeometry().setCoordinates(trans_coor[j]);
			                        	 showPointStyle(pointfeature,PointType,Name);		        
			                        	pointfeature.set("BaseType","2");
			                        	pointfeature.set("attr_D",0);
			                        }
								}
								EndsStyle(trans_coor,linefeature);//航线的两端样式确定
									  click_n=0;
										$('#choosetype').val(1);
							}, this);
						
						}

					});
					break;
				case 20://需改航线包括添加，删除，平移，合并，分离转向点
					click_n=0;
					map.removeInteraction(modify);
					var pixel = map.getEventPixel(evt.originalEvent);
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						var idd=feature.getId();
						var lineid=$('#NavLineID').val();
						
						if(Number(idd)==Number(lineid)){
							fea_coll.clear();
						
							fea_coll.push(feature);
							var features= eval("editNavPointSource").getFeatures();
							 for(var j=0;j< features.length;j++){
								 var pointfeature=features[j];
								 var Name=pointfeature.get('name');
								 var PointType=pointfeature.get('PointType');  
								 showPointStyle(pointfeature,PointType,Name);
							 }
							modify = new ol.interaction.Modify({
								features: fea_coll,
							});
							map.addInteraction(modify);
							modify.on('modifyend', function (evt) {
//								
								//可能情况有：
								// 鼠标按住点，平移点
								//在线上，添加点
								//鼠标点击 点，删除点
								//共三种情况
								//避免同一条航线上转向点重叠问题：平移航线转向点不可能产生重叠
								//删除转向点，不产生重叠
								////
								//增加转向点,平移转向点，有可能与本条航线上其他点重叠，也可能与其他航线上的点重叠（不在一个图层上，不影响操作）。
								var remainPointID=[];
								var modify_coord = fea_coll.item(0).getGeometry().getCoordinates();
								var linefeature=fea_coll.item(0);
								 var pointfeatures=eval("editNavPointSource").getFeatures();
									//每次操作，只有一个点(可能是ID点 或没有ID点)进行操作（增，删 移动），其余点不处理
									var oldlength=pointfeatures.length;
									var newlength=modify_coord.length;
									if(oldlength> newlength){//删除一个点,其他不变
										remainPointID=deleteOnePoint(modify_coord);
								        for(var i = 0; i <remainPointID.length; i++){//已经移动的ID点，
		                                	 var pointfea=eval("editNavPointSource").getFeatureById(remainPointID[i]);
		                                	 if(pointfea!=null){
		                                	var  count=pointfea.get("Status");
		                                	 deletePointStyle(pointfea,remainPointID[i],count,linefeature,pointfeatures);                               
		                                 } 
		                                	 }
									}else if(oldlength==newlength){//平移一个点.
										transformPoint(modify_coord,linefeature,pointfeatures);
									}else if(oldlength<newlength){//增加一个点，其他不变
									       addPoint(modify_coord,linefeature,pointfeatures);
									}
									EndsStyle(modify_coord,linefeature);//航线的两端样式确定
									$('#choosetype').val(1);
							}, this);
						}

					});
					break;
				case 1:	  //航道通告，绘制点要
					var coor = evt.coordinate;		   //添加要素时，绘制获取经纬度
					var stringifyFunc = ol.coordinate.createStringXY(4);
					var out = ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');
					var lonlat = stringifyFunc(out).split(",");
//					 transformTo64([lonlat]);
					if(NoticeEditBol){
						editConvertBol=84;
						createPointlist1([lonlat]);
						$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
						$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
						$('#editConvertTo84').attr('disabled', 'disabled');
						$('#editConvertTo54').removeAttr('disabled');
						$('#editswift84').show();
						$('#editswift54').hide();
						$('#editHDTG').show();
					}else{
						ConvertBol=84;
						createPointlist2([lonlat]);
						$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
						$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
						$('#ConvertTo84').attr('disabled', 'disabled');
						$('#ConvertTo54').removeAttr('disabled');
						$('#swift84').show();
						$('#swift54').hide();
						$("#addFeature").show();
					}

				
					$(".blackoverlayer").css("display","block");
					var newPoint = new ol.geom.Point([x,y]);
					old_point= new ol.Feature({
						geometry: newPoint,
					});
					var styleobj=styleObj[selectSubClassID];
					old_point.setStyle(styleobj);
					break;
				case 2:		 //航道通告，删除要素
					var pixel = map.getEventPixel(evt.originalEvent);
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						var idd=feature.getId();
						if(idd==selectedFeatureID) {
						var smallclass = feature.get("SmallClass");
						if (smallclass == 'N0301') {
							$('.delete_panel').css('display', 'block');
							features_geodelete = [];//清空储存合并容器的数组
							IDs = [];//清空用于待删除要素的ID数组
							features_geodelete.push(feature);
							deletePointID=feature.getId();
							var ID = feature.get('feature_id');
							IDs=Number(ID);	
						}
						}

					});
					break;
				case 3:	 //平移要素
					map.removeInteraction(translate_single);
					var pixel = map.getEventPixel(evt.originalEvent);
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						var idd=feature.getId();
						if(idd==selectedFeatureID) {
							if (feature.getProperties().BaseType != null) {
							fea_coll = new ol.Collection();//重置要素集
							features_geoquery = [];//重置框选容器
							fea_coll.push(feature);
							var fea = [];
							fea.push(feature);
							fea.push(feature.get("SmallClass"));//记录要素的图层编号
							features_geoquery.push(fea);
						}
						}

					});
					translate_single = new ol.interaction.Translate({
						features: fea_coll
					});
					map.addInteraction(translate_single);
					translate_single.on('translateend', function (evt) {
						var len = fea_coll.getLength();
						for (var j = 0; j < len; j++) {
							var BaseType = fea_coll.item(j).get("BaseType");
							var trans_coor = fea_coll.item(j).getGeometry().getCoordinates();
							var tran_fea = features_geoquery[j];
							if (BaseType == '面') {
								var movedpolygoncoords = [];
								edit_polygoncoords = [];
								var pygontrans_coor = trans_coor[0];
								for (var i = 0; i < pygontrans_coor.length; i++) {
									var lanlon = ol.proj.transform(pygontrans_coor[i], 'EPSG:3857', 'EPSG:4326');
									edit_polygoncoords.push(lanlon);
								}
								createPointlist1(edit_polygoncoords.splice(0,edit_polygoncoords.length-1));
							}
							else if (BaseType == '线') {
								edit_linecoords = [];
								for (var i = 0; i < trans_coor.length; i++) {
									var lanlon = ol.proj.transform(trans_coor[i], 'EPSG:3857', 'EPSG:4326');
									edit_linecoords.push(lanlon);
								}
								createPointlist1(edit_linecoords);
							}
							else if (BaseType == '点') {
								var out = ol.proj.transform(trans_coor, 'EPSG:3857', 'EPSG:4326');
								createPointlist1([out]);
							}
						}

					}, this);
					break;
				case 4:	 //变形要素
					map.removeInteraction(modify);
					var pixel = map.getEventPixel(evt.originalEvent);
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						var idd=feature.getId();
						if(idd==selectedFeatureID) {
							fea_coll.clear();
							features_geoquery = [];
							if (feature.getProperties().BaseType != null) {
								if (feature.getProperties().BaseType == '线') {
									var gc = feature.getGeometry().getCoordinates();
									for (var i = 0; i < gc.length; i++) {
										var newPoint = new ol.geom.Point(gc[i]);
										var po = new ol.Feature({
											geometry: newPoint,
										});
										sourcedot.addFeature(po);
									}
								}
								else if (feature.getProperties().BaseType == '面') {
									var gc = feature.getGeometry().getCoordinates();
									for (var i = 0; i < gc[0].length; i++) {
										var po = new ol.geom.Point(gc[0][i]);
										var newPoint = new ol.Feature({
											geometry: po,
										});
										sourcedot.addFeature(newPoint);
									}
								}
								fea_coll.push(feature);
								var fea = [];
								fea.push(feature);
								fea.push(feature.get("SmallClass"));//记录要素的图层编号
								features_geoquery.push(fea);
							}
						}

					});
					modify = new ol.interaction.Modify({
						features: fea_coll,
					});
					map.addInteraction(modify);
					modify.on('modifyend', function (evt) {
						sourcedot.clear();
						var len = fea_coll.getLength();
						for (var j = 0; j < len; j++) {
							var BaseType = fea_coll.item(j).get("BaseType");
							var modify_coord = fea_coll.item(j).getGeometry().getCoordinates();
							if (BaseType == '线') {
								var modifylinecoords = [];
								edit_linecoords = [];
								for (var i = 0; i < modify_coord.length; i++) {
									var lanlon = ol.proj.transform(modify_coord[i], 'EPSG:3857', 'EPSG:4326');
									edit_linecoords.push(lanlon);
								}
								createPointlist1(edit_linecoords);
							}
							if (BaseType == '面') {
								var modifypolygoncoords = [];
								edit_polygoncoords = [];
								var pygonmod_coor = modify_coord[0];
								for (var i = 0; i < pygonmod_coor.length; i++) {
									var lanlon = ol.proj.transform(pygonmod_coor[i], 'EPSG:3857', 'EPSG:4326');

									edit_polygoncoords.push(lanlon);

								}
								createPointlist1(edit_polygoncoords.splice(0,edit_polygoncoords.length-1))
							}
						}
						;

					}, this);
					break;
				case 10://创建航线时，开始点和结束点之间操作
					
					var coor = evt.coordinate;		   //添加要素时，绘制获取经纬度
					var lanlon=ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');//绘制点的坐标
					var closeFeature = eval("NavPointSource").getClosestFeatureToCoordinate(coor);
					if(closeFeature !=null){
						var coord= closeFeature.getGeometry().getClosestPoint(coor);
						var dis=pixelDis(coor,closeFeature);;
						if(dis>9){//false选点
							var bol=AvoidRepeatPoint(coor,navPointcollecttion);
							if(bol){
								navPointcollecttion.push(coor);
								var geo = new ol.geom.Point(coor);
								var feature = new ol.Feature({geometry: geo});
								feature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
								feature.set("name", "");
								feature.set("Status", 1);
								feature.set("attr_C",2);
								feature.set("attr_D",0);
								feature.set("Describe",'');
								feature.set("PointType",2);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
								feature.setStyle(PointStyle(""));
								eval("editNavPointSource").addFeature(feature);
							}


						}else{//获取这个转向点
							PickPointBol=true;
							var Pointid=closeFeature.getId();
							var id=pickedIDarr[Pointid];
							if(id==null){//只能选取一次，不能重复选取
								pickedIDarr[Pointid]=Pointid;
							var type=closeFeature.get("PointType");
							closeFeature.set("restoreType",type);
							var pointName=closeFeature.get("name");
							var count=closeFeature.get("Status");
							var describe=closeFeature.get("Describe");
						     var attrC=closeFeature.get("attr_C");
						     var attr_D=closeFeature.get("attr_D");
						     var type=closeFeature.get("PointType");
						      if(type==5){
									closeFeature.setStyle(DoubelEndStyle(pointName));
								}else{
									closeFeature.setStyle(ImportantPointStyle(pointName));
									type=1;
								}
							
							navPointcollecttion.push(coord);
							closeFeature.set("BaseType","1");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
							closeFeature.set("name",pointName);
							closeFeature.set("attr_C",attrC);
							closeFeature.set("attr_D",attr_D);
							closeFeature.set("Status",Number(count)+1);
							closeFeature.set("PointType",type);
							closeFeature.set("Describe",describe);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
					eval("editNavPointSource").addFeature(closeFeature);
					}
						}
					}else{//转向点附近没有转向点，创建转向点
						var bol=AvoidRepeatPoint(coor,navPointcollecttion);
						if(bol){
							navPointcollecttion.push(coor);
							var geo = new ol.geom.Point(coor);
							var feature = new ol.Feature({geometry: geo});
							feature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
							feature.set("name", "");
							feature.set("Status", 1);
							feature.set("attr_C",2);
							feature.set("Describe",'');
							feature.set("attr_D",0);
							feature.set("PointType",2);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				  			feature.setStyle(PointStyle(""));
							eval("editNavPointSource").addFeature(feature);	
						}


					}
					var linefeature=eval("tmpNavlineSource").getFeatures()[0];
					linefeature.setGeometry(new ol.geom.LineString(navPointcollecttion));
					linefeature.setStyle(navLineStyle(linefeature));
					break;
				case 7://创建航线时，第一个转向点
					eval("editNavPointSource").clear(true);
					createPointsCollection.clear(); 
					var coor = evt.coordinate;		   //添加要素时，绘制获取经纬度
					click_n=10;
					var lanlon=ol.proj.transform(coor, 'EPSG:3857', 'EPSG:4326');//绘制点的坐标
				var closeFeature = eval("NavPointSource").getClosestFeatureToCoordinate(coor);
					if(closeFeature !=null){
						var coord= closeFeature.getGeometry().getClosestPoint(coor);
						var dis=pixelDis(coor,closeFeature);;
						if(dis>9){//false为选点
			          	navPointcollecttion.push(coor);
							var geo = new ol.geom.Point( coor);
							var feature = new ol.Feature({geometry: geo});
							feature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
							feature.set("name", "");
							feature.set("Status", 1);
							feature.set("attr_C",'');
							feature.set("attr_D",0);
							feature.set("Describe",'');
							feature.set("PointType",3);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
							feature.setStyle(startPointStyle(""));
							eval("editNavPointSource").addFeature(feature);

						}else{//获取这个转向点
							PickPointBol=true;
							var Pointid=closeFeature.getId();
							var id=pickedIDarr[Pointid];
							if(id==null){//只能选取一次，不能重复选取
								pickedIDarr[Pointid]=Pointid;
				var type=closeFeature.get("PointType");
				closeFeature.set("restoreType",type);
				var pointName=closeFeature.get("name");
				var count=closeFeature.get("Status");
				var attrC=closeFeature.get("attr_C");
				var attr_D=closeFeature.get("attr_D");
				if(type==2||type==1||type==6){
					
					closeFeature.setStyle(ImportantPointStyle(pointName));	
					type=1;
					
				}else if(type==4){
					closeFeature.setStyle(ImportantPointStyle(pointName));	
					type=1;
				}else if(type==3){
					closeFeature.setStyle(startPointStyle(pointName));
				}else if(type==5){
					closeFeature.setStyle(DoubelEndStyle(pointName));
				}
				var describe=closeFeature.get("Describe");
				navPointcollecttion.push(coord);
				closeFeature.set("BaseType","1");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
				closeFeature.set("name",pointName);
				closeFeature.set("attr_C",attrC);
				closeFeature.set("attr_D",attr_D);
				closeFeature.set("Status",Number(count)+1);
				closeFeature.set("PointType",type);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				closeFeature.set("Describe",describe);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				eval("editNavPointSource").addFeature(closeFeature);
							}
						}
					}else{//转向点附近没有转向点，创建转向点
						navPointcollecttion.push(coor);
						var geo = new ol.geom.Point(coor);
						var pfeature = new ol.Feature({geometry: geo});
						 pfeature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
						 pfeature.set("name", "");
						 pfeature.set("Status", 1);
						 pfeature.set("attr_C",'');
						 pfeature.set("attr_D",0);
						 pfeature.set("Describe",'');
						 pfeature.set("PointType",3);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
						pfeature.setStyle(startPointStyle(""));
						eval("editNavPointSource").addFeature(pfeature);
						createPointsCollection.push(pfeature); 

					}
					var feature;
					feature= new ol.Feature(new ol.geom.LineString(coor));
					feature.set("BaseType","线");
					feature.set("SmallClass","NavLine");
					feature.set("Direction","正向");
					feature.setStyle(navLineStyle(feature));
					eval("tmpNavlineSource").addFeature(feature);
					break;
				case 8://平移航线上的转向点
					map.removeInteraction(translate_single);
					var pixel = map.getEventPixel(evt.originalEvent);
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						fea_coll = new ol.Collection();//重置要素集
						if(feature.get("SmallClass")=='moveNavPoint'){
							fea_coll.push(feature);	
							var count=feature.get('Status');
							var name=feature.get('name');
							var pointid=feature.getId();
							if( count!="1"){
								var lon=Number(feature.get("lon"));
								var lat=Number(feature.get("lat"));
								var out = ol.proj.transform([lon,lat],'EPSG:4326','EPSG:3857');
								var geo = new ol.geom.Point(out);
								var feature = new ol.Feature({geometry: geo,});
								feature.set("lat", parseFloat(out[1]));
								feature.set("lon", parseFloat(out[0]));
								 feature.setStyle(PointStyle(name));
								feature.setId(pointid);
								feature.set("SmallClass", "createNavPoint");
								eval("tmpNavPointSource").addFeature(feature);
							}
						}
					

	
					
					});
					translate_single = new ol.interaction.Translate({
						features: fea_coll
					});
					map.addInteraction(translate_single);
					
					translate_single.on('translateend', function (evt) {
					
						
							var PointID = fea_coll.item(0).getId();
							var pointName = fea_coll.item(0).get("name");
							var trans_coor = fea_coll.item(0).getGeometry().getCoordinates();
//							var remainder=fea_coll.item(j).get("Describe");
							var Count=fea_coll.item(0).get("Status");

							fea_coll.item(0).set("BaseType","2");
						var out = ol.proj.transform(trans_coor, 'EPSG:3857', 'EPSG:4326');
						fea_coll.item(0).set("attr_A",out[1]);
						fea_coll.item(0).set("attr_B",out[0]);
					
	            		 if(Count!="1"){//添加转向点
	            				fea_coll.item(0).setStyle(endPointStyle(''));
	                        }else{
	                        	fea_coll.item(0).setStyle(endPointStyle(pointName));	
	                        }
						 eval("editNavPointSource").addFeature(fea_coll.item(0));
						
					 map.removeInteraction(translate_single);
					  click_n=0;
					 

					}, this);
					break;
				case 9://删除航线上的转向点
					map.removeInteraction(translate_single);
					var pixel = map.getEventPixel(evt.originalEvent);//
					map.forEachFeatureAtPixel(pixel, function (feature, layer) {
						fea_coll = new ol.Collection();//重置要素集
						StoreLine = new ol.Collection();//重置要素集
						if(feature.get("SmallClass")=='moveNavPoint'){
							fea_coll.push(feature);	
						}	
					});
					translate_single = new ol.interaction.Translate({
						features: fea_coll
					});
					map.addInteraction(translate_single);
					
					translate_single.on('translateend', function (evt) {
						var len = fea_coll.getLength();
						var pointfeature;
						for (var j = 0; j < len; j++) {
							 pointfeature = fea_coll.item(j);
							var BaseType = fea_coll.item(j).get("BaseType");
							var PointID = fea_coll.item(j).getId();
							var pointName = fea_coll.item(j).get("name");
							var trans_coor = fea_coll.item(j).getGeometry().getCoordinates();
							var Describe=fea_coll.item(j).get("Describe");
							var Count=fea_coll.item(j).get("Status");
							var Pointtype=fea_coll.item(j).get("PointType");
						var out = ol.proj.transform(trans_coor, 'EPSG:3857', 'EPSG:4326');
						
						}
					    map.removeInteraction(translate_single);
	                       click_n=0;
	                       var linecoords=[];
	                       var linefeature=eval("NavlineSource").getFeatureById(selectLineID);
	                       var pointArr=linefeature.get('PointArray');
	                       var LineID=linefeature.getId();
	                       var  array =pointArr.split(","); 
	                       for(var j=0;j< array.length-1;j++){
	                      	 var pointfeat=eval("NavPointSource").getFeatureById(array[j]);
	                      	 if( pointfeat!=null){
	                      	      var coor=pointfeat.getGeometry().getCoordinates(); 
	                      	    linecoords.push(coor);
	                      	 }
	                      	
	                       }
	                       linefeature.setGeometry(new ol.geom.LineString(linecoords));
	                       linefeature.setStyle(navLineStyle(linefeature));
	                       showPointStyle(pointfeature,Pointtype,pointName);
	               	var info=[];
	            	var arr={
	            			"Name": pointName,
	            			"Leg": '',
	            			"FeatureClass":"N04",
	            			"SmallClass":"N0401",
	            			"Region": "南京",
	            			"BaseType": "3",//0编辑，1删除，3平移
	            			"PointType":Pointtype,
	            			"PointID":PointID,
	            			"Creator": UserName,
	            			"Count": Count,//
	            			"Remark":'',
	            			"describe":Describe,//
	            			"Attribution_A":cusAttrA,
	            			"Attribution_B":cusAttrB,
	            			"Attribution_C":cusAttrC,
	            			"Attribution_D":cusAttrD,
	            			"Attribution_E":cusAttrE,
	            			"Attribution_F":cusAttrF,
	            			"Attribution_G":cusAttrG,
	            			"Attribution_H":cusAttrH,
	            			"Attribution_I":cusAttrI,
	            			"Attribution_J":cusAttrJ,
	            			"Latitude": out[1],
	            			"Longitude":out[0]
	            		}
	            	 info.push(arr);
	            	editNavPoint(info,LineID);	
	            	$('#editpointbtn_results').text('更新中...');	

					}, this);
					break;
			}



	});
	//为了避免转向点名称重复，产生随机名称后缀
function RandomWord(){
	var serial1=Date.now().toString(36);
	var len=serial1.length;
	serial1=serial1.substring(len-1,len);
	var serial2=Math.random().toString(36).substr(3);
		var len=serial2.length;
	serial2=serial2.substring(len-1,len);

	return serial1+serial2;
}
function pixelDis(coor,pointfeature){
	var movepoint=map.getPixelFromCoordinate(coor);
	var coord= pointfeature.getGeometry().getClosestPoint(coor);	
	var  featurePixel= map.getPixelFromCoordinate(coord);
    var a=Math.pow(( featurePixel[0]-movepoint[0]),2);
    var b=Math.pow(( featurePixel[1]-movepoint[1]),2);
    return Math.sqrt(b+a); 
}
function deletePointStyle(pointfeature,pid,count,linefeature,oldFeatures){//删除点的颜色
	//平移点pointfeature，后调用这个函数==点上没有这条线linefeature       
	//删除航线，调用这个函数==点上可能有这条线linefeature 
	//平移航线linefeature  调用这个函数==点上没有这条线linefeature
	//最后结果pointfeature上没有这条线线linefeature。
  		 var Name=pointfeature.get('name');	
  		var coor=pointfeature.getGeometry().getCoordinates();
  		//确定点的样式
	////closestfeature有ID，可能在editNavPointSource上，没有ID的点是编辑中创建的，因此不需要它，只需要ID点。
		for(var j = 0; j <oldFeatures.length; j++){//将ID点移到NavPointSource上
		var fea=oldFeatures[j];
			var id=fea.getId();
			if(id!=null){
				 eval("NavPointSource").addFeature(fea); 	
			}
		
		}
		//判断删除后点的样式，先把这条线移走
		  eval("NavlineSource").removeFeature(linefeature);//将这条线移除掉处理
		                   pointfeature.set("BaseType","3");
						var extent= pointfeature.getGeometry().getExtent();//点的范围
						var cr= pointfeature.getGeometry().getCoordinates();
						var startcount=0,endcount=0,dblstartcount=0,dblendcount=0;
						var startBol=false,endBol=false;
						var totalLine=0,doubleLine=0;
					  eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {//点上有几条线
		            		var coors= feature.getGeometry().getCoordinates();
		            		var dir=feature.get("Direction");
		            		if(dir=="双向"){
								var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[0]);
								var ff= closestfeature.getGeometry().getCoordinates();
								if((cr[0]==ff[0])&&(cr[1]==ff[1])){//
									dblstartcount++;
									
								}
								var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[coors.length-1]);
								var ff= closestfeature.getGeometry().getCoordinates();
								if((cr[0]==ff[0])&&(cr[1]==ff[1])){
									dblendcount++;
								}
		            			doubleLine++;
							}else{
								var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[0]);
								var ff= closestfeature.getGeometry().getCoordinates();
								if((cr[0]==ff[0])&&(cr[1]==ff[1])){//
									startcount++;
									
								}
								var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[coors.length-1]);
								var ff= closestfeature.getGeometry().getCoordinates();
								if((cr[0]==ff[0])&&(cr[1]==ff[1])){
									endcount++;
								}	
							}

							totalLine++;
						        });
					  //双向航线起点样式优先于交叉点样式。
						//totalline实际上是删除点上方线的个数
				    	pointfeature.set("Status",totalLine);
					  if(totalLine==0){//说明，删除的点上没有线，就就删除
			    			pointfeature.set("BaseType","1");
			    			eval("tmpNavlineSource").addFeature(pointfeature);//为避免在已经删除的点的位置上，跳出是否合并转向点的提示。采取临时措施
								  pointfeature.setStyle(removeShadow()); 
					  }else if(doubleLine==0){//没有双向航线
					    	if(totalLine==startcount){//所有单向线有一个共同的起点
					    		pointfeature.setStyle(startPointStyle(Name));
					    		 pointfeature.set('PointType',3);
					    	}else if(totalLine==endcount){//所有单向线有一个共同的终点
					    		pointfeature.setStyle(finishPointStyle(Name));
					    		 pointfeature.set('PointType',4);
					    	}else if(totalLine==1){//只有一条线，既不是起点，也不是终点
					    		pointfeature.setStyle(PointStyle(Name));
					    		 pointfeature.set('PointType',2);
					    	}else{//两个以上线，既不是起点，也不是终点
					    		pointfeature.setStyle(ImportantPointStyle(Name));
					    		 pointfeature.set('PointType',1);
					    	}
					     }else{//有双向航线
					    //双向航线优先于单向航线
				         if((doubleLine==dblstartcount)||(doubleLine==dblendcount)){//所有双向航线有一个共同的起点或终点
				        		pointfeature.setStyle(DoubelEndStyle(Name)); 
				        		 pointfeature.set('PointType',5);
				         }else if(totalLine==1){//只有一条线，既不是起点，也不是终点
					    		pointfeature.setStyle(PointStyle(Name));
					    		 pointfeature.set('PointType',2);
					    	}else{//两个以上线，既不是起点，也不是终点
					    		pointfeature.setStyle(ImportantPointStyle(Name));
					    		 pointfeature.set('PointType',1);
					    	}					    	 					    	 
					     }      
							 eval("NavlineSource").addFeature(linefeature);//还原线	
								eval("editNavPointSource").removeFeature(pointfeature);
								for(var j = 0; j <oldFeatures.length; j++){//再将移进去ID点再从NavPointSource上移走
									var fea=oldFeatures[j];
										var id=fea.getId();
										if(id!=null&&id!=pid){
											//删除的点保存在NavPointSource上
											 eval("NavPointSource").removeFeature(fea); 	
										}
									
									}
				  	
	
	var remainArr=$('#deletePointArr').val();//将删除的点存在一起
		 remainArr=remainArr+ pid+',';
		$('#choosetype').val(1);
	$('#deletePointArr').val(remainArr);

}
function EndsStyle(Linecoords,linefeature){//判断确定航线两端颜色
	var direction=linefeature.get('Direction');
	var startpointfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(Linecoords[0]);
	var Name=startpointfeature.get('name');
		 eval("NavPointSource").addFeature(startpointfeature);
		 eval("NavlineSource").removeFeature(linefeature);
		eval("editNavPointSource").removeFeature(startpointfeature); 
			var extent= startpointfeature.getGeometry().getExtent();
			var cr=  startpointfeature.getGeometry().getCoordinates();
			var bol=0;
			var total=0;
			var dirBol=false;
			var targetdir;
			eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {
		//feature不包含linefeature这条线
        		var coors= feature.getGeometry().getCoordinates();
        		var dir=feature.get('Direction');
        		if(dir=='双向'){
        			targetdir='双向';
	        	}
				var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[0]);
				var ff= closestfeature.getGeometry().getCoordinates();
				if((cr[0]==ff[0])&&(cr[1]==ff[1])){
					 bol++;
		        	if(dir=='双向'){
		        		 dirBol=true;
		        	}	
				}
				total++;
			        });
			
		     if( bol==total){//所有航线同一个起点
		    	if(dirBol){//起点是其中一个双向航线的起点，所以是起点
		    		startpointfeature.setStyle(DoubelEndStyle(Name));	
		    		startpointfeature.set("PointType",5); 
		    	}else{
		    		if(direction=="双向"){
		    			startpointfeature.setStyle(DoubelEndStyle(Name));	
			    		startpointfeature.set("PointType",5); 
		    		}else{
		    			 startpointfeature.setStyle(startPointStyle(Name));	
		            	 startpointfeature.set("PointType",3); 	
		    		}
		    	
		    	}
             }else{
            	 if(direction=="双向"){
            		 if(targetdir=="双向"){
            			 startpointfeature.setStyle(ImportantPointStyle(Name));	
                    	 startpointfeature.set("PointType",1);		 
            		 }else{
            				startpointfeature.setStyle(DoubelEndStyle(Name));	
    			    		startpointfeature.set("PointType",5);  
            		 }
		    		}else{
            	 startpointfeature.setStyle(ImportantPointStyle(Name));	
            	 startpointfeature.set("PointType",1);	
            	 } 
             }
				 eval("editNavPointSource").addFeature(startpointfeature);
				eval("NavPointSource").removeFeature(startpointfeature); 
	var endpointfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(Linecoords[Linecoords.length-1]);
	var Name=endpointfeature.get('name');
		 eval("NavPointSource").addFeature(endpointfeature);
			eval("editNavPointSource").removeFeature(endpointfeature); 
			var extent= endpointfeature.getGeometry().getExtent();
			var cr=  endpointfeature.getGeometry().getCoordinates();
			var bol=0;
			var total=0
			var dirBol=false;
			var targetdir;
			eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {
		
        		var coors= feature.getGeometry().getCoordinates();
        		var dir=feature.get('Direction');
        		if(dir=='双向'){
        			targetdir='双向';
	        	}
				var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[coors.length-1]);
				var ff= closestfeature.getGeometry().getCoordinates();
				if((cr[0]==ff[0])&&(cr[1]==ff[1])){
					 bol++;
					 if(dir=='双向'){
		        		 dirBol=true;
		        	}
				}
				total++;
			        });

		     if( bol==total){
		    	 if(dirBol){//起点是其中一个双向航线的起点，所以是终点}
		    		 endpointfeature.setStyle(DoubelEndStyle(Name));	
	            	 endpointfeature.set("PointType",5); 
		    	 }else{
		    			if(direction=="双向"){
		    				 endpointfeature.setStyle(DoubelEndStyle(Name));	
			    			 endpointfeature.set("PointType",5); 
			    		}else{
			    			 endpointfeature.setStyle(finishPointStyle(Name));	
			            	 endpointfeature.set("PointType",4); 	
			    		}
		    		
		    	 }
	            	
             }else{
            	 if(direction=="双向"){
	              if(targetdir){
	            	  endpointfeature.setStyle(ImportantPointStyle(Name));	
	             	 endpointfeature.set("PointType",1);	
		    			}else{
		    				 endpointfeature.setStyle(DoubelEndStyle(Name));	
		            		 endpointfeature.set("PointType",5); 	
		    			}
            		
		    		}else{
		    		
            	 endpointfeature.setStyle(ImportantPointStyle(Name));	
            	 endpointfeature.set("PointType",1);	
            	 } 
             }
		   
		    eval("editNavPointSource").addFeature(endpointfeature);
		    eval("NavPointSource").removeFeature(endpointfeature); 
			 eval("NavlineSource").addFeature(linefeature);
	
}
//修改航线时，找出删除的点的ID
function deleteOnePoint(modify_coord){
	var remainPointID=[];
	for (var j = 0; j < modify_coord.length; j++) {//修改前，没有移动的去除掉，
		var pointfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(modify_coord[j]);
		eval("tmpNavPointSource").addFeature(pointfeature);
 		eval("editNavPointSource").removeFeature(pointfeature);
	}
	 var pointfeatures=eval("editNavPointSource").getFeatures();//只存在删除点
	 for(var j = 0; j < pointfeatures.length; j++){//点击删除的点，可能是ID点，也可能是无ID点
		 var pointfeature=pointfeatures[j];
		 var pointid=pointfeature.getId();
		 if(pointid!=null){//如果ID不为空，则是ID点, 无ID的点直接剔除掉
			 remainPointID.push(pointid);
					eval("tmpNavPointSource").addFeature( pointfeature);
			 		eval("editNavPointSource").removeFeature( pointfeature); 	 
		 }else{
			 pointfeature.setStyle(removeShadow());
		 }
	 }
		eval("editNavPointSource").clear(true); 
		 var pointfeatures=eval("tmpNavPointSource").getFeatures();
		for (var j = 0; j < pointfeatures.length; j++) {//
			var pointfeature=pointfeatures[j];
			var PointType=pointfeature.get("PointType");
			var Name=pointfeature.get("name");
			showPointStyle(pointfeature,PointType,Name);
			eval("editNavPointSource").addFeature(pointfeature);
		}
		eval("tmpNavPointSource").clear(true); 
		return remainPointID;
}

var	transNavPoint;
//要素编辑面板中，平移功能
var translate,translate_single;
var fea_coll = new ol.Collection();
//通告中，平移要素
$("#geo_update_button").click(function(){
	   click_n=3;
	
	   map.removeInteraction(modify);
	   selectClick.getFeatures().clear();
	   try{
		   clicked_feature.setStyle(styleold);   
	   }catch(e){
		   
	   }
	
});
//编辑要素
var modify;
//通告节点编辑
$("#geo_update_button2").click(function(){
	   click_n=4;  
	   selectClick.getFeatures().clear();
	   clicked_feature.setStyle(styleold);
	   map.removeInteraction(translate);
	   map.removeInteraction(translate_single);
});
//删除要素
//通告中，删除的要素的数组
var features_geodelete=[];
$("#feature_delete_button").click(function(){
	selectDel=1;
	NodeEditInfo=[];
	clickmovedInfo=[];
	   click_n=2;
	   try{ remove_interaction();
		modify.removePoint();
		   selectClick.getFeatures().clear();
		   clicked_feature.setStyle(styleold);}catch(e){
		   
	   }
	  
});
//转向点信息编辑中，转向点的类型判断
function PointCategory(type){
	if(type==2){
		$('#editcenteral').text("普通");
		$('#edits_line > a').text('重要');
		$('#editcenteral').attr('disabled', false);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text('普通转向点');
	}else if(type==1){
		$('#editcenteral').text("交叉");
		$('#editcenteral').attr('disabled', true);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text("交叉转向点");
	}else if(type==3){
		$('#editcenteral').text("重要");
		$('#editcenteral').attr('disabled', true);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text('重要转向点');
	}else if(type==4){
		$('#editcenteral').text("重要");
		$('#editcenteral').attr('disabled', true);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text('重要转向点');
	}else if(type==5){
		$('#editcenteral').text("重要");
		$('#editcenteral').attr('disabled', true);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text('重要转向点');
	}else if(type==6){
		$('#editcenteral').text("重要");
		$('#edits_line > a').text('普通');
		$('#editcenteral').attr('disabled', false);
		$('#Pointinfo1 div table tr:nth-child(1)  td:nth-child(2)').text('重要转向点');
	}
	
}


// 添加单个要素中，添加
    var cusAttrA="";
    var cusAttrB="";
	var cusAttrC="";
	var cusAttrD="";
	var cusAttrE="";
	var cusAttrF="";
	var cusAttrG="";
	var cusAttrH="";
	var cusAttrI="";
	var cusAttrJ="";
	//重置
	$("#add_reset").click(function(){	
	$('#Notice_name').val('');
	click_n=1 ;	
	$('#Notice_Createtime').val('');
	$('#Notice_Starttime').val('');
	$('#Notice_Endtime').val('');
	$('#Notice_content').val('');
	$('#Feature_Circus').val('');
	$('#Notice_remark').val('');
	$('#add_results').text('');
	$('#notice_time').val('');
	$('#Feature_longitude').val('');
	$('#Feature_latitude').val('');
	remove_interaction();
    });
	$("#add_exit,#addfeaturecancel").click(function(){
		click_n=0 ;	
		 $("#circularaddnotice").css('display', 'none');
		  $("#add_ok").removeAttr('disabled');
		$(".blackoverlayer").css("display","none"); 
		remove_interaction();
		$('#Notice_name').val('');
		$('#notice_time').val('');
		$('#Notice_Starttime').val('');
		$('#Notice_Endtime').val('');
		$('#Notice_content').val('');
		$('#Feature_Circus').val('');
		$('#Notice_remark').val('');
		$('#add_results').text('');
		
		$('#noticeforever').attr('checked',false);
		 $("#notice_time").attr('disabled',false); 
		$('#Feature_longitude').val('');
		$('#Feature_latitude').val('');
		getNotice();
				    	  
	    $("#addFeature").css("display","none");  
	    try{ 
	    	selectClick.getFeatures().clear();
	    	 draw.removePoint();
	    	 remove_interaction();
	    }catch(e){
			 
		 }
    });
	//转向点的样式显示
function showPointStyle(pointfeature,PointType,Name){
	if(PointType==1){//交叉点
		pointfeature.setStyle(ImportantPointStyle(Name));
	}else if(PointType==2){//普通
		pointfeature.setStyle(PointStyle(Name));	
	}else if(PointType==3){//起始
		pointfeature.setStyle(startPointStyle(Name));
	}else if(PointType==4){//结束
		pointfeature.setStyle(finishPointStyle(Name));
	}else if(PointType==5){//双向点
		pointfeature.setStyle(DoubelEndStyle(Name));
	}else if(PointType==6){//重要提醒节点
		pointfeature.setStyle(DangerPointStyle(Name));
	}
}

	//清除地图交互
	function remove_interaction(){
		 map.removeInteraction(draw);
//		
		 map.removeInteraction(translate);
		 map.removeInteraction(translate_single);
		 map.removeInteraction(modify);
	};
	/***屏幕取点绘制点、线、面***/
	var sour;  //当前编辑层的source
	var old_feature = null;//记录当前绘制的前一个点
	var draw;//画线画多边形
	var old_sour;
	var old_point=null;//记录当前绘制的前一点
	var old_line = null;//记录当前绘制的前一条线
	var old_polygon = null;//记录当前绘制的前一个面
	var if_importFe=0;//判断绘制获取经纬度的点击事件，是否之前添加过要素
   var CDtype='';
$("input[name='basetype']").click(function(){
	var type = $(this).val();
	addnoticenum=1
	addnoticeID=1;
	var table=$('#NoticePoint>.table');
	table.empty();
	table.append("<tr><td>点</td><td>经度</td><td>纬度</td></tr>");

	if(type=="2"){ 
		click_n=-1;
		addTr1();
		addTr1();
		addTr1();
		noticeBasetype=2;
		 $(".geo_coor").text("屏幕画面");	
		 $("input:radio[value='2']").eq(0).attr("checked",true);
		 remove_interaction();
	}
	if(type=="1"){ 
		click_n=-1;
		addTr1();
		addTr1();
		noticeBasetype=1;
		 $(".geo_coor").text("屏幕画线");	
		 $("input:radio[value='1']").eq(0).attr("checked",true);
		 remove_interaction();
	}
	if(type=="0"){ 
		click_n=1;
		addTr1();
		noticeBasetype=0;
		 $(".geo_coor").text("屏幕取点");	
		 $("input:radio[value='0']").eq(0).attr("checked",true);
		 remove_interaction();
	}
	if(type=="3"){ 
		CDtype=2;	
	$('#realdepth_show').show()	;
	$('#realwidth_show').hide()	;	
	}
	if(type=="4"){ 
		CDtype=1;
		$('#realdepth_show').hide()	;
		$('#realwidth_show').show()	;
	}
	
})

$('#linebutton').click(function(){
	NoticeID[2]=1;
	addTr();
$('#editpointform').hide();
$('#editpointbutton').show();
})
$('#panebutton').click(function(){
	NoticeID[2]=2;
	addTr();
	$('#editpointform').hide();
	$('#editpointbutton').show();
})

	//屏幕取点
	var noticeBasetype=0;
 var selectSubClassID;
    $(".geo_coor").click(function(){
    	 $(".blackoverlayer").css("display","none"); 
    	var type = $("input[name='basetype']:checked").val();
//    	delete_before_draw();
		selectSubClassID="N0301";
    	if(type=="2"){ //面  		
    		click_n=-1 ;	  
            $("#addFeature").hide(); 						    
    	    draw_polygon();	    
    	}
    	else if(type=="1"){//线
    		click_n=-1 ;
    			  
            $("#addFeature").hide(); 						    
    	    draw_line();
    	}
    	else if(type=="0"){//点
    	
    		click_n=1 ;
    		  
            $("#addFeature").hide();	 					
    	}
    	
	})
		/************************画多边形*****/
	var coordinates;//3875坐标系下的坐标串
	var linecoords=[];//全局变量：4326坐标系下绘制线的时候保存绘制的坐标串
	function draw_line() {
//		delete_before_draw();
	    draw = new ol.interaction.Draw({
	        source: sour,
	        type: /** @type {ol.geom.GeometryType} */ ('LineString'),		 
	    });
	    map.addInteraction(draw);
		draw.on('drawend',
	        function(evt) {
	            // set sketch
				old_sour = sour;
				old_line = evt.feature;
				coordinates= evt.feature.getGeometry().getCoordinates();
				linecoords=[];
				for(var i=0;i<coordinates.length;i++){
					var lanlon=ol.proj.transform(coordinates[i], 'EPSG:3857', 'EPSG:4326');
					linecoords.push(lanlon);
				}
//				 transformTo64(linecoords);
				if(NoticeEditBol){
					editConvertBol=84;
					createPointlist1(linecoords);
					$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
					$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					$('#editConvertTo84').attr('disabled', 'disabled');
					$('#editConvertTo54').removeAttr('disabled');
					$('#editswift84').show();
					$('#editswift54').hide();
					$('#editHDTG').show();
				}else{
					ConvertBol=84;
					createPointlist2(linecoords);
					$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
					$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					$('#ConvertTo84').attr('disabled', 'disabled');
					$('#ConvertTo54').removeAttr('disabled');
					$('#swift84').show();
					$('#swift54').hide();
				    $("#addFeature").show();  
				}

	            $(".blackoverlayer").css("display","block"); 	  

	    }, this);
	       
	};

$('#pickNavPoint').click(function(){
	eval("tmpNavPointSource").clear(true);	
	NavPointLine=[];
$('#createNavPointbtn').css('display','flex');
$('#addNavLine').css('display','none');

})
var editNavlineArr=[];
$('#NavPointName').bind('input propertychange', function() {  
	  $('#addPoint_reslts').text(''); 
}); 

$('#addLine_reset').click(function(){
	$('#NavLine_type').val("");
	$('#NavLine_name').val("");
	$('#Line_width').val("");
	$('#Line_depth').val("");
	$('#Line_height').val("");
	$('#Line_rule').val("");
	$('#Line_results').text('');

})
$('#NavLine_name').bind('input propertychange', function() {  
	  $('#Line_results').text(''); 
});
//添加航线
$('#addNavLine_ok').click(function(){
	lockNewline=true;
	var linename=$('#NavLine_name').val();
	var linetype=$('#NavLine_type').val();
	var linewidth=$('#Line_width').val();
	var lineheigtht=$('#Line_height').val();
	var linedepth=$('#Line_depth').val();
	var Line_rule=$('#Line_rule').val();
	if(linename==""){
		  $('#Line_results').text('请填写名称️');
		     return;	
	}else{
		NavPointLine=[];
//	
//			var pointfeatures=eval("editNavPointSource").getFeatures();
//		var len=createPointsCollection.getLength();;
		var linefeature=eval("tmpNavlineSource").getFeatures()[0];
		var coordinates=linefeature.getGeometry().getCoordinates();
		var num=1;
		for(var j = 0; j < coordinates.length; j++){
//		var pointfeature=createPointsCollection.item(j);
		var pointfeature=eval("editNavPointSource").getClosestFeatureToCoordinate(coordinates[j]);
		var lanlon=pointfeature.getGeometry().getCoordinates();
		var pcoor=ol.proj.transform(lanlon, 'EPSG:3857','EPSG:4326');
		var BaseType=pointfeature.get("BaseType");
		var name=pointfeature.get("name");
		var Status=pointfeature.get("Status");
		var PointType=pointfeature.get("PointType");
		var describe=pointfeature.get("Describe");
		var attr_C=pointfeature.get("attr_C");
		var attr_D=pointfeature.get("attr_D");
		var PointID=pointfeature.getId();
		if(name==''){
			name=linename+num;
			 num++;	
			 pointfeature.set("name",name);
		}
		  showPointStyle(pointfeature,PointType,name);
			var arr={
					"Name": name,
					"Leg": '',
					"FeatureClass":"N04",
					"SmallClass":"N0401",
					"Region": "南京",
					"BaseType": BaseType,//0为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
					"PointType":PointType,//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点,5双向点
					"Creator": UserName,
					"Status":Status,
					"PointID": PointID,
					"Remark":'',
					"describe":describe,//
					"Attribution_A":cusAttrA,
					"Attribution_B":cusAttrB,
					"Attribution_C":attr_C,
					"Attribution_D":attr_D,
					"Attribution_E":cusAttrE,
					"Attribution_F":cusAttrF,
					"Attribution_G":cusAttrG,
					"Attribution_H":cusAttrH,
					"Attribution_I":cusAttrI,
					"Attribution_J":cusAttrJ,
					"Latitude":pcoor[1],
					"Longitude": pcoor[0]
				}
			NavPointLine.push(arr);	
			
		}
		
		
		
		
		
		
		
	$("#circularaddline").css('display', 'block'); 
	$("#addNavLine_ok").attr('disabled', 'disabled');
	$('#addNavLine_ok >div:nth-child(1)').hide();
	 addNavline(linename,linetype,linewidth,lineheigtht,linedepth,Line_rule,'正向');		
	
	}
})
//添加航线，取消
$('#Navlinehide').click(function(){
	lockNewline=true;
	 $(".blackoverlayer").css("display","none"); 
$('#NavLine_name').val('');
	$('#NavLine_type').val('');
	$('#NavLine_length').val('');
	 $('#Line_results').text(''); 
	 $('#addNavLine').hide();
//	 unlockFeatures();
		var pointfeatures=eval("editNavPointSource").getFeatures();
		for (var i = 0; i <  pointfeatures.length; i++) {
			var pointfeature=pointfeatures[i];
			var id=pointfeature.getId();
			if( id!=null){
              var restore=pointfeature.get('restoreType');
              var status=pointfeature.get('Status');
              pointfeature.set('Status',Number(status)-1);
              var pointName=pointfeature.get("name");
              showPointStyle(pointfeature,restore,pointName);
				pointfeature.set("SmallClass","N0401");	//线不选择	
				pointfeature.set("PointType",restore);	
				eval("NavPointSource").addFeature(pointfeature);
			}

		};
		click_n=0;
		$('#choosetype').val(11);
eval("editNavPointSource").clear(true);	
eval("tmpNavlineSource").clear(true);
NavPointLine=[];
})
$('#deleteNavLines').click(function(){
	
	$('#deleteNaline1').css('display','block');
	 $(".blackoverlayer").css("display","block"); 

})

//分离转向点
$('.createNavPoint').click(function(){
		click_n=0;
		$('#editNavLInebtn').css('display','flex');
	$('#ChooseeditNavPoint').hide();
	 $(popupElement).popover('show');
	$(".blackoverlayer").css("display","none"); 
})

//合并转向点处理
$('.pickNavPoint').click(function(){//合并
	var Lineid=$('#editLinID').val();
	var pointid=$('#editPoinID').val();
	//保留目标转向点，移动的点删除
	   var Pointfea=eval("NavPointSource").getFeatureById(pointid);;//目标点feature
		 var pcoors= Pointfea.getGeometry().getCoordinates();
		 var extent= Pointfea.getGeometry().getExtent();
		 //根据目标点获取移动点feauture
		  var closestfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(pcoors);
		  var ccoors= closestfeature.getGeometry().getCoordinates();
		  var targetDire;
			eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {
				 var dir = feature.get("Direction");
				 if(dir=="双向"){
					 targetDire="双向";
				 }
			        });
		  var status=Pointfea.get('Status');
		  var id=closestfeature.getId();
	        if(id!=null){
	        	closestfeature.set("BaseType","1");//移动点
       			eval("tmpNavlineSource").addFeature(closestfeature);
            		eval("editNavPointSource").removeFeature(closestfeature);
            		closestfeature.setStyle(removeShadow());
            		var remainArr=$('#deletePointArr').val();
           		 remainArr=remainArr+id+',';
           		$('#choosetype').val(1);
           	$('#deletePointArr').val(remainArr);
	        }else{
	        	eval("editNavPointSource").removeFeature(closestfeature);	
	        }
			var linefeature=eval("NavlineSource").getFeatureById(Lineid);
			var direction=linefeature.get("Direction");
			 var lincoors= linefeature.getGeometry().getCoordinates();
			var index;
			var newlinecoor=[];
			 for(var j = 0; j < lincoors.length; j++){
				 var cor=lincoors[j];
				 if(cor[0]==ccoors[0]&&cor[1]==ccoors[1]){
					 newlinecoor.push(pcoors); 
					 index=j;
				 }else{
					 newlinecoor.push(cor);  
				 }
			 }
				var Name=Pointfea.get("name");
				var pointStyle=Pointfea.get("PointType");
			 if(index==0){
				 if(direction=="双向"){
					 
					 if(targetDire=="双向"){
//						if(pointStyle==5){
//							 Pointfea.setStyle(DoubelEndStyle(Name)); 
//							 Pointfea.set('PointType',5); 
//						}else{
							  Pointfea.setStyle(ImportantPointStyle(Name));  
				    			 Pointfea.set('PointType',1); 
					
					 }else{
					
			    			 Pointfea.setStyle(DoubelEndStyle(Name)); 
							 Pointfea.set('PointType',5); 
					 }	
				 }else{
					 if(pointStyle==5){
						 Pointfea.setStyle(DoubelEndStyle(Name)); 
						 Pointfea.set('PointType',5); 
					 }else if(pointStyle==3){
						 Pointfea.setStyle(startPointStyle(Name));
							 Pointfea.set('PointType',3); 
					 }else{
						  Pointfea.setStyle(ImportantPointStyle(Name));  
			    			 Pointfea.set('PointType',1);   
					 } 
				 }
				
			 }else if(index==(lincoors.length-1)){
				 if(direction=="双向"){
					 
					 if(targetDire=="双向"){
//						if(pointStyle==5){
//							 Pointfea.setStyle(DoubelEndStyle(Name)); 
//							 Pointfea.set('PointType',5); 
//						}else{
							  Pointfea.setStyle(ImportantPointStyle(Name));  
				    			 Pointfea.set('PointType',1); 
//						}
					 }else{
					
			    			 Pointfea.setStyle(DoubelEndStyle(Name)); 
							 Pointfea.set('PointType',5); 
					 }	
				 }else{
					 if(pointStyle==5){
						 Pointfea.setStyle(DoubelEndStyle(Name)); 
						 Pointfea.set('PointType',5); 
					 }else if(pointStyle==4){
						 Pointfea.setStyle(finishPointStyle(Name));
							 Pointfea.set('PointType',4); 
					 }else{
						  Pointfea.setStyle(ImportantPointStyle(Name));  
			    			 Pointfea.set('PointType',1);   
					 } 
				 }
			 }else{
				 if(pointStyle==5){
					 if(direction=="双向"){
						  Pointfea.setStyle(ImportantPointStyle(Name));  
			    			 Pointfea.set('PointType',1); 
					 }else{
						 Pointfea.setStyle(DoubelEndStyle(Name)); 
						 Pointfea.set('PointType',5);   
					 }
					
				 }else{
					  Pointfea.setStyle(ImportantPointStyle(Name));  
		    			 Pointfea.set('PointType',1);   
				 }
			 }
		      Pointfea.set("BaseType","6");
		      Pointfea.set("Status",Number(status)+1);
		      Pointfea.set("attr_D",1);
				eval("editNavPointSource").addFeature(Pointfea);
				eval("NavPointSource").removeFeature(Pointfea);
//			 lincoors.splice(index,1,pcoors);
			 linefeature.setGeometry(new ol.geom.LineString( newlinecoor));
			 
		click_n=0;
		$('#choosetype').val(1);
		$('#editNavLInebtn').css('display','flex');
	$('#ChooseeditNavPoint').hide();
	 $(popupElement).popover('show');
	$(".blackoverlayer").css("display","none"); 
})
$('#editNavLine_ok').click(function(){
	lockSelectLine=true;
	var lineid=$('#NavLineID').val();
	var linename=$('#editNavLine_name').val();
	var linetype=$('#editNavLine_type').val();
	var linewidth=$('#editLine_width').val();
	var lineheigtht=$('#editLine_height').val();
	var linedepth=$('#editLine_depth').val();
	var Line_rule=$('#editLine_rule').val();
	var choosetype=$('#choosetype').val();
	var lineArr=[];
	var linefeature=eval("NavlineSource").getFeatureById(lineid);
	var direction=linefeature.get('Direction');
	var PointArray=linefeature.get('PointArray');
    $("#circulareditLine").css('display', 'block'); 
    $("#editNavLine_ok").attr('disabled', 'disabled');
    $('#editNavLine_ok >div:nth-child(1)').hide();
	linefeature.set("name",linename);
	linefeature.set("Depth",linedepth);
	linefeature.set("Rank",linetype);
	linefeature.set("Width",linewidth);
	linefeature.set("Height",lineheigtht);
	linefeature.set("Rule",Line_rule);
	linefeature.set("RestorePointArray",PointArray);
	if(choosetype==2){//删除航线
			SaveDeletedLine(lineid);
	
	}else {//航线发生编辑，
		var coordinates=linefeature.getGeometry().getCoordinates();	
		
		for (var j = 0; j < coordinates.length; j++) {
			var pointfeature= eval("editNavPointSource").getClosestFeatureToCoordinate(coordinates[j]);
			var basetype=pointfeature.get("BaseType");
			var status=pointfeature.get("Status");
			var PointType=pointfeature.get("PointType");
			var attrc=pointfeature.get("attr_C");
			var attr_D=pointfeature.get("attr_D");
				 var coords= pointfeature.getGeometry().getCoordinates();
					var out = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326'); 
					var Name=pointfeature.get("name")
					var pid=pointfeature.getId();
					if(pid==null){
						 pid=0;
						
						 pointfeature.set("name",Name);
						  var style=pointfeature.getStyle();
						     var text=style.getText();
						     text.setText(Name);
					}

						pointfeature.set("attr_D",attr_D);	
						pointfeature.set("RestoreStatus",status);
						pointfeature.set("RestoreType", PointType);
						pointfeature.set("lat",out[1]);
						pointfeature.set("lon",out[0] );
				
				var arr={
						"Name":Name,
						"Leg": '',
						"PointID":pid,
						"FeatureClass":"N04",
						"SmallClass":"N0401",
						"Region": "南京",
						"BaseType":basetype,//0为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status,4为不操作
						"PointType":PointType,
						"Creator":pointfeature.get("creator"),
						"Editor":UserName,
						"Remark":'',
						"describe":pointfeature.get("Describe"),//
						"Attribution_A":cusAttrA,
						"Attribution_B":cusAttrB,
						"Attribution_C":attrc,
						"Attribution_D":attr_D,
						"Attribution_E":cusAttrE,
						"Attribution_F":cusAttrF,
						"Attribution_G":cusAttrG,
						"Attribution_H":cusAttrH,
						"Attribution_I":cusAttrI,
						"Attribution_J":cusAttrJ,
						"Latitude": out[1],
						"Longitude":out[0],
						"Status":Number(status)
					}
				lineArr.push(arr);
		}
		
		 var tmpfeatures=eval("tmpNavlineSource").getFeatures();
		 for(var i=0;i< tmpfeatures.length;i++){//解决，避免合并转向点，意外跳出
			 var tmpfea=tmpfeatures[i];
			 var id=tmpfea.getId();
			 if(id!=null){
				 	eval("NavPointSource").addFeature(tmpfea);  
			 }
			 
		 }
		 eval("tmpNavlineSource").clear(true); 
		var deleteArr=$('#deletePointArr').val();//ID数组
		 var  array = deleteArr.split(","); 
		 	for (var j = 0; j <   array.length-1; j++) {
		 		var pointfeature=eval("NavPointSource").getFeatureById(array[j]);
		 		   if(pointfeature!=null){
		 				 var coords= pointfeature.getGeometry().getCoordinates();
		 				var out = ol.proj.transform(coords, 'EPSG:3857', 'EPSG:4326'); 
		 				var  Name=pointfeature.get("name");
		 				var basetype=pointfeature.get("BaseType");
		 				var status=pointfeature.get("Status");
		 				var PointType=pointfeature.get("PointType")
		 				var attr_D=pointfeature.get("attr_D");
                           if(basetype=="1"){//这个点要删除，之前没有删除，是因为编辑取消时，恢复使用
                        	   eval("NavPointSource").removeFeature(pointfeature);   
                           }else{
       						pointfeature.set("attr_D",attr_D);	
    						pointfeature.set("RestoreStatus",status);
    						pointfeature.set("RestoreType", PointType);
    						pointfeature.set("lat",out[1]);
    						pointfeature.set("lon",out[0] );  
                           }
		 			var arr={
		 					"Name": Name,
		 					"Leg": '',
		 					"PointID":array[j],
		 					"FeatureClass":"N04",
		 					"SmallClass":"N0401",
		 					"Region": "南京",
		 					"BaseType":basetype,//
		 					"PointType":PointType,
		 					"Creator":pointfeature.get("creator"),
		 					"Editor":UserName,
		 					"Remark":'',
		 					"describe":pointfeature.get("Describe"),//
		 					"Attribution_A":cusAttrA,
		 					"Attribution_B":cusAttrB,
		 					"Attribution_C":pointfeature.get("attr_C"),
		 					"Attribution_D":attr_D,
		 					"Attribution_E":cusAttrE,
		 					"Attribution_F":cusAttrF,
		 					"Attribution_G":cusAttrG,
		 					"Attribution_H":cusAttrH,
		 					"Attribution_I":cusAttrI,
		 					"Attribution_J":cusAttrJ,
		 					"Latitude": out[1],
		 					"Longitude":out[0],
		 					"Status":Number(status)
		 				}
		 			lineArr.push(arr);
		 		   }

		 	} 
	
		editNavLine(lineArr,lineid,linename,linetype,linewidth,lineheigtht,linedepth,Line_rule,PointArray,direction);	
	}
	unlockFeatures();
	eval("tmpNavPointSource").clear(true);	
$('#deletePointArr').val('');
})
$('#Line_pane_edit').click(function(){
	if(lockSelectLine){
	if(selectLineID!=""){
		lockSelectLine=false;
		LockOtherFeatures();
		StartEditLine(selectLineID);	
		selectLineID="";	
	}else{
		$('#editlinebtn_results').text('请选择航线');
		
	}
	}
})
//航线编辑中，修改中，平移一个转向点
function transformPoint(modify_coord,linefeature,oldFeatures){
	//modify_coord平移后产生的线上转向点坐标
	//linefeature 是移动的线
	//oldFeatures是移动前的转向点
	var index;
	var transId;var coor;var  remainPointID=[];
	  for(var i = 0; i <modify_coord.length; i++){
		   var Pointfea= eval("editNavPointSource").getClosestFeatureToCoordinate(modify_coord[i]);
			 var coors= Pointfea.getGeometry().getCoordinates();
				var lanlon=ol.proj.transform(modify_coord[i], 'EPSG:3857', 'EPSG:4326');//绘制点的坐标
				var lanlon1=ol.proj.transform(coors, 'EPSG:3857', 'EPSG:4326');//最近点的坐标
				var wgs84Sphere=new ol.Sphere(6378137);
				var dis=wgs84Sphere.haversineDistance(lanlon,lanlon1);
				if(dis>5){//获取平移后的点坐标
					coor=modify_coord[i]; 
					index=i;
				}else{
					eval("tmpNavPointSource").addFeature(Pointfea);
			 		eval("editNavPointSource").removeFeature(Pointfea);	
				}
	  }
	  
		 var pointfeatures=eval("editNavPointSource").getFeatures();//移动前的点的feature
		 for(var j = 0; j < pointfeatures.length; j++){//点平移前的点，
			 var pointfeature=pointfeatures[j];
			 var count=pointfeature.get('Status');
			 var Pointid= pointfeature.getId();
			 coor=AvoidSelfOverlay(oldFeatures,linefeature,modify_coord,index,coor);
			 if(count!=1){
				 deletePointStyle(pointfeature,Pointid,count,linefeature,oldFeatures); //移动前的点删除
					var geo = new ol.geom.Point(coor);//创建新的点
					var feature = new ol.Feature({geometry: geo,});
					feature.set("SmallClass", "createNavPoint");
					var name=linefeature.get('name')+RandomWord();
					feature.setStyle(PointStyle(name));
		       	    feature.set("PointType",2);
		       		  feature.set("attr_C",2);
		     		 feature.set("name",name);
					 feature.set("BaseType","0");
					  feature.set("attr_D",0);
					 feature.set("creator",UserName);
					 feature.set("Status",1);
					 feature.set("Describe",'');
					 eval("tmpNavPointSource").addFeature(feature);
			 }else{//转向点上只有一条航线，直接平移
				var geo = new ol.geom.Point(coor);
		       	 pointfeature.setGeometry(geo); 
		       	eval("tmpNavPointSource").addFeature( pointfeature);
			 }
			
			

		 }
			eval("editNavPointSource").clear(true); 
			 var pointfeatures=eval("tmpNavPointSource").getFeatures();
				for (var j = 0; j < pointfeatures.length; j++) {//
					var pointfeature=pointfeatures[j];
					var PointType=pointfeature.get("PointType");
					var Name=pointfeature.get("name");
					showPointStyle(pointfeature,PointType,Name);
					eval("editNavPointSource").addFeature(pointfeature);
				}
				eval("tmpNavPointSource").clear(true); 
				var Pointfea= eval("NavPointSource").getClosestFeatureToCoordinate(coor);
				if(Pointfea!=null){
			      var dis= pixelDis(coor,Pointfea);
				if(dis<9){//与其他航线上点样式重合，是否合并判断
					  var linID=linefeature.getId();
						$('#editLinID').val(linID);
					  var pointID=Pointfea.getId();
						$('#editPoinID').val(pointID);
						$('#editNavLInebtn').css('display','none');
					$('#ChooseeditNavPoint').show();
					 $(popupElement).popover('hide');
					$(".blackoverlayer").css("display","block"); 
//					eval("editNavPointSource").addFeature(Pointfea);
//					 eval("NavPointSource").removeFeature(Pointfea);	
				}
				}
				
}
function AvoidRepeatPoint(arr,arrCollection){
	//同一个航线上的点之间的距离不能重复，样式重叠
	 var  Pixel= map.getPixelFromCoordinate(arr);
	for(var j = 0; j < arrCollection.length; j++){
		var Array=arrCollection[j];
		 var  featurePixel= map.getPixelFromCoordinate(Array);
	      var a=Math.pow((  featurePixel[0]- Pixel[0]),2);
	      var b=Math.pow((  featurePixel[1]-Pixel[1]),2);
	      var dis= Math.sqrt(b+a);
	      if(dis<9){
	    	  return false;
	      }
	}
	return true;
		
}
//编辑航线，需改中，增加一个转向点，
function addPoint(modify_coord,linefeature,oldfeatures){
	var transId;var coor;var  remainPointID;
	var index;
	  for(var j = 0; j <modify_coord.length; j++){
		   var Pointfea= eval("editNavPointSource").getClosestFeatureToCoordinate(modify_coord[j]);
			 var coors= Pointfea.getGeometry().getCoordinates();
				var lanlon=ol.proj.transform(modify_coord[j], 'EPSG:3857', 'EPSG:4326');//绘制点的坐标
				var lanlon1=ol.proj.transform(coors, 'EPSG:3857', 'EPSG:4326');//最近点的坐标
				var wgs84Sphere=new ol.Sphere(6378137);
				var dis=wgs84Sphere.haversineDistance(lanlon,lanlon1);
				if(dis>5){
					coor=modify_coord[j]; 
					index=j;
				}
	  }

				var Pointfea= eval("NavPointSource").getClosestFeatureToCoordinate(coor);
				if(Pointfea!=null){
			      var dis= pixelDis(coor,Pointfea);
				if(dis<9){//与其他航线上点样式重合，是否合并判断
					  var linID=linefeature.getId();
						$('#editLinID').val(linID);
					  var pointID=Pointfea.getId();
						$('#editPoinID').val(pointID);
						$('#editNavLInebtn').css('display','none');
					$('#ChooseeditNavPoint').show();
					 $(popupElement).popover('hide');
					$(".blackoverlayer").css("display","block"); 
//					eval("editNavPointSource").addFeature(Pointfea);
//					 eval("NavPointSource").removeFeature(Pointfea);	
				}
				}
				
				coor=AvoidSelfOverlay(oldfeatures,linefeature,modify_coord,index,coor);
					var geo = new ol.geom.Point(coor);
					var feature = new ol.Feature({geometry: geo,});
					feature.set("SmallClass", "createNavPoint");
					var name=linefeature.get('name')+RandomWord();
					feature.setStyle(PointStyle(name));
		       	    feature.set("PointType",2);
		       		  feature.set("attr_C",2);
		     		 feature.set("name",name);
					 feature.set("BaseType","0");
					  feature.set("attr_D",0);
					 feature.set("creator",UserName);
					 feature.set("Status",1);
					 feature.set("Describe",'');
					eval("editNavPointSource").addFeature(feature);	
				
			
}
//编辑航线取消操作，将编辑的航线恢复到原来的状态
$('#editNavLinehide').click(function(){
	lockSelectLine=true;
	
	$("#panelNavLine").css('display', 'block'); 
	 $("#panelNavpoint").css('display', 'none'); 
	$('#editlinebtn_results').text('');
	$('#editline_results').text('');
	 var linename=$('#editNavLine_name').val();
	$('#editPointArray').val('');
	var lineid=$('#NavLineID').val();
	 $('#NavLineID').val('');
	 $('#deletePointArr').val('');

	 var tmpfeatures=eval("tmpNavlineSource").getFeatures();//解决，避免合并转向点，意外跳出
	 for(var i=0;i< tmpfeatures.length;i++){
		 var tmpfea=tmpfeatures[i];
		 var id=tmpfea.getId();
		 if(id!=null){
			 	eval("NavPointSource").addFeature(tmpfea);  
		 }
		 
	 }
	 eval("tmpNavlineSource").clear(true);
	 var linefeature=eval("NavlineSource").getFeatureById(lineid);
				 var lincoors= linefeature.getGeometry().getCoordinates();
				 for(var j = 0; j <lincoors.length; j++){//恢复被合并的点
					   var Pointfea= eval("editNavPointSource").getClosestFeatureToCoordinate(lincoors[j]); 
					if(Pointfea!=null){
					   var attr_D= Pointfea.get("attr_D");
					   if(attr_D==1){//1为合并
							 var Name=Pointfea.get('name');
							    var status= Pointfea.get("RestoreStatus");
							    Pointfea.set("Status",status);
							    var PointType= Pointfea.get("RestoreType");
							    Pointfea.set("PointType",PointType);
							    showPointStyle(Pointfea,PointType,Name);
							
						   Pointfea.set("attr_D",0); 
						  	eval("NavPointSource").addFeature(Pointfea);
					   }
					   }
				 }
				 

					 
			 var PointArray= linefeature.get("RestorePointArray");
			 linefeature.set('PointArray',PointArray);
			 var direction= linefeature.get("RestoreDirection");
			 linefeature.set('Direction',direction);
			 var  array = PointArray.split(","); 
			 var coords=[]; 
			 for(var j=0;j< array.length-1;j++){//更改的航线上的转向点ID恢复点
				 var pointfeature=eval("editNavPointSource").getFeatureById(array[j]);
					if(pointfeature!=null){//ID点没有删除处理，如果有ID，则没有删除这个点
						pointfeature.set("SmallClass","N0401");
						 var lat=Number(pointfeature.get('lat'));
						 var lon=Number(pointfeature.get('lon'));
							var pcoor=ol.proj.transform([lon,lat], 'EPSG:4326', 'EPSG:3857');
							coords.push(pcoor);
							var geo = new ol.geom.Point(pcoor);
							 pointfeature.setGeometry(geo);
							 var Name=pointfeature.get('name');
					    var status= pointfeature.get("RestoreStatus");
					    pointfeature.set("Status",status);
					    var PointType= pointfeature.get("RestoreType");
					    pointfeature.set("PointType",PointType);
					    showPointStyle(pointfeature,PointType,Name);
					
					eval("NavPointSource").addFeature(pointfeature);
					}else{//删除的ID点，恢复
						 var pointfeature=eval("NavPointSource").getFeatureById(array[j]);
						 if( pointfeature!=null){
							pointfeature.set("SmallClass","N0401");
							 var lat=Number(pointfeature.get('lat'));
							 var lon=Number(pointfeature.get('lon'));
								var pcoor=ol.proj.transform([lon,lat], 'EPSG:4326', 'EPSG:3857');
								coords.push(pcoor);
								var geo = new ol.geom.Point(pcoor);
								 pointfeature.setGeometry(geo);
								 var Name=pointfeature.get('name');
								  var status= pointfeature.get("RestoreStatus");
								    pointfeature.set("Status",status);
						    var PointType= pointfeature.get("RestoreType");
						    pointfeature.set("PointType",PointType);
						    showPointStyle(pointfeature,PointType,Name);
					}
					}					
			 }
			 linefeature.getGeometry().setCoordinates(coords); 
			 linefeature.setStyle(navLineStyle(linefeature));
	 
			 unlockFeatures();
	 $('#editNavLine_name').val('');
	$('#editNavLine_type').val('');
	$('#editLine_width').val('');
	$('#editLine_depth').val('');
	$('#editLine_height').val('');
	$('#editLine_rule').val('');
	eval("tmpNavPointSource").clear(true);
	eval("editNavPointSource").clear(true);
	selectLineID=""
	$('#Lineinfo div table tr:nth-child(1)  td:nth-child(2)').text("");
	$('#Lineinfo div table tr:nth-child(2)  td:nth-child(2)').text("");
	$('#Lineinfo div table tr:nth-child(3)  td:nth-child(2)').text("");
	$('#Pointinfo div table tr:nth-child(1)  td:nth-child(2)').text('');
	$('#Pointinfo div table tr:nth-child(2)  td:nth-child(2)').text('');
	$('#Pointinfo div table tr:nth-child(3)  td:nth-child(2)').text('');
	$("#PointList").empty();
	$("#PointCount").html("转向点列表");
	map.removeInteraction(modify);
	
})
$('#check_pane_Point').click(function(){
	if(selectLineID!=""){	 
	$("#panelNavLine").css('display', 'none'); 
	 $("#panelNavpoint").css('display', 'block'); 
	}else{
		$('#editlinebtn_results').text('请选择航线');
			
		}
})
$('#NavPointTab').click(function(){
	 $("#panelNavLine").css('display', 'none'); 
	 $("#panelNavpoint").css('display', 'none');
	 clearPanel();

})
$('#NavLineTab').click(function(){
	 $("#panelNavLine").css('display', 'block'); 
	 $("#panelNavpoint").css('display', 'none'); 
	 clearPanel();
})
$('#returnLinelist').click(function(){
	 $("#panelNavpoint").css('display', 'none'); 
	 $("#panelNavLine").css('display', 'block'); 
	 if(lockSelectLine){
	 clearPanel();
	 }
})
//转向点信息编辑按钮
$('#Point_pane_edit').click(function(){
	if(selectPointID!=""){
		 var pointfeature=eval("NavPointSource").getFeatureById(selectPointID);
	 var pointName=pointfeature.get("name");
	 pointfeature.setStyle(oldPointStyle);
		var pointID=pointfeature.getId();
		var type=pointfeature.get("PointType");//转向点类别
		var Describe=pointfeature.get("Describe");
		var count=pointfeature.get("Status");
		var lon=pointfeature.get("lon");		
		var lat=pointfeature.get("lat");
		PointCategory(type);
	$('#editNavPointName').val(pointName);
	$('#editpoint_rule').val(Describe);//航行规则信息
	$('#editNavPointID').val(pointID);
	$('#editLineCount').val( count);
	$('#eidtPointtype').val(type);
  $('#editNavPointLon').val( lon);
   $('#editNavPointLat').val( lat); 
    $('#editNavPoint_btn_').show();	
		selectPointID="";
		click_n=0;
	}else{
		$('#editpointbtn_results').text('请选转向点');	
	}
})
$('#editPoint_reset').click(function(){
	$('#editNavPointName').val("");
	$('#editpoint_rule').val("");//航行规则信息
	$('#editNavPointID').val("");
	$('#editLineCount').val( "");
	$('#eidtPointtype').val("");
 
})
//转向点信息编辑保存
$('#editNavP_ok').click(function(){
	var pointName=$('#editNavPointName').val();
	var  Describe=$('#editpoint_rule').val();//航行规则信息
	var pointID =$('#editNavPointID').val();
	var  count =$('#editLineCount').val();
	var  importType=$('#editcenteral').text();
   var lineID=$('#editNavLineID').val();
	var  lon= $('#editNavPointLon').val();
	var  lat= $('#editNavPointLat').val();
	var pointfeature= eval("NavPointSource").getFeatureById(pointID);
	var type=pointfeature.get("PointType");
	if(type==2||type==6){
		if(importType=='普通'){		
			type=2;	
			pointfeature.set("PointType",type);
			pointfeature.set("RestoreType",type);//恢复颜色类型用
		}else if(importType=='重要'){
			type=6;	
			pointfeature.set("PointType",type);
			pointfeature.set("RestoreType",type);//恢复颜色类型用
		}
	}
	pointfeature.set("name",pointName);
	$('#editcenteral').attr('disabled', "disabled");
	showPointStyle(pointfeature,type,pointName);
	 pointfeature.set("Describe",Describe);
	 pointfeature.set("remark",importType);
	 var info=[];
		var arr={
				"Name": pointName,
				"Leg": '',
				"FeatureClass":"N04",
				"SmallClass":"N0401",
				"Region": "南京",
				"BaseType": "0",//0编辑，1平移，2删除
				"PointType":type,
				"PointID":pointID,
				"Creator": UserName,
				"Count": count,//
				"Remark":importType,
				"describe":Describe,//
				"Attribution_A":cusAttrA,
				"Attribution_B":cusAttrB,
				"Attribution_C":cusAttrC,
				"Attribution_D":cusAttrD,
				"Attribution_E":cusAttrE,
				"Attribution_F":cusAttrF,
				"Attribution_G":cusAttrG,
				"Attribution_H":cusAttrH,
				"Attribution_I":cusAttrI,
				"Attribution_J":cusAttrJ,
				"Latitude": lat,
				"Longitude":lon
			}
		 info.push(arr);
		editNavPoint(info,lineID);
		 $("#circularEditP").css('display', 'block'); 
	    $("#editNavP_ok").attr('disabled', 'disabled');
	    $('#editNavP_ok >div:nth-child(1)').hide(); 
});
var lockNewline=true;
//创建航线
$('#newLine').click(function(){
	if(lockSelectLine){//编辑航线时，不让创建
	if(lockNewline){
		LockOtherFeatures();
	click_n=7;
	lockNewline=false;
	$('#choosetype').val(10);
	if(selectLineID.length>2){
		var linefeatures=eval("NavlineSource").getFeatureById(selectLineID);
		 linefeatures.setStyle(navLineStyle( linefeatures));
		 selectLineID='';
	}
	}
	}
})
$('#Line_pane_delete').click(function(){
	if(lockSelectLine){
	if(selectLineID!=""){	
		$('#deleteNavline').css('display','block');
		 $(".blackoverlayer").css("display","block"); 
	}else{
	$('#editlinebtn_results').text('请选择航线');
		
	}
	}
})
//平移航线上的转向点
$('#editPoint_translate').click(function(){
	if(selectPointID!=""){
		var linefeatures=eval("NavlineSource").getFeatures();
		for (var i = 0; i <  linefeatures.length; i++) {
			var linefeature=linefeatures[i];
			linefeature.set("SmallClass","no");	//线不选择
		};
	    var pointfeature=eval("NavPointSource").getFeatureById(selectPointID);
	    pointfeature.set("SmallClass",'moveNavPoint');
	 var Name=pointfeature.get('name');
  	 pointfeature.setStyle(choosePointStyle(Name));  	 
	  click_n=9;
		selectPointID="";	
	}else{
		$('#editpointbtn_results').text('请选转向点');	
	}
	

});

$('#edit_NavLINE').click(function(){
	$('#editNavLInebtn').css('display','flex');
	$('#editNavLine').hide();
	map.removeInteraction(modify);
	map.removeInteraction(translate_single);
})
$('#geo_translate_button').click(function(){
	map.removeInteraction(modify);
	click_n=11;
	var lineid=$('#NavLineID').val();
	var linefeatures=eval("NavlineSource").getFeatureById(lineid);
	 var Name=linefeatures.get('name');
	 linefeatures.setStyle(editLineStyle(Name));
	var features= eval("editNavPointSource").getFeatures();
	 for(var j=0;j< features.length;j++){
		 var pointfeature=features[j];
			 pointfeature.setStyle(removeShadow());
	 }	
	editNavlineArr=[];

})
$('#geo_modify_button2').click(function(){
	click_n=20;
	var lineid=$('#NavLineID').val();
	var linefeatures=eval("NavlineSource").getFeatureById(lineid);
	 var Name=linefeatures.get('name');
	 linefeatures.setStyle(editLineStyle(Name));	
	var features= eval("editNavPointSource").getFeatures();
	 for(var j=0;j< features.length;j++){
		 var pointfeature=features[j];
			 pointfeature.setStyle(removeShadow());
	 }	
	editNavlineArr=[];
	map.removeInteraction(translate_single);
})
$('#end_navline_button').click(function(){

	  click_n=0;
	$('#editNavLInebtn').css('display','none');
	$('#editNavLine').show();
	map.removeInteraction(translate_single);
	map.removeInteraction(modify);	
})
$('#editNavPointcancel').click(function(){
	$('#editcenteral').attr('disabled', "disabled");
	var pointID =$('#editNavPointID').val();
	var pointfeature= eval("NavPointSource").getFeatureById(pointID);
	var PointType= pointfeature.get("PointType");
	 var Name=pointfeature.get('name');
	 showPointStyle(pointfeature,PointType,Name);
})
//复制航线
$('#CopyNavLine').click(function(){
	if(lockSelectLine){
	if(selectLineID!=""){
var linefeature=eval("NavlineSource").getFeatureById(selectLineID);
linefeature.setStyle(navLineStyle(linefeature));
var direction= linefeature.get('Direciton');
var coordinates= linefeature.getGeometry().getCoordinates();
	var depth=linefeature.get("Depth");
	   var rank= linefeature.get("Rank");
	   var width= linefeature.get("Width");
	   var height= linefeature.get("Height");
	   var rule=linefeature.get("Rule");
	   var direction=linefeature.get("Direction");
		var PointArray= linefeature.get("PointArray");
var lineName=linefeature.get("name")+'复制';
coordinates.forEach(function(arr){  
	 var  featurePixel= map.getPixelFromCoordinate(arr);
	 featurePixel[0]=featurePixel[0]+5;
	 featurePixel[1]=featurePixel[1]+5;
	var  coor= map.getCoordinateFromPixel(featurePixel);
	 arr[0]=coor[0];
	 arr[1]=coor[1];
});
var lfeature= new ol.Feature(new ol.geom.LineString(coordinates));
lfeature.set("BaseType","线");
lfeature.set("name",lineName);
lfeature.set("Direction",direction);
lfeature.setStyle(navLineStyle(lfeature));
lfeature.setId("copyline");

lfeature.set("SmallClass",'copyLine');
lfeature.set("Depth",depth);
lfeature.set("Rank",rank);
lfeature.set("Width", width);
lfeature.set("Height",height);
lfeature.set("Rule",rule);
eval("tmpNavlineSource").addFeature(lfeature);
NavPointLine=[];
var  array = PointArray.split(","); 
for (var j = 0; j < array.length-1; j++) {
	var pointfeature= eval("NavPointSource").getFeatureById(array[j]);	
	if(pointfeature!=null){
	var coor= pointfeature.getGeometry().getCoordinates();
	 var  featurePixel= map.getPixelFromCoordinate(coor);
	 featurePixel[0]=featurePixel[0]+5;
	 featurePixel[1]=featurePixel[1]+5;
	 coor= map.getCoordinateFromPixel(featurePixel);
	var pcoor=ol.proj.transform(coor, 'EPSG:3857','EPSG:4326');
	var Name=pointfeature.get("name")+'复制';
	var PointType=pointfeature.get("PointType");
	var discribe=pointfeature.get("Describe");
	var style=pointfeature.getStyle(); 
	var geo = new ol.geom.Point( coor);
	var feature = new ol.Feature({geometry: geo});//创建复制点
	if( j==0){
		if(direction=="双向"){
			PointType=5;	
		}else{
			PointType=3;
		}
	}else if(j==coordinates.length-1){
		if(direction=="双向"){
			PointType=5;
		}else{
			PointType=4;
		}
	}else{
		PointType=2;
	}
	showPointStyle(feature,PointType,Name);
	feature.set("BaseType", "0");//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
	feature.set("name", Name);
	feature.set("Status", 1);
	feature.set("attr_C",'');
	feature.set("attr_D",0);
	feature.set("Describe",discribe);
	feature.set("PointType",PointType);//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
	eval("editNavPointSource").addFeature(feature);
	var arr={
			"Name": Name,
			"Leg": '',
			"FeatureClass":"N04",
			"SmallClass":"N0401",
			"Region": "南京",
			"BaseType":"0",//0为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
			"PointType":PointType,//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
			"Creator": UserName,
			"Status":1,
			"PointID":"",
			"Remark":'',
			"describe":discribe,//
			"Attribution_A":cusAttrA,
			"Attribution_B":cusAttrB,
			"Attribution_C":"",
			"Attribution_D":cusAttrD,
			"Attribution_E":cusAttrE,
			"Attribution_F":cusAttrF,
			"Attribution_G":cusAttrG,
			"Attribution_H":cusAttrH,
			"Attribution_I":cusAttrI,
			"Attribution_J":cusAttrJ,
			"Latitude":pcoor[1],
			"Longitude": pcoor[0]
		}
	NavPointLine.push(arr);	
}
}
click_n=0;
selectLineID="";
addNavline(lineName,rank,width,height,depth,rule,direction);
$('#editlinebtn_results').text('更新中...');
	}else{
		$('#editlinebtn_results').text('请选择航线');
		
	}
	}
})
//航线编辑，变向按钮点击
$('#changeDirection').click(function(){
	click_n=0;
	var lineid=$('#NavLineID').val();
	var linefeature=eval("NavlineSource").getFeatureById(lineid);
	linefeature.setStyle(navLineStyle(linefeature));
	var features= eval("editNavPointSource").getFeatures();
	 for(var j=0;j< features.length;j++){
		 var pointfeature=features[j];
			var PointType= pointfeature.get("PointType");
			 var Name=pointfeature.get('name');
			 showPointStyle(pointfeature,PointType,Name);
	 }
	map.removeInteraction(translate_single);
	map.removeInteraction(modify);	
	$('#linedirectionChoose').css('display','block');
	$('#editNavLInebtn').css('display','none');
	 $(".blackoverlayer").css("display","block"); 
});
$('.DoubleDirect').click(function(){
	
	changelineDire('双向');
	
	$('#editNavLInebtn').css('display','flex');
	$('#linedirectionChoose').css('display','none');
});
$('.ReverseDirect').click(function(){
	changelineDire('反向');
$('#editNavLInebtn').css('display','flex');
$('#linedirectionChoose').css('display','none');
});
//航线修改中，转向点避免与与本航线其他转向点样式重叠
function AvoidSelfOverlay(oldFeatures,linefeature,modify_coord,index,coor){
	 for(var j = 0; j < oldFeatures.length; j++){//平移后的点，不能与本航线上的其他转向点的样式重叠
		 var oldFeature=oldFeatures[j];
		 var oldcoor=oldFeature.getGeometry().getCoordinates(); 
		 var  oldPixel= map.getPixelFromCoordinate(oldcoor);//靠近点
		 var  newPixel= map.getPixelFromCoordinate(coor);//移动点
	      var dis= pixelDis(coor,oldFeature);
	      if(dis<9){//当同一个航线上两个样式重叠时分开。
	    var px=oldPixel[0]-9*(oldPixel[0]- newPixel[0])/dis;
	    var	py=oldPixel[1]-9*(oldPixel[1]- newPixel[1])/dis;
	    coor=map.getCoordinateFromPixel([px,py]);
	    modify_coord.splice(index,1,coor);
	    linefeature.setGeometry(new ol.geom.LineString(modify_coord));
	    	  break;
	      }
	 }
	return coor;
}
//航线变向处理
function changelineDire(dir){
	var lineid=$('#NavLineID').val();
	var linefeature=eval("NavlineSource").getFeatureById(lineid);
	var coordinate= linefeature.getGeometry().getCoordinates();
	linefeature.set("Direction",dir);
	if(dir=='反向'){
		var reverseCoor=coordinate.reverse();
		linefeature.setGeometry(new ol.geom.LineString(reverseCoor));
		linefeature.setStyle(navLineStyle(linefeature));
		for(var j = 1; j <reverseCoor.length-1; j++){//不包含起始转向点，和终止转向点
			var pfeature=eval("editNavPointSource").getClosestFeatureToCoordinate(reverseCoor[j]);
			 var extent= pfeature.getGeometry().getExtent();
			 var Name=pfeature.get('name');
			 var Pointstyle=pfeature.get('PointType');
			 var total=0;
			 var first=0;
			 var end=0;
			 var sum=0;
				eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {
					 var dir = feature.get("Direction");
					 if(dir=="双向"){
						 var coord=feature.getGeometry().getCoordinates();
						 if(reverseCoor[j][0]==coord[0][0]&&reverseCoor[j][1]==coord[0][1]){
							 first++; 
						 }
                          if(reverseCoor[j][0]==coord[coord.length-1][0]&&reverseCoor[j][1]==coord[coord.length-1][1]){
                        	  end++; 
						 }
						 total++;
					 }
					 sum++;
				        });
				if( total==0){//转向点上航线中，没有双向航线
					if(sum==1){//转向点上只有条航线
						showPointStyle(pfeature,Pointstyle,Name);
//						 pfeature.setStyle(PointStyle(Name));
//						 pfeature.set('PointType',2);
					}else{//转向点上有多条航线
						pfeature.setStyle(ImportantPointStyle(Name));
						 pfeature.set('PointType',1);
					}
					
				}else{//有双向航线的情况
				if(first==total){//双向航线拥有共同的起始点情况
					pfeature.setStyle(DoubelEndStyle(Name));
					 pfeature.set('PointType',5);
				}else
				if(end==total){//双向航线拥有相同的终止点情况
					pfeature.setStyle(DoubelEndStyle(Name));
					 pfeature.set('PointType',5);
				}else{
					 pfeature.setStyle(ImportantPointStyle(Name));
			    	 pfeature.set('PointType',1);	
				}
				}
				}
		var PointArray= linefeature.get("PointArray");
		var  array = PointArray.split(","); 
		array=array.splice(0,array.length-1);
		var reverseArray= array.reverse();
		var pointArray=reverseArray.toString()+',';
		linefeature.set("PointArray",pointArray);
		 EndsStyle(reverseCoor,linefeature);
			$('#choosetype').val(1);
	}else if(dir=='双向'){
		for(var j = 0; j < coordinate.length; j++){
	var pfeature=eval("editNavPointSource").getClosestFeatureToCoordinate(coordinate[j]);
	 var count=pfeature.get('Status');
	 var Name=pfeature.get('name');
	    if(count!=1){
	    	 pfeature.setStyle(ImportantPointStyle(Name));
	    	 pfeature.set('PointType',1);
	    }
		}
	
		 EndsStyle(coordinate,linefeature);
		linefeature.setStyle(navLineStyle(linefeature));
		$('#choosetype').val(1);
	}

	 $(".blackoverlayer").css("display","none"); 
}
//删除航线按钮，操作
$('.yesDeleteLine').click(function(){
if(selectLineID!=""){
	LockOtherFeatures();
//	DeleteLineBt(selectLineID);
	StartEditLine(selectLineID)
	$('#editNavLine').hide();
	 deleteEditedLine(selectLineID);
	 SaveDeletedLine(selectLineID);
	$('#editlinebtn_results').text('更新中...');
	selectLineID="";
	unlockFeatures();
		$('#deleteNavline').css('display','none');
		 $(".blackoverlayer").css("display","none"); 
}else{
	$('#editlinebtn_results').text('请选择航线');
}


})
//删除的航线保存到数据库中
function  SaveDeletedLine(lineid){
	var linefeature=eval("NavlineSource").getFeatureById(lineid);
	var direction=linefeature.get('Direction');
	var PointArray=linefeature.get('PointArray');
	var deletePoints=[];
	//删除ID点的情况有：需改中删除点（坐标没变，隐藏样式）
	//单纯删除，status为1的删除（坐标没变，隐藏样式）
	//平移中，合并点，status为1的删除（坐标变，隐藏样式）
	 var tmpfeatures=eval("tmpNavlineSource").getFeatures();
	 for(var i=0;i< tmpfeatures.length;i++){//解决，避免合并转向点，意外跳出
		 var tmpfea=tmpfeatures[i];
		 var id=tmpfea.getId();
		 if(id!=null){
			 	eval("NavPointSource").addFeature(tmpfea);  
		 }
		 
	 }
	 eval("tmpNavlineSource").clear(true); 
	var  array = PointArray.split(","); 
	for(var j=0;j< array.length-1;j++){
		 var pointfeature=eval("NavPointSource").getFeatureById(array[j]);
		 if(pointfeature!=null){
		var count=pointfeature.get("Status");
		var coord= pointfeature.getGeometry().getCoordinates();;
		var lanlon=ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');//
		var PointType=pointfeature.get("PointType");
		var basetype=pointfeature.get("BaseType");
		var name=pointfeature.get("name");
		var attr_D=pointfeature.get("attr_D");
       if(basetype=="1"){//这个点要删除，之前没有删除，是因为编辑取消时，恢复使用
     	   eval("NavPointSource").removeFeature(pointfeature);   
        }else{
  
        		pointfeature.set("attr_D",attr_D);	
				pointfeature.set("RestoreStatus",count);
				pointfeature.set("RestoreType", PointType);
				pointfeature.set("lat",lanlon[1]);
				pointfeature.set("lon",lanlon[0] );
				pointfeature.set("BaseType","5");
        }
		var arr={
				"Name":name,
				"Leg": '',
				"FeatureClass":"N04",
				"SmallClass":"N0401",
				"Region": "南京",
				"BaseType": basetype,//为0为创建转向点，1删除转向点，2平移转向点，3更新转向点，5没有移动转向点，6增加转向点的status
				"PointType":PointType,//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
				"PointID":array[j],
				 "LineID":lineid,
				"Creator": UserName,
				"Status":count,
				"Remark":'',
				"describe":"",//
				"Attribution_A":cusAttrA,
				"Attribution_B":cusAttrB,
				"Attribution_C":PointType,
				"Attribution_D":attr_D,
				"Attribution_E":cusAttrE,
				"Attribution_F":cusAttrF,
				"Attribution_G":cusAttrG,
				"Attribution_H":cusAttrH,
				"Attribution_I":cusAttrI,
				"Attribution_J":cusAttrJ,
				"Latitude":lanlon[1],
				"Longitude":lanlon[0]
			}
//		}
		deletePoints.push(arr);
	}
	}
	deleteLine(deletePoints,lineid);
	eval("NavlineSource").removeFeature(linefeature);
	eval("editNavPointSource").clear(true);
}
//删除整条航线
function deleteEditedLine(lineid){
	var linefeature=eval("NavlineSource").getFeatureById(lineid);
	var coordinates=linefeature.getGeometry().getCoordinates();
	 var Name=linefeature.get('name');
	 linefeature.setStyle(removeShadow());//线隐藏	
		 for(var j=0;j< coordinates.length;j++){
			 var pointfeature=eval("editNavPointSource").getClosestFeatureToCoordinate(coordinates[j]);
			 var id= pointfeature.getId();
			 var status=pointfeature.get("Status");
			 if(id!=null){//在这之前操作过程产生的点没有ID，所以直接清除掉
				 //ID点包括合并后的点，
				 var oldFeatures= eval("editNavPointSource").getFeatures();
				  deletePointStyle(pointfeature,id,status,linefeature,oldFeatures);
			 }
		 }
}
//编辑航线时，不能进行其他航线和转向点编辑
function  LockOtherFeatures(){
	var pointfeatures=eval("NavPointSource").getFeatures();
	
	for (var i = 0; i <  pointfeatures.length; i++) {
		var pointfeature=pointfeatures[i];
		   pointfeature.set("SmallClass","orginalNavPoint");  
	};
	var linefeatures=eval("NavlineSource").getFeatures();
	
	for (var i = 0; i <  linefeatures.length; i++) {
		var linefeature=linefeatures[i];
		linefeature.set("SmallClass","orginalNavline");  
	};
	
}
//航线编辑结束，恢复点击航线编辑功能,能够选中
function unlockFeatures(){
	var pointfeatures=eval("NavPointSource").getFeatures();
	for (var i = 0; i <  pointfeatures.length; i++) {
		var pointfeature=pointfeatures[i];
		pointfeature.set("BaseType","5");
		pointfeature.set("SmallClass","N0401");	//选中 
	};
	var linefeatures=eval("NavlineSource").getFeatures();
	for (var i = 0; i <  linefeatures.length; i++) {
		var linefeature=linefeatures[i];
		    linefeature.set("SmallClass","NavLine");
	};	
	 lockSelectLine=true;
}
//开始编辑航线线处理
function StartEditLine(lineID){
	var linefeature=eval("NavlineSource").getFeatureById(lineID);
	 var  Linename= linefeature.get("name");
		var depth=linefeature.get("Depth");
		 var rank= linefeature.get("Rank");
		   var width= linefeature.get("Width");
		   var height= linefeature.get("Height");
		   var rule= linefeature.get("Rule");
		var PointArray=linefeature.get("PointArray");
		$('#editNavLine_name').val(Linename);
		$('#editPointArray').val(PointArray);
		$('#NavLineID').val(lineID);
		$('#editNavLine_type').val(rank);
		$('#editLine_width').val(width);
		$('#editLine_depth').val(depth);
		$('#editLine_height').val(height);
		$('#editLine_rule').val(rule);
		$('#editline_results').text('');
		$('#line_creatorId').val(UserName);
	$('#editNavLine').show();
	$('#choosetype').val(0);
			linefeature.setStyle(navLightLineStyle(Linename));
			var PointArray=linefeature.get("PointArray");
			 var  array = PointArray.split(","); 
			for (var j = 0; j <array.length-1; j++) {
				 var pointfeature=eval("NavPointSource").getFeatureById(array[j]);
				 if(pointfeature!=null){
					 CorrectStatus(pointfeature);//可能操作异常或者，逻辑问题，转向点上航线个数错误，这里检查纠正。
					 eval("editNavPointSource").addFeature(pointfeature);
					   eval("NavPointSource").removeFeature(pointfeature); 
				 }

			}
	eval("tmpNavPointSource").clear(true);
	eval("tmpNavlineSource").clear(true);
	lockSelectLine=false;
	click_n=0;
}
//删除航向上的转向点的样式判断
function DeleteLineBt(selectLineID){
	var deletePoints=[];
	 var linefeature=eval("NavlineSource").getFeatureById(selectLineID);
	 linefeature.setStyle(removeShadow());
	 var direction=linefeature.get("Direction");
var PointArray= linefeature.get("PointArray");	
var  array = PointArray.split(","); 
eval("NavlineSource").removeFeature(linefeature);
for(var j=0;j< array.length-1;j++){
	 var pointfeature=eval("NavPointSource").getFeatureById(array[j]);
	 if(pointfeature!=null){
	var count=pointfeature.get("Status");
	var attr_C=pointfeature.get("attr_C");
	var coord= pointfeature.getGeometry().getCoordinates();;
	var lanlon=ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326');//
	var pointID=pointfeature.getId();
	var PointType=pointfeature.get("PointType");
	var coor=pointfeature.getGeometry().getCoordinates();
	var Name=pointfeature.get('name');
			var extent= pointfeature.getGeometry().getExtent();
			var cr= pointfeature.getGeometry().getCoordinates();
			var startcount=0,endcount=0,dblstartcount=0,dblendcount=0;
			var startBol=false,endBol=false;
			var totalLine=0,doubleLine=0;
				eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {
			  		var coors= feature.getGeometry().getCoordinates();
            		var dir=feature.get("Direction");
            		if(dir=="双向"){
						var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[0]);
						var ff= closestfeature.getGeometry().getCoordinates();
						if((cr[0]==ff[0])&&(cr[1]==ff[1])){//
							dblstartcount++;
							
						}
						var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[coors.length-1]);
						var ff= closestfeature.getGeometry().getCoordinates();
						if((cr[0]==ff[0])&&(cr[1]==ff[1])){
							dblendcount++;
						}
            			doubleLine++;
					}else{
						var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[0]);
						var ff= closestfeature.getGeometry().getCoordinates();
						if((cr[0]==ff[0])&&(cr[1]==ff[1])){//
							startcount++;
							
						}
						var closestfeature= eval("NavPointSource").getClosestFeatureToCoordinate(coors[coors.length-1]);
						var ff= closestfeature.getGeometry().getCoordinates();
						if((cr[0]==ff[0])&&(cr[1]==ff[1])){
							endcount++;
						}	
					}

					totalLine++;
			        });
		    	pointfeature.set("Status",totalLine);
				  if(totalLine==0){//说明，删除的点上没有线，就就删除
					  pointfeature.setStyle(removeShadow());
					  eval("NavPointSource").removeFeature( pointfeature);
				  }else if(doubleLine==0){//没有双向航线
				    	if(totalLine==startcount){//所有单向线有一个共同的起点
				    		pointfeature.setStyle(startPointStyle(Name));
				    		 pointfeature.set('PointType',3);
				    	}else if(totalLine==endcount){//所有单向线有一个共同的终点
				    		pointfeature.setStyle(finishPointStyle(Name));
				    		 pointfeature.set('PointType',4);
				    	}else if(totalLine==1){//只有一条线，既不是起点，也不是终点
				    		pointfeature.setStyle(PointStyle(Name));
				    		 pointfeature.set('PointType',2);
				    	}else{//两个以上线，既不是起点，也不是终点
				    		pointfeature.setStyle(ImportantPointStyle(Name));
				    		 pointfeature.set('PointType',1);
				    	}
				     }else{//有双向航线
				    //双向航线优先于单向航线
			         if((doubleLine==dblstartcount)||(doubleLine==dblendcount)){//所有双向航线有一个共同的起点或终点
			        		pointfeature.setStyle(DoubelEndStyle(Name)); 
			        		 pointfeature.set('PointType',5);
			         }else if(totalLine==1){//只有一条线，既不是起点，也不是终点
				    		pointfeature.setStyle(PointStyle(Name));
				    		 pointfeature.set('PointType',2);
				    	}else{//两个以上线，既不是起点，也不是终点
				    		pointfeature.setStyle(ImportantPointStyle(Name));
				    		 pointfeature.set('PointType',1);
				    	}
				    	 
				    	 
				     }  
  var PointType=pointfeature.get("PointType");
	var arr={
			"Name":  Name,
			"Leg": '',
			"FeatureClass":"N04",
			"SmallClass":"N0401",
			"Region": "南京",
			"BaseType": "0",
			"PointType":PointType,//1重点转向点，2普通转向点，3首转向点,4尾转向点，5双向航线起始点，6危险点
			"PointID":array[j],
			 "LineID":selectLineID,
			"Creator": UserName,
			"Status":Number(totalLine),
			"Remark":'',
			"describe":"",//
			"Attribution_A":cusAttrA,
			"Attribution_B":cusAttrB,
			"Attribution_C":attr_C,
			"Attribution_D":cusAttrD,
			"Attribution_E":cusAttrE,
			"Attribution_F":cusAttrF,
			"Attribution_G":cusAttrG,
			"Attribution_H":cusAttrH,
			"Attribution_I":cusAttrI,
			"Attribution_J":cusAttrJ,
			"Latitude":lanlon[1],
			"Longitude": lanlon[0]
		}
//	}
	deletePoints.push(arr);
	}
}

deleteLine(deletePoints,selectLineID);
}
$('.NoDeleteline').click(function(){
	selectLineID="";
	
	$('#deleteNavline').css('display','none');
	 $(".blackoverlayer").css("display","none"); 
})
$('.yesDeleteLine1').click(function(){
	click_n=0;
	var lineid=$('#NavLineID').val();
	deleteEditedLine(lineid);
	map.removeInteraction(translate_single);
	map.removeInteraction(modify);	

		$('#choosetype').val(2);
		 eval("editNavPointSource").clear(true);
	
	$('#deleteNaline1').css('display','none');
	 $(".blackoverlayer").css("display","none"); 
})
$('.NoDeleteline1').click(function(){
	$('#deleteNaline1').css('display','none');
	 $(".blackoverlayer").css("display","none"); 
})
//删除转向点取消
$('.delete_PointCancel').click(function(){
	 var pointfeature=eval("NavPointSource").getFeatureById(selectPointID);
		if( pointfeature!=null){
			 var Name=pointfeature.get('name');
			 var pointtype=pointfeature.get('PointType');
			 showPointStyle(pointfeature,pointtype,Name);
		}
		selectPointID='';
	$('#delete_Point').css('display','none');
	 $(".blackoverlayer").css("display","none"); 
})
$('.delete_PointOk').click(function(){
	var linefeature=eval("NavlineSource").getFeatureById(selectLineID);	
	var Pointfeature=eval("NavPointSource").getFeatureById(selectPointID);	
    var linecoordinates=linefeature.getGeometry().getCoordinates();  
    var len= linecoordinates.length;
    var count=Pointfeature.get("Status");
    if(len<=2){//当删除的转向点，上的只有一个航线时，这个航线也要删除
    	DeleteLineBt(selectLineID);
    	if(count!=1){
    		var info=[];
    		var arr={

    				"BaseType": "1",//0编辑，1平移，2删除
    			
    				"PointID":selectPointID,
    			
    			}
    		 info.push(arr);
    		editNavPoint(info,selectLineID);
    	}
    
    	$('#editpointbtn_results').text('请等待...');	
    }else{//删除转向点
    	var info=[];
		var arr={

				"BaseType": "1",//0编辑，1平移，2删除
			
				"PointID":selectPointID,
			
			}
		 info.push(arr);
		editNavPoint(info,selectLineID);	
		$('#editpointbtn_results').text('请等待...');	
		selectPointID='';
    }
	
	
	$('#delete_Point').css('display','none');
	 $(".blackoverlayer").css("display","none"); 
})
