"use strict"

// draggable
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, startX = 0, startY = 0
  let isMobile = false

  element.addEventListener('mousedown', startDrag)
  element.addEventListener('touchstart', startDrag)

  function startDrag(e) {
    if (e.constructor.name === 'MouseEvent') {
      isMobile = false
      e.preventDefault()
      startX = e.clientX - offsetX
      startY = e.clientY - offsetY
      document.addEventListener('mousemove', drag)
      document.addEventListener('mouseup', stopDrag)
    } else {
      isMobile = true
      startX = e.touches[0].clientX - offsetX
      startY = e.touches[0].clientY - offsetY
      window.addEventListener('touchmove', drag, { passive: false })
      window.addEventListener('touchend', stopDrag)
    }
  }

  function drag(e) {
    e.preventDefault()
    e.stopImmediatePropagation()
    document.body.style.overflow = 'hidden'
    const computedX = isMobile ? e.touches[0].clientX : e.clientX
    const computedY = isMobile ? e.touches[0].clientY : e.clientY

    const x = computedX- startX
    const y = computedY - startY
    offsetX = computedX - startX
    offsetY = computedY - startY
    element.style.transform = `translate(${x}px, ${y}px) rotate(-15deg)`
  }

  function stopDrag() {
    document.body.style.overflow = ''
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
    window.removeEventListener('touchmove', drag, { passive: false })
    window.removeEventListener('touchend', stopDrag)
  }
}

makeDraggable(document.getElementById('job-sticker'))

// close job sticker 
const stickerClose = document.getElementById('sticker-close')

stickerClose.addEventListener('click', () => {
  const sticker = document.getElementById('job-sticker')
  sticker.classList.add('closed')
  const currentStyle = sticker.style.transform
  sticker.style.transform = `${currentStyle ? currentStyle : 'rotate(-15deg)'} scale(0)`
})
