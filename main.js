object = [];
status = "";
song = "";

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(400, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoded() {
    status = true;
    console.log("Model Loaded ! ");
}

function draw() 
{
    image(video, 0, 0, 400, 380);
    if (status !="")
     {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i = 0; i < object.length; i++) 
        {
            document.getElementById("status").innerHTML = "Status : Object detected";
            if (object[i].label == "person")
            {
                fill(r, g, b);
                percent = floor(object[i].confidence * 100);
                text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
                noFill();
                stroke(r, g, b);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
                document.getElementById("number_of_objects").innerHTML = "Baby found";
                song.stop();
            }
            else (object.length == 0)
            {
                document.getElementById("number_of_objects").innerHTML = "Baby not found";
                song.play();
            }
        } 
    }

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}
function play()
{
	song.play();
	song.setVolume(5);
	song.rate(1);
}