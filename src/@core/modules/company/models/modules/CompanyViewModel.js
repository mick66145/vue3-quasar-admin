import Base from '@core/models/modules/Base'
import { CompanyModel } from './CompanyModel'

const Company = () => ({
  ...Base(),
  // map欄位
  address_obj: {
    city: '',
    area: '',
    address: null,
  },
})

export const CompanyViewModel = (item) => {
  const viewModel = (item) => {
    const companyObj = {
      ...CompanyModel(item),
      ...Company(),
      // map欄位
      address_obj: {
        city: item?.city || '',
        area: item?.area || '',
        address: item?.address || null,
      },
      setAddress () {
        this.city = this.address_obj.city
        this.area = this.address_obj.area
        this.address = this.address_obj.address
      },
      setAddressText () {
        if (this.city || this.area || this.address) {
          let addressText = ''
          this.city && (addressText += `${this.city?.name}`)
          this.area && (addressText += `${this.area?.name}`)
          this.address && (addressText += `${this.address}`)
          this.address_text = addressText
        }
      },
    }
    companyObj.setAddressText()
    return companyObj
  }

  return viewModel(item)
}
