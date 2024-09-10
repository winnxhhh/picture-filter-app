var YCBCRimg;

function ycbcrChannel()
{
    var ycbcrImg = createImage(YCBCRimg.width, YCBCRimg.height);
    ycbcrImg.loadPixels();

    //load image pixel values into array pixels
    YCBCRimg.loadPixels();

    for(var y = 0 ; y < YCBCRimg.height ; y++)
    {
        for(var x = 0 ; x < YCBCRimg.width ; x++)
        {
            var pixelIndex = ((YCBCRimg.width * y) + x) * 4;
            var pixelRed = YCBCRimg.pixels[pixelIndex + 0];
            var pixelGreen = YCBCRimg.pixels[pixelIndex + 1];
            var pixelBlue = YCBCRimg.pixels[pixelIndex + 2];

            var ycbcr = rgbToYcbcr(pixelRed, pixelGreen, pixelBlue)

            //set ycbcr values as pixel colors
            ycbcrImg.pixels[pixelIndex + 0] = ycbcr[0] * 0.75; 
            ycbcrImg.pixels[pixelIndex + 1] = ycbcr[1] * 2;
            ycbcrImg.pixels[pixelIndex + 2] = ycbcr[2] * 2.5;
            ycbcrImg.pixels[pixelIndex + 3] = 255;
        }
    }

    ycbcrImg.updatePixels();
    image(ycbcrImg, ycbcrImg.width - 150, ycbcrImg.width - 70, 160, 120);
}

//function to convert rgb values to ycbcr values
function rgbToYcbcr(r, g, b) 
{
    var y = 0.299 * r + 0.587 * g + 0.114 * b;
    var cb = -0.169 * r - 0.331 * g + 0.500 * b;
    var cr = 0.500 * r - 0.419 * g - 0.081 * b;
    return [y, cb, cr];
}
