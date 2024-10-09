const trackBtn = document.querySelector('.trackBtn')
const trackOptions = document.querySelector('.trackOptions')
const logBtn = document.querySelector('.logBtn')
const weightBtn = document.querySelector('.weight')
const heightBtn = document.querySelector('.height')
const bodyBtn = document.querySelector('.bdy')
const title = document.querySelector('#projTitle')

const switchOptions = ()=>{
    trackBtn.style.display = "none"
    trackOptions.style.display = "flex"
}

const switchOptionsBack = ()=>{
    trackBtn.style.display = "flex"
    trackOptions.style.display = "none"
}

function openTrack(param) {
    location.assign(`../track/track.html?key=${param}`);
}

function openLog() {
    location.assign('../log/log.html');
}

function showAlert(){
    alert('Work in Progres!')
}

title.addEventListener('click', switchOptionsBack)
trackBtn.addEventListener('click', switchOptions)
logBtn.addEventListener('click', showAlert)
weightBtn.addEventListener('click', ()=> openTrack('weight'))
heightBtn.addEventListener('click', ()=> openTrack('height'))
bodyBtn.addEventListener('click', ()=> openTrack('shoulder'))
