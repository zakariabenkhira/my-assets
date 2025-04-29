
    function CPABuildLock() {
      alert('Download link is locked. Please complete a quick action!');
    }

    window.addEventListener('load', () => {
      const loader = document.getElementById('loader'); let games = [];

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
