function downloadImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.click();
}

export function exportAsPNG(canvasElement) {
    const dataUrl = canvasElement.toDataURL('image/png');
    downloadImage(dataUrl, 'scanned-document.png');
}

export function exportAsJPEG(canvasElement) {
    const dataUrl = canvasElement.toDataURL('image/jpeg');
    downloadImage(dataUrl, 'scanned-document.jpeg');
}

export function exportAsPDF(canvasElement) {
    const { jsPDF } = window.jspdf;
    const imgData = canvasElement.toDataURL('image/jpeg');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'JPEG', 0, 0, canvasElement.width, canvasElement.height);
    pdf.save('scanned-document.pdf');
}
