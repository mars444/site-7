$(function(){
    
    $('.zay__slider-inner').slick({
      nextArrow: '<button type="button" class="slick_button slick-next fa fa-chevron-right"></button>' ,
      prevArrow: '<button type="button" class="slick_button slick-prev  fa fa-chevron-left"></button>' ,
      dots:true,
    
      });

   
      var acc = document.getElementsByClassName("categories-type-link");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("categories-type-link-active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


$('.brands__slider').slick({
   nextArrow: '<button type="button" class="slick_button slick-next fa fa-chevron-right"></button>' ,
   prevArrow: '<button type="button" class="slick_button slick-prev  fa fa-chevron-left"></button>' ,
   slidesToShow:4,
   autoplay:true,
   autoplaySpeed:2000,
 
   });

});
