const callbackURL = 'werewolfnmip://x?mode=SaveXdata'
/**
 * TwitterAPIのOAuth2.0認証処理
 * inAppBrowserでTwitterの認証画面を開く
 */

// グローバル変数
var codeVerifier = "";
var access_token = "";
var expires_in = "";
var refresh_token = "";
var twitter_id = "";
var twitter_name = "";

async function twitterConnection() {
    Log("16:twitterConnection");
    const state = Math.random().toString(32).substring(2)
    codeVerifier = Math.random().toString(32).substring(2)
    SaveData('codeVerifier');

    const redirectUri = encodeURIComponent(callbackURL)

    const oauth2Url = `https://twitter.com/i/oauth2/authorize?` +
                        `response_type=code&` +
                        `client_id=bnh1bFNaWW9Qd1l6LXNBTjI1QkE6MTpjaQ&` +
                        `redirect_uri=${redirectUri}&` +
                        `scope=tweet.read%20tweet.write%20users.read%20follows.write%20offline.access&` +
                        `state=${state}&` +
                        `code_challenge=${generateCodeChallenge(codeVerifier)}&` +
                        `code_challenge_method=s256`
    const browzeOptions = {
        location: 'no',
        clearcache: 'yes',
        toolbar: 'yes',
        hidden: 'no'
    }
    Log("37:twitterConnection");

    //window.open(oauth2Url, '_system', browzeOptions)
    // Androidでは、browzeOptionsは機能しない？
    window.open(oauth2Url, '_system');
}

/**
 * OAuth2.0認証後、TwitterAPIからアクセストークンを取得
 */
async function fetchTwitterAccessToken() {
    oauth_code = LoadData('oauth_code');
    codeVerifier = LoadData('codeVerifier');

    const jsonData = {
        'code': oauth_code,
        'code_verifier': codeVerifier,
        'callback_url': callbackURL
    };

    const sendData = {
        'm': 'AccessToken',
        'data': JSON.stringify(jsonData)
    };

    const xhr = $.ajax({
        type: 'POST',
        url: apiUrl + 'twitter_connect.php',
        dataType: 'json',
        cache: false,
        data: sendData,
        success: async function(res) {
            const data = res.data;
            try {
                access_token = data.access_token;
                SaveData("access_token");
                expires_in = String(data.expires_in);
                SaveData("expires_in");
                refresh_token = data.refresh_token;
                SaveData("refresh_token");
                /*
                SaveData(data.access_token, 'access_token');
                SaveData(String(data.expires_in), 'expires_in');
                SaveData(data.refresh_token, 'refresh_token');
                */
                await fetchTwitterUserInfo();
            } catch (error) {
                logError('Error saving access_tokens: ' + error);
            }
        },
        error: function(xhr, status, error) {
            Log(xhr);
            Log(status);
            Log(error);
        }
    });
}

/**
 * TwitterAPIからユーザー情報を取得
 */
async function fetchTwitterUserInfo() {
    try {
        const accessToken = LoadData('access_token');
        
        const jsonData = {
            'access_token': accessToken
        }

        const sendData = {
            'm': 'User',
            'data': JSON.stringify(jsonData)
        };

        const xhr = $.ajax({
            type: 'POST',
            url: apiUrl + 'twitter_connect.php',
            dataType: 'json',
            cache: false,
            data: sendData,
            success: async function(res) {
                const data = res.data.data
                try {
                    twitter_id = String(data.id);
                    SaveData("twitter_id");
                    twitter_name = data.username;
                    SaveData("twitter_name");
                    // 連携したことを表示する
                    $('#twitterConnectButton.Jp').text(`${twitter_name}と連携中`)
                    $('#twitterConnectButton.En').text(`Linking ${twitter_name} `)

                    /*
                    SaveData(String(data.id), 'twitter_id');
                    SaveData(data.username, 'twitter_name');
                    */
                    isTwitterConnected = true;
                } catch (error) {
                    logError('Error saving twitterInfos: ' + error);
                }
            },
            error: function(xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    } catch (error) {
        logError('Error fetching access token: ' + error);
    }
}

/**
 * WLF公式アカウントのフォロー
 */
async function followWLFAccount() {
    const jsonData = {
        'x_id': LoadData('twitter_id'),
        'access_token': LoadData('access_token')
    }

    const sendData = {
        'm': 'Follow',
        'data': JSON.stringify(jsonData)
    }

    const xhr = $.ajax({
        type: 'POST',
        url: apiUrl + 'twitter_connect.php',
        dataType: 'json',
        cache: false,
        data: sendData,
        success: async function(res) {
            console.log("followWLFAccountRes: ",res)
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
        }
    })
}

async function retweetWLF() {
    twitter_id = LoadData('twitter_id');
    access_token = LoadData('access_token');
    const jsonData = {
        'x_id': twitter_id,
        'access_token': access_token
    }

    const sendData = {
        'm': 'ReTweet',
        'data': JSON.stringify(jsonData)
    }

    const xhr = $.ajax({
        type: 'POST',
        url: apiUrl + 'twitter_connect.php',
        dataType: 'json',
        cache: false,
        data: sendData,
        success: async function(res) {
            if ($('#followTwitterCheckBox').prop('checked')) {
                await followWLFAccount();
            }
        },
        error: function(xhr, status, error) {
            console.log(xhr)
            console.log(status)
            console.log(error)
        }
    })
}


/**
 * 生成したcodeVerifierを元にcodeChallengeを生成
 * @param {string} codeVerifier 
 * @returns {string} codeChallenge base64Encoded
 */
function generateCodeChallenge(codeVerifier) {
    const base64String = CryptoJS.SHA256(codeVerifier).toString(CryptoJS.enc.Base64);
    const base64UrlString = base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    return base64UrlString;
}

function getQueryParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}