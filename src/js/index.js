   new Swiper('.banner');
   new BScroll('.section');

   function ajax(url, callback) {
       var xml = new XMLHttpRequest();
       xml.open('get', url, true);
       xml.onload = function(res) {
           if (res.target.status === 200 || res.target.status === 304) {
               callback && callback(res.target.response);
           }
       }
       xml.send();
   }
   var cont = document.querySelector('.cont');
   ajax('/api/ajax', function(data) {
       var data = JSON.parse(data);
       var html = '';
       data.data.map(function(file) {
           html += `
                        <dl>
                            <dd>
                                <h1>${file.title}</h1>
                                <p>${file.cont}</p>
                            </dd>
                            <dt>
                                <img src="images/${file.img}" alt="">
                            </dt>
                        </dl>
                    `
       })
       cont.innerHTML = html;

   })