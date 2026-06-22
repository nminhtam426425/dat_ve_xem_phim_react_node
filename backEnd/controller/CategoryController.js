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
}

export default new CategoryController()