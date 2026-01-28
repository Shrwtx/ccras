import jsPDF from 'jspdf';
import { DiagnosisResult, InfoTabContent } from '../types';

const isUnicode = (str: string): boolean => /[^\x00-\x7F]/.test(str);

const renderTextToImage = (text: string, fontSize: number, color: string, bold: boolean = false): { data: string, width: number, height: number } => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return { data: '', width: 0, height: 0 };
  const scale = 4;
  const fontStack = '"Inter", "Noto Sans", "Segoe UI", "Arial Unicode MS", "sans-serif"';
  const fontStr = `${bold ? '700 ' : '400 '}${fontSize * scale}px ${fontStack}`;
  ctx.font = fontStr;
  const metrics = ctx.measureText(text);
  const padding = 2 * scale;
  const width = Math.ceil(metrics.width) + (padding * 2);
  const height = Math.ceil(fontSize * 1.6 * scale);
  canvas.width = width;
  canvas.height = height;
  ctx.font = fontStr;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(text, padding, height / 2);
  return { data: canvas.toDataURL('image/png'), width: width / scale, height: height / scale };
};

const safe = (val: any, fallback = 0): number => {
  const n = Number(val);
  return isFinite(n) && !isNaN(n) ? n : fallback;
};

const getImageData = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!url) { reject('No URL'); return; }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width; canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) { reject('No context'); return; }
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };
    img.onerror = () => reject('Load error');
    img.src = url;
  });
};

