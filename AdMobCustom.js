/**********************************************
 * AdMobCustom.js for ver.11 / 2021.10.24
 * AdMobを実行するためのJavaScript
 * sampleソースを元に鈴木が修正済み
 * 
 * ver.11.2.0 / 2022.04.28
 * 注意!!!!!!!!!
 * テスト環境で広告を表示するには、AdMobのテストアプリIDで
 * 実行する必要があります。
 * （本番IDを使っていると、そのうち、広告が表示されなくなります。ブロック）
 * 
 * iOSのAppIDの設定場所:
 * Werewolf-info.plist内
 * "GADApplicationIdentifier"の設定
 * 
 * Androidの AppIDの設定場所:
 * AndroidManifest.xml内
 * <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="ca-app-pub-3426965448048920~5256328729" />
 * 
 * AppIDの一覧
 * iOS本番：ca-app-pub-3426965448048920~6123014904
 * iOSテスト：ca-app-pub-3426965448048920~2873203015
 * Android本番：ca-app-pub-3426965448048920~5256328729
 * Androidテスト：ca-app-pub-3426965448048920~3012803815
 * 
 * **********************************************/


 // Admobテストモード(true) 本番ではfalseにすること
 // werewolf.jsのgbDebugで設定できます
var gbAdmobTestMode = false;

var admobid = {};

// Reward設定 *****************************
// RewardMovieのロード済みフラグ
var gbAdMobLoadedFlg = false;
var gbAdMobLoadingFlg = false;

// リワード動画を見終わったフラグ
var gbGotRewardFlg = false;

// キャンペーンで獲得できる最大枚数
var giCampCardMax = 1;
var gbOverMaxFlg = false;

// 有効時間（分）
var giCampExpireMin = 60;

// インターステーシャル設定 *****************************
// インターステーシャルのロード済みフラグ
var gbInterstitialLoadedFlg = false;

// バナー設定
var gbBannerLoadedFlg = false;
var giTryCount = 0;

// Admobの初期化完了フラグ
var gbAdmobInitFlg = false;

// テストモードの場合
if (gbAdmobTestMode) {
    var goAdmobId = {
        "ios_banner": "ca-app-pub-3426965448048920/4826209240",
        "ios_interstatial": "ca-app-pub-3426965448048920/5947719222",
        "android_banner": "ca-app-pub-3426965448048920/7021127747",
        "android_interstatial": "ca-app-pub-3426965448048920/2774760976"
    };        
// 本番モードの場合
} else {
    var goAdmobId = {
        "ios_banner": "ca-app-pub-3426965448048920/1671647810",
        "ios_interstatial": "ca-app-pub-3426965448048920/7214838286",
        "android_banner": "ca-app-pub-3426965448048920/6733061928",
        "android_interstatial": "ca-app-pub-3426965448048920/1907860654"
    };
}


/****************************************************
    関数名    initAdMob
    機能      AdMobを初期化する
****************************************************/
// 広告オブジェクト
let banner;
let interstitial;

