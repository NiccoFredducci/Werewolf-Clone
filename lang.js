/****************************************************
 * カード名
****************************************************/
var goRoleText = {};
var goRoleTextCustomJp = {};
var goRoleTextCustomEn = {};
var goRoleTextJp = {};
var goRoleTextEn = {};
var goTapCard = {};
var gsTapCard = "";
goTapCard = {
	"Jp" : "カードをタップ！",
	"En" : "Tap the card!"
};
goRoleText = {
		"Werewolf":"",
		"Citizen":"",
		"FortuneTeller":"",
		"Shaman":"",
		"Knight":"",
		"Lovers":"",
		"Psycho":"",
		"Vampire":"",
		"Rich":"",
		"Bat":"",
		"PsychoKiller":"",
		"GreatShaman":"",
		"Cosplayer":"",
		"Paparazzi":"",
		"Magician":"",
		"Bomber":"",
		"Mentalist":"",
		"DarkShaman":"",
		"DestinedLovers":"",
		"RainMan":"",
		"LegendaryWolf":"",
		"PrisonBreaker":"",
		"Oracle": "",
		"Dreamer": "",
		"Fixer": "",
		"Original": "",
		
		"Tap":""	
};
goRoleTextJp = {
		"Werewolf":"人狼",
		"Citizen":"市民",
		"FortuneTeller":"占い師",
		"Shaman":"霊媒師",
		"Knight":"騎士",
		"Lovers":"恋人",
		"Psycho":"多重人格",
		"Vampire":"吸血鬼",
		"Rich":"富豪",
		"Bat":"変身した吸血鬼",
		"PsychoKiller":"サイコキラー",
		"GreatShaman":"偉大な霊媒師",
		"Cosplayer":"コスプレイヤー",
		"Paparazzi":"パパラッチ",
		"Magician":"マジシャン",
		"Bomber":"ボマー",
		"Mentalist":"メンタリスト",
		"DarkShaman":"闇の霊媒師",
		"DestinedLovers":"運命の恋人",
		"RainMan":"レインマン",
		"LegendaryWolf":"伝説の人狼",
		"PrisonBreaker":"脱獄犯",
		"Oracle":"神託者",
		"Dreamer":"夢師",
		"Fixer": "フィクサー",
		"Original":"オリジナル",
		
		"Tap":"カードをタップ！"
};
goRoleTextEn = {
		"Werewolf":"Werewolf",
		"Citizen":"Citizen",
		"FortuneTeller":"Fortune Teller",
		"Shaman":"Shaman",
		"Knight":"Knight",
		"Lovers":"Lovers",
		"Psycho":"Psycho",
		"Vampire":"Vampire",
		"Rich":"Rich",
		"Bat":"Vampire Bat",
		"PsychoKiller":"Psycho Killer",
		"GreatShaman":"Great Shaman",
		"Cosplayer":"Cosplayer",
		"Paparazzi":"Paparazzi",
		"Magician":"Magician",
		"Bomber":"Bomber",
		"Mentalist":"Mentalist",
		"DarkShaman":"Dark Shaman",
		"DestinedLovers":"Destined Lovers",
		"RainMan":"Rain Man",
		"LegendaryWolf":"Legendary Wolf",
		"PrisonBreaker":"Prison Breaker",
		"Oracle": "Oracle",
		"Dreamer": "Dreamer",
		"Fixer": "Fixer",
		"Original":"Original",
		
		"Tap":"Tap the card!"
};
goRoleTextCustomJp = {
	"Werewolf":"",
	"Citizen":"",
	"FortuneTeller":"",
	"Shaman":"",
	"Knight":"",
	"Lovers":"",
	"Psycho":"",
	"Vampire":"",
	"Rich":"",
	"Bat":"",
	"PsychoKiller":"",
	"GreatShaman":"",
	"Cosplayer":"",
	"Paparazzi":"",
	"Magician":"",
	"Bomber":"",
	"Mentalist":"",
	"DarkShaman":"",
	"DestinedLovers":"",
	"RainMan":"",
	"LegendaryWolf":"",
	"PrisonBreaker":"",
	"Oracle": "",
	"Dreamer": "",
	"Fixer": "",
	"Original":"",
	"Tap":"カードをタップ！"
};

goRoleTextCustomEn = {
	"Werewolf":"",
	"Citizen":"",
	"FortuneTeller":"",
	"Shaman":"",
	"Knight":"",
	"Lovers":"",
	"Psycho":"",
	"Vampire":"",
	"Rich":"",
	"Bat":"",
	"PsychoKiller":"",
	"GreatShaman":"",
	"Cosplayer":"",
	"Paparazzi":"",
	"Magician":"",
	"Bomber":"",
	"Mentalist":"",
	"DarkShaman":"",
	"DestinedLovers":"",
	"RainMan":"",
	"LegendaryWolf":"",
	"PrisonBreaker":"",
	"Oracle": "",
	"Dreamer": "",
	"Fixer": "",
	"Original":"",
	"Tap":"Tap the card!"
};

/****************************************************
 * ボタン表示
****************************************************/
var goButtonText = {};
var goButtonTextJp = {};
var goButtonTextEn = {};

