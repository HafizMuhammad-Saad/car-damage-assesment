import express from "express";
import multer from "multer";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config();

const app = express();
app.use(cors());

// Multer config: store files in memory as buffers
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ============================
// 🚗 Route: Send Assessment Email
// ============================
app.post("/api/sendEmail", upload.any(), async (req, res) => {
    try {
        const fields = req.body;
        const files = req.files || [];

        // ✅ Parse basic data
        const name = fields.name || "N/A";
        const email = fields.email || "N/A";
        const mobile = fields.mobile || "N/A";
        const address = fields.address || "N/A";
        const carNumberPlate = fields.carNumberPlate || "N/A";
        const serviceType = fields.serviceType || "N/A";
        const carMake = fields.car_make || "N/A";
        const carModel = fields.car_model || "N/A";
        const totalDamageAreas = fields.totalDamageAreas || "0";
        const submittedAt = fields.submittedAt || new Date().toISOString();

        // ✅ Collect damage fields (they come as `damage_1`, `damage_2`, etc.)
        const damages = Object.keys(fields)
            .filter((key) => key.startsWith("damage_"))
            .map((key) => fields[key]);

        // ✅ Prepare attachments (embed images in email)
        const attachments = [];
        let imagesHTML = `
  <div style="
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  ">
`;

        files.forEach((file, i) => {
            const cid = `image${i}@damage`;
            attachments.push({
                filename: file.originalname,
                content: file.buffer,
                contentType: file.mimetype,
                cid,
            });

            imagesHTML += `
    <div style="
      width: 100px;
      height: 100px;
      border: 1px solid #ddd;
      border-radius: 6px;
      overflow: hidden;
      flex: 0 0 auto;
    ">
      <img 
        src="cid:${cid}" 
        alt="damage" 
        style="
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        "
      />
    </div>
  `;
        });

        imagesHTML += `</div>`;


        // ✅ HTML Email Template
        const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 700px; margin:auto; border:1px solid #eee; border-radius:8px; overflow:hidden;">
    <div style="background:#fb5c14; color:#fff; padding:18px 24px; text-align:center;">
      <h2 style="margin:0; font-weight:600;">Vehicle Damage Assessment Report</h2>
    </div>

    <div style="padding:24px;">
      <h3 style="border-bottom:2px solid #fb5c14; padding-bottom:6px;">Customer Details</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <tr><td style="padding:6px 0;"><b>Name:</b></td><td>${name}</td></tr>
        <tr><td style="padding:6px 0;"><b>Email:</b></td><td>${email}</td></tr>
        <tr><td style="padding:6px 0;"><b>Mobile:</b></td><td>${mobile}</td></tr>
        <tr><td style="padding:6px 0;"><b>Address:</b></td><td>${address}</td></tr>
      </table>

      <h3 style="border-bottom:2px solid #fb5c14; padding-bottom:6px;">Vehicle Information</h3>
      <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <tr><td style="padding:6px 0;"><b>Number Plate:</b></td><td>${carNumberPlate}</td></tr>
        <tr><td style="padding:6px 0;"><b>Service Type:</b></td><td>${serviceType}</td></tr>
        <tr><td style="padding:6px 0;"><b>Make:</b></td><td>${carMake}</td></tr>
        <tr><td style="padding:6px 0;"><b>Model:</b></td><td>${carModel}</td></tr>
      </table>

      <h3 style="border-bottom:2px solid #fb5c14; padding-bottom:6px;">Reported Damages</h3>
      <ul style="margin:0; padding-left:18px; margin-bottom:20px;">
        ${damages.map((d) => `<li>${d}</li>`).join("")}
      </ul>

      <h3 style="border-bottom:2px solid #fb5c14; padding-bottom:6px;">Attached Images</h3>
        ${imagesHTML}

      <p style="font-size:13px; color:#777; border-top:1px solid #eee; padding-top:10px;">
        <b>Total Damage Areas:</b> ${totalDamageAreas}<br/>
        <b>Submitted At:</b> ${new Date(submittedAt).toLocaleString()}
      </p>
    </div>

    <div style="background:#fafafa; text-align:center; padding:12px; font-size:12px; color:#999;">
      © ${new Date().getFullYear()} Quick Repair Vehicle Damage Assessment
    </div>
  </div>
`;


        // ✅ Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // ✅ Send email
        await transporter.sendMail({
            from: `Vehicle Assessment <${process.env.TO_EMAIL}>`,
            to: process.env.EMAIL_FROM,                               // your inbox
            replyTo: fields.email,
            subject: `New Vehicle Damage Assessmentfrom ${fields.name}`,
            html,
            attachments,
        });

        // 2. Send thank-you email to user
        await transporter.sendMail({
            from: `Vehicle Assessment <${process.env.EMAIL_FROM}>`,
            to: fields.email,
            subject: "✅ Thank You for Submitting Your Assessment",
            html: `
    <p>Dear ${fields.name},</p>
    <p>We have received your damage assessment for your car (${fields.car_make} ${fields.car_model}).</p>
    <p>Best regards,<br/>Car Service Team</p>
  `,
        });


        res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});


// ✅ Export for serverless
export default app;
// export const handler = serverless(app);