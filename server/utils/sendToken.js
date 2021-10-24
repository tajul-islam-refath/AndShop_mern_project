const sendToken = (user, statusCode, res) => {

    // create Token 
    const token = user.getToken();
    // console.log(token)
    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + 1 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })

}

module.exports = sendToken;