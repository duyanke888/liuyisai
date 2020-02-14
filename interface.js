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

//打开航标信息面板
	$("#openNavMarkPanel").click(function() {

		selectwhcdBol=false;
		$('#mousePos').css('bottom','308px');

//		 $('#feature_query').hide();
    	$('#infoContainer').show(); 
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelMark"]').tab('show');
		map.updateSize();
		clearPanel();//清除航线和转向点面板
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
    });
    //打开水位信息面板
	$("#openWaterPanel").click(function() {

		selectwhcdBol=false;
		$('#mousePos').css('bottom','308px');
//		 $('#feature_query').hide();
    	$('#infoContainer').show(); 
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelWater"]').tab('show');
		map.updateSize();
		clearPanel();//清除航线和转向点面板	 
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
    });
    //打开维护尺度信息面板
	var WHCDBol=true;
	$("#openWHCDPanel").click(function() {
		selectwhcdBol=false;
		$('#mousePos').css('bottom','308px');
//		 $('#feature_query').hide();
    	$('#infoContainer').show(); 
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelWHCD"]').tab('show');
		map.updateSize();
		clearPanel();//清除航线和转向点面板	 
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
    });
	//通告是否永久有效选中
	$("#editnoticeforever").click(function() {
		  if( $("#editnoticeforever").is(':checked')){
			  $("#editnotice_time").attr('disabled',true);  
		   }else{
			   $("#editnotice_time").attr('disabled',false);   
		   };
	});
	//显示通告缓冲区。
	$("#showbufferedzone").click(function() {
		    eval("source_N05").clear(true);
			eval("source_N04").clear(true);
			eval("source_N03").clear(true);
		  if( $("#showbufferedzone").is(':checked')){
			  loadNotice(loadeditfeature);
				editBol=true; 
		   }else{
			   editBol=false;
			  editfeature(loadeditfeature);
		   };
	});
	$("#noticeforever").click(function() {
		  if( $("#noticeforever").is(':checked')){
			  $("#notice_time").attr('disabled',true);  
		   }else{
			   $("#notice_time").attr('disabled',false);   
		   };
	});
    //打开航道通告信息面板
	$("#openNoticePanel").click(function() {
//		 WHCDBol=false;
//		 editStatusBol=true;
		 selectwhcdBol=false;
		 noticeEditData=null;
		 $('#mousePos').css('bottom','308px');
//		 $('#feature_query').show();
    	$('#infoContainer').show(); 
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelNotice"]').tab('show');
		map.updateSize();
		clearPanel();//清除航线和转向点面板	 
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
		
    });
    //打开航向点信息面板
	$("#openNavpointPanel").click(function() {
		 $('#mousePos').css('bottom','308px');
    	$('#infoContainer').show(); 
    	clearPanel();
   	 $("#panelNavLine").css('display', 'none'); 
	 $("#panelNavpoint").css('display', 'none'); 
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelNavpoints"]').tab('show');
		map.updateSize();
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
		
    });
    //打开航线信息面板
	$("#openNavLinepanel").click(function() {
		 $("#panelNavpoint").css('display', 'none'); 
		 $("#panelNavLine").css('display', 'block'); 
		 $('#mousePos').css('bottom','308px');
    	$('#infoContainer').show(); 
    	 clearPanel();
		$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
		$('#navTab a[href="#panelNavLine"]').tab('show');
		map.updateSize();
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
		
    });
	$("#warnbar").click(function(){
		selectwhcdBol=false;
//		$('#feature_query').hide();
		$('#mousePos').css('bottom','308px');
		$('#markWarnInfo div table tr:nth-child(2) td:nth-child(2)').text('');
		$('#markWarnInfo div table tr:nth-child(3) td:nth-child(2)').text( '');
		$('#markWarnInfo div table tr:nth-child(1) td:nth-child(2)').text('');
		$('#markWarnInfo div table tr:nth-child(4) td:nth-child(2)').text('');
		$('#markWarnInfo div table tr:nth-child(5) td:nth-child(2)').text('');
		$('#markDetial div table tr:nth-child(2)  td:nth-child(2)').text('');//航标大类
		$('#markDetial div table tr:nth-child(3)  td:nth-child(2)').text('');//航标种类
		$('#markDetial div table tr:nth-child(4)  td:nth-child(2)').text('');//航标形状HBXZ
		$('#markDetial div table tr:nth-child(1)  td:nth-child(2)').text('');
		$('#markDetial div table tr:nth-child(5)  td:nth-child(2)').text('');
		clearPanel();//清除航线和转向点面板	 	
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
	})
	$("#swzdbar").click(function(){
//		$('#feature_query').hide();
		selectwhcdBol=false;
		$('#mousePos').css('bottom','308px');
		$('#date-end').val('');
		$('#date-start').val('');
		$('#swzDetial div table tr:nth-child(1)  td:nth-child(2)').text('');
		$('#swzDetial div table tr:nth-child(2)  td:nth-child(2)').text( '');
		$('#swzDetial div table tr:nth-child(3)  td:nth-child(2)').text('');
		$('#swzDetial div table tr:nth-child(4)  td:nth-child(2)').text('');
		$('#swzDetial div table tr:nth-child(5)  td:nth-child(2)').text('');
		$('#swzDetial div table tr:nth-child(6)  td:nth-child(2)').text('');
		$('#swzHisInfo div table tr:nth-child(1)  td:nth-child(2)').text('');
		$('#swzHisInfo div table tr:nth-child(2)  td:nth-child(2)').text( '');
		$('#swzHisInfo div table tr:nth-child(3)  td:nth-child(2)').text('');
		$('#swzHisInfo div table tr:nth-child(4)  td:nth-child(2)').text('');
		$('#swzHisInfo div table tr:nth-child(5)  td:nth-child(2)').text('');
		clearPanel();//清除航线和转向点面板	 
		try{ selectItemfeature.setStyle(selectold);
		}catch(e){	
		}
	})
