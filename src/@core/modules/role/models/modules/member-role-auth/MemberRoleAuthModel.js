
const MemberRoleAuth = () => ({
  // api欄位
  member: '',
})

export const MemberRoleAuthModel = (item = null) => {
  const model = (item) => {
    const memberRoleAuthObj = {
      // api欄位
      member: item?.member || '',
    }
    return memberRoleAuthObj
  }

  return model(item || MemberRoleAuth())
}
