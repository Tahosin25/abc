import { chromium } from 'playwright';

async function verify() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  console.log('Navigating to Evercare Pharmaceuticals web app...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // 1. Full page overview screenshot
  console.log('Capturing full page screenshot...');
  await page.screenshot({ path: 'test-results/evercare-homepage.png', fullPage: true });

  // 2. Hero screenshot
  console.log('Capturing hero section...');
  await page.locator('#hero').screenshot({ path: 'test-results/evercare-hero.png' });

  // 3. Category cards screenshot
  console.log('Capturing product showcase...');
  await page.locator('#products-showcase').screenshot({ path: 'test-results/evercare-categories.png' });

  // 4. Test Category Filter
  console.log('Testing category filter...');
  await page.getByRole('button', { name: 'Injectables' }).first().click();
  await page.waitForTimeout(500);

  // 5. Test Product Modal
  console.log('Opening product dossier modal...');
  const viewDossierBtn = page.getByRole('button', { name: 'View Dossier' }).first();
  await viewDossierBtn.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/evercare-modal.png' });

  // Close modal
  await page.keyboard.press('Escape');
  // Alternatively click the close button
  const closeBtn = page.locator('button:has(svg.lucide-x)').first();
  if (await closeBtn.isVisible()) {
    await closeBtn.click();
  }

  // 6. Test Medicine Batch Verification
  console.log('Testing batch verification...');
  await page.locator('#verify-batch').scrollIntoViewIfNeeded();
  const verifyBtn = page.locator('#verify-batch button[type="submit"]');
  await verifyBtn.click();
  await page.waitForTimeout(800);
  await page.locator('#verify-batch').screenshot({ path: 'test-results/evercare-batch-verified.png' });

  console.log('Verification completed successfully!');
  await browser.close();
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
