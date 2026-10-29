/****************************************************
	共通関数
****************************************************/

/****************************************************
	関数名	IsApp
	機能		Safariかアプリかをチェックする
	
	入力		なし
	出力		bFlg	true:アプリ false:Safari
****************************************************/
function IsApp(){
	
	// SafariのMobileシミュレーター対策
	var sLocation = location.href;

	//console.log("16:protocol=" + window.location.protocol + "  sLocation=" + sLocation + "   /navigator.userAgent=" + navigator.userAgent);
	
	// Androidだった場合
	if (window.cordova && window.cordova.platformId === 'android') {
		return true;
	}

	// iOSシミュレーター用
	if (sLocation.indexOf("Werewolf.app") > 0) {
		console.log("23:This is App");
		return true;
	}
	
	// サーバーにアップされたウェブページの場合
	if ((window.location.protocol == "file:" && sLocation.indexOf("file:///private") < 0) || sLocation.indexOf("127.0.0.1") > 0 || sLocation.indexOf("localhost") > 0) {
		return false;
	} else {
		console.log("23:This is App");
		return true;
	}
	
}
function CheckPlatform(){
	var sPlatform = "";
	var sUserAgent = "";

	if (gbIsApp) {

		if (device.platform) {
			sPlatform = device.platform;
		} else {
			sPlatform = "iOS";
		}
		
		
	// アプリでない場合
	} else {
		sUserAgent = navigator.userAgent;
		
		console.log("47:UA="+sUserAgent);

		if(sUserAgent.indexOf("Mac OS")>0){
			sPlatform = "MacOSBrowser";
		} else {
			sPlatform = "AndroidBrowser";
		}
	}
	return sPlatform;
}

/****************************************************
	関数名	onPageLoad
	機能		ページがロードし終わったあとに実行する関数を設定する。
	
	入力		sPageId			ページID
			sFunction		関数（文字列として指定）
			sTiming 		"Start" or "End" Animationタイミング
	出力		なし
*****************************************************/
function onPageLoad(sPageId, sFunction, sTiming) {
	
	var oPage = document.getElementById(sPageId);
	var sId = "#" + sPageId;
	
	// 実行タイミングを設定する
	var sEvent = "pageAnimation" + sTiming;

	// Page animation callback events
	$("#" + sPageId).on(sEvent, function(e, info){

		if(info.direction=='in'){
			// 関数を実行する
			Log("onPageLoad " + sTiming + ":" + sPageId + "-> " + sFunction);
			eval(sFunction);
		}

	});

}

/****************************************************
	関数名	ShuffleArray
	機能		配列をランダムに並び替える
	
	使い方	ShuffleArray(aArray);
****************************************************/
function ShuffleArray(aArray){
	var iCnt = aArray.length;
	
	while(--iCnt){
		var iRandom = Math.floor(Math.random()* (iCnt+1));
		
		if(iRandom == iCnt) continue;
		var sBaffer = aArray[iCnt];
		aArray[iCnt] = aArray[iRandom];
		aArray[iRandom] = sBaffer;
	}
	return aArray;
}

/****************************************************
	関数名	SelectRandom
	機能		配列からランダムに１つ選ぶ
	
	入力		aArray
	出力		sValue
	使い方	iNum = SelectRandom(aArray);
****************************************************/
function SelectRandom(aArray){
	var iNum = Math.floor(Math.random() * aArray.length);
	
	// これは発生しないはずだが、配列数と同じランダム値になった場合
	if(iNum >= aArray.length){
		iNum = aArray.length - 1;
    }
	return aArray[iNum];
}

/****************************************************
	関数名	InitArray
	機能		メンバ数と初期値を指定すると、すべての要素に初期値を設定する
	
	入力		sValue
			iLength
	出力		なし
	
	使い方
		aArray = InitArray(0, aArray.length);
****************************************************/
function InitArray(sValue, iLength){
	var aArray = [];
	var iCnt;
	for(iCnt=0; iCnt < iLength; iCnt++){
		aArray[iCnt] = sValue;
	}
	return aArray;
}

/****************************************************
	関数名	InitJsonArray
	機能	JSON形式のすべての要素に初期値を設定する
	
	入力	aJson JSON形式の連想配列
		   sValue 全変数に代入したい値
	出力		なし
	
	使い方
		aArray = InitArray(0, aArray.length);
****************************************************/
function InitJsonArray(aJson, sValue) {
	
	for (let key in aJson) {
		aJson[key] = sValue;
	}
	return aJson;
}

/****************************************************
	関数名	CheckMatchArray
	機能		対象の値が、リストに含まれるかチェックする
	
	入力		sValue			対象値
			aArray			検索対象リスト
	出力		bMatchFlg		マッチした: true
****************************************************/
function CheckMatchArray(sValue, aArray){
	var iCnt;
	
	// 配列に対して繰り返す
	for(iCnt=0; iCnt < aArray.length; iCnt++){

		// 対象の値が、リストの値と一致した場合
		if(sValue == aArray[iCnt]){
			return true;
		}
	}
	
	return false;
}


