/* Swiper Slider */ 

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 3,
  loop: true,
  centeredSlides: true,
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});

/* Related Products */ 
loadRelatedProducts();

function loadRelatedProducts() {

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'relatedProducts.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      let example = JSON.parse(this.responseText);

      let html = "";
      example.forEach(examp => {
        html += `
        <div id="widget" class="p-0">
          <div class="card p-0">
              <img id="card-img-top" width='100'; src="${examp.img}" alt="">
              <div class="card-body">
                <div class="rating">
                    <i class="fas fa-star"> ${examp.rating}</i><small> (${examp.comment} Yorum)</small>
                </div>
                <div class="product-id">
                    <small>${examp.code}</small>
                </div>
                <div class="card-title">
                ${examp.title}
                </div>
                <div class="product-price">
                ₺ ${examp.price}
                </div>
                <div class="cargo">
                    Bugün Kargoda
                </div>
              </div>
              <div class="btn-group">
                <button type="button" class="exchange"><i class="fas fa-exchange-alt"></i></button>
                <button type="button" class="add-shopping-card">Sepete Ekle</button>
            </div>            
          </div>  
        </div>
          `
      });
      document.querySelector('#products-list').innerHTML = html;
    }
  }
  xhr.send();
}

/* Best Sellers*/ 

loadBestSellers();

function loadBestSellers() {

  const xhr = new XMLHttpRequest();

  xhr.open('GET', 'bestSeller.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      let bestSel = JSON.parse(this.responseText);

      let html = "";
      bestSel.forEach(bestSels => {
        html += `
        <li class="item-a p-0">
                    <div class="card p-0">
                        <img id="card-img-top" width='100' ; src="${bestSels.img}" alt="">
                        <div class="card-body">
                            <div class="rating">
                                <i class="fas fa-star"> ${bestSels.rating}</i><small> (${bestSels.comment} Yorum)</small>
                            </div>
                            <div class="product-id">
                                <small>${bestSels.code}</small>
                            </div>
                            <div class="card-title">
                                ${bestSels.title}
                            </div>
                            <div class="product-price">
                            ₺ ${bestSels.price}
                            </div>
                            <div class="cargo">
                                Bugün Kargoda
                            </div>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="exchange"><i class="fas fa-exchange-alt"></i></button>
                            <button type="button" class="add-shopping-card">Sepete Ekle</button>
                        </div>
                    </div>
                </li>
          `
      });
      document.querySelector('#slide').innerHTML = html;
    }
  }
  xhr.send();
}

/* Add to Cart */

var counter = 0;

$(document).ready(function () {

  $('.add-shopping-card').click(function () {
    counter++;

    var buttonCount = setTimeout(function () {
      $('.cart').attr('data-count', counter);
    }, 10);

    var removeClass = setTimeout(function () {
      $('.cart').removeClass('added');
    }, 500);

  });
});

/* Best Sellers Slider */

productScroll();

function productScroll() {
  let slider = document.getElementById("slider");
  let next = document.getElementsByClassName("pro-next");
  let prev = document.getElementsByClassName("pro-prev");
  let slide = document.getElementsByClassName("slide");
  let item = document.getElementById("slide");

  for (let i = 0; i < next.length; i++) {
    //refer elements by class name

    let position = 0; //slider postion

    prev[i].addEventListener("click", function () {
      //click previos button
      if (position > 0) {
        //avoid slide left beyond the first item
        position -= 1;
        translateX(position); //translate items
      }
    });

    next[i].addEventListener("click", function () {
      if (position >= 0 && position < hiddenItems()) {
        //avoid slide right beyond the last item
        position += 1;
        translateX(position); //translate items
      }
    });
  }

  function hiddenItems() {
    //get hidden items
    let items = getCount(item, false);
    let visibleItems = slider.offsetWidth / 210;
    return items - Math.ceil(visibleItems);
  }
}

function translateX(position) {
  //translate items
  slide.style.left = position * -228 + "px";
}

function getCount(parent, getChildrensChildren) {
  //count no of items
  let relevantChildren = 0;
  let children = parent.childNodes.length;
  for (let i = 0; i < children; i++) {
    if (parent.childNodes[i].nodeType != 3) {
      if (getChildrensChildren)
        relevantChildren += getCount(parent.childNodes[i], true);
      relevantChildren++;
    }
  }
  return relevantChildren;
}


