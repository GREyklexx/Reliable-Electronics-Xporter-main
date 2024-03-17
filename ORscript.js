

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        video.play();
    }, 5000); 
});

let detectedObjects = {};
const lingeringTime = 100; 
const objectColors = {
    'person': 'black',
    'bicycle': 'yellow',
    'car': 'red',
    'motorbike': 'orange',
    'aeroplane': 'green',
    'bus': 'blue',
    'train': 'purple',
    'truck': 'indigo',
    'boat': 'violet',
};

const video = document.querySelector('#myVideo');
const canvas = document.querySelector('#canvas');
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
document.querySelector('#container').appendChild(canvas);
const context = canvas.getContext('2d');
const playButton = document.querySelector('#playButton');
const overlayButton = document.querySelector('#overlayButton');
let overlayShown = true;
let model;


cocoSsd.load().then(loadedModel => {
    model = loadedModel;
    video.src = "test.mp4";
});




        const sourceSelection = document.querySelectorAll('input[name="source"]');
const fileInput = document.getElementById('fileInput');
const urlInput = document.getElementById('urlInput');

sourceSelection.forEach(input => {
    input.addEventListener('change', (event) => {
        switch (event.target.value) {
            case 'local':
                fileInput.style.display = 'block';
                urlInput.style.display = 'none';
                break;
            case 'url':
                fileInput.style.display = 'none';
                urlInput.style.display = 'block';
                break;
            case 'webcam':
                fileInput.style.display = 'none';
                urlInput.style.display = 'none';
                loadWebcam();
                break;
        }
    });
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        video.src = URL.createObjectURL(file);
        video.load();
    }
});

urlInput.addEventListener('input', () => {
    video.src = urlInput.value;
    video.load();
});

function loadWebcam() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.load();
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });
}

        cocoSsd.load().then(loadedModel => {
    model = loadedModel;
    video.src = "test.mp4"; 
    video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        detectObjects();
    };
});
    
function detectObjects() {
    if (!model) {
        setTimeout(detectObjects, 50);
        return;
    }

    model.detect(video).then(predictions => {
        const currentTime = new Date().getTime();

        predictions.forEach(prediction => {
            const key = `${prediction.class}_${prediction.bbox.join('_')}`; 
            detectedObjects[key] = {
                bbox: prediction.bbox,
                score: prediction.score,
                lastSeen: currentTime,
                objectClass: prediction.class 
            };
        });

       
        Object.keys(detectedObjects).forEach(key => {
            if (currentTime - detectedObjects[key].lastSeen > lingeringTime) {
                delete detectedObjects[key];
            }
        });

      
        context.clearRect(0, 0, canvas.width, canvas.height);

       
        Object.values(detectedObjects).forEach(object => {
            drawRectangle(object.bbox, object.score, object.objectClass); 
        });

        requestAnimationFrame(detectObjects);
    });
}






function drawRectangle(bbox, score, objectClass) {
    if (overlayShown==true) {
        const color = objectColors[objectClass] || 'red'; 

context.beginPath();
context.rect(bbox[0], bbox[1], bbox[2], bbox[3]);
context.lineWidth = 4;
context.strokeStyle = color;
context.stroke();
context.font = '20px Arial';
context.fillStyle = color;
context.fillText(
    `${objectClass} (${Math.round(score * 100)}%)`,
    bbox[0],
    bbox[1] > 20 ? bbox[1] - 5 : 10
); 
    }

}
    
        canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    
        video.onloadedmetadata = () => {
            video.play();
    
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            detectObjects();
        };
    
        playButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playButton.textContent = 'Pause';
            } else {
                video.pause();
                playButton.textContent = 'Play';
            }
        });
    
        overlayButton.addEventListener('click', () => {
            overlayShown = !overlayShown;
            overlayButton.textContent = overlayShown ? 'Hide Overlay' : 'Show Overlay';
        });


//easter egg section!










