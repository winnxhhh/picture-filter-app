var pixelFilter;
var pixelFilterSelected = false;

function pixelFilterSetup()
{
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(pixelFilter.width, pixelFilter.height, scaleFactor, classifier);
}

function pixelatedFilter()
{
    //to ensure that only pixel filter is shown when it is selected
    if(pixelFilterSelected == false)
    {
        return false;
    }
    else if(pixelFilterSelected == true)
    {
        console.log("pixel filter is running");

        faces = detector.detect(pixelFilter.canvas);
    
        pixelFilter.loadPixels();

        //ensures the pixelated is only in the part where the face is detected
        for (var i = 0 ; i < faces.length ; i++)
        {
            var face = faces[i];
            if (face[4] > 4)
            {
                processPixel(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            }
        }

        pixelFilter.updatePixels();
        image(pixelFilter, 20, 600, 160, 120);
    }
}

//function to generate the pixelated filter
function processPixel(startX, startY, dWidth, dHeight)
{
    var pixelatedSize = 30;

    //process block by block
    for(var y = startY ; y < startY + dHeight ; y += pixelatedSize)
    {
        for(var x = startX ; x < startX + dWidth ; x += pixelatedSize)
        {
            var sumRed = 0;
            var sumGreen = 0;
            var sumBlue = 0;
            
            //get the sum of rgb on that block
            for(var i = 0 ; i < pixelatedSize ; i++)
            {
                for(var j = 0 ; j < pixelatedSize ; j++)
                {
                    var pixelIndex = ((pixelFilter.width * (y + j)) + (x + i)) * 4;
                    var pixelRed = pixelFilter.pixels[pixelIndex + 0];
                    var pixelGreen = pixelFilter.pixels[pixelIndex + 1];
                    var pixelBlue = pixelFilter.pixels[pixelIndex + 2];

                    sumRed += pixelRed;
                    sumGreen += pixelGreen;
                    sumBlue += pixelBlue;
                }
            }

            //calculate the average of rgb on that block
            var aveRed = sumRed / (pixelatedSize * pixelatedSize);
            var aveGreen = sumGreen / (pixelatedSize * pixelatedSize);
            var aveBlue = sumBlue / (pixelatedSize * pixelatedSize);
            
            //colour the block with the average rgb value
            for(var i = 0 ; i < pixelatedSize ; i++)
            {
                for(var j = 0 ; j < pixelatedSize ; j++)
                {
                    var pixelIndex = ((pixelFilter.width * (y + j)) + (x + i)) * 4;
                    pixelFilter.pixels[pixelIndex + 0] = aveRed;
                    pixelFilter.pixels[pixelIndex + 1] = aveGreen;
                    pixelFilter.pixels[pixelIndex + 2] = aveBlue;
                }
            }
        }
    }
}