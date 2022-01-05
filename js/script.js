//selecionar todos as tags ou elementos requeridos

const wrapper = document.querySelector('.wrapper'),
musicImg = wrapper.querySelector('.img-area img'),
musicName = wrapper.querySelector('.song-details .name'),
musicArtist = wrapper.querySelector('.song-details .artist'),
mainAudio = wrapper.querySelector('#main-audio'),
playPauseBtn = wrapper.querySelector('.play-pause');
prevBtn = wrapper.querySelector('#prev');
nextBtn = wrapper.querySelector('#next');

let musicIndex = 3;

window.addEventListener('load', () => {
    loadMusic(musicIndex); //chamando a função 
})

function loadMusic(indexNumber) {
    musicName.innerText = allMusic[indexNumber].name;
    musicArtist.innerText = allMusic[indexNumber].artist;
    musicImg.src = `images/${allMusic[indexNumber].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumber].img}.mp3`;
}

//play music
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector('i').innerText = 'pause';
    mainAudio.play();
}

//pause music
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector('i').innerText = 'play_arrow';
    mainAudio.pause();
}

//next music
function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//prev music
function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

//acionando botão de play e pause
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    isMusicPaused ? pauseMusic() : playMusic();
});

//acionando botão next
nextBtn.addEventListener("click", () => {
    nextMusic();
});

//acionando botão prev
prevBtn.addEventListener("click", () => {
    prevMusic();
});

