const apiKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const form = document.querySelector("form");
const searchBox = document.getElementById("query-box");
const results = document.querySelector(".results-display");
const loadMore = document.getElementById("expand-button");

let page = 1;

async function fetchImages() {
  const query = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      results.innerHTML = ""; // Clear results for a new search
    }

    data.results.forEach((item) => {
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("search-result");

      const img = document.createElement("img");
      img.src = item.urls.small;
      img.alt = item.alt_description || "Image";

      const link = document.createElement("a");
      link.href = item.links.html;
      link.target = "_blank";
      link.textContent = item.alt_description || "View Image";

      imgDiv.appendChild(img);
      imgDiv.appendChild(link);
      results.appendChild(imgDiv);
    });

    page++;
    loadMore.style.display = "block";
  } catch (error) {
    console.log("Error fetching images:", error);
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  page = 1; // Start a new search
  fetchImages();
};

loadMore.onclick = fetchImages;
