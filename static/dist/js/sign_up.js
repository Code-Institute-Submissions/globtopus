!function(t){var e={};function n(o){if(e[o])return e[o].exports;var a=e[o]={i:o,l:!1,exports:{}};return t[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(o,a,function(e){return t[e]}.bind(null,a));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){n(1),n(2),t.exports=n(3)},function(t,e){!function(){var t=L.map("map_sign_up").setView([23.757195,-17.226563],1);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:9,attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox/streets-v11"}).addTo(t);var e=L.popup({className:"popup_class"});t.on("click",(function(n){var o=n.latlng.toString().replace("LatLng(","").replace(")","").replace(" ","").split(",");e.setLatLng(n.latlng).setContent(` <i class = "fas fa-map-marker-alt" >  ${o[0]} , ${o[1]}\n\t\t\t\t\t              <br><button type="submit" id="get_address"\n\t\t\t\t\t\t\t\t\t\tclass="bg-warning  btn btn-sm p-0 float-right ___"\n\t\t\t\t\t\t\t\t\t\tdata-title="click to get location details"\n\t\t\t\t\t\t\t\t\t\tdata-text="get details"\n\t\t\t\t\t\t\t\t\t\tdata-cy="get_details">get details</button>`).openOn(t);var a=`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${o[0]}&lon=${o[1]}`;$("#get_address").removeClass("d-none").on("click",(function(){return function(t){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===this.readyState&&200===this.status&&($("#get_address").addClass("d-none"),function(t){if(void 0===t)$("#location_n").text("Please try again!Could not get your location.").addClass("text-danger");else{$("#country").val(t.country);var e=void 0!==t.state?t.state:void 0!==t.county?t.county:"";$("#county").val(e),$("#country_code").val(t.country_code),$("#location_n").text(t.country+" - "+e).removeClass("text-danger")}}(JSON.parse(this.responseText).address),swal.close())},e.open("GET",t),e.send(),e.onerror=function(){swal.fire({html:'<h4>Server error!</h4>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr class="bg-danger">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<code>net::ERR_CONNECTION_TIMED_OUT</code>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<hr class="bg-danger">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p>Please try again later!</p>',showConfirmButton:!0,confirmButtonColor:"#0fbeba",confirmButtonText:'<i class="fas fa-check-circle"></i>'})}}(a),$("#location_n").get(0).scrollIntoView(),!1}))}))}()},function(t,e){$("#feeling").on("change",(function(){var t=this.value;$("#feeling_holder").val(t),t>51?($("#this_or_better").removeClass("d-none"),$("#better").addClass("d-none")):($("#this_or_better").addClass("d-none"),$("#better").removeClass("d-none"))}))},function(t,e){$(".form_label").on("focus",(function(){var t=$(this).attr("id"),e=$(this).prop("placeholder");if($(this).data("label"))var n=t+"_label";else n=t;""!==e&&0===$("label[for='"+t+"']").text().length&&(sessionStorage.setItem(t,e),console.log("WE HAVE PLACEHOLDER : "+e),$(this).prop("placeholder",""),$("#"+n).before(` <label for=${t} ><small>${e}</small></label>`))})).on("input",(function(){var t=$(this).attr("id"),e=$("#"+t),n=$("label[for='"+t+"']");""===e.val()?(e.prop("placeholder",sessionStorage.getItem(t)),n.html("")):1===e.val().length&&n.html(`<small>${sessionStorage.getItem(t)}</small>`)}))}]);