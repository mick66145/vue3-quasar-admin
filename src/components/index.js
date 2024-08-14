import InputRoleSelect from './form/InputRoleSelect.vue'
import InputCompanyJobSelect from './form/InputCompanyJobSelect.vue'

export default {
  install (app) {
    app.component('InputRoleSelect', InputRoleSelect)
    app.component('InputCompanyJobSelect', InputCompanyJobSelect)
  },
}
