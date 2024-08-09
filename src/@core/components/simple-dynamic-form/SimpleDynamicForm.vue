<template>
  <simple-form :models="models" :store="storeForm" />
</template>

<script>
import SimpleForm from './components/SimpleForm.vue';
import { defineComponent } from 'vue-demi'
import { useFormStore } from './stores/form'
export default defineComponent({
  components: {
    SimpleForm,
  },
  props: {
    id: { type: String, default : "simpleDynamicForm" },
    models: { type: Array, default() { return [] } },
  },
  emits: [],
  setup(props) {

    //data 
    const storeForm = useFormStore(props.id)

    const getModels = () =>{
      return storeForm.getFormModels()
    }
    const getFormData = () =>{
      return storeForm.getFormData()
    }
    
    return {
      storeForm,
      getModels,
      getFormData,
    }
  },
})
</script>

<style lang="postcss" scoped></style>
