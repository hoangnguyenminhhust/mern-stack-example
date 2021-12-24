module.exports = {
    success: (res, data) => {
        return res.status(200).send({
            success: true,
            code: 200,
            data: data

        })
    },
    failed: (res, msg) => {
        return res.status(200).send({
            success: false,
            code: 400,
            data: msg

        })
    },
    catchExp: (res, msg) => {
        return res.status(400).send({
            success: false,
            code: 400,
            data: msg

        })
    }
}