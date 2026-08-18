import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, User, Loader2 } from 'lucide-react'
import { customeFetch, apiUserService, pusher } from '../../../config'
import { formatTimeChat } from '../../../validate'
import { useLoading } from '../../../../LoadingContext'

export default function ChatWidget() {
  const {userInfo} = useLoading() 
  const [isOpen, setIsOpen] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)// Trạng thái dấu chấm đỏ
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setHasNewMessage(false)
    }
  }, [isOpen, messages])

  const handleReceiveMessage = (apiData) => {
    const { message_text } = apiData
  
    const newMessageObj = {
      id: Date.now(),
      sender_id: 'seller', 
      message_text: message_text,
      time: new Date()
    }
    console.log(isOpen)
    if(!isOpen)
      setHasNewMessage(true)
    setMessages(pre => [...pre, newMessageObj])
  }

  useEffect(()=>{
    const getMessages = async () => {
      try{
        const res = await customeFetch(apiUserService.baseURL+'/chats/messages','authen','GET')
        if(res.ok){
          const data = await res.json()
          setHasNewMessage(data.some(item => !item.is_read && item.sender_id != userInfo.id))
          setMessages(data)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    getMessages()
  },[])

  useEffect(()=>{
      if(!isOpen || messages.length == 0) return
       // đánh dấu đã đọc
      const isRead = async () => {
      let lastAdminMessage = messages.filter(item => item.sender_id != userInfo.id && item.is_read == 0)
      try{
        const res = await customeFetch(apiUserService.baseURL+'/chats/messages/is-read','authen','POST', JSON.stringify({messages: lastAdminMessage}))
        if(res.ok){
          setMessages(pre => pre.map(item => {
            if(lastAdminMessage.some(id => id == item.id))
              item.is_read = 1
            return item
          }))
          setHasNewMessage(false)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    
    isRead()
  },[isOpen])

  useEffect(()=>{
    const channelName = `chat-${userInfo?.id}`
    const channel = pusher.subscribe(channelName)

    channel.bind('chat',(data)=>{
        handleReceiveMessage(data)
    })

    return () => {
        channel.unbind_all()
        pusher.unsubscribe(channelName)
    }
  },[])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    setIsSending(true)
    if (!inputValue.trim()) return
    const newMsg = {
      message: inputValue,
      time: new Date()
    }

    try{
      const res = await customeFetch(apiUserService.baseURL+'/chats/toAdmin','authen','POST', JSON.stringify(newMsg))
      if(res.ok){
        const data = await res.json()
        data.senderId = 'buyer'
        setMessages([...messages, data])
        setInputValue('')
      }
      setIsSending(false)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans antialiased">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[330px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right">
          
          <div className="bg-background2 text-white px-4 py-3.5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center border border-indigo-400">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat quản trị viên</h3>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-indigo-700 transition-colors text-indigo-100 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3.5">
            {messages.map((msg) => {
              const isBuyer = msg.sender_id === userInfo.id
              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isBuyer ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-[75%] px-3.5 py-2 rounded-2xl text-sm shadow-sm leading-relaxed
                      ${isBuyer 
                        ? 'bg-indigo-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                      }`}
                  >
                    {msg.message_text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {formatTimeChat(msg.created_at)}
                  </span>
                </div>
              )
            })}

            <div ref={messagesEndRef} />
          </div>

          <form 
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-gray-100 text-gray-700 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white border border-transparent focus:border-indigo-500 transition-all"
            />
            <button
              type="submit"
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-md shadow-indigo-600/10 active:scale-95 transform"
            >
              {
                isSending 
                ?
                <Loader2 className="animate-spin"/>
                :
                <Send className="w-4 h-4" />
              }
            </button>
          </form>
        </div>
      )}

      {/* BONG BÓNG LOGO CHAT (Nút kích hoạt ở góc phải dưới) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-full text-white shadow-lg transition-all duration-300 active:scale-90 hover:scale-105 group
          ${isOpen 
            ? 'bg-gray-800 hover:bg-gray-900 rotate-90' 
            : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
      >
        {/* Biểu tượng thay đổi tùy theo trạng thái Đóng/Mở */}
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}

        {/* Dấu chấm đỏ thông báo tin nhắn mới (Ẩn khi đang mở chat hoặc không có tin mới) */}
        {!isOpen && hasNewMessage && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
        )}
      </button>
    </div>
  );
}