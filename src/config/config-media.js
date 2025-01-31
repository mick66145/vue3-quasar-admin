export const mediaType = {
  image: 'image',
  video: 'video',
}

export const mediaTypeName = {
  [mediaType.image]: '圖片',
  [mediaType.video]: '影片',
}

export const mediaList = Object.keys(mediaTypeName).map(key => ({
  label: mediaTypeName[key],
  value: key,
}))
