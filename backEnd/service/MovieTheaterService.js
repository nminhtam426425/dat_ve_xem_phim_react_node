import { Op } from "sequelize"
import { MovieTheater,Seats, BranchStaff, TypeTheater, Showtimes } from "../model/index.js"
import { findObject, convertObjectForUpdate } from "./validate.js";

class MovieTheaterService {
    constructor(room) {
        this.room = room;
    }

    getAll = async () => {
        return await this.room.findAll()
    }

    // dùng cho chức năng quản lý phòng chiếu của hệ thống
    getTheaterByIdAccount = async (id_account) => {
        let id_branch = await BranchStaff.findOne({
            attributes: ['branch_id'],
            where: {user_id: id_account}
        })
        
        let dataSource =  this.room.findAll({
            attributes: ['id','name','type_id','count_per_row','countStandard','countVIP','countSweetbox'],
            where:{
                branch_id: id_branch.branch_id
            },
            include: [
                {
                    model: TypeTheater,
                    attributes: ['id','type_name','description']
                }
            ]
        })

        return dataSource
    }

    getTheaterForShowtime = async (id_account) => {
        let id_branch = await BranchStaff.findOne({
            attributes: ['branch_id'],
            where: {user_id: id_account}
        })
        
        let dataSource = await this.room.findAll({
            attributes: ['id','name','type_id'],
            where:{
                branch_id: id_branch.branch_id
            },
            include: [
                {
                    model: TypeTheater,
                    attributes: ['id','type_name']
                },
                {
                    model: Seats,
                    attributes: ['id']
                },
            ]
        })
        let result = []

        for(let i of dataSource){
            result.push({
                room_id: i.id,
                name: i.name,
                type: i.TypeTheater.type_name,
                type_id: i.type_id,
                total: i.Seats.length
            })
        }

        return result
    }

    // lấy tất cả các ghế của 1 phòng chiếu
    getListChairOfTheater = async (theater_id) => {
        let dataSource = await this.room.findOne({
            attributes: ['count_per_row','name'],
            where: {id: theater_id},
            include: [
                {
                    model: Seats,
                    attributes: ['seat_number','type']
                }
            ]
        })
        return {
            count: dataSource.dataValues.count_per_row,
            list: dataSource.Seats
        }
    }

    getAllTypeTheater = async () => {
        let dataSource = await TypeTheater.findAll({
            attributes: ['id','type_name','description']
        })
        return dataSource
    }

    create = async ({ name,type,countStandard,countVIP,countSweetbox,arrName,arrType,chairPerLine }, id_user) => {
        try{
            const branch = await BranchStaff.findOne({
                where:{user_id: id_user}
            })

            if(!arrName || !arrType || !chairPerLine || !name)
                throw new Error("Thiếu tham số đầu vào !")

            let roomIsCreated = await this.room.create({
                name,
                branch_id: branch.branch_id,
                type_id: type,
                count_per_row: chairPerLine,
                countStandard,
                countVIP,
                countSweetbox
            })

            const typeBranch = await TypeTheater.findOne({
                where:{id: roomIsCreated.type_id}
            })

            let listChairOfRoom = this.createRoom(arrName,chairPerLine,arrType,roomIsCreated.id)

            listChairOfRoom =  await Seats.bulkCreate(listChairOfRoom)

            return {
                id: roomIsCreated.id,
                name: roomIsCreated.name,
                branch_id: roomIsCreated.branch_id,
                type:roomIsCreated.type_id,
                type_name: typeBranch.type_name,
                description: typeBranch.description
            }
        }
        catch(err){
            throw new Error(err.message)
        }
    }

    update = async ({ room_id,name,type,countStandard,countVIP,countSweetbox,arrName,arrType,chairPerLine }) => {
        try{
            let showtime = await Showtimes.findOne({
                    attributes: ['id'],
                    where: {
                        start_time: {
                            [Op.gte]: new Date()
                        },
                        room_id: room_id
                    }
            })
            // có suất chiếu - không cho sửa
            if(showtime)
                 throw new Error("Hiện đang có suất chiếu, không thể cập nhật !")
            
            
            // xóa các ghế 
            await Seats.destroy({
                    where: {
                        room_id: room_id
                    }
            })

            // tiến hành sửa
            let roomUpdate = await findObject(this.room, 'id', room_id)

            let sourceObj = {name,type_id: type, count_per_row: chairPerLine, countStandard,countVIP,countSweetbox}
            roomUpdate = convertObjectForUpdate(roomUpdate, sourceObj)
            await roomUpdate.save()

            // tiến hành tạo danh sách ghế mới
            let listChairOfRoom = this.createRoom(arrName,chairPerLine,arrType,room_id)

            listChairOfRoom =  await Seats.bulkCreate(listChairOfRoom)

            const typeBranch = await TypeTheater.findOne({
                where:{id: type}
            })

            return {
                id: roomUpdate.id,
                name: roomUpdate.name,
                branch_id: roomUpdate.branch_id,
                type: roomUpdate.type_id,
                type_name: typeBranch.type_name,
                description: typeBranch.description
            }

        }
        catch(err){
            throw new Error(err.message)
        }
    }

    // trả về một mảng các ghế với loại tương ứng
    // arr là tên của ghế [A, B, C, ...]
    // count là số ghế mỗi dãy 
    // type là loại của ghế
    // roomId là phòng chiếu
    // xet điều kiện để tạo ghế kiểu Sweetbox ccó seat_number cho đẹp, như là A1-A2 :)))
    createListChair = (arr, count, type, roomId)  => {
        let list = []
        for(let i of arr ){
            if(type=='Sweetbox'){
                for(let j = 1; j <= count; j+=2){
                    list.push({
                        room_id: roomId,
                        seat_number: `${i+j}-${i+(j+1)}`,
                        type: type
                    })
                }
            }
            else{
                for(let j = 1; j <= count; j++){
                    list.push({
                        room_id: roomId,
                        seat_number: i+j,
                        type: type
                    })
                }
            }
        }
        return list
    }

    createRoom = (arrName, count, arrType, roomId)  => {
        let lenghtOfType = arrType.length
        let lengthOfName = arrName.length
        if(lenghtOfType !== lengthOfName)
            throw new Error("Dữ liệu đầu vào không hợp lệ, số lượng loại ghế và tên không khớp về số lượng !")
        
        let result = []
        for(let i = 0; i < lenghtOfType; i++ ){
            let list = this.createListChair(arrName[i],count,arrType[i],roomId)
            result = [...result,...list]
        }
        return result
    }   

    delete = async (id) => {
        try{
            // const roomDelete = await this.room.findOne({
            //     where: { id: id}
            // })
            // if(!roomDelete)
            //     throw new Error("Không tìm thấy room !")

            // return await roomDelete.destroy()
            return this.room.destroy({
                where: {id: id}
            })
        }
        catch(err){
            throw new Error(err.message)
        }
    }
}

export default new MovieTheaterService(MovieTheater)