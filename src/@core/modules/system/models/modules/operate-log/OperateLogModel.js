import { convertDateTime } from '@/utils/data-convert'
const OperateLog = {
  created_at: null,
  description: null,
  sourceip: null,
  user: '',
}

export const OperateLogModel = (item = null) => {
  const model = (item) => {
    const operateLogObj = {
      created_at: item?.created_at ? convertDateTime(item?.created_at) : convertDateTime(),
      description: item?.description || null,
      sourceip: item?.sourceip || null,
      user: item?.user || '',
    }
    return operateLogObj
  }

  return model(item || OperateLog)
}
