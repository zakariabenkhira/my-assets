<script>
// --- تحميل بيانات الألعاب وعرضها ---
let games = [];

function createGameCard(game) {
  const shortDescription = game.description.length > 100 
    ? game.description.substring(0, 100) + "..." 
    : game.description;
  return `
    <div class="game-card" onclick="openPopup('${game.name.replace(/'/g, "\\'")}')">
      <img src="${game.image}" alt="Game Image">
      <div class="card-content">
        <h3>${game.name}</h3>
        <p>${shortDescription}</p>
        <div class="game-info">
          <span><strong>Category:</strong> ${game.category}</span><br>
          <span><strong>Size:</strong> ${game.size}</span>
        </div>
        <button onclick="event.stopPropagation(); CPABuildLock()">Download</button>
      </div>
    </div>
  `;
}

function openPopup(gameName) {
  const game = games.find(g => g.name === gameName);
  if (!game) return;
  document.getElementById('popupGameName').innerText = game.name;
  document.getElementById('popupDescription').innerText = game.description;
  document.getElementById('popupCategory').innerText = game.category;
  document.getElementById('popupSize').innerText = game.size;
  document.getElementById('popupGameImage').src = game.image;
  document.getElementById('gamePopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('gamePopup').style.display = 'none';
}

function CPABuildLock() {
  alert('Download link is locked. Please complete a quick action!');
}

window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');
  const introSound = document.getElementById('introSound');
  introSound.play();
  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 3000);

  fetch('https://raw.githubusercontent.com/zakariabenkhira/claudery-data/main/games.json')
    .then(response => response.json())
    .then(data => {
      games = data;
      const gamesSection = document.getElementById('gamesSection');
      gamesSection.innerHTML = games.map(createGameCard).join('');
    })
    .catch(error => console.error('Error fetching games:', error));
});

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const filteredGames = games.filter(game => game.name.toLowerCase().includes(query));
  const gamesSection = document.getElementById('gamesSection');
  gamesSection.innerHTML = filteredGames.map(createGameCard).join('');
});

// --- حماية من الزوار من المغرب ---
fetch('https://ipwhois.app/json/')
  .then(response => response.json())
  .then(data => {
    if (data.country_code === 'MA') {
      document.body.innerHTML = '<div style="color: white; background: black; height: 100vh; display: flex; justify-content: center; align-items: center; font-size: 24px; text-align: center;">عذرًا، هذا الموقع غير متاح في المغرب.</div>';
    }
  })
  .catch(error => {
    console.error('Error fetching IP data:', error);
    alert('حدث خطأ أثناء محاولة الحصول على بيانات الموقع. يرجى المحاولة مرة أخرى لاحقًا.');
  });

// --- حماية من الزوار عبر VPN ---
fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=fba18f45bcc94274a6e2134ae75ad327")
  .then(response => response.json())
  .then(data => {
    if (data.security && data.security.is_vpn === true) {
      window.location.href = "https://www.google.com";
    }
  })
  .catch(error => {
    console.error("VPN check failed:", error);
  });
