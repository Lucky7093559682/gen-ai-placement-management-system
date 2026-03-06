# Email Notification Setup Guide

## 📧 Email Notification System

Your GenAI Placement System now has email notifications! Users will receive emails when:

### For Students:
- ✅ New jobs are posted by HR/Admin/Recruiters
- ✅ Application status changes (shortlisted, rejected, etc.)

### For HR/Staff:
- ✅ New applications are submitted by students
- ✅ Job requisitions are created

### For Admin:
- ✅ New job requisitions are created by HR

---

## 🔧 Gmail Configuration (Required)

To enable email notifications, you need to configure Gmail credentials in your backend.

### Step 1: Get Gmail App Password

1. **Go to your Google Account**: https://myaccount.google.com/
2. **Enable 2-Step Verification**:
   - Navigate to Security → 2-Step Verification
   - Follow the setup process
3. **Generate App Password**:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "GenAI Placement System"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 2: Update `.env` File

Open `backend/.env` and update these values:

```env
# Replace with your actual Gmail address
EMAIL_USER=your-email@gmail.com

# Replace with the 16-character app password (no spaces)
EMAIL_PASSWORD=abcdefghijklmnop
```

**Example:**
```env
EMAIL_USER=placement.system@gmail.com
EMAIL_PASSWORD=xyzw1234abcd5678
```

### Step 3: Restart Backend Server

After updating `.env`, restart your backend server:

```bash
# Stop the current server (Ctrl+C in the terminal)
# Then restart
cd backend
npm run dev
```

---

## 🎨 Email Templates

The system sends beautiful HTML emails with:
- Gradient designs matching the app's theme
- Job details (position, company, location, salary)
- Application information
- Direct action buttons
- Professional branding

---

## 🧪 Testing Email Notifications

### Test 1: New Job Notification
1. Login as HR/Admin
2. Create a new job posting
3. All students should receive an email

### Test 2: Application Notification
1. Login as a student
2. Apply for a job
3. HR/Staff/Admin should receive an email

### Test 3: Status Update Notification
1. Login as HR/Staff
2. Update an application status
3. The student should receive an email

### Test 4: Job Requisition Notification
1. Login as HR
2. Create a new job requisition
3. All admins should receive an email

---

## 🔍 Troubleshooting

### Emails not sending?

1. **Check Console Logs**: Look for email-related errors in the backend terminal
2. **Verify Credentials**: Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are correct
3. **Check Gmail Settings**: Ensure 2-Step Verification and App Password are set up
4. **Test with a single email**: Start by sending to one email address

### Common Issues:

**Error: "Invalid login"**
- Your app password is incorrect
- Regenerate the app password and update `.env`

**Error: "Username and Password not accepted"**
- 2-Step Verification not enabled
- Enable it in Google Account Security settings

**Emails going to spam?**
- Add sender email to contacts
- Mark first email as "Not Spam"

**No error but no emails received?**
- Check spam/junk folder
- Verify email addresses in the database
- Check if `EMAIL_USER` and `EMAIL_PASSWORD` are set in `.env`

---

## 📊 Email Notification Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     NEW JOB POSTED                          │
│  HR/Admin creates job → Email sent to ALL STUDENTS          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  APPLICATION SUBMITTED                       │
│  Student applies → Email sent to HR/STAFF/ADMIN             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  STATUS UPDATE                               │
│  HR updates status → Email sent to STUDENT                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  JOB REQUISITION CREATED                     │
│  HR creates requisition → Email sent to ALL ADMINS          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security Notes

- Never commit `.env` file to Git
- Keep your app password secure
- Use environment variables for sensitive data
- App passwords are safer than your actual Gmail password
- You can revoke app passwords anytime from Google Account settings

---

## 💡 Optional: Using Other Email Services

If you don't want to use Gmail, you can modify `backend/utils/emailService.js`:

### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

### For Custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.yourprovider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

---

## 📝 Summary

✅ Email service configured  
✅ Beautiful HTML email templates  
✅ Notifications for jobs, applications, and requisitions  
✅ Automatic email sending on all major actions  
✅ Error handling (won't break app if email fails)  

**Next Steps:**
1. Set up Gmail App Password
2. Update `.env` file
3. Restart backend server
4. Test email notifications

---

For support, check the console logs or contact the development team.
