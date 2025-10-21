/**
 * Maritime CO2 Emissions Calculator - PDF Export Module
 * Professional PDF report generation functionality
 */

// PDF Export functionality
function exportVoyageAnalysisToPDF() {
    const { jsPDF } = window.jspdf;
    // Use landscape orientation for better table fit
    const doc = new jsPDF('landscape');
    
    // Get current date and time for the report
    const now = new Date();
    const currentDate = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    const currentTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    const selectedRoute = $('input[name="route"]:checked').val() || 'narvik';
    const routeName = selectedRoute === 'narvik' ? 'Narvik Route' : 'Seven Islands';
    const vesselName = $('#VesselName').val() || '';
    const voyageNumber = $('#VoyageNo').val() || '';
    
    // Header with company branding (adjusted for landscape)
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFillColor(240, 238, 238);
    doc.rect(0, 0, pageWidth, 35, 'F');
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Oldendorff - Salzgitter Emissions Report', 65, 20);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    // doc.text('Optimize Your Shipping Emissions', 65, 28);
    
    // Reset text color for body
    doc.setTextColor(0, 0, 0);
    
    // Report Information Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORT INFORMATION', 20, 50);
    
    // Info box (adjusted width for landscape)
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(20, 55, pageWidth - 40, 40);
    const seaMarginBallast = $("#seaMarginBallast").val() || '0.0';
    const seaMarginLaden = $("#seaMarginLaden").val();
    const actualLoadingDays = $("#actualLoadingDays").val() || '0.0';
    const actualDischargingDays = $("#actualDischargingDays").val() || '0.0';
    const norTenderedLoading = $("#norTenderedLoading").val() || '';
    const stopLoading = $("#stopLoading").val() || '';
    const norTenderedDischarging = $("#norTenderedDischarging").val() || '';
    const stopDischarging = $("#stopDischarging").val() || '';
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    //add image logo in doc
    const marginX = 5;
    const maxLogoHeightMM = 5; // fits within 35mm header
    const leftLogoWidthMM = 45; // reasonable width for left
    const rightLogoWidthMM = 45; // reasonable width for right
    oldendorffDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQEAAAAdCAYAAACqj9mpAAAABmJLR0QA/wD/AP+gvaeTAAANpUlEQVR42u1dC5RVVRm+49w7A2qZlZqWqWmZDczcB48Awylkzjl3hMAYSSwmKkwik1zRQy1ByRQLYpiBwICFEggihIGC8aYBgcHFSLRAsjIeo8IgCsyDmbmn/9/nzJ1z9t7nfR/nrjV7rX8B9567z35++/+///83gUB36S7dJSdKdXX1gNmzq+dVza7ZWlVdU5cSmV3zfPfIdpfukgNlVvWcibBhEyByiqXJzvvzQpF4n1BEuj8YEabmh8XqYFScHowKP8uPSqMDsWGfdNifvFBUujcpYeH7bgYlFBXG6erRSH5U/Ba0Mw5//3IgJlztpv5gJD4Y6qhwKsESqUzXzoj4PW3bAkXCx131F8ZJV09gykW6B/qWXWs0HsqYCHcFI+KQUIkUgTm7OC0rtaj0UlgTw6CtDwQj0mO4TuDdk3BcAsVlVzqtDueR2x8Yi/yI8A2co8DNwz9it76CWNkX3cwptOPOZCWx2y9zVQeOQa8hVyl1DLs4PyyMwbEie8iiDzNram6BzdqSBgCwAIF+Qz4RDEtPwcI5ASKbSDvITlxkuMEtZ6KiIp/6fYe7TSqetWhXUvIj4pH8sLQQFqVgq41Yf1TcYLd+3bsAJKl2NlPPrGM2sL3+tmrrCcRiIX17BdFBOy/gnAGoP1kYFW7yuvfzI5IE9f2NbiM9zyC1BPRLS4M2+3zCRl9w/dWSzWQxt8Gw+Es3c4p9SwJJVCx2Wce5QH/po10HjDAG9tdPYW0Opw8OuoDaviBNAGAIAnhST4JGn3HR0T2hmBD1GwhQ8gaeIukCAZjYQRYgIAej0sNZBgF6c75YWCze7LRNZEOEhdccvzMqHoJNUJ4iENDKK4He5ZenGgRAC/6uVxAAbWJRsh2w6VGjgbGbGSwRvmo2FjNmzOj5pwWLju/fX7/reEPDrlOnT9elVE6dqtW/sbS0RygqLjHpTAKkkbuwNYiH6OZjEFAnVnzWTC12AwJQ53/p08hgrDqC4bKhPgGBTmlyYpqhqg6/OW8MhuKHREzXkjDV7PR2AQIom3CNpRAEmgPhER/zrgmA6dLVjlIy/wBYeGiESoR+RmNw6NCRUbIsvy+nr3yoed2Ui1BV5XTgOMgvCorLeukGF2w8otIoaiCjounsqAyAQKDkjk+TUwAEVdxQLN4fwOiboKrOVfvAm5yN9GYyAgE4DSZ01m8oYBNz2mkEmO+SNqcLBKLSgWS7ItIVaA+TBReWxgNYLTUCUeR+LPmJiHAf57etoGHNQd4hMKCiZ/Jh+Du05WuwHmrguxb2fcJiuyCAfSD9gXFDbgN5KeAe3mHNP2msLRCAk9hyTlUV3gQENlrWoWgnedQYlgAQDCR9Mint7e2rXtz497WDxk7ae1XpXf9JtVxZWnFIO+CPc1SYGjskEtjbIziLqpG7yNMFAsVllxg+fJNUqC7cDzg2/Dw7IADPVbpsp5nWtNMIhFKgCew3rbCL8+lgbGyoy6QdA1jbX6rr0bf8c1Z9wGfQZOTMQaUdEOCSvLDG4Luj+jqFbTY1gSdcmUC0CZKmAqf0p8on/mqzRw3PUgNUmfaymKrqa1FymiP2Gk5edsFLK30BAmpBuxe0g39b2fHpBQHhfco+np4VENCTek2MWVNUUcA8DIQekqzUe3bxNCAzDwL+hqrjA573wBYIEM+J+ENaK+GRr7kGAtcJ94zxssEvGzjCPgjAJvgr9cUWNww28Ak/oTd4QbT8Fr+AgOImivdG3oLtb2ZAABbsd2jb2NB0ygAIaOx7vZoeFSby3LLUc2cCYfF6p2OiagS05vi4axAAFzbdfp4rNtdAIBSNb+dt3BvjY7nG/RW3jZJ79r1DfmrhcvnEyUby2dF3Tsq/rlksF8bixiBQUCIUsQsA/OtuCixM+P0xyj6b6ycQMDJ9ehSX3ZAJEEDTBBbjKlo7sFKn0wkCav2bqN/v5TxzkHrmt24XOIzBDMZ8BGLaDQggB8SAAMdLkEsgoPYpwQWB8kqywReveVWeMK0qKZf0HyYve2WLnEgk5HkvrJUrH54ur95cS55FYDAEAYVc0X24z0vjkfHlMOa+AgEMcILftOmBT/xBpkAAFyiOCzUO9TpCLcMgoJoF+nkBQlEbjMRsNPjM7TohRCW7IIe4AQEkAql63st1ToAEWxmo8J0gMPWPz8n9xtwv97l7Ivm8153jyefzV67TPb91b73c0ZGQP1t2jwEIALvpxkY1QfhS+kW6gBQ/gIDy+51mLHVaQUAxwQapQTuWJGUmQICw+FRbMaKti/wVK6n6D3tf6GKD2aa0BQJAXMPB809bZG/ugEAe9OEtKxDoLK0X2sjnIydNIf8ePXma7vmHqhaSzwePe5APAjRRhm41T82HsEqWeNP4xH0CAqrLStuO9RZxAv9Q3aE6AbfYAjcgoC7KyQ6Y8vSCgNLn1/X8hTRe09ZHKQ1vaQpAYL0ZkWwJAsBHIJ9D9fu8EU/BgoD0JmiAK7SC84muTiOvDQcETtJ1AO/zHAIRzMlXXI0L/M6MzDPSBIpG8jWBHa8fICYCuAQNNAE6oAN8uimY3BbqRBntO00gKk4xM4PsBwuRgBdXIICIz/IDGLQTD2cJBDZQHqKHNN89TdU/yzPxpcQraLXQzWYgALJdA8C7aZMONSszktV+sJD0qgNNwDCc2a25BCH48+2AwKw/r5ZHPPBoUi4fNJJwATxOgAYG2hxoTQkpqJ+8Rr12IXzb9yAA4a8uQCBRGJNu9AACAYxGY1U/6U06SCU7ICBONtGcnvC6TvDUZdyN5iBgJgetTl67IIAeHM8gEBXXuhoUIEcZN7KFOdBZSiruS3oHGk6dJp/hn39Yskq+tP9wUxBooBoveJtaEnnYTqm4cd+ZAxGximrHS+YgIGyj1T4MtnHLCehPRIgeo331YXF5xkEAgn6MTBM1GlAL7HM8HxasFrTOFQhAPQEbiWEcEGhQ+qwVcQ+atA5AoImtQ6qzkxvBXZeYiWrRX3T3XTt0DCM9+pS7ixNQbV2tf3icN05AuJpBVggk8iExuMXMlcmeis5i/Z2AgAIE0gSOr/5HGQMBxb17zqjP8O9HqPr/4h0E9MlHJJ/DHATq1Y3ayMnb+LELEEgFMVifWq+A+FKaIwRZEKAThtAe8abiSaOYBAxt6LEfQACepZNfaEI00yCg2sjPclJ+B6j1nE9rnADEsTNRd5pIQOR1OG64PNcLRfFG0KboJFvEIJhQtHcHeSjcoDkNAhjKbZ6OnR4QoCcXFuL/7OZ7G7Dui4xysf0CApxTV+8TzxIIKCG1lLsLvDcqaDWmEwSQ0TYj6VQmXhe8Ypb9Zq32Cl+nFyQGrtn2DkSGXsNxMe7nhjvnCAiA+j5h2vylO95ueK/ubFPzv5pbWo+lW843Nx/pRFX9qQjZgR5MgRYK3e/1FQhAfxHorHIcsgICASW/gU3BFZ6kF3wqQQDvgGBiFiCUmNOX7Wa8hbNxEbbRdwxw3mfqIoQ6budE1T2SqyBwtqlpE2HzEol3E20XDre1tBxIuzQ17VEXkPQbqmPHXFwbhqfJckaroBd9NkEATgnYLKtpV05BRPqSX0BANanGcsyC5rSAAFx5hRuQZtp5OfmgldzN5D1ApKEL8quSTf/VeJDsxgkEAgHO/RcthSXxL+QaCMDW732+4dhrL1cIB5b2+kwHiJwhUW8WUgJ8TlKd22rGklIlD7MOOcQWSzJmCwSUlNONHFfO0/bcZZkDAXXDPWNmy6UCBDB7lBOZ1mYSK5LHnOAkWKYsZns84CYdTvIQF3RsRQwiiLGZmRtyDQTeWrPiwWUl17dncPNTINC1iNoY3yuEAZu2Xokpf4EFAHEJ9/lMgoDyLsx//z3/FhzhZcNbaLIMAoq/WNyXchDASy7h9Aa35PO8BBWrS0UwK5Tjxz5Lsg7N7kYg/ZF+ziG+zpELa/hjZy+LELwo7F0Y5M7LnAAB0ALyVt7a+2AWAEAPAupgTuT7YcGVA/fikctDgEUmiwjvSIO76QwuzdhleDKzICCrNxqZCpPlR58mQGR1RZOR0+og7xIRnT1rkgfPCRbaxwsbpoWu0zUIBJKZZGdcgsBZqm21GO9vwj5foNl547EhYa1NHAB5G+MvFLNBug2F3KqrxBjwbndq00WTugQBNTZlNx0DoL0WzM8gsDxyw+AsAQALAhoX32lPd/eZZMMZgICNeoUSUxCwL2ds+ZRdXjRKp7B6AQHVLBjOO7FTfMfg4WBMvNWRhgPPswSrE4FrwSy0TPsgkLxToJ3yrFTlAgjARnzGVyCABU9dlXBpczCxu82upfIBCBwlzDF1OvgdBNSgmplpAIEEiWyDU9vIJLLj11ZdwhccvLeVBGbZ+P8gnICAeoDNpU1NbRi8H0FgRVFRAWzERt+BgM43DEkkqjpJq6VoY78BC+l3SPbY7zZR3dY4FTozTHFXseGaakTZRkxOgUUxG2MCrC5zNGCwq43rNxZOzP9O3fcmfmxj12sshFlp2pBleuMq3IfheKCqvA7TpZEIJfYyFRfhqZAYAuLG3EufxkmyEU00vGo9Er/OAZ+yXjd2Vh4rcnuvuEMfvtuVVqzc6tT1nTYi07aJFh76eV0dEXGZl6Fb1uuagbAR67Iotc5ajEFEeNJRN8B0l+6SLGAKoiaJbldytRz+rzsegs+6S/rL/wHxO+gPOkfzHQAAAABJRU5ErkJggg==";
    salzgitterDataURL = "data:image/png;base64,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";

    doc.addImage(oldendorffDataURL, 'PNG', marginX, 7, leftLogoWidthMM, maxLogoHeightMM);   
    const xRight = pageWidth - marginX - rightLogoWidthMM; // if (logoDataUrl) {
    doc.addImage(salzgitterDataURL, 'PNG', xRight, 7, rightLogoWidthMM, 12);
    //     doc.addImage(logoDataUrl, 'PNG', pageWidth - 60, 57, 40, 20);
    // }

    doc.text(`Shipping Route: ${routeName}`, 25, 65);
    doc.text(`Vessel Name / Voyage No. : ${vesselName} / ${voyageNumber}`, 25, 72);
    doc.text(`Analysis Date: ${currentDate}`, 25, 79);
    doc.text(`Report Time: ${currentTime}`, 25, 85);

    
    // Executive Summary Section
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('EXECUTIVE SUMMARY', 20, 119);
    
    const actualCO2 = $('#actualCO2Card').text();
    const baseline = $('#adjBaselineCard').text();
    const reduction = $('#emissionReductionCard').text();
    const cargoCapacity = $('#cargoQuantity').val() || '133,000';
    
    // Summary metrics boxes
    const metrics = [
        { label: 'Actual Performance', value: `${actualCO2} MT Co2e/1000MT`, color: [76, 175, 80] },
        { label: 'Baseline Reference', value: `${baseline} MT Co2e/1000MT`, color: [96, 125, 139] },
        { label: 'Emission Reduction', value: reduction, color: [156, 39, 176] },
        { label: 'Cargo Quantity', value: `${cargoCapacity} MT`, color: [255, 152, 0] }
    ];
    
    let yPos = 124;
    metrics.forEach((metric, index) => {
        const xPos = 20 + (index % 4) * 70; // 4 metrics in one row for landscape
        if (index % 4 === 0 && index > 0) yPos += 25;
        
        doc.setFillColor(...metric.color);
        doc.rect(xPos, yPos, 65, 20, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text(metric.label, xPos + 3, yPos + 6);
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(metric.value, xPos + 3, yPos + 14);
    });
    
    doc.setTextColor(0, 0, 0);
    
    // Voyage Legs Analysis Section
   
    doc.setFontSize(12);
    // doc.setFont('helvetica', 'normal');
    doc.setFont('helvetica', 'bold');
    doc.addPage('landscape'); // <-- ensure the section starts on the next page
    doc.text('VOYAGE TIME ANALYSIS', 20, 20);
    
    doc.setFontSize(12);

    doc.setFillColor(230, 240, 255); // light blue
    doc.rect(20, 24, 160, 10, "F"); // background box behind text
    doc.setFont("helvetica", "bold");
    doc.setTextColor(20, 20, 100);
    doc.text(`Sea Margin Days Ballast: ${seaMarginBallast} days`, 25, 30);

    // Laden
    doc.setFillColor(220, 255, 220); // light green
    doc.rect(20, 34, 160, 10, "F");
    doc.setTextColor(0, 90, 0);
    doc.text(`Sea Margin Days Laden: ${seaMarginLaden} days`, 25, 40);

    // Reset to normal
    doc.setTextColor(0, 0, 0);
    yPos = 50;

  // === Actual Loading Days Section ===
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(30, 30, 120);
doc.text(`Actual Loading Days: ${actualLoadingDays} days ( `, 25, yPos);

// NOR Tendered Loading
doc.setFont('helvetica', 'bold');
doc.setTextColor(0, 102, 204); // blue
let norLabel = "NOR Tendered Loading LT";
doc.text(norLabel, 25 + doc.getTextWidth(`Actual Loading Days: ${actualLoadingDays} days ( `), yPos);

// NOR Tendered Value
doc.setFont('helvetica', 'normal');
doc.setTextColor(0, 0, 0);
doc.text(` : ${norTenderedLoading} | `, 
    32 + doc.getTextWidth(`Actual Loading Days: ${actualLoadingDays} days ( ${norLabel}`), 
    yPos
);

// Stop Loading
doc.setFont('helvetica', 'bold');
doc.setTextColor(200, 60, 60); // red
let stopLabel = "Stop Loading LT";
doc.text(stopLabel, 
    28 + doc.getTextWidth(`Actual Loading Days: ${actualLoadingDays} days ( ${norLabel} : ${norTenderedLoading} | `), 
    yPos
);

// Stop Value
doc.setFont('helvetica', 'normal');
doc.setTextColor(0, 0, 0);
doc.text(` : ${stopLoading} )`, 
    37 + doc.getTextWidth(`Actual Loading Days: ${actualLoadingDays} days ( ${norLabel} : ${norTenderedLoading} | ${stopLabel}`), 
    yPos
);

// === Actual Discharging Days Section ===
yPos = yPos + 10;
doc.setFont('helvetica', 'bold');
doc.setFontSize(12);
doc.setTextColor(30, 30, 120);
doc.text(`Actual Discharging Days: ${actualDischargingDays} days ( `, 25, yPos);

// NOR Tendered Discharging
doc.setFont('helvetica', 'bold');
doc.setTextColor(0, 102, 204); // blue
let norDisLabel = "NOR Tendered Discharging LT";
doc.text(norDisLabel, 25 + doc.getTextWidth(`Actual Discharging Days: ${actualDischargingDays} days ( `), yPos);

// NOR Discharging Value
doc.setFont('helvetica', 'normal');
doc.setTextColor(0, 0, 0);
doc.text(` : ${norTenderedDischarging} | `, 
    34 + doc.getTextWidth(`Actual Discharging Days: ${actualDischargingDays} days ( ${norDisLabel}`), 
    yPos
);

// Stop Discharging
doc.setFont('helvetica', 'bold');
doc.setTextColor(200, 60, 60); // red
let stopDisLabel = "Stop Discharging LT";
doc.text(stopDisLabel, 
    25 + doc.getTextWidth(`Actual Discharging Days: ${actualDischargingDays} days ( ${norDisLabel} : ${norTenderedDischarging} | `), 
    yPos
);

// Stop Value
doc.setFont('helvetica', 'normal');
doc.setTextColor(0, 0, 0);
doc.text(` : ${stopDischarging} )`, 
    43 + doc.getTextWidth(`Actual Loading Days: ${actualDischargingDays} days ( ${norDisLabel} : ${norTenderedDischarging} | ${stopDisLabel}`), 
    yPos
);

    // doc.text(`Calculation Method: Direct Fuel Consumption (Well-to-Wake)`, 25, 86);


    yPos += 15;
    doc.setFont('helvetica', 'bold');
    doc.text('VOYAGE LEGS DETAILED ANALYSIS', 20, yPos);
    
    // Prepare enhanced table data with compact headers
    const tableData = [];
    const tableHeaders = [
        'Segment',
        'Voyage Leg', 
        'Dist.\n(nm)', 
        'Speed\n(kts)', 
        'Days', 
        'Adj. Margin Days', 
    ];
    // console.log(routeDataDict[selectedRoute]);
    // Get data from the detailed table or route data
    let hasTableData = false;
    
    $('#detailedTableBody tr').each(function() {
        const row = [];
        const $row = $(this);
        const segment = $row.data('segment');

        const segments = [
            { key: "pre_ballast", label: "Pre-Ballast" },
            { key: "laden", label: "Laden" },
            { key: "post_ballast", label: "Post-Ballast" }
        ];

        if(segment && $row.prev().data('segment') !== segment) {
            row.push(segments.find(s => s.key === segment)?.label || segment);
        } else {
            row.push('');
        }

        $(this).find('td').each(function(index) {
            if (index < 6) {
                row.push($(this).text().trim());
            }
        });
        if (row.length > 0) {
            tableData.push(row);
            hasTableData = true;
        }
    });
    
    // If no table data, create from route data
    if (!hasTableData) {
        const routeData = routeDataDict[selectedRoute];
        if (routeData && routeData.legs) {
            Object.entries(routeData.legs).forEach(([legKey, legData]) => {
                tableData.push([
                    legData.description || legKey.replace(/([A-Z])/g, ' $1').trim(),
                    legData.distance ? `${legData.distance}` : '--',
                    legData.speed ? `${legData.speed}` : '--',
                    legData.days ? `${legData.days}` : '--',
                    legData.lfo ? `${legData.lfo}` : '--',
                    legData.mgo ? `${legData.mgo}` : '--',
                    legData.hfo ? `${legData.hfo}` : '--',
                    '--'
                ]);
            });
        }
    }
    
    // Add the professional table with proper responsive sizing
    doc.autoTable({
        // head: [tableHeaders],
        // body: tableData,
        html: '#voyageLegTable',
        startY: yPos + 10,
        styles: {
            fontSize: 7,
            cellPadding: 2, // little extra
            lineColor: [200, 200, 200],
            lineWidth: 0.1,
            textColor: [50, 50, 50],
            overflow: 'linebreak',
            cellWidth: 'wrap',
            minCellHeight: 8,   // Increase for more space
        },
        headStyles: {
            minCellHeight: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            cellWidth: 'wrap',
            halign: "center",
            fillColor:[116,24,15],
            textColor :"white"
        },
        bodyStyles: {
            minCellHeight: 8,
            cellPadding: 2,
            overflow: 'linebreak',
            cellWidth: 'wrap',
            fontSize: 7
        },
        alternateRowStyles: {
            fillColor: [248, 249, 250]
        },
        columnStyles: {
            0: { cellWidth: 28, fontStyle: 'bold', halign: 'left' },
            1: { cellWidth: 20, halign: 'center' },
            2: { cellWidth: 35, halign: 'center' },
            3: { cellWidth: 35, halign: 'center' },
            4: { cellWidth: 18, halign: 'right' },
            5: { cellWidth: 18, halign: 'right' },
            6: { cellWidth: 15, halign: 'right' },
            7: { cellWidth: 15, halign: 'right' },
            8: { cellWidth: 15, halign: 'right' },
            9: { cellWidth: 17, halign: 'right' },
            10: { cellWidth: 17, halign: 'right' },
            11: { cellWidth: 17, halign: 'right' },
            12: { cellWidth: 20, halign: 'right' },
        },
        margin: { left: 20, right: 20 },
        theme: 'grid',
        tableWidth: 'auto',
        showHead: 'everyPage'
    });


    
    // Methodology note
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('', 20, finalY);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const methodText = '';
    //                   'ECA areas utilize MGO fuel, Non-ECA areas use LFO, and port operations use MGO as per IMO regulations.';
    
    const splitText = doc.splitTextToSize(methodText, 170);
    doc.text(splitText, 20, finalY + 8);
    
    // Professional footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        
        // Footer line (adjusted for landscape)
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(2);
        doc.line(20, doc.internal.pageSize.height - 25, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 25);
        
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.setFont('helvetica', 'normal');
        doc.text('Generated by BOSS', 20, doc.internal.pageSize.height - 15);
        doc.text(`${currentDate} ${currentTime}`, 20, doc.internal.pageSize.height - 10);
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
    }
    
    // Enhanced filename
    const timestamp = now.toISOString().slice(0, 10);
    const filename = `Oldendorff-Salzgitter-Emissions-report-${voyageNumber}.pdf`;
    doc.save(filename);
    
    console.log('Professional PDF exported successfully:', filename);
}

// Initialize PDF export functionality when document is ready
$(document).ready(function() {
    // PDF Export button click handler
    $('#exportPdfBtn').on('click', function() {
        exportVoyageAnalysisToPDF();
    });
});