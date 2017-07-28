(function($){

	var GETCLASSES = "http://imoocnote.calfnote.com/inter/getClasses.php";

	// $.ajaxSetup({
	// 	error: funcion(){
	// 		console.log("error ajaxSetup");
	// 		alert('调用接口失败');
	// 		return false;
	// 	}
	// });

	function renderTemplate(templateSelector, data, htmlSelector){
		console.log(data);
		var t = $(templateSelector).html();
		var f = Handlebars.compile(t);
		var h = f(data);
		$(htmlSelector).html(h);
	}

	function refreshClasses(curPage){
		$.getJSON(GETCLASSES, {curPage: curPage}, function(data){
			renderTemplate("#class-template", data.data, "#classes");
			renderTemplate("#pag-template", formatPag(data), "#pag");
		});
	}

	$('.overlap').on('click', function(){
		showNote(false);
	});

	function showNote(show){
		if(show){
			$(".overlap").css('display', block);
			$(".notedetail").css('display',block);
		}else{
			$(".overlap").css('display', none);
			$(".notedetail").css('display',none);
		}
	}

	function bindClassEvent(){
		$("#classes").delegate('li', 'click', function(){
			showNote(true);
		});
	}

	//委托
	function bindPageEvent(){
		$("#pag").delegate('li.clickable', 'click', function(){
			$this = $(this);
			console.log($this.data('id'));
			refreshClasses($this.data('id'));
		});
	}

	bindPageEvent();

	$.getJSON(GETCLASSES, {curPage: 1}, function(data){
		//console.log(data);
		renderTemplate("#class-template", data.data, "#classes");
		renderTemplate("#pag-template", formatPag(data), "#pag");
		
		// var t = $("#class-template").html();
		// var f = Handlebars.compile(t);
		// var h = f(data.data);
		// $("#classes").html(h);

		// var t = $("#pag-template").html();
		// var f = Handlebars.compile(t);
		// var h = f(formatPag(data));
		// $("#pag").html(h);

		$('li.clickable').on('click', function(){
			$this = $(this);
			console.log($this.data('id'));
			refreshClasses($this.data('id'));
		});
	});

	Handlebars.registerHelper("equal", function(v1, v2, options){
		if(v1 == v2){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});

	Handlebars.registerHelper("long", function(v, options){
		if(v.indexOf('小时') != -1){
			return options.fn(this);
		}else{
			return options.inverse(this);
		}
	});

	// Handlebars.registerHelper("pag", function(v1, v2){
	// 	var str = "";
	// 	str += "<ul>";
	// 	return str;
	// });

	function formatPag(pageData){
		var arr = [];
		var total = parseInt(pageData.totalCount);
		var cur = parseInt(pageData.curPage);
		// 处理到首页的逻辑
		var toLeft = {};
		toLeft.index = 1;
		toLeft.text = '&laquo;';
		if(cur != 1){
			toLeft.clickable = true;
		}
		arr.push(toLeft);
		// 处理到上一页的逻辑
		var pre = {};
		pre.index = cur - 1;
		pre.text = '&lsaquo;';
		if(cur != 1){
			pre.clickable = true;
		}
		arr.push(pre);
		// 处理到cur页前的逻辑
		if(cur <= 5){
			for(var i = 1;i < cur;i++){
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}else{
			// 如果cur>5，那么cur前的页面显示_
			var pag = {};
			pag.text = 1;
			pag.index = 1;
			pag.clickable = true;
			arr.push(pag);
			var pag = {};
			pag.text = '...';
			arr.push(pag);
			for(var i = cur - 2;i < cur;i++){
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}
		// 处理到cur页的逻辑
		var pag = {};
		pag.text = cur;
		pag.index = cur;
		pag.cur = true;
		arr.push(pag);
		// 处理到cur页后到逻辑
		if(cur >= total - 4){
			for(var i = cur + 1;i <= total;i++){
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
		}else{
			// 如果cur<total - 4，那么cur后到页要显示_
			for(var i = cur + 1;i <= cur + 2;i++){
				var pag = {};
				pag.text = i;
				pag.index = i;
				pag.clickable = true;
				arr.push(pag);
			}
			var pag = {};
			pag.text = '...';
			arr.push(pag);
			var pag = {};
			pag.text = total;
			pag.index = total;
			pag.clickable = true;
			arr.push(pag);
		}
		// 处理到下一页的逻辑
		var next = {};
		next.index = cur + 1;
		next.text = '&rsaquo;';
		if(cur != total){
			next.clickable = true;
		}
		arr.push(next);
		// 处理到尾页的逻辑
		var toRight = {};
		toRight.index = total;
		toRight.text = '&raquo;';
		if(cur != total){
			toRight.clickable = true;
		}
		arr.push(toRight);
		//console.log(arr);
		return arr;
	};

})(jQuery)


































