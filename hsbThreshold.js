var hsbThresholdImg;
var hsbSlider;

//sets up the slider for the hsb filter
function hsbThresholdSetup()
{
    hsbSlider = createSlider(-20, 70, 25);
    hsbSlider.parent("hsbSlider");
}

function hsbThresholdDraw()
{
    if(!imageLoaded)
    return;

    var hsbImg = createImage(HSBimg.width, HSBimg.height);
    hsbImg.loadPixels();

    for(var y = 0 ; y < hsbThresholdImg.height ; y++)
    {
        for(var x = 0 ; x < hsbThresholdImg.width ; x++)
        {
            var pixelIndex = ((hsbThresholdImg.width * y) + x) * 4;
            var pixelRed = hsbThresholdImg.pixels[pixelIndex + 0];
            var pixelGreen = hsbThresholdImg.pixels[pixelIndex + 1];
            var pixelBlue = hsbThresholdImg.pixels[pixelIndex + 2];
            
            //display hue as red, saturation as green, brightness as blue
            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue)

            //checks if the hue is greater than the slider value
            if (hsbSlider.value() < hsb[0] && hsbSlider.value() < hsb[1] && hsbSlider.value() < hsb[2]) 
            {
                //if yes, set the pixels to show original image
                hsbImg.pixels[pixelIndex + 0] = pixelRed;
                hsbImg.pixels[pixelIndex + 1] = pixelGreen;
                hsbImg.pixels[pixelIndex + 2] = pixelBlue;
            } 
            else 
            {
                //if no, set the pixel to hsb
                hsbImg.pixels[pixelIndex + 0] = hsb[0] * 1.5;
                hsbImg.pixels[pixelIndex + 1] = hsb[1] * 1.5;
                hsbImg.pixels[pixelIndex + 2] = hsb[2] * 2; 
            }

            //sets the alpha value
            hsbImg.pixels[pixelIndex + 3] = 255;
        }
    }

    hsbImg.updatePixels();
    image(hsbImg, hsbImg.width - 330, hsbImg.width + 70, 160, 120);
}

//function to convert rgb values to hsb values
function rgbToHsb(r, g, b) 
{
    //uses the color() function to create a color object
    var rgbColor = color(r, g, b);

    //extract HSB values from the color object
    var h = hue(rgbColor);
    var s = saturation(rgbColor);
    var br = brightness(rgbColor);

    //return the HSB values as an array
    return [h, s, br];
}