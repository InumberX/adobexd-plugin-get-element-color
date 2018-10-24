/*
 * API・ライブラリ読み込み
 ****************************************/
// クリップボード
let clipboard = require('clipboard');
// dialogs.js
const { alert, error } = require('./lib/dialogs.js');

/*
 * 各処理
 ****************************************/
// 選択中の要素のカラーコードをコピーする処理
function getElementColor(selection) {

  // 選択中の要素
  const items = selection.items;

  // エラー時に表示されるダイアログのタイトル
  const errorAlertTitle = '処理に失敗しました';

  // 要素を1つだけ選択していた場合
  if(items.length === 1) {
    items.forEach(item => {
      let colorInfo;
      // 塗りの情報が取得できる場合
      if(item.fill !== null) {
        // カラーコードを16進数で取得
        colorInfo = item.fill.value.toString(16);
      } else if(item.stroke !== null) {
        // 境界線の情報が取得できる場合
        // カラーコードを16進数で取得
        colorInfo = item.fill.stroke.toString(16);
      } else {
        // 色の情報が取得できなかった場合
        showError(errorAlertTitle, '色情報の取得が取得できませんでした。')
        return false;
      }
      const colorCode = '#' + colorInfo.slice(2);
      // クリップボードにコピーする
      clipboard.copyText(colorCode);
    });
  } else if(items.length < 1) {
    // 要素を選択していなかった場合
    showError(errorAlertTitle, '要素が選択されていません。');
  } else if(items.length > 1) {
    // 複数の要素が選択されていた場合
    showError(errorAlertTitle, '複数の要素が選択されています。');
  }

}

// エラー用のダイアログを表示する処理
async function showError(title, text) {
  // ダイアログを表示する
  await error(title, text);
}

// manifest.jsonで定義したcommandIdとfunctionの紐付けを行なう
module.exports = {
    commands: {
        getElementColor: getElementColor
    }
};
