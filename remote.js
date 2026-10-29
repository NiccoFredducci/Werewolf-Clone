/*******************************************************************************
	AJAX共通ライブラリ
	 - md5.js
	 - jquery-1.4.4.js と一緒に使うこと
*******************************************************************************/
// 本番サーバーを見に行くモード
//var gsReleaseServerMode = true;
var gsReleaseServerMode = true;

// アプリの場合 もしくは　本番サーバーモードの場合
if(IsApp()==true || gsReleaseServerMode == true){
	var gsAjaxUrl = "https://werewolf.network/remote_v5.php";
    var gsRemoteImgFaceDir = "https://werewolf.network/imgFace/";
	var gsAjaxUrlRoom = "https://werewolf.network/remote_room.php";
	var gsRemoteRoomDir = "https://werewolf.network/remoteRoom/";
	var apiUrl = 'https://werewolf.network/'
	
} else {
//	var gsAjaxUrl = "http://localhost:8888/remote_v3.php";
	var gsAjaxUrl = "http://localhost:8888/remote_v5.php";
//	var gsRemoteImgFaceDir = "https://np-stg.werewolf.network/imgFace/";
	var gsRemoteImgFaceDir = "http://localhost:8888/imgFace/";

	var gsAjaxUrlRoom = "https://np-stg.werewolf.network/remote_room.php";
	var gsRemoteRoomDir = "https://np-stg.werewolf.network/remoteRoom/";
	var apiUrl = 'https://np-stg.werewolf.network/'

//	var gsAjaxUrlRoom = "http://localhost:8888/remote_room.php";
//	var gsRemoteRoomDir = "http://localhost:8888/remoteRoom/";

}

//var gsRemotePlayerUrl = "https://werewolf.network/remote.html";
var gsRemotePlayerUrl = "https://werewolf.network/r.html";

// ver.12.2.0
const WAIT_JOIN_PLAYERS = "wait_join_players";
const STOP_JOIN_PLAYERS = "stop_join_players";
const START_GAME = "start_game";
const DELETE_GAME_ROOM = "delete_game_room";


/*******************************************************************************
	関数名	DoAjax
	機能		指定されたモードにあわせて、データを作成し、Ajaxへアクセスする。
			Ajaxが完了すると、モード名にSuccess、Errorが付加された関数が実行される。
			
			Ajaxへのアクセス時は、常にUDIDとチェックコードが送信される。
	
	入力	sMode		モード
	出力	なし
	
	処理概要
			1. CheckCodeを作成する
			2. モードによってデータを作成する
*******************************************************************************/
var xhr;
function DoAjax(sMode) {
	
	var sAjaxUrl;

	// モードによって呼び出すPHPを変更する
	switch (sMode) {

		case "MakeOnlineGame":
			// sAjaxUrl = gsAjaxUrlRoom;
			// sAjaxUrl = "http://localhost:8888/remote_room_MakeOnlineGame.json";
			sAjaxUrl = gsAjaxUrlRoom;
			break;
		case "JoinGame":
			//sAjaxUrl = "http://localhost:8888/remote_room_JoinGame.json";
			sAjaxUrl = gsAjaxUrlRoom;
			break;
		case "UpdateStatusJSON":
			switch (gsGameRoomStatus) {
				case STOP_JOIN_PLAYERS:
					//sAjaxUrl = "http://localhost:8888/remote_room_UpdateStatusJson_stop.json";
					sAjaxUrl = gsAjaxUrlRoom;
					break;
				case START_GAME:
					//sAjaxUrl = "http://localhost:8888/remote_room_UpdateStatusJson_start.json";
					sAjaxUrl = gsAjaxUrlRoom;

					break;

				case WAIT_JOIN_PLAYERS:
				default:
					//sAjaxUrl = "http://localhost:8888/remote_room_UpdateStatusJson_wait.json";
					sAjaxUrl = gsAjaxUrlRoom;
					break;

			}
			break;
		default:
			sAjaxUrl = gsAjaxUrl;
			break;
	}
	
	// データパックを作成する
	sDataPack = MakeDataPack(sMode);
	
	// ローディングを表示する
	ShowLoading(true);
	
	Log("DoAjax(" + sDataPack + ") " + sAjaxUrl);

	// AJAXを実行する
	xhr = $.ajax({
		type:"POST",
		url:sAjaxUrl,
		data:sDataPack,
        dataType:"text",
		cache:false,
		crossDomain: true
//		beforeSend:function(xhr){
//			if (window.navigator.userAgent.toLowerCase().indexOf('safari') != -1)
//			  xhr.setRequestHeader("If-Modified-Since", new Date().toUTCString());
//		}
    })
    .done(function(data) {
        Log("AjaxDone:"+data);
        // ローディングを非表示にする
	    ShowLoading(false);

        // 送信された文字列をJavaScriptとして実行
        eval(data);
    })
    .fail(function() {
        Log("Ajax Connect Error" );
    })
    .always(function() {
        Log("58: ajax.always/ajax処理終了");
        // alert( "complete" );
    });
	
}

/*******************************************************************************
	関数名	AbortAjax
	機能		AJAXの通信を途中終了する。
	
	G入力	xhr		AJAXハンドラ
	出力		なし
*******************************************************************************/
function AbortAjax(bAppStoreFlg, bBackFlg){
	
	// スマートパスでない場合
	if(gbSmartPass != true && bAppStoreFlg != true){
		// AJAXを停止する
		xhr.abort();
	}
	
	// ローディングを非表示にする
	ShowLoading(false);
	
	if (bBackFlg) {
		// 元ページに戻る
		jQT.goBack();
		
	}
	
}


/*******************************************************************************
	関数名	MakeDataPack
	機能	データパックを作成する
	
	入力	sMode			実行モード
	出力	sDataPack		データパック文字列
	
	処理概要
			1. モードにあわせてデータを作成する
			2. データをJSONに変換する
			3. データパックを作成する
			4. データパックを返して終了する
*******************************************************************************/
function MakeDataPack(sMode){
	
	var dData = {};
	var sDataJSON = "";
		
	// モードによって切り替える
	switch(sMode) {

        // GM専用 *********************************************
        // 新規リモートゲーム作成
        case "MakeRemoteGame":
            // データを設定する
            // サーバーから取得する　→ dData.gsGameId = gsGameId;
            dData.giDateNum = giDateNum;
            dData.gaPlayer = gaPlayer; // プレイヤー情報（画像含む）
            dData.gbFirstNightNoKillFlg = gbFirstNightNoKillFlg;
            dData.goBomb = goBomb;
			dData.goRoleText = goRoleText;
			dData.gaPlayerAnswer = gaPlayerAnswer;
            dData.gaForetellFlg = gaForetellFlg;
            dData.gaScoopFlg = gaScoopFlg;
            dData.goBomb = goBomb;
			dData.goCardNum = goCardNum;
			dData.giFirstNightForetell = giFirstNightForetell;
            dData.giForetellFirstRandom = giForetellFirstRandom;
            dData.giYesterdayJudge = giYesterdayJudge;
            dData.gbVampireHumanFlg = gbVampireHumanFlg;
            dData.goDoubleGuard = goDoubleGuard;
			// 複数の人狼対応
			dData.giWerewolfLiveNum = giWerewolfLiveNum;
            
			break;
			
		// 夜を初期化する
		case "InitNightRemote":
		// ゲームセット
		case "SendGamesetRemote":
		// 再戦
		case "ContinueRemoteGame":
		// 夜のアクション完了時
		case "SendInitMorning":
            dData.gsRemoteGameId = gsRemoteGameId;
			dData.giDateNum = giDateNum;

			// gaPlayerをクローンする（JSONを使ったテクニック）
			var aPlayerNoImg = JSON.parse(JSON.stringify(gaPlayer));
			Log("remote.js 157 gaPlayer[0].imgFace="+gaPlayer[0].imgFace + " / " + aPlayerNoImg[0].imgFace + "/"+aPlayerNoImg[0].sName);
			// ver.12.1.0 画像はすべてサーバーにアカウント登録時にあるため
			// 画像ファイル名しか入らないはず
			InitFaceImg(aPlayerNoImg);
			Log("remote.js 157 gaPlayer[0].imgFace="+gaPlayer[0].imgFace + " / " + aPlayerNoImg[0].imgFace + "/"+aPlayerNoImg[0].sName);

            dData.gaPlayer = aPlayerNoImg; // プレイヤー情報（画像含まない）
			dData.gbFirstNightNoKillFlg = gbFirstNightNoKillFlg;
			dData.goBomb = goBomb;
			dData.goRoleText = goRoleText;
			dData.gaPlayerAnswer = gaPlayerAnswer;
			dData.gaForetellFlg = gaForetellFlg;
			dData.gaScoopFlg = gaScoopFlg;
			dData.goBomb = goBomb;
			dData.goCardNum = goCardNum;
			dData.giFirstNightForetell = giFirstNightForetell;
			dData.giForetellFirstRandom = giForetellFirstRandom;
			dData.giYesterdayJudge = giYesterdayJudge;
			dData.gbVampireHumanFlg = gbVampireHumanFlg;
			dData.goDoubleGuard = goDoubleGuard;
			dData.gsRemoteGameSetResult = gsRemoteGameSetResult;
			// 複数の人狼対応
			dData.giWerewolfLiveNum = giWerewolfLiveNum;
			// ゲーム結果画面の表示用
			dData.giStartTime = giStartTime;
			dData.gsGameStartDate = gsGameStartDate;

			break;

		// ゲームを強制終了する
		case "SendQuitRemoteGame":
		case "UpdateCache":
			dData.gsRemoteGameId = gsRemoteGameId;
			break;
			

        // プレイヤー用 *********************************************
        // プレヤー選択時
        case "SelectPlayer":
            // 下記のGameIdとPlayerIdはどんな処理でも送る必要がある
//            dData.giRemotePlayerId = giRemotePlayerIdTmp; // 一時変数で送信
            dData.giRemotePlayerId = giRemotePlayerId; // 「後出し優勢」に仕様変更
            dData.gsRemoteGameId = gsRemoteGameId;
			break;
			
		// 夜のアクション実行時
		case "SendNightAction":
            // 下記のGameIdとPlayerIdはどんな処理でも送る必要がある
            dData.giRemotePlayerId = giRemotePlayerId;
			dData.gsRemoteGameId = gsRemoteGameId;
			// 夜のアクション特有の変数
			dData.giRemoteToPlayerId = giRemoteToPlayerId;
			dData.gsRemoteAction = gsRemoteAction;
			break;
		
		// ver.12.1.0 GameRoom用 *******************************
		case "MakeOnlineGame":
			dData.status_text = WAIT_JOIN_PLAYERS;
			var oGameMaster = {
				"iId": gAccount.id + "",
				"sName": gAccount.nickname,
				"imgFace": gAccount.image_url
			};
			gaPlayer = [];
			gaPlayer[0] = oGameMaster;

			dData.gaPlayer = gaPlayer;
//			dData.game_master = JSON.stringify(oGameMaster);
			dData.game_master = oGameMaster;
			
			//dData.data_json = JSON.stringify(dData);
			break;
		case "UpdateStatusJSON":
			dData.status_text = gsGameRoomStatus;
			var oGameMaster = {
				"iId": gAccount.id + "",
				"sName": gAccount.nickname,
				"imgFace": gAccount.image_url
			};
				
			dData.room_id = gsRoomId;
			var dataJson = new Object();
			dataJson.gaPlayer = gaPlayer;
			//dataJson.game_master = JSON.stringify(oGameMaster);
			dataJson.game_master = oGameMaster;
			//dataJson.giRemotePlayerId = giRemotePlayerId;
			dataJson.gsRemoteGameId = gsRemoteGameId;
			//dData.data_json = JSON.stringify(dataJson);
			dData.data_json = dataJson;
			break;
		
		case "JoinGame":
			dData.room_id = gsRoomId;
			dData.user_id = gAccount.id + "";

			break;

	}
	
	// JSON文字列に変換する
	sDataJSON = JSON.stringify(dData);
	
	// データパックを作成する
	sDataPack = "m=" + sMode + "&data=" + sDataJSON;
		
	return sDataPack;
	
}



