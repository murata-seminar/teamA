//----エンティティ関連の関数 ----------------------------------------------



// プレイヤーエンティティ
function createPlayer(){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 1,
    type: "syakai",
    attack: 10,
    diffence: 10,
  }
}


function drawplayer(entity){
  circle(200, 300, 50);
}

// エネミーエンティティ
function createEnemy(){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 1,
    type: "ninngenn",
    attack: 10,
    diffence: 10
  }
}

function drawEnemy(enemy){
  circle(600, 300, 50);
}

// 


//----ゲーム全体に関わる部分 ----------------------------------------------
/** プレイヤーエンティティ */
let player;

/** エネミーエンティティ */
let enemy;

/** ボタンエンティティ */
let button;


/** ゲームの描画 */
function drawGame(){
  drawplayer(player);
  drawEnemy(enemy);
}


//----setup/draw 他 ------------------------------------------------------

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル。今回このサイズでやっていきます
  rectMode(CENTER); //四角形の基準点を中心に変更
  background(220);

  let button = createButton("ミクロ経済学");
  button.position(80, 500);
  button.mousePressed(changeBG);
  button.style("width", "200px");
  button.style("height", "80px");
  button.style("font-size", "24px");
  //（ここに初期化処理が入る）

}

function draw() {
  //（ここにデータ操作処理が入る）
  drawGame();
}

function mousePressed(){
  //（ここにマウスボタンを押したときの処理が入る）
}

function changeBG(){
  let val = random(255);
  background(val);
}