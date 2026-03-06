# Quick Testing Guide - Job Posting Feature

## Setup Status ✅

```
Backend:  http://localhost:5001/api
Frontend: http://localhost:5174
Database: MongoDB (connected)
```

---

## Step-by-Step Testing

### 1. ✅ Test Backend Health
```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:5001/api/health
# Expected: {"status":"Backend is running!","ai_status":"Connected to Gemini"}
```

### 2. ✅ Test GET Jobs Endpoint
```powershell
$headers = @{"Content-Type" = "application/json"}
Invoke-WebRequest -UseBasicParsing http://localhost:5001/api/jobs -Headers $headers
# Expected: JSON array of jobs
```

### 3. ✅ Open Frontend
```powershell
# Frontend is running on: http://localhost:5174
# Open in browser and login with authorized user (admin/recruiter/hr role)
```

### 4. ✅ Navigate to Job Management
- Click on **HR Dashboard** or **Job Management** menu
- You should see the new Job Management interface

### 5. ✅ Test Job Posting

#### Click "Post New Job" button

**Fill Form:**
- **Position:** Senior React Developer *
- **Company:** TechCorp Innovations *
- **Location:** Bangalore, KA *
- **Job Type:** Full-time
- **Salary:** ₹12-18 LPA
- **Deadline:** 2026-03-08
- **Skills:** React, TypeScript, Node.js
- **Description:** Looking for experienced React developer...
- **Eligibility:** Minimum CGPA 7.0

**Click "Post Job"** 
- ✅ Should see loading spinner
- ✅ Should see success message
- ✅ Modal should close automatically
- ✅ Job should appear in requisitions table

### 6. ✅ Test Authorization Error

**Login as Student User and Try to Post Job:**
- Should see error message: "Access denied. You have 'student' role..."
- Error should be clear and helpful

### 7. ✅ Test Job Requisitions Section

Scroll down to see:
- ✅ **4 Overview Cards:** Pending Approvals, In Recruitment, Offers Extended, Talent Pool
- ✅ **Requisitions Table:** Shows active requisitions with status, applicants, offers
- ✅ **Offer Management Table:** Shows pending offers from candidates
- ✅ **Talent Pool Section:** Shows top rated talents

### 8. ✅ Test Job Management Actions

**Edit Job:**
- Click edit icon on job card
- Modal should auto-populate with existing data
- Change some fields and click "Update Job"
- ✅ Should show success message

**Delete Job:**
- Click delete icon
- Confirm deletion
- ✅ Should show success message
- ✅ Job should disappear from list

### 9. ✅ Test Form Validation

**Try to submit incomplete form:**
1. Leave "Position" empty → Should show error
2. Leave "Company" empty → Should show error
3. Leave "Location" empty → Should show error
4. Fill all required fields → Form should submit

### 10. ✅ Test Search & Filter

- **Search:** Type "Developer" → Should filter jobs
- **Status Filter:** Select "Active" → Should filter by status
- **Multiple filters:** Combine search + status → Should work together

---

## Test Data

### Test Users by Role

| Role | Can Post Jobs? | Test User |
|------|---|---|
| **admin** | ✅ Yes | admin@example.com |
| **recruiter** | ✅ Yes | recruiter@example.com |
| **hr** | ✅ Yes | hr@example.com |
| **staff** | ❌ No | staff@example.com |
| **student** | ❌ No | student@example.com |

### Sample Job to Post

```
Position: Senior Full Stack Developer
Company: FinTech Solutions
Location: Remote
Job Type: Full-time
Salary: ₹15-22 LPA
Deadline: 2026-03-15
Skills: MongoDB, Express, React, Node.js
Description: 
We are looking for an experienced Full Stack developer 
to join our growing team. You will work on cloud-based 
fintech applications using modern tech stack.

Eligibility: Minimum CGPA 7.0, CS/IT Branch preferred
```

---

## Expected Behavior

### ✅ Happy Path (Authorized User)
1. User logs in with admin/recruiter/hr role
2. Navigates to Job Management
3. Clicks "Post New Job"
4. Fills form with valid data
5. Clicks "Post Job"
6. Sees loading spinner → Success message → Modal closes
7. New job appears in requisitions table

### ❌ Unhappy Path (Unauthorized User)
1. User logs in with student/staff role
2. Navigates to Job Management
3. Clicks "Post New Job"
4. Fills form with valid data
5. Clicks "Post Job"
6. Sees authorization error message
7. Modal stays open

### ⚠️ Validation Path
1. User leaves required fields empty
2. Tries to submit form
3. Sees validation error message
4. Form prevents submission
5. User must fill required fields to proceed

---

## Common Commands

### Check Backend Logs
```powershell
# If backend needs restart:
cd "c:\Users\VAMSI VALLURI\Downloads\demo-genai-placement-system\backend"
npm start
```

### Check Frontend Logs
```powershell
# Terminal where npm run dev is running
# Browser console (F12 → Console tab)
```

### Test API Direct
```powershell
# Create job (replace TOKEN with actual JWT)
$body = @{
    company = "TestCorp"
    position = "Test Developer"
    location = "Test City"
    jobType = "Full-time"
    description = "Test job"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "Authorization" = "Bearer YOUR_JWT_TOKEN"
}

Invoke-WebRequest -UseBasicParsing `
  -Method POST `
  -Uri http://localhost:5001/api/jobs `
  -Headers $headers `
  -Body $body
```

---

## Verification Checklist

- [ ] Backend running on port 5001
- [ ] Frontend running on port 5174
- [ ] Health check returns success
- [ ] Admin can post jobs
- [ ] Recruiter can post jobs
- [ ] HR can post jobs
- [ ] Student cannot post jobs (denied)
- [ ] Form validation works
- [ ] Success messages show
- [ ] Error messages show
- [ ] Jobs appear in table
- [ ] Job requisitions section displays
- [ ] Offer management section displays
- [ ] Talent pool section displays
- [ ] Edit functionality works
- [ ] Delete functionality works
- [ ] Search filters work
- [ ] Status filters work

---

## Troubleshooting During Testing

| Issue | Solution |
|-------|----------|
| 404 on health check | Backend not running. Run: `npm start` in backend folder |
| CORS errors | Check backend CORS config includes `http://localhost:5174` |
| Authorization denied | Verify user role is admin/recruiter/hr in database |
| Form won't submit | Check browser console for errors, verify all required fields filled |
| Data not persisting | Check MongoDB connection, verify no validation errors |
| Port 5001 in use | Kill process: `Get-Process node \| Stop-Process` |
| Token invalid | Clear localStorage, login again |

---

## Next Steps After Testing

1. ✅ Verify all tests pass
2. ✅ Check error messages are helpful
3. ✅ Verify authorization works correctly
4. ✅ Test on different user roles
5. ✅ Check performance (loading times, etc.)
6. ✅ Test edge cases (very long text, special characters, etc.)
7. ✅ Verify data persists after page refresh
8. ✅ Test on different browsers if needed

---

**Ready to Test!** 🚀
