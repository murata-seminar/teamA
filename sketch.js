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
      button_status = button.name;
      ButtonIsPushed();
    }
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
  if(enemy.hp !== 0){
    if(game_status == "attack"){
      if(entity.x > enemy.x){
        game_status = "select";
      } else if(entity.x <= enemy.x) {
        if(attacks == micro_attack){
          square(entity.x, entity.y, 50);
        }
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
let micro_button;

// ボタンのステータス
let button_status;
// "ミクロ経済学"などが入り、攻撃エフェクトと関連している

// 攻撃エフェクト
let attacks;
// micro_attack などが入る
// 後々、攻撃が複数になった場合、攻撃名のリストになるかも？

// ミクロ経済学攻撃エフェクト
let micro_attack;

// ゲーム状態
let game_status;
//今のところ "attack" 攻撃中 か "select" 選択中 が入る


/** ステータスの描画 */
function drawStatus(entity) {
  textSize(20);
  textAlign(CENTER, CENTER);
  text('HP:' + entity.hp, entity.x, 150);
  text('タイプ:' + entity.type, entity.x, 170);
  text('社会Lv:' + entity.lv_s + ' ' + '情報Lv:' + entity.lv_i + ' ' + '人間Lv:' + entity.lv_h, entity.x, 210);

  text(micro_attack.x + "  " + enemy.x, 200, 400);
  text(game_status, 200, 425);
}

/** ゲームの初期化 */
function resetGame(){
  // プレイヤーの生成
  player = createPlayer();

  // エネミーの生成
  enemy = createEnemy();

  // ボタンの生成
  micro_button = createButtons("ミクロ経済学", 180, 500);

  // ミクロ経済学攻撃エフェクトの生成
  micro_attack = createAttack();

  // ゲーム状態の初期化
  game_status = "select";
}

/** ゲームの更新*/
function updateGame(){
  updateAttackPosition(micro_attack);
}

/** ゲームの描画 */
function drawGame(){
  drawplayer(player);
  drawEnemy(enemy);

// ボタンの描画
  drawButton(micro_button);

// ステータスの描画
  drawStatus(player);
  drawStatus(enemy);

// 攻撃エフェクトの描画
  drawAttack(micro_attack);
}

/** ボタンが押されたら */
function ButtonIsPushed(){
  if(button_status == "ミクロ経済学"){
    attacks = micro_attack;
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

//----setup/draw 他 ------------------------------------------------------

function setup() {
  createCanvas(800, 600); // 800 x 600 ピクセル
  rectMode(CENTER); //四角形の基準点を中心に変更
  background(220);

  resetGame();
}

function draw() {
  background(220);
  drawGame();

  updateGame();
}

function mousePressed(){
  if(mouseX >= 80 && mouseX <= 280 && mouseY >= 460 && mouseY <=540){
    resetAttackPosition(micro_attack);
    game_status = "attack";
    updateHp();
  }
}

function changeBG(){
  let val = random(255);
  background(val);
}