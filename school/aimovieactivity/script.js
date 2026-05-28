document.addEventListener('DOMContentLoaded', () => {
    const movies = [
        { id: 2, title: "The Matrix", genre: ["Action", "Sci-Fi"], popularity: 90, rating: "R", reviewScore: 4.8, year: 1999, description: "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.", poster: "https://codehs.com/uploads/2a1471abba047cc113f9234d015a8d3d" },
        { id: 3, title: "Spirited Away", genre: ["Animation", "Fantasy", "Adventure"], popularity: 88, rating: "PG", reviewScore: 4.9, year: 2001, description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.", poster: "https://codehs.com/uploads/faf2e68481844daa1fec4b9a07870f9f" },
        { id: 4, title: "Inception", genre: ["Action", "Sci-Fi", "Thriller"], popularity: 92, rating: "PG-13", reviewScore: 4.7, year: 2010, description: "A thief who steals information by entering people's dreams takes on the inverse task of planting an idea into a C.E.O.'s mind.", poster: "https://codehs.com/uploads/b36705efad2ec130ff861e5198e437d4" },
        { id: 5, title: "The Princess Bride", genre: ["Adventure", "Comedy", "Fantasy"], popularity: 85, rating: "PG", reviewScore: 4.6, year: 1987, description: "A farmboy-turned-pirate encounters obstacles in his quest to be reunited with his true love.", poster: "https://codehs.com/uploads/862b419ca71d8de486c00874eda8b0c7" },
        { id: 6, title: "Parasite", genre: ["Thriller", "Drama", "Comedy"], popularity: 80, rating: "R", reviewScore: 4.8, year: 2019, description: "Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan.", poster: "https://codehs.com/uploads/3df6895d903a28a6b76e2de6b3ea5788" },
        { id: 7, title: "Coco", genre: ["Animation", "Family", "Music"], popularity: 89, rating: "PG", reviewScore: 4.7, year: 2017, description: "Aspiring musician Miguel enters the Land of the Dead to find his great-great-grandfather, a legendary singer.", poster: "https://codehs.com/uploads/dfc80eb7c47db37cc2654ed5e9139f7d" },
        { id: 8, title: "The Dark Knight", genre: ["Action", "Crime", "Drama"], popularity: 95, rating: "PG-13", reviewScore: 4.9, year: 2008, description: "Batman faces the Joker, a menace wreaking havoc on Gotham, testing his ability to fight injustice.", poster: "https://codehs.com/uploads/94683a170acdaa2433c9ddba3f7201d3" },
        { id: 10, title: "Forrest Gump", genre: ["Drama", "Romance"], popularity: 93, rating: "PG-13", reviewScore: 4.7, year: 1994, description: "Historical events unfold from the perspective of an Alabama man with an IQ of 75.", poster: "https://codehs.com/uploads/180f2c26ced8887a095344d44b96a4d9" },
        { id: 11, title: "Interstellar", genre: ["Sci-Fi", "Drama", "Adventure"], popularity: 90, rating: "PG-13", reviewScore: 4.6, year: 2014, description: "A team of explorers travel through a wormhole in space to ensure humanity's survival.", poster: "https://codehs.com/uploads/8c37020f160cbcb365d461d61366ea2e" },
        { id: 12, title: "Toy Story", genre: ["Animation", "Adventure", "Comedy"], popularity: 88, rating: "G", reviewScore: 4.5, year: 1995, description: "A cowboy doll is threatened when a new spaceman figure becomes top toy.", poster: "https://codehs.com/uploads/b7db97fc72861aaad380acd37408f301" },
        { id: 13, title: "Finding Nemo", genre: ["Animation", "Adventure", "Comedy"], popularity: 87, rating: "G", reviewScore: 4.4, year: 2003, description: "A timid clownfish sets out on a journey to bring his captured son home.", poster: "https://codehs.com/uploads/bf04a508e76cec8911288e4b1058f255" },
        { id: 14, title: "Avengers: Endgame", genre: ["Action", "Adventure", "Sci-Fi"], popularity: 94, rating: "PG-13", reviewScore: 4.8, year: 2019, description: "The Avengers assemble to reverse Thanos' actions and restore balance to the universe.", poster: "https://codehs.com/uploads/8f502ff9bfe1a1cc2555e03344eba8d5" },
        { id: 15, title: "The Lion King", genre: ["Animation", "Adventure", "Drama"], popularity: 90, rating: "G", reviewScore: 4.6, year: 1994, description: "Lion prince Simba and his father are targeted by his bitter uncle, who wants the throne.", poster: "https://codehs.com/uploads/c3f4a54d14360ac39fa6a17a3ec079b1" }
    ];

    const favoriteMoviesSelect = document.getElementById('favoriteMoviesSelect');
    const getRecommendationBtn = document.getElementById('getRecommendationBtn');
    const prioritizeGenreToggle = document.getElementById('prioritizeGenreToggle');
    const prioritizePopularityToggle = document.getElementById('prioritizePopularityToggle');
    const prioritizeReviewScoreToggle = document.getElementById('prioritizeReviewScoreToggle');
    const prioritizeNewerToggle = document.getElementById('prioritizeNewerToggle');
    const onlyGPGToggle = document.getElementById('onlyGPGToggle');
    const recommendationResultDiv = document.getElementById('recommendationResult');
    const recommendationRationaleDiv = document.getElementById('recommendationRationale');
    const rationaleIntroP = document.querySelector('.rationale-intro');

    // Populate movie selection dropdown
    movies.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie.id;
        option.textContent = `${movie.title} (${movie.year})`;
        favoriteMoviesSelect.appendChild(option);
    });

    getRecommendationBtn.addEventListener('click', () => {
        const selectedMovieIds = Array.from(favoriteMoviesSelect.selectedOptions).map(opt => parseInt(opt.value));

        if (selectedMovieIds.length === 0) {
            recommendationResultDiv.innerHTML = `<p class="placeholder-text">Please select at least one favorite movie.</p>`;
            recommendationRationaleDiv.innerHTML = '';
            rationaleIntroP.style.display = 'none';
            return;
        }
        if (selectedMovieIds.length > 3) {
            recommendationResultDiv.innerHTML = `<p class="placeholder-text">Please select no more than 3 favorite movies.</p>`;
            recommendationRationaleDiv.innerHTML = '';
            rationaleIntroP.style.display = 'none';
            return;
        }

        const favoriteMoviesObjects = movies.filter(movie => selectedMovieIds.includes(movie.id));
        const recommendation = getRecommendation(favoriteMoviesObjects);
        displayRecommendation(recommendation);
    });

    function getRecommendation(favoriteMoviesList) {
        const toggles = {
            prioritizeGenre: prioritizeGenreToggle.checked,
            prioritizePopularity: prioritizePopularityToggle.checked,
            prioritizeReview: prioritizeReviewScoreToggle.checked,
            prioritizeNewer: prioritizeNewerToggle.checked,
            onlyGandPG: onlyGPGToggle.checked,
        };

        let candidateMovies = movies.filter(movie => !favoriteMoviesList.find(fav => fav.id === movie.id));

        if (toggles.onlyGandPG) {
            candidateMovies = candidateMovies.filter(movie => movie.rating === "G" || movie.rating === "PG");
        }

        if (candidateMovies.length === 0) {
            return null; // No suitable movies found
        }
        
        const favoriteGenres = new Set();
        favoriteMoviesList.forEach(favMovie => {
            favMovie.genre.forEach(g => favoriteGenres.add(g));
        });

        const scoredMovies = candidateMovies.map(movie => {
            let score = 0;
            const rationale = {
                genreMatch: { count: 0, common: [], scoreBoost: 1 },
                popularity: { value: movie.popularity, scoreBoost: 1 },
                reviewData: { value: movie.reviewScore, scoreBoost: 1 },
                recency: { year: movie.year, scoreBoost: 1 },
                ratingOk: true
            };

            // Genre Score
            let genreMatchCount = 0;
            movie.genre.forEach(g => {
                if (favoriteGenres.has(g)) {
                    genreMatchCount++;
                    rationale.genreMatch.common.push(g);
                }
            });
            rationale.genreMatch.count = genreMatchCount;
            let genreScore = (genreMatchCount / (favoriteGenres.size || 1)) * 100; // Normalize score, prevent div by zero
            if (toggles.prioritizeGenre) {
                genreScore *= 1.5; // Boost score
                rationale.genreMatch.scoreBoost = 1.5;
            }
            score += genreScore;

            // Popularity Score
            let popularityScore = movie.popularity;
            if (toggles.prioritizePopularity) {
                popularityScore *= 1.5; // Boost score
                rationale.popularity.scoreBoost = 1.5;
            }
            score += popularityScore;
            
            // Review Score
            let reviewPoints = movie.reviewScore * 10; // Base points for review score (e.g. 4.5 stars = 45 points)
            if (toggles.prioritizeReview) {
                reviewPoints *= 1.5; // Boost if prioritized
                rationale.reviewData.scoreBoost = 1.5;
            }
            score += reviewPoints;

            // Recency Score (Newer Releases)
            const currentYear = new Date().getFullYear();
            const minDatasetYear = Math.min(...movies.map(m => m.year));
            const maxDatasetYear = Math.max(...movies.map(m => m.year)); // Effectively the 'newest' movie year in dataset

            let recencyScoreContribution = 0;
            if (maxDatasetYear > minDatasetYear) { // Avoid division by zero if all movies are from the same year
                // Normalize year to a 0-1 range, then scale (e.g., to 50 points max)
                recencyScoreContribution = ((movie.year - minDatasetYear) / (maxDatasetYear - minDatasetYear)) * 50;
            } else if (movie.year === maxDatasetYear) { // Handle case where all movies are same year, or it's the only year
                 recencyScoreContribution = 25; // Assign a neutral mid-value
            }

            if (toggles.prioritizeNewer) {
                recencyScoreContribution *= 1.5; // Boost if prioritized
                rationale.recency.scoreBoost = 1.5;
            }
            score += recencyScoreContribution;

            rationale.ratingOk = !(toggles.onlyGandPG && (movie.rating !== "G" && movie.rating !== "PG"));

            return { movie, score, rationale };
        });

        scoredMovies.sort((a, b) => b.score - a.score); // Sort descending by score

        return scoredMovies.length > 0 ? scoredMovies[0] : null;
    }

    function displayRecommendation(recommendation) {
        if (!recommendation) {
            recommendationResultDiv.innerHTML = `<p class="placeholder-text">No movie found matching your criteria. Try adjusting the AI Logic toggles or your favorite movies.</p>`;
            recommendationRationaleDiv.innerHTML = '';
            rationaleIntroP.style.display = 'none';
            return;
        }

        const { movie, rationale } = recommendation;
        rationaleIntroP.style.display = 'block';

        recommendationResultDiv.innerHTML = `
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-details">${movie.year} | Rated: ${movie.rating} | Genres: ${movie.genre.join(', ')}</p>
            ${movie.poster ? `<img src="${movie.poster}" alt="${movie.title} Poster" style="max-width:150px; border-radius: 5px; margin-bottom:10px;">` : ''}
            <p class="movie-description">${movie.description}</p>
        `;
        
        recommendationRationaleDiv.innerHTML = ''; // Clear previous rationale

        // Genre Match Rationale
        const genreItem = document.createElement('div');
        genreItem.className = 'rationale-item';
        let genreBoostText = rationale.genreMatch.scoreBoost > 1 ? " (Boosted by Priority)" : "";
        genreItem.innerHTML = `
            <h4><i class="fas fa-theater-masks"></i> Genre Match${genreBoostText}</h4>
            <p>Matches ${rationale.genreMatch.count} genre(s) from your favorites.</p>
            ${rationale.genreMatch.common.length > 0 ? 
                rationale.genreMatch.common.map(g => `<span class="genre-tag">${g}</span>`).join('') : 
                '<p>No direct genre matches with your favorites.</p>'
            }
        `;
        recommendationRationaleDiv.appendChild(genreItem);

        // Popularity Rationale
        const popularityItem = document.createElement('div');
        popularityItem.className = 'rationale-item';
        let popBoostText = rationale.popularity.scoreBoost > 1 ? " (Boosted by Priority)" : "";
        popularityItem.innerHTML = `
            <h4><i class="fas fa-fire"></i> Popularity${popBoostText}</h4>
            <p>Score: ${movie.popularity}/100</p>
            <div class="popularity-bar-container">
                <div class="popularity-bar" style="width: ${movie.popularity}%;">${movie.popularity}%</div>
            </div>
        `;
        recommendationRationaleDiv.appendChild(popularityItem);
        
        // Review Score Rationale
        const reviewItem = document.createElement('div');
        reviewItem.className = 'rationale-item';
        const stars = getStarRating(movie.reviewScore); // movie.reviewScore is the raw score
        let reviewBoostText = rationale.reviewData.scoreBoost > 1 ? " (Boosted by Priority)" : "";
        reviewItem.innerHTML = `
            <h4><i class="fas fa-star"></i> Audience Review Score${reviewBoostText}</h4>
            <p class="star-rating">${stars} (${movie.reviewScore}/5.0)</p>
            ${rationale.reviewData.scoreBoost > 1 ? '<p>High review scores were given extra emphasis.</p>' : '<p>Audience ratings contribute to the overall score.</p>'}
        `;
        recommendationRationaleDiv.appendChild(reviewItem);

        // Recency Rationale
        const recencyItem = document.createElement('div');
        recencyItem.className = 'rationale-item';
        let recencyBoostText = rationale.recency.scoreBoost > 1 ? " (Boosted by Priority)" : "";
        recencyItem.innerHTML = `
            <h4><i class="fas fa-calendar-alt"></i> Release Year${recencyBoostText}</h4>
            <p>Released: ${movie.year}.</p>
            ${rationale.recency.scoreBoost > 1 ? '<p>Newer releases were given extra weight.</p>' : '<p>Movie age is a factor in scoring.</p>'}
        `;
        recommendationRationaleDiv.appendChild(recencyItem);

        // Content Rating Filter Rationale
        const ratingFilterItem = document.createElement('div');
        ratingFilterItem.className = 'rationale-item';
        const onlyGPGActive = document.getElementById('onlyGPGToggle').checked;
        let ratingFilterText = "";
        if (onlyGPGActive) {
            if (rationale.ratingOk) {
                ratingFilterText = `Passed 'Only G/PG' filter. (Rated: ${movie.rating})`;
            } else {
                 // This case should not happen if filter is applied correctly in getRecommendation
                ratingFilterText = `Error: Should have been filtered by 'Only G/PG'. (Rated: ${movie.rating})`;
            }
        } else {
            ratingFilterText = `No G/PG filter applied. (Rated: ${movie.rating})`;
        }
        ratingFilterItem.innerHTML = `
            <h4><i class="fas fa-child"></i> Content Rating Logic</h4>
            <p>${ratingFilterText}</p>
        `;
        recommendationRationaleDiv.appendChild(ratingFilterItem);
    }

    function getStarRating(score) {
        let starsHtml = '';
        const fullStars = Math.floor(score);
        const halfStar = score % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) starsHtml += '<i class="fas fa-star"></i>';
        if (halfStar) starsHtml += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) starsHtml += '<i class="far fa-star"></i>'; // Using far for empty star
        return starsHtml;
    }
});