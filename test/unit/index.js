import Vue from 'vue';
import App from '../../src/App.vue';
import Boards from './boards.js';

// local storage mock
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const cmp = Vue.extend(App);
const app = new cmp().$mount();
const colors = ['#ffffff', '#FFCDD2', '#C5CAE9', '#FFF9C4', '#C8E6C9', '#D1C4E9'];

test('App exist', () => {
  expect(app).not.toBe(undefined);
});

test('Board initalized', () => {
    // check 10 rows
    expect(app.board).toHaveLength(10);

    // check 10 columns
    for (let i = 0; i < app.board.length; i++) {
      let row = app.board[i];
      expect(row).toHaveLength(10);
    }
});

test('Board popping', () => {
  // pop with dropping bricks
  app.board = convertBoard(Boards.board1);
  app.pop(9, 2);
  expect(app.board).toEqual(convertBoard(Boards.board2));
  // pop with dropping bricks and sliding bricks
  app.board = convertBoard(Boards.board3);
  app.pop(9, 3);
  expect(app.board).toEqual(convertBoard(Boards.board4));
});

test('win', () => {
  // empty board = win
  app.board = emptyBoard();
  expect(app.checkStatus()).toBe(true);
});

test('lose', () => {
  // one brick board = lose
  app.board = emptyBoard();
  app.board[9][0] = {type:1, color: colors[1]};
  expect(app.checkStatus()).toBe(true);
});

const convertBoard = function(board) {
  const newBoard = [];

  for (let i = 0; i < board.length; i++) {
    newBoard.push([]);
    let row = board[i];
    for (let j = 0; j < row.length; j++) {
      newBoard[i].push({
        type: row[j],
        color: colors[row[j]],
      });
    }
  }

  return newBoard;
};

const emptyBoard = function() {
  const board = [];

  for (let i = 0; i < 10; i++) {
    board.push([]);
    for (let j = 0; j < 10; j++) {
      board[i].push({
        type: 0,
        color: colors[0],
      });
    }
  }

  return board;
};
