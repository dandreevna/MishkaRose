$(function () {

//стрелка вверх
  let $btn = $('.btnUp');
  let btnIsOpen = false;
  let timeout = 200;
  let timer;

  $(window).on('scroll', function(){
      clearInterval(timer);
      timer = setTimeout(onScroll, timeout);
  });

  function onScroll(){
    let pos = $(this).scrollTop();
    if(!btnIsOpen && pos > 200){
        $btn.stop(true).fadeIn(500);
        btnIsOpen = true;
    }
    else if(btnIsOpen && pos <= 200){
        btnIsOpen = false;
        $btn.stop(true).fadeOut(500);           
    }
}

  onScroll();

  $btn.on('click', function(){
      $('html,body').animate({
          scrollTop: 0
      }, 700);
  });

//Адаптивное меню

  $('#nav').on('click', function(){

      let $menu = $('.menu');

      $('.menu').slideToggle(300, function(){

          let $this=$(this);

          if ( $this.css('display')==='none' ){
              $this.removeAttr('style');
          }

      });//end slideToggle

       $('.menu li a').click(function(){
            $menu.slideUp(300, function(){

                if ( $menu.css('display')==='none' ){
                    $menu.removeAttr('style');
                }

            });//end slideUp        
        }); //end click 

       $('.logo').click(function(){
            $menu.slideUp(300, function(){

                if ( $menu.css('display')==='none' ){
                    $menu.removeAttr('style');
                }

            });//end slideUp        
        }); //end click 


  })//end on('click'...

//карусель

  $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        //nav:true,
        stagePadding: 0,
        center: false,
        mergeFit: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        },
    }).trigger('refresh.owl.carousel');

//Проверка
  let patterns = {
      required: /.+/,
      email: /.+@.+\..+/
  };

//Модальное окно
  
  let $modal_inputs = $('#modal_form .check');

  $("#btn_modal_form").click(function (e) {

    let err = false;

    for(let i = 0; i < $modal_inputs.length; i++){
      let val = $modal_inputs[i].value.trim();
      let validation = $modal_inputs[i].dataset.validation;
      let pattern = (validation in patterns) ? patterns[validation] : /.*/;

      if(pattern.test(val)){
        $modal_inputs[i].classList.remove('err');
      }
      else{
        err = true;
        $modal_inputs[i].classList.add('err');
      }
    }

    if(err){
      e.preventDefault();
    }else{
      sendAjaxForm('result_form', 'modal_form', '/php/mail.php');
      modal.style.display = "none";
      return false;
    }

  }); 

  var modal = document.getElementById('myModal');
  var span = document.getElementsByClassName("close")[0];
  $(".btn_modal").click(function () {
    modal.style.display = "block";
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

}); //end ready

function sendAjaxForm(result_form, ajax_form, url) {
  $.ajax({
    url: url,
    type: "POST",
    dataType: "html",
    data: $("#" + ajax_form).serialize(),
    success: function success(response) {
      var result = $.parseJSON(response);
      if (result.name!=0){
        alert(result.name + ', спасибо за Ваш интерес. В ближайшее время с Вами свяжутся.');
      }else{
         alert('Ошибка. Данные не отправлены');
      }   
    },
    error: function error(response) {
      alert('Ошибка. Данные не отправлены');
    }
  });
}