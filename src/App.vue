<template>
  <div id="app">
    <div v-for="(row, rowNum) in board">
      <div v-for="(brick, colNum) in row" v-on:click="pop(rowNum, colNum)"
      class="brick" v-bind:style="{ backgroundColor: brick.color}"/>
    </div>
  </div>
</template>

<script>
// white red blue yellow green purple grey
const colors = ['#ffffff', '#FFCDD2', '#C5CAE9', '#FFF9C4', '#C8E6C9', '#D1C4E9', '#F5F5F5'];
let poppedBricks = 0;

export default {
  name: 'app',
  data() {
    return {
      board: [[], [], [], [], [], [], [], [], [], []],
      score: 0,
      currentColors: [1, 2, 3],
      poppedRange: {},
    };
  },
  created() {
    this.initBoard();
  },
  methods: {
    initBoard() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const color = Math.floor(Math.random() * this.currentColors.length);
          this.board[i][j] = {
            type: this.currentColors[color],
            color: colors[this.currentColors[color]],
          };
        }
      }
      console.log(this.board);
    },
    pop(rowNum, colNum) {
      if (this.board[rowNum][colNum].type !== 0) {
        const initType = this.board[rowNum][colNum].type;
        poppedBricks = 0;
        this.poppedRange = {};
        this.poppedRange[colNum] = rowNum;
        this.traversePop(rowNum, colNum, initType);
        this.dropBricks();
        this.slideBricks();
        this.score += poppedBricks;
      }
    },
    // recursively pops bricks of the same type
    traversePop(rowNum, colNum, initType) {
      // replace popped brick with 0
      this.board[rowNum].splice(colNum, 1, { type: 0 });

      // increment popped brick count
      poppedBricks += 1;

      // recursive pop same color bricks from top, bottom, right, left
      const top = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum].type : null;
      if (top === initType) this.traversePop(rowNum - 1, colNum, initType);

      const bottom = this.board[rowNum + 1] ? this.board[rowNum + 1][colNum].type : null;
      if (bottom === initType) this.traversePop(rowNum + 1, colNum, initType);

      const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1].type : null;
      if (right === initType) this.traversePop(rowNum, colNum + 1, initType);

      const left = this.board[rowNum][colNum - 1] ? this.board[rowNum][colNum - 1].type : null;
      if (left === initType) this.traversePop(rowNum, colNum - 1, initType);

      // new row
      if (this.poppedRange[colNum] === undefined) {
        this.poppedRange[colNum] = rowNum;
      } else if (this.poppedRange[colNum] !== undefined && this.poppedRange[colNum] < rowNum) {
        this.poppedRange[colNum] = rowNum;
      }
    },
    // recursively moves bricks down if space is empty
    dropBricks() {
      Object.keys(this.poppedRange).forEach((colNum) => {
        for (let rowNum = this.poppedRange[colNum] - 1; rowNum >= 0; rowNum--) {
          if (this.board[rowNum][colNum].type !== 0 && this.board[rowNum + 1] !== undefined
            && this.board[rowNum + 1][colNum].type === 0) {
            this.board[rowNum + 1][colNum] = this.board[rowNum][colNum];
            this.board[rowNum][colNum] = { type: 0 };
            this.dropBricks();
          }
        }
      });
    },
    // recursively slide bricks left if empty
    slideBricks() {
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app .brick {
  width: 25px;
  height: 25px;
  display: inline-block;
  margin: 1px;
  border-radius: 5px;
}
</style>
