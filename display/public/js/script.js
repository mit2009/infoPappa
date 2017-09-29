var readyToInit = false;
var photosList = [];
var photosshowPhotoList = [];
var quotesList = [];
var videosList = [];

const gallery_url = 'http://web.mit.edu/2.009/slideshow/images/';
// const gallery2_url = 'http://web.mit.edu/2.009/slideshow2/images/';

const colors = ["rgba(255, 0, 0, 0.7)",
                "rgba(58, 47, 204, 0.7)",
                "rgba(24, 160, 118, 0.7)",
                "rgba(103, 32, 206, 0.7)",
                "rgba(211, 182, 13, 0.7)",
                "rgba(229, 136, 0, 0.7)"]

const slideSpeed = 1500;
const pauseTime = 10000;

// quoteWeight = 1;
// instaWeight = 5;
// liveFeedWeight = 2;
// showPhotoWeight = 4;
// timeWeight = 2;
// videoWeight = 1; // 2;

quoteWeight = 1; // works 2017
instaWeight = 1; // works 2017
liveFeedWeight = 0;
showPhotoWeight = 1; // works 2017
timeWeight = 1; // works 2017
videoWeight = 0; // 2;

weightSum = quoteWeight + instaWeight + liveFeedWeight + showPhotoWeight + videoWeight + timeWeight;

var quoteProb = (quoteWeight / weightSum);
var instaProb = quoteProb + (instaWeight / weightSum);
var liveFeedProb = instaProb + (liveFeedWeight / weightSum);
var showPhotoProb = liveFeedProb + (showPhotoWeight / weightSum);
var timeProb = showPhotoProb + (timeWeight / weightSum);
var videoProb = timeProb + (videoWeight / weightSum);

var instaList = [];
var counter = 1;
var prevSlide = '';
var timeClosing;

function checkReload() {
  $.get('reload', function(data) {
    console.log('checking reload...', data)
    if (data != localStorage.getItem("reloadCheck")) {
      localStorage.setItem("reloadCheck", data)
      console.log('reloading...')
      location.reload();  
    }
  });
}

function moveSlide(id) {
  $('.container').animate({left: "-=100%"}, slideSpeed, function() {
    $('#' + (id-1)).remove();
    $(this).css("left", 0);
  });
}

function getRandomImage() {
  return photosList[Math.floor(Math.random()*photosList.length)]
}

function getRandomVideo() {
  return 'videos/' + videosList[Math.floor(Math.random()*videosList.length)]
}

function getRandomshowPhotoImage() {
  return photosshowPhotoList[Math.floor(Math.random()*photosshowPhotoList.length)]
}

function getRandomQuote() {
  return quotesList[Math.floor(Math.random()*quotesList.length)]
}

function getRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)]
}

function getRandomInsta() {
  return instaList[Math.floor(Math.random()*instaList.length)];
}

function formatQuote(handle, message) {
  return '<h1>'+handle+'</h1><h2>'+message+'</h2>'
}

