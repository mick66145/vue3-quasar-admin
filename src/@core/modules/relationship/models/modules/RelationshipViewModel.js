import Base from '@core/models/modules/Base'
import { RelationshipModel } from './RelationshipModel'

const Relationship = () => ({
  ...Base(),
})

export const RelationshipViewModel = (item) => {
  const viewModel = (item) => {
    const relationshipObj = {
      ...RelationshipModel(item),
      ...Relationship(),
    }
    return relationshipObj
  }

  return viewModel(item)
}
