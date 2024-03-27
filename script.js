//script here if needed
//ideas:
//start with an introduction page and a start button. will need states
//- drag human and body textboxes to fillers under two images, then checks if correct when both are in
//- literally jjust simple A or B options for a simple image
//- idk nothing too crazy dont kys over this one

//for style (idk how to comment) 
//- simple tumblr-style minimalist central square box, reuse the old one I have thats circular?
//- double borders to make it cute
//- blue-gray

//find all the components of each state and add them to a respective array
//when changing page, turn all in activePage to false, state++, pages[state] to activePage, show all

//MAN or RIVER
const questions = [
    { //0
        interlude: false,
        img: 'images/1a.jpg',
        vid: 'images/1b.mp4',
        answer: 'RIVER'
    },
    { //1
        interlude: false,
        img: 'images/2a.jpg',
        vid: 'images/2b.mp4',
        answer: 'MAN'
    },
    { //2
        interlude: false,
        img: 'images/3a.jpg',
        vid: 'images/3b.mp4',
        answer: 'RIVER'
    },
    { //3
        interlude: true,
        vid: 'images/3c_Interlude.mp4',
        title: `What Do You Think?`,
        desc: `The Lachine Canal was initially created in 1825 as a means to transport goods and allow boats to bypass the Lachine Rapids - a human design of colonization and industrialization. 
        \nIn its current day, the canal acts as man made ecological identity - hosting both man and nature simultaneously.`
    },
    { //4
        interlude: false,
        img: 'images/4a.jpg',
        vid: 'images/4b.mp4',
        answer: 'MAN'
    },
    { //5
        interlude: false,
        img: 'images/5a.jpg',
        vid: 'images/5b.mp4',
        answer: 'RIVER'
    },
    { //6
        interlude: true,
        vid: 'images/5c_Interlude.mp4',
        title: `What Do You Feel?`,
        desc: `us Mestizos, \nus hide-aways \nus children with many hand-me-down-lands \nwe live in the liminal space \n\n
        ‍only In Between \nwe have room to unfurl all the flags that are bound to us \nmine rise overhead in this small backyard of Saint-Laurent \nover the dying mangoes \nover the lush raspberries \n\n
        ‍there are no roots at the bottom of this garden \nso we must grow downwards, always \ntowards all the soils \n\n`
    },
    { //7
        interlude: false,
        img: 'images/6a.jpg',
        vid: 'images/6b.mp4',
        answers: ['river', 'man'] //DRAG QUESTION
    },
    { //8
        interlude: true,
        vid: 'images/6c_Final.mp4',
        title: `What Comes Next?`,
        desc: `Humans create, nature endures. Can man and nature co-exist peacefully, or is the Lachine Canal an example of an unsolvable paradox. What do we do with the space in between man and nature?\n\n`
    }
]

const imageEl = document.getElementById('img');
const videoEl = document.getElementById('video');
const titleEl = document.getElementById('title');
const answersEl = document.getElementById('answer-btns'); //if I want to hide them
const buttonsEl = document.querySelectorAll('.btn'); //list of all buttons
const nextEl = document.getElementById("next");
const interEl = document.getElementById("interlude");

//drag
const dragboxEl = document.getElementById("answer-drag");
const dragEl = document.querySelectorAll(".drag"); 
const leftEl = document.getElementById("left");
const rightEl = document.getElementById("right");
let leftright = [leftEl, rightEl];

//active question
let active = 0;
//current score
let score = 0;

buttonsEl.forEach(button => {
    button.addEventListener("click", () => {selectAnswer(button)});
});

nextEl.addEventListener("click", nextQuestion);

dragEl.forEach(drag => {
    drag.addEventListener('dragstart', event => {
        event.dataTransfer.setData("text/plain", drag.id);
    });
});

leftright.forEach(el =>{
    el.addEventListener('dragover', event => {
        event.preventDefault();
    });

    el.addEventListener('drop', event => {
        event.preventDefault();
        const droppedID = event.dataTransfer.getData("text/plain");
        const dropEl = document.getElementById(droppedID);
        el.appendChild(dropEl);

        checkDrop();
    });
});

function start() {
    active = 0; //TESTING
    score = 0;
    activeQuestion();
}

function activeQuestion() {
    titleEl.innerText = "MAN OR RIVER?";
    answersEl.style.visibility = 'visible';
    dragboxEl.style.display = "none";
    interEl.innerText = "";
    interEl.style.visibility = 'hidden';
    imageEl.src = questions[active].img;
    videoEl.src = questions[active].vid;
    videoEl.load();
    videoEl.pause();
}

function selectAnswer(e) {
    console.log('clicked');

    if(e.innerText == questions[active].answer) {
        console.log('correct');
        e.classList.add("correct");
        score++;
    }
    else e.classList.add("incorrect");

    revealAnswer();
}

function revealAnswer() {
    buttonsEl.forEach(button => {
        button.disabled = true;
        button.classList.remove("hover");
    });

    imageEl.style.visibility = "hidden";
    videoEl.style.visibility = "visible";
    videoEl.play();

    setTimeout(() => {
        nextEl.style.visibility = "visible";
    }, 4000);
}

function nextQuestion() {
    active++;
    if(active == 7) setUpDrag();
    else if(questions[active].interlude) activeInterlude();
    else setupNext();
}

function setUpDrag() {
    titleEl.style.display = "none";
    interEl.innerText = "";
    answersEl.style.display = "none";
    dragboxEl.style.display = "block";
    nextEl.style.visibility = "hidden";
    interEl.style.visibility = 'hidden';
    imageEl.src = questions[active].img;
    videoEl.src = questions[active].vid;
    videoEl.load();
    videoEl.pause();
}

function checkDrop() {
    if(leftEl.firstChild && rightEl.firstChild) {
        console.log('checking');
        if(leftEl.firstChild.id == questions[active].answers[0] &&
            rightEl.firstChild.id == questions[active].answers[1]) {
                score++;
                document.getElementById("man").classList.add("correct");
                document.getElementById("river").classList.add("correct");
            }
        else {
            document.getElementById("man").classList.add("incorrect");
            document.getElementById("river").classList.add("incorrect");
        }

        imageEl.style.visibility = "hidden";
        videoEl.style.visibility = "visible";
        videoEl.play();

        setTimeout(() => {
            nextEl.style.visibility = "visible";
        }, 4000);
    }
}

function setupNext() {
    buttonsEl.forEach(button => {
        button.disabled = false;
        button.classList.add("hover");
        if(button.classList.contains("correct")) button.classList.remove("correct");
        if(button.classList.contains("incorrect")) button.classList.remove("incorrect");
    });

    nextEl.style.visibility = "hidden";
    activeQuestion();
}

function activeInterlude() {
    videoEl.src = questions[active].vid;
    videoEl.load();
    videoEl.play();

    titleEl.style.display = "block";
    titleEl.style.innerText = questions[active].title;
    answersEl.style.visibility = "hidden";
    interEl.style.visibility = "visible";
    interEl.innerText = questions[active].desc;

    if(active == 6) {
        interEl.innerHTML += `(An excerpt from the poem <a href='https://www.untoldstoriesmtl.com/en/centuries/poems'>“there are no roots at the bottom of this garden”</a> by Montreal poet Florence M. Rosalie.)`;
    }
    else if(active == 8) { 
        dragboxEl.style.display = "none";
        interEl.innerHTML += `\n\nYou got ${score} questions correct out of 6.`

        nextEl.innerText = "AGAIN?";
        nextEl.addEventListener("click", () => {location.reload()});
    }
}

start();