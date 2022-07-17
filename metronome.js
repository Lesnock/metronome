const initial = 100
const bar = document.querySelector('.velocity-bar input')
const number = document.querySelector('.velocity-number')
const playButton = document.querySelector('.play-button')
const stopButton = document.querySelector('.stop-button')
const sound = new Audio('sound.wav')

let playing = false
let velocity = initial
let interval = getVelocityInMiliSeconds(initial)
let lastFiredTime = 0

setInitialValue()
addChangeListener()
addButtonsListeners()
requestAnimationFrame(loop)

function loop(timestamp) {
  if (timestamp - lastFiredTime >= interval) {
    fire(timestamp)
  }
  requestAnimationFrame(loop)
}

function fire(timestamp) {
  lastFiredTime = timestamp
  if (playing) {
    stopSound()
    emitSound()
  }
}

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
  interval = getVelocityInMiliSeconds(velocity)
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
}

function stop() {
  playing = false
}

function emitSound() {
  sound.play()
}

