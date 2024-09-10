//function to control key interactions
function filterKeys(keycode)
{
    if(keycode == 48)
    {
        console.log("0 key");
        filterGray = false;
        hsbFilterSelect = false;
        faceDetect = true;
        blurFilterSelected = false;
        pixelFilterSelected = false;
        beatFilterSelected = false;
        sound.stop();
    }

    if(keycode == 49)
    {
        console.log("1 key");
        filterGray = true;
        hsbFilterSelect = false;
        faceDetect = false;
        blurFilterSelected = false;
        pixelFilterSelected = false;
        beatFilterSelected = false;
        sound.stop();
    }

    if(keycode == 50)
    {
        console.log("2 key");
        filterGray = false;
        hsbFilterSelect = false;
        faceDetect = false;
        blurFilterSelected = true;
        pixelFilterSelected = false;
        beatFilterSelected = false;
        sound.stop();
    }

    if(keycode == 51)
    {
        console.log("3 key");
        hsbFilterSelect = true;
        filterGray = false;
        faceDetect = false;
        blurFilterSelected = false;
        pixelFilterSelected = false;
        beatFilterSelected = false;
        sound.stop();
    }

    if(keycode == 52)
    {
        console.log("4 key");
        hsbFilterSelect = false;
        filterGray = false;
        faceDetect = false;
        blurFilterSelected = false;
        pixelFilterSelected = true;
        beatFilterSelected = false;
        sound.stop();
    }

    if(keycode == 53 && sound.isPlaying())
    {
        sound.stop();
		console.log('sound off');
        hsbFilterSelect = false;
        filterGray = false;
        faceDetect = false;
        blurFilterSelected = false;
        pixelFilterSelected = false;
        beatFilterSelected = false;
    }
    else if(keycode == 53 && !sound.isPlaying())
    {
        sound.loop();
		console.log('sound on');
        hsbFilterSelect = false;
        filterGray = false;
        faceDetect = false;
        blurFilterSelected = false;
        pixelFilterSelected = false;
        beatFilterSelected = true;
    }

}