/****************************************************
	関数名	GetRank
	機能		対象の数字が、対象配列の中で何番目になるか順位を取得する
	
	入力		iNum		対象数値
			aArray		対象リスト
	出力		iRank		ランキング順位
	
	処理概要
		
****************************************************/
function GetRank(iNum, aArray){
	var iCnt = 0;
	var iRank = 0;
	
	var aSortArray = aArray.concat();
	
	// ポイント配列を降順ソートする
//	aSortArray.sort().reverse();
	aSortArray.sort(function(a,b) {return a-b;}).reverse();
	
	// ポイント配列に対して繰り返す
	for(iCnt=0; iCnt<aSortArray.length; iCnt++){
		
		// 順位をインクリメントする
		iRank++;
		
		// 引数となるポイントと配列のポイントを比較する
		if(iNum >= aSortArray[iCnt]){
			// 現在の順位を返して終了する
			return iRank;
		}
	}
	return -1;
}

/****************************************************
関数名	SetFixPosition
機能		画面上に固定表示する

入力		sId		対象となるオブジェクト
		iTop	Top位置
		iLeft	Left位置
出力		なし
*****************************************************/
var iFixPositionTimeId;
function SetFixPosition(sId, sTop, sLeft) {
	var oLayer = document.getElementById(sId);
	var iTop, iLeft;
	
	// bottom設定
	if(sTop == "bottom"){
		iTop = 460 - document.getElementById(sId).offsetHeight;
	} else {
		iTop = sTop - 0;
	}
	
	if(sLeft == "right"){
		iLeft = 320 - document.getElementById(sId).offsetWidth;
	} else {
		iLeft = sLeft - 0;
	}
	
	// 表示位置を取得する
	oLayer.style.top = (GetScrollPosition("top") +iTop ) + "px";
	oLayer.style.left = (GetScrollPosition("left") + iLeft) + "px";
}
/****************************************************
関数名	StartFixPosition
機能		SetFixPosition状態をスタートする

入力		sId			対象となるオブジェクト
	bStartFlg	セット開始フラグ　(1: Start  0: Stop)
	iTop		Top位置(数字 or 'bottom')
	iLeft		Left位置(数字 or 'right')
出力		なし
*****************************************************/
function StartFixPosition(sId, bStartFlg, iTop, iLeft) {
	var iInterval = 10;
	
	// 現在動いているFix動作をストップする
	clearInterval(iFixPositionTimeId);
	
	// セット開始フラグがオフの場合
	if(bStartFlg != 1) {
		// 終了する
		return;
	}
	
	// SetFixPositionを実行する
	iFixPositionTimeId = setInterval("SetFixPosition('" + sId + "','" + iTop + "','" + iLeft + "')", iInterval);
}

function GetScrollPosition(sMode) {
	var iScrollPosition;
	
	if(sMode == "left"){
		iScrollPosition = document.body.scrollLeft;
	} else {
		iScrollPosition = document.body.scrollTop;
	}
	return iScrollPosition;
}


/****************************************************
	CAMERA関連
****************************************************/
function PictureSourceType() {};
PictureSourceType.PHOTO_LIBRARY = 0;
PictureSourceType.CAMERA = 1;

var gsImgId = "";	// 表示先画像ID
var gbImgFlg = 0;	// 連続動作バグの制御用フラグ
var imgFaceBuf = ""; // 画像保存バッファ
var giQuality = 90; // 圧縮品質 低 0 - 100 高
var giTargetSize = 300; // 画像の横幅


async function openWebcam(sImgId) {
    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {
        alert("Camera requires HTTPS or localhost.");
        return;
    }

    var stream;

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
    } catch (error) {
        alert("Unable to access webcam: " + error.message);
        return;
    }

    var overlay = document.createElement("div");
    overlay.style.cssText =
        "position:fixed;inset:0;background:#000;" +
        "z-index:99999;display:flex;flex-direction:column;" +
        "align-items:center;justify-content:center;gap:15px;";

    var video = document.createElement("video");
    video.autoplay = true;
    video.playsInline = true;
    video.muted = true;
    video.srcObject = stream;
    video.style.cssText =
        "max-width:90%;max-height:70%;object-fit:contain;";

    var capture = document.createElement("button");
    capture.textContent = "Take Picture";
    capture.style.cssText =
        "padding:15px 30px;font-size:18px;";

    var cancel = document.createElement("button");
    cancel.textContent = "Cancel";
    cancel.style.cssText =
        "padding:10px 25px;font-size:16px;";

    function closeCamera() {
        stream.getTracks().forEach(function(track) {
            track.stop();
        });
        overlay.remove();
    }

    capture.onclick = function() {
        if (!video.videoWidth || !video.videoHeight) {
            alert("Camera is not ready yet.");
            return;
        }

        var canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

        var img = new Image();

        img.onload = function() {
            try {
                imgFaceBuf = ResizeAndCropImage(
                    img,
                    giTargetSize
                );

                if (sImgId) {
                    $(sImgId).attr("src", imgFaceBuf);

                    if (sImgId === "#avatar") {
                        avatar = imgFaceBuf.replace(
                            /^data:image\/jpeg;base64,/,
                            ""
                        );
                        SaveData("avatar");
                    }
                }
                closeCamera();
            } catch (error) {
                alert("Unable to save picture: " + error.message);
            }
        };

        img.src = canvas.toDataURL("image/jpeg", giQuality / 100);
    };

    cancel.onclick = closeCamera;

    overlay.appendChild(video);
    overlay.appendChild(capture);
    overlay.appendChild(cancel);
    document.body.appendChild(overlay);

    video.play().catch(function(error) {
        console.error("Camera preview error:", error);
        closeCamera();
    });
}

