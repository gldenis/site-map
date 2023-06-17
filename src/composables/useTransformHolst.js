import { reactive, ref } from 'vue'

export default () => {
  const isDragging = ref(false)
  const startPosition = reactive({ x: 0, y: 0 })
  const currentTranslate = reactive({ x: 0, y: 0 })
  let scale = 1

  const startDragging = (event) => {
    if (event.button === 0) {
      isDragging.value = true
      startPosition.x = event.clientX - event.target.offsetLeft
      startPosition.y = event.clientY - event.target.offsetTop
    }
  }

  const stopDragging = () => {
    isDragging.value = false
  }

  const handleMouseMove = (event) => {
    if (isDragging.value) {
      const x = event.clientX - startPosition.x
      const y = event.clientY - startPosition.y
      currentTranslate.x = x
      currentTranslate.y = y
      applyTransform()
    }
  }

  const handleWheel = (event) => {
    const delta = -Math.sign(event.deltaY) // Invert the delta value
    const scaleFactor = 0.1
    const maxScale = 4
    const minScale = 0.25

    const cursorX = event.clientX - event.target.getBoundingClientRect().left
    const cursorY = event.clientY - event.target.getBoundingClientRect().top

    const containerX = (cursorX - currentTranslate.x) / scale
    const containerY = (cursorY - currentTranslate.y) / scale

    scale += delta * scaleFactor
    scale = Math.max(minScale, Math.min(maxScale, scale))

    currentTranslate.x = cursorX - containerX * scale
    currentTranslate.y = cursorY - containerY * scale

    applyTransform()
  }

  const applyTransform = () => {
    const element = document.getElementById('element')
    element.style.transform = `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${scale})`
  }

  const elementStyle = {
    transform: `translate(${currentTranslate.x}px, ${currentTranslate.y}px) scale(${scale})`
  }
}
