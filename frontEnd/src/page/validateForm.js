const curtainNumber = (str) => {
    const regex1 = /[0-9]/
    return regex1.test(str)
}

const notCurtainSpecialCharacter = (str) => {
    //    \p{L} : Bất kỳ ký tự chữ cái nào (bao gồm Latinh, Tiếng Việt có dấu, v.v.)
    //    \p{N} : Bất kỳ ký tự số nào

    // u : Flag quan trọng để hỗ trợ Unicode
    const regex = /^[\p{L}\p{N}\s,.\-@"':?]+$/u
    
    return regex.test(str)
}

const validDescription = (str) => {
    const regex = /^[\p{L}\p{N}\s,.]+$/u
    
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
        let coKyTuDacBiet = !notCurtainSpecialCharacter(value)
        return coChuaSo || coKyTuDacBiet
    }
    else if (idInput == 'actor_0') {
        let coChuaSo = curtainNumber(value)
        let coKyTuDacBiet = !notCurtainSpecialCharacter(value)
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
    
    if(idInput == 'username_0' || idInput == 'password_0')
        return containSpace(value)

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
        return containSpace(value)

    if(idInput == 'password_0'){
        let length = value.length
        let spaceContain = containSpace(value)
        return (length < 8) || spaceContain
    }

    // lấy phủ định để phù hợp về ngữ cảnh
    // not : ko chứa = true
    // hàm đang xét notPass: -> phải phủ định lại true để notPass = false ==> tức là pass 
    if(idInput == 'fullname_0'){
        return !validDescription(value)
    }

    return false
}

const messageErrorFormRegister = (key) => {
    const message = {
        username_0: ' *Tên đăng nhập không hợp lệ',
        password_0: ' *Không được để trống, tối thiểu 8 kí tự',
        fullname_0: ' *Họ tên không hợp lệ'
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
        let length = safeValue.length
        let containText = !curtainNumber(safeValue)
        return (length < 10 || containText)
    }
    else if(idInput == 'fullname_0')
        return !validDescription(safeValue)
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
        return !validDescription(safeValue)
    else if(idInput == 'age_permit_0'){
        let age = Number(value)
        return age < 0 || age > 130 || !curtainNumber(value)
    }

    return false
}

const messageErrorFormCategory = (key) => {
    const message = {
        name_0: ' *Tên thể loại không hợp lệ',
        age_permit_0: ' *Độ tuổi không hợp lệ',
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
    return false
    
}

const messageErrorForm = (idInputError, type) => {
    if(type == 'formMovie')
        return messageErrorFormMovie(idInputError)
    else if(type =='formLogin')
        return messageErrorFormLogin(idInputError)
    else if(type == "formRegister")
        return messageErrorFormRegister(idInputError)
    else if(type =='formCategory')
        return messageErrorFormCategory(idInputError) 
    else if(type =='formChangePass')
        return messageErrorFormChangePass(idInputError)
    return ""
}

export {
    notPassValidForm,
    messageErrorForm
}