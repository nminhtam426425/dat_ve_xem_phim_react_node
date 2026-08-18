const curtainNumber = (str) => {
    const regex1 = /[0-9]/
    return regex1.test(str)
}
const validPhone = (str) => {
    const regex = /^0\d{9}$/
    return regex.test(str)
}
const notCurtainSpecialCharacter = (str) => {
    //    \p{L} : Bất kỳ ký tự chữ cái nào (bao gồm Latinh, Tiếng Việt có dấu, v.v.)
    //    \p{N} : Bất kỳ ký tự số nào

    // u : Flag quan trọng để hỗ trợ Unicode
    const regex = /^[\p{L}\p{N}\s,.\-@"':?!()]+$/u
    
    return regex.test(str)
}

const curtainSpecialCharacter = (str) => {
    //    \p{L} : Bất kỳ ký tự chữ cái nào (bao gồm Latinh, Tiếng Việt có dấu, v.v.)
    //    \p{N} : Bất kỳ ký tự số nào

    // u : Flag quan trọng để hỗ trợ Unicode
    const regex = /^[\p{L}\p{N}\s,]+$/u
    
    return regex.test(str)
}

const validDescription = (str) => {
    const regex = /^[\p{L}\p{N}\s,._]+$/u
    
    return regex.test(str)
}

const validFullname = (str) => {
    const regex = /^[\p{L}\s]+$/u
    
    return regex.test(str)
}

const validUsername = (str) => {
    const regex = /^[A-Za-z0-9@.]+$/u
    
    return regex.test(str)
}

const containSpace = (str) => {
    return str.includes(" ")
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    return emailRegex.test(email)
}
// Ví dụ:
// validateEmail("test@gmail.com");          // true
// validateEmail("user.name@domain.com.vn"); // true (nhiều dấu chấm)
// validateEmail("1user@gmail.com");         // false (bắt đầu bằng số)
// validateEmail("nguyễn@gmail.com");        // false (có dấu/unicode)


// hàm này dựa vào idInput để xác định gọi hàm valid của input tương ứng
// vì đây là not_function: nên khi nhận về false là pass valid
// vd: formMovie -> Function Component FormMovie.jsx
//     id: title_0 -> valid cho input nhận tên phim
//     thêm _0 -> để giá trị truyền thẻ thông báo lỗi trên form
const notPassValidFormMovie = (idInput, value) => {
    if (value.trim() === "") {
        if (idInput === 'title_0' || idInput === 'director_0') {
            return true
        }
        return false // Actor hoặc Synopsis nếu cho phép trống thì không tính là lỗi
    }

    if(idInput == 'title_0')
        // vì hàm là not pass, nên not_Function phải lấy phủ định -> phù hợp với ngữ nghĩa
        // vd: curtain: true -> tức là có lỗi - not pass
        //     not_curtain: false -> nó chứa kí tự cấm, nên phải phủ định thành true
        return !notCurtainSpecialCharacter(value)
    else if (idInput == 'director_0'){
        let coChuaSo = curtainNumber(value)
        let coKyTuDacBiet = !curtainSpecialCharacter(value)
        return coChuaSo || coKyTuDacBiet
    }
    else if (idInput == 'actor_0') {
        let coChuaSo = curtainNumber(value)
        let coKyTuDacBiet = !curtainSpecialCharacter(value)
        return coChuaSo || coKyTuDacBiet
    }
    else if (idInput == 'synopsis_0') 
        return !notCurtainSpecialCharacter(value)
    else if(idInput == 'release_date_0'){
        let today = new Date()
        let dateChosen = new Date(value)
        return dateChosen - today < 0
    }
    
    return false
}

const messageErrorFormMovie = (key) => {
    const message = {
        title_0: ' *Tên phim không chứa kí tự dặc biệt !',
        director_0: ' *Không đúng định dạng tên !',
        actor_0: ' *Vui lòng nhập đúng định dạng !',
        synopsis_0: ' *Không chứa kí tự dặc biệt !',
        release_date_0: ' *Ngày không hợp lệ !'
    }
    return message[key]
}

const notPassValidFormLogin = (idInput, value) => {
    if (value.trim() === "") return true 
    
    if(idInput == 'password_0')
        return containSpace(value)

    if(idInput == 'username_0'){
        return !validUsername(value)
    }

    return false
}

const messageErrorFormLogin = (key) => {
    const message = {
        username_0: ' *Tên đăng nhập không hợp lệ',
        password_0: ' *Không được để trống',
    }
    return message[key]
}

const notPassValidFormRegister = (idInput, value) => {
    if (value.trim() === "") return true 
    
    if(idInput == 'username_0')
        return containSpace(value) || !validUsername(value) || value.length < 5

    if(idInput == 'password_0'){
        let length = value.length
        let spaceContain = containSpace(value)
        return (length < 8) || spaceContain
    }

    // lấy phủ định để phù hợp về ngữ cảnh
    // not : ko chứa = true
    // hàm đang xét notPass: -> phải phủ định lại true để notPass = false ==> tức là pass 
    if(idInput == 'fullname_0'){
        return !validFullname(value)
    }
    if(idInput == 'email_0'){
        return !validateEmail(value)
    }

    return false
}

const messageErrorFormRegister = (key) => {
    const message = {
        username_0: ' *Tên đăng nhập không hợp lệ, ít nhất 5 kí tự',
        password_0: ' *Không được để trống, tối thiểu 8 kí tự',
        fullname_0: ' *Họ tên không hợp lệ',
        email_0: ' *Email không hợp lệ'
    }
    return message[key]
}

const notPassValidFormUpdateInfo = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if (safeValue.trim() === "") {
        // nếu là input là phone hoặc email thì cho phép rỗng
        if (idInput === 'phone_0' || idInput === 'email_0' || idInput==="dob_0") 
            return false
    }

    if(idInput == 'phone_0'){
        return !validPhone(safeValue)
    }
    else if(idInput == 'fullname_0')
        return !validFullname(safeValue)
    else if(idInput == 'dob_0'){
        let today = new Date()
        let chosen = new Date(safeValue)
        let yearOld = Math.floor((today - chosen) / (24*60*60*1000*365.25))
        return yearOld < 10 || yearOld > 130
    }
    else if(idInput == 'email_0')
        return !validateEmail(safeValue)

    return false
}

