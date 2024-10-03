import Base from '@core/models/modules/Base'

const CountryCode = {
  ...Base(),

  // api欄位
  country_code: '',
  country_name: '',
  country_phone_code: '',
  country_icon: '',

  // map欄位
  name_text: '',
}

const CountryCodeModel = (item = null) => {
  const model = (item) => {
    return {
      // api欄位
      country_code: item?.country_code || '',
      country_name: item?.country_name || '',
      country_phone_code: item?.country_phone_code || '',
      country_icon: item?.country_icon || '',
      // map欄位
      name_text: `${this.country_phone_code}(${this.country_name})`,
    }
  }

  return model(item || CountryCode)
}

export default CountryCodeModel
