const formatDate = (date) => {
    if(!date) return ""
    return new Date(date).toLocaleDateString("vi-VN")
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
    return `${d.getFullYear()}-${monthTemp}-${d.getDate()}`
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

export {
    formatDate,
    formatPhone,
    uppercaseFirstLetter,
    formatDate2,
    formatVND2,
    getHourString
}