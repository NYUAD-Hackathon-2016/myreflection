/**
 * Theme: Minton Admin Template
 * Author: Coderthemes
 * Module/App: Flot-Chart
 */

! function($) {
	"use strict";

	var FlotChart = function() {
		this.$body = $("body")
		this.$realData = []
	};

	//creates plot graph
	FlotChart.prototype.createPlotGraph = function(selector, data1, data2, labels, colors, borderColor, bgColor) {
		//shows tooltip
		function showTooltip(x, y, contents) {
			$('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css({
				position : 'absolute',
				top : y + 5,
				left : x + 5
			}).appendTo("body").fadeIn(200);
		}


		$.plot($(selector), [{
			data : data1,
			label : labels[0],
			color : colors[0]
		}, {
			data : data2,
			label : labels[1],
			color : colors[1]
		}], {
			series : {
				lines : {
					show : true,
					fill : true,
					lineWidth : 1,
					fillColor : {
						colors : [{
							opacity : 0.5
						}, {
							opacity : 0.5
						}]
					}
				},
				points : {
					show : true
				},
				shadowSize : 0
			},

			grid : {
				hoverable : true,
				clickable : true,
				borderColor : borderColor,
				tickColor : "#f9f9f9",
				borderWidth : 1,
				labelMargin : 10,
				backgroundColor : bgColor
			},
			legend : {
				position : "ne",
				margin : [0, -24],
				noColumns : 0,
				labelBoxBorderColor : null,
				labelFormatter : function(label, series) {
					// just add some space to labes
					return '' + label + '&nbsp;&nbsp;';
				},
				width : 30,
				height : 2
			},
			yaxis : {
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			xaxis : {
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			tooltip : true,
			tooltipOpts : {
				content : '%s: Value of %x is %y',
				shifts : {
					x : -60,
					y : 25
				},
				defaultTheme : false
			}
		});
	},
	//end plot graph

	//creates Pie Chart
	FlotChart.prototype.createPieGraph = function(selector, labels, datas, colors) {
		var data = [{
			label : labels[0],
			data : datas[0]
		}, {
			label : labels[1],
			data : datas[1]
		}, {
			label : labels[2],
			data : datas[2]
		}];
		var options = {
			series : {
				pie : {
					show : true
				}
			},
			legend : {
				show : false
			},
			grid : {
				hoverable : true,
				clickable : true
			},
			colors : colors,
			tooltip : true,
			tooltipOpts : {
				content : "%s, %p.0%"
			}
		};

		$.plot($(selector), data, options);
	},

	//returns some random data
	FlotChart.prototype.randomData = function() {
		var totalPoints = 300;
		if (this.$realData.length > 0)
			this.$realData = this.$realData.slice(1);

		// Do a random walk
		while (this.$realData.length < totalPoints) {

			var prev = this.$realData.length > 0 ? this.$realData[this.$realData.length - 1] : 50,
			    y = prev + Math.random() * 10 - 5;

			if (y < 0) {
				y = 0;
			} else if (y > 100) {
				y = 100;
			}

			this.$realData.push(y);
		}

		// Zip the generated y values with the x values
		var res = [];
		for (var i = 0; i < this.$realData.length; ++i) {
			res.push([i, this.$realData[i]])
		}

		return res;
	}, FlotChart.prototype.createRealTimeGraph = function(selector, data, colors) {
		var plot = $.plot(selector, [data], {
			colors : colors,
			series : {
				grow : {
					active : false
				}, //disable auto grow
				shadowSize : 0, // drawing is faster without shadows
				lines : {
					show : true,
					fill : true,
					lineWidth : 2,
					steps : false
				}
			},
			grid : {
				show : true,
				aboveData : false,
				color : '#dcdcdc',
				labelMargin : 15,
				axisMargin : 0,
				borderWidth : 0,
				borderColor : null,
				minBorderMargin : 5,
				clickable : true,
				hoverable : true,
				autoHighlight : false,
				mouseActiveRadius : 20
			},
			tooltip : true, //activate tooltip
			tooltipOpts : {
				content : "Value is : %y.0" + "%",
				shifts : {
					x : -30,
					y : -50
				}
			},
			yaxis : {
				min : 0,
				max : 100,
				color : 'rgba(0,0,0,0.1)'
			},
			xaxis : {
				show : false
			}
		});

		return plot;
	},
	//creates Pie Chart
	FlotChart.prototype.createDonutGraph = function(selector, labels, datas, colors) {
		var data = [{
			label : labels[0],
			data : datas[0]
		}, {
			label : labels[1],
			data : datas[1]
		}, {
			label : labels[2],
			data : datas[2]
		}, {
			label : labels[3],
			data : datas[3]
		}];
		var options = {
			series : {
				pie : {
					show : true,
					innerRadius : 0.5
				}
			},
			legend : {
				show : true,
				labelFormatter : function(label, series) {
					return '<div style="font-size:14px;">&nbsp;' + label + '</div>'
				},
				labelBoxBorderColor : null,
				margin : 50,
				width : 20,
				padding : 1
			},
			grid : {
				hoverable : true,
				clickable : true
			},
			colors : colors,
			tooltip : true,
			tooltipOpts : {
				content : "%s, %p.0%"
			}
		};

		$.plot($(selector), data, options);
	},
	//creates Combine Chart
	FlotChart.prototype.createCombineGraph = function(selector, ticks, labels, datas) {

		var data = [{
			label : labels[0],
			data : datas[0],
			lines : {
				show : true,
				fill : true
			},
			points : {
				show : true
			}
		}, {
			label : labels[1],
			data : datas[1],
			lines : {
				show : true
			},
			points : {
				show : true
			}
		}, {
			label : labels[2],
			data : datas[2],
			bars : {
				show : true
			}
		}];
		var options = {
			series : {
				shadowSize : 0
			},
			grid : {
				hoverable : true,
				clickable : true,
				tickColor : "#f9f9f9",
				borderWidth : 1,
				borderColor : "#eeeeee"
			},
			colors : ["#3bafda", "#f76397", "#34d3eb"],
			tooltip : true,
			tooltipOpts : {
				defaultTheme : false
			},
			legend : {
				position : "ne",
				margin : [0, -24],
				noColumns : 0,
				labelBoxBorderColor : null,
				labelFormatter : function(label, series) {
					// just add some space to labes
					return '' + label + '&nbsp;&nbsp;';
				},
				width : 30,
				height : 2
			},
			yaxis : {
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			xaxis : {
				ticks: ticks,
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			}
		};

		$.plot($(selector), data, options);
	},

	//initializing various charts and components
	FlotChart.prototype.init = function() {
		//plot graph data
		var uploads = [[0, 9], [1, 8], [2, 5], [3, 8], [4, 5], [5, 14], [6, 10]];
		var downloads = [[0, 5], [1, 12], [2, 4], [3, 3], [4, 12], [5, 11], [6, 14]];
		var plabels = ["Positif", "Negative"];
		var pcolors = ['#3bafda', '#CF4647'];
		var borderColor = '#f5f5f5';
		var bgColor = '#fff';
		this.createPlotGraph("#website-stats", uploads, downloads, plabels, pcolors, borderColor, bgColor);

		//Pie graph data
		var pielabels = ["Positive", "Negative", "Neutral"];
		var datas = [20, 30, 15];
		var colors = ["#3bafda", "#CF4647", "#CACACA"];
		this.createPieGraph("#pie-chart #pie-chart-container", pielabels, datas, colors);
	},

	//init flotchart
	$.FlotChart = new FlotChart, $.FlotChart.Constructor =
	FlotChart

}(window.jQuery),

//initializing flotchart
function($) {
	"use strict";
	$.FlotChart.init()
}(window.jQuery);

$(document).ready(function() {

	

	//------------- Ordered bars chart -------------//
	$(function() {
		//some data
		var d1 = [];
		for (var i = 0; i <= 10; i += 1)
			d1.push([i, parseInt(Math.random() * 30)]);

		var d2 = [];
		for (var i = 0; i <= 10; i += 1)
			d2.push([i, parseInt(Math.random() * 30)]);

		var d3 = [];
		for (var i = 0; i <= 10; i += 1)
			d3.push([i, parseInt(Math.random() * 30)]);

		var ds = new Array();

		ds.push({
			label : "Data One",
			data : d1,
			bars : {
				order : 1
			}
		});
		ds.push({
			label : "Data Two",
			data : d2,
			bars : {
				order : 2
			}
		});
		ds.push({
			label : "Data Three",
			data : d3,
			bars : {
				order : 3
			}
		});

		var stack = 0,
		    bars = false,
		    lines = false,
		    steps = false;

		var options = {
			bars : {
				show : true,
				barWidth : 0.2,
				fill : 1
			},
			grid : {
				show : true,
				aboveData : false,
				labelMargin : 5,
				axisMargin : 0,
				borderWidth : 1,
				minBorderMargin : 5,
				clickable : true,
				hoverable : true,
				autoHighlight : false,
				mouseActiveRadius : 20,
				borderColor : '#f5f5f5'
			},
			series : {
				stack : stack
			},
			legend : {
				position : "ne",
				margin : [0, -24],
				noColumns : 0,
				labelBoxBorderColor : null,
				labelFormatter : function(label, series) {
					// just add some space to labes
					return '' + label + '&nbsp;&nbsp;';
				},
				width : 30,
				height : 2
			},
			yaxis : {
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			xaxis : {
				tickColor : '#f5f5f5',
				font : {
					color : '#bdbdbd'
				}
			},
			colors : ["#3bafda", "#26c6da", "#80deea"],
			tooltip : true, //activate tooltip
			tooltipOpts : {
				content : "%s : %y.0",
				shifts : {
					x : -30,
					y : -50
				}
			}
		};

		$.plot($("#ordered-bars-chart"), ds, options);
	});
});

