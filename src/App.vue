<template>
  <message-dialog />
  <router-view />
  <div v-show="MODE!=='production'" class="mark">{{ envLabel }}</div>
</template>

<script>
import { defineComponent } from 'vue-demi'
import { RouterView } from 'vue-router'
import useEnv from '@/hooks/useEnv'

export default defineComponent({
  setup () {
    // data
    const envMap = {
      localhost: 'LOCAL',
      dev: 'DEV',
      beta: 'BETA',
    }
    const { MODE } = useEnv()
    const envLabel = envMap[MODE] || ''

    return {
      RouterView,
      envLabel,
      MODE,
    }
  },
})
</script>

<style lang="postcss" scoped>
.mark {
  @apply fixed top-[70px] left-[-25px] ;
  @apply bg-[rgba(255,69,0,0.7)] text-white ;
  @apply px-[50px] py-2 text-sm font-bold;
  @apply uppercase rounded shadow-md z-[5000] -rotate-45 origin-top-left;
}
</style>