function updateCountdownClock() {
  t = new Date();
  h = t.getHours();
  m = t.getMinutes();
  s = t.getSeconds();
  totalSeconds = m*60+s;
  secondsLeft = 60*60 - totalSeconds;
  mLeft = Math.floor(secondsLeft / 60);
  sLeft = secondsLeft % 60
  mLeft = Math.max(mLeft, 0)
  sLeft = Math.max(sLeft, 0)
  // overflow
  if (mLeft > 15) {
    clearInterval(timeClosing);
    $('.lab-closing').hide();
    $('.lab-closed').show();
  }
  if (sLeft < 10) {
    sLeft = '0' + sLeft;
  }
  $('.time-closing').text(mLeft+':'+sLeft);
}
function makeSlide() {

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // reminder to add 12 to hour

  console.log(h, m);

  // su = '';
  // if (h == 14) {
  //   if (m >= 50) {
  //     su = getSlideUpload(2)
  //   } else if (m >= 40) {
  //     su = getSlideUpload(1)
  //   }
  // } else if (h == 15) {
  //   if (m >= 50) {
  //     su = getSlideUpload(8)
  //   } else if (m >= 40) {
  //     su = getSlideUpload(7)
  //   } else if (m >= 30) {
  //     su = getSlideUpload(6)
  //   } else if (m >= 20) {
  //     su = getSlideUpload(5)
  //   } else if (m >= 10) {
  //     su = getSlideUpload(4)
  //   } else {
  //     su = getSlideUpload(3)
  //   }
  // } else if (h == 16) {
  //   if (m >= 50) {
  //     su = getSlideUpload(14)
  //   } else if (m >= 40) {
  //     su = getSlideUpload(13)
  //   } else if (m >= 30) {
  //     su = getSlideUpload(12)
  //   } else if (m >= 20) {
  //     su = getSlideUpload(11)
  //   } else if (m >= 10) {
  //     su = getSlideUpload(10)
  //   } else {
  //     su = getSlideUpload(9)
  //   }
  // } else if (h == 17) {
  //   if (m < 10) {
  //     su = getSlideUpload(15)
  //   } else if (m < 20) {
  //     su = getSlideUpload(16)
  //   }
  // }

  // if (su != '') {
  //   // $('.slide-upload').show();
  //   // $('.slide-upload').find('.lab-closed-msg').html('<span class="heading">SLIDE UPLOAD:</span> <br />' + su)
  // }
  
  if (m >= 45 && m < 60 && h == 16) {
    // lab is about to close
    $('.lab-closing').show();
    timeClosing = setInterval(updateCountdownClock, 200)
  } else if ((h >= 17 && h < 18) || h == 21) {
    clearInterval(timeClosing);
    $('.lab-closing').hide();
    $('.lab-closed').show();
  } else {
    $('.lab-closing').hide();
    $('.lab-closed').hide();
  }

  console.log("breakpoint")
  
  var $newSlide = $('<div id="'+counter+'" class="slide"></div>');
  // $newSlide.css('-webkit-filter', 'grayscale(1)')

  console.log("2")

  var nextSlide = '';
  while (nextSlide == '' || nextSlide == prevSlide) {
    var r = Math.random();
    if (r < quoteProb) {
      nextSlide = 'QUOTE';
    } else if (r < instaProb) {
      nextSlide = 'INSTA';
    } else if (r < liveFeedProb) {
      nextSlide = 'LIVEFEED';
    } else if (r < showPhotoProb) {
      nextSlide = 'SHOWPHOTO'
    } else if (r < timeProb) {
      nextSlide = 'TIME'
    } else if (r < videoProb) {
      nextSlide = 'VIDEO'
    } else {
      nextSlide = 'PHOTO';
    }
  }

  prevSlide = nextSlide;

  console.log("next slide will be", nextSlide);

  if (nextSlide == 'QUOTE') {
    // Generate a Random Quote

    var q = getRandomQuote();
    console.log(q);
    $quoteBox = $('<div class="quotebox" style="background-color: ' + getRandomColor() + ';"><div class="quotecenter">' + formatQuote(q.handle, q.message) + '</div></div>');
    $newSlide.append($quoteBox)
    $newSlide.css('background-image', 'url("' + getRandomImage() + '")');

  } else if (nextSlide == 'INSTA') {
    // Generate an Instagram Post

    var insta = getRandomInsta();
    var height = $(window).height();

    //$quoteBox = $('<div class="quotebox instagram"><div class="quotecenter">' + formatQuote('#009 Instagram', insta.instaCaption) + '</div></div>');
    // $newSlide.append($quoteBox)
    $instaImage = $('<div class="instaContainer"></div>')
    $instaImage.css('height', height)
      .css('width', height)
      .css('background-image', 'url("' + insta.display_src + '")');
    $newSlide.addClass('instaImage');
    $newSlide.append($instaImage);
    $newSlide.append('<div class="instaTextContainer">' + formatQuote('#009 Instagram', insta.caption) + '</div>');

  } else if (nextSlide == 'LIVEFEED') {
    var cameraIDList = ['Wu9P2I', 
    'as1hHV', 
    'Xr6ruW', 
    'MEKmB8'
    ];
    var cameraIndex = Math.floor(Math.random()*cameraIDList.length);
    var cameraID = cameraIDList[cameraIndex];
    $newSlide.append('<iframe style="top: -5%; left: -30%; position: relative;" type="text/html" frameborder="0" width="160%" height="110%" src="//video.nest.com/embedded/live/' + cameraID + '?autoplay=1" /></iframe>');
  } else if (nextSlide == 'SHOWPHOTO') {
    // Generate just a plain ol' photo
    $newSlide.css('background-image', 'url("' + getRandomshowPhotoImage() + '")');

  } else if (nextSlide == 'TIME') {
    // Generate the time
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var ampm = (h >= 12) ? "PM" : "AM";
    h = h%12;
    if (h == 0) {
      h = 12;
    }
    if (m < 10) {
      m = '0' + m;
    }
    // $quoteBox = $('<div class="quotebox"><div class="quotecenter time-display">' + h + ':' + m + ' ' + ampm + '</div></div>');



    $quoteBox = $('<div class="quotebox" style="background-color: ' + getRandomColor() + ';"><div class="quotecenter"><h3>' + h + ':' + m + ' ' + ampm + '</h3></div></div>');
   
    $newSlide.append($quoteBox)

  } else if (nextSlide == 'VIDEO') {
    // Generate the time

    $videoBox = $('<video autoplay><source src="' + getRandomVideo() + '" type="video/mp4"><source src="' + getRandomVideo() + '" type="video/mp4"></video>');
    $newSlide.append($videoBox)

  } else {
    // Generate just a plain ol' photo
    $newSlide.css('background-image', 'url("' + getRandomshowPhotoImage() + '")');
  }

  $('.container').append($newSlide)
}

