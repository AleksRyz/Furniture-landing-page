// формирование карточек товара. и интеграция в верстку

export function loadProucts(data) {

   const productsItems = document.querySelector('.products__items');

   data.products.forEach(item => {
      const productId = item.id;
      const productUrl = item.url;
      const productImage = item.image;
      const productTitle = item.title;
      const productText = item.text;
      const productPrice = item.price;
      const productOldPrice = item.priceOld;
      const productShareUrl = item.shareUrl;
      const productLikeUrl = item.likeUrl;
      const productLabels = item.labels;

      //====================шаблон карточки товара==============================

      let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
      let productTemplateEnd = `</article>`;

      let productTemplateLabels = '';
      if (productLabels) {
         let productTemplateLabelsStart = `<div class="item-product__labels">`;
         let productTemplateLabelsEnd = `</div>`;
         let productTemplateLabelsContent = '';

         productLabels.forEach(labelItem => {
            productTemplateLabelsContent += `<div class="item-product__label product-${labelItem.type}">${labelItem.value}</div>`;
         });

         productTemplateLabels += productTemplateLabelsStart;
         productTemplateLabels += productTemplateLabelsContent;
         productTemplateLabels += productTemplateLabelsEnd;
      }

      let productTemplateImage = `
   <div class="item-product__image ibg" style="background-image: url('img/products/${productImage}');">
      <img src="img/products/${productImage}" alt="${productTitle}">
   </div>
`;

      let productTemplateBodyStart = `<div class="item-product__body">`;
      let productTemplateBodyEnd = `</div>`;

      let productTemplateContent = `
   <div class="item-product__content">
      <h3 class="item-product__title">${productTitle}</h3>
      <p class="item-product__text">${productText}</p>
   </div>
`;

      let productTemplatePrices = '';
      let productTemplatePricesStart = `<div class="item-product__prices">`;
      let productTemplatePricesCurrent = `<div class="item-product__price">${productPrice}</div>`;
      let productTemplatePricesOld = `<div class="item-product__price old-price">${productOldPrice}</div>`;
      let productTemplatePricesEnd = `</div>`;

      productTemplatePrices = productTemplatePricesStart;
      productTemplatePrices += productTemplatePricesCurrent;
      if (productOldPrice) {
         productTemplatePrices += productTemplatePricesOld;
      }
      productTemplatePrices += productTemplatePricesEnd;

      let productTemplateActions = `
   <div class="item-product__actions actions-product">
      <div class="actions-product__body">
         <a href="" class="actions-product__button btn btn__white">Add to cart</a>
         <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
         <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
      </div>
   </div>
`;

      let productTemplateBody = '';
      productTemplateBody += productTemplateBodyStart;
      productTemplateBody += productTemplateContent;
      productTemplateBody += productTemplatePrices;
      productTemplateBody += productTemplateActions;
      productTemplateBody += productTemplateBodyEnd;

      let productTemplate = '';
      productTemplate += productTemplateStart;
      productTemplate += productTemplateLabels;
      productTemplate += productTemplateImage;
      productTemplate += productTemplateBody;
      productTemplate += productTemplateEnd;

      productsItems.insertAdjacentHTML('beforeend',productTemplate);

      //====================/шаблон карточки товара==============================
   });
}