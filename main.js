img = "";
object = [];
status = "";

    function preload(){
        img = loadImage('ok.png');
    }

    function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,500);
    video.hide();
    Object_Detection = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("statuus").innerHTML = "status: Detecting Objects...";
    }

    function ModelLoaded(){
        console.log("Model is not Loaded");
        status = true;
        
    }
    
    function draw(){
        image(video,0,0,500,500);
        if(status != ""){
            Object_Detection.detect(video, GotResults);
            r = random(255);
            g = random(255);
            b = random(255);

            for(i = 0; i < object.length; i++){
        document.getElementById("statuus").innerHTML = "Object Detected";
        document.getElementById("No_of_obj").innerHTML = "No. of objects are ..." + object.length;
        fill(r,g,b);
        percent = floor(object[i].confidence * 100);
        text(object[i].label + " " + percent + "%",object[i].x + 15 , object[i].y +15) ;
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height) ;
            }
        }
    }

    function GotResults(error, results ){
        if(error){
            console.log(error);
            console.log("eeeeeeerrrrrrrrrrroooooorrrrrrr beeb beep beep");
        }
            console.log(results);
            object  = results;
    }