/****************************************************
	関数名	getPicture
	機能		カメラ、フォトライブラリーから写真を取得する。
			取得された画像は、変数に保存できる。
			
	入力		sourceType	カメラ / フォトライブラリー
			sImgId		表示したいオブジェクトIDが決まっている場合は指定
****************************************************/

function getPicture(sourceType, sImgId, sMode) {
    gsImgId = sImgId;
    gbImgFlg = 0;

    var isNativeApp =
        window.cordova &&
        window.cordova.platformId &&
        navigator.camera &&
        typeof navigator.camera.getPicture === "function";

    if (isNativeApp) {
        var options = {
            quality: giQuality,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: false,
            targetWidth: giTargetSize,
            correctOrientation: true,
            saveToPhotoAlbum: false
        };

        navigator.camera.getPicture(
            getPicture_Success,
            function(error) {
                console.error("Camera error:", error);
            },
            options
        );

        return;
    }

    var input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.style.display = "none";

	if (sourceType === PictureSourceType.CAMERA) {
		openWebcam(sImgId);
		return;
	}

    document.body.appendChild(input);

    input.addEventListener("change", function() {
        var file = input.files && input.files[0];

        if (!file) {
            input.remove();
            return;
        }

        var reader = new FileReader();

        reader.onload = function(event) {
            var img = new Image();

            img.onload = function() {
                try {
                    imgFaceBuf = ResizeAndCropImage(
                        img,
                        giTargetSize
                    );

                    if (gsImgId) {
                        $(gsImgId).attr("src", imgFaceBuf);

                        if (gsImgId === "#avatar") {
                            avatar = imgFaceBuf.replace(
                                /^data:image\/jpeg;base64,/,
                                ""
                            );

                            SaveData("avatar");
                        }
                    }
                } catch (error) {
                    console.error("Image processing error:", error);
                }

                input.remove();
            };

            img.onerror = function() {
                console.error("Unable to load image");
                input.remove();
            };

            img.src = event.target.result;
        };

        reader.onerror = function() {
            console.error("Unable to read image");
            input.remove();
        };

        reader.readAsDataURL(file);
    });

    input.click();
}


function getPicture_Success(imageData) {

	// 画像のデータ (Base64 エンコード)
	var img = new Image();
	img.src = "data:image/jpeg;base64," + imageData;

	img.onload = function () {

		// 画像をリサイズとクロップして Base64で返す
		imgFaceBuf = ResizeAndCropImage(img, giTargetSize);

		Log("407=" + gsImgId);
		// 画像IDが指定された場合
		if (gsImgId != undefined) {

			// for base64
			$(gsImgId).attr("src", imgFaceBuf);

			// アカウント設定の場合
			if (gsImgId == "#avatar") {
				// avatarに保存しておく
				avatar = imgFaceBuf.replace(/^data:image\/jpeg;base64,/, '');
				SaveData("avatar");
			}
		}
	}

}


function ResizeAndCropImage(img, targetSize) {

	Log("444:ResizeAndCropImage:" + targetSize);
	// 元の画像サイズを保持
	var originalWidth = img.width;
	var originalHeight = img.height;
	var targetWidth = 0;
	var targetHeight = 0;

	// 縦長の場合
	if (originalHeight >= originalWidth) {
		// 横幅300pxで、高さはアスペクト比に従ってリサイズ
		targetWidth = targetSize;
		targetHeight = (originalHeight / originalWidth) * targetSize;
		
	// 横長の場合
	} else {
		targetWidth = (originalWidth / originalHeight) * targetSize;
		targetHeight = targetSize;
	}


	// キャンバスを作成し、一度リサイズ
	const canvas = document.createElement('canvas');
	canvas.width = targetWidth;
	canvas.height = targetHeight;

	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

	// 次に、300px x 300px のキャンバスにトリミング
	const finalCanvas = document.createElement('canvas');
	finalCanvas.width = targetSize;
	finalCanvas.height = targetSize;

	const finalCtx = finalCanvas.getContext('2d');

	// 縦長の場合
	if (targetHeight > targetWidth) {
		const cropY = (targetHeight - targetSize) / 2;  // 上下から切り取る高さ
		finalCtx.drawImage(canvas, 0, -cropY, targetWidth, targetHeight);

	// 横長の場合
	} else {
		const cropX = (targetWidth - targetSize) / 2;  // 左右から切り取る幅
		finalCtx.drawImage(canvas, -cropX, 0, targetWidth, targetHeight);
	}

	// トリミング後の画像をBase64形式で取得
	const imgResize = finalCanvas.toDataURL('image/jpeg');
	
	return imgResize;
}	
	
