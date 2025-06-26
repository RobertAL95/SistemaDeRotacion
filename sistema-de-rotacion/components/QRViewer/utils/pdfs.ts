import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadQRAsPDF = async () => {
  const qrElements = document.querySelectorAll('.qr-card');
  const pdf = new jsPDF();

  for (let i = 0; i < qrElements.length; i++) {
    const element = qrElements[i] as HTMLElement;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    if (i > 0) pdf.addPage();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 180);
  }

  pdf.save('qr-listado.pdf');
};
