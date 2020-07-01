Vue.component('cell', {
  props: {
    value: String
  },
  template: `<div @click="$emit('click')" class="cell" >
    <span v-if="value !== ''"> {{ value }} </span>
  </div>`
})

var vm = new Vue({
  el: "#app",
  data: {
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    myPlayer: true,
    movesLeft: 9,
  },
  methods: {
    move: function(i, j) {
      if (this.board[i][j] !== '') {
        alert('moviment no valid');
        return;
      }

      this.myPlayer ? this.board[i][j] = 'O' : this.board[i][j] = 'X'
      this.$forceUpdate();
      this.myPlayer ? this.myPlayer = false : this.myPlayer = true;
      this.movesLeft--;

      if (this.playerHas3InARow('X')) {
        alert("Player X win");
        this.gameOver();
      }

      if (this.playerHas3InARow('O')) {
        alert("Player O win");
        this.gameOver();
      }

      if (this.movesLeft === 0) {
        alert("DRAW");
        this.gameOver();
      }

    },
    playerHas3InARow: function(player) {
      // Horizontal rows
      for (let i = 0; i < 3; i++) {
        if (this.board[0][i] === player && this.board[1][i] === player && this.board[2][i] === player) {
          return true;
        }
      }

      // Vertical rows
      for (let i = 0; i < 3; i++) {
        if (this.board[i][0] === player && this.board[i][1] === player && this.board[i][2] === player) {
          return true;
        }
      }

      // Diagonals
      if (this.board[0][0] === player && this.board[1][1] === player && this.board[2][2] === player) {
        return true;
      }
      if (this.board[2][0] === player && this.board[1][1] === player && this.board[0][2] === player) {
        return true;
      }

      return false;
    },
    gameOver: function () {
      if (this.movesLeft === 0 || this.playerHas3InARow('X') || this.playerHas3InARow('O')){
        return location.reload();
      }
    },

  },
  template: `<div class="board">

  <div v-for="(n, i) in 3">
    <div v-for="(n, j) in 3">
      <cell @click="move(i, j)" :value="board[i][j]"></cell>
    </div>
  </div>
  <span class="info"> Turno: {{ this.myPlayer === true ? 'Player O' : 'Player X' }} </span>
  </div>`,
});