/****************************************************
	アラート関連
	SafariとNativeAppsのそれぞれにあわせたアラート表示を行う
****************************************************/
/****************************************************
	関数名	ShowAlert
	機能		iPhoneアプリのアラートを表示する。
			Safariの場合は単純なアラートを表示する。
	
	入力		sTitle		タイトル
			sMessage	メッセージ
	出力		なし
****************************************************/
function ShowAlert(sTitle, sMessage){
	
	// iPhoneアプリの場合
	if(navigator.notification){
		
		navigator.notification.alert(sMessage, null, sTitle, "CLOSE");

	// Safariの場合
	} else {
		var sText = sTitle + "\n" + sMessage;
		alert(sText);
	}
}

/****************************************************
	関数名	ShowConfirm
	機能		iPhoneアプリの確認画面を表示する。
			Safariの場合は単純なアラートを表示する。
	
	入力		sTitle		タイトル
			sMessage	メッセージ
			sFunction	関数文字列(evalで実行できる)
	出力		なし
****************************************************/
var gbActionEbleFlg = true;
function ShowConfirm(sTitle, sMessage,sFunction){
	
	// ver.7.4 ダブルアラートしないようにロックされている場合はアラート処理しない
	if(gbActionEbleFlg == false){
		// 念のためボタンが効かなくならないようにトリプルタッチは有効にする
		gbActionEbleFlg = true;
		return;
	}
	// ver.7.4. ダブルアラートロックする 2015.10.26
	gbActionEbleFlg = false;
	
	// iPhoneアプリの場合
	if(navigator.notification){
		navigator.notification.confirm(sMessage, onConfirm(sFunction), sTitle, ["CANCEL","O K"]);
	// Safariの場合
	} else {
		var sText = sTitle + "\n" + sMessage + "\n\n";
		if(confirm(sText)){
			eval(sFunction);
		}
		// ver.7.4. ボタンを有効に戻す 2015.10.26
		gbActionEbleFlg = true;
	}
}
function onConfirm(sFunction) {
	return function(button){
		
		// OKが実行された場合
		if(button == 2){
			// 指定された関数を実行する
			eval(sFunction);
		// CANCELの場合
		} else {
			// なにもしない
		}

		// ver.7.4. ボタンを有効に戻す 2015.10.26
		gbActionEbleFlg = true;

	}
}


/****************************************************
	関数名	ShowNextPage
	機能		1画面の中で説明内容を複数ページ進める
	
	G入力	giNowPageNum	現在のページ番号
	入力		sPageId			"#Morning"など<div id>
			iLastPage		最終ページ番号
			sFunction		最終ページの後に実行する関数
	出力		なし
	
	処理概要
		1. 最後のページの場合
		 1.1. ボタンの表記を"O K"に変更する
		2. 最後のページ以降の場合
		 2.1. ページ数を1に初期化する
		 2.2. 関数を実行する
		2. ページClass名を作成する
		3. 現在のページを非表示にする
		4. ページ番号をインクリメントする
		5. 現在のページを表示する
		
	使い方
		ページを含む<div>オブジェクトのID名を、sPageIdに設定する。
		この関数を実行するボタンオブジェクトのID名を、sButtonIdに設定する。
		ページ数を、iLastPageに。最後に実行したい関数を、sFunctionに設定。
		各ページのclass名を Page1, Page2, PageN とする。
		
		例）
		<div id="Sample">
		 <div class="Page1">ABC</div>
		 <div class="Page2">DEF</div>
		 <div class="whiteButton Action">NEXT</div>
		</div>
		
		ShowNextPage("#Sample", ".Action", 2, "test()");
****************************************************/
function ShowNextPage(sPageId, sButtonId, iLastPage, sFunction) {
	
	
	// すでに表示しているページ名を作成する
	var sPageClass = sPageId + " .Page" + giNowPageNum;
	
	// 現在のページを非表示にする
	$(sPageClass).hide();
	
	// ページ番号をインクリメントする
	giNowPageNum++;
	
	// すべてのページが終わった場合
	if (giNowPageNum > iLastPage) {
		
		// ボタンの色を白にする
		$(sPageId + " " + sButtonId).removeClass("blueButton").addClass("whiteButton");		
		
		// ページ番号を初期化する
		giNowPageNum = 1;
		
		// 現在のページを表示する
		sPageClass = sPageId + " .Page" + giNowPageNum;
		$(sPageClass).show();
		
		Log("common 436:" + sFunction);
		// 指定関数を実行する
		eval(sFunction);
		
		return;
	}
	
	// 最後のページの場合
	if(giNowPageNum == iLastPage){
		// ボタンの色を青にする
		$(sPageId + " " + sButtonId).removeClass("whiteButton").addClass("blueButton");
		
	// 次のページが残っている場合
	} else {
		// ボタンの色を白にする
		$(sPageId + " " + sButtonId).removeClass("blueButton").addClass("whiteButton");		
	}
	
	
	// 次のページを表示する
	sPageClass = sPageId + " .Page" + giNowPageNum;

    $(sPageClass).show();
	
	return;
}


