// utils/Utils.ts

const nodemailer = require('nodemailer');

export async function sendPasswordEmail(username: any, email: any, password: any) {
    let testAccount = await nodemailer.createTestAccount();
  
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  
    let mailOptions = {
      from: '"Your App" <yourapp@example.com>',
      to: email, // recipient's email
      subject: 'Your Account Details',
      html: `
        <h3>Hello ${username},</h3>
        <p>Thank you for signing up. Here are your account details:</p>
        <ul>
          <li><strong>Username:</strong> ${username}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Password:</strong> ${password}</li>
        </ul>
        <p>Please keep this information safe.</p>
      `
    };
  
    let info = await transporter.sendMail(mailOptions);
  
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }

// Helper function to calculate TotalAmount
export const calculateTotalAmount = (products: { name: string, quantity: number, price: number }[]) => {
    return products.reduce((total, product) => total + product.quantity * product.price, 0);
};