//航道尺度栏点击
$("#hdcdbar").click(function () {
//	$('#feature_query').hide();
	$('#mousePos').css('bottom','308px');
	selectwhcdBol=false;
	$('#whhdresultss').text('');
	$('#whcdDetial div table tr:nth-child(1)  td:nth-child(2)').text('');	
	$('#whcdDetial div table tr:nth-child(2)  td:nth-child(2)').text('');	
	$('#whcdDetial div table tr:nth-child(3)  td:nth-child(2)').text('');
	$('#whcdDetial div table tr:nth-child(4)  td:nth-child(2)').text('');
	clearPanel();//清除航线和转向点面板	 	
	try{ 
		selectItemfeature.setStyle(selectold);
	}catch(e){	
	}
})
//航道通告栏点击
$("#hdtgbar").click(function () {
	     selectwhcdBol=false;
	    noticeEditData=null;
	    $('#mousePos').css('bottom','308px');
		$("#outprogress").text('');
		$("#progressEndtime").text('');
		$("#progressStarttime").text('');
	$('#editnoticeaddresults').text('');
//	$('#feature_query').show();
	$('#noticeDetial div table tr:nth-child(1)  td:nth-child(2)').text( '');
	$('#noticeDetial div table tr:nth-child(4)  td:nth-child(2)').text( '');
	$('#noticeinfo div table tr:nth-child(1)  td:nth-child(2)').text('');
	$('#noticeinfo div table tr:nth-child(2)  td:nth-child(2)').text('');
	$('#Noticecontent').val( '');
	$('#Noticeremark').val( '');
	clearPanel();//清除航线和转向点面板	 	
	try{ selectItemfeature.setStyle(selectold);
	}catch(e){	
	}
});
	//地图全高开关
    $("#fullMapBtn").click(function() {
    	$('#infoContainer').hide(); 
    	$('#mapContainer').addClass('fullMapView');
    	$('#mousePos').css('bottom','8px');
		map.updateSize();
    });
    
    //全屏显示
    $("#fullScreenBtn").click(function() {
     	  if (!document.fullscreenElement &&    // alternative standard method
    	      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
    	    if (document.documentElement.requestFullscreen) {
    	      document.documentElement.requestFullscreen();
    	    } else if (document.documentElement.mozRequestFullScreen) {
    	      document.documentElement.mozRequestFullScreen();
    	    } else if (document.documentElement.webkitRequestFullscreen) {
    	      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    	    }
    	  } else {
    	    if (document.cancelFullScreen) {
    	      document.cancelFullScreen();
    	    } else if (document.mozCancelFullScreen) {
    	      document.mozCancelFullScreen();
    	    } else if (document.webkitCancelFullScreen) {
    	      document.webkitCancelFullScreen();
    	    }       
    	  }
    });
    $(document).on ('mozfullscreenchange webkitfullscreenchange fullscreenchange',function() {
    	if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    	    $('#fullScreenIcon').addClass('fa-arrows-alt').removeClass('fa-compress');
    	    $('#fullScreenBtn').attr('data-original-title', '全屏显示');
    	}
    	else {
    	    $('#fullScreenIcon').addClass('fa-compress').removeClass('fa-arrows-alt');
    	    $('#fullScreenBtn').attr('data-original-title','退出全屏');
    	}
    });
    
    var mouseCursor = 'default';
    //WFS查询
    $("#wfsSearchBtn").click(function() {
    	if (click_n==100) {
     	    $('#wfsSearchIcon').addClass('fa-info').removeClass('fa-info-circle');
     	  	$('#wfsSearchBtn').attr('data-original-title', '物标查询');
     	  	click_n=0;
     	  	mouseCursor = 'default';
     	  	$('#mapPanel').css('cursor',mouseCursor); 
     		$("#searchedAllList").hide();
     		$("#searchedAllList").empty();
     		wfsSource.clear(true);
    	} else {
    		$('#wfsSearchIcon').addClass('fa-info-circle').removeClass('fa-info');
      	    $('#wfsSearchBtn').attr('data-original-title','退出物标查询');
      	    click_n=100;
      	    mouseCursor = 'crosshair';
      	    $('#mapPanel').css('cursor',mouseCursor);
    	}
    });
	$('#searchAllText').bind('keypress',function(event){
        if(event.keyCode == "13")    
        {
        	getWFSByName();
        }
    });
       
    //编辑要素按钮响应 
	var editStatusBol=false;
	//航道通告几何图形编辑结束
	$('#end_edit_button').click(function(){	
		 pickstatus=true;
		 editConvertBol=84;
		 var lon=$('#经1').val();
		 if(Number(lon)>180){
				$('#editConvertTo54').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
				$('#editConvertTo84').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					$('#editConvertTo54').attr('disabled', 'disabled');
						$('#editConvertTo84').removeAttr('disabled');
							$('#editswift54').show();
						   $('#editswift84').hide(); 
		 }else{
			 $('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
				$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
				$('#editConvertTo84').attr('disabled', 'disabled');	
				$('#editConvertTo54').removeAttr('disabled');
				$('#editswift84').show();
				$('#editswift54').hide(); 
		 }
			
		 $(".blackoverlayer").css("display","block"); 
		 $('#edit_btns').css('display','none');
		$('#editHDTG').show();
		selectClick.getFeatures().clear();		
	})
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

	//创建通告
	$('#createEditBtn').click(function(){
		$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
		$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
		$('#ConvertTo84').attr('disabled', 'disabled');
		$('#ConvertTo54').removeAttr('disabled');
		$('#swift84').show();
		$('#swift54').hide();
		$(".blackoverlayer").css("display","block"); 
		var table=$('#NoticePoint>.table');
		 addnoticenum=1;
		 addnoticeID=1;
		 $('#noticeforever').attr('checked',false);
		table.empty();
		table.append("<tr><td>点</td><td>经度</td><td>纬度</td></tr>");
		if( noticeBasetype==0){
			addTr1();	
		}else if( noticeBasetype==1){
			addTr1();
			addTr1();
		}else if( noticeBasetype==2){
			addTr1();
			addTr1();
			addTr1();
		}
		
		$("#add_results").text('');
		$('#Notice_creatorid').val(UserName);
		$("#addFeature").css("display","block"); 
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
	//地图上的鼠标事件响应
	    //鼠标指向选择物标事件监听
    var select = null;  
    var selectPointerMove = new ol.interaction.Select({
      condition: ol.events.condition.pointerMove
    });
    select = selectPointerMove;
    if (select !== null) {
        map.addInteraction(select);
        select.on('select', function(e) {  
     
          	 var status=$('#choosetype').val();
          	 if(status!=10){//没有创建航线时，情况
	    	        	
	    		      
        	if(e.deselected.length>0) {
        		map.getTargetElement().style.cursor = mouseCursor;
        		$(popupElement).popover('dispose');  

        	}
        	if(e.selected.length>0) {
        		map.getTargetElement().style.cursor = 'pointer';
        		var hoverFeature = e.selected[0];
        		var type = hoverFeature.get('type'); 
        		var coords=e.mapBrowserEvent.coordinate;
        	
        	    	popupLayer.setPosition(coords); //鼠标位置
        	 
	      	
	      		var featureName = (hoverFeature.get('name'))?hoverFeature.get('name'):'名称未知';
	      		var lighttype=hoverFeature.get('lightType');//name,PointTypeattr_C 
	      		if(lighttype!=undefined){
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
	 	                'content': "<table style='background-color:white;z-index: 10;padding:8px;'><tr><td><div style='z-index: 10;padding-left:8px;align:center;'>"+featureName+"</div></td></tr>" +
	 	                		"<tr><td><div style=';z-index: 10;padding-left:8px;align:center;'>"+lighttype+"</div></td></tr></table>"
	 	              });
	      		}else{
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
	                'content': "<table style='max-width:100%;background-color:white;z-index: 10;'><tr><td><div style='padding:8px;z-index: 10;'><p>"+featureName+"</p></div></td></tr></table>"
	              });
	            }    		
        	}
            if(editStatusBol){
	        	 $(popupElement).popover('hide');
	         }else{
	        	 $(popupElement).popover('show'); 
	         }            
            }
          
        });
    }
		
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
    	$(popupElement).popover('dispose');
    	if(e.deselected.length>0) {     
//		           撤销选中物标的处理
    		if(WHCDBol){
    			 bufferedSource.clear();
    			 try{ selectItemfeature.setStyle(featureHighLightStyle);
    				}catch(e){	
    				}
    				
    		}else if(!pickstatus){
				if(clicked_feature!=null){
					clicked_feature.setStyle(styleold);
					clicked_feature=null;
					styleold=null;
				}
			}else{
    			 bufferedSource.clear();
    			if(clicked_feature!=null){
    				clicked_feature.setStyle(styleold);
    				clicked_feature=null;
    				styleold=null;
    			}	
    		}
    		
			
    	}
		if(e.selected.length>0)  {//选中特征
			clicked_feature = e.selected[0]; //取选中的第一个  
			var basetype=clicked_feature.getProperties().BaseType;
				var smallClass=clicked_feature.get('SmallClass');
			var  ID=clicked_feature.getId();
			styleold=clicked_feature.getStyle();
			if(smallClass=='N0301'){//通告表单
				if(pickstatus){
				$('#progressBar').css("background-color",'green');
				$('#outprogress').text('');
				$('#innerprogress').text('');
				var Isvalid=clicked_feature.get('Isvalid');
				var starttime=clicked_feature.get('Starttime').time;
				var endtime=clicked_feature.get('Endtime').time;
				var  days = Number( endtime) -Number( starttime);
				var  day = parseInt(days / (1000 * 60 * 60 * 24));
				$('#progressBar>div').attr('aria-valuemax',day);
				var daynow=new Date().getTime()-Number(starttime);
				daynow=parseInt(daynow / (1000 * 60 * 60 * 24));
				$('#progressBar>div').attr('aria-valuenow',daynow);
				var time=getDate1(starttime);
				if(time.length==17){
					time=time.substring(0,9);
				}else{
					time=time.substring(0,10);
				}
				if(daynow>day){
					$('#progressBar>div').css('width',0+'%');
					$('#outprogress').text('已过期');
					$('#progressBar').css("background-color",'red');
					$("#progressEndtime").text('已过期');
					$('#progressStarttime').text(time);
					$('#editnotice_time').val(day);
				}else
				if(Isvalid==2){
					$('#progressBar>div').css('width',0+'%');
					$('#Notice_pane_stop').text('恢复');
					$('#outprogress').text('已暂停');
					$("#progressEndtime").text('');
					$("#progressStarttime").text('');
					$('#editnotice_time').val(day);
					stopbol=false;
				}else
				if(endtime=='2117/1/1 '){
					$('#outprogress').text('永久有效');
					$('#progressBar>div').css('width',0+'%');
					$("#progressEndtime").text('永久有效');
					$('#progressStarttime').text(time);
					$('#editnotice_time').val('');
					$('#editnoticeforever').attr('checked',true);
				}else{
					if(daynow/day>0.8){
						$('#innerprogress').text('剩余'+( day -daynow)+"天");
					}else{
						$('#outprogress').text('剩余'+( day -daynow)+"天");
					}
					$('#progressStarttime').text(time);
					$('#progressEndtime').text(endtime);
					$('#progressBar>div').css('width',daynow/day*100+'%');
					$('#editnotice_time').val(day);
			}
				$('#editNotice_Starttime').val(time);
				var circus=	clicked_feature.get('Circus');
				$('#edit_Circus').val(circus/1000);
				$('#noticeinfo div table tr:nth-child(2)  td:nth-child(2)').text(circus/1000+" 公里");
				var text=clicked_feature.get('text');
				$('#editNotice_content').val(text);
				$('#Noticecontent').val(text);
				var remark=clicked_feature.get('Remark');
				$('#editNotice_remark').val(remark);
				$('#Noticeremark').val(remark);
				$('#addresults').text('');
				var name=clicked_feature.get("name");
				$('#editNotice_name').val(name);
				$('#noticeDetial div table tr:nth-child(1)  td:nth-child(2)').text(name);
				$('#editNotice_editor').val( UserName);
				$('#noticeDetial div table tr:nth-child(4)  td:nth-child(2)').text(UserName);
				$('#noticeinfo div table tr:nth-child(1)  td:nth-child(2)').text(basetype);
					// if(editStatusBol){
				$("#editnotice_time").attr('disabled',false);
				cancelDeletestyle =styleold;
				clicked_feature.setStyle(featureHighLightStyle);
				if($("#showbufferedzone").is(':checked')){
					eval("source_N05").clear(true);
					eval("source_N04").clear(true);
					eval("source_N03").clear(true);
					editfeature(loadeditfeature);
				}
				selectedFeatureID=NoticeID[0]=clicked_feature.getId();
//							$('#feature_query').hide();
							editBol=true;
							$('#editHDTG').show();
							 $(".blackoverlayer").css("display","block");
							NoticeID[1]=clicked_feature.get("feature_id");
							 var leg=clicked_feature.get("Leg");
							$('#editnoticeHD').val(leg);
							editConvertBol=84;
							$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
							$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					        $('#editConvertTo84').attr('disabled', 'disabled');	
							$('#editConvertTo54').removeAttr('disabled');
							$('#editswift84').show();
							$('#editswift54').hide();
							if(basetype=='点'){
								NoticeID[2]=0;
								var coordinates	=noticeObj[ID].geometry.coordinates;
								createPointlist1([coordinates]);
								NoticeEditBol=false;
								$('#editpiking').text('屏幕点编辑');
								// $('#noticeinfo div table tr:nth-child(1)  td:nth-child(2)').text('点');
							}else if(basetype=='线'){
								NoticeID[2]=1;
								var coordinates	=noticeObj[ID].geometry.coordinates;
								createPointlist1(coordinates);
								NoticeEditBol=false;
								$('#editpiking').text('屏幕线编辑');
								// $('#noticeinfo div table tr:nth-child(1)  td:nth-child(2)').text('线');
							}else if(basetype=='面'){
								NoticeID[2]=2;
								var coordinates	=noticeObj[ID].geometry.coordinates;
								createPointlist1(coordinates.splice(0,coordinates.length-1));
								NoticeEditBol=false;
								$('#editpiking').text('屏幕面编辑');
								// $('#noticeinfo div table tr:nth-child(1)  td:nth-child(2)').text('面');
							}

					// }

				//打开通告
				WHCDBol=false;
				editStatusBol=true;
				selectwhcdBol=false;
				noticeEditData=null;
				$('#mousePos').css('bottom','308px');
//				$('#feature_query').show();
				$('#infoContainer').show();
				$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
				$('#navTab a[href="#panelNotice"]').tab('show');
				map.updateSize();
				try{ selectItemfeature.setStyle(selectold);
				}catch(e){
				}
						}else{
							cancelDeletestyle =styleold;
							clicked_feature.setStyle(featureHighLightStyle);
						}
				}
						 if(smallClass=='N0101'){//航段表单
								var name=clicked_feature. get("name");
//								if(WHCDBol){
									$('#whhdresults').text('');
								chooseleg[1]=name;
								getLatesthdcd(ID);
								selectWHCDlay=eval('source_N01');
								selectItemfeature=selectWHCDlay.getFeatureById(ID);
								selectold=selectItemfeature.getStyle();
							    selectItemfeature.setStyle(featureHighLightStyle);
								$('#WHCD').show();
//								}
					    	    	   var extent =clicked_feature.getGeometry().getExtent();
							    	    var featureBox = new ol.Feature(new ol.geom.Polygon.fromExtent(extent));
							    	    var boxStyle = new ol.style.Style({
											stroke: new ol.style.Stroke({
												  color: 'rgba(0,0,200,0.5)',
												  width: 1
											}),
											fill: new ol.style.Fill({
												color: 'rgba(200,200,200,0.3)'
											})
									    });
							    	    featureBox.setStyle(boxStyle);  
							            featureBox.set('name',name);
							    	    bufferedSource.addFeature(featureBox);
							 WHCDBol=true;
							 editStatusBol=false;
							 selectwhcdBol=false;
							 $('#mousePos').css('bottom','308px');
//							 $('#feature_query').hide();
							 $('#infoContainer').show();
							 $('#mapContainer').addClass('partMapView').removeClass('fullMapView');
							 $('#navTab a[href="#panelWHCD"]').tab('show');
							 map.updateSize();
							 try{ selectItemfeature.setStyle(selectold);
							 }catch(e){
							 }
					    	 
							}
			//水位站
			if(smallClass=='swz'){
				var swz=swzObj[ID];
				$('#swzDetial div table tr:nth-child(1)  td:nth-child(2)').text( swz.SWZMC);
				var time=getDate1(swz.SJ.time);
				if(time.length==17){
					var htmlTxt=time.substring(0,9);
				}else{
					var htmlTxt=time.substring(0,10);
				}
				$('#swzDetial div table tr:nth-child(2)  td:nth-child(2)').text(htmlTxt);
				$('#swzDetial div table tr:nth-child(3)  td:nth-child(2)').text( swz.SW+"  米");
				if(swz.ZRGC==''){
					$('#swzDetial div table tr:nth-child(5)').hide();
					$('#swzDetial div table tr:nth-child(5)  td:nth-child(2)').text( '');
				}else{
					$('#swzDetial div table tr:nth-child(5)').show();
					$('#swzDetial div table tr:nth-child(5)  td:nth-child(2)').text( swz.ZRGC.trim()+"  米");	
				}

				$('#swzDetial div table tr:nth-child(3)  td:nth-child(2)').text( swz.SW+"  米");
				   if( swz.ZRGCSJ==''){
			     	  $('#swzDetial div table tr:nth-child(4)').hide();
			     	  $('#swzDetial div table tr:nth-child(4)  td:nth-child(2)').text(''); 
			       }else{
			     	  $('#swzDetial div table tr:nth-child(4)').show();
			     		$('#swzDetial div table tr:nth-child(4)  td:nth-child(2)').text( swz.ZRGCSJ);  
			       }
					 if( swz.ZRDCSJ==''){
						 $('#swzDetial div table tr:nth-child(6)').hide();
						 $('#swzDetial div table tr:nth-child(6)  td:nth-child(2)').text('');  
					 }else{
						 $('#swzDetial div table tr:nth-child(6)').show();
						 $('#swzDetial div table tr:nth-child(6)  td:nth-child(2)').text( swz.ZRDCSJ); 
					 }
				if(swz.ZRDC==''){
					$('#swzHisInfo div table tr:nth-child(1)').hide();
					$('#swzHisInfo div table tr:nth-child(1)  td:nth-child(2)').text('');
				}else{
					$('#swzHisInfo div table tr:nth-child(1)').show();
					$('#swzHisInfo div table tr:nth-child(1)  td:nth-child(2)').text(swz.ZRDC.trim()+"  米");
				}
				//ssss
				if(swz.ZRGCSJ1==''){
					$('#swzHisInfo div table tr:nth-child(3)').hide();
					$('#swzHisInfo div table tr:nth-child(3)  td:nth-child(2)').text('');
				}else{
					$('#swzHisInfo div table tr:nth-child(3)').show();
					$('#swzHisInfo div table tr:nth-child(3)  td:nth-child(2)').text(swz.ZRGCSJ1.trim()+"  米");
				}
				if(swz.ZRGC1==''){
					$('#swzHisInfo div table tr:nth-child(2)').hide();
					$('#swzHisInfo div table tr:nth-child(2)  td:nth-child(2)').text('');
				}else{
					$('#swzHisInfo div table tr:nth-child(2)').show();
					$('#swzHisInfo div table tr:nth-child(2)  td:nth-child(2)').text(swz.ZRGC1.trim());
				}
				if(swz.LL_F==''){
					$('#swzHisInfo div table tr:nth-child(4)').hide();
					$('#swzHisInfo div table tr:nth-child(4)  td:nth-child(2)').text('');
				}else{
					$('#swzHisInfo div table tr:nth-child(4)').show();
					$('#swzHisInfo div table tr:nth-child(4)  td:nth-child(2)').text(swz.LL_F.trim());
				}
				if(swz.LL_S==''){
					$('#swzHisInfo div table tr:nth-child(5)').hide();
					$('#swzHisInfo div table tr:nth-child(5)  td:nth-child(2)').text('');
				}else{
					$('#swzHisInfo div table tr:nth-child(5)').show();
					$('#swzHisInfo div table tr:nth-child(5)  td:nth-child(2)').text(swz.LL_S.trim()+"  米");
				}
				
				//打开水位信息面板
				WHCDBol=false;
				selectwhcdBol=false;
				$('#mousePos').css('bottom','308px');
				editStatusBol=false;
//				$('#feature_query').hide();
				$('#infoContainer').show();
				$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
				$('#navTab a[href="#panelWater"]').tab('show');
				map.updateSize();
				try{ selectItemfeature.setStyle(selectold);
				}catch(e){
				}
			}

			//转向点文本编辑
			if(smallClass=='N0401'){
				var coordinate=clicked_feature.getGeometry().getCoordinates();
					var pointName=clicked_feature.get("name");
					var pointID=clicked_feature.getId();
					var type=clicked_feature.get("PointType");//转向点类别
					var Describe=clicked_feature.get("Describe");
					var count=clicked_feature.get("Status");
					PointCategory(type);
			var out = ol.proj.transform(coordinate,'EPSG:3857','EPSG:4326');
				$('#editNavPointName').val(pointName);
				$('#editpoint_rule').val(Describe);//航行规则信息
				$('#editNavPointID').val(pointID);
				$('#editLineCount').val( count);
				$('#eidtPointtype').val(type);
			  $('#editNavPointLon').val(out[0]);
			   $('#editNavPointLat').val(out[1]); 
			    $('#editNavPoint_btn_').show();	
			
			}
			//选航线编辑
			if(smallClass=='NavLine'){
				 $(popupElement).popover('hide');
             var lineID=clicked_feature.getId();
				LockOtherFeatures();
				StartEditLine(lineID);	
				if(selectLineID.length>2&&selectLineID!=lineID){
					var linefeatures=eval("NavlineSource").getFeatureById(selectLineID);
					 linefeatures.setStyle(navLineStyle( linefeatures));
					 selectLineID='';
				}
			}

			//航标警报
			if(smallClass=='markwarn'){
				getNavMarkByID(ID);
				var warn=markWarnObj[ID];
				$('#markDetial div table tr:nth-child(1)  td:nth-child(2)').text(warn.HBMC);
				var lighttype=clicked_feature.get('lightType');
				$('#markDetial div table tr:nth-child(5)  td:nth-child(2)').text( lighttype);
				if(warn.BJDJ==1){
					var bjdj="一级报警";
				}else if(warn.BJDJ==2){
					var bjdj="二级报警";
				}else if(warn.BJDJ==3){
					var bjdj="三级报警";
				};
				$('#markWarnInfo div table tr:nth-child(1) td:nth-child(2)').text(bjdj);
				var zt=(warn.QRZT==1)?"已确认":"未确认";
				$('#markWarnInfo div table tr:nth-child(2) td:nth-child(2)').text(zt);
				$('#markWarnInfo div table tr:nth-child(3) td:nth-child(2)').text( warn.BJYY);
				var time=getDate1(warn.BJSJ.time);
				if(time.length==17){
					var htmlTxt=time.substring(0,9);
				}else{
					var htmlTxt=time.substring(0,10);
				}
				$('#markWarnInfo div table tr:nth-child(4) td:nth-child(2)').text(htmlTxt);
				var time=getDate1(warn.BJQRSJ.time);
				if(time.length==17){
					var htmlTxt=time.substring(0,9);
				}else{
					var htmlTxt=time.substring(0,10);
				}
				$('#markWarnInfo div table tr:nth-child(5) td:nth-child(2)').text(htmlTxt);
				////打开航标信息面板
				WHCDBol=false;
				selectwhcdBol=false;
				$('#mousePos').css('bottom','308px');
				editStatusBol=false;
//				$('#feature_query').hide();
				$('#infoContainer').show();
				$('#mapContainer').addClass('partMapView').removeClass('fullMapView');
				$('#navTab a[href="#panelMark"]').tab('show');
				map.updateSize();
				try{ selectItemfeature.setStyle(selectold);
				}catch(e){
				}
			}
		}
	});
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
	//保存添加的航道通告
	$("#add_ok").click(function(){	
		remove_interaction();
		var center=$('#center').val()*3;
		var noticename=$('#Notice_name').val();
		var starttime=$('#Notice_Starttime').val();
		var validTime=$('#notice_time').val();
		
		var creator=$('#Notice_creatorid').val();
		var noticetext=$('#Notice_content').val();
		var circus=$('#Feature_Circus').val()*1000;
		var noticeremark=$('#Notice_remark').val();
		var coordinates=[];
		if(ConvertBol==84){
			 for(i=1;i<addnoticenum;i++){
					var lon = $('#1经'+i).val();
					var lat = $('#1纬'+i).val();
					if(lon==''||lat==''){}else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{

						coordinates.push(Number(lon));
						coordinates.push(Number(lat));
					}}
		}else{
			 for(i=1;i<addnoticenum;i++){
					var lon = $('#1经'+i).val();
					var lat = $('#1纬'+i).val();
					if(lon==''||lat==''){}else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{

						coordinates.push(lon);
						coordinates.push(lat);
					}	
		}
		

		}
        if(starttime.length<=1){
			$('#add_results').text('输入开始时间 !');
			return;
		}
        if($('#Notice_name').val() == ''){
			$('#add_results').text('请输入通告名称 !');
			return;
		}
   
       if(circus==""){
        	$('#add_results').text('请输入缓冲半径!');
        	return;
        }
        else{
        	var datainfo=[];
        	
	  if( $("#noticeforever").is(':checked')){
		  var endtime="2117/1/1";
		  var isvalid=1;  
	   }else{
		   if(validTime.length<=0||isNaN(validTime)){
       		$('#add_results').text('请输入有效期');
       		return;
       	}
   		var timestamp2 = Date.parse(new Date(starttime));
   		var time=getDate1(timestamp2+Number(validTime)*1000 * 60 * 60 * 24);
   	    if(time.length==17){
   	    	var endtime=time.substring(0,9); 
   	    }else{
   	    	var endtime=time.substring(0,10); 
   	    }
		   var isvalid=1;   
	   };
	
        	if(noticeBasetype==2){//面要素	
        		if(coordinates.length<6){
					var datainfo=[];
					var arr={
						"Name": noticename,
						"Leg": '',
						"FeatureClass":"N03",
						"SmallClass":"N0301",
						"Region": "南京",
						"BaseType": "2",
						"center":center,
					    "convertBOL":ConvertBol,
						"Status": 2,
						"Creator":   UserName,
						"Remark": noticeremark,
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
						"Coords":[119.8066,32.3486,119.8684,32.2534,119.1826,32.1826]
					}
					datainfo.push(arr);
					 $("#circularaddnotice").css('display', 'block'); 
				     $("#add_ok").attr('disabled', 'disabled');
				     $('#add_ok >div:nth-child(1)').hide();
				     
					importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		}else{
        			
        		
 				var arr={
 						"Name":noticename,
						"Leg":'',
						"FeatureClass":"N03",
						"SmallClass":"N0301",
						"Region": "南京",
						"Status": 1,
						"BaseType": "2",
						"center":center,
					    "convertBOL":ConvertBol,
						"Creator":  UserName,
			
						"Remark":noticeremark,
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
 	 					"Coords": coordinates
 	 					}	
 				datainfo.push(arr);
 				 $("#circularaddnotice").css('display', 'block'); 
			     $("#add_ok").attr('disabled', 'disabled');
			     $('#add_ok >div:nth-child(1)').hide();
			     importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		}
        	}
        	else if(noticeBasetype==1){//线要素
        		if(coordinates.length<4){//没有几何形状
					var datainfo=[];
					var arr={
						"Name": noticename,
						"Leg": '',
						"FeatureClass":"N03",
						"SmallClass":"N0301",
						"Region": "南京",
						"BaseType": "1",
						"center":center,
					    "convertBOL":ConvertBol,
						"Creator":   UserName,
						"Status": 2,
						"Remark": noticeremark,
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
						"Coords":[119.8066,32.3486,119.8684,32.2534,119.1826,32.1826]
					}
					datainfo.push(arr);
					 $("#circularaddnotice").css('display', 'block'); 
				     $("#add_ok").attr('disabled', 'disabled');
				     $('#add_ok >div:nth-child(1)').hide();
					importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		}else{
				 var datainfo=[];
				 var arr={
						    "Name": noticename,
							"Leg":'',
							"FeatureClass":"N03",
							"SmallClass":"N0301",
							"Status": 1,
							"Region": "南京",
							"BaseType": "1",
							"center":center,
						    "convertBOL":ConvertBol,
							"Creator":  UserName,
							"Remark": noticeremark,
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
							"Coords": coordinates
							}	
				  datainfo.push(arr);
				 $("#circularaddnotice").css('display', 'block'); 
			     $("#add_ok").attr('disabled', 'disabled');
			     $('#add_ok >div:nth-child(1)').hide();
				  importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		}
			
        	}else{//点要素

        		if(coordinates.length==2){

    			     var datainfo=[];
    			     var arr={
    							"Name": noticename,
    							"Leg": '',
    							"FeatureClass":"N03",
    							"SmallClass":"N0301",
    							"Region": "南京",
    							"BaseType": "0",
						         "Status": 1,
						     	"center":center,
							    "convertBOL":ConvertBol,
    							"Creator":   UserName,
    							"Remark": noticeremark,
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
    							"Lantitude": coordinates[1],
    							"Longitude": coordinates[0]
    							}	
    			     datainfo.push(arr);
    			     $("#circularaddnotice").css('display', 'block'); 
				     $("#add_ok").attr('disabled', 'disabled');
				     $('#add_ok >div:nth-child(1)').hide();
    			   importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		}else{
					var datainfo=[];
					var arr={
						"Name": noticename,
						"Leg": '',
						"FeatureClass":"N03",
						"SmallClass":"N0301",
						"Region": "南京",
						"BaseType": "0",
						"Status": 2,
						"center":center,
					    "convertBOL":ConvertBol,
						"Creator":   UserName,
						"Remark": noticeremark,
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
						"Lantitude":119.7283,
						"Longitude": 32.3173
					}
					datainfo.push(arr);
					 $("#circularaddnotice").css('display', 'block'); 
				     $("#add_ok").attr('disabled', 'disabled');
				     $('#add_ok >div:nth-child(1)').hide();
					importNoticefeature(datainfo,starttime,endtime,noticetext,UserName,noticeremark,noticeBasetype,circus,isvalid,noticename);
        		} 
        	}
        }

    });
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
	var polygoncoords=[];
	function draw_polygon(){
//		delete_before_draw();
	    draw = new ol.interaction.Draw({
	        source: sour,
	        type: /** @type {ol.geom.GeometryType} */ ('Polygon'),		 
	    });
	    map.addInteraction(draw);
		draw.on('drawend', function(evt) {
	            // set sketch
				old_sour = sour;
				old_polygon = evt.feature;
				coordinates= evt.feature.getGeometry().getCoordinates();
				var pcoordinates=coordinates[0];
				polygoncoords=[];
				for(var i=0;i<pcoordinates.length;i++){
					var lanlon=ol.proj.transform(pcoordinates[i], 'EPSG:3857', 'EPSG:4326');
					polygoncoords.push(lanlon);
				
				}
				if(NoticeEditBol){
					editConvertBol=84;
					createPointlist1(polygoncoords);
					$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
					$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					$('#editConvertTo84').attr('disabled', 'disabled');
					$('#editConvertTo54').removeAttr('disabled');
					$('#editswift84').show();
					$('#editswift54').hide();
					$('#editHDTG').show();
				}else{
					createPointlist2(polygoncoords);
					$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
					$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
					$('#ConvertTo84').attr('disabled', 'disabled');
					$('#ConvertTo54').removeAttr('disabled');
					$('#swift84').show();
					$('#swift54').hide();
					ConvertBol=84;
					$("#addFeature").show();
				}

				 $(".blackoverlayer").css("display","block"); 
			    
	    }, this);
	}
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
//航段维护尺度表单

