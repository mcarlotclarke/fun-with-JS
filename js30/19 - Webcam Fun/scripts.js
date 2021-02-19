const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.log('OH NO, there is error!', err);
    });
}

// get a frame from video and paint it to the canvas
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  // every few milliseconds take an image from the camera and paint to the canvas
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // change/add filter effect on pixels
    pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // ctx.globalAlpha = 0.5; // for ghosting effect
    // pixels = greenScreen(pixels);

    // put pixels back in
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();
  // take data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'videoPerson');
  link.innerHTML = `<img src="${data}" alt="person on video" />`;
  strip.insertBefore(link, strip.firstChild);
}

// add filters
function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
  }

  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0];
    pixels.data[i + 500] = pixels.data[i + 1];
    pixels.data[i - 550] = pixels.data[i + 2];
  }

  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (let i = 0; i < pixels.data.length; i += 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
