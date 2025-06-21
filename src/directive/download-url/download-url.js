const setDownloadHandler = (el, value) => {
  if (el._downloadHandler) {
    el.removeEventListener('click', el._downloadHandler)
  }

  if (!value?.url) return

  const handler = () => {
    const a = document.createElement('a')
    const url = value.url
    fetch(url, {
      headers: new Headers({
        Origin: location.origin,
        'Access-Control-Allow-Origin': '*',
      }),
      mode: 'cors',
    })
      .then(res => res.blob())
      .then(blob => {
        a.href = URL.createObjectURL(blob)
        a.download = value.name || ''
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(a.href)
        document.body.removeChild(a)
      })
  }

  el._downloadHandler = handler
  el.addEventListener('click', handler)
}

export default {
  mounted (el, binding) {
    setDownloadHandler(el, binding.value)
  },
  updated (el, binding) {
    if (JSON.stringify(binding.value) !== JSON.stringify(binding.oldValue)) {
      setDownloadHandler(el, binding.value)
    }
  },
}
