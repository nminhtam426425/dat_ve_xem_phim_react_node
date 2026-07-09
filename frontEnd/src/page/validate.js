const formatDate = (d) => {
    if(!d) return ""
    let temp = new Date(d)
    const day = temp.getDate()
    const month = temp.getMonth() + 1
    const year = temp.getFullYear()
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
}

const formatDateHour = (date) => {
    if(!date) return ""

    const d = new Date(date)
    // bé hơn 2 số (< 10) thì thêm 1 số 0 
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const hour = String(d.getHours()).padStart(2, '0')
    const minute = String(d.getMinutes()).padStart(2, '0')

    return `${d.getFullYear()}-${month}-${day} ${hour}:${minute}:00`
}

const formatPhone = (phone) => {
    if(!phone)
        return ""
    let length = phone.length
    let result = ''
    for(let i = 0; i < length; i++){
        if(i == 4 || i == 7)
            result+=` ${phone[i]}`
        else
            result+=phone[i]
    }
    return result 
}

const uppercaseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const formatDate2 = date => {
    const d = new Date(date)
    let monthTemp = d.getMonth() + 1
    monthTemp = (monthTemp < 10 ) ? '0'+monthTemp : monthTemp
    let dateTemp = d.getDate()
    dateTemp = (dateTemp < 10 ) ? '0'+dateTemp : dateTemp
    return `${d.getFullYear()}-${monthTemp}-${dateTemp}`
}

const formatVND2 = (amount) => {
    if(amount == null || amount == undefined)
        return ""
    const numericValue = Number(amount)
    if (isNaN(numericValue)) return ""
    return numericValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

const getHourString = (date) => {
    if(!date) return ""
    return date.substring(11, 16)
}

// dùng để tính giá tiền suất chiếu dựa vào danh sách các ghế
const calculatorPrice = (chairChosen, price) => {
    if(!chairChosen || !price) return "0đ"
    price = Number(price)
    let amount = 0
  
    for(let i of chairChosen){
        if(i.type == 'Standard')
            amount += price
        else if (i.type == 'VIP')
            amount += (price+ 10000)
        else 
            amount += (price*2)
    }
  
    return amount
}

// lấy ngày thứ 2, và chủ nhật trong tuần
const getWeekRange = (date) => {
    const dayOfWeek = date.getDay()
    
    //Chủ nhật (0), lùi lại 6 ngày. Nếu là Thứ 2-7, lùi (day - 1) ngày.
    const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    
    const monday = new Date(date)
    monday.setDate(date.getDate() - distanceToMonday)
    monday.setHours(0)
    
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    sunday.setHours(23)

    return {
        start: monday,
        end: sunday
    }
}

const getMonthRange = (date) => {
    let startMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    let endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    return {
        start: startMonth,
        end: endMonth
    }
}

const getDaysRange = (dateInput = new Date(), type = 'weeks') => {
    const date = new Date(dateInput)
    
    if (isNaN(date.getTime())) 
        return "Ngày không hợp lệ"

    return  type == 'weeks' ? getWeekRange(date) : getMonthRange(date)
}

const compareDates = (date) => {
    if (isNaN(date.getTime())) 
        return "Ngày không hợp lệ"
    const today = new Date()

    today.setHours(0, 0, 0, 0)
    date.setHours(0, 0, 0, 0)
    
    return today.getTime() == date.getTime()
}

export {
    formatDate,
    formatPhone,
    uppercaseFirstLetter,
    formatDate2,
    formatVND2,
    getHourString,
    calculatorPrice,
    getDaysRange,
    compareDates,
    formatDateHour
}