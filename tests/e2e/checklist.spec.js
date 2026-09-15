const { test, expect } = require('@playwright/test');

test('renders the delivery checklist dashboard', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'DojoSolutions Full Delivery Dashboard' })).toBeVisible();
  await expect(page.getByText('API operativa')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Terraform', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Prometheus', exact: true })).toBeVisible();
});