goButtonTextJp = {
	"Werewolf":"人狼",
	"Human": "人間",
	"Citizen":"市民",
	"Dead":"死亡",
	// 下の3つは、ユーザーがカスタマイズ可能
	"Lovers":"恋人",
	"Vampire":"吸血鬼",
	"FortuneTeller":"占い師",
	
	"Werewolf?":"人狼だと疑う",
	"Kill":"殺害する",
	"Foretell":"人狼か占う",
	"Guard":"人狼から守る",
	"NoGuard":"連続ガード禁止",
	"Necromancy":"降霊する",
	"Scoop":"調査する",
	"Magician":"役職を交換",
	"Dream": "デジャヴで視る",
	"Mark": "マークする",
	
	"WerewolfSelect":"<div class='WerewolfList'>[VALUE] が [VOTE]票</div>",
	"Vote":"<a href='#' class='voteButton' onClick='VoteAction([VALUE])'>投票する</a>",
	
	"KILL_1":"なんとなく(1票)",
	"KILL_2":"あえて殺そう(2票)",
	"KILL_3":"殺さないと危険(3票)",
	
	"KillVoice_0":"うわぁ！やられた！！<br>わたしは殺されてしまいました！",
	"KillVoice_1":"なんとなく<span class='redText Bold'>[PLAYER]</span>さんを<br>狙いました。お任せします。(1票)",
	"KillVoice_2":"あえて<span class='redText Bold'>[PLAYER]</span>さんを<br>狙いましょう！(2票)",
	"KillVoice_3":"絶対<span class='redText Bold'>[PLAYER]</span>さんを<br>殺しましょう！危険です！(3票)",
	
	"GmToolRevive":"死亡",
	"GmToolKill":"生存",

	"ShamanResult_Werewolf":"<span class='redText Bold'>人狼です</span>",
	"ShamanResult_Human":"<span class='blueText Bold'>人狼ではありません</span><br><span style='font-size:12px'>（役職の詳細は、わかりません）</span>",
	
	"SelectPlayer": "自分を選ぶ",
	
	"TeamWerewolf":"人狼チーム",
	"TeamCitizen":"市民チーム",
	"TeamVampire": "吸血鬼チーム",
	
	"WinWerewolf": "人間を人狼の数以下にする",
	"WinCitizen": "すべての人狼を追放する",
	"WinVampire": "最後まで生き残る",
	

	"":""	
};
goButtonTextEn = {
	"Werewolf":"Werewolf",
	"Human": "Human",
	"Citizen":"Citizen",
	"Dead":"Dead",
	"Lovers":"Lovers",
	"Vampire":"Vampire",
	"FortuneTeller":"Fortune Teller",
	
	"Werewolf?":"Suspect",
	"Kill":"Kill",
	"Foretell":"Foretell",
	"Guard":"Guard",
	"NoGuard":"No Same Guard",
	"Necromancy":"Necromancy",
	"Scoop":"Investigate",
	"Magician":"Change",
	"Dream": "Déjà vu",
	"Mark": "Mark",
	
	"WerewolfSelect":"<div class='WerewolfList'>[VALUE] is voting [VOTE]pt.</div>",
	"Vote":"<a href='#' class='voteButton' onClick='VoteAction([VALUE])'>Vote</a>",
	
	"KILL_1":"Just Because(1pt)",
	"KILL_2":"Better Kill(2pt)",
	"KILL_3":"Must Kill(3pt)",
	
	"KillVoice_0":"Oh my gosh!<br>I have been killed!",
	"KillVoice_1":"I chose <span class='redText Bold'>[PLAYER]</span> for no particular reason.(1pt)",
	"KillVoice_2":"I have a better idea, let's kill <span class='redText Bold'>[PLAYER]</span>!(2pt)",
	"KillVoice_3":"We must kill <span class='redText Bold'>[PLAYER]</span>!<br>We're in danger!(3pt)",
	
	"GmToolRevive":"Dead",
	"GmToolKill":"Alive",

	"ShamanResult_Werewolf":"<span class='redText Bold'>is Werewolf.</span>",
	"ShamanResult_Human":"<span class='blueText Bold'>is not Werewolf.</span><br><span style='font-size:12px'>(You don't know the details of role.)</span>",
	
	"SelectPlayer":"Select",

	"TeamWerewolf":"Werewolves",
	"TeamCitizen":"Citizens",
	"TeamVampire":"Vampires",

	"WinWerewolf": "Reduce the number of humans to less than the number of werewolves",
	"WinCitizen": "Exile all the werewolves",
	"WinVampire": "Survive until the end of the game",

	"":""	
};

/****************************************************
 * 敬称
****************************************************/
var gsSan = "";
var gsHyou = "";
var gsTeam = "";

/****************************************************
 * アラート文言
 * メッセージに置き換え文字がある場合は、置き換え文字を"[VALUE]"とする。
****************************************************/
var goAlertText = {};
var goAlertTextJp = {};
var goAlertTextEn = {};

