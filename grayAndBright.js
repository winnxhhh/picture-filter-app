var greyImg;

function grayAndBright()
{
    //load image pixel values into array pixels
    greyImg.loadPixels();
    greyImg.resize(160, 120);

    for (var y = 0 ; y < greyImg.height ; y++) 
    {
        for (var x = 0 ; x < greyImg.width ; x++) 
        {
            let pixelIndex = (greyImg.width * y + x) * 4;
            let pixelRed = greyImg.pixels[pixelIndex + 0];
            let pixelGreen = greyImg.pixels[pixelIndex + 1];
            let pixelBlue = greyImg.pixels[pixelIndex + 2];
            
            //convert to grayscale
            let grayscale = (pixelRed + pixelGreen + pixelBlue) / 3;

            //increase brightness by 20%
            grayscale *= 1.2;

            //ensures that values are within range
            grayscale = constrain(grayscale, 0, 255);

            //update pixel values
            greyImg.pixels[pixelIndex] = grayscale;
            greyImg.pixels[pixelIndex + 1] = grayscale;
            greyImg.pixels[pixelIndex + 2] = grayscale;
        }
    }

    greyImg.updatePixels();
    image(greyImg, greyImg.width + 40, 0);
}