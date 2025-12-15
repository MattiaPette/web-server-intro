# Web Server Intro - Contact List REST API

A simple Express.js REST API for managing a contact list with firstName, lastName, email, and telephone number.

## Requirements

- Node.js 22.x or higher

## Installation

1. Clone the repository:
```bash
git clone https://github.com/MattiaPette/web-server-intro.git
cd web-server-intro
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

For development with auto-reload (Node.js 18.11.0+):
```bash
npm run dev
```

## API Endpoints

All endpoints return consistent JSON responses with the following structure:

**Success Response:**
```json
{
  "success": true,
  "data": { /* response data */ }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

### Get All Contacts
```
GET /api/contacts
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "telephone": "+1234567890"
    }
  ]
}
```

### Get a Contact by ID
```
GET /api/contacts/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "telephone": "+1234567890"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Contact not found",
    "code": "NOT_FOUND"
  }
}
```

### Create a New Contact
```
POST /api/contacts
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "telephone": "+0987654321"
}
```

**Validation Rules:**
- All fields are required: `firstName`, `lastName`, `email`, `telephone`
- Email must be in valid format (e.g., `user@example.com`)
- Fields are trimmed of leading/trailing whitespace

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "telephone": "+0987654321"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Invalid email format",
    "code": "INVALID_EMAIL"
  }
}
```

### Update a Contact
```
PUT /api/contacts/:id
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "telephone": "+1111111111"
}
```

**Validation Rules:**
- All fields are required: `firstName`, `lastName`, `email`, `telephone`
- Email must be in valid format (e.g., `user@example.com`)
- Fields are trimmed of leading/trailing whitespace

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane.doe@example.com",
    "telephone": "+1111111111"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Contact not found",
    "code": "NOT_FOUND"
  }
}
```

### Delete a Contact
```
DELETE /api/contacts/:id
```

**Response (204 No Content):** Empty body

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Contact not found",
    "code": "NOT_FOUND"
  }
}
```

## HTTP Status Codes

The API uses standard HTTP status codes:

- `200 OK` - Successful GET or PUT request
- `201 Created` - Successful POST request (new resource created)
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Invalid request (validation error, malformed data)
- `404 Not Found` - Resource not found

## Error Codes

The API returns standardized error codes in error responses:

- `INVALID_ID` - The provided contact ID is invalid
- `NOT_FOUND` - The requested contact does not exist
- `MISSING_FIELDS` - Required fields are missing from the request
- `INVALID_EMAIL` - The email format is invalid

## Request Logging

The server logs all incoming requests with timestamps:
```
[2025-12-15T12:00:00.000Z] GET /api/contacts
[2025-12-15T12:00:01.000Z] POST /api/contacts
```

Error conditions are also logged:
```
[ERROR] Invalid email format in POST request
[ERROR] Contact not found: 999
```

## Testing with curl

```bash
# Get all contacts
curl http://localhost:3000/api/contacts

# Get a specific contact
curl http://localhost:3000/api/contacts/1

# Create a new contact
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Alice","lastName":"Johnson","email":"alice@example.com","telephone":"+1122334455"}'

# Update a contact
curl -X PUT http://localhost:3000/api/contacts/1 \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Updated","email":"john.updated@example.com","telephone":"+9999999999"}'

# Delete a contact
curl -X DELETE http://localhost:3000/api/contacts/1
```

## License

MIT
