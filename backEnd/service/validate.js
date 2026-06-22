const vallidatePhone = (phone) => {
    const regex = /^[0-9]{10}$/
    return regex.test(phone)
}

const validateUsername = (username) => {
    const regex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/
    return regex.test(username)
}

const validatePassword = (password) => {
    const regex = /^[a-zA-Z0-9]{8,}$/
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
         throw new Error("Not found object !")
    return reuslt
}

export {
    vallidatePhone,
    validatePassword,
    validateUsername,
    validateFullname,
    convertObjectForUpdate,
    findObject
}