// for searches
let term = ''
//append article to main container "songs"
const songContainer = document.getElementById('songs')


const updateTerm = () => {
    term = document.getElementById('searchInput').value;

    if (!term || term === '') {
        alert('Please enter a song or artist!')
    } else {

        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }

        const url = `https://itunes.apple.com/search?limit=15&term=${term}`

        fetch(url).then((response) => response.json()).then((data) => {

            const artists = data.results;
            return artists.map(result => {


                // const songContainer = document.getElementById('songs')

                const article = document.createElement('article'),
                    artist = document.createElement('p'),
                    song = document.createElement('p'),
                    img = document.createElement('img'),
                    audio = document.createElement('audio'),
                    audioSource = document.createElement('source')


                artist.innerHTML = result.artistName
                song.innerHTML = result.trackName
                img.src = result.artworkUrl100
                audioSource.src = result.previewUrl
                audio.setAttribute('controls', '')

                article.appendChild(img)
                article.appendChild(artist)
                article.appendChild(song)
                article.appendChild(audio)
                audio.appendChild(audioSource)
                songContainer.appendChild(article)
            })
        })
            .catch(error => console.log("request failed:", error));

    }
}

const searchBtn = document.querySelector('button')
searchBtn.addEventListener('click', updateTerm)

//stops more than one song playing

document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] != event.target) {
            audio[i].pause();
        }
    }
}, true)

