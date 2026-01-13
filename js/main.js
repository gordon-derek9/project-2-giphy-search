const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

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

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayGifs(data.data);
    })
    .catch((error) => {
      console.error("Error fetching gifs:", error);
    });
}

function displayGifs(gifs) {
  results.innerHTML = "";

  gifs.forEach((gif) => {
    const card = document.createElement("div");
    card.className = "gif-card";

    const img = document.createElement("img");
    img.src = gif.images.fixed_width.url;
    img.alt = gif.title;

    card.appendChild(img);
    results.appendChild(card);
  });
}
