import InputRoleSelect from './form/InputRoleSelect.vue'
import InputCompanyJobSelect from './form/InputCompanyJobSelect.vue'
import InputDataAccessRoleSelect from './form/InputDataAccessRoleSelect.vue'

export default {
  install (app) {
    app.component('InputRoleSelect', InputRoleSelect)
    app.component('InputCompanyJobSelect', InputCompanyJobSelect)
    app.component('InputDataAccessRoleSelect', InputDataAccessRoleSelect)
  },
}
