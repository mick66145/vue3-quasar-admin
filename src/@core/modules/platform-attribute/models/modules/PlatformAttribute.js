import Base from '@core/models/modules/Base'

const PlatformAttribute = {
  ...Base(),
}

const PlatformAttributeModel = (item = null) => {
  const model = (item) => {
    return {

    }
  }

  return model(item || PlatformAttribute)
}

export default PlatformAttributeModel
