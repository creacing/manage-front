<template>
  <el-dialog
    @close="close"
    @open="open"
    :close-on-click-modal="false"
    :model-value="props.visible"
    :width="props.width"
    :custom-class="className"
    :modal="modal"
    :top="top"
  >
    <template #title>
      <keep-alive>
        <div ref="headerRef" class="header">
          <span class="font16 cfff fwb">{{ props.title }}</span>
          <slot name="stitle"></slot>
        </div>
      </keep-alive>
    </template>
    <slot></slot>
    <template v-if="showBtn" #footer>
      <slot name="el-footer">
        <span class="dialog-footer">
          <el-button :loading="loading" class="btn-default" @click.stop="cancel">取消</el-button>
          <el-button :loading="loading" class="btn-primary" @click.stop="submit">确定</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  watchEffect,
  onBeforeUnmount
} from 'vue'
const $emit = defineEmits(['close', 'submit'])
const headerRef = ref(null)
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '30%'
  },
  title: String,
  showBtn: {
    type: Boolean,
    default: true
  },
  className: String,
  showHeader: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: false
  },
  modal: {
    type: Boolean,
    default: true
  },
  top: {
    type: String,
    default: '15vh'
  },
  drag: {
    type: Boolean,
    default: true
  },
  loading: Boolean
})
function cancel () {
  $emit('close', 'false')
}
function submit () {
  $emit('submit', 'false')
}
function close () {
  offDraggable()
  $emit('close')
}
function open () {
  onDraggable()
}
let transform = reactive({
  offsetX: 0,
  offsetY: 0
})
const onMousedown = (e) => {
  const dialogHeader = headerRef.value
  // 弹窗的容器
  const domDrag = dialogHeader.parentNode.parentNode
  const downX = e.clientX
  const downY = e.clientY
  const { offsetX, offsetY } = transform

  const targetRect = domDrag.getBoundingClientRect()
  const targetLeft = targetRect.left
  const targetTop = targetRect.top
  const targetWidth = targetRect.width
  const targetHeight = targetRect.height

  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight

  const minLeft = -targetLeft + offsetX
  const minTop = -targetTop + offsetY
  const maxLeft = clientWidth - targetLeft - targetWidth + offsetX
  const maxTop = clientHeight - targetTop - targetHeight + offsetY
  // 鼠标拖出浏览器外部的时候会选中文本，需要禁用
  document.body.style.userSelect = 'none'
  const onMousemove = (e) => {
    const moveX = Math.min(Math.max(offsetX + e.clientX - downX, minLeft), maxLeft)
    const moveY = Math.min(Math.max(offsetY + e.clientY - downY, minTop), maxTop)
    transform.offsetX = moveX
    transform.offsetY = moveY
    domDrag.style.transform = `translate(${moveX}px, ${moveY}px)`
  }
  const onMouseup = () => {
    document.body.style.userSelect = 'text' // 恢复body可选中
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
const onDraggable = () => {
  const dialogHeader = headerRef.value
  dialogHeader.addEventListener('mousedown', onMousedown)
}

const offDraggable = () => {
  const dialogHeader = headerRef.value
  const domDrag = dialogHeader.parentNode.parentNode
  dialogHeader.removeEventListener('mousedown', onMousedown)
  transform.offsetX = 0
  transform.offsetY = 0
  domDrag.style.transform = `translate(0px, 0px)`
}
onMounted(() => {
  watchEffect(() => {
    onDraggable()
  })
})
//两层及以上的弹框使用
onBeforeUnmount(() => {
  offDraggable()
})
</script>

<style lang="scss">
.el-overlay {
  overflow: hidden !important;
}
.el-dialog {
  display: flex;
  flex-direction: column;
  max-height: 80%;
  overflow: hidden;
  .el-dialog__header {
    position: relative;
    height: 44px;
    line-height: 44px;
    padding: 0px;
    background-color: #002c44;
    .el-dialog__headerbtn {
      top: 0;
      .el-icon-close {
        font-size: 20px;
      }
    }
    .header {
      padding: 0 10px;
      cursor: all-scroll;
    }
  }
  .el-dialog__body {
    max-height: 80%;
    margin: 10px;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