goAlertTextJp = {
	
	"NewGame":"新規ゲーム|新しいゲームを開始します。前回のゲームの続きは削除されますが、よろしいですか？",
	"LoadCardData":"データ読込完了|カードデータを読み込みました",
	
	"ErrPlayerOver":"人数オーバー|これ以上、プレイヤーを追加できません。",
	"ErrNameEmpty":"入力エラー|プレイヤー名を入力してください。",
	"ErrNameSame":"入力エラー|すでに同じプレイヤー名([VALUE])が登録されています。違うプレイヤー名を入力してください。",
	"ErrPlayerMin":"人数不足|人数が足りません。[VALUE]人以上のプレイヤーを登録してください。",
	"ErrCitizenTooFew": "カード設定エラー|人狼に対して人間の数が足りません。カード枚数を再設定してください。",
	"ErrWerewolfNone": "カード設定エラー|人狼の数が足りません。人狼のカード枚数を再設定してください。",
	"ErrCardNumOverPlayer":"カード設定エラー|カード数がプレイヤー数を超えます。他のカードを減らしてから追加してください。",
	"ErrNoHumanForFirstNightForetell":"カード設定エラー|初日の占い時に、占い結果が人間になる役職がありません。初日の占い設定を変更するか、カードの設定を変更してください。",
	"ErrNoHumanForFirstNightOracle": "カード設定エラー|初日の占い時に、占い結果が人間になる役職がありません。カードの設定を変更してください。",
	"WarningDoubleKnight":"騎士が複数います|一晩に守れる相手は１名だけです。複数の騎士が別のプレイヤーを守った場合、ランダムに１名のみが守られます。",
	

	"ErrInvalidFriendCodeMe":"入力コードエラー|ご自身のユーザーコードは使えません。ご友人のユーザーコードをご登録ください。",
	"ErrInvalidFriendCode":"入力コードエラー|ご友人のユーザーコードが正しくありません。再度ご確認ください。",
	"ErrAlreadySetFriendCode":"入力コードエラー|すでにご友人のユーザーコードが設定されています。",
	"ErrAlreadySetCampCode":"入力コードエラー|このキャンペーンコードは使用済みです。",
	"ErrWrongCampCode":"入力コードエラー|このキャンペーンコードは無効です。",
	
	"ErrNetworkTimeout":"通信異常(152)|通信がタイムアウトしました。通信環境の良い場所で再度お試しください。",
	"ErrUDID":"通信異常(146)|通信中に予期しない不具合が発生しました。通信環境の良い場所で再度お試しください。",
	"ErrNoData":"通信異常(147)|通信中に予期しない不具合が発生しました。通信環境の良い場所で再度お試しください。",
	"ErrSendData":"通信異常(154)|通信中に予期しない不具合が発生しました。通信環境の良い場所で再度お試しください。",
	"ErrQuery":"通信異常(155)|通信中に予期しない不具合が発生しました。通信環境の良い場所で再度お試しください。",
	"ErrDBConnect":"通信異常(156)|通信中に予期しない不具合が発生しました。通信環境の良い場所で再度お試しください。",
	"ErrMaintenance":"メンテナンス中|現在、サーバメンテナンス中です。しばらくしてから、再度お試しください。",

	"ErrSelectSamePlayer":"名前確認|すでにこのプレイヤーは選ばれていますが、よろしいですか？",
	"ErrRemoteGameIdIsNull":"オンラインゲームエラー|前回のオンラインゲームを復元できませんでした。",
	"ErrRemoteGameIdIsNotFound":"オンラインゲームエラー|このゲームIDは利用できません",
	"ErrDoActionAgain":"アクションエラー|すでにアクションを完了しています",
	"ErrActionTiming":"アクションエラー|現在のゲーム状況にあわないアクションを実行しました。アプリを再起動してお試しください。",
	"ErrRemoteBusy":"ビジーエラー|現在サーバーが混み合っています。もう一度、お試しください。",
	
	"BuyCardByMedal":"メダルでカードを獲得|このカードをメダル100ptと交換しますか？所持メダル数[VALUE]pt",
	"UpdateFriend":"ご友人登録完了|ご友人コード'[VALUE]'の登録を完了しました。メダルを50pt獲得しました。",
	"CampMedal":"メダル獲得|メダルを[VALUE]pt獲得しました。",
	"ErrBuyCardAlready":"購入済み|この賞品はすでに獲得済みです。",
	"ErrBuyCardPointEmpty":"メダル不足エラー|メダルの残高が足りません。再度、メダルをご確認ください。",
	"ErrCantBuy":"購入エラー|購入手続きが正しく処理されませんでした。しばらくしてから再度お試しください",
	"ErrCancelBuying": "購入キャンセル|購入はキャンセルされました",
	"ErrOffLine":"ネットワークエラー|インターネットに接続されていないため、購入情報を更新できませんでした",
	"ErrCantRestore":"リストアエラー|リストアが正しく処理されませんでした。しばらくしてから再度お試しください",
	
	"ApplyAdfree": "アドフリー|アドフリーが有効になりました。ゲーム中に広告が表示されなくなります。",
	"ApplyMasterKey": "カードマスターキー|カードマスターキーが有効になりました。すべてのカードをお使いいただけます",
	"ApplyRestore": "復元完了|あなたの購入情報はすべて復元されました。",
    
    "ErrOverCampCardMax":"有料カード アンロック|一度に有効にできるカードは[VALUE]つまでです。",
    "ErrRewardMovieLoad":"広告動画エラー|広告動画をロードできませんでした。時間が経ってからお試しください。",
    "ErrAllCardEnable":"全カード開放済み|すでにすべての有料カードが開放されています。ご購入ありがとうございます！",
	"ErrInterstitialLoad":"広告エラー|広告のロード中にエラーが発生しました。",

	
	"ConfirmReview":"アプリ評価レビュー|'人狼ゲーム'はお楽しみいただけましたか？もし可能でしたら、アプリの評価をお願いします",
	"ConfirmUpdate":"アップデート情報|新しいバージョン[VALUE]がリリースされました。アップデートしてお楽しみください。",
	"ConfirmUpdateMust":"必須アップデート|新しいバージョン[VALUE]がリリースされました。アップデートしてお楽しみください。",
	
	"DeletePlayer":"プレイヤー削除|[VALUE]さんを削除してもよろしいですか？",
	"DeletePlayerAll":"プレイヤー削除|全プレイヤーを削除してもよろしいですか？",
	
	"EnterDream":"本人確認|[VALUE]さんで間違いありませんか?",
	"PassDream":"答え確認をスキップ|役職の答え確認をスキップしてもよろしいですか？",
	
	"DreamActionSuspect":"アクション確認|[VALUE]さんを人狼だと疑いますか？",
	"DreamActionKill":"アクション確認|[VALUE]さんを殺害しますか？",
	"DreamActionFortune":"アクション確認|[VALUE]さんを人狼かどうか調べますか？",
	"DreamActionGuard":"アクション確認|[VALUE]さんを今夜守りますか？",
	"DreamActionNecromancy":"アクション確認|[VALUE]さんの霊を降霊しますか？",
	"DreamActionChange":"アクション確認|[VALUE]さんと役職を交換しますか？",
	"DreamActionBomb":"アクション確認|今晩、無敵になりますか？",
	"DreamActionMark": "アクション確認|[VALUE]さんを人狼としてマークしますか？",
	
	"DreamActionChecked":"アクション確認|他のプレイヤーの役割を確認できましたか？",
	"DreamActionSelectPlayer":"アクション確認|あなたは[VALUE]さんですか？",

	"VoteAction":"投票確認|[VALUE]さんに投票してもよろしいですか？",

	"FortuneResultGood":"占い結果|[VALUE]さんは、人狼です！",
	"FortuneResultBad":"占い結果|[VALUE]さんは、人狼ではありませんでした。",
	"JudgementResultPerson":"処刑対象|投票の結果、本日処刑されるプレイヤーは、[VALUE]さんです。",
	"JudgementResultPersonRandom":"処刑対象ランダム|決選投票の結果が、再び同票となったため、ランダムに処刑者が決定されました。本日処刑されるのは、[VALUE]さんです。",
	"JudgementResult":"投票の結果|[VALUE]さんは、処刑されました。以後、幽霊となり、ゲーム終了まで話してはいけません。",
	"JudgementResultWin":"投票の結果|[VALUE]さんは、処刑されました。",
	
	"RemoteCopyUrl":"URLをコピー|招待用URLをコピーしました。メッセンジャーやチャットで参加者にURLをシェアしてください",
	"RemoteNowWaiting":"待機中|現在、待機中です。ゲームマスターがボタンを押してください、と指示するまで、今しばらくお待ちください",
	"RemoteNowWaitingGM":"待機中|現在、待機中です。すべてのプレイヤーが操作を完了するまでお待ちください",
	"RemoteNowWaitingUntilGameset":"待機中|ゲーム終了時に、ゲーム結果を確認できます。それまで、今しばらくお待ちください",
	"RemoteQuitGame":"ゲーム中止|このゲームはゲームマスターによって途中終了されました",
	"RemoteQuitGameConfirm":"ゲーム中止|このゲームを途中終了してもよろしいですか？終了後、このゲームを復帰することはできません",
	"RemoteExitGame":"ゲーム中止|このオンラインゲームから退場してもよろしいですか？退場後、このゲームには戻ることはできません",
	"RemoteGmMissReboot":"起動エラー|ゲームマスターはプレイヤー招待URLにアクセスする必要はありません。本アプリのみで操作を行ってください。前回、自動保存した状態に復元します。",
	"RemoteContinuePlayer": "再戦する|ゲームマスターが「再戦する > GAME START」を完了すると、次のゲームに移動します。",
	"DeleteGameConfirm":"ゲームルーム削除|現在、募集中のゲームルームを破棄してもよろしいですか？",
	"DeleteGameRoom":"ゲームルーム削除|ゲーム参加用のルームを削除しました。オンラインゲームを開始する際は、新しいQRコードをシェアしてください",

	"AlertVoteAnonymous": "投票スタイルの注意|オンラインモードの場合は、匿名投票ではなく自由投票になります。",
	"RemoteUrlForCopyClipboard": "RemoteURL|SafariもしくはChromeで次のURLにアクセスしてください（それ以外のアプリ内で表示されたページでは、動作しません）    [VALUE]",

	"AccountNullName":"未入力エラー|ニックネームは必須です。10文字以内の名前を入力してから保存してください。",
	"AccountNameFormatErr": "名前フォーマットエラー|ニックネームは10文字以内の半角文字・全角文字をお使いください。絵文字は使えません。",
	"AccountWarningXConnect":"X連携が未設定|X連携をしないと戦績を残すことができませんが、よろしいですか？",
	"AccountWarningXFollow": "公式Xが未フォロー|公式Xをフォローしないとコインがゲットできませんが、よろしいですか？",

	"AccountCreateSuccess": "登録完了|新規アカウントを作成しました。",
	"AccountUpdateSuccess": "更新完了|アカウント情報を保存しました。",
	"AccountCreateFailed": "登録エラー|アカウント情報の保存に失敗しました。ネットワーク状況を確認して、もう一度お試しください。",
	"AccountCreateAlert1": "X未接続|Xと連携しないと戦績が保存されませんが、よろしいですか？",

	"ErrNeedAccountRegist": "アカウント未登録|オンラインモードを利用するために、アカウント登録を行ってください",
	"ErrRemoteGameIsNotStandby": "ゲーム参加エラー|現在、ゲームへの参加は締め切られています。ゲームマスターに確認してください。",
	"ErrYouAreKicked": "ゲーム参加エラー|あなたはゲームメンバーから除外されました。ゲームマスターにご確認ください",
	"ErrUserNotFound": "アカウントエラー|アカウントが見つかりませんでした。",

	"":""
};
goAlertTextEn = {
	"NewGame":"New Game|Let's start the new game. Are you sure you want to clear the last game's data？",
	"LoadCardData":"Data Download|The card data was downloaded.",
	
	"ErrPlayerOver":"Capacity Error|You can't add any more players.",
	"ErrNameEmpty":"Input Error|Enter the name of the player.",
	"ErrNameSame":"Input Error|This name already exists. Enter a different name.",
	"ErrPlayerMin":"Need more players|Add [VALUE] or more players",
	"ErrCitizenTooFew":"Card Set Error|The number of citizens is insufficient. Reset the number of cards.",
	"ErrWerewolfNone": "Card Set Error|The number of werewolves is insufficient. Reset the number of werewolf cards.",
	"ErrCardNumOverPlayer":"Card Set Error|You cannot add any more cards because the total of cards exceeds the number of players.",
	"ErrNoHumanForFirstNightForetell": "Card Set Error|When fortune telling on the 1st night, there is no position whose fortune telling result is human. Please change the 'Fortune telling on the 1st night' settings or the card settings.",
	"ErrNoHumanForFirstNightOracle": "Card Set Error|When fortune telling on the 1st night, there is no position whose fortune telling result is human. Please change the card settings.",
	"WarningDoubleKnight":"Double Knight|Knight can guard only one player. When the knights select different player, only one player will be guarded at random.",

	"ErrInvalidFriendCodeMe":"Friend's Code Error|Enter your friend's code.",
	"ErrInvalidFriendCode":"Friend's Code Error|Check your friend's code, and try again.",
	"ErrAlreadySetFriendCode":"Friend's Code Error|You have already set your friend's code.",
	"ErrAlreadySetCampCode":"Code Error|This code has been used.",
	"ErrWrongCampCode":"Code Error|This code is invalid.",
	
	"ErrNetworkTimeout":"Network Error(152)|A network error occurred. Try again when you have a better connection.",
	"ErrUDID":"Network Error(146)|A network error occurred. Try again when you have a better connection.",
	"ErrNoData":"Network Error(147)|A network error occurred. Try again when you have a better connection.",
	"ErrSendData":"Network Error(154)|A network error occurred. Try again when you have a better connection.",
	"ErrQuery":"Network Error(155)|A network error occurred. Try again when you have a better connection.",
	"ErrDBConnect":"Network Error(156)|A network error occurred. Try again when you have a better connection.",
	"ErrMaintenance":"Maintenance|The server is currently under maintenance, try again later.",

	"ErrSelectSamePlayer":"Check Name|This player name has already been selected. Is it correct?",

	"ErrRemoteGameIdIsNull":"Online Game Error|Sorry, you cannot restart the previous online game.",
	"ErrRemoteGameIdIsNotFound":"Online Game Error|Sorry, this game id is not available",
	"ErrDoActionAgain":"Action Error|You have already done the night action",
	"ErrActionTiming":"Action Error|You did the action mismatched with this status. Please reboot this app and try again.",
	"ErrRemoteBusy":"Busy Error|Now server is busy. Please try again.",

	"BuyCardByMedal":"Get card with medals|Do you want to exchange 100 medals with this card?Your medals:[VALUE]pt",
	"UpdateFriend":"Entry Success|Friend's Code '[VALUE]' has been entered. You got 50 medals",
	"CampMedal":"Bonus Medal|You got [VALUE]pt.",
	"ErrBuyCardAlready":"Get card with medals|You already have this item.",
	"ErrBuyCardPointEmpty":"Get card with medals|You don't have enough medals.",
	"ErrCantBuy":"Purchase Error|Sorry, Purchase process didn't go through successfully. Please try again later.",
    "ErrCancelBuying":"Cancel buying|You canceled buying this item.",
	"ErrOffLine":"Network Error|Could not update purchase data due to network problems.",
	"ErrCantRestore":"Restore Error|Sorry, Restore process didn't go through successfully. Please try again later.",

	"ApplyAdfree": "Ad Free|Ad Free is now valid. Ads will not be displayed during the game.",
	"ApplyMasterKey": "Card Master Key|The card master key is now valid. All cards can be used.",
	"ApplyRestore": "Restored|Your all purchase information has been restored.",

    "ErrOverCampCardMax":"Unlock cards by Ad|You can unlock only [VALUE] cards at the same time. Please try after a while",
    "ErrRewardMovieLoad":"Ad Movie Error|App can't download the ad movie. Please try again after a while",
    "ErrAllCardEnable":"All Cards are paid|You had paid for all cards. Thank you!",
	"ErrInterstitialLoad":"Ad Error|The app can't download the ad.",    
	
    "ConfirmReview":"App Review|Did you enjoy this app? Would you be able to review this app?",
	"ConfirmUpdate":"App Update|A new version [VALUE] is available. Please update and enjoy this app.",
	"ConfirmUpdateMust":"App Update|A new version [VALUE] is available. Please update and enjoy this app.",

	"DeletePlayer":"Delete Player|Are you sure you want to delete [VALUE]？",
	"DeletePlayerAll":"Delete Player|Are you sure you want to delete all players?",
	
	"EnterDream":"Check Player|Are you [VALUE]?",
	"PassDream":"Skip the night|Are you sure you want to skip [VALUE]'s turn？",

	"DreamActionSuspect":"Check Action|Do you suspect [VALUE] to be a werewolf？",
	"DreamActionKill":"Check Action|Will you kill [VALUE]？",
	"DreamActionFortune":"Check Action|Will you check if [VALUE] is a werewolf or not？",
	"DreamActionGuard":"Check Action|Will you protect [VALUE] tonight？",
	"DreamActionNecromancy":"Check Action|Will you transform into [VALUE]?",
	"DreamActionChange":"Check Action|Will you change your role by [VALUE]'s role?",
	"DreamActionBomb":"Check Action|Will you set the trap in this night?",
	"DreamActionMark": "Check Action|Do you mark [VALUE] as a werewolf?",
	
	"DreamActionChecked":"Check Action|Have you checked the players' role?",
	"DreamActionSelectPlayer":"Check Action|Are you [VALUE]?",

	"VoteAction":"Check Vote|Are you sure you want to vote [VALUE]？",
	
	"FortuneResultGood":"Result|[VALUE] is werewolf!",
	"FortuneResultBad":"Result|[VALUE] is not werewolf.",
	"JudgementResultPerson":"Killing Target|The result of the votes is in. Today's target is [VALUE].",
	"JudgementResultPersonRandom":"Killing Target|The number of votes was tied again, so the target is chosen at random. Today's target is [VALUE].",
	"JudgementResult":"Result of the judgement|[VALUE] is killed and become a ghost. Don't say anything until end of the game.",
	"JudgementResultWin":"Result of the judgement|[VALUE] is killed and become a ghost.",

	"RemoteCopyUrl":"Copied URL|You copied the invitation URL. Please share this URL by Messenger or Chat",
	"RemoteNowWaiting":"Waiting|Now waiting. Please wait until the game master asks players to tap the button.",
	"RemoteNowWaitingGM":"Waiting|Now waiting. Please wait until all the players finish their action.",
	"RemoteNowWaitingUntilGameset":"Waiting|You will check the game result. Please wait for a little while until the game is over",
	"RemoteQuitGame":"Quit Game|This game was quited by the game master.",
	"RemoteQuitGameConfirm":"Quit Game|Do you want to quit this game? You cannot restore this game later.",
	"RemoteExitGame":"Quit Game|Do you want to exit from this game? You cannot come back to this game later.",
	"RemoteGmMissReboot":"Reboot Error|The game master does NOT have to access to the invitation URL. Please use only this app. This app comes back to the previous auto-saving scene.",
	"RemoteContinuePlayer": "Play Again|After the game master taps 'Play Again > GAME START', you will join to the next game.",
	"DeleteGameConfirm": "Game Room Deletion|Are you sure you want to discard the current game room that is open for participants?",
	"DeleteGameRoom": "Game Room Deletion|The game room for participants has been deleted. Please share a new QR code when starting an online game.",

	"AlertVoteAnonymous": "Attention|If you select ONLINE MODE, the voting style will change to 'Free Order'",
	"RemoteUrlForCopyClipboard":"RemoteURL|Please access to this URL by Safari or Chrome. If you use other apps, it will not work well.    [VALUE]",

	"AccountNullName": "Input Error|Nickname is required. Please enter it before saving.",
	"AccountWarningXConnect": "Warning|Without X Connection, your game records cannot be saved. Is that okay?",
	"AccountWarningXFollow": "Warning|Without following the official X, you cannot get coins. Is that okay?",

	"AccountCreateSuccess": "Complete|Your account has been successfully created!",
	"AccountUpdateSuccess": "Complete|Your account has been successfully updated!",
	"AccountCreateFailed": "Save Error|Account updating failed. Please check your network connection and try again.",
	"AccountCreateAlert1": "X Connect|Without linking X, your game records won't be saved. Proceed?",

	"ErrNeedAccountRegist": "Account Not Registered|Please register an account to access the online mode.",
	"ErrRemoteGameIsNotStandby": "Game Entry Error|The game is currently closed for new participants. Please check with the Game Master.",
	"ErrYouAreKicked": "Game Entry Error|You have been removed from the game members. Please check with the Game Master.",
	"ErrUserNotFound": "Account Error|The account data isn't found.",

	"":""
};



