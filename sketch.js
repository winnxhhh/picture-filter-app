var normalImg;
var imageLoaded = false;

var fourier;
var beatDetect;

function preload()
{
    greyImg = loadImage("assets/face2.jpg");
    normalImg = loadImage("assets/face2.jpg");
    rgbChannelImg = loadImage("assets/face2.jpg");
    rgbThresholdImg = loadImage("assets/face2.jpg", imageLoadedCallback);
    HSBimg = loadImage("assets/face2.jpg");
    hsbThresholdImg = loadImage("assets/face2.jpg", imageLoadedCallback);
    YCBCRimg = loadImage("assets/face2.jpg");
    ycbcrThresholdImg = loadImage("assets/face2.jpg", imageLoadedCallback);
    faceImg = loadImage("assets/face2.jpg");
    grayFilter = loadImage("assets/face2.jpg");
    HSBfilter = loadImage("assets/face2.jpg");
    blurFilter = loadImage("assets/face2.jpg");
    pixelFilter = loadImage("assets/face2.jpg");
    beatsFilter = loadImage("assets/face2.jpg");

    sound = loadSound('assets/vlad-gluschenko-afternoon.mp3');
}

function setup() 
{
    createCanvas(1000,1000);
    pixelDensity(1);

    //normal img code start
    normalImg.loadPixels();
    normalImg.resize(160, 120);

    normalImg.updatePixels();
    image(normalImg, 20, 0);
    image(normalImg, 20, 460);
    //normal img code end
    
    grayAndBright();

    rgbChannels();
    rgbThresholdSetup();

    hsbChannel();
    hsbThresholdSetup();

    ycbcrChannel();
    ycbcrThresholdSetup();

    faceDetectionSetup();
    hsbFilterSetup();
    grayscaleFilterSetup();
    blurFilterSetup();
    pixelFilterSetup();

    displayMenu();
    beatFilterSetup();
}

function draw()
{
    rgbThresholdDraw();
    hsbThresholdDraw();
    ycbcrThresholdDraw();

    faceDetectionDraw();
    grayscaleFilter();
    hsbColourFilter();
    blurringFilter();
    pixelatedFilter();
    beatFilterDraw();
}

function keyPressed()
{
    filterKeys(keyCode);
}

function imageLoadedCallback()
{
    imageLoaded = true;
    rgbThresholdImg.loadPixels();
    rgbThresholdImg.resize(160, 120);
    hsbThresholdImg.loadPixels();
    ycbcrThresholdImg.loadPixels();
}

//text instructions for key interaction
function displayMenu()
{
    fill(0);
    noStroke();
    textSize(25);
    text('you may press the following keys:', 570, 50);

    textSize(20);
    text('1: grayscale filter', 570, 80);
    text('2: blur filter', 570, 110);
    text('3: HSB filter', 570, 140);
    text('4: pixelate filter', 570, 170);
    text('5: play/stop music beat filter', 570, 200);
    text('0: go back to face detection', 570, 230);
}