async function initAdMob() {
    console.log("AdMobCustom.js 89:initAdMob Start");

    // iOSの場合
    if (gsPlatform == "iOS") {
        // ターゲット広告の承認を取る（未承認の場合に１回だけ実行される）
        const idfaPlugin = cordova.plugins.idfa;

        // 「トラッキングを許可」ステータスを取得
        /*
        0:TRACKING_PERMISSION_NOT_DETERMINED
            トラッキング確認をまだしていない
        1: TRACKING_PERMISSION_RESTRICTED
            トラッキングを許可していない場合　→ Admob側でトラッキング無し広告を出す
        2: TRACKING_PERMISSION_DENIED
            トラッキングを許可していない場合　→ Admob側でトラッキング無し広告を出す
        3:TRACKING_PERMISSION_AUTHORIZED
            トラッキングを許可している場合　→ Admob側でトラッキング有り広告を出す
        */
        idfaPlugin.getInfo()
            .then(info => {
                Log("64:トラッキングステータス idfaPlugin / trackingLimited=" + info.trackingLimited + " / trackingPermission=" + info.trackingPermission);
                // トラッキング拒否の場合
                if (!info.trackingLimited) {
                    return info.idfa || info.aaid;
                
                // トラッキング承認をまだ確認していない場合
                } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                    // トラッキングの確認画面を表示する
                    return idfaPlugin.requestPermission().then(result => {
                        if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                            return idfaPlugin.getInfo().then(info => {
                                return info.idfa || info.aaid;
                            });
                        }
                    });
                }
            })
            .then(idfaOrAaid => {
                if (idfaOrAaid) {
                    Log(idfaOrAaid);
                }
            });
        
    }

        
    // すでに初期化済みの場合は処理をしない
    if (gbAdmobInitFlg) {
        Log("すでにAdMobの初期化を行っているので、initAdMobを行わない");
        return;
    }

    // AdMobが機能していない場合は終了する
    if ('admob' in this) {
        

        Log( 'AdMobCustom.js:25: initAdMob is running! / platform = ' + gsPlatform );
    } else {
        Log('Safari用：Admobが動作しないので、初期化したことにします');
        
        // Safari用 リワード動画が用意されたことにする
        gbAdMobLoadedFlg = true;
        gbInterstitialLoadedFlg = true;
        gbAdmobInitFlg = true;
        return; 
    }    

    // OSによって切り替える
    switch(gsPlatform){

        case "iOS":
            
            Log("84 admob.BannerAd");
            // デフォルトの背景色を設定する
            admob.BannerAd.config({ backgroundColor: 'black' });

            // window.reload()を実行した場合に
            // bannerがすでに存在するか、チェックしてみる。
            banner = new admob.BannerAd({
//                adUnitId: 'ca-app-pub-3940256099942544/2934735716', // TestAd
                adUnitId: goAdmobId["ios_banner"], // 本番用
                position: "bottom",
                background: '#000000'
            });

            interstitial = new admob.InterstitialAd({
                adUnitId: goAdmobId["ios_interstatial"]
            });

/*
            admob.banner.config({
                id: 'ca-app-pub-3426965448048920/1671647810',
                isTesting: false, 
                autoShow:true
            });

            admob.rewardvideo.config({
                id: 'ca-app-pub-3426965448048920/5931018187',
                isTesting: false, 
                autoShow:false
            });
            admob.interstitial.config({
                id: 'ca-app-pub-3426965448048920/7214838286',
                isTesting: false, 
                autoShow:false
            });
            */
            
            break;

        case "Android":
            
            banner = new admob.BannerAd({
                adUnitId: goAdmobId["android_banner"],
                position: 'bottom',
                backgroundColor: 'black'
            });

            interstitial = new admob.InterstitialAd({
                adUnitId: goAdmobId["android_interstatial"]
            });
        
/*
            admob.banner.config({
                id: 'ca-app-pub-3426965448048920/6733061928',
                isTesting: false, 
                autoShow:true
            });
            admob.rewardvideo.config({
                id: 'ca-app-pub-3426965448048920/3682723829',
                isTesting: false, 
                autoShow:false
            });
            admob.interstitial.config({
                id: 'ca-app-pub-3426965448048920/1907860654',
                isTesting: false, 
                autoShow:false
            });
            */
            break;
        
        defalt:
            break;

    }

    // バナーの処理 **********************
    // 次のバナーが読み込まれた際
    banner.on('impression', async (evt) => {
        if (gbBannerLoadedFlg) {
            // 前のバナーを非表示にする
            await banner.hide();
        }
    });
    banner.on('loadfail', async (evt) => {
        //表示失敗時、例えばadmobの設定で5分間に1回に広告を表示と設定をしていて
        Log("AdMob:ErrBannerLoad");
        LogGA("AdMob:ErrBannerLoad", gsPlatform, 0);

        //prepare()実行後、読み込みに失敗した時に呼ばれる
        gbBannerLoadedFlg = false;
        await banner.hide();

        // 5回までチャレンジして広告を準備する
        /*
        if(giTryCount < 5){
            giTryCount++;
            await ShowBanner();
        }
        */
    });

    // インターステーシャルの処理 ***********
    interstitial.on('load', (evt) => {
        // evt.ad
        gbInterstitialLoadedFlg = true;
        Log("53 interstitial.LOAD!");

        // レビュー表示のログを残す
        LogGA("AdMob Interstitial:Preload", gsPlatform, 1);

    });
    // エラー時
    interstitial.on('loadfail', (evt) => {
        aMessage = GetAlertMessage("ErrInterstitialLoad","");
        LogGA("AdMob:ErrInterstitialLoad", gsPlatform, 0);
        Log("141 interstitial.LOAD FAIL!");
        //読み込みに失敗した時に呼ばれる
        gbInterstitialLoadedFlg = false;
    });
    document.addEventListener('admob.ad.dismiss', async () => {
        // Once a interstitial ad is shown, it cannot be shown again.
        // Starts loading the next interstitial ad as soon as it is dismissed.

        // FinishGameを実行する（インターステーシャルの後に、ゲーム終了するから）
        FinishGame(gsInterstitialFinishMode, false);

        // 次の広告を先読みしておく
        await interstitial.load()
    });
    interstitial.load()

    /**** リワード動画広告の設定 START ****/
    // リワード広告は、いったん終了として、サブスクにする


    /*
    document.addEventListener('admob.rewardvideo.events.LOAD', function(){
        //prepare()実行後、読み込みに成功した時に呼ばれる。
        gbAdMobLoadedFlg = true;
        gbAdMobLoadingFlg = false;
        Log("53 rewardvideo.LOAD!");

        // オーバフラグがオフの場合
        if(gbOverMaxFlg != true){
            // カード設定画面の広告ボタンを有効表示する
            $("#AdMobRewardMovieButton").show();
            $("#AdMobRewardMovieButtonDisabled").hide();
        }

     });
     document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', function(){
        //prepare()実行後、読み込みに失敗した時に呼ばれる
        Log("178 rewardvideo.LOAD FAIL!");
        gbAdMobLoadedFlg = false;
        gbAdMobLoadingFlg = false;
     });
     document.addEventListener('admob.rewardvideo.events.CLOSE', function(){
        //広告を閉じた時に呼ばれる。
   　　 //動画広告を視聴途中で閉じた場合もここが呼ばれる。

        // 次のRewaardMovieを事前読み込みする
        admob.rewardvideo.prepare();
        gbAdMobLoadingFlg = true;

   　　 // リワードを閲覧し終わった場合
        if(gbGotRewardFlg){
            // レビュー表示のログを残す
            LogGA("AdMob:GetReward", gsPlatform, 1);

            // カードをアンロックする
            UnlockCampaignCard();
            gbGotRewardFlg = false;

        }
     });
     document.addEventListener('admob.rewardvideo.events.REWARD', function(){
        //リワードの処理を実装する箇所
        // カードを有効にする
        gbGotRewardFlg = true;


     });   

    // AdMobリワード広告：プリロード
    // RewaardMovieを事前読み込みする
    admob.rewardvideo.prepare();
    gbAdMobLoadingFlg = true;

    /**** リワード動画広告の設定 END ****/
    
    // Admobの初期化完了フラグをオンにする
    // iOS環境の場合
    if (gsPlatform == "iOS") {
        var sStatus = admob.TrackingAuthorizationStatus();
        Log("68:admob.requestTrackingAuthorization Do! :"+sStatus);
        await admob.requestTrackingAuthorization();
    }

    await admob.start(); // or start loading ads
    gbAdmobInitFlg = true;

    return;

}

