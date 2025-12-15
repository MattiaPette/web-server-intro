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

### Get All Contacts
```
GET /api/contacts
```

**Response:**
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "telephone": "+1234567890"
  }
]
```

### Get a Contact by ID
```
GET /api/contacts/:id
```

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "telephone": "+1234567890"
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

**Response:**
```json
{
  "id": 3,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane.smith@example.com",
  "telephone": "+0987654321"
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

**Response:**
```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "telephone": "+1111111111"
}
```

### Delete a Contact
```
DELETE /api/contacts/:id
```

**Response:** 204 No Content

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
