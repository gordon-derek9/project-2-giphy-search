const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");
const loadingMessage = document.getElementById("loadingMessage");
const noResultsMessage = document.getElementById("noResultsMessage");

// Replace with your own Giphy API key
const API_KEY = "g2MvyhFviSpyZyJGjszfp9TVMAON0lEb";

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  fetchGifs(query);
});

function fetchGifs(query) {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&limit=12`;

  // reset messages
  loadingMessage.style.display = "block";
  noResultsMessage.style.display = "none";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayGifs(data.data);
    })
    .catch((error) => {
      console.error("Error fetching gifs:", error);
      loadingMessage.style.display = "none";
    });
}

function displayGifs(gifs) {
  results.innerHTML = "";

  // no results case
  if (gifs.length === 0) {
    noResultsMessage.style.display = "block";
    loadingMessage.style.display = "none";
    return;
  }

  gifs.forEach((gif) => {
    const card = document.createElement("div");
    card.className = "gif-card";

    const img = document.createElement("img");
    img.src = gif.images.fixed_width.url;
    img.alt = gif.title || "Giphy image";

    card.appendChild(img);
    results.appendChild(card);
  });

  // hide loading message AFTER gifs render
  loadingMessage.style.display = "none";
}
