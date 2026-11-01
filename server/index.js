import express from 'express';
import cors from 'cors';
import { products, batches, careers, testimonials } from './data.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // In-memory data collections for inquiries and newsletter
  const inquiries = [];
  const sampleRequests = [];
  const newsletterSubscribers = new Set();
  const jobApplications = [];

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Evercare Pharmaceuticals API',
      timestamp: new Date().toISOString()
    });
  });

  // Get products with optional filter by category or search term
  app.get('/api/products', (req, res) => {
    const { category, search, therapeuticArea } = req.query;
    let filtered = [...products];

    if (category && category !== 'all') {
      filtered = filtered.filter(
        (p) =>
          p.categorySlug.toLowerCase() === category.toLowerCase() ||
          p.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (therapeuticArea && therapeuticArea !== 'all') {
      filtered = filtered.filter((p) =>
        p.therapeuticArea.toLowerCase().includes(therapeuticArea.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.genericName.toLowerCase().includes(q) ||
          p.indications.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    res.json({
      total: filtered.length,
      products: filtered
    });
  });

  // Get product by ID
  app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });

  // Verify batch authenticity
  app.get('/api/verify-batch/:batchId', (req, res) => {
    const cleanId = (req.params.batchId || '').trim().toUpperCase();
    const batch = batches[cleanId];

    if (!batch) {
      return res.status(404).json({
        verified: false,
        message: `Batch ID "${cleanId}" not found in Evercare Global Authenticity Ledger. Please verify the code printed on the foil or carton.`
      });
    }

    res.json({
      verified: true,
      batch
    });
  });

  // Contact form submission
  app.post('/api/contact', (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }

    const inquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    };

    inquiries.push(inquiry);
    res.status(201).json({
      success: true,
      message: 'Thank you for contacting Evercare Pharmaceuticals. Our medical and corporate liaison team will respond within 24 hours.',
      inquiryId: inquiry.id
    });
  });

  // B2B Sample or Wholesale Quote Request
  app.post('/api/sample-request', (req, res) => {
    const { productId, organization, contactPerson, email, phone, licenseNumber, notes } = req.body;
    if (!productId || !organization || !contactPerson || !email) {
      return res.status(400).json({ error: 'Required fields missing: productId, organization, contactPerson, email.' });
    }

    const request = {
      id: `req-${Date.now()}`,
      productId,
      organization,
      contactPerson,
      email,
      phone,
      licenseNumber,
      notes,
      createdAt: new Date().toISOString()
    };

    sampleRequests.push(request);
    res.status(201).json({
      success: true,
      message: 'Doctor sample / Institutional quote request received. Our regional medical representative will contact your institution.',
      requestId: request.id
    });
  });

  // Newsletter subscribe
  app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    newsletterSubscribers.add(email.toLowerCase().trim());
    res.json({
      success: true,
      message: 'Thank you for subscribing to Evercare scientific updates & clinical newsletters.'
    });
  });

  // Careers listing & application
  app.get('/api/careers', (req, res) => {
    res.json(careers);
  });

  app.post('/api/careers/apply', (req, res) => {
    const { jobId, fullName, email, phone, resumeUrl, coverNote } = req.body;
    if (!jobId || !fullName || !email) {
      return res.status(400).json({ error: 'Job ID, full name and email are required.' });
    }

    const application = {
      id: `app-${Date.now()}`,
      jobId,
      fullName,
      email,
      phone,
      resumeUrl: resumeUrl || 'Attached',
      coverNote,
      createdAt: new Date().toISOString()
    };

    jobApplications.push(application);
    res.status(201).json({
      success: true,
      message: 'Your application has been received by Evercare Human Resources. We will review your profile shortly.',
      applicationId: application.id
    });
  });

  // Testimonials
  app.get('/api/testimonials', (req, res) => {
    res.json(testimonials);
  });

  return app;
}

// Standalone execution
if (process.env.NODE_ENV !== 'test' && (!process.env.VITEST)) {
  const app = createApp();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Evercare Pharmaceuticals server running at http://localhost:${PORT}`);
  });
}
