import React from 'react';
import { PDFDocument, rgb, PageSizes, StandardFonts } from 'pdf-lib';

const PdfSafety = (props) => {
  const createPdf = async () => {


    const pdfDoc = await PDFDocument.create();
    var page = pdfDoc.addPage(PageSizes.A4);
    const width = page.getWidth();
    const height = page.getHeight();
    const padding = 30;


    page.drawRectangle({
        x: padding,
        y: padding,
        width: width - 2 * padding,
        height: height - 2 * padding,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1
    });

        // Load a standard font
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Define the header title and its size
        const title = "BRIGHTSUN GROUP OF COMPANIES";
        const fontSize = 24; // Adjust the font size as needed
    
        // Calculate text width and position it in the center
        const textWidth = font.widthOfTextAtSize(title, fontSize);
        const textX = (width - textWidth) / 2;
        const textY = height - 70; // Adjust the Y-coordinate as needed
    
        // Draw the text on the page
        page.drawText(title, {
            x: textX,
            y: textY,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0) // You can change the color if needed
        });

        const subtitle = "No. 9, Tuas Avenue 8, Singapore 639224. Tel: 68634001 Fax: 68633521";
        const subtitleFontSize = 12; // Adjust the subtitle font size as needed

        // Calculate text width for the subtitle and center it
        const subtitleTextWidth = font.widthOfTextAtSize(subtitle, subtitleFontSize);
        const subtitleX = (width - subtitleTextWidth) / 2;
        const subtitleY = textY - 30; // Position the subtitle below the title

        // Draw the subtitle text on the page
        page.drawText(subtitle, {
            x: subtitleX,
            y: subtitleY,
            size: subtitleFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    
    // Open in a new window or tab
    window.open(url, '_blank');
  };

  return <button onClick={createPdf}>Create PDF</button>;
};

export default PdfSafety;
