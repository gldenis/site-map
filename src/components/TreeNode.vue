<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import colorsData from '@/fake-data/colors.js'
const colors = reactive(colorsData)

const { block, pageId } = defineProps({
  block: {
    type: Object,
    required: true
  },
  pageId: {
    type: [String, Number]
  }
})

const emit = defineEmits(['updateBlocks'])
const selectBlock = (asd) => {}
const dragEnterHandler = (e) => {
  // const dataTransfer = JSON.parse('{}')
  // // console.log(dataTransfer, e.dataTransfer)
  // const targetBlock = e.target.closest('.block__wrapper')
  // if (targetBlock) {
  //   targetBlock.classList.add('block__target')
  // }
}
const dragStartHandler = (e, block) => {
  const data = {
    type: 'block',
    data: block
  }
  e.dataTransfer.setData('data', JSON.stringify(data))
}

const dragLeaveHandler = (e) => {}

const dropHandler = (blockId, pageId, $event) => {
  const data = JSON.parse($event.dataTransfer.getData('data'))

  if (data) {
    if (data.type === 'component') {
      const newBlock = {
        id: Date.now(),
        components: [data.data.icon],
        title: data.data.title,
        color: 'blue',
        index: 3,
        nodeId: pageId
      }
      emit('updateBlocks', newBlock, 'add')
    }

    if (data.type === 'block') {
      emit('updateBlocks', { movingBlock: data.data, to: block }, 'move')
    }
  }
}
const removeBlock = () => {
  emit('updateBlocks', block.id, 'remove')
}
const settings = ref(null)
const showSettings = ref(false)
const openSettings = (e) => {
  settings.value?.focus()
  showSettings.value = true
}
onClickOutside(settings, (event) => (showSettings.value = false))

const showColorSelect = ref(false)
const changeColor = (colorName) => {
  const data = {
    id: block.id,
    color: colorName
  }
  emit('updateBlocks', data, 'changeColor')

  showColorSelect.value = false
}

const rename = (e) => {
  console.log(e.target.innerText)
  const data = {
    id: block.id,
    title: e.target.innerText.trim()
  }
  emit('updateBlocks', data, 'rename')
}
</script>

<template>
  <div
    class="block__wrapper"
    @click.stop="openSettings"
    @dragstart="dragStartHandler($event, block)"
    @dragenter.prevent="dragEnterHandler($event)"
    @dragover.prevent
    @dragleave="dragLeaveHandler($event)"
    @drop.stop="dropHandler(block.id, pageId, $event)"
    draggable="true"
  >
    <div class="block__dropzone"></div>
    <div
      class="block"
      :class="`block-${block.id}`"
      :style="`background-color: ${colors[block.color]}`"
    >
      <div v-show="showSettings" class="block__settings" ref="settings" tabindex="1">
        <div>
          <div
            @click="showColorSelect = true"
            class="color__current"
            :style="{ backgroundColor: colors[block.color] }"
          ></div>
          <div v-if="showColorSelect" class="color__select">
            <div
              v-for="(color, colorName) in colors"
              :key="colorName"
              @click="changeColor(colorName)"
              class="color__option"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </div>
        <AppIcon @click.stop="removeBlock" name="delete" width="20" height="20" color="red" />
      </div>
      <div class="block__title" contenteditable="true" @blur="rename($event)" @click.stop>
        {{ block.title }}
      </div>
      <AppIcon v-for="icon of block.components" :name="icon" />
    </div>
    <div class="block__dropzone"></div>
  </div>
</template>

<style scoped></style>
