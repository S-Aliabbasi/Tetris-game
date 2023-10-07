// This file include class and methods related to shape and color of pieces

const SCORE_WORTH = 10;
const gameRows = 30;
const gameCols = 15;

//###############################################

//###############################################

class Piece {
  constructor(ctx) {
    this.shape = shapes[this.RandomShape()];
    this.ctx = ctx;
    this.y = 0;
    this.x = Math.floor(gameCols / 2) - 1;
    this.color = null;
  }
  RandomShape() {
    let rand = Math.floor(Math.random() * 7);
    return rand;
  }
  renderPiece() {
    this.shape.map((row, i) => {
      row.map((item, j) => {
        if (item != 0) {
          this.color = colors[item];
          this.ctx.fillStyle = colors[item];
          this.ctx.fillRect(this.x + j, this.y + i, 1, 1);
        }
      });
    });
  }
}
//####################################################

const shapes = [
  [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0],
  ],
  [
    [4, 4, 0],
    [4, 4, 0],
    [0, 0, 0],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0],
  ],
];
const colors = [
  "black",
  "red",
  "green",
  "yellow",
  "pink",
  "purple",
  "blue",
  "silver",
];
