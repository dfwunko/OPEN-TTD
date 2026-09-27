import { Game } from '../types/game';

// Curated, lightweight, self-contained HTML5 custom embeds that can be restored anytime
export const DEFAULT_CUSTOM_EMBED_PRESETS: Game[] = [
  {
    id: 'custom_preset_2048',
    title: '2048 Classic',
    category: 'puzzle',
    description: 'The legendary tile-sliding puzzle: merge numbered tiles from 2 to 2048 and beyond.',
    longDescription: '2048 is the quintessential modern math puzzle. Use your arrow keys or swipe gestures to glide numbers across the 4x4 grid. When two tiles with the identical number collide, they fuse into one! Reach 2048 to win, or keep playing for high score records.',
    src: '',
    customHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body { background: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }
    .header { width: 100%; max-width: 360px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .title { font-size: 28px; font-weight: 900; letter-spacing: -1px; color: #38bdf8; }
    .scores { display: flex; gap: 8px; }
    .score-box { background: #1e293b; border: 1px solid #334155; padding: 4px 10px; border-radius: 8px; text-align: center; }
    .score-label { font-size: 10px; text-transform: uppercase; color: #94a3b8; font-weight: 700; letter-spacing: 0.5px; }
    .score-val { font-size: 16px; font-weight: 800; font-family: monospace; color: #fff; }
    .grid-container { width: 100%; max-width: 360px; aspect-ratio: 1/1; background: #0f172a; border: 2px solid #1e293b; border-radius: 14px; padding: 10px; display: grid; grid-template-columns: repeat(4, 1fr); grid-gap: 10px; position: relative; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5); }
    .cell { background: rgba(30, 41, 59, 0.4); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 800; font-family: monospace; transition: all 0.12s ease-in-out; }
    .tile-2 { background: #1e293b; color: #93c5fd; }
    .tile-4 { background: #0369a1; color: #e0f2fe; }
    .tile-8 { background: #0284c7; color: #fff; box-shadow: 0 0 10px rgba(2,132,199,0.4); }
    .tile-16 { background: #0ea5e9; color: #fff; box-shadow: 0 0 12px rgba(14,165,233,0.5); }
    .tile-32 { background: #059669; color: #fff; box-shadow: 0 0 14px rgba(5,150,105,0.5); }
    .tile-64 { background: #10b981; color: #fff; box-shadow: 0 0 16px rgba(16,185,129,0.6); }
    .tile-128 { background: #d97706; color: #fff; font-size: 18px; box-shadow: 0 0 18px rgba(217,119,6,0.6); }
    .tile-256 { background: #f59e0b; color: #fff; font-size: 18px; box-shadow: 0 0 20px rgba(245,158,11,0.7); }
    .tile-512 { background: #e11d48; color: #fff; font-size: 18px; box-shadow: 0 0 22px rgba(225,29,72,0.7); }
    .tile-1024 { background: #ec4899; color: #fff; font-size: 15px; box-shadow: 0 0 24px rgba(236,72,153,0.8); }
    .tile-2048 { background: #8b5cf6; color: #fff; font-size: 15px; box-shadow: 0 0 30px rgba(139,92,246,0.9); }
    .footer { width: 100%; max-width: 360px; display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 12px; color: #64748b; }
    .btn { background: #38bdf8; color: #020617; border: none; padding: 6px 14px; border-radius: 8px; font-weight: 700; font-size: 12px; cursor: pointer; transition: 0.15s; }
    .btn:hover { background: #7dd3fc; }
    .overlay { position: absolute; inset: 0; background: rgba(2, 6, 23, 0.85); border-radius: 14px; display: none; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(4px); z-index: 20; }
    .overlay.active { display: flex; }
    .overlay h2 { font-size: 24px; font-weight: 900; margin-bottom: 8px; color: #f43f5e; }
  </style>
</head>
<body>
  <div class="header">
    <div class="title">2048</div>
    <div class="scores">
      <div class="score-box">
        <div class="score-label">Score</div>
        <div class="score-val" id="score">0</div>
      </div>
      <div class="score-box">
        <div class="score-label">Best</div>
        <div class="score-val" id="best">0</div>
      </div>
    </div>
  </div>
  <div class="grid-container" id="grid">
    <div class="overlay" id="overlay">
      <h2 id="overlay-text">Game Over</h2>
      <button class="btn" onclick="restart()">Try Again</button>
    </div>
  </div>
  <div class="footer">
    <span>Swipe or use Arrow Keys</span>
    <button class="btn" onclick="restart()">New Game</button>
  </div>
  <script>
    let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let score = 0;
    let best = parseInt(localStorage.getItem('2048_best') || '0', 10);
    document.getElementById('best').innerText = best;

    const grid = document.getElementById('grid');
    const overlay = document.getElementById('overlay');
    const overlayText = document.getElementById('overlay-text');

    function createCells() {
      for (let i = 0; i < 16; i++) {
        const div = document.createElement('div');
        div.className = 'cell';
        div.id = 'c-' + i;
        grid.appendChild(div);
      }
    }
    createCells();

    function spawn() {
      const empty = [];
      board.forEach((val, idx) => { if (val === 0) empty.push(idx); });
      if (empty.length === 0) return;
      const spot = empty[Math.floor(Math.random() * empty.length)];
      board[spot] = Math.random() < 0.9 ? 2 : 4;
    }

    function render() {
      board.forEach((val, idx) => {
        const el = document.getElementById('c-' + idx);
        el.className = 'cell' + (val > 0 ? ' tile-' + (val <= 2048 ? val : 2048) : '');
        el.innerText = val > 0 ? val : '';
      });
      document.getElementById('score').innerText = score;
      if (score > best) {
        best = score;
        localStorage.setItem('2048_best', best);
        document.getElementById('best').innerText = best;
      }
    }

    function slide(row) {
      let filtered = row.filter(val => val !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          score += filtered[i];
          filtered[i + 1] = 0;
        }
      }
      filtered = filtered.filter(val => val !== 0);
      while (filtered.length < 4) filtered.push(0);
      return filtered;
    }

    function moveLeft() {
      let changed = false;
      for (let r = 0; r < 4; r++) {
        const row = [board[r*4], board[r*4+1], board[r*4+2], board[r*4+3]];
        const newRow = slide(row);
        for (let c = 0; c < 4; c++) {
          if (board[r*4+c] !== newRow[c]) changed = true;
          board[r*4+c] = newRow[c];
        }
      }
      return changed;
    }

    function rotate() {
      const next = [];
      for (let c = 0; c < 4; c++) {
        for (let r = 3; r >= 0; r--) {
          next.push(board[r*4 + c]);
        }
      }
      board = next;
    }

    function move(dir) {
      // 0: left, 1: up, 2: right, 3: down
      let moved = false;
      if (dir === 0) moved = moveLeft();
      if (dir === 1) { rotate(); rotate(); rotate(); moved = moveLeft(); rotate(); }
      if (dir === 2) { rotate(); rotate(); moved = moveLeft(); rotate(); rotate(); }
      if (dir === 3) { rotate(); moved = moveLeft(); rotate(); rotate(); rotate(); }

      if (moved) {
        spawn();
        render();
        if (checkGameOver()) {
          overlay.classList.add('active');
          overlayText.innerText = 'Game Over';
        }
      }
    }

    function checkGameOver() {
      if (board.includes(0)) return false;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          const val = board[r*4 + c];
          if (c < 3 && val === board[r*4 + c + 1]) return false;
          if (r < 3 && val === board[(r+1)*4 + c]) return false;
        }
      }
      return true;
    }

    function restart() {
      board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      score = 0;
      overlay.classList.remove('active');
      spawn();
      spawn();
      render();
    }

    window.addEventListener('keydown', e => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); move(0); }
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); move(1); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); move(2); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); move(3); }
    });

    let touchX = 0, touchY = 0;
    window.addEventListener('touchstart', e => {
      touchX = e.changedTouches[0].screenX;
      touchY = e.changedTouches[0].screenY;
    }, { passive: true });
    window.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchX;
      const dy = e.changedTouches[0].screenY - touchY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
        move(dx > 0 ? 2 : 0);
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 30) {
        move(dy > 0 ? 3 : 1);
      }
    }, { passive: true });

    restart();
  </script>
</body>
</html>`,
    isCustom: true,
    aspectRatio: '1/1',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Slide & merge numbered tiles' },
      { key: 'Touch / Swipe', action: 'Directional slide' }
    ],
    instructions: [
      'Slide the tiles to combine matching numbers (2+2=4, 4+4=8).',
      'Plan your board corners to create 2048 without running out of spaces.'
    ],
    tips: [
      'Keep your largest tile positioned in one of the four corners (e.g. bottom-right).'
    ],
    plays: 89000,
    rating: 4.95,
    ratingCount: 4200,
    badge: 'Legendary Puzzle',
    iconName: 'Grid',
    accentColor: '#38bdf8',
    releaseYear: 2024
  },
  {
    id: 'custom_preset_snake',
    title: 'Retro Snake 97',
    category: 'retro',
    description: 'Crisp green phosphor Nokia-style Snake: gobble fruit, scale speed, and avoid tail collisions.',
    longDescription: 'The definitive retro Snake experience restored as a lightweight HTML5 canvas game. Slither across the glowing grid, consume bonus apples, and test your lightning reflexes as your snake grows longer with every point.',
    src: '',
    customHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body { background: #06090e; color: #10b981; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 12px; }
    .header { width: 100%; max-width: 400px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-weight: bold; }
    .title { font-size: 20px; color: #34d399; letter-spacing: 2px; }
    .stats { font-size: 14px; color: #6ee7b7; }
    canvas { background: #020508; border: 2px solid #059669; border-radius: 8px; box-shadow: 0 0 20px rgba(16, 185, 129, 0.25); display: block; max-width: 100%; }
    .footer { margin-top: 10px; font-size: 11px; color: #047857; text-align: center; }
  </style>
</head>
<body>
  <div class="header">
    <span class="title">SNAKE '97</span>
    <span class="stats">SCORE: <span id="score">0</span> | BEST: <span id="best">0</span></span>
  </div>
  <canvas id="c" width="400" height="400"></canvas>
  <div class="footer">Arrow Keys or WASD to Slither • Space to Pause</div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score');
    const bestEl = document.getElementById('best');
    const grid = 20;
    const count = 20;

    let snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
    let dir = {x: 0, y: -1};
    let nextDir = {x: 0, y: -1};
    let food = {x: 5, y: 5};
    let score = 0;
    let best = parseInt(localStorage.getItem('snake_best') || '0', 10);
    bestEl.innerText = best;
    let gameOver = false;
    let paused = false;

    function placeFood() {
      food = {
        x: Math.floor(Math.random() * count),
        y: Math.floor(Math.random() * count)
      };
      if (snake.some(s => s.x === food.x && s.y === food.y)) placeFood();
    }

    function step() {
      if (gameOver || paused) return;
      dir = nextDir;
      const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};

      // Wrap boundaries
      if (head.x < 0) head.x = count - 1;
      if (head.x >= count) head.x = 0;
      if (head.y < 0) head.y = count - 1;
      if (head.y >= count) head.y = 0;

      // Self collision
      if (snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver = true;
        return;
      }

      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreEl.innerText = score;
        if (score > best) {
          best = score;
          bestEl.innerText = best;
          localStorage.setItem('snake_best', best);
        }
        placeFood();
      } else {
        snake.pop();
      }
    }

    function draw() {
      ctx.fillStyle = '#020508';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid faint lines
      ctx.strokeStyle = 'rgba(5, 150, 105, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 400; i += grid) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
      }

      // Food
      ctx.fillStyle = '#f43f5e';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(food.x * grid + grid/2, food.y * grid + grid/2, grid/2.5, 0, Math.PI * 2);
      ctx.fill();

      // Snake
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? '#34d399' : '#059669';
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = i === 0 ? 8 : 2;
        ctx.fillRect(s.x * grid + 1, s.y * grid + 1, grid - 2, grid - 2);
      });
      ctx.shadowBlur = 0;

      if (gameOver) {
        ctx.fillStyle = 'rgba(2, 6, 23, 0.85)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CRASHED!', 200, 180);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '14px monospace';
        ctx.fillText('Press SPACE or TAP to restart', 200, 220);
      }
    }

    function loop() {
      step();
      draw();
    }
    let interval = setInterval(loop, 90);

    function restart() {
      snake = [{x: 10, y: 10}, {x: 10, y: 11}, {x: 10, y: 12}];
      dir = {x: 0, y: -1};
      nextDir = {x: 0, y: -1};
      score = 0;
      scoreEl.innerText = score;
      gameOver = false;
      placeFood();
    }

    window.addEventListener('keydown', e => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) restart();
        else paused = !paused;
      }
      if (['ArrowUp', 'KeyW'].includes(e.code) && dir.y !== 1) nextDir = {x: 0, y: -1};
      if (['ArrowDown', 'KeyS'].includes(e.code) && dir.y !== -1) nextDir = {x: 0, y: 1};
      if (['ArrowLeft', 'KeyA'].includes(e.code) && dir.x !== 1) nextDir = {x: -1, y: 0};
      if (['ArrowRight', 'KeyD'].includes(e.code) && dir.x !== -1) nextDir = {x: 1, y: 0};
    });

    canvas.addEventListener('click', () => { if (gameOver) restart(); });
  </script>
</body>
</html>`,
    isCustom: true,
    aspectRatio: '1/1',
    controls: [
      { key: 'Arrow Keys / WASD', action: 'Change snake direction' },
      { key: 'Spacebar', action: 'Pause / Restart' }
    ],
    instructions: [
      'Guide your snake toward the glowing red apples.',
      'Wrap seamlessly across edges, but avoid crashing into your own tail.'
    ],
    tips: [
      'Circle the perimeter to clear space when your tail gets over 20 segments long.'
    ],
    plays: 62000,
    rating: 4.91,
    ratingCount: 3100,
    badge: 'Retro Arcade',
    iconName: 'Play',
    accentColor: '#10b981',
    releaseYear: 2024
  },
  {
    id: 'custom_preset_flappy',
    title: 'Flappy Flight',
    category: 'skill',
    description: 'Addictive one-button physics flyer: flap through obstacle pipes and set high score streaks.',
    longDescription: 'The classic one-touch flap sensation built in ultra-responsive canvas HTML5. Click, tap, or tap Spacebar to pump altitude, dodge pipe hazards, and build your high score record.',
    src: '',
    customHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body { background: #030712; color: #fff; font-family: monospace; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; overflow: hidden; }
    canvas { background: #070e1c; border: 2px solid #0284c7; border-radius: 12px; box-shadow: 0 0 25px rgba(2, 132, 199, 0.3); display: block; max-width: 100%; cursor: pointer; }
    .info { margin-top: 8px; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <canvas id="c" width="360" height="480"></canvas>
  <div class="info">Click, Tap, or Spacebar to Flap</div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');

    let bird = { y: 200, vy: 0 };
    const gravity = 0.38;
    const jump = -6.8;
    let pipes = [];
    let score = 0;
    let best = parseInt(localStorage.getItem('flappy_best') || '0', 10);
    let state = 'ready'; // ready, play, dead
    let frame = 0;

    function reset() {
      bird = { y: 200, vy: 0 };
      pipes = [];
      score = 0;
      frame = 0;
      state = 'play';
    }

    function flap() {
      if (state === 'ready') state = 'play';
      if (state === 'play') bird.vy = jump;
      if (state === 'dead') reset();
    }

    window.addEventListener('keydown', e => { if (e.code === 'Space') { e.preventDefault(); flap(); } });
    canvas.addEventListener('pointerdown', e => { e.preventDefault(); flap(); });

    function loop() {
      ctx.fillStyle = '#070e1c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars in background
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      for (let i = 0; i < 20; i++) {
        const sx = ((i * 47) + frame * 0.2) % canvas.width;
        const sy = (i * 29) % canvas.height;
        ctx.fillRect(sx, sy, 2, 2);
      }

      if (state === 'play') {
        bird.vy += gravity;
        bird.y += bird.vy;

        if (frame % 85 === 0) {
          const gap = 115;
          const top = Math.random() * (canvas.height - gap - 100) + 40;
          pipes.push({ x: canvas.width, top, gap, passed: false });
        }

        pipes.forEach(p => {
          p.x -= 2.2;
          // Hit bird
          if (p.x < 70 && p.x + 45 > 40) {
            if (bird.y - 12 < p.top || bird.y + 12 > p.top + p.gap) {
              state = 'dead';
            }
          }
          if (!p.passed && p.x + 45 < 40) {
            p.passed = true;
            score++;
            if (score > best) {
              best = score;
              localStorage.setItem('flappy_best', best);
            }
          }
        });

        pipes = pipes.filter(p => p.x > -50);

        if (bird.y > canvas.height - 15 || bird.y < 10) {
          state = 'dead';
        }
        frame++;
      }

      // Draw pipes
      pipes.forEach(p => {
        ctx.fillStyle = '#059669';
        ctx.fillRect(p.x, 0, 45, p.top);
        ctx.fillRect(p.x, p.top + p.gap, 45, canvas.height - p.top - p.gap);
        ctx.fillStyle = '#34d399';
        ctx.fillRect(p.x + 4, 0, 4, p.top);
        ctx.fillRect(p.x + 4, p.top + p.gap, 4, canvas.height - p.top - p.gap);
      });

      // Draw bird
      ctx.save();
      ctx.translate(55, bird.y);
      ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, bird.vy * 0.08)));
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      // Eye & Beak
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(5, -4, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(6, -4, 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(18, 4); ctx.lineTo(10, 8); ctx.fill();
      ctx.restore();

      // UI
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 26px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(score, canvas.width / 2, 50);

      if (state === 'ready') {
        ctx.fillStyle = 'rgba(2,6,23,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 22px monospace';
        ctx.fillText('FLAPPY FLIGHT', canvas.width / 2, 200);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px monospace';
        ctx.fillText('Click / Spacebar to Fly', canvas.width / 2, 240);
        ctx.fillText('BEST: ' + best, canvas.width / 2, 275);
      }

      if (state === 'dead') {
        ctx.fillStyle = 'rgba(2,6,23,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 24px monospace';
        ctx.fillText('GAME OVER', canvas.width / 2, 190);
        ctx.fillStyle = '#fff';
        ctx.font = '16px monospace';
        ctx.fillText('SCORE: ' + score, canvas.width / 2, 230);
        ctx.fillText('BEST: ' + best, canvas.width / 2, 260);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px monospace';
        ctx.fillText('Click or Space to Retry', canvas.width / 2, 305);
      }

      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`,
    isCustom: true,
    aspectRatio: '4/3',
    controls: [
      { key: 'Spacebar / Tap', action: 'Flap wings & rise altitude' }
    ],
    instructions: [
      'Time your flaps to navigate the gap between the obstacles.',
      'Gravity pulls your bird downward steadily — stay calm and flap rhythmically.'
    ],
    tips: [
      'Short, controlled taps are safer than frantic multiple clicks.'
    ],
    plays: 74000,
    rating: 4.88,
    ratingCount: 2900,
    badge: 'Endless Skill',
    iconName: 'Play',
    accentColor: '#f59e0b',
    releaseYear: 2024
  },
  {
    id: 'custom_preset_particles',
    title: 'Plasma Fluid Sandbox',
    category: 'skill',
    description: 'Mesmerizing particle & plasma fluid canvas: click or drag to emit glowing trails and vortexes.',
    longDescription: 'An interactive neon physics simulator and canvas experiment. Spawn thousands of glowing plasma embers, create gravity vortexes, and discover captivating visual patterns.',
    src: '',
    customHtml: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #020617; overflow: hidden; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: monospace; color: #94a3b8; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: crosshair; }
    #bar { position: absolute; bottom: 15px; background: rgba(15, 23, 42, 0.85); padding: 8px 16px; border-radius: 9999px; border: 1px solid rgba(255,255,255,0.1); font-size: 11px; backdrop-filter: blur(8px); display: flex; gap: 15px; }
    button { background: none; border: none; color: #38bdf8; font-weight: bold; cursor: pointer; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <div id="bar">
    <span>Drag to Emit Particles</span>
    <button onclick="clearCanvas()">Clear</button>
    <button onclick="burst()">Supernova</button>
  </div>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let particles = [];
    function spawn(x, y, count = 5) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = Math.random() * 4 + 1;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          rad: Math.random() * 5 + 2,
          hue: (Date.now() / 20 + i * 15) % 360,
          life: 1
        });
      }
    }

    function burst() {
      for (let i = 0; i < 120; i++) spawn(w/2, h/2, 1);
    }

    function clearCanvas() { particles = []; }

    canvas.addEventListener('pointerdown', e => spawn(e.clientX, e.clientY, 15));
    canvas.addEventListener('pointermove', e => {
      if (e.buttons > 0) spawn(e.clientX, e.clientY, 4);
    });

    function loop() {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012;
        p.rad *= 0.985;

        ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 65%, ' + Math.max(0, p.life) + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.rad, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(loop);
    }
    burst();
    loop();
  </script>
</body>
</html>`,
    isCustom: true,
    aspectRatio: '16/9',
    controls: [
      { key: 'Mouse Click / Drag', action: 'Spawn glowing particle burst' },
      { key: 'Supernova Button', action: 'Full-screen plasma explosion' }
    ],
    instructions: [
      'Click or drag your pointer to paint with glowing physics embers.',
      'Experiment with motion trails and high-speed drags.'
    ],
    tips: [
      'Rapid circular dragging creates celestial nebulae effects.'
    ],
    plays: 45000,
    rating: 4.96,
    ratingCount: 1800,
    badge: 'Physics Canvas',
    iconName: 'Sparkles',
    accentColor: '#38bdf8',
    releaseYear: 2024
  }
];
