var HSBfilter;
var hsbFilterSelect = false;

function hsbFilterSetup()
{
    var scaleFactor = 1.2;
    detector = new objectdetect.detector(HSBfilter.width, HSBfilter.height, scaleFactor, classifier);
}

function hsbColourFilter()
{
    //to ensure that only hsb filter is shown when it is selected
    if(hsbFilterSelect == false)
    {
        return false;
    }
    else if(hsbFilterSelect == true)
    {
        console.log("hsb filter is running");

        faces = detector.detect(HSBfilter.canvas);
    
        HSBfilter.loadPixels();
    
        //ensures the hsb is only in the part where the face is detected
        for (var i = 0 ; i < faces.length ; i++)
        {
            var face = faces[i];
            if (face[4] > 4)
            {
                processHSB(int(face[0]), int(face[1]), int(face[2]), int(face[3]));
            }
        }
    
        HSBfilter.updatePixels();
        image(HSBfilter, 20, 600, 160, 120); 
    }
}

//function to generate the hsb filter
function processHSB(startX, startY, dWidth, dHeight)
{
    for(var y = startY ; y < startY + dHeight ; y++)
    {
        for(var x = startX ; x < startX + dWidth ; x++)
        {
            var pixelIndex = ((HSBfilter.width * y) + x) * 4;
            var pixelRed = HSBfilter.pixels[pixelIndex + 0];
            var pixelGreen = HSBfilter.pixels[pixelIndex + 1];
            var pixelBlue = HSBfilter.pixels[pixelIndex + 2];

            var hsb = rgbToHsb(pixelRed,pixelGreen,pixelBlue);

            HSBfilter.pixels[pixelIndex+0] = hsb[0] * 1.5; 
            HSBfilter.pixels[pixelIndex+1] = hsb[1] * 1.5;
            HSBfilter.pixels[pixelIndex+2] = hsb[2] * 2;
            HSBfilter.pixels[pixelIndex+3] = 255;
        }
    }
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