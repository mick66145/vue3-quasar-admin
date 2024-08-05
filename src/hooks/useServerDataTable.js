import { reactive, ref } from 'vue-demi'
import useSessionStorage from './useSessionStorage'
import mapKeys from 'lodash-es/mapKeys'

export default function useServerDataTable ({
  searchParames = {},
  unSessionStorageParames = [], // [{field:string}]
  sessionStorageKey = 'dashboardServerDataTable',
  usePageSize = true,
  callback = () => {},
}) {
  const { setSessionStorage, getSessionStorage } = useSessionStorage()
  let sessionStorage = getSessionStorage(sessionStorageKey)

  const search = reactive({})
  const data = ref([])
  const total = ref(0)

  const unSessionStorageParamesField = unSessionStorageParames.map((item) => item.field)
  if (!sessionStorage) {
    const sessionStorageObj = {
      search: {
        page: 1,
        page_size: usePageSize ? 10 : null,
      },
    }
    setSessionStorage(sessionStorageKey, sessionStorageObj)
    sessionStorage = getSessionStorage(sessionStorageKey)
  }

  mapKeys(sessionStorage.search, (_, key) => {
    search[key] = sessionStorage.search[key]
  })

  for (const [key, value] of Object.entries(searchParames)) {
    (!sessionStorage.search[key] && !unSessionStorageParamesField.includes(key)) && (search[key] = value)
  }

  setSessionStorage(sessionStorageKey, { search })

  for (const [key, value] of Object.entries(searchParames)) {
    (unSessionStorageParamesField.includes(key)) && (search[key] = value)
  }

  const onChangePage = (page) => {
    search.page = page
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  const onChangePageSize = (pageSize) => {
    search.page_size = pageSize
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  const onChangeFilter = () => {
    search.page = 1
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  const onReset = () => {
    for (const [key, value] of Object.entries(searchParames)) {
      search[key] = value
    }
    search.page = 1
    usePageSize && (search.page_size = 10)
    setSessionStorage(sessionStorageKey, { search })
    if (callback && typeof (callback) === 'function') {
      callback()
    }
  }

  return {
    search,
    data,
    total,
    onChangePage,
    onChangePageSize,
    onChangeFilter,
    onReset,
  }
}
