// "use strict";
$(function() {
    var c = document.querySelector(".swiper-wrapper");
    $.ajax({
        url: "/dis",
        success: function(n) {
            var i = JSON.parse(n),
                e = "";
            1 === i.code && (i.list.forEach(function(n) { console.log(n), e += '<div class="swiper-slide">', n.item.forEach(function(n) { e += "<dl>\n                            <dt><img src=".concat(n.img, ' alt=""></dt>\n                            <dd>').concat(n.name, "</dd>\n                            </dl>") }), e += "</div>" }), c.innerHTML = e, new Swiper(".swiper-container", { pagination: { el: ".swiper-pagination" } }))
        }
    })
});