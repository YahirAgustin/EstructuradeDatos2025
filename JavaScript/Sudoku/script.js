// script.js

const LEVELS = 25;
const GROUPS = ["Muy fácil", "Fácil", "Medio", "Difícil", "Muy difícil"];
const LEVELS_PER_GROUP = 5;
const emptiesByDifficulty = [36, 41, 46, 51, 56];

let playerName = null;
let currentLevel = 0;
let lives = 3;
let mistakes = 0;
let timerInterval = null;
let startTime = null;
let puzzles = [];
let boardState = new Array(81).fill(0);
let fixed = new Array(81).fill(false);

function askName() {
  let name = localStorage.getItem('sudoku_player') || '';
  name = prompt('Ingresa tu nombre para el ranking:', name || 'Jugador');
  if (!name) name = 'Jugador';
  playerName = name;
  localStorage.setItem('sudoku_player', playerName);
  document.getElementById('player-name').textContent = playerName;
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function isSafe(board, pos, val) {
  const r = Math.floor(pos / 9);
  const c = pos % 9;
  for (let i = 0; i < 9; i++) {
    if (board[r * 9 + i] === val) return false;
    if (board[i * 9 + c] === val) return false;
  }
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let dr = 0; dr < 3; dr++) {
    for (let dc = 0; dc < 3; dc++) {
      if (board[(br + dr) * 9 + (bc + dc)] === val) return false;
    }
  }
  return true;
}

function fillBoard(board) {
  for (let pos = 0; pos < 81; pos++) {
    if (board[pos] === 0) {
      let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shuffle(nums);
      for (let num of nums) {
        if (isSafe(board, pos, num)) {
          board[pos] = num;
          if (fillBoard(board)) return true;
          board[pos] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

function generateFullSolution() {
  const board = new Array(81).fill(0);
  fillBoard(board);
  return board;
}

function makePuzzleFromSolution(solution, empties) {
  const puzzle = solution.slice();
  const indices = [...Array(81).keys()];
  shuffle(indices);
  let removed = 0;
  for (let idx of indices) {
    if (removed >= empties) break;
    puzzle[idx] = 0;
    removed++;
  }
  return puzzle;
}

function generateAllPuzzles() {
  puzzles = [];
  for (let d = 0; d < 5; d++) {
    for (let i = 0; i < LEVELS_PER_GROUP; i++) {
      const sol = generateFullSolution();
      const empties = emptiesByDifficulty[d];
      const puzz = makePuzzleFromSolution(sol, empties);
      puzzles.push({ puzzle: puzz, solution: sol, difficultyIndex: d });
    }
  }
}

const boardEl = document.getElementById('board');

function createGrid() {
  boardEl.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const idx = r * 9 + c;
      const cell = document.createElement('div');
      cell.className = 'cell';
      if (c === 2) cell.classList.add('col-3');
      if (c === 5) cell.classList.add('col-6');
      if (r === 2) cell.classList.add('row-3');
      if (r === 5) cell.classList.add('row-6');
      const input = document.createElement('input');
      input.setAttribute('maxlength', '1');
      input.dataset.idx = idx;
      input.addEventListener('input', onInput);
      input.addEventListener('focus', () => selectCell(idx));
      cell.appendChild(input);
      boardEl.appendChild(cell);
    }
  }
}

function renderBoard() {
  const inputs = boardEl.querySelectorAll('input');
  inputs.forEach(inp => {
    const idx = +inp.dataset.idx;
    if (fixed[idx]) {
      inp.value = boardState[idx] || '';
      inp.disabled = true;
      inp.style.color = '#d1f5ff';
      inp.style.fontWeight = '700';
    } else {
      inp.disabled = false;
      inp.value = boardState[idx] || '';
      inp.style.color = 'var(--white)';
      inp.style.fontWeight = '400';
    }
  });
}

function startLevel(levelIndex) {
  currentLevel = levelIndex;
  document.getElementById('level-label').textContent = `${levelIndex + 1} — ${GROUPS[Math.floor(levelIndex / 5)]}`;
  document.getElementById('diff-tag').textContent = GROUPS[Math.floor(levelIndex / 5)];
  mistakes = 0;
  document.getElementById('lives').textContent = lives;
  document.getElementById('mistakes').textContent = mistakes;
  const { puzzle, solution } = puzzles[levelIndex];
  boardState = puzzle.slice();
  fixed = puzzle.map(v => v !== 0);
  renderBoard();
  resetTimer();
  startTimer();
  document.getElementById('next-btn').style.display = 'none';
}

function onInput(e) {
  const val = e.target.value.replace(/[^1-9]/g, '');
  e.target.value = val;
  const idx = +e.target.dataset.idx;
  if (val === '') {
    boardState[idx] = 0;
    return;
  }
  const num = +val;
  boardState[idx] = num;
  const sol = puzzles[currentLevel].solution[idx];
  if (num !== sol) {
    mistakes++;
    document.getElementById('mistakes').textContent = mistakes;
    lives--;
    document.getElementById('lives').textContent = lives;
    e.target.style.backgroundColor = 'rgba(255,0,0,0.12)';
    setTimeout(() => (e.target.style.backgroundColor = 'transparent'), 350);
    if (lives <= 0) {
      stopTimer();
      saveRanking(false);
      alert('Perdiste todas las vidas. Se guardó tu posición en el ranking. Reiniciando a 3 vidas.');
      lives = 3;
      document.getElementById('lives').textContent = lives;
      startLevel(currentLevel);
    }
  } else if (isBoardComplete()) {
    stopTimer();
    const zeroMistakes = mistakes === 0;
    if (zeroMistakes) {
      lives = Math.min(3, lives + 1);
      document.getElementById('lives').textContent = lives;
      alert('Nivel completado sin errores. +1 vida recuperada.');
    } else {
      alert('Nivel completado. Has cometido errores.');
    }
    document.getElementById('next-btn').style.display = currentLevel < LEVELS - 1 ? 'inline-block' : 'none';
  }
}

function isBoardComplete() {
  for (let i = 0; i < 81; i++) {
    if (boardState[i] !== puzzles[currentLevel].solution[i]) return false;
  }
  return true;
}

function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const diff = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').textContent = formatTime(diff);
  }, 500);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  document.getElementById('timer').textContent = '00:00';
}