function makeAndMoveSlides() {


  makeSlide();
  counter ++;
  console.log(slideSpeed);
  console.log(pauseTime);
  // if (counter < 3) { //debugging
    setTimeout(function() {
      checkReload();
      moveSlide(counter-1);
      setTimeout(function() {
        makeAndMoveSlides();
      }, (pauseTime + slideSpeed));
    }, pauseTime);
  // }
}

// Returns Slide Upload Cover
function getSlideUpload(i) {
  var sectionOrder = ['Red B', 'Blue B', 'Blue A', 'Pink A', 'Pink B', 'Yellow B', 'Red A', 'Silver A', 'Purple A', 'Orange B', 'Green A', 'Purple B', 'Green B', 'Yellow A', 'Orange A', 'Silver B'];
  return sectionOrder[(i-1)]
}

function init() {
  if (!readyToInit) {
    readyToInit = true;
    return;
  }

  // generate slide 1
  makeSlide();

  counter ++;
  console.log('making initial slide');

  // Set Hard Refresh after 5 minutes
  setTimeout(function() {
    location.reload(); 
  }, 300000);

  setTimeout(function() {
    makeAndMoveSlides();
  }, pauseTime);

}

//load all the instagram photos before grabbing anything else 
var instaGrabber = $.getJSON("insta.json", function(json) {
    instaList = instaList.concat(json); 
});

function photoProcessor(url, datalist, array) {
  for (var key in datalist) {
    if (datalist.hasOwnProperty(key) && key.toString() != "__comment") {
        for (var i = 0; i < datalist[key].length; i++) {
            var prefix = key;
            var suffix = "";
            if (key.indexOf("|") >= 0) {
              prefix = key.substring(0,key.indexOf("|"));
              suffix = "_" + key.substring(key.indexOf("|")+1);
            }
            array = array.concat(url + prefix + "m-" + datalist[key][i] + suffix + ".jpg"); 
        }
    }
  }
  return array;
}

var photosGrabber = $.getJSON("data.json", function(json) {
  photosList = photoProcessor(gallery_url, json[0], photosList);
  photosList.concat(photoProcessor(gallery_url, json[1], photosList));
  photosshowPhotoList = photoProcessor(gallery_url, json[2], photosshowPhotoList); // just a plain photo
  photosshowPhotoList.concat(photoProcessor(gallery_url, json[3], photosshowPhotoList)); // just a plain photo

  videosList = videosList.concat(json[4]["videos"]);
  quotesList = quotesList.concat(json[4]["quotes"]);
  console.log(quotesList);

});

instaGrabber.complete(init);
photosGrabber.complete(init);
