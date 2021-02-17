const Jimp = require("jimp");
const [, , imagePath] = process.argv;
const path = require('path');
const captcha = path.resolve(__dirname, (imagePath || '../images/captcha.png'));

const jimpImage = async function jimpImage() {
    Jimp.read(captcha).then(function(image) {
        image
            .color([
                { apply: 'brighten', params: [20] }
            ])
            .contrast(1)
            .greyscale()
            .write(captcha);
    })
}
module.exports = jimpImage;
