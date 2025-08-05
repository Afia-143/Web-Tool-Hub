const allSongs = [
    {
        name: "Jhol",
        artist: "Annural Khalid",
        src: "songs/jhol.mp3",
        img: "images/jhol.jpg"
    },
    {
        name: "Maand",
        artist: "Hasan Raheem",
        src: "songs/maand.mp3",
        img: "images/maand.jpg"
    },
    {
        name: "Faded",
        artist: "Alan Walker",
        src: "songs/faded.mp3",
        img: "images/faded.jpg"
    },
    {
        name: "Ride It",
        artist: "Jay Sean",
        src: "songs/ride-it.mp3",
        img: "images/ride-it.jpg"
    },
    {
        name: "Grateful",
        artist: "Neffex",
        src: "songs/grateful.mp3",
        img: "images/grateful.jpg"
    },
    {
        name: "Never Give Up",
        artist: "Neffex",
        src: "songs/never-give-up.mp3",
        img: "images/never-give-up.jpg"
    },
    {
        name: "Broken Angel",
        artist: "Arash",
        src: "songs/broken-angel.mp3",
        img: "images/broken-angel.jpg"
    },
    {
        name: "Where Are You Now",
        artist: "Neffex",
        src: "songs/where-are-you-now.mp3",
        img: "images/where-are-you-now.jpg"
    }
];

let currSongIndex = 0;

let audio = document.getElementById("main-audio");
let songName = document.querySelector(".song-name");
let artist = document.querySelector(".artist");
const image = document.querySelector(".img-area img");

// Load Song
function loadSong(index){
    const song = allSongs[index];
    songName.textContent = song.name;
    artist.textContent = song.artist;
    image.src = song.img;
    audio.src = song.src;
}

let isPlaying = false;

const playBtn = document.getElementById("play");
const playIcon = playBtn.querySelector("i");

// Play Song
function playSong(){
    audio.play();
    isPlaying = true;
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}

// Pause Song
function pauseSong(){
    audio.pause();
    isPlaying = false;
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
}

playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// Next Song 
function nextSong(){
    currSongIndex++;
    if(currSongIndex >= allSongs.length){
        currSongIndex = 0;
    }
    loadSong(currSongIndex);
    playSong();
}

// Previous Song 
function prevSong(){
    currSongIndex--;
    if(currSongIndex < 0){
        currSongIndex = allSongs.length - 1;
    }
    loadSong(currSongIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

const progressArea = document.querySelector(".progress-area");
const progressBar = document.querySelector(".progressBar");
const currentTime = document.querySelector(".current-time");
const maxDuration = document.querySelector(".max-duration");

// Update Progress
function updateTime(){
    if(audio.duration){
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // updating current time
        let currentMin = Math.floor(audio.currentTime / 60);
        let currentSec = Math.floor(audio.currentTime % 60);
        if(currentSec < 10){
            currentSec = "0" + currentSec;
        }
        currentTime.textContent = `${currentMin}:${currentSec}`;

        // updating duration 
        let durationMin = Math.floor(audio.duration / 60);
        let durationSec = Math.floor(audio.duration % 60);
        if(durationSec < 10){
            durationSec = "0" + durationSec;
        }
        maxDuration.textContent = `${durationMin}:${durationSec}`;
    }
}

audio.addEventListener("timeupdate", updateTime);

function setProgress(e){
    let width = progressArea.clientWidth;
    let offsetX = e.offsetX;
    let duration = audio.duration;

    audio.currentTime = (offsetX / width) * duration;
}

progressArea.addEventListener("click", setProgress);

audio.addEventListener("ended", () => {
    nextSong();
});

const songListPanel = document.getElementById("song-list-panel");

function displaySongList(){
    songListPanel.innerHTML = "";

    allSongs.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.classList.add("song-item");

        songItem.innerHTML = `
            <img src="${song.img}" class="song-thumb">
            <div class="song-info">
                <p class="song-title">${song.name}</p>
                <p class="artist">${song.artist}</p>
            </div>
        `;

        songItem.addEventListener("click", () => {
            currSongIndex = index;
            loadSong(currSongIndex);
            playSong();
            showPlayerScreen();
        });

        songListPanel.appendChild(songItem);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    displaySongList();
});

const listScreen = document.getElementById("list-screen");
const playScreen = document.getElementById("player-screen");
const backBtn = document.getElementById("back-btn");

function showPlayerScreen(){
    listScreen.style.display = "none";
    playScreen.style.display = "block";
}

function showListScreen(){
    listScreen.style.display = "block";
    playScreen.style.display = "none";
}

backBtn.addEventListener("click", () => {
    pauseSong();
    showListScreen();
});

const songList = document.querySelector(".song-list");
songList.addEventListener("click", () => {
    pauseSong();
    showListScreen();
})