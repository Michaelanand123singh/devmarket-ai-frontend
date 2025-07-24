import { useState, useEffect, useCallback } from 'react'
import { WEBSOCKET_URL } from '../utils/constants'

export const useWebSocket = (projectId) => {
  const [socket, setSocket] = useState(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('disconnected')
  const [messages, setMessages] = useState([])

  const connect = useCallback(() => {
    if (socket) return

    const ws = new WebSocket(`${WEBSOCKET_URL}/${projectId}`)
    
    ws.onopen = () => {
      setStatus('connected')
      setSocket(ws)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      
      if (data.type === 'progress') {
        setProgress(data.value)
      } else if (data.type === 'status') {
        setStatus(data.value)
      } else if (data.type === 'message') {
        setMessages(prev => [...prev, data])
      }
    }

    ws.onclose = () => {
      setStatus('disconnected')
      setSocket(null)
    }

    ws.onerror = () => {
      setStatus('error')
    }

    return ws
  }, [projectId, socket])

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close()
      setSocket(null)
    }
  }, [socket])

  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [disconnect])

  return { connect, disconnect, progress, status, messages }
}