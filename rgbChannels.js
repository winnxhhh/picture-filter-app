var rgbChannelImg;

function rgbChannels()
{
    var redImg = createImage(160, rgbChannelImg.height);
    redImg.loadPixels();

    var greenImg = createImage(160, rgbChannelImg.height);
    greenImg.loadPixels();

    var blueImg = createImage(160, rgbChannelImg.height);
    blueImg.loadPixels();
    
    //load image pixel values into array pixels
    rgbChannelImg.loadPixels();
    rgbChannelImg.resize(160, 120);
    
    for(var y = 0 ; y < rgbChannelImg.height ; y++)
    {
        for(var x = 0 ; x < rgbChannelImg.width ; x++)
        {  
            var pixelIndex = ((rgbChannelImg.width * y) + x) * 4;
            var pixelRed = rgbChannelImg.pixels[pixelIndex + 0];
            var pixelGreen = rgbChannelImg.pixels[pixelIndex + 1];
            var pixelBlue = rgbChannelImg.pixels[pixelIndex + 2];
            
            //red channel only
            redImg.pixels[pixelIndex + 0] = pixelRed;
            redImg.pixels[pixelIndex + 1] = 0;
            redImg.pixels[pixelIndex + 2] = 0;
            redImg.pixels[pixelIndex + 3] = 255;
            
            //green channel only
            greenImg.pixels[pixelIndex + 0] = 0;
            greenImg.pixels[pixelIndex + 1] = pixelGreen;
            greenImg.pixels[pixelIndex + 2] = 0;
            greenImg.pixels[pixelIndex + 3] = 255;
            
            //blue channel only
            blueImg.pixels[pixelIndex + 0] = 0;
            blueImg.pixels[pixelIndex + 1] = 0;
            blueImg.pixels[pixelIndex + 2] = pixelBlue;
            blueImg.pixels[pixelIndex + 3] = 255;
        }
    }
    
    redImg.updatePixels();
    greenImg.updatePixels();
    blueImg.updatePixels();
    
    image(redImg, 20, redImg.height - 260);
    image(greenImg, greenImg.width + 40, greenImg.height - 260);
    image(blueImg, blueImg.width * 2 + 60, blueImg.height - 260);
}