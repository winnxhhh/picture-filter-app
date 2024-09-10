var faceImg;
var detector;
var classifier = objectdetect.frontalface;
var faceDetect = true;

function faceDetectionSetup()
{
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(faceImg.width, faceImg.height, scaleFactor, classifier);
}

function faceDetectionDraw()
{
    if(!imageLoaded)
    return;

    //to ensure that only blur filter is shown when it is selected
    if(faceDetect == false)
    {
        return false;
    }
    else if(faceDetect == true)
    {
        console.log("face detect filter is running")
        faces = detector.detect(faceImg.canvas);

        faceImg.loadPixels();

        //ensures the blur is only in the part where the face is detected
        for (var i = 0 ; i < faces.length ; i++)
        {
            var face = faces[i];
            if (face[4] > 4)
            {
                processPixels(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            }
        }

        faceImg.updatePixels();
        image(faceImg, 20, 600, 160, 120);
    }
}

function processPixels(startX, startY, dWidth, dHeight)
{
    for(var y = startY ; y < startY + dHeight ; y++)
    {
        for(var x = startX ; x < startX + dWidth ; x++)
        {
            var pixelIndex = ((faceImg.width * y) + x) * 4;
            var pixelRed = faceImg.pixels[pixelIndex + 0];

            //colours only the detected face red
            faceImg.pixels[pixelIndex + 0] = pixelRed;
            faceImg.pixels[pixelIndex + 1] = 0;
            faceImg.pixels[pixelIndex + 2] = 0;
            faceImg.pixels[pixelIndex + 3] = 255;
        }
    }
}