/****************************************************
	関数名	GetAlertMessage
	機能		AlertやConfirmのタイトルとメッセージを取得する
	
	入力		sKey		配列キーワード
			sValue		差し替え文字
			goAlertText	アラート文字設定
	出力		aMessage	0:タイトル  1:メッセージ	
	
	処理概要	1. 配列キーワードに対応するメッセージパッケージを取得する
			2. 差し替え文字が空でない場合
			 2.1. メッセージパッケージを差し替え文字で修正する
			3. タイトルとメッセージを切り分けて配列に格納する
			4. 終了する
****************************************************/
function GetAlertMessage(sKey, sValue){
	var aMessage = [];
	
	// 配列キーワードに対応するメッセージパッケージを取得する
	var sMessagePackage = goAlertText[sKey];
	
	// 差し替え文字列が指定されている場合
	if(sValue != "" && sValue != undefined){
		// メッセージを差し替える
		sMessagePackage = sMessagePackage.replace("[VALUE]", sValue);
	}
	
	// タイトルとメッセージを切り分けて配列に格納する
	aMessage = sMessagePackage.split("|");
	
	// タイトルとメッセージを返して終了する
	return aMessage;
	
}



/*************************************
 * カード設定ページ用
 * カード情報
 * https://docs.google.com/spreadsheets/d/10aQ6yTXqohBw84bXwJmx14IzfWzsRcPuPaFV6t6QtNE/edit#gid=1098202541
 ************************************/

