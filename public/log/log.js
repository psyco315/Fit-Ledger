const backBtn = document.querySelector('.prevPage')

function toggleMark(target) {
    const element = target;
    if (element) {
        element.style.backgroundColor = element.style.backgroundColor === 'green'? 'white': 'green';
    }
}


backBtn.addEventListener('click', ()=>{
    location.assign('../home/index.html')
})

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('.calendar');

    calendar.addEventListener('click', (event) => {
        let selectedDay
        if (event.target.classList[0] === "textCentreBox"){
            selectedDay = event.target.parentElement
        }
        else{
            selectedDay = event.target
        }

        if (event.target !== calendar) {
            toggleMark(selectedDay);
        }
    });
});