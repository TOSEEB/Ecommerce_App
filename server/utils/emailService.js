import transporter from '../config/email.js'

// Send order confirmation email
export async function sendOrderConfirmationEmail(order) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('Email not configured. Skipping email send.')
    return
  }

  const itemsList = order.items.map(item => `- ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`).join('\n')

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: order.userEmail || order.shipping?.email,
    subject: `Order Confirmation #${order.id} - ShopHub`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0284c7;">Thank you for your order!</h2>
        <p>Your order has been confirmed and is being processed.</p>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Order Details</h3>
          <p><strong>Order Number:</strong> #${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ₹${order.total.toFixed(2)}</p>
          <p><strong>Payment Status:</strong> ${order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</p>
        </div>

        <div style="margin: 20px 0;">
          <h3>Items Ordered</h3>
          <pre style="background: #f9fafb; padding: 15px; border-radius: 4px;">${itemsList}</pre>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Shipping Address</h3>
          <p>${order.shipping.firstName} ${order.shipping.lastName}</p>
          <p>${order.shipping.address}</p>
          <p>${order.shipping.city}, ${order.shipping.zipCode}</p>
          <p>${order.shipping.email}</p>
          <p>${order.shipping.phone}</p>
        </div>

        <p style="color: #6b7280; margin-top: 30px;">
          We'll send you another email when your order ships. If you have any questions, please contact our support team.
        </p>

        <p style="margin-top: 20px;">
          Best regards,<br>
          <strong>ShopHub Team</strong>
        </p>
      </div>
    `,
    text: `
Thank you for your order!

Order Number: #${order.id}
Order Date: ${new Date(order.date).toLocaleString()}
Total Amount: ₹${order.total.toFixed(2)}

Items Ordered:
${itemsList}

Shipping Address:
${order.shipping.firstName} ${order.shipping.lastName}
${order.shipping.address}
${order.shipping.city}, ${order.shipping.zipCode}
${order.shipping.email}
${order.shipping.phone}

We'll send you another email when your order ships.

Best regards,
ShopHub Team
    `,
  }

  await transporter.sendMail(mailOptions)
}

