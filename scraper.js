const { chromium } = require('playwright');

const URLS = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=15',
  'https://sanand0.github.io/tdsdata/js_table/?seed=16',
  'https://sanand0.github.io/tdsdata/js_table/?seed=17',
  'https://sanand0.github.io/tdsdata/js_table/?seed=18',
  'https://sanand0.github.io/tdsdata/js_table/?seed=19',
  'https://sanand0.github.io/tdsdata/js_table/?seed=20',
  'https://sanand0.github.io/tdsdata/js_table/?seed=21',
  'https://sanand0.github.io/tdsdata/js_table/?seed=22',
  'https://sanand0.github.io/tdsdata/js_table/?seed=23',
  'https://sanand0.github.io/tdsdata/js_table/?seed=24',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const url of URLS) {
    await page.goto(url, { waitUntil: 'networkidle' });

    const sum = await page.evaluate(() => {
      let total = 0;
      const cells = document.querySelectorAll('table td, table th');
      cells.forEach(cell => {
        const val = parseFloat(cell.innerText.replace(/,/g, ''));
        if (!isNaN(val)) total += val;
      });
      return total;
    });

    console.log(`Seed URL ${url} => Sum: ${sum}`);
    grandTotal += sum;
  }

  await browser.close();
  console.log('====================================');
  console.log(`GRAND TOTAL = ${grandTotal}`);
  console.log('====================================');
})();
