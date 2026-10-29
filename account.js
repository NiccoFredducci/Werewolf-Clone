let isTwitterConnected = false

// グローバル変数
var avatar = "";
var gAccount = {};
var gAccountPoint = {};

function showAccountStats() {
    //const jsonAccount = localStorage.getItem('gAccount')
    gAccount = LoadData("gAccount");
    if (gAccount == null || gAccount == "" || gAccount == undefined) {
        $('#isNotAccountInfo').show()
        $('#statsAccountName span.Jp').text('プレイヤー戦績（未登録）')
        $('#statsAccountName span.En').text('Player Stats (Unregistered)');
        return
    } else {
        $('#isNotAccountInfo').hide()
    }

    $('#statsAccountName').text(gAccount.nickname)
    avatar = LoadData("avatar");
    if (avatar != "") {
        $('#statsAvatar').attr("src", "data:image/jpeg;base64," + avatar)
    } else {
        $('#statsAvatar').attr("src", gAccount.image_url)
    }

    //    const jsonAccountPoint = localStorage.getItem('gAccountPoint')
    //    const gAccountPoint = JSON.parse(jsonAccountPoint)
    gAccountPoint = LoadData("gAccountPoint");

    const monthWinRate = calcWinRate(gAccountPoint.month_win_count, gAccountPoint.month_battle_count)
    const prevMonthWinRate = calcWinRate(gAccountPoint.past_month_win_count, gAccountPoint.past_month_battle_count)
    const totalWinRate = calcWinRate(gAccountPoint.total_win_count, gAccountPoint.total_battle_count)

    $('#monthWinRatio').text(statsText(monthWinRate, gAccountPoint.month_battle_count))
    $('#prevMonthWinRatio').text(statsText(prevMonthWinRate, gAccountPoint.past_month_battle_count))
    $('#totalWinRatio').text(statsText(totalWinRate, gAccountPoint.total_battle_count))
}

function calcWinRate(winCount, gameCount) {
    if (winCount == null || gameCount == null) return null
    if (winCount == 0 || gameCount == 0) return 0
    return Math.round(winCount / gameCount * 100 * 100) / 100
}

function statsText(winRate, count) {
    if (winRate == null) winRate = '??'
    if (count == null) count = '???'
    return `${winRate}% (${count}`
}

function showAccountCoin(target) {
    Log("47:showAccountCoin");
//    const jsonAccountPoint = localStorage.getItem('gAccountPoint');
    gAccountPoint = LoadData("gAccountPoint");
    Log("48:" + gAccountPoint);
    if (gAccountPoint == "" || gAccountPoint == null || gAccountPoint == undefined) {
//        $(`#${target}`).text(JSON.parse(0))
        $(`#${target}`).text(0);
    } else {
        Log("55");
        Log(gAccountPoint);
        Log(gAccountPoint.coin);
        $(`#${target}`).text(gAccountPoint.coin);
    }
}

function showAccountInfo() {
//    const jsonAccount = localStorage.getItem('gAccount')
    gAccount = LoadData('gAccount')
    Log("58:" + gAccount);
    if (gAccount == "" || gAccount == null || gAccount == undefined) return

    $('#nickname').val(gAccount.nickname)
    avatar = LoadData("avatar");
    if (avatar != null && avatar != "" && avatar != undefined) {
        $('#avatar').attr("src", "data:image/jpeg;base64," + avatar);
    } else {
        $('#avatar').attr("src", gAccount.image_url)
    }
    if (gAccount.x_name != null) {
        $('#twitterConnectButton.Jp').text(`${gAccount.x_name}と連携中`)
        $('#twitterConnectButton.En').text(`Connect to ${gAccount.x_name} `)
    }
}

/**
 * img/avatars の画像を通し番号順に表示する
 * @param {string} filePath 
 */
