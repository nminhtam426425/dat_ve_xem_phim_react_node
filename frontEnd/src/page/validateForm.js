const curtainNumber = (str) => {
    const regex1 = /[0-9]/
    return regex1.test(str)
}

const notCurtainSpecialCharacter = (str) => {
    //    \p{L} : Bất kỳ ký tự chữ cái nào (bao gồm Latinh, Tiếng Việt có dấu, v.v.)
    //    \p{N} : Bất kỳ ký tự số nào

    // u : Flag quan trọng để hỗ trợ Unicode
    const regex = /^[\p{L}\p{N}\s,.\-@]+$/u;
    
    return regex.test(str)
}

const validDescription = (str) => {
    const regex = /^[\p{L}\p{N}\s,.]+$/u;
    
    return regex.test(str)
}

const allowEmpty = (str) => {
    return (str.length == 0) ? true : false
}

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
    else if (idInput === 'actor_0') {
        let coChuaSo = curtainNumber(value)
        let coKyTuDacBiet = !notCurtainSpecialCharacter(value)
        return coChuaSo || coKyTuDacBiet
    }
    else if (idInput === 'synopsis_0') {
        return !notCurtainSpecialCharacter(value)
    }
    return false
}

const messageErrorFormMovie = (key) => {
    const message = {
        title_0: ' *Tên phim không chứa kí tự dặc biệt !',
        director_0: ' *Không đúng định dạng tên !',
        actor_0: ' *Vui lòng nhập đúng định dạng !',
        synopsis_0: ' *Không chứa kí tự dặc biêt !'
    }
    return message[key]
}

export {
    notPassValidFormMovie,
    messageErrorFormMovie
}