/*******************************************************************************
	関数名	GetUDID ver.4.5
	機能		UDIDを取得し、キーチェーンアクセスに保存する。
			この処理は、onDeviceReadyのタイミングで実行し、
			$("#gUDID").val()に格納する。
			
	入力		なし
	出力		sUDID
	
	開発終了	サーバーでのユーザー管理を終了するため、本機能は終了
*******************************************************************************/
function GetUDID(){
	
	// ver.3.0対応
	// iPhone5になったときに、前のユーザーコードを引きづってくるように変更
	// 前のユーザーコードは、iTunes経由でバックアップし、新しいiPhoneでも
	// ユーザーコードを引き継ぐ。それによって、ポイントを引き継げるようにする。
	var sDammyUDID = "suzuki15_iPhone5";
	var sPlatform = CheckPlatform();
	
	// アプリでない場合
	if(IsApp()==false || sPlatform != "iOS"){
		
		// ダミーを格納する
		$("#gUDID").val(sDammyUDID);
		return;
		
	}
	
	Log("Test uuid="+device.uuid);
	cordova.exec(
		// キーチェーンアクセスできた場合
		function(value){
			$("#gUDID").val(value);
		}, 
		// キーチェーンにアクセスできなかった場合
		function(value) {
			// デバイスのUDIDをそのまま格納すうｒ
			$("#gUDID").val(device.uuid);
			// $("#gUDID").val(value);
		}, "UUID", "uniqueIdentifier", ["uniqueIdentifier"]
	);

	//return device.uuid;
	return;
}

/*******************************************************************************
	関数名	AjaxError
	機能	Ajaxのエラー結果を表示する
	
	入力	oError		
*******************************************************************************/
function AjaxError(oError){
	
	if(oError["DATA"]["error"] == "ErrQuery"){
		Log("AjaxError! result:" + oError["result"] + "/" + oError["DATA"]["error"] + "/" + oError["DATA"]["ErrorDetail"] + "/" + oError["DATA"]["SQL"]);
	} else {
		Log("AjaxError! result:" + oError["result"] + "/" + oError["DATA"]["error"]);	
		
	}
	
	// ローディング画面を非表示にする
	ShowLoading(false);
	
	// エラーアラート表示をする
	if(oError){
		aMessage = GetAlertMessage(oError["DATA"]["error"],"");
		
	} else {
		aMessage = GetAlertMessage("ErrNetworkTimeout","");
	}
	ShowAlert(aMessage[0], aMessage[1]);


}
/*******************************************************************************
	関数名	OutputData / CallBack関数なのでグローバルアクセスできない
	機能		データをHTML出力する
	
    入力	DATA		受信データ
           sMode        モード切り替え
	出力	なし
*******************************************************************************/
function OutputData(oData, sMode){
    
    // モードによってデータの保存処理を変える
    switch(sData){
        case "MakeRemoteGame":
            // ローカルストレージにゲームIDを保存する
            SaveData(oData["gsRemoteGameId"], "gsRemoteGameId");
        default:
            break;
    }
		
	// ローディング画面を非表示にする
	ShowLoading(false);
	
	// Debug
	Log("ajax_common.js 190:" + sCardList);
	
}

/*********************************************************************
 * 個別の処理
 *********************************************************************/
/***************************************************
 * リモコン機能関連関数
 ***************************************************/

 /****************************************************
    関数名    MakeRemoteGame
    機能      リモコンのためにサーバーにゲーム設定をアップロードする。
             Ajaxによるアップロードが完了すると、QRコードが表示される
             シェア画面へと移動します。
             シェア画面→プレイヤー選択→待機画面（シェア画面と同じ内容を掲載）
    
    入力     $sJSON
    出力     なし
    
    処理概要    1. 引数が空の場合
                1.1. DoAjaxモードとして、MakeRemoteGameモードを実行する
               2. 引数にJSONが入っている場合（ajaxのreturnを受信した場合）
                2.1. 
****************************************************/
function MakeRemoteGame(oJSON){

    // 送信モードの場合
    if(oJSON == undefined){
        // 自分自身をGMとする
		gsRemoteMode = "GM";
		
		// リモートモードのHTML表示をする
		SwitchRemoteClass();

        // GMを表示する
        $(".GM").show();
        $(".PLAYER").hide();

		// 重要：ユーザーから修正希望あり！ 2020.05.25
		// 夕方の投票がリモート化されるまでの対処 ver.10.0.6
		if(gsVotingStyle == "VotingStyleAnonymous"){
			// 自由投票に変更する
			gsVotingStyle = "VotingStyleFree";

		} 

        DoAjax("MakeRemoteGame");

    // 受信モードの場合
    } else {

        var sDataJSON = JSON.stringify(oJSON["DATA"]);
        var oData = oJSON["DATA"];
        Log("292:Ajax Receive / sDataJSON=" + sDataJSON);
        
        // ローカルストレージにゲームIDを保存する
		gsRemoteGameId = oData["gsRemoteGameId"];
		Log("318:!!gsRemoteGameId="+gsRemoteGameId);

		// gsStageを "#Title_Tutorial_Remote" に更新
		SaveGame("MakeRemoteGame");

		// ver.12.2.0 オンラインモード対応 ****************
		gsGameRoomStatus = START_GAME;

		// 自分のプレイヤーIDを取得します。（gbGmIsNotPlayerの場合は-1）
		giRemotePlayerId = GetPlayerIdByAccountId();

		// ページ遷移はUpdateStatusJSONで行います
		UpdateStatusJSON();

    }
}

/****************************************************
    関数名    InitTutorialRemote
	機能      Title_Tutorial_Remote（QRコードが表示されるページ）に
			　移動するときの初期化を行う。
			　具体的には、gsRemoteGameIdを使った
			 ・QRコード作成　・URLの表示

			 GMの場合は、GetRemoteStatusの自動チェック

			 このプログラムは、PlayerSelect後の待機画面でも行う。
			 （本来不要だが、ContinueGame時に直接ページ遷移するため）
	
	入力	 bAutoCheckFlg    自動ステータスチェック機能
    G入力    gsRemoteGameId
    出力     なし
    
    処理概要
****************************************************/
function InitTutorialRemote(sCanvasName){
	var iCheckInterval = 5000;

	if(gsRemoteGameId == ""){
        aMessage = GetAlertMessage("ErrRemoteGameIdIsNull","");
        ShowAlert(aMessage[0], aMessage[1]);
        return false;
	}
	// 4. Tutorial(リモコンモード)の初期化
	var sRemoteUrl = gsRemotePlayerUrl + "?g=" + gsRemoteGameId + "&" + gsLocale;

	// すでに表示されているQRコードを削除して初期化 2021.10.13 ver.11.0.0
	$("#" + sCanvasName + " img").remove();

	var qrcode = new QRCode(document.getElementById(sCanvasName), {
		text: sRemoteUrl,
		width: 180,
		height: 180,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.M
	});
	
	$("#RemoteUrlForCopy").val(sRemoteUrl);
	$("#RemoteUrlForCopy2").val(sRemoteUrl);

	// GMの待機画面に移動する場合
	if (sCanvasName == "QRCanvas_Waiting") {
		// 待機中のプレイヤー状態を非表示にする（メタ対策）
		$("#RemoteWaitingGM .PlayerListBox").hide();

		// QRコードを非表示にする（邪魔だから）
		$("#ShowShareURL").hide();
	}

	// 待機プレイヤーを自動チェックする
	SetIntervalAtPage("GetRemoteStatus(false,true,true)", iCheckInterval, "RemoteWaitingGM", 30);

	return;
}
function CopyRemoteUrl(sMode) {
	
	switch (sMode) {
		case "GameRoom":
			// 4. Tutorial(リモコンモード)の初期化
			var sRemoteUrl = gsRemotePlayerUrl + "?r=" + gsRoomId + "&" + gsLocale;
			break;
		
		case "RemoteGame":
		default:
			// 4. Tutorial(リモコンモード)の初期化
			var sRemoteUrl = gsRemotePlayerUrl + "?g=" + gsRemoteGameId + "&" + gsLocale;
			break;

	}
	var aMessage = GetAlertMessage("RemoteUrlForCopyClipboard", sRemoteUrl);
	CopyText(aMessage[1]);

	// コピーした旨を表示する
	aMessage = GetAlertMessage("RemoteCopyUrl","");
	ShowAlert(aMessage[0], aMessage[1]);

}

/****************************************************
    関数名    SelectPlayer
    機能      自分が使うプレイヤーを選択する
    
    入力     oJSON サーバーからのJSONデータ（空の場合は、送信モード）
    出力     なし
****************************************************/
function SelectPlayer(oJSON){

    // 送信モードの場合
    if(oJSON == undefined){
        DoAjax("SelectPlayer");

    // 受信モードの場合
    } else {
		var oData = oJSON["DATA"];
		
		// 無事、設定できたので一時変数からグローバル変数に格納　← 送信前に反映済み
		//giRemotePlayerId = giRemotePlayerIdTmp;

		switch (gsRemoteMode) {
			// GMの場合
			case "GM":
				// 「続きから」のリンク先を「#RemoteWaitingGM」に変更する
				SaveGame("SelectPlayer");

				// GMが最後だった場合
                if(oData.status_text == "done_player_select"){
					
                    // 最後の説明ページに移動する
                    jQT.goTo("#Title_AboutNight_Remote");
                } else {

                    // 待機画面に移動する
                    jQT.goTo("#RemoteWaitingGM");
                }
                break;

			// プレイヤーの場合
			case "PLAYER":
			default:
                // ダウンロードしたdata_jsonからグローバル変数を更新して
                // localStorageにも格納する
                SetupFromRemoteData(oData);

                // 待機画面に移動する
				GoToPage("#RemoteWaitingPlayer");

                break;
        }
    }

    return;

}

/****************************************************
    関数名    ContinueRemoteGame
    機能      前回と同じ設定で再戦する
    
    入力     oJSON サーバーからのJSONデータ（空の場合は、送信モード）
    出力     なし
****************************************************/
function ContinueRemoteGame(oJSON){

	// プレイヤーの場合
	if (gsRemoteMode == "PLAYER") {
		/*
		// エラーメッセージを取得する
		var aMessage = GetAlertMessage("RemoteContinuePlayer");
		// 待機画面に移動する
		// done_gameset中に移動した場合は、ループするけれど、ご愛嬌
		ShowConfirm(aMessage[0], aMessage[1], "GetRemoteStatus(true)");
		*/

		// PLAYERは、ゲームステータスを確認して、適するページにジャンプします
		
		// ver.12.1.0 プレイヤー参加ルームへ移動に変更
		//GetRemoteStatus(true, false, false, true);
		GoToPage("#JoinRoom_1");

		return;
	}

	// GMが操作しないと、他のプレイヤーが連打すると
	// 答え確認できない人がでるので、
	// プレイヤーは待機画面にジャンプさせる。

	// ver.12.1.0 プレイヤー募集へ進める
	// このとき、gsRoomIdが残っているので、元のルームでプレイヤーが
	// 参加状態になっている。・・・はず
	//MakeOnlineGame();
	SaveMemberAndBack();

/*
    // 送信モードの場合
    if(oJSON == undefined){
        DoAjax("ContinueRemoteGame");

    // 受信モードの場合
    } else {
		var oData = oJSON["DATA"];
		// カードを配り直す
		SetRole("#Title_GameStart");
		return;

    }
*/

    return;
}


