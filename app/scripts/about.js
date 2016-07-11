$('.about').find('a').on('click', function(e){
  if($(this).hasClass('active')){
    return;
  }else{
    var name = $(this).prop("name");
    var targetName = name + "-div";
    $('.about').find('a').removeClass("active");
    $(this).addClass("active");
    $('.tab-content').prop("hidden", true);
    $('#' + targetName).prop("hidden", false);
  }
});