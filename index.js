'use strict'
const puppeteer = require('puppeteer');

const solver = require('./src/controllers/reconize');

const jimpImage = require('./src/controllers/improvement');

const path = require('path');

const [, , imagePath] = process.argv;

const captcha = path.resolve(__dirname, (imagePath || './src/images/captcha.png'));

(async() => {

    const browser = await puppeteer.launch({ defaultViewport: null, headless: false, args: ['--disable-notifications'] });

    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

    await page.goto('https://wwwsn.bradescofinanciamentos.com.br/emissaoboletofi/emissaoBoletoEntrada.jsf', { waitUntil: 'networkidle2' });

    const shoot = await page.waitForSelector('[id="boletoForm:imgCaptcha"]', { timeout: 2000 });

    await shoot.screenshot({ path: captcha });

    await jimpImage();

    const result = await solver();

    await page.type('[name="boletoForm:nuCaptcha"]', result);

    await browser.close();
})();