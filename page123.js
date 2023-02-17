(function () {
  var msg = ".,?!:;";
  var size = 40;

  var circleY = 2;
  var circleX = 2;

  var letter_spacing = 5.1;

  var diameter = 10;

  var rotation = 0.2;

  var speed = 0.3;

  if (
    (!window.addEventListener && !window.attachEvent) ||
    !document.createElement
  )
    return;

  msg = msg.split("");
  var n = msg.length - 1,
    a = Math.round(size * diameter * 0.208333),
    currStep = 20,
    ymouse = a * circleY + 20,
    xmouse = a * circleX + 20,
    y = [],
    x = [],
    Y = [],
    X = [],
    o = document.createElement("div"),
    oi = document.createElement("div"),
    b =
      document.compatMode && document.compatMode != "BackCompat"
        ? document.documentElement
        : document.body,
    mouse = function (e) {
      e = e || window.event;
      ymouse = !isNaN(e.pageY) ? e.pageY : e.clientY; // y-position
      xmouse = !isNaN(e.pageX) ? e.pageX : e.clientX; // x-position
    },
    makecircle = function () {
      // rotation/positioning
      if (init.nopy) {
        o.style.top = (b || document.body).scrollTop + "px";
        o.style.left = (b || document.body).scrollLeft + "px";
      }
      currStep -= rotation;
      for (var d, i = n; i > -1; --i) {
        // makes the circle
        d = document.getElementById("iemsg" + i).style;
        d.top =
          Math.round(
            y[i] + a * Math.sin((currStep + i) / letter_spacing) * circleY - 15
          ) + "px";
        d.left =
          Math.round(
            x[i] + a * Math.cos((currStep + i) / letter_spacing) * circleX
          ) + "px";
      }
    },
    drag = function () {
      // makes the resistance
      y[0] = Y[0] += (ymouse - Y[0]) * speed;
      x[0] = X[0] += (xmouse - 20 - X[0]) * speed;
      for (var i = n; i > 0; --i) {
        y[i] = Y[i] += (y[i - 1] - Y[i]) * speed;
        x[i] = X[i] += (x[i - 1] - X[i]) * speed;
      }
      makecircle();
    },
    init = function () {
      // appends message divs, & sets initial values for positioning arrays
      if (!isNaN(window.pageYOffset)) {
        ymouse += window.pageYOffset;
        xmouse += window.pageXOffset;
      } else init.nopy = true;
      for (var d, i = n; i > -1; --i) {
        d = document.createElement("div");
        d.id = "iemsg" + i;
        d.style.height = d.style.width = a + "px";
        d.appendChild(document.createTextNode(msg[i]));
        oi.appendChild(d);
        y[i] = x[i] = Y[i] = X[i] = 0;
      }
      o.appendChild(oi);
      document.body.appendChild(o);
      setInterval(drag, 25);
    },
    ascroll = function () {
      ymouse += window.pageYOffset;
      xmouse += window.pageXOffset;
      window.removeEventListener("scroll", ascroll, false);
    };

  o.id = "outerCircleText";
  o.style.fontSize = size + "px";

  if (window.addEventListener) {
    window.addEventListener("load", init, false);
    document.addEventListener("mouseover", mouse, false);
    document.addEventListener("mousemove", mouse, false);
    if (/Apple/.test(navigator.vendor))
      window.addEventListener("scroll", ascroll, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", init);
    document.attachEvent("onmousemove", mouse);
  }
})();

// page 2 //

// page 3//
$(document).ready(function(){

  animateDiv();
  animateDivTwo();
  animateDivThree();
  animateDivFour();

  setInterval(function(){
      var $motion = $('.motion');
      var $designer = $('.designer');
      var $ha= $('.ha');
      var $haa= $('.haa');
      var isOverlap = overlaps($motion[0], $designer[0], $ha[0], $haa[0]);
      if(isOverlap){

          $motion.stop(true);
          $designer.stop(true);
          $ha.stop(true);
          $haa.stop(true);
          
          $motion.animate({ top: $motion.offset().top - 20, left: $motion.offset().left - 20 }, 100, function(){
            animateDiv();        
          });
          $designer.animate({ top: $designer.offset().top + 20, left: $designer.offset().left + 20 }, 100, function(){
            animateDivTwo();        
          });
          $ha.animate({ top: $designer.offset().top + 20, left: $designer.offset().left + 20 }, 100, function(){
            animateDivThree();
          });
          $haa.animate({ top: $designer.offset().top + 20, left: $designer.offset().left + 20 }, 100, function(){
            animateDivFour();
      });
    }
  }, 100);

});

// $(document).ready(function(){

//   animateDiv();
//   animateDivTwo();

//   setInterval(function(){
//       var $motion = $('.motion');
//       var $designer = $('.designer');
//       var isOverlap = overlaps($motion[0], $designer[0]);
//       if(isOverlap){

//           $motion.stop(true);
//           $designer.stop(true);
          
//           $motion.animate({ top: $motion.offset().top - 20, left: $motion.offset().left - 20 }, 100, function(){
//             animateDiv();        
//           });

//           $designer.animate({ top: $designer.offset().top + 20, left: $designer.offset().left + 20 }, 100, function(){
//             animateDivTwo();        
//           });
//       }
//   }, 100);

// });


function overlaps(a, b, c, d) {
const rect1 = a.getBoundingClientRect();
const rect2 = b.getBoundingClientRect();
const rect3 = c.getBoundingClientRect();
const rect4 = d.getBoundingClientRect();
const isInHoriztonalBounds =
  rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
const isInVerticalBounds =
  rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
return isOverlapping;
}


// MOTION 
function makeNewPosition(){

  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height() - 100;
  var w = $(window).width() - 100;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh,nw];    

}

function animateDiv(){
  var newq = makeNewPosition();
  var oldq = $('.motion').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);


  $('.motion').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDiv();        
  });

};

function animateDivTwo(){
  var newq = makeNewPosition();
  var oldq = $('.designer').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $('.designer').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDivTwo(this);        
  });

};

function animateDivThree(){
  var newq = makeNewPosition();
  var oldq = $('.ha').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $('.ha').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDivThree();        
  });

};

function animateDivFour(){
  var newq = makeNewPosition();
  var oldq = $('.haa').offset();
  var speed = calcSpeed([oldq.top, oldq.left], newq);

  $('.haa').animate({ top: newq[0], left: newq[1] }, speed, function(){
    animateDivThree();        
  });

};

function calcSpeed(prev, next) {

  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.1;

  var speed = Math.ceil(greatest/speedModifier);

  return speed; }