(function () {
$('#map').on('click',function () {
      /*HIDE ANY PREVIOUSLY OPEN DIVS ( CHARTS, MAPS)*/
        $('.landing_interaction').addClass('d-none')
        /*DIV F0R DISPLAYING CHARTS*/
        $('#map_search').removeClass('d-none')
})
})()
var paths = $('path')
$.each(paths, function (key, value) {

      if($(this).attr('id') === 'sk')
      {
           $(this).attr('fill','#992341');
      };
});
// paths.hover(function () {
//     $(this).attr('fill','#123456')
//     console.log($(this).data('cc'),$(this).data('cn'),$(this).data('cn2'))
// })


paths.hover(
  function() {
      /*mouse enter*/
    $(this).attr('fill','#1ebecc');

     console.log($(this).attr('id'),$(this).data('cn'))
      if($(this).data('cn2'))console.log($(this).data('cn2'))
  }, function() {
      /*mouse leave*/
     $(this).attr('fill','#99FF00');

  }
);

$("svg").svgPanZoom({
   events: {

  // enables mouse wheel zooming events
  mouseWheel: true,

  // enables double-click to zoom-in events
  doubleClick: true,

  // enables drag and drop to move the SVG events
  drag: true,

  // cursor to use while dragging the SVG
  dragCursor: "move"
},

// time in milliseconds to use as default for animations.
// Set 0 to remove the animation
animationTime: 300,

// how much to zoom-in or zoom-out
zoomFactor: 0.25,

// maximum zoom in, must be a number bigger than 1
maxZoom: 3,

// how much to move the viewBox when calling .panDirection() methods
panFactor: 10,

// the initial viewBox, if null or undefined will try to use the viewBox set in the svg tag.
// Also accepts string in the format "X Y Width Height"
// initialViewBox: {
//
//   // the top-left corner X coordinate
//   x: 0,
//
//   // the top-left corner Y coordinate
//   y: 0,
//
//   // the width of the viewBox
//   width: 1600,
//
//   // the height of the viewBox
//   height: 600,
// },

// the limits in which the image can be moved.
// If null or undefined will use the initialViewBox plus 15% in each direction
// limits: {
//   x: -150,
//   y: -150,
//   x2: 1150,
//   y2: 1150,
// }
});


