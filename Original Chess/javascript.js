let array;
let whatTurn = 0;
let cntRow = 1;
let isChessBoard = false;
let isPlayII = 0;
let isClickPlayComp = false;
let kingMadeTurn = false;
let firstStart = true;
let clickContinue = false;
//1 - ИИ играет белыми
//2 - ИИ играет черными
let setHtml = "<div id=board_div><table id=board cellpadding=0 cellspacing=0></table></div><div class=block_turns><div class=garbage_block></div><div class=turns_write><span id=back_to_menu>Назад в меню</span></div></div>";
//0 - white
//1 - black
$(document).ready(init);

function init(){
	if (localStorage.getItem("whatTurn") == null)
		localStorage.setItem("whatTurn", "null");
	if (localStorage.getItem("downloadChess") == null)
		localStorage.setItem("downloadChess", "null");
	if (localStorage.getItem("whatTurn") != "null"){
		whatTurn = localStorage.getItem("whatTurn");
		//alert(1);
	}
	if (!isChessBoard){

		createMenu();
		return false;
	}
	//localStorage("downloadChess", "1");
	$(setHtml).appendTo("body");
	$("<div id=empty_block></div>").appendTo("body");
	$("#empty_block").css({"height" : "498px", "width": $(document).width() - 1006 + "px"});
	$("<div id=lower_white>Белые:</div>").appendTo("body");
	$("<div id=lower_black>Черные:</div>").appendTo("body");
	$("#back_to_menu").click(backToMenu);
	array = new Array(100);
	for (let line = 0; line < 10; ++line){
		$("<tr></tr>").appendTo("#board");
	}
	for (let column = 0; column < 10; ++column){
		//alert(1);
		//let st = "<div class=cell" + i.toString() + "></div>";
		//alert(st);
		$("<td><div class=cell></div></td>").appendTo("tr");
	}
	
	$(".cell").each(function(index){
		$(this).click(clickCell);
		$(this).attr("id", "cell" + index.toString());
		if ((index >= 0 && index <= 9) || (index >= 90 && index <= 99)){
			$(this).css({ "height":"25px"});
			if (index % 10 >= 1 && index % 10 <= 8){
				$(this).text(String.fromCharCode(64 + index % 10));
			$(this).css({"line-height": "25px"});
			}
		}
		if (index % 10 == 0 || index % 10 == 9){
			if (Math.floor(index / 10) >= 1 && Math.floor(index / 10) <= 8){
				$(this).text((9 - Math.floor(index / 10)).toString());
			}
			$(this).css({"width": "25px"});
			$(this).css({"line-height": "56px"});
		}
		if ((index + Math.floor(index / 10))% 2 == 0 && index % 10 >= 1 && index % 10 <= 8 && index >= 10 && index < 90)
			$(this).css({"background-color": "#CCCCCC"});
		else if (index % 10 >= 1 && index % 10 <= 8 && index >= 10 && index < 90)
			$(this).css({"background-color": "grey"});
		else{
			$(this).css({"background-color": "#616161"});
		}
		
		//alert(index);
	});
	if (firstStart && !clickContinue){
		initTable();
		firstStart = false;
	}
	setFigures();
	setDraggable();
	setDroppable();
	
}
function initTable(){
	for (let i = 11; i <= 88; ++i)
		localStorage.setItem(i.toString(), "");
	console.log(localStorage.getItem("11"));
	for (let index = 11; index <= 88; ++index){
		if (index >= 71 && index <= 78){
			localStorage.setItem(index.toString(), "img/pes_w.png");
			//$("<img src=img/pes_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 81 || index == 88){
			localStorage.setItem(index.toString(), "img/lad_w.png");
			//$("<img src=img/lad_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 82 || index == 87){
			localStorage.setItem(index.toString(), "img/kon_w.png");
			//$("<img src=img/kon_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 83 || index == 86){
			localStorage.setItem(index.toString(), "img/off_w.png");
			//$("<img src=img/off_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 84){
			localStorage.setItem(index.toString(), "img/fer_w.png");
			//$("<img src=img/fer_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		
		if (index == 85){
			localStorage.setItem(index.toString(), "img/kor_w.png");
			//$("<img src=img/kor_w.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index >= 21 && index <= 28){
			localStorage.setItem(index.toString(), "img/pes_b.png");
			//$("<img src=img/pes_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 11 || index == 18){
			localStorage.setItem(index.toString(), "img/lad_b.png");
			//$("<img src=img/lad_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 12 || index == 17){
			//$("<img src=img/kon_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
			localStorage.setItem(index.toString(), "img/kon_b.png");
		}
		if (index == 13 || index == 16){
			localStorage.setItem(index.toString(), "img/off_b.png");
			//$("<img src=img/off_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 14){
			localStorage.setItem(index.toString(), "img/fer_b.png");
			//$("<img src=img/fer_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
		if (index == 15){
			localStorage.setItem(index.toString(), "img/kor_b.png");
			//$("<img src=img/kor_b.png class=figure id=img" + index.toString() + ">").appendTo(this);
		}
	}
	
}

function setFigures(){
	for (let i = 11; i <= 88; ++i){
		let vl = localStorage.getItem(i.toString());
		if (i == 31)
			console.log(vl);
		if (vl != ""){
			$("<img src=" + vl + " class=figure id=img" + i + ">").appendTo($("#cell" + i));
		}
	}
}
function clickCell(){
	let s = $(this).html();
	
}
function setDraggable(){

	$(".figure").draggable();
}
function disableDraggable(){
	$(".figure").draggable("disable");
}
function setDroppable(){
	//let ch = false;
	$(".cell").droppable({
		drop: function(event, ui){
			//console.log(this);
			//console.log(ui);
			let frCoord = ui.draggable.attr("id").substring(3);
			let toCoord = this.id.substring(4);
			let source = $("#cell" + frCoord.toString() + " img").attr("src");
			//alert(frCoord);
			//alert(toCoord);
			let whoWin = "o";
			let fig = "-";
			//console.log(frCoord);
			//console.log(toCoord);
			if ($("#cell" + toCoord.toString()).html() != ""){
					fig = $("#cell" + toCoord.toString() +" img").attr("src");
				 	if (fig.substring(4, 7) == "kor"){
				 		if (whatTurn % 4 <= 1)
				 			whoWin = "w";
				 		else
				 			whoWin = "b";

				 	}
				 }
			//isIiTurn = false;
			if (isValid(frCoord, toCoord, source.substring(4, 7), source.substring(8, 9), false) && (isPlayII == 0 || (isPlayII == 1 && whatTurn % 4 >= 2) || (isPlayII == 2 && whatTurn % 4 <= 1))){
				//ch = true;
				//alert("#cell" + frCoord.toString());
				 whatTurn++;
				 localStorage.setItem("whatTurn", whatTurn.toString());
				 $("#cell" + frCoord.toString()).html("");
				// alert("<img src=" + source + " class=figure id=" + toCoord.toString());
				writeTurn(frCoord, toCoord, source.substring(4, 7));
				if (source.substring(4, 7) == "pes" && toCoord >= 11 && toCoord <= 18)
					source = "img/fer_" + source.substring(8, 9) + ".png";
				localStorage.setItem(frCoord.toString(), "");
				localStorage.setItem(toCoord.toString(), source);
				 $("#cell" + toCoord.toString()).html("<img src=" + source + " class=figure id=img" + toCoord.toString() +">");
				 
				 setDraggable();

				 if (fig != "-"){
				 	if ((whatTurn - 1) % 4 <= 1){
				 		addWhite(fig);
				 	}
				 	else
				 		addBlack(fig);
				 }
				// alert(isPlayII);
				// alert(whatTurn);
				if (whoWin == "w"){
				 	alert("Победа белых");
				 	localStorage.setItem("downloadChess", null);
				 	disableDraggable();
				 }
				 else if (whoWin == "b"){
				 	alert("Победа черных");
				 	localStorage.setItem("downloadChess", null);
				 	disableDraggable();
				 }
				 else{
				 if (whatTurn % 2 == 0 && whatTurn != 0 && isPlayII == 0){
				 	setTimeout(createNewTable, 200);
				 }
				 else if (whatTurn % 2 == 0 && whatTurn != 0 && isPlayII != 0){
				 	//isIiTurn = true;
				 	setTimeout(makeIiTurn, 1000);
				 	setTimeout(makeIiTurn, 2000);
				 	//isIiTurn = false;
				 }
				 				}
				//alert(ms.id);
			}
			else{
				$("#cell" + frCoord.toString() + " img").css({"left": "0px", "right" : "0px", "top" : "0px"});
			}
		}
	});
	$(":not(.cell)").droppable({
		drop: function(event, ui){
			let frCoord = ui.draggable.attr("id").substring(3);
			$("#cell" + frCoord.toString() + " img").css({"left": "0px", "right" : "0px", "top" : "0px"});
		}
	});

}
function isValid(fromCell, cellTo, typeFigure, color, isIiTurn){
	
	if (fromCell == cellTo)
		return 0;
	//alert(isIiTurn);
	//alert(fromCell);
	//alert(cellTo);
//	console.log(typeFigure);
	//console.log(color);
	//console.log(isIiTurn);
	//alert($("#cell" + fromCell +" img").attr("src").charAt(8));
	//alert(whatTurn);
	if ($("#cell" + fromCell +" img").attr("src").charAt(8) == "w" && whatTurn % 4 >= 2)
		return 0;
	if ($("#cell" + fromCell +" img").attr("src").charAt(8) == "b" && whatTurn % 4 <= 1)
		return 0;
	let xFrom = fromCell % 10;
	let yFrom = Math.floor(fromCell / 10);
	let xTo = cellTo % 10;
	let yTo = Math.floor(cellTo / 10);
	if (!(cellTo >= 10 && cellTo < 90 && cellTo % 10 != 0 && cellTo % 10 != 9))
		return false;
	if (color == "w"){
		//alert(isPlayII);
		//console.log(isIiTurn);
		if (typeFigure == "pes" && !isIiTurn){
			if (fromCell - cellTo == 10 || (fromCell - cellTo == 20 && Math.floor(fromCell / 10) == 7)){
				if ($("#cell" + cellTo).html() == "" && (fromCell - cellTo != 20 ||  $("#cell" + (fromCell - 10)).html() == ""))
					return 1;
			}
			if (fromCell - cellTo == 9 || fromCell - cellTo == 11){
				if ($("#cell" + cellTo).html() != "" && $("#cell" + cellTo +" img").attr("src").charAt(8) == "b")
					return 1;
			}
		}
		if (typeFigure == "pes" && isIiTurn){
			if ( cellTo - fromCell == 10 || ( cellTo -fromCell == 20 && Math.floor(fromCell / 10) == 2)){
				if ($("#cell" + cellTo).html() == "" && ( cellTo - fromCell != 20 ||  $("#cell" + (fromCell + 10)).html() == ""))
					return 1;
			}
			if (fromCell - cellTo == -9 || fromCell - cellTo == -11){
				if ($("#cell" + cellTo).html() != "" && $("#cell" + cellTo +" img").attr("src").charAt(8) == "b")
					return 1;
			}
		}

		if (typeFigure == "kon"){
			if ((Math.abs(xTo - xFrom) == 2 && Math.abs(yTo - yFrom) == 1) || (Math.abs(xTo - xFrom) == 1 && Math.abs(yTo - yFrom) == 2)){
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
					return 1;
			}
		}
		if (typeFigure == "off"){
			if (Math.abs(xTo - xFrom) == Math.abs(yTo - yFrom)){
				for (let xPos = xFrom, yPos = yFrom; xPos != xTo && yPos != yTo;){
					if (xTo < xPos)
						xPos--;
					else
						xPos++;
					if (yTo < yPos)
						yPos--;
					else
						yPos++;
					if (xPos == xTo)
						break;
					if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
						return 0;
				}
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
					return 1;
				
			}
		}
		if (typeFigure == "lad"){
			if (xTo == xFrom || yTo == yFrom){
				
					for (let xPos = xFrom, yPos = yFrom;;){
						if (xPos < xTo)
							xPos++;
						else if (xPos > xTo)
							xPos--;
						if (yPos < yTo)
							yPos++;
						else if (yPos > yTo)
							yPos--;
						//alert(yPos);
						//alert(xPos);
						if (xPos == xTo && yPos == yTo)
							break;
						if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
							return 0;

					}
					if ($("#cell" + cellTo).html() == "")
						return 1;
					else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
						return 1;
				
			}
		}
		if (typeFigure == "fer"){
			if (Math.abs(xTo - xFrom) == Math.abs(yTo - yFrom)){
				for (let xPos = xFrom, yPos = yFrom; xPos != xTo && yPos != yTo;){
					if (xTo < xPos)
						xPos--;
					else
						xPos++;
					if (yTo < yPos)
						yPos--;
					else
						yPos++;
					if (xPos == xTo)
						break;
					if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
						return 0;
				}
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
					return 1;
			}
			else if (xTo == xFrom || yTo == yFrom){
				for (let xPos = xFrom, yPos = yFrom;;){
						if (xPos < xTo)
							xPos++;
						else if (xPos > xTo)
							xPos--;
						if (yPos < yTo)
							yPos++;
						else if (yPos > yTo)
							yPos--;
						//alert(yPos);
						//alert(xPos);
						if (xPos == xTo && yPos == yTo)
							break;
						if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
							return 0;

					}
					if ($("#cell" + cellTo).html() == "")
						return 1;
					else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
						return 1;
			}
		}
		if (typeFigure == "kor"){
			//if (Math.abs(xTo - xFrom) == 2 && !kingMadeTurn){
				//if (xTo - xFrom == -2 && $("#cell" + (fromCell - 1)).html() == "" && $("#cell" + (fromCell - 2)).html() == "" && $("#cell" + (fromCell - 3)).html() == "" && $("#cell" + (fromCell - 4)).html() != ""){
					//if ($("#cell" + (fromCell - 4) + " img").attr("src").substring(4, 9) == "lad_w"){

					//}
				//}
				//kingMadeTurn = true;
			//}
			if (Math.abs(xTo - xFrom) <= 1 && Math.abs(yTo - yFrom) <= 1){
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "w")
					return 1;
			}
		}
	}
	if (color == "b"){
		//alert(isIiTurn);
		if (typeFigure == "pes" && !isIiTurn){
			if (fromCell - cellTo == 10 || (fromCell - cellTo == 20 && Math.floor(fromCell / 10) == 7)){
				if ($("#cell" + cellTo).html() == "" && (fromCell - cellTo != 20 ||  $("#cell" + (fromCell - 10)).html() == ""))
					return 1;
			}
			if (fromCell - cellTo == 9 || fromCell - cellTo == 11){
				if ($("#cell" + cellTo).html() != "" && $("#cell" + cellTo +" img").attr("src").charAt(8) == "w")
					return 1;
			}
		}
		if (typeFigure == "pes" && isIiTurn){
			if ( cellTo - fromCell == 10 || ( cellTo -fromCell == 20 && Math.floor(fromCell / 10) == 2)){
				if ($("#cell" + cellTo).html() == "" && ( cellTo - fromCell != 20 ||  $("#cell" + (fromCell + 10)).html() == ""))
					return 1;
			}
			if (fromCell - cellTo == -9 || fromCell - cellTo == -11){
				if ($("#cell" + cellTo).html() != "" && $("#cell" + cellTo +" img").attr("src").charAt(8) == "w")
					return 1;
			}
		}
		if (typeFigure == "kon"){
			if (typeFigure == "kon"){
				if ((Math.abs(xTo - xFrom) == 2 && Math.abs(yTo - yFrom) == 1) || (Math.abs(xTo - xFrom) == 1 && Math.abs(yTo - yFrom) == 2)){
					if ($("#cell" + cellTo).html() == "")
						return 1;
					else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
						return 1;
				}
			}
		}
		if (typeFigure == "off"){
			if (Math.abs(xTo - xFrom) == Math.abs(yTo - yFrom)){
				for (let xPos = xFrom, yPos = yFrom; xPos != xTo && yPos != yTo;){
					if (xTo < xPos)
						xPos--;
					else
						xPos++;
					if (yTo < yPos)
						yPos--;
					else
						yPos++;
					if (xPos == xTo)
						break;
					if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
						return 0;
				}
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
					return 1;
			}
		}
		if (typeFigure == "lad"){
			if (xTo == xFrom || yTo == yFrom){
				for (let xPos = xFrom, yPos = yFrom;;){
						if (xPos < xTo)
							xPos++;
						else if (xPos > xTo)
							xPos--;
						if (yPos < yTo)
							yPos++;
						else if (yPos > yTo)
							yPos--;
						//alert(yPos);
						//alert(xPos);
						if (xPos == xTo && yPos == yTo)
							break;
						if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
							return 0;

					}
					if ($("#cell" + cellTo).html() == "")
						return 1;
					else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
						return 1;
			}
		}
		if (typeFigure == "fer"){
			if (Math.abs(xTo - xFrom) == Math.abs(yTo - yFrom)){
				for (let xPos = xFrom, yPos = yFrom; xPos != xTo && yPos != yTo;){
					if (xTo < xPos)
						xPos--;
					else
						xPos++;
					if (yTo < yPos)
						yPos--;
					else
						yPos++;
					if (xPos == xTo)
						break;
					if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
						return 0;
				}
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
					return 1;
			}
			else if (xTo == xFrom || yTo == yFrom){
				for (let xPos = xFrom, yPos = yFrom;;){
						if (xPos < xTo)
							xPos++;
						else if (xPos > xTo)
							xPos--;
						if (yPos < yTo)
							yPos++;
						else if (yPos > yTo)
							yPos--;
						//alert(yPos);
						//alert(xPos);
						if (xPos == xTo && yPos == yTo)
							break;
						if ($("#cell" + (yPos * 10 + xPos).toString()).html() != "")
							return 0;

					}
					if ($("#cell" + cellTo).html() == "")
						return 1;
					else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
						return 1;
			}
		}
		if (typeFigure == "kor"){
			if (Math.abs(xTo - xFrom) <= 1 && Math.abs(yTo - yFrom) <= 1){
				if ($("#cell" + cellTo).html() == "")
					return 1;
				else if ($("#cell" + cellTo +" img").attr("src").charAt(8) != "b")
					return 1;
			}
		}
	}
	return 0;
}
function createNewTable(){
	let imgArr = [];
	$("img:not(.not_image)").each(function(){
		let id = parseInt($(this).attr("id").substring(3, 10));
		let href = $(this).attr("src");
		let newId = 99 - id;

		$(this).attr("id" , "img" + newId);
		$(this).appendTo($("#cell" + newId));
		//$(this).html("");
		//localStorage.setItem()
		//$("#cell" + newId)[0].append($(this));
		//$(this).remove();
	});
	for (let i = 11; i <= 89; ++i)
		localStorage.setItem(i.toString(), "");
	$("img:not(.not_image)").each(function(){
		let id = parseInt($(this).attr("id").substring(3, 10));
		let href = $(this).attr("src");
		localStorage.setItem(id.toString(), href);
	});
	
	for (let i = 10; i <= 80; i += 10){
		let vl = parseInt($("#cell" + i).html());
		$("#cell" + i).html((9 - vl).toString());
	}
	for (let i = 19; i <= 89; i += 10){
		let vl = parseInt($("#cell" + i).html());
		$("#cell" + i).html((9 - vl).toString());
	}
	for (let i = 1; i <= 9; ++i){
		let vl = $("#cell" + i).html().charCodeAt(0);
		$("#cell" + i).html(String.fromCharCode("H".charCodeAt(0) - vl + "A".charCodeAt(0)));
	}
	for (let i = 91; i <= 99; ++i){
		let vl = $("#cell" + i).html().charCodeAt(0);
		$("#cell" + i).html(String.fromCharCode("H".charCodeAt(0) - vl + "A".charCodeAt(0)));
	}
}
function writeTurn(fromCoord, toCoord, typeFigure){
	let st = "";
	if (typeFigure == "pes"){
		st += "";
	}
	if (typeFigure == "kon"){
		st += "N";
	}
	if (typeFigure == "lad"){
		st += "R";
	}
	if (typeFigure == "off"){
		st += "B";
	}
	if (typeFigure == "fer"){
		st += "Q";
	}
	if (typeFigure == "kor"){
		st += "K";
	}
	st += $(".cell")[toCoord % 10].innerHTML;
	st += $(".cell")[toCoord - toCoord % 10].innerHTML;
	if (whatTurn % 2 == 1){
		$("<div class=row_turns>" + cntRow + ". "+ st + "</div>").appendTo($(".turns_write"));
		cntRow++;
	}
	else{
		let ms = $(".row_turns");
		try{
		ms[ms.length - 1].innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + st;
		}
		catch(e){

		}
	}
	
}
function createMenu(){
	let menuHtml = "<div id=btn_blck><button id=game_rules>Правила игры</button><button id=play_friend>Играть с другом</button><button id=play_comp>Играть с компьютером</button></div>";
	//alert(localStorage.getItem("downloadChess") == "null");
	if (localStorage.getItem("downloadChess") != "null"){
		//alert(2);
		menuHtml = "<div id=btn_blck><button id=game_rules>Правила игры</button><button id=play_friend>Играть с другом</button><button id=play_comp>Играть с компьютером</button><button id=continue>Продолжить игру</button></div>";
	
	$(menuHtml).appendTo($("body"));

	$("#play_friend").click(onClickPlayFriend);
	$("#play_comp").click(onClickPlayComp);
	$("#game_rules").click(onClickGameRules);
	$("#continue").click(onClickContinue);
	}
	else{
		$(menuHtml).appendTo($("body"));

	$("#play_friend").click(onClickPlayFriend);
	$("#play_comp").click(onClickPlayComp);
	$("#game_rules").click(onClickGameRules);
	}
}
function onClickContinue(){
	if (localStorage.getItem("downloadChess") == "1"){
		clickContinue = true;
		onClickPlayFriend();

		}
	else if (localStorage.getItem("downloadChess") == "2"){
		clickContinue = true;
		$("body").html("");
		isChessBoard = true;
		localStorage.setItem("downloadChess", "2");
		isPlayII = 2;
		init();
	}
	else if (localStorage.getItem("downloadChess") == "3"){
		clickContinue = true;
		isChessBoard = true;
		$("body").html("");
		isPlayII = 1;
		localStorage.setItem("downloadChess", "3");
		init();
		//createNewTable();
		//isIiTurn = true;
		//alert(isIiTurn);
		//setTimeout(makeIiTurn, 1000);
		//alert(isIiTurn);
		//setTimeout(makeIiTurn, 2000);
	}
}
function onClickPlayFriend(){
	isChessBoard = true;
	localStorage.setItem("downloadChess", "1");
	$("body").html("");
	init();
}
function onClickPlayComp(){
	if (isClickPlayComp)
		return;
	isClickPlayComp = true;
	$("#btn_blck").append("<button id=white_play>&rarr;Белые</button><button id=black_play>&rarr;Черные</button>");
	$("#white_play").click(function(){
		$("body").html("");
		isChessBoard = true;
		localStorage.setItem("downloadChess", "2");
		isPlayII = 2;
		init();
	});
	$("#black_play").click(function(){
		isChessBoard = true;
		$("body").html("");
		isPlayII = 1;
		localStorage.setItem("downloadChess", "3");
		init();
		createNewTable();
		//isIiTurn = true;
		//alert(isIiTurn);
		if (whatTurn % 4 <= 1)
		setTimeout(makeIiTurn, 1000);
		//alert(isIiTurn);
		if (whatTurn % 4 <= 1)
		setTimeout(makeIiTurn, 2000);
		//alert(1);
		//alert(isIiTurn);
		//isIiTurn = false;
	});
}
function onClickGameRules(){
	$(this).html("Игрок за ход может передвигать фигуры 2 раза. Шаха нет, короля можно срубить. Игрок, потерявший короля, считается проигравшим.");
}
function addWhite(fig){
	//alert(fig);
	//
	$("#lower_white").append("<img src=" + fig +" height=30px width=30px class=not_image>");
}
function addBlack(fig){
	//alert(fig);
	$("#lower_black").append("<img src=" + fig +" height=30px width=30px class=not_image>");

}
function backToMenu(){
	$("body").html("");
	whatTurn = 0;
	cntRow = 1;
	isChessBoard = false;
	isPlayII = 0;
	isClickPlayComp = false;
	kingMadeTurn = false;
	initTable();
	localStorage.setItem("whatTurn", null);
	localStorage.setItem("downloadChess", null);
	createMenu();
}
function makeIiTurn(){
	//let all_v = 0;
				 	//alert(1);
	//let mini = 0;
	for (let i = 0; i < 1000; ++i){
		let from = Math.floor(Math.random() * 79 + 11);
		let to = Math.floor(Math.random() * 79 + 11);
		
		let sbv1 = Math.floor(from / 10);
		let sbv2 = Math.floor(to / 10);
		//sbv1 = 21;
		//sbv2 = 31;
		let op = true;
		if ($("#cell" + from).html() != "" && from % 10 >= 1 && from % 10 <= 8 && to % 10 >= 1 && to % 10 <= 8 && sbv1 >= 1 && sbv1 <= 8 && sbv2 >= 1 && sbv2 <= 8){
			//console.log($("#cell" + from + " img").attr("src"));
			let sorc = $("#cell" + from + " img").attr("src");
			
				 if ((sorc.substring(8, 9) == "w" && isPlayII == 1) || (sorc.substring(8, 9) == "b" && isPlayII == 2)){
					if (isValid(from, to, sorc.substring(4, 7), sorc.substring(8, 9), op)){
						//console.log(from);
						//console.log(to);
						//alert("ok");
				 		//alert(from);
				 		//alert(to);
				 		let vl1 = 0, vl2 = -1;
				 		if (sorc.substring(4, 7) == "pes")
				 			vl1 = 1;
				 		if (sorc.substring(4, 7) == "kon" || sorc.substring(4, 7) == "off")
				 			vl1 = 3;
				 		if (sorc.substring(4, 7) == "fer")
				 			vl1 = 9;
				 		if (sorc.substring(4, 7) == "lad")
				 			vl1 = 5;
				 		if (sorc.substring(4, 7) == "kor")
				 			vl1 = 100;
				 		vl2 = vl1 - 1;
				 		if ($("#cell"+ to.toString()).html() != ""){
				 			let ff = $("#cell" + to.toString() +" img").attr("src").substring(4, 7);
				 			if (ff == "pes")
				 				vl2 = 1;
				 			if (ff == "kon" || ff == "off")
				 				vl2 = 3;
				 			if (ff == "fer")
				 				vl2 = 9;
				 			if (ff == "lad")
				 				vl2 = 5;
				 			if (ff == "kor")
				 				vl2 = 100;
				 		}
				 		//alert(vl1, vl2);
				 		let fig = "-";
				 		if (vl1 - vl2 <= 5){
				 		if ($("#cell" + to.toString()). html() != ""){
				 			fig = $("#cell" + to.toString() +" img").attr("src");
				 		}
				 		$("#cell" + from.toString()).html("");
				 		localStorage.setItem(from.toString(), "");
				 		localStorage.setItem(to.toString(), sorc);
						$("#cell" + to.toString()).html("<img src=" + sorc + " class=figure id=img" + to.toString() +">");
						whatTurn++;
						localStorage.setItem("whatTurn", whatTurn.toString());
						writeTurn(from, to, sorc.substring(4, 7));
						if (fig != "-"){
							if (isPlayII == 1)
								addWhite(fig);
							else
								addBlack(fig);
						}
				 		return;
				 		}
				 	}
				 	}
				 }
			}		 							 			
}




