/****************************************************
    関数名    ShowBanner
    機能      バナー広告を表示する
****************************************************/
async function ShowBanner(bStopFlg){
    Log("AdMob ShowBanner:bStopFlg="+bStopFlg);
    
    // AdMobが有効な場合（無料アプリの場合、アドフリー状態でもadmobを宣言します）
    if ('admob' in this) {
        
        // 非表示モードの場合
        if (bStopFlg) {
            Log("240: admob.banner.hide will do");
            // バナーを非表示にして終了する
            banner.hide();
            gbBannerFlg = false;
            return;
        }

        // 表示モードの場合 ***********************

        // アドフリーの購入ボタンを押せる状態にする
        /*
        $(".SubscriptionButton_Adfree").show();
        $(".SubscriptionButtonDisabled_Adfree").hide();
        */

        // バナーを表示する
        // await banner.show();
        banner.show().then(function(){
            //表示成功時、バナーが表示された時に呼ばれる
            gbBannerFlg = 1;
            Log("AdMob Banner Show : Success");

            },
            function(){
            //表示失敗時、例えばadmobの設定で5分間に1回に広告を表示と設定をしていて
            Log("AdMob:ErrBannerLoad");
            // LogGA("AdMob:ErrBannerLoad", gsPlatform, 0);

        });
        return;

    // Safariの場合
    } else {
        if(bStopFlg){
            Log("XXX フッターバナーを表示しない！ XXX");
        } else {
            Log("フッターバナーが表示されます（Safariなので表示しませんが）");
        }
    }

}



/****************************************************
    関数名    ShowInterstitial
    機能      インターステーシャル広告を表示する
****************************************************/
function ShowInterstitial(){

    // AdMobが有効な場合
    if ('admob' in this) {
        
        interstitial.show()
    
    // Safariの場合
    } else {
        // カードをアンロックする
        alert("インターステーシャル表示");
        // FinishGameを実行する
        FinishGame(gsInterstitialFinishMode, false);
    }

}

