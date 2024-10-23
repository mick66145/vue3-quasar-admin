import { convertDateTime } from '@/utils/data-convert'
const Relationship = {
  id: null,
  created_at: null,
  updated_at: null,
  entity: '',
  related_entity: '',
  start_date: null,
  end_date: null,
  priority: null,
  remarks: null,
  group: null,
  direction_type: 'mutual',
}

export const RelationshipModel = (item = null) => {
  const model = (item) => {
    const relationshipObj = {
      id: item?.id || null,
      created_at: item?.created_at && convertDateTime(item?.created_at),
      updated_at: item?.updated_at && convertDateTime(item?.updated_at, 'YYYY/MM/DD'),
      entity: item?.entity || '',
      related_entity: item?.related_entity || '',
      start_date: item?.start_date || null,
      end_date: item?.end_date || null,
      priority: item?.priority || null,
      remarks: item?.remarks || null,
      group: item?.group || null,
      direction_type: item?.direction_type || 'mutual',
    }
    return relationshipObj
  }

  return model(item || Relationship)
}
