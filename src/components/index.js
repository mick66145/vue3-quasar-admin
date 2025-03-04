import InputRoleSelect from './form/InputRoleSelect.vue'
import InputCompanyJobSelect from './form/InputCompanyJobSelect.vue'
import InputDataAccessRoleSelect from './form/InputDataAccessRoleSelect.vue'
import ListScrollArea from './scroll-area/ListScrollArea.vue'
import DetailScrollArea from './scroll-area/DetailScrollArea.vue'
import { InputFrontendMenuSelect, FrontendMenuTreeTable } from '@core/modules/frontend-menu/components'

export default {
  install (app) {
    app.component('InputRoleSelect', InputRoleSelect)
    app.component('InputCompanyJobSelect', InputCompanyJobSelect)
    app.component('InputDataAccessRoleSelect', InputDataAccessRoleSelect)
    app.component('ListScrollArea', ListScrollArea)
    app.component('DetailScrollArea', DetailScrollArea)
    app.component('InputFrontendMenuSelect', InputFrontendMenuSelect)
    app.component('FrontendMenuTreeTable', FrontendMenuTreeTable)
  },
}
