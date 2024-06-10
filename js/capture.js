export function initializeCamera(videoElement) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            videoElement.srcObject = stream;
        })
        .catch(err => {
            console.error("Error accessing camera: ", err);
            alert("Error accessing camera: " + err.message);
        });
}

export function captureImage(videoElement, canvasElement) {
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    canvasElement.style.display = 'block';
}