const messageErrorFormUpdateInfo = (key) => {
    const message = {
        fullname_0: ' *Họ tên không hợp lệ',
        phone_0: ' *Số điện thoại không hợp lệ',
        email_0: ' *Email không hợp lệ',
        dob_0: ' *Ngày sinh không hợp lệ'
    }
    return message[key]
}

const notPassValidFormChangePass = (idInput, value) => {
    if (value.trim() === "") return true 

    if(idInput == 'oldPass_0'){
        let length = value.length
        let spaceContain = containSpace(value)
        return (length < 8) || spaceContain
    }
    else if(idInput == 'newPass_0'){
        let length = value.length
        let spaceContain = containSpace(value)
        return (length < 8) || spaceContain
    }

    return false
}

const messageErrorFormChangePass = (key) => {
    const message = {
        oldPass_0: ' *Không được để trống, tối thiểu 8 kí tự',
        newPass_0: ' *Không được để trống, tối thiểu 8 kí tự'
    }
    return message[key]
}

const notPassValidFormCategory = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if(idInput == 'name_0')
        return !validFullname(safeValue)
    else if(idInput == 'age_permit_0'){
        let age = Number(value)
        return age < 0 || age > 18 || !curtainNumber(value)
    }

    return false
}

const messageErrorFormCategory = (key) => {
    const message = {
        name_0: ' *Tên thể loại không hợp lệ',
        age_permit_0: ' *Độ tuổi không hợp lệ, tối đa 18',
    }
    return message[key]
}

