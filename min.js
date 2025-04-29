let _0xg = [];

function _0xa(_0xb) {
  const _0xc = _0xb.description.length > 100 
    ? _0xb.description.substring(0, 100) + "..." 
    : _0xb.description;
  return `
    <div class="game-card" onclick="_0xd('${_0xb.name.replace(/'/g, "\\'")}')">
      <img src="${_0xb.image}" alt="Game Image">
      <div class="card-content">
        <h3>${_0xb.name}</h3>
        <p>${_0xc}</p>
        <div class="game-info">
          <span><strong>Category:</strong> ${_0xb.category}</span><br>
          <span><strong>Size:</strong> ${_0xb.size}</span>
        </div>
        <button onclick="event.stopPropagation(); _0xe()">Download</button>
      </div>
    </div>
  `;
}

function _0xd(_0xf) {
  const _0xg0 = _0xg.find(_0xg1 => _0xg1.name === _0xf);
  if (!_0xg0) return;
  document.getElementById('popupGameName').innerText = _0xg0.name;
  document.getElementById('popupDescription').innerText = _0xg0.description;
  document.getElementById('popupCategory').innerText = _0xg0.category;
  document.getElementById('popupSize').innerText = _0xg0.size;
  document.getElementById('popupGameImage').src = _0xg0.image;
  document.getElementById('gamePopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('gamePopup').style.display = 'none';
}

function _0xe() {
  alert('Download link is locked. Please complete a quick action!');
}

window.addEventListener('load', () => {
  const _0xg2 = document.getElementById('loader');
  const _0xg3 = document.getElementById('content');
  const _0xg4 = document.getElementById('introSound');
  _0xg4.play();
  setTimeout(() => {
    _0xg2.style.display = 'none';
    _0xg3.style.display = 'block';
  }, 3000);

  fetch('https://raw.githubusercontent.com/zakariabenkhira/claudery-data/main/games.json')
    .then(_0xg5 => _0xg5.json())
    .then(_0xg6 => {
      _0xg = _0xg6;
      const _0xg7 = document.getElementById('gamesSection');
      _0xg7.innerHTML = _0xg.map(_0xa).join('');
    })
    .catch(_0xg8 => console.error('Error fetching games:', _0xg8));
});

document.getElementById('searchInput').addEventListener('input', function () {
  const _0xg9 = this.value.toLowerCase();
  const _0xga = _0xg.filter(_0xgb => _0xgb.name.toLowerCase().includes(_0xg9));
  const _0xgc = document.getElementById('gamesSection');
  _0xgc.innerHTML = _0xga.map(_0xa).join('');
});