function LoopDisplayAvatar(filePath, iPlus) {
    localStorage.removeItem('avatar')

    const avatarImagesLength = 25
    const imageDir = './img/avatars'

    // ファイルパスがnullの場合、最初の画像を表示する
    if (filePath == null) return $('#avatar').attr('src', `${imageDir}/Avatar_1.jpg`)

    // 表示中の画像
    const currentFileNumber = filePath.includes('data')
        ? 0
        : function() {
            const currentFilePath = filePath.split('/')[filePath.split('/').length - 1]
            return Number(currentFilePath.replace('.jpg', '').replace("Avatar_", ""))
        }()

    // 通し番号が最大値を超えた場合、最初の画像を表示する
    if (currentFileNumber === avatarImagesLength && iPlus>0) {
        $('#avatar').attr('src', `${imageDir}/Avatar_1.jpg`)

    } else if (currentFileNumber <= 1 && iPlus < 0) {
        $('#avatar').attr('src', `${imageDir}/Avatar_25.jpg`)
        
    } else {
        const nextFileNumber = Number(currentFileNumber) + iPlus;
        $('#avatar').attr('src', `${imageDir}/Avatar_${nextFileNumber}.jpg`)
    }
}

/**
 * ニックネームのバリデーション処理
 * @param {string} str 
 * @returns {bool}
 */
