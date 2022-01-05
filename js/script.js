//selecionar todos as tags ou elementos requeridos

const wrapper = document.querySelector('.wrapper'),
musicImg = wrapper.querySelector('.img-area img'),
musicName = wrapper.querySelector('.song-details .name'),
musicArtist = wrapper.querySelector('.song-details .artist'),
mainAudio = wrapper.querySelector('#main-audio'),
playPauseBtn = wrapper.querySelector('.play-pause'),
prevBtn = wrapper.querySelector('#prev'),
nextBtn = wrapper.querySelector('#next'),
progressArea = wrapper.querySelector('.progress-area'),
progressBar = wrapper.querySelector('.progress-bar');

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

//atualizando progress-bar de acordo com o tempo da música
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; //tempo atual
    const duration = e.target.duration; //duração total da música
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentime = wrapper.querySelector(".current");
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", () => {

        //atualizar a duração total da música
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    //atualizar o tempo atual da música
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentime.innerText = `${currentMin}:${currentSec}`;
    
});

//atualizando barra de progress-bar de acordo com o tamanho
progressArea.addEventListener("click", (e) => {
    let progressWidthVal = progressArea.clientWidth; //acessando elemento width do progress bar
    let clickedOffSetX = e.offsetX; //acessando value offset
    let songDuration = mainAudio.duration; //acessando a duração total da música

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});