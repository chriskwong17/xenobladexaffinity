var canvas;
var context;

var baseImage;
var portraitImages = [];

var customImage1Flag = false;
var customImage2Flag = false;
var customImage1 = '';
var customImage2 = '';

var dirportrait = 'img/portrait/';
var dirnpc = 'img/portrait/npcs/';

initBaseImage();
initPortraitImages();    
$(window).on('load', function(){
    initCanvas();
    generateImage();
    
    var dwn = document.getElementById('downloadBtn');
    dwn.onclick = function(){
        download(canvas, 'affinity.png');
      }
    
});

$(document).ready(function(){
    $('input[type=file]').on('change', function() {
        var file = this.files[0];
        if ( file ){
            setBase64(this.id, file);
        }
        else {
            unsetBase64(this.id);
        }
    });
    
});

function initCanvas(){
    canvas = document.getElementById('affinityCanvas');
    context = canvas.getContext('2d');
}

function initBaseImage(){
    baseImage = new Image();
    var src = 'img/affinity.png';
    baseImage.onload = function(){
        //console.log("base image loaded");
    }
    baseImage.src = src;
}

function initPortraitImages(){
  var portraitSources = [
    dirportrait + 'elma.png',
    dirportrait + 'lin.png',
    dirportrait + 'alexa.png',
    dirportrait + 'boze.png',
    dirportrait + 'celica.png',
    dirportrait + 'doug.png',
    dirportrait + 'frye.png',
    dirportrait + 'gwin.png',
    dirportrait + 'hb.png',
    dirportrait + 'hope.png',
    dirportrait + 'irina.png',
    dirportrait + 'l.png',
    dirportrait + 'lao.png',
    dirportrait + 'mia.png',
    dirportrait + 'murderess.png',
    dirportrait + 'nagi.png',
    dirportrait + 'phog.png',
    dirportrait + 'yelv.png',
    dirportrait + 'tfelma.png',
    dirnpc + 'ada.png',
    dirnpc + 'eleonora.png',
    dirnpc + 'maurice.png',
    dirnpc + 'rock.png',
    dirnpc + 'tatsu.png',
    dirnpc + 'vandham.png',
    dirportrait + 'default.png'
    
  ];
  for(var i = 0; i < portraitSources.length; i++){
      var src = portraitSources[i];
      var img = new Image();
      img.onload = function(){
          //console.log("images loaded");
      }
      img.src = src;
      img.crossorigin="anonymous";
      portraitImages.push(img);
  }
}

    
function setBase64(fileFlag, file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        if ( fileFlag === 'firstPortraitUpload' ){
            customImage1 = reader.result;
        }
        else {
            customImage2 = reader.result;
        }
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
}

function unsetBase64(fileFlag) {
    if ( fileFlag === 'firstPortraitUpload' ){
        customImage1 = '';
    }
    else {
        customImage2 = '';
    }
}

function download(canvas, filename) {
  var lnk = document.createElement('a'), e;
  lnk.download = filename;
  lnk.href = canvas.toDataURL("image/png;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}


function generateImage(){
    var select1 = $('#portrait1Select').val();
    var select2 = $('#portrait2Select').val();
    var name1 = $('#portrait1Name').val();
    var name2 = $('#portrait2Name').val();
    var relationship1 = $('#relationship1Text').val();
    var relationship2 = $('#relationship2Text').val();
    generate(select1, select2, name1, name2, relationship1, relationship2);
}

function generate(select1, select2, name1, name2, relationship1, relationship2){
    context.drawImage(baseImage,0,0);
    
    var font = $('#fontOption').val();
    //Text Type
    context.font = "12px " + font;
    context.fillStyle = "#AEFAF8";
    context.textAlign = "center";

    //Portraits
    if ( select1 === 'custom' ){
        if ( customImage1 !== '' ){
            var image = new Image();
            image.onload = function() {
              context.drawImage(image, 53, 110, 54, 54);
            };
            image.src = customImage1;
        }
        else {
            context.drawImage(portraitImages[portraitImages.length-1],53, 110, 54, 54);
        }
    }
    else {
        var index1 = parseInt(select1, 10);
        context.drawImage(portraitImages[index1],53, 110, 54, 54);
    }
    if ( select2 === 'custom' ){
        if ( customImage2 !== '' ){
            var image1 = new Image();
            image1.onload = function() {
              context.drawImage(image1, 333, 110, 54, 54);
            };
            image1.src = customImage2;
        }
        else {
            context.drawImage(portraitImages[portraitImages.length-1],333, 110, 54, 54);
        }
    }
    else {
        var index2 = parseInt(select2, 10);
        context.drawImage(portraitImages[index2],333, 110, 54, 54);
    }
    
    //Relationship Text
    context.fillText(relationship1,220,54);
    context.fillText(relationship2,220,213);
    
    //Names
    context.textAlign = "left";
    context.fillText(name1,50,92);
    
    context.textAlign = "right";
    context.fillText(name2,390,183); 
    
    context.font = "12px " + "futuremedium";
    context.textAlign = "right";
    context.fillText("image generated from: https://chriskwong17.github.io/xenobladexaffinity/",430,280); 
}




