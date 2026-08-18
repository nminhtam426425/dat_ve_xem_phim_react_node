const vallidatePhone = (phone) => {
    const regex = /^[0-9]{10}$/
    return regex.test(phone)
}

const validateUsername = (username) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/
    return regex.test(username)
}

const validatePassword = (password) => {
    if(password.includes(" ")) return false
    
    const regex = /^[\w\W]{8,}$/
    return regex.test(password)
}

const validateFullname = (fullname) => {
    const regex = /^[\p{L}\p{N} ]*$/u
    return regex.test(fullname)
}


// hàm này dùng để chuyển các thuộc tính có value (khác undefined, null )
// ở arrProps vào trong đối tượng obj với key ở mảng arrKey
// để Update
const convertObjectForUpdate = (obj, sourceObj) => {
    Object.keys(sourceObj).forEach(key => {
        const value = sourceObj[key]
        if (value != null) 
            obj[key] = value
    })
    return obj
}

const findObject = async (obj, key, valueId) => {
    let reuslt =  await obj.findOne({
        where: { [key]: valueId}
    })
    if(!reuslt)
         throw new Error(`Not found object - ${valueId}!`)
    return reuslt
}

const countByCondition = (array, key, value) => {
    if(!array) return ""
    return array.filter( item => item[key] == value).length
}


const countByDateCondition = (array, value) => {
    if(!array) return ""
    return array.filter( item => {
        let created = new Date(item.created_at)
        return created.getMonth() <= value
    }).length
}

// đếm các phần tử theo tháng trước tính từ tháng này
// giả sử: admin đăng nhập tháng 6, sẽ đếm các phần tử tháng 5 để tính toán số lượng % tăng trưởng
const countMonthNow = (array) => {
    if(!array) return ""
    let monthNow = new Date()
    return array.length - countByDateCondition(array, monthNow.getMonth() - 1)
}

export {
    vallidatePhone,
    validatePassword,
    validateUsername,
    validateFullname,
    convertObjectForUpdate,
    findObject,
    countByCondition,
    countMonthNow
}