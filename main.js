const TARGET_ID = "target";

// moduleの場合はHTMLから関数を呼び出せないので、イベント登録が必要
document.getElementById(TARGET_ID).addEventListener("change", main);


async function main() {
    const text = await readFileAsText(getFile(TARGET_ID));
    alert(text);
}

/**
 * ファイルを取得
 * @param {string} id HTML内のID
 * @returns {File}
 */
function getFile(id) {
  return document.getElementById(id).files[0];
}

/**
 * ファイル読み込み
 * @param {File} file nullの場合はエラー
 * @returns {string} ファイルの内容
 */
async function readFileAsText(file) {
  if(!file) {
    throw new Error("読み込むファイルが指定されていません");
  }

  // 同期しながらファイル読み込み
  // 参考 https://stackoverflow.com/a/46568146
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}