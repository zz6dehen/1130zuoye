$(function() {
    var wrapper = document.querySelector('.swiper-wrapper')

    $.ajax({
        url: '/dis',
        success: function(res) {
            var data = JSON.parse(res)
            var html = ''
            if (data.code === 1) {
                data.list.forEach(function(file) {
                    console.log(file)
                    html += `<div class="swiper-slide">`
                    file.item.forEach(function(di) {
                        html += `<dl>
                            <dt><img src=${di.img} alt=""></dt>
                            <dd>${di.name}</dd>
                            </dl>`
                    })

                    html += `</div>`
                })
                wrapper.innerHTML = html
                new Swiper('.swiper-container', {
                    pagination: {
                        el: ".swiper-pagination"
                    }
                });
            }
        }
    })

    function a(data) {

    }

})