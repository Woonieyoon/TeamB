(function(global, doc){
	
	/**
	 * window.onload
	 */
	$(function(){
		
		/*
		 * search-image-span hidden event
		 * */
		$('#searchBox').on('propertychange change keyup paste input', function() {
		    var searchValue = $(this).val();
		    if(searchValue != "") {
		    	$('#search-image-span').css({'visibility':'hidden'});
		    	return;
		    }
		    $('#search-image-span').css({'visibility':'visible'});
		});
		
	});
	
}(window, document))