function ValidateNickName(str) {
    const allowedCharsRegex = new RegExp([
        '^[',                      // 文字列の先頭
        '\\u3040-\\u30FF',         // 全角かな（ひらがな、カタカナ）
        '\\u4E00-\\u9FFF',         // 漢字
        '\\uFF01-\\uFF60',         // 全角記号
        '\\uFF61-\\uFF9F',         // 全角記号
        '\\uFFA0-\\uFFEF',         // 全角記号
        '0-9A-Za-z',               // 半角英数字
        '\\-\\+!"#$%&()=~?*{}_',   // 特定の半角記号
        '\\s',                     // 半角スペース
        ']{1,10}$'                 // 1から10文字以内
    ].join(''));

    // 絵文字・全角半角の（" ' < >）を許容しない
    const forbiddenCharsRegex = /['"<>\uFF02\uFF07\u300C\u300D\uFF1C\uFF1E]/

    // 文字列が空の場合
    if (str == "") {
        // 未入力エラーを返す
        return "AccountNullName";
    }

    // フォーマットが正しい場合
    if (allowedCharsRegex.test(str) && !forbiddenCharsRegex.test(str)) {
        return "";

    // フォーマットが正しくない場合
    } else {
        return "AccountNameFormatErr";

    }

    //    return allowedCharsRegex.test(str) && !forbiddenCharsRegex.test(str)
}

/**
 * ニックネーム欄のoninputでバリデーションを行う
 * @param {HTMLElement} el input要素
 * @param {string} prev index.htmlで宣言している prevNickName
 * @returns {void} OKならprevNickNameをvalueで更新、NGならvalueをprevNickNameに戻す
 */
function ValidateNickNameOnInput(el, prev) {
    const val = $(el).val()
    if (val.length === 0) return

    var sErrorCode = ValidateNickName(val);
    if (sErrorCode!="") {
        console.log("valid")
        prevNickName = val // prevNickName: index.htmlで宣言
    } else {
        console.log("invalid")
        $(el).val(prev)
    }
}

function UserOperations(nickname) {
    //const jsonAccount = localStorage.getItem('gAccount')
    gAccount = LoadData("gAccount");
    
    if (gAccount == "" || gAccount == undefined) {
        return CreateUser(nickname)
    } else {
        return UpdateUser(nickname)
    }
}

/**
 * phpAPIへ、usersテーブルに新規ユーザーを追加するリクエストを送る
 * @param {string} nickName 
 * @returns 
 */
var gbTwitterConnectWarning = false;
async function CreateUser(nickName) {
    // ローディングする
    ShowLoading(true);

    // 入力時のバリデーション処理を再度実行（主に空文字対策）
    var sErrorCode = ValidateNickName(nickName);
    if (sErrorCode != "") {
        const aMessage = GetAlertMessage(sErrorCode);
        ShowAlert(aMessage[0], aMessage[1]);
        ShowLoading(false);
        return;
    }
    // Twitter接続していない場合
    if (!isTwitterConnected && !gbTwitterConnectWarning) {
        // アップデートのアラートを表示する
        var aMessage = GetAlertMessage("AccountCreateAlert1");
        ShowConfirm(aMessage[0], aMessage[1], "gbTwitterConnectWarning = true;CreateUser('" + nickName + "')");
        ShowLoading(false);

        // 次に進まない
        return;
        
    }
    avatar = LoadData("avatar");
    const imageSrc = avatar || $('#avatar').attr('src') || null

    // Twitter認証有無問わず必ずリクエストするもの
    const accountData = {
        nickname: nickName,
        image_url: imageSrc,
        is_twitter_connect: false
    }

    // Twitter認証済みの場合のみリクエスト
    if (isTwitterConnected) {
        accountData['x_id'] = LoadData('twitter_id')
        accountData['x_name'] = LoadData('twitter_name')
        accountData['follow_wlf_x_account_flag'] = $('#followTwitterCheckBox').prop('checked') ? 1 : 0
        accountData['is_twitter_connect'] = true
    } else {

    }

    const sendData = {
        "m": 'CreateUser',
        "data": JSON.stringify(accountData),
    }

    const url = apiUrl + 'users.php'

    const xhr = $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        cache: false,
        data: sendData,
        success: async function (res) {
            gAccount = {
                "id": res.data.id,
                "nickname": res.data.nickname,
                "image_url": res.data.image_url,
                "x_id": res.data.x_id,
                "x_name": res.data.x_name,
                "follow_wlf_x_account_flag": res.data.follow_wlf_x_account_flag
            }
            
            gAccountPoint = {
                "coin": res.data.coin,
                "month_win_count": res.data.month_win_count,
                "month_battle_count": res.data.month_battle_count,
                "past_month_win_count": res.data.past_month_win_count,
                "past_month_battle_count": res.data.past_month_battle_count,
                "total_win_count": res.data.total_win_count,
                "total_battle_count": res.data.total_battle_count
            }
            Log("229 gAccount↓");
            Log(gAccount);
            SaveData("gAccount");
            SaveData("gAccountPoint");

            // コインとアカウント情報を更新する
            showAccountCoin('headerCoinAmount');
            showAccountStats();

            /*
            localStorage.setItem('gAccount', JSON.stringify(gAccount))
            localStorage.setItem('gAccountPoint', JSON.stringify(gAccountPoint))
            */
            if (isTwitterConnected) {

                try {
                    // テストとしてフォロー機能を先に実行する
                    //await followWLFAccount();
                    await retweetWLF()
                } catch (error) {
                    Log(error)
                }
            }
            const message = GetAlertMessage('AccountCreateSuccess')
            ShowAlert(message[0], message[1])
            // ローディングを非表示にする
            ShowLoading(false);

            // オンラインモードの参加の場合は、JoinRoomにジャンプする
            switch (gsReturnPage) {
                case "ShowGameRoomJoin":
                    ShowGameRoomJoin();
                    gsReturnPage = "";
                    break;
                
                case "MakeOnlineGame":
                    MakeOnlineGame();
                    gsReturnPage = "";
                    break;
                
                // 通常は何もしない
                default:
                    break;
            }
        },
        error: function(xhr, status, error) {
            Log(xhr)
            //Log(status)
            //Log(error)
            const message = GetAlertMessage('AccountCreateFailed');
            ShowAlert(message[0], message[1])
            // ローディングを非表示にする
            ShowLoading(false);
        }
    })
    LogGA4("CreateUser", {
        'created': 'created',
        'twitter_connected': isTwitterConnected,
    })
}

