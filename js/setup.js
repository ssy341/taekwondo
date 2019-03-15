//照片分享插件 https://www.flickr.com/
$(document).ready(function(){

	$('#basicuse').jflickrfeed({
		limit: 9,
		qstrings: {
			id: '37344888@N08'
		},
		itemTemplate: '<li><a href="http://www.flickr.com/photos/37344888@N08"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	});
	
	$('#sidebarflickr').jflickrfeed({
		limit: 9,
		qstrings: {
			id: '123439868@N03'
		},
		itemTemplate: '<li><a href="http://www.flickr.com/photos/123439868@N03"><img src="{{image_s}}" alt="{{title}}" /></a></li>'
	});

});