console.log('checkTemp js')

// This code will run as soon as the page loads
window.onload = function () {

const boolCheck = arg => {
	if (arg === true) {
		return true;
	} else if (arg === false) {
		return false;
	};
};

	const getserverSettings = () => {
		$.get("/settings", function (data) {
			$("#display").text(data.currentTemp);
			$(".onoffswitch-checkbox").prop('checked', data.setState);
			$('.range-slider__range').val(data.setTemp);
			$('.range-slider__value').html(data.setTemp);
			console.log(data);
		});
	}

	getserverSettings();

	setInterval(function () {
		getserverSettings();
	}, 5000);

	//Get request for when you cange on/off switch position
const handleSwitchState = (switchState) => {
	return             $.ajax({  
		url: '/onOff',  
		type: 'GET',  
		dataType: 'json', 
		data: { switchState: switchState},  
		success: function (data, textStatus, xhr) {  
			console.log(data);  
		},  
		error: function (xhr, textStatus, errorThrown) {  
			console.log('Error in Operation');  
		}  
	});
}

//Request for when you change tempurature
const handleTempChange = (temp) => {
	return             $.ajax({  
		url: '/setTemp',  
		type: 'GET',  
		dataType: 'json', 
		data: { temp: temp},  
		success: function (data, textStatus, xhr) {  
			console.log(data);  
		},  
		error: function (xhr, textStatus, errorThrown) {  
			console.log('Error in Operation');  
		}  
	});
}

// Check to see if switch was turned on or off
$('input[type=checkbox]').change(
    function(){
        if (this.checked) {
			// alert('ON!!!');
			handleSwitchState(true);
        } else {
			// alert('OFF')
			handleSwitchState(false);
		}
    });

//Reange Slider logic
var rangeSlider = function(){
  var slider = $('.range-slider'),
      range = $('.range-slider__range'),
      value = $('.range-slider__value');
    
  slider.each(function(){

    value.each(function(){
      var value = $(this).prev().attr('value');
      $(this).html(value);
    });

    range.on('input', function(){
			$(this).next(value).html(this.value);
			// console.log(this.value)
		});
		
		range.on('change', function(){
			console.log(this.value)
			handleTempChange(this.value)
    });
  });
};

rangeSlider();

};