/****************************************************
    関数名    InitFaceImg
	機能      Playerオブジェクトから画像ファイル名を削除する。
			 自動チェックモードの場合は、すべてのプレイヤーを
			 チェック済みにしておく。
    
	入力     aPlayer	Playerオブジェクトの参照渡し。
					   修正すると参照元が直接修正される。
    出力     なし
****************************************************/
function InitFaceImg(aPlayer){

	// プレイヤーに対して繰り返す
	for(var iCnt=0; iCnt<aPlayer.length; iCnt++){
		// 画像を削除する
		// ver.12.1.0 画像はすべてサーバーにアカウント登録時にあるため
		// 画像ファイル名しか入らないはず
		//aPlayer[iCnt].imgFace = "";

		// 自動パスモードの場合
		if(gbPassAnswerFlg == true){
			aPlayer[iCnt].bCheckedFlg = true;
		}
	}
	return;

}
/****************************************************
    関数名    SendNightAction
    機能      夜のアクションを送信する
    
    入力     oJSON サーバーからのJSONデータ（空の場合は、送信モード）
    出力     なし
****************************************************/
function SendNightAction(oJSON) {
	
    // 送信モードの場合
	if (oJSON == undefined) {
		
		// 人狼ボイスを非表示にする
		$("#WerewolfRemoteMessage").hide();

        DoAjax("SendNightAction");

    // 受信モードの場合
    } else {
		// JSONオブジェクトを取得
		var oData = oJSON["DATA"];

		// アクションをJSONパースする
		var aAction = $.parseJSON(oData.action_json);

		// 自分のアクションを確認する
		for(var iCnt=0; iCnt < aAction.length; iCnt++){
			Log("470 aAction[iCnt].from=" + aAction[iCnt].from);
			// 自分のアクションが存在する場合
			if(aAction[iCnt].from == giRemotePlayerId){
				// アクション先のプレイヤーID
				var iToPlayerId = aAction[iCnt].to;
				var sAction = aAction[iCnt].action;

			}
		}

		// GMとPLAYERで切り分ける
		switch(gsRemoteMode){
			case "GM":

				// アクションによって切り分ける
				switch(sAction){
					// 占い結果などの画面が存在するアクションの場合
					case "Foretell":
					case "Dream":
					case "Scoop":
					// マジシャンの場合
					case "Change":
					// "Necromancy"の場合
					case "Necromancy":
						// 夜のアクションを実行する
						DoneDreamAction(giRemotePlayerId, iToPlayerId, sAction, false);
						return;
					
					default:
						// GMは、DoAllNightActionで自分のアクションを実行するため
						// ここでは DoneNightActionしない
						jQT.goTo("#RemoteWaitingGM");

						break;

				}
				break;

			case "PLAYER":
			default:
				// 夜のアクションを実行する
				DoneDreamAction(giRemotePlayerId, iToPlayerId, sAction, false);
				return;
		}
	}

    return;

}

/****************************************************
    関数名    SkipDoubleAction
	機能      DoAjaxの受信専用関数。
			 夜のアクションを同じプレイヤーが２回実行したときに
			 そのアクションを無視して、待機画面にリダイレクトする。
			 「占い」をしまくる、などのルール違反ができないようにする。
    
    入力     oJSON サーバーからのJSONデータ（空の場合は、送信モード）
    出力     なし
****************************************************/
function SkipDoubleAction(oJSON){

	var oData = oJSON["DATA"];

	// エラーメッセージを取得する
	var aMessage = GetAlertMessage(oData.error);

	// GMの場合
	if(gsRemoteMode == "GM"){
		var sPage = "#RemoteWaitingGM";

	// プレイヤーの場合
	} else {
		var sPage = "#RemoteWaitingPlayer";

	}
	ShowConfirm(aMessage[0], aMessage[1], "jQT.goTo('" + sPage + "')");

    return;

}
/****************************************************
    関数名    GetRemoteStatus
    機能      status.jsonファイルを読み込み
			 ボタンモードのときに、ステータス変更がない場合は
			 「しばらくお待ち下さい」アラートを表示する。
			 ゲームセットの場合は、結果画面に移動する。
			 同時に、localStorageにデータ反映も行う。
	
	入力	  bButtonMode		ボタンを押してステータス確認するモード
			 bNoJump		   ページ遷移しないモード
			 bAutoLoad			ロード画面を表示させない
    G入力     gsRemoteGameId    ゲームID
    出力      なし
****************************************************/
var giRemoteWaitingCnt=0;
function GetRemoteStatus(bButtonMode, bNoJump, bAutoLoad, bContinueMode){
	var oData = [];
	var sGameSetResult = "";
	var sDayText = "";
	var sSerial = MakeSerial();
	var sDataPack = "";
	var sSendType = "GET";

	// ステータスJSON.txt を見に行って更新がない場合（理屈上発生しない）
	// JSONファイルではなく、DBを読みに行く。そのJSONチェック回数。
	var iMaxWaitCnt = 10;
    
    // gsRemoteGameIdが空の場合
	if (gsRemoteGameId == "undefined" || gsRemoteGameId == "" || gsRemoteGameId == undefined) {
        return false;
	}
	
    // ステータスファイル名を作成する
	var sStatusURL = gsRemoteImgFaceDir + gsRemoteGameId + "_status.json?" + sSerial;
	
	// オートロードでない場合はローディングを表示する
	if (bAutoLoad != true) {
		ShowLoading(true);
	}

	// GMかつすでに10回ウェイトしている場合（DBをチェックしにいく）
	if(giRemoteWaitingCnt >= iMaxWaitCnt && gsRemoteMode == "GM"){
		// giRemoteWaitingCntを初期化
		giRemoteWaitingCnt = 0;

		// JSONキャッシュではなく、DBに直接ステータスを見に行く
		sStatusURL = gsAjaxUrl;

		// データパックを作成する
		sDataPack = MakeDataPack("UpdateCache");

		// 送信タイプを"POST"にする
		sSendType = "POST";

	}

	// AJAXでデータを取得する
	xhr = $.ajax({
		type:sSendType,
		url:sStatusURL,
		data:sDataPack,
        dataType:"text",
        cache:false,
		crossDomain: true
//		beforeSend:function(xhr){
//			if (window.navigator.userAgent.toLowerCase().indexOf('safari') != -1)
//			  xhr.setRequestHeader("If-Modified-Since", new Date().toUTCString());
//		}
	})
    .done(function(data) {
        // Log("AjaxDone:"+data);
		
		// ローディングを非表示にする
	    ShowLoading(false);

        // 送信されたJSON文字列をデータに戻す
		//oData = JSON.parse(data);
		var oData = $.parseJSON(data);

		Log("782:Remote STATUS=" + oData.status_text);

		// GM、PLAYER 共通処理 ******************************
		// リモートモードのHTML表示をする
		SwitchRemoteClass();
		
		// ゲームの強制終了を、待機中のプレイヤーが受け取った場合
		if (oData.status_text == "quit"){
			// 強制終了された旨をアラート表示
			aMessage = GetAlertMessage("RemoteQuitGame","");
			gsRemoteGameId = "";
			gsRemoteMode = "";
			
			SaveGame();
			ShowAlert(aMessage[0], aMessage[1]);
			$("#TopRecoverRemotePlayer").hide();
			FinishGame('Top',false);
			return false;
		}
		
		// ゲームセットの場合
		if(oData.status_text == "done_gameset"){
			// 勝利者を取得する
			var aAction = $.parseJSON(oData.action_json);
			sGameSetResult = aAction.win;
			Log("639 gsRemoteGameSetResult="+sGameSetResult);
		}

		switch(gsRemoteMode){
			// GM処理 ******************************
			case "GM":
				// 待機中のプレイヤーリストを作成する
				var aAction = $.parseJSON(oData.action_json);
				InitWaitPlayerList("#RemoteWaitingGM .PlayerListBox", "#RemoteWaitingGM .PlayerBox", aAction);

				// ステータスにあわせて処理を変える
				switch(oData.status_text){
					case "wait_player_select":
					case "wait_night_action":

						// 再読み込みボタンがおされた場合
						if (bButtonMode == true) {

							// 待機状態かチェックしてアラート表示する
							if(!AlertWaitingRemote(oData)){
								// 待機状態の場合は、待機回数をカウントする
								giRemoteWaitingCnt++;
								return;
							}
						}
				
						break;

					// プレイヤー選択が完了した場合
					case "done_player_select":
					case "done_night_action":
					default:
						// GMの場合は、サーバーのaction_jsonデータをデバイスに反映させる。
						SetupFromRemoteData(oData);

						break;

				}
				break;

			// PLAYER処理 ******************************
			case "PLAYER":
				// プレイヤーの場合は、サーバーのdata_jsonデータをデバイスに反映させる。
				SetupFromRemoteData(oData);
				
				// ステータスにあわせて処理を変える
				switch(oData.status_text){
					// ゲームセットの場合
					case "done_gameset":
						
						// ランキングページの場合
						if (bContinueMode) {
							// エラーメッセージを取得する
							var aMessage = GetAlertMessage("RemoteContinuePlayer");
							// 待機画面に移動する
							// done_gameset中に移動した場合は、ループするけれど、ご愛嬌
							ShowAlert(aMessage[0], aMessage[1]);
							
						} else {
							// ゲームセット画面に移動する
							GoToRemotePage(oData.status_text, gsRemoteMode, sGameSetResult);
						}
						return;

					case "morning":
						// 背景を空にする
						$("#RemoteWaitingPlayer").removeClass("TitlePage");
						$("#RemoteWaitingPlayer").addClass("TitlePageMorning");

						// 日付表示
						sDayText = "The " + goDateText[giDateNum] + " Day";
						$("#RemoteWaitingPlayer .ImageTitle").text(sDayText);
						break;

					default:
						// 背景を夜にする
						$("#RemoteWaitingPlayer").removeClass("TitlePageMorning");
						$("#RemoteWaitingPlayer").addClass("TitlePage");

						// 日付表示
						if(giDateNum == 0){
							sDayText = "Waiting for Players";
						} else {
							sDayText = "The " + goDateText[giDateNum] + " Night";
						}
						$("#RemoteWaitingPlayer .ImageTitle").text(sDayText);
						break;
				}

				// 再読み込みボタンがおされた場合
				if (bButtonMode == true) {

					// 待機状態かチェックしてアラート表示する
					if(!AlertWaitingRemote(oData)){
						// 待機状態の場合は、ここで終了する
						return;
					}
				}

				break;
		}
		
		// ステータスにあわせた画面に移動する
		if(bNoJump != true){
			GoToRemotePage(oData.status_text, gsRemoteMode, sGameSetResult);
		}

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
		Log("ajax通信に失敗しました");
		Log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
		Log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
		Log("errorThrown    : " + errorThrown.message); // 例外情報
		Log("Ajax Connect Error" );
		
		// JSONファイルが存在しない場合
		if(jqXHR.status == "404"){
			// ゲームが削除されたものとして、gsRemoteGameIdを削除する
			gsRemoteGameId = "";
			gsRemoteMode = "";
			SaveGame();
			ShowLoading(false);
			aMessage = GetAlertMessage("RemoteQuitGame","");
			ShowAlert(aMessage[0], aMessage[1]);
			return;
		}
    })
    .always(function() {
        Log("411: ajax.always/ajax処理終了");
        // alert( "complete" );
    });

}

