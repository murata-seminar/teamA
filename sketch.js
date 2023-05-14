//----エンティティ関連の関数 ----------------------------------------------



// プレイヤーエンティティ
function createPlayer(){
  return {
    hp: 100,
    lv_s: 2,
    lv_i: 1,
    lv_h: 1,
    type: "社会",
    attack: 10,
    diffence: 10,
    x: 200,
    y: 300
  }
}

function drawplayer(player){
  circle(player.x, player.y, 50);
}


// エネミーエンティティ
function createEnemy(){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 2,
    type: "人間",
    attack: 10,
    diffence: 10,
    x: 600,
    y: 300
  }
}

function drawEnemy(enemy){
  circle(enemy.x, enemy.y, 50);
}


//----ゲーム全体に関わる部分 ----------------------------------------------
/** プレイヤーエンティティ */
let player;

/** エネミーエンティティ */
let enemy;

/** ボタンエンティティ */
let button;

/** ステータスの描画 */

function drawStatus(entity) {
  textSize(20);
  textAlign(CENTER, CENTER);
  text('HP:' + entity.hp, entity.x, 150);
  text('タイプ:' + entity.type, entity.x, 170);
  text('社会Lv:' + entity.lv_s + ' ' + '情報Lv:' + entity.lv_i + ' ' + '人間Lv:' + entity.lv_h, entity.x, 210);
}

/** ゲームの描画 */
function drawGame(){
  drawplayer(player);
  drawEnemy(enemy);

  drawStatus(player);
  drawStatus(enemy);
}


//----setup/draw 他 ------------------------------------------------------

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル
  rectMode(CENTER); //四角形の基準点を中心に変更
  background(220);

  // プレイヤーの生成
  player = createPlayer();

  // エネミーの生成
  enemy = createEnemy();

  // ボタンの生成
  let button = createButton("ミクロ経済学");
  button.position(80, 500);
  button.mousePressed(changeBG); // ボタンを押すとchangeBGを呼び出す
  button.style("width", "200px");
  button.style("height", "80px");
  button.style("font-size", "24px");
  

}

function draw() {
  background(220);
  drawGame();
}

function mousePressed(){
  //（ここにマウスボタンを押したときの処理が入る）
}

function changeBG(){
  let val = random(255);
  background(val);
}