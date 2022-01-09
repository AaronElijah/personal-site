import { test, expect } from '@playwright/test'

test('basic test for homepage', async ({ page }) => {
  await page.goto('localhost:3000')
  const title = page.locator('text="I am Aaron Elijah"')
  await expect(title).toHaveText('I am Aaron Elijah')
})
