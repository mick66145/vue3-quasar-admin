import InputRoleSelect from './form/InputRoleSelect.vue'
import InputCompanyJobSelect from './form/InputCompanyJobSelect.vue'
import InputDataAccessRoleSelect from './form/InputDataAccessRoleSelect.vue'
import ListScrollArea from './scroll-area/ListScrollArea.vue'
import DetailScrollArea from './scroll-area/DetailScrollArea.vue'

export default {
  install (app) {
    app.component('InputRoleSelect', InputRoleSelect)
    app.component('InputCompanyJobSelect', InputCompanyJobSelect)
    app.component('InputDataAccessRoleSelect', InputDataAccessRoleSelect)
    app.component('ListScrollArea', ListScrollArea)
    app.component('DetailScrollArea', DetailScrollArea)
  },
}
