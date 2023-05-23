//----エンティティ関連の関数 ----------------------------------------------


// プレイヤーエンティティ
function createPlayer(){
  return {
    hp: 100,
    lv_s: 2,
    lv_i: 1,
    lv_h: 1,
    type: "Social",
    Name: "Player",
    attack: 10,
    diffence: 10,
    x: 200,
    y: 300
  }
}

function drawplayer(player){
  image(img, player.x - 40, player.y - 10, 80, 80);
}


// エネミーエンティティ
function createEnemy(){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 2,
    type: "Human",
    Name: "Social Economics",
    attack: 10,
    diffence: 10,
    x: 600,
    y: 300
  }
}

function drawEnemy(enemy){
  image(img2, enemy.x - 30, enemy.y - 10, 80, 80);
}


// ボタンエンティティ
function createButtons(button_name, button_x, button_y, button_w, button_h){
  return{
    name: button_name,
    x: button_x,
    y: button_y,
    w: button_w,
    h: button_h
  }
}

function drawButton(button){
  rectMode(RADIUS);
  fill(0);
  rect(button.x, button.y, button.w, button.h, 20);
  textSize(30);
  fill(220);
  text(button.name, button.x, button.y);
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
      // game_status = "gameover";
    } else if(entity.x <= enemy.x) {
      if(attacks == social_attack){
        image(img4, entity.x, entity.y, 50, 50);
      } else if(attacks == informatic_attack){
        image(img4, entity.x, entity.y, 75, 75);
      }
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
// 社会ボタン
let social_button;
// 情報ボタン
let informatic_button;
// 人間ボタン
// let human_button;

//タイトル画面のスタートボタン
let start_button;


/**画像 */
let img; // 勇者
let img2; // 緑の開いた本
let img3; // 草原
let img4; // 雷
let img5; // muramon


/**音 */
let soundFile; // おとぼけダンス.mp3


// ボタンのステータス
let button_status;
// "Social","Informatic","Human"などが入り、攻撃エフェクトと関連している


/** 攻撃 */
// 攻撃エフェクト
let attacks;
// social_attack, informatic_attack, human_attack が入る

let social_attack; // 社会攻撃エフェクト
let informatic_attack; // 情報攻撃エフェクト
let human_attack; // 人間攻撃エフェクト


// ゲーム状態
let game_status;
/**
 * 今のところ"title"（タイトル画面）か "select"(選択中) か 
 * "attack" (プレイヤーの攻撃中) か "eAttack"(エネミーの攻撃中) か
 * "gameover"(プレイヤーが死んだ) か "clear"(エネミーを倒した) が入る
 */


// マウスが押された回数
let num;


/**タイトル画面の初期化 */
function resetTitleScreen(){
  start_button = createButtons("Start", width / 2 , height / 2 + 100, 70, 30);
}

/**タイトル画面の描画 */
function drawTitleScreen(){
  textSize(100);
  fill(0);
  image(img5, width / 2 -250, height / 2 - 150, 500, 200);

  //スタートボタンの描画
  drawButton(start_button);
}


/** ゲームオーバー画面の描画 */
/* function drawGameoverScreen() {
  background(0, 192);  // 透明度 192 の黒
  fill(255);
  strokeWeight(5);
  stroke(0, 100, 250);
  textSize(64);
  text("You lose...", width / 2, height / 2);  // 画面中央にテキスト表示
  textSize(25);
  noStroke();
  text("Click to retry", width / 2, height / 2 + 100);  // 画面中央にテキスト表示
}*/


/** ステータスの描画 */
function drawStatus(entity) {
  textSize(25);
  fill(0);
  text("HP:" + entity.hp, entity.x, 200);
  text(entity.Name, entity.x, 230);
  //text("社会Lv:" + entity.lv_s + " " + "情報Lv:" + entity.lv_i + " " + "人間Lv:" + entity.lv_h, entity.x, 210);


  // 以下、攻撃エフェクト確認用
  // text("社 " + social_attack.x + "  " + enemy.x, 200, 375);
  // text("情 " + informatic_attack.x + "  " + enemy.x, 200, 400);
  // text(game_status, 200, 425);
}

/** ウィンドウの描画 */
function drawWindow(){
  if(game_status == "attack") { 
    textSize(30);
    fill(0);
    text("Player's " + button_status + " attack!", 400, 50);
  } else if(game_status == "eAttack") {
    game_status = "eAttack";
    fill(0);
    noStroke();
    textSize(20);
    text("Enemy's attack! Player recieved " + enemy.attack + " damege!", 400, 50);
  } else if (game_status == "select"){
    fill(0);
    noStroke();
    textSize(20);
    text("Select your attack", 400, 50);
  }
}

/** ゲームの初期化 */
function resetGame(){
  // ゲーム状態の初期化
  game_status = "title";

  //ゲームの初期化時にタイトル画面も初期化する
  resetTitleScreen();

  // プレイヤーの生成
  player = createPlayer();

  // エネミーの生成
  enemy = createEnemy();

  // ボタンの生成
  social_button = createButtons("Social", 180, 500, 70, 30);
  informatic_button = createButtons("Informatic", 400, 500, 100, 30);

  // 社会攻撃エフェクトの生成
  social_attack = createAttack();

  // 情報攻撃エフェクトの生成
  informatic_attack = createAttack();

  //マウスが押された回数numの初期化
  num = 0;
}

/** ゲームの更新*/
function updateGame(){
  updateAttackPosition(social_attack);
  updateAttackPosition(informatic_attack);

  // プレイヤーのHPを減らす
  updatePlayerHp();

  // プレイヤーが死んでいたらゲームオーバー状態にする
  // if (player.hp==0) game_status = "gameover";
}

/** ゲームの描画 */
function drawGame(){
  if(game_status === "title"){
    drawTitleScreen();
  /* } else if (game_status === "gameover"){
    drawGameoverScreen();
    return; */
  } else {
  drawplayer(player);
  drawEnemy(enemy);

  // ボタンの描画
  drawButton(social_button);  // 社会ボタン描画
  drawButton(informatic_button);  // 情報ボタン描画

  // ステータスの描画
  drawStatus(player);
  drawStatus(enemy);

  // 攻撃エフェクトの描画
  drawAttack(social_attack); // 社会攻撃エフェクト描画
  drawAttack(informatic_attack); // 情報攻撃エフェクト描画

  // エネミーの攻撃エフェクトの描画
  //(あとで)

  // ウィンドウの描画
  drawWindow();
  }
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

// プレイヤーのHPの更新
function updatePlayerHp(){
  if(game_status == "eAttack"){
    for(let i=0; i<1; i++){
      if(i==0){
        player.hp-=enemy.attack;
      }
    }
  }
}

//----setup/draw 他 ------------------------------------------------------

function preload(){
  img = loadImage("./勇者.png");
  img2 = loadImage("./緑の開いた本.png");
  img3 = loadImage("./草原.png");
  img4 = loadImage("./雷.png");
  img5 = loadImage("./muramon.png");
  soundFile = createAudio("おとぼけダンス.mp3");
}

function setup() {
  createCanvas(800, 600)
  image(img3, 0, 0, 800, 600); // 800 x 600 ピクセル
  textFont("VT323");
  rectMode(CENTER); //四角形の基準点を中心に変更
  textAlign(CENTER, CENTER);
  background(220);

  game_status = "title";
  soundFile.loop();
  
  resetGame();
}

function draw() {
  image(img3, 0, 0, 800, 600);
  updateGame();
  drawGame();
}

function mousePressed(){
  if(game_status == "select"){
    resetAttackPosition(social_attack);
    resetAttackPosition(informatic_attack);
    //resetAttackPosition(human_attack);
    if(
      mouseY >= 500 - (30 / 2) &&
      mouseY <= 500 + (30 / 2)){
        if( // 社会ボタンが押されたら
        mouseX >= social_button.x - (social_button.w / 2) &&
        mouseX <= social_button.x + (social_button.w / 2) 
        ){
          button_status = "Social";
          attacks = social_attack;
        } else if( // 情報ボタンが押されたら
        mouseX >= informatic_button.x - (informatic_button.w / 2) &&
        mouseX <= informatic_button.x + (informatic_button.w / 2)
        ){
          button_status = "Informatic";
          attacks = informatic_attack;
        } 
      }

    game_status = "attack";
    updateHp();
    countHpIsZero();
  }

  if (game_status === "title") {
    if( // スタートボタンが押されたら
      mouseX >= start_button.x - (start_button.w / 2) &&
      mouseX <= start_button.x + (start_button.w / 2) &&
      mouseY >= start_button.y - (start_button.h / 2) &&
      mouseY <= start_button.y + (start_button.h / 2)
    ){
      game_status = "select";
      // 以降のゲームの進行コード...
    }
  }

  /* if(game_status == "gameover"){
    // ゲームオーバー状態ならリセット
    resetGame();
  } */
}