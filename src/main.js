import lottie from 'lottie-web'
import gsap from 'gsap'
import animDataYouWin from '../public/lottie/you-win.json'
import animDataYouLose from '../public/lottie/you-lose.json'
import animDataYouDraw from '../public/lottie/you-draw.json'

gsap.registerPlugin()

let lottieContainerWin = document.querySelector(".lottie-container.win")
let animationWin = lottie.loadAnimation({
    container: lottieContainerWin, renderer: 'svg', loop: true, autoplay: true, animationData: animDataYouWin
})

let lottieContainerLose = document.querySelector(".lottie-container.lose")
let animationLose = lottie.loadAnimation({
    container: lottieContainerLose, renderer: 'svg', loop: true, autoplay: true, animationData: animDataYouLose
})

let lottieContainerDraw = document.querySelector(".lottie-container.draw")
let animationDraw = lottie.loadAnimation({
    container: lottieContainerDraw, renderer: 'svg', loop: true, autoplay: true, animationData: animDataYouDraw
})

const YOU_WIN_GAME = 'yasss, you win big time chungus'
const YOU_LOSE_GAME = 'you lost the game... today you a loser hahahahaha'
const YOU_DRAW_GAME = 'nobody wins... you both losers af bro step up'

const YOU_WIN_ROUND = 'you throw hands, no joke!'
const YOU_LOSE_ROUND = 'fuck.. you done got stomped'
const YOU_DRAW_ROUND = 'a fucking tie...'
const USER_CASES = ['draw', 'win', 'lose']
const PC_CASES = ['draw', 'lose', 'win']


let userChoice;
let pcChoice;
let userScore = 0
let pcScore = 0
let rounds = 5;
let roundsLeft = rounds;
const choices = ['roc', 'paepre', 'svizzors']

const userScoreElem = document.querySelector(".user-score")
const pcScoreElem = document.querySelector(".pc-score")
const roundsLeftElem = document.querySelector(".rounds-left")
const cards = document.querySelectorAll(".score-card")
const roundsLeftText = document.querySelector(".rounds-left-text")
const roundsLeftNumber = document.querySelector(".rounds-left")
const notificationArea = document.querySelector(".position-anchor")

const btns = Array.from(document.querySelectorAll(".btn"))

btns.forEach(btn => {

    btn.addEventListener('click', () => submitChoice(btn.getAttribute("choice")))

})

const btnReply = document.querySelector(".btn-reply")

btnReply.addEventListener('click', enableGame)


function submitChoice(currentUserChoice) {

    if (rounds > 0) {
        userChoice = currentUserChoice
        console.log("user: " + userChoice)

        setPcChoice()
        console.log("pc: " + pcChoice)

        updateNotification(userChoice, pcChoice, getWinner(userChoice, pcChoice))

        updateRounds()

    }
}

function updateNotification(userChoice, pcChoice, currentCase) {

    switch (currentCase) {
        case 0: {
            console.log(YOU_DRAW_ROUND)
            constructNotification(userChoice, pcChoice, currentCase)
        }
            break;
        case 1: {
            console.log(YOU_WIN_ROUND)
            constructNotification(userChoice, pcChoice, currentCase)
        }
            break;
        case 2: {
            console.log(YOU_LOSE_ROUND)
            constructNotification(userChoice, pcChoice, currentCase)
        }
    }
}

