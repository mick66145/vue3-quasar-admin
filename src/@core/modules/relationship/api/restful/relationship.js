import useResource from '@/hooks/useResource'
import { RelationshipViewModel } from '@core/modules/relationship/models'

export const RelationshipResource = ({
  uri = 'relationship',
}) => {
  const { list, get, post, destroy } = useResource({ uri, listModel: RelationshipViewModel, getModel: RelationshipViewModel })

  return {
    list,
    get,
    post,
    destroy,
  }
}
