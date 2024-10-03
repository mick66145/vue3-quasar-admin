import useResource from '@/hooks/useResource'
import { MailLogViewModel } from '@core/modules/mail-log/models'

export const MailLogResource = ({
  uri = 'mail_log',
}) => {
  const { list, get } = useResource({ uri, listModel: MailLogViewModel, getModel: MailLogViewModel })

  return {
    list,
    get,
  }
}
