var HSBimg;

function hsbChannel()
{
    var hsbImg = createImage(HSBimg.width, HSBimg.height);
    hsbImg.loadPixels();

    //load image pixel values into array pixels
    HSBimg.loadPixels();

    for(var y = 0 ; y < HSBimg.height ; y++)
    {
        for(var x = 0 ; x < HSBimg.width ; x++)
        {

            var pixelIndex = ((HSBimg.width * y) + x) * 4;
            var pixelRed = HSBimg.pixels[pixelIndex + 0];
            var pixelGreen = HSBimg.pixels[pixelIndex + 1];
            var pixelBlue = HSBimg.pixels[pixelIndex + 2];

            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue)

            //display hue as red, saturation as green, brightness as blue
            hsbImg.pixels[pixelIndex+0] = hsb[0] * 1.5; 
            hsbImg.pixels[pixelIndex+1] = hsb[1] * 1.5;
            hsbImg.pixels[pixelIndex+2] = hsb[2] * 2;
            hsbImg.pixels[pixelIndex+3] = 255;
        }
    }

    hsbImg.updatePixels();
    image(hsbImg, hsbImg.width - 330, hsbImg.width - 70, 160, 120);
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