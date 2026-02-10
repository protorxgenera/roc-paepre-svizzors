// console.log(`hi :) today we are going to play rock paepre svizzors`)
//
//
// let rounds = 5
// let options = ['rock', 'paper', 'scissors'];
//
// let userScore = 0;
// let computerScore = 0;
//
//
// while (rounds > 0) {
//     let userChoice = getUserChoice();
//
//     let computerChoice = getComputerChoice();
//
//     compareChoices(userChoice, computerChoice);
//
//     giveScore();
//
//     rounds--
// }
//
//
// // private functions
//
// // function printInstructions(rounds, userScore, computerScore) {
// //     console.log(`You have ${rounds} left :) | your score: ${userScore} | computer's score: ${computerScore}`)
// // }
//
//
// function getComputerChoice() {
//     return Math.floor(Math.random() * 3)
// }
//
// function getUserChoice() {
//     return prompt("Input your choice below :)")
// }
//
// function compareChoices(userChoice, computerChoice) {
//     if (computerChoice === userChoice) {
//         console.log(`Nobody takes the point, you both threw ${options[userChoice]}`)
//     } else if (Math.abs(computerChoice - userChoice === 1)) {
//         if (userChoice > computerChoice) {
//             updateUserScore(userChoice, computerChoice)
//         } else {
//             updateCompScore(userChoice, computerChoice)
//         }
//     } else {
//         if (userChoice > computerChoice) {
//             updateCompScore(userChoice, computerChoice)
//         } else {
//             updateUserScore(userChoice, computerChoice)
//         }
//     }
// }
//
// function updateUserScore(user, comp) {
//     userScore++
//     console.log(`You got it! You threw ${options[user]} while the PC threw ${options[comp]}`)
// }
//
// function updateCompScore(user, comp) {
//     console.log(`Sad! You threw ${options[user]} while the PC threw ${options[comp]}`)
//     computerScore++
// }
//
// function giveScore() {
//     console.log(`Your score: ${userScore} // PC score: ${computerScore}`)
// }
