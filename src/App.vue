<script setup>
import { computed, provide, reactive, ref } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import componentList from '@/fake-data/components.js'
import {
  startPosition,
  currentTranslate,
  startDragging,
  stopDragging,
  handleMouseMove,
  handleWheel
} from '@/composables/useTransformHolst.js'

const components = reactive(componentList)
const selectedComponentId = ref(null)

const selectComponent = (id) => {}

const dragStartHandler = (component, e) => {
  const data = {
    type: 'component',
    data: component
  }
  // e.dataTransfer.clearData()
  e.dataTransfer.setData('data', JSON.stringify(data))
}

const dragOverHandler = (e) => {
  if (e.target.closest('.block')) {
    e.target.closest('.block').classList.add('overed')
  }
}
const dragLeaveHandler = (e) => {
  if (e.target.closest('.block')) {
    e.target.closest('.block').classList.remove('overed')
  }
}
const dropHandler = (e, id) => {
  console.log(123)
}
const dragEndHandler = (e) => {
  // console.log(e)
}

let selectedBlock = ref(null)
const selectBlock = (block) => {
  selectedBlock.value = { ...block }
}

const applySettings = () => {
  console.log(selectedBlock.value)
  const selectedBlockIndex = pages[0].blocks.findIndex(
    (block) => block.id === selectedBlock.value.id
  )
  pages[0].blocks[selectedBlockIndex] = { ...selectedBlock.value }
}

const update = (data) => {
  console.log(data)
}
const groupById = (array) => {
  return array.reduce((obj, value) => {
    obj[value.id] = value
    return obj
  }, {})
}
import pagesData from '@/fake-data/pages.js'
const pages = reactive(groupById(pagesData))
const pageActions = {
  remove(page) {
    const { parentId } = page
    if (parentId) {
      pages[parentId].childrenIds = pages[parentId].childrenIds.filter((item) => item !== page.id)
    }
    delete pages[page.id]
  }
}
provide('tree', pages)
provide('pageActions', pageActions)
import TreeNodes from '@/components/TreeNodes.vue'

const transform = reactive({
  scale: 1,
  translateX: 0,
  translateY: 50
})
const area = ref(null)
const wheelHandler = (event) => {
  console.log(event)
  if (event.ctrlKey) {
    const delta = -Math.sign(event.deltaY)
    transform.scale += delta * 0.1

    const rect = area.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    transform.scale = Math.min(Math.max(0.2, transform.scale), 2)

    transform.translateX = (1 - transform.scale) * mouseX
    transform.translateY = (1 - transform.scale) * mouseY
  }
}

const leftMouseButtonPressed = ref(false)
const pointerPositionStart = reactive({
  x: 0,
  y: 0
})
const transformStart = {
  x: transform.translateX,
  y: transform.translateY
}

const mouseDownHandler = (e) => {
  if (e.button === 0) {
    leftMouseButtonPressed.value = true
    pointerPositionStart.x = e.pageX
    pointerPositionStart.y = e.pageY

    transformStart.x = transform.translateX
    transformStart.y = transform.translateY
  }
}

const mouseUpHandler = (e) => {
  if (e.button === 0) {
    leftMouseButtonPressed.value = false
  }
}

const mouseMoveHandler = (e) => {
  if (leftMouseButtonPressed.value) {
    const deltaX = e.pageX - pointerPositionStart.x
    const deltaY = e.pageY - pointerPositionStart.y

    transform.translateX = deltaX / transform.scale + transformStart.x
    transform.translateY = deltaY / transform.scale + transformStart.y
  }
}
</script>

<template>
  <header class="header page__header">qwe</header>
  <aside class="page__components components">
    <section class="components__section">
      <h3 class="components__title">Components</h3>
      <div class="components__container">
        <div
          v-for="component of components"
          :key="component.id"
          class="component"
          :data-title="component.title"
          draggable="true"
          @dragstart="dragStartHandler(component, $event)"
          @dragend="dragEndHandler"
        >
          <div>{{ component.title }}</div>
          <AppIcon :name="component.icon" />
        </div>
      </div>
    </section>
  </aside>
  <main
    class="page__content holst"
    @wheel.prevent="wheelHandler"
    @mousemove="mouseMoveHandler"
    @mousedown="mouseDownHandler"
    @mouseup="mouseUpHandler"
  >
    <div
      ref="area"
      class="page"
      :style="{
        transform: `scale(${transform.scale}) translateX(${transform.translateX}px) translateY(${transform.translateY}px)`,
        transformOrigin: 'center center'
      }"
    >
      <div>
        <TreeNodes :node="pages['1']" />
      </div>
    </div>
  </main>
  <aside class="settings page__settings">
    <div v-if="selectedBlock">
      <h3>Settings</h3>
      <form action="" @submit.prevent="applySettings">
        <div v-for="(value, key) in selectedBlock" :key="key">
          <input v-model="selectedBlock[key]" :disabled="key === 'id' || key === 'component'" />
        </div>
        <div>
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  </aside>
  <footer class="footer page__footer">footer</footer>
</template>

<style scoped></style>
