import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const authorization= req.headers.Authorization || req.headers.authorization
    if (!authorization) return res.status(401).json({ error: "Client không cung cấp token"})
    const token = authorization.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: "Token không hợp lệ !"})
    }
};

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user
        if (!user || !user.role) 
            return res.status(403).json({ message: "Không tìm thấy quyền hạn người dùng." })

        const isAllowed = allowedRoles.includes(user.role.trim())
        if (isAllowed) 
            next()
        else 
            res.status(403).json({ message: "Bạn không có quyền truy cập !" })
    };
};

export {authenticate, authorize}