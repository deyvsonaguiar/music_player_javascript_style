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
progressBar = wrapper.querySelector('.progress-bar'),
musicList = wrapper.querySelector('.music-list'),
showMoreBtn = wrapper.querySelector('#more-music'),
hideMusicBtn = musicList.querySelector('#close');

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

//atualizando botão repetir
const repeatBtn = wrapper.querySelector("#repeat-plist");

repeatBtn.addEventListener("click", () => {
    //pegamos o innerText do ícone que será alterado
    let getText = repeatBtn.innerText;
    //diferenciando o ícone
    switch(getText) {
        case "repeat":
        repeatBtn.innerText = "repeat_one";
        repeatBtn.setAttribute("title", "Song looped");
        break;
        case "repeat_one":
        repeatBtn.innerText = "shuffle";
        repeatBtn.setAttribute("title", "Playback shuffle");
        break;
        case "shuffle":
        repeatBtn.innerText = "repeat";
        repeatBtn.setAttribute("title", "Playlist looped");
        break;
    }

});

//funcionamento dos ícones repeat, repeat_one e shuffle
mainAudio.addEventListener("ended", () => {
//pegamos o innerText do ícone que será alterado
let getText = repeatBtn.innerText;
//executando ação do ícone
    switch(getText) {
        case "repeat":
        nextMusic();
        break;
        case "repeat_one":
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
        case "shuffle":
        let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        do{
            randIndex = Math.floor((Math.random() * allMusic.length) + 1);
        } while (musicIndex == randIndex);
            musicIndex = randIndex;
            loadMusic(musicIndex);
            playMusic();
            break;
    }

});

//abrindo lista de músicas
showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

//fechando lista de músicas
hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

//criação do li de acordo com o tamanho array
for(let i = 0; i < allMusic.length; i++) {

    //passando song, name e artista do array para o li
    let liTag = `<li>
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}"  class="audio-duration">0:00</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {

        //atualizar a duração total da música
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    });
}

