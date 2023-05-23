//----エンティティ関連の関数 ----------------------------------------------



// プレイヤーエンティティ
function createPlayer(){
  return {
    hp: 100,
    lv_s: 2,
    lv_i: 1,
    lv_h: 1,
    type: "Social",
    attack: 10,
    diffence: 10,
    x: 200,
    y: 300
  }
}

function drawplayer(player){
  image(img,player.x-40, player.y-10,70, 70);
}


// エネミーエンティティ
function createEnemy(){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 2,
    type: "Human",
    attack: 10,
    diffence: 10,
    x: 600,
    y: 300
  }
}

function drawEnemy(enemy){
  image(img2,enemy.x-30, enemy.y-10, 70, 70);
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
  rectMode(RADIUS);
  fill(0);
  rect(button.x, button.y, 70, 30, 20);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(220);
  text(button.name, button.x, button.y);
  if(mouseIsPressed){
    if(mouseX >= 80 && mouseX <= 280 && mouseY >= 460 && mouseY <=540){
      button_status = button.name;
      ButtonIsPushed();
    }
    /*if(mouseX >= 300 && mouseX <= 500 && mouseY >= 460 && mouseY <=540){
      button_status = button.name;
      ButtonIsPushed();
    }*/
  }
}

// 攻撃エフェクトエンティティ
function createAttack(){
  return {
    x: player.x,
    y: player.y,
    vx: 10
  }
}

function drawAttack(entity){
  if(num <= 1 && game_status == "attack"){
    if(entity.x > enemy.x){
      game_status = "select";
    } else if(entity.x <= enemy.x) {
      if(attacks == micro_attack){
        image(img4,entity.x, entity.y, 50,50);
      }
      /*
      if(attacks == database_attack){
        circle(entity.x, entity.y, 50);
      }
      */
    }
  } else {
    game_status = "select";
  }
}

// 攻撃エフェクトエンティティの位置の更新
function updateAttackPosition(entity){
  if(game_status == "attack"){
    entity.x += entity.vx;
  }
}

// 攻撃エフェクトエンティティの位置の初期化
function resetAttackPosition(entity){
  entity.x = player.x;
}

//----ゲーム全体に関わる部分 ----------------------------------------------
/** プレイヤーエンティティ */
let player;

/** エネミーエンティティ */
let enemy;

/** ボタンエンティティ */
let micro_button;
//let database_button;

/**画像 */
let img;
let img2;
let img3;
let img4;

/**音 */
let soundFile;

// ボタンのステータス
let button_status;
// "ミクロ経済学"などが入り、攻撃エフェクトと関連している

// 攻撃エフェクト
let attacks;
// micro_attack などが入る
// 後々、攻撃が複数になった場合、攻撃名のリストになるかも？

// ミクロ経済学攻撃エフェクト
let micro_attack;

// データベース基礎攻撃エフェクト
//let database_attack;

// ゲーム状態
let game_status;
//今のところ "attack" 攻撃中 か "select" 選択中 が入る

// マウスが押された回数
let num;

/** ステータスの描画 */
function drawStatus(entity) {
  textSize(25);
  textAlign(CENTER, CENTER);
  fill(0);
  text('HP:' + entity.hp, entity.x, 200);
  text('Type:' + entity.type, entity.x, 220);
  //text('社会Lv:' + entity.lv_s + ' ' + '情報Lv:' + entity.lv_i + ' ' + '人間Lv:' + entity.lv_h, entity.x, 210);

  text(micro_attack.x + "  " + enemy.x, 200, 375);
  //text(database_attack.x + "  " + enemy.x, 200, 400);
  //text(game_status, 200, 425);
}

/** ウィンドウの描画 */
function drawWindow(){
  if(game_status == "attack") { 
    textSize(30);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Player's " + button_status + ' attack!', 400, 50);
  }
}

/** ゲームの初期化 */
function resetGame(){
  // プレイヤーの生成
  player = createPlayer();

  // エネミーの生成
  enemy = createEnemy();

  // ボタンの生成
  micro_button = createButtons("Social", 180, 500);
  //database_button = createButtons("データベース基礎", 400, 500);

  // ミクロ経済学攻撃エフェクトの生成
  micro_attack = createAttack();

  // データベース基礎攻撃エフェクトの生成
  //database_attack = createAttack();

  // ゲーム状態の初期化
  game_status = "select";

  //マウスが押された回数numの初期化
  num = 0;
}

/** ゲームの更新*/
function updateGame(){
  updateAttackPosition(micro_attack);
  //updateAttackPosition(database_attack);
}

/** ゲームの描画 */
function drawGame(){
  drawplayer(player);
  drawEnemy(enemy);

// ボタンの描画
  drawButton(micro_button);
  //drawButton(database_button);

// ステータスの描画
  drawStatus(player);
  drawStatus(enemy);

// 攻撃エフェクトの描画
  drawAttack(micro_attack);

// ウィンドウの描画
  drawWindow();
}

/** ボタンが押されたら */
function ButtonIsPushed(){
  if(button_status == "Social"){
    attacks = micro_attack;
  }
  /*
  if(button_status == "データベース基礎"){
    attacks = database_attack;
  }
  */
}

// HPの更新
function updateHp(){
  if(enemy.hp > 0) {
    enemy.hp -= 10;
  } else {
    enemy.hp = 0;
  }
}

function countHpIsZero(){
  if(enemy.hp == 0){
    num += 1;
  }
}

//敵の攻撃
function enemyAttack(){
  for(let i=0; i<1; i++){
    if(i==0){
      player.hp-=enemy.attack;
    }
  }

}

//----setup/draw 他 ------------------------------------------------------

function preload(){
  img = loadImage('./勇者.png');
  img2 = loadImage('./緑の開いた本.png');
  img3 = loadImage('./草原.png');
  img4 = loadImage('./雷.png');
  soundFile = createAudio('おとぼけダンス.mp3');
}

function setup() {
  createCanvas(800, 600)
  image(img3, 0, 0, 800, 600); // 800 x 600 ピクセル
  textFont("VT323");
  rectMode(CENTER); //四角形の基準点を中心に変更
  background(220);

  resetGame();
  soundFile.loop();
}

function draw() {
  image(img3, 0, 0, 800, 600);
  updateGame();
  drawGame();
}

function mousePressed(){
  if(game_status == "select" && mouseX >= 80 && mouseX <= 280 && mouseY >= 460 && mouseY <=540){
    resetAttackPosition(micro_attack);
    game_status = "attack";
    updateHp();
    countHpIsZero();
    enemyAttack();
  }
  /*
  if(mouseX >= 300 && mouseX <= 500 && mouseY >= 460 && mouseY <=540){
    resetAttackPosition(database_attack);
    game_status = "attack";
    updateHp();
    countHpIsZero();
  }
  */
}

function changeBG(){
  let val = random(255);
  background(val);
}