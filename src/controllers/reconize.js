const { createWorker, PSM } = require('tesseract.js');
const [, , imagePath] = process.argv;
const path = require('path');
const captcha = path.resolve(__dirname, (imagePath || '../images/captcha.png'));

const solver = async function solver() {
    const worker = createWorker();
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_BLOCK, tessedit_char_whitelist: '0123456789', });
    const resultado = await worker.recognize(captcha).then(result => {
        let value = result.data.text.trim();
        return value
    });

    console.log('The captcha text is: ' + resultado)
    return resultado
}
module.exports = solver;