$('#whcd_add_ok').click(function () {
	var hd_id=WHHDID[chooseleg[1]][0];//获取航段的ID
	var hdName=$('#whcd_name').text();
	var hd_type=WHHDID[chooseleg[1]][1];
	var starttime=$('#whcdForm-start').val().trim();
	var endtime=$('#whcdForm-end').val().trim();
	var ybss=$('#whcd_predictDepth').val();
	var ybkd=$('#whcd_predictWidth').val();
	var resulttext="请输入:";var bol=false;
	
	if( ybss==''||isNaN(ybss)){
		 bol=true;
		 resulttext+="预测深度，";
	}
	if( ybkd==''||isNaN(ybkd)){
		 bol=true;
		 resulttext+="预测宽度，";
	}
	if( starttime.length<=1||endtime.length<=1){
		 bol=true;
		 resulttext+="时间，";
	}
	if(bol){
		$('#whhdresults').text(resulttext);
		return;	
	}
	
	saveWHCDhd(starttime,endtime,ybss,ybkd,hd_id,null,null,null,hdName,hd_type,CDtype);
	if(clicked_feature!=null){
		clicked_feature.setStyle(styleold);
		clicked_feature=null;
		styleold=null;
	}
	});
//  航段维护尺度历史数据查询
    $('#whcd_submit').click(function () {
		HDeditStatus=3;
		$('#WHcd_Starttime').val('');
		$('#WHcd_Endtime').val('');
    var name=$('#whcdDetial div table tr:nth-child(1)  td:nth-child(2)').text();
		if(name==''||name.length<=1){
			$('#whhdresultss').text("请选择航段");
			return ;
		}
		$('#whhdresultss').text('');
		$('#whcdadd_ok >div:nth-child(1)').text('查询');
//		$('#whcdadd_ok').text('查询');
		$('#ShowHisWHCD>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i> "+name+"维护历史数据<a class='pull-right' id='WHCDcancel' onclick=\"WHCDCancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");
		$('#ShowHisWHCD').show();
		$(".blackoverlayer").css("display","block");
    });
$('#WHCDcancel').click(function () {
	$("#HDList").empty();
})
//航段尺度表单退出
$('#whcd_add_exit,#WHCD_cancel').click(function(){
	$('#WHCD').hide();
	$('#whcd_show').show();
	$('#WHCDForm').hide();
	$('#whcd_add_ok_show').show();
	$('#whcdForm-end').val("");
	$('#whcdForm-start').val("");
	$('#whcd_predictDepth').val("");
	$('#whcd_predictWidth').val("");
	$('#whcd_name').val("");
	  $('#whhdresults').text('');
	$('#whcd_newadd_ok').show();
	$('#whcd_add_ok').hide();
//  撤销选中物标的处理
	if(clicked_feature!=null){
		clicked_feature.setStyle(styleold);
		clicked_feature=null;
		styleold=null;
	}
});

//航段历史数据查询
$('#whcdadd_ok').click(function () {
	var starttime=$('#WHcd_Starttime').val();
	var endtime=$('#WHcd_Endtime').val();
	if(starttime.length<=1||endtime.length<=1){
		$('#querytime_results').text("请输入时间");
		return;
	}
	var info=[];
	if(HDeditStatus==1){
		for(var i=0;i<WHHDID.length;i++){
			var hd=WHHDID[i];
			var ycss = $('#ycss'+i).val();
			var yckd = $('#yckd'+i).val();
			if( $('#checkbox'+i).is(':checked')){
				CDtype=1;
			}else{
				CDtype=2;
			}
			 if(isNaN(Number(ycss))||isNaN(Number(yckd))){}else{
          var arr={
        		"START_DATE":starttime, 
        		"END_DATE":endtime, 
        		"YC_SS":ycss,
			     "STATUS":1,
        		"YC_KD":yckd, 
        		"HD_ID":hd[0], 
        		"SFJMSS":CDtype, 
        		"HD_TYPE":hd[1], 
        		"HD_NAME":hd[2], 
          }
          info.push(arr);	
			}

		}
		 $("#circularwhcd").css('display', 'block'); 
	     $("#whcdadd_ok").attr('disabled', 'disabled');
	     $('#whcdadd_ok >div:nth-child(1)').hide();
		 saveWHCDhd(info);
	}else if(HDeditStatus==2){
		for(var i=0;i<hdObject.length;i++){
			var hd=hdObject[i];
			var ycss = $('#ycss'+i).val();
			var yckd = $('#yckd'+i).val();
			if( $('#checkbox'+i).is(':checked')){
				SFJMSS=1;
			}else{
				SFJMSS=2;
			}
			if(isNaN(Number(ycss))||isNaN(Number(yckd))){}else {
				   var arr={
						   "ID":Number(hd.ID),
			        		"START_DATE":starttime, 
			        		"END_DATE":endtime, 
			        		"YC_SS":ycss,
					        "STATUS":1,
			        		"YC_KD":yckd, 
			        		"HD_ID":Number(hd.HD_ID), 
			        		"SFJMSS":SFJMSS, 
			        		"HD_TYPE":hd.HD_TYPE, 
			        		"HD_NAME":hd.HD_NAME, 
			          }
				   info.push(arr);	
			
			}
		}
		 $("#circularwhcd").css('display', 'block'); 
	     $("#whcdadd_ok").attr('disabled', 'disabled');
	     $('#whcdadd_ok >div:nth-child(1)').hide();
		updateHDCD( info);
	}else if(HDeditStatus==3){
		var hd_ID=HDlist[noticeID].HD_ID;
		if(hd_ID==undefined){
			$('#whhdresultss').text('请选择航段');
			return;
		}
		 $("#circularwhcd").css('display', 'block'); 
	     $("#whcdadd_ok").attr('disabled', 'disabled');
	     $('#whcdadd_ok >div:nth-child(1)').hide();
		searchWHCDBydate(hd_ID,starttime,endtime);
	}
});
//水道维护尺度历史数据查询
var whcdboloon=false;
$('#shuda_submit').click(function(){

	$('#WHcd_Starttime').val('');
	$('#WHcd_Endtime').val('');
	var name=$('#sdcbDetial div table tr:nth-child(1)  td:nth-child(2)').text();
	if(name==''||name.length<=1){
		$('#whsdresultss').text("请选择水道");
		return ;
	}
	$('#whsdresultss').text('')
	$('#ShowHisWHCD>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i> "+name+"维护历史数据<a class='pull-right' id='WHCDcancel' onclick=\"WHCDCancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");
	whcdboloon=false;
	$('#ShowHisWHCD').css("width",400);
	$('#ShowHisWHCD').show();
	$('#queryhisResult').hide();
	$('#histquery').show();
	$(".blackoverlayer").css("display","block");
})
$('#whcd_newadd_ok').click(function(){
	$('#whcd_add_ok_show').hide();
		$('#WHCDForm').show();
		$('#whcd_show').hide();
		$('#whcd_newadd_ok').hide();
		$('#whcd_add_ok').show();
})
$('#sdcdNewadd_ok').click(function(){
	$('#sdcdNewadd_ok_show').hide();
	$('#sdcdForm').show();
	$('#sdcd_show').hide();
	$('#sdcdNewadd_ok').hide();
	$('#sdcdadd_ok').show();
})
var selectDel=1;
$('.delete_ok').click(function(){
		$('.delete_panel').css('display','none');
	    //删除操作提交到后台
	if(selectDel==1){
		var feature=features_geodelete[0];
		var   noticename=feature.get("name");
		var starttime=feature.get("Starttime");
		var starttime= getDate1(starttime.time);
		if(starttime.length==17){
			starttime=starttime.substring(0,9);
		}else{
			starttime=starttime.substring(0,10);
		}
		var endtime=feature.get("Endtime");
		var endtime=getDate1( endtime.time);
		if(endtime.length==17){
			endtime=endtime.substring(0,9);
		}else{
			endtime=endtime.substring(0,10);
		}
		var noticetext=feature.get("text");
		var  noticeremark=feature.get("Remark");
		var circus=  feature.get("Circus");
		var isvalid=0;
		updateHDTG(noticeremark,UserName,NoticeID[2],noticetext,endtime,starttime,NoticeID[1],circus,NoticeID[0],isvalid,noticename);
//		deleteFeatureByID();
	}else if(selectDel==2){
		
		$('#editNotice_name').val();
		var noticetext=	$('#Noticecontent').val();
		var noticeremark=$('#Noticeremark').val();
		var isvalid=0;
		updateHDTG(noticeremark,UserName,NoticeID[2],noticetext,null,null,NoticeID[1],null,NoticeID[0],isvalid,null);
		deleteTGFeatureByID(noticeID);
	}else if(selectDel==3){
		var info=[];
		for(var i=0;i<hdObject.length;i++){
			info.push({'ID':Number(hdObject[i].ID)});

		}
		deleteWHCD(info);
	}



	});
//
 var deleteCacelBol=false;
$('.delete_cancel').click(function(){
	if(selectDel==1){
		selectClick.getFeatures().clear();
		var deleteobj=features_geodelete[0];
		deleteobj.setStyle(styleold);
	    IDs=[];	
	}else if(selectDel==2){
		
	} else if(selectDel==3){
		
	}
	$('.delete_panel').css('display','none');
	})
	//编辑通告面板
$('#editadd_ok').click(function(){	
	var noticename=$('#editNotice_name').val();
	var starttime=$('#editNotice_Starttime').val();
	var validTime=$('#editnotice_time').val();
 
   var coordinates=[];
   if(editConvertBol==84){
	   for(i=1;i<pointid;i++){
			 var lon = $('#经'+i).val(); 
			 var lat = $('#纬'+i).val();
			 if(lon==''||lon==''){
				 
			 }else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{
				 
				 coordinates.push(Number(lon));
				 coordinates.push(Number(lat)); 
			 }
			
		   } 
	   
   }else{
	   for(i=1;i<pointid;i++){
			 var lon = $('#经'+i).val(); 
			 var lat = $('#纬'+i).val();
			 if(lon==''||lon==''){
				 
			 }else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{
				 
				 coordinates.push(lon);
				 coordinates.push(lat); 
			 }
			
		   }   
   }

	if(NoticeID[2]==0){
		if( coordinates.length<2){//无点
			NoticeID[2]=3;
		}else if(coordinates.length<=3){//变点
			NoticeID[2]=0;

		}else if(coordinates.length<=5){//线
			NoticeID[2]=1;
		}else if(coordinates.length>=5){//面
			NoticeID[2]=2;
		}
	}else if(NoticeID[2]==1){//线
		if( coordinates.length<2){//无点
			NoticeID[2]=3;
		}else if(coordinates.length<=3){//变点
			NoticeID[2]=0;

		}

	}else if(NoticeID[2]==2){//面上点变化范围
		if( coordinates.length<2){//无点
			NoticeID[2]=3;
		}else if(coordinates.length<=3){//变点
			NoticeID[2]=0;

		}else if(coordinates.length<=5){//面变成线的时候，存在三个节点
			NoticeID[2]=1;
		}else if(coordinates.length>=5){//面由至少五个节点组成
			NoticeID[2]=2;
		}
	}
   //删除点操作，面变线，线变点

	var editor=$('#editNotice_editor').val();
	var noticetext=$('#editNotice_content').val();
	var circus=$('#edit_Circus').val()*1000;
	var noticeremark=$('#editNotice_remark').val();
	var leg=$('#editnoticeHD').text();
	var center=$('#editcenter').val();
	if(circus==''){
		$('#addresults').text('请输入缓冲半径');
	}else if(starttime.length<=1){
		$('#addresults').text('请输入时间');
	}else{
		var Info=[];
		if(NoticeID[2]==0){//点
			var arr = {
					"ID": NoticeID[1],
					"BaseType": '0',
				    "Status":1,
				    "center":center,
				    "convertBOL":editConvertBol,
					"Editor": UserName,
					"Remark":noticeremark,
					"Lantitude": coordinates[0],
					"Longitude":coordinates[1]
				}
			Info.push(arr);
		}else if(NoticeID[2]==1){//线
			NodeEditInfo=[];
			var arr = {
					"ID": NoticeID[1],
					"BaseType": '1',
					"Editor": UserName,
				   "Status":1,
				   "center":center,
				    "convertBOL":editConvertBol,
					"Remark": noticeremark,
					"Attribution_A": cusAttrA,
					"Attribution_B": cusAttrB,
					"Attribution_C": cusAttrC,
					"Attribution_D": cusAttrD,
					"Coords":  coordinates
				}
			Info.push(arr);
			
		}else if(NoticeID[2]==2){//面
			NodeEditInfo=[];
			var arr = {
					"ID": NoticeID[1],
					"BaseType": '2',
					"Editor": UserName,
				    "Status":1,
				    "center":center,
				    "convertBOL":editConvertBol,
					"Remark":noticeremark,
					"Attribution_A": cusAttrA,
					"Attribution_B": cusAttrB,
					"Attribution_C": cusAttrC,
					"Attribution_D": cusAttrD,
					"Coords":  coordinates
				}
			Info.push(arr);
		}

    if( $("#editnoticeforever").is(':checked')){
    var 	endtime="2117/1/1";
 	   var isvalid=1;  
    }else{
    	
    	if(validTime.length<=0||isNaN(validTime)){
    		$('#addresults').text('请输入有效期');
    		return;
    	}
		var timestamp2 = Date.parse(new Date(starttime));
		var time=getDate1(timestamp2+Number(validTime)*1000 * 60 * 60 * 24);
	    if(time.length==17){
	    	var endtime=time.substring(0,9); 
	    }else{
	    	var endtime=time.substring(0,10); 
	    }
	    var isvalid=1; 
    }; 
		if(NoticeID[2]==3){
			 $("#circulareditnotice").css('display', 'block'); 
			  $("#editadd_ok").attr('disabled', 'disabled');
			  $('#editadd_ok >div:nth-child(1)').hide();
			var arr = {
				"ID": NoticeID[1],
				"BaseType": '0',
				"Status":2,
				 "center":center,
				"convertBOL":editConvertBol,
				"Editor": UserName,
				"Remark":noticeremark,
				"Lantitude":119.7283,
				"Longitude":32.3173
			}
			Info.push(arr);
			editnoticesave(Info,noticeremark,UserName,NoticeID[2],noticetext,endtime,starttime,NoticeID[1],circus,NoticeID[0],isvalid,noticename);
		
		}else{
			 $("#circulareditnotice").css('display', 'block');
			  $("#editadd_ok").attr('disabled', 'disabled');
			  $('#editadd_ok >div:nth-child(1)').hide();
			  editnoticesave(Info,noticeremark,UserName,NoticeID[2],noticetext,endtime,starttime,NoticeID[1],circus,NoticeID[0],isvalid,noticename);	
		}
		
	}
	
	selectClick.getFeatures().clear();
	 pickstatus=true;
	 editBol=false;
	 click_n=0;
	 remove_interaction();
	 try{ modify.removePoint();}catch(e){
		 
	 }
	
})
$('#editadd_reset').click(function(){	
	$('#addresults').text('');
	$('#editNotice_Starttime').val('');
	$('#editNotice_Endtime').val('');
	$('#editnotice_time').val('');
	$('#editnoticeforever').attr('checked',false);
	$('#editNotice_content').val('');
	$('#edit_Circus').val('');
	$('#editNotice_remark').val('');
	$('#add_result').text('');
	})
$('#editadd_exit,#editHDTGcancel').click(function(){
	$('#editHDTG').hide();
	 $('#editpointform').hide();
	 $('#editpointbutton').show();
	 $("#circulareditnotice").css('display', 'none'); 
		
	 $("#editadd_ok").removeAttr('disabled');
	 $('#editadd_ok >div:nth-child(1)').show();
	$('#editnoticeforever').attr('checked',false);
//	$('#feature_query').show();
	$(".blackoverlayer").css("display","none"); 
	 pickstatus=true;
	 editBol=false;
	 getNotice();
selectClick.getFeatures().clear();
remove_interaction();
click_n=0;
	$('#editNotice_name').val('');
	$('#editNotice_Createtime').val('');
	$('#editNotice_Starttime').val('');
	$('#editNotice_Endtime').val('');
	$('#editNotice_creatorid').val('');
	$('#editNotice_content').val('');
	$('#edit_Circus').val('');
	$('#editNotice_remark').val('');
	$('#add_result').text('');
 try{ modify.removePoint();}catch(e){
		 
	 }
	})

$('#editpiking').click(function(){
	if(NoticeEditBol){
		if( NoticeID[2]==1){//线
			click_n=-1 ;
			draw_line();

		}else if( NoticeID[2]==0){//点
			click_n=1 ;

		}else if( NoticeID[2]==2){//面
			click_n=-1 ;
			draw_polygon();
		}
	}else{
		pickstatus=false;
		
		selectClick.getFeatures().clear();
		$('#mapPanel').css('cursor',mouseCursor);
		click_n=0;
		$('#edit_btns').css('display','flex');
		
	}
	$('#editHDTG').hide();
	$(".blackoverlayer").css("display","none");
})
$('#whcdadd_reset').click(function () {
	$('#WHcd_Starttime').val('');
	$('#WHcd_Endtime').val('');
	if(HDeditStatus==1){
		for(var i=0;i<WHHDID.length;i++){
			 $('#ycss'+i).val('');
			 $('#yckd'+i).val('');
			$('#checkbox'+i).attr('checked',false);
		}
	}else if(HDeditStatus==2){
		for(var i=0;i<hdObject.length;i++){
			 $('#ycss'+i).val('');
			 $('#yckd'+i).val('');
			$('#checkbox'+i).attr('checked',false);
		}
	}
})

function WHCDCancel(){
	$("#HDList").empty();
	 $('#circularchart').css('display','none'); 
	  $('#whcdadd_ok >div:nth-child(1)').show();
	 $("#circularwhcd").css('display', 'none'); 
	 $("#whcdadd_ok").removeAttr('disabled');
	$('#querytime_results').text('');
	$(".blackoverlayer").css("display","none"); 
	$('#WHcd_Starttime').val('');
	$('#WHcd_Endtime').val('');
	$('#ShowHisWHCD').hide();
}
function swChartcancel(){
	$('#statisticsResult').remove();
	$('#swChart').hide()
	$('#date-start').val('');
	$('#date-end').val('');
}
function CorrectStatus(pointfeature){//有可能，转向点上的航线个数错误，导致后面操作连续发送错误。
	var extent= pointfeature.getGeometry().getExtent();//点的范围
	var Status=pointfeature.get("Status");
	var cr= pointfeature.getGeometry().getCoordinates();
	var count=0;
	  eval("NavlineSource").forEachFeatureIntersectingExtent(extent, function(feature) {//点上有几条线
		  count++;
		        });
	  if(Status!=count){
	  pointfeature.set("Status",count);
	  }
}
$('#whcd_add_ok_show').click(function(){//航段表单修改保存
	var ID=noticeID;var SFJMSS;
	 if( $("#basedepth").is(':checked')){
		 SFJMSS=1;
	   }else{
		   SFJMSS=2;    
	   };
	var name=$('#whcd_name_edit').val();
	var starttime=$('#whcdForm-start_show').val();
	var endtime=$('#whcdForm-end_show').val();
	var ycss=$('#whcd_predictDepth_show').val();	
	var yckd=$('#whcd_predictWidth_show').val();
	var resulttext="请输入:";var bol=false;

	if(  ycss==''||isNaN( ycss)){
		 bol=true;
		 resulttext+="预测深度，";
	}
	if( yckd==''||isNaN(yckd)){
		 bol=true;
		 resulttext+="预测宽度，";
	}
	if( starttime.length<=1||endtime.length<=1){
		 bol=true;
		 resulttext+="时间，";
	}
	if(bol){
		$('#whhdresults').text(resulttext);
		return;	
	}
	updateHDCD(ycss,yckd,null,null,endtime,starttime,null,null,ID,name, SFJMSS)	
})
$('#sdcdNewadd_ok_show').click(function(){
	var ID=sdcdID;
	var name=$('#sdcd_name').text();
	var starttime=$('#sdcdForm-start_show').val();
	var endtime=$('#sdcdForm-end_show').val();
	var ycss=$('#sdcd_predictDepth_show').val();	
	var yckd=$('#sdcd_predictWidth_show').val();
	var sjss=$('#sdcd_realdepth_show').val();
	var sjkd=$('#sdcd_realwidth_show').val();
	var resulttext="请输入:";var bol=false;
	if(  ycss==''||isNaN( ycss)){
		 bol=true;
		 resulttext+="预测深度，";
	}
	if( yckd==''||isNaN(yckd)){
		 bol=true;
		 resulttext+="预测宽度，";
	}
	if( starttime.length<=1||endtime.length<=1){
		 bol=true;
		 resulttext+="时间，";
	}
	if(bol){
		$('#whcdresults').text(resulttext);
		return;	
	}
updateWHCD(ycss,yckd,sjss,sjkd,endtime,starttime,null,null,ID,name)	
})
var NoticeEditBol=false;
$('#Notice_pane_edit').click(function(){//通告编辑
	$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
	  $('#editConvertTo84').attr('disabled', 'disabled');
	$('#editConvertTo54').removeAttr('disabled');
	$('#editswift84').show();
	$('#editswift54').hide();
	editConvertBol=84;
	if(noticeEditData==null){
		$('#editnoticeaddresults').text('请选择通告');
		return;
	}
	  $("#editnotice_time").attr('disabled',false);  
	var notice=noticeEditData.properties;
	$('#editNotice_name').val(notice.NAME);
	$('#editnoticeaddresults').text('');
	var starttime= notice.START_TIME;
	var endtime=notice.END_TIME;
	var Isvalid=notice.IS_VALID;
	selectedFeatureID= NoticeID[0]=notice.ID;
	eval("source_N05").clear(true);
	eval("source_N04").clear(true);
	eval("source_N03").clear(true);
	
   NoticeID[1]=notice.FEATURE_ID;
 var basetype= Number(notice.BASETYPE);
   NoticeID[2]= basetype; 
	var status= notice.STATUS;
	var table=$('#editNoticePoint>.table');
	table.empty();
	table.append("<tr><td>点</td><td>经度</td><td>纬度</td></tr>");
	if(Number(status)==1){
		 editfeature(loadeditfeature);
		   var coordinates=noticeEditData.geometry.coordinates;
		   if( basetype==0){
				NoticeEditBol=false;
			   $("#editpiking").text("屏幕编辑点");
			   createPointlist1([coordinates]); 
		   }else if(basetype==2){
				NoticeEditBol=false;
			   $("#editpiking").text("屏幕编辑面");
				createPointlist1(coordinates.splice(0,coordinates.length-1));
		   }else{
				NoticeEditBol=false;
			   $("#editpiking").text("屏幕编辑线");
			   createPointlist1(coordinates);   
		   }
	}else if(Number(status)==2){
		$('#delete_notice').show();
		pointNumber=1
		pointid=1;
		 $("#editpiking").text("添加几何图形");	
		NoticeEditBol=true;
		addTr();
	}else{
		 editfeature(loadeditfeature);
		NoticeEditBol=false;
		pointNumber=1
		pointid=1;
	
		addTr();
	}

	 var tmptime=getDate1(endtime.time);
	 if( tmptime.length==17){
		 tmptime= tmptime.substring(0,9); 
	    }else{
	    	 tmptime= tmptime.substring(0,10); 
	    }
	if( tmptime=='2117/1/1 '){
		$('#editnotice_time').val('');	
		
		$('#editnoticeforever').attr('checked',true);
	}else{
		$('#editnoticeforever').attr('checked',false);
		 var  days = Number(endtime.time) - Number(starttime.time); 
		 var  day = parseInt(days / (1000 * 60 * 60 * 24));
		 	$('#editnotice_time').val(day);	
	}
	

	  var starttime=getDate1(starttime.time);
		$('#editNotice_Starttime').val(starttime.substring(0,10));
	$('#edit_Circus').val( notice.CIRCUS/1000);
   $('#editNotice_content').val(notice.NOTICE_TEXT);
	$('#editNotice_remark').val(notice.REMARK);
	 $('#addresults').text('');
	$('#editHDTG').show();
	 $(".blackoverlayer").css("display","block");
	 $('#editNotice_editor').val( UserName);
//	 $('#editpiking').hide();//不对集合要素编辑
})
$('#Notice_pane_history').click(function(){//历史查询
	$('#ShowHisNotice').show();
	 $('#ShowHisNotice').css("width",400);
	 $("#histNoticeList").empty();
})
function cancelNoticeHis(){
	$('#ShowHisNotice').hide();
	 $("#circularNotice").css('display', 'none'); 
	 $('#NOticeadd_ok >div:nth-child(1)').show();
	$('#NOTICE_Starttime').val('');
	$('#NOTICE_Endtime').val('');
	
}
$('#NOticeadd_reset').click(function(){
	$('#NOTICE_Starttime').val('');
	$('#NOTICE_Endtime').val('');
})
$('#NOticeadd_ok').click(function(){
	var starttime=$('#NOTICE_Starttime').val();
	var endtime=$('#NOTICE_Endtime').val();
	 $("#circularNotice").css('display', 'block');
	 $('#NOticeadd_ok >div:nth-child(1)').hide();
	searchNotice(starttime,endtime,1);//不需要id ,
})
$('#pointaddbutton').click(function(){
	$("input[name='basepoint']").attr('checked',false);
	if(pointNumber==3){
	 $('#editpointform').show();
	 $('#editpointbutton').hide();
	}else{
		addTr();
	}
})
$('#editpointaddbutton').click(function(){
		addTr1();

	
})
$('#delete_notice').click(function(){
	if(noticeEditData==null){
		$('#editnoticeaddresults').text('请选择通告');
		return;
	}
	selectDel=2;
	
	$('.delete_panel').css('display', 'block');
})
$('#newNotice').click(function () {
	$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
	$('#ConvertTo84').attr('disabled', 'disabled');
	$('#ConvertTo54').removeAttr('disabled');
	$('#swift84').show();
	$('#swift54').hide();
	ConvertBol=84;
	$(".blackoverlayer").css("display","block");
	var table=$('#NoticePoint>.table');
	addnoticenum=1;
	addnoticeID=1;
	$('#noticeforever').attr('checked',false);
	table.empty();
	table.append("<tr><td>点</td><td>经度</td><td>纬度</td></tr>");
	if( noticeBasetype==0){
		addTr1();
	}else if( noticeBasetype==1){
		addTr1();
		addTr1();
	}else if( noticeBasetype==2){
		addTr1();
		addTr1();
		addTr1();
	}

	$("#add_results").text('');
	$('#Notice_creatorid').val(UserName);
	$("#addFeature").css("display","block");
})
var stopbol=true;
$('#Notice_pane_stop').click(function () {
	if(noticeEditData==null){
		$('#editnoticeaddresults').text('请选择通告');
		return;
	}
	var notice=noticeEditData.properties;
	var feature_ID= notice.FEATURE_ID;
	var circus=notice.CIRCUS;
	if(stopbol){
		noticeStop(null,UserName,null,null,null,null,feature_ID,circus,notice.ID,2,null);	
	}else{
		noticeStop(null,UserName,null,null,null,null,feature_ID,circus,notice.ID,1,null);
	}

})
var HDeditStatus=1;
$('#newWHCD').click(function () {
	HDeditStatus=1;
	
	$('#ShowHisWHCD>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i>新建数据<a class='pull-right' id='WHCDcancel' onclick=\"WHCDCancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");
	$(".blackoverlayer").css("display","block");
	createHDlist();
	$('#whcdadd_ok >div:nth-child(1)').text('保存');
	$('#ShowHisWHCD').show();
})
$('#WHCD_pane_edit').click(function () {
   if(hdObject.length<=0){
	   $('#whhdresultss').text('请选择周期');
	   return;
   }
	HDeditStatus=2;
	createHDeditlist();
	$('#whcdadd_ok >div:nth-child(1)').text('保存');
	$('#ShowHisWHCD>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i>编辑数据<a class='pull-right' id='WHCDcancel' onclick=\"WHCDCancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");
	$('#ShowHisWHCD').show();
	var item=hdObject[0];
   var starttime=getDate1(item.START_DATE.time);
   if(starttime.length==17){
  	 starttime=starttime.substring(0,9); 
   }else{
  	 starttime=starttime.substring(0,10); 
   }
  	var endtime=getDate1(item.END_DATE.time);
  	 if(endtime.length==17){
  		 endtime=endtime.substring(0,9); 
	     }else{
	    	 endtime=endtime.substring(0,10); 
	     }

	$('#WHcd_Starttime').val(starttime);
	$('#WHcd_Endtime').val(endtime);

	

	
})
$('#WHCD_pane_delete').click(function () {
	if(hdObject.length<=0){
		$('#whhdresultss').text('请选择周期');
		return;
	}
	selectDel=3;
	$('.delete_panel').css('display', 'block');
})
$('#wszBtn').click(function () {
	 $('#wszBtn').text('历史水位查询');

	  var start = new Date().getTime();
		 var endtime=getDate1(start);
		 if(endtime.length==17){
			 endtime=endtime.substring(0,9)
		$('#date-end').val();	
		    }else{
		    	endtime=endtime.substring(0,10)
		    	$('#date-end').val(endtime);	 
		    }
		 var starttime=getDate1(Number(start)-1000 * 60 * 60 * 24*7);
		 if( starttime.length==17){
			 starttime=starttime.substring(0,9);
		$('#date-start').val(starttime);	
		    }else{
		    	starttime=starttime.substring(0,10)
		    	$('#date-start').val(starttime);	 
		    } 
			 var swz=swzObj[swzID];
			 if(swz==undefined){
				 $('#wszBtn').text('请选择水位站');
				return; 
			 }
			 $('#swzhisesults').text('');
				$('#swChart>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i> "+swz.SWZMC+"水位历史轨迹查询<a class='pull-right' id='WHCDcancel' onclick=\"swChartcancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");
				$.ajax({
					type:"POST",
					//async:false,
					dataType:"json",
					url:"GetRGWaterSW.action",
					data:{"RGWaterStationID":swzID,"startTime":starttime,"endTime":endtime},
					success:function(loadresult){
						$('#swChart>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i> "+swzObj[swzID].SWZMC+starttime+"-到-"+endtime+"水位曲线<a class='pull-right'  onclick=\"swChartcancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");	
					
						swLineChart(loadresult,swzObj[swzID].SWZMC);
						  $('#swChart').show();
						
					},
					error:function(){
						
					}
				}) 
		 // }

});
//历史轨迹查询，图表显示
$('#queryHisBtn').click(function () {	
var starttime=$('#date-start').val().trim();
var endtime=$('#date-end').val().trim();
var name=$('#swzDetial div table tr:nth-child(1)  td:nth-child(2)').text();
	var text='请选择';var bol=false;
	if(name==''||name.length<=1){
		text+="水位站名称";
		bol=true;
	}
if(starttime.length<=1||endtime.length<=1){
	$('#date-start').val('');
	$('#date-end').val('');
	text+="，时间";
	bol=true;
}
	if(bol){
		$('#swzhisesults').text(text);
		return ;
	}
	$('#swzhisesults').text('');
	 $('#circularchart').css('display','inline-block'); 
	  $('#queryHisBtn >div:nth-child(1)').hide();
	 if(baibaoStation){
			$.ajax({
				type:"POST",
				//async:false,
				dataType:"json",
				url:"getBaiMaoCW.action",
				data:{"startTime":starttime,"endTime":endtime},
				success:function(loadresult){
					$('#swChart>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i>白茆"+starttime+"-到-"+endtime+"潮位迹线<a class='pull-right'  onclick=\"swChartcancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");	
 
					baimaoLineChart(loadresult);
					
				},
				error:function(){
					
				}
			})
	 }else{
			$.ajax({
				type:"POST",
				//async:false,
				dataType:"json",
				url:"GetRGWaterSW.action",
				data:{"RGWaterStationID":swzID,"startTime":starttime,"endTime":endtime},
				success:function(loadresult){
					$('#swChart>div:nth-child(1)').html("<i  class='fa fa-info-circle fa-fw'></i> "+swzObj[swzID].SWZMC+starttime+"-到-"+endtime+"水位曲线<a class='pull-right'  onclick=\"swChartcancel()\"'><i class='fa fa-close' style='color: white;'></i> </a> ");	
			  
					swLineChart(loadresult,swzObj[swzID].SWZMC);
					
				},
				error:function(){
					
				}
			}) 
	 }


})
$('#progressBar').mouseover(function(ev){
	
	var d= $('#progresstext');
	var left= d.css('left');
	var top=d.css('top');
    d.css('position','absolute');
	d.css('display','inline');
	d.css('left', ev.clientX + 10 + 'px');
	d.css('top',ev.clientY - 25 + 'px');
	d.show();
})
$('#progressBar').mouseout(function(){
	$('#progresstext').hide();
})
var centralMeridian="";
$('#s_l').click(function(){
	var tempt=$('#s_l > a').text();
	$('#s_l > a').text($('#centeralline').text());
	$('#centeralline').text(tempt);
});
$('#edits_l').click(function(){
	var tempt=$('#edits_l > a').text();
	$('#edits_l > a').text($('#editcenteralline').text());
	$('#editcenteralline').text(tempt);
});
$('#edits_line').click(function(){
	var tempt=$('#edits_line > a').text();
	var tex=$('#editcenteral').text();
	$('#edits_line > a').text(tex);
	$('#editcenteral').text(tempt);
});
//通告编辑中，54转84
$('#editConvertTo84').click(function () {
	$('#editConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#editConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
		$('#editConvertTo84').attr('disabled', 'disabled');
				$('#editConvertTo54').removeAttr('disabled');
				$('#editswift84').show();
				$('#editswift54').hide();
	var coordinates=[];
	var center=$('#editcenter').val();
	   for(i=1;i<pointid;i++){
			 var lon = $('#经'+i).val(); 
			 var lat = $('#纬'+i).val();
			 if(lon==''||lat==''){
				 
			 }else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{
				 
				 coordinates.push(lon);
				 coordinates.push(lat); 
			 }
			
		   }
	 editConvertTo84(coordinates,Number(center)*3);

})
//编辑通告中84转54
$('#editConvertTo54').click(function () {
	$('#editConvertTo54').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#editConvertTo84').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
		$('#editConvertTo54').attr('disabled', 'disabled');
			$('#editConvertTo84').removeAttr('disabled');
				$('#editswift54').show();
			   $('#editswift84').hide();
	var coordinates=[];
	centralMeridian=$('#editcenteralline').text();
	   for(i=1;i<pointid;i++){
			 var lon = $('#经'+i).val(); 
			 var lat = $('#纬'+i).val();
			 if(lon==''||lat==''){
				 
			 }else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{
				 
				 coordinates.push(lon);
				 coordinates.push(lat); 
			 }
			
		   }
	 editConvertTo54(coordinates,Number(centralMeridian));
})
//54转84
$('#ConvertTo84').click(function () {
	$('#ConvertTo84').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#ConvertTo54').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
	$('#swift54').hide();
	$('#swift84').show();
	$('#ConvertTo84').attr('disabled', 'disabled');
	$('#ConvertTo54').removeAttr('disabled');
	var coordinates=[];
	var center=$('#center').val();
	 for(i=1;i<addnoticenum;i++){
			var lon = $('#1经'+i).val();
			var lat = $('#1纬'+i).val();
			if(lon==''||lat==''){}else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{

				coordinates.push(lon);
				coordinates.push(lat);
			}}
	 ConvertTo84(coordinates,Number(center*3));

})
//84转54
$('#ConvertTo54').click(function () {
	$('#ConvertTo54').attr("style",'width: 9px;height: 15px;background-color: #47d9bf;border-radius:50%; outline:none;" ');
	$('#ConvertTo84').attr("style","width: 10px;height: 17px;border: 2px solid black;border-radius:50%;outline:none;")
	$('#swift54').show();
    $('#swift84').hide();
	$('#ConvertTo54').attr('disabled', 'disabled');
	$('#ConvertTo84').removeAttr('disabled');
	$('#center').val('');
	var coordinates=[];
	centralMeridian=$('#centeralline').text();
	 for(i=1;i<addnoticenum;i++){
			var lon = $('#1经'+i).val();
			var lat = $('#1纬'+i).val();
			if(lon==''||lat==''){}else if(isNaN(Number(lon))||isNaN(Number(lat))){}else{

				coordinates.push(lon);
				coordinates.push(lat);
			}

		}
	 ConvertTo54(coordinates,Number(centralMeridian));
})
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
//通告是否有效列表
$('#noticeValid').click(function(){
	eval("source_N03").clear(true);
	eval("source_N04").clear(true);
	eval("source_N05").clear(true);	
	var table=$("#NoticeList");
	$("#NoticeCount").html("通告列表");
	table.empty();
	if( $("#noticeValid").is(':checked')){//
		   if( $("#noticeInvalid").is(':checked')){
				
			   getValidNotice("0");//0//0为全部通告，1为有效通告，2为无效通告
			   }else{
				 
				   getValidNotice("1")//0为全部通告，1为有效通告，2为无效通告
			   };

		
	   }else{
			  if( $("#noticeInvalid").is(':checked')){
				  getValidNotice("2");//0为全部通告，1为有效通告，2为无效通告
			   }else{
				   ///
				   
				   getValidNotice("0");//0为全部通告，1为有效通告，2为无效通告
			   };
			
	   };	
})
$('#noticeInvalid').click(function(){
	eval("source_N03").clear(true);
	eval("source_N04").clear(true);
	eval("source_N05").clear(true);	
	$("#NoticeCount").html("通告列表");
	var table=$("#NoticeList");
	table.empty();
	  if( $("#noticeInvalid").is(':checked')){//
		   if( $("#noticeValid").is(':checked')){
			   getValidNotice("0");//0为全部通告，1为有效通告，2为无效通告
		   }else{////
			   getValidNotice("2");
		   };

	   }else{
			  if( $("#noticeValid").is(':checked')){
					  getValidNotice("1");//0为全部通告，1为有效通告，2为无效通告
				   }else{
					   getValidNotice("0");//0为全部通告，1为有效通告，2为无效通告
				   }; 
	   };	
})
