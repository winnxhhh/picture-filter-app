var ycbcrThresholdImg;
var ycbcrSlider;

//sets up the sliders for the ycbcr filters
function ycbcrThresholdSetup()
{
    ycbcrSlider = createSlider(-50, 30, -10);
    ycbcrSlider.parent("ycbcrSlider");
}

function ycbcrThresholdDraw()
{
    if(!imageLoaded)
    return;

    var ycbcrImg = createImage(YCBCRimg.width, YCBCRimg.height);
    ycbcrImg.loadPixels();

    for(var y = 0 ; y < ycbcrThresholdImg.height ; y++)
    {
        for(var x = 0 ; x < ycbcrThresholdImg.width ; x++)
        {
            var pixelIndex = ((ycbcrThresholdImg.width * y) + x) * 4;
            var pixelRed = ycbcrThresholdImg.pixels[pixelIndex + 0];
            var pixelGreen = ycbcrThresholdImg.pixels[pixelIndex + 1];
            var pixelBlue = ycbcrThresholdImg.pixels[pixelIndex + 2];
            
            //display luminance (y) as red, blue chrominance (cb) as green, red chrominance (cr) as blue
            var ycbcr = rgbToYcbcr(pixelRed, pixelGreen, pixelBlue)

            //checks if the y is greater than the slider value
            if (ycbcrSlider.value() < ycbcr[0] && ycbcrSlider.value() < ycbcr[1] && ycbcrSlider.value() < ycbcr[2]) 
            {
                //if yes, set the pixels to show original image
                ycbcrImg.pixels[pixelIndex + 0] = pixelRed;
                ycbcrImg.pixels[pixelIndex + 1] = pixelGreen;
                ycbcrImg.pixels[pixelIndex + 2] = pixelBlue;
            } 
            else 
            {
                //if no, set the pixel to ycbcr
                ycbcrImg.pixels[pixelIndex + 0] = ycbcr[0] * 0.75; 
                ycbcrImg.pixels[pixelIndex + 1] = ycbcr[1] * 2;
                ycbcrImg.pixels[pixelIndex + 2] = ycbcr[2] * 2.5;
            }

            //sets alpha value
            ycbcrImg.pixels[pixelIndex + 3] = 255;
        }
    }

    ycbcrImg.updatePixels();
    image(ycbcrImg, ycbcrImg.width - 150, ycbcrImg.width + 70, 160, 120);
}

//function to convert rgb values to ycbcr values
function rgbToYcbcr(r, g, b) 
{
    var y = 0.299 * r + 0.587 * g + 0.114 * b;
    var cb = -0.169 * r - 0.331 * g + 0.500 * b;
    var cr = 0.500 * r - 0.419 * g - 0.081 * b;
    return [y, cb, cr];
}