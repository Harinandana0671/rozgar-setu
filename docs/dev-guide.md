# Rozgar Setu - Development Guide

This guide is for developers who want to contribute to or extend the Rozgar Setu project.

---

## Project Structure

```
rozgar_setu/
├── src/
│   ├── index.html              # Home page
│   ├── worker-dashboard.html   # Worker view
│   ├── employer-dashboard.html # Employer view
│   ├── add-profile.html        # Worker profile form
│   ├── post.html               # Job posting form
│   ├── search-results.html     # Search results
│   ├── profile.html            # User profile page
│   ├── worker-profile.html     # Worker detail view
│   └── main.js                 # Core JavaScript functions
├── public/
│   └── style.css               # Global styles
├── docs/
│   ├── architecture.md         # System architecture
│   ├── api-docs.md            # Backend API docs
│   ├── user-guide.md          # User documentation
│   ├── dev-guide.md           # This file
│   └── deployment.md          # Deployment instructions
├── README.md                   # Project overview
├── package.json                # Project metadata
└── LICENSE                     # MIT License
```

---

## Setting Up Development Environment

### Prerequisites
- Git
- A code editor (VS Code recommended)
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Python 3 or Node.js (for local server)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd rozgar_setu
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js (http-server)
   npm install -g http-server
   http-server
   ```

3. **Open in browser**
   ```
   http://localhost:8000/src/index.html
   ```

---

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Add comments for complex sections
- Use meaningful IDs and classes
- Indent with 4 spaces

```html
<!-- Example: Good HTML -->
<form id="jobForm" class="form-container">
    <div class="form-group">
        <label for="jobTitle">Job Title *</label>
        <input type="text" id="jobTitle" required>
    </div>
</form>
```

### CSS
- Use descriptive class names
- Mobile-first approach
- Use CSS variables for colors and spacing
- Keep selectors simple

```css
/* Example: Good CSS */
:root {
    --primary-color: #007bff;
    --spacing-unit: 8px;
}

.form-group {
    margin-bottom: var(--spacing-unit) * 2;
}
```

### JavaScript
- Use clear, descriptive function names
- Add JSDoc comments for functions
- Avoid global variables (use const/let)
- Validate user input before processing
- Add error handling

```javascript
/**
 * Searches for workers based on category
 * @param {string} category - The work category
 */
function searchByCategory(category) {
    // Validate input
    if (!category || category.trim() === '') {
        console.error('Category cannot be empty');
        return;
    }
    
    window.location.href = 'search-results.html?category=' + encodeURIComponent(category);
}
```

---

## Adding New Features

### Feature Checklist

When adding a new feature:

1. **Plan the feature**
   - Write a clear description
   - Identify affected pages/functions
   - Plan data structure

2. **Create the UI**
   - Add HTML markup
   - Style with CSS
   - Make it responsive

3. **Implement logic**
   - Write JavaScript functions
   - Add error handling
   - Test edge cases

4. **Test thoroughly**
   - Test in multiple browsers
   - Test on mobile devices
   - Verify localStorage access

5. **Document**
   - Add code comments
   - Update relevant docs
   - Document changes in commit message

---

## Working with LocalStorage

The app uses browser LocalStorage to persist data. Keys used:

### Storage Keys

```javascript
// Worker profiles
localStorage.workerProfiles  // JSON array of worker objects

// Job posts
localStorage.jobPosts        // JSON array of job objects
```

### Basic LocalStorage Operations

```javascript
// Save data
const profiles = JSON.parse(localStorage.getItem('workerProfiles') || '[]');
profiles.push(newProfile);
localStorage.setItem('workerProfiles', JSON.stringify(profiles));

// Retrieve data
const profiles = JSON.parse(localStorage.getItem('workerProfiles') || '[]');

