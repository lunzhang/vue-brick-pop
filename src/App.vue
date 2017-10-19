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

export default {
  name: 'app',
  data() {
    return {
      board: [[], [], [], [], [], [], [], [], [], []],
      currentColors: [1, 2, 3],
      poppedRange: {
        minVert: 0,
        maxVert: 0,
        minHorz: 0,
        maxHorz: 0,
      },
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
        this.poppedRange.minVert = rowNum;
        this.poppedRange.maxVert = rowNum;
        this.poppedRange.minHorz = colNum;
        this.poppedRange.maxHorz = colNum;
        this.traversePop(rowNum, colNum, initType);
        this.tidyBoard();
      }
    },
    traversePop(rowNum, colNum, initType) {
      // replace popped brick with 0
      this.board[rowNum].splice(colNum, 1, 0);

      // get top, bottom, right, left, bricks
      const top = this.board[rowNum + 1] ? this.board[rowNum + 1][colNum].type : null;
      const bottom = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum].type : null;
      const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1].type : null;
      const left = this.board[rowNum][colNum - 1] ? this.board[rowNum][colNum - 1].type : null;

      // recursive pop same color bricks
      if (top === initType) this.traversePop(rowNum + 1, colNum, initType);
      if (bottom === initType) this.traversePop(rowNum - 1, colNum, initType);
      if (right === initType) this.traversePop(rowNum, colNum + 1, initType);
      if (left === initType) this.traversePop(rowNum, colNum - 1, initType);

      if (rowNum > this.poppedRange.maxVert) this.poppedRange.maxVert = rowNum;
      if (rowNum < this.poppedRange.minVert) this.poppedRange.minVert = rowNum;
      if (colNum > this.poppedRange.maxHorz) this.poppedRange.maxHorz = colNum;
      if (colNum < this.poppedRange.minHorz) this.poppedRange.minHorz = colNum;
    },
    tidyBoard() {
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
