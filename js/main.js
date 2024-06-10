import { initializeCamera, captureImageOnCanvas, getCapturedImages, clearCapturedImages } from './camera.js';
import { enhanceImage } from './enhancement.js';
import { performOCROnImage } from './ocr.js';
import { exportImageAsPNG, exportImageAsJPEG, exportImageAsPDF, exportImagesAsMergedPDF } from './export.js';
import { uploadToCloudStorage, downloadFromCloudStorage } from './firebase.js';
import { logoutUser, checkUserAuthentication, loginUser, registerUser } from './auth.js';

const videoElement = document.getElementById('video');
const canvasElement = document.getElementById('canvas');
const capturedImagesContainer = document.getElementById('captured-images');

// Initialize camera on page load
initializeCamera(videoElement);

// Toggle menu for mobile view
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('open');
});

// Handle menu links
document.getElementById('dashboard-link').addEventListener('click', () => {
    // Redirect to dashboard page
    window.location.href = 'dashboard.html';
});

document.getElementById('settings-link').addEventListener('click', () => {
    // Redirect to settings page
    window.location.href = 'settings.html';
});

// Capture button functionality
document.getElementById('capture').addEventListener('click', () => {
    captureImage();
});

// Apply enhancement button functionality
document.getElementById('apply-enhancement').addEventListener('click', () => {
    applyEnhancement();
});

// OCR button functionality
document.getElementById('ocr').addEventListener('click', () => {
    performOCR();
});

// Export buttons functionality
document.getElementById('export-png').addEventListener('click', () => {
    exportAsPNG();
});

document.getElementById('export-jpeg').addEventListener('click', () => {
    exportAsJPEG();
});

document.getElementById('export-pdf').addEventListener('click', () => {
    exportAsPDF();
});

document.getElementById('export-merged-pdf').addEventListener('click', () => {
    exportAsMergedPDF();
});

// Upload button functionality
document.getElementById('upload').addEventListener('click', () => {
    uploadToCloud();
});

// Download button functionality
document.getElementById('download').addEventListener('click', () => {
    downloadFromCloud();
});

// Login functionality
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

// Register functionality
document.getElementById('register-button').addEventListener('click', () => {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    registerUser(email, password);
});

// Show register form
document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('register-section').style.display = 'block';
});

// Show login form
document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('register-section').style.display = 'none';
});

// Function to capture image
function captureImage() {
    captureImageOnCanvas(videoElement, canvasElement);
    updateCapturedImages();
}

// Function to apply image enhancement
function applyEnhancement() {
    const brightness = parseInt(document.getElementById('brightness').value);
    const contrast = parseInt(document.getElementById('contrast').value);
    const grayscale = document.getElementById('grayscale').checked;
    const edgeDetection = document.getElementById('edge-detection').checked;
    const sharpen = document.getElementById('sharpen').checked;

    enhanceImage(canvasElement, brightness, contrast, grayscale, edgeDetection, sharpen);
}

// Perform OCR on the image
function performOCR() {
    performOCROnImage(canvasElement, (result) => {
        document.getElementById('output').innerText = result;
    });
}

// Export image as PNG
function exportAsPNG() {
    exportImageAsPNG(canvasElement);
}

// Export image as JPEG
function exportAsJPEG() {
    exportImageAsJPEG(canvasElement);
}

// Export image as PDF
function exportAsPDF() {
    exportImageAsPDF(canvasElement);
}

// Export captured images as merged PDF
function exportAsMergedPDF() {
    const images = getCapturedImages();
    if (images.length > 0) {
        exportImagesAsMergedPDF(images);
    } else {
        alert('No images captured for merging.');
    }
}

// Upload images to cloud
function uploadToCloud() {
    const images = getCapturedImages();
    if (images.length > 0) {
        images.forEach(imageData => {
            const file = convertDataUrlToBlob(imageData);
            uploadToCloudStorage(file, (url) => {
                console.log('File uploaded to cloud successfully: ', url);
            });
        });
    } else {
        alert('No images captured for upload.');
    }
}

// Download file from cloud
function downloadFromCloud() {
    const fileUrl = prompt('Enter the file URL to download:');
    if (fileUrl) {
        downloadFromCloudStorage(fileUrl, (blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'downloaded-file';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    } else {
        alert('No file URL provided.');
    }
}

// Convert Data URL to Blob
function convertDataUrlToBlob(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// Update captured images in the preview section
function updateCapturedImages() {
    const images = getCapturedImages();
    capturedImagesContainer.innerHTML = '';
    images.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData;
        img.alt = `Captured Image ${index + 1}`;
        img.className = 'captured-image';
        capturedImagesContainer.appendChild(img);
    });
}

// Event listener for logout
document.getElementById('logout').addEventListener('click', logoutUser);

// Check user authentication on page load
checkUserAuthentication();