/****************************************************
    関数名    AlertWaitingRemote
	機能      GM、PLAYER、それぞれに対して
			 待機状態チェックをします。
			　待機状態の場合は、アラートを表示します。
    
    入力     oData	サーバーからの返答データ
    出力     true:処理完了  false:サーバーを待っています
    
    処理概要
****************************************************/
function AlertWaitingRemote(oData){

	// ステータスの頭の文字 "wait" or "done" を取得する
	var sPrefixStatus = oData.status_text.substr(0,4);
	Log("482 status :"+sPrefixStatus+" origial="+oData.status_text);

	// GMとPLAYERでわけます
	switch(gsRemoteMode){

		// GMの場合は、statusの状態で wait か調べる
		// GMがプレイヤーの場合は、手元のアプリ上で夜に移動できるので
		// サーバーにアクセスして wait を確認する必要がない
		case "GM":
			// 状態が"wait"あった場合
			if(sPrefixStatus == "wait"){

				// アラートを表示して終了する「現在まだプレイヤーのアクションが完了していません」
				aMessage = GetAlertMessage("RemoteNowWaitingGM","");
				ShowAlert(aMessage[0], aMessage[1]);
				return false;
			}
			break;
		
		// プレイヤーの場合
		case "PLAYER":

			// PlayerIDが初期化されている場合
			if(giRemotePlayerId == -1 || giRemotePlayerId == undefined){
				aMessage = GetAlertMessage("ErrRemoteGameIdIsNull","");
				ShowAlert(aMessage[0], aMessage[1]);
				return false;
			}


			// アクションをJSONにする
			var aAction = $.parseJSON(oData.action_json);

			// 自分がアクションしているか確認する
			for(var iCnt=0; iCnt < aAction.length; iCnt++){
				Log("567 aAction[iCnt].from=" + aAction[iCnt].from);
				// 自分のアクションが存在する場合
				//（done_night_actionのときもGMが読み込むので、actionは空ではない）
				if(aAction[iCnt].from == giRemotePlayerId){
					// アラートを表示して終了する
					//「現在まだプレイヤーのアクションが完了していません」
					aMessage = GetAlertMessage("RemoteNowWaiting","");
					ShowAlert(aMessage[0], aMessage[1]);
					return false;
				}
			}

			// 再戦で done_player_selectの場合
			if(oData.status_text == "done_player_select"){
				// ゲームマスターの再戦を待つメッセージを表示する
				aMessage = GetAlertMessage("RemoteContinuePlayer","");
				ShowAlert(aMessage[0], aMessage[1]);
				return false;
			}

			// 自分が死亡＆チェック済みの場合
			var oDataJSON = $.parseJSON(oData.data_json);
			gaPlayer = oDataJSON.gaPlayer;
			if( gaPlayer[giRemotePlayerId].bLive == false){
				// アラートを表示して終了する
				//「ゲーム終了までお待ち下さい」
				aMessage = GetAlertMessage("RemoteNowWaitingUntilGameset","");
				ShowAlert(aMessage[0], aMessage[1]);
				return false;
			}

			break;
			
	}

	return true;

}


/****************************************************
    関数名    GoToRemotePage
    機能      ステータスにあわせて、対象の画面に移動する。
    
    入力     sStatus    ステータス
			sRemoteMode  GM / PLAYER
			sGameSetResult ゲームセット時の勝利チーム   
    出力     なし
****************************************************/
function GoToRemotePage(sStatus, sRemoteMode, sGameSetResult){

	Log("601 status=:" + sStatus);
	
	// フッターメニューを非表示にする ver.11.5.0対応 2022.10.17
	$("#Footer").hide();

    // ゲーム状態にあわせて処理を行う
    switch(sStatus){
        // プレイヤー選択中
        case "wait_player_select":
            // プレイヤー選択画面を表示する
            InitSelectPlayer();
            break;
        
        // 操作済み（プレイヤー選択、夜アクション）
        case "done_player_select":
            // GMの場合
            switch(sRemoteMode){
                case "GM":
                    // プレイヤー登録完了後の夜の説明を表示する
                    jQT.goTo("#Title_AboutNight_Remote");
                    break;

                case "PLAYER":
                    // 待機画面を表示する
                    jQT.goTo("#RemoteWaitingPlayer");
                    break;
            }
            break;

		case "done_night_action":
            // GMの場合
            switch(sRemoteMode){
                case "GM":
					// 全員分のアクションを行う
					DoAllNightAction();

					//SaveData();
					SaveGame();

					// サーバーの状態を "morning"に変更する
					SendInitMorning();
                    return;

                case "PLAYER":
                    // 待機画面を表示する
                    jQT.goTo("#RemoteWaitingPlayer");
                    break;
            }
			break;

			
		case "morning":
            // GMの場合
            switch(sRemoteMode){
				case "GM":
					// 朝のシーンに移動する
					jQT.goTo("#Morning");
                    return;

                case "PLAYER":
                    // 待機画面を表示する
                    jQT.goTo("#RemoteWaitingPlayer");
                    return;
            }
			

        // 夜アクション中
        case "wait_night_action":
            // 自分のプレイヤーIDを復元する
			giRemotePlayerId = LoadData("giRemotePlayerId");
			
			// プレイヤーがゲーム終了を行っている場合
			if (giRemotePlayerId == -1 || giRemotePlayerId == undefined) {
				Log("1099:giRemotePlayerId=" + giRemotePlayerId);
				// 夜の待機画面に移動する
				jQT.goTo("#RemoteWaitingPlayer");

			}

			// すでに死亡している場合
			//（重要!!：死んだプレイヤーがアクションしないことが多いので、死んだプレイヤーの役職チェックはやめた）
			if(gaPlayer[giRemotePlayerId].bLive == false){
//			if(gaPlayer[giRemotePlayerId].bLive == false && gaPlayer[giRemotePlayerId].bLive){
				jQT.goTo("#RemoteWaitingPlayer");
				return;
			}

			// 夜アクション画面を表示する
			SetEnterPassword();
            break;
		
		// ゲームセットの場合
		case "done_gameset":
			// 朝の勝利条件チェック関数で、勝利画面に移動する
			MoveFromMorningToGameSet(sGameSetResult);
			break;
			
		default:
			break;
	}
	return;
}


/****************************************************
    関数名    SetupFromRemoteData
    機能      リモートからダウンロードしたデータで
			 グローバル変数とローカルストレージを更新する。
			 プレイヤーの場合は、data_jsonを反映。
			 GMの場合は、action_jsonを反映する。
    
    入力     oJSON  JSONオブジェクト
    出力     なし
    
    処理概要
            1. oJSON.data_jsonに格納されているJSON文字列をデコードする
            2. 必須グローバル変数の反映を行う
            3. SaveData()を行う
****************************************************/
/* remote.phpがリターンする配列
$oReturn["status_text"] = $oGame["status_text"];
$oReturn["data_json"] = $oGame["data_json"];
$oReturn["action_json"] = $oGame["action_json"];
$oReturn["player_done"] = $oGame["player_done"];
$oReturn["player_alive"] = $oGame["player_alive"];
*/
function SetupFromRemoteData(oJSON){

	// JSON文字列をデコードする
	var dData = [];
	
	switch(gsRemoteMode){
		case "GM":
			// gaRemoteAction = JSON.parse(oJSON["action_json"]);
			gaRemoteAction = $.parseJSON(oJSON["action_json"]);
			break;

		case "PLAYER":
			//dData = JSON.parse(oJSON["data_json"]);
//			dData = $.parseJSON(oJSON["data_json"]);
			if(oJSON["data_json"] != ""){
				//dData = eval(oJSON["data_json"]);
				dData =eval('(' + oJSON["data_json"] + ')')
				// グローバル変数に反映する
				giDateNum = dData.giDateNum;
				gaPlayer = dData.gaPlayer; // プレイヤー情報
				gbFirstNightNoKillFlg = dData.gbFirstNightNoKillFlg;
				goBomb = dData.goBomb;
				goRoleText = dData.goRoleText;
				gaPlayerAnswer = dData.gaPlayerAnswer;
				gaForetellFlg = dData.gaForetellFlg;
				gaScoopFlg = dData.gaScoopFlg;
				goBomb = dData.goBomb;
				goCardNum = dData.goCardNum;
				giFirstNightForetell = dData.giFirstNightForetell;
				giForetellFirstRandom = dData.giForetellFirstRandom;
				giYesterdayJudge = dData.giYesterdayJudge;
				gbVampireHumanFlg = dData.gbVampireHumanFlg;
				goDoubleGuard = dData.goDoubleGuard;
				// 複数の人狼対応
				giWerewolfLiveNum = dData.giWerewolfLiveNum;
				// 結果画面用
				giStartTime = dData.giStartTime;
				gsGameStartDate = dData.gsGameStartDate;
	
			}
			
//			Log("497:data_json:"+oJSON["data_json"]);	

			break;
	}

    // localStorageにデータを保存する gsStage=""で初期化（特に使わない）
    SaveGame();

    return;

}


/*************************************************
 * Night関連
 *************************************************/

/****************************************************
    関数名   InitNightRemote（GM専用関数）
	機能     「みなさん、恐ろしい夜がやってきました」の画面を表示する前に
			GMはサーバーに、最新のdata_jsonを反映する。
			サーバーは、action_jsonなどの初期化を行う。
    
    入力     oJSON	サーバーからのリターンデータ
    出力     なし
    
    処理概要
****************************************************/
function InitNightRemote(oJSON){
    // 送信モードの場合
    if(oJSON == undefined){
		// 夜の初期化モードでサーバーにアクセス
		// 送信するデータは、data_json
        DoAjax("InitNightRemote");

    // 受信モードの場合
    } else {
		var oData = oJSON["DATA"];

		// 「続きから」のリンク先を「#Title_Night」に変更する
		SaveGame("Night");

		// Title_Nightに進みます
		jQT.goTo("#Title_Night");
	}
}

/****************************************************
    関数名    DoAllNightAction
	機能      action_jsonを使って、すべてのプレイヤーの
			夜のアクションを実行する。
    
    入力     なし
    出力     なし
****************************************************/
function DoAllNightAction(){
Log("1107:DoAllNightAction");
	// actionを取得する
	var aAction = LoadData("gaRemoteAction");
	var iFrom = -1;
	var iTo = -1;
	var sAction = "";

	// actionに対して繰り返す
	for(var iCnt=0; iCnt<aAction.length; iCnt++){
		Log("965 DoAllNightAction from:"+aAction[iCnt].from + " / to:" + aAction[iCnt].to + " / action:" + aAction[iCnt].action)
		DoneDreamAction(aAction[iCnt].from, aAction[iCnt].to, aAction[iCnt].action, true);
	}

	// #Morningに移動する
	jQT.goTo("#Morning");
}

