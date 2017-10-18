<template>
  <div id="app">
    <div v-for="(row, rowNum) in board">
      <Cell v-for="(state, colNum) in row" :key="rowNum + ',' + colNum" :color="colors[state]"/>
    </div>
  </div>
</template>

<script>
import Cell from './components/Cell';

export default {
  name: 'app',
  data() {
    return {
      board: [[], [], [], [], [], [], [], [], [], []],
      // white red blue yellow green purple grey
      colors: ['#ffffff', '#FFCDD2', '#C5CAE9', '#FFF9C4', '#C8E6C9', '#D1C4E9', '#F5F5F5'],
      currentColors: [1, 2, 3],
    };
  },
  components: {
    Cell,
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
</style>
