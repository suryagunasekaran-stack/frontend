import React from 'react';
import { PDFDocument, rgb, PageSizes, StandardFonts } from 'pdf-lib';

const PdfAnchor = (props) => {
  const createPdf = async () => {


    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A4);
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


        // Add vessel and date
        const vesselText = `Project/Vessel: ${props.vessel}`;
        const dateText = `Date: ${props.dateTime}`;
        const workDescription = `Work Description: ${props.workdescription}`
        const department = `Department: ${props.department}`
        const riskassesment = `Risk Assesment Number: ${props.raNumber}`
        const infoFontSize = 12; // Adjust the font size as needed

        const vesselY = subtitleY - 40;

        // Draw vessel text on the left
        page.drawText(vesselText, {
            x: padding + 10, // Left align
            y: vesselY, // Adjust the Y-coordinate as needed
            size: infoFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        // Draw vessel text on the left
        page.drawText(workDescription, {
            x: padding + 10, // Left align
            y: vesselY - 20, // Adjust the Y-coordinate as needed
            size: infoFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        // Draw vessel text on the left
        page.drawText(riskassesment, {
            x: padding + 10, // Left align
            y: vesselY - 40, // Adjust the Y-coordinate as needed
            size: infoFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        // Calculate text width for the date and right align it
        const dateTextWidth = font.widthOfTextAtSize(dateText, infoFontSize);
        const dateX = width - padding - dateTextWidth;

        const departmentTextWidth = font.widthOfTextAtSize(dateText, infoFontSize);
        const departmentX = width - padding - departmentTextWidth;

        // Draw date text on the right
        page.drawText(dateText, {
            x: dateX - 10, // Right align
            y: vesselY, // Adjust the Y-coordinate as needed
            size: infoFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        // Draw date text on the right
        page.drawText(department, {
            x: departmentX - 10, // Right align
            y: vesselY - 20, // Adjust the Y-coordinate as needed
            size: infoFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        const darray =  ["hello", "world", "test", "test2"];

        // for (let itemKey in props.items) {
        //     if (props.items.hasOwnProperty(itemKey)) {
        //       console.log('Item ' + itemKey + ':');
        //       for (let propertyKey in props.items[itemKey]) {
        //         if (props.items[itemKey].hasOwnProperty(propertyKey)) {
        //           console.log('  ' + propertyKey + ': ' + props.items[itemKey][propertyKey]);
        //         }
        //       }
        //     }
        //   }
        var y = vesselY - 80;
        const addText = (text, text2, yOffset = 20) => {
            page.drawText(text, {
                x: 40,
                y: y -= yOffset,
                size: 12,
                font,
                color: rgb(0, 0, 0)
            });
            const text2TextWidth = font.widthOfTextAtSize(text2, infoFontSize);
            const text2X = width - padding - text2TextWidth;
            page.drawText(text2, {
                x: text2X - 10,
                y: y -= yOffset,
                size: 12,
                font,
                color: rgb(0, 0, 0)
            });
        };

        darray.forEach((item, index) => {
                addText(`${index + 1}. ${item}`, props.items[0]["ToolboxRAAttendanceRecord"]);
          });
        
          let entries = Object.entries(props.items[0]);
            console.log(entries);
            
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    
    // Open in a new window or tab
    window.open(url, '_blank');
  };

  return <button onClick={createPdf}>Create PDF</button>;
};

export default PdfAnchor;
