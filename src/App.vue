<template>
  <div id="app">
    <div id="board">
      <div v-for="(row, rowNum) in board">
          <div v-for="(brick, colNum) in row" v-on:click="pop(rowNum, colNum)" class="brick"
          v-bind:style="{ backgroundColor: brick.color}">
          </div>
      </div>
    </div>
    <div id="options">
      <div>
        High Score: <span>{{ highScore }}</span>
      </div>
      <div id="score">
        Score: <span>{{ score }}</span>
      </div>
      <div id="reset-btn" v-on:click="onReset">
        Reset
      </div>
    </div>
  </div>
</template>

<script>
  // white red blue yellow green purple grey
  const colors = ['#ffffff', '#FFCDD2', '#C5CAE9', '#FFF9C4', '#C8E6C9', '#D1C4E9'];
  const blankBrick = { type: 0, color: colors[0] };
  const localStorageKey = 'vbp-high-score';
  let poppedBricks = 0;

  export default {
    name: 'app',
    data() {
      return {
        board: [[], [], [], [], [], [], [], [], [], []],
        currentColors: [1, 2, 3],
        poppedRange: {},
        highScore: localStorage.getItem(localStorageKey) || 0,
        score: 0,
      };
    },
    created() {
      this.initBoard();
    },
    methods: {
      initBoard() {
        // initialize 10 x 10 board with bricks -> {type: int, color: string}
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 10; j++) {
            const color = Math.floor(Math.random() * this.currentColors.length);
            this.board[i].splice(j, 1, {
              type: this.currentColors[color],
              color: colors[this.currentColors[color]],
            });
          }
        }
      },
      pop(rowNum, colNum) {
        const top = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum].type : null;
        const bottom = this.board[rowNum + 1] ? this.board[rowNum + 1][colNum].type : null;
        const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1].type : null;
        const left = this.board[rowNum][colNum - 1] ? this.board[rowNum][colNum - 1].type : null;
        const brickType = this.board[rowNum][colNum].type;

        // only allow pop if brick isn't popped and theres a matching brick near selected brick
        if (brickType !== 0 && (brickType === top || brickType === bottom
          || brickType === right || brickType === left)) {
          // reset params for computation
          poppedBricks = 0;
          this.poppedRange = {};
          this.poppedRange[colNum] = rowNum;

          this.traversePop(rowNum, colNum, brickType);
          this.dropBricks();
          this.slideBricks();

          this.score += (poppedBricks * poppedBricks);

          // new high score
          if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem(localStorageKey, this.highScore);
          }

          this.checkStatus();
        }
      },
      /*
      * Recursively pop same type bricks from top, bottom, right, left
      * Only recursively call when surronding brick exist & brick is same type as popped brick
      */
      traversePop(rowNum, colNum, initType) {
        // replace popped brick with blank brick
        this.board[rowNum].splice(colNum, 1, Object.assign({}, blankBrick));

        // increment popped brick count
        poppedBricks += 1;

        const top = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum].type : null;
        if (top === initType) this.traversePop(rowNum - 1, colNum, initType);

        const bottom = this.board[rowNum + 1] ? this.board[rowNum + 1][colNum].type : null;
        if (bottom === initType) this.traversePop(rowNum + 1, colNum, initType);

        const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1].type : null;
        if (right === initType) this.traversePop(rowNum, colNum + 1, initType);

        const left = this.board[rowNum][colNum - 1] ? this.board[rowNum][colNum - 1].type : null;
        if (left === initType) this.traversePop(rowNum, colNum - 1, initType);

        // new column was popped
        if (this.poppedRange[colNum] === undefined) {
          this.poppedRange[colNum] = rowNum;
        } else if (this.poppedRange[colNum] !== undefined && this.poppedRange[colNum] < rowNum) {
          // replaces current range if the popped row was below
          this.poppedRange[colNum] = rowNum;
        }
      },
      // recursively moves bricks down if space below is empty
      dropBricks() {
        /*
        * To avoid whole board loop
        * Loop only through the column of popped range
        * Loop only through the rows above the last row of the columns in the popped range
        */
        Object.keys(this.poppedRange).forEach((colNum) => {
          // loop through bricks in range above popped row
          for (let rowNum = this.poppedRange[colNum] - 1; rowNum >= 0; rowNum--) {
            // if it's not blank brick and below is blank brick
            if (this.board[rowNum][colNum].type !== 0 && this.board[rowNum + 1] !== undefined
              && this.board[rowNum + 1][colNum].type === 0) {
              // move brick down one column
              this.board[rowNum + 1].splice(colNum, 1, this.board[rowNum][colNum]);
              this.board[rowNum].splice(colNum, 1, Object.assign({}, blankBrick));
              this.dropBricks();
            }
          }
        });
      },
      // recursively slide bricks left if column is empty
      slideBricks() {
        /*
        * Start loop at the right most column popped range
        * If column is empty, shift all bricks on the right of the column, 1 space to the left
        */
        Object.keys(this.poppedRange).reverse().forEach((key) => {
          const colNum = parseInt(key, 10);

          // last brick in column is empty so column is empty
          if (this.board[9][colNum].type === 0) {
            // from the empty column to all the columns to the right
            for (let i = colNum; i < this.board[9].length - 1; i++) {
              const col = [];
              // get the column
              for (let j = 0; j < this.board.length; j++) {
                col.push(this.board[j][i + 1]);
              }
              // shift column 1 space to the left
              for (let k = 0; k < this.board.length; k++) {
                this.board[k].splice(i, 1, col[k]);
                this.board[k].splice(i + 1, 1, Object.assign({}, blankBrick));
              }
            }
          }
        });
      },
      onReset() {
        this.initBoard();
        this.score = 0;
      },
      // checks win / lose conditions
      checkStatus() {
        // winning condition - brick on last row first column is empty
        if (this.board[9][0].type === 0) {
          // add new color if possible
          if (this.currentColors.length < colors.length - 1) {
            this.currentColors.push(this.currentColors.length + 1);
          }
          this.initBoard();
          return true;
        }

        // reset game on loss
        if (this.checkLoss(9, 0)) {
          this.onReset();
        }

        return false;
      },
      /*
      * Recursively checks if game is lost  -> when no bricks have neighbors of same type
      * Start the algorithm at the bottom left of the board
      * Check if top or right brick is of same type
      * Repeat call on top and right brick
      */
      checkLoss(rowNum, colNum) {
        const brickType = this.board[rowNum][colNum].type;
        // base statement - empty brick
        if (brickType === 0) {
          return true;
        }

        const top = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum].type : null;
        const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1].type : null;
        let topCheck = true;
        let rightCheck = true;

        // if top or right brick is same type -> game isn't lost
        if (top === brickType || right === brickType) {
          return false;
        }

        /*
        * Recursively check top and right brick
        * if game is found to be still playable, return to prevent any further calls
        */
        if (top !== null) topCheck = this.checkLoss(rowNum - 1, colNum);
        if (topCheck === false) return topCheck;

        if (right !== null) rightCheck = this.checkLoss(rowNum, colNum + 1);
        if (rightCheck === false) return rightCheck;

        return true;
      },
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }

  #app .brick {
    width: 25px;
    height: 25px;
    display: inline-block;
    margin: 1px;
    border-radius: 5px;
  }

  #board {
    display: inline-block;
  }

  #options {
    text-align: center;
    display: inline-block;
    padding: 20px;
  }

  #score {
    padding: 10px;
  }

  #reset-btn {
    padding: 10px 20px;
    background-color: #81C784;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
</style>
