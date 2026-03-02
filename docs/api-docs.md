# Rozgar Setu - API Documentation

> **Note:** This is a static frontend application. Currently, there is no backend API. The following documents the planned backend API structure for future development.

## Backend API Endpoints (Planned)

### Base URL
```
https://api.rozgarsetu.com/v1
```

---

## Workers API

### 1. Create Worker Profile
**POST** `/workers`

Request body:
```json
{
  "name": "Raj Kumar",
  "phone": "9876543210",
  "workType": "Mason",
  "city": "Delhi",
  "area": "Dwarka",
  "wage": "800",
  "experience": "5 years",
  "availableToday": true,
  "availableTomorrow": false
}
```

Response:
```json
{
  "id": "worker_123",
  "status": 201,
  "message": "Profile created successfully",
  "data": {
    "workerId": "worker_123",
    "createdAt": "2026-03-02T10:30:00Z"
  }
}
```

---

### 2. Get Worker Profile
**GET** `/workers/{workerId}`

Response:
```json
{
  "id": "worker_123",
  "name": "Raj Kumar",
  "phone": "9876543210",
  "workType": "Mason",
  "city": "Delhi",
  "area": "Dwarka",
  "wage": "800",
  "experience": "5 years",
  "rating": 4.5,
  "totalJobs": 15,
  "createdAt": "2026-02-15T14:20:00Z"
}
```

---

### 3. Search Workers
**GET** `/workers/search?workType=Mason&city=Delhi&area=Dwarka`

Query Parameters:
- `workType` - Type of work (Mason, Plumber, etc.)
- `city` - City name
- `area` - Area/locality
- `availableToday` - Boolean (optional)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

Response:
```json
{
  "status": 200,
  "data": {
    "workers": [
      {
        "id": "worker_123",
        "name": "Raj Kumar",
        "workType": "Mason",
        "rating": 4.5,
        "availableToday": true
      }
    ],
    "totalCount": 45,
    "page": 1,
    "limit": 10
  }
}
```

---

### 4. Update Worker Profile
**PUT** `/workers/{workerId}`

Request body:
```json
{
  "wage": "1000",
  "experience": "6 years",
  "availableToday": false
}
```

Response:
```json
{
  "status": 200,
  "message": "Profile updated successfully"
}
```

---

## Jobs API

### 1. Post a Job
**POST** `/jobs`

Request body:
```json
{
  "title": "Need a Plumber for bathroom repair",
  "workType": "Plumber",
  "city": "Delhi",
  "area": "Dwarka",
  "when": "Today",
  "pay": "800-1000",
  "description": "Need experienced plumber for bathroom repair work",
  "contactName": "John Doe",
  "contactPhone": "9123456789"
}
```

Response:
```json
{
  "status": 201,
  "message": "Job posted successfully",
  "data": {
    "jobId": "job_456",
    "createdAt": "2026-03-02T11:45:00Z"
  }
}
```

---

### 2. Get Job Details
**GET** `/jobs/{jobId}`

Response:
```json
{
  "id": "job_456",
  "title": "Need a Plumber for bathroom repair",
  "workType": "Plumber",
  "city": "Delhi",
  "area": "Dwarka",
  "when": "Today",
  "pay": "800-1000",
  "description": "Need experienced plumber for bathroom repair work",
  "contactName": "John Doe",
  "contactPhone": "9123456789",
  "status": "Open",
  "applications": 3,
  "createdAt": "2026-03-02T11:45:00Z"
}
```

---

### 3. Search Jobs
**GET** `/jobs/search?workType=Plumber&city=Delhi&when=Today`

Query Parameters:
- `workType` - Type of work needed
- `city` - City name
- `area` - Area/locality (optional)
- `when` - Timeline (Today, Tomorrow, This Week)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

Response:
```json
{
  "status": 200,
  "data": {
    "jobs": [
      {
        "id": "job_456",
        "title": "Need a Plumber",
        "workType": "Plumber",
        "pay": "800-1000",
        "city": "Delhi"
      }
    ],
    "totalCount": 120,
    "page": 1
  }
}
```

---

### 4. Apply for a Job
**POST** `/jobs/{jobId}/apply`

Request body:
```json
{
  "workerId": "worker_123"
}
```

Response:
```json
{
  "status": 201,
  "message": "Application submitted successfully",
  "data": {
    "applicationId": "app_789",
    "jobId": "job_456",
    "workerId": "worker_123",
    "appliedAt": "2026-03-02T12:00:00Z"
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Missing required field: name"
}
```

### 401 Unauthorized
```json
{
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "error": "Not Found",
  "message": "Worker with ID worker_123 not found"
}
```

### 500 Server Error
```json
{
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

---

## Authentication (Future)

All requests will require a Bearer token in the Authorization header:

```
Authorization: Bearer your_token_here
```

---

## Rate Limiting (Future)

- **Limit:** 1000 requests per hour per IP
- **Headers:**
  - `X-RateLimit-Limit: 1000`
  - `X-RateLimit-Remaining: 999`
  - `X-RateLimit-Reset: 1646300400`

---

## Changelog

**v1.0** (Planned)
- Basic CRUD for workers and jobs
- Search functionality
- Application submission

**v1.1** (Planned)
- User authentication
- Rating and review system
- Payment integration

**v2.0** (Planned)
- Real-time notifications
- Mobile app support
- Advanced filters
