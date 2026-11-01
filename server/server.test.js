import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './index.js';

describe('Evercare Pharmaceuticals API Tests', () => {
  const app = createApp();

  it('GET /api/health should return ok status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toContain('Evercare Pharmaceuticals');
  });

  it('GET /api/products should return product catalogue', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThan(0);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('GET /api/products?category=injectables should filter products', async () => {
    const res = await request(app).get('/api/products?category=injectables');
    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
    expect(res.body.products.every(p => p.categorySlug === 'injectables')).toBe(true);
  });

  it('GET /api/products/:id returns specific product', async () => {
    const res = await request(app).get('/api/products/evr-01');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('EverCef-500');
  });

  it('GET /api/verify-batch/:batchId with valid batch returns authenticity certificate', async () => {
    const res = await request(app).get('/api/verify-batch/EVR-TAB-2025');
    expect(res.status).toBe(200);
    expect(res.body.verified).toBe(true);
    expect(res.body.batch.qualityCheck).toContain('Passed');
  });

  it('GET /api/verify-batch/:batchId with unknown batch returns 404', async () => {
    const res = await request(app).get('/api/verify-batch/UNKNOWN-999');
    expect(res.status).toBe(404);
    expect(res.body.verified).toBe(false);
  });

  it('POST /api/contact should record inquiry', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 555-0192',
        subject: 'Wholesale inquiry',
        message: 'Requesting distributor pricing for hospital network.'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/sample-request should register medical sample inquiry', async () => {
    const res = await request(app)
      .post('/api/sample-request')
      .send({
        productId: 'evr-01',
        organization: 'Memorial Health System',
        contactPerson: 'Dr. Gregory House',
        email: 'house@memorial.org',
        phone: '555-4321',
        licenseNumber: 'MD-88371',
        notes: 'Requesting trial starter samples for internal medicine dept.'
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('POST /api/newsletter should register subscriber', async () => {
    const res = await request(app)
      .post('/api/newsletter')
      .send({ email: 'doctor@evercare-health.org' });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
