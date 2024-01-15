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
        const textY = height - 95; // Adjust the Y-coordinate as needed
    
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

        const topic = "Mass Safety Briefing Attendance Record";
        const topicFontSize = 12; // Adjust the subtitle font size as needed

        // Calculate text width for the subtitle and center it
        const topicTextWidth = font.widthOfTextAtSize(topic, topicFontSize);
        const topicX = (width - topicTextWidth) / 2;
        const topicY = subtitleY - 30; // Position the subtitle below the title

        // Draw the subtitle text on the page
        page.drawText(topic, {
            x: topicX,
            y: topicY,
            size: topicFontSize,
            font: font,
            color: rgb(0, 0, 0)
        });

    
        const location = `Location Name: ${props.location}`; // Replace with your location
        const trade = `Trade Name: ${props.trade} `; // Replace with your trade

  
        const date1 = new Date(props.date);

        // Format the date and time in a readable format
        const readableDate = date1.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const date = `Date: ${readableDate}`; // Replace with your date
        
        const pageWidth = width; // Replace with the actual page width
        const margin = 50; // Margin from the page edges
        
        // Calculate the X position for the left-aligned text (Location)
        const locationX = margin;
        
        // Calculate the X position for the center-aligned text (Trade)
        const tradeTextWidth = font.widthOfTextAtSize(trade, 9);
        const tradeX = (pageWidth - tradeTextWidth) / 2;
        
        // Calculate the X position for the right-aligned text (Date)
        const dateTextWidth = font.widthOfTextAtSize(date, 9);
        const dateX = pageWidth - dateTextWidth - margin ;
        
        const textY2 = topicY -30; // Replace with the desired Y position for the line
        
        // Draw the Location text on the page (Left align)
        page.drawText(location, {
            x: locationX,
            y: textY2,
            size: 9,
            font: font,
            color: rgb(0, 0, 0)
        });
        
        // Draw the Trade text on the page (Center align)
        page.drawText(trade, {
            x: tradeX,
            y: textY2,
            size: 9,
            font: font,
            color: rgb(0, 0, 0)
        });
        
        // Draw the Date text on the page (Right align)
        page.drawText(date, {
            x: dateX,
            y: textY2,
            size: 9,
            font: font,
            color: rgb(0, 0, 0)
        });

        const topic3 = `Topic: ${props.topic}`; // Replace with your topic
        const topic3X = margin;
        const topic3Y = textY2 - 30;
        page.drawText(topic3, {
            x: topic3X,
            y: topic3Y,
            size: 11,
            font: font,
            color: rgb(0, 0, 0)
        });

        var y = topic3Y - 10;
        const addText = (text, yOffset = 20) => {
          page.drawText(text, {
              x: 50,
              y: y -= yOffset,
              size: 12,
              font,
              color: rgb(0, 0, 0)
          });
      };
      
      const addSignature = async (base64String, xOffset = 50) => {
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
          const signatureY = y - (signatureHeight / 2); // Centered vertically on the current line
      
          // Draw the signature image
          page.drawImage(signatureImage, {
              x: signatureX,
              y: signatureY,
              width: signatureWidth,
              height: signatureHeight
          });
      };

      
      props.employees.forEach(async (employee, index) => {
        // Access properties of each employee object
        addText(`${index + 1}: ${employee.name}`, 30);
    
        // Add signature if exists
        if (employee.signature) {
            await addSignature(employee.signature);
        }
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
        const formattedDateTime = new Date(props.dateTime).toLocaleDateString('en-US', {
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

  return <Button style={{ backgroundColor: '#383631', borderColor: '#383631'}} onClick={createPdf}>Create PDF</Button>;
};

export default PdfSafety;
