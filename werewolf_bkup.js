/****************************************************
Global変数
****************************************************/

/**********************************************
 * バージョン情報
 * **********************************************/
var gsVersion = "11.8.2";

var gbDebug = false; // デバッグモード：console.logを出力する

var gsEventCategory = "ver." + gsVersion;

var gbIsApp = false;

if (gbFull == true) {
    gsEventCategory += " SP";
}
if (gbSmartPass == true) {
    gsEventCategory += " SmartPass";
}
if (gbAppPass == true) {
    gsEventCategory += " App Pass";
}

// プラットフォームのチェック
var gsPlatform = "";


// バナー関連 （古いデータです。今はAdMobに置き換わりました）
var gsBannerDir = "https://werewolf.mo61.mobi/banner/";
// 現在のバナー番号
var giBannerCnt = 0;
var giTime = 0;
var gbBannerFlg = false;
var gdBanner = {};

// バージョン管理ファイル
//var gsVersionJSON = "https://werewolf.mo61.mobi/app_version.json";
var gsVersionJSON = "https://werewolf.network/topics/app_version.json";
//var gsVersionJSON = "http://localhost:8888/app_version_local.json";
var gsStoreURL = "";
var gbUpdateMust = false;
var gsUpdateVersion = "";

//** サブスク用変数 ここから ***************/
var goSubScFlg = {
    "CardMasterKey": false,
    "Adfree": false
};
var goSubScStartDate = {
    "CardMasterKey": false,
    "Adfree": false
};

// 課金サービスオブジェクト
var gPaymentService = null;


// プレイヤーID連番
var giPlayerNum = 0;

// プレイヤー最大数,最小数 *******************
var giPlayerMax = 20;
var giPlayerMin = 4;
var giTestPlayer = 5;

// プレイヤーデータ配列
var gaPlayer = [];

// 最終答え表示用の役割リスト
var gaPlayerAnswer = [];

// ステージ状態（Continue用）
var gsStage = "";

// 現在の対象プレイヤー番号
var giNowPlayerId = 0;

// 現在の投票プレイヤー番号リスト
var gaVotePlayerId = [];

// 日付カウンタ
var giDateNum = 0;


//** リモートモード関連 ************/
// リモートゲームID
var gsRemoteGameId = "";
// リモートモードの場合の自分のPlayerID
var giRemotePlayerId = -1;
// リモートモードで最初にプレイヤー選択した番号
// 同じ人を選ぶ可能性があるので、まだ確定ではない
//var giRemotePlayerIdTmp = -1;
// リモートゲームのGM端末の先別子
var gsRemoteMode = "";
// リモートでのアクションをまとめたオブジェクト
var gaRemoteAction = [];

// 夜のアクション用変数
var giRemoteToPlayerId = "";
var gsRemoteAction = "";

// ゲームの勝敗用変数
var gsRemoteGameSetResult = "";
//** リモートモード関連 ここまで************/


// ***** オプション設定 { ****

// 自動カードセットの値
var gsDefaultCardSet = "";

// 第1夜の殺害なしフラグ
var gbFirstNightNoKillFlg = true;

// 第1夜の占いなしフラグ
var gbFirstNightNoForetellFlg = false;

// 第1夜の占い設定（初期設定：人間を知る）
var giFirstNightForetell = 2;

// BGMフラグ
var gbBGMFlg = true;

// ランダムに役職を減らす
var gbReducingRoleFlg = false;

// 吸血鬼の占い結果を「人間」にする
var gbVampireHumanFlg = false;

// 投票を隠す （投票スタイルに吸収されるため、廃止予定 ver.9.5）
var gbHidingVoteFlg = false;

// 投票スタイル ver.9.5
var gsVotingStyle = "";

// 票割れ時の判決 ver.9.6
var gsSameVote = "";

// 自動的に答えをパスする
var gbPassAnswerFlg = true;

// 裁判タイマー表示
//var gbJudgementTimerFlg = true;
var giJudgementTimer = 0;

// ゲームマスターツール表示
var gbGmToolFlg = false;

// ***** } オプション設定 ****


// 朝の話し合い時間（分）
var giMin = 4;
var giMinJudgement = 1;

// 占い師のチェック済みフラグ配列
var gaForetellFlg = [];
var giForetellFirstRandom = -1;

// パパラッチのチェック済みフラグ配列
var gaScoopFlg = [];

// ガード対象プレイヤーID
var giGuardPlayerId = -1;

// 降霊した役職（翌朝に役職を変更するための一時保存変数）
var gsNecromancyRole = "";
var giNecromancyPlayerId = null;

// マジシャン交換した役職（翌朝に役職を変更するための一時保存変数）
var goMagician = {
    "sRole": "",
    "iFromPlayerId": -1,
    "iToPlayerId": -1
};

// 騎士の連続ガード禁止機能
var goDoubleGuard = {
    "bOnFlg": false,
    "iYesterdayPlayerId": -1
};

// ボマーの無敵使用フラグと、無敵中フラグ
var goBomb = {
    "bTrapped": false,
    "bUsed": false,
    "aAttackList": []
};

// 疑い数
var gaSuspect = [];

// 殺害対象
var gaKill = [];
var gaKillMust = [];
var gaKilledWerewolf = [];

// 闇の霊媒師による騎士殺害フラグ
var gbDarkShamanKillKnightFlg = false;
var gaKnightPlayerId = [];

// 運命の恋人の死亡フラグ
var gaDestinedLoversPlayerId = [];

// レインマンの生存フラグ
var gbRainManLifeFlg = false;
var giRainManCnt = 0;
var gbLightningFlg = false;

// 昨日の処刑対象者ID
var giYesterdayJudge = -1;

// 殺害選択した人狼プレイヤーId
var gaKillWerewolfId = [];

// 投票数リスト
var gaVoteNum = [];

// 言語設定
// 言語設定をSaveDataするように仕様変更 ver.9.5
//var gsLocale = GetLocale();
var gsLocale = "";

// 次のページ設定
var gsNextPage = "";

// 最後に殺害されたプレイヤーID
var giLastDeadId = -1;

// 狼の生き残り数 ver.3.2. WerewolfVoice対応
var giWerewolfLiveNum = 0;

// 前回の役割の内容 ver.3.3. 狼が繰り返しにならない対応
var gaPreGameRole = [];

// プレイヤーの順番差し替えモードフラグ
var giChangeOrderFrom = -1;
var gbChangeOrder = false;

// カードの枚数設定
var goCardNum = {};

/* 結果画面用の変数 ***********/
var giStartTime = 0;
var gsGameStartDate = "";


/* 購入情報関連 *****/
// ユーザーコード

var gsUserCode = "";
var gsCampType = "";

/****************************************************
    カード購入関連
*****************************************************/
var gaGotCardType = ["Lovers", "Psycho", "Vampire", "Rich", "Bat", "PsychoKiller", "GreatShaman", "Cosplayer", "Paparazzi", "Magician", "Bomber", "Mentalist", "DarkShaman", "Original", "DestinedLovers", "RainMan", "LegendaryWolf","PrisonBreaker","Oracle"];

// カード購入メダル数
var giMedalForCard = 100;

// アプリ内課金プロダクトID ver 8.7 Purchaseプラグインの刷新
var gaProductId = [
    "Werewolf.Lovers",
    "Werewolf.Psycho",
    "Werewolf.Vampire",
    "Werewolf.Rich",
    "Werewolf.Bat2",
    "Werewolf.PsychoKiller",
    "Werewolf.GreatShaman",
    "Werewolf.Cosplayer3",
    "Werewolf.Paparazzi",
    "Werewolf.Magician",
    "Werewolf.Bomber",
    "Werewolf.Mentalist",
    "Werewolf.DarkShaman",
    "Werewolf.Original",
    "Werewolf.DestinedLovers",
    "Werewolf.RainMan",
    "Werewolf.LegendaryWolf",
    "Werewolf.PrisonBreaker",
    "Werewolf.Oracle"
];

// ProductID設定 (プロダクト追加にあわせて更新！） ******************
var goProductIdMap = {};
goProductIdMap = {
    "Lovers": "Werewolf.Lovers",
    "Psycho": "Werewolf.Psycho",
    "Vampire": "Werewolf.Vampire",
    "Rich": "Werewolf.Rich",
    "Bat": "Werewolf.Bat2",
    "PsychoKiller": "Werewolf.PsychoKiller",
    "GreatShaman": "Werewolf.GreatShaman",
    "Cosplayer": "Werewolf.Cosplayer3",
    "Paparazzi": "Werewolf.Paparazzi",
    "Magician": "Werewolf.Magician",
    "Bomber": "Werewolf.Bomber",
    "Mentalist": "Werewolf.Mentalist",
    "DarkShaman": "Werewolf.DarkShaman",
    "Original": "Werewolf.Original",
    "DestinedLovers": "Werewolf.DestinedLovers",
    "RainMan": "Werewolf.RainMan",
    "LegendaryWolf": "Werewolf.LegendaryWolf",
    "PrisonBreaker": "Werewolf.PrisonBreaker",
    "Oracle": "Werewolf.Oracle",
    "cardmasterkey": "CardMasterKey",
    "adfree":"Adfree"

};


/****************************************************
    テスト用設定
*****************************************************/
function InitTest() {

    Log("50:InitTest---------");

    // 特定のページに移動して処理を確認したいときに
    // ページの初期化と、jQT.goTo("#ページ名");
    // を実行する

    // SetTextToWinPage("WerewolfWill");

    // ランキングを表示する
    //InitRankPage();

    // 全ページの文字をチェックする
    /*
    var sGetData = $(location).attr('search');

    if (sGetData.indexOf("AllDocument") > 0) {
        $("#jqt").children().css("position","relative");
        $("#jqt").children().show();
    }
    */


}
/****************************************************
    プレイヤークラス
****************************************************/
function Player(iId, sName, imgFace, bCpuFlg, sRole, iSuspect, bLive, bCheckedFlg, iTotalPoint, iAddPoint, iWerewolfTeamCnt) {

    // プレイヤー番号
    this.iId = iId;

    // 名前
    this.sName = sName;

    // 顔画像データ
    this.imgFace = imgFace;

    // CPUフラグ 0:Human 1:CPU
    this.bCpuFlg = bCpuFlg;

    // ロール
    this.sRole = sRole;

    // 怪しさポイント
    this.iSuspect = iSuspect;

    // 生存フラグ (1: Live / 0:Dead)
    this.bLive = bLive;

    // 死亡時の全プレイヤー役職チェック済みフラグ (1: Checked)
    this.bCheckedFlg = bCheckedFlg;

    // 合計ポイント
    this.iTotalPoint = iTotalPoint;

    // 今回のゲームで獲得したポイント
    this.iAddPoint = iAddPoint;

    // 人狼チームになった回数
    this.iWerewolfTeamCnt = iWerewolfTeamCnt;

    // 投票してきた人の配列
    this.aVotePlayers = [];

    // 神託者になった場合のお告げ先プレイヤーID
    this.iOracleId = -1;

};
// 殺害対象情報
function KillData(iFromPlayerId, iToPlayerId, iVote) {
    // 人狼のPlayerId
    this.iFromPlayerId = iFromPlayerId;
    // 殺害対象のPlayerId
    this.iToPlayerId = iToPlayerId;
    // 投票数（1人の場合は、1ptとなる）
    this.iVote = iVote;
};
// 死亡リスト情報
function KillVote(iPlayerId, iVote) {
    this.iPlayerId = iPlayerId;
    this.iVote = iVote;
};

/****************************************************
デフォルトカード数
****************************************************/
var gaCardType = [];
gaCardType = ["Werewolf", "Citizen", "FortuneTeller", "Shaman", "Knight", "Lovers", "Psycho", "Vampire", "Rich", "Bat", "PsychoKiller", "GreatShaman", "Cosplayer", "Paparazzi", "Magician", "Bomber", "Mentalist", "DarkShaman", "Original", "DestinedLovers", "RainMan", "LegendaryWolf","PrisonBreaker","Oracle"];
var gaDefaultCardInit = {};
gaDefaultCardInit = { "Werewolf": 0, "Citizen": 0, "FortuneTeller": 0, "Shaman": 0, "Knight": 0, "Lovers": 0, "Psycho": 0, "Vampire": 0, "Rich": 0, "Bat": 0, "PsychoKiller": 0, "GreatShaman": 0, "Cosplayer": 0, "Paparazzi": 0, "Magician": 0, "Bomber": 0, "Mentalist": 0, "DarkShaman": 0, "Original": 0, "DestinedLovers": 0, "RainMan": 0, "LegendaryWolf": 0, "PrisonBreaker": 0, "Oracle":0 };

var goCardMax = {};
goCardMax = { "Werewolf": 3, "Citizen": 20, "FortuneTeller": 1, "Shaman": 2, "Knight": 1, "Lovers": 2, "Psycho": 19, "Vampire": 1, "Rich": 2, "Bat": 1, "PsychoKiller": 1, "GreatShaman": 1, "Cosplayer": 1, "Paparazzi": 1, "Magician": 1, "Bomber": 1, "Mentalist": 1, "DarkShaman": 1, "Original": 2, "DestinedLovers": 2, "RainMan": 1, "LegendaryWolf": 1, "PrisonBreaker": 1, "Oracle": 19 };

/*
var goCardMin = [];
goCardMin = {"Werewolf":1,"Citizen":4,"FortuneTeller":0,"Shaman":0,"Knight":0,"Lovers":0,"Psycho":0,"Vampire":0, "Rich":0, "Bat":0, "PsychoKiller":0, "GreatShaman":0, "Cosplayer":0, "Paparazzi":0, "Magician":0};
*/

/****************************************************
     役割設定
*****************************************************/
var goCardSrc = [];
goCardSrc = {
    "Werewolf": "img/Card_Werewolf.png",
    "Citizen": "img/Card_Citizen.png",
    "FortuneTeller": "img/Card_FortuneTeller.png",
    "Shaman": "img/Card_Shaman.png",
    "Knight": "img/Card_Knight.png",
    "Lovers": "img/Card_Lovers.png",
    "Psycho": "img/Card_Psycho.png",
    "Vampire": "img/Card_Vampire.png",
    "Rich": "img/Card_Rich.png",
    "Bat": "img/Card_Bat.png",
    "PsychoKiller": "img/Card_PsychoKiller.png",
    "GreatShaman": "img/Card_GreatShaman.png",
    "Cosplayer": "img/Card_Cosplayer.png",
    "Paparazzi": "img/Card_Paparazzi.png",
    "Magician": "img/Card_Magician.png",
    "Bomber": "img/Card_Bomber.png",
    "Mentalist": "img/Card_Mentalist.png",
    "DarkShaman": "img/Card_DarkShaman.png",
    "Original": "img/Card_Original.png",
    "DestinedLovers": "img/Card_DestinedLovers.png",
    "RainMan": "img/Card_RainMan.png",
    "LegendaryWolf": "img/Card_LegendaryWolf.png",
    "PrisonBreaker": "img/Card_PrisonBreaker.png",
    "Oracle": "img/Card_Oracle.png"
    
};

// デフォルトの画像ファイル名
var gsFaceIcon = "img/FaceIcon.jpg";
var gsFaceIconSmall = "img/FaceIcon75.jpg";

/****************************************************
     音声ファイル ※ おそらく、もう使っていない配列です 2022.06.07
*****************************************************/
var gaAudio = [

    "audio/NA_JP_0.mp3",

    "audio/Bell.mp3",
    "audio/BellShort.mp3",
    "audio/Gun.mp3",
    "audio/DreamLoop.mp3",
    "audio/Morning.mp3",
    "audio/MorningLoop.mp3",
    "audio/WinCitizen.mp3",
    "audio/WinWerewolf.mp3",
    "audio/WinVampire.mp3",
    "audio/GotCard_DropKey.mp3",
    "audio/GotCard_OpenKey.mp3"

];

/****************************************************
     獲得ポイント
*****************************************************/
var giPoint = {
    "WerewolfWin": 15,
    "VampireWin": 20,
    "CitizenWin": 10,
    "Alive": 1,
    "FirstTarget": 3
};

// ファーストターゲットフラグ
var gbFirstTargetFlg = true;

/****************************************************
     数字を番目表記にする
*****************************************************/
var goDateText = [
    "0", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th"
];

/****************************************
 * 先読み画像
 */
var gaPreloadImage = [
    "img/CardSliderBackground.jpg",
    './img/backButton.png',
    './img/backButtonPressed.png',
    './img/grayButton.png',
    './img/redButton.png',
    './img/greenButton.png',
    './img/blueButton.png',
    './img/toolButton.png',
    './img/whiteButton.png',

    './img/grayButtonPressed.png',
    './img/redButtonPressed.png',
    './img/redButtonSmallPressed.png',
    './img/greenButtonPressed.png',
    './img/blueButtonPressed.png',
    './img/whiteButtonPressed.png',


    './img/loading.gif',
    './img/BackgroundWood.png',
    './img/toolbar.png',
    './img/Background_Night.jpg',
    './img/Background_Morning.jpg',
    './img/Background_RainSky.jpg',
    './img/Background_Sunset.jpg',
    './img/TopTitleJp.png',
    './img/reflect.png',

    './img/Card_Werewolf.png',
    './img/Card_Citizen.png',
    './img/Card_FortuneTeller.png',
    './img/Card_Knight.png',
    './img/Card_Shaman.png',
    './img/Card_Lovers.png',
    './img/Card_Psycho.png',
    './img/Card_Vampire.png',
    './img/Card_Rich.png',
    './img/Card_Bat.png',
    './img/Card_PsychoKiller.png',
    './img/Card_GreatShaman.png',
    './img/Card_Cosplayer.png',
    './img/Card_Paparazzi.png',
    './img/Card_Magician.png',
    './img/Card_Bomber.png',
    './img/Card_Mentalist.png',
    './img/Card_DarkShaman.png',
    './img/Card_Original.png',
    './img/Card_DestinedLovers.png',
    './img/Card_RainMan.png',
    './img/Card_LegendaryWolf.png',
    './img/Card_PrisonBreaker.png',
    './img/Card_Oracle.png',


    './img/Card_Human.png',
    './img/Card_Vamp.png',
    './img/CardSetImage.png',
    './img/BloodImage.png',
    './img/spacer.gif',

    './img/NightPlayerListBg.png',
    './img/NightPlayerListBg_Blue.png',
    './img/NightPlayerListBg_Red.png',
    './img/DreamVoiceMark.png'
];


/****************************************************
    カスタムURLスキーム起動時の処理（handleOpenURLはプラグイン関数）
    リモートプレイヤー（GMではない）が実行する
****************************************************/
function handleOpenURL(url) {
    var sScheme = "werewolfnmip://?";

    // 今回のリモートゲームIDを設定する
    var sNewRemoteGameId = url.split(sScheme)[1];

    // GMが間違えて起動した場合の対応
    if (CheckRemoteGmMissReboot(sNewRemoteGameId) == false) {
        // ContinueGameで元の画面に戻る
        ContinueGame();
        return;
    }

    // RemoteのPlayerであることを設定する
    gsRemoteMode = "PLAYER";

    // localStorageに保存されたリモートゲームIDを取得
    var sPreRemoteGameId = LoadData("gsRemoteGameId");

    Log("505: sNew / sPreRemoteGameId = " + sNewRemoteGameId + " / " + sNewRemoteGameId);

    // 新しいゲームの場合
    if (sNewRemoteGameId != sPreRemoteGameId) {

        // 新規ゲームとしてゲームIDを更新する
        gsRemoteGameId = sNewRemoteGameId;

        // 自分のプレイヤーIDを初期化する
        giRemotePlayerId = -1;

        SaveGame("NewGame");

        // リモートゲーム中に再起動した場合
    } else {
        // 保存されていたプレイヤーIDをグローバル変数に反映する
        giRemotePlayerId = LoadData("giRemotePlayerId");
    }

    // プレイヤー用の表示をする
    $(".GM").hide();
    $(".PLAYER").show();

    // リモートゲームの初期化を行う
    // ページ移動と、各ページの初期化は、ここで行う
    InitRemoteGame();

}
// handleOpenURLのテスト用関数 index.html?id=リモートゲームIDを
// 設定することで、リモートプレイヤーとして起動できる
function TestHandleOpenURL() {
    
    // URLの"?"以降を取得
    var sGetData = $(location).attr('search');
    var aDatas = [];

    // 通常の起動の場合は何もしない
    if (sGetData == "" || sGetData == undefined) {
        return false;
    } else {
        Log("541: TEST PLAYER MODE ******************");
    }

    // gsRemoteGameId を取得
    aDatas = sGetData.split("=");
    
    // URLのお尻に"?id=リモートゲームID"を指定する
    var sRemoteGameId = GetUrlData("id");
    // カスタムURLスキームのURLを作成
//    var sUrl = "werewolfnmip://?" + aDatas[1];
    var sUrl = "werewolfnmip://?" + sRemoteGameId;

    // カスタムURLスキームを強制的に実行
    handleOpenURL(sUrl);

    return;

}

/****************************************************
    関数名    CheckRemoteGmMissReboot
    機能      GMがプレイヤー用の招待URLからアプリを起動した場合
             アラートを表示して、「続きから」を実行する。

    出力    bResult     ミスだった場合 falseを返す

    処理概要
             1. localStorageから gsRemoteMode と gsRemoteGameIdを取得。
             2. gsRemoteGameIdが起動で指定したGameIdと同じ場合
              2.1. gsRemoteModeがGMの場合
              2.2. アラートを表示する
              2.3. return false
            3. return true
****************************************************/
function CheckRemoteGmMissReboot(sNewGameId) {

    var sRemoteMode = LoadData("gsRemoteMode");
    var sRemoteGameId = LoadData("gsRemoteGameId");

    // 前回起動したときのリモートゲームIDと同じIDで
    // 招待ページから起動された場合
    Log("606:" + sRemoteGameId + "/" + sNewGameId + "/" + gsRemoteGameId);
    if (sRemoteGameId == sNewGameId || gsRemoteGameId == sNewGameId) {

        // もともとGMだった場合
        if (sRemoteMode == "GM") {
            // エラーアラートを表示する
            var aMessage = GetAlertMessage("RemoteGmMissReboot");
            ShowAlert(aMessage[0], aMessage[1]);
            return false;
        }

    }

    return true;

}

/****************************************************
    関数名    InitRemoteGame
    機能      カスタムURLスキームで起動された場合 or
             リモコンの人が、アプリを再起動した場合
             （LoadData("gsRemoteGameId")が空でない）
             サーバーから対象のゲームのステータスを取得し
             ステータスにあわせた処理を行う。

    入力     なし
    出力     なし
****************************************************/
function InitRemoteGame() {

    // リモートゲームIDが設定されていない場合（再起動時の処理）
    if (gsRemoteGameId == "") {
        // localStorageからリモートゲームIDを復元
        gsRemoteGameId = LoadData("gsRemoteGameId");
        giRemotePlayerId = LoadData("giRemotePlayerId");
        gsRemoteMode = LoadData("gsRemoteMode");

        // それでもデータが空の場合
        if (gsRemoteGameId == "") {
            // リモートモードではないので表示を切り替える
            SwitchRemoteClass();
            return;
        }
    }


    // サーバーの状態を確認し、サーバーのデータを
    // グローバル変数とlocalStorageに反映する
    GetRemoteStatus();

}

/****************************************************
    OnLoad event
****************************************************/
/****************************************************
    関数名    onBodyLoad
    機能        デバイスの準備ができたタイミングで、指定された関数を実行する

    入力        なし
    出力        なし

    処理概要
****************************************************/

function onBodyLoad() {

    gbIsApp = IsApp();

    console.log("741: IsApp() finished!!!!! "+gbIsApp);

    // Phonegapの場合
    if (gbIsApp==true) {
        Log("388:onBodyLoad Phonegap Load");
        // デバイスの準備ができてから実行する
        //document.addEventListener("deviceready", onDeviceReady, false);

        document.addEventListener('deviceready', async () => {
            // Obtain user consent first

            //Log("In AdMobCustom.js/ gbFull=" + gbFull + " / admob=");
            onDeviceReady();

            // ** 広告処理 **********************************************/
            // 無料版の場合
            /* トップ画面では広告を出さない仕様に変更
            if (gbFull != true) {

                // Admobを実行する
                initAdMob();
                await admob.start() // or start loading ads
                

                // ver.11 トップ画面ではバナーを表示しない
                // まだバナーが表示されていない場合
                /*
                if (gbBannerFlg == false) {

                    // フッターバナーを表示する
                    await banner.show();
                    gbBannerFlg = true;
                    Log("181 banner.showを実行完了 gbBannerFlg=" + gbBannerFlg);
                }

                $(".SubscriptionButton_Adfree").show();
                $(".SubscriptionButtonDisabled_Adfree").hide();

            }
            // 有料版の場合
            /*
            } else {

                // アドフリーの購入表示を購入済みに変更します
                $(".SubscriptionButton_Adfree").hide();
                $(".SubscriptionButtonDisabled_Adfree").show();

                // 広告が表示されている場合
                if (gbBannerFlg) {
                    banner.hide();
                    // 広告表示状態を非表示に変更する
                    gbBannerFlg = false;
                        
                }

            }
            */
                

            // Load ads here
        }, false)
        
    // ブラウザの場合
    } else {
        Log("392:NotPhonegap");
        // すぐに実行する
        onDeviceReady();
    }
    return;
}

// デバイスの準備ができたときに実行される
function onDeviceReady() {

    // プラットフォームのチェック
    gsPlatform = CheckPlatform();

    // 動作チェック用
    //alert("311:onDeviceReady");

    // Status Bar の調整
    // UDID格納する ver.4.5 UUIDのキーチェーンアクセス対応
    // UDIDとなっているが、実際はUUIDのこと。
    // $("#gUDID").val()に格納されるので、その後は、この値を使うこと。
    // GetUDID();

    // サブスクの初期化処理
    if (gbIsApp) {

        // サブスクの初期化 *******
        // 処理の軽量化を確認
        // 川上さんの処理を削除＆ inapppurchase-2の初期化を実行
        //gPaymentService = new PaymentService(gsPlatform);
        InitPurchase(goProductIdMap);
        
        Log("[PAYMENT] CREATING Payment Service DONE");

        // WindowOpenを InappBrowserにする
        window.open = cordova.InAppBrowser.open;

    }


    // 言語設定の読み込み **********************************************
    InitLocale();
    InitLanguage(gsLocale);

    // SP版設定 ***************************************************
    Log("734:before InitSPEdition");
    InitSPEdition();

    // Platform設定 ****************************************
    Log("507:before InitPlatform");
    InitPlatform();

    // fastClick.jsを使ってタップを早くする
    // iOS9.3以降、改善されたので実行不要？
    //FastClick.attach(document.body);

    // テスト環境でテストしやすくするためのツールを表示
    if (!gbIsApp) {
        $("#IncrementPlayerId").show();
    }

    // 画像を先読みする
    PreloadImage();

    // InitMediaは、PlayAudioのタイミングで実行する形に変更
    // 音声データを読み込む
    if (gbIsApp) {
        InitMedia();
    }

    // バージョンを表記する
    if (gsEventCategory != "") {
        $(".VersionCode").text(gsEventCategory);
    }

    // Google Analytics
//    ga_storage._setAccount('UA-5844287-3');
    LogGA("StandBy", "-", 0);


    // auスマートパス設定
    // ver.11 スマートパスはアップデートしないので処理を削除
    // InitAuSmartPass();

    // 多重人格無料化 ver.9.6 **********************************************
    // ver.10.5.0 無料開始
    // EnableCardSelect("Psycho");
    // EnableCardSelect("Lovers");

    // Top画面をフェードインする ****************************************************
    InitTopPage();

    // Admob広告に移行 ver.9.8.7
    //InitBanner();
    //var sBannerDataFile = gsBannerDir + "banner.json";
    //GetBannerJSON(sBannerDataFile);


    // 無料版の場合はAdMobをInitする
//    if (!gbFull) {
//        // debug kz
//        initAdMob();
//    }


    /****************************************************
     * onPageLoad
    ****************************************************/
    // トップページ
    onPageLoad("Top", "$('#Footer').show()", "Start");

    // カード説明ページ
    onPageLoad("Tutorial_Card", "InitTutorialCard()", "End");

    /****************************************************
     * カード数設定画面の初期化
     ****************************************************/
    onPageLoad("CheckRoleNum", "InitCheckRoleNum()", "End");

    /****************************************************
     * 夜画面の初期化
     ****************************************************/
    // 夜アクションに関連する変数を初期化する
    onPageLoad("Title_Night", "InitNight()", "Start");

    /****************************************************
     * パスワード入力画面の初期化
     ****************************************************/
    // リモートモード対応 ver.10.0.0 ページ移動時に処理をせず、別タイミングで実行
    //    onPageLoad("EnterPassword", "SetEnterPassword()", "Start");

    /****************************************************
     * カードシャッフル
     ****************************************************/
    onPageLoad("Dream", "InitDream()", "End");

    /****************************************************
     * 購入完了画面
     ****************************************************/
    // onPageLoad("Purchased", "InitPurchasePage()", "End");

    /****************************************************
     * 朝の初期化
     ****************************************************/
    onPageLoad("Morning", "InitMorning()", "Start");

    /****************************************************
     * タイマーの初期化
     ****************************************************/
    onPageLoad("Timer", "InitTimer()", "End");
    //    onPageLoad("Timer", "InitTimer()", "Start");

    /****************************************************
     * 審判説明、審判の初期化
     ****************************************************/
    onPageLoad("Title_Judgement", "InitTitleJudgement()", "Start");
    onPageLoad("Title_JudgementShort", "InitTitleJudgement()", "Start");
    // onPageLoad("Judgement", "InitJudgement('#Judgement .PlayerListBox', '#Judgement .PlayerBox')", "End");



    /****************************************
     * 裁判結果
     */
    onPageLoad("JudgementResult", "$('#JudgementResult .JudgementButton').show()", "End");

    /****************************************************
     * ランキング画面の初期化
     ****************************************************/
    onPageLoad("GameOverResult", "InitRankPage()", "End");


    /****************************************************
     * リモートゲーム関連の初期化
     ****************************************************/
    // MakeRemoteGameが実行され、QRコードのシェアが表示されたタイミング
    onPageLoad("Title_Tutorial_Remote", "InitTutorialRemote('QRCanvas')", "Start");
    // PlayerSelectが実行され、他のプレイヤーを待機しているタイミング
    onPageLoad("RemoteWaitingGM", "InitTutorialRemote('QRCanvas_Waiting')", "End");


    // ランキングページのスクロールを初期化
    //onPageLoad("Ranking", "$('#Ranking').scrollTop(0)", "End");
    //    onPageLoad("Ranking", "ShowBanner()", "End");

    // ページの設定が、前回のゲームのせいで残っている可能性を排除
    $("#Morning").removeClass('current');

    // リモート対応 *****************************************
    gsRemoteMode = LoadData("gsRemoteMode");
    gsRemoteGameId = LoadData("gsRemoteGameId");
    giRemotePlayerId = LoadData("giRemotePlayerId");

    // Playerモード用に URL に ?id=XXXXNN をつけて起動することができる
    var bTestMode = TestHandleOpenURL();

    // テストモードでない場合（URLに?id=がついていない場合）
    if (!bTestMode) {
        // localStorageに前回のゲームが保存されていれば
        // 続きを行う
        if (gsRemoteMode == "PLAYER" && gsRemoteGameId != "") {
            // リモートの状態を確認して処理を行う
            Log("702:初期起動のカスタムURLスキーム処理 " + gsRemoteGameId);

            // プレイヤー用の表示をする
            $(".GM").hide();
            $(".PLAYER").show();

            // リモートモードのHTML表示をする
            SwitchRemoteClass();

            // サーバーからステータスを取得して、ローカルにデータ反映しつつ画面移動
            InitRemoteGame();

        // リモートモードでない場合
        } else {
            // 最新版のバージョンチェックを行う。
            // アップデートが可能な場合は gsStoreURL にURLを格納する。
            GetVersionJSON(gsVersionJSON);
        }
    }


    // For Debug ****************************************************
    if (gbDebug == true) {
        InitTest();
    }
    

};



/****************************************
 * 画像の先読み
 */
function PreloadImage() {
    for (var iCnt = 0; iCnt < gaPreloadImage.length; iCnt++) {
    //    Log("Preload:" + gaPreloadImage[iCnt]);
        $("<img>").attr("src", gaPreloadImage[iCnt]);
    }
}

function FinishDiscussion() {
    Log("360:Finish Discussion");

    // タイマーが残っている場合
    if (giMorningTimerSec > 0) {
        // タイマーをゼロにする
        giMorningTimerSec = 0;
        giMorningTimerSec = CountDownTimer(giMorningTimerSec, '#Timer .TimerBox');
    }


    // 初日の場合
    if (giDateNum == 1) {
        // ページを遷移する
        jQT.goTo("#Title_Judgement", "fade");
        // 2日目以降の場合
    } else {
        // ページを遷移する
        jQT.goTo("#Title_JudgementShort", "fade");

    }

}

/****************************************************
 Full Edition 設定
****************************************************/

/*******************************************************************************
    関数名    InitSPEdition
    機能        SP版と無料版の違いの設定を行う

    入力        なし
    出力        なし
*******************************************************************************/
function InitSPEdition() {
    Log("707:InitSPEdition/" + gbFull);

    // Full Edition の場合
    if (gbFull == true) {
        // カードセットを行う
        SetFullCard();

        // 無料版を表示する
        $(".FREE").hide();
        $(".SP").show();

        // 無料版の場合
    } else {

        // 無料版を表示する
        $(".FREE").show();
        $(".SP").hide();

    }

    // トップページのタイトルを変更する
    ChangeTopTitle();

}

/****************************************************
    関数名    ChangeTopTitle
    機能        言語とSP版にあわせてタイトルロゴを差し替える。
                url(img/Title_BgWolfBigSP.jpg)

    G入力        gbFull
                gsLang
****************************************************/
function ChangeTopTitle() {
    var sSp = "FREE";
    var sLang = "Jp";

    if (gbFull == true) {
        sSp = "SP";
    }
    if (gsLocale != "ja-jp") {
        sLang = "En";

    }
    /* ロゴをFull Editionに変える ****************************************/
    var sBgImage = "";
    var sLogoImg = "img/TitleLogo_" + sSp + "_" + sLang + "@2x.png";
    $("#TitleLogo").attr("src", sLogoImg);
    sBgImage = "url(img/Title_BgWolfBig_" + sLang + sSp + ".jpg)";
    //    $("#Top_wolf").css("background-image", sBgImage);
    Log("701:" + sBgImage);

    return;

}

function SetFullCard() {

    /* カードを有効にする ****************************************/
    var domGotCard = [];
    // デフォルトカードセットをコピーし、値をすべて1にする。
    domGotCard = Object.create(gaDefaultCardInit);
    InitJsonArray(domGotCard, 1);

    /*
    domGotCard = {
        "Lovers": 1,
        "Psycho": 1,
        "Vampire": 1,
        "Rich": 1,
        "Bat": 1,
        "PsychoKiller": 1,
        "GreatShaman": 1,
        "Cosplayer": 1,
        "Paparazzi": 1,
        "Magician": 1,
        "Bomber": 1,
        "Mentalist": 1,
        "DarkShaman": 1,
        "Original": 1,
        "DestinedLovers": 1,
        "RainMan": 1,
        "LegendaryWolf": 1,
        "PrisonBreaker": 1,
        "Oracle": 1
    }
    */

    // 一時保存する
    SaveDataTmp(domGotCard, "domGotCard");

    // localStore保存する
    SaveData(domGotCard, "domGotCard");

    // すべての購入カードに対して繰り返す
    for (iCnt = 0; iCnt < gaGotCardType.length; iCnt++) {

        // カード一覧のカードを利用可能な表示に切り替える
        EnableCardSelect(gaGotCardType[iCnt]);

    }

    return;

}

/****************************************************
 Platform設定
****************************************************/
function InitPlatform() {


    // iOSの場合
    console.log("635:InitPlatform=" + gsPlatform + "/");

    switch (gsPlatform) {

        case "iOS":
            // iOS7対応
            // StatusBar.hide();
            $(".Android").hide();
            $(".iOS").show();

            break;

        case "Android":
            // バックボタンを無効化
            document.addEventListener("backbutton", onBackKeyDown, false);
            console.log("677:Androidだ！！！");
            // スクロール問題の解消
            $("body").css("height", "auto");
            $("#jqt").css("height", "auto");
            $("#jqt > *").css("height", "100%");
            $("#jqt > *").css("-webkit-overflow-scrolling", "touch");

        case "AndroidBrowser":
            $(".Android").show();
            $(".iOS").hide();

            // アンドロイド無料版の場合
            if (gbFull != true) {
                // カードの購入をSP版購入に差し替える
                //                ReplaceBuyCardForAndroid();
            }

            break;

        case "MacOSBrowser":
            $(".Android").hide();
            $(".iOS").show();

            break;

        default:
            break;

    }


    return;

}
function onBackKeyDown() {
    // Androidのバックボタンの動作
}


/****************************************
 * Android用設定
 *****************************************/

/*******************************************************************************
    関数名    ReplaceBuyCardForAndroid
    機能        アンドロイド無料版の場合は、カード購入ボタンをSP版の紹介ボタンに差し替える。
            <div id="BuyCardForAndroid">の中に、ソースが書かれているので
            その中のHTMLをコピーして、各<div class="BuyCard">の中を差し替える。

    入力        なし
    出力        なし
*******************************************************************************/
function ReplaceBuyCardForAndroid() {
    var sHtml = $("#BuyCardForAndroid").html();

    // HTMLを差し替える
    $("#CheckRoleNum .BuyCard").html(sHtml);
}

function InitAuSmartPass() {
    Log("757:InitAuSmartPass");
    // スマートパスの場合
    if (gbSmartPass) {
        $(".AuSmartPass_Show").show();
        $(".AuSmartPass_Hide").hide();
        // 2016.11.20 GREE広告対応
        CheckAuSmartPassMember(true);
    }
    // AppPassの場合
    if (gbAppPass) {
        $(".SbAppPass_Show").show();
        $(".SbAppPass_Hide").hide();
    }

}

/****************************************************
 言語設定
****************************************************/


/****************************************************
    関数名    InitLanguage
    機能        言語表示を初期化する

    入力        sLocale
    出力        なし

    処理概要    1. LangJpとLangEnクラスの表示・非表示を設定する
            2. 変数に含まれる言語の値を、対応する言語に設定する
****************************************************/
function InitLanguage(sLocale) {

    var iCnt;
    var sInputId = "";
    var oRoleTextCustom = [];

    // LangJpとLangEnクラスを設定する
    ShowLangClass(sLocale);

    // カスタマイズされた役職名を取得する
    goRoleTextCustomJp = {};
    goRoleTextCustomEn = {};
    goRoleTextCustomJp = LoadData("goRoleTextCustomJp");

    goRoleTextCustomEn = LoadData("goRoleTextCustomEn");


    // 設定が空の場合
    if (goRoleTextCustomJp == null) {
        goRoleTextCustomJp = goRoleTextJp;
    }
    if (goRoleTextCustomEn == null) {
        goRoleTextCustomEn = goRoleTextEn;
    }


    // 日本語モードの場合
    if (sLocale == "ja-jp" || gsLocale == "ja") {

        Log("506:日本語");
        // 役割名
        //goRoleText = goRoleTextJp;
        goRoleText = {};
        goRoleText = GetRoleText("Jp");
        gsTapCard = goTapCard["Jp"];

        // アラート
        goAlertText = goAlertTextJp;

        // 敬称
        gsSan = "さん";
        gsHyou = " 票";
        gsTeam = "チーム";

        // ボタン名
        goButtonTextJp["Lovers"] = goRoleText["Lovers"];
        goButtonTextJp["Vampire"] = goRoleText["Vampire"];
        goButtonTextJp["FortuneTeller"] = goRoleText["FortuneTeller"];
        goButtonText = goButtonTextJp;

    } else {
        Log("1228:英語");
        // 役割名
        //goRoleText = goRoleTextEn;
        goRoleText = {};
        goRoleText = GetRoleText("En");
        gsTapCard = goTapCard["En"];

        // アラート
        goAlertText = goAlertTextEn;

        // 敬称
        gsSan = "";
        gsHyou = " votes";
        gsTeam = " Team";

        // ボタン名
        goButtonTextEn["Lovers"] = goRoleText["Lovers"];
        goButtonTextEn["Vampire"] = goRoleText["Vampire"];
        goButtonTextEn["FortuneTeller"] = goRoleText["FortuneTeller"];
        goButtonText = goButtonTextEn;
    }

}

/*******************************************************************************
    関数名    ChangeLanguage
    機能        言語設定を変更する。gsLocaleの更新。InitLanguageの実行。

    入力        sLang    en-us || ja-jp
    出力        gsLocale
*******************************************************************************/
function ChangeLanguage(sLang) {

    Log("823:ChangeLanguage=" + sLang);
    // 設定なしの場合
    if (sLang == "") {
        // 何もしない
        return;
    }

    // 言語設定が切り替わった場合
    gsLocale = sLang;
    InitLanguage(gsLocale);

    // タイトル画像を変更する
    ChangeTopTitle();

    // カード選択メニューの言語を変更する
    SetTextForCardSlider(gsLocale);

    // コンティニューしたときに、前の言語が表示されないようにバグ修正
    // ver.9.5
    SaveData("goRoleText");
    SaveData("goButtonText");
    SaveData("gsLocale");


    return;

}


/****************************************************
    関数名    SetTextForCardSlider
    機能      カード選択メニューのテキスト部分を更新する。
    
    入力     sLocale  設定された言語
    出力     DOMにテキスト出力する
****************************************************/
function SetTextForCardSlider(sLocale, bTutorial) {

    var sRole = "";

    // まだカードメニューが作成されていない場合
    // または、言語設定に変更がない場合
    if ((gsShowCardSliderLocale == "" || gsShowCardSliderLocale == sLocale) && bTutorial!=true) {
        // 何もしないで終了する
        // カードメニュー作成時に、もう一度、SetTextForCardSliderが実行されるので
        // 問題ありません。
        Log("２度めの処理なのでSetTextForCardSliderは実行しません/gsShowCardSliderLocale="+gsShowCardSliderLocale+"/"+sLocale);
        return;
    }

    // カード設定データに対して繰り返す（lang.jsにgaCardInfoが設定されています）
    for (var iCnt = 0; iCnt < gaCardInfo.length; iCnt++) {

        // 役職を格納
        sRole = gaCardInfo[iCnt].CardType;

        var sTargetClass = ".gallery-cell_" + sRole;

        // 文字列の設定 ******************
        // チーム
        var sTeamName = "Team" + gaCardInfo[iCnt].Team;
        $(sTargetClass + " .Team").text(goButtonText[sTeamName]);

        // カウント
        $(sTargetClass + " .Count").text(goButtonText[gaCardInfo[iCnt].Count]);

        // 占い結果
        $(sTargetClass + " .Foretell").text(goButtonText[gaCardInfo[iCnt].Foretell]);
        // 難易度
        $(sTargetClass + " .Level").attr("src", "img/Stars" + gaCardInfo[iCnt].Level + ".png");
        // 勝利条件
        var sWinWay = "Win" + gaCardInfo[iCnt].Team;
        $(sTargetClass + " .WinRule").text(goButtonText[sWinWay]);

        // カード説明
        // 日本語設定の場合
        if (gsLocale == "ja-jp") {
            $(sTargetClass + " .CardExplain").text(gaCardInfo[iCnt].TextJp);
        } else {
            $(sTargetClass + " .CardExplain").text(gaCardInfo[iCnt].TextEn);
        }
        // 文字列の設定 ここまで *************
    }

    return;
    
}


/****************************************************
    関数名    GetRoleText
    機能        役割の名前を言語環境と保存データにあわせて読み込む

    入力        sLang        言語(Jp, En)
    出力        oRoleText    役割リスト

    処理概要
            1. カスタム設定されている場合
             1.1. カスタム値を有効とする
            2. カスタム設定されていない場合
             2.1. デフォルト値を有効とする
            3. カード種類に対して繰り返す
             3.1. カード名設定フォームにカード名を入力する（Jp,En）
            4. 言語設定が日本語の場合
             4.1. 日本語セットを返して終了する
            5. 言語設定が日本語でない場合
             5.1. 英語セットを変え得して終了する
****************************************************/
function GetRoleText(sLang) {

    // カスタマイズ設定が設定されていない場合
    if (goRoleTextCustomJp == "" || goRoleTextCustomEn == "") {
        if (sLang == "Jp") {
            return goRoleTextJp;
        } else {
            return goRoleTextEn;
        }
    }

    var oRoleTextJp = [];
    var oRoleTextEn = [];
    var iCnt;
    var sInputId = "";

    // カスタマイズ設定を読み込む
    oRoleTextJp = goRoleTextCustomJp;
    oRoleTextEn = goRoleTextCustomEn;

    // カード種類に対して繰り返す
    for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {
        // <input>のIDを作成する
        sInputId = "input.CARD_Jp_" + gaCardType[iCnt];

        // 役名が設定されている場合
        if (oRoleTextJp[gaCardType[iCnt]] != "" && oRoleTextJp[gaCardType[iCnt]] != null) {
            $(sInputId).val(oRoleTextJp[gaCardType[iCnt]]);
        } else {
            // 初期値を設定する
            oRoleTextJp[gaCardType[iCnt]] = goRoleTextJp[gaCardType[iCnt]];
            $(sInputId).val(goRoleTextJp[gaCardType[iCnt]]);
        }

        sInputId = "input.CARD_En_" + gaCardType[iCnt];

        // 役名が設定されている場合
        if (oRoleTextEn[gaCardType[iCnt]] != "" && oRoleTextEn[gaCardType[iCnt]] != undefined) {
            $(sInputId).val(oRoleTextEn[gaCardType[iCnt]]);
        } else {
            // 初期値を設定する
            oRoleTextEn[gaCardType[iCnt]] = goRoleTextEn[gaCardType[iCnt]];
            $(sInputId).val(goRoleTextEn[gaCardType[iCnt]]);
        }


    }


    // 日本語の場合
    if (sLang == "Jp") {
        return oRoleTextJp;

        // 英語の場合
    } else {
        return oRoleTextEn;
    }

}


/****************************************************
 ページごとの動作
****************************************************/

/****************************************************
    関数名    InitTopPage
    機能        トップページを初期化し、フェードインする。

    入力        なし
    出力        なし

    処理概要    1. localStorageに前回のゲームが保存されているか確認する
            2. 前回のゲームが存在する場合
             2.1. Continueボタンを表示する
            3. Top画面をフェードインする
****************************************************/
var giInitTopPageFlg = 0;
function InitTopPage() {

    // localStorageに前回のデータが保存されている場合
    gsStage = LoadData("gsStage");

    // 通常のゲームマスターが再起動した場合
    if (gsStage != "" && gsStage != undefined) {
        Log("gsStage=" + gsStage);
        // Continueボタンを表示する
        //$("#TopContinue").css("visibility", "visible");
        $("#TopContinue").show();

    // 前回のデータが保存されていない場合
    } else {
        // Continueボタンを非表示する
        //$("#TopContinue").css("visibility", "hidden");
        $("#TopContinue").hide();

    }

    // リモートのプレイヤーが「強制的に途中終了した場合」
    var iCheckRemotePlayerId = LoadData("giRemotePlayerId");
    var sCheckRemoteMode = LoadData("gsRemoteMode");
    var sCheckRecoverGameId = LoadData("gsRemoteGameId");
    Log("1405:sCheckRecoverGameId=" + sCheckRecoverGameId + "/gsRemoteMode="+ gsRemoteMode);
    if (sCheckRemoteMode == "PLAYER" && sCheckRecoverGameId != "" && iCheckRemotePlayerId != -1) {
        // リモートモードの復元ボタンを表示する
        // リモートモードの復元ボタンを表示する
        $("#TopRecoverRemotePlayer").show();

    // リモートプレイヤーの復元でない場合
    } else {
        $("#TopRecoverRemotePlayer").hide();
    }

    // 初回起動の場合
    if ($("#Top_wolf").css("display") == "none") {
        // if(giInitTopPageFlg == false){
        // ウルフを表示
        $("#Top_wolf").fadeIn('slow');
        $("#ReloadButton").hide();
        // この処理は2回行わないためにフラグをオン
        giInitTopPageFlg = 1;
    }

}

/*******************************************************************************
    関数名    ShowTutorialMenu
    機能        チュートリアルのメニューの表示・非表示を行う

    入力        bMode    1:表示 0:非表示
    出力        なし
*******************************************************************************/
function ShowTutorialMenu(bMode) {

    if (bMode) {
        // Main Menuを非表示にする
        $("#MainMenu").hide();
        $("#TutorialMenu").fadeIn(500);
        $("#Top .CommunityArea").hide();

    } else {
        // Main Menuを非表示にする
        $("#TutorialMenu").hide();
        $("#MainMenu").fadeIn(500);
        $("#Top .CommunityArea").fadeIn(500);

    }
}
/*******************************************************************************
    関数名    ShowTutorial
    機能        チュートリアルを表示する。
            チュートリアルから戻ってきたときに間違えてボタンをタップしないように
            チュートリアルに移動する瞬間に #Top_wolf を非表示にする。

    入力        sPage    ページ名
    出力        なし
*******************************************************************************/
function ShowTutorial(sPage) {

    // Top_werewolfを非表示にする
    //$("#Top_wolf").hide(1000);

    // バナーを非表示にする
    /*
    Log("ShowTutorial");
    if(gbBannerFlg==1 || true){
        ShowBanner(true);
    }
    */

    // 対象ページに移動する
    jQT.goTo(sPage, 'slideleft');


}

/****************************************************
    関数名    InitTutorialCard
    機能      カードのチュートリアルページを作成する
    
    入力     なし
    出力     DOM出力
****************************************************/
function InitTutorialCard() {
    
    // カード情報を表示する
    ShowCardSlider("#TutorialCardOutput", "CardSlider_TEMPLATE", "", "");
    
    // カードの文言を、設定言語にあわせて設定する ver.11.3.1 バグ修正
    SetTextForCardSlider(gsLocale, true);

    // カードの名前を設定する
    InitCardName();

}



/****************************************************
    関数名    NewGame
    機能        ゲームを新規で開始する。

    入力        なし
    出力        なし

    処理概要    1. ステージ情報が空でない場合
             1.1. 前回のデータを削除して良いか確認する。
            2. ゲーム開始画面に移動する
****************************************************/
var giGetUserInfoTime = 0;
function NewGame() {

    // アップデートがある場合
    if (gsStoreURL != "") {

        // 強制アップデートの場合
        if (gbUpdateMust == true) {
            // アップデートのアラートを表示する
            var aMessage = GetAlertMessage("ConfirmUpdateMust", gsUpdateVersion);
            ShowConfirm(aMessage[0], aMessage[1], "ClickBanner('" + gsStoreURL + "')");

            // 次に進まない
            return;

            // 強制ではない場合
        } else {
            // アップデートのアラートを表示する
            var aMessage = GetAlertMessage("ConfirmUpdate", gsUpdateVersion);
            ShowConfirm(aMessage[0], aMessage[1], "ClickBanner('" + gsStoreURL + "')");

            // 次に進む
        }

    }

    // レビューを表示する場合
    if (ShowReview()) {
        // 何もしないで終了する
        return true;
    }

    // localStorageが存在する場合
    if (localStorage["gaPlayer"]) {
        // localStorageからデータを読み込む
        gaPlayer = LoadData("gaPlayer");
        giPlayerNum = LoadData("giPlayerNum");
        gsStage = LoadData("gsStage");
    }

    // 購入情報をロードし、一時保存に反映する
    var domGotCard = [];
    domGotCard = LoadData("domGotCard");
    SaveDataTmp(domGotCard, "domGotCard");

    // キャンペーンカード情報をロードし、一時保存に反映する
    var domCampCard = [];
    domCampCard = LoadData("domCampCard");
    Log("Werewolf.js 1218 domCampCard:" + JSON.stringify(domCampCard));
    SaveDataTmp(domCampCard, "domCampCard");

    // メダル情報をロードし、一時保存に反映する
    var domMedal = [];
    domMedal = LoadData("domMedal");
    SaveDataTmp(domMedal, "domMedal");

    // サブスクの初期化をする（goSubScFlgの更新と保存）
    if (!gbFull) {
        goSubScFlg = LoadData("goSubScFlg");
        goSubScStartDate = LoadData("goSubScStartDate");
        // サブスク設定がない場合
        if(!goSubScFlg){
            goSubScFlg = {"CardMasterKey":false,"Adfree":false};
            goSubScStartDate = {"CardMasterKey":false,"Adfree":false};
        }

        // Adfreeが有効の場合
        if(goSubScFlg["Adfree"]){
            // 期限切れでないかチェックする
            goSubScFlg["Adfree"] = CheckExpire(goSubScStartDate["Adfree"],31);
            // 期限切れになった場合
            if(!goSubScFlg["Adfree"]){
                RestorePurchase();
            }
        }

    }

    /* 11.8.0 広告を極力減らし、Newsで出すくらいにする
    // Admobを初期化する
    if (gbFull != true && goSubScFlg["Adfree"] != true) {

        // Admobを実行する（すでに初期化されている場合は、処理をしない）
        initAdMob();
        
        // ver.11 広告表示を行う
        ShowBanner(goSubScFlg["Adfree"]);

    }
    */


    // ゲームを開始する
    CheckInitNewGame();

    return;
}

/****************************************************
    関数名   GoToPremiumShop
    機能     サブスクのショップ画面に移動する。
            移動する際、サブスク状態を初期化する。
    
    入力     
    出力     
    
    処理概要
****************************************************/
function GoToPremiumShop() {
    // サブスクの初期化をする（goSubScFlgの更新と保存）
    //InitSubscription();
    // vr.11.2.0 inapppurchase-2実装
    // IAPが初期化されていない場合 2014.05.11
    if (gbInitIAPFlg != 1) {
        Log("2348:InAppPurchaseの初期化実行");
        InitPurchase(goProductIdMap);
    }

    // プレミアムショップのボタン状態を変更する
    InitPremiumShop();

    // プレミアムショップに移動する
    jQT.goTo('#PremiumShop');

}

/*******************************************************************************
    関数名    InitSubscription
    機能      サブスクリプション状態をチェックし
            　グローバル変数のgoSubScFlgに値を格納する。
*******************************************************************************/
async function InitSubscription_bkup() {
    Log("1661:InitSubscription:"+gbIsApp);
    // ver.11 サブスクの状態チェックをする
    if (gbIsApp) {

        Log("1661:await直前 MasterKey="+ goSubScFlg["CardMasterKey"]);
        // カードマスターキー
        goSubScFlg["CardMasterKey"] = await gPaymentService.isMasterKeyValid();

        // アドフリー
        goSubScFlg["Adfree"] = await gPaymentService.isAdFreeValid();

        Log("1661: MasterKey=" + goSubScFlg["CardMasterKey"]);

        // マスターキーが購入済みの場合
        if(goSubScFlg["CardMasterKey"]){
            $(".SubscriptionButton_MasterKey").hide();
            $(".SubscriptionButtonDisabled_MasterKey").show();
        } else {
            $(".SubscriptionButton_MasterKey").show();
            $(".SubscriptionButtonDisabled_MasterKey").hide();
        }

        // アドフリーが購入済みの場合
        if(goSubScFlg["Adfree"]){
            $(".SubscriptionButton_Adfree").hide();
            $(".SubscriptionButtonDisabled_Adfree").show();
        } else {
            $(".SubscriptionButton_Adfree").show();
            $(".SubscriptionButtonDisabled_Adfree").hide();
        }

    // ブラウザの場合
    } else {
        // URLに ?MasterKey=1&Adfree=1 といれると
        // サブスクリプションが有効な状態をシミュレートできる
        goSubScFlg["CardMasterKey"] = GetUrlData("CardMasterKey");
        goSubScFlg["Adfree"] = GetUrlData("Adfree");

    }
    // サブスク状態を保存する（念のため）
    SaveData("goSubScFlg");

}


/*******************************************************************************
    関数名    CheckInitNewGame
    機能        前回のデータが存在するかどうかチェックして、新規ゲームを開始する
*******************************************************************************/
function CheckInitNewGame() {
    // 前回のデータが存在する場合
    if (gsStage != "" && gsStage != undefined) {
        // 前回の続きのデータを削除して良いか確認する
        var aMessage = GetAlertMessage("NewGame");
        ShowConfirm(aMessage[0], aMessage[1], "InitNewGame()");

    } else {
        // ゲームを初期化する
        InitNewGame();
    }

}

/****************************************************
    関数名    InitNewGame
    機能        プレイヤーデータやグローバル変数を初期化し、
            ルートパスの取得や、音声データの読み込みなど
            タップ後にしか実行できない初期化を行う。

    入力        なし
    出力        なし
****************************************************/
var gbBannerFlg = false;
function InitNewGame() {

    // バナーが表示されている場合
    /* ゲーム開始のタイミングで非表示にする
    if(gbBannerFlg == 1){
        // バナーを非表示にする
        ShowBanner(true);
    }
    */

    // プレイヤーデータとグローバル変数を初期化する
    RefreshPlayers('NewGame');

    // プレイヤーデータをlocalStorageに保存する
    SaveGame("NewGame");

    // ルートパスの取得
    FileSystem("rootPath");

    // プレイヤーが存在する場合
    if (gaPlayer.length > 0) {
        // プレイヤー一覧を初期化する
        InitPlayerSetting();
    }

    // フッターメニューを非表示にする
    $("#Footer").hide();

    jQT.goTo("#Title_NewGame", "slideleft");

}


/***************************************************
    関数名    ContinueGame
    機能        ゲームの続きを再開する

    入力        なし
    出力        なし

    処理概要    1. localStorageからデータを読み込む
            2. 保存されたステージにjQT.goToする
****************************************************/
function ContinueGame() {
    var sLang = "";
    var oRoleTextCustom = [];

    // バナーを非表示にする（ゲームの途中にバナーが出てしまうから）
    //ShowBanner(true);

    // フッターメニューを非表示にする
    $("#Footer").hide();

    // localStorageからデータを読み込む
    gaPlayer = LoadData("gaPlayer");
    gsStage = LoadData("gsStage");
    giPlayerNum = LoadData("giPlayerNum");
    giDateNum = LoadData("giDateNum");

    // オプション設定
    gsDefaultCardSet = LoadData("gsDefaultCardSet");
    gbFirstNightNoKillFlg = LoadData("gbFirstNightNoKillFlg");
    gbFirstNightNoForetellFlg = LoadData("gbFirstNightNoForetellFlg");
    giFirstNightForetell = LoadData("giFirstNightForetell");
    gbBGMFlg = LoadData("gbBGMFlg");
    goDoubleGuard = LoadData("goDoubleGuard");
    gbReducingRoleFlg = LoadData("gbReducingRoleFlg");
    gbVampireHumanFlg = LoadData("gbVampireHumanFlg");

    // 投票の非表示機能は、投票スタイル機能に吸収されました ver.9.5
    //    gbHidingVoteFlg = LoadData("gbHidingVoteFlg");
    gsVotingStyle = LoadData("gsVotingStyle");

    // 票割れ判決 ver.9.6
    gsSameVote = LoadData("gsSameVote");

    gbPassAnswerFlg = LoadData("gbPassAnswerFlg");
    //gbJudgementTimerFlg = LoadData("gbJudgementTimerFlg");
    giJudgementTimer = LoadData("giJudgementTimer");
    gbGmToolFlg = LoadData("gbGmToolFlg");

    // 初日の占い：ランダム人間の結果
    giForetellFirstRandom = LoadData("giForetellFirstRandom");
    gaForetellFlg = LoadData("gaForetellFlg");
    gaScoopFlg = LoadData("gaScoopFlg");
    gbFirstTargetFlg = LoadData("gbFirstTargetFlg");
    giLastDeadId = LoadData("giLastDeadId");

    // 闇の霊媒師による騎士殺害フラグ
    gbDarkShamanKillKnightFlg = LoadData("gbDarkShamanKillKnightFlg");
    gaKnightPlayerId = LoadData("gaKnightPlayerId");

    // 運命の恋人のフラグ
    gaDestinedLoversPlayerId = LoadData("gaDestinedLoversPlayerId");

    // レインマンの生存フラグ、発生確率カウンタ
    gbRainManLifeFlg = LoadData("gbRainManLifeFlg");
    giRainManCnt = LoadData("giRainManCnt");
    gbLightningFlg = LoadData("gbLightningFlg");

    // 昨日の処刑対象者
    giYesterdayJudge = LoadData("giYesterdayJudge");

    // カード数
    goCardNum = LoadData("goCardNum");
    Log("we.js 1287:" + JSON.stringify(goCardNum));
    goBomb = LoadData("goBomb");

    // 役職の名前
    goRoleText = LoadData("goRoleText");
    goButtonText = LoadData("goButtonText");
    gaPlayerAnswer = LoadData("gaPlayerAnswer");

    // リモート関連
    gsRemoteGameId = LoadData("gsRemoteGameId");
    giRemotePlayerId = LoadData("giRemotePlayerId");
    gsRemoteMode = LoadData("gsRemoteMode");
    gaRemoteAction = LoadData("gaRemoteAction");
    // HTMLの表示を切り替える
    SwitchRemoteClass();

    // データが保存されていない場合
    if (goRoleText["Werewolf"] == undefined) {
        Log("869:goRoleText=" + goRoleText + "/" + goRoleText["Werewolf"]);
        if (gsLocale == "ja-jp" || gsLocale == "ja") {
            goRoleText = goRoleTextJp;
            goButtonText = goButtonTextJp;
        } else {
            goRoleText = goRoleTextEn;
            goButtonText = goButtonTextEn;
        }
    }
    //goRoleTextCustomJp = goRoleTextJp;
    //goRoleTextCustomEn = goRoleTextEn;


    // 購入情報をロードし、一時保存に反映する
    var domGotCard = [];
    domGotCard = LoadData("domGotCard");
    SaveDataTmp(domGotCard, "domGotCard");

    // キャンペーンカード情報をロードし、一時保存に反映する
    var domCampCard = [];
    domCampCard = LoadData("domCampCard");
    SaveDataTmp(domCampCard, "domCampCard");


    // メダル情報をロードし、一時保存に反映する
    var domMedal = [];
    domMedal = LoadData("domMedal");
    SaveDataTmp(domMedal, "domMedal");

    // UserCodeをロード
    gsUserCode = LoadData("gsUserCode");

    // 獲得ポイントをロードする
    giPoint = LoadData("giPoint");

    // プレイヤー一覧画面を初期化する
    InitPlayerSetting();

    // 生き残っている人狼の人数を初期化する
    giWerewolfLiveNum = LoadData("giWerewolfLiveNum");

    // ルートパスの取得
    FileSystem("rootPath");

    // 結果画面用
    giStartTime = LoadData("giStartTime");
    gsGameStartDate = LoadData("gsGameStartDate");

    // var.11 サブスクの初期化をする（goSubScFlgの更新と保存）
    // ver.11.2.0
    //InitSubscription();

    
    // リモート対応 ver.10.0.0 次にいくページが"#Title_Night"の場合
    if (gsStage == "#Title_Night") {
        GoToTitleNight();
        return;
    }
    // エラー処理 ジャンプ先がない場合
    if (gsStage == "") {
        gsStage = "#Top";

    // エラーでない場合
    } else {
        /* ver.11.8.0 極力広告を減らす
        // Admobを初期化する
        if (gbFull != true && goSubScFlg["Adfree"] != true) {

            // Admobを実行する
            initAdMob();

        }

        // ver.11 広告表示を行う
        ShowBanner(goSubScFlg["Adfree"]);
        */

    }

    // 保存されているステージにジャンプする
    jQT.goTo(gsStage, "fade");

    return;
}

/****************************************************
    関数名    InitPlayerSetting
    機能        プレイヤー一覧画面を初期化する

    G入力    gaPlayer
    出力        なし

    処理概要    1. PlayserSettingのプレイヤー一覧DIVを空にする
            2. プレイヤーに対して繰り返す
             2.1. AddPlayerToSettingにてプレイヤーを追加する
****************************************************/
function InitPlayerSetting() {
    var iCnt;

    // PlayerSettingのプレイヤー一覧を初期化する メモリリーク対策　ver.9.8.7
    //$("#PlayerSettingFaceBox").empty();
    $("#PlayerSettingFaceBox").empty();

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // プレイヤーボックスを追加する
        AddPlayerToSetting(gaPlayer[iCnt]);
    }

    // プレイヤー数を設定する
    //giPlayerNum = gaPlayer.length;

    return;
}

function BackToTitle() {
    // もしバナーが存在したら
    /* ver.11.8.0 極力広告を減らす
    if (banner) {
        // バナーを非表示にする（複数表示されないように）
        banner.hide();
    }
    */
    jQT.goTo("#Top");
    // location.reload(true)
}

/*******************************************************************************
    関数名    ShowSettingMore
    機能        さらに詳しい設定項目を表示、非表示する。

    入力        bMode        true:表示    false:非表示
    出力        なし
*******************************************************************************/
function ShowSettingMore(bMode) {

    if (bMode) {
        // 設定DIVを表示する
        $("#SettingMore").show();
        $("#SettingButtonMore").hide();
        $("#SettingButtonClose").show();
    } else {
        // 設定DIVを表示する
        $("#SettingMore").hide();
        $("#SettingButtonMore").show();
        $("#SettingButtonClose").hide();

        location.href = "#OptionRules";

    }
    return;
}
/****************************************************
関数名    SetRole
機能        カードの枚数設定をチェックし、カードをシャッフルする。

入力     bNoJump       true:画面遷移しない
G入力    gaCardType    カードタイプリスト
        goCardNum    カード数
        gaPlayer    プレイヤーリスト
出力     true/false     設定に問題がある場合、falseを返す

処理概要    1. 役割リストを作成する
        2. 各役割ごとにカード数だけ要素を追加する
        3. 役割リストをランダムに並び替える
        4. プレイヤーリストに対して繰り返す
         4.1. プレイヤーの役割を対象の役割リストの値に差し替える

*****************************************************/
function SetRole(sJumpPage) {
    // 役割リストを作成する
    aRole = new Array();
    var iCardCnt;
    var iSumCnt;
    var sCardType = "";
    var iPlayerCnt;
    var oCardNum = new Array();
    var iCnt = 0;
    var iFortuneTellerId = -1;
    var aOracle = [];

    /****************************************
     ゲームが成立するかチェックする
    *****************************************/
    var iWerewolfTeamNum = goCardNum["Werewolf"] + goCardNum["LegendaryWolf"];
    var iCitizenLeftNum = gaPlayer.length - iWerewolfTeamNum - goCardNum["Vampire"] - goCardNum["Bat"];
    // 第1夜の殺害がある場合
    if (gbFirstNightNoKillFlg == false) {
        // 人間の残数を１つ減らす
        iCitizenLeftNum--;
    }

    // 市民の数が人狼の人数より少ない場合
    if (iCitizenLeftNum < iWerewolfTeamNum) {
        aMessage = GetAlertMessage("ErrCitizenTooFew", "");
        ShowAlert(aMessage[0], aMessage[1]);
        return false;
    }

    // 人狼の人数が０人の場合
    if (iWerewolfTeamNum <= 0) {
        aMessage = GetAlertMessage("ErrWerewolfNone", "");
        ShowAlert(aMessage[0], aMessage[1]);
        return false;
        
    }

    /****************************************
     役職をランダムに減らす
    *****************************************/
    for (var sKey in goCardNum) {
        oCardNum[sKey] = goCardNum[sKey];
    }
    if (gbReducingRoleFlg == true) {
        // 1枚市民を増やす
        ReduceRole(oCardNum);
    }


    /****************************************
     カードの山を作成する
    *****************************************/
    // 各役割に対して繰り返す
    for (iCardCnt = 0; iCardCnt < gaCardType.length; iCardCnt++) {
        // 対象のカードタイプを取得する
        sCardType = gaCardType[iCardCnt];
        // 対象の役割のカード数だけ繰り返す
        for (iSumCnt = 0; iSumCnt < oCardNum[sCardType]; iSumCnt++) {
            // 役割リストに役割を追加する
            aRole.push(sCardType);
        }
    }

    // 役割リストを並び替える（ランダム性を高めるために2回行う）
    ShuffleArray(aRole);
//    ShuffleArray(aRole);

    // 前回の人狼と今回の人狼が同じにならないように３回チェックする
    for (iCnt = 0; iCnt < 2; iCnt++) {
        // 前回と同じ役職でない場合
        if (CheckSameRole(aRole) == false) {
            // チェックを終了する
            break;
        }
        // 再度役割リストを並び替える
        ShuffleArray(aRole);
    }

    // 今回の役職の順番をグローバル配列に格納する
    // gaPreGameRole = aRole.concat();


    /****************************************
     役職名を確定する
    *****************************************/
    // 役職名を保存する
    // 言語設定が日本語の場合
    Log("werewolf.js 1486: gsLocale=" + gsLocale);
    if (gsLocale == "ja-jp" || gsLocale == "ja") {
        goRoleTextCustomJp = SetCustomRole("Jp");
        goRoleText = goRoleTextCustomJp;
    } else {
        goRoleTextCustomEn = SetCustomRole("En");
        goRoleText = goRoleTextCustomEn;
    }

    /****************************************
     各プレイヤーの役職を決定する
    *****************************************/
    // ログに役職を表示する
    Log("925:カードセット一覧---------------");

    // 騎士配列を初期化する
    gaKnightPlayerId = [];

    // 運命の恋人を初期化する
    gaDestinedLoversPlayerId = [];

    // レインマンの生存フラグ、発生確率カウンタ
    gbRainManLifeFlg = false;
    giRainManCnt = 0;
    gbLightningFlg = false;


    // リモート再戦の場合
    if (sJumpPage == "#Title_GameStart") {
        // リモートモードの初期化をしない
    } else {
        // リモートモードの初期化をする
        gsRemoteMode = "";
        giRemotePlayerId = -1;
        gsRemoteGameId = "";
    }


    // プレイヤーリストに対して繰り返す
    for (iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++) {
        // 対象のプレイヤーの役割を置き換える
        gaPlayer[iPlayerCnt].sRole = aRole[iPlayerCnt];

        // 答え用の役職リストに役割を保存（日本語表示）
        gaPlayerAnswer[iPlayerCnt] = goRoleText[aRole[iPlayerCnt]];

        switch (aRole[iPlayerCnt]) {
            // 騎士の場合
            case "Knight":
            case "Cosplayer":
                // 騎士プレイヤーリストに、プレイヤーIDを保存する（DarkShaman対応）
                gaKnightPlayerId.push(iPlayerCnt);
                break;
            
            // 運命の恋人の場合
            case "DestinedLovers":
                // 運命の恋人リストにプレイヤーIDを保存する
                gaDestinedLoversPlayerId.push(iPlayerCnt);
                break;
            
            // レインマンの場合
            case "RainMan":
                // レインマンの生存フラグをオンにする
                gbRainManLifeFlg = true;
                break;

            // 神託者の場合
            case "Oracle":
                // 神託者のリストに加える
                aOracle.push(iPlayerCnt);
                break;
            
            // 占い師の場合
            case "FortuneTeller":
                // 占い師のIDを保存しておく
                iFortuneTellerId = iPlayerCnt;
                break;

                
        }
        
        // 設定ログ表示
        Log(gaPlayer[iPlayerCnt].sName + "=" + gaPlayer[iPlayerCnt].sRole + "(" + goRoleText[gaPlayer[iPlayerCnt].sRole] + ")");
    }

    // 答え確認用のシークレットボックスに答えを出力する
    OutputAnswerHtml();

    // 占い済み状態を初期化
    gaForetellFlg = [];

    //　ランダム人間占いの場合
    if (giFirstNightForetell == 2 && iFortuneTellerId != -1) {
        // ランダムに一人を占う（人狼結果にならない）
        // 初日の占い結果にプレイヤーIDを保存する
        giForetellFirstRandom = ForetellHumanRandom(iFortuneTellerId);

        if (giForetellFirstRandom == -1) {
            // エラー終了する
            return false;
        }
    }

    // 神託者に対して繰り返す
    for (var iOracleCnt = 0; iOracleCnt < aOracle.length; iOracleCnt++){
        // 神託者のプレイヤーIDを取得する
        iPlayerCnt = aOracle[iOracleCnt];

        // 対象の神託者のお告げ先を保存する
        gaPlayer[iPlayerCnt].iOracleId = ForetellHumanRandom(iPlayerCnt);

        // 神託先の人間が存在しない場合
        if (gaPlayer[iPlayerCnt].iOracleId == -1) {
            // エラー終了する
            return false;
        }

    }

    


    /****************************************
     購入したカード情報をlocalStorageに保存する
    *****************************************/
    // var domGotCard = LoadDataTmp("domGotCard");
    // SaveData(domGotCard, "domGotCard");

    // 人狼の生存人数を保存する（初期化）
    giWerewolfLiveNum = goCardNum["Werewolf"] + goCardNum["LegendaryWolf"];

    // 勝利ポイントを保存する
    SetWinningPoint();

    // 裁判タイマーをセットする
    giJudgementTimer = $("#InputJudgementTimer").val() - 0;

    // データをセーブする
    SaveGame("SetRole");

    // ゲーム開始時のログを取得する (値には、プレイヤー人数を設定)
    LogGA("GameStart", "Player:" + aRole.length, aRole.length);

    // セッティング確認画面を作成する
    MakeCheckSetting();

    // 画面遷移設定がある場合
    if (sJumpPage != "" && sJumpPage != undefined) {
        // 対象ページに移動する
        jQT.goTo(sJumpPage, "fade");
        return;

        // 通常は設定確認画面に移動する
    } else {
        jQT.goTo("#CheckSetting", "slideleft");
    }

    return true;
}

/*******************************************************************************
    関数名    ForetellHumanRandom
    機能        第１夜にランダムに人間を占うモードの場合、１人の占い状態を占い済みに変更する。

    入力        なし
    出力     true: 設定問題なし  false: 設定問題あり
    G出力    gaPlayer[x].bForetellFlg

    処理概要
            1. 人狼、コスプレ、占い師自身、以外のプレイヤー番号を配列に格納する
            2. 人間プレイヤーの配列に対してランダムに１つを選ぶ
            3. 選ばれた人間プレイヤーの占い済みフラグをオンにする
*******************************************************************************/
function ForetellHumanRandom(iPlayerId) {
    var iCnt;
    var aHuman = [];

    // 全プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // プレイヤーの役職に対して切り替える
        switch (gaPlayer[iCnt].sRole) {
            // 占い結果が人間でない場合
            case "Werewolf":
            case "LegendaryWolf":
            case "Cosplayer":
            case "Vampire":
            case "Bat":
                break;
            
            // 占い結果が人間の場合
            default:
                
                // 自分自身でない場合
                if (iCnt != iPlayerId) {
                    // 人間配列に格納する
                    aHuman.push(iCnt);
                }
                break;
        }
    }

    // 人間結果の人が存在しない場合（初期設定時にエラーにする ver.11.2.1）
    if (aHuman.length == 0) {

        // アラートを表示する
        switch (gaPlayer[iPlayerId].sRole) {
            case "FortuneTeller":
                var aMessage = GetAlertMessage("ErrNoHumanForFirstNightForetell", "");
                break;
            
            case "Oracle":
                var aMessage = GetAlertMessage("ErrNoHumanForFirstNightOracle", "");
                break;
                
        }
        ShowAlert(aMessage[0], aMessage[1]);
        return -1;
    }
    
    // 人間プレイヤー番号をランダムに１つ選ぶ
    var iRandom = Math.floor(aHuman.length * Math.random());
    var iSelectedId = aHuman[iRandom];

    if (gaPlayer[iPlayerId].sRole == "FortuneTeller") {
        // 選ばれたプレイヤーを占い済みにする
        gaForetellFlg[iSelectedId] = true;
    }

    return iSelectedId;

}



/*******************************************************************************
    関数名    MakeCheckSetting
    機能        セッティングの確認画面を作成する。

    G入力    goCardNum    カード枚数
            gaCardType    カード種類配列
            gbReducingRoleFlg    ランダムに役職を減らすフラグ


    出力        HTML出力
*******************************************************************************/
function MakeCheckSetting() {
    var aSetList = [
        "gbFirstNightNoKillFlg",
        //        "gbFirstNightNoForetellFlg",
        "gbReducingRoleFlg",
        "gbVampireHumanFlg",
        "bDoubleGuardFlg",
        //        "gbHidingVoteFlg",
        "gbPassAnswerFlg",
        "gbGmToolFlg",
        "gbBGMFlg"
    ];
    var bDoubleGuardFlg = goDoubleGuard.bOnFlg;

    var sValue = "";
    var iCnt = 0;
    var sRoleSetting = "";

    // カード枚数を表示する
    ShowRoleList("#CheckSetting .Role");


    // 設定に対して繰り返す
    for (iCnt = 0; iCnt < aSetList.length; iCnt++) {
        // 設定がtrueの場合
        if (eval(aSetList[iCnt]) == true) {
            sValue = "<span class='redText'>YES</span>";
        } else {
            sValue = "NO";
        }

        $("#CheckSetting ." + aSetList[iCnt]).html(sValue);

    }

    // 第１夜の占いの設定を表示する
    $(".GameSettingFirstNightForetell .Setting").hide();
    $(".GameSettingFirstNightForetell .Setting" + giFirstNightForetell).show();

    // 投票スタイルの設定を表示する
    $("#CheckSetting .gsVotingStyle .Setting").hide();
    $("#CheckSetting .gsVotingStyle ." + gsVotingStyle).show();

    // 「票割れ判決」の設定を表示する
    $("#CheckSetting .gsSameVote .Setting").hide();
    $("#CheckSetting .gsSameVote ." + gsSameVote).show();

    // 裁判時のタイマー設定を表示する
    if (giJudgementTimer > 0) {
        $("#CheckSetting .giJudgementTimer").text(giJudgementTimer + " sec");
    } else {
        $("#CheckSetting .giJudgementTimer").text("NO");
    }

    // 騎士とコスプレイヤーがいる場合は、アラートを表示する
    if (goCardNum["Knight"] + goCardNum["Cosplayer"] >= 2) {
        var aMessage = GetAlertMessage("WarningDoubleKnight", "");
        ShowAlert(aMessage[0], aMessage[1]);
    }

}

/****************************************************
    関数名    ShowRoleList
    機能      使用する役職リストを表示する

    入力     sOutputId 出力先ノードID
****************************************************/
function ShowRoleList(sOutputId) {
    var iCnt = 0;
    var sRoleSetting = "";

    // 役職カードの設定枚数を表示する
    for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {

        // カード設定ランダムでない場合（通常）
        if (gsDefaultCardSet != "Random") {
            // 対象のカードがゼロでない場合
            if (goCardNum[gaCardType[iCnt]] > 0) {
                // カードの名前と枚数を追加する
                sRoleSetting += goRoleText[gaCardType[iCnt]] + "(" + goCardNum[gaCardType[iCnt]] + ") ";
            }
            // カード設定ランダムの場合
        } else {
            // カードの名前と枚数(?)を追加する
            sRoleSetting += goRoleText[gaCardType[iCnt]] + "(?) ";
        }

    }

    // ランダムに役職を減らすフラグがオンの場合
    if (gbReducingRoleFlg == true) {
        // ランダムに役職が変更される説明を表示
        $(".ReduceRoleRandom").show();
    } else {
        // ランダムに役職が変更される説明を非表示
        $(".ReduceRoleRandom").hide();
    }

    // カード枚数の設定を表示する
    $(sOutputId).html(sRoleSetting);

    return;

}

/*******************************************************************************
    関数名    CheckSameRole ver2.
    機能        前回と役職がかぶっていないかチェックする。
            これまでに人狼になったことがある回数（gaPlayer[].iWerewolfTeamCnt）の
            平均値を計算し、平均値の1.5倍を超えているプレイヤーが、人狼になっている場合は
            やり直しとする。

    入力        aRole            今回の配役
    G入力    gaPreGameRole    前回の配役
    出力        bSameFlg        true:同じだった    false:異なる配役

    処理
            0. 全プレイヤーの人狼チーム回数に対して繰り返す
             0.1. 対象のプレイヤーの回数を合計に追加する
            1. 人狼チーム回数の合計値と平均値を算出する
            2. 平均値に1.5をかけたものを、人狼やりすぎボーダーラインとする
            3. 今回の配役に対して繰り返す
             3.1. 対象の役職が、人狼の場合
              3.1.1. その役職になるプレイヤーの人狼チーム回数が、人狼やりすぎボーダーラインを
                       超えている場合
               3.1.1.1. やり過ぎフラグをオンにして返す
            4. やり過ぎフラグをオフにして返す
*******************************************************************************/
function CheckSameRole(aRole) {
    var iCnt = 0;
    var iWerewolfTeamSum = 0;
    var iWerewolfTeamAverage = 0;
    var iToMuchPer = 1.5;
    var iToMuchBorder = 0;

    // 全プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 人狼チーム回数が未設定の場合
        if (gaPlayer[iCnt].iWerewolfTeamCnt == undefined) {
            gaPlayer[iCnt].iWerewolfTeamCnt = 0;
        }
        // 人狼チーム回数の合計を算出する
        iWerewolfTeamSum += gaPlayer[iCnt].iWerewolfTeamCnt;
    }
    // 人狼チーム回数の平均値を算出する
    iWerewolfTeamAverage = iWerewolfTeamSum / gaPlayer.length;
    iToMuchBorder = iWerewolfTeamAverage * iToMuchPer;

    // 今回の配役に対して繰り返す
    for (iCnt = 0; iCnt < aRole.length; iCnt++) {
        // 対象の役職が人狼の場合
        if (aRole[iCnt] == "Werewolf" || aRole[iCnt] == "LegendaryWolf") {
            // 配役予定のプレイヤーの人狼チーム回数が、やりすぎボーダー（平均の1.5倍）を超えている場合
            if (gaPlayer[iCnt].iWerewolfTeamCnt > iToMuchBorder) {
                // やり過ぎフラグをオンにして返す
                Log("1585:やり過ぎでやりなおし!!!!  " + gaPlayer[iCnt].sName + "は" + gaPlayer[iCnt].iWerewolfTeamCnt + "pt人狼 ボーダー：" + iToMuchBorder);
                return true;
            }
        }
    }

    return false;
}

/*******************************************************************************
    関数名    ReduceRole
    機能        役職をランダムに１つ減らす

    G入力    goCardNum
    出力        oCardNum

    処理概要    1. 役職カードに対して繰り返す
             1.1. カードが0でない、かつ、人狼、吸血鬼、恋人でない場合
              1.1.1. 置き換え対象の役職リストに追加する
            2. 置き換え対象の役職リストの数に対して、ランダム数を作成する
            3. ランダムに変換対象の役職の数をデクリメントする
            4. 市民の数をインクリメントする
*******************************************************************************/
function ReduceRole(oCardNum) {
    var iCardCnt = 0;
    var sCardType = "";
    var aTargetCard = [];

    var aNoTargetRole = [
        "Werewolf",
        "LegendaryWolf",
        "Vampire",
        "Bat",
        "Lovers",
        "DestinedLovers"
    ];
    var iNoTargetCnt = 0;
    var bNoTargetFlg = false;

    // 各役割に対して繰り返す
    for (iCardCnt = 0; iCardCnt < gaCardType.length; iCardCnt++) {

        // 対象のカードタイプを取得する
        sCardType = gaCardType[iCardCnt];

        // 対象外フラグを初期化する
        bNoTargetFlg = false;

        // 対象外の役職に対して繰り返す
        for (iNoTargetCnt = 0; iNoTargetCnt < aNoTargetRole.length; iNoTargetCnt++) {

            // 対象外の場合
            if (sCardType == aNoTargetRole[iNoTargetCnt]) {
                bNoTargetFlg = true;
            }
        }

        // カードが 0 でない場合、かつ対象の場合
        if (oCardNum[sCardType] > 0 && bNoTargetFlg == false) {

            // 置き換え対象リストに格納する
            aTargetCard.push(sCardType);
        }
    }

    // ランダムな数を作成する
    var iRandom = Math.floor(Math.random() * aTargetCard.length);

    // 変換対象役職の数をデクリメントする
    oCardNum[aTargetCard[iRandom]]--;

    // 市民をインクリメントする
    oCardNum["Citizen"]++;

    // カード数を返して終了する
    return;

}

/****************************************************
    関数名    SetCustomRole
    機能        カスタム役割名をグローバル変数に保存し、
            LocalStrageに格納する。

    G入力    gsLocate        言語設定
    出力        oRoleText        役割名配列

    処理概要
        1. 言語設定が日本語の場合
         1.1. 言語設定を"Jp"とする
        2. 言語設定が英語の場合
         2.1. 言語設定を"En"とする
        3.1. 役割に対して繰り返す
         3.1.1. 入力値を配列に格納する
         3.1.2. HTML内の置換文字を置き換える
****************************************************/
function SetCustomRole(sLang) {
    var iCnt = 0;
    var sClass = "";
    var sRoleName = "";
    var sValue = "";
    var aRoleText = {};


    // 役割に対して繰り返す
    for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {

        // 役職名
        sRoleName = gaCardType[iCnt];

        // 入力フォームクラス名を作成する
        sClass = "input.CARD_" + sLang + "_" + sRoleName;
        sTextClass = ".CARD_" + sLang + "_" + sRoleName;

        // 値を取得する
        sValue = $(sClass).val();

        // 値が空の場合
        if (sValue == "") {
            if (sLang == "Jp") {
                // デフォルト値を設定する
                sValue = goRoleTextJp[sRoleName];
            } else {
                // デフォルト値を設定する
                sValue = goRoleTextEn[sRoleName];
            }
        }

        // 入力値をカスタム配列に格納する
        aRoleText[sRoleName] = sValue;

        // HTMLを差し替える
        $(sTextClass).text(sValue);

    }

    // 夜にプレイヤーの欄に表示される役の名前を置き換える
    goButtonText["Lovers"] = aRoleText["Lovers"];
    goButtonText["Vampire"] = aRoleText["Vampire"];


    return aRoleText;

}

/****************************************************
    関数名    SetWinningPoint
    機能        勝利時のポイントを設定する

    Form入力    CitizenWinningPoint
            WerewolfWinningPoint
            SurvivalPoint
            FirstTargetPoint

    G出力    giPoint        獲得ポイントクラス

    処理概要    1. 各ポイントをグローバル変数に格納する
            2. ゲームの中での説明文の中の点数を差し替える
            2. 終了する
****************************************************/
function SetWinningPoint() {

    // 各ポイントをグローバル変数に格納する
    giPoint["CitizenWin"] = $("#CitizenWinningPoint").val() - 0;
    giPoint["WerewolfWin"] = $("#WerewolfWinningPoint").val() - 0;
    giPoint["VampireWin"] = $("#VampireWinningPoint").val() - 0;
    giPoint["Alive"] = $("#SurvivalPoint").val() - 0;
    giPoint["FirstTarget"] = $("#FirstTargetPoint").val() - 0;

    Log("918: giPoint['CitizenWin'] =" + giPoint["CitizenWin"]);

    return;
}

/****************************************************
    関数名    CheckCardNameEmpty
    機能        入力されたカード名が空の場合は初期値に戻す

    入力        oInput        Inputオブジェクト
            sRole        Role名(Citizen, Werewolf,,,)
    出力        なし
****************************************************/
//function CheckCardNameEmpty(oInput, sRole) {
function CheckCardNameEmpty(oInput) {

    sRole = $(oInput).data('role');
    Log("2448 CheckCardNameEmpty:" + sRole);

    // Inputの値が空の場合
    if (oInput.value == "" || oInput.value == null) {
        // 初期値を設定する
        oInput.value = goRoleText[sRole];
    }
    return;
}

/****************************************************
    関数名    ResetPointsSetting
    機能        プレイヤーポイントの取得ポイント設定を初期化する

    入力        なし
    出力        なし

    処理概要
        1. ポイント設定SelectBoxのSelectedを変更する
****************************************************/
function ResetPointsSetting() {
    $("#CitizenWinningPoint").val(10);
    $("#WerewolfWinningPoint").val(15);
    $("#VampireWinningPoint").val(20);
    $("#SurvivalPoint").val(1);
    $("#FirstTargetPoint").val(3);

    return;

}

/****************************************************
    関数名    SaveGame
    機能        場面にあわせて、必要なデータを保存する。
            また、gsStageに、現在の場面を保存する。

    入力        sMode        ステージモード指定
    G出力    gsStage        ステージ値

    処理概要    0.ステージ値を更新する
            1. ステージモードによって切り分ける
             1.1. 必要なデータを保存する
****************************************************/
function SaveGame(sMode) {
    var domGotCard;
    var domCampCard;
    var domMedal;

    // モードによって切り分ける
    switch (sMode) {

        case "NewGame":
            // ステージ情報を更新する
            gsStage = "";

            break;

        case "SetMedal":

            // ステージ情報を更新する
            gsStage = "";

            // 購入情報を保存する
            domGotCard = LoadDataTmp("domGotCard");
            SaveData(domGotCard, "domGotCard");

            // キャンペーンカード情報をロードし、一時保存に反映する
            domCampCard = LoadDataTmp("domCampCard");
            SaveData(domCampCard, "domCampCard");

            domMedal = LoadDataTmp("domMedal");
            SaveData(domMedal, "domMedal");
            //            SaveData("domMedal");

            break;

        case "SetRole":
            // ステージ情報を更新する
            gsStage = "#Title_Tutorial";

            // 購入情報を保存する
            domGotCard = LoadDataTmp("domGotCard");
            SaveData(domGotCard, "domGotCard");
            //            SaveData("domGotCard");

            // キャンペーンカード情報をロードし、一時保存に反映する
            domCampCard = LoadDataTmp("domCampCard");
            SaveData(domCampCard, "domCampCard");

            domMedal = LoadDataTmp("domMedal");
            SaveData(domMedal, "domMedal");
            //            SaveData("domMedal");

            // 使用カード枚数を保存する
            SaveData("goCardNum");

            // 騎士データを保存する
            SaveData("gaKnightPlayerId");

            break;

        case "Night":
            // ステージ情報を更新する
            gsStage = "#Title_Night";

            break;

        case "Timer":
            // ステージ情報を更新する
            gsStage = "#Timer";

            break;

        case "Judgement":
            // ステージ情報を更新する
            gsStage = "#Title_Judgement";

            break;

        case "Finish":
            // ステージ情報を更新する
            gsStage = "#PlayerSetting";

            break;

        // リモートモード対応
        case "MakeRemoteGame":
            // QRコード表示画面
            gsStage = "#Title_Tutorial_Remote";
            break;

        case "SelectPlayer":
        case "SendNightAction":
            gsStage = "#RemoteWaitingGM";
            break;

        default:
            gsStarge = "";
            break;

    }

    // 基本データをすべて保存する ***************

    // ステージ情報を更新する
    SaveData("gsStage");

    // プレイヤーデータ
    SaveData("gaPlayer");
    SaveData("giPlayerNum");

    // 日付データ
    SaveData("giDateNum");

    // 占いチェックフラグ
    SaveData("gaForetellFlg");

    // パパラッチチェックフラグ
    SaveData("gaScoopFlg");

    // ボマーの無敵フラグ
    SaveData("goBomb");

    // デフォルトカードセット設定
    SaveData("gsDefaultCardSet");

    // 第1夜は殺害しないフラグ
    SaveData("gbFirstNightNoKillFlg");

    // 第1夜の占い設定
    SaveData("giFirstNightForetell");

    // 第1夜の占い：ランダム人間の結果
    SaveData("giForetellFirstRandom");


    // ランダムに役職を減らすフラグ
    SaveData("gbReducingRoleFlg");

    // 吸血鬼を「人間」として判断するフラグ
    SaveData("gbVampireHumanFlg");

    // BGMフラグ
    SaveData("gbBGMFlg");

    // 連続ガードフラグ
    SaveData("goDoubleGuard");

    // 投票の非表示機能は、投票スタイル機能に吸収されました ver.9.5
    // 投票を隠す
    //SaveData("gbHidingVoteFlg");
    SaveData("gsVotingStyle");

    // 票割れ判決
    SaveData("gsSameVote");

    // 自動的にパスする
    SaveData("gbPassAnswerFlg");

    // 裁判タイマーフラグ
    //SaveData("gbJudgementTimerFlg");
    SaveData("giJudgementTimer");

    // ファーストターゲットフラグ
    SaveData("gbFirstTargetFlg");

    // ポイント設定
    SaveData("giPoint");

    // 最後に死亡したプレイヤー
    SaveData("giLastDeadId");

    // 闇の霊媒師による騎士殺害フラグ
    SaveData("gbDarkShamanKillKnightFlg");

    // 運命の恋人の生存リスト
    SaveData("gaDestinedLoversPlayerId");

    // レインマンの生存フラグ、発生確率カウンタ
    SaveData("gbRainManLifeFlg");
    SaveData("giRainManCnt");
    SaveData("gbLightningFlg");

    // 霊媒師用 昨日の処刑対象
    SaveData("giYesterdayJudge");

    // 人狼の生き残り数
    SaveData("giWerewolfLiveNum");


    // カード枚数 ここで取ると、空で上書きされるので、カード設定時のみ保存
    //SaveData("goCardNum");

    // 役割名を保存する
    SaveData("goRoleTextCustomJp");
    SaveData("goRoleTextCustomEn");
    SaveData("goRoleText");
    SaveData("goButtonText");

    // 対戦結果の役職表示を保存する
    SaveData("gaPlayerAnswer");

    // ゲームマスターツールの有効を保存する
    SaveData("gbGmToolFlg");

    // リモートモード関連
    SaveData("gsRemoteGameId");
    SaveData("giRemotePlayerId");
    SaveData("gsRemoteMode");
    SaveData("gaRemoteAction");

    // 結果画面用
    SaveData("giStartTime");
    SaveData("gsGameStartDate");

    Log("667:SaveGame:" + sMode + "=>" + gsStage);

    return;
}


/****************************************************
    関数名    GoToInputPlayer
    機能        InputPlayer画面に移動する

    G入力    giPlayerNum
            giPlayerMax
    出力        なし

    処理概要
****************************************************/
function GoToInputPlayer() {

    // プレイヤー数が上限を超えている場合
    if (gaPlayer.length >= giPlayerMax) {

        aMessage = GetAlertMessage("ErrPlayerOver", "");
        ShowAlert(aMessage[0], aMessage[1]);
        return false;
    }

    // 並び替えモードをオフにする
    ChangeOrderMode(false);

    // InputPlayerに移動する
    jQT.goTo("#InputPlayer", "slideleft");

    return true;

}


/****************************************************
    関数名    AddPlayer #InputPlayer
    機能        必須項目チェックを行い、すべてが記入されていれば
            プレイヤーを追加する。

    入力        sTestName    テストフラグ（値が空でない場合、簡易的にユーザを作成する）
    出力        なし

    処理概要    1. プレイヤーデータを作成する
            2. 各パラメータを保存する
            3. プレイヤー一覧画面にプレイヤーを追加する
            4. プレイヤー数をインクリメントする
****************************************************/
function AddPlayer() {
    var iNewPlayerId = 0;
    var iAveragePoint = 0;

    // 必須項目をチェックする
    if (CheckNeedData() == true) {
        // なにもしない
        return;
    }

    // 1人目のプレイヤーの場合
    if (!gaPlayer) {
        iAveragePoint = 0;
        iNewPlayerId = 0;
        giPlayerNum = 0;

        // 2人目以降の場合
    } else {
        // 現在の全プレイヤーの平均点を取得する
        iAveragePoint = GetAveragePoint();
        iNewPlayerId = gaPlayer.length;
    }


    // プレイヤーデータを作成する
    gaPlayer[iNewPlayerId] = new Player();
    //gaPlayer[0].iId = 0;

    // 各パラメータを保存する iIdにはインクリメントシリアルを設定する
    // ここにバグあり ver.10.0.6
    //    gaPlayer[iNewPlayerId].iId = giPlayerNum;
    // 現在存在するプレイヤーのiIdの中で、一番数字が大きいiIdの次の番号を取得する
    gaPlayer[iNewPlayerId].iId = MakePlayerId();
    gaPlayer[iNewPlayerId].sName = $("#InputPlayerName").val();

    // 写真を選択されている場合
    if (imgFaceBuf != "") {
        gaPlayer[iNewPlayerId].imgFace = imgFaceBuf;
        // デフォルトを設定する
    } else {
        gaPlayer[iNewPlayerId].imgFace = gsFaceIcon;
    }
    //gaPlayer[iNewPlayerId].bCpuFlg = $("#InputComputerPlayer").attr("checked");

    Log("811:添え字=" + iNewPlayerId);

    // 初期値
    gaPlayer[iNewPlayerId].bLive = true;
    gaPlayer[iNewPlayerId].bCheckedFlg = false;
    gaPlayer[iNewPlayerId].sRole = "Citizen";
    gaPlayer[iNewPlayerId].iSuspect = 0;
    gaPlayer[iNewPlayerId].iTotalPoint = iAveragePoint;
    gaPlayer[iNewPlayerId].iAddPoint = 0;
    gaPlayer[iNewPlayerId].iWerewolfTeamCnt = 0;
    gaPlayer[iNewPlayerId].iOracleId = -1;

    Log("添え字：" + iNewPlayerId + "/ giPlayerNum 連番 = " + giPlayerNum);

    // プレイヤー一覧画面(#PlayerSetting)にプレイヤーを追加する
    AddPlayerToSetting(gaPlayer[iNewPlayerId]);

    // プレイヤー数をインクリメントする
    giPlayerNum++;
    imgFaceBuf = "";

    // ユーザ設定画面を初期化する
    InitInputPlayer();

    // プレイヤーデータを保存する
    SaveData("gaPlayer");
    SaveData("giPlayerNum");

    // ページを移動する
    jQT.goBack();

    return;
}

/****************************************************
    関数名    MakePlayerId
    機能      gaPlayerをチェックし、存在するプレイヤーの
            iIdのうち、一番大きいプレイヤーの次の番号を作成する。

    入力     gaPlayer
    出力     iMaxId  し
****************************************************/
function MakePlayerId() {
    var iMaxId = 0;

    // gaPlayerが存在しない場合
    if (!gaPlayer) {
        return 0;
    }

    // プレイヤーデータに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // iIdが最大値を更新する場合
        if (gaPlayer[iCnt].iId > iMaxId) {
            // 最大値を保存する
            iMaxId = gaPlayer[iCnt].iId;
        }
    }

    // 最大値をインクリメントする
    iMaxId++;

    return iMaxId;

}


/****************************************************
    関数名    GetAveragePoint
    機能        全プレイヤーの合計点の平均値を取得する
****************************************************/
function GetAveragePoint() {
    var iCnt;
    var iSum = 0;
    var iAverage = 0;

    // プレイヤーが存在しない場合
    if (!gaPlayer) {
        Log("842:Average 0");
        return 0;
    }

    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 点数を合計していく
        iSum += gaPlayer[iCnt].iTotalPoint;
    }

    // 平均値を作成する
    if (gaPlayer.length > 0) {
        iAverage = Math.floor(iSum / gaPlayer.length);
    } else {
        iAverage = 0;
    }

    return iAverage;
}

/****************************************************
    関数名    InitInputPlayer
    機能        プレイヤー入力画面を初期化する
****************************************************/
function InitInputPlayer() {

    // 顔画像
    $("#InputPlayer .FaceImg").attr("src", gsFaceIconSmall);

    // Name
    $("#InputPlayerName").val("");
    $("#InputPlayer .FaceName").text("");

    // Password
    $("#InputPassword").val("");

    // CPU
    $("#InputComputerPlayer").attr("checked", false);
    $("#InputPlayerCpuMark").hide();

    return true;

}


/****************************************************
    関数名    CheckNeedData #InputPlayer
    機能        必須項目が入力されているかチェックする
****************************************************/
function CheckNeedData() {
    var aMessage = [];
    var sAutoName = "";

    // 名前が未記入の場合
    Log("2930:attr(value)=" + $("#InputPlayerName").val());

    if ($("#InputPlayerName").val() == "") {

        // 名前を自動作成する
        sAutoName = MakeAutoName("Player");
        $("#InputPlayerName").val(sAutoName);

        // return true;
        return false;
    }

    // すでに登録されているユーザー名と同じ名前かチェックする
    if (CheckExistUserName($("#InputPlayerName").val())) {
        aMessage = GetAlertMessage("ErrNameSame", $("#InputPlayerName").val());
        ShowAlert(aMessage[0], aMessage[1]);
        $("#InputPlayerName").focus();
        return true;
    }

    return false;
}

/****************************************************
    関数名    MakeAutoName
    機能        自動的にデフォルトプレイヤー名を作成する

    入力        sPrefix        数字の前につく接頭語
    出力        sName        プレイヤー名

    処理概要    1. 1から21まで繰り返す
             1.1. プレイヤー名を作成する
             1.2. プレイヤーデータに対して繰り返す
              1.2.1. 同じ名前が存在する場合
               1.2.1.1. ダブりフラグをオンにする
             1.3. ダブりフラグがオフの場合
              1.3.1. 名前を返して終了する
            2. エラー名を返して終了する
****************************************************/
function MakeAutoName(sPrefix) {
    var iCnt;
    var sName;
    var iPlayerCnt;
    var bExistFlg = false;

    // 1からプレイヤー最大数まで繰り返す
    for (iCnt = 1; iCnt <= giPlayerMax + 1; iCnt++) {
        // プレイヤー名を作成する
        sName = sPrefix + iCnt;

        // ダブりフラグを初期化する
        bExistFlg = false;

        // 全プレイヤーに対して繰り返す
        for (iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++) {

            // 同じ名前が存在する場合
            if (sName == gaPlayer[iPlayerCnt].sName) {
                // ダブりフラグをオンにする
                bExistFlg = true;
            }
        }

        // ダブりがない場合
        if (bExistFlg == false) {
            // 名前を返して終了する
            return sName;
        }
    }

    // エラー名を返す
    return "ERROR";

}

/****************************************************
    関数名    CheckExistUserName
    機能        すでに登録されたプレイヤー名と同じ名前が入力されていないかチェックする。

    入力        sPlayerName        プレイヤー名
    G入力    gaPlayer        プレイヤーデータ
    出力        bCheckFlg        true: 同じ名前エラー

****************************************************/
function CheckExistUserName(sPlayerName) {
    var iCnt = 0;

    // 登録されたプレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 対象のプレイヤー名と登録されたプレイヤー名を比較する
        if (gaPlayer[iCnt].sName == sPlayerName) {
            return true;
        }
    }
    return false;
}

/****************************************************
    関数名    AddPlayerToSetting #InputPlayer
    機能        プレイヤー一覧画面にプレイヤーを追加する

    入力        oPlayer        プレイヤーオブジェクト
    出力        なし

    処理概要    1. 出力用HTMLを作成する
            2. 出力先のHTMLにappendする
****************************************************/
function AddPlayerToSetting(oPlayer) {

    var sHtml = "";
    var sCpuMarkHtml = "";

    // CPUの場合
    //if(oPlayer.bCpuFlg == 1){
    //    sCpuMarkHtml = '  <div class="CpuMark"><img src="img/IconCPU.png" /></div>';
    //}
    sHtml = '<div class="FaceReflect" id="Player' + oPlayer.iId + '">' + ' <div class="FaceArea" onClick="DeletePlayer(' + oPlayer.iId + ')">' + '  <div><img class="FaceImg" onerror="this.src = \'img/FaceIcon.jpg\';this.removeAttribute(\'onerror\');" src="' + oPlayer.imgFace + '" /></div>' + '  <div class="FaceName">' + oPlayer.sName + '</div>' + sCpuMarkHtml + ' </div></div>';

    // 出力先のDivにappendする
    $("#PlayerSettingFaceBox").append(sHtml);

    return;

}

/****************************************************
    関数名    ChangeOrderMode
    機能        順番変更モードを開始する

    入力        bMode                true: オン   false: オフ
    G出力    gbChangeOrder

    処理概要
            1. ChangeOrderモードを更新する
            2. Change orderボタン、もしくは、Fix orderボタンを表示する
****************************************************/
function ChangeOrderMode(bMode) {

    // 並び替えモードを変更する
    gbChangeOrder = bMode;

    // モードがオンの場合
    if (bMode) {
        // Change orderを非表示にし、Fix orderを表示する
        $("#PlayerSetting .StartChangeOrder").hide();
        $("#PlayerSetting .RandomChangeOrder").hide();
        $("#PlayerSetting .EndChangeOrder").show();


    } else {
        // Change orderを表示にし、Fix orderを非表示する
        $("#PlayerSetting .StartChangeOrder").show();
        $("#PlayerSetting .RandomChangeOrder").show();
        $("#PlayerSetting .EndChangeOrder").hide();

        // プレイヤー一覧の表示を初期化する
        // InitPlayerSetting();

        // 並び替えの選択中の場合
        if (giChangeOrderFrom != -1) {
            // 赤い枠線を消す
            $("#PlayerSettingFaceBox .FaceArea").css("border", "rgb(200,200,200) solid 1px");
        }

        // プレイヤーデータをセーブする
        SaveData("gaPlayer");

    }

    // 並び替え番号を初期化する
    giChangeOrderFrom = -1;


}
/****************************************************
    関数名    ChangeOrderRandom
    機能        プレイヤーの順番をランダムに変更する

    入力        なし
    G出力    gbChangeOrder

    処理概要
            1. プレイヤーの数-1だけ繰り返す（最後の人は不要）
             1.1. 対象プレイヤーデータを一時オブジェクトに格納する
             1.2. 対象プレイヤー以降の数字からランダムに１つを選択し、置き換え対象とする
             1.3. 置き換え対象のデータで対象プレイヤーデータを上書きする
             1.4. 一時保存データを置き換え対象データに上書きする。（入れ替え完了）
            2. プレイヤー一覧の表示を初期化する
            3. プレイヤーデータをセーブする。
    置き換えシミュレーション
            左から順番に置き換えている。置き換え対象は、自分よりも右側
            0 1 2 3 4 5 6
            4 1 2 3 0 5 6
            4 2 1 3 0 5 6
            4 2 5 3 0 1 6
            4 2 5 0 3 1 6
            4 2 5 0 6 1 3
            4 2 5 0 6 3 1
****************************************************/
function ChangeOrderRandom() {
    var iLastPlayerNum = 0;
    // 差し替える回数は、プレイヤー数の半分。（切り捨て）
    var iChangeNum = gaPlayer.length - 1;
    var iNowPlayerNum = 0;
    var oPlayerTmp = new Object();
    var iCnt = 0;
    var iRandMax = 0;

    // プレイヤーの数の半分だけ繰り返す（ほぼ全員差し替わる計算）
    for (iCnt = 0; iCnt < iChangeNum; iCnt++) {

        // 対象プレイヤーデータを一時オブジェクトに格納
        oPlayerTmp = gaPlayer[iCnt];

        // 残りのプレイヤー数
        iLastPlayerNum = gaPlayer.length - (iCnt + 1);

        // 対象プレイヤー以降の数字からランダムに１つ選択する
        iToNum = (iCnt + 1) + Math.floor(Math.random() * iLastPlayerNum);

        // 置き換え対象プレイヤーデータを対象プレイヤーに上書きコピーする
        gaPlayer[iCnt] = gaPlayer[iToNum];

        // 一時保存データを置き換え対象データに上書きコピーする(入れ替え完了)
        gaPlayer[iToNum] = oPlayerTmp;
    }

    // プレイヤー一覧の表示を初期化する
    InitPlayerSetting();

    // プレイヤーデータをセーブする
    SaveData("gaPlayer");
}

/****************************************************
関数名    SetCardDefaultNum
機能        カード数のデフォルト値を設定する。
        第1夜の殺害なしモードの場合は、チェックボックスをオンにする。

G入力    gaDefaultCardSet    デフォルトのカードセット
出力        なし

処理概要    1. グローバル変数にカード数の初期値を設定する
        2. HTML上の表示文字の数字を設定する
*****************************************************/
function GoToCheckRoleNum() {

    // 並び替えモードをオフにする
    ChangeOrderMode(false);

    // 人数が4人未満の場合
    if (gaPlayer.length < giPlayerMin) {
        aMessage = GetAlertMessage("ErrPlayerMin", giPlayerMin);
        ShowAlert(aMessage[0], aMessage[1]);
        return false;
    }

    SaveGame();

    // ページを移動する
    jQT.goTo("#CheckRoleNum", "fade");

    return;
}

/*******************************************************************************
    関数名    CheckEnableCustomCardNum
    機能        前回のプレイでカード枚数を設定済みで、プレイヤー人数とマッチするかどうかを調べる。

    G入力    goCardNum
            gaPlayer
    出力        bOkFlg            1:OK    0:NG
*******************************************************************************/
function CheckEnableCustomCardNum(sDefaultCardSet) {
    var sRole = "";
    var iCardSum = 0;

    if (sDefaultCardSet == "Random") {
        return false;
    }

    // カード枚数設定に対して繰り返す
    for (sRole in goCardNum) {
        // 対象のカード枚数を合計する
        iCardSum += goCardNum[sRole];
    }
    Log("2035:iCardSum=" + iCardSum + "/Player=" + gaPlayer.length);
    // カード枚数とプレイヤー人数がマッチする場合
    if (iCardSum == gaPlayer.length) {
        return true;
    } else {
        return false;
    }

}
/*******************************************************************************
    関数名    InitCheckRoleNum
    機能        CheckRoleNum画面に移動したときに表示状態を初期化する

    入力        なし
    出力        なし

    処理概要
            1. メダルでのカード交換が可能な場合
             1.1. 購入ボタンをメダル購入にする
            2. メダルが残っていない場合
             2.1. 購入ボタンをAppStore購入にする
*******************************************************************************/
var gbInitIAPFlg = false;
var gsShowCardSliderLocale = "";
function InitCheckRoleNum() {

    // ページ上部にスクロールする for iOS8
    $("#CheckRoleNum").scrollTop(0, 0);
    
    // 初回のカード設定画面の場合
    if (gsShowCardSliderLocale == "") {
        Log("3362 gsShowCardSliderLocale=" + gsShowCardSliderLocale + "/" + gsLocale);
        // カードを表示する
        ShowCardSlider("#CardSlider", "CardSlider_TEMPLATE", "#CardSliderNavi", "CardSliderNavi_TEMPLATE");

        // カード選択メニューを作成済みにする
        gsShowCardSliderLocale = gsLocale;

        // カードの文言を、設定言語にあわせて設定する ver.11.3.1 バグ修正
        SetTextForCardSlider();

        // スライドのボタンを挿入する
        AddSliderButton("#CardSliderNavi", "#CheckRoleNum .SlideButtons_TEMPLATE", "SlideButtons_TEMPLATE");

        // Flickityを有効にする
        SetFlickity("#CardSlider", ".gallery-cell", "#CardSliderNavi", ".navi-cell");


    } else {
        // PCのChromeではこの設定がなくても動くけれど
        // iOSでは、この処理がないと、再びページ移動したときにバグってしまう
        $CardSlider.flickity('reposition');

    }


    // カード枚数を設定する
    SetAllCardNum();

    // 使用カードリストを更新する
    ShowCardNumList();

    // 詳細設定の状態をセーブデータで更新する
    SetDetailSettings();

    /*
        // メダルデータを取得する
        var domMedal = LoadDataTmp("domMedal");
        // メダルでカードを取得できる場合
        var iPointLast = domMedal["PointLast"];
    */
    var iPointLast = 0;

    // ボタン画像名
    var sButtonSrc = GetBuyButtonSrc(iPointLast);

    // カード購入ボタンをメダルで購入に差し替える
    $("#CheckRoleNum .BuyButtonImage").attr("src", sButtonSrc);

    // flickity後にSPの場合はロックを解除する
    // Full Edition の場合
    if (gbFull == true) {
        // カードセットを行う
        SetFullCard();

    // SP版でない場合
    } else {

        // サブスクに関するデータを復元する
        goSubScFlg = LoadData("goSubScFlg");
        goSubScStartDate = LoadData("goSubScStartDate");

        if(!goSubScFlg){
            goSubScFlg = {"CardMasterKey": false,"Adfree": false};
        }
        if(!goSubScStartDate){
            goSubScStartDate = {"CardMasterKey": false,"Adfree": false};
        }

        // マスターキーのサブスクが購入済みの場合 ver.11
        if (goSubScFlg["CardMasterKey"]) {

            // ver.11.2.0
            // 最終購入日が31日を過ぎているかチェックする
            goSubScFlg["CardMasterKey"] = CheckExpire(goSubScStartDate["CardMasterKey"], 31);
            
            Log("3710:goSubScFlg[CardMasterKey]"+goSubScFlg["CardMasterKey"])
            // 購入日を過ぎている場合
            if(!goSubScFlg["CardMasterKey"]){

                // リストアする
                RestorePurchase();

            // 購入日を過ぎていない場合
            } else {
                // すべてのカードを有効にする
                ShowGotCard(true);
            }


        // マスターキーが購入されていない場合
        } else {
            // IAPが初期化されていない場合 2014.05.11
            if (gbInitIAPFlg != 1) {
                Log("2348:InAppPurchaseの初期化実行");
                InitPurchase(goProductIdMap);
            }
            // 購入済みのカードを有効にする
            ShowGotCard();
        }
    }

    // カードの名前を設定する
    InitCardName();

    // カード設定を前回選択した内容にする
    if (gsDefaultCardSet != "" && gsDefaultCardSet != "Default" && gsDefaultCardSet != undefined) {
        $("#CheckRoleNum .DefaultCardSet").val(gsDefaultCardSet);
    }


}

/****************************************************
    関数名    SetAllCardNum
    機能      カードセット設定の状態を確認し、
            　まだカード設定されていない場合は、デフォルト枚数を
             設定する。
****************************************************/
function SetAllCardNum() {

    // カード数を更新する
    // SetCardNum("Default");
    if (gsDefaultCardSet == undefined || gsDefaultCardSet == "") {
        gsDefaultCardSet = "Default";
    }

    // カード枚数が設定されていない場合
    if (goCardNum["Werewolf"] == undefined) {
        // 保存データを読み込む
        goCardNum = LoadData("goCardNum");
    }
    // 保存データを読み込んでもカード枚数が設定されていない場合
    if (goCardNum["Werewolf"] == undefined) {
        // デフォルト値を設定する
        goCardNum = gaDefaultCardInit;
    }

    // 現在のカードセットが空でなく、プレイヤー人数とマッチしている場合
    if (CheckEnableCustomCardNum(gsDefaultCardSet) && $("#CardNum_Citizen_Num").text() != "") {
        // 何もしない
        Log("we.js 2726 カード枚数設定が大丈夫なので何もしない");
    } else {
        // 現在設定されているデフォルト値を設定する
        Log("we.js 2729 デフォルトカード枚数を設定 : " + CheckEnableCustomCardNum(gsDefaultCardSet) + " / " + $("#CardNum_Citizen_Num").text());

        SetCardNum(gsDefaultCardSet);
    }
}

/****************************************************
    関数名    SetDetailSettings
    機能      詳細設定の状態をセーブデータを使って反映する
****************************************************/
function SetDetailSettings() {

    // 第1夜の殺害なしの場合
    if (gbFirstNightNoKillFlg == 1) {
        $("#InputFirstNightNoKill").attr("checked", true);
    } else {
        $("#InputFirstNightNoKill").attr("checked", false);
    }

    // 第1夜の占いの設定をセレクトボックスに反映する ver.8.0
    $("#InputFirstNightForetellSelectJp").val(giFirstNightForetell);
    $("#InputFirstNightForetellSelectEn").val(giFirstNightForetell);

    // ランダムに役職を減らす場合
    if (gbReducingRoleFlg == 1) {
        $("#InputReducingRole").attr("checked", true);
    } else {
        $("#InputReducingRole").attr("checked", false);
    }

    // 吸血鬼を「人間」と占う
    if (gbVampireHumanFlg == 1) {
        $("#InputVampireHuman").attr("checked", true);
    } else {
        $("#InputVampireHuman").attr("checked", false);
    }

    // BGMありの場合
    if (gbBGMFlg == 1) {
        $("#InputBGM").attr("checked", true);
    } else {
        $("#InputBGM").attr("checked", false);
    }

    // 投票スタイルの選択ボタンを設定する
    // 引数は「ボタンClass名」と「値」
    if (gsVotingStyle != "") {
        gsVotingStyle = ChangeSelectMode("VotingStyle", gsVotingStyle);
    } else {
        // 席順投票に初期化する
        gsVotingStyle = "VotingStyleSeat";
        gsVotingStyle = ChangeSelectMode("VotingStyle", gsVotingStyle);
    }

    // 「票割れ判決」の選択ボタンを設定する
    // 引数は「ボタンClass名」と「値」
    if (gsSameVote != "") {
        gsSameVote = ChangeSelectMode("SameVote", gsSameVote);
    } else {
        // 席順投票に初期化する
        gsSameVote = "SameVoteRandom";
        gsSameVote = ChangeSelectMode("SameVote", gsSameVote);
    }

    // 自動パスモードの場合
    if (gbPassAnswerFlg == 1) {
        $("#InputPassAnswer").attr("checked", true);

    } else {
        $("#InputPassAnswer").attr("checked", false);
    }

    // 裁判時のタイマー秒数を設定する
    $("#InputJudgementTimer").val(giJudgementTimer);

    // ゲームマスターツールの場合
    if (gbGmToolFlg == true) {
        $("#InputGmTool").attr("checked", true);

    } else {
        $("#InputGmTool").attr("checked", false);
    }

    // ポイント数を更新する
    $("#CitizenWinningPoint").val(giPoint["CitizenWin"]);
    $("#WerewolfWinningPoint").val(giPoint["WerewolfWin"]);
    $("#SurvivalPoint").val(giPoint["Alive"]);
    $("#FirstTargetPoint").val(giPoint["FirstTarget"]);

    return;
}


/*******************************************************************************
    関数名    InitCardName ver.8.2
    機能        カードに対して繰り返し、カスタマイズされていた場合は、カスタマイズ文言に。
            空の場合は、初期値を設定する。

    入力        なし
    出力        なし

    処理概要
            0. カスタマイズカード名をLoadDataする。
            1. カード名に対して繰り返す
             1.1. カスタマイズ名が存在する場合
              1.1.1. カスタマイズ名を入力フォームに設定する
             1.2. 入力フォームが空の場合
              1.2.1. 初期値を入力する
*******************************************************************************/
function InitCardName() {

    var oRoleTextJp = {};
    var oRoleTextEn = {};
    var iCnt;
    var sInputId = "";

    // カスタマイズ設定を読み込む
    goRoleTextCustomJp = LoadData("goRoleTextCustomJp");
    goRoleTextCustomEn = LoadData("goRoleTextCustomEn");

    // カード種類に対して繰り返す
    for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {
        // <input>のIDを作成する
        sInputId = "input.CARD_Jp_" + gaCardType[iCnt];

        // 役名がカスタマイズ設定されている場合
        if (goRoleTextCustomJp[gaCardType[iCnt]] != undefined && goRoleTextCustomJp[gaCardType[iCnt]] != null) {
            // カスタマイズ名称を入力する
            $(sInputId).val(goRoleTextCustomJp[gaCardType[iCnt]]);
        } else {
            $(sInputId).val(goRoleTextJp[gaCardType[iCnt]]);
        }
        // 役名のフォームが空の場合
        if ($(sInputId).val() == "") {
            // 初期値を設定する
            $(sInputId).val(goRoleTextJp[gaCardType[iCnt]]);
        }

        // 英語用の<input>IDを作成する
        sInputId = "input.CARD_En_" + gaCardType[iCnt];

        // 役名がカスタマイズ設定されている場合
        if (goRoleTextCustomEn[gaCardType[iCnt]] != undefined && goRoleTextCustomEn[gaCardType[iCnt]] != null) {
            // カスタマイズ名称を入力する
            $(sInputId).val(goRoleTextCustomEn[gaCardType[iCnt]]);
        } else {
            $(sInputId).val(goRoleTextEn[gaCardType[iCnt]]);
        }
        // 役名のフォームが空の場合
        if ($(sInputId).val() == "") {
            // 初期値を設定する
            $(sInputId).val(goRoleTextEn[gaCardType[iCnt]]);
        }

    }
    return;

}

/*******************************************************************************
    関数名    GetBuyButtonSrc
    機能        購入ボタンの画像名を取得する

    入力        iPointLast    メダルポイント残数
    出力        sButtonSrc    ボタン画像名
*******************************************************************************/
function GetBuyButtonSrc(iPointLast) {
    var sButtonSrc = "";
    //var sPlatform = CheckPlatform();
    Log("2943:gsLocale=" + gsLocale);
    // メダルが交換可能枚数以上ある場合
    if (giMedalForCard <= iPointLast) {
        // 日本語の場合
        if (gsLocale == "ja-jp" || gsLocale == "ja") {
            sButtonSrc = "img/BuyButtonByMedal_JP.png";
        } else {
            sButtonSrc = "img/BuyButtonByMedal_EN.png";
        }

        // メダルが足りない場合
    } else {
        // 日本語の場合
        if (gsLocale == "ja-jp" || gsLocale == "ja") {
            sButtonSrc = "img/BuyButton_JP.png";
        } else {
            sButtonSrc = "img/BuyButton_EN.png";
        }

    }
    return sButtonSrc;
}

/*******************************************************************************
    関数名    BackFromMedal
    機能        メダル表示画面から戻る

    入力        なし
    出力        なし

    処理概要
            1. カードの状態を更新する
            2. ユーザーコードを保存する
*******************************************************************************/
function BackFromMedal() {
    Log("1686:");
    InitCheckRoleNum();

    jQT.goBack();
}

/****************************************************
    関数名    SetCardNum
    機能        カード数を更新する

    入力        sMode        設定モード（Default, Beginner, Advanced, Random)
    G出力    goCardNum
****************************************************/
function SetCardNum(sMode) {

    Log("3545:SetCardNum sMode=" + sMode);

    // カードのデフォルト数を取得する
    GetDefaultCardSet(sMode);
    gsDefaultCardSet = sMode;

    var iCnt;
    var sCardType = "";

    // 全プレイヤー数を表示する
    $("#CheckRoleNum > .SubTitle").text("< " + gaPlayer.length + " PLAYERS >");

    // カードタイプに対して繰り返す
    for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {

        // 対象の役職
        sCardType = gaCardType[iCnt];

        // モードがランダムの場合
        if (sMode == "Random") {

            // HTML上の数字を更新する
            $("#CardNum_" + sCardType + "_Num").text("?");

            // プラスボタン、マイナスボタンのアクティブ状態を無効にする
            ChangeActiveStateOfButton(gaCardType[iCnt], -1, goCardMax[gaCardType[iCnt]]);


        } else {

            // プラスボタン、マイナスボタンのアクティブ状態を更新する
            ChangeActiveStateOfButton(gaCardType[iCnt], goCardNum[gaCardType[iCnt]], goCardMax[gaCardType[iCnt]]);

            // Log("3584 goCardNum[sCardType]=" + sCardType + "=" + goCardNum[sCardType]);
            // HTML上の数字を更新する
            if (goCardNum[sCardType] != null && goCardNum[sCardType] != undefined) {
                $("#CardNum_" + sCardType + "_Num").text(goCardNum[sCardType]);
            }

            // ランダムの説明を非表示する
            $("#CheckRoleNum .RandomCardSetAlert").hide();
        }

    }

    // カード枚数リストを更新する
    ShowCardNumList();

    return;

}



/****************************************************
    関数名    GetDefaultCardSet
    機能        デフォルトのカード枚数設定を取得する

    入力        sMode        設定モード（Default, Beginner, Advanced, Special, Random)
    G入力    goDefaultCardSet    カード枚数設定リスト
            domGotCard            購入カードの購入状態
            gaGotCardType        購入カード役職リスト
            gaPlayer            プレイヤーオブジェクト
    出力        goCardNum    カード設定

    処理概要
            0. ランダムの場合
             0.1. 初心者、標準、上級、スペシャル、全カード解放スペシャルをランダムに選択する
            1. 初心者用の場合
             1.1. 人狼、占い師を確定する
            2. 標準の場合
             2.1. 人狼、占い師、ナイト、霊媒師を確定する
            3. 上級の場合
             3.1. 人狼、占い師、ナイト、霊媒師、多重人格、恋人、吸血鬼を確定する
            4. スペシャルの場合
             4.1. 上級と同様にカード枚数を確定する
             4.2. 所有しているスペシャルカードで、通常カードを置き換える
            6. 市民の数を算出する
****************************************************/
function GetDefaultCardSet(sMode) {
    // モードリスト
    var aMode = ["Default", "Beginner", "Advanced", "Special"];
    var iRandom = 0;
    var iCnt;

    // カード枚数を初期化する
    goCardNum = {};
    for (var sRole in gaDefaultCardInit) {
        goCardNum[sRole] = gaDefaultCardInit[sRole];
    }


    if (sMode == "" || sMode == undefined) {
        sMode = "Default";
    }

    // すべてのモードに対しての処理
    goCardNum["Werewolf"] = GetCardNum("Werewolf");

    // 標準以上に対する処理
    if (sMode == "Default" || sMode == "Random" || sMode == "Advanced" || sMode == "Special") {
        goCardNum["FortuneTeller"] = GetCardNum("FortuneTeller");
        goCardNum["Knight"] = GetCardNum("Knight");
        goCardNum["Shaman"] = GetCardNum("Shaman");
    }

    // 上級者以上に対する処理
    if (sMode == "Random" || sMode == "Advanced" || sMode == "Special") {
        // Psycho
        goCardNum["Psycho"] = GetCardNum("Psycho");
        // カードをもっていない場合
        if (domGotCard["Psycho"] < 1 && goSubScFlg["CardMasterKey"]!=true) {

            // 多重人格が２枚必要なバランスの場合
            if (goCardNum["Psycho"] >= 2) {
                // 人狼を１つ増やす
                goCardNum["Werewolf"]++;
            }

            // カード枚数を初期化する
            goCardNum["Psycho"] = 0;

            // カードをもっている場合
        } else {
            // 人狼チームの人数を算出する
            var iWerewolfTeamNum = goCardNum["Werewolf"] + goCardNum["Psycho"];

            // 人狼チームが全体の3分の１よりも多い場合
            if (iWerewolfTeamNum > Math.floor(gaPlayer.length / 3) + 1) {
                // 人狼の人数を1人減らす
                goCardNum["Werewolf"]--;
            }
        }

        // 恋人
        // カードをもっている場合
        if (domGotCard["Lovers"] > 0 || goSubScFlg["CardMasterKey"] || gbFull) {
            goCardNum["Lovers"] = GetCardNum("Lovers");
        } else {
            goCardNum["Lovers"] = 0;
        }

        // 吸血鬼
        // カードをもっている場合
        if (domGotCard["Vampire"] > 0 || goSubScFlg["CardMasterKey"] || gbFull) {
            goCardNum["Vampire"] = GetCardNum("Vampire");
        } else {
            goCardNum["Vampire"] = 0;
        }
    }

    // ランダムの場合
    if (sMode == "Random") {
        // 基本カード設定された役職を一定確率でゼロ枚にする
        // ただし、ゲームバランスを変えないために、人狼と多重人格の人数はいじらない
        var aBasicCards = ["FortuneTeller", "Shaman", "Knight", "Lovers", "Vampire"];
        // 取り除く確率 1/iMinusRand
        var iMinusRand = 5;
        var iMinusFlg = 0;
        // ベーシックカードに対して繰り返す
        for (iCnt = 0; iCnt < aBasicCards.length; iCnt++) {
            iMinusFlg = Math.floor(Math.random() * iMinusRand);
            Log("2659:" + iMinusFlg + "=" + aBasicCards[iCnt]);
            // 取り除く結果の場合
            if (iMinusFlg == 0) {
                // 対象のカード枚数をゼロにする
                goCardNum[aBasicCards[iCnt]] = 0;
            }
        }
    }

    // スペシャル以上に対する処理
    // SPエディションでは、すべてのカードが対象となる。
    // 無料版では、持っているカードだけが対象となる。
    if (sMode == "Special" || sMode == "Random") {

        // ランダムの場合 1/iRandomRate の確率で有効になる
        var iRandomRate = 2;
        var bValidFlg = 0;

        // 富豪
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Rich", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Rich"] = GetCardNum("Rich");
        } else {
            goCardNum["Rich"] = 0;
        }

        // 変身した吸血鬼
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Bat", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Bat"] = GetCardNum("Bat");

            // 吸血鬼が１人以上いる場合
            if (goCardNum["Vampire"] >= 1) {
                // 吸血鬼を１人、変身した吸血鬼に変更する
                goCardNum["Vampire"] = goCardNum["Vampire"] - goCardNum["Bat"];
            }

        } else {
            goCardNum["Bat"] = 0;
        }

        // サイコキラー
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("PsychoKiller", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["PsychoKiller"] = GetCardNum("PsychoKiller");

            // 多重人格が１人以上いる場合
            if (goCardNum["Psycho"] >= 1) {
                // 多重人格を１人、サイコキラーに変更する
                goCardNum["Psycho"] = goCardNum["Psycho"] - goCardNum["PsychoKiller"];
            }

        } else {
            goCardNum["PsychoKiller"] = 0;
        }

        // 偉大な霊媒師
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("GreatShaman", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["GreatShaman"] = GetCardNum("GreatShaman");

            Log("4134:GreatShaman=" + goCardNum["GreatShaman"]);

            // 霊媒師が１人以上いる場合
            if (goCardNum["Shaman"] >= 1) {
                // 霊媒師を１人、偉大な霊媒師に変更する
                goCardNum["Shaman"] = goCardNum["Shaman"] - goCardNum["GreatShaman"];
            } else {
                goCardNum["GreatShaman"] = 0;
            }
        } else {
            goCardNum["GreatShaman"] = 0;
        }

        // 闇の霊媒師
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("DarkShaman", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["DarkShaman"] = GetCardNum("DarkShaman");

            // 霊媒師が１人以上いる場合
            if (goCardNum["Shaman"] >= 1) {
                // 霊媒師を１人、闇の霊媒師に変更する
                goCardNum["Shaman"] = goCardNum["Shaman"] - goCardNum["DarkShaman"];
            } else if (goCardNum["GreatShaman"] >= 1) {
                goCardNum["GreatShaman"] = goCardNum["GreatShaman"] - goCardNum["DarkShaman"];
            } else {
                goCardNum["DarkShaman"] = 0;
            }

        } else {
            goCardNum["DarkShaman"] = 0;
        }

        // 運命の恋人
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("DestinedLovers", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["DestinedLovers"] = GetCardNum("DestinedLovers");

            // 恋人が2人以上いる場合
            if (goCardNum["Lovers"] >= 2) {
                // 恋人の2枚は、0に戻す
                goCardNum["Lovers"] = goCardNum["Lovers"] - goCardNum["DestinedLovers"];
            }

        } else {
            goCardNum["DestinedLovers"] = 0;
        }

        // レインマン
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("RainMan", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["RainMan"] = GetCardNum("RainMan");

        } else {
            goCardNum["RainMan"] = 0;
        }

        // コスプレイヤー
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Cosplayer", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Cosplayer"] = GetCardNum("Cosplayer");

            // 騎士が１人以上いる場合
            if (goCardNum["Knight"] >= 1) {
                // 騎士を１人、コスプレイヤーに変更する
                goCardNum["Knight"] = goCardNum["Knight"] - goCardNum["Cosplayer"];
            }
        } else {
            goCardNum["Cosplayer"] = 0;
        }

        // パパラッチ
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Paparazzi", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Paparazzi"] = GetCardNum("Paparazzi");

            // 多重人格が１人以上いる場合
            if (goCardNum["Psycho"] >= 1) {
                // 多重人格を１人、パパラッチに変更する
                goCardNum["Psycho"] = goCardNum["Psycho"] - goCardNum["Paparazzi"];
            } else {
                // 多重人格が多すぎる状態を防ぐ
                goCardNum["Paparazzi"] = 0;
            }

        } else {
            goCardNum["Paparazzi"] = 0;
        }

        // マジシャン
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Magician", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Magician"] = GetCardNum("Magician");

        } else {
            goCardNum["Magician"] = 0;
        }

        // ボマー
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Bomber", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Bomber"] = GetCardNum("Bomber");

        } else {
            goCardNum["Bomber"] = 0;
        }

        // メンタリスト
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Mentalist", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Mentalist"] = GetCardNum("Mentalist");

            // 多重人格が１人以上いる場合
            if (goCardNum["Psycho"] >= 1) {
                // 多重人格を１人、メンタリストに変更する
                goCardNum["Psycho"] = goCardNum["Psycho"] - goCardNum["Mentalist"];
            } else {
                goCardNum["Mentalist"] = 0;
            }

        } else {
            goCardNum["Mentalist"] = 0;
        }

        // 伝説の人狼
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("LegendaryWolf", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["LegendaryWolf"] = GetCardNum("LegendaryWolf");

            // 人狼が１人以上いる場合
            if (goCardNum["Werewolf"] >= 1) {
                // 人狼を１人、伝説の人狼に変更する
                goCardNum["Werewolf"] = goCardNum["Werewolf"] - goCardNum["LegendaryWolf"];
            } else {
                goCardNum["LegendaryWolf"] = 0;
            }

        } else {
            goCardNum["LegendaryWolf"] = 0;
        }


        // 脱獄犯
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("PrisonBreaker", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["PrisonBreaker"] = GetCardNum("PrisonBreaker");

            // 多重人格が１人以上いる場合
            if (goCardNum["Psycho"] >= 1) {
                // 多重人格を１人、脱獄犯に変更する
                goCardNum["Psycho"] = goCardNum["Psycho"] - goCardNum["PrisonBreaker"];
            } else {
                // 多重人格が多すぎる状態を防ぐ
                goCardNum["PrisonBreaker"] = 0;
            }

        } else {
            goCardNum["PrisonBreaker"] = 0;
        }

        // 神託者
        // カードをもっている場合もしくは、ランダムで使われた場合
        bValidFlg = GetCardValid("Oracle", sMode, iRandomRate);
        if (bValidFlg) {
            goCardNum["Oracle"] = GetCardNum("Oracle");

        } else {
            goCardNum["Oracle"] = 0;
        }

    }

    // 市民の人数を計算する
    goCardNum["Citizen"] = GetCardNum("Citizen");

    // debug
    Log("2165:Card Set -----");
    for (var sRole in goCardNum) {
        Log(sRole + "=" + goCardNum[sRole]);
    }

    return goCardNum;
}

/*******************************************************************************
    関数名    GetCardValid
    機能        そのカードが使えるか調べる。
            購入済みで、Speciaの場合。
            もしくは、購入済みでランダムモードで使える場合にtrueを返す。

    入力        sRole            役職
            sMode            Special or Random
            iRandomRate        ランダムにヒットする割合
    出力        iFlg            true or false
*******************************************************************************/
function GetCardValid(sRole, sMode, iRandomRate) {

    var iRandom = 0;

    Log("4331:goSubScFlg[MasterKey]" + goSubScFlg["CardMasterKey"]);

    // SP版でない場合、かつ、Masterkeyでもない場合
    if (gbFull != true && goSubScFlg["CardMasterKey"] != true) {
        // 購入済みカード情報
        var domGotCard = [];
        domGotCard = LoadDataTmp("domGotCard");

        var domCampCard = [];
        domCampCard = LoadDataTmp("domCampCard");

        // 購入済みの場合
        if (domGotCard[sRole] > 0) {
            ;
            // キャンペーンで有効の場合
        } else if (domCampCard[sRole] > 0) {
            ;
            // 購入済みでない場合
        } else {
            // カードをもっていないので使えない
            return false;
        }
    }

    // スペシャルの場合
    if (sMode == "Special") {
        return true;
    }

    // ランダムの場合
    iRandom = Math.floor(Math.random() * iRandomRate);
    // 当たった場合
    if (iRandom == 0) {
        // 使用を返す
        return true;
    }
    // ランダムで外れた場合、不使用を返す
    return false;
}


/*******************************************************************************
    関数名    GetCardNum
    機能        各役職ごとのカード数を算出する

    入力        sRole    役職
    出力        iNum    枚数
*******************************************************************************/
function GetCardNum(sRole) {

    var iPlayerNum = gaPlayer.length;
    var iCnt = 0;
    var iCardSum = 0;
    var iCitizenNum = 0;

    // スペシャル設定のときに、市民がマイナスになるのを防ぐ
    if (sRole != "Citizen") {
        var iCitizen = GetCardNum("Citizen");
        // 市民が０の場合、他の役職をもう追加しない
        if (iCitizen <= 0) {
            return 0;
        }
    }

    // 役職ごとに切り分ける
    switch (sRole) {

        case "Citizen":

            // 全ロールに対して繰り返す
            for (iCnt = 0; iCnt < gaCardType.length; iCnt++) {

                sRole = gaCardType[iCnt];

                // 対象のカードのカード枚数を累計する
                if (goCardNum[sRole] > 0 && sRole != "Citizen") {
                    iCardSum += goCardNum[sRole];
                }

            }

            // プレイヤー人数から使用カード数を差し引く
            iCitizenNum = iPlayerNum - iCardSum;

            return iCitizenNum;
            break;

        case "Werewolf":

            // 人数によって人狼の数を設定する
            if (iPlayerNum >= 13) {
                return 3;
            } else if (iPlayerNum >= 8) {
                return 2;
            } else {
                return 1;
            }
            break;

        case "FortuneTeller":

            if (iPlayerNum >= 6) {
                return 1;
            }
            break;

        case "Knight":

            if (iPlayerNum >= 8 || iPlayerNum == 5) {
                return 1;
            }
            break;

        case "Shaman":

            if (iPlayerNum >= 8) {
                return 1;
            }
            break;

        case "Psycho":

            if (iPlayerNum >= 12) {
                return 2;
            } else if (iPlayerNum >= 6) {
                return 1;
            }
            break;

        case "Lovers":
            if (iPlayerNum >= 13) {
                return 2;
            }
            break;

        case "Vampire":
            if (iPlayerNum >= 13) {
                return 1;
            }
            break;

        // Special
        case "Rich":
            if (iPlayerNum >= 21) {
                return 1;
            }
            break;

        case "Bat":
            if (iPlayerNum >= 13) {
                return 1;
            }
            break;

        case "PsychoKiller":
            if (iPlayerNum >= 6) {
                return 1;
            }
            break;

        case "GreatShaman":
            if (iPlayerNum >= 10) {
                return 1;
            }
            break;

        case "Cosplayer":
            if (iPlayerNum >= 8) {
                return 1;
            }
            break;

        case "Paparazzi":
            if (iPlayerNum >= 8) {
                return 1;
            }
            break;

        case "Magician":
            if (iPlayerNum >= 4) {
                return 1;
            }
            break;

        case "Bomber":
            if (iPlayerNum >= 6) {
                return 1;
            }
            break;

        case "Mentalist":
            if (iPlayerNum >= 13) {
                return 1;
            }
            break;

        case "DarkShaman":
            if (iPlayerNum >= 13) {
                return 1;
            }
            break;

        case "DestinedLovers":
            if (iPlayerNum >= 17) {
                return 2;
            }
            break;

        case "RainMan":
            if (iPlayerNum >= 10) {
                return 1;
            }
            break;

        case "LegendaryWolf":
            if (iPlayerNum >= 15) {
                return 1;
            }
            break;

        case "PrisonBreaker":
            
            if (iPlayerNum >= 8) {
                return 1;
            }
            break;
        
        case "Oracle":

            if (iPlayerNum >= 14) {
                return 1;
            }
            break;
        
        default:
            break;
    }

    return 0;
}



/****************************************************
関数名    PlusCard
機能        カード数をプラスする

入力        sType            カードタイプ
        iPlusNum        インクリメント値
G入力    goCardNum    カードのデフォルト数が入った設定値
G出力    goCardNum        カードの数が設定されているオブジェクト

処理概要    1. 対象のカード番号を取得する
        2. 対象のカードの最大値と最小値を取得する
        3. カード数をインクリメントする
        4. カード数が範囲を超えた場合
         4.1. 何もせずに終了する
        5. インクリメントした数を、対象のカード数に反映する
        6. インクリメント数にマイナスをかけたもので、市民の数をインクリメントする
        7. カード数のグローバル変数に値を格納する
*****************************************************/
function PlusCard(oButton, iPlusNum) {

    // 役職を取得する
    var sType = $(oButton).data("role");

    switch (sType) {
        case "Lovers":
        case "DestinedLovers":
            iPlusNum = 2 * iPlusNum;
    }

    // 対象のカード番号を取得する
    var iTargetCardNum = goCardNum[sType];

    // 対象のカードの最大値と最小値を取得する
    var iCardMax = goCardMax[sType];
    //var iCardMin = goCardMin[sType];
    var iCardMin = 0;

    // カードタイプがWerewolfの場合
    if (sType == "Werewolf") {
        // 伝説の人狼対応
        //iCardMin = 1;
    }

    // カード数をインクリメントする
    iTargetCardNum = iTargetCardNum + iPlusNum;

    // カード数が範囲外の場合
    if (iTargetCardNum < iCardMin || iTargetCardNum > iCardMax) {
        return;
    }

    // インクリメント数の正負を反転する
    iPlusNum = iPlusNum * -1;

    // 市民の数をデクリメントした場合の結果の枚数を算出
    var iLastCitizenNum = goCardNum["Citizen"] + iPlusNum;

    // 市民の人数がマイナスになる場合
    if (iLastCitizenNum < 0) {
        // エラーを表示して終了する
        var aMessage = GetAlertMessage("ErrCardNumOverPlayer", "");
        ShowAlert(aMessage[0], aMessage[1]);

        return;
    }

    goCardNum["Citizen"] = goCardNum["Citizen"] + iPlusNum;

    // プラス、マイナスボタンのアクティブ状態を変更する
    ChangeActiveStateOfButton(sType, iTargetCardNum, iCardMax);

    // カード数を更新する
    goCardNum[sType] = iTargetCardNum;

    // 画面上の数字を更新する
    $("#CardNum_Citizen_Num").text(goCardNum["Citizen"]);
    $("#CardNum_" + sType + "_Num").text(goCardNum[sType]);

    // 役職リストを更新する
    ShowCardNumList();

    return;

}


/****************************************************
    関数名    ShowGotCard
    機能        取得したカードを有効にする。
                MasterFlgがオンの場合は、すべてのカードを有効にする。

    入力        bMasterFlg
    一時G入力    domGotCard        取得カード状態 domGotCard["Lovers"] true:購入済み false:未購入
    出力        なし

    処理概要
            1. 取得カードリストに対して繰り返す
             1.1. 対象のカードを購入済みの場合
              1.1.1. 対象カードを有効状態に変更する
            2. 終了する
****************************************************/
function ShowGotCard(bMasterFlg) {

    var iCnt = 0;
    var sRole = "";
    var domGotCard = [];
    var iCampCardNum = 0;

    // 一時保存領域から取得カード状態を取得する
    domGotCard = LoadDataTmp("domGotCard");
    // 保存されていない場合
    if (domGotCard == "" || domGotCard == undefined) {
        /*
        domGotCard = {
            "Lovers": 0,
            "Psycho": 0,
            "Vampire": 0,
            "Rich": 0,
            "Bat": 0,
            "PsychoKiller": 0,
            "GreatShaman": 0,
            "Cosplayer": 0,
            "Paparazzi": 0,
            "Magician": 0,
            "Bomber": 0,
            "Mentalist": 0,
            "DarkShaman": 0,
            "Original": 0,
            "DestinedLovers": 0,
            "RainMan": 0,
            "LegendaryWolf": 0,
            "PrisonBreaker": 0
        }
        */
        // デフォルトカードセットで保存するように変更 ver.11.6.0
        domGotCard = Object.create(gaDefaultCardInit);
    } else {
        // 多重人格無料化 終了 ver.9.8.1
        // domGotCard.Psycho = 1;
    }

    // ver.9.8 広告キャンペーン
    domCampCard = LoadDataTmp("domCampCard");

    // 有効期間の終了時刻を算出する
    var dDate = new Date();
    var iNow = dDate.getTime();
    // キャンペーンカードから期限切れのデータを削除する
    // Admobを実装するまでコメントアウト ver.11.8.1
    //DeleteExpiredCard(iNow, domCampCard);

    // キャンペーンカードの表示を初期化する
    $("#UnlockCampCards").text("");
    var sUnlockedCards = "";

    // 取得カードリストに対して繰り返す
    for (iCnt = 0; iCnt < gaGotCardType.length; iCnt++) {

        sRole = gaGotCardType[iCnt];

        // カードの状態がundefinedの場合は、0に差し替える
        if (domGotCard[sRole] == undefined || domGotCard[sRole] == "") {
            domGotCard[sRole] = 0;
        }

        // 対象のカードを購入済み または キャンペーン中 または マスターキーが有効の場合
        if (domGotCard[sRole] > 0 || domCampCard[sRole] > 0 || bMasterFlg) {

            // 対象カードを有効にする
            EnableCardSelect(sRole);

            // 対象カードがキャンペーン中の場合
            if (domCampCard[sRole] > 0) {
                // キャンペーンでアンロックされたカード枚数をカウント
                iCampCardNum++;

                // アンロックの表示を行う
                sUnlockedCards = $("#UnlockCampCards").text();

                // 1枚目の場合
                if (iCampCardNum <= 1) {
                    $("#UnlockCampCards").text(sUnlockedCards + goRoleText[sRole]);
                } else {
                    $("#UnlockCampCards").text(sUnlockedCards + " / " + goRoleText[sRole]);
                }
                Log("3872: キャンペーンカード:" + sUnlockedCards + goRoleText[sRole] + " ");

            }

        } else {
            // 対象カードを無効化する
            EnableCardSelect(sRole, true);
        }
    }

    // キャンペーンカードが空の場合
    if ($("#UnlockCampCards").text() == "") {
        // 初期化する
        $("#UnlockCampCards").text("---");
    }

    // キャンペーンカードの開放がMAX以下の場合
    // Admobを実装するまでコメントアウト 11.8.1
    /*if (iCampCardNum < giCampCardMax) {
        gbOverMaxFlg = false;
    }
    */

    // 今日の曜日を取得する
    var dDate = new Date();
    var sWeek = dDate.getDay();

    // localStorage保存する
    SaveData(domGotCard, "domGotCard");
    SaveData(domCampCard, "domCampCard");

    return;
}

/****************************************************
    関数名    ShowMedalPage
    機能        Medal確認ページを表示する

    入力        なし
    出力        なし

    処理概要
            1. 通信状態がエラーの場合
             1.1. エラーをアラートして終了する
            2. UserCodeが空の場合（初回アクセス時）
             2.1. MakeUserにてアカウントを作成する
            3. UserCodeが空でない場合
             3.1. GetUserInfoにて、アカウント情報を取得する
            ※ それぞれの接続完了後の動作は ajax_common.js にて
            　 成功時の処理で実行する
****************************************************/
/*
function ShowMedalPage(){

    // バナーが表示されている場合
    if(gbBannerFlg==1){
        // バナーを非表示にする
        ShowBanner(true);
    }

    // ページを移動する
    jQT.goTo("#Medal", "slideleft");

    // UserCodeが空の場合
    if(!gsUserCode){
        gsUserCode = LoadData("gsUserCode");
    }
    if(gsUserCode == "" || gsUserCode == undefined){

        // MakeUserにてアカウントを作成する
        DoAjax('MakeUser');

    } else {

        // GetUserInfoにてアカウント情報を取得する
        DoAjax('GetUserInfo');
    }

    return;

}
*/
/*
function ShowInfoPage() {

    Log("3302:InfoPage");

    // iOSのFREE版（アプリ内カード購入あり）でない場合
    if (CheckPlatform() == "Android" || gbFull == true) {
        // ページを移動する
        jQT.goTo("#About", "slideleft");
        return;
    }

    
        // UserCodeが空の場合
        if(!gsUserCode){
            gsUserCode = LoadData("gsUserCode");
        }
        if(gsUserCode == "" || gsUserCode == undefined){

            // MakeUserにてアカウントを作成する
            DoAjax('MakeUser');

        } else {

            // GetUserInfoにてアカウント情報を取得する
            DoAjax('GetUserInfo');
        }
        Log("3324:DoAjax at InfoPage");
    
    // ページを移動する
    jQT.goTo("#About", "slideleft");

    return;

}
*/

/****************************************************
関数名    ChangeActiveStateOfButton
機能        ボタンのアクティブ状態を変更する

入力        sType            カードタイプ
        iNowNum            現在の数値（ランダムの場合は、-1とする）
        iMax            最大値
****************************************************/
function ChangeActiveStateOfButton(sType, iNowNum, iMax) {
    var iMin = 0;

    // カードタイプが人狼の場合
    if (sType == "Werewolf") {
        // カードの最小数を1にする
        //iMin = 1;

        // 伝説の人狼対応
        iMin = 0;
    }

    if (iNowNum == iMin || iNowNum == -1) {
        // マイナスを不可にする
        $("#CardNum_" + sType + "_Minus").css("opacity", "0.2");
    } else {
        // マイナスを可にする
        $("#CardNum_" + sType + "_Minus").css("opacity", "1");
    }
    if (iNowNum == iMax || iNowNum == -1) {
        // プラスを不可にする
        $("#CardNum_" + sType + "_Plus").css("opacity", "0.2");
    } else {
        // プラスを可にする
        $("#CardNum_" + sType + "_Plus").css("opacity", "1");
    }

}


/****************************************************
    関数名    DeletePlayer
    機能        プレイヤーを削除する。
            並び順番を変更するモードの場合は
            ReplacePlayerを実行する

    入力        iPlayerId    プレイヤーID
    出力        なし

    処理概要    1. gaPlayerから対象の配列を削除する
            2. Setting画面に表示された<div>を削除(remove)する
****************************************************/
function DeletePlayer(iPlayerId) {

    // 対象のプレイヤーオブジェクト番号
    var iPlayerNum = GetPlayerObjectNum(iPlayerId);
    Log("756:" + iPlayerId + "/" + gaPlayer[iPlayerNum] + "/" + iPlayerNum);

    // ReplacePlayerモードの場合
    if (gbChangeOrder) {

        // プレイヤーの並び替えを実行する
        ReplacePlayer(iPlayerNum, iPlayerId);
        return;
    }

    // プレイヤー名を取得する
    var sPlayerName = gaPlayer[iPlayerNum].sName;

    // 確認アラートを表示する。OKの場合、DoneDeletePlayerを実行する
    var aMessage = GetAlertMessage("DeletePlayer", sPlayerName);
    ShowConfirm(aMessage[0], aMessage[1], "DoneDeletePlayer(" + iPlayerId + "," + iPlayerNum + ")");

    return;
}



/****************************************************
    関数名    ReplacePlayer
    機能        対象プレイヤーが1人目のプレイヤーの場合は
            giChangeOrderFromにプレイヤー配列番号を格納し
            対象のプレイヤーのボーダーの色を変える。
            2人目のプレイヤーの場合は、gaPlayerを並べ替え、
            プレイヤー一覧表示を再表示しなおす。
            giChangeOrderFromを初期化（-1）とする。

    入力        iPlayerNum        プレイヤーリストの添え字
            iPlayerId        プレイヤーID
    出力        なし

    処理概要
****************************************************/
function ReplacePlayer(iPlayerNum, iPlayerId) {
    Log("1894:iPlayerNum=" + iPlayerNum + "/iPlayerId=" + iPlayerId + "/giChangeOrderFrom=" + giChangeOrderFrom);
    // 対象プレイヤーが1人目の場合
    if (giChangeOrderFrom == -1) {
        // 対象プレイヤーのボーダー色を変える
        $("#Player" + iPlayerId + " .FaceArea").css("border", "red solid 1px");

        // 1人目の対象プレイヤー名とする
        giChangeOrderFrom = iPlayerNum;

        // 二人目の場合
    } else {
        // gaPlayerを並び替える
        var oObject = gaPlayer[giChangeOrderFrom];
        gaPlayer[giChangeOrderFrom] = gaPlayer[iPlayerNum];
        gaPlayer[iPlayerNum] = oObject;

        // 対象プレイヤー情報を初期化する
        giChangeOrderFrom = -1;

        // プレイヤーの表示を初期化する
        InitPlayerSetting();
    }

}

/****************************************************
    関数名    GetPlayerObjectNum
    機能        各プレイヤーオブジェクトが持つ、プレイヤーIDを元に
            gaPlayerの添え字を返す。

    入力        iPlayerId
    出力        iCnt            対象オブジェクト添え字（エラーのときは -1 を返す）
****************************************************/
function GetPlayerObjectNum(iPlayerId) {
    var iCnt;

    // プレイヤーオブジェクト全体に対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 対象のプレイヤーIDと検索IDが等しい場合
        if (gaPlayer[iCnt].iId == iPlayerId) {
            return iCnt;
        }
    }

    return -1;
}

/****************************************************
    関数名    DoneDeletePlayer
    機能        プレイヤー配列(gaPlayer)から対象プレイヤーを削除(splice)し
            対象のdivオブジェクトも同時に削除する。
            このとき、配列は削除された要素が詰められるが
            DIVのidは変更がないので、それぞれのIDを引数として指定する必要がある。

    入力        iPlayerId        DIVオブジェクトのPlayerID
            iPlayerNum        gaPlayerの添え字
    出力        なし

    処理概要    1. 対象のプレイヤーに画像が設定されている場合
             1.1. 対象プレイヤーの画像を削除する
            2. gaPlayerから対象プレイヤーのデータを削除する
            3. Setting画面の一覧から対象プレイヤーを削除する
****************************************************/
function DoneDeletePlayer(iPlayerId, iPlayerNum) {
    var sImgFile = "";

    // 対象プレイヤーに画像が設定されている場合

    // 画像ファイルをtmp保存ではなく、gaPlayerに保存になったので下記は不要
    /*if(gaPlayer[iPlayerNum].imgFace != gsFaceIcon){
        Log("905:画像が設定されている"+gaPlayer[iPlayerNum].imgFace);
        Log("928:ルートディレクトリ="+gsRootPath);

        // 対象の画像を削除する
        sImgFile = GetOnlyFileName(gaPlayer[iPlayerNum].imgFace);
        sImgFile = "tmp/" + sImgFile;
        Log("962:ファイル名="+sImgFile);
        FileSystem("remove", sImgFile);
    }
    */

    // 対象のプレイヤーデータを初期化する（メモリリーク防止）
    gaPlayer[iPlayerNum] = {};

    // gaPlayerから対象の配列を削除する
    gaPlayer.splice(iPlayerNum, 1);

    // Setting画面から指定されたdivを削除する
    var sPlayerDivId = "#Player" + iPlayerId;
    $(sPlayerDivId).remove();

    // プレイヤーデータをセーブする
    SaveData("gaPlayer");

}

/*******************************************************************************
    関数名    DeletePlayerAll
    機能        すべてのプレイヤー情報を削除する

    入力        なし
    出力        なし

    処理概要
            1. プレイヤーに対して繰り返す
             1.1. 対象プレイヤーのDIVオブジェクトをremoveする
            2. gaPlayer配列を初期化する
            3. データをセーブする
*******************************************************************************/
function DeletePlayerAll() {

    // 確認アラートを表示する。OKの場合、DoneDeletePlayerを実行する
    var aMessage = GetAlertMessage("DeletePlayerAll", "");
    ShowConfirm(aMessage[0], aMessage[1], "DoneDeletePlayerAll()");
}

/*******************************************************************************
    関数名    DoneDeletePlayerAll
    機能        すべてのプレイヤー情報を削除する

    入力        なし
    出力        なし

    処理概要
            1. プレイヤーに対して繰り返す
             1.1. 対象プレイヤーのDIVオブジェクトをremoveする
            2. gaPlayer配列を初期化する
            3. データをセーブする
*******************************************************************************/
function DoneDeletePlayerAll() {
    var sPlayerDivId;
    var iCnt;

    Log("gaPlayer.length=" + gaPlayer.length);
    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // Setting画面から指定されたdivを削除する
        sPlayerDivId = "#Player" + gaPlayer[iCnt].iId;
        $(sPlayerDivId).remove();

        // プレイヤーデータのメモリを解放する
        gaPlayer[iCnt] = {};

    }

    // gaPlayerを初期化する
    gaPlayer = [];

    // プレイヤーIDのカウンタを初期化する
    giPlayerNum = 0;

    // プレイヤーデータをセーブする
    SaveData("gaPlayer");

}

/****************************************************
 * ゲーム開始への移動
 * FREE版では、フッターバナーをremove()する
****************************************************/
function GoToTitleNight() {

    // ゲーム開始時間を記録する
    GetGamePlayTime(true);

    // FREE版の場合 アドフリー対応。ゲーム中も広告を表示する。
//    if (!gbFull) {
        // バナーを非表示にする
//        ShowBanner(true);
//    }

    // 通常版の場合
    if (gsRemoteMode == "") {

        // TitleNightに移動尾する
        jQT.goTo('#Title_Night', 'slideleft');

        // リモート版の場合(GM)
    } else {
        // リモートモード：夜のサーバー更新（初期化）を行う
        // デバイスからの更新：data_json
        // サーバーサイド：
        //    空にする：action_json
        //    player_done=0, player_alive=X
        //    status_text="wait_night_action"
        InitNightRemote();

    }

    return;

}

/****************************************************
 * 夜初期化
****************************************************/
function InitNight() {

    var sFirstPlayerInNight = "";

    // ゲームをセーブする
    SaveGame("Night");
    giDateNum++;

    // タイトルを変更する
    $("#Title_Night .ImageTitle").text("The " + goDateText[giDateNum] + " Night");

    // 二日目以降のメッセージ（「処刑したにも関わらず、再び」）を表示する
    if (giDateNum != 1 && gbNoKillingFlg != true) {

        $("#Title_Night .ReNightComment").show();
        $("#NA_JP_1A").hide();
        $("#NA_JP_1B").show();

        $("#FirstDream").hide();
        $("#OtherDream").show();

        // 第1夜の場合
    } else {
        $("#Title_Night .ReNightComment").hide();
        $("#NA_JP_1A").show();
        $("#NA_JP_1B").hide();

    }

    // グローバル変数の初期化 **************************

    // 投票プレイヤー番号を初期化する
    giNowPlayerId = 0;

    // 疑い変数を初期化する
    gaSuspect = InitArray(0, gaPlayer.length);

    // 殺害対象を初期化する
    gaKill = [];
    //gaKillWerewolfId = [];
    gaKillMust = [];

    // ガード対象を初期化
    giGuardPlayerId = -1;

    // ver.6.2 ボムトラップを初期化
    goBomb.bTrapped = false;
    goBomb.aAttackList = [];

    // リモートモードと通常モードの表示の出し分け ***************
    // リモートモードのHTML表示をする
    SwitchRemoteClass();

    // 通常モードの場合
    if (gsRemoteGameId == "" || gsRemoteGameId == undefined) {

        // 最初のプレイヤー名を変更する(gaPlayerに対して生きている最初の人をチェック)
        var sFirstPlayerInNight = GetFirstPlayerInNight();

        // 最初のプレイヤー名を正しく取得できた場合
        if (sFirstPlayerInNight != "") {
            $("#Title_Night .FirstPlayerInNight").text(sFirstPlayerInNight);
        }

    }

    // 狼の声と夢の音声をループ再生する
    PlayAudio('audio/Gun.mp3', true);
    PlayAudio('audio/DreamLoop.mp3');


}

/*******************************************************************************
    関数名    GetFirstPlayerInNight
    機能        今晩、最初にアクションするプレイヤーを取得する。
            そのプレイヤーが生きているか、どうか。
            そして、パスをしていないか、どうか、をチェックする。

    G入力    gaPlayer
    出力        sPlayerName

    処理概要
            1. 全プレイヤーに対して繰り返す
             1.1. 対象のプレイヤーが生きている場合
              1.1.1. プレイヤー名を返して終了する
             1.2. 対象のプレイヤーが死んでいる場合
              1.2.1. 自動パス機能がオフで、まだ結果確認をしていない場合
               1.2.1.1. プレイヤー名を返して終了する
*******************************************************************************/
function GetFirstPlayerInNight() {
    var iCnt = 0;

    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象のプレイヤーが生きている場合
        if (gaPlayer[iCnt].bLive == true) {
            // 名前を返して終了する
            return gaPlayer[iCnt].sName;

            // プレイヤーが死んでいる場合
        } else {

            // まだ役職答えをチェックしていない場合 かつ 自動パスモードでない場合
            if (gaPlayer[iCnt].bCheckedFlg == false && gbPassAnswerFlg == false) {
                return gaPlayer[iCnt].sName;
            }
        }
    }

    // 理屈上、この処理は起きないが
    return "";

}


/****************************************************
    関数名    SetName #InputPlayer
    機能        名前をプレイヤーイメージ上に表示する
****************************************************/

function SetName(sName) {
    $("#InputPlayer .FaceName").html(sName);
}


/****************************************************
    関数名    ShowCpu #InputPlayer
    機能        CPUマークをプレイヤーイメージ上に表示する
****************************************************/
function ShowCpu(bShowFlg, sId) {

    sId = "#" + sId;

    if (bShowFlg == true) {
        $(sId).show();
    } else {
        $(sId).hide();
    }
}

/****************************************************
    関数名    SetOptionToggle
    機能        第１夜の殺害をなしにするフラグを設定する

    入力        bNoKillFlg        殺害しないフラグ
            sMode            kill or foretell
    出力        なし
****************************************************/
//function SetOptionToggle(bSetFlg, sMode){
function SetOptionToggle(oButton, sMode) {

    //    if(CheckPlatform() == "Android"){
    //        bSetFlg = !bSetFlg;
    //    }

    var bSetFlg = oButton.checked;

    Log("3477:bSetFlg = " + oButton.checked);

    switch (sMode) {
        case "kill":
            // 第1夜に殺害しないフラグを返す
            gbFirstNightNoKillFlg = bSetFlg;
            //gbFirstNightNoKillFlg = !gbFirstNightNoKillFlg;
            break;

        case "foretell":
            // 第1夜に殺害しないフラグを返す（これはもう使っていない）
            gbFirstNightNoForetellFlg = bSetFlg;
            break;


        case "ReducingRole":
            // 役職減らしフラグを返す
            gbReducingRoleFlg = bSetFlg;
            break;

        case "VampireHuman":
            // 占い結果を「吸血鬼」ではなく「人間」とする
            gbVampireHumanFlg = bSetFlg;
            break;

        case "NoGuard":
            // 連続ガード禁止フラグを返す
            goDoubleGuard.bOnFlg = bSetFlg;
            break;

        case "BGM":
            // 第1夜に殺害しないフラグを返す
            gbBGMFlg = bSetFlg;

            break;

        case "HidingVote":
            // 投票数を隠す
            gbHidingVoteFlg = bSetFlg;
            break;

        case "PassAnswer":
            // 答え確認を自動的にパスする
            gbPassAnswerFlg = bSetFlg;
            break;

        case "GmTool":
            // GMツールを表示する
            gbGmToolFlg = bSetFlg;
            break;
    }


    return;

}

/****************************************************
    関数名    SetSelectModeButton
    機能        セレクト画像ボタンの選択状態を切り替える。

    入力        sPageId    ページID（対象を絞るため）
            sMenuClass        対象となるボタンに設定されるClass名
            sSelectClass    選択されるクラス名
    出力        なし

    処理概要
            1. メニューボタンのクラスから"On"クラスをremoveする
            2. 選択されるクラスに"On"クラスをaddする
****************************************************/
function SetSelectModeButton(sPageId, sMenuClass, sSelectClass) {
    // Onクラス名を作成する
    var sOnClass = sMenuClass + "_On";

    // 全体からONクラスをremoveする
    $(sPageId + " ." + sMenuClass).removeClass(sOnClass);

    // 選択対象に"On"クラスを追加する
    $(sPageId + " ." + sSelectClass).addClass(sOnClass);

}


/*******************************************************************************
    関数名    SetInputFirstNightForetell
    機能        InputFirstNightForetellに選択された値を設定する。

    入力        oSelect        セレクトボックスオブジェクト
    出力        なし
*******************************************************************************/
function SetInputFirstNightForetell(oSelect) {

    var sMode = $(oSelect).val();

    if (sMode == undefined || sMode == "") {
        sMode = "0";
    }

    // グローバル変数に格納する
    giFirstNightForetell = sMode;

    return;
}


/*******************************************************************************
    関数名    ChangeSelectMode
    機能        複数から選択する選択肢を変更する（投票スタイル、票割れ判決、など）

    入力        sMode        セレクトボックスオブジェクト
                sMenu        メニュー名
    出力        なし
*******************************************************************************/
function ChangeSelectMode(sMenu, sMode) {

    // ボタンを切り替える
    SetSelectModeButton("#CheckRoleNum", sMenu, sMode);

    // 説明文を切り替える
    $("." + sMenu + "Explain").hide();
    $("." + sMode + "Text").show();

    // グローバル変数に値を格納する
    return sMode;


}


/****************************************************
 * Enter Password
 *****************************************************/

/****************************************************
    関数名    SetEnterPassword
    機能      夜のログイン画面を初期化する

    G入力    giNowPlayerId    現在のプレイヤー番号
    出力        なし

    処理概要
        1. 対象のプレイヤーが生きている
         1.1. プレイヤー名を画面に埋め込む
         1.2. プレイヤー画像を画面に埋め込む
        2. 対象のプレイヤーが死んでいる場合
         2.1. プレイヤーIDをインクリメントする
         2.2. 再度、SetEnterPasswordを実行する
****************************************************/
function SetEnterPassword() {

    //Log("4772:giRemotePlayerId=" + giRemotePlayerId);

    // リモートモードの場合（夜アクションがないケースの処理）
    if (gsRemoteMode != "") {

        if (giRemotePlayerId == undefined) {
            giRemotePlayerId = LoadData("giRemotePlayerId");
        }

        // REMOTE GM ONLY の場合 ***************************
        // プレイヤーをしていない場合（GM特有）
        if (giRemotePlayerId == -1) {
            // 待機画面に移動する
            jQT.goTo("#RemoteWaitingGM");
            return;
        }

        // REMOTE PLAYER の場合 ***************************
        // プレイヤーが死んでいる場合
        Log("4815: bLive=" + gaPlayer[giRemotePlayerId].bLive + " / bCheckedFlg=" + gaPlayer[giRemotePlayerId].bCheckedFlg);
        if (gaPlayer[giRemotePlayerId].bLive == false) {
            Log("4816:死亡プレイヤーの場合");
            // gsRemoteModeが空の場合（再起動時）
            if (gsRemoteMode == "") {
                // データを復元する
                gsRemoteMode = LoadData("gsRemoteMode");
            }

            // GM or PLAYER で待機画面を切り分ける
            switch (gsRemoteMode) {
                case "GM":
                    var sJumpPage = "#RemoteWaitingGM";
                    break;

                case "PLAYER":
                default:
                    var sJumpPage = "#RemoteWaitingPlayer";
                    break;
            }
            Log("4823: sJumpPage=" + sJumpPage);

            // リモートモードの場合は役職確認をさせない
            jQT.goTo(sJumpPage);
            return;

            /*
            // 自動パス機能がオンの場合
            if (gbPassAnswerFlg == true) {

                // 待機画面にジャンプする
                jQT.goTo(sJumpPage);
                return;
            }
            // プレイヤーがすでに役職確認している場合
            if (gaPlayer[giRemotePlayerId].bCheckedFlg == true) {

                // 待機画面にジャンプする
                jQT.goTo(sJumpPage);
                return;
            }
            // リモートプレイヤー用の役職確認画面を表示する
            //GoToRemoteAnswer();
            */
        }

        // 夜のアクションが存在するプレイヤー
        // 現在のプレイヤー番号を リモートプレイヤー番号に変更する
        giNowPlayerId = giRemotePlayerId;
    }

    // タイトルを画面に埋め込む
    $("#EnterPassword .ImageTitle").text("The " + goDateText[giDateNum] + " Night");

    // プレイヤー名を画面に埋め込む
    $("#EnterPassword .PlayerName").text(gaPlayer[giNowPlayerId].sName);

    // プレイヤー画像を画面に埋め込む
    $("#EnterPassword .FaceImg").attr("src", gaPlayer[giNowPlayerId].imgFace);


    // 第１夜の場合
    if (giDateNum == 1) {
        // シャッフルされるカードを初期化する
        var sBgImage = "url(" + goCardSrc["Citizen"] + ")";
        $("#ShuffleCard").css("background-image", sBgImage);
        giShuffleCardNum = 0;
    }

    // 対象プレイヤーが生きている場合
    if (gaPlayer[giNowPlayerId].bLive == true) {
        // パスボタンを非表示にする
        $("#EnterPassword .PassButton").hide();

    // 対象プレイヤーが死んでいる場合
    } else {

        // まだ全プレイヤーの役職をチェックしていない場合 かつ 自動パスモードでない場合
        if(gaPlayer[giNowPlayerId].bCheckedFlg == false && gbPassAnswerFlg == false){

            // パスボタンを表示にする
            $("#EnterPassword .PassButton").show();

        // すでにチェック済みの場合
        } else {

            Log("872:チェック済み" + giNowPlayerId + " / " + gaPlayer.length);

            // 現在のプレイヤーを次に進める
            giNowPlayerId++;

            // プレイヤーが最後の場合
            if (giNowPlayerId >= gaPlayer.length) {

                // 朝に移動する
                // jQT.goTo("#Morning", "slideleft");
                Log("!!! 3188:EnterPassword:giNowPlayerId=" + giNowPlayerId + "/gaPlayer.length=" + gaPlayer.length);
                jQT.goTo("#Morning", "fade");

                // 次のプレイヤーがいる場合
            } else {

                // EnterPasswordのページを初期化する
                SetEnterPassword();
            }
            return;
        }
    }

    // 連続アラート防止:処理を完了したのでフラグを元に戻す
    //gbActionEbleFlg = true;

    // #EnterPasswordへ移動する
    jQT.goTo("#EnterPassword");

    return;

}

/****************************************************
    関数名    EnterDream
    機能        パスワードをチェックして夢画面にログインする

    G入力    giNowPlayerId
    出力        なし

    処理概要
        1. パスワードをチェックする
        2. パスワードが正しくない場合
         2.1. アラートを表示して終了する
        3. 夢画面にフェードアニメする
            （夢画面表示タイミングでの設定は onPageLoadで設定）
****************************************************/
function EnterDream() {

    // リモートモードの場合
    if (gsRemoteGameId != "") {
        // 確認アラートなしで夢にはいる
        jQT.goTo("#Dream");
        return;
    }

    //    var sFunction = 'jQT.goTo("#Dream", "fade")';
    var sFunction = 'jQT.goTo("#Dream")';
    var aMessage = GetAlertMessage("EnterDream", gaPlayer[giNowPlayerId].sName);
    // 夢画面に移動する
    ShowConfirm(aMessage[0], aMessage[1], sFunction);

}


/****************************************************
    関数名    InitDream
    機能        Dream画面を初期化する。1夜目に限り、カードの設定を行う。
            他の夜には、カードの部分はdisplay:noneにする。

    入力        bHideFlg            非表示化フラグ
    G入力    giDateNum            日付カウンタ
            giPlayerNum
    出力

    処理概要
        1. 1日目の夜の場合
         1.1. カードを表示する
         1.2. カードをシャッフルする
         1.3. メッセージ以下を非表示にする
        2. 2日目以降の場合
         2.1. カードを非表示にする
         2.2. カードにマッチした説明文を表示する
        3. プレイヤーの表示を初期化する
****************************************************/
function InitDream(bHideFlg) {
    var iShuffleSpeed = 100;

    // プレイヤーリストを空にする for Android ver.11.2.0
    // これで無事に、画面上部にスクロールするようになりました
    $("#Dream .PlayerListBox").scrollTop(0,0);

    // 非表示フラグがオンの場合（次のプレイヤーに内容を一瞬見せないため）
    if (bHideFlg == true) {
        // カード表示エリアと選択エリアを非表示にする
        $("#FirstDream").hide();
        $("#OtherDream").hide();
        $("#OtherDream .SmallCard").attr("src", "img/spacer.gif");
        $("#MainDream").hide();
        $("#Dream .RoleName").text("");
        $("#Dream .TextBox").hide();
//        $("#WerewolfVoice").hide();
        $("#ShamanResult").hide();
//        $(".WerewolfGoldBar").hide();

        // カードを初期化する
        $("#ShuffleCard").attr("src", goCardSrc["Citizen"]);
        return;
    }

    // 1夜目の場合
    if (giDateNum == 1) {

        // カードをシャッフルする
        PlayShuffle(1, 'ShuffleCard', iShuffleSpeed);

        // カード名を差し替える
        // $("#Dream .RoleName").text(goRoleText["Tap"]);
        $("#Dream .RoleName").text(gsTapCard);

        // カード部分を表示する
        $("#FirstDream").show();
        $("#OtherDream").hide();
        $("#HandScrollDisplay").hide();

        // カードのメッセージを非表示にする
        $("#Dream .TextBox").hide();

        // 説明文以下を非表示する
        $("#MainDream").hide();

        // ver.6.3 Bomber対応
        if (gaPlayer[giNowPlayerId].sRole == "Bomber") {
            // 第１夜に殺害なしの場合
            if (gbFirstNightNoKillFlg == true) {
                $("#Dream .TrapButton").hide();
            } else {
                $("#Dream .TrapButton").show();
            }
        }

        // ver.9.8.4 対応


        // 2夜目以降
    } else {
        // パックマンがまだ無敵を使っていない場合
        if (gaPlayer[giNowPlayerId].sRole == "Bomber" && goBomb.bUsed == false) {
            $("#Dream .TrapButton").show();
        }

        // カード名を差し替える
        $("#Dream .RoleName").text(goRoleText[gaPlayer[giNowPlayerId].sRole]);

        // カードサムネイルを差し替える ver.8.2
        $("#OtherDream .SmallCard").attr("src", "img/Card_" + gaPlayer[giNowPlayerId].sRole + ".png");

        // カード部分を非表示する
        $("#FirstDream").hide();
        $("#OtherDream").show();

        // カードのメッセージを表示にする
        $("#Dream .TextBox").hide();

        // プレイヤーが生きている場合
        if (gaPlayer[giNowPlayerId].bLive) {
            // プレイヤーの役割の説明文のみを表示する
            $("#Dream ." + gaPlayer[giNowPlayerId].sRole).show();

            // プレイヤーが占い師またはパパラッチで、もう占い対象のプレイヤーが残っていない場合は
            // 完了ボタンを表示する
            ShowForetellEnd(gaPlayer[giNowPlayerId]);

            // プレイヤーがボマーの場合、無敵ボタンの表示を切り替える
            ShowBomberEnd(gaPlayer[giNowPlayerId]);

            // 霊媒師の昨日の処刑結果を初期化する ver.9.8.3
            InitShamanResult(gaPlayer[giNowPlayerId].sRole);

            // プレイヤーが死んでいる場合
        } else {
            // 死亡の説明文のみを表示する
            $("#Dream .Dead").show();
        }

        // 「人狼の仲間の声」タイトルを表示
//        $("#WerewolfVoice .TitleBox").show();

        // 説明文以下を表示する
        $("#MainDream").show();
    }

    // 狼の仲間を表示する ver.7.3
    InitWerewolvesTeam(gaPlayer[giNowPlayerId].sRole);

    // 「初日占い：ランダム人間」を初期化する ver.9.8.2
    InitFortuneFirst(gaPlayer[giNowPlayerId].sRole, gaPlayer[giNowPlayerId].iOracleId);

    // プレイヤーの表示を初期化する
    InitNightPlayerList("#Dream .PlayerListBox", "#Dream .PlayerBox");

    // 狼の声を初期化する ver.3.2 -> ver.10.1.6
    InitWerewolfVoice(gaPlayer[giNowPlayerId].sRole);

    // ver.7.4. 各アクションボタンを押せる状態にする 2015.10.26
    // 念のため、ここでも有効にする
    gbActionEbleFlg = true;

}

/****************************************************
    関数名    InitSelectPlayer
    機能      リモートモードのプレイヤー選択画面を表示する

    入力     なし
    G入力    gaPlayer

    処理概要
            1. プレイヤーに対して繰り返す
             1.1. テンプレートのボタンを差し替える
             1.2. プレイヤー選択用のHTMLを出力する
****************************************************/
function InitSelectPlayer() {
    var sOutputId = "#SelectPlayer .PlayerListBox";
    var sTemplateId = "#SelectPlayer .PlayerBox";
    var iCnt = 0;


    // プレイヤーリストを初期化のため削除する
    $(sOutputId).empty();

    // プレイヤーの数だけ繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // テンプレートを複製する
        var htmlTemplate = $(sTemplateId).clone();
        htmlTemplate.removeAttr("style");
        htmlTemplate.removeClass("PlayerBox");

        // WerewolfVoice対応 ver 3.2
        htmlTemplate.attr("id", "PLAYER_" + iCnt);

        // HTMLに加える
        htmlTemplate.appendTo(sOutputId);

        // プレイヤー名、サムネイル画像を表示する
        //            htmlTemplate.find('.DreamFaceImg').attr("src", gsRemoteImgFaceDir + gsRemoteGameId + "_" + gaPlayer[iCnt].iId + ".jpg");
        htmlTemplate.find('.DreamFaceImg').attr("src", gaPlayer[iCnt].imgFace);
        htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);

        // ボタンにiPlayerIdを設定する
        var sButtonHtml = MakeDreamActionButtonHtml(iCnt, "SelectPlayer", htmlTemplate);
        htmlTemplate.find('.ActionButton').html(sButtonHtml);
    }

    // ページに移動する
    jQT.goTo("#SelectPlayer");
    return;

}

/*******************************************************************************
    関数名    ShowForetellEnd
    機能        占い対象プレイヤーが存在するかチェックする。
            存在しない場合は、完了ボタンを表示する。

    入力        oPlayer        プレイヤーオブジェクト
    出力        なし

    処理概要
            1. プレイヤーが死んでいる場合
             1.1. 終了する
            2. プレイヤーの役職が占い師でない場合
             2.1. 終了する
            3. プレイヤーリストに対して繰り返す
             3.1. プレイヤーが生きている場合
              3.1.1. 対象プレイヤーが占われていない場合
               3.1.1.1. 終了する
            4. 占い師の完了ボタンを表示する
            5. 終了する
*******************************************************************************/
function ShowForetellEnd(oPlayer) {

    var iCnt;

    // プレイヤーの役職を取得する
    var sRole = oPlayer.sRole;

    // プレイヤーが死んでいる場合
    if (oPlayer.bLive == false) {
        return;
    }

    // プレイヤーの役職が占い師でもパパラッチでもない場合
    if (sRole != "FortuneTeller" && sRole != "Paparazzi") {
        return;
    }

    Log("3378:ShowForetelEnd=" + oPlayer.bLive + "/Role=" + oPlayer.sRole);

    // プレイヤーリストに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象のプレイヤーが生きていて、自分自身でない場合
        if (gaPlayer[iCnt].bLive == true && iCnt != giNowPlayerId) {

            // 自身の役職によって切り替える
            switch (sRole) {
                case "FortuneTeller":
                    // 対象のプレイヤーを占っていない場合
                    if (gaForetellFlg[iCnt] != true) {
                        // 何もしない
                        return;
                    }
                    break;

                case "Paparazzi":
                    // 対象のプレイヤーをチェックしていない場合
                    if (gaScoopFlg[iCnt] != true) {
                        // 何もしない
                        return;
                    }
                    break;
            }

        }
    }

    // すべてのプレイヤーをチェックし終えたが、全員チェック済みだった
    Log("2464:Check Finish");

    // 自身の役職によって切り替える
    switch (sRole) {
        case "FortuneTeller":
            // すべてを占い終わっている
            $("#Dream .ForetellEnd").show();
            $("#Dream .FortuneTeller").hide();
            break;

        case "Paparazzi":
            // すべてをチェック終わっている
            $("#Dream .ScoopEnd").show();
            $("#Dream .Paparazzi").hide();
            break;

    }

    return;

}

/*******************************************************************************
    関数名    ShowBomberEnd
    機能        まだボムをセットしていない場合は、ボムセットボタンを表示する

    入力        oPlayer    プレイヤーオブジェクト
    G入力    goBomb.bUsed
    出力        なし
*******************************************************************************/
function ShowBomberEnd(oPlayer) {

    // プレイヤーの役職を取得する
    var sRole = oPlayer.sRole;

    // ボマーでない場合
    if (sRole != "Bomber") {
        return;
    }

    // プレイヤーが死んでいる場合
    if (oPlayer.bLive == false) {
        return;
    }

    // プレイヤーが無敵可能なボマーの場合
    if (goBomb.bUsed == false) {
        $("#Dream .Bomber").show();
        $("#Dream .BomberEnd").hide();
        // プレイヤーが無敵を使ったあとの場合
    } else {
        $("#Dream .BomberEnd").show();
        $("#Dream .Bomber").hide();
    }

    return;
}

/****************************************************
    関数名    InitWerewolvesTeam
    機能      狼が複数人いる場合は、仲間の人狼を表示する。

    入力        sRole        役職（Werewolfのときだけ実行）
    G入力    gaPlayer    プレイヤーデータ
    出力        なし

    処理概要
****************************************************/
function InitWerewolvesTeam(sRole) {
    var iCnt;
    var sVoiceText = "";

    // 人狼の声を隠す
    $('#WerewolvesTeam').hide();

    // プレイヤーリストを初期化のため削除する
    $('#WerewolvesTeam_OUTPUT').empty();

    // 対象プレイヤーが死亡している場合
    if (gaPlayer[giNowPlayerId].bLive == false) {
        // 何もしない
        return;
    }
    // 対象の役職によって切り替える
    switch (sRole) {
        //人狼の場合
        case "Werewolf":
        case "LegendaryWolf":
            // 人狼が一人の場合
            var iWerewolfNum = goCardNum["Werewolf"] + goCardNum["LegendaryWolf"];
            if (iWerewolfNum == 1) {
                // 何もしない
                return;
            }
            break;

        // メンタリストの場合
        case "Mentalist":
            break;
        
        // 人狼を知らない役職の場合
        default:
            // 何もしない
            return;
            
    }

    // 表示する人狼がいるフラグ
    bShowWerewolfFlg = false;

    // プレイヤーリストに対して繰り返し、人狼メンバーをHTMLに加える
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象プレイヤーの役職について
        switch (gaPlayer[iCnt].sRole) {
            // 対象プレイヤーが人狼の場合
            case "Werewolf":
            case "LegendaryWolf":
                // テンプレートを複製する
                var htmlTemplate = $("#WerewolvesTeam .WerewolvesTeam_TEMPLATE").clone();
                htmlTemplate.removeAttr("style");
                htmlTemplate.removeClass("WerewolvesTeam_TEMPLATE");

                // HTMLに加える
                htmlTemplate.appendTo("#WerewolvesTeam_OUTPUT");

                // 人狼の写真と名前を表示する
                htmlTemplate.find(".PlayerIcon").attr("src", gaPlayer[iCnt].imgFace);
                htmlTemplate.find(".PlayerName").text(gaPlayer[iCnt].sName);

                bShowWerewolfFlg = true;
                break;
        }
    }

    // 人狼のメンバーを表示する場合
    if (bShowWerewolfFlg == true) {
        // WerewolfVoiceを表示する
        $('#WerewolvesTeam').show();
    }

    return;
}

/****************************************************
    関数名    InitWerewolfVoice
    機能        狼が複数人生き残っている場合は
            他の狼の声を表示する。

    入力        sRole        役職（Werewolfのときだけ実行）
    G入力    gaPlayer    プレイヤーデータ
    出力        なし

    処理概要
****************************************************/
function InitWerewolfVoice(sRole) {

    var sVoiceText = "";
    var iInterval = 300;

    // 人狼の声を隠す
    $('#WerewolfVoice').hide();

    // 対象のプレイヤーが人狼でない場合
    // もしくは、対象プレイヤーが死んでいる場合（死亡後の確認画面）
    if ((sRole != "Werewolf" && sRole != "LegendaryWolf") || gaPlayer[giNowPlayerId].bLive == false) {
        // 何もしない
        return;
    }

    // 手渡しモードの場合
    if (gsRemoteGameId == "" || gsRemoteGameId == undefined) {

        // 殺害対象、もしくは、サイコキラーによる人狼の死亡が、すでにいる場合
        if (gaKill.length > 0 || gaKilledWerewolf.length > 0) {

            // 2日目以降の場合
            if (giDateNum != 1) {
                // 人狼ボイスモーダルを表示する
                setTimeout(()=>ShowHandingWerewolfVoiceModal(sRole), iInterval);

            }
            // 殺害ボタンの下に投票数を表示
            ShowWerewolfVoteInfo();
        }

    // リモートモードの場合
    } else {

        // 2日目以降の場合
        if (giDateNum != 1) {
            // 人狼ボイスを受信する
            // ※ 初日殺害ありの場合は、カードタップ後に実行される
            ShowRemoteWerewolfVoice(sRole);

        }

    }

    return;
}

/****************************************************
    関数名    ShowHandingWerewolfVoiceModal
    機能      手渡しモード時に人狼ボイスをモーダルを表示する。
             ver.10.1.6 でデザインをリモート人狼ボイスに統一

    入力     なし
    出力     なし
****************************************************/
function ShowHandingWerewolfVoiceModal(sRole) {

    // 役職が人狼でない場合は終了する
    if (sRole != "Werewolf" && sRole != "LegendaryWolf") {
        return;
    }

    // 人狼ボイスを初期化する
    $("#WerewolfRemoteMessage").empty();
//    $('.WerewolfGoldBar').show();

    // 殺害リストに対して繰り返す
    for (let iCnt = 0; iCnt < gaKill.length; iCnt++) {
        // モーダルを表示
        InsertWerewolfVoiceModal(gaKill[iCnt].iFromPlayerId, gaKill[iCnt].iToPlayerId, gaKill[iCnt].iVote);

    }
    // サイコキラーに襲われた人狼に対して繰り返す
    for (let iCnt = 0; iCnt < gaKilledWerewolf.length; iCnt++){
        // モーダルを表示
        InsertWerewolfVoiceModal(gaKilledWerewolf[iCnt], -1, 0);
    }
    $("#WerewolfRemoteMessage").animate({ width: 'toggle' }, 800);

}

/****************************************************
    関数名    InsertWerewolfVoiceModal
    機能      人狼ボイスをモーダルに挿入する。
             ver.10.1.6 でデザインをリモート人狼ボイスに統一

    入力     iFrom  人狼プレイヤーID
            iTo     襲撃先プレイヤーID
            iVoteNum   投票数
    出力     なし
****************************************************/
function InsertWerewolfVoiceModal(iFrom, iTo, iVoteNum) {

    Log("5758:iFrom=" + iFrom + "/iTo=" + iTo + "/iVoteNum=" + iVoteNum);

    // テンプレートを複製する
    var htmlTemplate = $(".WerewolfRemoteMessage_TEMPLATE").clone();
    htmlTemplate.removeAttr("style");
    htmlTemplate.removeClass("WerewolfRemoteMessage_TEMPLATE");

    // HTMLに加える
    htmlTemplate.appendTo("#WerewolfRemoteMessage");

    // 変数を置き換える ********
    // ボタン出力状態を確認するために id="REMOTE_VOICE_NN"を設定
    htmlTemplate.attr("id", "REMOTE_VOICE_" + iFrom);

    // 投票元の人狼の画像
    htmlTemplate.find('.PlayerIcon.From').css("background-image", "url(" + gaPlayer[iFrom].imgFace + "),url(" + gsFaceIcon + ")");

    // 投票先の人間の画像
    if (iVoteNum > 0) {
        htmlTemplate.find('.PlayerIcon.To').css("background-image", "url(" + gaPlayer[iTo].imgFace + "),url(" + gsFaceIcon + ")");
    } else {
        htmlTemplate.find('.PlayerIcon.To').css("background-image", "url(img/FaceIconSomebody.jpg)");
    }

    // 選択メッセージ
    var sVoiceText = goButtonText["KillVoice_" + iVoteNum];
    // サイコキラーに殺されていない場合
    if (iVoteNum > 0) {
        // 投票先の名前
        sVoiceText = sVoiceText.replace("[PLAYER]", gaPlayer[iTo].sName);
        // 名前
        htmlTemplate.find('.TextFrom').html(gaPlayer[iFrom].sName);
        htmlTemplate.find('.TextTo').html(gaPlayer[iTo].sName);

        // 投票数
        htmlTemplate.find('.VoteNum').css("background-image", "url(img/Icon_KILL_" + iVoteNum + ".png)");

    // サイコキラーに殺された場合
    } else  {
        // 名前
        htmlTemplate.find('.TextFrom').html(gaPlayer[iFrom].sName);
        htmlTemplate.find('.TextTo').html("???");

        // 投票数
        htmlTemplate.find('.VoteNum').css("background-image", "url(img/Icon_KILL_" + iVoteNum + ".png)");

    }
    // セリフを表示
    htmlTemplate.find('.MessageText').html(sVoiceText);

}

/****************************************************
    関数名    InitFortuneFirst
    機能      初日のランダム白占い結果を表示する

    入力     sRole    役職（FortuneTellerのときだけ実行）
    G入力    giForetellFirstRandom    占われたプレイヤーID
            gaPlayer
    出力      なし

    処理概要
****************************************************/
function InitFortuneFirst(sRole, iOracleId) {
    var iCnt;
    var sVoiceText = "";

    switch (sRole) {
        case "FortuneTeller":
            if (giDateNum == 1 && giForetellFirstRandom != -1) {
                // 初日占いを表示する
                $('#FirstFortuneTell').show();
                // 占い結果を代入する
                $("#FirstFortuneTell .PlayerIcon").attr("src", gaPlayer[giForetellFirstRandom].imgFace);
                $("#FirstFortuneTell .PlayerName").text(gaPlayer[giForetellFirstRandom].sName);
            } else {
                // 初日占いを隠す
                $('#FirstFortuneTell').hide();
            }
            break;
        
        case "Oracle":
            // 初日の場合
            if (giDateNum == 1) {

                // 初日占いを表示する
                $('#FirstFortuneTell').show();
                // 占い結果を代入する
                $("#FirstFortuneTell .PlayerIcon").attr("src", gaPlayer[iOracleId].imgFace);
                $("#FirstFortuneTell .PlayerName").text(gaPlayer[iOracleId].sName);
            } else {
                // 初日占いを隠す
                $('#FirstFortuneTell').hide();
            }
            break;
        
        default:
            // 初日占いを隠す
            $('#FirstFortuneTell').hide();
            break;
            
    }

    return;
}

/****************************************************
    関数名    InitShamanResult
    機能      霊媒師の前日処刑の結果を表示する

    入力     sRole    役職（FortuneTellerのときだけ実行）
    G入力    giYesterdayJudge    昨日処刑されたプレイヤーID
            gaPlayer
    出力      なし

    処理概要
****************************************************/
function InitShamanResult(sRole) {
    var iCnt;
    var sVoiceText = "";

    // 昨日の処刑がない場合
    if (giYesterdayJudge == -1) {
        // 霊媒結果を隠す
        $('#ShamanResult').hide();
        return;
    }

    // 霊媒師でない場合
    if (sRole != "Shaman" && sRole != "GreatShaman" && sRole != "DarkShaman") {
        // 霊媒結果を隠す
        $('#ShamanResult').hide();
        return;
    }

    // 霊媒結果を代入する
    $("#ShamanResult .PlayerIcon").attr("src", gaPlayer[giYesterdayJudge].imgFace);
    $("#ShamanResult .PlayerName").text(gaPlayer[giYesterdayJudge].sName);


    // 嘘つき発見フラグ
    var bFindLiarFlg = false;

    // 嘘つきの役職（吸血鬼など、役職名を変更できるので、goButtonTextから取得する）
    var sWerewolfCheck = "";

    // 処刑されたプレイヤーの役職によって処理を分ける
    switch (gaPlayer[giYesterdayJudge].sRole) {
        case "Werewolf":
            case "LegendaryWolf":
        case "Cosplayer":
            sWerewolfCheck = goButtonText["Werewolf"];

            // 嘘つき発見
            bFindLiarFlg = true;
            break;

        case "Vampire":
        case "Bat":
            // 「吸血鬼」を「人間」と判定するモードの場合
            if (gbVampireHumanFlg == 1) {
                // 人間扱いになるので、何もしない

                // 通常は「吸血鬼」と判定
            } else {
                // 占い結果を吸血鬼
                sWerewolfCheck = goButtonText["Vampire"];
                // 嘘つき発見
                bFindLiarFlg = true;
            }
            break;

        default:
        // 何もしない
    }

    // 嘘つきを発見した場合
    if (bFindLiarFlg) {
        // 嘘つきの役職を代入
        $("#ShamanResult .LayerRole").text(sWerewolfCheck);

        // 嘘つき結果を表示する
        $("#ShamanResult .FindLayerText").show();
        $("#ShamanResult .NotWerewolfText").hide();
        $("#ShamanResult .PlayerName").css("background-color", "#A00707");

        // 嘘つきでなかった場合
    } else {
        // 人間の結果を表示する
        $("#ShamanResult .FindLayerText").hide();
        $("#ShamanResult .NotWerewolfText").show();
        $("#ShamanResult .PlayerName").css("background-color", "#000000");

    }

    // 霊媒結果を表示する
    $('#ShamanResult').show();

    return;
}





/****************************************************
    関数名    InitNightPlayerList
    機能        アクション対象となるすべてのプレイヤーのリストを表示する。
            表示位置とテンプレートHTMLのIDを引数に渡す。

    入力        sOutputId        出力先ID
            sTemplateId        テンプレートHTMLのID
    G入力    gaPlayer        プレイヤーデータ
            giNowPlayerId    現在のプレイヤー番号
    出力        なし

    処理概要
        1. プレイヤーの数だけ繰り返す
         1.1. テンプレートを複製する
         1.2. 複製したHTMLを出力先DIVに加える
         1.3. テンプレート内の変数を差し替える
         1.4. 複製したHTMLを表示する
****************************************************/
function InitNightPlayerList(sOutputId, sTemplateId) {
    var iCnt;

    // プレイヤーリストを初期化のため削除する
    $(sOutputId).empty();

    // プレイヤーの数だけ繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象プレイヤーが自分自身でない場合
        if (iCnt != giNowPlayerId) {

            // テンプレートを複製する
            var htmlTemplate = $(sTemplateId).clone();
            htmlTemplate.removeAttr("style");
            htmlTemplate.removeClass("PlayerBox");

            // WerewolfVoice対応 ver 3.2
            htmlTemplate.attr("id", "PLAYER_" + iCnt);

            // HTMLに加える
            htmlTemplate.appendTo(sOutputId);

            // プレイヤー名、サムネイル画像を表示する
            htmlTemplate.find('.DreamFaceImg').attr("src", gaPlayer[iCnt].imgFace);
            htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);

            // ランキングを取得する
            //var iRankNum = GetRankingNum(gaPlayer[iCnt].iTotalPoint);
            //htmlTemplate.find('.Ranking').text("Ranking : "+iRankNum+" (" + gaPlayer[iCnt].iTotalPoint + "pt)");

            // ボタンにiPlayerIdを設定する
            var sButtonHtml = MakeDreamActionButtonHtml(iCnt, gaPlayer[giNowPlayerId].sRole, htmlTemplate);
            htmlTemplate.find('.ActionButton').html(sButtonHtml);
        }
    }

    return;
}



/****************************************************
    関数名    MakeDreamActionButtonHtml
    機能        夢ページでのアクションボタンを作成する

    入力        iPlayerId        対象プレイヤーID
            sMyRole             夢ページを見ているプレイヤーの役割
            htmlTemplate        HTMLオブジェクト
    G入力       giNowPlayerId   アクションを行っている本人のプレイヤーID
    出力        sHtml            出力HTML（アクションボタン）

    処理概要
        1. 役割が市民もしくは多重人格の場合
         1.1. 対象のプレイヤーが生きている場合
          1.1.1. 「人狼だと疑う」ボタンを返す
         1.2. 対象のプレイヤーが死んでいる場合
          1.2.1. 「死亡」テキストを返す
        2. 役割が人狼の場合
         2.0. 対象のプレイヤーが人狼の場合
          2.0.1. 「人狼」テキストを返す
         2.1. 対象のプレイヤーが生きている場合
          2.1.1. 「殺害する」ボタンを返す
         2.2. 対象のプレイヤーが死んでいる場合
          2.2.1. 「死亡」テキストを返す
        3. 役割が占い師の場合
         3.0. 対象のプレイヤーを占ったことがある場合
          3.0.1. 対象プレイヤーの役割を返す
         3.1. 対象のプレイヤーが生きている場合
          3.1.1. 「人狼か占う」ボタンを返す
         3.2. 対象のプレイヤーが死んでいる場合
          3.2.1. 「死亡」テキストを返す
        4. 役割が霊媒師の場合
         4.1. 対象のプレイヤーが生きている場合
          4.1.1. 「人狼だと疑う」ボタンを返す
         4.2. 対象のプレイヤーが死んでいる場合
          4.2.1. 対象のプレイヤーの役割を返す
        5. 役割が騎士の場合
         5.1. 対象のプレイヤーが生きている場合
          5.1.1. 「人狼から守る」ボタンを返す
         5.2. 対象のプレイヤーが死んでいる場合
          5.2.1. 「死亡」テキストを返す
        6. 役割が恋人の場合
         6.1. 対象のプレイヤーの役割が「恋人」の場合
         6.2. 対象のプレイヤーが生きている場合
          6.2.1. 「人狼だと疑う」ボタンを返す
         6.3. 対象のプレイヤーが死んでいる場合
          6.3.1. 「死亡」テキストを返す
****************************************************/
function MakeDreamActionButtonHtml(iPlayerId, sMyRole, htmlTemplate) {
    var iCnt = 0;
    var sWerewolfHtml = "";
    var sKillWerewolf = "";
    var sReturnHtml = "";
    var sRole = "";

    // ボタンHTML
    var aHtml = [];
    aHtml["Red"] = '<a href="#" class="redButton Mincho" onClick="DreamAction([FromPlayerId],[ToPlayerId],' + "'[Action]', this)" + '">[ButtonText]</a>';
    aHtml["Blue"] = '<a href="#" class="blueButton Mincho" onClick="DreamAction([FromPlayerId],[ToPlayerId],' + "'[Action]')" + '">[ButtonText]</a>';
    aHtml["Text"] = '<div class="RoleNameButton whiteText">[ButtonText]</div>';
    aHtml["RedText"] = '<div class="RoleNameButton redText">[ButtonText]</div>';
    aHtml["Werewolf"] = '<div class="WerewolfList">[ButtonText]</div>';
    var sReturnHtml = "";

    // SelectPlayer画面の場合（リモートモードで自分を選ぶ）
    if (sMyRole == "SelectPlayer") {
        return ReplaceButtonHtml(aHtml["Blue"], 0, iPlayerId, "SelectPlayer", goButtonText["SelectPlayer"]);
    }

    // 現在のプレイヤーが死亡している場合
    if (gaPlayer[giNowPlayerId].bLive == false) {

        // 対象のプレイヤーの役職を表示する
        sRole = goRoleText[gaPlayer[iPlayerId].sRole];
        return ReplaceButtonHtml(aHtml["Text"], null, null, null, sRole);
    }

    // 霊媒師用　人狼チェック文字列
    var sWerewolfCheck = "";

    // このボタンの対象プレイヤーの役割（操作プレイヤーの役割はMyRoleではない）
    var sTargetRole = gaPlayer[iPlayerId].sRole;

    // ターゲットの役割によって処理をわける
    switch (sTargetRole) {

        // プレイヤーの役割が人狼かコスプレイヤーの場合
        case "Werewolf":
            case "LegendaryWolf":
        case "Cosplayer":

            // 占い結果を人狼
            sWerewolfCheck = goButtonText["Werewolf"];
            break;

        // プレイヤーの役割が吸血鬼の場合
        case "Vampire":
        case "Bat":
            // 「吸血鬼」を「人間」と判定モードの場合
            if (gbVampireHumanFlg == 1) {
                // 占い結果を吸血鬼
                sWerewolfCheck = goButtonText["Human"];
                // 通常は「吸血鬼」と判定
            } else {
                // 占い結果を吸血鬼
                sWerewolfCheck = goButtonText["Vampire"];
            }
            break;

        // プレイヤーの役割が占い師の場合
        case "FortuneTeller":

            // 自分自身が「パパラッチ」の場合
            if (sMyRole == "Paparazzi") {
                // 占い結果を占い師
                sWerewolfCheck = goButtonText["FortuneTeller"];

                // パパラッチ以外の場合
            } else {
                // 占い結果を人間
                sWerewolfCheck = goButtonText["Human"];

            }
            break;

        // 人間の場合
        default:
            // 占い結果を人間
            sWerewolfCheck = goButtonText["Human"];
            break;
    }

    // 操作プレイヤーの役職によって処理をわける
    switch (sMyRole) {

        // 「疑う」が表示される役職の場合
        case "Citizen":
        case "Psycho":
        case "PsychoKiller":
        case "Rich":
        case "Bomber":
        case "Original":
        case "RainMan":
        case "PrisonBreaker":
            
            // 対象のプレイヤーが生きている場合
            if (gaPlayer[iPlayerId].bLive == true) {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // プレイヤーが死んでいる場合
            } else {
                // 「死亡」テキストを返す
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }
            break;

        // 役割が人狼の場合
        case "Werewolf":
        case "LegendaryWolf":

            // 対象のプレイヤーが人狼の場合
            if (sTargetRole == "Werewolf" || sTargetRole == "LegendaryWolf") {

                // 背景画像を赤く変更する
                htmlTemplate.addClass("PlayerBoxBgRed");

                // 「人狼」を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, goButtonText["Werewolf"]);

            // 第1夜は殺害しないモード かつ 第1夜の場合
            } else if (giDateNum == 1 && gbFirstNightNoKillFlg == true) {

                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

            // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive == true) {

                // 殺害選択リストに対して繰り返す
                for (iCnt = 0; iCnt < gaKill.length; iCnt++) {

                    // 対象プレイヤーが殺害に選ばれている場合
                    // if(gaKill[iCnt] == iPlayerId){
                    if (gaKill[iCnt].iToPlayerId == iPlayerId) {
                        // 選択プレイヤー名を取得する
                        // sKillWerewolf = gaPlayer[gaKillWerewolfId[iCnt]].sName;
                        sKillWerewolf = gaPlayer[gaKill[iCnt].iFromPlayerId].sName;

                        // 人狼選択リストに追加する ver.3.2. 投票数を追加
                        var sAddWerewolfSelect = goButtonText["WerewolfSelect"].replace("[VALUE]", sKillWerewolf);
                        sAddWerewolfSelect = sAddWerewolfSelect.replace("[VOTE]", gaKill[iCnt].iVote);
                        sWerewolfHtml = sWerewolfHtml + sAddWerewolfSelect;
                    }
                }
                // 「殺害」ボタンを返す
                sReturnHtml = ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Kill", goButtonText["Kill"]);

                // ver.10.1.6 人狼ボイス デザイン変更
                //sReturnHtml = sReturnHtml + sWerewolfHtml;

                // リモート人狼ボイス対応
                sReturnHtml = sReturnHtml + "<div class='WerewolfVoteBox Player_" + iPlayerId + "'></div>"

                return sReturnHtml;

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }

            break;

        // メンタリストの場合
        case "Mentalist":
            // 対象のプレイヤーが人狼の場合
            if (sTargetRole == "Werewolf" || sTargetRole == "LegendaryWolf") {

                // 背景画像を赤く変更する
                htmlTemplate.addClass("PlayerBoxBgRed");

                // 「人狼」を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, goButtonText["Werewolf"]);

                // 相手が生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {

                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }



        // 役割が占い師の場合
        case "FortuneTeller":

            // 対象のプレイヤーを占ったことがある場合
            if (gaForetellFlg[iPlayerId]) {

                // 対象の死亡プレイヤーが人間でない場合
                if (sWerewolfCheck != goButtonText["Human"]) {

                    // 背景画像を赤く変更する
                    htmlTemplate.addClass("PlayerBoxBgRed");

                }

                // プレイヤーの役を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, sWerewolfCheck);

                // 第1夜は占いしないモード(占いなしorランダム人間占い) かつ 第1夜の場合
            } else if (giDateNum == 1 && giFirstNightForetell != 0) {

                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {

                // 「人狼か占う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Foretell", goButtonText["Foretell"]);

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }

            break;
        
        // 神託者の場合
        case "Oracle":
            
            // 自分のお告げ相手の場合
            if (gaPlayer[giNowPlayerId].iOracleId == iPlayerId) {

                // 人間を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, goButtonText["Human"]);
                
            // お告げ相手でない場合
            } else {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);
            }
            
            break;

        // パパラッチの場合
        case "Paparazzi":

            // 対象のプレイヤーを調べたことがある場合
            if (gaScoopFlg[iPlayerId]) {

                // 対象の死亡プレイヤーが人間でない場合
                if (sWerewolfCheck != goButtonText["Human"]) {

                    // 背景画像を赤く変更する
                    htmlTemplate.addClass("PlayerBoxBgRed");

                }

                // プレイヤーの役を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, sWerewolfCheck);

                // 第1夜は占いしないモード(占いなしorランダム人間占い) かつ 第1夜の場合
            } else if (giDateNum == 1 && giFirstNightForetell != 0) {

                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {
                // 「調査する」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Scoop", goButtonText["Scoop"]);

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }

            break;


        // 役割が霊媒師、闇の霊媒師の場合
        case "Shaman":
        case "DarkShaman":

            // 対象のプレイヤーが生きている場合
            if (gaPlayer[iPlayerId].bLive) {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // プレイヤーが死んでいる場合
            } else {
                // 対象の死亡プレイヤーが人間でない場合
                if (sWerewolfCheck != goButtonText["Human"]) {

                    // 背景画像を赤く変更する
                    htmlTemplate.addClass("PlayerBoxBgRed");

                }
                // 正体を表示する
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, sWerewolfCheck);
            }

            break;


        // 役割が「偉大な霊媒師」の場合
        case "GreatShaman":

            // 対象のプレイヤーが生きている場合
            if (gaPlayer[iPlayerId].bLive) {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // プレイヤーが死んでいる場合
            } else {

                // 対象の死亡プレイヤーが人間でない場合
                if (sWerewolfCheck != goButtonText["Human"]) {

                    // 背景画像を赤く変更する
                    htmlTemplate.addClass("PlayerBoxBgRed");

                    // 正体を表示する
                    return ReplaceButtonHtml(aHtml["Text"], null, null, null, sWerewolfCheck);

                    // 対象の死亡プレイヤーが人間の場合
                } else {

                    // ver.7.6 「吸血鬼の占い判定を人間」にした場合、吸血鬼を降霊できてしまうので
                    // 降霊のアクション時に、吸血鬼の場合は、市民を降霊するように修正する。FAQにも、その説明を追加する。
                    // 「降霊する」を表示する
                    return ReplaceButtonHtml(aHtml["Blue"], giNowPlayerId, iPlayerId, "Necromancy", goButtonText["Necromancy"]);

                }

            }

            break;

        // 役割が騎士またはコスプレイヤーの場合
        case "Knight":
        case "Cosplayer":

            // 第１夜の殺害無し＆第１夜の場合
            if (giDateNum == 1 && gbFirstNightNoKillFlg == true) {

                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {

                // 連続ガード禁止モードがオンで、昨晩守った場合
                if (goDoubleGuard.bOnFlg == true && goDoubleGuard.iYesterdayPlayerId == iPlayerId) {

                    // 「連続ガード禁止」を返す
                    return ReplaceButtonHtml(aHtml["Text"], null, null, null, goButtonText["NoGuard"]);

                } else {
                    // 「守る」ボタンを返す
                    return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Guard", goButtonText["Guard"]);

                }

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }

            break;

        // 役割が恋人の場合
        case "Lovers":
        case "DestinedLovers":
            // 対象のプレイヤーが自分と同じ役職（恋人）の場合
            if (gaPlayer[iPlayerId].sRole == sMyRole) {
                // 背景画像を青く変更する
                htmlTemplate.addClass("PlayerBoxBgBlue");
                // 「恋人」を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, goRoleText[sMyRole]);

                // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }

            break;

        // 役割が吸血鬼の場合
        case "Vampire":
        case "Bat":

            // 対象のプレイヤーが吸血鬼の場合
            if (sTargetRole == "Vampire" || sTargetRole == "Bat") {

                // 背景画像を赤く変更する
                htmlTemplate.addClass("PlayerBoxBgRed");
                // 「吸血鬼」を返す
                return ReplaceButtonHtml(aHtml["Text"], null, null, null, goButtonText["Vampire"]);

                // 対象のプレイヤーが生きている場合
            } else if (gaPlayer[iPlayerId].bLive) {
                // 「人狼だと疑う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);
                // プレイヤーが死んでいる場合
            } else {
                return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
            }
            break;

        // マジシャンの場合
        case "Magician":

            // 第1夜の場合
            if (giDateNum <= 1) {
                // 「役職を奪う」ボタンを返す
                return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Change", goButtonText["Magician"]);

                // 第2夜以降の場合
            } else {
                // 対象のプレイヤーが生きている場合
                if (gaPlayer[iPlayerId].bLive == true) {
                    // 「人狼だと疑う」ボタンを返す
                    return ReplaceButtonHtml(aHtml["Red"], giNowPlayerId, iPlayerId, "Werewolf?", goButtonText["Werewolf?"]);

                    // プレイヤーが死んでいる場合
                } else {
                    // 「死亡」テキストを返す
                    return ReplaceButtonHtml(aHtml["RedText"], null, null, null, goButtonText["Dead"]);
                }

            }
            break;

    }

    // エラーを返して終了する
    return -1;

}

/****************************************************
    関数名    ReplaceButtonHtml
    機能        ボタンHTMLの変数部分を差し替える

    入力        sHtml            HTMLテンプレート
            FromPlayerId    [FromPlayerId]との置換文字列
            ToPlayerId        [ToPlayerId]との置換文字列
            Action            [Action]との置換文字列
            ButtonText        [ButtonText]との置換文字列
    出力        sHtml            置換後の文字列

****************************************************/
function ReplaceButtonHtml(sHtml, FromPlayerId, ToPlayerId, Action, ButtonText) {
    var aKeyword = [];
    aKeyword = ["FromPlayerId", "ToPlayerId", "Action", "ButtonText"];

    var sKeywordTag = "";

    // キーワードに対して繰り返す
    for (iCnt = 0; iCnt < aKeyword.length; iCnt++) {
        // キーワードを差し替える
        sKeywordTag = "[" + aKeyword[iCnt] + "]";
        sHtml = sHtml.replace(sKeywordTag, eval(aKeyword[iCnt]));
    }

    return sHtml;
}

/****************************************************
    関数名    GetRankingNum
    機能        ランキングの順位を取得する

    入力        iPoint        対象のポイント
    出力        iRanking    順位

    処理概要
        1. 全プレイヤーのポイントを配列に格納する
        2. ポイント配列を降順ソートする
        3. ポイント配列に対して繰り返す
         3.0. 順位をインクリメントする
         3.1. 対象のポイントがポイント配列メンバ以上の場合
          3.1.1. 現在の順位を返して終了する
****************************************************/
function GetRankingNum(iPoint) {
    var iCnt;
    var aPoint = [];
    var iRanking = 0;

    // 全プレイヤーのポイントを配列に格納する
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // プレイヤーのポイントを配列に格納する
        aPoint[iCnt] = gaPlayer[iCnt].iPoint;
    }

    // 配列の順位を取得する
    iRanking = GetRank(iPoint, aPoint);

    // エラーを返して終了する
    return iRanking;
}

/****************************************************
    関数名    DreamAction
    機能        夢の中でのアクションを実行する。実行完了する前に、confirmを出す。

    入力        iFromPlayerId    アクションの実行プレイヤーID
            iToPlayerId        アクションの対象プレイヤーID
            sAction            アクションタイプ("Werewolf?","Kill","Foretell","Guard","Necromancy")
            oButtonObj        ボタンオブジェクト
    出力        なし

    処理概要
        1. 確認アラート用テキストを作成する
        2. 確認アラートを表示する
****************************************************/
function DreamAction(iFromPlayerId, iToPlayerId, sAction, oButtonObj) {
    var sTitle = "アクション確認";
    var sMessageKey = "";
    var sRole = "";

    // 対象者が有効の場合（PassとCheckedでは、下記の処理が不要）
    if (iFromPlayerId == -1 || iFromPlayerId == undefined) {
        iFromPlayerId = giNowPlayerId;
    }
    if (iToPlayerId == -1 || iToPlayerId == undefined) {
        iToPlayerId = giNowPlayerId;
    }
    sRole = gaPlayer[iFromPlayerId].sRole;


    // 確認アラート用テキストを作成する
    switch (sAction) {

        case "Werewolf?":
            sMessageKey = "DreamActionSuspect";
            break;

        // 殺害するボタン（通常）
        case "Kill":

            // 人狼が2人以上生き残っている場合
            if (giWerewolfLiveNum >= 2) {
                // 殺害理由ボタンを表示する
                ShowKillReasonButton(iFromPlayerId, iToPlayerId);
                // ボタンを非表示する
                $(oButtonObj).hide();
                return;
            }

            sMessageKey = "DreamActionKill";
            break;

        // 殺害理由ボタン（2人以上、人狼が生き残っている場合
        case "KillByReason1":
        case "KillByReason2":
        case "KillByReason3":
            sMessageKey = "DreamActionKill";
            break;

        case "Foretell":
        case "Scoop":
            sMessageKey = "DreamActionFortune";
            break;


        case "Guard":
            sMessageKey = "DreamActionGuard";
            break;

        case "Necromancy":
            sMessageKey = "DreamActionNecromancy";
            break;

        case "Change":
            sMessageKey = "DreamActionChange";
            break;

        // リモートモード関連 ver.10.0.0
        case "SelectPlayer":
            sMessageKey = "DreamActionSelectPlayer";
            break;

        // 答えをパスする
        case "Pass":
            sMessageKey = "PassDream";
            break;

        // 答えの確認
        case "Checked":
            sMessageKey = "DreamActionChecked";
            break;


        default:
            break;

    }

    // 確認フォームを表示する
    var aMessage = GetAlertMessage(sMessageKey, gaPlayer[iToPlayerId].sName);

    // リモートモードの夜アクションの場合
    if (gsRemoteMode != "") {
        // SelectPlayerの場合は、特殊処理（自身の番号が確定しない）する
        if (sAction == "SelectPlayer") {
            // 自分のPlayerIdをlocalStorageに格納する
            // 当初、同じ名前を選んだ場合に「エラー」にしていたが
            // 選択時に再起動する人がいることを考慮して、「後出しで上書き」という仕様に変更する
            //giRemotePlayerIdTmp = iToPlayerId;
            giRemotePlayerId = iToPlayerId;
            Log("6298 giRemotePlayerId=" + giRemotePlayerId);

            // サーバーにプレイヤー選択情報をアップする
            SelectPlayer();
            return;

        }
        // 死亡後の役職確認の場合
        if (sAction == "Pass" || sAction == "Checked") {
            // 通常モードと同じ処理をする（サーバーに処理を送らない）
            var sFunction = "DoneDreamAction(" + iFromPlayerId + "," + iToPlayerId + ",'" + sAction + "')";

            // 通常のアクションの場合
        } else {
            // 夜アクションを送信する
            var sFunction = "SendNightAction()";
            giRemoteToPlayerId = iToPlayerId;
            gsRemoteAction = sAction;
        }

        // 通常モードの場合
    } else {
        var sFunction = "DoneDreamAction(" + iFromPlayerId + "," + iToPlayerId + ",'" + sAction + "')";
    }
    Log("4628:sFunction=" + sFunction);
    ShowConfirm(aMessage[0], aMessage[1], sFunction);

    return;

}


/*******************************************************************************
    関数名    ShowKillReasonButton
    機能        人狼が2人以上、生き残っている場合に、殺害理由ボタンを表示する

    入力        iFromPlayerId
            iToPlayerId
    出力        なし

    処理概要
            1. 殺害対象プレイヤーの"KillReason"を表示する
            2. 各理由ボタンに対して javascript:DreamAction(iFromPlayerId, iToPlayerId, "KillByReason")を
               設定する
            3. 表示文言をlang.jsの設定値に差し替える
*******************************************************************************/
function ShowKillReasonButton(iFromPlayerId, iToPlayerId) {

    var sUrl = "";
    var sText = "";

    // KillReason divオブジェクト
    var htmlTemplate = $('#PLAYER_' + iToPlayerId + ' .KillReason');

    // 各理由ボタンに対してアクションを設定する
    for (var iCnt = 1; iCnt <= 3; iCnt++) {
        // アクションURLを作成する
        sUrl = "javascript:DreamAction(" + iFromPlayerId + "," + iToPlayerId + ",'KillByReason" + iCnt + "')";
        htmlTemplate.find('.KILL_' + iCnt).attr("href", sUrl);
        sText = goButtonText['KILL_' + iCnt];
        htmlTemplate.find('.KILL_' + iCnt).text(sText);
    }

    // 殺害対象プレイヤーの"KillReason"を表示する
    htmlTemplate.show();

}

/****************************************************
    関数名    DoneDreamAction
    機能        夢アクションを実行する

    入力        iFromPlayerId        実行プレイヤーID
            iToPlayerId            対象プレイヤーID
            sAction                アクションタイプ("Werewolf?","Kill","Foretell","Guard","Checked")
            bNoJump                 ページ遷移させないモード
    出力        なし

    処理概要
        1. アクションタイプが "Werewolf?"の場合
         1.1. gaSuspectに疑いポイントを追加する
        2. アクションタイプが "Kill"の場合
         2.1. gaKillに削除対象を加える
        3. アクションタイプが"Foretell"の場合
         3.1. 占い結果をアラート表示する
         3.2. gaForetellFlgを更新する
        4. アクションタイプが"Guard"の場合
         4.1. giGuardPlayerIdを更新する
****************************************************/
function DoneDreamAction(iFromPlayerId, iToPlayerId, sAction, bNoJump) {

    var sNextPage = "";
    var iKillVote = 1;
    Log("4147:DoneDreamAction sAction=" + sAction);

    // 特殊処理の場合
    switch (sAction) {

        // 死亡後の役職確認ボタン(確認 or PASS）をタップした場合
        case "Checked":
        case "Pass":
            // 対象プレイヤーのチェック済みフラグをオンにする
            gaPlayer[iFromPlayerId].bCheckedFlg = true;
            SaveData("gaPlayer");
            break;

    }

    // 通常モードとリモートモードで切り分ける
    switch (gsRemoteMode) {
        // リモートGM
        case "GM":
            sNextPage = "#RemoteWaitingGM";
            break;

        case "PLAYER":
            sNextPage = "#RemoteWaitingPlayer";
            break;

        // 通常モード
        default:
            // 現在のプレイヤー番号をインクリメントする
            giNowPlayerId++;

            // 最後のプレイヤーでない場合
            if (giNowPlayerId < gaPlayer.length) {
                // 次のページを、本人確認画面とする
                sNextPage = "#EnterPassword";

                // 最後のプレイヤーの場合
            } else {
                // 次のページを、朝とする
                sNextPage = "#Morning";
            }
            break;

    }

    // アクションによって切り分ける
    switch (sAction) {

        // "Werewolf?"の場合
        case "Werewolf?":

            // 今夜の疑い配列にポイントを追加する
            gaSuspect[iToPlayerId]++;

            // 各プレイヤーの疑い累計ポイントにも追加する
            gaPlayer[iToPlayerId].iSuspect++;

            break;

        // "Kill"の場合
        case "Kill":
        case "KillByReason1":
        case "KillByReason2":
        case "KillByReason3":

            // 相手がサイコキラーの場合（サイコキラーだけ夜に即時殺害）
            if (gaPlayer[iToPlayerId].sRole == "PsychoKiller") {

                // 人狼を確実死亡リストに追加する
                gaKillMust.push(iFromPlayerId);

                // 人狼の残り人数を、即座に１人減らす（マジシャン対応）
                // 人数は、ゲームセットチェックのタイミングで、人狼のbLiveFlgで再計算される。
                giWerewolfLiveNum--;

                // 殺された人狼に追加する
                gaKilledWerewolf.push(iFromPlayerId);

            // 相手がサイコキラー以外の場合
            } else {
                // 殺害対象リストに追加する ver.3.2. WerewolfVoice対応
                // gaKill.push(iToPlayerId);

                // KillByReasonの場合
                if (sAction.indexOf("KillByReason", 0) >= 0) {
                    iKillVote = sAction.replace("KillByReason", "") - 0;
                }
                Log("6414 iKillVote=" + iKillVote + " from=" + iFromPlayerId + "/ to=" + iToPlayerId);
                gaKill[gaKill.length] = new KillData(iFromPlayerId, iToPlayerId, iKillVote);

                // 相手がボマーの場合 ver.6.2
                if (gaPlayer[iToPlayerId].sRole == "Bomber") {
                    // 人狼をボマー攻撃対象リストに追加する
                    goBomb.aAttackList.push(iFromPlayerId);
                }

            }

            // ver3.2対応
            //gaKillWerewolfId.push(iFromPlayerId);

            // ver.10.1.6 人狼ボイスデザイン変更
            // 人狼ボイスを非表示にする
            $("#WerewolfRemoteMessage").hide();


            break;

        // "Guard"の場合
        case "Guard":

            // 相手がサイコキラーの場合、伝説の人狼の場合
            if (gaPlayer[iToPlayerId].sRole == "PsychoKiller"
            || gaPlayer[iToPlayerId].sRole == "LegendaryWolf") {

                // 騎士を確実死亡リストに追加する
                gaKillMust.push(iFromPlayerId);


                // 相手がサイコキラー以外の場合
            } else {

                // 相手がボマーの場合(ver.6.2) ボマーがトラップをしかけた場合、騎士は死亡する
                // ボマーがトラップをかけていない場合は、通常通りに守ることができる
                if (gaPlayer[iToPlayerId].sRole == "Bomber") {

                    // 人狼をボマー攻撃対象リストに追加する
                    goBomb.aAttackList.push(iFromPlayerId);
                }

                // まだガード対象がいない場合
                if (giGuardPlayerId == -1) {
                    // ガード対象を更新する
                    giGuardPlayerId = iToPlayerId;

                    // 複数の騎士がいて、すでに選択されている場合
                } else {
                    var iGuardRandom = Math.floor(Math.random() * 2);

                    // 半分の確率でガード対象を更新する
                    if (iGuardRandom < 1) {
                        giGuardPlayerId = iToPlayerId;
                    }

                }
                // 昨晩守った相手として保存する
                // バグ修正 2015.05.05 騎士とコスプレイヤーがいる場合、二人目のプレイヤーに今晩の選択先が連続ガード禁止になってしまう。
                // この値の設定は、朝が来るタイミングとする
                // goDoubleGuard.iYesterdayPlayerId = giGuardPlayerId;
            }
            break;


        // "Necromancy"の場合
        case "Necromancy":

            // 死んだ相手の役職をコピーする
            gsNecromancyRole = gaPlayer[iToPlayerId].sRole;
            Log("***** gsNecromancyRole=" + gsNecromancyRole);
            giNecromancyPlayerId = iFromPlayerId;

            // 死んだ相手の役職が、吸血鬼の場合 ver.7.6
            if (gsNecromancyRole == "Vampire" || gsNecromancyRole == "Bat") {
                // 降霊させる役職を「市民」に変更する
                gsNecromancyRole = "Citizen";
            }

            // 表示するカードを変更する
            $("#NecromancyCard").attr("src", "./img/Card_" + gsNecromancyRole + ".png");

            // 相手の名前を表示
            $("#Necromancy .PlayerName").text(gaPlayer[iToPlayerId].sName);

            // 相手の役職を表示
            //$("#Necromancy .RoleName").text(goRoleText[gaPlayer[iToPlayerId].sRole]);
            //$("#Necromancy .RoleNameSmall").text(goRoleText[gaPlayer[iToPlayerId].sRole]);
            $("#Necromancy .RoleName").text(goRoleText[gsNecromancyRole]);
            $("#Necromancy .RoleNameSmall").text(goRoleText[gsNecromancyRole]);

            // 設定画面を初期化する
            InitDream(true);

            // 次のページを設定する
            gsNextPage = sNextPage;

            // NoJumpモードでなければ画面を移動する（RemoteでDoAllAction時）
            if (!bNoJump) {
                jQT.goTo('#Necromancy', 'fade');
            }

            return;

        // "Foretell"の場合
        case "Foretell":

            // 占い済みフラグをtrueにする
            gaForetellFlg[iToPlayerId] = true;

            // 占い結果を表示する
            ShowForetellPage(iToPlayerId, iFromPlayerId, sNextPage, bNoJump);

            return;

        // "Scoop"の場合
        case "Scoop":

            // 占い済みフラグをtrueにする
            gaScoopFlg[iToPlayerId] = true;

            // 占い結果を表示する
            ShowForetellPage(iToPlayerId, iFromPlayerId, sNextPage, bNoJump);

            return;

        // "Change"の場合
        case "Change":
            // サイコキラーのカードも奪える

            // 交換した相手の役職をコピーする（翌朝に処理するためグローバル変数に格納する）
            goMagician.sRole = gaPlayer[iToPlayerId].sRole;
            Log("***** gsMagicianRole=" + goMagician.sRole);
            goMagician.iFromPlayerId = iFromPlayerId;
            goMagician.iToPlayerId = iToPlayerId;


            // 表示するカードを変更する
            $("#MagicianCard").attr("src", "./img/Card_" + goMagician.sRole + ".png");

            // 相手の名前を表示
            $("#Magician .PlayerName").text(gaPlayer[iToPlayerId].sName);

            // 相手の役職を表示
            $("#Magician .RoleName").text(goRoleText[goMagician.sRole]);
            $("#Magician .RoleNameSmall").text(goRoleText[goMagician.sRole]);
            Log("***** gsMagicianRole=" + goRoleText[goMagician.sRole]);

            // 設定画面を初期化する
            InitDream(true);

            // 次のページを設定する
            gsNextPage = sNextPage;

            // 画面を移動する
            Log("4328:GotoMagicianPage");
            // NoJumpモードでなければ画面を移動する（RemoteでDoAllAction時）
            if (!bNoJump) {
                jQT.goTo('#Magician', 'fade');
            }
            return;

        // "Bomb"の場合
        case "Bomb":
            // ボムの使用フラグをオンにする
            goBomb.bUsed = true;
            // トラップをしかけたフラグをオンにする
            goBomb.bTrapped = true;
            break;

        // "Pass"の場合
        case "Pass":
            // NoJumpモードでなければ画面を移動する（RemoteでDoAllAction時）
            if (!bNoJump) {

                // リモートモードの場合
                if (gsRemoteMode != "") {
                    // 待機ページに移動する
                    jQT.goTo(sNextPage, "fade");
                    return;
                }

                // プレイヤーが最後の場合
                if (sNextPage == "#Morning") {
                    // 朝に移動する
                    jQT.goTo(sNextPage, "fade");

                } else {
                    // EnterPasswordのページを初期化する
                    SetEnterPassword();
                }
            }
            return;

        // 死んだプレイヤーが内容を確認して"OK"した場合
        case "Checked":
            break;

        default:
            // 実際には発生しない
            //ShowAlert("3591:" + sAction);
            break;

    }

    // 設定画面を初期化する
    InitDream(true);

    // 画面を移動する
    //    jQT.goTo(sNextPage,"fade");

    // NoJumpモードの場合は移動せずに終了（RemoteでDoAllAction時）
    if (bNoJump == true) {
        return;
    }
    // リモートモード対応 ver.10.0.0
    if (sNextPage == "#EnterPassword") {
        // プレイヤーの確認画面を設定し、移動する
        SetEnterPassword();
        return;
    }

    // 次の画面に移動する
    jQT.goTo(sNextPage);

}

/*******************************************************************************
    関数名    ShowForetellPage
    機能        占い結果ページを表示する

    入力        iToPlayerId        占い対象プレイヤーID
            iFromPlayerId    占い師自身のID
            sNextPage        次のページ
    出力        なし
*******************************************************************************/
function ShowForetellPage(iToPlayerId, iFromPlayerId, sNextPage, bNoJump) {

    // 初期化する
    $("#Foretell .ROLE").hide();

    // 吸血鬼を人間と判断する場合
    if (gbVampireHumanFlg == true) {
        // 人狼、吸血鬼、以外の「、吸血鬼」を非表示にする。
        $("#Foretell .VampireHumanHidden").hide();

    } else {
        $("#Foretell .VampireHumanHidden").show();

    }

    // 相手の役割によって切り分ける
    switch (gaPlayer[iToPlayerId].sRole) {

        // 「人狼」もしくは「コスプレイヤー」の場合
        case "Werewolf":
        case "Cosplayer":
            $("#Foretell .Werewolf").show();
            break;

        case "Vampire":
            // 「吸血鬼」を「人間」と判断
            if (gbVampireHumanFlg == true) {
                $("#Foretell .Citizen").show();

            } else {
                $("#Foretell .Vampire").show();
            }
            break;

        case "FortuneTeller":
            $("#Foretell .FortuneTeller").show();
            break;

        case "Bat":
            // 「吸血鬼」を「人間」と判断
            if (gbVampireHumanFlg == true) {
                $("#Foretell .Citizen").show();

            } else {
                $("#Foretell .Vampire").show();
            }

            // 実行者が占い師の場合
            if (gaPlayer[iFromPlayerId].sRole == "FortuneTeller") {
                // 第１夜の「死亡なし」の場合
                if (giDateNum == 1 && gbFirstNightNoKillFlg == true) {

                    // チェック済みフラグをfalseに戻す（第２夜以降に殺さなくなるのを防ぐ）
                    gaForetellFlg[iToPlayerId] = false;

                    // 占い師によって「Bat」を殺害する場合
                } else {
                    // 吸血鬼を確実死亡リストに追加する
                    gaKillMust.push(iToPlayerId);

                }

            }

            break;

        // サイコキラーの場合
        case "PsychoKiller":
            $("#Foretell .Citizen").show();

            // 占い師を確実死亡リストに追加する
            gaKillMust.push(iFromPlayerId);
            break;

        // ボマーの場合
        case "Bomber":
            $("#Foretell .Citizen").show();

            // 占い師をボマー攻撃対象リストに追加する
            goBomb.aAttackList.push(iFromPlayerId);
            break;

        // 伝説の人狼の場合
        case "LegendaryWolf":
            $("#Foretell .Werewolf").show();

            // 占い師を確実死亡リストに追加する
            gaKillMust.push(iFromPlayerId);
            break;


        // 人間の場合
        default:
            $("#Foretell .Citizen").show();

            break;

    }

    // 設定画面を初期化する
    InitDream(true);

    // 占い結果を表示してから画面を移動する
    $("#Foretell .PlayerName").text(gaPlayer[iToPlayerId].sName);

    // 次のページを設定する
    gsNextPage = sNextPage;

    // NoJumpモードでなければ画面を移動する
    if (bNoJump != true) {
        // 画面を移動する
        jQT.goTo('#Foretell', 'fade');
    }
}

/****************************************************
 関数名    SetBomb
 機能    ボマーな罠をセットする
****************************************************/
function SetBomb() {
    // ver.10.0.6 バグ修正リモートモードのときにAction登録するため
    // From, To の設定が必要
    //    var sFunction = 'DoneDreamAction("","","Bomb")';

    // リモートモードの夜アクションの場合
    if (gsRemoteMode != "") {
        // 夜アクションを送信する
        var sFunction = "SendNightAction()";
        giRemoteToPlayerId = -1;
        gsRemoteAction = "Bomb";

    } else {
        var sFunction = 'DoneDreamAction("","","Bomb")';
    }

    var aMessage = GetAlertMessage("DreamActionBomb", "");
    ShowConfirm(aMessage[0], aMessage[1], sFunction);
}


/****************************************************
    関数名    GoToNextPage
    機能        次のページに移動する

    入力        sAnime        "fade","pop","swap","cube","slideleft"
    G入力    gsNextPage    次のページID
    出力        なし

    処理概要
****************************************************/
function GoToNextPage(sAnime) {
    Log("3083:GoToNextPage****** gsNextPage=" + gsNextPage + "/" + sAnime);

    // 次にいくページが"#Title_Night"の場合
    if (gsNextPage == "#Title_Night") {
        GoToTitleNight();
        return;
    }

    // 次にいくページが"#EnterPassword"の場合
    if (gsNextPage == "#EnterPassword") {
        // SetEnterPasswordでページ移動する
        SetEnterPassword();
        return;
    }

    // 指定された次のページに移動する
    jQT.goTo(gsNextPage, sAnime);

    return;

}

/****************************************************
関数名    ShowCard
機能        カードをシャッフルした結果を表示する

G入力    giNowPlayerId        プレイヤー番号
出力        なし

処理概要    1. プレイヤー番号から役割を取得する
        2. シャッフルをストップする
        3. シャッフル画像を役割画像に差し替える
*****************************************************/
function ShowCard(sImageId) {

    // プレイヤー番号から役割を取得する
    var sRole = gaPlayer[giNowPlayerId].sRole;

    // シャッフルを停止する
    PlayShuffle(0);
    $("#HandScrollDisplay").show();

    // 5秒後にスクロールを隠す
	//setTimeout(()=> $("#HandScrollDisplay").hide(), iInterval);

    // 初日殺害ありの場合
    if (gbFirstNightNoKillFlg == false) {

        // リモートモードの場合
        if (gsRemoteGameId != "" && gsRemoteGameId != undefined) {
            //リモートの場合は、人狼ボイスを表示する
            setTimeout(()=>ShowRemoteWerewolfVoice(sRole), 1000);

        // 手渡しモードの場合
        } else {
            setTimeout(()=>ShowHandingWerewolfVoiceModal(sRole), 500);
            Log("7230:ShowHandingWerewolfVoiceModal Done");
        }
    }

    // 画像を差し替える
    // document.getElementById(sImageId).src = goCardSrc[sRole];
    $("#" + sImageId).css("background-image", "url(" + goCardSrc[sRole] + ")");

    var sRoleText = goRoleText[sRole];

    // カード名を差し替える
    $("#Dream .RoleName").text(sRoleText);

    // 説明文を表示する
    Log("1843:giNowPlayerId" + giNowPlayerId);
    Log("759:" + sRole);
    $("#Dream ." + sRole).css("display", "block");

    // 説明文以下を表示する
    $("#MainDream").css("display", "block");
}

/****************************************************
    関数名    SwapRandomCard
    機能        カードをシャッフルアニメーションさせる

    G入力    giShuffleCardNum
    出力        なし

    処理概要    1. 前のカードの番号をインクリメントする
            2. 画像リストから次の画像を選択し対象画像のSRCを差し替える。
*****************************************************/
var giShuffleCardNum = 0;
function SwapRandomCard(sId) {

    // ランダムに数字を作成する
    giShuffleCardNum++;
    if (giShuffleCardNum >= gaCardType.length) {
        giShuffleCardNum = 0;
    }
    var sRole = gaCardType[giShuffleCardNum];
    //カードを差し替える
    // document.getElementById(sId).src = goCardSrc[sRole];
    var sBgImage = "url(" + goCardSrc[sRole] + ")";
    $("#" + sId).css("background-image", sBgImage);

    return;

}

/****************************************************
    関数名    PlayShuffle
    機能        シャッフルアニメを再生、停止する。

    入力        bPlay        1:再生    0:停止
            sId            差し替える<img>のID
            iInterval    シャッフル速度
    G入力    giTimer        タイマーポインタ
*****************************************************/
var giTimer = 0;
function PlayShuffle(bPlay, sId, iInterval) {

    // 再生の場合
    if (bPlay == 1) {
        // タイマーを設定する
        giTimer = setInterval("SwapRandomCard('" + sId + "')", iInterval);

    } else {
        // タイマーを停止する
        clearInterval(giTimer)
    }
}

/****************************************************
    Morning
****************************************************/
/****************************************************
    関数名    InitMorning
    機能        全メッセージを一度非表示にする。
            置き換え文字列を差し替える。
            ページ番号を1にする。
            Page1を表示する。

    入力        なし
    出力        なし
****************************************************/
function InitMorning() {

    // 全メッセージを非表示にする
    InitShowNextPage("#Morning");

    // タイトルを変更する
    $("#Morning .ImageTitle").text("The " + goDateText[giDateNum] + " Morning");

    // 獲得ポイントを設定値で更新する
    $("#Morning .AlivePointShow").text(giPoint["Alive"]);

    // ver.3.2. WerewolfVoice対応
    var iDeadPlayerId = GetDeadPlayerId();

    var sDeadPlayerNames = "";

    // 殺害リストを作成する
    gaKillMust = MakeKillMust(gaKillMust, iDeadPlayerId, giGuardPlayerId, giDateNum, gbFirstNightNoKillFlg);

    // 一晩目でマジシャンが役職を切り替えた場合（なおかつ、マジシャンが生きている場合）
    if (giDateNum == 1 &&
        goMagician.sRole != "" &&
        // 人狼に殺されない（狙われていない || 守られている）
        (goMagician.iFromPlayerId != iDeadPlayerId || giGuardPlayerId == goMagician.iFromPlayerId)) {

        // マジシャンの「人狼」「吸血鬼」交換による「知るものを殺す」対応
        gaKillMust = KillKnowingPerson(gaKillMust);

        // マジシャンの役職を変更する
        Log("4695:" + goMagician.iFromPlayerId + "=" + goMagician.sRole);
        gaPlayer[goMagician.iFromPlayerId].sRole = goMagician.sRole;
        gaPlayer[goMagician.iToPlayerId].sRole = "Citizen";

        // 最終の答えの表示を (マジシャン→新しい役職)とする
        gaPlayerAnswer[goMagician.iFromPlayerId] += " > " + goRoleText[goMagician.sRole];
        gaPlayerAnswer[goMagician.iToPlayerId] += " > " + goRoleText["Citizen"];

        // 奪った役職に応じて、関連オブジェクトを更新する
        Log("7501 マジシャンの奪った役職：" + goMagician.sRole);
        
        switch (goMagician.sRole) {
            
            // 道連れになる可能性のある役職 ***********
            // 騎士の場合
            case "Knight":
            case "Cosplayer":
            case "DestinedLovers":
                UpdateTargetRoleList();
                break;
        }

        // 初期化する
        goMagician = {
            "sRole": "",
            "iFromPlayerId": -1,
            "iToPlayerId": -1
        };

    }


    // 連続ガード禁止用の設定
    goDoubleGuard.iYesterdayPlayerId = giGuardPlayerId;

    // レインマンが生きている場合の処理
    if (gbRainManLifeFlg == true) {
        // 落雷があった場合
        if (gbLightningFlg) {
            // 初期化する
            gbLightningFlg = false;

            // 雷情報を表示する
            $(".WeatherRain").hide();
            $(".WeatherLightning").show();

            // 落雷がない場合
        } else {
            // 雷情報を非表示にし、雨の情報を出す
            $(".WeatherRain").show();
            $(".WeatherLightning").hide();

        }

        // 背景を雨にする
        $(".TitlePageMorning").css("background-image", "url(img/Background_RainSky.jpg)");


        // レインマンが死亡している、もしくは、存在しない場合
    } else {
        // お天気情報を非表示にする
        $(".WeatherRain").hide();
        $(".WeatherLightning").hide();
        $(".TitlePageMorning").css("background-image", "url(img/Background_Morning.jpg)")
    }


    // 被害者がいない場合
    if (gaKillMust.length <= 0) {
        // 第1夜は殺害しないモード　かつ　第1夜の場合
        if (giDateNum == 1 && gbFirstNightNoKillFlg == true) {
            // 死亡者はなしとする
            $("#Morning .Result").hide();
            $("#Morning .FirstNightNoKill").show();

            // 被害者なし、を表示
        } else {
            // 死亡者はなしとする
            $("#Morning .Result").hide();
            $("#Morning .Guard").show();

        }

        // 被害者がいる場合
    } else {
        // 被害者あり
        $("#Morning .Result").hide();
        $("#Morning .Dead").show();

        // 被害者に対して繰り返す
        for (iCnt = 0; iCnt < gaKillMust.length; iCnt++) {

            Log("5251:" + gaKillMust[iCnt] + "/" + gaPlayer[gaKillMust[iCnt]].sName);
            // 対象プレイヤーを死亡にする
            gaPlayer[gaKillMust[iCnt]].bLive = false;

            // 最後に殺害されたプレイヤーIDを一時保存する
            giLastDeadId = gaKillMust[iCnt];

            // 殺害されたプレイヤー名を連結する
            sDeadPlayerNames += gaPlayer[gaKillMust[iCnt]].sName + gsSan + " ";

            // 被害者の疑いポイントを0にする
            gaSuspect[gaKillMust[iCnt]] = 0;

            // ファーストターゲットの場合
            if (gbFirstTargetFlg == true) {
                // ファーストターゲットボーナスを加算する
                gaPlayer[gaKillMust[iCnt]].iAddPoint += giPoint["FirstTarget"];
                gaPlayer[gaKillMust[iCnt]].iTotalPoint += giPoint["FirstTarget"];
                gbFirstTargetFlg = false;
            }
        }
        // 殺害されたプレイヤー名を表示する
        $("#Morning .DeadPlayer").text(sDeadPlayerNames);

    }

    // 疑われているプレイヤーのリストを取得する
    var aSuspectPlayersId = [];
    aSuspectPlayersId = GetSuspectPlayers(gaSuspect);
    var sSuspectPlayerName = "";

    // 疑われているプレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < aSuspectPlayersId.length; iCnt++) {

        // 文字列を連結する
        sSuspectPlayerName += " " + gaPlayer[aSuspectPlayersId[iCnt]].sName + gsSan;
    }

    // 疑われている人が存在しない場合
    if (sSuspectPlayerName == "") {
        //  疑いはなしとする
        $("#Morning .Suspect").hide();
        $("#Morning .SuspectNone").show();
    } else {
        //  疑われているプレイヤー名を差し替える
        $("#Morning .SuspectPlayer").text(sSuspectPlayerName);

        $("#Morning .SuspectNone").hide();
        $("#Morning .Suspect").show();
    }

    // 降霊した場合
    if (giNecromancyPlayerId != null && gsNecromancyRole != "") {
        // 偉大な霊媒師の役職を変更する
        Log(giNecromancyPlayerId + "=" + gsNecromancyRole);
        gaPlayer[giNecromancyPlayerId].sRole = gsNecromancyRole;

        // 最終の答えの表示を (偉大な霊媒師→新しい役職)とする
        gaPlayerAnswer[giNecromancyPlayerId] += " > " + goRoleText[gsNecromancyRole];

        // 初期化する
        giNecromancyPlayerId = null;
        gsNecromancyRole = "";

    }


    // Dream音声をストップする
    PlayAudio('audio/DreamLoop.mp3', true);

}

/****************************************************
    関数名    UpdateTargetRoleList
    機能      特定の役職を持つユーザーIDのリストを更新する。
             本関数は、主に道連れ対象となる
             ・騎士　・コスプレイヤー
             ・運命の恋人
             の管理配列を更新する。
    
    入力     なし
    出力     なし       直接グローバル配列を更新します
****************************************************/
function UpdateTargetRoleList() {

    Log("7668: UpdateTargetRoleList");

    // グローバル変数を初期化する
    gaKnightPlayerId = [];
    gaDestinedLoversPlayerId = [];
    
    // プレイヤーリストに対して繰り返す
    for (var iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++) {

        // 対象のプレイヤーが騎士、コスプレイヤーの場合
        if (gaPlayer[iPlayerCnt].sRole == "Knight" || gaPlayer[iPlayerCnt].sRole == "Cosplayer") {
            
            // 騎士プレイヤーリストに、プレイヤーIDを保存する（DarkShaman対応）
            gaKnightPlayerId.push(iPlayerCnt);

            // 運命の恋人の場合
        } else if (gaPlayer[iPlayerCnt].sRole == "DestinedLovers") {

            // 運命の恋人リストにプレイヤーIDを保存する
            gaDestinedLoversPlayerId.push(iPlayerCnt);
        }
    }
    SaveData("gaKnightPlayerId");
    SaveData("gaDestinedLoversPlayerId");
    
    return;
}


/****************************************************
    関数名    KillKnowingPerson
    機能    マジシャンに乗っ取られた人狼や吸血鬼に、仲間が残っている場合は
            答えを知っているため、殺害する。
    入力    aKill
    出力    aKill

    処理概要
            1. カードの交換相手によって切り替える
            2. 交換対象が、人狼の場合
             2.1. 人狼の生き残りを探す
            3. 交換対象が、吸血鬼・変身した吸血鬼の場合
             3.1. 吸血鬼・変身した吸血鬼の生き残りを探す
            4. すべてのプレイヤーに対して繰り返す
             4.1. 検索対象の役職の場合
              4.1.1. 対象者が生きている場合
               4.1.1.1. gaKillMustに対象者が含まれない場合
                4.1.1.1.1. 答えを知っている者を、aKillに追加して返す
****************************************************/
function KillKnowingPerson(aKill) {

    Log("6195:KillKnowingPerson");
    var aCheckRole = [
        "Werewolf", "Mentalist", "Vampire", "Bat", "LegendaryWolf"
    ];

    // チェックする役職でなかった場合
    if (CheckMatchArray(goMagician.sRole, aCheckRole) == false) {
        // 殺害対象を変えずに、そのまま返す
        return aKill;
    }

    // すべてのプレイヤーに対して繰り返す
    var bKnowingFlg = false;
    for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象プレイヤーが、知る者以外、かつ、生きている、かつ、仲間役職の場合
        bKnowingFlg = CheckLivingPartner(iCnt, goMagician.iToPlayerId);
        if (bKnowingFlg == true) {

            // 知る者の仲間が、今回の殺害対象でない場合（つまり、仲間が残る場合）
            if (CheckMatchArray(iCnt, aKill) == false) {

                // マジシャンによる殺害を更新する（aKillに、カード更新対象のユーザーIDを追加する
                Log("6218:" + goMagician.iToPlayerId);

                // カードを奪われた（知る者）を殺害対象にする
                aKill.push(goMagician.iToPlayerId);

                // 殺害リストをソートする
                aKill.sort(function (a, b) { return a - b; });

                Log(aKill);

                return aKill;
            }
        }
    }

    // そのまま返す
    return aKill;
}

/****************************************************
    関数名    CheckLivingPartner
    機能    知るもの以外の生きた仲間なのかどうか、確認する

    入力    oPlayer    プレイヤーオブジェクト
        iTargetPlayerId    カードを奪われたプレイヤーのID

    出力    true: 生きた仲間
         false: 生きた仲間ではない
****************************************************/
function CheckLivingPartner(iPlayerId, iTargetPlayerId) {

    // チェック対象プレイヤーがカードを奪われたプレイヤーの場合
    if (iPlayerId == iTargetPlayerId) {
        // 対象じゃないフラグを返して終了する
        return false;
    }

    // 対象プレイヤーが死んでいる場合
    if (gaPlayer[iPlayerId].bLive == false) {
        // 対象じゃないフラグを返して終了する
        return false;
    }

    // 知るものの役職によって切り分ける
    switch (goMagician.sRole) {

        // マジシャンが取得した役職が、人狼を知る人の場合
        case "Werewolf":
        case "LegendaryWolf":
        case "Mentalist":

            // 市民に変身した人に、正体を知られている「Werewolf」「LegendaryWolf」の場合
            if (gaPlayer[iPlayerId].sRole == "Werewolf" || gaPlayer[iPlayerId].sRole == "LegendaryWolf") {
                // 裏切り者を殺す、生き残りの人狼を発見した
                return true;
            }
            break;

        // マジシャンが取得した役職が、吸血鬼を知る人の場合
        case "Vampire":
        case "Bat":
            // 市民に変身した人に、正体を知られている吸血鬼の場合
            if (gaPlayer[iPlayerId].sRole == "Vampire" || gaPlayer[iPlayerId].sRole == "Bat") {
                // 裏切り者を殺す、生き残りの吸血鬼を発見した
                return true;
            }
            break;

        default:
            break;
    }

    return false;
}



/*******************************************************************************
    関数名    GetDeadPlayerId
    機能        死亡プレイヤーを選ぶ。投票数が一番多いプレイヤーを選ぶ。
            投票数のトップが2人以上いる場合は、ランダムに選ばれたプレイヤーとする。

    入力        なし
    G入力    gaKill            iFromPlayerId, iToPlayerId, iVote
    出力        iDeadPlayerId    死亡プレイヤーID

    処理概要
            1. 人狼に選ばれたプレイヤーのリスト gaKill に対して繰り返す
             1.1. aKillVoteのリストに対象のプレイヤーIDが含まれているか調べる
             1.2. 新しいプレイヤーの場合
              1.2.1. aKillVoteに対象プレイヤーと投票数を格納する
             1.3. すでにいるプレイヤーの場合
              1.3.1. iVoteに投票数をインクリメントする
            2. 投票数をまとめた aKillVoteに対して繰り返す
             2.1. 最大投票数よりも対象のプレイヤーの投票数が多い場合
              2.1.1. 死亡プレイヤーIDを対象のプレイヤーIDで更新する
            3. 死亡プレイヤーIDを返して終了する
*******************************************************************************/
function GetDeadPlayerId() {
    var iCnt = 0;
    var iVoteCnt = 0;
    var aKillVote = [];
    var bExistFlg = false;
    var iDeadPlayerId = 0;
    var iVoteTop = 0;
    var aDeadList = [];

    // 人狼に選ばれたプレイヤーのリスト gaKillに対して繰り返す
    for (iCnt = 0; iCnt < gaKill.length; iCnt++) {

        // 存在フラグを初期化する
        bExistFlg = false;

        // aKillVoteに対象のプレイヤーが含まれるかチェックする
        for (iVoteCnt = 0; iVoteCnt < aKillVote.length; iVoteCnt++) {
            // すでに存在する場合
            if (aKillVote[iVoteCnt].iPlayerId == gaKill[iCnt].iToPlayerId) {
                Log("7233 iVoteCnt=" + gaKill[iCnt].iToPlayerId + " +" + gaKill[iCnt].iVote);
                bExistFlg = true;
                // 投票数をインクリメントする
                aKillVote[iVoteCnt].iVote += gaKill[iCnt].iVote;
                break;
            }
        }

        // 新しいプレイヤーの場合
        if (bExistFlg == false) {
            // 殺害投票オブジェクトを追加する
            aKillVote[aKillVote.length] = new KillVote(gaKill[iCnt].iToPlayerId, gaKill[iCnt].iVote);
        }

    }

    // 投票数リストに対して繰り返す
    for (iVoteCnt = 0; iVoteCnt < aKillVote.length; iVoteCnt++) {
        Log("7253: player=" + aKillVote[iVoteCnt].iPlayerId + " / vote=" + aKillVote[iVoteCnt].iVote);

        // 最大投票数と対象プレイヤーの投票数が等しい場合（同票）
        if (iVoteTop == aKillVote[iVoteCnt].iVote) {
            // 死亡プレイヤーリストに追加する
            aDeadList[aDeadList.length] = aKillVote[iVoteCnt].iPlayerId;

            // 最大投票数を上回る場合
        } else if (iVoteTop < aKillVote[iVoteCnt].iVote) {
            // 最大投票数を更新する
            iVoteTop = aKillVote[iVoteCnt].iVote;

            // 死亡対象を初期化して、新たにプレイヤーを追加する
            aDeadList = [];
            aDeadList[0] = aKillVote[iVoteCnt].iPlayerId;
        }

    }

    Log(aDeadList);

    // 投票数がトップのプレイヤーが複数いる場合
    if (aDeadList.length > 1) {
        // ランダムに1人選ぶ
        iDeadPlayerId = SelectRandom(aDeadList);

        // トップが1人の場合
    } else {
        iDeadPlayerId = aDeadList[0];
    }

    // 死亡プレイヤーのIDを返して終了する
    return iDeadPlayerId;

}

/*******************************************************************************
    関数名    ShowNextPageMorning
    機能        朝のステージの説明を進める。
            1ページ目では朝のサウンドを再生する。
            3ページ目では、ゲームの決着を確認する。

    入力        なし
    出力        なし
*******************************************************************************/
function ShowNextPageMorning() {
    var sGameSetResult = 0;

    // 1ページ目の場合
    if (giNowPageNum == 1) {
        // 朝の鶏の声を再生する
        PlayAudio('audio/Morning.mp3');
        // 朝のタイマーをこのタイミングで初期化しておく
        // タイマーを初期化する
        giMorningTimerSec = giMin * 60 + 1;

        // 毎秒タイマーを初期化する
        CountDownTimer(giMorningTimerSec, '#Timer .TimerBox');
    }

    // 3ページ目の場合
    if (giNowPageNum == 3) {

        // ゲーム結果をチェックする
        sGameSetResult = CheckGameSetResult();

        // ゲームセットの場合
        if (sGameSetResult != 0) {

            // リモートモード対応 ver.10.0.0
            gsRemoteGameSetResult = sGameSetResult;

            // ゲームセット画面に移動する
            var bGameSetFlg = MoveFromMorningToGameSet(sGameSetResult);

            // ページ移動する場合
            if (bGameSetFlg) {
                return;
            }
        }

    }

    // ページをめくる
    //ShowNextPage("#Morning", ".ShowNextPageMorning", 5, "jQT.goTo('#Timer', 'slideleft')");
    ShowNextPage("#Morning", ".ShowNextPageMorning", 5, "jQT.goTo('#Timer', 'fade')");

}

/****************************************************
    関数名    MoveFromMorningToGameSet
    機能        勝利が確定した場合、ゲームセット画面に移動する。
                あと一人で人狼が勝つ、という状態の場合は、移動しない。

    入力        なし

    出力        bGameSetFlg   1:ゲーム終了  0:ゲーム終了でない
****************************************************/
function MoveFromMorningToGameSet(sGameSetResult) {

    // ゲームセットの場合は処理を行う
    switch (sGameSetResult) {

        case "Werewolf":
            // 結果画面の文言を更新する
            SetTextToWinPage(sGameSetResult);

            // 勝負決定サウンドを再生する
            PlayGameSetSound(sGameSetResult, true);

            // 結果画面に移動する
            //jQT.goTo("#Title_WerewolfWin", "fade");
            jQT.goTo("#GameOverResult", "fade");

            return true;

        case "Vampire":

            // 結果画面の文言を更新する
            SetTextToWinPage(sGameSetResult);

            // 勝負決定サウンドを再生する
            PlayGameSetSound(sGameSetResult, true);

            // 結果画面に移動する
            //jQT.goTo("#Title_VampireWin", "fade");
            jQT.goTo("#GameOverResult", "fade");

            return true;

        case "Citizen":

            // 結果画面の文言を更新する
            SetTextToWinPage(sGameSetResult);

            // 勝負決定サウンドを再生する
            PlayGameSetSound(sGameSetResult, true);

            // 結果画面に移動する
            //jQT.goTo("#Title_CitizenWin", "fade");
            jQT.goTo("#GameOverResult", "fade");

            return true;

        case "WerewolfWill":

            // リモートモードのプレイヤーの場合
            if (gsRemoteMode == "PLAYER") {
                // 結果画面の文言を更新する
                SetTextToWinPage(sGameSetResult);

                // 勝負決定サウンドを再生する
                PlayGameSetSound(sGameSetResult, true);

                // 結果画面に移動する
                //jQT.goTo("#Title_WerewolfWillWin", "fade");
                jQT.goTo("#GameOverResult", "fade");

                return true;

            }

            return false;

    }
    return false;

}


/*******************************************************************************
    関数名    MakeKillMust
    機能        朝、殺害確定リストを作成する。
            殺害なしの第１夜の場合は、誰も死なない設定とする。
            変身した吸血鬼の場合は、正体がばれるだけ、となる。
            マジシャンがいて第一夜の場合、
            1. マジシャンの役職を差し替える
            2. 相手の役職を市民にする
            3. マジシャンの役職が「人狼」になった場合
             3.1. 人狼の数が２人以上の場合
              3.1.1. 殺害対象にカードを奪われた人狼を追加
              3.1.2. 人狼の選択したプレイヤーを初期化する

            ボマーによっての殺害
            1. ボマーが無敵になった場合
             1.1. ボマーの攻撃対象リストを、殺害確定リストに追加する


    入力        aKill            殺害確定リスト
            iDeadPlayerId    人狼に狙われているプレイヤーのID
            iGuardPlayerId    ガードされたプレイヤーのID
            iDate            日付
            bFirstNightNoKillFlg    第１夜　殺害なしフラグ
    出力        aKillMust        殺害確定リスト
*******************************************************************************/
function MakeKillMust(aKill, iDeadPlayerId, iGuardPlayerId, iDate, bFirstNightNoKillFlg) {

    var iCnt = 0;
    var iKnightId = -1;

    // 無敵ボマーに触れたプレイヤーを殺害リストに追加する
    // ボマーが無敵の場合（第１夜の殺害なしの場合は、無敵ボタンが表示されない）
    if (goBomb.bTrapped == true) {
        // ボマーの攻撃対象を aKill に追加する(Attackリストは、サイコキラーなどの殺害リストとかぶらない)
        aKill = aKill.concat(goBomb.aAttackList);
    }

    // 殺害されるプレイヤーの順番をソートする（誰が誰を殺したかがわからないように）
    //aKill.sort();
    aKill.sort(function (a, b) { return a - b; });

    // 第１夜の殺害なしの場合
    if (iDate == 1 && bFirstNightNoKillFlg == true) {
        // 殺害リストを初期化する
        aKill = [];

        // 殺害リストを返して終了する
        return aKill;
    }

    // 闇の霊媒師の裁判処刑によって、騎士が死亡するかチェックする
    aKill = CheckDarkShamanAtack(aKill);

    // 運命の恋人の相手が死亡するかチェックする（処刑されたケース）
    aKill = CheckDestinedLoversDeath(aKill);

    // 人狼がサイコキラーによって絶滅させられた場合
    if (iDeadPlayerId == undefined) {
        return aKill;
    }

    // ガード成功の場合
    if (iDeadPlayerId == iGuardPlayerId) {
        // 殺害リストをそのまま返す
        return aKill;
    }

    // 人狼に狙われた人が「変身した吸血鬼」、もしくは「脱獄犯」の場合
    if (gaPlayer[iDeadPlayerId].sRole == "Bat" || gaPlayer[iDeadPlayerId].sRole == "PrisonBreaker") {
        // 殺害されない
        // 殺害リストをそのまま返す
        return aKill;
    }


    // 殺害リストに対して繰り返す
    for (iCnt = 0; iCnt < aKill.length; iCnt++) {
        // 対象プレイヤーが人狼に狙われているプレイヤーの場合
        if (aKill[iCnt] == iDeadPlayerId) {
            // そのまま殺害リストを返して終了する
            return aKill;
        }
    }

    // 狙われた人が、無敵のボマーだった場合
    if (gaPlayer[iDeadPlayerId].sRole == "Bomber" && goBomb.bTrapped == true) {
        // 殺害リストをそのまま返す
        return aKill;
    }

    // レインマンが人狼に狙われた場合
    if (gaPlayer[iDeadPlayerId].sRole == "RainMan") {
        // レインマンの生存フラグをオフにする
        gbRainManLifeFlg = false;
    }

    // 殺害リストに人狼に狙われた人を追加
    aKill.push(iDeadPlayerId);

    // 運命の恋人の相手が死亡するかチェックする（人狼に襲撃されたケース）
    aKill = CheckDestinedLoversDeath(aKill);

    // レインマンが生きている場合
    if (gbRainManLifeFlg) {

        // 落雷の発生をチェックする
        var bResultLightning = CheckLightning();

        // 落雷が発生した場合
        if (bResultLightning) {

            // 雷発生フラグをオンにする
            gbLightningFlg = true;

            // 生きているプレイヤーからランダムに一人をピックアップする
            var iPickupLivingPlayerId = PickUpLivingPlayer();

            // ピックアップされたプレイヤーを死亡させる
            aKill.push(iPickupLivingPlayerId);
        }
    }


    // 殺害リストをソートする
    //aKill.sort();
    aKill.sort(function (a, b) { return a - b; });

    return aKill;
}

/****************************************************
    関数名    PickUpLivingPlayer
    機能      生きているプレイヤーを１人ランダムピックアップする

    G入力     gaPlayer      プレイヤー情報配列
    出力      iPlayerId     ピックアップされたプレイヤー
****************************************************/
function PickUpLivingPlayer() {
    var aLivingPlayer = [];

    // すべてのプレイヤーに対して繰り返す
    for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 対象のプレイヤーが生きている場合
        if (gaPlayer[iCnt].bLive == true) {
            aLivingPlayer.push(iCnt);
        }
    }

    // ランダムに選ぶ
    var iRandom = Math.floor(aLivingPlayer.length * Math.random());

    // ランダムに選ばれたプレイヤーIDを返す
    return aLivingPlayer[iRandom];
}



/****************************************************
    関数名    CheckLightning
    機能      雷の発生をチェックする

    G入力     giRainManCnt  雷発生率カウンタ
    出力      bResult       結果フラグ 1:発生  0:なし
****************************************************/
function CheckLightning() {
    var iMotherNum = 4;
    var iRandom = Math.floor(iMotherNum * Math.random());

    // 確率カウンタをインクリメントする（雷確率をアップする）
    giRainManCnt++;

    Log("7280 CheckLightning iRandom=" + iRandom + "/" + giRainManCnt);

    // 雷が発生した場合（カウンタ以下の数値になった場合）
    if (iRandom < giRainManCnt) {
        // 確率カウンタを初期化する（すぐに雷が落ちないようにする）
        giRainManCnt = 0;
        return true;
    } else {
        return false;
    }

}


/****************************************************
    関数名    CheckDestinedLoversDeath
    機能     運命の恋人が死亡したことをチェックし、死亡した場合は
            相手の恋人を殺害リストに追加する

    入力     aKill
    G入力   gaDestinedLoversPlayerId
    出力     aKill

    処理概要
            1. 運命の恋人に対して繰り返す
             1.1. 対象の「運命の恋人」が殺害リストに含まれる場合
              1.1.1. 生存する「運命の恋人」リストから対象の「運命の恋人」を削除する
              （これによって、処刑と襲撃によって、両方の恋人が死亡している場合に対応する）
            2. 運命の恋人が1人でない場合（0人、もしくは、2人）
             2.1. 何もせず終了する
            3. 運命の恋人が1人生きている場合
             2.1. 残りの運命の恋人を殺害リストに加える
            4. 殺害リストを返して終了する
****************************************************/
function CheckDestinedLoversDeath(aKill) {
    var iLoverId = -1;

    // 運命の恋人に対して繰り返す
    for (var iLoverCnt = 0; iLoverCnt < gaDestinedLoversPlayerId.length; iLoverCnt++) {
        // 対象の「運命の恋人」が殺害リストに含まれる場合
        iLoverId = gaDestinedLoversPlayerId[iLoverCnt];

        if (CheckMatchArray(iLoverId, aKill) == true) {

            // 運命の恋人の生存リストから対象のプレイヤーを削除する
            gaDestinedLoversPlayerId.splice(iLoverCnt, 1);
        }
    }

    // 運命の恋人の残数が1人でない場合（0人 or 2人）
    if (gaDestinedLoversPlayerId.length != 1) {
        // 何もしない
        return aKill;
    }

    // 運命の恋人が1人生きている場合
    // 残りの運命の恋人を殺害リストに加える
    aKill.push(gaDestinedLoversPlayerId[0]);

    // 残りの運命の恋人を0人に更新する
    gaDestinedLoversPlayerId = [];


    // 殺害リストをソートする
    aKill.sort(function (a, b) { return a - b; });
    return aKill;
}


/****************************************************
    関数名    CheckDarkShamanAtack
    機能      闇の霊媒師が投票で処刑された場合に、騎士が生き残っていたら全員処刑対象とする。

    入力     aKill
    出力     aKill

    処理概要
            1. 闇の霊媒師が投票で処刑されていない場合
                1.1. 終了する
            2. 騎士が生きていない場合
                2.1. 終了する
            3. 闇の霊媒師処刑フラグを初期化(false）する
            4. 騎士に対して繰り返す
             4.1. 対象の騎士が、生存していて今夜の殺害リストに含まれない場合
              4.1.1. 殺害リストに追加する
            5. 殺害リストをソートする
            6. 殺害リストを返して終了する
****************************************************/
function CheckDarkShamanAtack(aKill) {
    var iKnightId = -1;

    // 闇の霊媒師が投票で処刑されていない場合
    if (gbDarkShamanKillKnightFlg == false) {
        return aKill;
    }
    // 騎士が生きていない場合
    if (gaKnightPlayerId.length <= 0) {
        return aKill;
    }

    // 闇の霊媒師の処刑フラグを初期化する
    gbDarkShamanKillKnightFlg = false;

    // 騎士に対して繰り返す
    for (var iKnightCnt = 0; iKnightCnt < gaKnightPlayerId.length; iKnightCnt++) {

        // 騎士プレイヤーのIDを取得する
        iKnightId = gaKnightPlayerId[iKnightCnt];
        Log("6455:騎士：" + iKnightId);

        // 騎士が生きていて、かつ、殺害リストに含まれない場合
        if (CheckMatchArray(iKnightId, aKill) == false && gaPlayer[iKnightId].bLive == true) {
            Log("6455:aKill.push騎士：" + iKnightId);
            // 殺害リストに追加する
            aKill.push(iKnightId);
        }
    }
    // 殺害リストをソートする
    aKill.sort(function (a, b) { return a - b; });

    return aKill;
}

/****************************************************
    関数名    GetSuspectPlayers
    機能        疑われたプレイヤーの１位となるプレイヤーリストを取得する

    入力        aSuspectPoint        各プレイヤーの疑いポイント
    出力        aSuspectPlayer        疑われたプレイヤーのIDリスト

    処理概要
        1. aSuspectPointをコピーする。
        2. コピーした配列を降順ソートする
        3. 0要素の値（最大値）を取得する
        4. aSuspectPointに対して繰り返す
         4.1. 最大値と対象ポイントが等しい場合
          4.1.1. 対象となるプレイヤーIDを返却配列にpushする
        5. 返却配列を返して終了する
****************************************************/
function GetSuspectPlayers(aSuspectPoint) {
    var aSuspectPlayer = [];

    // 配列をコピーする
    var aSortPoint = [];
    aSortPoint = aSuspectPoint.concat();

    // ポイントをソートする
    //aSortPoint.sort().reverse();
    aSortPoint.sort(function (a, b) { return a - b; }).reverse();

    var iMaxPoint = aSortPoint[0];

    // 最大値が1以下の場合 ver.2.8 疑いが1の場合は、疑われているうちに数えない。反則対応
    if (iMaxPoint <= 1) {
        // 空の配列を返す
        return [];
    }

    // ポイント配列に対して繰り返す
    var iCnt;
    for (iCnt = 0; iCnt < aSuspectPoint.length; iCnt++) {

        // 最大値と対象ポイントが等しい場合
        if (iMaxPoint == aSuspectPoint[iCnt]) {
            // 対象となるプレイヤーIDを返却配列に格納する
            aSuspectPlayer.push(iCnt);
        }
    }

    // プレイヤーIDリストを返して終了する
    return aSuspectPlayer;
}

/****************************************************
    関数名    InitTimer
    機能        タイマーを初期化し、タイマーをスタートする。

    入力        なし
    出力        なし

    処理概要
        1. タイマーを初期化する
        2. 毎秒タイマーをデクリメントさせる
****************************************************/
var giMorningTimerSec = 0;
function InitTimer() {
    // スマホがスリープしないようにする
    if (gbIsApp) {
        window.plugins.insomnia.keepAwake();
    }

    // ゲームをセーブする
    SaveGame("Timer");

    // レインマン対応 ver.9.0.2
    // レインマンが生きている場合の処理
    if (gbRainManLifeFlg == true) {
        // 背景を雨にする
        $(".TitlePageMorning").css("background-image", "url(img/Background_RainSky.jpg)");
    } else {
        $(".TitlePageMorning").css("background-image", "url(img/Background_Morning.jpg)");
    }

    var iInterval = 1000;

    // タイトルを変更する
    $("#Timer .ImageTitle").text("The " + goDateText[giDateNum] + " Morning");

    // タイマーを初期化する
    giMorningTimerSec = giMin * 60 + 1;

    // 毎秒タイマーをデクリメントさせる
    PlusTimer(giMorningTimerSec, true, "#Timer .TimerBox");

    // タイマーをクリアしてから再度、カウントダウンさせる
    /*
    clearInterval(giTimer);
    giMorningTimerSec = CountDownTimer(giMorningTimerSec, '#Timer .TimerBox');
    giTimer = setInterval("giMorningTimerSec = CountDownTimer(giMorningTimerSec, '#Timer .TimerBox');", iInterval);
    */

    // 朝の開始のタイミングで
    // 朝の音楽をループ再生する
    PlayAudio('audio/MorningLoop.mp3');

    // バグ対応 Morningに設定されたcurrentクラスを削除する
    $("#Morning").removeClass('current');

    // GMツールを初期化する
    InitGmTool(gbGmToolFlg);

    // ゲームマスターツールがオンの場合
    if (gbGmToolFlg == true) {
        // ゲームマスターツールを表示する
        $(".GameMasterToolButton").show();
    } else {
        $(".GameMasterToolButton").hide();
    }

    // カード枚数を表示する
    ShowRoleList("#Timer .Role");


    return;

}



/****************************************************
    関数名    CountDownTimer
    機能        タイマーをカウントダウンする

    入力        iSec    現在の秒数
            sId        Timer表示オブジェクトID
    出力        iSec    現在の秒数

    処理概要
****************************************************/
function CountDownTimer(iSec, sId) {

    var sMin;
    var sSec;
    var sTime;

    // 秒数をデクリメントする
    iSec--;

    // 1分をすぎると背景色を赤に変更する
    if (iSec <= 60) {
        $(sId).removeClass("BgBlue");
        $(sId).addClass("BgRed");
    } else {
        $(sId).removeClass("BgRed");
        $(sId).addClass("BgBlue");
    }

    // 0秒以下になったらストップする
    if (iSec <= 0) {

        // 秒数がマイナスになった場合用に初期化
        iSec = 0;

        clearInterval(giTimer);

        // 裁判の場合
        if (sId.indexOf("Judgement") > 0) {
            // タイムアップの音を再生する
            PlayAudio("audio/BellShort.mp3");
        } else {
            // 朝音声をストップする
            PlayAudio('audio/MorningLoop.mp3', true);

            // タイムアップの音を再生する
            PlayAudio('audio/Bell.mp3', true);
            PlayAudio("audio/Bell.mp3");
        }

    }

    // 分表示を作成する
    sMin = Math.floor(iSec / 60);
    sSec = iSec % 60;

    if (sMin < 10) {
        sMin = "0" + sMin;
    }
    if (sSec < 10) {
        sSec = "0" + sSec;
    }
    var sTime = sMin + ":" + sSec;

    // タイマーを表示する
    $(sId).text(sTime);

    return iSec;
}

/****************************************************
    関数名    PlusTimer
    機能        タイマーの秒数を増やす

    入力        iSec         追加時間 / 固定設定時間
                bFixFlg     固定時間設定モード： true:指定の時間を設定する。false:現在時間にプラスする
                sOutputDomClass タイマーを表示するDomClass
    出力        なし

    処理概要
        1. Timerの秒数を増やす
        2. タイマー（giTimer）をクリアしてから、再度、スタートする
****************************************************/
function PlusTimer(iSec, bFixFlg, sOutputDomClass) {

    var iInterval = 1000;

    // 固定時間設定の場合
    if (bFixFlg) {
        giMorningTimerSec = iSec;
    } else {
        // タイマーを増やす
        giMorningTimerSec += iSec;
    }

    // 画面上の数字を更新する
    giMorningTimerSec = CountDownTimer(giMorningTimerSec, sOutputDomClass);

    // プラスの場合
    if (iSec > 0) {
        // タイマーをクリアしてから再度、カウントダウンさせる
        clearInterval(giTimer);

        // 毎秒タイマーをデクリメントさせる
        giTimer = setInterval("giMorningTimerSec = CountDownTimer(giMorningTimerSec, '" + sOutputDomClass + "');", iInterval)
    }
    return;
}

/****************************************************
    関数名    InitShowNextPage
    機能        ShowNextPageで表示切り替えするメッセージDIVを
            初期化する。

    g入力    giNowPageNum
    入力        sId        対象となるページID
    出力        なし

****************************************************/
var giNowPageNum = 1;
function InitShowNextPage(sId) {
    var sDivId = sId + " .GmMessageCenter .Message";
    $(sDivId).hide();

    // 1ページ目を表示する
    giNowPageNum = 1;
    sDivId = sId + " .GmMessageCenter .Page1";
    Log("4115:" + sDivId);
    $(sDivId).show();

}

/****************************************************
    関数名    InitTitleJudgement
    機能        裁判の説明画面を初期化する

    入力        なし
    出力        なし

    処理概要    1. 説明文言の表示順を初期化する
            2. タイトルを差し替える
            3. データを保存する
****************************************************/
function InitTitleJudgement() {

    // スマホのスリープが可能な状態に戻す
    if (gbIsApp) {
        window.plugins.insomnia.allowSleepAgain();
        Log("スリープ可能状態に変更");
    }

    // 次の画面を初期化する
    gsNextPage = "#Title_Night";

    // 本日の処刑先を初期化する（霊媒師の結果表示用 ver.9.8.3）
    giYesterdayJudge = -1;

    // データを保存する
    SaveGame('Judgement');

    // 説明文言を初期化する
    InitShowNextPage('#Title_Judgement');
    InitShowNextPage('#Title_JudgementShort');

    // タイトルを差し替える
    $("#Title_Judgement .ImageTitle").text("The " + goDateText[giDateNum] + " Vote");
    $("#Title_JudgementShort .ImageTitle").text("The " + goDateText[giDateNum] + " Vote");

    // 殺害されたプレイヤーが存在する場合
    if (giLastDeadId > -1) {
        // 起点となる最後に殺害されたプレイヤー名を表示する
        $("#Title_Judgement .PlayerName").text(gaPlayer[giLastDeadId].sName + gsSan);
        $("#Title_Judgement .LastDeadPlayerExist").show();
        $("#Title_JudgementShort .PlayerName").text(gaPlayer[giLastDeadId].sName + gsSan);
        $("#Title_JudgementShort .LastDeadPlayerExist").show();

    } else {
        $("#Title_Judgement .LastDeadPlayerExist").hide();
        $("#Title_JudgementShort .LastDeadPlayerExist").hide();
    }

    // 投票スタイルにあわせた説明を表示する ver.9.5
    $(".Title_Judgement_VotingStyle").hide();
    $(".Title_Judgement_" + gsVotingStyle).show();

    return;
}

/****************************************************
    関数名    InitJudgement
    機能        審判画面を初期化する

    入力        sOutputId    出力先DivId
            sTemplateId    テンプレートDivId
    G入力    gaPlayer
    出力        なし

    処理概要
        0. 投票プレイヤー番号を初期化する
        1. 全プレイヤーに対して繰り返す
         1.1. 対象のプレイヤーが生きている場合
          1.2.1. テンプレートHTMLをクローンする
          1.2.2. 複製したHTMLを出力先DIVに加える
          1.2.3. テンプレート内の変数を差し替える
          1.2.4. 複製したHTMLを表示する
****************************************************/
function InitJudgement(sOutputId, sTemplateId) {

    var iCnt = 0;

    // タイマーを停止する （各プレイヤーごとに停止する）
    //clearInterval(giTimer);

    // 投票プレイヤー番号を初期化する
    giNowPlayerId = 0;

    // 当選者IDを初期化する
    giTopVotePlayerId = -1;

    // - Undo Button を非表示にする ver.11.1
    $("#Judgement .UndoVoteBox").hide();

    // 投票するプレイヤーの順番を作成する
    gaVotePlayerId = GetVotePlayerIdList();

    // 投票数を初期化する
    gaVoteNum = InitArray(0, gaPlayer.length);
    for (var iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++){
        // 投票したプレイヤーリストを初期化する
        gaPlayer[iPlayerCnt].aVotePlayers = [];
    }

    // 決選投票プレイヤーを初期化する
    gaTopVotePlayerId = [];

    // 再投票フラグを初期化する
    gbReVoteFlg = false;

    // 処刑なしフラグを初期化する
    gbNoKillingFlg = false;

    // リストを初期化する
    $(sOutputId).empty();

    // タイトルを変更する
    $("#Judgement .ImageTitle").text("The " + goDateText[giDateNum] + " Vote")

    // 説明文言を初期化する
    $("#Judgement .Explain").hide();
    $("#Judgement .Default").show();
    //    $("#Judgement .FinalJudgement").hide();
    //    $("#Judgement .DrawJudgement").hide();

    // 投票結果を表示しない場合
    switch (gsVotingStyle) {
        case "VotingStyleSeat":
            $("#Judgement .VoteQuestion").hide();
            $("#Judgement .VoteNum").show();
            // ver 11.1 デザイン変更 2022.04.02
            // $("#Judgement .VotePlayerList").show();
            $("#Judgement .VotePlayerShowMode").show();
            break;

        case "VotingStyleFree":
            $("#Judgement .VoteQuestion").hide();
            $("#Judgement .VoteNum").show();
            //$("#Judgement .VotePlayerList").hide();
            $("#Judgement .VotePlayerShowMode").show();
            break;

        case "VotingStyleAnonymous":
            $("#Judgement .VoteQuestion").show();
            $("#Judgement .VoteNum").hide();
            //$("#Judgement .VotePlayerList").hide();
            $("#Judgement .VotePlayerShowMode").hide();
            break;
    }
    // ver 11.1 デザイン変更 2022.04.02
    $("#Judgement .VotePlayerList").hide();

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象のプレイヤーが生きている場合
        if (gaPlayer[iCnt].bLive == true) {

            // テンプレートHTMLをコピーする
            var htmlTemplate = $(sTemplateId).clone();
            htmlTemplate.removeAttr("style");
            htmlTemplate.removeClass("PlayerBox");
            htmlTemplate.addClass("Player" + iCnt);

            // HTMLに加える
            htmlTemplate.appendTo(sOutputId);

            // プレイヤー名を表示する
            htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);

            // ボタンにiPlayerIdを設定する
            var sButtonHtml = MakeVoteActionButtonHtml(iCnt, giNowPlayerId);
            htmlTemplate.find('.ActionButton').html(sButtonHtml);

            // プレイヤーにポイントを加算する
            gaPlayer[iCnt].iAddPoint += giPoint["Alive"];
            gaPlayer[iCnt].iTotalPoint += giPoint["Alive"];
        }

    }

    // 生き残りポイントの値をセーブする →セーブしない（Continueするたびにインクリメントされるのを防ぐ）
    // SaveData("gaPlayer");

    // 現在のプレイヤーの投票状態にする
    SetNowJudgement();

    // ページを移動する
    jQT.goTo("#Judgement", "fade");


}

/****************************************************
    関数名    GetVotePlayerIdList
    機能        投票するプレイヤーのIDを登録する。
            前回、死亡したプレイヤーのIDから順番にID番号をインクリメントして
            追加していく。存在しないプレイヤーIDの場合は、対象カウントから
            プレイヤー数を引いた値を、プレイヤーIDとして格納する。

            前回死亡したプレイヤーID=4の場合で、プレイヤー数9の場合
            [4,5,6,7,8,0,1,2,3]を返す

    G入力    giLastDeadId
    出力        aVotePlayerId

    処理概要    1. プレイヤー数に対して繰り返す
             1.1. プレイヤーIDが最大値を超えている場合
              1.1. プレイヤーID - プレイヤー数 を格納
             1.2. プレイヤーIDが最大値を超えない場合
              1.2.1. プレイヤーIDを格納
             1.3. プレイヤーIDをインクリメントする
            2. 配列を返して終了する
****************************************************/
function GetVotePlayerIdList() {
    var iCnt;
    var iPlayerId = 0; // 初期状態では最初の人が投票する
    var aVotePlayerId = [];

    // 席順投票の場合
    if (gsVotingStyle == "VotingStyleSeat") {
        // すでに殺害が起きている場合
        if (giLastDeadId > -1) {
            // 最後に処刑された人を開始番号にする
            iPlayerId = giLastDeadId;
        }
    }

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // プレイヤーIDが最大値を超えている場合
        if (iPlayerId >= gaPlayer.length) {
            aVotePlayerId[iCnt] = iPlayerId - gaPlayer.length;
        } else {
            aVotePlayerId[iCnt] = iPlayerId;
        }
        // プレイヤーIDをインクリメントする
        iPlayerId++;
    }
    Log("2495:aVotePlayerId=" + aVotePlayerId + "/giLastDeadId=" + giLastDeadId);
    return aVotePlayerId;
}

/****************************************************
    関数名    SetNowJudgement
    機能        現在のプレイヤーにあわせて、投票画面を初期化する。
            giNowPlayerIdをグローバル値と
            gaVotePlayerId[giNowPlayerId]をグローバル値として使う


    G入力    giNowPlayerId                    現在のプレイヤー順（0から始まる）
            gaVotePlayerId[giNowPlayerId]    投票プレイヤー配列番号
    出力        なし

    処理概要
        0. 対象プレイヤーが死んでいる場合
         0.1. プレイヤー番号をインクリメントして、再実行する
        1. 説明文言のプレイヤー名を更新する
        2. すべての投票ボタンを表示する
        3. 現在のプレイヤーの投票ボタンを非表示にする
****************************************************/
function SetNowJudgement() {

    // 対象プレイヤーを前回死亡した人を基準とした順番に置き換える
    var iVotePlayerId = gaVotePlayerId[giNowPlayerId];

    // 対象プレイヤーが死んでいる場合（スキップする）
    if (gaPlayer[iVotePlayerId].bLive == false) {
        giNowPlayerId++;

        // 最後の投票の場合
        if (giNowPlayerId >= gaPlayer.length) {

            // 投票結果を表示する
            CheckJudgementResult(gaVoteNum);
            return;

        } else {

            // 裁判画面を更新する
            SetNowJudgement();
            return;
        }
    }

    // 再投票の場合の特殊処理
    if (gbReVoteFlg == true) {

        // 今のプレイヤーが決戦投票をされるプレイヤーの場合
        if (CheckMatchArray(iVotePlayerId, gaTopVotePlayerId) == true) {
            // 次のプレイヤーに飛ばす
            giNowPlayerId++;

            // 最後の投票者だった場合
            if (giNowPlayerId >= gaPlayer.length) {

                // 投票結果を表示する
                CheckJudgementResult(gaVoteNum);
                return;

                // 次の投票者がいる場合
            } else {
                // 次のプレイヤーを表示する
                SetNowJudgement();
                return;
            }
        }

    }


    // 以下は、対象のプレイヤーが生きている場合 **************

    // 投票者のリストボックスを表示する
    //（ただし、投票モード上、非表示の場合は "VotePlayerShowMode"の表示制御によって
    // 表示されないケースもある。
    $("#Judgement .PlayerListBox").show();
    // すべてのプレイヤーの投票ボタンを表示する
    $("#Judgement .ActionButton").show();
    // 現在の投票者マークを非表示にする
    $("#Judgement .VotingPlayer").hide();
    //$("#Judgement .PlayerBoxBg").css("background-color", "rgba(215,106,0, 0.5)");


    // 説明文言のプレイヤー名を更新する
    // 投票スタイルが「自由投票」でない場合
    if (gsVotingStyle != "VotingStyleFree") {
        $("#Judgement .GmMessageCenter .VotingStyleSeat").show();
        $("#Judgement .GmMessageCenter .VotingStyleFree").hide();

        // 投票者名を表示する
        $("#Judgement .GmMessageCenter .PlayerName").text(gaPlayer[iVotePlayerId].sName + gsSan);
        // 投票者のボタンだけを非表示にする
        $("#Judgement .Player" + iVotePlayerId + " .ActionButton").hide();
        // $("#Judgement .Player" + iVotePlayerId).css("background-color", "rgba(106, 106, 215, 0.5)");
        $("#Judgement .Player" + iVotePlayerId + " .VotingPlayer").show();

    // 自由投票の場合
    } else {
        $("#Judgement .GmMessageCenter .VotingStyleSeat").hide();
        $("#Judgement .GmMessageCenter .VotingStyleFree").show();

    }

    // 秘密投票でない場合、かつ当選者が設定されている場合
    if (gsVotingStyle != "VotingStyleAnonymous") {
        
        // Undoボタンをいったん非表示にする
        $("#Judgement .UndoVoteBox").hide();

        // 全員の投票数を調べる
        for (var iCnt = 0; iCnt < gaVoteNum.length; iCnt++){
            // 投票数がゼロでない場合
            if (gaVoteNum[iCnt] > 0) {
                // Undoボタンを表示する
                $("#Judgement .UndoVoteBox").show();
                break;
            }
        }
    }

    // 投票状況を表示する 「残り投票数：XX票」
    var iLastVoteNum = GetLastVoteNum();
    $("#Judgement .GmMessageCenter .VotingStatus").text(iLastVoteNum + gsHyou);



    // タイマー表示モードの場合
    if (giJudgementTimer > 0 && giJudgementTimer != undefined) {
        $("#Judgement .TimerArea").show();
        // タイマーをスタートする
        var iInterval = 1000;
        giMorningTimerSec = giJudgementTimer + 1;


        // 毎秒タイマーをカウントダウンさせる
        // 表示秒数を初期化する
        PlusTimer(giMorningTimerSec, true, "#Judgement .TimerArea .TimerBox");
        /*
        clearInterval(giTimer);
        giTimer = setInterval("giMorningTimerSec = CountDownTimer(giMorningTimerSec, '#Judgement .TimerArea .TimerBox');", iInterval);
        */

        // タイマー非表示モードの場合
    } else {
        $("#Judgement .TimerArea").hide();
    }

    // 画面を一番上にスクロールする
    //    var gsPlatform = CheckPlatform();
    if (gsPlatform == "Android") {
        $(document).scrollTop(0);

    }

    return;
}

/****************************************************
    関数名    GetLastVoteNum
    機能        残りの投票数を取得する。
            取得方法は、
            ・gaVotePlayerId : 投票順リストの数
            ・gaTopVotePlayerId : 決選投票時の決戦プレイヤー配列の数
            ・gaVoteNum : 現在の投票数リストの投票値の合計
            の3つを使って計算を行う。
            （新たにグローバル変数を作成しない）

    入力        なし
    出力        iLastVoteNum

    処理概要
            1. 投票者全体の数を取得する
            2. 決選投票対象者（票数から除外）を取得する
            3. gaVoteNumに対して繰り返す
             3.1. 投票数の合計値を合算する
            4. 投票数全体から、投票除外者数とすでに投票された票数を差し引く
            5. 残りの票数を返して終了する
****************************************************/
function GetLastVoteNum() {

    var iPlayerAllNum = 0;

    // 投票総数
    for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        if (gaPlayer[iCnt].bLive == true) {
            iPlayerAllNum++;
        }
    }

    // 除外される投票者の数
    var iNoVoteNum = gaTopVotePlayerId.length;

    // 現在の投票リストに対して繰り返す
    var iVoteSum = 0;
    for (iCnt = 0; iCnt < gaVoteNum.length; iCnt++) {
        // 投票数を加算する
        iVoteSum += gaVoteNum[iCnt];
    }

    // 投票数全体から除外プレイヤー数と、すでに投票された票数を差し引く
    var iLastVoteNum = iPlayerAllNum - iNoVoteNum - iVoteSum;

    return iLastVoteNum;


}

/****************************************************
関数名    MakeVoteActionButtonHtml
機能        審判ページでのアクションボタンを作成する

入力        iToPlayerId        投票対象プレイヤーID
出力        sHtml            出力HTML（アクションボタン）

処理概要
    1. ボタンHTMLのテンプレートを作成する
    2. ボタンHTMLを返して終了する
****************************************************/
function MakeVoteActionButtonHtml(iToPlayerId) {

    // ボタンHTML
    var sHtml = goButtonText["Vote"];
    sHtml = sHtml.replace("[VALUE]", iToPlayerId);

    return sHtml;
}

/****************************************************
関数名    VoteAction
機能        審判でのアクションを実行する。実行完了する前に、confirmを出す。

入力        iToPlayerId        投票対象プレイヤーID
G入力    giNowPlayerId    投票プレイヤーID
出力        なし

処理概要
    1. 確認アラート用テキストを作成する
    2. 確認アラートを表示する
****************************************************/
function VoteAction(iToPlayerId) {

    // 確認フォームを表示する
    var sFunction = "DoneVoteAction(" + iToPlayerId + ")";
    var aMessage = GetAlertMessage("VoteAction", gaPlayer[iToPlayerId].sName);
    ShowConfirm(aMessage[0], aMessage[1], sFunction);

    return;

}

/****************************************************
    関数名    DoneVoteAction
    機能        投票を実行する

    入力        iToPlayerId        投票対象プレイヤーId
    G入力    giNowPlayerId    投票プレイヤーId
    G出力    gaVoteNum        投票数リスト

    処理概要
        1. 対象プレイヤーの投票数をインクリメントする
        2. 投票数の順位を算出する
****************************************************/
var giTopVotePlayerId = -1;

function DoneVoteAction(iToPlayerId) {

    // 投票者の配列番号
    var iVotePlayerId = gaVotePlayerId[giNowPlayerId];

    // 対象プレイヤーの投票数をインクリメントする
    gaVoteNum[iToPlayerId]++;
    $("#Judgement .Player" + iToPlayerId + " .VoteNum").text(gaVoteNum[iToPlayerId]);

    // 投票数の順位をチェックする
    var iRanking = GetRank(gaVoteNum[iToPlayerId], gaVoteNum);

    // 投票数が1位の場合
    if (iRanking == 1) {
        // 当選者のIDを更新する
        giTopVotePlayerId = iToPlayerId;
    }

    // 投票者が一人目の場合
/*    if (gaVoteNum[iToPlayerId] == 1) {
        $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").html(gaPlayer[iVotePlayerId].sName);

        // 二人以降の場合
    } else {
        sVotePlayerList = $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").html();
        $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").html(sVotePlayerList + " / " + gaPlayer[iVotePlayerId].sName);

    }
*/

    // ver.11.1 デザイン変更 2022.04.02
    gaPlayer[iToPlayerId].aVotePlayers.push(iVotePlayerId);
    // 投票したプレイヤーに対して繰り返す
    var iVotePlayerId = "";
    var sVotePlayerName = "";
    var sVotePlayerHtml = "";
    for (var iCnt = 0; iCnt < gaPlayer[iToPlayerId].aVotePlayers.length; iCnt++){
        // 投票したプレイヤーの名前
        iVotePlayerId = gaPlayer[iToPlayerId].aVotePlayers[iCnt];
        sVotePlayerName = gaPlayer[iVotePlayerId].sName;
        sVotePlayerHtml = sVotePlayerHtml + "<div>" + sVotePlayerName + "</div>";
    }
    $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").html(sVotePlayerHtml);
    $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").show();

    // 現在のプレイヤーの順番をインクリメントする
    giNowPlayerId++;

    // 裁判タイマーが有効の場合
    if (giJudgementTimer > 0) {
        // タイマーをストップする
        clearInterval(giTimer);
        //giMorningTimerSec = CountDownTimer(0, '#Judgement .TimerBox');
        giMorningTimerSec = 0;

    }

    // 画面のリロードをする（画面上部にスクロールさせたい）
    location.href = "#Judgement";

    // 最後の投票の場合
    if (giNowPlayerId >= gaPlayer.length) {

        // 投票結果を表示する
        CheckJudgementResult(gaVoteNum);

        // 次の投票がある場合
    } else {

        // 投票画面を初期化する
        SetNowJudgement();
    }
}

/****************************************************
    関数名    UndoVote
    機能      直前の投票を取り消す。
    
    入力     なし
****************************************************/
function UndoVote() {
    var iToPlayerId = -1;

    // - giNowPlayerIdを一つ前に戻す
    giNowPlayerId--;

    // - 最初の人になったら Undoボタンを非表示にする
    if (giNowPlayerId == 0) {
        $("#Judgement .UndoVoteBox").hide();
    }

    // 投票者の配列番号
    var iVotePlayerId = gaVotePlayerId[giNowPlayerId];
    var iLastVotedPlayer = -1;
    var iPlayerCnt = 0;

    // 前のプレイヤーが誰に投票したか調べる
    for (iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++){
        // 対象プレイヤーへの投票数がゼロでない場合
        if (gaVoteNum[iPlayerCnt]>0) {
            // 対象のプレイヤーに投票している場合（必ず、リストの最後に格納されている）
            iLastVotedPlayer = gaPlayer[iPlayerCnt].aVotePlayers.slice(-1)[0];
            
            // 対象のプレイヤーに投票している場合
            if (iLastVotedPlayer == iVotePlayerId) {
                // 投票数を１つ減らす
                gaVoteNum[iPlayerCnt]--;

                // 投票先のPlayerIdを格納する
                iToPlayerId = iPlayerCnt;

                // 繰り返しを終了する
                break;
            }
        }
    }

    // 投票リストから最後の投票者IDを削除する
    gaPlayer[iToPlayerId].aVotePlayers.pop();

    $("#Judgement .Player" + iToPlayerId + " .VoteNum").text(gaVoteNum[iToPlayerId]);

    // 投票数がゼロになった場合
    if (gaVoteNum[iToPlayerId] == 0) {
        // 投票者リストを非表示にする
        $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").hide();

    // 投票者がいる場合
    } else {
        // 投票したプレイヤーに対して繰り返す
        var iVotePlayerId = "";
        var sVotePlayerName = "";
        var sVotePlayerHtml = "";
        for (var iCnt = 0; iCnt < gaPlayer[iToPlayerId].aVotePlayers.length; iCnt++){
            // 投票したプレイヤーの名前
            iVotePlayerId = gaPlayer[iToPlayerId].aVotePlayers[iCnt];
            sVotePlayerName = gaPlayer[iVotePlayerId].sName;
            sVotePlayerHtml = sVotePlayerHtml + "<div>" + sVotePlayerName + "</div>";
        }
        $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").html(sVotePlayerHtml);
        $("#Judgement .Player" + iToPlayerId + " .VotePlayerList").show();
    }

    // 裁判タイマーが有効の場合
    if (giJudgementTimer > 0) {
        // タイマーをストップする
        clearInterval(giTimer);
        //giMorningTimerSec = CountDownTimer(0, '#Judgement .TimerBox');
        giMorningTimerSec = 0;

    }

    // 画面のリロードをする（画面上部にスクロールさせたい）
    location.href = "#Judgement";

    // 投票画面を初期化する
    SetNowJudgement();
}

/****************************************************
    関数名    CheckJudgementResult
    機能        投票結果が１人に絞られた場合、投票結果ページを初期化して移動する。
            投票結果が二人以上いる場合、決選投票用にしぼってリストを表示する。

    入力        aVoteList    投票数リスト
    出力        なし

    処理概要
        1. 投票リストのコピーをソートする
        2. １位の点数を確保する
        3. 2位の点数と1位の点数が異なる場合
         3.1. 投票結果画面を初期化する
         3.2. 投票結果ページに移動して終了する
        4. 投票リストに対して繰り返す
         4.1. 1位の投票数よりも少ない場合
          4.1.1. 対象プレイヤーの投票ボックスを非表示にする
        5. 説明文言を差し替える
****************************************************/
var gbReVoteFlg = false;
var gbNoKillingFlg = false;
var gaTopVotePlayerId = [];
function CheckJudgementResult(aVoteList) {
    var iCnt;
    var sTopPlayer = "";
    var aTopPlayer = [];
    var aMessage = [];

    // Undoボタンを非表示する ver.11.1
    $("#Judgement .UndoVoteBox").hide();


    // ソート用にコピーする
    var aSortVoteList = [];
    aSortVoteList = aVoteList.concat();

    // 数字ソートするには、sortにコンパレータを設定すること
    aSortVoteList.sort(function (a, b) { return a - b; }).reverse();

    // 投票の結果：
    // ・1人に絞られた　・ドロー（全員1票）　・決選投票（人数がさらにしぼられた場合を含む）
    // ・票割れ判定（ランダム処刑　・処刑なし　・「ランダム処刑」「処刑なし」の選択）
    // という結果を判断する
    //
    // また、決選投票対象 gaTopVotePlayerId を更新する。
    // 決選投票対象の人数：giFinalVoteTarget を更新し、２回、同じ人数で決選投票が行われたかをチェックする
    var sVoteResult = CheckVoteResult(aVoteList, aSortVoteList);

    Log("7573***:" + sVoteResult);

    // 投票結果によって処理を分岐させる
    switch (sVoteResult) {
        case "OnlyOne":
            // 処刑対象者のコメントを設定する
            aMessage = GetAlertMessage("JudgementResultPerson", gaPlayer[giTopVotePlayerId].sName);
            $("#JudgementResult .JudgementButton .JudgementText").text(aMessage[1]);
            $("#JudgementResult .JudgementButton .NA_Random").hide();
            $("#JudgementResult .JudgementButton .NA_Normal").show();

            // 処刑画面を更新し、移動する
            GoToJudgementResult(giTopVotePlayerId);

            return;

        case "Draw":
            // 説明文言を差し替える
            $("#Judgement .Default").hide();
            $("#Judgement .DrawJudgement").show();

            // 決選投票者を初期化する
            gaTopVotePlayerId = [];

            // 再投票ボタンを表示し、プレイヤーリストを非表示にする
            $("#Judgement .ReVoteButton").show();
            $("#Judgement .PlayerListBox").hide();

            // 投票プレイヤー番号を初期化する
            giNowPlayerId = 0;

            return;

        // 決戦投票の場合
        case "ReVote":

            // 全プレイヤーに対して繰り返す 投票ボックスの表示非表示を行う
            for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

                // 決選候補者の場合
                if (aVoteList[iCnt] == aSortVoteList[0]) {

                    // 決選投票者の名前を連結する
                    if (sTopPlayer == "") {
                        sTopPlayer = gaPlayer[iCnt].sName + gsSan;
                    } else {
                        sTopPlayer += " / " + gaPlayer[iCnt].sName + gsSan;
                    }

                    // 決選投票対象外のプレイヤーの場合
                } else {
                    // 対象プレイヤーの投票ボックスを非表示にする
                    $("#Judgement .Player" + iCnt).hide();
                }

            }

            // 説明文言を差し替える
            $("#Judgement .Explain").hide();
            $("#Judgement .FinalJudgement").show();
            $("#Judgement .FinalJudgement .PlayerName").text(sTopPlayer);

            // 投票割れの説明を「投票割れ時の判決」設定にあわせて切り替える
            $("#Judgement .SameVoteExplain").hide();
            $("#Judgement ." + gsSameVote).show();

            // 再投票フラグをオンにする
            gbReVoteFlg = true;

            // 再投票ボタンを表示し、プレイヤーリストを非表示にする
            $("#Judgement .ReVoteButton").show();
            $("#Judgement .PlayerListBox").hide();

            // 投票プレイヤー番号を初期化する
            giNowPlayerId = 0;
            return;

        case "SameVote":

            // 決選投票者情報を初期化する
            gaTopVotePlayerId = [];

            // 票割れモードによって切り替える
            switch (gsSameVote) {
                case "SameVoteRandom":

                    // ランダム処刑をする
                    KillAtRandom(aVoteList, aSortVoteList);

                    return;

                case "SameVoteNoKilling":
                    // 説明文言を差し替える
                    $("#Judgement .Default").hide();
                    $("#Judgement .NoKilling").show();

                    // 処刑なしボタンを表示し、プレイヤーリストを非表示にする
                    $("#Judgement .NoKillingButton").show();
                    $("#Judgement .PlayerListBox").hide();

                    // 「処刑なし」説明画面を表示した状態で終了
                    gbNoKillingFlg = true;
                    return;

                case "SameVoteSelectable":
                    // 「ランダム処刑」と「処刑なし」の確認画面に移動する
                    // 説明文言を差し替える
                    $("#Judgement .Default").hide();
                    $("#Judgement .Selectable").show();

                    // 選択ボタンを表示し、プレイヤーリストを非表示にする
                    $("#Judgement .SelectableButton").show();
                    $("#Judgement .PlayerListBox").hide();
                    return;

                default:
                    break;
            }

            return;

        default:
            break;
    }


    // 終了する
    return;
}


/****************************************************
    関数名    KillAtRandomByButton
    機能    「ランダム処刑ボタン」によってランダム処刑を行う

    入力    なし
    出力    なし
****************************************************/
function KillAtRandomByButton() {

    // ソート用にコピーする
    var aSortVoteList = [];
    aSortVoteList = gaVoteNum.concat();

    // 数字ソートするには、sortにコンパレータを設定すること
    aSortVoteList.sort(function (a, b) { return a - b; }).reverse();

    // ランダムに処刑する
    KillAtRandom(gaVoteNum, aSortVoteList);

}

/****************************************************
    関数名    KillAtRandom
    機能        ランダム処刑を行う

    入力        aVoteList    投票数（プレイヤー順）
                aSortVoteList    投票数（降順）
    出力
****************************************************/
function KillAtRandom(aVoteList, aSortVoteList) {
    var iCnt = 0;

    // 全プレイヤーに対して繰り返す 投票ボックスの表示非表示を行う
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 決選候補者の場合
        if (aVoteList[iCnt] == aSortVoteList[0]) {
            // 決戦候補者のプレイヤーIDを格納する（最終決定対象用）
            gaTopVotePlayerId.push(iCnt);
        }
    }

    Log("2967:" + gaTopVotePlayerId);

    // 票の割れたプレイヤーからランダムに1人を選び、決定とする
    //giTopVotePlayerId = gaTopVotePlayerId.selectRandom();
    giTopVotePlayerId = SelectRandom(gaTopVotePlayerId);

    // 審判画面を決戦投票の説明からデフォルト状態に戻す
    $("#Judgement .Default").show();
    $("#Judgement .FinalJudgement").hide();

    // 処刑対象者のコメントを設定する
    aMessage = GetAlertMessage("JudgementResultPersonRandom", gaPlayer[giTopVotePlayerId].sName);

    $("#JudgementResult .JudgementButton .JudgementText").text(aMessage[1]);
    $("#JudgementResult .NA_Random").show();
    $("#JudgementResult .NA_Normal").hide();


    // 処刑画面を処刑者にあわせて設定する
    GoToJudgementResult(giTopVotePlayerId);

    return;
}

/****************************************************
    関数名    CheckVoteResult
    機能
    // 投票の結果：
    // ・1人に絞られた "OnlyOne"
    // ・ドロー（全員1票）"Dwaw"
    //　・決選投票（人数がさらにしぼられた場合を含む）"ReVote"
    // ・票割れ判定（ランダム処刑　・処刑なし　・「ランダム処刑」「処刑なし」の選択）"SameVote"
    // という結果を判断する
    //
    // また、決選投票対象 gaTopVotePlayerId を更新する。
    // 決選投票対象の人数：giFinalVoteTarget を更新し、２回、同じ人数で決選投票が行われたかをチェックする

    入力    aVoteList    プレイヤー順の投票された数
            aSortVoteList    投票された数を、ソートしたリスト
    出力    sResult ： "OnlyOne", "Draw", "ReVote", "SameVote"
****************************************************/
function CheckVoteResult(aVoteList, aSortVoteList) {

    var aTopVotePlayerId = [];

    // 投票の結果、1人に絞られた場合
    if (aSortVoteList[0] > aSortVoteList[1] && aSortVoteList[0] > 1) {
        return "OnlyOne";
    }

    // ドローの場合（全員が１票→一位も１票）かつ決選投票でない
    if (aSortVoteList[0] == 1 && gbReVoteFlg == false) {
        return "Draw";
    }

    // 同票１位をリストに格納する
    // 全プレイヤーに対して繰り返す 投票ボックスの表示非表示を行う
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 決選候補者の場合
        if (aVoteList[iCnt] == aSortVoteList[0]) {

            // 決戦候補者のプレイヤーIDを格納する（再投票用）
            aTopVotePlayerId.push(iCnt);
        }
    }

    // 決選投票の結果、決戦対象が絞り込まれて、再び決戦投票を行う場合
    if (gaTopVotePlayerId.length != aTopVotePlayerId.length) {
        // 決選投票ターゲットを更新して、決選投票を行う
        gaTopVotePlayerId = aTopVotePlayerId.concat();

        return "ReVote";
    }

    // 決選投票を２回連続で行って、票割れ状態が同じ場合
    return "SameVote";

}


/****************************************************
    関数名    GoToJudgementResult
    機能        処刑画面を処刑される人にあわせて更新し、処刑画面へ移動する

    入力        iPlayerId    処刑されるプレイヤーID
    出力        なし
****************************************************/
function GoToJudgementResult(iPlayerId) {

    // 血のりを非表示にする
    $("#Blood").hide();

    // 処刑される人の名前を差し替える
    $("#JudgementResult .PlayerName").text(gaPlayer[iPlayerId].sName);

    // 処刑される人の写真を差し替える
    $("#JudgementResult .FaceImg").attr("src", gaPlayer[iPlayerId].imgFace);

    // ボタンを非表示にする
    $("#JudgementResult .JudgementButton").hide();

    // ver.9.0 闇の霊媒師を処刑した場合
    if (gaPlayer[iPlayerId].sRole == "DarkShaman") {
        // 翌日の朝、騎士とコスプレイヤーが死亡する
        gbDarkShamanKillKnightFlg = true;
    }

    // ver.9.8.7 運命の恋人が処刑された場合
    if (gaPlayer[iPlayerId].sRole == "DestinedLovers") {
        // 生存している運命の恋人に対して繰り返す
        for (var iLoverCnt = 0; iLoverCnt < gaDestinedLoversPlayerId.length; iLoverCnt++) {
            // 対象の「運命の恋人」が死んだプレイヤーの場合
            if (gaDestinedLoversPlayerId[iLoverCnt] == iPlayerId) {
                // 対象の「運命の恋人」生存リストを削除する
                gaDestinedLoversPlayerId.splice(iLoverCnt, 1);
            }
        }
    }

    // ver.10.0.6 レインマンバグ修正
    // レインマンが処刑された場合
    if (gaPlayer[iPlayerId].sRole == "RainMan") {
        // レインマン生存フラグをオフにする
        gbRainManLifeFlg = false;
    }

    // ver.9.8.3 処刑対象者を保存する（霊媒師用）
    giYesterdayJudge = iPlayerId;

    // 画面を切り替える
    jQT.goTo("#JudgementResult", "slideleft");
    //jQT.goTo("#JudgementResult","fade");

}

/****************************************************
    関数名    InitReVote
    機能        再投票画面を初期化する

    G入力    gaTopVotePlayerId    再投票されるプレイヤーのID
    出力        なし

    処理概要
        1. 投票プレイヤー番号を初期化する
        2. 投票画面の初期化をする
****************************************************/
function InitReVote() {

    // 投票プレイヤー番号を初期化する
    giNowPlayerId = 0;

    // 投票数を初期化する
    gaVoteNum = InitArray(0, gaPlayer.length);
    //$("#Judgement .VoteNum").text("Vote : 0");
    $("#Judgement .VoteNum").text("0");
    $("#Judgement .VotePlayerList").html("");
    $("#Judgement .VotePlayerShowMode").hide();

    // 説明ボックスを初期化する
    $("#Judgement .Explain").hide();
    $("#Judgement .Default").show();

    // 再投票ボタンを非表示し、プレイヤーリストを表示にする
    $("#Judgement .PlayerListBox").show();

    // 投票画面の初期化をする
    SetNowJudgement();

    return;
}


/****************************************************
    関数名    JudgementAnimation
    機能        血が飛び散るアニメーションを行い、そのあと、次のステージに遷移する。

    入力        なし
    出力        なし

    処理概要
        0. 処刑アニメーションを実行する
        1. ゲーム終了かどうかを判定する
        2. ゲーム終了でない場合
         2.1. 夜シーンへ移動する
        3. ゲーム終了の場合
         3.1. ゲーム終了結果画面に移動する
****************************************************/
function JudgementAnimation() {
    var aPlayerList = {};
    var sLoser = "";
    var aMessage = [];
    var sGameSetResult = 0;

    // ボタンを非表示にする
    $("#JudgementResult .JudgementButton").hide();

    // 処刑されたプレイヤーの生存フラグをオフにする
    gaPlayer[giTopVotePlayerId].bLive = false;

    // 最後に殺されたプレイヤーIDを一時保存する
    giLastDeadId = giTopVotePlayerId;

    // ゲーム終了かどうか判定する ( Werewolf / WerewolfWill / Citizen / 0 )
    sGameSetResult = CheckGameSetResult();

    // プレイヤーカウンターを初期化する ver.3.7 夜が飛ばされるバグ対応（正解か？）
    giNowPlayerId = 0;

    // ゲーム終了でない場合
    if (sGameSetResult == 0) {

        // 音を再生する
        PlayAudio("audio/Gun.mp3");

        // 処刑アニメーションを実行する
        aMessage = GetAlertMessage("JudgementResult", gaPlayer[giTopVotePlayerId].sName);

        // 次のページをセットする
        gsNextPage = "#Title_Night";

        $("#Blood .TextBoxOutput").text(aMessage[1]);
        $("#NA_JP_11").show();
        $("#Blood").show();



        // ゲーム終了の場合
    } else {

        // 結果画面を設定する
        // ver.10.1.0 結果画面リニューアル
        //        gsNextPage = "#Title_" + sGameSetResult + "Win";
        gsNextPage = "#GameOverResult";
        gsRemoteGameSetResult = sGameSetResult;
        Log("5708:gsNextPage=" + gsNextPage);

        // 結果画面の文言を更新する
        SetTextToWinPage(sGameSetResult);

        // 勝負決定サウンドを再生する
        PlayGameSetSound(sGameSetResult, false);

        // 処刑画像を表示する
        aMessage = GetAlertMessage("JudgementResultWin", gaPlayer[giTopVotePlayerId].sName);
        $("#Blood .TextBoxOutput").text(aMessage[1]);
        $("#NA_JP_11").hide();
        $("#Blood").show();

    }

    return;
}

/****************************************************
    関数名    SetTextToWinPage
    機能        勝負の結果画面のテキストを初期化する

    入力        sWinType    市民: Citizen、人狼: Werewolf、次の夜に人狼勝利:WerewolfWill, 吸血鬼:Vampire
    出力        なし

    処理概要
            1. 勝利者が市民の場合
             1.1. 勝利プレイヤーを"Citizen"にする
             1.2. 敗北プレイヤーを"Werewolf"にする
            2. 勝利者が市民でない場合
             2.1. 勝利プレイヤーを"Werewolf"にする
             2.2. 敗北プレイヤーを"Citizen"にする
            3. プレイヤーリスト（人狼チーム、市民チーム）を作成する
            4. 勝利プレイヤーリストを設定する
            5. 敗者プレイヤーリストを設定する
            6. 点数表示を更新する
            7. 吸血鬼カードを使用していない場合
             7.1. 吸血鬼に関する記載を非表示にする

    バージョンアップ
            2020.06.04 ver.10.1.0 結果画面リニューアル
             結果画面を "#GameOverResult"に集約する
****************************************************/
var gsWinner = ""; // GameSetのShare用
var gsPlayTime = ""; // GameSetのShare用
function SetTextToWinPage(sWinType) {
    var sWinner = "";
    Log("9199:SetTextToWinPage:" + sWinType);

    // 勝利者が市民の場合
    if (sWinType == "Citizen") {
        sWinner = "Citizen";

        // 勝利が吸血鬼の場合
    } else if (sWinType == "Vampire") {
        sWinner = "Vampire";
    } else {
        sWinner = "Werewolf";
    }

    // ゲーム結果のシェア用
    gsWinner = sWinner;

    // 勝利ポイント
    var iWinnerPoint = giPoint[sWinner + "Win"];

    // 画面上部の背景画像を差し替える
    //    $("#GameOverResult").css("background-image", "url(img/ResultHeader_" + sWinner + ".jpg)");
    $("#GameOverResult .BackgroundLayer").css("background-image", "url(img/ResultHeader_" + sWinner + ".jpg)");

    // Winnerチーム、Loserチームを設定する
    ShowTeamName("#GameOverResult .WinnerTeam", sWinner, "Winner");
    ShowTeamName("#GameOverResult .LoserTeam", sWinner, "Loser");

    // 勝利チームの説明を初期化する
    $('#GameOverResult .WinType').hide();
    $('#GameOverResult .WinType_' + sWinType).show();

    // ゲーム時間と日付を表示する
    $("#GameOverResult .GameOverResult_DATE").text(gsGameStartDate);
    gsPlayTime = GetGamePlayTime() + " mins";
    $("#GameOverResult .GameOverResult_TIME").text(gsPlayTime);

    // 富豪カードを使用している場合
    if (goCardNum["Rich"] > 0) {
        // 富豪が生きている場合
        if (CheckRichLive() == true) {
            // 点数を２倍にする
            iWinnerPoint = iWinnerPoint * 2;

            // 富豪名を更新する
            $(".RichRoleName").text(goRoleText["Rich"]);

            // 富豪のボーナスポイント説明を表示する
            $(".RichExplain").show();

        } else {
            // 富豪のボーナスポイントを非表示にする
            $(".RichExplain").hide();
        }
    } else {
        // 富豪のボーナスポイントを非表示にする
        $(".RichExplain").hide();
    }

    // プレイヤーリストを作成する（同時に、勝利ポイントの加算をする）
    //aPlayerList = MakeWinnerListHtml(sWinner, iWinnerPoint);
    MakeWinnerListHtml(sWinner, iWinnerPoint);

    // 役職結果を表示する
    //    $("#GameOverResult .WinnerListBox").html(aPlayerList["Winner"]);
    //    $("#GameOverResult .LoserListBox").html(aPlayerList["Loser"]);
    $("#GameOverResult .WinningPointShow").text(iWinnerPoint);

    // 吸血鬼カードを使用している場合
    if (goCardNum["Vampire"] > 0 || goCardNum["Bat"] > 0) {
        Log("5936:" + goCardNum["Vampire"]);
        // 吸血鬼に関する説明を表示する
        $(".VampireExplain").show();

        // 吸血鬼チーム名を更新する
        $(".VampireRoleName").text(goRoleText["Vampire"]);
    } else {
        // 吸血鬼に関する説明を非表示にする
        $(".VampireExplain").hide();
    }

    return;

}

/****************************************************
    関数名    GetGamePlayTime
    機能      ゲーム開始時の時間の保存と
             ゲーム終了時のプレイ時間の取得を行う。

    入力     bMode  true:ゲーム開始     false:プレイ時間取得
    出力     iTime  現在時間 or プレイ時間
****************************************************/
function GetGamePlayTime(bMode) {
    const aMonth = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    var dDate = new Date();
    var iNowTime = dDate.getTime();

    // 現在の時間を保存するモードの場合
    if (bMode) {
        giStartTime = iNowTime;

        // 今日の日付を作成する
        gsGameStartDate = dDate.getDate() + " " + aMonth[dDate.getMonth()] + ", " + dDate.getFullYear();

        return iNowTime;
    } else {
        Log("9329: iNow=" + iNowTime + " / giStartTime=" + giStartTime);
        var iGamePlayTime = (iNowTime - giStartTime) / 1000;
        var iGamePlayTimeMin = Math.ceil(iGamePlayTime / 60);
        return iGamePlayTimeMin;
    }
}


/****************************************************
    関数名    ShowTeamName
    機能      勝利チーム名、敗者チーム名を表示する

    入力     sOutputId  出力先DOM
            sWinner    勝利チーム(Werewolf, Citizen, Vampire)
            sTeamType   チーム種別(Winner,Loser)
    出力     直接DOMに出力
****************************************************/
function ShowTeamName(sOutputId, sWinner, sTeamType) {
    var sTeamName = "";

    // Winnerチームの表示の場合
    if (sTeamType == "Winner") {

        // 勝利チーム名を作成する
        sTeamName = goRoleText[sWinner] + gsTeam;

        // Loserチームの表示の場合
    } else {
        // 勝利チームによって振り分ける
        switch (sWinner) {
            case "Citizen":
                // 敗北チーム名
                sTeamName = goRoleText["Werewolf"] + gsTeam;
                break;
            case "Werewolf":
                // 敗北チーム名
                sTeamName = goRoleText["Citizen"] + gsTeam;
                break;
            case "Vampire":
                // 敗北チーム名
                sTeamName = goRoleText["Werewolf"] + gsTeam + " / " + goRoleText["Citizen"] + gsTeam;;
                break;
        }
        // 吸血鬼が負けた場合
        if (goCardNum["Vampire"] > 0 && goCardNum["Bat"] > 0 && sWinner != "Vampire") {
            // 敗北チーム名に「吸血鬼チーム」を追加する
            sTeamName = sTeamName + " / " + goRoleText["Vampire"] + gsTeam;
        }

    }

    // チーム名をDOM出力する
    $(sOutputId).text(sTeamName);
    return;


}



/****************************************************
    関数名    PlayGameSetSound
    機能        ゲームセット音を再生する

    入力        sResult        市民勝利：Citizen、人狼勝利：Werewolf or WerewolfWill
            bMorningFlg
    出力        なし

    処理概要
            1. ゲームの勝者が市民の場合
             1.1. 市民の勝利音を再生する
            2. 朝フラグがオンの場合
             2.1. 朝の人狼勝利音を再生する
            3. 人狼勝利の場合
             3.1. 夜の人狼勝利音を再生する
****************************************************/
function PlayGameSetSound(sResult, bMorningFlg) {

    // 鐘の音がなっている場合はストップする
    PlayAudio('audio/Bell.mp3', true);

    Log("PlayGameSetSound:" + sResult);

    // 勝者が市民の場合
    switch (sResult) {
        case "Citizen":
            PlayAudio('audio/WinCitizen.mp3');
            break;
        
        case "Vampire":
            PlayAudio('audio/WinVampire.mp3');
            break;
        
        default:
            PlayAudio('audio/WinWerewolf.mp3');
            break;        
    }

    return;

}

/****************************************************
    関数名    MakeWinnerListHtml
    機能        勝利プレイヤーのリストHTMLを作成する

    入力        sWinTeam        "Werewolf" or "Citizen" or "Vampire" 勝利チーム名
            iWinnerPoint    勝利ポイント
    出力        aPlayerList        プレイヤーリスト（HTML）
                            aPlayerList["Winner"], aPlayerList["Loser"]

    処理概要 1. 全プレイヤーに対して繰り返す
            1.1. 市民が勝利の場合
             1.1.1. 対象プレイヤーが、WerewolfでもPsychoでもない場合
              1.1.1.1. 勝利プレイヤーにプレイヤー名を追加する
            1.2. 人狼が勝利の場合
             1.2.1. 対象プレイヤーが、WerewolfもしくはPsychoの場合
              1.2.1.1. 勝利プレイヤーにプレイヤー名を追加する
****************************************************/
function MakeWinnerListHtml(sWinTeam, iWinnerPoint) {
    var iCnt = 0;
    var sPlayers = "";
    Log("9390:MakeWinnerListHtml " + sWinTeam);
    /*
        var aPlayerList = {
            "Winner":"",
            "Loser":""
        }
    */
    // プレイヤーリストを初期化する
    $("#GameOverResult .WinnerListBox").empty();
    $("#GameOverResult .LoserListBox").empty();

    // 全プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象プレイヤーの役職によって切り分ける
        switch (gaPlayer[iCnt].sRole) {

            // 人狼チームの場合
            case "Werewolf":
            case "LegendaryWolf":
            case "Psycho":
            case "PsychoKiller":
            case "Paparazzi":
            case "Mentalist":
            case "PrisonBreaker":
                

                // 人狼が勝利の場合
                if (sWinTeam == "Werewolf") {
                    Log("9419:Werewolfの勝利のプレイヤー追加");
                    // 勝利プレイヤーリストに追加する
                    //aPlayerList["Winner"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //aPlayerList["Winner"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Winner");

                    // リモートモードのプレイヤーの場合
                    if (gsRemoteMode == "PLAYER") {
                        // サーバーサイドですでにポイント追加済みなので
                        // ポイント追加しない

                        // 通常モードの場合
                    } else {
                        // ポイントを追加する
                        gaPlayer[iCnt].iAddPoint += iWinnerPoint;
                        gaPlayer[iCnt].iTotalPoint += iWinnerPoint;

                    }

                } else {
                    // 敗者プレイヤーリストに追加する
                    // aPlayerList["Loser"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //                    aPlayerList["Loser"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Loser");

                }

                // 空気読むシステムver2 2015.05.22
                // 対象プレイヤーの人狼チームカウンタをインクリメントする（連続して役が割り当てられないように）
                // 人狼の場合、多重人格2回分に匹敵
                if (gaPlayer[iCnt].iWerewolfTeamCnt == undefined) {
                    gaPlayer[iCnt].iWerewolfTeamCnt = 0;
                }
                if (gaPlayer[iCnt].sRole == "Werewolf" || gaPlayer[iCnt].sRole == "LegendaryWolf") {
                    // 2ポイントを追加する
                    gaPlayer[iCnt].iWerewolfTeamCnt = gaPlayer[iCnt].iWerewolfTeamCnt + 2;
                    // 多重人格の場合
                } else {
                    // 1ポイントを追加する
                    gaPlayer[iCnt].iWerewolfTeamCnt = gaPlayer[iCnt].iWerewolfTeamCnt + 1;
                }

                break;

            // 吸血鬼チームの場合
            case "Vampire":
            case "Bat":
                // 吸血鬼が勝利の場合
                if (sWinTeam == "Vampire") {
                    // 勝利プレイヤーリストに追加する
                    //aPlayerList["Winner"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //                    aPlayerList["Winner"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Winner");

                    // リモートモードのプレイヤーの場合
                    if (gsRemoteMode == "PLAYER") {
                        // サーバーサイドですでにポイント追加済みなので
                        // ポイント追加しない

                        // 通常モードの場合
                    } else {
                        // ポイントを追加する
                        gaPlayer[iCnt].iAddPoint += iWinnerPoint;
                        gaPlayer[iCnt].iTotalPoint += iWinnerPoint;
                    }
                } else {
                    // 敗者プレイヤーリストに追加する
                    //aPlayerList["Loser"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //                    aPlayerList["Loser"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Loser");

                }
                break;

            // 市民チームの場合
            default:
                // 人間が勝利の場合
                if (sWinTeam == "Citizen") {
                    // 勝利プレイヤーリストに追加する
                    //aPlayerList["Winner"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //                    aPlayerList["Winner"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Winner");

                    // リモートモードのプレイヤーの場合
                    if (gsRemoteMode == "PLAYER") {
                        // サーバーサイドですでにポイント追加済みなので
                        // ポイント追加しない

                        // 通常モードの場合
                    } else {
                        // ポイントを追加する
                        gaPlayer[iCnt].iAddPoint += iWinnerPoint;
                        gaPlayer[iCnt].iTotalPoint += iWinnerPoint;
                    }

                } else {
                    // 敗者プレイヤーリストに追加する
                    //aPlayerList["Loser"] += gaPlayer[iCnt].sName + " (" + goRoleText[gaPlayer[iCnt].sRole] + ")<br>";
                    //                    aPlayerList["Loser"] += MakeWinnerName(iCnt);
                    InsertResultPlayer(iCnt, "Loser");

                }
                break;

        }

    }

    // プレイヤーリストHTMLを返して終了する
    return;
}

/*******************************************************************************
    関数名    InsertResultPlayer
    機能      プレイヤーを結果画面のHTMLに追加する

    入力        iCnt    プレイヤー番号
    出力        sName    名前
                sWinType  "Winner" or "Loser"
    version     ver.10.1.0  結果画面リニューアル
*******************************************************************************/
function InsertResultPlayer(iCnt, sWinType) {

    var htmlTemplate = $("#GameOverResult .PlayerBox").clone();
    htmlTemplate.removeAttr("style");
    htmlTemplate.removeClass("PlayerBox");

    Log("9546 sWinType=" + sWinType);
    // HTMLに加える
    htmlTemplate.appendTo("#GameOverResult ." + sWinType + "ListBox");

    // プレイヤーのアイコン、名前、役職、死亡アイコン、役職アイコンを差し替える
    htmlTemplate.find('.FaceImgBoxResult').css("background-image", "url(" + gaPlayer[iCnt].imgFace + "),url(" + gsFaceIcon + ")");

    htmlTemplate.find('.PlayerName').text(gaPlayer[iCnt].sName);
    htmlTemplate.find('.PlayerRole').text(gaPlayerAnswer[iCnt]);
    if (gaPlayer[iCnt].bLive == false) {
        htmlTemplate.find('.DeadIcon').show();
    } else {
        htmlTemplate.find('.DeadIcon').hide();
    }
    htmlTemplate.find('.RoleBg').css("background-image", "url(img/Card_" + gaPlayer[iCnt].sRole + ".png)");

    return;
}


/*
function MakeWinnerName(iCnt) {
    var sName = gaPlayer[iCnt].sName + " (" + gaPlayerAnswer[iCnt] + ")<br>";
    return sName;
}
*/

/****************************************************
    関数名    CheckGameSetResult
    機能        ゲーム終了かどうかを判定する（裁判時）

    バージョンアップ 1.9
            人狼の数が市民の数より1少ない場合に、人狼勝利とする機能について
            騎士が生き残っている場合は、翌朝まで結果を先送りにする。

    バージョンアップ 2.0
            吸血鬼の判断を追加。

    入力        なし
    出力        sResult        結果（Werewolf / WerewolfWill / Citizen / Vampire / 0)

    処理概要
        1. 全プレイヤーに対して繰り返す
         1.1. 対象プレイヤーが生きている場合
          1.1.1. 人狼の場合、人狼の数をインクリメントする
          1.1.2. 市民の場合、市民の数をインクリメントする
          1.1.3. 吸血鬼の場合、吸血鬼生存フラグをTRUEにする
        2. 人狼の数がゼロの場合
         2.1. 市民の勝利を格納
        3. 人狼の数と市民の数が同じになった場合
         3.1. 人狼の勝利を格納
        4. 人狼の数が市民の数より1人少ない場合
         4.1. 騎士が死んでいる場合
          4.1.1 人狼が翌朝勝利するを格納
        5. ゲームセット状態かつ吸血鬼が存在している場合
         5.1. 吸血鬼の勝利を格納
        6. 結果を返して終了する
****************************************************/
function CheckGameSetResult() {
    var iCnt;
    var iLiveNum = {
        "Werewolf": 0,
        "Citizen": 0
    };
    var bKnightLiveFlg = false;
    var bVampireLiveFlg = false;
    var bPsychoKillerLiveFlg = false;
    var bBomberLiveFlg = false;

    var sResult = 0;

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // 対象プレイヤーが生きている場合
        if (gaPlayer[iCnt].bLive == true) {
            // プレイヤーが人狼の場合
            if (gaPlayer[iCnt].sRole == "Werewolf" || gaPlayer[iCnt].sRole == "LegendaryWolf") {
                iLiveNum["Werewolf"]++;

                // プレイヤーが吸血鬼の場合
            } else if (gaPlayer[iCnt].sRole == "Vampire" || gaPlayer[iCnt].sRole == "Bat") {
                bVampireLiveFlg = true;

            // 市民の場合
            } else {
                iLiveNum["Citizen"]++;

                // 「その夜、人狼が市民を襲撃したため人数が同じになりました」
                // という結論が出るかどうかを調べるフラグ

                // 生きている市民が「騎士」また「コスプレイヤー」の場合
                if (gaPlayer[iCnt].sRole == "Knight" || gaPlayer[iCnt].sRole == "Cosplayer") {
                    bKnightLiveFlg = true;
                }
                // 生きている市民が「サイコキラー」の場合
                if (gaPlayer[iCnt].sRole == "PsychoKiller") {
                    bPsychoKillerLiveFlg = true;
                }
                // 生きている市民が無敵可能な「ボマー」の場合
                if (gaPlayer[iCnt].sRole == "Bomber" && goBomb.bUsed == false) {
                    bBomberLiveFlg = true;
                }

            }
        }
    }

    Log("4063:W=" + iLiveNum["Werewolf"] + "/C=" + iLiveNum["Citizen"] + "/K=" + bKnightLiveFlg + "/PK=" + bPsychoKillerLiveFlg);

    // 市民の勝利の場合
    if (iLiveNum["Werewolf"] <= 0) {
        sResult = "Citizen";

        // 人狼と市民の数が同じになった場合
    } else if (iLiveNum["Werewolf"] >= iLiveNum["Citizen"]) {
        sResult = "Werewolf";

        // 夜に市民の逆転が起こりえない場合
        // 翌朝、人狼と市民の数が同じになる かつ 騎士、吸血鬼、サイコキラー、ボマー(ver.6.2)も生きていない場合
    } else if (iLiveNum["Werewolf"] >= iLiveNum["Citizen"] - 1 && bKnightLiveFlg == false && bVampireLiveFlg == false && bPsychoKillerLiveFlg == false && bBomberLiveFlg == false) {
        // 人狼の勝利を返す（朝のチェック時には、"Werewolf"以外の結果は無視される）
        sResult = "WerewolfWill";
    }

    // ゲーム終了状態で吸血鬼が生存している場合
    if (sResult != 0 && bVampireLiveFlg == true) {
        sResult = "Vampire";
    }

    // 狼の生き残り数をグローバル変数に格納 ver.3.2. WerewolfVoice対応
    giWerewolfLiveNum = iLiveNum["Werewolf"];

    Log("7864:sResult=" + sResult);

    // ゲーム結果を返す
    return sResult;

}

/****************************************************
    関数名    FinishGame
    機能        ゲームを終了し、メモリを解放します。

    入力        sMode ゲーム終了後の移動先を設定する
    出力        なし

    処理概要    1. プレイヤー状態とグローバル変数を初期化する。
            2. ゲームデータをセーブする
            3. ランキング画面に移動する
****************************************************/
function FinishGame(sMode, bShowAd) {

    // 初期化する
    gsStage = "";

    // レビューを表示する場合
    if (ShowReview() && !gbFull && !goSubScFlg["Adfree"]) {
        // 何もしないで終了する
        return true;

    }
    // インターステーシャル広告がロードされている場合 かつ
    // ボタンをタップされた場合（インターステーシャルをまず表示する）
    /*
    if (bShowAd && gbInterstitialLoadedFlg && !gbFull && !goSubScFlg["Adfree"]) {
        // インターステーシャルを閉じたときの挙動用
        gsInterstitialFinishMode = sMode;

        // インターステーシャルを表示する
        ShowInterstitial();
        return true;
    }
    */

    // レビューの催促をしない場合の処理
    switch (sMode) {
        case "Top":
            // プレイヤー状態とグローバル変数を初期化する
            RefreshPlayers("Finish");

            // バナーを再表示する
            // ShowBanner();

            // 「続きから」ボタンを削除する SaveGameで gsStage=""される
            SaveGame("NewGame");
            $("#TopContinue").hide();


            // ページをスーパーリロードする ver.11
            // location.reload(true);
            // バナーが無限に増えないように、いったん削除してリロードする
            BackToTitle();

            return;

        case "ContinueRemoteGame":
            // プレイヤー状態とグローバル変数を初期化する
            RefreshPlayers("ContinueRemoteGame");

            // サーバーもstatus_textを"done_player_select"にして
            // #Title_GameStart に移動する
            ContinueRemoteGame();
            return;

        // 2021.07.25 ver.11 リモートゲームの復元強化
        case "ExitRemoteGame":
            // プレイヤー情報を初期化せずにページをスーパーリロードする
            // 「続きから」ボタンを削除する SaveGameで gsStage=""される
            gsRemoteGameId = "";

            // GMの場合は、プレイヤーとしてゲーム復帰させない
            if (gsRemoteMode == "GM") {
                // リモートプレイヤーIDを GM にする
                giRemotePlayerId = -1;
                SaveGame();
            }

            // Topに戻す
            // location.href = "index.html";
            jQT.goTo("#Top", "fade");
            return;

        case "Continue":
        default:
            //ContinueGame();
            //location.href = "index.html#PlayerSetting";
            //jQT.goTo("#PlayerSetting", "slideleft");

            // プレイヤー状態とグローバル変数を初期化する
            RefreshPlayers("Finish");

            // バナーを再表示する
            // ShowBanner();

            // ゲームデータをセーブする
            SaveGame("Finish");

            // ページを移動する
            jQT.goTo("#PlayerSetting", "fade");

            break;
    }

    return;

}

/****************************************************
    関数名    InitRankPage
    機能        ランキングページを初期化する

    入力        sMode        "ThisGame" or "TotalGame"
    出力        なし

    処理概要
            1. プレイヤーに対して繰り返す
             1.1. テンプレートをコピーする
             1.2. 画像を差し替える
             1.3. 名前とポイントを差し替える
             1.4. 表示領域に挿入する
            2. 行の並び順を、Totalポイントで降順にする
****************************************************/
function InitRankPage() {
    Log("2954:InitRankPage Done");
    var iCnt;
    var htmlTemplate = "";
    var sTemplateId = "#Ranking .RowBox";
    var sOutputId = "#Ranking .PlayerListBox";
    var bShowedPlayerFlg = false;
    var aShowedPlayer = [];

    // 点数表示を設定値で更新する
    $("#Ranking .CitizenWinningPointShow").text(giPoint["CitizenWin"]);
    $("#Ranking .WerewolfWinningPointShow").text(giPoint["WerewolfWin"]);
    $("#Ranking .VampireWinningPointShow").text(giPoint["VampireWin"]);
    $("#Ranking .AlivePointShow").text(giPoint["Alive"]);
    $("#Ranking .FirstTargetPointShow").text(giPoint["FirstTarget"]);

    // 吸血鬼カードを使用していない場合
    if (goCardNum["Vampire"] <= 0 && goCardNum["Bat"] <= 0) {
        // 吸血鬼に関する説明を非表示にする
        $("#Ranking .VampireExplain").hide();
    } else {
        // 吸血鬼に関する説明を表示する
        $("#Ranking .VampireExplain").show();

        // 吸血鬼チーム名を更新する
        $("#Ranking .VampireRoleName").text(goRoleText["Vampire"]);

    }


    // プレイヤーリストを初期化のため削除する
    $(sOutputId).empty();

    // プレイヤーの合計点のランクリストを作成する
    var aTotalRank = [];
    aTotalRank = GetTotalRank();

    // プレイヤーの数だけ繰り返す　かつ　点数リストがゼロでない間繰り返す
    for (iCnt = 0; aTotalRank.length > 0; iCnt++) {

        // 対象のプレイヤーのポイントが最高点の場合
        if (gaPlayer[iCnt].iTotalPoint == aTotalRank[0]) {

            // すでにランキングに表示されているかチェックする
            bShowedPlayerFlg = CheckMatchArray(iCnt, aShowedPlayer);

            // ランキングに表示されていない場合
            if (bShowedPlayerFlg == false) {
                // テンプレートを複製する
                htmlTemplate = $(sTemplateId).clone();
                htmlTemplate.removeClass("RowBox");

                // HTMLに加える
                htmlTemplate.appendTo(sOutputId);

                // プレイヤー名、とポイントを表示する
                htmlTemplate.find('.FaceImg').attr("src", gaPlayer[iCnt].imgFace);
                htmlTemplate.find('.TdName').text(gaPlayer[iCnt].sName);
                htmlTemplate.find('.TdTotal').text(gaPlayer[iCnt].iTotalPoint);
                htmlTemplate.find('.TdAdd').text("+" + gaPlayer[iCnt].iAddPoint);

                // 対象プレイヤーと対象ポイントを配列から削除する
                aTotalRank.splice(0, 1);

                // ランキングに表示されたプレイヤーに追加する
                aShowedPlayer.push(iCnt);

                // 残りのプレイヤーのはじめから繰り返す
                iCnt = -1;

            }
        }
    }

    // リモートモードの場合は、サーバーのstatusを done_gameset にし、action_jsonを空にする
    if (gsRemoteMode == "GM") {
        // サーバーをゲームセットする
        SendGamesetRemote();
    }

    return;
}

function GetTotalRank() {
    var aPoint = [];
    var iCnt;

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {
        // プレイヤーポイントを配列に格納する
        aPoint[iCnt] = gaPlayer[iCnt].iTotalPoint;
    }

    // ポイントを数字ソートする
    aPoint.sort(function (a, b) {
        return (parseInt(a) > parseInt(b)) ? 1 : -1;
    });
    aPoint.reverse();

    // ポイントのリストを返して終了する
    return aPoint;
}

/****************************************************
    関数名    RefreshPlayers
    機能    プレイヤー状態とステージ状態を初期化する

    入力    sMode        "Finish":ゲーム終了時、"NewGame":ゲーム開始時、
                        "ContinueRemoteGame":リモートゲーム再戦時
    G入力    gaPlayer
    G出力    gaPlayer
****************************************************/
function RefreshPlayers(sMode) {
    var iCnt = 0;

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // 対象のプレイヤーデータを初期化する
        gaPlayer[iCnt].sRole = "";
        gaPlayer[iCnt].iSuspect = 0;
        gaPlayer[iCnt].bLive = true;
        gaPlayer[iCnt].bCheckedFlg = false;
        gaPlayer[iCnt].iAddPoint = 0;
        gaPlayer[iCnt].iOracleId = -1;

        // New Game時の場合
        if (sMode == "NewGame") {
            // ポイントを0点に戻す
            gaPlayer[iCnt].iTotalPoint = 0;
        }
    }

    // グローバル変数を初期化する **********
    // ゲーム開始時の場合
    switch (sMode) {
        case "NewGame":
        case "ContinueRemoteGame":
            // ステージ情報を初期化する
            gsStage = "";
            break;

        default:
            // ステージをプレイヤー設定画面とする
            gsStage = "#PlayerSetting";
            break;

    }

    // 現在の対象プレイヤー番号
    giNowPlayerId = 0;

    // 日付カウンタ
    giDateNum = 0;

    // ファーストターゲットフラグ
    gbFirstTargetFlg = true;

    // 最後に殺されたプレイヤー
    giLastDeadId = -1;

    // 占い師のチェック済みフラグ配列
    gaForetellFlg = [];
    gaScoopFlg = [];

    // 初日ランダム占いの対象者
    giForetellFirstRandom = -1;

    // ガード対象プレイヤーID
    giGuardPlayerId = -1;
    goDoubleGuard.iYesterdayPlayerId = -1;

    // マジシャン情報
    goMagician.sRole = "";
    goMagician.iFromPlayerId = -1;
    goMagician.iToPlayerId = -1;

    // ボマーフラグ
    goBomb.bTrapped = false;
    goBomb.bUsed = false;

    // 疑い数
    gaSuspect = [];

    // 殺害対象
    gaKill = [];
    gaKillMust = [];

    // 闇の霊媒師による騎士殺害フラグ
    gbDarkShamanKillKnightFlg = false;
    gaKnightPlayerId = [];

    // 運命の恋人を初期化する
    gaDestinedLoversPlayerId = [];

    // ver.9.8.3 霊媒師用 昨日の処刑対象者
    giYesterdayJudge = -1;

    // 殺害選択した人狼プレイヤーId
    gaKillWerewolfId = [];

    // 投票数リスト
    gaVoteNum = [];

    // 投票者の投票順リスト
    gaVotePlayerId = [];

    // プレイヤー並べ替えフラグ
    giChangeOrderFrom = -1;
    gbChangeOrder = false;

    // 次ページ
    gsNextPage = "";

    // リモート関連 ver.10.0.0 *******************************
    if (sMode != "ContinueRemoteGame") {
        // リモートゲームID
        gsRemoteGameId = "";

        // リモートモードの場合の自分のPlayerID
        // giRemotePlayerId = -1;

        // リモートゲームのGM端末の先別子
        gsRemoteMode = "";
    }

    // リモートでのアクションをまとめたオブジェクト
    gaRemoteAction = [];

    // リモートゲームの勝敗
    gsRemoteGameSetResult = "";
    // *******************************

    // 結果画面用
    giStartTime = 0;
    gsGameStartDate = "";

    return true;

}


/****************************************************
    関数名    PlayAudio
    機能     オーディオを再生する。
            2018.04.02 ver.9.7
            メモリ解放のため、停止時にはリリース。
            再生前にメディアを読み込むように変更。

    入力    sAudio        オーディオファイルパス（ループさせたい場合は、ファイル名にLoopをつける
            bStopFlg    ストップモード
    G入力    gMedia        メディアオブジェクト

    処理概要
****************************************************/
var gsAudio = "";
var gmLoop;
var gmSE;
var gmNA;
//var gsAudioFilePlaying = "";
var gbLoopStatus = false;

/****************************************************
    関数名    InitMedia
    機能      オーディオメディアデータを初期化する

    G入力    gmSE, gmLoop, gmNA        メディアオブジェクト
****************************************************/
function InitMedia() {

    // すべての音声を、仮のサウンドで初期化する
    var sAudio = "audio/Gun.mp3";

    // アンドロイドの場合は、音声データのパスを変更する
    if (CheckPlatform() == "Android") {
        // sAudio = sAudio.slice(1);
        sAudioFile = "file:///android_asset/www/" + sAudio;
    } else {
        sAudioFile = sAudio;
    }

    gmLoop = new Media(sAudioFile, Log("InitMedia:gmLoop"), null, null);
    gmSE = new Media(sAudioFile, Log("InitMedia:gmSE"), null, null);
    gmNA = new Media(sAudioFile, Log("InitMedia:gmNA"), null, null);

    return;
}

function PlayAudio(sAudio, bStopFlg) {
    var sType = "SE";
    var bAndroid = false;
    if (CheckPlatform() == "Android") {
        bAndroid = true;
    }

    // 音声を出さない設定の場合
    if (CheckNoSound(sAudio) == true) {
        // 音声再生のログだけを表示する
        Log("AUDIO_PLAY2:" + sAudio + "/Stop=" + bStopFlg + "/BGM Mode=" + gbBGMFlg);
        return;
    }

    // LOOPサウンドの場合
    if (sAudio.indexOf("Loop") != -1) {
        // LOOPフラグをオンにする
        sType = "LOOP";
        // Narrationの場合
    } else if (sAudio.indexOf("NA_") != -1) {
        // LOOPフラグをオンにする
        sType = "NA";
        // ファイル名が設定されていない場合
    } else if (sAudio == "") {
        Log("Error : AudioFile Name is Empty!");
        return;
    }


    // ストップする場合 ********************************
    if (bStopFlg == true) {

        switch (sType) {
            case "LOOP":
                if (gmLoop != "") {
                    gmLoop.stop();
                    //gmLoop.release();
                    // ループを終了したフラグの更新
                    gbLoopStatus = false;
                }
                break;

            case "SE":
                if (gmSE != "") {
                    gmSE.stop();
                    //gmSE.release();
                }
                break;

            case "NA":
                if (gmNA != "") {
                    gmNA.stop();
                    //                    gmNA.release();
                }
                break;

            default:
                break;

        }
    }
    // 音声停止のみの場合
    if (bStopFlg == true) {
        // ここまでで処理は終了
        return;
    }



    // 再生のための初期化をする ***************************************
    var sAudioFile = sAudio;
    // アンドロイドの場合は、音声データのパスを変更する
    if (bAndroid) {
        // sAudio = sAudio.slice(1);
        sAudioFile = "file:///android_asset/www/" + sAudio;
    }

    switch (sType) {
        case "LOOP":
            // ループさせる
            gbLoopStatus = true;

            // Androidの場合
            if (bAndroid) {

                // Android用ループ関数 ***************************************:
                var loop = function (status) {
                    // 音声が終了し、さらにループフラグがオンの場合
                    if (status === Media.MEDIA_STOPPED && gbLoopStatus == true) {
                        // ループ音声を再度再生する
                        gmLoop.play();
                    }
                };
                // 音声オブジェクトを初期化する
                gmLoop = new Media(sAudioFile, Log("gmLoop <- " + sAudioFile), null, loop);
                gmLoop.play();


                // iOSの場合
            } else {
                // 音声オブジェクトを初期化する
                gmLoop = new Media(sAudioFile, Log("gmLoop <- " + sAudioFile), null, null);
                gmLoop.play({ numberOfLoops: -1 });
            }
            break;

        // ナレーションの場合
        case "NA":
            // Naration終了時のボタン状態切替設定 ***************************************:
            var finish = function (status) {
                // 音声が終了するまでに、他のナレーションが再生されていない場合
                if (status === Media.MEDIA_STOPPED && sAudioFile == gsNarrationFile) {
                    Log("8808 sAudioFile=" + sAudioFile + "/gsNarrationFile=" + gsNarrationFile);

                    // 現在再生されているナレーションのボタンを「ナレーション」に戻す
                    $("#" + gsNarrationId).removeClass("PushNarrationOn");
                    $("#" + gsNarrationId).text("");
                    Log("8790 NA:" + gsNarrationId);

                    // ナレーションを初期化する
                    gsNarrationId = "";
                    gsNarrationFile = "";
                    //gsAudioFilePlaying = "";
                    //gmNA.release();

                }
            };


            // 音声オブジェクトを初期化する
            gmNA = new Media(sAudioFile, Log("gmNA <- " + sAudioFile), null, finish);
            gmNA.play();

            // 再生したナレーションIDを保存する
            //gsAudioFilePlaying = sAudioFile;

            break;

        default:
            // 音声オブジェクトを初期化する
            gmSE = new Media(sAudioFile, Log("gmSE <- " + sAudioFile), null, null);
            gmSE.play();
            break;
    }

}


function CheckNoSound(sAudio) {

    // Safariの場合
    if (gbIsApp != true) {
        return true;
    }

    // ナレーション以外で「BGMなし」設定の場合
    // （ナレーションボタンは、BGMがオフでも有効にする）
    if (gbBGMFlg == false && sAudio.indexOf('NA_') == -1) {
        // 音声再生のログだけを表示する
        Log("CheckNoSound:" + sAudio + "/BGM Mode=" + gbBGMFlg);
        return true;
    }

    return false;

}


/****************************************************
    関数名    GoToSecretPage
    機能        20回タップするとシークレットページへ移動する
****************************************************/
var giSecretCnt = 0;
function GoToSecretPage() {

    giSecretCnt++;

    Log("4534:giSecretCnt=" + giSecretCnt);

    // 20回以上タップした場合
    if (giSecretCnt >= 4) {
        giSecretCnt = 0;

        // シークレットページへ移動する
        jQT.goTo("#Secret", "fade");
    }

}

/****************************************************
    関数名    CheckSecretPassword
    機能        パスワードチェックをし、パスワードが正しい場合は
            カードをすべて購入した状態にする。
            入力内容をGoogle Analyticsに送信する。

    入力        #InputSecretPassword.val()
            #InputSecretEmail.val()
    出力        なし

    処理概要
            1. 年月を取得する
            2. 年の4桁に月２桁を連結する
            3. 連結数字を13で割り、余りを取得する
            4. 余りを添え字として、パスワード文字列を取得する
            5. パスワードに４桁に余りを足した数字を連結する
****************************************************/
function CheckSecretPassword() {

    // 入力されたパスワードを読み込む
    var sPassword = $("#InputSecretPassword").val();
    var sEmail = $("#InputSecretEmail").val();

    // 今日の年月を取得する
    var dDate = new Date();
    var iYear = dDate.getFullYear();
    var iMon = dDate.getMonth();
    var sNumber = "" + iYear + iMon;
    var iAmari = sNumber % 13;
    Log("4573:" + sNumber + "/" + iAmari);
    var aPassword = [];
    aPassword = [
        "apple", "orange", "banana", "pineapple", "strawberry", "grape", "lime", "lemon", "melon", "plum", "peach", "kiwi", "cherry"
    ];

    var iPassNumber = sNumber - 0;
    iPassNumber = iPassNumber + iAmari - 2000;

    var sCorrect = aPassword[iAmari] + iPassNumber;
    var iCnt = 0;

    var domGotCard = [];
    // デフォルトカードセットをコピーし、値をすべて1にする。
    domGotCard = Object.create(gaDefaultCardInit);
    InitJsonArray(domGotCard, 1);
/*
    domGotCard = {
        "Lovers": 1,
        "Psycho": 1,
        "Vampire": 1,
        "Rich": 1,
        "Bat": 1,
        "PsychoKiller": 1,
        "GreatShaman": 1,
        "Cosplayer": 1,
        "Paparazzi": 1,
        "Magician": 1,
        "Bomber": 1,
        "Mentalist": 1,
        "DarkShaman": 1,
        "Original": 1,
        "DestinedLovers": 1,
        "RainMan": 1,
        "LegendaryWolf": 1,
        "PrisonBreaker":1
    }
    */


    Log("Password=" + sPassword + "  Correct=" + sCorrect);

    // Googleにアクセスログを送信する
    LogGA("SecretSubmit", sEmail + "/" + sPassword, 0);

    // パスワードがあっている場合
    if (sPassword == sCorrect) {

        // 一時保存する
        SaveDataTmp(domGotCard, "domGotCard");

        // localStore保存する
        SaveData(domGotCard, "domGotCard");

        // すべての購入カードに対して繰り返す
        for (iCnt = 0; iCnt < gaGotCardType.length; iCnt++) {

            // カード一覧のカードを利用可能な表示に切り替える
            EnableCardSelect(gaGotCardType[iCnt]);

        }

        // Successを表示する
        $("#Secret .Submit").hide();
        $("#Secret .Success").fadeIn("slow");

        // Google Analyticsに保存する
        LogGA("SecretSuccess", sEmail + "/" + sPassword, 0);
    }

    return;
}


/****************************************************
    関数名    CheckRichLive
    機能        富豪が生きているかをチェックする

    入力        なし
    出力        bLiveFlg        true:生き残っている    false:生き残っていない

    処理概要
            1. 富豪カードが１枚以上ない場合
             1.1. falseを返して終了する
            2. プレイヤーに対して繰り返す
             2.1. 対象プレイヤーが富豪でかつ生きている場合
              2.1.1. trueを返して終了する
            3. falseを返して終了する
****************************************************/
function CheckRichLive() {
    var iCnt = 0;

    // 富豪カードが１枚もない場合
    if (goCardNum["Rich"] == 0 || goCardNum["Rich"] == undefined) {
        return false;
    }

    // プレイヤーに対して繰り返す
    for (iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

        // プレイヤーの役職が富豪の場合
        if (gaPlayer[iCnt].sRole == "Rich") {
            // プレイヤーが生きている場合
            if (gaPlayer[iCnt].bLive == true) {
                // 成功を返して終了する
                return true;
            }
        }

    }

    Log("4706: CheckRichLive False");
    // 失敗を返して終了する
    return false;
}

/*******************************************************************************
    関数名    OpenLobi
    機能        Lobiアプリを起動する。もし、Lobiアプリがインストールされていない場合は
            WebViewでLobiチャットを表示する。

    入力        なし
    出力        なし

*******************************************************************************/
function OpenLobi() {
    var sLobiAppUrl = "lobi://public_groups_tree?category=170619";
    var sLobiWebUrl = "https://web.lobi.co/category/170619";

    // Lobiをブラウザで開く
    window.open(sLobiWebUrl, '_blank', 'location=yes');

    /*
    // iOSの場合
    if(gbIsApp && CheckPlatform() == "iOS"){
        cordova.exec(
            // インストールされている場合
            function(value){
                window.open(sLobiAppUrl);
            },
            // インストールされていない場合
            function() {
                window.open(sLobiWebUrl, '_blank', 'location=yes');
            }, "LobiPlugin", "checkLobiInstall", ["CheckLobi"]
        );
    } else {
        // Lobiをブラウザで開く
        window.open(sLobiWebUrl, '_blank', 'location=yes');
    }
     */

    return;

}


/*******************************************************************************
    関数名    OpenApp
    機能        アプリがインストールされている場合は、アプリ用のカスタムスキームで起動し、
            アプリがインストールされていない場合は、httpスキームで起動する。

    入力        sCustomURL    カスタムURLスキーム（アプリ起動用）
            sHttpURL    Safari用URL
    出力        なし
*******************************************************************************/
function OpenApp(sCustomURL, sHttpURL) {

    // iOSでない場合（Androidの場合）
    if (CheckPlatform() != "iOS") {
        // Lobiをブラウザで開く
        window.open(sHttpURL, '_blank', 'location=yes');
        return;
    }

    cordova.exec(
        // インストールされている場合
        function (value) {
            window.open(sCustomURL);
        },
        // インストールされていない場合
        function () {
            window.open(sHttpURL, '_blank', 'location=yes');
        }, "CustomURL", "checkAppInstall", [sCustomURL]
    );

    return;

}

/*******************************************************************************
    関数名    CheckAuSmartPassMember
    機能        auスマートパスの会員かチェックし、会員であればゲームを開始する。
            前回の認証から7日以内であれば、チェックせずにゲームを開始する。

    入力        bContinueFlg    true:コンティニュー, false:新規ゲーム
*******************************************************************************/
function CheckAuSmartPassMember(bContinueFlg) {
    // 日付データを作成する
    var dDate = new Date();
    var iNowTime = 0;
    var iPastTime = 0;

    // 今回の実行時間を保存する
    iNowTime = dDate.getTime();
    iPastTime = iNowTime - giGetUserInfoTime;

    iPastDay = Math.floor(iPastTime / (1000 * 60 * 60 * 24));
    Log("iPastDay=" + iPastDay);

    // 前回の実行から7日以上たっている場合（もしくは、認証できていない場合）
    if (iPastDay > 0) {
        // 実行時間を更新する（認証が成功したときに現在の時間を保存。失敗のときは、ゼロを保存）
        // giGetUserInfoTime = iNowTime;
        giGetUserInfoTime = 0;

        // Auスマートパスのチェックをしたうえでゲームを開始する
        CheckAuSmartPassLicense(bContinueFlg);

        return;

        // 認証期間中の場合
    } else {

    }
}

/*******************************************************************************
    関数名    auSmartPass関連　関数
    機能        auSmartPassライブラリを使ってbindし、スマートパス会員かどうかをチェックする。
            スマートパス会員の場合は、ローディングを非表示にして終了。
            エラーの場合は、アラート表示してアプリを終了する。

    入力        なし
*******************************************************************************/
var gbAuStartContinueFlg = false;
function CheckAuSmartPassLicense(bContinueFlg) {

    // ローディングを表示する
    ShowLoading(true);
    cordova.exec(AuSmartPass_Success, AuSmartPass_Error, "auSmartPass", "CheckLicense", ["Arg1"]);
}
// 成功時の処理
function AuSmartPass_Success(sResult) {

    Log("8235:AuSmartPass_Success:" + sResult);
    // 今回の実行時間を保存する（7日間はオフラインでも楽しめる）
    dDate = new Date();
    giGetUserInfoTime = dDate.getTime();


    // au認証が成功した場合
    if (sResult.indexOf("SUCCESS") > 0) {
        // ローディング画面を非表示にする

        // スマートパス会員でない場合
    } else {
        // 画面を非表示にする
        $("#Top_wolf").hide();
        $("#Top .CommunityArea").hide();

        // エラーを表示して終了する
        //ShowAlert("auスマートパスエラー", sResult);
        Log("8247:AuSmartPass_Error:" + sResult);
        // Loadingを非表示にする
        ShowLoading(false);

        // 実験 / アプリ終了するか？
        ShowConfirm("auスマートパスエラー", sResult + "アプリケーションを終了します", "navigator.app.exitApp()");
        return;

    }

    // Loadingを非表示にする
    ShowLoading(false);

}
// エラー時の処理
function AuSmartPass_Error(sResult) {
    // 画面を非表示にする
    $("#Top_wolf").hide();
    $("#Top .CommunityArea").hide();

    // ローディング画面を非表示にする
    ShowLoading(false);

    // エラーを表示して終了する
    //ShowAlert("auスマートパスエラー", sResult);
    Log("8659:AuSmartPass_Error:" + sResult);

    // 実験 / アプリ終了するか？
    ShowConfirm("auスマートパスエラー", "auスマートパス会員であることが確認できませんでした。" + sResult, "navigator.app.exitApp()");
    return;

}



/*******************************************************************************
    関数名    SendMail
    機能        メールを送信する。（window.openを使う）

    入力        なし
    出力        なし
*******************************************************************************/
function SendMail() {

    // 環境をチェックする
    //    var sPlatform = CheckPlatform();
    var sMessage = "";
    var sUrl = "";

    switch (gsPlatform) {

        // iOSアプリの場合
        case "iOS":
            sMessage = "(iOS:" + gsEventCategory + ")";
            break;

        default:
            sMessage = "(Android:" + gsEventCategory + ")";
            break;
    }

    // URLを作成する
    sUrl = "mailto:suzuki@c61.org?subject=Werewolf Contact&body=" + sMessage;

    window.open(sUrl, '_system');
    return;
}



/****************************************
 * カード購入
 *****************************************/

/****************************************************
   関数名    ShowCardPurchase
   機能        カード購入画面を表示する

   入力        sRole        カード名
   出力        bResult        true:成功    false:エラー

   処理概要
           1. カード名が不正の場合
            1.1. エラー終了する
           2. InAppPurchaseアラートを表示する
           4. カードの表示を変更する
            4.1. ロック画像を非表示にする
            4.2. 購入ボタンを非表示にする
            4.3. カード設定ボタンを表示する
           5. 購入完了画面に移動する
****************************************************/
var gsFunction = "";
var gsPurchaseRole = "";
function ShowCardPurchase(oDiv) {

    var sRole = $(oDiv).data("role");

    // InAppPurchaseアラートを表示するためにグローバル変数に格納する
    gsFunction = "EnableCard('" + sRole + "')";
    gsPurchaseRole = sRole;

    // カードの表示を変更する **********

    // 購入完了画面のカードを差し替える
    $("#Purchased .CardBg").css("background-image", "url(img/Card_" + sRole + ".png)");
    $("#Purchased .Lock").show();
    $("#Purchased .YouGotTheCard").hide();
    $("#Purchased .UnlockTime").hide();
    $("#Purchased .Forever").show();

    // カード購入選択のログを取得する
    //LogGA("GoCart", sRole, 0);

    // ページを購入画面に移動する　-> まず Medalのチェックをされる
    jQT.goTo("#Purchased", "slideleft");

    // カード購入画面での自動処理（購入とアニメーション初期化）を行う
    InitPurchasePage();


    return true;
}

/****************************************************
    関数名    InitPurchasePage
    機能        購入完了ページの画面初期化を行う

    バージョンアップ
            先にメダル数をチェックし、メダルが足りている場合は
            メダル購入を進める。


    入力        なし
    出力        なし

    処理概要
            1. 鍵のポジションを初期化する
            2. 鍵のアニメーションを開始する
****************************************************/
function InitPurchasePage() {

    // 鍵のポジションを初期化する
    $("#Purchased .Key").css("top", -105);

    // ProductIdを取得する
    // iOSの場合
    if (CheckPlatform() == "iOS") {
        var sProductId = goProductIdMap[gsPurchaseRole];

        // Androidの場合（プロダクト名は、小文字のみの役職名とする）
    } else {
        var sProductId = gsPurchaseRole.toLowerCase();
    }

    // 購入をする
    BuyPurchase(sProductId);
}

/****************************************************
    関数名    EnableCard
    機能        カードを有効にする

    入力        sRole            役職名
            bSkipFinFlg        lolipopサーバデータ保存とアニメーションを
                            スキップするフラグ
    出力
    G出力    domGotCard        カード購入フラグ domGotCard["Lovers"] = true

    処理概要
            1. ストレージから現在の購入状態を読み込む
            2. 対象の購入カードの購入状態をオンにする
            3. ストレージに購入状態を保存する
****************************************************/
function EnableCard(sRole, bSkipFinFlg) {

    var domGotCard = [];

    // コールバック内で実行される関数のため、グローバル変数を直接更新できないため
    // 引数にグローバル変数のポインタを渡して、直接グローバル変数を更新する

    // カードの購入状態を一時保存から取得する
    domGotCard = LoadDataTmp("domGotCard");
    Log("9485:domGotCard=");
    Log(domGotCard);
    // 保存されていない場合
    if (domGotCard == "" || domGotCard == undefined) {
        domGotCard = Object.create(gaDefaultCardInit);
        /*
        domGotCard = {
            "Lovers": 0,
            "Psycho": 0,
            "Vampire": 0,
            "Rich": 0,
            "Bat": 0,
            "PsychoKiller": 0,
            "GreatShaman": 0,
            "Cosplayer": 0,
            "Paparazzi": 0,
            "Magician": 0,
            "Bomber": 0,
            "Mentalist": 0,
            "DarkShaman": 0,
            "Original": 0,
            "DestinedLovers": 0,
            "RainMan": 0,
            "LegendaryWolf": 0,
            "PrisonBreaker":0
        }
        */
    }
    domGotCard[sRole] = 1;
    Log("4442:" + sRole + "/" + domGotCard[sRole]);
    // 一時保存する
    SaveDataTmp(domGotCard, "domGotCard");
    Log("4444:SaveData Done");

    // カード一覧のカードを利用可能な表示に切り替える
    EnableCardSelect(sRole);

    // 最終処理をスキップしない場合
    if (bSkipFinFlg != true) {
        // サーバにAppStore購入情報を格納する。
        // DoAjax('GetUserInfo');

        // 購入アニメを実行する
        StartPurchasedAnime();
    }

}


/****************************************************
    関数名    EnableCardSelect
    機能        カード選択を有効にする

    入力        sRole        カード役職
                bLockFlg    初期化フラグ
    出力        なし
****************************************************/
function EnableCardSelect(sRole, bInitFlg) {

    // 初期化モードの場合
    if (bInitFlg == 1) {
        // Lock画像
        //        $("#CheckRoleNum .Lock" + sRole).css("visibility", "visible");

        // 購入ボタン
        $("#CheckRoleNum .BuyCard" + sRole).show();

        // カード設定ボタン
        $("#CheckRoleNum .GotCard" + sRole).hide();

        // カードナビ
        $("#CheckRoleNum .navi-cell_" + sRole + " .Lock").show();

        // 有効化モードの場合
    } else {
        // Lock画像
        //        $("#CheckRoleNum .Lock" + sRole).css("visibility", "hidden");

        // 購入ボタン
        $("#CheckRoleNum .BuyCard" + sRole).hide();

        // カード設定ボタン
        $("#CheckRoleNum .GotCard" + sRole).show();

        // カードナビ
        $("#CheckRoleNum .navi-cell_" + sRole + " .Lock").hide();

    }


    return;
}

/****************************************************
    関数名    StartPurchasedAnime
    機能        購入完了アニメを開始する

    入力        なし
    出力        なし

    処理概要
            1. ローディングを非表示にする
            2. 鍵のアニメをスタートする
****************************************************/
function StartPurchasedAnime(sPage) {
    // ページが未設定の場合
    if (sPage == undefined) {
        // #Purchasedを設定する
        sPage = "#Purchased";
    }
    // 鍵のアニメーションをスタートする
    //$("#Purchased .Key").addClass("Key", "MoveKey");
    $(sPage + " .Key").animate(
        {
            top: 150
        }, {
            duration: 5000,
            complete: function () {
                // 鍵を非表示にする
                $(sPage + " .Key").css("top", -105);

                // 鍵があくアニメーションをスタートする
                AnimeOpenLock();
            }
        });

    // 鍵が落ちるBGMをスタートする
    PlayAudio("audio/GotCard_DropKey.mp3");

    // ローディング画面を非表示にする
    ShowLoading(false);

}
/****************************************************
    関数名    AnimeOpenLock
    機能        鍵をオープンするアニメをスタートする
****************************************************/
function AnimeOpenLock() {
    $("#Purchased .WhiteBoard").show();
    $("#Purchased .WhiteBoard").fadeOut("slow");
    $("#Purchased .Lock").hide("");

    $("#Purchased .YouGotTheCard").fadeIn("slow");

    // 鍵があくBGMをスタートする
    PlayAudio("audio/GotCard_OpenKey.mp3");
}

/*******************************************************************************
    関数名    InitPurchase ver.8.7対応
    機能        すべてのProductIdデータを読み込む。（In App Purchaseする前に、処理すること）

    入力        aProductId        プロダクトID配列
    出力        なし

    処理概要    1. ProductIdのリストに対して繰り返す
             1.1. 対象のProductIdの情報を取得する
*******************************************************************************/
function InitPurchase(oProductIdMap) {
    var iCnt = 0;
    Log("InitPurchase");

    // オフラインの場合
    if(!navigator.onLine){
        Log("11968:オフラインなのでInitPurchaseしない");
        // 実行しない
        return;
    }

    // ローディングする
    ShowLoading(true);

    // プロダクトIDのリスト
    var aProductId = [];

    // iOSとAndroidで取得する ProductIdを整形する
    // oProductIdMap = { "Lovers":"Werewolf.Lovers",,, }
    var sOS = CheckPlatform();

    // プロダクトIDマップに対して繰り返す
    for (sRole in oProductIdMap) {
        // iOSの場合
        if (sOS == "iOS") {
            // 値の方を格納する
            aProductId.push(oProductIdMap[sRole]);

            // Androidの場合
        } else {
            // 役職を小文字で指定
            aProductId.push(sRole.toLowerCase());
        }

    }

    Log("9072:aProductId.length=" + aProductId.length);
    Log(aProductId);
    // アプリの場合
    if (gbIsApp) {

        // プロダクトの情報を取得する
        inAppPurchase
            .getProducts(aProductId)
            .then(function (products) {

                // プロダクトに対して繰り返す
                for (iCnt = 0; iCnt < products.length; iCnt++) {
                    var sPrice = products[iCnt].price;
                    var sProductId = products[iCnt].productId;
                    var sLowerId = "";

                    // 価格をボタンに表示する（すべてのカードの値段が同じことを前提としたコーディング）
                  // この書き方は間違え→  sLowerId = toLowerCase(sProductId);
                    sLowerId = sProductId.toLowerCase();
                    Log("12033:ProductId=" + sProductId + " / Lower=" + sLowerId);
                    if (sLowerId != "cardmasterkey" && sLowerId != "adfree") {
                        $(".CardPrice").text(sPrice);
                    } else {
                        $(".PremiumMenuPrice").text(sPrice);
                    }
                    Log("9089:ProductInfo:" + sProductId + "/" + sPrice);
                }
                // ローディングを解除する
                ShowLoading(false);
                Log("12021:gbInitIAPFlg="+gbInitIAPFlg);
                gbInitIAPFlg = 1;
                Log("12021-2:gbInitIAPFlg="+gbInitIAPFlg);
            })
            .catch(function (err) {
                // ローディングを解除する
                ShowLoading(false);
                Log("12029: InitPurchase Error:");
                console.log(err.message);
            });

        // ブラウザの場合
    } else {
        // プロダクトに対して繰り返す
        for (iCnt = 0; iCnt < aProductId.length; iCnt++) {
            Log("Browser DEMO: InitPurchase:" + aProductId[iCnt]);
        }
    }
    // ローディングを解除する
    ShowLoading(false);
}

/*******************************************************************************
    関数名    BuyPurchase ver.8.7対応
    機能        アプリ内課金を行う

    入力        sProductId        プロダクトID
    出力        なし

    処理概要
*******************************************************************************/
function BuyPurchase(sProductId) {

    if (sProductId == undefined || sProductId == "") {
        // エラー終了する
        Log("プロダクトIDが不正です。:" + sProductId);
        return;
    }

    // ローディングを表示する
    ShowLoading(true);

    // Safariの場合　購入したものとする
    if (!gbIsApp) {

        // カードを有効にする
        EnableCard(gsPurchaseRole);

        // データを保存する
        SaveGame("SetMedal");

        Log("9002:EnableCard/" + sProductId);
        return;
    }

    // アプリ内課金をする
    inAppPurchase
        .buy(sProductId)
        .then(function (data) {
            //Log(data);

            // ローディングを非表示する
            ShowLoading(false);

            // カードを有効にする
            EnableCard(gsPurchaseRole);

            // データを保存する
            SaveGame("SetMedal");
            Log("1111:SavePurchase");
            /*
              {
                transactionId: ...
                receipt: ...
                signature: ...
              }
            */
        })
        .catch(function (err) {

            Log(JSON.stringify(err));

            switch (err.message) {
                // すでに購入済みの場合
                case "Item already owned":

                    var aMessage = GetAlertMessage("ErrBuyCardAlready", "");
                    ShowAlert(aMessage[0], aMessage[1]);

                    Log("購入済みカード:" + gsPurchaseRole);

                    // カードを有効にする
                    EnableCard(gsPurchaseRole);

                    // データを保存する
                    SaveGame("SetMedal");

                    break;


                // 購入をキャンセルしました
                case "Purchase Cancelled":
                    var aMessage = GetAlertMessage("ErrCancelBuying", "");
                    ShowAlert(aMessage[0], aMessage[1]);

                    break;

                default:
                    // 「購入手続きが正しく処理されませんでした」エラー表示
                    var aMessage = GetAlertMessage("ErrCantBuy", "");
                    ShowAlert(aMessage[0], aMessage[1]);

                    break;
            }

            // ローディングを非表示する
            ShowLoading(false);

        });

    return;
}

/*******************************************************************************
    関数名    PurchaseSubscription ver.11.2.0対応
             cordova-plugin-inapppurchase-2実装
    機能      アプリ内課金をサブスクに対して行う

    入力      iType  サブスクタイプ "CardMasterKey","Adfree"
    出力        なし

    処理概要
*******************************************************************************/
function PurchaseSubscription(sProductId) {

    if (sProductId == undefined || sProductId == "") {
        // エラー終了する
        Log("サブスクプロダクトIDが不正です。:" + sProductId);
        return;
    }
    var sOS = CheckPlatform();

    if (sOS == "Android") {
        // Androidの場合はすべて小文字
        sProductId = sProductId.toLowerCase();
    }

    Log("12093: PurchaseSubscription / " + sProductId);
    // ローディングを表示する
    ShowLoading(true);

    // Safariの場合　購入したものとする
    if (!gbIsApp) {

        // 購入完了を実行します。
        ApplySubscription(sProductId);
        InitPremiumShop();
        ShowLoading(false); // ローディングを非表示にする

        // データを保存する
        SaveGame("SetMedal");

        return;
    }

    // アプリ内課金をする
    inAppPurchase
        .subscribe(sProductId)
        .then(function (data) {
            Log("12108: SubScribe Done");
            Log(JSON.stringify(data));

            // ローディングを非表示する
            ShowLoading(false);

            // サブスク効果を反映させる goSubScFlgを更新
            ApplySubscription(sProductId);
            InitPremiumShop();

            /*
              {
                transactionId: ...
                receipt: ...
                signature: ...
              }
            */
        })
        .catch(function (err) {

            Log(JSON.stringify(err));

            switch (err.message) {


                // 購入をキャンセルしました
                case "Purchase Cancelled":
                    var aMessage = GetAlertMessage("ErrCancelBuying", "");
                    ShowAlert(aMessage[0], aMessage[1]);

                    break;

                default:
                    // 「購入手続きが正しく処理されませんでした」エラー表示
                    var aMessage = GetAlertMessage("ErrCantBuy", "");
                    ShowAlert(aMessage[0], aMessage[1]);

                    break;
            }

            // ローディングを非表示する
            ShowLoading(false);

        });

    return;
}



/*******************************************************************************
    関数名    RestorePurchase
    機能        購入済みアイテムを復元する。

    入力        なし
    出力        なし
*******************************************************************************/
function RestorePurchase() {

    var sSubScription = "";
    
    // オフラインの場合
    if(!navigator.onLine){
        var aMessage = GetAlertMessage("ErrOffLine", "");
        ShowAlert(aMessage[0], aMessage[1]);
        return;
    }
    // ローディングを表示する
    ShowLoading(true);

    // Safariの場合
    if (!gbIsApp) {
        Log("Safari mode: Restore Test");
        // 購入済みデータ期限内
        var data = [{"productId":"CardMasterKey","date":"2021-10-05T13:56:30Z","transactionId":"2000000323836555","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:30:18Z","transactionId":"2000000323836556","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:26:39Z","transactionId":"2000000323836557","state":3},{"productId":"Werewolf.Psycho","date":"2020-02-24T13:26:41Z","transactionId":"2000000323836558","state":3},{"productId":"Adfree","date":"2022-02-06T04:13:48Z","transactionId":"2000000323836559","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:17:10Z","transactionId":"2000000323836560","state":3},{"productId":"Adfree","date":"2022-03-07T06:40:57Z","transactionId":"2000000323836561","state":3},{"productId":"Adfree","date":"2022-01-29T21:12:04Z","transactionId":"2000000323836562","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:09:14Z","transactionId":"2000000323836563","state":3},{"productId":"Adfree","date":"2021-10-25T16:19:33Z","transactionId":"2000000323836564","state":3},{"productId":"Adfree","date":"2021-10-26T08:47:33Z","transactionId":"2000000323836565","state":3},{"productId":"Adfree","date":"2022-05-17T18:53:19Z","transactionId":"2000000323836566","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:05:46Z","transactionId":"2000000323836567","state":3},{"productId":"CardMasterKey","date":"2022-04-30T10:52:27Z","transactionId":"2000000323836568","state":3},{"productId":"CardMasterKey","date":"2022-01-29T21:36:39Z","transactionId":"2000000323836569","state":3},{"productId":"Adfree","date":"2022-03-07T06:58:18Z","transactionId":"2000000323836570","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:24:43Z","transactionId":"2000000323836571","state":3},{"productId":"Adfree","date":"2022-01-29T15:07:59Z","transactionId":"2000000323836572","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:00:23Z","transactionId":"2000000323836573","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:19:20Z","transactionId":"2000000323836574","state":3},{"productId":"Adfree","date":"2022-02-06T04:03:48Z","transactionId":"2000000323836575","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:40:06Z","transactionId":"2000000323836576","state":3},{"productId":"Werewolf.Bomber","date":"2021-10-26T15:03:07Z","transactionId":"2000000323836577","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:17:37Z","transactionId":"2000000323836578","state":3},{"productId":"Adfree","date":"2022-01-29T14:47:59Z","transactionId":"2000000323836579","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:40:46Z","transactionId":"2000000323836580","state":3},{"productId":"Adfree","date":"2022-02-06T12:41:03Z","transactionId":"2000000323836581","state":3},{"productId":"Adfree","date":"2022-01-29T21:37:04Z","transactionId":"2000000323836582","state":3},{"productId":"Adfree","date":"2022-02-06T11:50:19Z","transactionId":"2000000323836583","state":3},
{"productId":"CardMasterKey","date":"2022-04-30T11:04:44Z","transactionId":"2000000323836584","state":3},{"productId":"Adfree","date":"2022-03-07T06:45:57Z","transactionId":"2000000323836585","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:00:32Z","transactionId":"2000000323836586","state":3},{"productId":"Adfree","date":"2022-01-29T14:52:59Z","transactionId":"2000000323836587","state":3},{"productId":"Adfree","date":"2021-10-26T08:37:33Z","transactionId":"2000000323836588","state":3},{"productId":"Adfree","date":"2022-02-06T10:58:28Z","transactionId":"2000000323836589","state":3},{"productId":"Adfree","date":"2022-03-07T07:37:51Z","transactionId":"2000000323836590","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:50:32Z","transactionId":"2000000323836591","state":3},{"productId":"Werewolf.DestinedLovers","date":"2020-02-24T13:34:49Z","transactionId":"2000000323836592","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:00:46Z","transactionId":"2000000323836593","state":3},{"productId":"Adfree","date":"2021-10-25T15:34:17Z","transactionId":"2000000323836594","state":3},{"productId":"Werewolf.PsychoKiller","date":"2020-06-09T00:34:37Z","transactionId":"2000000323836595","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:09:44Z","transactionId":"2000000323836596","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:04:43Z","transactionId":"2000000323836597","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:35:46Z","transactionId":"2000000323836598","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:16:35Z","transactionId":"2000000323836599","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:29:20Z","transactionId":"2000000323836600","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:29:43Z","transactionId":"2000000323836601","state":3},{"productId":"CardMasterKey","date":"2022-01-29T21:30:15Z","transactionId":"2000000323836602","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:14:43Z","transactionId":"2000000323836603","state":3},{"productId":"Adfree","date":"2022-02-06T03:33:48Z","transactionId":"2000000323836604","state":3},{"productId":"Adfree","date":"2022-01-29T14:37:59Z","transactionId":"2000000323836605","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:07:37Z","transactionId":"2000000323836606","state":3},{"productId":"CardMasterKey","date":"2021-10-05T13:39:41Z","transactionId":"2000000323836607","state":3},{"productId":"Adfree","date":"2022-05-17T19:13:56Z","transactionId":"2000000323836608","state":3},{"productId":"Adfree","date":"2022-02-06T11:35:19Z","transactionId":"2000000323836609","state":3},{"productId":"Adfree","date":"2021-10-26T08:52:33Z","transactionId":"2000000323836610","state":3},{"productId":"Adfree","date":"2021-10-25T15:49:17Z","transactionId":"2000000323836611","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:27:10Z","transactionId":"2000000323836612","state":3},{"productId":"Adfree","date":"2022-01-29T14:25:42Z","transactionId":"2000000323836613","state":3},{"productId":"CardMasterKey","date":"2021-10-05T13:49:41Z","transactionId":"2000000323836614","state":3},{"productId":"Werewolf.RainMan","date":"2020-04-10T01:06:20Z","transactionId":"2000000323836615","state":3},{"productId":"CardMasterKey","date":"2022-03-06T21:02:04Z","transactionId":"2000000323836616","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:46:31Z","transactionId":"2000000323836617","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:30:46Z","transactionId":"2000000323836618","state":3},{"productId":"Adfree","date":"2022-01-29T14:57:59Z","transactionId":"2000000323836619","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:45:32Z","transactionId":"2000000323836620","state":3},{"productId":"Adfree","date":"2021-10-25T15:23:03Z","transactionId":"2000000323836621","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:21:39Z","transactionId":"2000000323836622","state":3},{"productId":"Adfree","date":"2022-01-29T15:19:49Z","transactionId":"2000000323836623","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:09:43Z","transactionId":"2000000323836624","state":3},{"productId":"Adfree","date":"2021-10-25T16:09:17Z","transactionId":"2000000323836625","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:45:06Z","transactionId":"2000000323836627","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:41:39Z","transactionId":"2000000323836628","state":3},{"productId":"Adfree","date":"2022-05-17T18:13:11Z","transactionId":"2000000323836629","state":3},{"productId":"Werewolf.LegendaryWolf","date":"2022-05-11T17:52:20Z","transactionId":"2000000323836630","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:09:20Z","transactionId":"2000000323836631","state":3},{"productId":"Adfree","date":"2021-10-26T13:35:31Z","transactionId":"2000000323836632","state":3},{"productId":"Adfree","date":"2021-10-25T16:14:17Z","transactionId":"2000000323836633","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:41:49Z","transactionId":"2000000323836634","state":3},{"productId":"Adfree","date":"2022-02-06T04:23:48Z","transactionId":"2000000323836635","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:49:20Z","transactionId":"2000000323836636","state":3},{"productId":"Adfree","date":"2022-05-17T19:00:12Z","transactionId":"2000000323836637","state":3},{"productId":"Adfree","date":"2021-10-26T09:29:40Z","transactionId":"2000000323836638","state":3},{"productId":"Adfree","date":"2022-05-17T18:38:19Z","transactionId":"2000000323836639","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:34:20Z","transactionId":"2000000323836640","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:34:34Z","transactionId":"2000000323836641","state":3},{"productId":"Adfree","date":"2021-10-26T13:53:34Z","transactionId":"2000000323836642","state":3},{"productId":"Adfree","date":"2021-10-26T13:58:34Z","transactionId":"2000000323836643","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:36:31Z","transactionId":"2000000323836644","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:07:10Z","transactionId":"2000000323836645","state":3},{"productId":"Adfree","date":"2021-10-26T14:13:34Z","transactionId":"2000000323836646","state":3},{"productId":"CardMasterKey","date":"2022-03-06T21:07:04Z","transactionId":"2000000323836647","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:31:39Z","transactionId":"2000000323836648","state":3},{"productId":"Adfree","date":"2022-01-29T15:14:49Z","transactionId":"2000000323836649","state":3},{"productId":"Adfree","date":"2021-10-26T09:24:40Z","transactionId":"2000000323836650","state":3},{"productId":"Adfree","date":"2022-01-29T21:52:04Z","transactionId":"2000000323836651","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:44:34Z","transactionId":"2000000323836652","state":3},{"productId":"CardMasterKey","date":"2022-01-29T15:04:34Z","transactionId":"2000000323836653","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:51:39Z","transactionId":"2000000323836654","state":3},{"productId":"Adfree","date":"2022-01-29T21:47:04Z","transactionId":"2000000323836655","state":3},{"productId":"Adfree","date":"2021-10-26T09:17:39Z","transactionId":"2000000323836656","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:20:46Z","transactionId":"2000000323836657","state":3},{"productId":"Adfree","date":"2022-02-06T03:53:48Z","transactionId":"2000000323836658","state":3},{"productId":"Adfree","date":"2022-02-06T11:18:28Z","transactionId":"2000000323836659","state":3},{"productId":"Adfree","date":"2022-01-29T21:22:04Z","transactionId":"2000000323836660","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:19:43Z","transactionId":"2000000323836661","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:15:46Z","transactionId":"2000000323836662","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:31:31Z","transactionId":"2000000323836663","state":3},{"productId":"Adfree","date":"2021-10-26T13:45:31Z","transactionId":"2000000323836664","state":3},{"productId":"Werewolf.Magician","date":"2020-05-24T06:40:00Z","transactionId":"2000000323836665","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:49:34Z","transactionId":"2000000323836666","state":3},{"productId":"Adfree","date":"2021-10-26T09:12:39Z","transactionId":"2000000323836667","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:04:14Z","transactionId":"2000000323836668","state":3},{"productId":"Adfree","date":"2022-01-29T15:02:59Z","transactionId":"2000000323836669","state":3},{"productId":"Adfree","date":"2021-10-25T15:28:03Z","transactionId":"2000000323836670","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:19:14Z","transactionId":"2000000323836671","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:50:46Z","transactionId":"2000000323836672","state":3},{"productId":"Adfree","date":"2021-10-26T14:25:18Z","transactionId":"2000000323836673","state":3},{"productId":"Adfree","date":"2022-01-29T21:42:04Z","transactionId":"2000000323836674","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:44:20Z","transactionId":"2000000323836675","state":3},{"productId":"Adfree","date":"2021-10-26T14:18:34Z","transactionId":"2000000323836676","state":3},{"productId":"CardMasterKey","date":"2021-10-05T14:01:30Z","transactionId":"2000000323836677","state":3},{"productId":"Werewolf.Original","date":"2020-07-30T09:47:35Z","transactionId":"2000000323836678","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:10:18Z","transactionId":"2000000323836679","state":3},{"productId":"Adfree","date":"2021-10-25T15:54:17Z","transactionId":"2000000323836681","state":3},{"productId":"CardMasterKey","date":"2021-10-05T14:06:30Z","transactionId":"2000000323836682","state":3},{"productId":"Werewolf.Vampire","date":"2020-04-10T08:00:42Z","transactionId":"2000000323836683","state":3},{"productId":"Adfree","date":"2022-03-07T07:27:51Z","transactionId":"2000000323836684","state":3},{"productId":"Adfree","date":"2022-05-17T18:18:11Z","transactionId":"2000000323836685","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:41:31Z","transactionId":"2000000323836686","state":3},{"productId":"Adfree","date":"2022-03-07T07:03:36Z","transactionId":"2000000323836687","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:26:47Z","transactionId":"2000000323836688","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:45:46Z","transactionId":"2000000323836689","state":3},{"productId":"Adfree","date":"2022-02-06T10:53:28Z","transactionId":"2000000323836690","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:25:46Z","transactionId":"2000000323836691","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:16:39Z","transactionId":"2000000323836692","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:11:35Z","transactionId":"2000000323836693","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:36:44Z","transactionId":"2000000323836694","state":3},{"productId":"CardMasterKey","date":"2022-04-30T10:57:27Z","transactionId":"2000000323836695","state":3},{"productId":"Adfree","date":"2021-10-26T08:32:33Z","transactionId":"2000000323836696","state":3},{"productId":"CardMasterKey","date":"2022-02-28T00:06:31Z","transactionId":"2000000323836697","state":3},{"productId":"Adfree","date":"2022-02-06T04:18:48Z","transactionId":"2000000323836698","state":3},{"productId":"Adfree","date":"2022-05-17T19:08:56Z","transactionId":"2000000323836699","state":3},{"productId":"Adfree","date":"2022-02-06T11:45:19Z","transactionId":"2000000323836700","state":3},{"productId":"Adfree","date":"2022-02-06T03:28:48Z","transactionId":"2000000323836701","state":3},{"productId":"Adfree","date":"2022-05-17T18:33:19Z","transactionId":"2000000323836702","state":3},{"productId":"Werewolf.Mentalist","date":"2022-04-30T10:29:41Z","transactionId":"2000000323836703","state":3},{"productId":"Adfree","date":"2022-01-29T22:09:33Z","transactionId":"2000000323836704","state":3},{"productId":"Adfree","date":"2021-10-26T14:08:34Z","transactionId":"2000000323836705","state":3},{"productId":"Adfree","date":"2021-10-26T08:59:26Z","transactionId":"2000000323836706","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:58:37Z","transactionId":"2000000323836707","state":3},{"productId":"Adfree","date":"2022-02-06T11:08:28Z","transactionId":"2000000323836708","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:57:04Z","transactionId":"2000000323836709","state":3},{"productId":"Adfree","date":"2022-03-07T07:32:51Z","transactionId":"2000000323836710","state":3},{"productId":"Adfree","date":"2021-10-25T15:39:17Z","transactionId":"2000000323836711","state":3},{"productId":"Adfree","date":"2022-01-29T15:24:49Z","transactionId":"2000000323836712","state":3},{"productId":"Adfree","date":"2022-02-06T03:43:48Z","transactionId":"2000000323836713","state":3},{"productId":"Adfree","date":"2021-10-26T13:23:28Z","transactionId":"2000000323836714","state":3},{"productId":"Adfree","date":"2022-01-29T14:30:42Z","transactionId":"2000000323836715","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:46:49Z","transactionId":"2000000323836716","state":3},{"productId":"Adfree","date":"2022-02-06T11:13:28Z","transactionId":"2000000323836717","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:49:34Z","transactionId":"2000000323836718","state":3},{"productId":"Adfree","date":"2022-05-17T18:48:19Z","transactionId":"2000000323836719","state":3},{"productId":"Adfree","date":"2022-01-29T21:32:04Z","transactionId":"2000000323836720","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:54:34Z","transactionId":"2000000323836721","state":3},{"productId":"Adfree","date":"2022-01-29T21:27:04Z","transactionId":"2000000323836722","state":3},{"productId":"Adfree","date":"2022-02-06T11:40:19Z","transactionId":"2000000323836723","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:12:37Z","transactionId":"2000000323836724","state":3},{"productId":"Adfree","date":"2022-02-06T11:03:28Z","transactionId":"2000000323836725","state":3},{"productId":"Adfree","date":"2022-01-29T22:04:33Z","transactionId":"2000000323836726","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:15:18Z","transactionId":"2000000323836727","state":3},{"productId":"Adfree","date":"2022-01-29T21:59:33Z","transactionId":"2000000323836728","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:40:32Z","transactionId":"2000000323836729","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:28:14Z","transactionId":"2000000323836730","state":3},{"productId":"Adfree","date":"2022-05-17T18:43:19Z","transactionId":"2000000323836731","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:39:34Z","transactionId":"2000000323836732","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:24:34Z","transactionId":"2000000323836733","state":3},{"productId":"Adfree","date":"2021-10-25T16:04:17Z","transactionId":"2000000323836734","state":3},{"productId":"CardMasterKey","date":"2022-01-29T19:50:23Z","transactionId":"2000000323836735","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:20:18Z","transactionId":"2000000323836736","state":3},{"productId":"CardMasterKey","date":"2022-02-28T00:01:31Z","transactionId":"2000000323836737","state":3},{"productId":"Adfree","date":"2022-03-07T07:20:36Z","transactionId":"2000000323836738","state":3},{"productId":"CardMasterKey","date":"2022-01-29T19:55:23Z","transactionId":"2000000323836739","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:06:35Z","transactionId":"2000000323836740","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:39:20Z","transactionId":"2000000323836741","state":3},{"productId":"Adfree","date":"2022-02-06T11:30:19Z","transactionId":"2000000323836742","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:59:34Z","transactionId":"2000000323836743","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:37:10Z","transactionId":"2000000323836744","state":3},{"productId":"Werewolf.DarkShaman","date":"2020-04-10T07:59:06Z","transactionId":"2000000323836745","state":3},
{"productId":"CardMasterKey","date":"2023-05-02T19:26:11Z","transactionId":"2000000323836626","state":3}];

        // 購入期限切れ
        /*
        var data = [{"productId":"CardMasterKey","date":"2021-10-05T13:56:30Z","transactionId":"2000000323836555","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:30:18Z","transactionId":"2000000323836556","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:26:39Z","transactionId":"2000000323836557","state":3},{"productId":"Werewolf.Psycho","date":"2020-02-24T13:26:41Z","transactionId":"2000000323836558","state":3},{"productId":"Adfree","date":"2022-02-06T04:13:48Z","transactionId":"2000000323836559","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:17:10Z","transactionId":"2000000323836560","state":3},{"productId":"Adfree","date":"2022-03-07T06:40:57Z","transactionId":"2000000323836561","state":3},{"productId":"Adfree","date":"2022-01-29T21:12:04Z","transactionId":"2000000323836562","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:09:14Z","transactionId":"2000000323836563","state":3},{"productId":"Adfree","date":"2021-10-25T16:19:33Z","transactionId":"2000000323836564","state":3},{"productId":"Adfree","date":"2021-10-26T08:47:33Z","transactionId":"2000000323836565","state":3},{"productId":"Adfree","date":"2022-05-17T18:53:19Z","transactionId":"2000000323836566","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:05:46Z","transactionId":"2000000323836567","state":3},{"productId":"CardMasterKey","date":"2022-04-30T10:52:27Z","transactionId":"2000000323836568","state":3},{"productId":"CardMasterKey","date":"2022-01-29T21:36:39Z","transactionId":"2000000323836569","state":3},{"productId":"Adfree","date":"2022-03-07T06:58:18Z","transactionId":"2000000323836570","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:24:43Z","transactionId":"2000000323836571","state":3},{"productId":"Adfree","date":"2022-01-29T15:07:59Z","transactionId":"2000000323836572","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:00:23Z","transactionId":"2000000323836573","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:19:20Z","transactionId":"2000000323836574","state":3},{"productId":"Adfree","date":"2022-02-06T04:03:48Z","transactionId":"2000000323836575","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:40:06Z","transactionId":"2000000323836576","state":3},{"productId":"Werewolf.Bomber","date":"2021-10-26T15:03:07Z","transactionId":"2000000323836577","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:17:37Z","transactionId":"2000000323836578","state":3},{"productId":"Adfree","date":"2022-01-29T14:47:59Z","transactionId":"2000000323836579","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:40:46Z","transactionId":"2000000323836580","state":3},{"productId":"Adfree","date":"2022-02-06T12:41:03Z","transactionId":"2000000323836581","state":3},{"productId":"Adfree","date":"2022-01-29T21:37:04Z","transactionId":"2000000323836582","state":3},{"productId":"Adfree","date":"2022-02-06T11:50:19Z","transactionId":"2000000323836583","state":3},
{"productId":"CardMasterKey","date":"2022-04-30T11:04:44Z","transactionId":"2000000323836584","state":3},{"productId":"Adfree","date":"2022-03-07T06:45:57Z","transactionId":"2000000323836585","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:00:32Z","transactionId":"2000000323836586","state":3},{"productId":"Adfree","date":"2022-01-29T14:52:59Z","transactionId":"2000000323836587","state":3},{"productId":"Adfree","date":"2021-10-26T08:37:33Z","transactionId":"2000000323836588","state":3},{"productId":"Adfree","date":"2022-02-06T10:58:28Z","transactionId":"2000000323836589","state":3},{"productId":"Adfree","date":"2022-03-07T07:37:51Z","transactionId":"2000000323836590","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:50:32Z","transactionId":"2000000323836591","state":3},{"productId":"Werewolf.DestinedLovers","date":"2020-02-24T13:34:49Z","transactionId":"2000000323836592","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:00:46Z","transactionId":"2000000323836593","state":3},{"productId":"Adfree","date":"2021-10-25T15:34:17Z","transactionId":"2000000323836594","state":3},{"productId":"Werewolf.PsychoKiller","date":"2020-06-09T00:34:37Z","transactionId":"2000000323836595","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:09:44Z","transactionId":"2000000323836596","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:04:43Z","transactionId":"2000000323836597","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:35:46Z","transactionId":"2000000323836598","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:16:35Z","transactionId":"2000000323836599","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:29:20Z","transactionId":"2000000323836600","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:29:43Z","transactionId":"2000000323836601","state":3},{"productId":"CardMasterKey","date":"2022-01-29T21:30:15Z","transactionId":"2000000323836602","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:14:43Z","transactionId":"2000000323836603","state":3},{"productId":"Adfree","date":"2022-02-06T03:33:48Z","transactionId":"2000000323836604","state":3},{"productId":"Adfree","date":"2022-01-29T14:37:59Z","transactionId":"2000000323836605","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:07:37Z","transactionId":"2000000323836606","state":3},{"productId":"CardMasterKey","date":"2021-10-05T13:39:41Z","transactionId":"2000000323836607","state":3},{"productId":"Adfree","date":"2022-05-17T19:13:56Z","transactionId":"2000000323836608","state":3},{"productId":"Adfree","date":"2022-02-06T11:35:19Z","transactionId":"2000000323836609","state":3},{"productId":"Adfree","date":"2021-10-26T08:52:33Z","transactionId":"2000000323836610","state":3},{"productId":"Adfree","date":"2021-10-25T15:49:17Z","transactionId":"2000000323836611","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:27:10Z","transactionId":"2000000323836612","state":3},{"productId":"Adfree","date":"2022-01-29T14:25:42Z","transactionId":"2000000323836613","state":3},{"productId":"CardMasterKey","date":"2021-10-05T13:49:41Z","transactionId":"2000000323836614","state":3},{"productId":"Werewolf.RainMan","date":"2020-04-10T01:06:20Z","transactionId":"2000000323836615","state":3},{"productId":"CardMasterKey","date":"2022-03-06T21:02:04Z","transactionId":"2000000323836616","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:46:31Z","transactionId":"2000000323836617","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:30:46Z","transactionId":"2000000323836618","state":3},{"productId":"Adfree","date":"2022-01-29T14:57:59Z","transactionId":"2000000323836619","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:45:32Z","transactionId":"2000000323836620","state":3},{"productId":"Adfree","date":"2021-10-25T15:23:03Z","transactionId":"2000000323836621","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:21:39Z","transactionId":"2000000323836622","state":3},{"productId":"Adfree","date":"2022-01-29T15:19:49Z","transactionId":"2000000323836623","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:09:43Z","transactionId":"2000000323836624","state":3},{"productId":"Adfree","date":"2021-10-25T16:09:17Z","transactionId":"2000000323836625","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:45:06Z","transactionId":"2000000323836627","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:41:39Z","transactionId":"2000000323836628","state":3},{"productId":"Adfree","date":"2022-05-17T18:13:11Z","transactionId":"2000000323836629","state":3},{"productId":"Werewolf.LegendaryWolf","date":"2022-05-11T17:52:20Z","transactionId":"2000000323836630","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:09:20Z","transactionId":"2000000323836631","state":3},{"productId":"Adfree","date":"2021-10-26T13:35:31Z","transactionId":"2000000323836632","state":3},{"productId":"Adfree","date":"2021-10-25T16:14:17Z","transactionId":"2000000323836633","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:41:49Z","transactionId":"2000000323836634","state":3},{"productId":"Adfree","date":"2022-02-06T04:23:48Z","transactionId":"2000000323836635","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:49:20Z","transactionId":"2000000323836636","state":3},{"productId":"Adfree","date":"2022-05-17T19:00:12Z","transactionId":"2000000323836637","state":3},{"productId":"Adfree","date":"2021-10-26T09:29:40Z","transactionId":"2000000323836638","state":3},{"productId":"Adfree","date":"2022-05-17T18:38:19Z","transactionId":"2000000323836639","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:34:20Z","transactionId":"2000000323836640","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:34:34Z","transactionId":"2000000323836641","state":3},{"productId":"Adfree","date":"2021-10-26T13:53:34Z","transactionId":"2000000323836642","state":3},{"productId":"Adfree","date":"2021-10-26T13:58:34Z","transactionId":"2000000323836643","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:36:31Z","transactionId":"2000000323836644","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:07:10Z","transactionId":"2000000323836645","state":3},{"productId":"Adfree","date":"2021-10-26T14:13:34Z","transactionId":"2000000323836646","state":3},{"productId":"CardMasterKey","date":"2022-03-06T21:07:04Z","transactionId":"2000000323836647","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:31:39Z","transactionId":"2000000323836648","state":3},{"productId":"Adfree","date":"2022-01-29T15:14:49Z","transactionId":"2000000323836649","state":3},{"productId":"Adfree","date":"2021-10-26T09:24:40Z","transactionId":"2000000323836650","state":3},{"productId":"Adfree","date":"2022-01-29T21:52:04Z","transactionId":"2000000323836651","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:44:34Z","transactionId":"2000000323836652","state":3},{"productId":"CardMasterKey","date":"2022-01-29T15:04:34Z","transactionId":"2000000323836653","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:51:39Z","transactionId":"2000000323836654","state":3},{"productId":"Adfree","date":"2022-01-29T21:47:04Z","transactionId":"2000000323836655","state":3},{"productId":"Adfree","date":"2021-10-26T09:17:39Z","transactionId":"2000000323836656","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:20:46Z","transactionId":"2000000323836657","state":3},{"productId":"Adfree","date":"2022-02-06T03:53:48Z","transactionId":"2000000323836658","state":3},{"productId":"Adfree","date":"2022-02-06T11:18:28Z","transactionId":"2000000323836659","state":3},{"productId":"Adfree","date":"2022-01-29T21:22:04Z","transactionId":"2000000323836660","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:19:43Z","transactionId":"2000000323836661","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:15:46Z","transactionId":"2000000323836662","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:31:31Z","transactionId":"2000000323836663","state":3},{"productId":"Adfree","date":"2021-10-26T13:45:31Z","transactionId":"2000000323836664","state":3},{"productId":"Werewolf.Magician","date":"2020-05-24T06:40:00Z","transactionId":"2000000323836665","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:49:34Z","transactionId":"2000000323836666","state":3},{"productId":"Adfree","date":"2021-10-26T09:12:39Z","transactionId":"2000000323836667","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:04:14Z","transactionId":"2000000323836668","state":3},{"productId":"Adfree","date":"2022-01-29T15:02:59Z","transactionId":"2000000323836669","state":3},{"productId":"Adfree","date":"2021-10-25T15:28:03Z","transactionId":"2000000323836670","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:19:14Z","transactionId":"2000000323836671","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:50:46Z","transactionId":"2000000323836672","state":3},{"productId":"Adfree","date":"2021-10-26T14:25:18Z","transactionId":"2000000323836673","state":3},{"productId":"Adfree","date":"2022-01-29T21:42:04Z","transactionId":"2000000323836674","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:44:20Z","transactionId":"2000000323836675","state":3},{"productId":"Adfree","date":"2021-10-26T14:18:34Z","transactionId":"2000000323836676","state":3},{"productId":"CardMasterKey","date":"2021-10-05T14:01:30Z","transactionId":"2000000323836677","state":3},{"productId":"Werewolf.Original","date":"2020-07-30T09:47:35Z","transactionId":"2000000323836678","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:10:18Z","transactionId":"2000000323836679","state":3},{"productId":"Adfree","date":"2021-10-25T15:54:17Z","transactionId":"2000000323836681","state":3},{"productId":"CardMasterKey","date":"2021-10-05T14:06:30Z","transactionId":"2000000323836682","state":3},{"productId":"Werewolf.Vampire","date":"2020-04-10T08:00:42Z","transactionId":"2000000323836683","state":3},{"productId":"Adfree","date":"2022-03-07T07:27:51Z","transactionId":"2000000323836684","state":3},{"productId":"Adfree","date":"2022-05-17T18:18:11Z","transactionId":"2000000323836685","state":3},{"productId":"CardMasterKey","date":"2022-02-27T23:41:31Z","transactionId":"2000000323836686","state":3},{"productId":"Adfree","date":"2022-03-07T07:03:36Z","transactionId":"2000000323836687","state":3},{"productId":"CardMasterKey","date":"2022-04-01T11:26:47Z","transactionId":"2000000323836688","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:45:46Z","transactionId":"2000000323836689","state":3},{"productId":"Adfree","date":"2022-02-06T10:53:28Z","transactionId":"2000000323836690","state":3},{"productId":"CardMasterKey","date":"2022-01-01T12:25:46Z","transactionId":"2000000323836691","state":3},{"productId":"CardMasterKey","date":"2022-04-30T11:16:39Z","transactionId":"2000000323836692","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:11:35Z","transactionId":"2000000323836693","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:36:44Z","transactionId":"2000000323836694","state":3},{"productId":"CardMasterKey","date":"2022-04-30T10:57:27Z","transactionId":"2000000323836695","state":3},{"productId":"Adfree","date":"2021-10-26T08:32:33Z","transactionId":"2000000323836696","state":3},{"productId":"CardMasterKey","date":"2022-02-28T00:06:31Z","transactionId":"2000000323836697","state":3},{"productId":"Adfree","date":"2022-02-06T04:18:48Z","transactionId":"2000000323836698","state":3},{"productId":"Adfree","date":"2022-05-17T19:08:56Z","transactionId":"2000000323836699","state":3},{"productId":"Adfree","date":"2022-02-06T11:45:19Z","transactionId":"2000000323836700","state":3},{"productId":"Adfree","date":"2022-02-06T03:28:48Z","transactionId":"2000000323836701","state":3},{"productId":"Adfree","date":"2022-05-17T18:33:19Z","transactionId":"2000000323836702","state":3},{"productId":"Werewolf.Mentalist","date":"2022-04-30T10:29:41Z","transactionId":"2000000323836703","state":3},{"productId":"Adfree","date":"2022-01-29T22:09:33Z","transactionId":"2000000323836704","state":3},{"productId":"Adfree","date":"2021-10-26T14:08:34Z","transactionId":"2000000323836705","state":3},{"productId":"Adfree","date":"2021-10-26T08:59:26Z","transactionId":"2000000323836706","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:58:37Z","transactionId":"2000000323836707","state":3},{"productId":"Adfree","date":"2022-02-06T11:08:28Z","transactionId":"2000000323836708","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:57:04Z","transactionId":"2000000323836709","state":3},{"productId":"Adfree","date":"2022-03-07T07:32:51Z","transactionId":"2000000323836710","state":3},{"productId":"Adfree","date":"2021-10-25T15:39:17Z","transactionId":"2000000323836711","state":3},{"productId":"Adfree","date":"2022-01-29T15:24:49Z","transactionId":"2000000323836712","state":3},{"productId":"Adfree","date":"2022-02-06T03:43:48Z","transactionId":"2000000323836713","state":3},{"productId":"Adfree","date":"2021-10-26T13:23:28Z","transactionId":"2000000323836714","state":3},{"productId":"Adfree","date":"2022-01-29T14:30:42Z","transactionId":"2000000323836715","state":3},{"productId":"CardMasterKey","date":"2022-03-07T06:46:49Z","transactionId":"2000000323836716","state":3},{"productId":"Adfree","date":"2022-02-06T11:13:28Z","transactionId":"2000000323836717","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:49:34Z","transactionId":"2000000323836718","state":3},{"productId":"Adfree","date":"2022-05-17T18:48:19Z","transactionId":"2000000323836719","state":3},{"productId":"Adfree","date":"2022-01-29T21:32:04Z","transactionId":"2000000323836720","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:54:34Z","transactionId":"2000000323836721","state":3},{"productId":"Adfree","date":"2022-01-29T21:27:04Z","transactionId":"2000000323836722","state":3},{"productId":"Adfree","date":"2022-02-06T11:40:19Z","transactionId":"2000000323836723","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:12:37Z","transactionId":"2000000323836724","state":3},{"productId":"Adfree","date":"2022-02-06T11:03:28Z","transactionId":"2000000323836725","state":3},{"productId":"Adfree","date":"2022-01-29T22:04:33Z","transactionId":"2000000323836726","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:15:18Z","transactionId":"2000000323836727","state":3},{"productId":"Adfree","date":"2022-01-29T21:59:33Z","transactionId":"2000000323836728","state":3},{"productId":"CardMasterKey","date":"2022-02-06T12:40:32Z","transactionId":"2000000323836729","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:28:14Z","transactionId":"2000000323836730","state":3},{"productId":"Adfree","date":"2022-05-17T18:43:19Z","transactionId":"2000000323836731","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:39:34Z","transactionId":"2000000323836732","state":3},{"productId":"CardMasterKey","date":"2022-01-29T20:24:34Z","transactionId":"2000000323836733","state":3},{"productId":"Adfree","date":"2021-10-25T16:04:17Z","transactionId":"2000000323836734","state":3},{"productId":"CardMasterKey","date":"2022-01-29T19:50:23Z","transactionId":"2000000323836735","state":3},{"productId":"CardMasterKey","date":"2022-03-07T07:20:18Z","transactionId":"2000000323836736","state":3},{"productId":"CardMasterKey","date":"2022-02-28T00:01:31Z","transactionId":"2000000323836737","state":3},{"productId":"Adfree","date":"2022-03-07T07:20:36Z","transactionId":"2000000323836738","state":3},{"productId":"CardMasterKey","date":"2022-01-29T19:55:23Z","transactionId":"2000000323836739","state":3},{"productId":"CardMasterKey","date":"2022-03-06T20:06:35Z","transactionId":"2000000323836740","state":3},{"productId":"CardMasterKey","date":"2022-04-01T10:39:20Z","transactionId":"2000000323836741","state":3},{"productId":"Adfree","date":"2022-02-06T11:30:19Z","transactionId":"2000000323836742","state":3},{"productId":"CardMasterKey","date":"2022-01-29T14:59:34Z","transactionId":"2000000323836743","state":3},{"productId":"CardMasterKey","date":"2022-02-06T13:37:10Z","transactionId":"2000000323836744","state":3},{"productId":"Werewolf.DarkShaman","date":"2020-04-10T07:59:06Z","transactionId":"2000000323836745","state":3}];
*/

        var sRestoreCards = "";

        // 購入データの一括チェック処理
        // domGotCardが更新される
        // goSubScFlg[] が更新される
        // goSubScStartDate[]が更新される
        UpdatePurchasedProducts(data);

        // サブスクに関する処理 ****************
        // アドフリーが有効の場合
        /* ver. 11.8.0 広告を極力減らす アドフリーを終了
        if (goSubScFlg["Adfree"]) {
            // 広告を非表示にする
            ShowBanner(true);

            aMessage = GetAlertMessage("ApplyAdfree", "");
            sSubScription += aMessage[0] + "/";
        }
        */

        // マスターキーが有効な場合
        if (goSubScFlg["CardMasterKey"]) {
            // カードをすべて有効にする
            ShowGotCard(true);
            aMessage = GetAlertMessage("ApplyMasterKey", "");
            sSubScription += aMessage[0] + "/";

        }

        // サブスクを反映する
        InitPremiumShop();

        // マスターキーが有効の場合は、このあとの一枚ずつのカード購入はスキップする。
        if (goSubScFlg["CardMasterKey"]) {
            aMessage = GetAlertMessage("ApplyRestore", "");
            ShowAlert(aMessage[0], aMessage[1] + " " + sSubScription);
            // ここで処理を終了する
            ShowLoading(false);
            return;
        }

        // ここから先は、通常のカード購入の処理 ************
        // domGotCard
        ShowGotCard();

        // リストアリストに役職名を表示する
        if (gsLocale == "ja-jp" || gsLocale == "ja") {
            goRoleText = goRoleTextJp;
        } else {
            goRoleText = goRoleTextEn;
        }

        // カード購入情報に対して繰り返す
        for(var sRole in domGotCard){

            // 購入済みの場合
            if(domGotCard[sRole]==1){
                // リストアされたカードを有効にする domGotCardが更新される
                EnableCard(sRole, true);

                // リストアされたカード文字列に追加
                sRestoreCards += goRoleText[sRole] + " / ";

            }

        }

        // リストア完了を表示する
        aMessage = GetAlertMessage("ApplyRestore", "");
        ShowAlert(aMessage[0], aMessage[1] + sRestoreCards);

        // ローディングを非表示する
        ShowLoading(false);
        return;
    }

    // ローディングを表示する
    ShowLoading(true, true);

    // サブスク対応 ver.11.2.0 2023.05.02 *************
    // cordova-plugin-inapppurchase-2に乗り換える

    // in App Purchaseの初期化がまだの場合
    // SP版でない場合 IAPを初期化する 2017.08.20
    // 2017.12.02 Androidも処理を行うように修正
    if (gbFull == false && gbInitIAPFlg != 1) {
        Log("2348:InAppPurchaseの初期化実行");
        // In App Purchase の刷新 ver.8.7
        //        InitPurchase(gaProductId);
        InitPurchase(goProductIdMap);
        gbInitIAPFlg = 1;
    }

    inAppPurchase
        .restorePurchases()
        .then(function (data) {
            Log("8993:restorePurchase Success!!");
            //Log(JSON.stringify(data));
            // サブスクのせいで、膨大な購入データがきます↑

            var sRestoreCards = "";

            // 購入データの一括チェック処理
            // domGotCardが更新される
            // goSubScFlg[] が更新される
            // goSubScStartDate[]が更新される
            UpdatePurchasedProducts(data);

            // サブスクに関する処理 ****************
            // アドフリーが有効の場合
        /* ver. 11.8.0 広告を極力減らす アドフリーを終了
            if (goSubScFlg["Adfree"]) {
                // 広告を非表示にする
                ShowBanner(true);

                aMessage = GetAlertMessage("ApplyAdfree", "");
                sSubScription += aMessage[0] + "/";
            }
            */

            // マスターキーが有効な場合
            if (goSubScFlg["CardMasterKey"]) {
                // カードをすべて有効にする
                ShowGotCard(true);
                aMessage = GetAlertMessage("ApplyMasterKey", "");
                sSubScription += aMessage[0] + "/";

            }

            // サブスクを反映する
            InitPremiumShop();

            // マスターキーが有効の場合は、このあとの一枚ずつのカード購入はスキップする。
            if (goSubScFlg["CardMasterKey"]) {
                aMessage = GetAlertMessage("ApplyRestore", "");
                ShowAlert(aMessage[0], aMessage[1] + " / " + sSubScription);
                // ここで処理を終了する
                ShowLoading(false);
                return;
            }

            // ここから先は、通常のカード購入の処理 ************
            // domGotCard
            ShowGotCard();

            // リストアリストに役職名を表示する
            if (gsLocale == "ja-jp" || gsLocale == "ja") {
                goRoleText = goRoleTextJp;
            } else {
                goRoleText = goRoleTextEn;
            }

            // カード購入情報に対して繰り返す
            for(var sRole in domGotCard){

                // 購入済みの場合
                if(domGotCard[sRole]==1){
                    // リストアされたカードを有効にする domGotCardが更新される
                    EnableCard(sRole, true);

                    // リストアされたカード文字列に追加
                    sRestoreCards += goRoleText[sRole] + " / ";

                }

            }

            // リストア完了を表示する
            aMessage = GetAlertMessage("ApplyRestore", "");
            ShowAlert(aMessage[0], aMessage[1] + sRestoreCards);

            // ローディングを非表示する
            ShowLoading(false);
        })
        .catch(function (err) {
            Log(err);

            // ローディングを非表示する
            ShowLoading(false);

            // エラー表示
            var aMessage = GetAlertMessage("ErrCantRestore", "");
            ShowAlert(aMessage[0], aMessage[1]);

        });

}

/****************************************************
    関数名    UpdatePurchasedProducts
    機能      リストア時に得られる購入履歴データを使い
            ・購入済みカード情報リスト domGotCard の更新
            ・サブスクの終了日の更新
            を行う。
    
    入力     oRestoredData  リストア結果データ配列
              [
                  {"productId":"CardMasterKey",
                "date":"2021-10-05T13:56:30Z",
                "transactionId":"2000000323836555",
                "state":3},{省略},{省略} ]
    G出力    domGotCard
            goSubScFlg = {"CardMasterKey":1, "Adfree":1}
            goSubScStartDate = {"CardMasterKey":Date型, "Adfree":Date型}

    
    処理概要
            0. goSubScStartDateが空の場合
             0.1. goSubScStartDateを初期化する
             0.2. goSubScFlgを初期化する
            1. 購入履歴データに対して繰り返す
             1.1. ProductIdから役職名とタイプ（Card or SubSc）を取得する
             1.2. Cardの場合
              1.2.1. 対象のカードをdomGotCardに保存する
             1.3. SubScrの場合
              1.3.1. 購入データの日付を取得する
              1.3.1. 対象データの日付が、これまでに出た日付より新しい場合
               1.3.1.1. goSubScStartDateを更新する
            2. CheckSubScExpired()で、今日がgoSubScStartDateから31日以内かチェックする
             2.1. 期限内の場合、goSubScFlgをオンに、期限切れの場合、goSubScFlgをオフにする
****************************************************/
function UpdatePurchasedProducts(oRestoredData){

    var oObject = {};
    var sProductId = "";
    var dProductDate = new Date();
    var iProductState = 0;


    // 保存データをロードする
    domGotCard = Object.create(gaDefaultCardInit);
    goSubScFlg = {
        "CardMasterKey": false,
        "Adfree": false
    };
    goSubScStartDate = {
        "CardMasterKey": false,
        "Adfree": false
    };

    // 初期化日付 今日の10年前を設定します
    var dDefaultDate = new Date();
    dDefaultDate.setDate(dDefaultDate.getDate() - 3650);
    goSubScStartDate["CardMasterKey"]=dDefaultDate;
    goSubScStartDate["Adfree"]=dDefaultDate;
    //Log("12435: 日付を設定します "+goSubScStartDate["CardMasterKey"]+"/"+dDefaultDate);

    // 購入履歴データに対して繰り返す
    for (iCnt = 0; iCnt < oRestoredData.length; iCnt++) {

        // 対象のデータを格納する
        oProduct = oRestoredData[iCnt];
        /*
        * [{"productId":"Werewolf.Psycho","date":"2017-08-19T14:33:29Z","transactionId":"1000000325861245","state":3}]
        */

        // 対象データのProductIdを取得する
        sProductId = oProduct.productId;
        dProductDate = new Date(oProduct.date);
        iProductState = oProduct.state;

        // プロダクトIDが空でない場合
        if (sProductId != "" && sProductId != undefined) {

            // プロダクトIDから役名とタイプを取得する
            var oRole = ChangeProductIdToRole(sProductId);
//            var sRole = ChangeProductIdToRole(sProductId);
            Log("1020:Role=" + oRole.role + "  Type="+oRole.type);

            // プロダクトタイプによって処理をわける
            switch(oRole.type){
                // カードの場合
                case "Card":
                    // 対象のカードをdomGotCardに保存する
                    domGotCard[oRole.role] = 1;
                    Log("12470: 役職="+oRole.role+"を有効にする");
                    break;

                // サブスクの場合
                case "SubSc":
                    Log("12475:保存="+oRole.role+"/"+goSubScStartDate[oRole.role] +"/対象ログ="+ dProductDate);
                    // 購入データの日付が保存データよりも新しい場合
                    if(goSubScStartDate[oRole.role] < dProductDate){
                        // 最新購入日を更新する
                        goSubScStartDate[oRole.role] = dProductDate;
                        Log("12445:日付更新 "+oRole.role + " → "+dProductDate);
                    }
                    break;

            }

        }
    } // 購入データに対する繰り返し END

    // 今日がgoSubScStartDateから31日以内かチェックする
    for(var sSubScName in goSubScStartDate){

        // 31日経ったかチェックする
        Log("12497:sSubScName="+sSubScName+" goSubScFlg[sSubScName]="+goSubScFlg[sSubScName]+" / goSubScStartDate[sSubScName]="+goSubScStartDate[sSubScName]);
        goSubScFlg[sSubScName] = CheckExpire(goSubScStartDate[sSubScName], 31);
        Log("12499:sSubScName="+sSubScName+" goSubScFlg[sSubScName]="+goSubScFlg[sSubScName]+" / goSubScStartDate[sSubScName]="+goSubScStartDate[sSubScName]);

    }

    // 一時保存する
    SaveDataTmp(domGotCard, "domGotCard");

    // localStore保存する
    SaveData(domGotCard, "domGotCard");

    // サブスク情報を保存する
    SaveData("goSubScFlg");
    SaveData("goSubScStartDate");

    return;
}

/****************************************************
    関数名    CheckExpire
    機能      購入日から指定の日数を過ぎているかチェックする
    
    入力     dPaidDate  購入日（日付型）
            iEnableDays 有効期限
    出力     true: 有効
            false: 有効期限切れ
****************************************************/
function CheckExpire(dPaidDate, iEnableDays){

    var dExpireDate = new Date(dPaidDate);
    var dToday = new Date();

    // 最新の購入日に31日を追加する（期限切れの日を算出）
    dExpireDate.setDate(dExpireDate.getDate() + iEnableDays);

    // 今日が期限切れの日よりも前の場合
    Log("12533:dExpireDate="+dExpireDate+"/dToday="+dToday);
    if(dToday < dExpireDate){
        return true;
    }

    return false;

}

/*******************************************************************************
    関数名    ChangeProductIdToRole
    機能        プロダクトIDから役職名を導き出す。
            カード追加のたびに更新しなくて良いように、文字列操作によって行う。

    入力        sProductId
    出力        sRole

    処理概要
            1. sProductIdから"Werewolf."を削除する
            2. sProductIdから数字を削除する。
            3. 役職名を返して終了する
*******************************************************************************/
function ChangeProductIdToRole(sProductId) {
    var sRole = sProductId;
    var oRole = {"role":"","type":""};

    // OSによって処理を変更する
    switch (gsPlatform) {
        case "Android":
            // 役職名に対して繰り返す
            for (var iCnt = 0; iCnt < gaGotCardType.length; iCnt++) {
                var sLower = gaGotCardType[iCnt].toLowerCase();

                // AndroidのProductIdとマッチする場合
                if (sRole == sLower) {
                    sRole = gaGotCardType[iCnt];
                    oRole = {"role":sRole,"type":"Card"};
                    return oRole;
                }
            }

            break;

        default:
            // Werewolf.を削除する
            sRole = sRole.replace("Werewolf.", "");

            // 数字を削除する
            sRole = sRole.replace(/[0-9]+/, "");

            break;

    }

    // カード名にマッチしない場合（サブスクの場合）
    if(goRoleText[sRole] == undefined){
        // Androidの場合、大文字に戻す
        if(sRole=="cardmasterkey"){
            sRole="CardMasterKey";
        } else if (sRole=="adfree"){
            sRole="Adfree";
        }
        oRole = {"role":sRole,"type":"SubSc"};
        return oRole;
    }

    oRole = {"role":sRole,"type":"Card"};
    return oRole;
}



/**********************************************
    バナー関連
**********************************************/
$(function ($) {
    // Ajaxを実行する前に、Ajaxを終了します。
    $("body").on("ajaxSend", function (c, xhr) {
        $(window).on('beforeunload', function () {
            xhr.abort();
        })
    });
});

/****************************************************
    関数名    GetVersionJSON
    機能      サーバーから最新バージョンの番号を取得し
            　最新バージョンが存在する場合は
              gsStoreURLに、ストアURLを保存する。
              GAME START時に、gsStoreURLが空でない場合は
              ストアへの誘導を行う。
    入力     sUrl   バージョンJSONファイルURL
    G出力     gsStoreURL
****************************************************/
var gaNews = new Array();
function GetVersionJSON(sUrl) {

    // オフラインの場合
    if(!navigator.onLine){
        // バージョンチェックしない
        return;
    }

    //　キャッシュ対策
    sUrl = sUrl + "?" + MakeSerial();

    // AJAXを実行する
    xhr = $.ajax({
        type: "GET",
        url: sUrl,
        dataType: "json",
        cache: false,
        success: function (dData) {
            Log("84:AjaxSuccess");
            // アップデートが必要かチェックする
            gsStoreURL = CheckNeedToUpdate(dData);

            // アップデートがある場合
            if (gsStoreURL != "") {
                Log("10419: バージョンアップが必要です。gsStoreURL=" + gsStoreURL);

                // 強制アップデートの場合
                if (gbUpdateMust == true) {
                    // アップデートのアラートを表示する
                    var aMessage = GetAlertMessage("ConfirmUpdateMust", gsUpdateVersion);
                    ShowConfirm(aMessage[0], aMessage[1], "ClickBanner('" + gsStoreURL + "')");

                    // 強制ではない場合
                } else {
                    // アップデートのアラートを表示する
                    var aMessage = GetAlertMessage("ConfirmUpdate", gsUpdateVersion);
                    ShowConfirm(aMessage[0], aMessage[1], "ClickBanner('" + gsStoreURL + "')");
                }
            }

            // Newsがあるかチェックする
            CheckNews(dData);

            // gaNewsの0番目を表示し、表示されたNewsをgaNewsから取り除く
            ShowNews();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Log('104:AjaxError:' + sUrl);
            Log('XMLHttpRequest' + XMLHttpRequest);
            Log(textStatus);
        }
    });

}

/****************************************************
    関数名   CheckNeedToUpdate
    機能     アップデートが必要かどうかチェックする。
            アップデートが必要な場合は、gsStoreURLに
            アップデート先のストアURLを格納する。

    入力     oData      JSONデータ
    G入力    gsVersion  このソースバージョン
            gbFull      false:無料版、true:有料版
            gsPlatform  iOS or Android
    出力    gsStoreURL ストアURL（アップデートが必要な場合）

    処理概要
            1. 環境文字列を作成する "iOS_FREE" "iOS_SP"など
            2. 環境における最新バージョン番号を取得する
            3. このソースバージョンと最新バージョンを比較する
            4. アップデートが必要な場合
             4.1. gsStoreURLにストアのURLを格納する
            5. 終了する
****************************************************/
function CheckNeedToUpdate(oData) {

    // アプリの種類識別子
    var sAppId = gsPlatform;

    // 無料版の場合
    if (!gbFull) {
        sAppId += "_FREE";
    } else {
        sAppId += "_SP";
    }

    // 最新バージョン番号を取得する
    Log("10464:最新バージョン情報を取得しました");
    Log(oData);
    var sNewVersion = oData[sAppId]["version"];


    // アップデートできる場合
    if (CompareVersionNumber(gsVersion, sNewVersion, oData[sAppId]["must"])) {
        // ストアURLにストアのURLを格納する
        return oData[sAppId]["url"];
    } else {
        return "";
    }

}

/****************************************************
    関数名    CompareVersionNumber
    機能      このソースのバージョンと、最新バージョンを比較し
             新しいバージョンが存在する場合、trueを返す。

    入力     sMyVersion     このソースのバージョン
            sNewVersion     最新バージョン
            bMust          強制アップデートフラグ
    出力     bUpdate        true:アップデート可能
****************************************************/
function CompareVersionNumber(sMyVersion, sNewVersion, bMust) {

    var iMyVerson = 0;
    var iNewVersion = 0;

    var aNumber = [];

    // ドットごとに文字列を分ける
    aNumber = sMyVersion.split(".");
    iMyVersion = aNumber[0] * 10000 + aNumber[1] * 100 + aNumber[2] * 1;
    aNumber = sNewVersion.split(".");
    iNewVersion = aNumber[0] * 10000 + aNumber[1] * 100 + aNumber[2] * 1;

    // 最新バージョンの方が、本ソースよりも新しい場合
    if (iNewVersion > iMyVersion) {
        // アップデートバージョンを保存する
        gsUpdateVersion = sNewVersion;

        // 強制アップデートの場合
        if (bMust == true) {
            // 強制アップデートフラグをオンにする
            gbUpdateMust = true;
        }
        return true;
    } else {
        return false;
    }
}


/****************************************************
    関数名    CheckNews
    機能      ニュースをチェックする
    
    入力     dData
    出力     aNews
****************************************************/
var gaFinishedNews = [];
function CheckNews(oData) {

    var iNewsId;

    var aNews = new Array();
    aNews = oData["news"];

    // 既読データを取得する
    gaFinishedNews = LoadData("gaFinishedNews");
    if (gaFinishedNews == undefined || gaFinishedNews=="") {
        gaFinishedNews = [];
    }

    // 今日の日付から日付数値を取得する 2024070101
    // 現在の日付を取得
    var currentDate = new Date();

    // 1ヶ月前の日付を計算（注：ここでは30日前としています）
    currentDate.setDate(currentDate.getDate() - 30);

    // 年、月、日を個別に取得
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // 月は0から始まるため、1を加える
    var day = currentDate.getDate();

    // 月と日が一桁の場合、先頭に0を付ける
    month = (month < 10) ? '0' + month : month;
    day = (day < 10) ? '0' + day : day;

    // YYYYMMDD形式で結果を出力
    var iPeriod = '' + year + month + day;
    iPeriod = iPeriod - 0;

    Log("12883:" + iPeriod);
    Log("12884 aNews.length" + aNews.length);
 
    // Newsデータに対して繰り返す
    var iCnt = 0;
    for (iCnt = 0; iCnt < aNews.length; iCnt++){
        Log("12888:" + iCnt);

        // NewsIDを取得する
        iNewsId = aNews[iCnt]["id"] - 0;
        Log("12872: iNewsId=" + iNewsId);

        // 期限切れの場合
        if (iPeriod > iNewsId) {
            // 次の処理へ進む
            continue;
        }

        // 既読データに含まれるかチェックする
        var iFinishFlg = false;
        for (var iFinishCnt = 0; iFinishCnt < gaFinishedNews.length; iFinishCnt++){

            // 既読だった場合
            if (iNewsId == gaFinishedNews[iFinishCnt]) {
                iFinishFlg = true;
            }
        }
        // 新しいニュースの場合
        if (iFinishFlg == false) {
            Log("12917 新しいNews iNewsId=" + iNewsId);
            // 表示するNewsのリストにNewsデータを追加する
            gaNews.push(aNews[iCnt]);

        }

    }

    SaveDataTmp(gaNews, "gaNews");

    // 表示するgaNewsをリターンする
    return;
    
}

/****************************************************
    関数名    ShowNews
    機能      gaNewsから最新Newsデータを取得して、Newsモーダルを表示する。
             表示したNewsを「キャンセル」もしくは「もっと見る」すると
             既読リストとしてローカル保存される。
             この関数は１つのNewsの表示しか行わない。
             詳しくは DoneNews()を参照してください。
    
    入力     gaNews
              img:画像ファイルのパス
              id:日付をもとにしたシリアル番号 YYYYMMDDXX
              url:「もっと見る」をタップしたときに実行されるリンクURL
                   javascript:jQT.goTo()もつかえる

    出力     モーダル表示
****************************************************/
function ShowNews() {

    gaNews = LoadDataTmp("gaNews");

    // Newsが存在しない場合は終了する
    if (gaNews == undefined || gaNews.length <= 0) {
        return;
    }
    // 最新のニュースデータを取得する
    var aNewsData = gaNews[0];

    Log("12926:" + gaNews[0]);
    Log(aNewsData);

    // モーダルを表示する
    $("#NewsModal .MainImage").attr("src", aNewsData["img"]);

    // モーダルを表示する
    $("#NewsModal").show();
}
/****************************************************
    関数名    DoneNews
    機能      モーダルボタンのキャンセルと「もっと見る」の処理をする
    
    入力    
            bMode 0:キャンセル  1:もっと見る
            gaNews[0]
              img:画像ファイルのパス
              id:日付をもとにしたシリアル番号 YYYYMMDDXX
              url:「もっと見る」をタップしたときに実行されるリンクURL
                   jQT.goTo()もつかえる

    出力     モーダル表示

    処理概要
            1. 既読データを保存する
            2. gaNews[0]を削除する
            3. キャンセルの場合
             3.1. gaNewsがまだ残っている場合は、再度、ShowNews()する
            4. もっと見るの場合
             4.1. URLの場合（httpで始まる場合）
              4.1.1 URLにアクセスする
             4.2. URLに指定されたJavaScriptを実行する

****************************************************/
function DoneNews(bMode) {

//    gaNews = LoadDataTmp("gaNews");

    // ニュースデータを取得する
    var sUrl = gaNews[0]["url"];
    var iId = gaNews[0]["id"];

    // ニュースを一つ削除する
    gaNews.splice(0, 1);

    // 既読データに保存する
    gaFinishedNews.push(iId);
    // 既読データが20件超えたら既読データを削除する
    if (gaFinishedNews.length > 20) {
        gaFinishedNews.splice(0, 1);
    }
    // 既読データを保存する
    SaveData(gaFinishedNews, "gaFinishedNews");


    // モードによって処理を切り替える
    switch (bMode) {
        // キャンセルの場合
        case 0:
            // いったんモーダルを非表示にする
            $("#NewsModal").hide();
            // Newsが残っている場合
            if (gaNews.length > 0) {
                SaveDataTmp(gaNews, "gaNews");

                // 次のNewsを表示する
                ShowNews();
            }
            // 何もしない
            break;
        
        // 「もっと見る」の場合
        default:

            // URLの場合
            if (sUrl.indexOf("http") >= 0) {
                // いったんモーダルを非表示にする
                $("#NewsModal").hide();
                // Newsが残っている場合
                if (gaNews.length > 0) {
                    SaveDataTmp(gaNews, "gaNews");

                    // 次のNewsを表示する
                    ShowNews();
                }
                ClickBanner(sUrl);
            } else {
                // いったんモーダルを非表示にする
                $("#NewsModal").hide();
                eval(sUrl);
            }
            break;
    }
    
}

function GetBannerJSON_OLDVERSION(sUrl) {
    // AJAXを実行する
    xhr = $.ajax({
        type: "POST",
        url: sUrl,
        dataType: "json",
        cache: false,
        async: true,
        success: function (dData) {
            Log("84:AjaxSuccess");
            InitBanner(dData);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Log('104:AjaxError:' + sUrl);
            Log('XMLHttpRequest' + XMLHttpRequest);
            Log(textStatus);
        }
    });

}
/*******************************************************************************
    関数名    InitBanner
    機能        取得したJSONデータから環境にあわせたデータを抜き出す。バナー表示のSetIntervalをセットする
    
    G入力    giChangeTime
    入力        sJSON        バナーJSONデータ
    出力        なし
*******************************************************************************/
function InitBanner(oData) {
    // 表示フラグをオンにする
    gbBannerFlg = true;

    // バナー切り替え時間 4秒
    var iChangeTime = 10000;
    var iStartTime = 2000;

    /*        
        // スペシャルパッケージには広告を出さない
        if(gbFull == true){
            // 何もしない
            return;
        }
    */

    // すでにタイマーが起動されている場合
    if (giTime != 0) {
        // タイマーを初期化する
        clearInterval(giTime);
    }

    //    var sPlatform = CheckPlatform();

    // 環境に合わせたバナーデータを選択する
    var aBannerList = [];
    aBannerList = SelectPlatformBanner(oData, gsPlatform);

    // バナーをランダムにする
    gdBanner = ShuffleArray(aBannerList);

    giTime = setInterval("ShowBanner()", iChangeTime);
    setTimeout("ShowBanner()", iStartTime);
    // タイトル画面が表示されたときに、InitBannerを実行する

}

/*******************************************************************************
    関数名    StartShowBanner
    機能        トップページに戻ってきたときに、バナー表示を再生する。JSONデータは取りに行かない。
*******************************************************************************/
function StartShowBanner() {
    var iChangeTime = 10000;
    if (gdBanner[0] != undefined) {
        giTime = setInterval("ShowBanner()", iChangeTime);
        ShowBanner();
    }
}




/*******************************************************************************
    関数名    SelectPlatformBanner
    機能        JSONデータから環境にあわせたデータのみを取得する
*******************************************************************************/
function SelectPlatformBanner(oData, sPlatform) {
    var aBanner = [];

    switch (sPlatform) {
        case "iOS":
        case "MacOSBrowser":

            aBanner = CloneArray(oData["iOS"]);
            break;
        case "Android":
        case "AndroidBrowser":
            aBanner = CloneArray(oData["Android"]);
            break;
        default:
            aBanner = CloneArray(oData["iOS"]);
    }
    return aBanner;
}
/*******************************************************************************
    関数名    CloneArray
    機能        配列をコピーする

    入力        src        元配列
    出力        dst        コピー先の配列
*******************************************************************************/
function CloneArray(src) {
    var dst = [];
    for (var iCnt = 0; iCnt < src.length; iCnt++) {
        dst[iCnt] = src[iCnt];
    }
    return dst;
}



function ClickBanner(sLink) {

    // ページをオープンする
    open(sLink, "_system", "location=yes");

    // グーグルにログを残す
    LogGA("BannerClick", sLink, 1);

}


/*******************************************************************************
    関数名    ShowAnswer
    機能    役職の内容を事前表示する。タップの順番は、AABBA

    入力    sMode
    出力    なし
*******************************************************************************/
var giShowAnswerStatus = 0;
function ShowAnswer(sMode) {

    // タップ状態
    var bSuccess = false;
    $("#SecretAnswerBox").hide();

    Log("ShowAnswer:" + giShowAnswerStatus);

    // ステータスによって切り替える
    switch (giShowAnswerStatus) {
        case 0:
        case 1:
            // Aをタップされた場合
            if (sMode == "A") {
                // ステータスを進める
                giShowAnswerStatus++;
            } else {
                // ステータスを戻す
                giShowAnswerStatus = 0;
            }
            break;

        case 2:
        case 3:
            // Bをタップされた場合
            if (sMode == "B") {
                giShowAnswerStatus++;
            } else {
                giShowAnswerStatus = 0;
            }
            break;

        case 4:
            // Aをタップされた場合
            if (sMode == "A") {
                bSuccess = true;
            }
            // 初期化する
            giShowAnswerStatus = 0;
            break;

        default:
            break;
    }

    // 成功した場合
    if (bSuccess == true) {

        OutputAnswerHtml();
        $("#SecretAnswerBox").show();

    }


}


/*******************************************************************************
    関数名    OutpuAnserHtml
    機能    答えのHTMLを出力する

    入力        なし
    出力        なし
*******************************************************************************/
function OutputAnswerHtml() {
    var sPlayerListHtml = "";

    // プレイヤーリストに対して繰り返す
    for (var iPlayerCnt = 0; iPlayerCnt < gaPlayer.length; iPlayerCnt++) {
        // 対象のプレイヤーの役割を置き換える
        sPlayerListHtml += "<div>" + gaPlayer[iPlayerCnt].sName + " : " + gaPlayerAnswer[iPlayerCnt] + "</div>";

    }

    // HTMLに出力する
    $("#SecretAnswer").html(sPlayerListHtml);

    return;
}


/****************************************************
    関数名    InitGmTool
    機能        ゲームマスターツールを初期化する

    入力        bGmToolFlg    ツール有効フラグ
    出力        なし
****************************************************/
function InitGmTool(bGmToolFlg) {

    // 一覧を初期化する
    $("#Timer .GameMasterTool").hide();
    $("#Timer .PlayerBox_OUTPUT").empty();

    // ゲームマスターツールが有効の場合
    if (bGmToolFlg) {
        // ゲームマスターツールを初期化する
        $("#Timer .ShowGmButton").show();
    } else {
        // ゲームマスターツールを非表示にする
        $("#Timer .ShowGmButton").hide();
    }

}


/*******************************************************************************
    関数名     ShowGmTool
    機能       ゲームマスターツールを表示する。"#Timer .PlayerListBox"の中にプレイヤーの数だけ
              PlayerBoxを挿入する。生きているプレイヤーには殺害ボタンを。死亡プレイヤーには復活ボタンを
              表示する。

    入力       bOpenFlg    表示フラグ
    出力       なし
*******************************************************************************/
function ShowGmTool(bOpenFlg) {

    var aHtml = [];
    aHtml["Revive"] = '<div class="redButton" onclick="ChangeLive([ToPlayerId],1)">[ButtonText]</div>';
    aHtml["Kill"] = '<div class="blueButton" onclick="ChangeLive([ToPlayerId],0)">[ButtonText]</div>';

    var sButtonText = "";
    var sButtonHtml = "";



    // オープンモードの場合
    if (bOpenFlg) {

        // オープンボタンをクローズボタンに差し替える
        $("#Timer .GameMasterToolButton").hide();
        $("#Timer .FinishDiscussionButton").hide();
        $("#Timer .GameMasterTool").show();

        // オープンボタンをクローズボタンに差し替える
        $("#Timer .PlayerBox_OUTPUT").empty();

        //  プレイヤーの数だけ繰り返す
        for (var iCnt = 0; iCnt < gaPlayer.length; iCnt++) {

            // プレイヤーテンプレートを複製する
            var htmlTemplate = $("#Timer .PlayerBox_TEMPLATE").clone();
            htmlTemplate.removeAttr("style");
            htmlTemplate.removeClass("PlayerBox_TEMPLATE");

            // HTMLに加える
            htmlTemplate.appendTo("#Timer .PlayerBox_OUTPUT");

            // 名前を差し替える
            htmlTemplate.find(".PlayerName").text(gaPlayer[iCnt].sName);

            // プレイヤーが生きている場合
            if (gaPlayer[iCnt].bLive) {
                sButtonText = goButtonText["GmToolKill"];
                sButtonHtml = ReplaceButtonHtml(aHtml["Kill"], null, iCnt, null, sButtonText);
            } else {
                sButtonText = goButtonText["GmToolRevive"];
                sButtonHtml = ReplaceButtonHtml(aHtml["Revive"], null, iCnt, null, sButtonText);
            }
            htmlTemplate.find(".RightCol").html(sButtonHtml);

        }

        // クローズモードの場合
    } else {
        // オープンボタンをクローズボタンに差し替える
        $("#Timer .GameMasterToolButton").show();
        $("#Timer .FinishDiscussionButton").show();
        $("#Timer .GameMasterTool").hide();

        // メモリリーク対策 ver.9.8.7
        //$("#Timer .PlayerBox_OUTPUT").empty();
        $("#Timer .PlayerBox_OUTPUT").empty();

        // ゲーム終了にならないかチェックする
        sGameSetResult = CheckGameSetResult();

        // ゲームセットの場合（未決着でない、かつ、あと１人で人狼と人数が同じになる、でない）
        if (sGameSetResult != 0) {

            // リモートモード対応 ver.10.0.0
            gsRemoteGameSetResult = sGameSetResult;

            // ゲームセット画面に移動する
            var bGameSetFlg = MoveFromMorningToGameSet(sGameSetResult);

            if (bGameSetFlg) {
                return;
            }
        }
    }

}

/****************************************************
    関数名    ChangeLive
    機能        対象プレイヤーの生死を切り替える

    入力        iPlayerId    プレイヤーID
            bLiveFlg    生死状態
    出力        なし

    処理概要
            1. gaPlayerの生存状態を変更する
            2. プレイヤーリストをリフレッシュする
****************************************************/
function ChangeLive(iPlayerId, bLiveFlg) {

    // プイレイヤーの生存状態を更新する
    gaPlayer[iPlayerId].bLive = bLiveFlg;

    // ゲームマスターツールのプレイヤーリストを更新する
    ShowGmTool(true);

}

/****************************************************
    関数名    PushNarration
    機能      ナレーションボタンのオン・オフを切り替え
             音声の再生・停止を行う
    入力      oDiv ボタンオブジェクト
    出力      なし

    処理概要
            1. divの中に"1"が記述されている場合（再生中）
             1.1. ボタンを「読み上げる」に変更
             1.2. divの中身を空にする
             1.3. ナレーションをストップする
            2. divの中に"1"が記載されていない場合（停止中）
             2.1. ボタンを「ストップ」に変更
             2.2. divの中身に"1"を記述
             2.3. ナレーションをスタートする
****************************************************/
var gsNarrationFile = "";
var gsNarrationId = "";
function PushNarration(oDiv) {
    var bMode = $(oDiv).text();
    var sId = $(oDiv).attr("id");
    var sAudioFile = "audio/" + sId + ".mp3";

    // 再生中の場合（ストップするとき）
    if (bMode == "1") {
        // ボタンを読み上げるに変更
        $(oDiv).removeClass("PushNarrationOn");

        // divの中身を初期化
        $(oDiv).text("");

        // 音声をストップする
        PlayAudio(sAudioFile, true);

        // ナレーションボタンのIDを保存する
        gsNarrationId = "";

        // 停止中の場合（再生するとき）
    } else {

        // 前のシーンのナレーションが再生されている場合
        if (gsNarrationId != "") {

            // ボタンを読み上げるに変更
            $("#" + gsNarrationId).removeClass("PushNarrationOn");

            // divの中身を初期化
            $("#" + gsNarrationId).text("");

            // 音声をストップする
            PlayAudio(gsNarrationFile, true);
        }

        // ナレーションボタンのIDとファイル名を保存する
        gsNarrationId = sId;
        gsNarrationFile = sAudioFile;

        // ボタンを「ストップ」に変更
        $(oDiv).addClass("PushNarrationOn");

        // divの中身に"1"を記述
        $(oDiv).text("1");

        // 音声を再生する
        PlayAudio(gsNarrationFile);
    }
}


/****************************************************
    関数名    ShowReview
    機能      iOSの場合は、レビューウィンドウを表示する。
            Androidの場合は、レビュー確認のアラートを表示する。

    入力      なし
    出力      レビューの実施フラグ  1:レビューする  0:レビューしない
****************************************************/
var goAppId = {
    "iOS": "433622275",
    "iOSSP": "639219540",
    "Android": "mobi.mo61.Werewolf",
    "AndroidSP": "mobi.mo61.WerewolfSP"
}
var giReviewCnt = 0;
var giReviewMax = 10;
var gbReviewd = false;
var giReviewMaxSet = {
    "First": 10,
    "Second": 30,
    "Reviewed": 50
};

function ShowReview() {

    var iReviewCnt = LoadData("giReviewCnt");
    var iReviewMax = LoadData("giReviewMax");

    // データが保存されていない場合
    if (iReviewCnt == undefined || iReviewCnt == "") {
        // 初期化する
        giReviewCnt = 0;
    } else {
        giReviewCnt = iReviewCnt;
    }
    // データが保存されていない場合
    if (iReviewMax == undefined || iReviewMax == "") {
        // 初期化する
        giReviewMax = giReviewMaxSet.First;
    } else {
        giReviewMax = iReviewMax;
    }

    Log("10451:ShowReview:" + giReviewCnt);
    // 実行回数がMAXを超えていない場合
    if (giReviewCnt < giReviewMax) {
        // インクリメントして終了する
        giReviewCnt++;
        SaveData(giReviewCnt, "giReviewCnt");
        return false;
    } else {
        giReviewCnt = 0;
        SaveData(giReviewCnt, "giReviewCnt");
    }

    // プラットフォームによって処理を変更する
    switch (gsPlatform) {

        // iOSの場合
        case "iOS":

            // レビューウィンドウを表示する
            //            LaunchReview.rating(() => {
            LaunchReview.rating(function () {
                Log("アプリ内レビューが成功しました");
                giReviewMax = giReviewMaxSet.Reviewed;
                SaveData(giReviewMax, "giReviewMax");
                // レビュー表示のログを残す
                LogGA("ShowReview", gsPlatform, giReviewMax);
            }, function (err) {
                Log("アプリ内レビューが失敗しました。");
                LogGA("ShowReviewErr", gsPlatform, giReviewMax);
            });
            break;


        // Androidの場合
        case "Android":
            giReviewMax = giReviewMaxSet.Second;
            SaveData(giReviewMax, "giReviewMax");

            // レビューをするか確認する
            ConfirmToAccessToReview();

            break;
    }

    return true;
}

/****************************************************
    関数名    ConfirmToAccessToReview
    機能      Storeのレビューページにアクセスするか、確認する。

    入力      sAppId    アプリID
    出力      レビューの実施フラグ  1:レビューする  0:レビューしない
****************************************************/
function ConfirmToAccessToReview() {
    var sPlatform = gsPlatform;

    // SP版の場合
    if (gbFull) {
        sPlatform = sPlatform + "SP";
    }

    var sAppId = goAppId.sPlatform;

    // 確認アラートを表示する。OKの場合、ストアページにアクセスする
    var aMessage = GetAlertMessage("ConfirmReview");
    ShowConfirm(aMessage[0], aMessage[1], "AccessToReview(" + sAppId + ")");

    return;
}


/****************************************************
    関数名    AccessToReview
    機能      Storeのレビューページにアクセスする。

    入力      sAppId    アプリID
    出力      レビューの実施フラグ  1:レビューする  0:レビューしない
****************************************************/
function AccessToReview(sAppId) {
    LaunchReview.launch(function () {
        giReviewMax = giReviewMaxSet.Reviewed;
        SaveData(giReviewMax, "giReviewMax");
        Log("レビュー表示が成功しました/giReviewMax=" + giReviewMax);

        // レビュー表示のログを残す
        LogGA("ShowReview", gsPlatform, giReviewMax);

    }, function (err) {
        Log("レビュー表示が失敗しました。");
        LogGA("ShowReviewErr", gsPlatform, giReviewMax);
    }, sAppId);

}

function ShareGameResult() {
    Log("11966:ShareGameResult:" + gsWinner + "/" + goRoleText[gsWinner]);
    var sResult = "";

    // 日本語の場合
    if (gsLocale == "ja-jp") {
        sResult = "【人狼ゲーム / " + gsGameStartDate + " 】\n勝利: " + goRoleText[gsWinner] + gsTeam + "\nプレイ時間: " + gsPlayTime + "\n#人狼ゲーム牢獄の悪夢";

    } else {
        sResult = "[Werewolf Game / " + gsGameStartDate + "]\nWinner: " + goRoleText[gsWinner] + gsTeam + "\nPlay Time: " + gsPlayTime + "\n#WerewolfNightmareInPrison";
    }
    Log("11971:ShareGameResult");

    // スクリーンショットを実行し、
    // ShareImage関数を実行する
    if (gbIsApp) {
        TakeScreenShot("SHARE", sResult, "");
    } else {
        TakeScreenShot("IMAGE", sResult, "#InputCapture");
    }

    return;
}
function ShareImage(sBase64Image, sMessage) {
    Log("ShareImage:" + sMessage);
    window.plugins.socialsharing.share(sMessage, null, sBase64Image, null);
    return;
}
/****************************************************
    関数名    TakeScreenShot
    機能      スクリーンショットを取り、base64形式の文字列を返します。
             class="ScreenShotHide"のDOMを非表示にして撮影します。
             class="ScreenShotShow"のDOMを表示して撮影します。
             SHAREモード：スクリーンショットをシェアします
             IMGモード：sImgIdで指定された画像タグにスクリーンショットを表示します

    入力     sMessage      SHAREモードの場合にシェアしたい本文
            sMode           "SHARE" or "IMG"
    出力     sBase64Image
****************************************************/
function TakeScreenShot(sMode, sMessage, sImgId) {
    var iQuality = 70;
    // test
    //    sMode = "IMAGE";
    //    sImgId = "#OutputCapture";
    Log("11996:ScreenShot / " + sMode + "/" + sMessage + "/" + sImgId);

    // ScreenShotに表示・非表示したいDOMを制御します。
    $(".ScreenShotHide").hide();
    $(".ScreenShotShow").show();

    // バナーを隠す→ ややこしいことになるので、非表示させない
    //ShowBanner(true);

    //window.scrollTo(0, 0);
    window.scroll({
        top: 0,
        behavior: "instant"
    });
    // スクリーンショットが、レンダリング前に走るのを防ぐ
    var iLoopCnt = 0;
    var tScreenShot = setInterval(function () {
        Log("12030:LoopCnt=" + iLoopCnt + "/scrollY=" + window.scrollY + "/display=" + $("#ScreenShotButton").css("display"));
        // スクロールが完了していれば
        if (window.scrollY == 0 && $("#ScreenShotButton").css("display") == "none") {
            if (gbIsApp) {
                // スクリーンショットを実行してループをクリアする
                navigator.screenshot.URI(function (error, res) {
                    if (error) {
                        Log(error);
                    } else {
                        // シェアする
                        ShareImage(res.URI, sMessage);
                        $(".ScreenShotHide").show();
                        $(".ScreenShotShow").hide();
                        return;
                    }
                }, 60);
            } else {
                $(".ScreenShotHide").show();
                $(".ScreenShotShow").hide();
                alert("TakeScreenShot");
            }
            clearInterval(tScreenShot);
        };
        // 繰り返しを5回繰り返した場合
        if (iLoopCnt >= 5) {
            clearInterval(tScreenShot);
        }
        iLoopCnt++;
    }, 500);
    return;

}


function SetFlickity(sSlideId, sCellId, sNaviId, sNaviCellId) {

    /** スライドを有効にする by flicky*****/
    $CardSlider = $(sSlideId).flickity({
        prevNextButtons: false,
        contain: true,
        pageDots: false,
        adaptiveHeight: false,
        cellSelector: sCellId,
        selectedAttraction: 0.1,
        friction: 0.5
        //        wrapAround: true
        //        draggable: false,
    });
    /** NAVI by flicky*****/
    if (sNaviId != undefined) {
        Log("12186 sNaviId=" + sNaviId + "/" + sSlideId);

        $CardSliderNavi = $(sNaviId).flickity({
            asNavFor: $(sSlideId)[0],
            prevNextButtons: false,
            pageDots: false,
            contain: true,
            cellSelector: sNaviCellId
            //            wrapAround: true
            //            percentPosition:false
        });
    }
    return;
}

/****************************************************
    関数名    ShowCardSlider
    機能      カードの数だけ、スライダーにカードを表示する。
             カード設定の作成スプレッドシートはこちら。
             https://docs.google.com/spreadsheets/d/10aQ6yTXqohBw84bXwJmx14IzfWzsRcPuPaFV6t6QtNE/edit?usp=sharing

    入力     sOutputId      出力先DOM_ID
    G入力    gaCardInfo     カード設定情報
****************************************************/
function ShowCardSlider(sOutputId, sTemplateClass, sOutputNaviId, sTemplateNaviClass) {

    var sRole = "";

    Log("12114 ShowCardSlider Do **************:" + sOutputId + "/" + sTemplateClass);

    // カードリストを初期化のため削除する
    if (sOutputId) {
        $(sOutputId).empty();
    }
    // カード設定画面の場合
    if (sOutputNaviId) {
        $(sOutputNaviId).empty();
    }

    // カードの数だけ繰り返す
    var htmlTemplate;
    for (var iCnt = 0; iCnt < gaCardInfo.length; iCnt++) {

        // 役職を格納
        sRole = gaCardInfo[iCnt].CardType;

        /* CardSlider用の処理 *****************************/
        // テンプレートを複製する
        htmlTemplate = $("." + sTemplateClass).clone();
        htmlTemplate.removeAttr("style");
        htmlTemplate.removeClass(sTemplateClass);
        htmlTemplate.addClass("gallery-cell");
        htmlTemplate.addClass("gallery-cell_" + sRole);

        // WerewolfVoice対応 ver 3.2
        //        htmlTemplate.attr("id", "CardType_" + gaCardInfo[iCnt].CardType);

        // HTMLに加える
        htmlTemplate.appendTo(sOutputId);

        // 役職カード
        htmlTemplate.find('.CardImage .CardRole img').attr("src", "img/Card_" + gaCardInfo[iCnt].CardType + ".png");

        // 役職名 *************************************/
        htmlTemplate.find(".Jp .InputCardName").addClass("CARD_Jp_" + sRole);
        htmlTemplate.find(".En .InputCardName").addClass("CARD_En_" + sRole);
        htmlTemplate.find(".InputCardName").attr("data-role", sRole);
        htmlTemplate.find(".InputCardName").blur(function () {
            CheckCardNameEmpty(this);
        });

        // カード設定画面の場合
        if (sOutputNaviId) {

            // 名前変更不可能な役職の処理
            switch (sRole) {
                case "Citizen":
                    // 数字のプラス・マイナスボタンを削除
                    htmlTemplate.find(".CardNumButton").css("visibility", "hidden");

                case "Werewolf":
                    // 名前の変更を不可能にする
                    htmlTemplate.find(".InputCardName").attr("readonly", true);
                    htmlTemplate.find(".InputCardName").css("background-image", "none");
                    break;
            }
            // 新商品フラグ
            if (gaCardInfo[iCnt].NewFlg == 1) {
                htmlTemplate.find('.NewFlg').show();
            }
            // 無料カードの処理
            switch (sRole) {
                case "Citizen":
                case "Werewolf":
                case "FortuneTeller":
                case "Knight":
                case "Shaman":
                    htmlTemplate.find(".BuyCard").hide();
            }

        // チュートリアルの場合
        } else {
            // カードの文言変更をできないようにする
            htmlTemplate.find(".InputCardName").attr("readonly", true);
            htmlTemplate.find(".InputCardName").css("background-image", "none");

        }

        // 役職下のチームカラーボーダー
        htmlTemplate.find('.CardDataBorder').addClass(gaCardInfo[iCnt].Team);

        // ナビゲーションの設定 ******************************
        // カード設定画面の場合（チュートリアルでは表示しない）
        if (sOutputNaviId) {
    
            // 購入ボタン
            htmlTemplate.find(".BuyCard").addClass("BuyCard" + sRole);
            htmlTemplate.find(".BuyCard").attr("data-role", sRole);

            // カード枚数設定ボタン
            htmlTemplate.find(".GotCard").addClass("GotCard" + sRole);
            htmlTemplate.find(".CardNum").attr("id", "CardNum_" + sRole + "_Num");

            htmlTemplate.find(".MinusCard").attr("data-role", sRole);
            htmlTemplate.find(".MinusCard").attr("id", "CardNum_" + sRole + "_Minus");
            htmlTemplate.find(".MinusCard").on('click', function (event) {
//                event.preventDefault();
                PlusCard(this, -1);
            });
            htmlTemplate.find(".PlusCard").attr("data-role", sRole);
            htmlTemplate.find(".PlusCard").attr("id", "CardNum_" + sRole + "_Plus");
            htmlTemplate.find(".PlusCard").on('click', function (event) {
//                event.preventDefault();
                PlusCard(this, 1);
            });

            /* カード下のナビ用の処理 *****************************/
            // テンプレートを複製する
            htmlTemplate = $("." + sTemplateNaviClass).clone();
            htmlTemplate.removeAttr("style");
            htmlTemplate.removeClass(sTemplateNaviClass);
            htmlTemplate.addClass("navi-cell");
            htmlTemplate.addClass("navi-cell_" + sRole);
            htmlTemplate.appendTo(sOutputNaviId);
            // 役職カード
            htmlTemplate.find('.NaviCard').attr("src", "img/Card_" + sRole + ".png");
            // 無料カードの処理
            switch (sRole) {
                case "Citizen":
                case "Werewolf":
                case "FortuneTeller":
                case "Knight":
                case "Shaman":
                    htmlTemplate.find(".Lock").attr("src", "img/spacer.gif");
            }
        // チュートリアルページの場合
        } else {
            htmlTemplate.find(".GotCard").hide();
            htmlTemplate.find(".BuyCard").hide();
        }


    }


}

/****************************************************
    関数名    AddSliderButton
    機能      SliderButtonをSliverNaviに追加する

    入力     sOutputId    出力先ID
            sTemplateId  テンプレートID
            sTemplateClass テンプレートIDと同じだが"."がついていない
****************************************************/
function AddSliderButton(sOutputId, sTemplateId, sTemplateClass) {
    var htmlTemplate = $(sTemplateId).clone();
    htmlTemplate.removeAttr("style");
    htmlTemplate.removeClass(sTemplateClass);
    htmlTemplate.appendTo(sOutputId);
}

/****************************************************
    関数名    ShowCardNumList
    機能      選択されたカードリストを表示する

    G入力     gaCardInfo
****************************************************/
function ShowCardNumList() {
    let aList = {
        "Werewolf": "",
        "Citizen": "",
        "Vampire": ""
    };
    let sRole = "";
    let sTeam = "";
    let iCardNum = 0;
    let sRoleText = "";

    // カード情報に対して繰り返す
    for (let iCnt = 0; iCnt < gaCardInfo.length; iCnt++) {

        // 役職名とチームを格納する
        sRole = gaCardInfo[iCnt].CardType;
        sTeam = gaCardInfo[iCnt].Team;

        // 役職の使用枚数を格納する
        iCardNum = goCardNum[sRole];

        // 役職の使用数が 0 でない場合
        if (iCardNum > 0) {
            // カード文言を作成する
            sRoleText = goRoleText[sRole] + " x" + iCardNum;

            // チーム情報文字列に連結する
            aList[sTeam] += sRoleText + "<br>";

        }

    }

    // DOMに出力する
    $("#CardNumList .Werewolf .Roles").html(aList["Werewolf"]);
    $("#CardNumList .Citizen .Roles").html(aList["Citizen"]);
    $("#CardNumList .Vampire .Roles").html(aList["Vampire"]);
    return;

}

/****************************************************
    関数名    ShowWerewolfVoteInfo
    機能      「殺害する」ボタンの下に、他の人狼の投票情報を表示する

    G入力     gaKill    人狼の「殺害する」投票リスト
    出力     なし
****************************************************/
function ShowWerewolfVoteInfo() {

    // ボイス表示を初期化する
    //$(".WerewolfVoteBox").empty();

    // 殺害リストに対して繰り返す
    for (let iCnt = 0; iCnt < gaKill.length; iCnt++) {
        // テンプレートを挿入する
        InsertWerewolfVoteInfo(gaKill[iCnt].iToPlayerId, gaKill[iCnt].iFromPlayerId, gaKill[iCnt].iVote);
    }

}

function InsertWerewolfVoteInfo(iTo, iFrom, iVoteNum) {
    var htmlTemplate = $(".WerewolfVoteBox_TEMPLATE").clone();
    htmlTemplate.removeAttr("style");
    htmlTemplate.removeClass("WerewolfVoteBox_TEMPLATE");
    // HTMLに加える
    htmlTemplate.appendTo(".WerewolfVoteBox.Player_" + iTo);

    // 名前
    htmlTemplate.find('.TextFrom').html(gaPlayer[iFrom].sName);
    // 投票数
    htmlTemplate.find('.VoteNum').css("background-image", "url(img/Icon_KILL_" + iVoteNum + ".png)");

    return;
}



/***************************************************
 * サブスクリプション関連 関数
 ****************************************************/
/****************************************************
    関数名    PurchaseSubscription
    機能      サブスク購入ボタンをタップされたときの処理を行う

    入力      sType  サブスクタイプ "CardMasterKey","Adfree"
****************************************************/
/*
async function PurchaseSubscription_bkup(sType) {

    var oTypeMap = {
        "CardMasterKey": 2,
        "Adfree": 1
    };
    var type = oTypeMap[sType];

    // ローディングを表示する
    ShowLoading(true);

    // エラー終了
    if (sType == "" || sType == null) {
        // エラー終了する
        Log("12716:PurchaseSubscriptionは引数にサブスクタイプを指定する必要があります");
        return;
    }
    Log('PurchaseSubscription:' + sType + "/" + type);

    // ブラウザの場合
    if (!gbIsApp) {
        // 購入完了を実行します。
        ApplySubscription(sType);
        InitPremiumShop();
        ShowLoading(false); // ローディングを非表示にする
        return;
    }

    try {
        const result = await gPaymentService.order(type);
        if (result.isNoSubscription) {
            // 購入できる subscription が存在しない.(通常は起こり得ない)
            Log('[IAP] no subscription');
        } else if (result.isCanceled) {
            // 購入途中でキャンセルした.
            Log('[IAP] canceled');
        } else {
            // 成功.
            Log('[IAP] success');

            // サブスクの効果を反映させる goSubScFlgを更新
            ApplySubscription(sType);
            InitPremiumShop();
        }
    } catch (e) {
        Log('[IAP] error: ' + e);
    }
    // Loadingを非表示にする
    ShowLoading(false);
    return;
}

async function RestoreSubscription_bkup() {
    console.log('RestoreSubscription');
    try {
        const result = await gPaymentService.restore();
        if (result.isNoSubscription) {
            // 購入中のサブスクリプションがない.
            Log('[IAP] no subscription');
        } else if (result.isCanceled) {
            // 復元途中でキャンセルした.
            Log('[IAP] canceled');
        } else {
            // 成功.
            Log('[IAP] success');
        }
    } catch (e) {
        Log('[IAP] error: ' + e);
    }
    return;
}

// AdFree が有効であれば true.
async function IsAdfreeValid_bkup() {
    return await gPaymentService.promiseOrTimeout(
        gPaymentService.isAdFreeValid(),
        _IAP_TIMEOUT
      );
}

// マスターキーが有効であれば true.
async function IsMasterKeyValid_bkup() {
    return await gPaymentService.isMasterKeyValid();
}

async function ShowProductState_bkup() {
    Log('ShowProductState[IAP] Adfree: ' + await IsAdfreeValid());
    Log('ShowProductState[IAP] MasterKey: ' + await IsMasterKeyValid());
}
*/


/****************************************************
    関数名    ApplySubscription
    機能      サブスクリプションの購入完了時に
             サブスクの効果を反映する。
    
    入力     sType  サブスク商品タイプ（Adfree, 2:CardMasterKey)
    出力     なし
    
    処理概要
            1. Adfreeの場合
             1.1. Bannerを非表示にする
             1.2. Banner表示状態を非表示にする
            2. MasterKeyの場合
             2.1. UseMasterKeyを実行し、すべてのカードを有効にする
             2.2. MasterKeyの反映状態を保存する
             　　（localStorageは必要。サブスク有効期限切れ
             　　　&カード反映状態のときに、もとに戻すため）
****************************************************/
function ApplySubscription(sType) {

    Log("12910:ApplySubscription:Type=" + sType);
    // 購入状態を更新する
    goSubScFlg[sType] = true;
    
    // 購入したサブスク商品ごとに処理をわける
    switch (sType) {
        // Adfreeの場合
        case "Adfree":
            // 広告を非表示にする
            ShowBanner(true);

            // 広告が表示されなくなったことを表示
            aMessage = GetAlertMessage("ApplyAdfree", "");
            ShowAlert(aMessage[0], aMessage[1]);
            
            break;
        
        // MasterKeyの場合
        case "CardMasterKey":
            
            // カードを有効化は、SetRoleNumページで行うので
            // このタイミングでは、実行する必要がありません。


            // 広告が表示されなくなったことを表示
            aMessage = GetAlertMessage("ApplyMasterKey", "");
            ShowAlert(aMessage[0], aMessage[1]);
            
            
            break;
    }
    // subscribe()を実行した際、レスポンスでは
    // 購入日が取れないので、Restoreを実行し
    // goSubScStartDate()を更新する
    RestorePurchase();

    return;
}

/****************************************************
    関数名    InitPremiumShop
    機能      プレミアムショップの画面を初期化する
    
    G入力     goSubScFlg
****************************************************/
function InitPremiumShop() {

    // マスターキーが購入済みの場合
    if(goSubScFlg["CardMasterKey"]){
        $(".SubscriptionButton_MasterKey").hide();
        $(".SubscriptionButtonDisabled_MasterKey").show();
    } else {
        $(".SubscriptionButton_MasterKey").show();
        $(".SubscriptionButtonDisabled_MasterKey").hide();
    }

    // アドフリーが購入済みの場合
    if(goSubScFlg["Adfree"]){
        $(".SubscriptionButton_Adfree").hide();
        $(".SubscriptionButtonDisabled_Adfree").show();
    } else {
        $(".SubscriptionButton_Adfree").show();
        $(".SubscriptionButtonDisabled_Adfree").hide();
    }

    return;

}

/****************************************************
    関数名    LoadTwitter
    機能     id="TwitterCache"
    
    入力     bShowFlg   1:表示する  0:非表示にする
    出力     なし
    
    処理概要
****************************************************/
function LoadTwitter(bShowFlg) {
    var sTwitterId = "werewolf_info";
//    var sDefaultHtml = '<a class="twitter-timeline" data-theme="dark" href="https://twitter.com/' + sTwitterId + '?ref_src=twsrc%5Etfw"><div class="Spinner"><img src="img/Spinner.png"></div></a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>';
    var sDefaultHtml = '<a class="twitter-timeline" data-theme="dark" href="https://twitter.com/' + sTwitterId + '?ref_src=twsrc%5Etfw"><div class="Spinner"><img src="img/Spinner.png"></div></a>';

    if (bShowFlg) {
        let script = document.createElement('script');
        script.src = "https://platform.twitter.com/widgets.js";
        document.body.append(script); // (*)    
    } else {
        // Twitterキャッシュの中を初期化する
        $("#TwitterCache").html(sDefaultHtml);
    }
}


/****************************************************
    関数名    LoadTopics
    機能     $("#Topics_OUTPUT")に対して、News記事をcloneして出力する。
            gaTopicsが空の場合、news.jsonをダウンロードする。
            gaTipicsが空でない場合、ただ移動する。

    入力     なし
    出力     なし
    
    処理概要
****************************************************/
var gaTopics = [];
function LoadTopics() {
    var iCnt = 0;
    var sUrl = "https://werewolf.network/topics/data.json";
//    var sUrl = "http://localhost:8888/topics/data.json";

        // まだデータをダウンロードしていない場合
        if (gaTopics.length == 0) {
            // オフラインの場合
            if (!navigator.onLine) {
                // ネットワークエラーを表示して終了
                aMessage = GetAlertMessage("ErrSendData", "");
                ShowAlert(aMessage[0], aMessage[1]);
                return false;
            }

            //　キャッシュ対策
            sUrl = sUrl + "?" + MakeSerial();

            // AJAXを実行する
            xhr = $.ajax({
                type: "GET",
                url: sUrl,
                dataType: "json",
                cache: false,
                success: function (dData) {
                    Log("14193:AjaxSuccess");

                    // ログを作成する
                    gaTopics = CloneArray(dData);
                    ShowTopics(gaTopics);

                    // Newsページに移動する
                    jQT.goTo("#News");

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    Log('104:AjaxError:' + sUrl);
                    Log('XMLHttpRequest' + XMLHttpRequest);
                    Log(textStatus);
                }
            });
            
        } else {
            // Newsページに移動する
            jQT.goTo("#News");
        }
    
        return;

}

function ShowTopics(aTopics) {
    Log("ShowTopics 14276");
    var sOutputId = "#Topics_OUTPUT_";
    var sTemplateId = ".Topics_TEMPLATE_";

    var aData = {
        "img_jp": "",
        "img_en": "",
        "category": "",
        "title_jp": "",
        "title_en": "",
        "body_jp": "",
        "body_en": ""
    };

    var aLang = ["Jp", "En"];
    var sLang = "";

    // トピックスを初期化のため削除する
    $(sOutputId).empty();

    // トピックスの数だけ繰り返す
    for (iCnt = 0; iCnt < aTopics.length; iCnt++) {

        aData["img_Jp"] = aTopics[iCnt][0];
        aData["img_En"] = aTopics[iCnt][1];
        aData["category"] = aTopics[iCnt][2];
        aData["title_Jp"] = aTopics[iCnt][3];
        aData["title_En"] = aTopics[iCnt][4];
        aData["body_Jp"] = aTopics[iCnt][5];
        aData["body_En"] = aTopics[iCnt][6];
        aData["link"] = aTopics[iCnt][7];

        // 日本語、英語に対して繰り返す
        for (iLangCnt = 0; iLangCnt < aLang.length; iLangCnt++){
            sLang = aLang[iLangCnt];
            sOutputId = "#Topics_OUTPUT_" + sLang;
            sTemplateId = ".Topics_TEMPLATE_" + sLang;

            // 対象言語の本文がある場合
            if (aData["body_" + sLang] != "") {
                // テンプレートを複製する
                var htmlTemplate = $(sTemplateId).clone();
                htmlTemplate.removeAttr("style");
                htmlTemplate.removeClass("Topics_TEMPLATE_" + sLang);
                // HTMLに加える
                htmlTemplate.appendTo(sOutputId);
                

                // ログに画像が含まれる場合
                if (aData["img_" + sLang] != "") {
                    htmlTemplate.find('.ImgBox .img').attr("src", aData["img_" + sLang]);

                    // リンクがある場合は画像にもリンクを貼る
                    if (aData["link"] != "") {
                        Log("14360: link=" + aData["link"]);
                        htmlTemplate.find('.ImgBox').attr("href", "javascript:window.open('" + aData["link"] + "','_system')");
                    } else {
                        htmlTemplate.find('.ImgBox').hide();
                    }
                }

                htmlTemplate.find('.Category').text(aData["category"]);
                htmlTemplate.find('.TitleText' + sLang).text(aData["title_" + sLang]);
                htmlTemplate.find('.BodyText' + sLang).html(aData["body_" + sLang]);
                if (aData["link"] != "") {
                    htmlTemplate.find('.MoreDetail').attr("href", "javascript:window.open('" + aData["link"] + "','_system')");
                } else {
                    htmlTemplate.find('.MoreDetail').hide();
                }
            }

        }

    }

    return;
}


/****************************************************
    関数名    LoadYoutube
    機能     id="TwitterCache"
    
    入力     bShowFlg   1:表示する  0:非表示にする

    出力     なし
****************************************************/
function LoadYoutube(sYoutubeId) {

    var sDefaultHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/[YOUTUBEID]" sandbox="allow-scripts allow-same-origin" frameborder="0" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe>';
    var sReplaceHtml = "";

    // 処理軽減のため、他の動画を画像に戻す
    UnloadYoutube()

    // Youtubeのリンクを更新する
    sReplaceHtml = sDefaultHtml.replace('[YOUTUBEID]', sYoutubeId);
    $("#" + sYoutubeId).html(sReplaceHtml);
    
    return;
    
}

/****************************************************
    関数名    UnloadYoutube
    機能     Youtubeの埋め込みページを初期化する
    
    入力     bShowFlg   1:表示する  0:非表示にする

    出力     なし
    
    処理概要
****************************************************/
function UnloadYoutube() {

    // YoutubeBoxクラスの配列を取得する
    var aYoutubeBox = $(".YoutubeBox");
    var oTargetBox = "";
    var sYoutubeId = "";

//    var sDefaultImg = '<img src="img/Tutorial_[YOUTUBEID].jpg" style="width:100%"></img>';
    var sDefaultImg = 'url("img/Tutorial_[YOUTUBEID].jpg")';
    
    // Youtubeオブジェクトに対して繰り返す
    for (iCnt = 0; iCnt < aYoutubeBox.length; iCnt++){
        // 対象オブジェクトを取得する
        oTargetBox = aYoutubeBox[iCnt];

        // ターゲットのidを取得する
        sYoutubeId = oTargetBox.id;

        // 画像設定を書き換える
        sReplaceHtml = sDefaultImg.replace('[YOUTUBEID]', sYoutubeId);
        $(oTargetBox).html("");
        $(oTargetBox).css("background-image", sReplaceHtml);

    }
   
}

function ShowTutorialRemotePage(sMode) {
    
    var sHtml = '<iframe src="[URL]" frameborder="0" allowtransparency="true"></iframe>';
    var sReplace = "";

    switch (sMode) {
        case "Jp":
            sReplace = sHtml.replace("[URL]", "http://werewolf.network/site/2020/05/25/howtoremote-jp/");
            $("#TutorialRemote .FlexGrow").html(sReplace);
            return;
        
        case "En":
            sReplace = sHtml.replace("[URL]", "http://werewolf.network/site/2020/05/29/howtoremote-en/");
            $("#TutorialRemote .FlexGrow").html(sReplace);
            return;
        
        default:
            $("#TutorialRemote .FlexGrow").html('');
    }
}

function ShowExternalPage(sUrl, sTitleJp, sTitleEn) {

    var sHtml = '<iframe src="[URL]" frameborder="0" allowtransparency="true"></iframe>';

    // sUrlが設定されている場合
    if (sUrl) {
        var sReplace = sHtml.replace("[URL]", sUrl);
        $("#ExternalPage .FlexGrow").html(sReplace);
        $("#ExternalPage h1.Jp").text(sTitleJp);
        $("#ExternalPage h1.En").text(sTitleEn);
        jQT.goTo('#ExternalPage');
    } else {
        $("#ExternalPage .FlexGrow").html('');
    }
    return;
}