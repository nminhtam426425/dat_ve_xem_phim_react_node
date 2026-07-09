import {MovieService} from "../service/index.js"

class MovieController {
    constructor(movieService) {
        this.movieService = movieService
    }

    getAll = async (req, res) => {
        try {
            const result = await this.movieService.getAll()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getMovieById = async (req, res) => {
        try {
            const idMovie = req.params.id_movie
            const result = await this.movieService.getDetailMovie(idMovie)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getMovieTrending = async (req, res) => {
        try {
            const result = await this.movieService.getMovieTrending()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    getForShowtime = async (req, res) => {
        try {
            const result = await this.movieService.getAllForShowtime()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    create = async (req,res) => {
        try {
            const result = await this.movieService.create(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    update = async (req,res) => {
        try {
            const result = await this.movieService.update(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    delete = async (req,res) => {
        try {
            const id = req.params.id
            const result = await this.movieService.delete(id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    deletePoster = async (req,res) => {
        try {
            const result = await this.movieService.deletePosterOnCloud(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    updateMovieTrending = async (req,res) => {
        try {
            const result = await this.movieService.updateMovieTrending(req.body)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default new MovieController(MovieService)