async function UpdateUser(nickName) {
    ShowLoading(true);

    var sErrorCode = ValidateNickName(nickName);
    if (sErrorCode != "") {
        const aMessage = GetAlertMessage("sErrorCode");
        ShowAlert(aMessage[0], aMessage[1]);
        ShowLoading(false);
        return
    }
    avatar = LoadData("avatar");
    const imageSrc = avatar || $('#avatar').attr('src') || null

    const accountData = {
        nickname: nickName,
        image_url: imageSrc,
        is_twitter_connect: false
    }

    //const jsonAccount = localStorage.getItem('gAccount')
    gAccount = LoadData("gAccount");
    gAccount.is_twitter_connect = $('#followTwitterCheckBox').prop('checked') ? 1 : 0
    if (gAccount != "" && gAccount != undefined) {
        accountData['id'] = gAccount.id
        accountData['x_id'] = LoadData('twitter_id') !== "" ? LoadData('twitter_id') : gAccount.x_id;
        accountData['x_name'] =  LoadData('twitter_name') !== "" ? LoadData('twitter_name') : gAccount.x_name
        accountData['follow_wlf_x_account_flag'] = gAccount.follow_wlf_x_account_flag
        accountData['is_twitter_connect'] = gAccount.is_twitter_connect
    }

    // アップデート時に、新たにTwitter認証を行った場合
    if (isTwitterConnected || LoadData('twitter_id') !== "") {
        accountData['follow_wlf_x_account_flag'] = $('#followTwitterCheckBox').prop('checked') ? 1 : 0
        accountData['is_twitter_connect'] = true
    }

    const sendData = {
        "m": 'UpdateUser',
        "data": JSON.stringify(accountData),
    }

    const url = apiUrl + 'users.php';
    Log("378 account.js:API URL=" + url);

    const xhr = $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        cache: false,
        data: sendData,
        success: async function(res) {
            gAccount = {
                "id": res.data.id,
                "nickname": res.data.nickname,
                "image_url": res.data.image_url,
                "x_id": res.data.x_id,
                "x_name": res.data.x_name,
                "follow_wlf_x_account_flag": res.data.follow_wlf_x_account_flag,
            }

            // Twitterアカウントから復元した場合、DBに保存されていたポイントでgAccountPointを再生成
            if (res.data.restore_flag) {
                gAccountPoint = {
                    "coin": res.data.coin,
                    "month_win_count": res.data.month_win_count,
                    "month_battle_count": res.data.month_battle_count,
                    "past_month_win_count": res.data.past_month_win_count,
                    "past_month_battle_count": res.data.past_month_battle_count,
                    "total_win_count": res.data.total_win_count,
                    "total_battle_count": res.data.total_battle_count
                }
                SaveData('gAccountPoint')
                showAccountCoin('headerCoinAmount')
            }

            //localStorage.setItem('gAccount', JSON.stringify(gAccount))
            Log("310:gAccount↓");
            Log(gAccount);
            SaveData("gAccount");
            showAccountStats();

            // アカウント接続している場合はリポストする
            if (isTwitterConnected) {

                try {
                    // テストとしてフォロー機能を先に実行する
                    //await followWLFAccount();
                    await retweetWLF()
                } catch (error) {
                    Log(error)
                }
            }
            // 公式アカウントをフォローになっていた場合
            if (isTwitterConnected && gAccount.follow_wlf_x_account_flag) {

                try {
                    // 再度、フォローをする（リポストはしない）
                    await followWLFAccount();
                } catch (error) {
                    Log(error)
                }
            }

            const message = GetAlertMessage('AccountUpdateSuccess')
            ShowAlert(message[0], message[1])
            
            // ローディングを非表示にする
            ShowLoading(false);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
            const message = GetAlertMessage('AccountCreateFailed')
            ShowAlert(message[0], message[1])
            // ローディングを非表示にする
            ShowLoading(false);
        }
    })
    gAccount = LoadData('gAccount');
    Log("456:" + gAccount.x_id + " / " + gAccount.x_name);
    LogGA4("UpdateUser", {
        'updated': 'updated',
        'twitter_connected': LoadData('gAccount').x_id !== "" ? 1 : 0,
    })
}

function healthCheck() {
    const healthData = {
        m: 'Health',
        data: JSON.stringify([]),
        test: 'test'
    }

    const url = apiUrl + 'users.php'

    const xhr = $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        cache: false,
        data: healthData,
        success: function(data) {
            console.log(data)
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
        }
    })
}

