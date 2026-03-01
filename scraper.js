const { chromium } = require('playwright');

const URLS = [
  'https://exam.sanand.workers.dev/tds2025t1/g1/15',
  'https://exam.sanand.workers.dev/tds2025t1/g1/16',
  'https://exam.sanand.workers.dev/tds2025t1/g1/17',
  'https://exam.sanand.workers.dev/tds2025t1/g1/18',
  'https://exam.sanand.workers.dev/tds2025t1/g1/19',
  'https://exam.sanand.workers.dev/tds2025t1/g1/20',
  'https://exam.sanand.workers.dev/tds2025t1/g1/21',
  'https://exam.sanand.workers.dev/tds2025t1/g1/22',
  'https://exam.sanand.workers.dev/tds2025t1/g1/23',
  'https://exam.sanand.workers.dev/tds2025t1/g1/24',
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
