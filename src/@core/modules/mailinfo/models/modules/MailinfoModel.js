
const Mailinfo = {
  // api欄位
  id: null,
  name: null,
  subject: null,
  fromname: null,
  tomail: null,
  repeatname: null,
  repeatmail: null,
  cc: null,
  bcc: null,
  content_json: null,
  content: null,
}

export const MailinfoModel = (item = null) => {
  const model = (item) => {
    const mailinfoObj = {
      // api欄位
      id: item?.id || null,
      name: item?.name || null,
      subject: item?.subject || null,
      fromname: item?.fromname || null,
      tomail: item?.tomail || null,
      repeatname: item?.repeatname || null,
      repeatmail: item?.repeatmail || null,
      cc: item?.cc || null,
      bcc: item?.bcc || null,
      content: item?.content || null,
      content_json: item?.content_json ? JSON.parse(item?.content_json) : null,
    }
    return mailinfoObj
  }

  return model(item || Mailinfo)
}