function constructNotification(userChoice, pcChoice, currentCase) {

    let userResult = USER_CASES[currentCase]
    let pcResult = PC_CASES[currentCase]

    let notifBar = document.createElement("div")
    notifBar.classList.add('notification-bar')

    let userNotif = document.createElement("div")
    userNotif.classList.add('notif-card')
    userNotif.classList.add('user-notification')
    userNotif.classList.add(userResult)
    let userThrewText = document.createElement("p")
    userThrewText.textContent = 'You threw'
    let userThrewChoice = document.createElement("h2")
    userThrewChoice.textContent = userChoice.toString()
    userNotif.appendChild(userThrewText)
    userNotif.appendChild(userThrewChoice)

    let centerNotif = document.createElement("div")
    centerNotif.classList.add('center-notification')
    centerNotif.textContent = [YOU_DRAW_ROUND, YOU_WIN_ROUND, YOU_LOSE_ROUND][currentCase]

    let pcNotif = document.createElement("div")
    pcNotif.classList.add('notif-card')
    pcNotif.classList.add('pc-notification')
    pcNotif.classList.add(pcResult)
    let pcThrewText = document.createElement("p")
    pcThrewText.textContent = 'PC threw'
    let pcThrewChoice = document.createElement("h2")
    pcThrewChoice.textContent = pcChoice.toString()
    pcNotif.appendChild(pcThrewText)
    pcNotif.appendChild(pcThrewChoice)

    notifBar.appendChild(userNotif)
    notifBar.appendChild(centerNotif)
    notifBar.appendChild(pcNotif)


    let previous = notificationArea.firstElementChild
    console.log(previous)

    if (previous) {

        const anim = gsap.to(previous, {
            opacity: 0, scale: 1, duration: 0.2, y: -15, ease: 'power4.out', onComplete: () => {
                previous.remove()
                notificationArea.appendChild(notifBar)
                gsap.set(notifBar, {
                    y: 15, opacity: 0, onComplete: () => {
                        gsap.to(notifBar, {
                            y: 0, opacity: 1, duration: 0.2, ease: 'power4.out'
                        })
                    }
                })

            }
        })
    } else {
        notificationArea.appendChild(notifBar)
        gsap.set(notifBar, {
            y: 25, opacity: 0, onComplete: () => {
                gsap.to(notifBar, {
                    y: 0, opacity: 1, duration: 0.2, ease: 'power2.out',
                })
            }
        })
    }

}

function getWinner(playerChoice, pcChoice) {
    if (playerChoice === pcChoice) {
        return 0
    } else if (userChoice === choices[0] && pcChoice === choices[2] || userChoice === choices[1] && pcChoice === choices[0] || userChoice === choices[2] && pcChoice === choices[1]) {
        userScore++
        userScoreElem.textContent = userScore.toString()
        return 1
    } else {
        pcScore++
        pcScoreElem.textContent = pcScore.toString()
        return 2
    }
}

function setPcChoice() {
    pcChoice = choices[Math.floor(Math.random() * 3)]
}

function disableGame() {
    btns.forEach(btn => {
        btn.classList.toggle("disabled")
    })

    cards.forEach(card => {
        card.classList.toggle("disabled")
    })

    roundsLeftText.textContent = "Go again <3"

    btnReply.classList.toggle("disabled")
    roundsLeftNumber.classList.toggle("disabled")
}

function enableGame() {

    userScore = 0;
    userScoreElem.textContent = userScore.toString()
    pcScore = 0;
    pcScoreElem.textContent = pcScore.toString()
    roundsLeft = rounds;
    roundsLeftElem.textContent = roundsLeft.toString();

    btns.forEach(btn => {
        btn.classList.toggle("disabled")
    })

    cards.forEach(card => {
        card.classList.toggle("disabled")
    })

    btnReply.classList.toggle("disabled")
    roundsLeftText.textContent = "Rounds left"
    roundsLeftNumber.classList.toggle("disabled")

    lottieContainerWin.classList.add("disabled")
    lottieContainerLose.classList.add("disabled")
    lottieContainerDraw.classList.add("disabled")

    gsap.to(notificationArea.firstElementChild, {
        opacity: 0, duration: 0.2, y: -20, ease: 'power2.out', onComplete: () => {
            notificationArea.replaceChildren()
        }
    })


}

function updateRounds() {
    roundsLeft--
    roundsLeftElem.textContent = roundsLeft.toString();

    if (roundsLeft === 0) {
        if (userScore > pcScore) {
            console.log("yasss, you win big time chungus")
            lottieContainerWin.classList.toggle("disabled")
        } else if (pcScore > userScore) {
            console.log("you lost the game... today you a loser hahahahaha")
            lottieContainerLose.classList.toggle("disabled")
        } else {
            console.log("nobody wins... you both losers af bro step up")
            lottieContainerDraw.classList.toggle("disabled")
        }
        disableGame()
    }
}