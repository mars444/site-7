$(function () {


  var header = $('.header'),
    scrollPrev = 0;

  $(window).scroll(function () {
    var scrolled = $(window).scrollTop();

    if (scrolled > 70 && scrolled > scrollPrev) {
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
  const productsBtn = document.querySelectorAll('.cart__btn');
  const cartProductsList = document.querySelector('.cart-content__list');
  const cart = document.querySelector('.cart');
  const cartQuantity = document.querySelector('.cart__quantity');
  const fullPrice = document.querySelector('.fullprice');
  let price = 0;
   

 

  const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const priceWithoutspaces = (str) => {
    return str.replace(/\s/g, '');
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  }

  const pluseFullPrice = (currentPrice) => {
    return price += currentPrice;
  };

  const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} Р`;
  };

  const printQuantity = () => {
    const cartProductsListtt = document.querySelectorAll('.cart-content__list li').length;
    cartQuantity.textContent = cartProductsListtt;
    cartProductsListtt > 0 ? cart.classList.add('cart-active') : cart.classList.remove('cart-active');

    
   
  }

printQuantity();


  const generateCartProduct = (img, title, price, id) => {
    return `
   <li class="cart-content__item">
   <article class="cart-content__product cart-product" data-id="${id}">
     <img src="${img}" class="cart-product-img">
       <div class="cart-product__text">
         <h3 class="cart-product__title">
           ${title}
         </h3>
         <span class="cart-product__price">${normalPrice(price)} Р</span>
       </div>
       <button class="cart-product__delete far fa-trash-alt" aria-label="Удалить товар">
        
       </button>
    </article>
     </li>
       `
      ;
  }

 


  const deleteProducts = (productParent) => {
    console.log(productParent);
    //get the id
    let id = productParent.querySelector('.cart-product').dataset.id;
    console.log(id);

    //disable false

    document.querySelector(`.shop__right__tab-item[data-id="${id}"]`).querySelector('.cart__btn').disabled = false;


    //minus price
    let currentPrice = parseInt(priceWithoutspaces(productParent.querySelector('.cart-product__price').textContent));
    minusFullPrice(currentPrice);

    //print full price
    printFullPrice();
    //remove productParent
    productParent.remove();
    // count and print quantity
    printQuantity();

    if(cartQuantity.textContent == "0"){
      $(".cart__quantity").removeClass('cart__quantity-active');
      setInterval($(".cart-empty").removeClass('cart-empty-active'), 1000);
      
    }

  }

  productsBtn.forEach(el => {
    el.closest('.shop__right__tab-item').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {

      let self = e.currentTarget;
      let parent = self.closest('.shop__right__tab-item');
      let id = parent.dataset.id;
      let img = parent.querySelector('.product-img img').getAttribute('src');
      let title = parent.querySelector('.product-text').textContent;
      let priceNumber = parseInt(priceWithoutspaces(parent.querySelector('.product-price').textContent));

      $(".cart__quantity").addClass('cart__quantity-active');
      $(".cart-empty").addClass('cart-empty-active');

      //summ
      pluseFullPrice(priceNumber);
      console.log(price);
      //ptint full price
      printFullPrice();
      //add to cart
      cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));


      //printt quantity
      printQuantity();
      //disable btn
      self.disabled = true;

    });

  });


  cartProductsList.addEventListener('click', (e) => {

    if(e.target.classList.contains('cart-product__delete')){
      deleteProducts(e.target.closest('.cart-content__item'));
    
    }
    


  });
 
  


});
