import React, { useState, useEffect, useRef, useMemo } from 'react'
import { MessageSquare, X, ArrowLeft, Send, Search, CheckCheck, Loader2 } from 'lucide-react'
import { removeVietnameseTones, pusher, customeFetch, apiUserService } from '../../config'
import { useLoading } from '../../../LoadingContext'

export default function AdminHeaderChat() {
  const {userInfo} = useLoading() 
  const [isOpen, setIsOpen] = useState(false)
  const [conversations, setConversations] = useState([])
  const [activeChatId, setActiveChatId] = useState(null) // ID phòng đang mở, null nghĩa là đang ở màn hình danh sách
  const [search, setSearch] = useState("")
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState([])
  
  const dropdownRef = useRef(null)
  const messagesEndRef = useRef(null)

  // Tính tổng số tin nhắn chưa đọc để làm badge trên Header Icon
  const totalUnread = conversations.reduce((sum, item) => sum + item.unreadCount, 0)

  const filteredData = useMemo(()=>{
      return conversations.filter(item => {
        
          const keyword = removeVietnameseTones(search.trim())
          const matchSearch = keyword === "" || removeVietnameseTones(item.buyerName).includes(keyword) 
  
          return matchSearch
      }) 
  },[conversations, search])

  const handleReceiveMessage = (apiData) => {
    const { id_conver, message_text } = apiData
    const getUserInfo = async () => {
      try{
        const res = await customeFetch(apiUserService.baseURL+`/chats/infoUser/${id_conver}`,'authen','GET')
        if(res.ok){
          const data = await res.json()

          const newMessageObj = {
            id: Date.now(),
            sender_id: 'buyer', 
            message_text: message_text,
            is_read: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          setMessages(pre => [...pre, newMessageObj])

          setConversations((prevConversations) => {
            const existingIndex = prevConversations.findIndex((chat) => chat.id === id_conver)
        
            // TRƯỜNG HỢP 1: Thêm mới cuộc trò chuyện vào mảng
            if (existingIndex === -1) {
              const newConversation = {
                id: id_conver,
                buyerName: data.fullname,
                avatar: data.avatar,
                lastMessage: newMessageObj.message_text,
                time: newMessageObj.time,
                unreadCount: 1,
                online: true
              };
        
              // Đưa cuộc trò chuyện mới lên đầu danh sách
              return [newConversation, ...prevConversations]
            }
        
            // TRƯỜNG HỢP 2:  Cập nhật cuộc trò chuyện cũ
            const updatedConversations = prevConversations.map((chat) => {
              if (chat.id === id_conver) {
                return {
                  ...chat,
                  lastMessage: newMessageObj.message_text,
                  time: newMessageObj.time,
                  unreadCount: chat.unreadCount + 1, 
                  online: true
                }
              }
              return chat
            })
        
            //Đẩy cuộc trò chuyện vừa có tin nhắn mới lên đầu danh sách
            const updatedChat = updatedConversations[existingIndex]
            const filteredList = updatedConversations.filter((chat) => chat.id !== id_conver)
            return [updatedChat, ...filteredList]
        
          })
        }
      }
      catch(err){
        console.log(err)
      }
    }
    getUserInfo()
  }

  // lấy nội dung cuộc trò chuyện
  useEffect(() => {
    if(activeChatId == null) return
    const getMessages = async () => {
      try{
        const res = await customeFetch(apiUserService.baseURL+`/chats/messagesAdmin/${activeChatId}`,'authen','GET')
        if(res.ok){
          const data = await res.json()
          setConversations((prevConversations) => {
            const updatedConversations = prevConversations.map((chat) => {
              if (chat.id === activeChatId) {
                return {
                  ...chat,
                  unreadCount: 0, 
                }
              }
              return chat
            })
        
            return updatedConversations
        
          })
          setMessages(data)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    getMessages()
  }, [activeChatId])
  
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest', // Giúp hạn chế scroll lan ra window bên ngoài
          inline: 'nearest' 
        })
      }, 50)
  
      return () => clearTimeout(timer)
    }
  }, [messages])

  // lấy các cuộc hội thoại
  useEffect(()=>{
    const getMessages = async () => {
      try{
        const res = await customeFetch(apiUserService.baseURL+'/chats/messages-total','authen','GET')
        if(res.ok){
          const data = await res.json()
          setConversations(data)
        }
      }
      catch(err){
        console.log(err)
      }
    }
    getMessages()
  },[])

  // pusher nhận tin nhắn
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

  // Đóng dropdown khi click ra ngoài vùng chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setActiveChatId(null) // Reset về màn hình danh sách khi đóng
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
    // Chuyển sang màn hình chat chi tiết với khách hàng
  const handleOpenChat = (id) => {
    setActiveChatId(id)
    // Đánh dấu đã đọc cho cuộc hội thoại này
    setConversations(prev => 
      prev.map(item => item.id === id ? { ...item, unreadCount: 0 } : item)
    )
  }
  
    // Trở lại màn hình danh sách khách hàng
  const handleBackToList = () => {
    setActiveChatId(null);
  }
  
    // Gửi tin nhắn từ phía Admin
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    setIsSending(true)
    const dataForApi = {
      id_conver: activeChatId,
      message: inputValue,
      time: new Date()
    }
    try{
      const res = await customeFetch(apiUserService.baseURL+'/chats/toUser','authen','POST', JSON.stringify(dataForApi))
      if(res.ok){
        setConversations(prev =>
          prev.map(conv => {
            if (conv.id === activeChatId) {
              return {
                ...conv,
                lastMessage: inputValue,
                time: 'Vừa xong'
              }
            }
            return conv
          })
        )
        const newMsg = {
          id: Date.now(),
          sender_id: userInfo.id,
          message_text: inputValue,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(pre => [...pre, newMsg])
        setInputValue('')
      }
      setIsSending(false)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleSearchCustomer = (e) => {
      const {value} = e.target
      setSearch(value)
  }
  
  const activeChat = conversations.find(c => c.id === activeChatId)

  return (
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (isOpen) setActiveChatId(null); // Reset về danh sách nếu đóng lại
          }}
          className={`relative p-2.5 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none
            ${isOpen ? 'bg-indigo-50 text-indigo-600' : ''}`}
        >
          <MessageSquare className="w-6 h-6" />
          
          {/* Badge đếm số tin nhắn chưa đọc từ khách hàng */}
          {totalUnread > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {totalUnread}
            </span>
          )}
        </button>
  
        {/* KHUNG POPUP CHAT PHÂN CẤP (Dropdown) */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-[380px] h-[520px] bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col overflow-hidden z-50 transform origin-top-right transition-all">
            
            {/* TRẠNG THÁI 1: DANH SÁCH CUỘC TRÒ CHUYỆN */}
            {!activeChatId ? (
              <>
                {/* Header danh sách */}
                <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">Hộp thư khách hàng</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Bạn có {totalUnread} cuộc hội thoại chưa xử lý</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
  
                {/* Thanh tìm kiếm nhanh */}
                <div className="px-4 py-2.5 bg-gray-50/50 border-b border-gray-100 flex items-center gap-2">
                  <div className="relative flex-1">
                    <button>
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    </button>
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm khách hàng..." 
                      value={search}
                      onChange={handleSearchCustomer}
                      className="w-full pl-9 pr-4 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>
  
                {/* Danh sách người chat */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
                  {filteredData.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => handleOpenChat(conv.id)}
                      className={`flex items-center gap-3.5 px-5 py-3.5 hover:bg-gray-50 cursor-pointer transition-all duration-150 relative group
                        ${conv.unreadCount > 0 ? 'bg-indigo-50/30' : ''}`}
                    >
                      {/* Avatar và đèn báo Trực tuyến */}
                      <div className="relative flex-shrink-0">
                        <img 
                          src={conv.avatar} 
                          alt={conv.buyerName} 
                          className="w-11 h-11 rounded-full object-cover border border-gray-100"
                        />
                        {conv.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
  
                      {/* Nội dung tin nhắn tóm tắt */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <h4 className={`text-sm ${conv.unreadCount > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                            {conv.buyerName}
                          </h4>
                          <span className="text-[11px] text-gray-400">{conv.time}</span>
                        </div>
                        <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
  
                      {/* Badge chưa đọc nằm bên phải */}
                      {conv.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              
              /* TRẠNG THÁI 2: KHUNG CHAT CHI TIẾT VỚI KHÁCH HÀNG */
              <>
                <div className="px-4 py-3 bg-indigo-600 text-white flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleBackToList}
                      className="p-1 rounded-full hover:bg-indigo-700 text-indigo-100 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <img 
                        src={activeChat?.avatar} 
                        alt={activeChat?.buyerName} 
                        className="w-9 h-9 rounded-full object-cover border border-indigo-400"
                      />
                      {activeChat?.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm leading-none">{activeChat?.buyerName}</h3>
                      <span className="text-[10px] text-indigo-200 mt-1 inline-block">
                        {activeChat?.online ? 'Đang hoạt động' : 'Ngoại tuyến'}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveChatId(null)
                      setIsOpen(false)
                    }}
                    className="p-1 rounded-full hover:bg-indigo-700 text-indigo-100 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
  
                {/* Vùng hội thoại tin nhắn (Có Scroll) */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3.5">
                  {messages.map((msg) => {
                    const isAdmin = msg.sender_id === userInfo.id
                    return (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col ${isAdmin ? 'items-end' : 'items-start'}`}
                      >
                        <div className="flex items-end gap-1.5 max-w-[80%]">
                          {/* Avatar khách hàng khi họ gửi tin nhắn */}
                          {!isAdmin && (
                            <img 
                              src={activeChat.avatar} 
                              alt="" 
                              className="w-6 h-6 rounded-full object-cover mb-1"
                            />
                          )}
                          <div 
                            className={`px-3.5 py-2 rounded-2xl text-sm shadow-sm leading-relaxed
                              ${isAdmin 
                                ? 'bg-indigo-600 text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                              }`}
                          >
                            {msg.message_text}
                          </div>
                        </div>
                        
                        {/* Trạng thái gửi thành công / đã đọc */}
                        <span className="text-[10px] text-gray-400 mt-1 px-1 flex items-center gap-1">
                          {msg.time}
                          {isAdmin && (
                            <CheckCheck className="w-3.5 h-3.5 text-indigo-500" />
                          )}
                        </span>
                      </div>
                    );
                  })}
                  {/* Neo scroll */}
                  <div ref={messagesEndRef} />
                </div>
  
                {/* Ô nhập liệu phản hồi nhanh */}
                <form 
                  onSubmit={handleSendMessage}
                  className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder={`Phản hồi ${activeChat?.buyerName}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-gray-100 text-gray-700 text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white border border-transparent focus:border-indigo-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md active:scale-95 transform"
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
              </>
            )}
  
          </div>
        )}
  
      </div>
    );
  }