<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset - GOQii Task Manager</title>
</head>

<body
    style="
    margin: 0;
    padding: 0;
    background-color: #f4f6f8;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background-color: #f4f6f8; padding: 40px 15px;">

        <tr>
            <td align="center">

                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="
                        max-width: 600px;
                        width: 100%;
                        background-color: #ffffff;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                    ">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="
                                background-color: #0d6efd;
                                padding: 30px 20px;
                            ">

                            <h1
                                style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 28px;
                                font-weight: 600;
                            ">
                                GOQii
                            </h1>

                            <p
                                style="
                                margin: 8px 0 0;
                                color: #e8f1ff;
                                font-size: 14px;
                            ">
                                Task Manager
                            </p>

                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 35px;">

                            <h2
                                style="
                                margin: 0 0 20px;
                                color: #222222;
                                font-size: 24px;
                            ">
                                Password Reset Request
                            </h2>

                            <p
                                style="
                                margin: 0 0 15px;
                                font-size: 16px;
                                line-height: 1.6;
                            ">
                                Hello,
                            </p>

                            <p
                                style="
                                margin: 0 0 20px;
                                font-size: 16px;
                                line-height: 1.6;
                                color: #555555;
                            ">
                                We received a request to reset your password for
                                your GOQii Task Manager account.
                            </p>

                            <p
                                style="
                                margin: 0 0 30px;
                                font-size: 16px;
                                line-height: 1.6;
                                color: #555555;
                            ">
                                Click the button below to create a new password.
                            </p>

                            <!-- Button -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td align="center">

                                        <a href="{{ $resetUrl }}"
                                            style="
                                                display: inline-block;
                                                background-color: #0d6efd;
                                                color: #ffffff;
                                                text-decoration: none;
                                                padding: 14px 30px;
                                                border-radius: 6px;
                                                font-size: 16px;
                                                font-weight: 600;
                                            ">
                                            Reset Password
                                        </a>

                                    </td>
                                </tr>
                            </table>

                            <!-- Expiry -->
                            <div
                                style="
                                margin-top: 30px;
                                padding: 15px;
                                background-color: #fff8e1;
                                border-left: 4px solid #ffc107;
                                border-radius: 4px;
                            ">

                                <p
                                    style="
                                    margin: 0;
                                    color: #6b5b00;
                                    font-size: 14px;
                                    line-height: 1.5;
                                ">
                                    This password reset link will expire in
                                    <strong>60 minutes</strong>.
                                </p>

                            </div>

                            <p
                                style="
                                margin: 30px 0 0;
                                font-size: 14px;
                                line-height: 1.6;
                                color: #777777;
                            ">
                                If you did not request a password reset,
                                you can safely ignore this email.
                                Your password will remain unchanged.
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="
                                background-color: #f8f9fa;
                                padding: 25px 20px;
                                border-top: 1px solid #eeeeee;
                            ">

                            <p
                                style="
                                margin: 0 0 8px;
                                color: #555555;
                                font-size: 14px;
                            ">
                                Thanks,
                            </p>

                            <p
                                style="
                                margin: 0;
                                color: #0d6efd;
                                font-size: 15px;
                                font-weight: 600;
                            ">
                                GOQii Task Manager Team
                            </p>

                            <p
                                style="
                                margin: 12px 0 0;
                                color: #999999;
                                font-size: 12px;
                            ">
                                This is an automated email. Please do not reply.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>

</html>
