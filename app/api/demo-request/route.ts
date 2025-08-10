import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    const { fullName, company, email, role, timeline, projectDetails } = data;

    // Validate required fields
    if (!fullName || !company || !email || !role || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send notification email to team
    const teamEmail = await resend.emails.send({
      from: "WattCanvas <contact@wattcanvas.com>",
      to: ["contact@wattcanvas.com"], // This goes to your team
      subject: `New Demo Request from ${fullName} at ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #555; margin-bottom: 5px; }
              .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #ddd; }
              .highlight { color: #00E5FF; }
              .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; color: #00E5FF;">New Demo Request</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">A potential customer has requested a WattCanvas demo</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="label">Company:</div>
                  <div class="value">${company}</div>
                </div>
                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="field">
                  <div class="label">Role:</div>
                  <div class="value">${role}</div>
                </div>
                <div class="field">
                  <div class="label">Project Timeline:</div>
                  <div class="value">${timeline}</div>
                </div>
                ${projectDetails ? `
                <div class="field">
                  <div class="label">Project Details:</div>
                  <div class="value">${projectDetails}</div>
                </div>
                ` : ''}
                <div style="margin-top: 30px; padding: 20px; background: #e8f5e9; border-radius: 5px; border-left: 4px solid #4CAF50;">
                  <strong>Next Steps:</strong>
                  <ul style="margin: 10px 0 0 0;">
                    <li>Contact within 24 hours</li>
                    <li>Schedule 30-minute demo</li>
                    <li>Prepare customized presentation based on their role</li>
                  </ul>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the WattCanvas website demo request form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: "WattCanvas <contact@wattcanvas.com>",
      to: [email],
      subject: "Your WattCanvas Demo Request Has Been Received",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); color: white; padding: 40px; border-radius: 10px 10px 0 0; text-align: center; }
              .content { background: white; padding: 40px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #00E5FF; color: #0a0a0a; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
              .highlight { color: #00E5FF; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; color: #00E5FF;">Thank You, ${fullName}!</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 18px;">We've received your demo request</p>
              </div>
              <div class="content">
                <p>Hi ${fullName},</p>
                
                <p>Thank you for your interest in WattCanvas! We're excited to show you how our platform can help you deploy data centers in <span class="highlight">18 months instead of 5+ years</span> using surplus interconnection.</p>
                
                <h3 style="color: #1a1a2e;">What Happens Next?</h3>
                <ul>
                  <li>Our team will contact you within <strong>24 hours</strong></li>
                  <li>We'll schedule a <strong>30-minute personalized demo</strong> at your convenience</li>
                  <li>You'll see how WattCanvas can accelerate your specific project</li>
                </ul>
                
                <h3 style="color: #1a1a2e;">In the Meantime</h3>
                <p>Learn more about surplus interconnection and how it's revolutionizing data center deployment:</p>
                <ul>
                  <li><a href="https://wattcanvas.com/solution">Explore our Solution</a></li>
                  <li><a href="https://wattcanvas.com/resources">Browse Resources & Research</a></li>
                </ul>
                
                <p>If you have any immediate questions, feel free to reach out to us at <a href="mailto:contact@wattcanvas.com">contact@wattcanvas.com</a></p>
                
                <p>We look forward to speaking with you soon!</p>
                
                <p>Best regards,<br>
                The WattCanvas Team</p>
              </div>
              <div class="footer">
                <p>© 2025 WattCanvas. All rights reserved.</p>
                <p>This email was sent to ${email} because you requested a demo on our website.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Demo request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing demo request:", error);
    return NextResponse.json(
      { error: "Failed to process demo request" },
      { status: 500 }
    );
  }
}