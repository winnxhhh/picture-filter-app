var amplitude;
var levelHistory = [];
var beatsFilter;
var beatFilterSelected = false;

function beatFilterSetup()
{
    //create an amplitude object and set its input to the sound
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
}

function beatFilterDraw()
{
    //to ensure that only beat filter is shown when it is selected
    if(beatFilterSelected == false)
    {
        return false;
    }
    else if(beatFilterSelected == true)
    {
        console.log("beatFilter is running")
    
        //get the amplitude level
        var level = amplitude.getLevel() * 400;

        //update the beat filter based on the amplitude level
        beatBasedRGBChannel(level);

        console.log(level);
    }
}

function beatBasedRGBChannel(level) 
{
    var redBeat = createImage(160, beatsFilter.height);
    redBeat.loadPixels();

    var greenBeat = createImage(160, beatsFilter.height);
    greenBeat.loadPixels();

    var blueBeat = createImage(160, beatsFilter.height);
    blueBeat.loadPixels();

    beatsFilter.loadPixels();
    beatsFilter.resize(160, 120)

    var threshold = map(level, 0, 400, 0, 255);

    for(var y = 0 ; y < beatsFilter.height ; y++)
    {
        for(var x = 0 ; x < beatsFilter.width ; x++)
        {  
            var pixelIndex = ((beatsFilter.width * y) + x) * 4;
            var pixelRed = beatsFilter.pixels[pixelIndex + 0];
            var pixelGreen = beatsFilter.pixels[pixelIndex + 1];
            var pixelBlue = beatsFilter.pixels[pixelIndex + 2];

            if ((pixelRed || pixelGreen || pixelBlue) > threshold) 
            {
                //red channel only
                redBeat.pixels[pixelIndex + 0] = pixelRed;
                redBeat.pixels[pixelIndex + 1] = 0;
                redBeat.pixels[pixelIndex + 2] = 0;
                redBeat.pixels[pixelIndex + 3] = random(0, level * 220);

                //green channel only
                greenBeat.pixels[pixelIndex + 0] = 0;
                greenBeat.pixels[pixelIndex + 1] = pixelGreen;
                greenBeat.pixels[pixelIndex + 2] = 0;
                greenBeat.pixels[pixelIndex + 3] = random(0, level * 40);


                //blue channel only
                blueBeat.pixels[pixelIndex + 0] = 0;
                blueBeat.pixels[pixelIndex + 1] = 0;
                blueBeat.pixels[pixelIndex + 2] = pixelBlue;
                blueBeat.pixels[pixelIndex + 3] = random(0, level * 20);
            }
        }
    }

    redBeat.updatePixels();
    greenBeat.updatePixels();
    blueBeat.updatePixels();
    image(redBeat, 20, 600);
    image(greenBeat, 20, 600);
    image(blueBeat, 20, 600);
}