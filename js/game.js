const numDivs = 36;
const maxHits = 10;

let hits = 0;
let hitsErr = 0;
let firstHitTime = 0;

function round() {
  // targetDiv = $(".target");
  // targetDiv.text("");
  // targetDiv.removeClass("target");
  $(".target").text(""); // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass("target"); // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  // console.log(divSelector);
  $(divSelector).addClass("target");
  
  $(divSelector).text("" + (hits +1)); // TODO: помечать target текущим номером
  
  if (hits === 0) { // FIXME: тут надо определять при первом клике firstHitTime
    firstHitTime = getTimestamp();
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".col").hide(); // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#err-hint-played").text(hitsErr);
  $("#hint-integr").text(""+(10-hitsErr));
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if ($(event.target).hasClass("target")) { // FIXME: убирать текст со старых таргетов. Кажется есть .text?
    hits = hits + 1;
    $(".miss").removeClass("miss");
    round();
  }
  else { // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
    $(event.target).addClass("miss");
    hitsErr += 1;
  }
}

function init() {
  $(".col").hide(); // FIXME: спрятать игровое поле сначала
  
  $("#button-start-game").click(function() { // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
    round();
    $(".col").show();
    $("#button-start-game").hide();
  });

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
