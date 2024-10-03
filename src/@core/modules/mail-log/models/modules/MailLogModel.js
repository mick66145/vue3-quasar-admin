
import { convertDateTime } from '@/utils/data-convert'
const MailLog = {
  id: null,
  from: null,
  to: null,
  cc: null,
  bcc: null,
  reply_to: null,
  subject: null,
  send_datetime: null,
  content: null,
  state: null,
  state_text: null,
}

export const MailLogModel = (item = null) => {
  const model = (item) => {
    const mailLogObj = {
      id: item?.id || null,
      from: item?.from || null,
      to: item?.to || null,
      cc: item?.cc || null,
      bcc: item?.bcc || null,
      reply_to: item?.reply_to || null,
      subject: item?.subject || null,
      send_datetime: item?.send_datetime ? convertDateTime(obj?.send_datetime) : convertDateTime(),
      content: item?.content || null,
      state: item?.state || null,
      state_text: item?.state_text || null,
    }
    return mailLogObj
  }

  return model(item || MailLog)
}