var gaCardInfo = [{
	"CardType": "Citizen",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "1",
	"MaxNum": "20",
	"NewFlg": "0",
	"TextJp": "人狼を絶滅させる基本プレイヤーです。人狼を絶滅させると勝利となります。特殊能力がないため、ゲームの最後まで残される可能性が高い重要な役職です。",
	"TextEn": "Citizens are the basic players who execute werewolves. You win when you execute all the werewolves."
},
{
	"CardType": "Werewolf",
	"Team": "Werewolf",
	"Count": "Werewolf",
	"Foretell": "Werewolf",
	"Level": "1",
	"MaxNum": "5",
	"NewFlg": "0",
	"TextJp": "市民になりすまし、市民を殺害するプレイヤーです。人狼同士は、互いに誰が人狼なのかわかります。市民の数が、人狼の数と同数になった時点で、人狼チームの勝利となります。",
	"TextEn": "The werewolves kill the citizens as they pretend to be citizens. The werewolves know who the other werewolves are. You win when the number of werewolves and citizens becomes the same."
},
{
	"CardType": "FortuneTeller",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "1",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。毎晩、人狼と思われる人の正体を１人だけ確認できます。",
	"TextEn": "This role is a citizen who has supernatural powers. Every night, you can see the identity of one player whom you suspect to be a werewolf."
},
{
	"CardType": "Shaman",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "2",
	"MaxNum": "2",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。死んだプレイヤーが人狼かどうかを、知ることができます。ただし、特殊能力者と市民の区別はできません。",
	"TextEn": "This role is a citizen who has supernatural powers. You can check if the dead players are werewolves or not."
},
{
	"CardType": "Knight",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "1",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。毎晩、人狼から守りたい市民を守ることができます。",
	"TextEn": "This role is a citizen who has supernatural powers. You can choose one player to protect from the werewolves every night."
},
{
	"CardType": "Psycho",
	"Team": "Werewolf",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "2",
	"MaxNum": "19",
	"NewFlg": "0",
	"TextJp": "人狼チームに属する人間プレイヤーです。人狼チームが勝利したときに、勝利となります。ただし、人間としてカウントされます。",
	"TextEn": "This role is a human who belongs to the werewolf team. You win when the werewolf team wins. You are counted as a human."
},
{
	"CardType": "Lovers",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "2",
	"MaxNum": "2",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。２人１組で、もう１人の恋人が誰かを把握できます。",
	"TextEn": "This role is a pair of citizens who have supernatural powers. You can know who the other one is."
},
{
	"CardType": "Vampire",
	"Team": "Vampire",
	"Count": "Vampire",
	"Foretell": "Vampire",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "市民チームにも人狼チームにも属さないプレイヤーです。ゲーム終了時に生き残っていると勝利となります。 人間としても、人狼としてもカウントされません。",
	"TextEn": "This role is a special player who belongs to neither the werewolf team nor the citizen team. When you survive untill the game is over, you win. You are not counted as a werewolf or a human."
},
{
	"CardType": "Fixer",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "1",
	"TextJp": "特殊能力をもった市民プレイヤーです。毎晩、人狼と思われる人を選び、マークします。本プレイヤーが処刑や、人狼による襲撃によって死亡すると、最後にマークしたプレイヤーは組織による報復をうけて、翌朝、死体として発見されます。",
	"TextEn": "This role is a citizen who has supernatural powers. Every night, they select and mark a player they believe to be a werewolf. If this player is killed by execution or a werewolf attack, the last marked player will face revenge from the organization and be found dead the next morning."
},
{
	"CardType": "Dreamer",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "19",
	"NewFlg": "1",
	"TextJp": "特殊能力をもった市民プレイヤーです。毎晩、人狼と思われる人を選び、デジャヴで人狼か人間か知ることができます。しかし、1/3の確率で、間違えた夢を見てしまいます。",
	"TextEn": "This role is a citizen who has supernatural powers. Every night, you can choose a person who you suspect to be a werewolf, and you will see whether the player is a werewolf or a human through a prophetic dream. However, there is a 1/3 chance that you will have an incorrect dream."
},
{
	"CardType": "Oracle",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "19",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。初夜に、ランダムに1人、人間を知ることができます。",
	"TextEn": "This role is a citizen who has supernatural powers. You can know one of the humans randomly on the first night."
},
{
	"CardType": "PrisonBreaker",
	"Team": "Werewolf",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "人狼チームに属する人間プレイヤーです。人狼チームが勝利したときに、勝利となります。ただし、人間としてカウントされます。夜に人狼に狙われても逃げることができ、死にません。",
	"TextEn": "This role is a human who belongs to the werewolf team. You win when the werewolf team wins. You are counted as a human. Even if werewolves attack you, you don't die because you can escape."
},
{
	"CardType": "Bat",
	"Team": "Vampire",
	"Count": "Vampire",
	"Foretell": "Vampire",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "市民チームにも人狼チームにも属さないプレイヤーです。ゲーム終了時に生き残っていると勝利となります。 夜に人狼に狙われても飛んで逃げることができます。しかし、占い師に占われると、霊気を奪われて死んでしまいます。 人狼としても人間としても、カウントされません。",
	"TextEn": "This role is a special player who belongs to neither the werewolf team nor the citizen team. When you survive untill the game is over, you win. Even if werewolf attacked you, you fly and escape. But if you were foretelled by the fortune teller, you lose your spirit and die. You are not counted as a werewolf or a human."
},
{
	"CardType": "Rich",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "2",
	"MaxNum": "2",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民です。ゲーム終了まで生き残ると、勝利チームの勝利ポイントが２倍になります。",
	"TextEn": "This role is the special citizen. When you survive until the game is over, the winners' winning points double."
},
{
	"CardType": "PsychoKiller",
	"Team": "Werewolf",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "人狼チームに属する人間プレイヤーです。市民プレイヤーとしてカウントされますが、人狼チームが勝利したときに、勝利となります。夜にあなたに関わったプレイヤー（人狼、占い師、騎士など）は、全員、あなたに殺されます。",
	"TextEn": "This role is a human who belongs to the werewolf team. You win when the werewolf team wins. The player (Fortune Teller, Knight, etc.) who contacts you in the night is killed by you."
},
{
	"CardType": "GreatShaman",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。死んだプレイヤーが人狼かどうかを知ることができます。ただし、特殊能力者と市民の区別はできません。死んだプレイヤーを降霊し、その役に変身することができます。（人狼にはなれません）",
	"TextEn": "This role is a citizen who has supernatural powers. You can check if the dead players are werewolves or not. You can call the spirit of the dead player, and transform to the dead player's role. ( You can not change to 'Werewolf')"
},
{
	"CardType": "Cosplayer",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Werewolf",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。毎晩、人狼から守りたい市民を守ることができます。しかし、占い師や霊媒師に見られると「人狼」と判断されます。",
	"TextEn": "This role is a citizen who has supernatural powers. You can choose one player to protect from the werewolves every night. But you are seen as a 'Werewolf' when the fortune teller and the shaman check you in the night."
},
{
	"CardType": "Paparazzi",
	"Team": "Werewolf",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "人狼チームに属する人間です。人狼チームが勝利したときに、勝利となります。ただし、誰が人狼なのかは分かりません。毎晩、人狼か占い師と思われる人の正体を１人だけ確認できます。",
	"TextEn": "The Paparazzi is a human who belongs to the werewolf team. You win when the werewolf team wins. But the werewolves are unknown to you. Every night, you can see the identity of one player whom you suspect to be a werewolf or a fortune teller."
},
{
	"CardType": "Magician",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力を持つ市民です。第1夜に、誰か一人のカードを奪い自分のものとします。奪われた相手は翌朝から「市民」になります。「人狼」もしくは「メンタリスト」を奪った際、残りの人狼が2人以上いる場合は、カードを奪われたプレイヤーは裏切り者として、強制的に人狼の襲撃ターゲットとなり殺害されます。（この場合、人狼が襲撃しようとしていた市民は殺害されません）詳しいルールは、「遊び方 > FAQ」をご確認ください。",
	"TextEn": "The Magician is a citizen who has supernatural powers. You can take another player's card and make it your own. The other player then becomes ab'Citizen' from the next morning. When you choose a 'Werewolf' or 'Mentalist' player, if over two werewolves live, the chosen player will be killed by the other werewolves as a traitor (In this case, the citizen who are attacked by werewolves doesn't die). Read 'Tutorial > More Details'."
},
{
	"CardType": "Bomber",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力を持つ市民です。ゲーム中、一晩だけ自分の部屋に爆弾をしかけ無敵になれます。無敵中の夜にボマーに関わったプレイヤー（人狼、占い師、騎士など）は全員殺されます。（「第１夜の殺害無し」を有効時は、第１夜は殺されません）",
	"TextEn": "The Bomber is a citizen who has supernatural powers.You can set the trap to your room at once. And the player who contacts you in the night when you set the trap is killed by the trap.(When 'No killing on the 1st night' mode is on, the players who contacts Bomber don't die on the 1st night.)"
},
{
	"CardType": "Mentalist",
	"Team": "Werewolf",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "2",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "人狼チームに属する人間です。人狼チームが勝利したときに、勝利となります。また誰が人狼なのかはわかります。人狼は、誰がメンタリストなのかは、わかりません。",
	"TextEn": "Mentalist is a human who belongs to the werewolf team.You win when the werewolf team wins. Mentalist can know the werewolves, but the werewolves don't know Mentalist."
},
{
	"CardType": "DarkShaman",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民です。死んだプレイヤーが人狼かどうかチェックすることができます。裁判での投票の結果、プレイヤーたちに処刑されると、亡霊となりその夜、騎士とコスプレイヤーを襲撃します。（この能力が発動するのは、裁判での投票のみです。人狼に襲われるなど、他の理由で殺害された場合は、何もおきません）",
	"TextEn": "The Dark Shaman is a citizen who has supernatural powers.You can check if the dead players are werewolves or not.If you are killed by the players' voting in the judgement stage, the 'Knight' and 'Cosplayer' will be killed by your dark soul in the night.(This power will be shown when you are killed by voting. In other cases, nothing will happen.)"
},
{
	"CardType": "DestinedLovers",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "2",
	"NewFlg": "0",
	"TextJp": "特殊能力をもった市民プレイヤーです。２人１組で、もう１人の恋人が誰かを把握できます。 ただし、恋人の一方が死亡した場合、もう１人の恋人は人狼に戦いを挑み、翌朝、死亡してしまいます。",
	"TextEn": "This role is a pair of citizens who have supernatural powers. You can know who the other one is. When one lover dies, the other destined lover will fight against werewolves and die in the next morning."
},
{
	"CardType": "RainMan",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "3",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "特殊能力を持った市民プレイヤーです。 レインマンが生存している間は、毎日、雨が降ります。（朝にGMが天気を発表します） 時々発生する雷雨の朝には、落雷によってランダムに１名が死亡します。（落雷の対象は、レインマン自身も含めて、すべてのプレイヤーです）",
	"TextEn": "Rain Man is a citizen who has a supernatural powers. When Rain Man is alive, it rains every day. Sometimes the lightning volt kills a player at random in the morning. The Rain Man is included in lightning targets."
},
{
	"CardType": "LegendaryWolf",
	"Team": "Werewolf",
	"Count": "Werewolf",
	"Foretell": "Werewolf",
	"Level": "4",
	"MaxNum": "1",
	"NewFlg": "0",
	"TextJp": "市民になりすまし、市民を殺害するプレイヤーです。人狼同士は、互いに誰が人狼なのかわかります。市民の数が、人狼の数と同数になった時点で、人狼チームの勝利となります。夜にあなたに関わったプレイヤー（占い師、騎士など）は、全員、あなたに殺されます。",
	"TextEn": "The werewolves kill the citizens as they pretend to be citizens. The werewolves know who the other werewolves are. You win when the number of werewolves and citizens becomes the same. The player (Fortune Teller, Knight, etc.) who contacts you in the night is killed by you."
},	
{
	"CardType": "Original",
	"Team": "Citizen",
	"Count": "Human",
	"Foretell": "Human",
	"Level": "4",
	"MaxNum": "2",
	"NewFlg": "0",
	"TextJp": "上級者向けのカスタマイズ可能な役職です。カード自体の機能は、市民と変わりません。ゲームマスターツールを併用することで、オリジナルの役職として使用できます。どのように使うかはあなた次第です。利用例（「名探偵」と「ヒロイン」）を「遊び方 > 詳細ルール」でご紹介しています。",
	"TextEn": "Original is an advanced rule for the experienced game master. This card is the same as Citizen, but you can customize this role with the 'Game Master Tool'.You can make a new role. We introduce the sample role 'Detective' and 'Heroine' in 'Tutorial > More Details'."
}
];