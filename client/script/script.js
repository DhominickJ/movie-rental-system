document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/api/movies', {
        method: 'POST'
    })
    
    /**
     * @typedef Movie 
     * @prop {import("mongoose").ObjectId} _id
     * @prop {string} name
     * @prop {number} year
     * @prop {number} runtime
     * @prop {string[]} categories
     * @prop {string} releaseDate
     * @prop {string} director
     * @prop {string[]} writer
     * @prop {string[]} actors
     * @prop {string} storyline
     */

    /** @type {Array<Movie>} */
    const movies = await response.json();
    const list = document.querySelector('.movie-list ul');

    movies.forEach(movie => {
        const li = document.createElement('li');
        const title = document.createElement('h2');
        const genre = document.createElement('p');

        title.innerHTML = movie.name;
        genre.innerHTML = movie.categories.join(', ')
        
        li.append(title, genre);
        list.append(li);
    })
})