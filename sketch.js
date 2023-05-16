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

// ボタンエンティティ
function createButtons(button_name, button_x, button_y){
  return{
    name: button_name,
    x: button_x,
    y: button_y
  }
}

function drawButton(button){
  rect(button.x, button.y, 200, 80);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(button.name, button.x, button.y);
  if(mouseIsPressed){
    if(mouseX >= 80 && mouseX <= 280 && mouseY >= 460 && mouseY <=540){
      kindsOfButton = button.name;
      ButtonIsPushed();
    }
  }
}

// ボタンのステータス　ボタンの名称が入り、攻撃のエフェクトと紐付けられる
let kindsOfButton;


//----ゲーム全体に関わる部分 ----------------------------------------------
/** プレイヤーエンティティ */
let player;

/** エネミーエンティティ */
let enemy;

/** ボタンエンティティ */
let micro_button;

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

// ボタンの描画
  drawButton(micro_button);

  drawStatus(player);
  drawStatus(enemy);
}

/** ボタンが押されたら */
function ButtonIsPushed(){
  if(kindsOfButton == "ミクロ経済学"){
    background(0);
  }
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
  micro_button = createButtons("ミクロ経済学", 180, 500);
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