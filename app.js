////Quiz//////
///From Youtube: https://www.youtube.com/watch?v=f4fB9Xg2JEY&t=2205s
///This code organizes questions that tracks points that creates a score.
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
    question: 'What does 2+2=?',
    choice1: '4',
    choice2: '7',
    choice3: '3',
    answer: 1,
},
{
    question: 'What does 5+5=?',
    choice1: '6',
    choice2: '3',
    choice3: '10',
    answer: 3,
},
{
    question: 'What does 7+2=?',
    choice1: '5',
    choice2: '9',
    choice3: '1',
    answer: 2,
},
{
    question: 'What does 3+3=?',
    choice1: '4',
    choice2: '6',
    choice3: '3',
    answer: 2,
},
{
    question: 'What does 9+2=?',
    choice1: '11',
    choice2: '3',
    choice3: '4',
    answer: 1,
},
{
    question: 'What does 4+4=?',
    choice1: '2',
    choice2: '8',
    choice3: '1',
    answer: 2,
},
{
    question: 'What does 6+5=?',
    choice1: '1',
    choice2: '3',
    choice3: '11',
    answer: 3,
},
{
    question: 'What does 8+8=?',
    choice1: '3',
    choice2: '5',
    choice3: '16',
    answer: 3,
},
{
    question: 'What does 1+1=?',
    choice1: '2',
    choice2: '7',
    choice3: '3',
    answer: 1,
},
{
    question: 'What does 4+6=?',
    choice1: '7',
    choice2: '10',
    choice3: '5',
    answer: 2,
},
{
    question: 'What does 9+1=?',
    choice1: '2',
    choice2: '10',
    choice3: '3',
    answer: 2,
},
{
    question: 'What does 10+1=?',
    choice1: '2',
    choice2: '5',
    choice3: '11',
    answer: 3,
},
{
    question: 'What does 3+9=?',
    choice1: '12',
    choice2: '1',
    choice3: '5',
    answer: 1,
},
{
    question: 'What does 10+9=?',
    choice1: '4',
    choice2: '1',
    choice3: '19',
    answer: 3,
},
{
    question: 'What does 10+10=?',
    choice1: '20',
    choice2: '7',
    choice3: '6',
    answer: 1,
},
{
    question: 'What does 11+10=?',
    choice1: '10',
    choice2: '3',
    choice3: '21',
    answer: 3,
},
{
    question: 'What does 3+10=?',
    choice1: '10',
    choice2: '13',
    choice3: '2',
    answer: 2,
},
{
    question: 'What does 3+17=?',
    choice1: '5',
    choice2: '20',
    choice3: '9',
    answer: 2,
},
{
    question: 'What does 3+6=?',
    choice1: '5',
    choice2: '7',
    choice3: '9',
    answer: 3,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score

}





startGame()