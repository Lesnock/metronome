const initial = 100
const bar = document.querySelector('.velocity-bar input')
const number = document.querySelector('.velocity-number')
const playButton = document.querySelector('.play-button')
const stopButton = document.querySelector('.stop-button')
const sound = new Audio('sound.wav')

let playing = false
let timeout = null
let velocity = initial

setInitialValue()
addChangeListener()
addButtonsListeners()

function setInitialValue() {
  bar.value = initial
  number.innerText = initial
}

function addChangeListener() {
  bar.addEventListener('input', onChangeVelocity)
}

function addButtonsListeners() {
  playButton.addEventListener('click', play)
  stopButton.addEventListener('click', stop)
}

function onChangeVelocity(event) {
  const { value } = event.target
  velocity = Number(value)
  number.innerText = value
  if (playing) {
    stop()
    play()
  }
}

function getVelocityInMiliSeconds(velocity) {
  return 60 * 1000 / velocity
}

function play() {
  playing = true
  console.log(getVelocityInMiliSeconds(velocity))
  timeout = setInterval(
    emitSound,
    Math.round(getVelocityInMiliSeconds(velocity))
  )
}

function stop() {
  playing = false
  clearInterval(timeout)
}

function emitSound() {
  sound.play()
}

