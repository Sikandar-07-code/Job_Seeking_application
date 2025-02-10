export const sendToken = (user, statusCode, res, message) => {
    console.log(user);  // Add this line to inspect the user object
    console.log(user.getJWTToken);  // Check if this function exists

    const token = user.getJWTToken();  // Ensure this method is defined on the user object

    // Set token in cookie
    res.cookie('token', token, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure : true,
        sameSite: 'none',  // Set to 'none' to allow cookies to be sent across different domains
    });

    res.status(statusCode).json({
        success: true,
        message,
        token,
    });
};