/****************************************************
	関数名	Log
	機能		Safari, Xcode、それぞれにあわせてログを書きだす。
			デバッグモードでない場合は、ログを出力しなくする。
	
	入力		sMessage		出力したい文字列
	出力		なし
****************************************************/
function Log(sMessage){
	var sValue = "";

	// Xcode(Phonegap)の場合
	if(gbIsApp==true){
		// 本番の場合はログを出さない
		if (gbDebug != true) {
			return;
		}
		// メッセージが配列の場合
		if (typeof sMessage == "object") {
			sValue = JSON.stringify(sMessage, null, 1);
			console.log("➤➤ " + sValue);
		} else {
			console.log("➤➤ " + sMessage);
		}
	// Safariの場合
	} else {
		// メッセージが配列の場合
		if(typeof sMessage == "object" ){
			sValue = JSON.stringify(sMessage, null, 1);
			console.log("➤➤ " +sValue);
		} else {
			console.log("➤➤ " +sMessage);
		}
	}
}


/****************************************************
	関数名	InitLocale
	機能		言語設定が保存されている場合は、保存されている言語を返し
			保存されていない場合は、デバイスの設定言語を返す。
			（このとき、デバイスの設定言語をSaveしておく）
			また、ChangeLanguage時にも、SaveData("gsLocale")を実行する。
****************************************************/
function InitLocale(){

	// 保存データを読み込む
	gsLocale = LoadData("gsLocale");

	// データが空の場合
	if(gsLocale == "" || gsLocale == undefined){

		gsLocale = GetLocale();
		SaveData("gsLocale");

	}

}
/****************************************************
	関数名	GetLocale
	機能		iPhoneのシステム設定における言語設定を取得する
	
	入力		なし
	出力		sLocale		日本語：ja-jp, 英語：en-us
	
****************************************************/
function GetLocale(){
	var sLocale = "";
	
	// 英語対応するまでの間
	//return "ja-JP";
	
	// 言語設定を取得できる場合
	if (navigator.language) {
		sLocale = navigator.language;
		sLocale = sLocale.toLowerCase();
	} else {
		Log("Locale Error");
		sLocale = "ja-jp";
	}
	if(sLocale == "ja"){
		sLocale = "ja-jp";
	}
	Log("common.js 510 sLocale=" + sLocale);
	return sLocale;	
}

/****************************************************
	関数名	ShowLangClass
	機能		日本語環境、それ以外の環境によって、言語切り替え用のClassに対して
			表示・非表示の設定を割り当てる。
	
	入力		sLocale		言語設定
	出力		なし
	
	処理概要	2. 言語が日本語の場合
			 2.1. Jpクラスをdisplay:blockする
			 2.2. Enクラスをdisplay:noneする
			3. 言語が英語の場合
			 3.1. Jpクラスを非表示にする
			 3.2. Enクラスをdisplay:blockする
			4. Remoteモード対応
****************************************************/
function ShowLangClass(sLocale){

	// 言語が日本語の場合
	if(sLocale == "ja-jp"){
		$(".Jp").show();
		$(".En").hide();
	} else {
		$(".Jp").hide();
		$(".En").show();
	}

	return;
}
function SwitchRemoteClass(){
	Log("common(647) SwitchRemoteClass start / gsRemoteMode=" + gsRemoteMode);

	// 手渡しモードの場合
	if(gsRemoteMode == "" || gsRemoteMode == undefined){
        $(".REMOTE").hide();
        $(".NO_REMOTE").show();
	} else {
        $(".REMOTE").show();
        $(".NO_REMOTE").hide();
	}
	Log("common(691) SwitchRemoteClass done / gsRemoteMode=" + gsRemoteMode);

	return;
}

