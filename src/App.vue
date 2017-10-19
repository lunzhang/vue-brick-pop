<template>
  <div id="app">
    <div v-for="(row, rowNum) in board">
      <div v-for="(color, colNum) in row" v-on:click="pop(rowNum, colNum)"
      class="brick" v-bind:style="{ backgroundColor: colors[color]}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      board: [[], [], [], [], [], [], [], [], [], []],
      // white red blue yellow green purple grey
      colors: ['#ffffff', '#FFCDD2', '#C5CAE9', '#FFF9C4', '#C8E6C9', '#D1C4E9', '#F5F5F5'],
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
          this.board[i][j] = this.currentColors[color];
        }
      }
      console.log(this.board);
    },
    pop(rowNum, colNum) {
      if (this.board[rowNum][colNum] !== 0) {
        const initColor = this.board[rowNum][colNum];
        this.poppedRange.minVert = rowNum;
        this.poppedRange.maxVert = rowNum;
        this.poppedRange.minHorz = colNum;
        this.poppedRange.maxHorz = colNum;
        this.traversePop(rowNum, colNum, initColor);
        this.tidyBoard();
      }
    },
    traversePop(rowNum, colNum, initColor) {
      // replace popped brick with 0
      this.board[rowNum].splice(colNum, 1, 0);

      // get top, bottom, right, left, bricks
      const top = this.board[rowNum + 1] ? this.board[rowNum + 1][colNum] : null;
      const bottom = this.board[rowNum - 1] ? this.board[rowNum - 1][colNum] : null;
      const right = this.board[rowNum][colNum + 1] ? this.board[rowNum][colNum + 1] : null;
      const left = this.board[rowNum][colNum - 1] ? this.board[rowNum][colNum - 1] : null;

      // recursive pop same color bricks
      if (top === initColor) this.traversePop(rowNum + 1, colNum, initColor);
      if (bottom === initColor) this.traversePop(rowNum - 1, colNum, initColor);
      if (right === initColor) this.traversePop(rowNum, colNum + 1, initColor);
      if (left === initColor) this.traversePop(rowNum, colNum - 1, initColor);

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
