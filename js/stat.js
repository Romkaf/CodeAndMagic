'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HIGHT = 200;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_HEIGHT = 20;
var barWidth = 250;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HIGHT);
}

var findMaxElement = function(arr) {
  var maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
 
  ctx.fillStyle = '#000';
  ctx.font = '16px  PT Mono ';
  ctx.fillText('Ура вы победили!', 100 + 20, 40);
  ctx.fillText('Список результатов:', 100 + 20, 60);
 
  // var players = ['Вы', 'Юля', 'Кекс', 'Roma'];
  // var times = [1000, 2000, 3000, 2500];
  var maxTime = findMaxElement(times);
  
  // Если массив players больше, чем массив times, то удаляем лишние эл-ты
  if (players.length > times.length) {
    for (let i = times.length; i < players.length; i++) {
      players[i] ='';
    }
  }
  // Проверка наличия эл-ов в массивах
  if (players[0] && times[0]) {
    // Отрисовка гистограммы с результатами игры
    for (let i = 0; i < players.length; i++) {
      ctx.fillText(players[i], CLOUD_X + 2*GAP, 60 + CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
      // var rand = Math.round((Math.random()*100)) ;
      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        let randPercentSaturation = Math.round((Math.random()*100)) + '%' ;
        ctx.fillStyle = 'hsl(240, ' + randPercentSaturation + ', 50%)';
      }
      ctx.fillRect(CLOUD_X + 2*GAP + TEXT_WIDTH, 60 + CLOUD_Y + GAP + (GAP + BAR_HEIGHT) * i, (barWidth * times[i]) / maxTime, BAR_HEIGHT);
      ctx.fillStyle = '#000';
      ctx.fillText(Math.round(times[i]), CLOUD_X + 2*GAP + (barWidth * times[i]) / maxTime +60, 60 + CLOUD_Y + GAP + FONT_GAP + (GAP + BAR_HEIGHT) * i);
    }
  } else {
    ctx.fillText('Нет данных об игре!' ,250,150);
  }  
};
