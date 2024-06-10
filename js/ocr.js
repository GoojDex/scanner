export function performOCR(canvasElement, outputElement, loadingElement) {
    const imageData = canvasElement.toDataURL('image/png');
    loadingElement.classList.remove('hidden');
    Tesseract.recognize(
        imageData,
        'eng',
        {
            logger: m => console.log(m)
        }
    ).then(({ data: { text } }) => {
        outputElement.innerText = text;
        loadingElement.classList.add('hidden');
    }).catch(err => {
        console.error("Error during OCR: ", err);
        alert("Error during OCR: " + err.message);
        loadingElement.classList.add('hidden');
    });
}
