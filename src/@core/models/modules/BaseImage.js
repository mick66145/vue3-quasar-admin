import Base from '@core/models/modules/Base'
import useBatchUpload from '@/hooks/useBatchUpload'

const BaseImage = () => ({
  ...Base(),
  // api欄位
  id: '',
  title: '',
  alt: '',
  mime: '',
  name: '',
  size: '',
  url: '',
})

const BaseImageModel = (item = null) => {
  const model = (item) => {
    return {
      // api欄位
      id: item?.id || '',
      title: item?.title || '',
      alt: item?.alt || '',
      mime: item?.mime || '',
      name: item?.name || '',
      size: item?.size || '',
      url: item?.url || '',

    }
  }
  return model(item || BaseImage())
}

const BaseImageObjViewModel = (item = null) => {
  const { batchUpload } = useBatchUpload()
  const model = (item) => {
    return {
      image: item?.image || '',
      image_obj: item?.image_obj !== undefined ? item?.image_obj : ((item?.image && Object.keys(item?.image).length !== 0) ? { ...BaseImageModel(item?.image) } : ''),
      async uploadImage () {
        if (this.image_obj?.raw) {
          const [uploadRes] = await batchUpload({ imageObj: this.image_obj })
          if (uploadRes && uploadRes.imageObj) {
            this.image_obj.id = uploadRes.imageObj.id
          }
        }
      },
      setImage () {
        this.image = this.image_obj
      },
    }
  }

  return model(item)
}

export default BaseImageObjViewModel
