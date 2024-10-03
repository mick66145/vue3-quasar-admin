
const City = {
  id: null,
  name: null,
}

export const CityModel = (item = null) => {
  const model = (item) => {
    const cityObj = {
      id: item?.id || null,
      name: item?.name || null,
    }
    return cityObj
  }

  return model(item || City)
}
