var rgbThresholdImg;
var redSlider;
var greenSlider;
var blueSlider;

//sets up the sliders for the rgb filters
function rgbThresholdSetup()
{
    redSlider = createSlider(0, 256, 125);
    redSlider.parent("redSlider");

    greenSlider = createSlider(0, 256, 125);
    greenSlider.parent("greenSlider");

    blueSlider = createSlider(0, 256, 125);
    blueSlider.parent("blueSlider");
}

function rgbThresholdDraw()
{
    if(!imageLoaded)
    return;

    var redImg = createImage(160, rgbThresholdImg.height);
    redImg.loadPixels();

    var greenImg = createImage(160, rgbThresholdImg.height);
    greenImg.loadPixels();

    var blueImg = createImage(160, rgbThresholdImg.height);
    blueImg.loadPixels();


    for(var y = 0 ; y < rgbThresholdImg.height ; y++)
    {
        for(var x = 0 ; x < rgbThresholdImg.width ; x++)
        {
            var pixelIndex = ((rgbThresholdImg.width * y) + x) * 4;
            var pixelRed = rgbThresholdImg.pixels[pixelIndex + 0];
            var pixelGreen = rgbThresholdImg.pixels[pixelIndex + 1];
            var pixelBlue = rgbThresholdImg.pixels[pixelIndex + 2];
            
            //red channel
            if(redSlider.value() > pixelRed)
            {
                pixelRed = 0;
            }

            redImg.pixels[pixelIndex + 0] = pixelRed;
            redImg.pixels[pixelIndex + 1] = 0;
            redImg.pixels[pixelIndex + 2] = 0;
            redImg.pixels[pixelIndex + 3] = 255;
            
            //green channel
            if(greenSlider.value() > pixelGreen)
            {
                pixelGreen = 0;
            }

            greenImg.pixels[pixelIndex + 0] = 0;
            greenImg.pixels[pixelIndex + 1] = pixelGreen;
            greenImg.pixels[pixelIndex + 2] = 0;
            greenImg.pixels[pixelIndex + 3] = 255;
            
            //blue channel
            if(blueSlider.value() > pixelBlue)
            {
                pixelBlue = 0;
            }

            blueImg.pixels[pixelIndex + 0] = 0;
            blueImg.pixels[pixelIndex + 1] = 0;
            blueImg.pixels[pixelIndex + 2] = pixelBlue;
            blueImg.pixels[pixelIndex + 3] = 255;
        }
    }
    
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();

    image(redImg, 20, redImg.height + 155);
    image(greenImg, greenImg.width + 40, greenImg.height + 155);
    image(blueImg, blueImg.width * 2 + 60, blueImg.height + 155);
}
