import nodemailer from 'nodemailer';

// Create transporter lazily so it always reads the env vars at call-time
// (after dotenv.config() has already been called by server.js)
const getTransporter = () => nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email notification for a new reservation
 * to the specified admin email address.
 * 
 * @param {Object} reservationData - The data of the created reservation
 */
export const sendReservationEmail = async (reservationData) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER, // Sender address
            to: process.env.SMTP_USER, // Admin email to receive the notification
            subject: 'New Reservation Received',
            html: `
                <h2>New Reservation Received</h2>
                <p>A new reservation has been submitted with the following details:</p>
                <ul>
                    <li><strong>Name:</strong> ${reservationData.name}</li>
                    <li><strong>Email:</strong> ${reservationData.email}</li>
                    <li><strong>Phone:</strong> ${reservationData.phone}</li>
                    <li><strong>Guests:</strong> ${reservationData.guests}</li>
                    <li><strong>Date:</strong> ${new Date(reservationData.date).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${reservationData.time}</li>
                    <li><strong>Special Requests:</strong> ${reservationData.specialRequests || 'None'}</li>
                </ul>
                <br />
                <p>Regards,<br>Indian Panorama System</p>
            `
        };

        const info = await getTransporter().sendMail(mailOptions);
        console.log('-----------------------------------------');
        console.log('✅ EMAIL SENT SUCCESS: Reservation Notification (Admin)');
        console.log('Message ID:', info.messageId);
        console.log('-----------------------------------------');
        return true;
    } catch (error) {
        console.error('-----------------------------------------');
        console.error('❌ EMAIL SEND ERROR: Reservation Notification (Admin)');
        console.error('Error details:', error);
        console.error('-----------------------------------------');
        return false;
    }
};

/**
 * Sends a confirmation email to the customer who made a reservation.
 * 
 * @param {Object} reservationData - The data of the created reservation
 */
export const sendCustomerConfirmationEmail = async (reservationData) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER, // Sender address
            to: reservationData.email, // Customer email
            subject: 'Reservation Confirmation - Indian Panorama',
            html: `
                <h2>Thank you for choosing Indian Panorama</h2>
                <p>Dear ${reservationData.name},</p>
                <p>We have successfully received your reservation request. We look forward to hosting you!</p>
                <h3>Your Reservation Details:</h3>
                <ul>
                    <li><strong>Date:</strong> ${new Date(reservationData.date).toLocaleDateString()}</li>
                    <li><strong>Time:</strong> ${reservationData.time}</li>
                    <li><strong>Guests:</strong> ${reservationData.guests}</li>
                </ul>
                <p>If you need to modify or cancel your reservation, please contact us directly.</p>
                <br />
                <p>Best Regards,<br>Indian Panorama Chelsea</p>
            `
        };

        const info = await getTransporter().sendMail(mailOptions);
        console.log('-----------------------------------------');
        console.log('✅ EMAIL SENT SUCCESS: Customer Confirmation');
        console.log('Message ID:', info.messageId);
        console.log('-----------------------------------------');
        return true;
    } catch (error) {
        console.error('-----------------------------------------');
        console.error('❌ EMAIL SEND ERROR: Customer Confirmation');
        console.error('Error details:', error);
        console.error('-----------------------------------------');
        return false;
    }
};

/**
 * Sends an email notification for a group booking request.
 * 
 * @param {Object} bookingData - The data of the created group booking
 */
export const sendGroupBookingEmail = async (bookingData) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: 'princeyadav1803@gmail.com',
            subject: 'New Group Booking Request Received',
            html: `
                <h2>New Group Booking Request</h2>
                <p>A new group booking request has been submitted:</p>
                <ul>
                    <li><strong>Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</li>
                    <li><strong>Email:</strong> ${bookingData.email}</li>
                    <li><strong>Phone:</strong> ${bookingData.phone}</li>
                    <li><strong>Event:</strong> ${bookingData.eventDescription}</li>
                    <li><strong>Status:</strong> ${bookingData.status}</li>
                </ul>
                <br />
                <p>Regards,<br>Indian Panorama System</p>
            `
        };

        const info = await getTransporter().sendMail(mailOptions);
        console.log('-----------------------------------------');
        console.log('✅ EMAIL SENT SUCCESS: Group Booking Notification');
        console.log('Message ID:', info.messageId);
        console.log('-----------------------------------------');
        return true;
    } catch (error) {
        console.error('-----------------------------------------');
        console.error('❌ EMAIL SEND ERROR: Group Booking Notification');
        console.error('Error details:', error);
        console.error('-----------------------------------------');
        return false;
    }
};