/****************************************************
    関数名    ShowRewardMovie
    機能      リワード動画を表示する
****************************************************/
function ShowRewardMovie(){

    // すでにキャンペーンカードの開放枚数がMAXの場合
    if(gbOverMaxFlg==true){

        // アラートを表示して終了する
        aMessage = GetAlertMessage("ErrOverCampCardMax", giCampCardMax);
        ShowAlert(aMessage[0], aMessage[1]);
        LogGA("AdMob:ErrOverCampCardMax", gsPlatform, 0);
        return false;
    }

    // 動画がロードされていない場合
    if(gbAdMobLoadedFlg == false){

        aMessage = GetAlertMessage("ErrRewardMovieLoad", "");
        ShowAlert(aMessage[0], aMessage[1]);
        LogGA("AdMob:ErrRewardMovieLoad", gsPlatform, 0);

        // 動画のロードを開始していない場合
        if(!gbAdMobLoadingFlg){
            // 次のRewaardMovieを事前読み込みする
            admob.rewardvideo.prepare();
            gbAdMobLoadingFlg = true;
        }
        return false;
    }
    

    // AdMobが有効な場合
    if('admob' in this){
        admob.rewardvideo.show().then(function(){
            //表示成功時、動画広告が表示された時に呼ばれる
            //広告が閉じられた時に呼ばれるのではなないので注意
            //リワード処理はここに書いてはダメ
          },
          function(){
            //表示失敗時、例えばadmobの設定で5分間に1回に広告を表示と設定をしていて
        　　//5分の間に2回目を表示させようとして、広告が表示出来なかった時に呼ばれる
            aMessage = GetAlertMessage("ErrRewardMovieLoad","");
            ShowAlert(aMessage[0], aMessage[1]);
            LogGA("AdMob:ErrRewardMovieLoad", gsPlatform, 0);

        });

    // Safariの場合
    } else {
        // カードをアンロックする
        UnlockCampaignCard();
    }

}

/****************************************************
    関数名    UnlockCampaignCard
    機能      キャンペーン期間中、未購入のカードでも使えるようにする
             
    入力     なし
    出力      なし

    処理概要
            0. キャンペーンカードから有効期限切れのデータを削除する
            0. キャンペーンカード枚数が限度に達している場合は
            　　アラートを表示して終了する
            1. 有効期間の終了時刻を作成する
            2. まだ有効でない役職を洗い出す
            3. まだ有効でない役職のうち１つをランダムに選ぶ
            4. キャンペーンカード配列に
****************************************************/
function UnlockCampaignCard(){

    var domGotCard;
    var domCampCard;

    // 購入情報をロードし、一時保存に反映する
    domGotCard = LoadData("domGotCard");
    domCampCard = LoadData("domCampCard");

    // 保存されていない場合
    if(domGotCard=="" || domGotCard == undefined){
        domGotCard = {
            "Lovers":0,
            "Psycho":0,
            "Vampire":0,
            "Rich":0,
            "Bat":0,
            "PsychoKiller":0,
            "GreatShaman":0,
            "Cosplayer":0,
            "Paparazzi":0,
            "Magician":0,
            "Bomber":0,
            "Mentalist":0,
            "DarkShaman":0,
            "Original":0,
            "DestinedLovers":0
        }
    } else {
        domGotCard.Psycho = 0;
    }
    if(domCampCard==""){
        domCampCard = {
            "Lovers":0,
            "Psycho":0,
            "Vampire":0,
            "Rich":0,
            "Bat":0,
            "PsychoKiller":0,
            "GreatShaman":0,
            "Cosplayer":0,
            "Paparazzi":0,
            "Magician":0,
            "Bomber":0,
            "Mentalist":0,
            "DarkShaman":0,
            "Original":0,
            "DestinedLovers":0
        }
    }
    
    // 有効期間の終了時刻を算出する
    var dDate = new Date();
    var iNow = dDate.getTime();
    var iExpired = iNow + (giCampExpireMin * 60 * 1000);

    // キャンペーンカードから有効期限切れのデータを削除する
    var iCampCardNum = DeleteExpiredCard(iNow, domCampCard);
    Log("10398:iCampCardNum="+iCampCardNum);

    // キャンペーンカードの枚数がマックス以上の場合
    if(iCampCardNum >= giCampCardMax){

        // カード設定画面の広告ボタンを無効表示する
        $(".AdMobRewardMovieButton").css("opacity",0.5);

        // アラートを表示して終了する
        aMessage = GetAlertMessage("ErrOverCampCardMax", giCampCardMax);
        ShowAlert(aMessage[0], aMessage[1]);

        // オーバーフラグをオンにする
        gbOverMaxFlg = true;
        return;
    } else {
        
        // オーバーフラグをオフにする
        gbOverMaxFlg = false;
    }

    // 有効でないカードのリストを取得する
    var aLockCards = [];
    aLockCards = GetLockCards(domGotCard, domCampCard);

    // すべてのカードが開放されている場合
    if(aLockCards.length <= 0){
        // カード設定画面の広告ボタンを無効表示する
        $(".AdMobRewardMovieButton").css("opacity",0.5);

        // アラートを表示して終了する
        aMessage = GetAlertMessage("ErrAllCardEnable");
        ShowAlert(aMessage[0], aMessage[1]);
        return;
    }

    Log("10506:aLockCards=");
    Log(aLockCards);

    // ランダムに有効にするカードを選択する
    var sUnlockRole = "";
    sUnlockRole = SelectRandom(aLockCards);
    Log("10512: sUnlockRole="+sUnlockRole);

    // キャンペーンでのロック解除を保存する
    domCampCard[sUnlockRole] = iExpired;
    iCampCardNum++;
    
    // キャンペーンで有効にできる枚数に到達した場合
    if(iCampCardNum >= giCampCardMax){

        // カード設定画面の広告ボタンを無効表示する
        $(".AdMobRewardMovieButton").css("opacity",0.5);

        // オーバーフラグをオンにする
        gbOverMaxFlg = true;
    }

    // オーバフラグがオフの場合
    if(gbOverMaxFlg != true){
        // カード設定画面の広告ボタンを有効表示する
        $(".AdMobRewardMovieButton").css("opacity",1);

    }

    // データを保存する
    SaveDataTmp(domCampCard, "domCampCard");
    SaveData(domCampCard, "domCampCard");

    // カードが有効になったことを表示する
    ShowUnlockCard(sUnlockRole);

}

