$('.join_us').find('a').on('click', function(e){
	if($(this).hasClass('active')){
		return;
	}else{
		let name = $(this).prop("name");
		let targetName = name + "-div";
		$('.about').find('a').removeClass("active");
		$(this).addClass("active");
		$('.tab-content').prop("hidden", true);
		$('#' + targetName).prop("hidden", false);
	}
});