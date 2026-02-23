"use strict"

const cvButton = document.getElementById("nav-cv")
const servicesButton = document.getElementById("nav-services")
const libraryButton = document.getElementById("nav-library")

const hero = document.querySelector(".hero")
const overlay = document.querySelector(".overlay")
const closeIcon = document.querySelector(".close-hero")
const intro = document.querySelector("section.intro")
const heroIntro = document.querySelector(".hero-intro")
const ButtonBackground = document.querySelector(".active-bottom-bg")

const cvSection = document.querySelector(".hero-content-cv")
const servicesSection = document.querySelector(".hero-content-services")

// open menu
let counter = 0

function IntroSwap () {
  intro.classList.toggle("zindex-down")
  heroIntro.classList.toggle("opacity")
}

function HeroOpen (event) {
  hero.classList.add("hero-open")
  overlay.classList.add("opacity")
  cvButton.classList.remove("initial") // prevent cv hover
  hero.scrollTop = 0
  counter++

  if (counter === 1) {
    setTimeout(IntroSwap, 600)
  }

  if (event.target === cvButton) {
    cvButton.classList.add("nav-active") // move active to the middle
    servicesButton.classList.remove("nav-active")

    cvSection.classList.add("display-block") // show section
    servicesSection.classList.remove("display-block")

    cvButton.style.pointerEvents = "none" // disable
    servicesButton.style.pointerEvents = "none"
    setTimeout(() => servicesButton.style.pointerEvents = "auto", 600)
  } else if (event.target === servicesButton) {
    servicesButton.classList.add("nav-active") // move active to the middle
    cvButton.classList.remove("nav-active")

    servicesSection.classList.add("display-block") // show section
    cvSection.classList.remove("display-block")

    servicesButton.style.pointerEvents = "none" // disable
    cvButton.style.pointerEvents = "none"
    setTimeout(() => cvButton.style.pointerEvents = "auto", 600)
  }   
}

function HeroClose (event) {
  cvButton.classList.add("initial") // prevent cv hover

  cvButton.classList.add("nav-active") // back to default order
  servicesButton.classList.remove("nav-active")

  hero.classList.remove("hero-open") // close hero
  overlay.classList.remove("opacity")
  hero.scrollTop = 0
  setTimeout(IntroSwap, 50)
  counter = 0

  cvButton.style.pointerEvents = "auto" // enable all
  servicesButton.style.pointerEvents = "auto"
}

/* hover menu */
function ButtonGoesDown() {
  ButtonBackground.classList.add("move-down")
  ButtonBackground.classList.add("hover-state")
}

function ButtonGoesBack() {
  ButtonBackground.classList.remove("move-down")
  ButtonBackground.classList.remove("hover-state")
}

function cvButtonGoesDown() {
  ButtonBackground.classList.add("hover-state")

  if (!cvButton.classList.contains("initial")) {
    ButtonBackground.classList.add("move-down")
  }
}

cvButton.addEventListener("click", HeroOpen)
servicesButton.addEventListener("click", HeroOpen)
overlay.addEventListener("click", HeroClose)
closeIcon.addEventListener("click", HeroClose)

servicesButton.addEventListener("touchstart", ButtonGoesDown)
servicesButton.addEventListener("mouseover", ButtonGoesDown)
servicesButton.addEventListener("mouseup", ButtonGoesBack)
servicesButton.addEventListener("mouseout", ButtonGoesBack)

cvButton.addEventListener("touchstart", cvButtonGoesDown)
cvButton.addEventListener("mouseover", cvButtonGoesDown)
cvButton.addEventListener("mouseup", ButtonGoesBack)
cvButton.addEventListener("mouseout", ButtonGoesBack)

// copy email function
function copyText (nodeEl) {
  navigator.clipboard.writeText("xiuxiuweb@gmail.com")
  // const hiddenInput = document.querySelector(".copyMaker")
  // hiddenInput.value = "xiuxiuweb@gmail.com"
  // hiddenInput.select()
  // document.execCommand("copy")
  const hinttext = nodeEl.dataset.content
  nodeEl.dataset.content = "copied"
  nodeEl.onmouseout = function() {
    nodeEl.dataset.content = hinttext
  }
} 

// hover links
const links = document.querySelectorAll("a")

for (let link of links) {
  const originalText = link.innerText
  let interval

  link.addEventListener("mouseover", () => {
    const randomInt = max => Math.floor(Math.random() * max)
    const randomFromArray = array => array[randomInt(array.length)]

    const scrambleText = text => {
      const chars = "*?><[]&@#)(0%$-_:/1?!".split("")
      return text.split("").map(x => randomInt(3) > 1 ? randomFromArray(chars) : x).join("")
    }

    interval = setInterval(() =>
      link.innerText = scrambleText(originalText), 50)
  })

  link.addEventListener("mouseout", () => {
    clearInterval(interval)
    link.innerText = originalText
  })

  link.addEventListener("touchend", () => {
    clearInterval(interval)
    link.innerText = originalText
  })
}

// clock
function currentTime() {
  const GTM = 2
  const date = new Date()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()

  const timeZone = -date.getTimezoneOffset() / 60

  if (timeZone !== GTM) {
  	hour = hour - timeZone + GTM
  }

  if (hour % 1 !== 0) {
    if (hour % 0.5 !== 0) {
      min = min + 15
    }
    else {
      min = min + 30
    }

    if (min >= 60) {
      hour = hour + 1
      min = min - 60
    }

    hour = Math.floor(hour)
  }

  if (hour < 0) {
    hour = hour + 24
  } else if (hour > 23) {
    hour = hour - 24
  }

  hour = updateTime(hour)
  min = updateTime(min)
  sec = updateTime(sec)

  document.getElementById("clock").innerText = hour + ":" + min + ":" + sec
  setTimeout(currentTime, 1000)
}

function updateTime(k) { // add 0 before elems < 10
  return k < 10 ? "0" + k : k
}

currentTime()

// typed text
class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = "!<>-_\\/[]{}—=+*^?#________"
    this.update = this.update.bind(this)
  }

  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise(resolve => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ""
      const to = newText[i] || ""
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({
        from,
        to,
        start,
        end
      })
    }

    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }

  update() {
    let output = ""
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from,
        to,
        start,
        end,
        char
      } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }

    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

const phrases = ["HR", "DESIGNER", "FRIEND", "COFFEE DRINKER", "DEVELOPER", "IT RECRUITER"]
const el = document.getElementById("typed-text")
const fx = new TextScramble(el)
let phrasesCounter = 0

function next () {
  fx.setText(phrases[phrasesCounter]).then(() => {
    setTimeout(next, 2000)
  })
  phrasesCounter = (phrasesCounter + 1) % phrases.length
}

next()
