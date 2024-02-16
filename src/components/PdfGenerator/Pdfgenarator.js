import React from 'react';
import { PDFDocument, rgb, PageSizes, StandardFonts } from 'pdf-lib';
import { Button } from 'react-bootstrap';
import imageUrl from '../../media/logo192.png';

// Function to fetch and convert an image to Uint8Array
async function fetchImageAsUint8Array(imageUrl) {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }

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
  items,
  authorSignature,
  supervisorSignature
}) => {
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
    const pngImageBytes = await fetchImageAsUint8Array(imageUrl);

    // Embed the PNG image in the document
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    
    // Scale the image to a smaller size to avoid overlap
    const scale = 0.3; // Adjust the scale factor as needed
    const pngDims = pngImage.scale(scale);
    
    // Draw the image on the page (adjust the x and y coordinates as needed)
    const imageX = 50; // X-coordinate for the image
    const imageY = height - pngDims.height - 30; // Y-coordinate for the image, with some space from the top
    
    page.drawImage(pngImage, {
        x: imageX,
        y: imageY - padding,
        width: pngDims.width,
        height: pngDims.height,
    });
    
    // Load a standard font
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Define the header title and its size
    const title = "BRIGHTSUN GROUP OF COMPANIES";
    const fontSize = 24; // Adjust the font size as needed
    
    // Calculate text width and position it in the center
    const textWidth = font.widthOfTextAtSize(title, fontSize);
    const textX = ((width - textWidth) / 2) + 30;
    const textY = imageY - 10; // Position the text below the image with some space
    
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
        const subtitleX = ((width - subtitleTextWidth) / 2) + 30;
        const subtitleY = textY - 30; // Position the subtitle below the title

        // Draw the subtitle text on the page
        page.drawText(subtitle, {
            x: subtitleX,
            y: subtitleY,
            size: subtitleFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        const optionMapping = {
            "Daily Meeting": "DAILY TOOLBOX MEETING AND PPE RECORD",
            "Contractors Meeting": "CONTRACTORS TOOLBOX MEETING AND PPE RECORD",
            "Transport Meeting": "TRANSPORT MEETING RECORD"
        };

        const sectionTitle = optionMapping[type];
        const sectionFontSize = 14; // Adjust the section font size as needed

        // Calculate the width of the text and position it
        const sectionTextWidth = font.widthOfTextAtSize(sectionTitle, sectionFontSize);
        const sectionY = subtitleY - 30; // Position below the subtitle, adjust as needed

        // Define the height of the background rectangle
        const backgroundHeight = 30; // Adjust the height as needed

        page.drawRectangle({
            x: padding + 1, // Move rightwards by the border width
            y: sectionY - (backgroundHeight / 2) + 1, // Adjust vertical position
            width: width - 2 * padding - 2 * 1, // Reduce width to fit inside the border
            height: backgroundHeight - 2 * 1, // Reduce height to fit inside the border
            color: rgb(0.9, 0.9, 0.9) // Light grey color
        });

        // Draw the text on the page
        page.drawText(sectionTitle, {
            x: (width - sectionTextWidth) / 2, // Center the text horizontally
            y: sectionY - (sectionFontSize / 2), // Adjust vertical position
            size: sectionFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

        // Draw lines above and below the text
        const lineYTop = sectionY + (backgroundHeight / 2);
        const lineYBottom = sectionY - (backgroundHeight / 2);

        page.drawLine({
            start: { x: padding, y: lineYTop },
            end: { x: width - padding, y: lineYTop },
            color: rgb(0, 0, 0),
            thickness: 1
        });

        page.drawLine({
            start: { x: padding, y: lineYBottom },
            end: { x: width - padding, y: lineYBottom },
            color: rgb(0, 0, 0),
            thickness: 1
        });
        // Define the texts for the left and right aligned parts
          const leftText = "Department: " + department;
          const rightText = "Location: " + location;
          const infoFontSize = 12; // Adjust the font size for these texts as needed

          // Calculate the Y position for these texts, positioned below the previous section
          const infoTextY = sectionY - backgroundHeight - 15; // Adjust the vertical position as needed

          //Calculate the Y postion of dateTimeText and vesselText


          // Draw the left aligned text (Department)
          page.drawText(leftText, {
              x: padding + 10,
              y: infoTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });

          // Calculate the width of the right aligned text to position it correctly
          const rightTextWidth = font.widthOfTextAtSize(rightText, infoFontSize);

          // Draw the right aligned text (Location)
          page.drawText(rightText, {
              x: width - padding - rightTextWidth - 10,
              y: infoTextY,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });

          const dateObject = new Date(dateTime);

        // Format the date and time in a readable format
        // Example: 'February 16, 2024, 07:32 AM'
        const formattedDateTime = dateObject.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true // Use hour12: false if you prefer 24-hour format
        });

          const leftTextLine2 = "Date/Time: " + formattedDateTime;
          const rightTextLine2 = "Vessel: " + vessel;
          // We can reuse infoFontSize for these texts as well
          
          // Calculate the Y position for these texts, positioned below the previous line
          const infoTextYLine2 = infoTextY - 20; // Adjust the vertical position as needed
          
          // Draw the left aligned text (Date/Time)
          page.drawText(leftTextLine2, {
              x: padding + 10,
              y: infoTextYLine2,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
          
          // Calculate the width of the right aligned text (Vessel) to position it correctly
          const rightTextWidthLine2 = font.widthOfTextAtSize(rightTextLine2, infoFontSize);
          
          // Draw the right aligned text (Vessel)
          page.drawText(rightTextLine2, {
              x: width - padding - rightTextWidthLine2 - 10,
              y: infoTextYLine2,
              size: infoFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
    
          const lineYBelowDateTimeVessel = infoTextYLine2 - 10; // Adjust the space above the line as needed
          page.drawLine({
              start: { x: padding, y: lineYBelowDateTimeVessel },
              end: { x: width - padding, y: lineYBelowDateTimeVessel },
              color: rgb(0, 0, 0),
              thickness: 1
          });
          
          // Define the left aligned texts
          const topicText = "Topic: " + topic;
            const raNoText = "RA Number: " + raNumber;
            const leftAlignFontSize = 12; // Adjust the font size for these texts as needed

            // Calculate the Y position for "Topic:", positioned with ample space below the line
            const topicTextY = lineYBelowDateTimeVessel - 20; // Adjust the vertical position as needed
            let raNoTextY = topicTextY - 30; // Adjust the vertical position as needed

            // Calculate the maximum width available for the text inside the box
            const maxWidth = width - 2 * padding - 20; // 20 is additional padding inside the box

            // Function to split text into lines
            const splitTextIntoLines = (text, maxWidth) => {
                let lines = [];
                let currentLine = '';
                text.split(' ').forEach(word => {
                    let testLine = currentLine + word + ' ';
                    let testWidth = font.widthOfTextAtSize(testLine, leftAlignFontSize);
                    if (testWidth > maxWidth && currentLine !== '') {
                        lines.push(currentLine);
                        currentLine = word + ' ';
                        raNoTextY -= 20;
                    } else {
                        currentLine = testLine;
                    }
                });
                lines.push(currentLine); // Push the last line
                return lines;
            };

            // Split the topic text into lines
            const topicLines = splitTextIntoLines(topicText, maxWidth);

            // Draw each line of the topic text
            let lineY = topicTextY;
            topicLines.forEach(line => {
                page.drawText(line, {
                    x: padding + 10,
                    y: lineY,
                    size: leftAlignFontSize,
                    font: font,
                    color: rgb(0, 0, 0)
                });
                lineY -= leftAlignFontSize + 5; // Adjust the line spacing as needed
            });
          
          // Calculate the Y position for "RA.no", positioned below "Topic:"

          
          // Draw the left aligned text (RA.no)
          page.drawText(raNoText, {
              x: padding + 10,
              y: raNoTextY,
              size: leftAlignFontSize,
              font: font,
              color: rgb(0, 0, 0)
          });
          
          // Draw a line below the "RA.no" text
          const lineYBelowRaNo = raNoTextY - 10; // Adjust the space above the line as needed
          page.drawLine({
              start: { x: padding, y: lineYBelowRaNo },
              end: { x: width - padding, y: lineYBelowRaNo },
              color: rgb(0, 0, 0),
              thickness: 1
          });
        
        var y = lineYBelowRaNo - 10; // Adjust the space above the line as needed

        const addText = (text, yOffset = 20) => {
            page.drawText(text, {
                x: 50,
                y: y -= yOffset,
                size: 12,
                font,
                color: rgb(0, 0, 0)
            });
        };
        
        const addSignature = async (base64String, xOffset = 50, yPos) => {
            // Convert Base64 signature to Uint8Array
            const signatureBytes = Uint8Array.from(atob(base64String.split(',')[1]), c => c.charCodeAt(0));
        
            // Embed the signature image in the document
            const signatureImage = await pdfDoc.embedPng(signatureBytes);
            
        
            // Calculate the size and position of the signature
            const signatureMaxWidth = 50; // Smaller width
            const signatureAspectRatio = signatureImage.width / signatureImage.height;
            const signatureWidth = Math.min(signatureMaxWidth, signatureImage.width);
            const signatureHeight = signatureWidth / signatureAspectRatio;
            const signatureX = page.getWidth() - signatureWidth - xOffset; // Right aligned
            const signatureY = yPos - (signatureHeight / 2);

            page.drawImage(signatureImage, {
                x: signatureX,
                y: signatureY,
                width: signatureWidth,
                height: signatureHeight
            });
        };

        let currentYPos = lineYBelowRaNo - 10; // Starting position for the first text line

        const yPosIncrement = 60; // Adjust as needed for spacing between items

        const bottomMargin = 50; // Adjust this value based on your requirements

        // Function to add a new page and reset the y position
        const addNewPage = () => {
            // Add a new page
            page = pdfDoc.addPage();
            // Reset y to the top of the new page (minus initial offset)    
            y = page.getHeight() - 30; // Adjust as necessary
            page.drawRectangle({
                x: padding,
                y: padding,
                width: width - 2 * padding,
                height: height - 2 * padding,
                borderColor: rgb(0, 0, 0),
                borderWidth: 1
            });
        };

        for (const [index, item] of items.entries()) {
            // Add the item text
            if (y - 30 < bottomMargin) { // Check for new page before adding text
                addNewPage();
            }
            addText(`${index + 1}: ${item.permitNumber} - ${item.name}`, 30);
            addText(`PPE: ${item.ppe.join(', ')}`, 15);
        
            if (item.signature) {
                // Update currentYPos to the last y position used in addText
                currentYPos = y - 15; // Adjust this based on the height of the signature
        
                // Check if we need a new page before adding signature
                if (currentYPos < bottomMargin) {
                    addNewPage();
                    currentYPos = y - 15; // Reset currentYPos on the new page
                }
        
                await addSignature(item.signature, 50, currentYPos);
                y = currentYPos - (yPosIncrement - 15); // Adjust y for the next item
            }
        }

        const spaceNeededForFooter = 100; // Adjust this based on the space needed for your footer content
        if (y - spaceNeededForFooter < bottomMargin) {
            addNewPage(); // This function adds a new page and resets 'y' to the top
        }

        // Now add the footer on the current page (which might be a new page if one was just added)
        const footerText1 = "The above employees have attended the toolbox meeting and provided with the PPE as mentioned. (mandatory PPE such as Safety Helmet, Safety Shoes, Safety Belt, Safety Spectacles & Ear Plug were Permanently provided)";
const footerFontSize = 9; // Adjust the font size for the footer text as needed

// Calculate the Y position for the footer, positioned towards the bottom of the rectangle
const footerTextY1 = padding + 100; // Adjust the vertical position as needed. Ensure it's within your rectangle

// Draw a line above the footer text
const lineYAboveFooter1 = footerTextY1 + 15; // Adjust the space above the line as needed
page.drawLine({
    start: { x: padding, y: lineYAboveFooter1 },
    end: { x: width - padding, y: lineYAboveFooter1 },
    color: rgb(0, 0, 0),
    thickness: 1
});

// Function to split text into lines and draw them
const drawWrappedText = (text, x, y, fontSize, maxWidth) => {
    let lines = [];
    let currentLine = '';
    text.split(' ').forEach(word => {
        let testLine = currentLine + word + ' ';
        let testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine);
            currentLine = word + ' ';
        } else {
            currentLine = testLine;
        }
    });
    lines.push(currentLine); // Push the last line

    let currentY = y;
    lines.forEach(line => {
        page.drawText(line, {
            x: x,
            y: currentY,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0)
        });
        currentY -= fontSize + 2; // Adjust line spacing as needed
    });

    return currentY; // Return the Y position after the last line
};

// Draw the wrapped footer text and get the new Y position
const newFooterTextY1 = drawWrappedText(footerText1, padding + 10, footerTextY1, footerFontSize, width - 2 * (padding + 10));

// Draw a line below the footer text
const lineYBelowFooter1 = newFooterTextY1 - 5; // Adjust the space below the line as needed
page.drawLine({
    start: { x: padding, y: lineYBelowFooter1 },
    end: { x: width - padding, y: lineYBelowFooter1 },
    color: rgb(0, 0, 0),
    thickness: 1
});


    const conductedByText = "Conducted by:";
    const conductedByFontSize = 12; // Adjust the font size as needed

    // Calculate the Y position for "Conducted by:", positioned below the line
    const conductedByTextY = lineYBelowFooter1 - 20; // Adjust the vertical position as needed

    // Draw the "Conducted by:" text left aligned
    page.drawText(conductedByText, {
        x: padding +10,
        y: conductedByTextY,
        size: conductedByFontSize,
        font: font,
        color: rgb(0, 0, 0)
    });

    const addSignature2 = async (base64String, x, y, maxWidth = 70) => {
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
const nameText2 = "Name: " + nameSupervisor;
const signatureText = "Signature:";

// Calculate the Y position for "Name:" and "Signature:", positioned below "Conducted by:"
const nameSignatureTextY = conductedByTextY - 20; // Adjust the vertical position as needed

// Draw the left aligned "Name:"
page.drawText("Name:", {
    x: padding + 10,
    y: nameSignatureTextY,
    size: infoFontSize,
    font: font,
    color: rgb(0, 0, 0)
});

// Draw the author's name next to "Name:"
const authorNameX = padding + 10 + font.widthOfTextAtSize("Name: ", infoFontSize);
page.drawText(author, {
    x: authorNameX,
    y: nameSignatureTextY,
    size: infoFontSize,
    font: font,
    color: rgb(0, 0, 0)
});

// Draw the right aligned "Name:" for supervisor
const supervisorLabelX = width - padding - 65 - font.widthOfTextAtSize(nameText2, infoFontSize);
page.drawText("Name:", {
    x: supervisorLabelX,
    y: nameSignatureTextY,
    size: infoFontSize,
    font: font,
    color: rgb(0, 0, 0)
});

// Draw the supervisor's name next to their "Name:"
const supervisorNameX = supervisorLabelX + font.widthOfTextAtSize("Name: ", infoFontSize);
page.drawText(nameSupervisor, {
    x: supervisorNameX,
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
const signatureLabelX = width - padding - 70 - font.widthOfTextAtSize(signatureText, infoFontSize);
page.drawText(signatureText, {
    x: signatureLabelX,
    y: signatureTextY,
    size: infoFontSize,
    font: font,
    color: rgb(0, 0, 0)
});

// Place author signature after "Signature:"
// Define standard dimensions for signatures
const signatureWidth = 50; // Example width, adjust as needed
const signatureHeight = 20; // Example height, adjust as needed

// Calculate X and Y positions for the author's signature
const authorSignatureX = padding + 10 + font.widthOfTextAtSize(signatureText + " ", infoFontSize);
const authorSignatureY = signatureTextY + 20; // Adjust Y position as needed

// Place author signature after "Signature:"
await addSignature2(authorSignature, authorSignatureX, authorSignatureY, signatureWidth, signatureHeight);

// Calculate X and Y positions for the supervisor's signature
const supervisorSignatureX = signatureLabelX + font.widthOfTextAtSize(signatureText + " ", infoFontSize);
const supervisorSignatureY = signatureTextY + 20; // Adjust Y position as needed

// Place supervisor signature after their "Signature:"
await addSignature2(supervisorSignature, supervisorSignatureX, supervisorSignatureY, signatureWidth, signatureHeight);




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
    
    // Function to check if the device is mobile
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Conditional logic based on device type
    if (isMobileDevice()) {
        // For mobile devices, trigger a direct download
        const a = document.createElement("a");
        const formattedDateTime = new Date(dateTime).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true // Set to false for 24-hour format
        });
        a.href = url;
        a.download = `AnchorageReport-${formattedDateTime}`; // You can specify the default file name for the PDF here
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } else {
        // For non-mobile devices, open PDF in a new tab
        window.open(url, '_blank');
    }
  };

  return <Button style={{ backgroundColor: '#383631', borderColor: '#383631'}} onClick={createPdf}>View PDF</Button>;
};

export default PdfGenerator;
