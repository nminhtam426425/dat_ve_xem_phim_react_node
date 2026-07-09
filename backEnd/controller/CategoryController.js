import { CategoryService } from "../service/index.js"

class CategoryController {
    getAll = async (req, res) => {
        try {
            const result = await CategoryService.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    create = async (req, res) => {
        try {
            const result = await CategoryService.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    delete = async (req, res) => {
        try {
            const id = req.params.id_cate
            const result = await CategoryService.delete(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    update = async (req, res) => {
        try {
            const result = await CategoryService.update(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new CategoryController()