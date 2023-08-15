const playBtn = document.querySelector('.play-btn')
const stopBtn = document.querySelector('.stop-btn')
const recordBtn = document.querySelector('.record-btn')
const closeBtn = document.querySelector('.close-btn')
const resetBtn = document.querySelector('.reset-btn')
const infoBtn = document.querySelector('.info')
const closeInfoBtn = document.querySelector('.info-btn')
const allBtns = [...document.querySelectorAll('.buttons-panel button')]
const welcomeText = document.querySelector('.welcome-text')
const welcomeTextTwo = document.querySelector('.two')
const timerDisplay = document.querySelector('.timer')
const textArray = ['Hi, welcome to my StopWatch project!', 'Press "i" in the right upper corner of stopwatch for more informations']
const historyText = document.querySelector('.history-text')
const recordPanel = document.querySelector('.record-panel')
const infoPanel = document.querySelector('.info-panel')
const ulList = document.querySelector('.record-list')
const shadowBg = document.querySelector('.shadow-bg')


let textIndex = 0
let tableIndex = 0
let minutes = 0
let seconds = 0
let miliseconds = 0
let flag = false
let startTimer
let timeArray = []
let number = 1
let timeArrayIndex = 0

const openingText = () => {
	if (tableIndex === textArray.length) {
		return
	}

	setTimeout(() => {
		const textOne = setInterval(() => {
			welcomeText.textContent += textArray[tableIndex][textIndex]
			textIndex++
			if (textIndex === textArray[tableIndex].length) {
				clearInterval(textOne)
				textIndex = 0
				tableIndex++
			}
		}, 80)
	}, 800)

	setTimeout(() => {
		const textTwo = setInterval(() => {
			welcomeTextTwo.textContent += textArray[tableIndex][textIndex]
			textIndex++
			if (textIndex === textArray[tableIndex].length) {
				clearInterval(textTwo)
			}
		}, 100)
	}, 5000)
}

const timer = () => {
	if (flag === true) {
		playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
		clearInterval(startTimer)
		flag = false
	} else if (flag === false) {
		playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>'
		startTimer = setInterval(startTime, 10)
		allBtns.forEach(btn => {
			btn.style.opacity = '1'
		})
		flag = true
	}

	function startTime() {
		miliseconds++
		if (miliseconds >= 100) {
			miliseconds = 0
			seconds++
			if (seconds >= 60) {
				seconds = 0
				minutes++
				if (minutes >= 60) {
					return
				}
			}
		}

		let m = minutes > 9 ? minutes : `0${minutes}`
		let s = seconds > 9 ? seconds : `0${seconds}`
		let ms = miliseconds > 9 ? miliseconds : `0${miliseconds}`

		timerDisplay.textContent = `${m}:${s}:${ms}`
	}
}

const stopTime = () => {
	historyText.textContent = `Last stopwatch time is ${timerDisplay.textContent}`
	timeArray.push(timerDisplay.textContent)
	clearInterval(startTimer)
	const li = document.createElement('li')
	li.textContent = `Time number ${number++} is: ${timeArray[timeArrayIndex++]}`
	ulList.appendChild(li)
	miliseconds = 0
	seconds = 0
	minutes = 0
	timerDisplay.textContent = `00:00:00`
	playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
	flag = false
}

const recordTime = () => {
	recordPanel.style.left = 50 + '%'
	shadowBg.style.left = 0 + '%'
}

const showInfoPanel = () => {
    infoPanel.style.left = 50 + '%'
    shadowBg.style.left = 0 + '%'
}

const closeRecordPanel = () => {
	recordPanel.style.left = '-' + 50 + '%'
	shadowBg.style.left = '-' + 110 + '%'
    
}

const closeInfo = () => {
    infoPanel.style.left = '-' + 50 + '%'
    shadowBg.style.left = '-' + 110 + '%'
}

const resetAll = () => {
    clearInterval(startTimer)
    seconds = 0;
    miliseconds = 0;
    minutes = 0;
    number = 1;
    ulList.textContent = ''
    timerDisplay.textContent = `00:00:00`
    historyText.textContent = ''
    flag = false;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>'
}

const closeShadow = e => {
	if(e.target === shadowBg){
		recordPanel.style.left = '-' + 50 + '%'
		infoPanel.style.left = '-' + 50 + '%'
	    shadowBg.style.left = '-' + 110 + '%'
	}
}




playBtn.addEventListener('click', timer)
stopBtn.addEventListener('click', stopTime)
recordBtn.addEventListener('click', recordTime)
infoBtn.addEventListener('click', showInfoPanel)
closeBtn.addEventListener('click', closeRecordPanel)
closeInfoBtn.addEventListener('click', closeInfo)
resetBtn.addEventListener('click', resetAll)
openingText()
window.addEventListener('click', closeShadow)


