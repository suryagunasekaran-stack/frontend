// pdfUtilities.js
// eslint-disable-next-line
import { StandardFonts } from 'pdf-lib';

// Utility to fetch and convert an image to Uint8Array
export async function fetchImageAsUint8Array(imageUrl) {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
}

// Utility to embed an image into a PDF
export async function embedImageInPdf(pdfDoc, imageUrl, x, y, scale) {
    const imageBytes = await fetchImageAsUint8Array(imageUrl);
    const image = await pdfDoc.embedPng(imageBytes);
    const dims = image.scale(scale);
    pdfDoc.currentPage.drawImage(image, {
        x: x,
        y: y,
        width: dims.width,
        height: dims.height,
    });
}

// Utility to write text to a PDF
export async function writeTextToPdf(pdfDoc, text, x, y, fontSize) {
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const textSize = fontSize;
    const textWidth = font.widthOfTextAtSize(text, textSize);
    pdfDoc.currentPage.drawText(text, {
        x: x,
        y: y,
        font: font,
        size: textSize
    });
    return textWidth;
}

// Utility to draw a rectangle in a PDF
export function drawRectangle(page, x, y, width, height, borderColor, borderWidth) {
    page.drawRectangle({
        x: x,
        y: y,
        width: width,
        height: height,
        borderColor: borderColor,
        borderWidth: borderWidth
    });
}

// Utility to ensure text fits within a specified box, adjusting the font size if necessary
export async function fitTextInBox(pdfDoc, text, boxWidth, initialFontSize, x, y) {
    let fontSize = initialFontSize;
    let font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    let textWidth = font.widthOfTextAtSize(text, fontSize);
    
    while (textWidth > boxWidth && fontSize > 1) {
        fontSize--;  // Reduce font size to try to make it fit
        textWidth = font.widthOfTextAtSize(text, fontSize);
    }
    
    pdfDoc.currentPage.drawText(text, {
        x: x,
        y: y,
        font: font,
        size: fontSize
    });
}