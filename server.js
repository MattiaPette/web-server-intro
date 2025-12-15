const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

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
  res.json(contacts);
});

// GET /api/contacts/:id - Get a specific contact by ID
app.get('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid contact ID' });
  }
  
  const contact = contacts.find(c => c.id === id);
  
  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  res.json(contact);
});

// POST /api/contacts - Create a new contact
app.post('/api/contacts', (req, res) => {
  const { firstName, lastName, email, telephone } = req.body;
  
  // Basic validation
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !telephone?.trim()) {
    return res.status(400).json({ 
      error: 'All fields are required: firstName, lastName, email, telephone' 
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
  res.status(201).json(newContact);
});

// PUT /api/contacts/:id - Update a contact
app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid contact ID' });
  }
  
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  const { firstName, lastName, email, telephone } = req.body;
  
  // Basic validation
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !telephone?.trim()) {
    return res.status(400).json({ 
      error: 'All fields are required: firstName, lastName, email, telephone' 
    });
  }
  
  contacts[contactIndex] = {
    id,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.trim(),
    telephone: telephone.trim()
  };
  
  res.json(contacts[contactIndex]);
});

// DELETE /api/contacts/:id - Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return res.status(400).json({ error: 'Invalid contact ID' });
  }
  
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({ error: 'Contact not found' });
  }
  
  contacts.splice(contactIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact List API',
    endpoints: {
      'GET /health': 'Health check endpoint',
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
