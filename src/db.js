import { ref, toValue } from 'vue'

const existing_log = window.localStorage.getItem("changelog") ?? "[]"
export const changes = ref(JSON.parse(existing_log))

export async function reset_changelog() {
  window.localStorage.removeItem("changelog")
  changes.value = []
}

export async function add_change(old_value, new_value) {
  changes.value.push([new Date(), old_value, new_value])
  window.localStorage.setItem("changelog", JSON.stringify(toValue(changes)))
}