export const generatePDFReport = async (report: DiagnosisResult) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = safe(doc.internal.pageSize.getWidth(), 210);
  const pageHeight = safe(doc.internal.pageSize.getHeight(), 297);
  const printableWidth = safe(pageWidth - (margin * 2), 170);
  const primaryBlue = '#1e3a8a';
  const slate600 = '#4b5563';
  const slate900 = '#111827';
  let y = margin;

  const drawText = (text: string, x: number, yPos: number, fontSize: number, color: string = '#000000', isBold: boolean = false) => {
    if (isUnicode(text)) {
      const { data, width, height } = renderTextToImage(text, fontSize, color, isBold);
      if (data) {
        const mmW = (width * 25.4) / 96;
        const mmH = (height * 25.4) / 96;
        doc.addImage(data, 'PNG', x, yPos - (mmH * 0.72), mmW, mmH);
      }
    } else {
      doc.setFontSize(fontSize);
      doc.setTextColor(color);
      doc.setFont('helvetica', isBold ? 'bold' : 'normal');
      doc.text(text, x, yPos);
    }
  };

  const checkPageOverflow = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - margin - 15) {
      doc.addPage();
      y = margin + 10;
      return true;
    }
    return false;
  };

  try {
    // 1. FORMAL INSTITUTIONAL HEADER
    const logoUrl = "https://ccras.nic.in/wp-content/uploads/2025/05/cropped-CCRAS-Trademark-Transparent.png";
    try {
      const logoData = await getImageData(logoUrl);
      doc.addImage(logoData, 'PNG', margin, y, 16, 16);
    } catch (e) {}

    const headerX = margin + 22;
    drawText('CENTRAL COUNCIL FOR RESEARCH IN AYURVEDIC SCIENCES', headerX, y + 4, 10, slate900, true);
    drawText('Ministry of Ayush, Govt. of India | Research Division', headerX, y + 9, 8, primaryBlue, false);
    drawText('Janakpuri, New Delhi - 110058', headerX, y + 13, 7, slate600, false);
    
    y += 24;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 12;

    // 2. REPORT TITLE & CORE METADATA
    drawText('CLINICAL RADIOLOGICAL ARCHIVE', margin, y, 12, slate900, true);
    y += 10;
    
    doc.setFillColor(252, 252, 252);
    doc.rect(margin, y, printableWidth, 24, 'F');
    const col2 = margin + printableWidth / 2;
    
    drawText('PROTOCOL ID:', margin + 6, y + 8, 7, slate600, true);
    drawText(report.id, margin + 35, y + 8, 9, slate900, true);
    drawText('AYURVEDA CODE:', col2 + 6, y + 8, 7, slate600, true);
    drawText(report.primaryAyurvedaCode || 'N/A', col2 + 35, y + 8, 9, primaryBlue, true);
    
    drawText('TIMESTAMP:', margin + 6, y + 16, 7, slate600, true);
    drawText(new Date(report.timestamp).toLocaleString(), margin + 35, y + 16, 8, slate900, false);
    drawText('WHO ICD-10:', col2 + 6, y + 16, 7, slate600, true);
    drawText(report.icdCode || 'N/A', col2 + 35, y + 16, 8, slate900, false);
    
    y += 35;

    // 3. FINDINGS SECTION
    drawText('SECTION I: DIAGNOSTIC IMPRESSION', margin, y, 9, primaryBlue, true);
    y += 6;
    doc.setDrawColor(230, 230, 230);
    doc.rect(margin, y, printableWidth, 30);
    
    drawText('PRIMARY FINDING:', margin + 8, y + 10, 8, slate600, true);
    drawText(report.prediction.toUpperCase(), margin + 8, y + 22, 18, slate900, true);
    
    const confX = margin + printableWidth - 45;
    drawText('CONFIDENCE', confX, y + 10, 7, slate600, true);
    drawText(`${(report.confidence * 100).toFixed(1)}%`, confX, y + 22, 16, primaryBlue, true);
    y += 40;

    // 4. OBSERVATIONS REASONING
    checkPageOverflow(40);
    drawText('SECTION II: RADIOLOGICAL REASONING', margin, y, 9, primaryBlue, true);
    y += 8;
    const obsLines = doc.splitTextToSize(report.radiologicalObservation, printableWidth - 10);
    obsLines.forEach((ln: string) => {
      checkPageOverflow(7);
      drawText(ln, margin + 5, y, 9, slate900, false);
      y += 6;
    });
    y += 12;

    // 5. IMAGING EVIDENCE
    checkPageOverflow(90);
    drawText('SECTION III: VISUAL EVIDENCE', margin, y, 9, primaryBlue, true);
    y += 8;
    const boxW = (printableWidth / 2) - 10;
    const originalImageUrl = report.imageUrl || report.original_url;
    
    if (originalImageUrl) {
      try {
        const b64 = await getImageData(originalImageUrl);
        const xPos = margin + ((printableWidth - boxW) / 2);
        doc.setDrawColor(220, 220, 220);
        doc.rect(xPos, y, boxW, boxW);
        doc.addImage(b64, 'JPEG', xPos, y, boxW, boxW);
        drawText('ORIGINAL DIAGNOSTIC SCAN', xPos, y + boxW + 6, 7, slate600, true);
      } catch (e) {
        console.error("Failed to load image for PDF:", e);
      }
    }
    y += boxW + 22;

    // 6. AYUSH DATA - FIXED TO HANDLE TABS ONLY
    if (report.info && Object.keys(report.info).length > 0) {
      checkPageOverflow(30);
      drawText('SECTION IV: INTEGRATED CLASSIFICATIONS', margin, y, 10, primaryBlue, true);
      y += 10;

      for (const [section, content] of Object.entries(report.info)) {
        checkPageOverflow(25);
        doc.setFillColor(245, 245, 245);
        doc.rect(margin, y, printableWidth, 6, 'F');
        drawText(section.toUpperCase(), margin + 4, y + 4.5, 8, slate900, true);
        y += 10;

        // Handle tabs array format from backend
        if (content && Array.isArray(content.tabs) && content.tabs.length > 0) {
          content.tabs.forEach((tab: any, idx: number) => {
            checkPageOverflow(10);
            const label = tab.label || `Field ${idx}`;
            const value = tab.value || '—';
            
            drawText(`${label}:`, margin + 10, y, 7, slate600, true);
            y += 5;
            
            if (value && value.length > 60) {
              const lines = doc.splitTextToSize(String(value), printableWidth - 25);
              lines.forEach((ln: string) => {
                checkPageOverflow(6);
                drawText(ln, margin + 14, y, 8, slate900, false);
                y += 5;
              });
            } else {
              drawText(String(value), margin + 14, y, 8, slate900, false);
              y += 5;
            }
            y += 2;
          });
        } else {
          drawText('No data available', margin + 10, y, 8, slate600, false);
          y += 8;
        }
        y += 8;
      }
    }

    // FOOTER
    y = Math.max(y, pageHeight - 25);
    doc.setDrawColor(230, 230, 230);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    drawText('ELECTRONICALLY VALIDATED RECORD • CCRAS MEDICAL AI PLATFORM', margin, y, 6, slate600, true);
    drawText('Ministry of Ayush, Govt. of India | Records generated on ' + new Date().toLocaleDateString(), margin, y + 4, 6, slate600);
    
    doc.save(`CCRAS_Diagnostic_Archive_${report.id}.pdf`);
  } catch (err) {
    console.error("Clinical PDF Export Failed:", err);
  }
};
