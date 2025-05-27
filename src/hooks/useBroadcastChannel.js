import { ref, onBeforeUnmount } from 'vue-demi'

/**
 * 建立BroadcastChannel，具備 ack、去重、事件型通訊等功能
 */
export default function useBroadcastChannel ({
  channelName,
  options = {},
}) {
  const senderId = Math.random().toString(36).substring(2)
  const channel = new BroadcastChannel(channelName)

  const handlers = new Map()
  const messageHistory = new Set()

  const debug = options.debug ?? false

  const messages = ref([]) // 有效資料訊息（不包含 ack）
  const acks = ref([]) // ack 訊息

  /** 產生唯一訊息 ID */
  const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

  /**
   * 發送資料訊息至 BroadcastChannel
   * @param {Object} data - 傳送的原始資料，應包含至少 type 和 payload 欄位
   * @returns {string} messageId - 此次訊息的唯一 ID，可用於追蹤或重送機制
   */
  const send = (data) => {
    const messageId = generateId()
    const message = {
      ...data,
      senderId,
      messageId,
      timestamp: Date.now(),
    }
    channel.postMessage(message)
    if (debug) console.log('[SEND]', message)
    return messageId
  }

  /** 回傳 ack 確認已收到某訊息 */
  const sendAck = (messageId, toSenderId) => {
    const ack = {
      type: '__ack',
      ackFor: messageId,
      senderId,
      to: toSenderId,
      timestamp: Date.now(),
    }
    channel.postMessage(ack)
    if (debug) console.log('[ACK sent]', ack)
  }

  /** 處理收到的 ack */
  const handleAck = (ack) => {
    if (ack.to === senderId) {
      acks.value.push(ack)
      if (debug) console.log('[ACK received]', ack)
    }
  }

  /** 處理一般訊息 */
  const handleMessage = (message) => {
    if (messageHistory.has(message.messageId)) {
      if (debug) console.log('[SKIP duplicate]', message)
      return
    }

    messageHistory.add(message.messageId)
    sendAck(message.messageId, message.senderId)
    messages.value.push(message)

    if (debug) console.log('[RECEIVE]', message)
    invokeHandlers(message.type, message.payload, {
      id: message.messageId,
      senderId: message.senderId,
      timestamp: message.timestamp,
    })
  }

  /** 執行對應事件處理函式 */
  const invokeHandlers = (type, payload, meta) => {
    const fns = handlers.get(type)
    if (fns?.length) {
      for (const handler of fns) {
        handler(payload, meta)
      }
    }
  }

  /** 註冊事件處理器 */
  const on = (type, handler) => {
    if (!handlers.has(type)) {
      handlers.set(type, [])
    }
    handlers.get(type).push(handler)
  }

  /** 移除指定事件處理器 */
  const off = (type, handler) => {
    if (handlers.has(type)) {
      const list = handlers.get(type).filter(h => h !== handler)
      handlers.set(type, list)
    }
  }

  /** 只執行一次的處理器 */
  const once = (type, handler) => {
    const wrapper = (payload, meta) => {
      handler(payload, meta)
      off(type, wrapper)
    }
    on(type, wrapper)
  }

  /** 接收到訊息時觸發 */
  channel.onmessage = (event) => {
    const message = event.data

    if (message.senderId === senderId) return

    if (message.type === '__ack') {
      handleAck(message)
    } else {
      handleMessage(message)
    }
  }

  /** 離開前自動關閉頻道 */
  onBeforeUnmount(() => {
    channel.close()
  })

  return {
    send,
    on,
    off,
    once,
    messages,
    acks,
  }
}
