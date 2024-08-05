
<template>
  <q-item
    v-ripple
    :to="to"
    class="rounded-lg my-1 !px-3.5"
    clickable
    active-class="bg-primary text-white"
  >
    <q-item-section avatar>
      <q-icon :name="icon" size="1.4rem" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue-demi'
export default defineComponent({
  props: {
    to: { type: String, required: true },
    icon: { type: String },
    title: { type: String, default: '' },
  },
  setup () {
    return {
    }
  },
})
</script>
