import React from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const PdfGenerator = ({
  department,
  location,
  type,
  dateTime,
  vessel,
  topic,
  raNumber,
  author,
  nameSupervisor,
  items
}) => {
  const createPdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const page = pdfDoc.addPage();
    // eslint-disable-next-line
    const { width, height } = page.getSize();
    let y = height - 50;

    const addText = (text, yOffset = 20) => {
      page.drawText(text, {
        x: 50,
        y: y -= yOffset,
        size: 12,
        font,
        color: rgb(0, 0, 0)
      });
    };

    addText(`Department: ${department}`);
    addText(`Location: ${location}`);
    addText(`Type: ${type}`);
    addText(`Date/Time: ${dateTime}`);
    addText(`Vessel: ${vessel}`);
    addText(`Topic: ${topic}`);
    addText(`RA Number: ${raNumber}`);
    addText(`Author: ${author}`);
    addText(`Supervisor: ${nameSupervisor}`);

    items.forEach((item, index) => {
      addText(`Item ${index + 1}: ${item.permitNumber} - ${item.name}`, 30);
    //   addText(`PPE: ${item.ppe.join(', ')}`, 15);
      // Add signature if exists
      if (item.signature) {
        // Code to handle the signature display (if needed)
        // addText(`Signature: ${item.signature}`);
      }
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meeting-details.pdf";
    link.click();
  };

  return <button onClick={createPdf}>Create PDF</button>;
};

export default PdfGenerator;
