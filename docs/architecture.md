# Rozgar Setu - Architecture Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ROZGAR SETU APPLICATION                  │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
          ┌─────▼─────┐  ┌────▼────┐  ┌────▼─────┐
          │   HTML    │  │   CSS   │  │ JavaScript│
          │  (src/)   │  │(public/)│  │  (src/)   │
          └─────┬─────┘  └────┬────┘  └────┬─────┘
                │             │             │
                └─────────────┼─────────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Browser / Client  │
                    │   (No Backend)     │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Local Storage     │
                    │  (Job Posts Data)  │
                    │  (Worker Profiles) │
                    └────────────────────┘
```

## Project Structure

```
rozgar_setu/
├── src/                      # Core application files
│   ├── index.html           # Home page with role selection
│   ├── worker-dashboard.html # Worker dashboard
│   ├── employer-dashboard.html # Employer dashboard
│   ├── add-profile.html     # Worker profile creation form
│   ├── post.html            # Job posting form
│   ├── search-results.html  # Search results page
│   ├── profile.html         # User profile display
│   ├── worker-profile.html  # Worker profile view
│   └── main.js              # Core JavaScript functions
│
├── public/                   # Static assets
│   └── style.css            # Global styling
│
├── docs/                     # Documentation
│   ├── architecture.md      # This file
│   ├── api-docs.md          # API documentation
│   └── user-guide.md        # User guide
│
├── README.md                # Project overview
├── package.json             # Project metadata
├── LICENSE                  # MIT License
├── .gitignore              # Git ignore rules
└── index.html              # Root redirect to src/index.html
```

## Data Flow

### Worker Profile Creation
```
User fills form (add-profile.html)
        ↓
JavaScript validates input (main.js)
        ↓
Data stored in localStorage as JSON
        ↓
User redirected to worker-dashboard.html
        ↓
Dashboard displays saved profiles
```

### Job Posting
```
Employer fills form (post.html)
        ↓
JavaScript validates input (main.js)
        ↓
Job data stored in localStorage as JSON
        ↓
User redirected to worker-dashboard.html
        ↓
Dashboard displays posted jobs
```

### Search & Filter
```
User enters search term or selects category
        ↓
Search redirects to search-results.html
        ↓
JavaScript filters localStorage data (main.js)
        ↓
Results displayed dynamically
```

## Page Map

| Page | Purpose | User Type |
|------|---------|-----------|
| `index.html` | Homepage with role selection | Both |
| `add-profile.html` | Create worker profile | Worker |
| `post.html` | Post new job | Employer |
| `search-results.html` | View search results | Both |
| `worker-dashboard.html` | Worker home feed | Worker |
| `employer-dashboard.html` | Employer home feed | Employer |
| `profile.html` | View/edit user profile | Both |
| `worker-profile.html` | View specific worker | Employer |

## Technologies Used

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Storage:** Browser LocalStorage API
- **Architecture:** Client-side, Static Site
- **Styling:** Responsive mobile-first CSS

## Future Enhancements

- Backend API (Node.js/Python)
- Database (MongoDB/PostgreSQL)
- User authentication
- Real payment integration
- Mobile app (React Native)
- Push notifications
