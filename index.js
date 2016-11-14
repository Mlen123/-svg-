$(function(){
	var $createDrawing = $("#create-drawing"),
	    $drawing = $("#drawing"),
	    $svg = $("#svg"),
	    $exterior = $("#exterior"),
	    $showPic = $("#wrapper main");

	var SVG_NS = 'http://www.w3.org/2000/svg',
	    selected = null;

	var drawingInfo = {
		rect: 'x:10,y:10,width:200,height:100,rx:0,ry:0',
		circle: 'cx:100,cy:100,r:50',
		ellipse: 'cx:200,cy:200,rx:100,ry:150',
		line:'x1:100,y1:400,x2:300,y2:450'
	};

	var defaultAttrs = {
		fill: '#ffffff',
        stroke: '#ff0000',
	};

	$createDrawing.on('click','button',function(){
		var id = $(this).attr("id");
		create(id);
	});
	$drawing.on('change','input',function(){
		if(this.tagName.toLowerCase() != 'input')
			return;
		$(selected).attr(this.name,this.value);
	});
	$showPic.on('click',function(e){
		var target = e.target;
		if(target.tagName.toLowerCase() in drawingInfo){
			select(target);
		}
	});
	$exterior.on("change",function(e){
		var target = e.target;
		if(target.tagName.toLowerCase() != 'input')
			return;
		if(!selected) return;
        $(selected).attr(target.name,target.value);
	});


	function create(tag){
		var tag = document.createElementNS(SVG_NS,tag);
		$svg.append($(tag));
		select(tag);
	}

	function select(ele){
		var attrs = drawingInfo[ele.tagName.toLowerCase()].split(','),
		    fragment = document.createDocumentFragment(),
		    name,value,label,$input,$p;

		$drawing.children('article').text("");

		attrs.forEach(function(item,index){
			name = item.split(':')[0];
            value = $(ele).attr(name) || item.split(':')[1];
            $(ele).attr(name,value);

            label = document.createElement("label");
            label.textContent = name;
            $input = $("<input>",{
            	type: "range",
            	name: name,
            	val: value,
            	min: 0,
            	max: 800
            });
            $p = $("<p>");
            $p.append($(label))
                .append($input);
            $(fragment).append($p);
		});

		$drawing.children('article').append($(fragment));

		for(var name in defaultAttrs){
			value = $(ele).attr(name) || defaultAttrs[name];
			$(ele).attr(name,value);
		}

		selected = ele;

        fill.value = $(selected).attr('fill');
		stroke.value = $(selected).attr('stroke');
		strokeWidth.value = $(selected).attr('stroke-width');
	}
})