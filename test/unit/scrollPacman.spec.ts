import { expect, Page, test } from '@playwright/test'

// Accept this only works for Firefox and move on to other browsers!
// Make test for firefox only!
// Test that pacman goes off the screen
const movePacman = async (
  page: Page,
  viewport: { width: number; height: number }
): Promise<boolean> => {
  let pacman = await page.waitForSelector('#pacman')
  const curCoords = await pacman.boundingBox()
  if (curCoords) {
    Promise.all([
      page.mouse.wheel(0, curCoords.width).then(async () => {
        return await page.waitForTimeout(1)
      }),
    ])
    pacman = await page.waitForSelector('#pacman')
    const newCoords = await pacman.boundingBox()
    if (newCoords) {
      if (newCoords.x !== curCoords.x)
        if (newCoords.x > viewport.width || newCoords.x < 0) {
          return true
        } else {
          // Keep scrolling
          return await movePacman(page, viewport)
        }
    }
  }
  return await movePacman(page, viewport)
}

test('test scroll sends pacman and ghosts in and out of screen', async ({
  page,
}, testInfo) => {
  if (testInfo.project.name !== 'firefox') {
    // Only run this test in Firefox for now
    return
  }

  await page.goto('localhost:3000')
  const pacman = await page.waitForSelector('#pacman')
  expect(await pacman.isVisible()).toBe(true)

  const viewport = page.viewportSize()
  if (!viewport) {
    throw new Error('viewport is null')
  }

  expect(await movePacman(page, viewport)).toBeTruthy()
})
