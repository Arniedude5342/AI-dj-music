song1 = "";
song2 = "";
song1_status = "";
song1_status = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = "+ scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX +"leftWristY = "+ leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY)
    }
    
}

function modelLoaded() {
    console.log('PoseNet is Intitialized');
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song1.isPlaying();
    
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreleftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            ducument.getElementById("song").innerHTML = "Playing Peter Pan Song";
        }
    }
    
    
}

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function play() {
    song.play();
}
