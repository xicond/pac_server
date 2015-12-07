'use strict';
$(function () {
    var videoElement = document.querySelector('video');

    function start() {
        if (window.stream) {
            videoElement.src = null;
            window.stream.stop();
        }
//        var videoSource = videoSelect.value;
        var constraints = {
            video: true/*{
                optional: [{
                    sourceId: videoSource
                }]
            }*/
        };
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

        navigator.getUserMedia(constraints,
            function (stream) {//successCallback
                window.stream = stream; // make stream available to console
                videoElement.src = window.URL.createObjectURL(stream);
                videoElement.play();

                videoElement.addEventListener('playing', function() {
                	var video = $('video').outerWidth();

                    var container = $('div.video').outerWidth();

                    $('.video').css('background','#202020');
//                    if (this.videoWidth === 0) {
//                        console.error('videoWidth is 0. Camera not connected?');
                	//                    }
	                console.log(container + '-' + video + '/2=');
                    var size = Math.floor((container-video)/2);
                    $('video').css('margin-left',size+'px');
                    console.log(size);
                }, false);

            }, function (error) { //errorCallback
                console.log('navigator.getUserMedia error: ', error);
            });
    }

    start();
	
    function add_donation(name, nominal, $container, currency) {
    	$last_child = $container.find('div.row:last-child');

	    if ($last_child.length) {
		    if ($last_child.hasClass('odd'))
		    	var $class = 'even';
		    else {
			    var $class = 'odd';
		    }

	    } else var $class = 'odd';

	    $el = $('<div class="row '+$class+'"/>').append($('<div class="col-md-6 name left"/>').text(name))
			.append($('<div class="col-md-6 value right"/>').text(number_format(nominal,currency)));
	    $container.append($el);
	    
    	//add total
	    $total_container = $('#total');
	    var total = parseInt($total_container.data('total') || 0) + parseInt(nominal);
	    $total_container.text(number_format(total, currency));
	    $total_container.data('total', total);
	    

	    $bar_height = $el.outerHeight()+2;//obtaining bar height
	    
		// save number of arrived element
	    var fixed_el = parseInt($container.data('fixed_el')||0);
	    $el.css('margin-top', (700 - fixed_el * $bar_height) + 'px');
	    
	    $el.animate({ 'margin-top': 0 }, function () {
	    	var fixed_el = parseInt($container.data('fixed_el') || 0)+1;
	    	$container.data('fixed_el', fixed_el);
		    
	    	if (fixed_el * ($bar_height-2) > $container.outerHeight())
	    	$container.animate({ 'margin-top': '-'+$bar_height+'px' },function()
		    {
		    	var fixed_el = parseInt($container.data('fixed_el')||0)-1;
		    	$(this).data('fixed_el', fixed_el);
		    	$(this).find('div.row:first-child').remove();
			    $(this).css('margin-top', 0);
		    });

			
		});
		

		//return speed int
	}
	
    setTimeout(function () {
	    return;
		$.ajax({
			type: "POST",
			contentType: "application/json; charset=utf-8",
			url: "edmx.asmx/get_data",
			data: "{'from_ids':'" + JsonString + "'}",
			dataType: "json",
			success: function (msg) {
				var data = msg.hasOwnProperty("d") ? msg.d : msg;
				if (Array.isArray(data) && data.length) {
					for (var row in data) {
						try {
							var nama = (row.namamandarin || rowIndex.nama);
							if (nama != undefined && row.nominal != undefined && nama != null && parseInt(row.nominal) > 0) {
								add_donation(name, nominal, $('#data_container'));
								sleep(200);
							}
						}catch (err)
						{
						}
					}
					

				}
				
				// call next setTimeout
			},
			error: function (xhr, status, error) {
				console.log(xhr.statusText);
				// call next setTimeout
			}
		});
	}, 200);

});



function number_format(num, currency) {
	currency = currency || 'idr';
	if (currency.toLowerCase() == 'rp') currency = 'idr';

	return new Intl.NumberFormat('id', { style: 'currency', currency: currency }).format(num).replace(/([^0-9,.]*)([0-9,.]+)/g, '$1 $2');
}

var $total_container = $('#total');
var total = parseInt($total_container.data('total') || 0);
$total_container.text(number_format(total));


function requestFullScreen(element) {
    // Supports most browsers and their versions.
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
$(document).bind('dblclick', function(){
    var elem = document.body; // Make the body go full screen.
    requestFullScreen(elem);
});
