import useResource from '@/hooks/useResource'
import { CountryCode } from '@core/modules/country-code/models'

export const CountryCodeResource = ({
  uri = 'country_code',
}) => {
  const { list, get } = useResource({ uri, listModel: CountryCode, getModel: CountryCode })

  return {
    list,
    get,
  }
}
