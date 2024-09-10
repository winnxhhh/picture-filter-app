var blurFilter;
var blurFilterSelected = false;

function blurFilterSetup()
{
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(blurFilter.width, blurFilter.height, scaleFactor, classifier);
}

function blurringFilter()
{
    if(!imageLoaded)
    return;

    //to ensure that only blur filter is shown when it is selected
    if(blurFilterSelected == false)
    {
        return false;
    }
    else if(blurFilterSelected == true)
    {
        console.log("blurring filter is running");

        faces = detector.detect(blurFilter.canvas);
    
        blurFilter.loadPixels();
    
        //ensures the blur is only in the part where the face is detected
        for (var i = 0 ; i < faces.length ; i++)
        {
            var face = faces[i];
            if (face[4] > 4)
            {
                processBlur(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            }
        }

        blurFilter.updatePixels();
        image(blurFilter, 20, 600, 160, 120);
    }
}

//function to generate the blur filter
function processBlur(startX, startY, dWidth, dHeight)
{
    var matrix = getSimpleBlurKernel(20);
    
    for(var y = startY ; y < startY + dHeight ; y++)
    {
        for(var x = startX ; x < startX + dWidth ; x++)
        {   
            var pixelIndex = ((blurFilter.width * y) + x) * 4;
            var r = blurFilter.pixels[pixelIndex + 0];

            //calculate the convolution value for that pixel
            var c = convolution(x, y, matrix, blurFilter);

            //update each pixel with new RGB value
            blurFilter.pixels[pixelIndex + 0] = c[0];
            blurFilter.pixels[pixelIndex + 1] = c[1];
            blurFilter.pixels[pixelIndex + 2] = c[2];
        }
    }
}
  
//for simple averaging or blurring operation
function getSimpleBlurKernel(size)
{
    var m = [];
    for(var i = 0 ; i < size ; i++)
    {
        var n = [];
        for(var j = 0 ; j < size ; j++)
        {
            n.push(1 / (size * size));
        }
        m.push(n);
    }
    return m;
}
  
function convolution(x, y, matrix, blurFilter) 
{
    var matrixSize = matrix.length;
    var totalRed = 0.0;
    var totalGreen = 0.0;
    var totalBlue = 0.0;
    var offset = floor(matrixSize / 2);

    //loops the convolution matrix
    for (var i = 0 ; i < matrixSize ; i++) 
    {
        for (var j = 0 ; j < matrixSize ; j++) 
        {
            //get pixel location within the convolution matrix
            var xloc = x + i - offset;
            var yloc = y + j - offset;
            var index = (xloc + blurFilter.width * yloc) * 4;

            //ensures that we dont address a pixel that doesnt exist
            index = constrain(index, 0, blurFilter.pixels.length - 1);

            //multiply all values with the mask and sum up
            totalRed += blurFilter.pixels[index + 0] * matrix[i][j];
            totalGreen += blurFilter.pixels[index + 1] * matrix[i][j];
            totalBlue += blurFilter.pixels[index + 2] * matrix[i][j];
        }
    }

    //return the new color as an array
    return [totalRed, totalGreen, totalBlue];
}
  
  