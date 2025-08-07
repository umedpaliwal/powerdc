# EmailJS Setup Instructions

The contact form on the support page can send emails directly to contact@wattcanvas.com using EmailJS.

## Setup Steps

1. **Create an EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for a free account (200 emails/month free)

2. **Create an Email Service**
   - Go to "Email Services" in your dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note your **Service ID**

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Set up your template:
   
   **Subject:** `New Support Request from {{from_name}}`
   
   **Content:**
   ```
   You have received a new support request from your website:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Company: {{company}}
   
   Message:
   {{message}}
   ```
   
   - Set "To Email" to: `contact@wattcanvas.com`
   - Note your **Template ID**

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - Find your **Public Key**

5. **Add Environment Variables**
   
   Create a `.env.local` file in your project root:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

   For Vercel deployment, add these same variables in:
   - Vercel Dashboard → Your Project → Settings → Environment Variables

## How It Works

- When configured: Emails are sent directly through EmailJS to contact@wattcanvas.com
- When not configured: Falls back to opening the user's email client with pre-filled content
- The form includes: Name, Email, Company, and Message fields

## Testing

1. Fill out the form on `/support`
2. Click "Send Message"
3. Check contact@wattcanvas.com inbox

## Limitations

- Free tier: 200 emails/month
- Upgrade for more emails or custom domains

## Alternative Services

If you prefer other services:
- **Resend**: Modern API, 100 emails/day free
- **SendGrid**: 100 emails/day free
- **Formspree**: 50 submissions/month free