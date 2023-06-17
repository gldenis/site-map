<script setup>
import { computed, inject, reactive, ref } from 'vue'

const { node } = defineProps({
  node: {
    type: Object,
    required: true
  }
})

import blocksData from '@/fake-data/blocks.js'
import TreeNode from '@/components/TreeNode.vue'
import { onClickOutside } from '@vueuse/core'
const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    acc[item[key]] = acc[item[key]] ? [...acc[item[key]], item] : [item]
    return acc
  }, {})
}
let blocks = reactive(blocksData)
const blocksGrouped = computed(() => groupBy(blocks, 'nodeId'))

let tree = inject('tree')
let pageActions = inject('pageActions')

const removePage = () => {
  pageActions.remove(node)
}

const shiftIndexOnMove = (movingBlock, blockTo, array) => {
  const { nodeId, index } = blockTo
  const sameNodeElements = array.filter(
    (element) => element.nodeId === nodeId && element.index >= index
  )

  sameNodeElements.forEach((element) => {
    element.index += 1
  })

  const movedBlock = array.find((item) => item.id === movingBlock.id)
  movedBlock.index = index
  movedBlock.nodeId = nodeId

  return array
}

const blocksActions = {
  add(data) {
    blocks.push(data)
  },
  remove(data) {
    const index = blocks.findIndex((item) => item.id === data)
    blocks.splice(index, 1)
  },
  move(data) {
    blocks = shiftIndexOnMove(data.movingBlock, data.to, blocks)
  },
  changeColor(data) {
    console.log(data)
    blocks.find((item) => item.id === data.id).color = data.color
  },
  rename(data, newTitle) {
    blocks.find((item) => item.id === data.id).title = data.title
  }
}
const updateBlocks = (data, action) => {
  blocksActions[action](data)
}

const dropHandler = (e, pageId) => {
  const data = JSON.parse(e.dataTransfer.getData('data'))

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
      blocksActions.add(newBlock)
    }
  }
}
const settings = ref(null)
const showPageSettings = ref(false)
onClickOutside(settings, (event) => (showPageSettings.value = false))
</script>

<template>
  <div v-if="node" class="node__branch" :class="{ 'node__branch-root': !node.parentId }">
    <div
      class="node"
      @click.prevent="showPageSettings = true"
      @mousemove.stop
      @mousedown.stop
      @dragover.prevent
      @drop="dropHandler($event, node.id)"
    >
      <div v-if="showPageSettings" class="page__settings" ref="settings">
        <div @click="removePage">rm</div>
      </div>
      <div class="node__title">{{ node.title }}</div>
      <template v-if="blocksGrouped[node.id]">
        <TreeNode
          v-for="block in blocksGrouped[node.id].sort((a, b) => a.index - b.index)"
          :key="block"
          :block="block"
          :page-id="node.id"
          @updateBlocks="updateBlocks"
        />
      </template>
    </div>
    <div v-if="node.childrenIds?.length" class="node__children">
      <TreeNodes
        v-for="childrenNode of node.childrenIds"
        :key="childrenNode"
        :node="tree[childrenNode]"
      />
    </div>
  </div>
</template>

<style scoped></style>
