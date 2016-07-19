$(function(){
	//创建棋盘上的线
	kongbai={};
for (var i = 0; i < 15; i++) {
		$('<i>')
		.addClass('hang')
		.appendTo('.qipan');
		$("<b>")
		.addClass('shu')
		.appendTo('.qipan')
		for (var j = 0; j < 15; j++) {
			kongbai[i+'-'+j]={x:i,y:j};
			//创建棋子
		  $('<div>')
		  .addClass('qizi')
		  .attr('id',i+'-'+j)
			  .data('pos',{x:i,y:j})
		  .appendTo('.qipan')
		};
	}


	//加开关
	var kaiguan=true;
	var hei={};
	var bai={};
	var isAi;
	$('.renji').on('click',function(){
		isAi=true;
		
	})
	$('.renren').on('click',function(){
		isAi=false;
	})


	var ai=function(){
		var zuobiao;
		var max=-Infinity;
		for(var i in kongbai){
			var weixie=panduan(kongbai[i],hei);
			if(weixie>max){
				max=weixie;
				zuobiao=kongbai[i];
			}
		}
		var zuobiao2;
		var max2=-Infinity;
		for(var i in kongbai){
			var weixie=panduan(kongbai[i],bai);
			if(weixie>max2){
				max2=weixie;
				zuobiao2=kongbai[i];
			}
		}
		return (max>max2)?zuobiao:zuobiao2;


	}
	//给每个棋子添加点击事件
	$('.qipan .qizi').on('click',function(){
		var countdown=30;
		audio.src="luozi.mp3";
		audio.play();
		
		//不要让后面的棋子覆盖住以放的棋子
		if($(this).hasClass('hai')||$(this).hasClass('hei')){
			return;
		}
		var pos=$(this).data('pos');
		if(kaiguan) {
			$(this).addClass('hei');
			hei[pos.x + '-' + pos.y] = true;
			delete kongbai[join(pos.x,pos.y)];
			if (panduan(pos, hei) >= 5) {
				$(".heiying").css('display','block');
				isAi=false;
				$('.qipan .qizi').off('click');
			}
			if (isAi) {
				var pos = ai();
				$('#' + join(pos.x, pos.y))
					.addClass('bai');
				bai[join(pos.x, pos.y)] = true;
				delete kongbai[join(pos.x, pos.y)];
				if (panduan(pos, bai) >= 5) {
					$(".baiying").css('display','block');
					$('.qipan .qizi').off('click');
				}
				return;
			}
			kaiguan=false;
		} else {
			$(this).addClass('bai');
			bai[pos.x + '-' + pos.y] = true;
			if (panduan(pos, bai) >= 5) {
				$(".baiying").css('display','block');
				$('.qipan .qizi').off('click');
			}
			kaiguan = true;
		}
	})


	var join=function(n1,n2){
		return n1+'-'+n2;
	}
	//判断当前的位置（坐标）
	var panduan=function(pos,biao) {
		var h = 1, s = 1, zx = 1, yx = 1;
		var tx, ty;

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx, ty - 1)]) {
			h++;
			ty--;
		}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx, ty + 1)]) {
			h++;
			ty++;
		}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx - 1, ty)]) {
			s++;
			tx--;
		}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx + 1, ty)]) {
			s++;
			tx++;
		}
		tx=pos.x;ty=pos.y;
		while(biao[join(tx-1,ty+1)]){
			zx++;
			tx--;
			ty++;
		}
		//if(s>=5){
		//	return true;
		//}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx + 1, ty - 1)]) {
			zx++;
			tx++;
			ty--;
		}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx - 1, ty - 1)]) {
			yx++;
			tx--;
			ty--;
		}

		tx = pos.x;
		ty = pos.y;
		while (biao[join(tx + 1, ty + 1)]) {
			yx++;
			tx++;
			ty++;
		}

		return Math.max(h, s, zx, yx);
	}





	//重新加载的事件
	$('.restart').on('click',function(){
		location.reload();
	})
})


