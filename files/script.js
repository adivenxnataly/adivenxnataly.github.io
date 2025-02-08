function getDominantColor(videoElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
    }
    const totalPixels = imageData.length / 4;
    r = Math.round(r / totalPixels);
    g = Math.round(g / totalPixels);
    b = Math.round(b / totalPixels);

    return { r, g, b };
}

function isColorLight(r, g, b) {
    const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return brightness > 0.5;
}

function updateTextColor() {
    const videoElement = document.getElementById('background-video');
    const h1Element = document.querySelector('.container h1');
    const spanElement = document.querySelector('.container span');
    const iconsElement = document.querySelectorAll('.social-icons a');

    const color = getDominantColor(videoElement);

    if (isColorLight(color.r, color.g, color.b)) {
        h1Element.style.color = 'black';
        spanElement.style.color = 'black';
        iconsElement.forEach(icon => {
            icon.style.color = 'black';
        })
    } else {
        h1Element.style.color = 'white';
        spanElement.style.color = 'white';
        iconsElement.forEach(icon => {
            icon.style.color = 'white';
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('background-video');
    videoElement.addEventListener('loadeddata', () => {
        updateTextColor();
    });

    setInterval(updateTextColor, 100);
});