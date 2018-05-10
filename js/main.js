window.onload=function() {
	var a = document.getElementById("svgObject");
	var svgDoc = a.contentDocument;
	setTimeout(init(svgDoc), 2000);
	};

function init(svgDoc){
	dochange();
	window.addEventListener('orientationchange', dochange)

	var switcher = true

	function zoomOutMobile() {
	var viewport = document.querySelector('meta[name="viewport"]');

	if ( viewport ) {
	viewport.content = "initial-scale=0.1";
	viewport.content = "width=1400";
	}
	}
	function dochange() {

		zoomOutMobile();
		if (window.orientation == 0){
			svgDoc.getElementById('svg').setAttribute('viewBox', "0 0 1000 1400");
			svgDoc.getElementById('wrapper').setAttribute('transform' ,"rotate(94) translate(0,-900)");
		}
		if (window.orientation == 90){
			svgDoc.getElementById('svg').setAttribute('viewBox', "0 0 1400 1000");
			svgDoc.getElementById('wrapper').setAttribute('transform' ,"");
		}

	}

	var svg = d3.select(svgDoc).select('svg');
	var circles = svg.selectAll('circle')
					.on('click', circleClick);

	pulse();
	function pulse(){
		if (switcher==true){
			circles
				.transition().duration(500)
				.attr('r', 15)
				.transition().duration(500)
				.attr('r', 10)
				.on('end', pulse);
		}
	}

	function modalReset(){
		console.log('reset');
			svg.on('click', '');
			svg.select('#modal').remove();
			switcher = true;
			pulse();
	}

	function circleClick() {
		switcher = false;
		var gModal = svg.append('g')
		.attr('id', 'modal')

		setTimeout(function(){svg.on('click', modalReset)}, 10);


		var clickX = this.getAttribute('cx')
		var clickY = this.getAttribute('cy')
		var x = 450;
		var y = 120;

		var rectModal = gModal.append('rect')
			.attr('x', clickX)
			.attr('y', clickY)
			.attr('height', 0)
			.attr('width', 0)
			.attr('fill', 'yellow');


		rectModal.transition().duration(2000)
			.attr('x', x)
			.attr('y', y)
			.attr('height', 500)
			.attr('width', 500)
			.on('end', function(){
				foModal.transition().duration(500).style('opacity', 1);
			})


		var foModal = gModal.append('foreignObject')
			.style('opacity', 0)
			.style('text-align', 'center')
			.style('vertical-align', 'middle')
			.attr('x', x)
			.attr('y', y)
			.attr('height', 500)
			.attr('width', 500)
			.html('       <style>\
          div{ display: table; font-size: 20px; width: 500px; height: 300px; font-family:Futura-Bold}\
          p ,span  { display: table-cell; text-align: center; vertical-align: middle; color:black; padding:15px }\
       </style>\
       <body xmlns="http://www.w3.org/1999/xhtml">\
       <span style="font-size:30px;cursor:pointer;">X</span>\
           <div>\
              <p id="text">'+this.getAttribute('data-message')+'</p>\
           </div>\
       </body>');

	}
}