/**
 * Phase1仕様
 * 手渡しモード ゲーム終了時、端末保持者にポイントを付与する処理
 */
async function addPlayerPoint() {
    const isWin = await isWinLocalGame()
    // 端末保持者がアカウント未作成の場合は何もしない
    if (getAccountID() == null || isWin == null) return

    const jsonData = {
        user_id: getAccountID(),
        is_win: isWin,
    }

    const sendData = {
        m: 'AddPlayerPoint',
        data: JSON.stringify(jsonData),
    }

    const url = apiUrl + 'users.php'

    // ローディングを表示する
    ShowLoading(true);

    const xhr = $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        cache: false,
        data: sendData,
        success: function (res) {
            gAccountPoint = res.data;
            //localStorage.setItem('gAccountPoint', JSON.stringify(res.data))
            SaveData("gAccountPoint");

            // コイン枚数とアカウントデータを更新表示する
            showAccountCoin('headerCoinAmount');
            showAccountStats();

            // ローディングを非表示する
            ShowLoading(false);
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
            // ローディングを非表示する
            ShowLoading(false);
        }
    })
}

function addPPTest() {
    const testData = {
        m: 'AddPlayerPoint',
        data: JSON.stringify({
            user_id: '913125376',
            is_win: false,
        }),
        test: 'test'
    }

    const url = apiUrl + 'users.php'

    const xhr = $.ajax({
        type: 'POST',
        url,
        dataType: 'json',
        cache: false,
        data: testData,
        success: function(res) {
            //localStorage.setItem('gAccountPoint', JSON.stringify(res.data))
            gAccountPoint = res.data;
            SaveData("gAccountPoint");
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
        }
    })
}

function logError(message) {
    console.log('logError called with message: ' + message); // 追加のデバッグログ
    cordova.exec(
        function(result) {
            console.log('logError success: ' + result);
        },
        function(error) {
            console.log('logError failed: ' + error);
        },
        'Console',
        'logLevel',
        ['ERROR', message]
    );
}

/**
 * localStorageにアカウント情報があればIDを取得
 * @returns {String or null}
 */
function getAccountID() {
    //const gAccount = localStorage.getItem('gAccount')
    gAccount = LoadData("gAccount");
    if (gAccount != null) {
        return gAccount.id
    } else {
        return null
    }
}

/**
 * 手渡しモードでのポイント付与処理においてGMの勝利判定を行う
 * @returns {bool or null}
 */
async function isWinLocalGame() {
    let res = null

    // 当該ゲーム結果 gsWinner Citizen|Werewolf|Vampire
    //const result = CheckGameSetResult()

    // 手渡しモードはgaPlayerのiId1がGM（端末所持者）とする為、iIdの役割を特定する
    //const gaPlayerJSON = JSON.parse(localStorage.getItem('gaPlayer'))
    gaPlayer = LoadData("gaPlayer");
    //var gaPlayerJSON = JSON.parse(localStorage.getItem('gaPlayer'))
    //const gmRole = gaPlayerJSON['data'].filter(v => v['iId'] === 1)[0].sRole
    var gmRole = gaPlayer[0].sRole;
    Log("560:gmRole=" + gmRole);

    if (gmRole == '') res = false

    switch (gmRole) {
        // 人狼チームの場合
        case "Werewolf":
        case "LegendaryWolf":
        case "Psycho":
        case "PsychoKiller":
        case "Paparazzi":
        case "Mentalist":
        case "PrisonBreaker":
            if (gsWinner == "Werewolf") {
                res = true;
            } else {
                res = false;
            }
            break;
        
        // 吸血鬼チームの場合
        case "Vampire":
        case "Bat":
            if (gsWinner == "Vampire") {
                res = true;
            } else {
                res = false;
            }
            break;
        

        // 人間チームの場合
        default:
            if (gsWinner == "Citizen") {
                res = true;
            } else {
                res = false;
            }
            break;
    }
    return res
}

