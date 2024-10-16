
const RoleAuth = () => ({
  // api欄位
  user: '',
})

export const RoleAuthModel = (item = null) => {
  const model = (item) => {
    const roleAuthObj = {
      // api欄位
      user: item?.user || '',
    }
    return roleAuthObj
  }

  return model(item || RoleAuth())
}