/****************************************************
    関数名    SendGamesetRemote
    機能      ゲームセットをサーバーに送信する
****************************************************/
function SendGamesetRemote(oJSON){
    // 送信モードの場合
    if(oJSON == undefined){
		// Gamesetをサーバーに反映する
		// 送信するデータは、data_json
        DoAjax("SendGamesetRemote");

    // 受信モードの場合
    } else {
		var oData = oJSON["DATA"];
		var oAction = $.parseJSON(oData.action_json);

		// 何もしない
		Log("AjaxDone:SendGamesetRemote Win="+oAction.win);
		Log(oData);

		// GAにゲームセットを送る
	    //LogGA4("Remote_GameSet", "Player:"+oData.player_alive, oData.player_alive);

	}
	return;
}

/****************************************************
    関数名    SendInitMorning
	機能      サーバーのstatusをMorningに変更する。
****************************************************/
function SendInitMorning(oJSON){
    // 送信モードの場合
    if(oJSON == undefined){

		// Gamesetをサーバーに反映する
		// 送信するデータは、data_json
		DoAjax("SendInitMorning");
		
		// SendInitMorning({"result":"success","gaPlayer":["id":"11111"]});""

    // 受信モードの場合
    } else {
		// 朝のシーンに移動する
		jQT.goTo("#Morning");
	}
	return;	
}

/****************************************************
    関数名    QuitRemoteGame
	機能      SendQuitRemoteGameを実行するか確認する。
****************************************************/
function QuitRemoteGame(){
	// 確認アラートを表示する。
	var aMessage = GetAlertMessage("RemoteQuitGameConfirm","");
	ShowConfirm(aMessage[0], aMessage[1], "SendQuitRemoteGame()");

}
/****************************************************
    関数名    SendQuitRemoteGame
    機能      ゲームセットをサーバーに送信する
****************************************************/
function SendQuitRemoteGame(oJSON){
    // 送信モードの場合
    if(oJSON == undefined){

		// Dream音声をストップする
		PlayAudio('audio/DreamLoop.mp3', true);

		// Gamesetをサーバーに反映する
		// 送信するデータは、data_json
        DoAjax("SendQuitRemoteGame");

    // 受信モードの場合
    } else {
		// 初期化してトップに戻る
		FinishGame('Top',false);
	}
	return;
}

/****************************************************
    関数名    ExitRemoteGame
	機能      プレイヤーがリモートゲームから離脱する。
			 GMがいなくなってしまった場合などに使う。
****************************************************/
function ExitRemoteGame(){
	    
    // 確認アラートを表示する。
    var    aMessage = GetAlertMessage("RemoteExitGame","");
    ShowConfirm(aMessage[0], aMessage[1], "FinishGame('ExitRemoteGame',false)");

}

/****************************************************
	関数名    ExitGameRoom
	機能      プレイヤーがゲームルームから離脱する。
			 GMがいなくなってしまった場合などに使う。
****************************************************/
function ExitGameRoom() {
	var aMessage = GetAlertMessage("RemoteExitGame", "");
	ShowConfirm(aMessage[0], aMessage[1], "FinishGame('ExitGameRoom',false)");
	
}
/****************************************************
	関数名    DeleteGameRoom
	機能      GMがゲームルームを削除する。
			 GMがメンバー参加済みのルームを削除したいときに使う。
****************************************************/
function DeleteGameRoom() {
	// 確認アラートを表示する。
	var aMessage = GetAlertMessage("DeleteGameConfirm", "");
	ShowConfirm(aMessage[0], aMessage[1], "FinishGame('DeleteGameRoom',false)");

}

/****************************************************
    関数名    RecoverRemotePlayer
	機能      リモートのプレイヤーが間違えて、ゲームの途中終了をした場合に
			 トップ画面に「リモートゲームに再接続」ボタンを表示し
			 このボタンを押したときに実行される。
			 具体的には、gsRemoteGameIdのみが初期化されているので
			 このgsRemoteGameIdにlocalStorageの値を戻し
			 なおかつ、アプリを再読み込みする。
****************************************************/
function RecoverRemotePlayer() {

	// gsRemoteGameIdを復元する
	gsRemoteGameId = LoadData("gsRemoteGameId");

	// アプリを再読み込みする
	location.href = "index.html";

	return;
	
}

/****************************************************
    関数名    AccessToQuitGame
	機能      すでに強制終了されたゲームにアクセスした場合に発生する。
			アラートを表示して、Topに戻す。
****************************************************/
function AccessToQuitGame(){

    // 確認アラートを表示する。OKの場合、DoneDeletePlayerを実行する
    var    aMessage = GetAlertMessage("RemoteQuitGame","");
    ShowConfirm(aMessage[0], aMessage[1], "FinishGame('Top',false)");

}


/****************************************************
    関数名    InitWaitPlayerList
    機能      リモートモードで待機中のプレイヤー一覧を表示する。
    
    入力     sOutputId        出力先ID
            sTemplateId        テンプレートHTMLのID
            aAction         Actionデータ
    G入力    gaPlayer        プレイヤーデータ
    出力        なし
    
    処理概要
        1. プレイヤーの数だけ繰り返す
         1.0. 複製したHTMLを出力先DIVに加える
         1.1. 対象のプレイヤーが死んでいる場合 gaPlayer[].bLive==false
          1.2.1. アイコンを死亡アイコンに変更する
         1.2. 対象のプレイヤーがアクション済みの場合
          1.2.1. アイコンをアクション済みに変更する
         1.3. テンプレート内の変数を差し替える
         1.4. 複製したHTMLを表示する
****************************************************/
function InitWaitPlayerList(sOutputId, sTemplateId, aAction) {
	var iCnt;
	var iLiveNum = 0;
	var iDoneNum = 0;
    
    // プレイヤーリストを初期化のため削除する
    $(sOutputId).empty();
    
    // プレイヤーの数だけ繰り返す
    for(iCnt=0; iCnt < gaPlayer.length; iCnt++){
                
        // テンプレートを複製する
        var htmlTemplate = $(sTemplateId).clone();
        htmlTemplate.removeAttr("style");
        htmlTemplate.removeClass("PlayerBox");
        
        // HTMLに加える
        htmlTemplate.appendTo(sOutputId);
        
        // プレイヤー名、サムネイル画像を表示する
        htmlTemplate.find('.WaitFaceImg').attr("src", gaPlayer[iCnt].imgFace);
        htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);
                
        // 死亡している場合
        if(gaPlayer[iCnt].bLive == false){
            // アイコンを変更する
			htmlTemplate.find('.WaitIcon').attr("src", "img/IconDead.png");
			
		// アクション済みの場合
        } else if (CheckActionDone(iCnt, aAction)==true){
			htmlTemplate.find('.WaitIcon').attr("src", "img/IconCheckOn.png");

			// 生きているプレイヤー数をインクリメントする
			iLiveNum++;
			// アクション済みプレイヤー数をインクリメントする
			iDoneNum++;

		// 未アクションの場合
		} else {
			// 生きているプレイヤー数をインクリメントする
			iLiveNum++;
		}
	}
	// 待機ステータスバーを更新する
	$("#RemoteWaitingGM .DoneStatus").text(iDoneNum + "/" + iLiveNum);
	var iDonePer = Math.floor(iDoneNum * 100 / iLiveNum);
	Log("1387: iLiveNum=" + iLiveNum + "/iDoneNum=" + iDoneNum+"/iDonePer="+iDonePer);
	$("#RemoteWaitingGM .DoneBar").css("background-size", iDonePer + "% 100%");
    return;
}

/****************************************************
    関数名    CheckActionDone
    機能      対象のプレイヤーがリモートアクションを完了しているかチェックする。
    
    入力     iPlayerId
            aAction     アクションJSON
    出力     bStatus     true:アクション済み    false:未アクション
****************************************************/
function CheckActionDone(iPlayerId, aAction){
    // 自分がアクションしているか確認する
    for(var iCnt=0; iCnt < aAction.length; iCnt++){
//        Log("567 aAction[iCnt].from=" + aAction[iCnt].from);
        // 自分のアクションが存在する場合
        //（done_night_actionのときもGMが読み込むので、actionは空ではない）
        if(aAction[iCnt].from == iPlayerId){
            return true;
        }
    }
    return false;
}

// リモートモードでは匿名投票ではなく、自由投票になることを伝える
// ver.10.0.6
function AlertVoteAnonymous(){
	var aMessage = GetAlertMessage("AlertVoteAnonymous");
	ShowAlert(aMessage[0],aMessage[1]);
	return true;
}


// リモートテスト用関数
// プレイヤーIDをインクリメントする
function IncrementPlayerId() {
	Log("IncrementPlayerId do.");
	giRemotePlayerId++;
	SaveData("giRemotePlayerId");
	location.reload();

}

/****************************************************
    関数名    ReceiveWerewolfVoice
    機能      人狼ボイスを受信する
    
    入力     なし
    出力     なし
    
	処理概要
			1. サーバからJSONファイルを読み込む
			2. action_jsonを確認し、人狼のアクションが存在した場合
			 2.1. 対象の人狼アクションが出力先に書き出されていない場合
			  2.1.1. 対象の人狼のアクションをボイス表示する（class="WV_PlayerID"を付与する）
****************************************************/
function ReceiveWerewolfVoice() {

	// gsRemoteGameIdが空の場合
	if (gsRemoteGameId == "undefined" || gsRemoteGameId == "" || gsRemoteGameId == undefined) {
		return false;
	}
	
	// JSONファイルのURLを作成する
	var sSerial = MakeSerial();
	var sStatusURL = gsRemoteImgFaceDir + gsRemoteGameId + "_status.json?" + sSerial;

	// AJAXでデータを取得する
	xhr = $.ajax({
		type:"GET",
		url:sStatusURL,
		data:"",
        dataType:"text",
        cache:false,
		crossDomain: true
	})
    .done(function(data) {

        // 送信されたJSON文字列をデータに戻す
		//oData = JSON.parse(data);
		var oData = $.parseJSON(data);

		// アクションデータを取得する
		var aAction = $.parseJSON(oData.action_json);

		Log("1514:" + oData.action_json);

		// 人狼のアクションのみを取得する
		// aWerewolfAction.iFrom : 人狼プレイヤーID
		// aWerewolfAction.iTo : 襲撃先ID
		// aWerewolfAction.iVoteNum : 投票数
		var aWerewolfAction = GetWerewolfAction(aAction);
		var iFrom = -1;
		var iTo = -1;
		var iVoteNum = 0;

		// 人狼アクションに対して繰り返す
		for (let iCnt = 0; iCnt < aWerewolfAction.length; iCnt++){
			iFrom = aWerewolfAction[iCnt].iFrom;
			iTo = aWerewolfAction[iCnt].iTo;
			iVoteNum = aWerewolfAction[iCnt].iVoteNum;

			// 対象のアクションがすでにボイスとして表示されていない場合
			if (!CheckNewWerewolfAction(iFrom)) {

				// 対象のプレイヤーがサイコキラーの場合
				if (gaPlayer[iTo].sRole == "PsychoKiller") {
					iTo = -1;
					iVoteNum = 0;
				}

				// モーダルに人狼ボイスを追加する
				InsertWerewolfVoiceModal(iFrom, iTo, iVoteNum);

				// 各「殺害ボタン」の下に表示する *************
				InsertWerewolfVoteInfo(iTo, iFrom, iVoteNum);

			}
		}
		
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
		Log("ajax通信に失敗しました");
		Log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
		Log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
		Log("errorThrown    : " + errorThrown.message); // 例外情報
		Log("Ajax Connect Error" );
		
		// JSONファイルが存在しない場合
		if(jqXHR.status == "404"){
			// ゲームが削除されたものとして、gsRemoteGameIdを削除する
			gsRemoteGameId = "";
			gsRemoteMode = "";
			SaveGame();
			aMessage = GetAlertMessage("RemoteQuitGame","");
			ShowAlert(aMessage[0], aMessage[1]);
			return;
		}
    })
    .always(function() {
        Log("411: ajax.always/ajax処理終了");
        // alert( "complete" );
    });

	
}

