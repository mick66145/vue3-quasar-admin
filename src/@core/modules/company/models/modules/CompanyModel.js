
const Company = {
  id: null,
  name: null,
  name_en: null,
  opendate: null,
  invoice: null,
  vatnumber: null,
  ceo: null,
  tel: null,
  tel_ext: null,
  tel_service: null,
  fax: null,
  phone: null,
  email: null,
  address: null,
  address_en: null,
  service_time: null,
  city: '',
  area: '',
}

export const CompanyModel = (item = null) => {
  const model = (item) => {
    const companyObj = {
      // api欄位
      id: item?.id || null,
      name: item?.name || null,
      name_en: item?.name_en || null,
      opendate: item?.opendate || null,
      invoice: item?.invoice || null,
      vatnumber: item?.vatnumber || null,
      ceo: item?.ceo || null,
      tel: item?.tel || null,
      tel_ext: item?.tel_ext || null,
      tel_service: item?.tel_service || null,
      fax: item?.fax || null,
      phone: item?.phone || null,
      email: item?.email || null,
      address: item?.address || null,
      address_en: item?.address_en || null,
      service_time: item?.service_time || null,
      city: item?.city || '',
      area: item?.area || '',
    }
    return companyObj
  }

  return model(item || Company)
}
