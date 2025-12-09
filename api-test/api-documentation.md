# APE Archive API Documentation

**Base URL:** `https://server.apearchive.lk`  
**Tested:** 2025-12-09

---

## Response Wrapper Format

All endpoints return this standard structure:

```json
{
  "success": boolean,
  "message": "string",
  "data": object | array,
  "statusCode?": number  // Only on errors
}
```

---

## 1. Health Check

**Endpoint:** `GET /api/v1/health/`  
**Auth Required:** No

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-12-09T09:52:49.247Z",
  "uptime": 1066.15
}
```

---

## 2. Library Tags

**Endpoint:** `GET /api/v1/library/tags`  
**Auth Required:** No

**Response:**

```json
{
  "success": true,
  "message": "Tags fetched successfully",
  "data": {
    "Grade": [
      { "id": "uuid", "name": "Grade 12" },
      { "id": "uuid", "name": "Grade 13" }
    ],
    "Medium": [
      { "id": "uuid", "name": "English Medium" },
      { "id": "uuid", "name": "Sinhala Medium" },
      { "id": "uuid", "name": "Tamil Medium" }
    ],
    "Stream": [...],
    "Subject": [...],
    "ResourceType": [...]
  }
}
```

---

## 3. Tags List

**Endpoint:** `GET /api/v1/tags/`  
**Auth Required:** No  
**Query Params:** `source=SYSTEM|USER`, `group=string`, `search=string`

**Response Structure:**

```json
{
  "success": true,
  "message": "Tags fetched successfully",
  "data": {
    "data": [
      {
        "id": "uuid",
        "name": "Physics",
        "slug": "physics", // NEW FIELD
        "group": "SUBJECT",
        "source": "SYSTEM", // NEW FIELD
        "createdAt": "2025-12-08T..." // NEW FIELD
      }
    ]
  }
}
```

**New Fields Added:**

- `slug` - URL-friendly version of name
- `source` - "SYSTEM" or "USER"
- `createdAt` - ISO timestamp

---

## 4. Tags Grouped

**Endpoint:** `GET /api/v1/tags/grouped`  
**Auth Required:** No

**Response:**

```json
{
  "success": true,
  "message": "Grouped tags fetched successfully",
  "data": {
    "GRADE": [{ "id", "name", "slug", "source" }],
    "MEDIUM": [...],
    "STREAM": [...],
    "SUBJECT": [...],
    "RESOURCE_TYPE": [...]
  }
}
```

---

## 5. Resources List

**Endpoint:** `GET /api/v1/resources/`  
**Auth Required:** No  
**Query Params:** `page`, `limit`, `search`, `tagId`, `status=PENDING|APPROVED|REJECTED|ARCHIVED`

**Response:**

```json
{
  "success": true,
  "message": "Resources fetched successfully",
  "data": {
    "data": [
      {
        "id": "uuid",
        "title": "Accounting E12.pdf",
        "description": "Synced from Drive",
        "driveFileId": "google_drive_id",
        "mimeType": "application/pdf",
        "fileSize": "1846306",        // NEW FIELD (string, bytes)
        "externalUrl": null,          // NEW FIELD
        "status": "APPROVED",
        "source": "SYSTEM",           // NEW FIELD
        "views": 0,
        "downloads": 0,
        "createdAt": {...},
        "updatedAt": {...},
        "storageNodeId": null,        // NEW FIELD
        "uploaderId": "system-sync",
        "tags": [
          {
            "id": "uuid",
            "name": "English Medium",
            "slug": "english-medium",
            "group": "MEDIUM",
            "source": "SYSTEM",
            "createdAt": {...}
          }
        ],
        "uploader": {                 // NEW FIELD - Uploader object
          "id": "system-sync",
          "name": "System Bot",
          "role": "ADMIN"
        }
      }
    ],
    "meta": {
      "total": 255,
      "page": 1,
      "limit": 10,
      "totalPages": 26
    }
  }
}
```

**New Fields:**

- `fileSize` - File size in bytes (string)
- `source` - "SYSTEM" or "USER"
- `storageNodeId` - Internal storage node reference
- `uploader` - Full uploader object with id, name, role
- Tags now include `slug`, `source`, `createdAt`

---

## 6. Library Hierarchy

**Endpoint:** `GET /api/v1/library/hierarchy`  
**Auth Required:** No

**Response:**

```json
{
  "success": true,
  "message": "Library hierarchy fetched successfully",
  "data": {
    "Science Stream": {
      "Physics": {
        "Grade 13": [
          {
            "id": "uuid",
            "title": "physics-syllabus.pdf",
            "description": "...",
            "driveFileId": "...",
            "mimeType": "application/pdf",
            "views": 0,
            "downloads": 0,
            "tags": "..."
          }
        ],
        "Grade 12": {
          "Tamil Medium": { "Teacher's Guide": "", "Syllabus": "" },
          "English Medium": { ... },
          "Sinhala Medium": { ... }
        }
      }
    }
  }
}
```

---

## 7. Library Browse

**Endpoint:** `GET /api/v1/library/browse`  
**Auth Required:** No  
**Query Params:** `stream`, `subject`, `grade`, `medium`, `resourceType`, `lesson`, `page`, `limit`

**Response:**

```json
{
  "success": true,
  "message": "Library browse results retrieved"
}
```

---

## 8. Announcements

**Endpoint:** `GET /api/v1/announcements/`  
**Auth Required:** No

**Response:**

```json
{
  "success": true,
  "message": "Announcements fetched successfully",
  "data": []
}
```

---

## 9. Forum Questions

**Endpoint:** `GET /api/v1/forum/`  
**Auth Required:** No  
**Query Params:** `page`, `limit`, `search`, `category`, `solved`

**Response:**

```json
{
  "success": true,
  "message": "Questions fetched successfully",
  "data": {
    "data": [],
    "meta": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 0
    }
  }
}
```

---

## 10. Teachers List

**Endpoint:** `GET /api/v1/teachers/`  
**Auth Required:** No  
**Query Params:** `page`, `limit`, `subject`

**Response:**

```json
{
  "success": true,
  "message": "Teachers fetched successfully",
  "data": {
    "data": [],
    "meta": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 0
    }
  }
}
```

---

## 11. Auth - Current User (Protected)

**Endpoint:** `GET /api/v1/auth/me`  
**Auth Required:** Yes (Bearer Token)

**Error Response (No Auth):**

```json
{
  "success": false,
  "message": "Unauthorized",
  "statusCode": 401
}
```

---

## Key Changes from Previous API

| Area               | Change                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| **Tags**           | Added `slug`, `source`, `createdAt` fields                             |
| **Resources**      | Added `fileSize`, `source`, `storageNodeId`, `uploader` object         |
| **Resources.tags** | Tags now include full tag objects with `slug`, `source`                |
| **Groups**         | Now uppercase: `GRADE`, `MEDIUM`, `SUBJECT`, `STREAM`, `RESOURCE_TYPE` |
| **Pagination**     | Standardized `meta` object with `total`, `page`, `limit`, `totalPages` |
