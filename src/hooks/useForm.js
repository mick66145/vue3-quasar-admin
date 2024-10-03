import { ref } from 'vue-demi'

export default function useForm ({
  errorTabs = {}, // { companyInfo: ['name'], customerServiceInfo: ['telService'] }
  handleError = () => {},
}) {
  // ref
  const form = ref()

  // methods
  const validationError = (validationRef) => {
    handleError(validationRef)
  }
  const getErrorTab = (validationRef) => {
    const tabName = getTabForField(validationRef.name)
    if (tabName) return tabName
  }
  const getTabForField = (field) => {
    return Object.entries(errorTabs).find(([tabName, fields]) => fields.includes(field))?.[0]
  }

  return {
    form,
    validationError,
    getErrorTab,
  }
}
