class Game {
  constructor(ctx) {
    this.currentPiece = null;
    this.ctx = ctx;
    this.board = this.makeEmtyBoard();
    this.score = 0;
  }
  makeEmtyBoard() {
    let board = [];
    for (let i = 0; i < gameRows; i++) {
      board.push([]);
      for (let j = 0; j < gameCols; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  renderGameBoard() {
    let flag = 0;
    const scoreBoard = document.getElementById("scoreBoard");

    if (this.currentPiece === null) {
      this.currentPiece = new Piece(this.ctx);
    }
    console.log(this.currentPiece.y, this.currentPiece.x);
    this.board.map((row, i) => {
      flag = 0;
      row.forEach((cell, j) => {
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = "black";
        this.ctx.fillStyle = colors[cell];
        this.ctx.fillRect(j, i, 1, 1);
        if (cell == 0) {
          flag = 1;
        }
      });
      if (!flag) {
        this.score += SCORE_WORTH;
        scoreBoard.getElementsByTagName("spain")[0].innerHTML = this.score;
        this.board.splice(i, 1);
        this.board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
    });
  }
  gameBoardState() {
    this.currentPiece.shape.map((row, i) => {
      row.map((item, j) => {
        if (item != 0) {
          this.board[this.currentPiece.y + i][this.currentPiece.x + j] = item;
        }
      });
    });
  }
  collision(x, y) {
    const shape = this.currentPiece.shape;
    const n = shape.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (shape[i][j] > 0) {
          let p = x + j;
          let q = y + i;
          if (p >= 0 && p < gameCols && q < gameRows) {
            // in bounds
            if (this.board[q][p] > 0) {
              return true;
            }
          } else {
            if (q == gameRows) this.gameBoardState();
            return true;
          }
        }
      }
    }
    return false;
  }

  rotate() {
    if (this.currentPiece !== null) {
      let shape = [...this.currentPiece.shape.map((row) => [...row])];
      // transpose of matrix
      for (let y = 0; y < shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [shape[x][y], shape[y][x]] = [shape[y][x], shape[x][y]];
        }
      }
      // reverse order of rows
      shape.forEach((row) => row.reverse());
      if (!this.collision(this.currentPiece.x, this.currentPiece.y + 1)) {
        this.currentPiece.shape = shape;
      }
    }
    this.renderGameBoard();
  }

  moveSideways() {
    if (this.currentPiece === null) {
      return;
    }
    // No collision
    if (
      !this.collision(this.currentPiece.x + playerAction.x, this.currentPiece.y)
    ) {
      this.currentPiece.x += playerAction.x;
    }
    this.renderGameBoard();
    this.currentPiece.renderPiece();
    playerAction = { x: 0, y: 0, r: 0 };
  }
  movePieceDown() {
    this.renderGameBoard();
    // No collision
    if (!this.collision(this.currentPiece.x, this.currentPiece.y + 1)) {
      this.currentPiece.renderPiece();
      this.currentPiece.y += 1;
    }
    // have a collision
    else {
      // Checking gameover state
      if (this.currentPiece.y == 0) {
        alert("Gameover");
        this.board = this.makeEmtyBoard();

        return;
      }
      this.gameBoardState();
      this.renderGameBoard();
      this.currentPiece = null;
    }
  }
}
