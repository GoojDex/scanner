import { initializeCamera, captureImage } from './capture.js';
import { enhanceImage } from './enhance.js';
import { performOCR } from './ocr.js';
import { exportAsPNG, exportAsJPEG, exportAsPDF } from './export.js';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const enhanceButton = document.getElementById('apply-enhancement');
const brightnessInput = document.getElementById('brightness');
const contrastInput = document.getElementById('contrast');
const grayscaleInput = document.getElementById('grayscale');
const ocrButton = document.getElementById('ocr');
const exportPngButton = document.getElementById('export-png');
const exportJpegButton = document.getElementById('export-jpeg');
const exportPdfButton = document.getElementById('export-pdf');
const outputDiv = document.getElementById('output');
const loadingDiv = document.getElementById('loading');

initializeCamera(video);

captureButton.addEventListener('click', () => {
    captureImage(video, canvas);
});

enhanceButton.addEventListener('click', () => {
    const brightness = parseInt(brightnessInput.value);
    const contrast = parseInt(contrastInput.value);
    const grayscale = grayscaleInput.checked;
    enhanceImage(canvas, brightness, contrast, grayscale);
});

ocrButton.addEventListener('click', () => {
    performOCR(canvas, outputDiv, loadingDiv);
});

exportPngButton.addEventListener('click', () => {
    exportAsPNG(canvas);
});

exportJpegButton.addEventListener('click', () => {
    exportAsJPEG(canvas);
});

exportPdfButton.addEventListener('click', () => {
    exportAsPDF(canvas);
});
