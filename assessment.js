// Alt + Shift + ドラッグの操作：複数行のカーソル同時操作

// 厳格モード
'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全削除
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // 子要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

// アロー関数
assessmentButton.onclick = () =>　{
// 無名関数
// assessmentButton.onclick = function() {
    const userName = userNameInput.value; // value を Value って書いたら console が undefined になっちゃった
    if (userName.length === 0) { // 名前が空の時は処理を終了する（Exit みたいなもんか？）
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText ='診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // TODO ツイートエリアの作成
    //<a href="https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-text="診断結果の文章" data-show-count="false">Tweet #あなたのいいところ</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const herfValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', herfValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        // ボタンのonclick() 処理を呼び出す
        assessmentButton.onclick();
    }
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

// Tips　const と let
// ここまでは、変数の宣言に var を利用しましたが、 ES6 では
// 1度しか代入できない変数である const（コンスト） という宣言
// {} で囲まれた中でのみ使える変数である let（レット） という宣言
// が利用できます。 

// const は、二度と変更したくない値を設定するのに便利です

// let, const は{ ～ } で囲まれた部分でしか機能しません。
// こういった変数の有効な範囲をスコープ（scope）といいます。

// 名前を入力すると診断結果が出力される関数
// 入力が同じ名前なら、同じ診断結果を出力する処理
// 診断結果の文章のうち名前の部分を、入力された名前に置き換える処理

// このような要件なので、まず最初は処理の中身は置いておいて、その関数の形から用意してみます。

// JSDoc とインタフェース
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

// param...パラメータ。関数を定義するときに使う仮引数。
// y=ax の a みたいなモノ。
// 定義した時点では a に何が入るかわかってないけど、
// そこに何らかの値を入れることは決まっている。

function assessment(userName) {
    // TODO 診断処理を実装
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    // 「正規表現」で {userName} を入力された名前に置換
        // const から let に変更(今回は result.replace() という関数の戻り値を再代入しているから)
    // const result = answers[index];
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

// テストコード

// console.log(assessment('太郎'));
// console.log(assessment('次郎'));
// console.log(assessment('太郎'));

// console.assert は、第一引数には、正しい時に true となるテストしたい式を記入し、
// 第二引数には、テストの結果が正しくなかった時に出したいメッセージを書きます。
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

/* 【まとめ】
// 関数のインタフェースを JSDoc 形式のコメントでわかりやすく定義することができる
// 正規表現は、文字列のパターンを表現するための記述方法である
// console.assert を利用して、関数が正しく動いているかテストすることができる

// 【練習】
// すでに、 console.assert を使って診断機能をテストしましたが

// 「入力が同じ名前なら、同じ診断結果を出力する」処理が正しいかどうか
// この項目に関してはテストがされていません。このテストを書いてみましょう。
*/

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら、同じ診断結果を出力する処理が正しくありません。'
);
