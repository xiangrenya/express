/**
 * @author xiangry <xiangrenya@gmail.com>
 */

const utils = require('../common/utils')

exports.adminRequired = function (req, res, next) {
    // 管理员：role == 2 
    if (req.payload && req.payload.role === 2) {
        next()
    } else {
        return res.status(403).send({
            success: false,
            message: '只有管理员权限可以操作'
        })
    }
}

exports.userRequired = function (req, res, next) {
    const token = req.headers.authorization || req.query.token
    utils.validateToken(token).then(payload => {
        req.payload = payload
        next()
    }).catch(err => {
        next(err)
    })
}