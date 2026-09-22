import { expect, test } from '@playwright/test'

test('S006-AK1 S006-AK2 S006-AK3 S006-AK4 S006-AK10 starts and plays a browser round', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Ein Buchstabe nach dem anderen.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: /Leicht.*8 Fehlversuche/ }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: /Normal.*6 Fehlversuche/ }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: /Schwer.*4 Fehlversuche/ }),
  ).toBeVisible()

  await page.getByRole('button', { name: /Leicht.*8 Fehlversuche/ }).click()

  await expect(page.getByRole('heading', { name: 'Ihr Zug' })).toBeVisible()
  await expect(page.getByText('8 Versuche frei')).toBeVisible()
  await expect(page.getByLabel('Verdecktes Wort')).toBeVisible()

  const letterButton = page.getByRole('button', { name: 'Buchstabe a' })
  await letterButton.click()
  await expect(letterButton).toBeDisabled()
})

test('S006-AK8 shows session and total statistics', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Statistik' }).click()

  await expect(
    page.getByRole('dialog', { name: 'Ihre Statistik' }),
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'Diese Sitzung' }),
  ).toBeVisible()
  await expect(page.getByRole('region', { name: 'Insgesamt' })).toBeVisible()
})