const notPassValidFormVoucher = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if(idInput == 'code_0')
        return !validDescription(safeValue)
    else if(idInput == 'discount_0' || idInput == 'min_order_value_0' || idInput == 'usage_limit_0' || idInput == 'point_cost_0')
        return Number(value) < 0 
    else if(idInput == 'max_discount_value_0')
        return Number(value) < 10000 
    else if(idInput == 'expiry_date_0'){
        let today = new Date()
        let dateChosen = new Date(value)
        return dateChosen - today < 0
    }   
    return false
}

const messageErrorFormVoucher = (key) => {
    const message = {
        code_0: ' *Không hợp lệ',
        discount_0: ' *Không hợp lệ',
        min_order_value_0: ' *Không hợp lệ',
        usage_limit_0: ' *Không hợp lệ',
        point_cost_0: ' *Không hợp lệ',
        max_discount_value_0: ' *Không hợp lệ',
        expiry_date_0: ' *Không hợp lệ',
    }
    return message[key]
}

const notPassValidFormConfirmCode = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if(idInput == 'code_reset_0'){
        return safeValue.length < 8  || containSpace(safeValue)
    }
    
    return false
}

const messageErrorFormConfirmCode = (key) => {
    const message = {
        code_reset_0: ' *Không hợp lệ'
    }
    return message[key]
}

const notPassValidFormTypeRoom = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if(idInput == 'type_name_0'){
        return !validDescription(safeValue)
    }
    else if(idInput == 'description_0'){
        return !validDescription(safeValue)
    }
    
    return false
}

const messageErrorFormTypeRoom = (key) => {
    const message = {
        type_name_0: ' *Không hợp lệ',
        description_0: ' *Không hợp lệ'
    }
    return message[key]
}

const notPassValidFormTheater = (idInput, value) => {
    const safeValue = value ? String(value) : ""

    if(idInput == 'name_0')
        return !validDescription(safeValue)
    else if(idInput == 'count_per_row_0')
        return Number(value) % 2 == 1 || Number(value) > 30
    
    return false
}

const messageErrorFormTheater = (key) => {
    const message = {
        name_0: ' *Không hợp lệ',
        count_per_row_0: '*Vui lòng nhập số chẵn, nhỏ hơn 30'
    }
    return message[key]
}

const notPassValidForm = (idInputError, value, type) => {
    if(type == 'formMovie')
        return notPassValidFormMovie(idInputError,value)
    else if(type =='formLogin')
        return notPassValidFormLogin(idInputError,value) 
    else if(type =='formRegister')
        return notPassValidFormRegister(idInputError,value)
    else if(type =='formUpdateInfo')
        return notPassValidFormUpdateInfo(idInputError,value)
    else if(type =='formCategory')
        return notPassValidFormCategory(idInputError,value)
    else if(type =='formChangePass')
        return notPassValidFormChangePass(idInputError,value)
    else if(type =='formVoucher')
            return notPassValidFormVoucher(idInputError,value)
    else if(type =='formConfirmCode')
        return notPassValidFormConfirmCode(idInputError,value)
    else if(type =='formTheater')
        return notPassValidFormTheater(idInputError,value)
    else if(type =='typeRoom')
        return notPassValidFormTypeRoom(idInputError,value)
    return false
    
}

const messageErrorForm = (idInputError, type) => {
    if(type == 'formMovie')
        return messageErrorFormMovie(idInputError)
    else if(type =='formLogin')
        return messageErrorFormLogin(idInputError)
    else if(type == "formRegister")
        return messageErrorFormRegister(idInputError)
    else if(type =='formUpdateInfo')
        return messageErrorFormUpdateInfo(idInputError)
    else if(type =='formCategory')
        return messageErrorFormCategory(idInputError) 
    else if(type =='formChangePass')
        return messageErrorFormChangePass(idInputError)
    else if(type =='formVoucher')
        return messageErrorFormVoucher(idInputError)
    else if(type =='formConfirmCode')
        return messageErrorFormConfirmCode(idInputError)
    else if(type =='formTheater')
        return messageErrorFormTheater(idInputError)
    else if(type =='typeRoom')
        return messageErrorFormTypeRoom(idInputError)
    return ""
}


export {
    notPassValidForm,
    messageErrorForm
}