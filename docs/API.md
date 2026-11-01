# API reference

Base URL: `https://YOUR-BACKEND.onrender.com/api`

Except `/health` and `/`, routes require `Authorization: Bearer <Supabase access token>`.

## Common list query

`GET /courses?page=1&limit=20&search=biology&sort=created_at&order=desc`

Response:

```json
{
  "success": true,
  "data": [],
  "pagination": { "page": 1, "limit": 20, "total": 0, "pages": 0 }
}
```

## Create example

`POST /courses`

```json
{
  "title": "Biology 101",
  "description": "Introduction to biology",
  "category": "Science",
  "is_published": false
}
```

## Profile

- `GET /users/me`
- `PATCH /users/me` with `{ "full_name": "Student Name" }`
- `GET /auth/me`

Role changes: `PATCH /users/:id/role` with `{ "role": "teacher" }`, admin only.