/****************************************************
	関数名	SaveData
	機能		データをlocalStorageに保存する。
			iPhone (iOS 4.2)のlocalStorageは
			1ドメインあたり最大2621391文字(2.6MB)まで保存できる。

	Read more: http://ascii.jp/elem/000/000/592/592777/#ixzz1LMWzUjSR
		
	入力		sObject				データ名（テキスト形式）
			sDom				保存DOM名
	出力		なし
	
	処理概要	1. sObjectをevalし、元のオブジェクトを取得する
			2. オブジェクトをJSONテキストフォーマットに変換する
			3. JSONテキストをlocalStorageに保存する
****************************************************/
function SaveData(sObject, sDom){
//function SaveData(sObject){
	var oObject;
	var sLocalStorageKey = "";
	
	// sDom指定の場合
	if(sDom != "" && sDom != undefined){
		oObject = sObject;
		sLocalStorageKey = sDom;		
	} else {
		sLocalStorageKey = sObject;
		oObject = eval(sObject);
	}
	
	// 引数の変数名からオブジェクト内容（String, Array, Object）を取得する
	if(oObject == null){
		Log("co.js 654: oObject=null");
		oObject = "";
	}
	
	// データ形式が古い場合
	if( oObject["data"] == undefined && oObject != ""){
		oObject = {
			"data": oObject
		};
	}
	
	var sJSON = "";
	sJSON = JSON.stringify(oObject, null, 1);
//	Log("common 670: " + sLocalStorageKey + " sJSON="+sJSON);
	
	// localStorageに保存する
	localStorage[sLocalStorageKey] = sJSON;
	
	return;
	
}
/****************************************************
	関数名	LoadData
	機能		localStorageからデータを読み込む。
	
	入力		sObject		データ名（テキスト形式）
	出力		oObject		オブジェクト
	
	処理概要	1. localStorageからJSON形式データを取得する
			2. JSON形式データをJSON.parseでオブジェクトに変換する。
			3. オブジェクトを返して終了する
****************************************************/
function LoadData(sObject){
	var sJSON = "";
	sJSON = localStorage[sObject];
	
//	Log("common 705 LoadData(" + sObject + ") sJSON=" + sJSON);
	
	// sJSONがundefinedの場合
	if(sJSON == undefined || sJSON == '""' || sJSON == "" || sJSON == null || sJSON == "null"){
		return "";
	}
	
	var oJSON = JSON.parse(sJSON, null);
	
	// 新形式で保存されていない場合
	if(oJSON["data"]){
		// 配列のデータをdataから取得
		oJSON = oJSON["data"];
	}
	
	return oJSON;
	
}

/****************************************************
	関数名	SaveDataTmp
	機能		データをDOMのinput値に保存する。
	
	入力		sObject		データ名（テキスト形式）
			bDomId		一時保存DOMのID名
	出力		なし
	
	処理概要	1. sObjectをevalし、元のオブジェクトを取得する
			2. オブジェクトをJSONテキストフォーマットに変換する
			3. JSONテキストをlocalStorageに保存する
****************************************************/
function SaveDataTmp(oObject, sDomId){
	
	// オブジェクトをJSONフォーマットに変更する
	var sJSON = JSON.stringify(oObject, null, 1);
	
	// sJSONが空の場合
	if(sJSON == '""'){
		sJSON = "";
	}
	
	$("#" + sDomId).val(sJSON);
	
	return;
	
}
/****************************************************
	関数名	LoadDataTmp
	機能		Domのinput値からデータを読み込む。
	
	入力		sObject		データ名（テキスト形式）
	出力		oObject		オブジェクト
	
	処理概要	1. DOMのinput値からJSON形式データを取得する
			2. JSON形式データをJSON.parseでオブジェクトに変換する。
			3. オブジェクトを返して終了する
****************************************************/
function LoadDataTmp(sObject){
	
	var sJSON = "";
	
	// 一時保存DOMから値を取得する
	sJSON = $("#" + sObject).val();
	
	// sJSONがundefinedの場合
	if(sJSON == undefined || sJSON == '""' || sJSON == ""){
		return [];
	} else {
		// JSON形式データを返す
		return JSON.parse(sJSON, null);
	}
}




/****************************************************
 * ファイル管理系
****************************************************/

/****************************************************
	関数名	GetOnlyFileName
	機能		対象のパスからファイル名のみを抜き出す。ファイルの末尾に"?"以降が
			連結されている場合は、?以降を削除する。
	
	入力		sPath
	出力		sFileName
	
	処理概要
****************************************************/
function GetOnlyFileName(sPath){
	
	// パスからファイル部分を抜き出す
	var iFilePosition = sPath.lastIndexOf("/") + 1;
	var sFileName = sPath.substring(iFilePosition, sPath.length);
	
	// ?以降を削除する
	iFilePosition = sFileName.indexOf("?");
	sFileName = sFileName.substring(0, iFilePosition);
	
	return sFileName;
}

/****************************************************
	関数名	FileSystem
	機能		ルートディレクトリパスを取得する。
			Safari では動作しないので、パスにfalseをいれて返す。
	
	入力		sMode	実行コマンド
						"gsRootPath" | "remove"
			sFile	対象ファイル
	出力		sPath
	
	処理概要	1. FileSystemが無効の場合
			 1.1. falseを返して終了する
			2. "RootPath"モードの場合
			 2.1. ルートディレクトリのパスを返す関数を実行する
			3. "remove"モードの場合
			 3.1. 対象のファイルを削除する
			3. ルートディレクトリを返して終了する
****************************************************/
function FileSystem(sMode, sFile){
	
	// ファイルシステムが無効の場合
	if (!window.requestFileSystem) {
		return false;
	}
	
	// モードによって処理を切りかえる
	switch (sMode) {
		case "rootPath":
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fsGetRootPath, onFail);
			break;
		case "remove":
			Log("653:DeleteFile="+sFile);
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024*1024, fsRemoveFile(sFile), onFail);
			break;
			
	}
	
	return true;
}

/****************************************************
	関数名	fsGetRootPath
	機能		ドキュメントルートのパスを取得する
	
	入力		fs			ファイルシステムオブジェクト
	G出力	gsRootPath	ドキュメントルート
****************************************************/
var gsRootPath = "";
function fsGetRootPath(fs){
	// グローバル変数に値を格納する
	gsRootPath = fs.root.fullPath;
}

