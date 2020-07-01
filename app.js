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
    ]
  },
  myPlayer: true,
  methods: {
    move: function(i, j) {
      if (this.board[i][j] !== '') {
        alert('moviment no valid');
        return;
      }

      this.myPlayer ? this.board[i][j] = 'O' : this.board[i][j] = 'X'
      this.$forceUpdate();
      this.myPlayer ? this.myPlayer = false : this.myPlayer = true;

      if (this.playerHas3InARow('X')) {
        alert("Player X win")
      }

      if (this.playerHas3InARow('O')) {
        alert("Player O win")
      }

    },
    playerHas3InARow(player) {
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
    }
  },
  template: `<div class="board">

  <div v-for="(n, i) in 3">
    <div v-for="(n, j) in 3">
      <cell @click="move(i, j)" :value="board[i][j]"></cell>
    </div>
  </div>
  <span class="info"> Turno: {{ this.myPlayer === true ? 'Player Y' : 'Player X' }} </span>
  </div>`,
});
