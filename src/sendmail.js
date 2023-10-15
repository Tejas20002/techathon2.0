import nodemailer from 'nodemailer';

export const createAndSendEvent = async () => {
    try {
  
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'popeyesiteapi@gmail.com',
          pass: 'suriiqarqbnaegwd',
        },
      });
  
      // Send mail with attachment
      const info = await transporter.sendMail({
        from: `tejashirani55@gmail.com`,
        to: 'tejashirani55@gmail.com',
        subject: 'Event Invitation',
        text: 'Please find attached the event invitation.',
      });
  
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };