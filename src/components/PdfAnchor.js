import React from 'react';
import { PDFDocument, rgb, PageSizes, StandardFonts } from 'pdf-lib';

const PdfAnchor = (props) => {
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

        const darray =  ["Toolbox / RA briefing attendance record", "Life vest for Embarkation/Disembarkation/Work", "Tools bag (Loose items are packed in bags)", "PPE's - Helmet with chin strap, Life vest, Gloves, Coverall, Slip-resistant shoes", "All electrical tools, equipment’s and cables in good working Condition and tested", "Hot work Permit with MPA Gas free certificate arranged", "Gas hoses, pressure regulator fitted with flash back arrestor & non-return valve, welding cables in good condition and tested", "Gas cylinders secured in upright position, use lashing straps and placed together in a pallet with valid tag", "Fire-cloth, spark igniter gun, and soap solution to do leak test", "Reflective vest (Fire watch, CSA, Lifting crew)", "Entry into confined space permit arranged", "Appropriate Portable Gas Detector in good condition and calibrated", "Confined Space Attendant with walkie talkie and attendance record","Ventilation equipment arranged","Lighting equipment arranged","Fire proof lighting for explosive atmosphere","All Lifting Appliances and Gears have test certificate and valid tag","Material Handling (Lifting aids, Team/buddy lifting)","Use tag ropes to control the load swing","All lifting devices and equipment shall be visually examined before use.", "All people shall be kept clear of overhead (suspended) loads and areas of potential impact.", "Full body harness (double lanyard with shock absorber attached to a suitable anchor point.)", "Self-Retractable Life Line shall lock and limit the arrest force to a maximum of 6kN", "Hazardous / Volatile / Corrosive material and solvent safety data sheet available if chemicals involved", "Chemical resistant suit / Apron / Gloves / Respirator"];

        let entries = Object.entries(props.items[0]);
        console.log(entries);

        var y = vesselY - 80;
        const addText = (text, text2, yOffset = 20) => {
            const maxWidth = 400; // Adjust this value as needed
            const minY = 50; // Minimum y value before creating a new page, adjust as needed
            const words = text.split(' ');
            let currentLine = '';
        
            // Function to handle new page creation
            const createNewPage = () => {
                page = pdfDoc.addPage(PageSizes.A4); // Assume pdfDoc is your PDFDocument instance
                y = page.getHeight() - padding - 30; // Reset y to top of new page, adjust padding as needed
                page.drawRectangle({
                    x: padding,
                    y: padding,
                    width: width - 2 * padding,
                    height: height - 2 * padding,
                    borderColor: rgb(0, 0, 0),
                    borderWidth: 1
                });
            };
        
            words.forEach(word => {
                const textWidth = font.widthOfTextAtSize(`${currentLine} ${word}`, 12);
                if (textWidth < maxWidth) {
                    currentLine += ` ${word}`;
                } else {
                    if (y < minY) {
                        createNewPage();
                    }
                    page.drawText(currentLine, {
                        x: 40,
                        y: y,
                        size: 12,
                        font,
                        color: rgb(0, 0, 0)
                    });
                    y -= yOffset;
                    currentLine = word;
                }
            });
        
            if (currentLine) {
                if (y < minY) {
                    createNewPage();
                }
                const text1EndX = 40 + font.widthOfTextAtSize(currentLine, 12);
                page.drawText(currentLine, {
                    x: 40,
                    y: y,
                    size: 12,
                    font,
                    color: rgb(0, 0, 0)
                });
        
                const text2TextWidth = font.widthOfTextAtSize(text2, 12);
                const text2X = width - padding - text2TextWidth;
        
                if (y < minY) {
                    createNewPage();
                }
                page.drawText(text2, {
                    x: text2X - 10,
                    y: y,
                    size: 12,
                    font,
                    color: rgb(0, 0, 0)
                });
        
                // Draw dashed line from the end of text1 to the start of text2
                if (y >= minY) {
                    page.drawLine({
                        start: { x: text1EndX + 5, y: y + 6 },
                        end: { x: text2X - 15, y: y + 6 },
                        thickness: 1,
                        color: rgb(0, 0, 0),
                        dashArray: [3, 3]
                    });
                }
        
                y -= yOffset; // Decrement y after drawing both texts
            }
        };

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


        darray.forEach((item, index) => {
                addText(`${index + 1}. ${item}`, entries[index][1]);
          });

          const conductedByText = "Conducted by:";
          const conductedByFontSize = 12; // Adjust the font size as needed
      
          // Calculate the Y position for "Conducted by:", positioned below the line
          const conductedByTextY = 100; // Adjust the vertical position as needed
      
          // Draw the "Conducted by:" text left aligned
          page.drawText(conductedByText, {
              x: padding +10,
              y: conductedByTextY,
              size: conductedByFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
      
          const addSignature2 = async (base64String, x, y, maxWidth = 50) => {
              // Convert Base64 signature to Uint8Array
              const signatureBytes = Uint8Array.from(atob(base64String.split(',')[1]), c => c.charCodeAt(0));
          
              // Embed the signature image in the document
              const signatureImage = await pdfDoc.embedPng(signatureBytes);
          
              // Calculate the size and position of the signature
              const signatureAspectRatio = signatureImage.width / signatureImage.height;
              const signatureWidth = Math.min(maxWidth, signatureImage.width);
              const signatureHeight = signatureWidth / signatureAspectRatio;
          
              // Draw the signature image
              page.drawImage(signatureImage, {
                  x: x,
                  y: y - signatureHeight, // Adjust Y position to align top of the image
                  width: signatureWidth,
                  height: signatureHeight
              });
          };
      
          // Define the text for "Name:" and "Signature:"
          const nameText = "Name: " + props.author;
          const nameText2 = "Name: " + props.nameSupervisor;
          const signatureText = "Signature:";
      
          // Calculate the Y position for "Name:" and "Signature:", positioned below "Conducted by:"
          const nameSignatureTextY = conductedByTextY - 20; // Adjust the vertical position as needed
      
          // Draw the left aligned "Name:"
          page.drawText(nameText, {
              x: padding + 10,
              y: nameSignatureTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
      
          // Draw the right aligned "Name:"
          const nameTextWidth = font.widthOfTextAtSize(nameText, infoFontSize);
          page.drawText(nameText2, {
              x: width - padding - nameTextWidth - 65,
              y: nameSignatureTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
      
          // Position "Signature:" below "Name:"
          const signatureTextY = nameSignatureTextY - 20; // Adjust as needed
      
          // Draw the left aligned "Signature:"
          page.drawText(signatureText, {
              x: padding + 10,
              y: signatureTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
      
          // Draw the right aligned "Signature:"
          const signatureTextWidth = font.widthOfTextAtSize(signatureText, infoFontSize);
          page.drawText(signatureText, {
              x: width - padding - signatureTextWidth - 70,
              y: signatureTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
      
          const authorSignatureX = padding + 10 + font.widthOfTextAtSize(nameText, infoFontSize) + 10; // Adjust as needed
          await addSignature2(props.authorSignature, authorSignatureX, nameSignatureTextY - 10);
      
          // Place supervisor signature after "Name: Supervisor"
          const supervisorSignatureX = width - padding - nameTextWidth - 10 - font.widthOfTextAtSize(nameText2, infoFontSize) - 50; // Adjust as needed
          await addSignature2(props.supervisorSignature, supervisorSignatureX + 140, nameSignatureTextY - 10);
      
      
          // Define the centered message
          const centerMessage = "Safety Starts With Me - Together We Care";
          const centerMessageFontSize = 10; // Adjust the font size as needed
      
          // Calculate the width of the centered message to position it correctly
          const centerMessageWidth = font.widthOfTextAtSize(centerMessage, centerMessageFontSize);
      
          // Calculate the Y position for the centered message
          const centerMessageY = (padding + signatureTextY) / 2; // Adjust as needed to center between bottom and last text
      
          // Draw the centered message
          page.drawText(centerMessage, {
              x: (width - centerMessageWidth) / 2,
              y: centerMessageY,
              size: centerMessageFontSize,
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

export default PdfAnchor;
