import { expect, test } from '@playwright/test'

test('S006-AK1 S006-AK2 S006-AK3 S006-AK4 S006-AK10 starts and plays a browser round', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Geben Sie Ihrem Gedächtnis ein Wort.' }),
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
  await page
    .getByRole('banner')
    .getByRole('button', { name: 'Statistik' })
    .click()

  await expect(
    page.getByRole('dialog', { name: 'Ihre Statistik' }),
  ).toBeVisible()
  await expect(
    page.getByRole('region', { name: 'Diese Sitzung' }),
  ).toBeVisible()
  await expect(page.getByRole('region', { name: 'Insgesamt' })).toBeVisible()
})

test('S007-AK1 S007-AK2 S007-AK3 S007-AK4 S007-AK5 S007-AK6 S007-AK7 shows the landing page and its links', async ({
  page,
}) => {
  await page.goto('/')

  const headerNavigation = page.getByRole('navigation', {
    name: 'Hauptnavigation',
  })
  await expect(
    headerNavigation.getByRole('link', { name: 'Spiel' }),
  ).toBeVisible()
  await expect(
    headerNavigation.getByRole('link', { name: 'Vorteile' }),
  ).toBeVisible()
  await expect(
    headerNavigation.getByRole('link', { name: 'Preise' }),
  ).toBeVisible()
  await expect(
    headerNavigation.getByRole('link', { name: 'Über Hangman' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Statistik' }).first(),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Geben Sie Ihrem Gedächtnis ein Wort.' }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Ein kleines Spiel mit klarer Aufgabe.',
    }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Einfach anfangen. Später erweitern.' }),
  ).toBeVisible()
  await expect(page.getByText('4,90 €')).toBeVisible()
  await expect(page.getByText('9,90 €')).toBeVisible()

  const plusPlan = page
    .getByRole('article')
    .filter({ has: page.getByRole('heading', { name: 'Plus' }) })
  await plusPlan.getByRole('link', { name: 'Runde starten' }).click()
  await expect(
    page.getByRole('heading', { name: 'Ihre nächste Runde wartet.' }),
  ).toBeVisible()

  const footerNavigation = page.getByRole('navigation', {
    name: 'Footer-Navigation',
  })
  await expect(
    footerNavigation.getByRole('link', { name: 'Über Hangman' }),
  ).toBeVisible()
  await footerNavigation.getByRole('button', { name: 'Statistik' }).click()
  await expect(
    page.getByRole('dialog', { name: 'Ihre Statistik' }),
  ).toBeVisible()
  await page.getByRole('button', { name: 'Statistik schließen' }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(
    headerNavigation.getByRole('link', { name: 'Spiel' }),
  ).toBeVisible()
  await expect(
    page.evaluate(
      () =>
        document.documentElement.scrollWidth <=
        document.documentElement.clientWidth,
    ),
  ).resolves.toBeTruthy()
})
