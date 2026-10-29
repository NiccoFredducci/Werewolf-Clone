/****************************************
 * Full Package Setting
 */

// 通常:false SP:true
var gbFull = false;

// auスマートパス Softbank AppPass の場合
var gbSmartPass = false;
var gbAppPass = false;


/****************************************
 * アプリ書き出し手順

TARGETS / Summary
1. バージョンをアップする
2. アイコンを切り替える
　Xcode上で行うと大問題になるので
　Finderを使って icon_Normalとicon_SPのフォルダの名前変更で行う。
　そのあと、Xcodeを起動し直す。

3.Bundle Identifierを切り替える
　・Werewolf　→　通常版
　・Werewolf2013 → SP版

PROJECT / Build Settings
4. プロビジョニングファイルを切り替える
　・Dist20130408 →　通常版
　・Dist For WerewolfSP →　SP版

full.js
5. gbFull を切り替える
　・false → 通常版
　・true →　SP版

6. gsEventCategory でバージョンを切り替える

7. gbAndroid でアンドロイド版かどうかを設定する

 *****************************************/

