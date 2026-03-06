# ProfileModal Integration Guide

## Overview
The new `ProfileModal` component provides a complete profile management interface with image upload/crop functionality. It can be integrated into any dashboard.

## Quick Integration Steps

### 1. Import the Component
```javascript
import ProfileModal from '../components/common/ProfileModal';
```

### 2. Add State to Your Dashboard
```javascript
const [showProfileModal, setShowProfileModal] = useState(false);
```

### 3. Add the Modal to Your JSX
```javascript
<ProfileModal
  user={user}
  isOpen={showProfileModal}
  onClose={() => setShowProfileModal(false)}
  isDark={isDark}
  colors={colors}
/>
```

### 4. Add a Button to Trigger It
```javascript
<button onClick={() => setShowProfileModal(true)}>
  View Profile
</button>
```

---

## Complete Examples by Dashboard

### Student Dashboard
**File:** `src/pages/student/Dashboard.jsx`

**Location to Add:** Near the top of your JSX, after your existing state declarations:

```javascript
import ProfileModal from '../../components/common/ProfileModal';

// Inside component:
const [showProfileModal, setShowProfileModal] = useState(false);

// Add this JSX near the end, just before the closing main tag:
<ProfileModal
  user={user}
  isOpen={showProfileModal}
  onClose={() => setShowProfileModal(false)}
/>

// Add a button to trigger it (in Topbar or Sidebar):
<button
  onClick={() => setShowProfileModal(true)}
  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
>
  <User className="w-5 h-5" />
  Profile
</button>
```

---

### Staff Dashboard
**File:** `src/pages/staff/Dashboard.jsx`

If you have an existing profile modal or profile section, you can replace it:

```javascript
import ProfileModal from '../../components/common/ProfileModal';

const [showProfileModal, setShowProfileModal] = useState(false);

// Replace your existing profile button click handler:
const showProfile = () => setShowProfileModal(true);

// Add component:
<ProfileModal
  user={user}
  isOpen={showProfileModal}
  onClose={() => setShowProfileModal(false)}
/>
```

---

### Admin Dashboard
**File:** `src/pages/admin/Dashboard.jsx`

```javascript
import ProfileModal from '../../components/common/ProfileModal';

// Add state:
const [showProfileModal, setShowProfileModal] = useState(false);

// Add component in JSX:
<ProfileModal
  user={user}
  isOpen={showProfileModal}
  onClose={() => setShowProfileModal(false)}
/>

// Add trigger button:
<button
  onClick={() => setShowProfileModal(true)}
  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition"
>
  <Settings className="w-5 h-5" />
  My Profile
</button>
```

---

### HR Dashboard (if exists)
**File:** `src/pages/hr/Dashboard.jsx`

Same pattern as Admin Dashboard above.

---

## Props Reference

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `user` | Object | Yes | - | User object with: name, email, phone, role, avatar |
| `isOpen` | Boolean | Yes | - | Controls modal visibility |
| `onClose` | Function | Yes | - | Called when modal is closed |
| `isDark` | Boolean | No | false | Enable dark mode styling |
| `colors` | Object | No | defaultColors | Custom color palette |

### User Object Structure
```javascript
{
  _id: "user123",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  role: "student",  // 'student', 'staff', 'hrm', 'admin'
  avatar: "url-to-image", // optional
  designation: "Software Developer"
}
```

---

## Color Palette (Optional)

If you want custom colors, pass a colors object:

```javascript
const colors = {
  bg: '#ffffff',
  bgSecondary: '#f8f9fa',
  text: '#1a1a1a',
  textSecondary: '#666666',
  border: '#e0e0e0',
  card: '#ffffff',
  hover: '#f0f0f0',
};

<ProfileModal
  user={user}
  isOpen={showProfileModal}
  onClose={() => setShowProfileModal(false)}
  colors={colors}
/>
```

---

## Features Included

✅ **Profile Picture Management**
- File upload with preview
- Image cropping with zoom (0.5x - 3x)
- Two crop modes: Scale and Zoom
- Dark mode support

✅ **Personal Information**
- Name field
- Email field
- Phone field
- Role display (read-only)

✅ **Contact Information Display**
- Email with icon
- Phone with icon
- Beautiful layout

✅ **Responsive Design**
- Mobile-friendly
- Works on all screen sizes
- Animated modal entrance

---

## Integration Checklist

- [ ] Import ProfileModal in dashboard
- [ ] Add useState for showProfileModal
- [ ] Add ProfileModal component to JSX
- [ ] Add button to trigger modal
- [ ] Pass user object correctly
- [ ] Test on light and dark modes
- [ ] Verify image upload works
- [ ] Check responsive design on mobile

---

## Troubleshooting

**Modal doesn't appear?**
- Check `isOpen` prop is set correctly
- Verify `onClose` function updates state

**Images not uploading?**
- Ensure backend endpoint `/auth/update-avatar` exists
- Check API service is properly configured

**Styling issues?**
- Pass `isDark` prop matching your theme
- Use `colors` prop for custom styling

---

## Performance Notes

- Modal uses React.useState for local state
- Image cropping is done client-side (no server load)
- Modal is unmounted when closed (efficient rendering)
- Supports lazy loading of large components

