## Dependencies

- Tesseract.js
- Jimp
- Puppeteer

## Simple Captcha Solver

Simple image processing process and captcha resolution.

```mermaid
graph LR

A[GetImage]
 B[JimpJs]
C[TesseractJS] 
 D[Result]
A --> B
B --> C
C --> D