function formatTime(s) {
  const mm = Math.floor(s / 60).toString().padStart(2, '0');
  const ss = (s % 60).toString().padStart(2, '0');
  return `${mm}:${ss}`;
}

document.getElementById('check-btn').addEventListener('click', () => {
  if (isBoardComplete()) {
    stopTimer();
    alert('Perfecto — tablero correcto.');
    document.getElementById('next-btn').style.display = currentLevel < LEVELS - 1 ? 'inline-block' : 'none';
  } else {
    alert('Aún faltan o hay errores.');
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  if (confirm('Reiniciar el nivel actual?')) startLevel(currentLevel);
});

document.getElementById('next-btn').addEventListener('click', () => {
  if (currentLevel < LEVELS - 1) {
    startLevel(currentLevel + 1);
  } else alert('¡Has completado todos los niveles!');
});

document.getElementById('solve-btn').addEventListener('click', () => {
  if (confirm('Mostrar solución del nivel? Se considerará que te rendiste y se guardará en el ranking al perder.')) {
    boardState = puzzles[currentLevel].solution.slice();
    renderBoard();
    stopTimer();
    saveRanking(false);
    alert('Solución mostrada. Se registró tu posición (rendición).');
  }
});

document.getElementById('num-erase').addEventListener('click', () => {
  const active = document.activeElement;
  if (active && active.tagName === 'INPUT' && !active.disabled) {
    active.value = '';
    const idx = +active.dataset.idx;
    boardState[idx] = 0;
  }
});

window.addEventListener('keydown', e => {
  if (!document.activeElement || document.activeElement.tagName !== 'INPUT') return;
  const inp = document.activeElement;
  if (inp.disabled) return;
  if (e.key >= '1' && e.key <= '9') {
    inp.value = e.key;
    inp.dispatchEvent(new Event('input'));
    e.preventDefault();
  } else if (['Backspace', 'Delete', '0'].includes(e.key)) {
    inp.value = '';
    inp.dispatchEvent(new Event('input'));
  }
});

function selectCell(idx) {
  const inputs = boardEl.querySelectorAll('input');
  inputs.forEach(i => (i.style.outline = 'none'));
  const cur = boardEl.querySelector(`input[data-idx='${idx}']`);
  if (cur) cur.style.outline = '2px solid rgba(6,182,212,0.25)';
}

function saveRanking(win) {
  const stored = JSON.parse(localStorage.getItem('sudoku_ranking') || '[]');
  const seconds = parseTimeToSec(document.getElementById('timer').textContent);
  const entry = {
    name: playerName || 'Jugador',
    level: currentLevel + 1,
    time: seconds,
    date: new Date().toISOString()
  };
  stored.push(entry);
  stored.sort((a, b) => (b.level !== a.level ? b.level - a.level : a.time - b.time));
  localStorage.setItem('sudoku_ranking', JSON.stringify(stored.slice(0, 50)));
  renderRanking();
}

function parseTimeToSec(mmss) {
  const parts = mmss.split(':');
  return parseInt(parts[0]) * 60 + parseInt(parts[1]);
}

function renderRanking() {
  const tbody = document.querySelector('#ranking-table tbody');
  tbody.innerHTML = '';
  const stored = JSON.parse(localStorage.getItem('sudoku_ranking') || '[]');
  for (const e of stored) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${e.name}</td><td style="text-align:center">${e.level}</td><td style="text-align:center">${formatTime(e.time)}</td><td>${new Date(e.date).toLocaleString()}</td>`;
    tbody.appendChild(tr);
  }
}

(function init() {
  askName();
  createGrid();
  generateAllPuzzles();
  renderRanking();
  startLevel(0);
})();