/****************************************************
    関数名    ShowUnlockCard
    機能      アンロックされたカードを説明するウィンドウを表示する
             
    入力      sRole
    出力      なし
****************************************************/
function ShowUnlockCard(sRole){

    // 購入完了画面のカードを差し替える
    $("#Purchased .CardBg").css("background-image", "url(img/Card_" + sRole + ".png)");
    $("#Purchased .Lock").show();
    $("#Purchased .YouGotTheCard").hide();
    $("#Purchased .UnlockTime").show();
    $("#Purchased .Forever").hide();
    
    // ページを購入画面に移動する　-> まず Medalのチェックをされる
    jQT.goTo("#Purchased", "slideleft");

    // ロック解除のアニメを再生する
    StartPurchasedAnime();

}


/****************************************************
    関数名    GetLockCards
    機能      ロックされているカードのリストを取得する
             
    入力      domGotCard    購入済みカード
            domCampCard     キャンペーンカード
    出力     aLockCards     ロックカードリスト

    処理概要
            1. domGotCardに対して繰り返す
             1.1. domGotCardが 0 かつ domCampCard が 0の場合
              1.1.1. aLockCardsに対象ｎ役職を追加する
            2. aLockCardsを返して終了する
****************************************************/
function GetLockCards(domGotCard, domCampCard){
    var aLockCards = [];

    // domGotCardに対して繰り返す
    for(var sRole in domGotCard){
        // domGotCardが0 かつ domCampCardが0の場合
        if(domGotCard[sRole] == 0 && domCampCard[sRole] == 0){
            // ロックカードに対象の役職を追加する
            aLockCards.push(sRole);
        }
    }
    // aLockCardsを返して終了する
    return aLockCards;

}


/****************************************************
    関数名    DeleteExpiredCard
    機能      有効期限切れのカードデータを削除する。

    入力    iNow    現在時間
            iExpired    有効期限
            domCampCard キャンペーンカード情報（無効：0, 有効後：getTime()値）
    出力    キャンペーンで有効になっているカードの枚数
    処理概要
            1. gaCampCardに対して繰り返す
             1.1. 対象の日付が、現在よりも過去の場合
              1.1.1. 対象のデータを削除する
****************************************************/
function DeleteExpiredCard(iNow, domCampCard){
    var iCampCardNum = 0;

    // キャンペーンカードに対して繰り返す
    for( var sRole in domCampCard) {

        // カードが期限切れ もしくは 無効の場合
        if(domCampCard[sRole] < iNow){
            domCampCard[sRole] = 0;
        } else {
            iCampCardNum++;
        }
    }

    return iCampCardNum;

}

