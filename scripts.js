let term = '';
const songContainer = document.getElementById('songs');

const updateTerm = () => {
	document.getElementById('searchInput').value;
	if (!term || term === '') {
		alert('Please enter a song or artist.');
	} else {

		while (songContainer.firstChild) {
			songContainer.removeChild(songContainer.firstChild);
		}
		const url = `https://itunes.apple.com/search?term=${term}`;

		fetch(url).then((response) => response.json()).then((data) => {
			// console.log(data.results);
			const artists = data.results;
			return artists.map(result => {

				const article = document.createElement('article'),
					//following are all const. no need write 'const' when seperated by commas
					artist = document.createElement('p'),
					song = document.createElement('p'),
					img = document.createElement('img'),
					audio = document.createElement('audio'),
					audioSource = document.createElement('source');

				artist.innerHTML = result.artistName;
				song.innerHTML = result.trackName;
				img.src = result.artworkUrl100;
				audioSource.src = result.previewUrl;
				audio.setAttribute('controls', '');

				article.appendChild(img);
				article.appendChild(artist);
				article.appendChild(song);
				article.appendChild(audio);
				audio.appendChild(audioSource);
				songContainer.appendChild(article);

				console.log(result);
			});
		});
	};
};
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', updateTerm);
// .catch((error) => console.log('Request Failed:', error));
