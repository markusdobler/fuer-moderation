<script setup>
  import { changes, reset_changelog } from '@/db.js'
</script>

<template>
  <button @click="reset_changelog">Reset</button>
  <ol>
    <li v-for="change,i in changes" :key="i">
      {{change}}
    </li>
  </ol>
</template>