// Delete data
localStorage.removeItem('workerProfiles');
```

### Data Structures

**Worker Profile Object:**
```javascript
{
    name: "Raj Kumar",
    phone: "9876543210",
    workType: "Mason",
    city: "Delhi",
    area: "Dwarka",
    wage: "800",
    experience: "5 years",
    availableToday: true,
    availableTomorrow: false,
    date: "3/2/2026, 10:30:00 AM"
}
```

**Job Post Object:**
```javascript
{
    title: "Need a Plumber",
    workType: "Plumber",
    city: "Delhi",
    area: "Dwarka",
    when: "Today",
    pay: "800-1000",
    description: "Bathroom repair needed",
    contactName: "John Doe",
    contactPhone: "9123456789",
    date: "3/2/2026, 11:00:00 AM"
}
```

---

## Common Tasks

### Adding a New Page

1. Create HTML file in `src/` folder
2. Include stylesheet link: `<link rel="stylesheet" href="../public/style.css">`
3. Include navigation bar (copy from existing page)
4. Include script references
5. Update navigation links on other pages

### Adding a New Function

1. Add function to `src/main.js`
2. Add JSDoc comment explaining parameters and return value
3. Add error handling
4. Test in browser console

### Modifying Styles

1. Edit `public/style.css`
2. Use existing CSS variables when possible
3. Test on mobile and desktop
4. Test in multiple browsers

### Debugging

```javascript
// Use console methods
console.log('Variable value:', variable);
console.error('Error occurred:', error);
console.warn('Warning message');

// Check localStorage
console.table(JSON.parse(localStorage.getItem('workerProfiles')));

// Check browser compatibility
console.log(navigator.userAgent);
```

---

## Testing Checklist

- [ ] All pages load without errors
- [ ] Forms submit data correctly
- [ ] Data persists in localStorage
- [ ] Search functionality works
- [ ] Voice search works (on supported browsers)
- [ ] Navigation works between pages
- [ ] Mobile layout is responsive
- [ ] No console errors
- [ ] All links are functional
- [ ] Tested in Chrome, Firefox, Safari, and Edge

---

## Best Practices

### Performance
✅ Minimize DOM manipulations
✅ Cache selector results
✅ Optimize images
✅ Lazy load where appropriate

### Security
✅ Sanitize user input
✅ Validate data on both client and server
✅ Use HTTPS in production
✅ Never store sensitive data in localStorage

### Accessibility
✅ Use semantic HTML
✅ Add alt text to images
✅ Provide form labels
✅ Ensure keyboard navigation works
✅ Test with screen readers

### User Experience
✅ Show loading states
✅ Provide error messages
✅ Confirm destructive actions
✅ Mobile-first design
✅ Fast load times

---

## Commit Message Guidelines

Write clear, descriptive commit messages following this format:

```
Type: Brief description (50 chars max)

Longer explanation if needed (optional).
Explain what changed and why.

- Bullet points for lists
- Can span multiple lines

Related to: #issue-number (if applicable)
```

### Types
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `docs:` - Documentation update
- `style:` - CSS/styling changes
- `test:` - Testing
- `chore:` - Maintenance

### Examples
```
feat: Add voice search functionality to home page

Implemented Web Speech API integration for voice search.
Users can now click the mic button and speak their search query.
Transcription appears in the search input field.

- Added webkitSpeechRecognition API
- Added error handling for unsupported browsers
- Updated UI with voice button
```

---

## Future Enhancements

### Phase 1 (Current)
- [x] Static frontend
- [x] LocalStorage persistence
- [x] Voice search

### Phase 2 (Backend)
- [ ] Node.js/Python backend
- [ ] Database (MongoDB/PostgreSQL)
- [ ] User authentication
- [ ] Email notifications
- [ ] Ratings and reviews

### Phase 3 (Advanced)
- [ ] Payment gateway integration
- [ ] Real-time chat
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics

---

## Support & Questions

- **Ask a question:** Create an issue with `[QUESTION]` label
- **Report a bug:** Create an issue with `[BUG]` label
- **Suggest a feature:** Create an issue with `[FEATURE]` label

---

**Last Updated:** March 2, 2026
