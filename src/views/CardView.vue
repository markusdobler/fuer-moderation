<script setup>
const props = defineProps({
  i: Number
})
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()




import MarkdownIt from "markdown-it"
const markdown = new MarkdownIt

import all_speaker_notes from '@/speaker-notes.yaml'

const begin_time = ref(8*60 + 30)

const speaker_notes = computed(() => all_speaker_notes[props.i])
const planned_begin_time = computed(() => all_speaker_notes.slice(0, props.i).reduce((a,b)=>a+b.duration, begin_time.value))
const planned_end_time = computed(() => planned_begin_time.value + speaker_notes.value.duration)

function time(t) {
  return `${Math.floor(t/60)}:${t%60}`
}
import { add_change } from '@/db.js'
watch(
  () => route.params,
  async (new_params, old_params) => {
   add_change(old_params, new_params)
  }
)
</script>

<template>
  <div v-if="speaker_notes">
    <h1>{{i}}: {{speaker_notes.title}}</h1>
    <h2>{{time(planned_begin_time)}} - {{time(planned_end_time)}}</h2>
    <div v-html="markdown.render(speaker_notes.notes||'')"/>
  </div>
  <div v-else>
   xxx {{i}}/{{all_speaker_notes.length}}
  </div>
</template>
