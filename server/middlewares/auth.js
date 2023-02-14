import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.spilt(' ')[1]

        let decodeData =jwt.verify(token, 'test')
        req.userId = decodeData?.id
    } catch (error) {
        console.log(error)
    }
}

export default auth