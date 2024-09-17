// 変数の初期化
let untyped = '';   // 何も入力されていない文字列
let typed = '';     // すでに入力された文字列を保存するための変数
let score = 0;      // score という変数を宣言して、初期値として 0 を代入


// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');  // 未入力のテキストを表示する場所（フィールド）
const typedfield = document.getElementById('typed');      // 入力済みのテキストを表示するためのフィールド
const wrap = document.getElementById('wrap');             // 全体の見た目やタイピングの結果を囲む枠
const start = document.getElementById('start');           // タイピングゲームの「スタートボタン」など、ゲーム開始のトリガー
const count = document.getElementById('count');           // ゲームで入力した文字数や残りの時間などのカウント（数値）を表示するためのフィールド
const scoreField = document.getElementById('score');      // タイプ数表
const messageField = document.getElementById('message');  // メッセージ表示用


// 複数のテキストを格納する配列
const textLists = 
[
  'aqua', 'beige', 'coral', 'cyan', 'emerald', 'fuchsia',
  'gold', 'indigo', 'ivory', 'lavender', 'magenta', 'maroon', 
  'navy', 'olive', 'peach', 'plum', 'ruby', 'silver', 'teal', 
  'turquoise','red', 'blue', 'green', 'yellow', 'purple',
  'orange', 'pink', 'brown', 'black', 'white','charcoal', 
  'salmon', 'pearl', 'cobalt', 'mint', 'rose', 'sapphire',
  'amber', 'jade', 'mauve', 'tan', 'copper', 'lime', 'cream',
  'wheat', 'khaki', 'taupe', 'scarlet', 'raspberry', 'onyx'
];


// 「新しいテキストをランダムに出す」ための関数で、新しい文字列が出てくるたびに、入力済みの文字列をリセットして次に進む準備
const createText = () =>                                      // 関数を定義
{
  // 正タイプした文字列をクリア
  typed = '';                                                 // 新しいラウンドが始まるときに、前のラウンドで入力された文字の削除
  typedfield.textContent = typed;                             // 空の文字列を表示

  // 配列のインデックス数からランダムな数値を生成する             // 0 以上 1 未満のランダムな小数を生成.
  let random= Math.floor(Math.random() * textLists.length);   

  // 配列からランダムにテキストを取得し画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};


// キー入力の判定
const keyPress = e =>                             // 関数を定義,この関数は、キーが押されたときの処理を担当
{
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1))           // 文字列の最初の1文字を取得,!== は「等しくない」を意味
  {     
    wrap.classList.add('mistyped');               // HTMLの wrap 要素に対して、mistyped というクラスを追加
    // 100ms後に背景色を元に戻す                    // 指定した時間後に特定の処理を実行する関数
    setTimeout(() => 
    { 
      wrap.classList.remove('mistyped');
    }, 100);
    return;                                       // この行で処理を終了
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;                                        // スコアを1増やす
  scoreField.textContent = `タイプ数: ${score}`;   // タイプ数を表示
  wrap.classList.remove('mistyped');          
  typed += untyped.substring(0, 1);               // 正しく入力された文字を typed に追加
  untyped = untyped.substring(1);                 // untyped の最初の1文字を除いた残りの部分を untyped に再代入
  typedfield.textContent = typed;                 // typedfield 要素に現在の typed 文字列（正しく入力された部分）を表示 
  untypedfield.textContent = untyped;             // untypedfield 要素に現在の untyped 文字列（未入力の部分）を表示

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '')                              // untyped が空文字列なら、新しいテキストを表示するために関数を呼び出す
  {                        
    createText();
  }
};


// タイピングスキルのランクを判定
const rankCheck = score =>                    // 関数を定義, score を引数として受け取り、そのスコアに応じてランクを判定
{                  
  // テキストを格納する変数を作る
  let text = '';                              // text という変数を作り、初期値として空の文字列を代入
 
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100)                                                               // スコアが100未満の場合の条件を確認します。この場合、Cランクと判断
  {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;      // のランクであるBランクまであと何文字必要かが計算
  } 

  else if(score < 200)                                                          // スコアが100以上200未満の場合、このブロックが実行され、Bランク
  {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } 

  else if(score < 300)                                                          // スコアが200以上300未満の場合、Aランクとして処理
  {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } 

  else if(score >= 300) 
  {
    text = `あなたのランクはSです。\nおめでとうございます!`;                        // スコアが300以上の場合、Sランクとして扱われ、特別なメッセージが表示
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};


// ゲームを終了
const gameOver = id => 
{
  clearInterval(id); // タイマーを停止

  // タイムアップのメッセージを表示
  messageField.textContent = "タイムアップ！!"; 
  messageField.style.display = 'block'; // メッセージを表示
  messageField.classList.add('zoomIn'); // または '' クラスzoomInを追加する

  // setTimeoutを使って、少しの時間後に結果を表示
  setTimeout(() => 
  {
    const result = confirm(rankCheck(score)); // スコアに応じたメッセージを表示する confirm ダイアログ

    // OKボタンをクリックされたらリロードする
    if(result == true) 
    {
      window.location.reload(); // ページをリロードしてゲームを最初からやり直す
    }
  }, 500); // 500ミリ秒後に結果を表示
};


// カウントダウンタイマー
const timer = () =>                                     //カウントダウンタイマーを動作させる処理
{
  // タイマー部分のHTML要素（p要素）を取得する 
  let time = count.textContent;                         // count という HTML 要素のテキスト（残り時間の表示）を time という変数に代入

  const id = setInterval(() =>                          // 関数は、毎秒繰り返し処理を実行,id は、このタイマー処理を停止するために必要な識別子
  {
    // カウントダウンする
    time--;                                             // time 変数の値を 1 減らします。これは、1秒ごとにカウントダウンさせるための処理
    count.textContent = time;                           // 変更された time の値を、画面上のタイマー表示に反映.これにより、プレイヤーが残り時間を確認
    // カウントが0になったらタイマーを停止する
    if(time <= 0)                                       // time の値が 0 以下になったら、タイマーを停止し、ゲームを終了
    {
      gameOver(id);                                     // 関数を呼び出し、ゲームを終了
    }
  }, 1000);                                             // 1秒ごとにカウントダウン処理が実行
};


// ゲームを開始する処理
start.addEventListener('click', () => 
{                 
  timer();                                              // タイマーを開始する
  createText();                                         // ランダムなテキストを生成して表示
  scoreField.style.display = 'block';                   // スコア表示を表示する
  start.style.display = 'none';                         // スタートボタンを隠す
  count.style.display = 'block';                        // タイマーを表示する
  document.addEventListener('keypress', keyPress);      // キー入力イベントの処理
});


untypedfield.textContent = 'カラータイピング';  