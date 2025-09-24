exports.passwordTemplate = (name, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let template = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            font-family: Arial, sans-serif;
            background-color: #f7f9fc;
            padding: 20px;
            color: #333;
        }

        
    </style>
</head>

<body>
    <div class="email-container">
        <h2>Welcome to our company</h2>

        <p>Hi, ${name}</p>
        <p>Your account has been created by the admin. Below is a temporary password that you can use to log in. Please
            change the password after logging in</p>

        <div class="password-container">
            password: ${password}
        </div>

        <p>If you have any questions or need assistance, feel free to contact our support team.</p>

        <p>Best regards,<br>Team Admin</p>

        <div class="footer">
            © 2025 Company Name. All rights reserved.
        </div>
    </div>
</body>

</html>`
            resolve(template);
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}