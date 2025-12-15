const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simple request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// In-memory contact storage
let contacts = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    telephone: '+1234567890'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    telephone: '+0987654321'
  }
];

let nextId = 3;

// GET /api/contacts - Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json({ success: true, data: contacts });
});

// GET /api/contacts/:id - Get a specific contact by ID
app.get('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    console.error(`[ERROR] Invalid contact ID: ${req.params.id}`);
    return res.status(400).json({ 
      success: false, 
      error: { message: 'Invalid contact ID', code: 'INVALID_ID' }
    });
  }
  
  const contact = contacts.find(c => c.id === id);
  
  if (!contact) {
    console.error(`[ERROR] Contact not found: ${id}`);
    return res.status(404).json({ 
      success: false, 
      error: { message: 'Contact not found', code: 'NOT_FOUND' }
    });
  }
  
  res.json({ success: true, data: contact });
});

// POST /api/contacts - Create a new contact
app.post('/api/contacts', (req, res) => {
  const { firstName, lastName, email, telephone } = req.body;
  
  // Validate required fields
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !telephone?.trim()) {
    console.error('[ERROR] Missing required fields in POST request');
    return res.status(400).json({ 
      success: false,
      error: { 
        message: 'All fields are required: firstName, lastName, email, telephone',
        code: 'MISSING_FIELDS'
      }
    });
  }
  
  // Validate email format
  if (!isValidEmail(email.trim())) {
    console.error(`[ERROR] Invalid email format: ${email}`);
    return res.status(400).json({ 
      success: false,
      error: { 
        message: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }
    });
  }
  
  const newContact = {
    id: nextId++,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    telephone: telephone.trim()
  };
  
  contacts.push(newContact);
  res.status(201).json({ success: true, data: newContact });
});

// PUT /api/contacts/:id - Update a contact
app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    console.error(`[ERROR] Invalid contact ID: ${req.params.id}`);
    return res.status(400).json({ 
      success: false,
      error: { message: 'Invalid contact ID', code: 'INVALID_ID' }
    });
  }
  
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    console.error(`[ERROR] Contact not found: ${id}`);
    return res.status(404).json({ 
      success: false,
      error: { message: 'Contact not found', code: 'NOT_FOUND' }
    });
  }
  
  const { firstName, lastName, email, telephone } = req.body;
  
  // Validate required fields
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !telephone?.trim()) {
    console.error('[ERROR] Missing required fields in PUT request');
    return res.status(400).json({ 
      success: false,
      error: { 
        message: 'All fields are required: firstName, lastName, email, telephone',
        code: 'MISSING_FIELDS'
      }
    });
  }
  
  // Validate email format
  if (!isValidEmail(email.trim())) {
    console.error(`[ERROR] Invalid email format: ${email}`);
    return res.status(400).json({ 
      success: false,
      error: { 
        message: 'Invalid email format',
        code: 'INVALID_EMAIL'
      }
    });
  }
  
  contacts[contactIndex] = {
    id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    telephone: telephone.trim()
  };
  
  res.json({ success: true, data: contacts[contactIndex] });
});

// DELETE /api/contacts/:id - Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    console.error(`[ERROR] Invalid contact ID: ${req.params.id}`);
    return res.status(400).json({ 
      success: false,
      error: { message: 'Invalid contact ID', code: 'INVALID_ID' }
    });
  }
  
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    console.error(`[ERROR] Contact not found: ${id}`);
    return res.status(404).json({ 
      success: false,
      error: { message: 'Contact not found', code: 'NOT_FOUND' }
    });
  }
  
  contacts.splice(contactIndex, 1);
  res.status(204).send();
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact List API',
    endpoints: {
      'GET /api/contacts': 'Get all contacts',
      'GET /api/contacts/:id': 'Get a contact by ID',
      'POST /api/contacts': 'Create a new contact',
      'PUT /api/contacts/:id': 'Update a contact',
      'DELETE /api/contacts/:id': 'Delete a contact'
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
