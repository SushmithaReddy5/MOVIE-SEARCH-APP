async function getMovie() {
    const movieName = document.getElementById('searchInput').value;
    const movieResult = document.getElementById('movieResult');
    const loading = document.getElementById('loading');

    if (movieName.trim() === "") {
        movieResult.innerHTML = "<p>Please enter a movie name.</p>";
        return;
    }

    movieResult.innerHTML = "";
    loading.style.display = "block";

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=71a1eda4`);
        const data = await response.json();

        loading.style.display = "none";

        if (data.Response === "True") {
            movieResult.innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <img src="${data.Poster}" alt="Movie Poster">
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                <p>${data.Plot}</p>
            `;
        } else {
            movieResult.innerHTML = `<p>❌ Movie not found! Try again.</p>`;
        }
    } catch (error) {
        loading.style.display = "none";
        movieResult.innerHTML = `<p>⚠️ Error fetching data. Try again later.</p>`;
    }
}
