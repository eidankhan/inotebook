const jwt = require('jsonwebtoken')
const JWT_SECRET = "ekhan"

const fetchUserDetails = (request, response, next) => {
    const token = request.header('auth-token');
    if(!token){
        return response.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        request.user = data.user
        next()
    } catch (error) {
        return response.status(401).send({error: "Please authenticate using a valid token"})
    }
}

module.exports = fetchUserDetails