/****************************************************
	関数名	fsRemoveFile
	機能		対象ファイルを削除する。
			ファイル名は、ドキュメントルートからの相対パスにする。
			ex) "tmp/photo_001.jpg"
	
	入力		sFile		削除対象ファイル
	出力		なし
****************************************************/
function fsRemoveFile(sFile){
	
	// ファイルシステムオブジェクトを受け取る
	return function(fs){
		
		// ドキュメントルートのファイルに対してgetFileする。
		fs.root.getFile(sFile, {}, function(fileEntry){
			// 対象ファイルを削除する
			fileEntry.remove(function(){
				Log("Remove Success!");
			},function(){
				Log("Remove Error!");
			})
		})
	}
	/*
	var sNewFile = gsRootPath + "/new.jpg";
	return function(fs){
		Log("686:"+sFile);
		rename(fs.root, sFile, 'new.jpg');
		//fileEntry.remove();
	}
	*/
}

/****************************************************
	関数名	onFail
	機能		関数実行時にエラーになった場合、エラー番号を出力する
	
	入力		event	eventハンドラ
	出力		なし
****************************************************/
function onFail(event){
	Log("common.js:Function Error");
}

/****************************************************
	関数名	MakeSerial
	機能		現在のタイムを使ってシリアル番号を作成する
	
	入力		sMode		"Today":今日の日付までをシリアルにする
						"Sec":現在の秒までをシリアルにする
	出力		sSerial		20110505 | 201105051210
****************************************************/
function MakeSerial(sMode){
	var dDate = new Date();
	var sSerial = "";
	
	if (sMode == "Today") {
		sSerial = "" + dDate.getYear() + dDate.getMonth() + dDate.getDay();
	} else {
		sSerial = "" + dDate.getYear() + dDate.getMonth() + dDate.getDay() + dDate.getHours() + dDate.getMinutes() + dDate.getSeconds();
	}
	return sSerial;
}




/****************************************************
	関数名	ShowLoading
	機能		ローディング画面を表示する。
			ローディング画面は、<div id="Loading"></div>を用意すること。
	
	入力		bShowFlg		true:表示  false:非表示
			bAppStore		App Storeへの通信中フラグ
	出力		なし
****************************************************/
function ShowLoading(bShowFlg, bAppStore) {

	if(bShowFlg == true || bShowFlg == 1){
		
		// App Storeにアクセスしている場合
		if(bAppStore){
			$("#Loading .AppStore").show();
			$("#Loading .Default").hide();
		} else {
			$("#Loading .AppStore").hide();
			$("#Loading .Default").show();
			
		}
		
		// 現在の画面位置を取得する
		$('html').addClass('is-fixed');
		$('html,body,#jqt').scrollTop(0);
		$("#Loading").show();

	} else {
		$('html').removeClass('is-fixed');
		$("#Loading").hide();
	}
}


/****************************************************
	関数名	LogGA
	機能		Google Analyticsにログを残す
	
	入力		sActionType		アクションタイプ（アクション内容を文字列で指定します）
			iSales			売り上げ（数字）
	出力		なし
****************************************************/
//var gbInitGoogleAnalytics = false;
function LogGA(sAction, sLabel, iSales){
		
	if(gbIsApp){
		Log("Google:" + sAction + "->" + sLabel + "(" + iSales + ")");
		// ver 3.4 Google Analytics対応
//		ga_storage._trackEvent(gsEventCategory, sAction, sLabel, iSales);
		
		// GAの実装が完了するまで非表示
		//gtag('send', 'event', gsEventCategory, sAction, sLabel, iSales);

	}

	return;
}
/**
 * Google Analyticsにログを残す(Firebaseを経由)
 * 新たなイベント名で本関数を使用する場合は、Google Analyticsよりカスタムディメンションを設定する
 * @param {*} sAction イベント名
 * @param {*} params sActionに関連するパラメータ
 */
function LogGA4(sAction, params) {
	Log("GA4>>" + sAction);
//	Log(params);
	if (gbIsApp) {
		cordova.plugins.firebase.analytics.logEvent(sAction, params);
	}
}

/*******************************************************************************
	関数名	is
	機能		変数のオブジェクトタイプをチェックする
	
	入力		type	オブジェクトタイプ(String,Number,Boolean,Date,Error,Array,Function,RegExp,Object)
	出力		1:指定タイプと一致　0:一致しない
	
	処理概要
*******************************************************************************/
function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

/****************************************************
    関数名    CopyText
    機能      input type="text"の値をコピーする
    
    入力     sInputId inputタグのid属性
    出力     なし
****************************************************/
function CopyText(sText) {
    if(!sText || typeof(sText) != "string") {
	    return "";
    }
		
    //strを含んだtextareaをbodyタグの末尾に設置
	$(document.body).append("<textarea id=\"tmp_copy\" style=\"position:fixed;right:100vw;font-size:16px;\" readonly=\"readonly\">" + sText + "</textarea>");
	//elmはtextareaノード
	var elm = $("#tmp_copy")[0];

    //select()でtextarea内の文字を選択
    elm.select();

    //rangeでtextarea内の文字を選択
    var range = document.createRange();
    range.selectNodeContents(elm);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    elm.setSelectionRange(0, 999);

    //execCommandを実施
    document.execCommand("copy");

    //textareaを削除
 	$(elm).remove();
}　