/****************************************************
    関数名    GetWerewolfAction
	機能      全員のアクションから人狼のアクションのみを抜き出す。
			 人狼のアクションを使いやすい形式に整理する。
    
    入力     aAction			アクション配列
    出力     aWerewolfAction	アクション配列
****************************************************/
function GetWerewolfAction(aAction) {

	var sAction = "";
	var aWerewolfAction = [];
	var iWerewolfCnt = 0;
	var iVoteNum = 0;

	// 全アクションに対して繰り返す
	for (let iCnt = 0; iCnt < aAction.length; iCnt++){
		sAction = aAction[iCnt].action;

		// 対象のアクションが人狼の場合
		if (sAction.indexOf("KillByReason") >= 0) {

			Log("1619:Found KillByReason:" + sAction);

			// 投票数を作成する
			iVoteNum = sAction.replace("KillByReason", "") - 0;

			// 返却配列を作成する
			aWerewolfAction[iWerewolfCnt] = {
				"iTo": aAction[iCnt].to,
				"iFrom": aAction[iCnt].from,
				"iVoteNum": iVoteNum
			};
			
			// 添字をインクリメント
			iWerewolfCnt++;
		}
	}
	
	return aWerewolfAction;
	
}

/****************************************************
    関数名    CheckNewWerewolfAction
	機能      対象の人狼アクションがボイス書き出しされているか
			 チェックする。
			 すでに書き出されている場合は true を返す。
    
    入力     iPlayerId 人狼プレイヤーID
    出力     bExist	既出フラグ
****************************************************/
function CheckNewWerewolfAction(iPlayerId) {

	// ボイスDOMのidを作成する
	var sId = "#REMOTE_VOICE_" + iPlayerId;

	// 対象のDOMが存在する場合
	if ($(sId).length) {
		return true;
	}
	return false;	
}

/****************************************************
	関数名    CloseVoice
	機能	  対象のボイスを非表示にする
****************************************************/
function CloseVoice(oDiv) {
	var sTargetId = $(oDiv).data("target");
	$("#" + sTargetId).hide("slow");
}

/****************************************************
    関数名    ShowRemoteWerewolfVoice
	機能      リモートモードでの人狼ボイス表示の初期化を行う。
			本関数は、初日のカード選択画面においては
			スクロール開始時に実行する。
			それ以外のタイミングでは、#Dreamの表示タイミングで行う。
    
    入力     sRole	対象プレイヤーの役職
    出力     なし
    
	処理概要
			1. リモート人狼での人狼ボイスが不要な場合
			 1.1. 何もしないで終了する
			2. 人狼ボイスを初期化し、エリア表示する
			3. 人狼アクションJSONをAJAX読み込み開始する
****************************************************/
function ShowRemoteWerewolfVoice(sRole) {

	// リモートモードでない場合
	if (gsRemoteGameId == "" || gsRemoteGameId == undefined) {
		return;
	}

	// 自分が人狼でない場合
	if (sRole != "Werewolf") {
		return;
	}

	// 人狼が2人以上生き残っていない場合
	if (giWerewolfLiveNum < 2) {
		return;
	}

	// 人狼ボイスを初期化する
	$("#WerewolfRemoteMessage").empty();

	// 人狼ボイスを表示する
	$("#WerewolfRemoteMessage").show();

	// 人狼ボイスを受信開始する
	SetIntervalAtPage("ReceiveWerewolfVoice()", 2000, "Dream", 30);
	
}

/* フェーズ2 **********************************************/
/* ver.12.2.0 オンラインモード プレイヤー用関数 ******************/

/****************************************************
	関数名    MakeOnlineGame
	機能     ゲームルームを作成します。
    
	入力     なし
	出力     Ajax
****************************************************/
var gsGameMode = "";
function MakeOnlineGame(oJSON) {
	gsGameMode = "Online";

	// アカウント登録が完了していない場合
	gAccount = LoadData("gAccount");
	if (gAccount == "") {
		// アカウント登録を促すメッセージを表示する
		jQT.goTo("#Account");
		gsReturnPage = "MakeOnlineGame";
		var aMessage = GetAlertMessage("ErrNeedAccountRegist");
		ShowAlert(aMessage[0], aMessage[1]);
		return false;
	}

	// すでにルームが作られている場合
	gsRoomId = LoadData("gsRoomId");
	if (gsRoomId != "") {
		GoToPage("#GameRoom");
		InitGameRoom();
		return;		
	}

	// 送信モードの場合
	if (oJSON == undefined) {

		// ゲームルームの作成を行う
		DoAjax("MakeOnlineGame");

	// 受信モードの場合
	} else {

		// ゲームルームIDを取得する
		var oData = oJSON["DATA"];
		gsGameRoomStatus = WAIT_JOIN_PLAYERS;
		gsRoomId = oData.room_id;

		SaveGame("GameRoom");

		GoToPage("#GameRoom");
		InitGameRoom();

	}

}

/****************************************************
	関数名    JoinGame プレイヤー専用
	機能      参加プレイヤーがゲームに参加します。
			 remote_room.php にgAccount.id(user_id) と room_id を送信します。
			 データの作成は MakeDataPack で行います。
    
	入力     なし
	出力     Ajax
****************************************************/
function JoinGame(oJSON) {

	// 送信モードの場合
	if (oJSON == undefined) {

		// ゲームルームの作成を行う
		DoAjax("JoinGame");

	// 受信モードの場合
	} else {

		// ゲームルームIDを取得する
		var oData = oJSON["DATA"];
		gsGameRoomStatus = oData.status_text;;
		gsRoomId = oData.room_id;
		gsRemoteMode = "PLAYER";

		SaveData("gsRoomId");

		jQT.goTo("#JoinRoom_1");

	}
	return;

}

function GetPlayerIdByAccountId() {
	for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
		if (gAccount.id == gaPlayer[iCnt].iId) {
			return iCnt;
		}
	}
	return -1;
}

/****************************************************
	関数名    InitGameRoom
	機能	  ゲームルーム画面を初期化する
			 1. ルーム用のQRコードを作成する
			 2. ルームURLを作成する
			 3. 5秒ごとにJSONファイルをチェックしにいく
			  3.1. JSONファイルの内容でプレイヤーリストを作成する
****************************************************/
function InitGameRoom() {

	// リモートモードをオンにする
	gsRemoteMode = "GM";

	// falfal デバッグ
	// gsRoomId = "AAAA123";

	if (gsRoomId == "") {
		aMessage = GetAlertMessage("ErrRemoteGameIdIsNull", "");
		ShowAlert(aMessage[0], aMessage[1]);
		return false;
	}

	var sRemoteUrl = gsRemotePlayerUrl + "?r=" + gsRoomId + "&" + gsLocale;

	// すでに表示されているQRコードを削除して初期化 2021.10.13 ver.11.0.0
	var sCanvasName = "QRCanvasRoom";
	$("#" + sCanvasName + " img").remove();

	var qrcode = new QRCode(document.getElementById(sCanvasName), {
		text: sRemoteUrl,
		width: 180,
		height: 180,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.M
	});

	$("#RoomUrlForCopy").val(sRemoteUrl);

	// ゲームマスターの情報を表示する
	$("#GameRoom .GmPlayer .PlayerName").text(gAccount.nickname);
	$(".RoomId").text("Room: " + gsRoomId);

	SaveGame("GameRoom");

	$('#Footer').hide();

	// プレイヤー情報を取得する ← onPageLoadで実行する
	// SetIntervalAtPage("ReceiveRoomPlayer()", 5000, "GameRoom", 30);

	return;
}

/****************************************************
	関数名    InitSortable
	機能     ドラッグアンドドロップのソート機能を有効にする
****************************************************/
var goSortable;
function InitSortable(sDomId, bActiveFlg) {


	// 初回の有効化
	if (bActiveFlg) {

		goSortable = new Sortable(document.getElementById(sDomId), {
			animation: 150,
			handle: ".DragButton",
			onEnd: function (evt) {
				// This function is called when the drag action ends
				//console.log('New order:', goSortable.innerHTML);
			}

		});

		/*
		// const sortableList = document.getElementById("sortable-list");
		goSortable = $("#" + sDomId)[0];

		Sortable.create(goSortable, {
			animation: 150,  // Smooth animation when items are being dragged
			handle:".DragButton",
			onEnd: function (evt) {
				// This function is called when the drag action ends
				//console.log('New order:', goSortable.innerHTML);
			}
		});
		*/

		Log("!!!Sortableが有効になりました");
		
	} else {
		if (goSortable) {
			
			goSortable.destroy();
			Log("!!!Sortableが無効になりました");
		}
	}

}


/****************************************************
	関数名    AddPlayerFromJson
	機能     オンラインモード用関数
			JSONデータから取得したプレイヤー情報を元に
			新規アカウントを追加する
	入力     aPlayerData
	出力     bError     最大数を超えて追加しようとするとエラーを返す
****************************************************/
function AddPlayerFromJson(sMode) {
	Log("AddPlayerFromJson");
	var sOutputId;
	var sTemplateId;

	switch (sMode) {
		case "GameRoomEdit":
			sOutputId = "#GameRoomEdit .RoomPlayerList";
			sTemplateId = "#GameRoomEdit .RoomPlayerList_TEMPLATE";
			break;

		case "GameRoom":
		default:
			sOutputId = "#GameRoom .RoomPlayerList";
			sTemplateId = "#GameRoom .RoomPlayerList_TEMPLATE";
			break;
	}

	// 出力先DIVを空にする
	$(sOutputId).empty();

	// プレイヤーの数だけ繰り返す
	for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

		// テンプレートを複製する
		var htmlTemplate = $(sTemplateId).clone();
		htmlTemplate.removeAttr("style");
		htmlTemplate.removeClass("RoomPlayerList_TEMPLATE");

		// SortableでgaPlayerの並び順を変更するときに
		// 使用します。
		htmlTemplate.attr("data-id", iCnt);
		htmlTemplate.addClass("Player"+gaPlayer[iCnt].iId);

		// プレイヤー名、サムネイル画像を表示する
		htmlTemplate.find('.stats-avatar-image').attr("src", gaPlayer[iCnt].imgFace);
		htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);
		Log("1918:gaPlayer[iCnt].iId=" + gaPlayer[iCnt].iId);
		var sId = gaPlayer[iCnt].iId;
		htmlTemplate.find('.DeleteButton').attr("data-id", sId);
		htmlTemplate.find('.DeleteButton').on("click", function (event) {
			DeletePlayerEditRoom(this);
		});


		// プレイヤー情報がゲームマスター自身の場合
		if (gAccount.id == gaPlayer[iCnt].iId) {
			// ゲームマスターのラベルを表示する
			htmlTemplate.find('.GmLabel').show();
			htmlTemplate.addClass('GmPlayer');

			// ゲームマスターがゲームに参加しない場合
			if (gbGmIsNotPlayer) {
				switch (sMode) {
					case "GameRoomEdit":
						break;

					case "GameRoom":
					default:
						// GMの表示を薄くする
						htmlTemplate.css("opacity", "0.5");

						// HTMLに加える
						htmlTemplate.appendTo(sOutputId);

						break;
				}

			// ゲームマスターがゲームに参加する場合
			} else {
				// 削除ボタンを非表示にする
				htmlTemplate.find(".DeleteButton").css("visibility","hidden");
				// HTMLに加える
				htmlTemplate.appendTo(sOutputId);
			}

		// ゲームマスター以外の場合
		} else {
			// HTMLに加える
			htmlTemplate.appendTo(sOutputId);

		}

	}

}

