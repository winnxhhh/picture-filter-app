var grayFilter;
var filterGray = false;

function grayscaleFilterSetup()
{
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(grayFilter.width, grayFilter.height, scaleFactor, classifier);
}

function grayscaleFilter()
{
    if(filterGray == false)
    {
        return false;
    }
    else if(filterGray == true)
    {
        console.log("grayscale filter is running");

        faces = detector.detect(grayFilter.canvas);
    
        grayFilter.loadPixels();
    
        for (var i = 0 ; i < faces.length ; i++)
        {
            var face = faces[i];
            if (face[4] > 4)
            {
                processGray(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            }
        }

        grayFilter.updatePixels();
        image(grayFilter, 20, 600, 160, 120);
    }
}

//function to generate the grayscale filter
function processGray(startX, startY, dWidth, dHeight)
{
    for(var y = startY ; y < startY + dHeight ; y++)
    {
        for(var x = startX ; x < startX + dWidth ; x++)
        {
            let pixelIndex = (grayFilter.width * y + x) * 4;
            let pixelRed = grayFilter.pixels[pixelIndex + 0];
            let pixelGreen = grayFilter.pixels[pixelIndex + 1];
            let pixelBlue = grayFilter.pixels[pixelIndex + 2];
            
            //convert to grayscale
            let grayscale = (pixelRed + pixelGreen + pixelBlue) / 3;

            //ensures values are within range
            grayscale = constrain(grayscale, 0, 255);

            //update pixel values
            grayFilter.pixels[pixelIndex] = grayscale;
            grayFilter.pixels[pixelIndex + 1] = grayscale;
            grayFilter.pixels[pixelIndex + 2] = grayscale;
        }
    }
}