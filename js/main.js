//初始化库件
LInit(30, "mylegend", 400, 600, main);

const dataList = {};

function main () {
	LGlobal.aspectRatio = PORTRAIT;
	
	LGlobal.setDebug(false);

	var b = document.body;  
	b.style.margin = "0px";
	b.style.padding = "0px";
	b.style.backgroundColor = "black";

	if (LGlobal.mobile) {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}
	LGlobal.screen(LGlobal.FULL_SCREEN);

	loadGame();
}

function loadGame () {
	var loadData = [
		[
			{path : "./js/ytPreloader.js"},
			{name : "preloader_bar", path : "./images/preloader_bar.jpg"},
			{name : "preloader_bar_background", path : "./images/preloader_bar_background.jpg"},
			{name : "preloader_background", path : "./images/preloader_background.jpg"}
		],
		[
			{path : "./js/common/ytButton.js"},

			{path : "./js/layers/ytHelpLayer.js"},
			{path : "./js/layers/ytAboutLayer.js"},
			{path : "./js/layers/ytMenuLayer.js"},
			{path : "./js/layers/ytOptionLayer.js"},

			{path : "./js/layers/ytGameLayer/ytGameLayer.js"},
			{path : "./js/layers/ytGameLayer/ytBackground.js"},
			{path : "./js/layers/ytGameLayer/ytStreetView.js"},
			{path : "./js/layers/ytGameLayer/ytExplosion.js"},
			{path : "./js/layers/ytGameLayer/ytPoint.js"},
			{path : "./js/layers/ytGameLayer/ytResultBox.js"},

			{path : "./js/layers/ytCarLayer/ytCarLayer.js"},
			{path : "./js/layers/ytCarLayer/ytCar.js"},

			{name : "button_sheet", path : "./images/button_sheet.jpg"},
			{name : "menu_car_icons", path : "./images/menu_car_icons.png"},
			{name : "explosion", path : "./images/explosion.png"},
			{name : "cars_atlas", path : "./images/cars_atlas.png"},
			{name : "button_pause_sheet", path : "./images/button_pause_sheet.png"},
			{name : "default_menu_background", path : "./images/default_menu_background.jpg"},
			{name : "misc_atlas", path : "./images/misc_atlas.png"},
			{name : "numbers", path : "./images/numbers.png"},
			{name : "street_canyon", path : "./images/street_canyon.jpg"},
			{name : "street_city", path : "./images/street_city.jpg"},
			{name : "street_desert", path : "./images/street_desert.jpg"},
			{name : "street_grass", path : "./images/street_grass.jpg"},
			{name : "street_snow", path : "./images/street_snow.jpg"},
			{name : "street_water", path : "./images/street_water.jpg"},
			{name : "help", path : "./images/help.jpg"}
		]
	];

	//load是IIFE.立即执行
	//LLoadManage类是可以用来同时读取图片，文本以及js多种类型的文件。
	//args: list  onUpdate  onComplete
	//分了两次加载
	LLoadManage.load(
		loadData[0],
		null,
		function (r) {
			updateDataList(r);

			var preloader = new ytPreloader();
			addChild(preloader);

			LLoadManage.load(
				loadData[1],
				
				function (p) {
					//更新画面
					preloader.setProgress(p);
				},

				function (r) {
					updateDataList(r);
					preloader.remove();
					addMenuInterface();
				}
			);
		}
	);
}

/**
 * 根据resouceList 更新dataList内容
 * @param {*} resourseList 
 */
function updateDataList (resourseList) {
	for (let i in resourseList) {
		const resource = resourseList[i];

		if (resource instanceof Image) {
			dataList[i] = new LBitmapData(resource);
		} else {
			dataList[i] = resource;
		}
	}
}

function addMenuInterface () {
	var menuInterface = new ytMenuLayer();
	//加入界面
	addChild(menuInterface);
}

function addOptionInterface() {
	var optionInterface = new ytOptionLayer();
	addChild(optionInterface);
}

function addGameInterface (car, place) {
	var gameInterface = new ytGameLayer(car, place);
	addChild(gameInterface);
}

function addHelpInterface() {
	var helpInterface = new ytHelpLayer();
	addChild(helpInterface);
}

function addAboutInterface() {
	var aboutInterface = new ytAboutLayer();
	addChild(aboutInterface);
}