// 左侧导航栏点击事件
$('.join_us ul li a').on('click', function(e){
  if($(this).hasClass('active')){
    return;
  }else{
    let name = $(this).prop("name");
    let targetName = name + "-div";
    $('.join_us').find('a').removeClass("active");
    $(this).addClass("active");
    $('.tab-content').prop("hidden", true);
    $('#' + targetName).prop("hidden", false);
  }
});

// 人才招聘toggle按钮事件
$('.join_us .toggle-icon a').on('click', function(){
  $(this).parents(".job-title").next().slideToggle();
});