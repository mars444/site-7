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
    
    //get the id
    let id = productParent.querySelector('.cart-product').dataset.id;
   

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

    if (cartQuantity.textContent == "0") {
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
      let title = parent.querySelector('.product-name').textContent;
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

    if (e.target.classList.contains('cart-product__delete')) {
      deleteProducts(e.target.closest('.cart-content__item'));

    }



  });



  //likes
  const likesBtn = document.querySelectorAll('.likes__btn');
  const likesQuantity = document.querySelector('.likes__quantity');
  const likes = document.querySelector('.likes');
  const likesProductsList = document.querySelector('.likes-content__list');
  const likesQuantityty = document.querySelector('.likes__quantity');
  const likesPrice = document.querySelector('.product-price').textContent;

  const printQuantityLikes = () => {
    const likesProductsListtt = document.querySelectorAll('.likes-content__list li').length;
    likesQuantityty.textContent = likesProductsListtt;
    console.log(likesQuantityty);
    likesProductsListtt > 0 ? likes.classList.add('likes-active') : likes.classList.remove('likes-active');
  }



  const deleteProductsLikes = (productParent) => {
    //get the id
    let idLike = productParent.querySelector('.likes-product').dataset.id;

    //disable false

    document.querySelector(`.shop__right__tab-item[data-id="${idLike}"]`).querySelector('.likes__btn').disabled = false;



    //remove productParent
    productParent.remove();
    // count and print quantity
    printQuantityLikes();

    if (likesQuantity.textContent == "0") {
      $(".likes__quantity").removeClass('likes__quantity-active');


    }

  }


  likesBtn.forEach(el => {
    el.closest('.shop__right__tab-item').setAttribute('data-id', randomId());
    el.addEventListener('click', (e) => {

      let self = e.currentTarget;
      let parent = self.closest('.shop__right__tab-item');
      let id = parent.dataset.id;
      let img = parent.querySelector('.product-img img').getAttribute('src');
      let title = parent.querySelector('.product-name').textContent;
      let priceNumber = parent.querySelector('.product-price').textContent;

      $(".likes__quantity").addClass('likes__quantity-active');

      const generateLikesProduct = (img, title, price, id) => {
        return `
      <li class="likes-content__item">
      <article class="likes-content__product likes-product" data-id="${id}" >
        <img src="${img}" class="likes-product-img">
          <div class="likes-product__text">
            <h3 class="likes-product__title">
            ${title}
            </h3>
            <span class="likes-product__price">${priceNumber}</span>
          </div>
          <button class="likes-product__delete far fa-trash-alt" aria-label="Удалить товар">
          </button>
       </article>
        </li>
         `
          ;
      }

      //add to cart
      likesProductsList.insertAdjacentHTML('afterbegin', generateLikesProduct(img, title, priceNumber, id));


      //printt quantity
      printQuantityLikes();
      //disable btn
      self.disabled = true;

    });

  });

  likesProductsList.addEventListener('click', (e) => {

    if (e.target.classList.contains('likes-product__delete')) {
      deleteProductsLikes(e.target.closest('.likes-content__item'));

    }
  });



});
