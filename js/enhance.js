function adjustBrightnessContrast(imageData, brightness, contrast) {
    const data = imageData.data;
    brightness = (brightness / 100) * 255;
    contrast = (contrast / 100) + 1;
    const intercept = 128 * (1 - contrast);
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i] * contrast + intercept + brightness;       // Red
        data[i + 1] = data[i + 1] * contrast + intercept + brightness; // Green
        data[i + 2] = data[i + 2] * contrast + intercept + brightness; // Blue
    }
    return imageData;
}

function applyGrayscale(imageData) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
    }
    return imageData;
}

export function enhanceImage(canvasElement, brightness, contrast, grayscale) {
    const ctx = canvasElement.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height);
    
    imageData = adjustBrightnessContrast(imageData, brightness, contrast);
    
    if (grayscale) {
        imageData = applyGrayscale(imageData);
    }
    
    ctx.putImageData(imageData, 0, 0);
}
