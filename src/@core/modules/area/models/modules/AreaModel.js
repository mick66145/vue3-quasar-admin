
const Area = {
  id: null,
  name: null,
  detail: '',
}

export const AreaModel = (item = null) => {
  const model = (item) => {
    const areaObj = {
      id: item?.id || null,
      name: item?.name || null,
      detail: item?.detail || '',
    }
    return areaObj
  }

  return model(item || Area)
}
