const boardGame = document.getElementById("board");
const ctx = boardGame.getContext("2d");
console.log(ctx);
const game = new Game(ctx);
ctx.scale(20, 20);
let playerAction = { x: 0, y: 0, r: 0 };

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowDown":
      playerAction.y += 1;
      game.movePieceDown();
      break;
    case "ArrowLeft":
      playerAction.x = -1;
      game.moveSideways(playerAction.x);
      break;
    case "ArrowRight":
      playerAction.x = 1;
      game.moveSideways(playerAction.x);

      break;
    case " ":
      game.rotate();
      game.movePieceDown();
      break;
  }
  return;
});

setInterval(() => {
  game.movePieceDown();
}, 1000);
