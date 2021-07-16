$(function () {


  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();

    if (scrolled > 100 && scrolled > scrollPrev) {
      header.addClass('out');
    } else {
      header.removeClass('out');
    }
    scrollPrev = scrolled;
  });



  $('.zay__slider-inner').slick({
    nextArrow: '<button type="button" class="slick_button slick-next fa fa-chevron-right"></button>',
    prevArrow: '<button type="button" class="slick_button slick-prev  fa fa-chevron-left"></button>',
    dots: true,

  });


  var acc = document.getElementsByClassName("categories-type-link");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
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
    nextArrow: '<button type="button" class="slick_button slick-next fa fa-chevron-right"></button>',
    prevArrow: '<button type="button" class="slick_button slick-prev  fa fa-chevron-left"></button>',
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,


  });

  $('.zayproduct__small__slider').slick({
    nextArrow: '<button type="button" class="slick_button slick-next fa fa-chevron-right"></button>',
    prevArrow: '<button type="button" class="slick_button slick-prev  fa fa-chevron-left"></button>',
    slidesToShow: 3,
    asNavFor: ".zayproduct__big__slider",
    arrows: false,
    focusOnSelect: true,


  });

  $('.zayproduct__big__slider').slick({
    arrows: false,
    asNavFor: ".zayproduct__small__slider",
    fade: true,


  });


  $(".menu-icon").click(function (e) {
    $(".menu").addClass('menu-active');
    $(".menu-icon").addClass('menu-icon-active');
    $("body").addClass('lock');
    $(".menu-icon-close").addClass('menu-icon-close-active');

  })

  $(".menu-icon-close").click(function (e) {
    $(".menu").removeClass('menu-active');
    $(".menu-icon").removeClass('menu-icon-active');
    $("body").removeClass('lock');
    $(".menu-icon-close").removeClass('menu-icon-close-active');
  })





  $(".header__bot-search-link").click(function () {

    $(".header__bot-search").toggleClass("header__bot-search-active");

  });




//cart
const priductsBtn = document.querySelectorAll('')



  
});
