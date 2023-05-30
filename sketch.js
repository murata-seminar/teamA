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
function createEnemy(enemy_name, enemy_type){
  return {
    hp: 100,
    lv_s: 1,
    lv_i: 1,
    lv_h: 2,
    type: enemy_type,
    Name: enemy_name,
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
  // rectMode(RADIUS);
  fill(0);
  rect(button.x, button.y, button.w, button.h, 20);
  if(button == sound_button || button == title_button){
    textSize(20);
  } else {
    textSize(30);
  }
  fill(220);
  text(button.name, button.x, button.y);
}


// 攻撃エフェクトエンティティ
function createAttack(){
  return {
    x: player.x,
    y: player.y,
    vx: 5
  }
}

function drawAttack(entity){
  if(num <= 1 && game_status == "attack" && button_status != "nothing"){
    if(entity.x > enemy.x){
      updateHp();
      game_status = "set";
    } else if(entity.x <= enemy.x) {
      if(attacks == social_attack){
        image(img4, entity.x, entity.y, 50, 50);
      } else if(attacks == informatic_attack){
        image(img6, entity.x, entity.y, 50, 50);
      } else if(attacks == human_attack){
        image(img7, entity.x, entity.y, 50, 50);
      }
    }
  } else if (game_status == "set") {
    setTimeout(function(){ //1.5秒後にeAttack
      soundFile6.play(); //敵攻撃の音
      game_status = "eAttack";
    }, 1500);
    game_status = "standby" //ステータスをstandbyに
  }
  
  if(game_status == "standby"){
    image(img9, entity.x, entity.y, 50, 50);
    stroke(255);
    strokeWeight(3);
    textSize(36);
    text("-" + player_attack_power, entity.x, entity.y);
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



//敵の攻撃エフェクトエンティティ
function createEnemyAttack(){
  return {
    x: enemy.x,
    y: enemy.y,
    vx: 5
  }
}

//敵の攻撃エフェクトの描画
function drawEnemyAttack(entity){
  if(game_status == "eAttack"){
    if(entity.x <= player.x){
      game_status = "set2"
      updatePlayerHp();
      button_status = "nothing"; //よくわからないけど必要そうだから入れてます
    } else if(entity.x > player.x) {
      image(img8, entity.x, entity.y, 50, 50);
    }
  } else if(game_status == "set2"){
    setTimeout(function(){ //1.5秒後にselect
      game_status = "select"; 
    },1500);
    game_status = "standby2";
  }else if(game_status == "standby2"){
    image(img9, entity.x, entity.y, 50, 50);
    textSize(36);
    stroke(255);
    strokeWeight(3);
    text("-" + enemy_attack_power, entity.x, entity.y);
  }
}

//敵の攻撃エフェクトエンティティの位置の更新
function updateEnemyAttackPosition(entity){
  if(game_status == "eAttack"){
    entity.x -= entity.vx;
  }
}

//敵の攻撃エフェクトエンティティの位置の初期化
function resetEnemyAttackPosition(entity){
  entity.x = enemy.x;
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
let human_button;

//タイトル画面のスタートボタン
let start_button;

//タイトル画面のやり方ボタン
let howtoplay_button;

//ゲーム中のタイトルに戻るボタン
let title_button;

/**画像 */
let img; // 勇者
let img2; // 緑の開いた本
let img3; // 草原
let img4; // 雷
let img5; // muramon
let img6; //火
let img7; //氷
let img8; //敵攻撃

/**音 */
let soundFile; // おとぼけダンス.mp3
let soundFile2; //選択音.mp3
let soundFile3;//炎の音.mp3
let soundFile4;//雷の音.mp3
let soundFile5;//氷の音.mp3
let soundFile6;//敵の音.mp3


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
let enemy_attack;

// ゲーム状態
let game_status;
/**
 * 今のところ"title"（タイトル画面）か "select"(選択中) か 
 * "attack" (プレイヤーの攻撃中) か "eAttack"(エネミーの攻撃中) か
 * "gameover"(プレイヤーが死んだ) か "clear"(エネミーを倒した) が入る
 */


// マウスが押された回数
let num;

// 敵のタイプ
let enemy_type;

// 敵の名前
let enemy_name;

// プレイヤーの敵へのダメージ量
let player_attack_power;

// 敵のプレイヤーへのダメージ量
let enemy_attack_power;

// updateGame()内の敵の攻撃力更新に使う変数
let flag;

// 再生ボタン
let sound_button;

// 再生ボタンの状態
let sound_button_status;

// タイプのリスト
const types = ["Social", "Informatic", "Human"];

// タイプごとの敵の名前リスト
const social_enemy_names =  ["micro economics", "securities market", "economic mathmatics"];
const informatic_enemy_names =  ["basic database", "basic programming", "software engineering"];
const human_enemy_names = ["cognitive psycology", "media theory", "workshop design"];




/**タイトル画面の描画 */
function drawTitleScreen(){
  textSize(100);
  fill(0);
  image(img5, width / 2 -250, height / 2 - 150, 500, 200);

  //スタートボタンの描画
  drawButton(start_button);

  //howtoplayボタンの描画
  drawButton(howtoplay_button);

  //再生ボタンの描画
  drawButton(sound_button);
}

/**使い方の画面の描画 */
function drawHowtoplayScreen(){
  background(0, 192); //透明度 192 の黒
  fill(255);
  textSize(100);
  textAlign(CENTER, CENTER); //横に中央ぞろえ & 縦に中央揃え
  text('How to play', width / 2, 100);
  textSize(25);
  text('社会情報学部の科目が敵で出てきます。', width / 2 , height /2 - 50);
  text('社会、情報、人間のいずれかの攻撃を使って相手を倒そう！', width / 2, height /2 + 25);
  text('敵のエリアと自分の攻撃の属性が一致してると倒しやすいかも、、、', width / 2, height /2 + 100);
  drawButton(return_button);
}

/** ゲームオーバー画面の描画 */
function drawGameoverScreen() {
  background(0, 192);  // 透明度 192 の黒
  fill(255);
  strokeWeight(5);
  stroke(0, 100, 250);
  textSize(64);
  text("You lose...", width / 2, height / 2);  // 画面中央にテキスト表示
  textSize(25);
  noStroke();
  text("Click to retry", width / 2, height / 2 + 100);  // 画面中央にテキスト表示
}

function drawClearScreen() {
  background(0, 192);  // 透明度 192 の黒
  fill(255);
  strokeWeight(5);
  stroke(0, 100, 250);
  textSize(64);
  text("You Win!", width / 2, height / 2);  // 画面中央にテキスト表示
  textSize(25);
  noStroke();
  text("Click to retry!", width / 2, height / 2 + 100);  // 画面中央にテキスト表示
}


/** ステータスの描画 */
function drawStatus(entity) {
  textSize(25);
  //fill(0);
  //text("HP:" + entity.hp, entity.x, 200);
  stroke(0);
  strokeWeight(2.5);
  fill(0);
  rect(entity.x, 230, 100, 15);
  rectMode(CORNER);
  let colorG;
  if(entity.hp > 65){
    colorG = 255;
  }else if(entity.hp > 40){
    colorG = 175;
  }else{
    colorG = 0;
  }
  fill(255, colorG, 0);
  rect(entity.x - 50,222.5, entity.hp, 15);
  rectMode(CENTER);
  noStroke();
  fill(0);
  text("HP:" + entity.hp, entity.x - 85, 230);
  text(entity.Name, entity.x, 200);
  text(entity.type, entity.x, 260); // ←デバッグ用　最終的には消す
  //text("社会Lv:" + entity.lv_s + " " + "情報Lv:" + entity.lv_i + " " + "人間Lv:" + entity.lv_h, entity.x, 210);


  // 以下、確認用
  /*text("社 " + social_attack.x + "  " + enemy.x, 200, 375);
  text("情 " + informatic_attack.x + "  " + enemy.x, 200, 400);
  text("人 " + human_attack.x + "  " + enemy.x, 200, 425);
  text("敵 " + enemy_attack.x + "  " + player.x, 200, 450);
  text(game_status, 400, 375);*/
  /* let minS;
  minS = social_button.y - (social_button.h / 2);
  let maxS;
  maxS = social_button.y + (social_button.h / 2);
  let yhS;
  yhS = social_button.y + social_button.h;
  textSize(15);
  text(minS + " <= social <= " + maxS, social_button.x, yhS - 15);
  text("x: " + social_button.x + "  y: " + social_button.y, social_button.x, yhS + 5);
  text("w: " + social_button.w + "  h: " + social_button.h, social_button.x, yhS + 25);
  */
}

/** ウィンドウの描画 */
function drawWindow(){
  if(game_status == "attack" || game_status == "standby") { 
    if(button_status != "nothing"){
      textSize(30);
      fill(0);
      noStroke();
      text("Player's " + button_status + " attack!", 400, 50);
    } else {
      fill(0);
      noStroke();
      textSize(20);
      text("Select your attack", 400, 50);
    }
  } else if(game_status == "eAttack" || game_status == "standby2") {
    fill(0);
    noStroke();
    textSize(30);
    text("Enemy's attack!" /*"Player recieved " + enemy_attack_power + " damage!"*/, 400, 50);
  } else if (game_status == "select"){
    fill(0);
    noStroke();
    textSize(20);
    text("Select your attack", 400, 50);
  }
}

/** 音声を再生するための関数 */
function playSound(){
  if(sound_button_status == "on"){
    soundFile.play();
  } else {
    soundFile.stop();
  }
}

/** 敵の種類をランダム抽出 */
// (あとで)

/** ゲームの初期化 */
function resetGame(){
  // ゲーム状態の初期化
  //game_status = "title";
  game_status = "select";

  //flagの初期化
  flag = true;

  /*
  //ゲームの初期化時にタイトル画面も初期化する
  resetTitleScreen();
  */

  // プレイヤーの生成
  player = createPlayer();

  // エネミーのタイプの決定
  enemy_type = types[Math.floor(Math.random()*types.length)];

  // エネミーの名前の決定
  if(enemy_type === "Social") enemy_name = social_enemy_names[Math.floor(Math.random()*social_enemy_names.length)];
  if(enemy_type === "Informatic") enemy_name = informatic_enemy_names[Math.floor(Math.random()*informatic_enemy_names.length)];
  if(enemy_type === "Human") enemy_name = human_enemy_names[Math.floor(Math.random()*human_enemy_names.length)];

  // エネミーの生成 (enemy_name, enemy_typeは  //エネミーのタイプの決定 //エネミーの名前の決定  でランダムに決まる)
  enemy = createEnemy(enemy_name, enemy_type);

  // ボタンの生成
  social_button = createButtons("Social", 180, 500, 140, 60);
  informatic_button = createButtons("Informatic", 400, 500, 200, 60);
  human_button = createButtons("Human", 620, 500, 140, 60);

  return_button = createButtons("Return", width / 2 , height / 2 + 250 , 140, 60);
  start_button = createButtons("Start", width / 2 , height / 2 + 100, 140, 60);
  howtoplay_button = createButtons("How to play",  width / 2 , height / 2 + 200, 180, 60);
  title_button = createButtons("return to title", 150, 50, 140, 40); //タイトルに戻るボタン
  sound_button = createButtons("sound ON/OFF", 100, 550, 120, 50); // 再生ボタン

  // 社会攻撃エフェクトの生成
  social_attack = createAttack();

  // 情報攻撃エフェクトの生成
  informatic_attack = createAttack();

  // 人間攻撃エフェクトの生成
  human_attack = createAttack();

  // 敵の種類の用意
  enemy_attack = createEnemyAttack();
  // (あとで)

  //マウスが押された回数numの初期化
  num = 0;

}

/** ゲームの更新*/
function updateGame(){
  updateAttackPosition(social_attack);
  updateAttackPosition(informatic_attack);
  updateAttackPosition(human_attack);
  updateEnemyAttackPosition(enemy_attack);

  // eAttack状態になるたびに敵の攻撃量を1度だけ更新
  if(game_status == "eAttack") {
    if (flag) {
      enemy_attack_power = Math.floor(Math.random() * 15 + 1);
      flag = false;
    }
  }

  // standby2状態になったらflagをtrueに戻す
  if(game_status == "standby2") flag = true;

  // プレイヤーが死んでいたらゲームオーバー状態にする
  if (player.hp==0) game_status = "gameover";

  // エネミーが死んでいたらゲームオーバー状態にする
  if (enemy.hp==0) game_status = "clear";
}

/** ゲームの描画 */
function drawGame(){
  if(game_status === "title"){
    drawTitleScreen();
  } else if(game_status === "howtoplay"){
    drawHowtoplayScreen();
  } else if (game_status === "gameover"){
    drawGameoverScreen();
    return;
  } else if (game_status === "clear"){
    drawClearScreen();
    return;
  } else {
  drawplayer(player);
  drawEnemy(enemy);

  // ボタンの描画
  if(game_status == "select"){
  drawButton(social_button);  // 社会ボタン描画
  drawButton(informatic_button);  // 情報ボタン描画
  drawButton(human_button); // 人間ボタン描画
  drawButton(title_button); // タイトルボタン描画
  }

  // ステータスの描画
  drawStatus(player);
  drawStatus(enemy);

  // 攻撃エフェクトの描画
  drawAttack(social_attack); // 社会攻撃エフェクト描画
  drawAttack(informatic_attack); // 情報攻撃エフェクト描画
  drawAttack(human_attack);  // 人間攻撃エフェクト描画

  // エネミーの攻撃エフェクトの描画
  drawEnemyAttack(enemy_attack);
  //(あとで)

  // ウィンドウの描画
  drawWindow();
  }
}

// HPの更新
function updateHp(){
  if(enemy.hp > 0) {
    if(button_status == enemy.type){
      player_attack_power = Math.floor(Math.random()* 10 + 6);
    } else {
      player_attack_power = Math.floor(Math.random()* 4 + 1);
    }

    if(enemy.hp <= player_attack_power){
      enemy.hp = 0;
    } else {
      enemy.hp -= player_attack_power;
    }
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
  //enemy_attack_power = Math.floor(Math.random() * 15 + 1);
  //if(game_status == "eAttack"){
    for(let i=0; i<1; i++){
      if(i==0 && player.hp > 0){
        if(player.hp <= enemy_attack_power){
          player.hp = 0;
        } else {
          player.hp -= enemy_attack_power;
        }
      } else if (player.hp <= 0){
        player.hp == 0;
      }
    }
  //}
}

//----setup/draw 他 ------------------------------------------------------

function preload(){
  img = loadImage("勇者.png");
  img2 = loadImage("緑の開いた本.png");
  img3 = loadImage("草原.png");
  img4 = loadImage("雷.png");
  img5 = loadImage("muramon.png");
  img6 = loadImage("火.png");
  img7 = loadImage("氷.png");
  img8 = loadImage("敵攻撃.png");
  img9 = loadImage("bakuhatsu_01.png");
  soundFile = createAudio("おとぼけダンス.mp3");
  soundFile2 = createAudio("選択音.mp3");
  soundFile3 = createAudio("炎攻撃.mp3");
  soundFile4 = createAudio("雷攻撃.mp3");
  soundFile5 = createAudio("氷攻撃.mp3");
  soundFile6 = createAudio("敵攻撃音.mp3");
}


function setup() {
  createCanvas(800, 600)
  image(img3, 0, 0, 800, 600); // 800 x 600 ピクセル
  textFont("VT323");
  rectMode(CENTER); //四角形の基準点を中心に変更
  textAlign(CENTER, CENTER);
  background(220);

  game_status = "title";
  //soundFile.loop();
  
  resetGame();
  game_status = "title";

  // 再生ボタン状態の初期化
  sound_button_status = "off";
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
    resetAttackPosition(human_attack);
    resetEnemyAttackPosition(enemy_attack);
    
    if(
      mouseY >= 500 - (30 / 2) &&
      mouseY <= 500 + (30 / 2)){
        if(
        mouseX >= social_button.x - (social_button.w / 2) && mouseX <= social_button.x + (social_button.w / 2) 
        ){
          // 社会ボタンが押されたら
          button_status = "Social";
          attacks = social_attack;
          //updateHp();
          if(enemy.hp != 0) soundFile4.play();  //雷の音
        } else if( 
        mouseX >= informatic_button.x - (informatic_button.w / 2) && mouseX <= informatic_button.x + (informatic_button.w / 2)
        ){
          // 情報ボタンが押されたら
          button_status = "Informatic";
          attacks = informatic_attack;
          //updateHp();
          if(enemy.hp != 0) soundFile3.play();  //炎の音
        } else if(
          mouseX >= human_button.x - (human_button.w / 2) && mouseX <= human_button.x + (human_button.w / 2)
        ){
          // 人間ボタンが押されたら
          button_status = "Human";
          attacks = human_attack;
          //updateHp();
          if(enemy.hp != 0) soundFile5.play();  //選択音
        } else {
          button_status = "nothing";
        }
      game_status = "attack";
      countHpIsZero();
    }
  }

  if (game_status === "title") {
    if(
      mouseX >= start_button.x - (start_button.w / 2) &&
      mouseX <= start_button.x + (start_button.w / 2) &&
      mouseY >= start_button.y - (start_button.h / 2) &&
      mouseY <= start_button.y + (start_button.h / 2)
    ){
      // スタートボタンが押されたら
      game_status = "select";
      //選択音
      soundFile2.play();
    }
    if(
      mouseX >= howtoplay_button.x - (howtoplay_button.w / 2) &&
      mouseX <= howtoplay_button.x + (howtoplay_button.w / 2) &&
      mouseY >= howtoplay_button.y - (howtoplay_button.h / 2) &&
      mouseY <= howtoplay_button.y + (howtoplay_button.h / 2)
    ){
      // 使い方が押されたら
      game_status = "howtoplay";
      //選択音
      soundFile2.play();  
    }
    if(
      // 再生ボタンが押されたら
      mouseX >= sound_button.x - (sound_button.w / 2) &&
      mouseX <= sound_button.x + (sound_button.w / 2) &&
      mouseY >= sound_button.y - (sound_button.h / 2) &&
      mouseY <= sound_button.y + (sound_button.h / 2)
    ){
      if (sound_button_status == "off"){
        sound_button_status = "on";
      } else {
        sound_button_status = "off";
      }
      playSound();
    }
  }
  if (game_status === "howtoplay") {
    if(
      mouseX >= return_button.x - (return_button.w / 2) &&
      mouseX <= return_button.x + (return_button.w / 2) &&
      mouseY >= return_button.y - (return_button.h / 2) &&
      mouseY <= return_button.y + (return_button.h / 2)
    ){
      //選択音
      soundFile2.play(); 
      resetGame();
      game_status = "title";
    }
  }
  if (game_status === "select") {
    if(
      mouseX >= title_button.x - (title_button.w / 2) &&
      mouseX <= title_button.x + (title_button.w / 2) &&
      mouseY >= title_button.y - (title_button.h / 2) &&
      mouseY <= title_button.y + (title_button.h / 2)
    ){
      //選択音
      soundFile2.play(); 
      resetGame();
      game_status = "title";
    }
  }

  if(game_status == "gameover"){
    // ゲームオーバー状態ならリセット
    resetGame();
  }
  if(game_status == "clear"){
    // ゲームオーバー状態ならリセット
    resetGame();
  }
}