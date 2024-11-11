<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useSwipe } from '@vueuse/core'
import { ref, computed, nextTick, watch } from 'vue'

const router = useRouter()
const route = useRoute()

const el = ref(null)
const left = ref(0)
const swiping = ref(false)

const opacityChangeBegin = 0.2
const swipeOutThreshold = 0.5
const relativeOffset = computed(() => Math.abs(left.value / el.value?.offsetWidth))
const opacity = computed(() => {
  if (relativeOffset.value < opacityChangeBegin) {
    return 1
  }
  if (relativeOffset.value < swipeOutThreshold) {
    return (swipeOutThreshold - relativeOffset.value) / (swipeOutThreshold - opacityChangeBegin) * 0.8 + 0.2
  }
  return 0;
})

const { isSwiping, direction, lengthX } = useSwipe(
  el,
  {
    passive: true,
    onSwipe(e) {
      left.value = -lengthX.value
      swiping.value = true
    },
    async onSwipeEnd(e, direction) {
      if (relativeOffset.value > swipeOutThreshold) {
        const delta = (direction == 'right') ? -1 : +1
        router.push({ name: 'card', params: {i: Number(route.params.i ?? 0) + delta}})
        left.value = delta * el.value?.offsetWidth
      }
      await nextTick()
      swiping.value = false
      left.value = 0
    }
  }
)

</script>

<template>
  <div class="outer" ref="el">
  <div class="middle" :style="{left: `${left}px`, opacity, transition: `left ${(swiping ? '0s' : '0.5s')}`}">
  <main class="container">
    <RouterView />
  </main>
  </div>
  <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Bottom navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropup">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropup</a>
            <ul class="dropdown-menu">
                                <li><router-link class="dropdown-item" to="/changelog">Changelog</router-link></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </div>
</template>

<style scoped>
.middle {
  position: absolute;
  top: 0;
  height: calc(100% - 56px);
  width: 100%;
  overflow: scroll;
}
.container {
  display: flex;
  flex-direction: column;
}
.outer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: clip;
}

</style>