/****************************************************
    関数名    writeQr
	機能      QRコードを書き出す。
			 index.htmlでqrcode.min.jsを読み込むこと
    
	入力     canvas canvasのid属性
			data	書き込む文字列
    出力     なし
****************************************************/
function writeQr(canvas, data) {
	return new Promise(function (res, rej) {
		QRCode.toCanvas(canvas, data, {
			margin: 1,
			scale: 6
		}, function (err, tg) {
			!err ? res(tg) : rej(err)
		}
		);
	});
}

/****************************************************
    関数名    SetIntervalAtPage
	機能      setIntervalを安全に実行するために
			 setIntervalを実行するページIdを指定し
			 そのページから移動したら、自動的に停止する。

			 また、安全のために一定時間以上は動作しないように
			 制限をかけることができます。
    
	入力     
			sFunc	関数文字列
			iInterval 実行間隔
			sPage	実行したいページID
			iMaxMin	 継続終了する時間（分）
	G入力	 giStopTime	継続終了する時間
    出力     tTimer  グローバル変数を返す
    
	処理概要
			SetIntervalAtPageはsetTimeoutで実行する
			1. 現在のページが指定ページでない場合
			 1.1. 終了する
			2. 継続時間を過ぎた場合
			 2.1. 終了する
			3. 継続時間指定がある場合
			 3.1. giStopTime==0の場合（初回起動）
			  3.1.1. giStopTimeをセットする(DateのままでUTC)
			4. 指定された関数を実行する
			5. SetIntervalAtPageを再帰的に実行する
****************************************************/
var giStopTime = 0;
function SetIntervalAtPage(sFunc, iInterval, sPage, iMaxMin) {

	Log("************* SetIntervalAtPage **************");
	// 現在のページが指定されたページと異なる場合
	if ($(".current")[0].id != sPage) {
		// 終了する
		giStopTime = 0;
		console.log("ページ移動による停止:" + $(".current")[0].id + " / "+ sFunc);
		return;
	}
	// 経過時間を過ぎた場合
	let dDate = new Date();
	let iTime = dDate.getTime();
	//console.log("giStopTime=" + giStopTime + "/" + iTime);
	if (giStopTime != 0 && iMaxMin != undefined && giStopTime < iTime) {
		// 終了時間を初期化
		giStopTime = 0;
		console.log("継続時間オーバーによる停止:" + sFunc);
		return;
	}

	// 継続時間指定がある初回起動の場合
	if (iMaxMin != undefined && giStopTime == 0) {
		// 終了時間を計算する
		giStopTime = iTime + iMaxMin * 60 * 1000;
	}

	// 指定された関数を実行する
	Log("1147:" + sFunc);
	eval(sFunc);

	// 再帰的に実行する
	setTimeout(()=> SetIntervalAtPage(sFunc, iInterval, sPage, iMaxMin), iInterval);

}

/*******************************************************************************
    関数名    GetUrlData
	機能      ブラウザでテストする際、?以降のデータを取得します。
	
	入力	 sKey	URL?data=xxx のdataに当たる変数名
	出力	 sValue	    URL?data=xxx のxxxに当たる値
*******************************************************************************/
function GetUrlData(sKey) {

	var sGetData = $(location).attr('search').substr(1);
	var aDataList = [];
	var aData = [];

	// 通常の起動の場合は何もしない
	if (sGetData == "" || sGetData == undefined || sKey == null || sKey == "") {
		return "";
	}

	// 変数のセットを"&"で分割する
	aDataList = sGetData.split("&");
	
	// データに対して繰り返す
	for (var iCnt = 0; iCnt < aDataList.length; iCnt++) {

		// 対象データを、キーと値に分ける
		aData = aDataList[iCnt].split("=");

		// キーが指定の値と同じ場合
		if (aData[0] == sKey) {
			// 値を返す
			return aData[1];
		}

	}

	// 対象データがない場合
	return "";
}

/****************************************************
	関数名    GoToPage
	機能      ページ移動をする際の標準関数。
			ページ先指定に"#"がついていない場合のエラーチェック。
			現在のページから、ジャンプ先のページへの移動を
			Logに出力する。
    
	入力     sPage
	出力     Log出力
****************************************************/
function GoToPage(sPage) {

	// ページ指定が間違っている場合
	if (sPage.substr(0, 1) != "#") {
		Log("GoToPage:ページ先指定に#がついていません");
		return;
	}

	// 現在ページ名
	var sCurrentPage = GetCurrent(); 
	Log(sCurrentPage + " ▶▶▶ " + sPage);
	jQT.goTo(sPage);
	return;
	
}
function GetCurrent() {
	if ($(".current")[0]) {
		return $(".current")[0].id;
	} else if ($(".current")) {
		return $(".current").id;
	
	} else {
		return "アプリ起動";
	}
}