/****************************************************
	関数名    ReceiveRoomPlayer
	機能      GameRoomに参加したプレイヤー情報を取得する
	
	入力     なし
	出力     なし
    
	処理概要
			1. サーバからJSONファイルを読み込む
			2. プレイヤー情報に対して繰り返す
****************************************************/
function ReceiveRoomPlayer() {

	//	var sStatusURL = gsRemoteImgFaceDir + gsRoomId + "_status.json?" + sSerial;
	var sStatusURL = gsRemoteRoomDir + gsRoomId + "_status.json";

	Log("ReceiveRoomPlayer:"+sStatusURL);
	
	// ローカルdebg用
	/*
	switch (gsGameRoomStatus) {
		case WAIT_JOIN_PLAYERS:
			var sStatusURL = "http://localhost:8888/gameroom_wait.json?";
			break;
		case STOP_JOIN_PLAYERS:
		default:
			var sStatusURL = "http://localhost:8888/gameroom_stop.json?";
			break;
	}
	*/

	// AJAXでデータを取得する
	xhr = $.ajax({
		type: "GET",
		url: sStatusURL,
		data: "",
		dataType: "text",
		cache: false,
		crossDomain: true
	})
		.done(function (data) {

			// 送信されたJSON文字列をデータに戻す
			//oData = JSON.parse(data);
			var oData = $.parseJSON(data);
			Log("oData↓");
			Log(oData);

			// アクションデータを取得する
			var oDataJSON = $.parseJSON(oData.data_json);
			Log("oDataJSON↓");
			console.log(oDataJSON);
	
			gaPlayer = oDataJSON.gaPlayer;
			Log("gaPlayer:");
			Log(gaPlayer);

			// GMを強制的に追加する
			AddGmToFirst();

			// gaPlayerに同じプレイヤーが複数含まれたら削除する
			gaPlayer = DeleteDoubleData(gaPlayer, "iId");

			SaveData("gaPlayer");

			// プレイヤーを画面に追加する
			AddPlayerFromJson();

			// プレイヤー募集画面にいるのに、ステータスが異なる場合
			// GMが再起動したときに起きます。
			if ($(".current")[0].id == "GameRoom" && oData.status_text !== WAIT_JOIN_PLAYERS) {
				// JSONファイルのステータスを WAIT_JOIN_PLAYERS に変更する
				gsGameRoomStatus = WAIT_JOIN_PLAYERS;
				UpdateStatusJSON();
			}

		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			Log("ajax通信に失敗しました");
			Log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
			Log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
			Log("errorThrown    : " + errorThrown.message); // 例外情報
			Log("Ajax Connect Error");

			// JSONファイルが存在しない場合
			if (jqXHR.status == "404") {
				// ゲームが削除されたものとして、gsRemoteGameIdを削除する
				gsRemoteGameId = "";
				gsRemoteMode = "";
				gsRoomId = "";
				SaveGame();
				aMessage = GetAlertMessage("RemoteQuitGame", "");
				ShowAlert(aMessage[0], aMessage[1]);
				jQT.goTo("#Top");
				return;
			}
		})
		.always(function () {
			Log("411: ajax.always/ajax処理終了");
			// alert( "complete" );
		});


}

/****************************************************
	関数名    InitGameRoomEdit
	機能      ゲームルーム編集画面を初期化する
****************************************************/
function InitGameRoomEdit() {

	// GameRoomのプレイヤー情報取得を停止する
	giStopTime = 0;

	// プレイヤーをgaPlayerから表示します
	AddPlayerFromJson("GameRoomEdit");

	// ソート可能にする
	InitSortable("GameRootEditSortable", true);
	
}

/****************************************************
	関数名    SaveMemberAndBack
	機能      ゲームルーム編集画面からメンバー追加画面に戻る。
			 戻る際、並び順をサーバー上のJSONに反映させる。
			 もし、「ゲームマスターはゲームに参加しない」場合は
			 gaPlayer[0]に、ゲームマスター自身を追加してから
			 バックする。

	処理概要	1. Sortableのリストから添字の並び順を取得する
			   2. ゲームマスターはゲームに参加しない場合
			    2.1. 添字の並び順の最初に「0」を追加する
			   3. gaPlayerの並び順を、並び順編集の内容にあわせて並び替える
			   4. DoAjax用の送信データを作成する
			   5. DoAjaxを実行する
			   6. Ajaxが成功するとUpdateMember_Success()が実行される
****************************************************/
function SaveMemberAndBack() {
	
	// Sortableのリストから添字の並び順を取得する
	const items = document.querySelectorAll('#GameRootEditSortable .PlayerList');
	var aSortList = Array.from(items).map(item => item.getAttribute('data-id'));
	// ソートリストを数字に変更
	aSortList = aSortList.map(Number);
	Log(aSortList); // 更新後の配列を表示
	Log(gaPlayer);

	// ゲームマスターはゲームに参加しない場合
	if (gbGmIsNotPlayer) {
		// 添字の並び順の最初に[0]を追加する
		aSortList.unshift(0);

		// メンバーにGMを追加する
		//AddGmToFirst();
	}
	Log(aSortList); // 更新後の配列を表示

	// プレイヤー情報を並び替える
	gaPlayer = aSortList.map(index => gaPlayer[index]);

	Log("2100:並び替え後のgaPlayer");
	Log(gaPlayer);
	SaveData("gaPlayer");

	// 部屋のステータスを変更する
	gsGameRoomStatus = WAIT_JOIN_PLAYERS;

	// メンバー編集ページから戻る場合
	var sNowPage = GetCurrent();
	if (GetCurrent() == "GameRoomEdit") {
		// Sortableを無効にする
		InitSortable();
		
	}

	// サーバーサイドのJSONを更新する
	UpdateStatusJSON();

}

/****************************************************
	関数名    UpdateStatusJSON
	機能      ゲームルーム編集画面を初期化する
****************************************************/
function UpdateStatusJSON(oJSON) {

	// 送信モードの場合
	if (oJSON == undefined) {

		// 送信するデータは、data_json
		DoAjax("UpdateStatusJSON");

	// 受信モードの場合
	} else {
		var oData = oJSON["DATA"];

		Log("2115:UpdateStatusJSON受信");
		Log(oData);
		Log(oData.status_text);

		// モードにあわせて処理を変更する
		switch (oData.status_text) {
			
			case WAIT_JOIN_PLAYERS:
				//gaPlayer = oData.data_json.gaPlayer;
				//Log("2120:gaPlayer");
				//Log(gaPlayer);

				// ユーザー追加画面に移動する
				jQT.goTo("#GameRoom");
				break;
			
			case STOP_JOIN_PLAYERS:
				// メンバー編集画面に移動する
				jQT.goTo("#GameRoomEdit");
				break;
			
			case START_GAME:

				// GMがプレイヤーではない場合
				if (giRemotePlayerId == -1) {

					SaveGame("SelectPlayer");

					// プレイヤー待機画面に移動する
					jQT.goTo('#RemoteWaitingGM');
				} else {

					// プレイヤー番号を確認する
					Log("2385:giRemotePlayerId=" + giRemotePlayerId);
					// プレイヤーを参加状態にするためサーバーアクセスする
					SelectPlayer();
				}
				break;
			
			// ゲームルームを破棄する
			case DELETE_GAME_ROOM:
				// ゲームルームIDを削除する
				gsRoomId = "";
				gsRemoteGameId = "";
				gsStage = "";

				SaveGame();
				// トップページに戻る
				// Topに戻す
				InitTopPage();
				GoToPage("#Top");

				aMessage = GetAlertMessage("DeleteGameRoom", "");
				ShowAlert(aMessage[0], aMessage[1]);

				break;
		}

	}
	return;

}

/****************************************************
	関数名    StopJoinPlayer
	機能      ゲームルームへの招待を締め切って編集画面に移動する
			 ゲームマスターがプレイヤーとして参加しない場合は
			 giRemotePlayerId = -1 とする。
			 gaPlayerからゲームマスターを取り除く。


****************************************************/
function StopJoinPlayer() {

	gsGameRoomStatus = STOP_JOIN_PLAYERS;

	// ゲームマスターがゲームに参加しない場合
	if (gbGmIsNotPlayer) {
		giRemotePlayerId = -1;
		// プレイヤーの人数が4人以下の場合
		if (gaPlayer.length <= 4) {
			aMessage = GetAlertMessage("ErrPlayerMin", "4");
			ShowAlert(aMessage[0], aMessage[1]);
			return;
		}
	} else {
		// プレイヤーの人数が4人以下の場合
		if (gaPlayer.length <= 3) {
			aMessage = GetAlertMessage("ErrPlayerMin", "4");
			ShowAlert(aMessage[0], aMessage[1]);
			return;
		}

	}

	// GMがゲームに参加しない場合は、GMを0番目に変更する
	if (!gbGmIsNotPlayer) {
		
		gAccount = LoadData("gAccount");

		// GMを0番目に追加したあと、重複（GM）を削除する
		AddGmToFirst();

		// 重複するデータを削除する
		gaPlayer = DeleteDoubleData(gaPlayer, "iId");

	}

	// サーバー上のJSONを更新する
	UpdateStatusJSON();

}

/****************************************************
	関数名    DeletePlayerEditRoom
	機能      ゲームルーム編集画面用のプレイヤー削除機能
****************************************************/
function DeletePlayerEditRoom(oObject) {
	var iPlayerId = oObject.getAttribute('data-id');

	// 対象のプレイヤーオブジェクト番号
	var iPlayerNum = GetPlayerObjectNum(iPlayerId);
	Log("756:" + iPlayerId + "/" + iPlayerNum);

	// プレイヤー名を取得する
	var sPlayerName = gaPlayer[iPlayerNum].sName;

	// 確認アラートを表示する。OKの場合、DoneDeletePlayerを実行する
	var aMessage = GetAlertMessage("DeletePlayer", sPlayerName);
	ShowConfirm(aMessage[0], aMessage[1], "DoneDeletePlayerEditRoom(" + iPlayerId + "," + iPlayerNum + ")");

	return;

}

/****************************************************
	関数名    DoneDeletePlayerEditRoom
	機能      ゲームルーム編集画面用のプレイヤー削除機能
****************************************************/
function DoneDeletePlayerEditRoom(iPlayerId, iPlayerNum) {

	Log("DoneDeletePlayerEditRoom");

	// 対象のプレイヤーデータを初期化する（メモリリーク防止）
	gaPlayer[iPlayerNum] = {};

	// gaPlayerから対象の配列を削除する
	gaPlayer.splice(iPlayerNum, 1);

	// Setting画面から指定されたdivを削除する
	var sPlayerDivId = "#GameRoomEdit .Player" + iPlayerId;

	Log("2205 削除対象DOM=" + sPlayerDivId);
	
	$(sPlayerDivId).remove();

	// プレイヤーデータをセーブする
	SaveData("gaPlayer");

	// プレイヤーリストのDOMを再作成する。
	// そうしないと、並び順のdata-idに、欠番ができてしまい、gaPlayerの並び替えができない
	AddPlayerFromJson("GameRoomEdit");

	return;
}


/* 参加プレイヤー用の処理 **************************************/
/****************************************************
	関数名    ShowGameRoomJoin
	機能      プレイヤーがルーム参加するための画面を表示する
****************************************************/
function ShowGameRoomJoin() {
	
	// リモート表示にしておく
	SwitchRemoteClass();

	// debug用
//	var sStatusURL = "http://localhost:8888/gameroom.json";
	var sStatusURL = gsRemoteRoomDir + gsRoomId + "_status.json";
	SaveData("gsRoomId");

	// AJAXでデータを取得する
	xhr = $.ajax({
		type: "GET",
		url: sStatusURL,
		data: "",
		dataType: "text",
		cache: false,
		crossDomain: true
	})
	.done(function (data) {

		// 送信されたJSON文字列をデータに戻す
		//oData = JSON.parse(data);
		var oData = $.parseJSON(data);
		Log("2454:ShowGameRoomJoin! Status="+oData.status_text);
		Log(JSON.stringify(oData));

		// アクションデータを取得する
		var oDataJSON = $.parseJSON(oData.data_json);

		//var oGameMaster = oDataJSON.game_master;
		var oGameMaster = oDataJSON.game_master;
		if (!oGameMaster) {
			oGameMaster = oData.game_master;
		}

		// プレイヤー自身を表示する
		$("#JoinRoom .MyAccount .PlayerName").text(gAccount.nickname);
		$("#JoinRoom .MyAccount .stats-avatar-image").attr("src", gAccount.image_url);
		Log("2585:gAccount.image_url=" + gAccount.image_url);

		// ゲームマスター情報を表示する
		$("#JoinRoom .GameMaster .PlayerName").text(oGameMaster.sName);
		$("#JoinRoom .GameMaster .stats-avatar-image").attr("src", oGameMaster.imgFace);
		Log("2585:oGameMaster.imgFace=" + oGameMaster.imgFace);

		// ルームIDを表示する
		$(".RoomId").text("Room: " + gsRoomId);

		// フッターメニューを非表示にする
		$("#Footer").hide();

		// ステージを保存する
		SaveGame("JoinRoom");

		// ページ遷移する
		jQT.goTo("#JoinRoom");

	})
	.fail(function (jqXHR, textStatus, errorThrown) {
		Log("ajax通信に失敗しました");
		Log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
		Log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
		Log("errorThrown    : " + errorThrown.message); // 例外情報
		Log("Ajax Connect Error");

		// JSONファイルが存在しない場合
		if (jqXHR.status == "404") {
			// ゲームが削除されたものとして、gsRemoteGameIdを削除する
			gsRemoteGameId = "";
			gsRemoteMode = "";
			SaveGame();
			aMessage = GetAlertMessage("RemoteQuitGame", "");
			ShowAlert(aMessage[0], aMessage[1]);
			return;
		}
	})
	.always(function () {
		Log("411: ajax.always/ajax処理終了");
		// alert( "complete" );
	});

}

/****************************************************
	関数名    ReceiveRoomStatus
	機能      部屋のステータスをjsonにアクセスして確認する。
			 ステータスにあわせてページ遷移する。
****************************************************/
function ReceiveRoomStatus() {
	// debug用
//	var sStatusURL = "http://localhost:8888/gameroom.json";
	var sStatusURL = gsRemoteRoomDir + gsRoomId + "_status.json";

	// AJAXでデータを取得する
	xhr = $.ajax({
		type: "GET",
		url: sStatusURL,
		data: "",
		dataType: "text",
		cache: false,
		crossDomain: true
	})
		.done(function (data) {

			// 送信されたJSON文字列をデータに戻す
			//oData = JSON.parse(data);
			var oData = $.parseJSON(data);
			Log(JSON.stringify(oData));

			// ステータスを取得する
			var sStatus = oData.status_text;

			Log("2592:ReceiveRoomStatus=" + sStatus);

			// ステータスによって切り替える
			switch (sStatus) {
				case WAIT_JOIN_PLAYERS:

					// gaPlayerに自分が含まれるかチェックする
					giRemotePlayerId = GetMyPlayerId(oData);

					// 自分が参加していない場合
					if (giRemotePlayerId == -1) {
						// 参加画面に戻す
						jQT.goTo("#JoinRoom");
						return;
					}

					jQT.goTo("#JoinRoom_1");

					break;
				
				case STOP_JOIN_PLAYERS:
					jQT.goTo("#JoinRoom_2");

					break;
				
				case START_GAME:

					// 自分の並び順を giRemotePlayerId に格納する
					giRemotePlayerId = GetMyPlayerId(oData);
					SaveData("giRemotePlayerId");

					// 自分が含まれていない場合
					if(giRemotePlayerId == -1){
						aMessage = GetAlertMessage("ErrYouAreKicked", "");
						ShowAlert(aMessage[0], aMessage[1]);

						// 参加ページに移動する
						jQT.goTo("#JoinRoom");
						return;

					// 自分が含まれている場合
					} else {

						// ルーム情報を格納する
						var oDataJSON = $.parseJSON(oData.data_json);
						gsRemoteGameId = oDataJSON.gsRemoteGameId;
						SaveData("gsRemoteGameId");
						Log("gsRemoteGameId=" + gsRemoteGameId);

						jQT.goTo("#JoinRoom_3");
						break;

					}

			}


		})
		.fail(function (jqXHR, textStatus, errorThrown) {
			Log("ajax通信に失敗しました");
			Log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
			Log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
			Log("errorThrown    : " + errorThrown.message); // 例外情報
			Log("Ajax Connect Error");

			// JSONファイルが存在しない場合
			if (jqXHR.status == "404") {
				// ゲームが削除されたものとして、gsRemoteGameIdを削除する
				gsRemoteGameId = "";
				gsRemoteMode = "";
				SaveGame();
				aMessage = GetAlertMessage("RemoteQuitGame", "");
				ShowAlert(aMessage[0], aMessage[1]);
				return;
			}
		})
		.always(function () {
			Log("411: ajax.always/ajax処理終了");
			// alert( "complete" );
		});
	
}

/****************************************************
	関数名    GoToCheckRoleNumOnlineMode
	機能      オンラインモードで、メンバー編集を完了し
			ルール設定画面へと移動する。

	処理概要
			1. メンバーが４人未満の場合はエラー終了する
			2. gaPlayerは、ルーム用の最低限のデータしか入っていないため
			   正しいgaPlayerを作成する。
			3. #CheckRoleNum ルール設定画面に移動する
****************************************************/
function GoToCheckRoleNumOnlineMode() {

	Log("2529:GoToCheckRoleNumOnlineMode:" + gaPlayer.length);

	// Sortableのリストから添字の並び順を取得する
	const items = document.querySelectorAll('#GameRootEditSortable .PlayerList');
	var aSortList = Array.from(items).map(item => item.getAttribute('data-id'));
	// ソートリストを数字に変更
	aSortList = aSortList.map(Number);
	Log(aSortList); // 更新後の配列を表示

	// ゲームマスターはゲームに参加しない場合
	if (gbGmIsNotPlayer) {
		// 添字の並び順の最初に[0]を追加する
		aSortList.unshift(0);
	}
	Log(aSortList); // 更新後の配列を表示

	// プレイヤー情報を並び替える
	gaPlayer = aSortList.map(index => gaPlayer[index]);

	
	// GMがプレイヤーでない場合
	if (gbGmIsNotPlayer) {
		// GMは、必ず0番目にいるので0番目を削除する
		gaPlayer.splice(0, 1);
		
	}
	
	// 人数が4人未満の場合
	if (gaPlayer.length < giPlayerMin) {
		aMessage = GetAlertMessage("ErrPlayerMin", giPlayerMin);
		ShowAlert(aMessage[0], aMessage[1]);
		return false;
	}

	// gaPlayerに対して繰り返す
	for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++){

		// 画像が未定の場合
		if (gaPlayer[iCnt].imgFace == "") {
			gaPlayer[iCnt].imgFace = gsFaceIcon;
		}
		// 初期値
		gaPlayer[iCnt].iId = gaPlayer[iCnt].iId;
		gaPlayer[iCnt].bLive = true;
		gaPlayer[iCnt].bCheckedFlg = false;
		gaPlayer[iCnt].sRole = "Citizen";
		gaPlayer[iCnt].iSuspect = 0;
		gaPlayer[iCnt].iTotalPoint = 0;
		gaPlayer[iCnt].iAddPoint = 0;
		gaPlayer[iCnt].iWerewolfTeamCnt = 0;
		gaPlayer[iCnt].iOracleId = -1;
	}
	SaveData("gaPlayer");

	// Sortableを無効にする
	InitSortable();

	// ページを移動する
	jQT.goTo("#CheckRoleNum", "fade");

	return;
}


function BackToPlayerSetting() {

	// オンラインモードの場合
	if (gsRemoteMode != "") {
		jQT.goTo('#GameRoomEdit');	
		
	} else {
		jQT.goTo('#PlayerSetting');	

	}
}

/****************************************************
	関数名    DeleteDoubleData
	機能      gaPlayerなどのクラス配列で
			　重複したデータがあった場合、重複データを削除します。
    
	入力    　aArray
			sKey	チェック対象キー
	出力     aReturn 返却配列
    
	処理概要
			1. 元配列に対して繰り返す
			 1.1. 返却配列に対して繰り返す
			  1.1.1. 返却配列に対象の元データが重複した場合
			   1.1.1.1. 重複フラグをオンにする
			 1.2. 重複していない場合
			  1.2.1. 返却配列に要素を追加する
			2. 返却配列をリターンして周リュする
****************************************************/
function DeleteDoubleData(aArray, sKey) {

	var aReturn = new Array();
	var bDouble = false;

	// すべての元配列に対して繰り返す
	for (var iCnt = 0; iCnt < aArray.length; iCnt++){

		// 重複チェックフラグの初期化をする
		bDouble = false

		// 返却配列に対して繰り返す
		for (var iReturnCnt = 0; iReturnCnt < aReturn.length; iReturnCnt++){
			
			// 重複した場合
			if (aArray[iCnt][sKey] == aReturn[iReturnCnt][sKey]) {
				bDouble = true;
			}

		}

		// 重複していない場合
		if (!bDouble) {
			
			// 返却配列に格納する
			aReturn.push(aArray[iCnt]);
		}
	}

	// 返却配列を返す
	return aReturn;
	
}

function AddGmToFirst() {
	gAccount = LoadData("gAccount");
	var oGmPlayer = {
		"iId": gAccount.id,
		"sName": gAccount.nickname,
		"imgFace": gAccount.image_url
	}
	gaPlayer.unshift(oGmPlayer);

}

/****************************************************
	関数名    StartOnlineGameByPlayer
	機能      [room_id]_status.jsonを読み込み
			自分のプレイヤー順を取得する。
			自分が含まれない場合は、-1を返す。
    
	入力     oData	サーバーからの返却データ
	出力     iCnt	プレイヤー順
****************************************************/
function GetMyPlayerId(oData) {
	var oDataJSON = $.parseJSON(oData.data_json);
	gaPlayer = oDataJSON.gaPlayer;
	for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
		// 自分自身の場合
		if (gaPlayer[iCnt].iId == gAccount.id) {
			return iCnt;
		}
	}
	return -1;	
}