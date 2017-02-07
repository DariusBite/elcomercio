/*
 * Ordenador de serie
 * Por Mario Albán
 */

//Inicialisamos JQuery cuando el documento este cargado.
jQuery(document).ready(function($) {

  $('input').on('keyup', function(event) {

    //Borramos los resultados anteriores
    $('.num').remove();

    //capturamos los números y los guardamos en un arreglo
    var nums = $('input').val().split(" ");

    //Borramos los números repetidos
    nums = $.unique(nums);

    //Llamamos a una funcion para crear DIVS
    return createDivs(nums);

  });

  //Detectamos el click en el boton.
  $("button").on("click", function(e) {

    //Llamamos a la funcion para animar
    return anim();

  });

  //Declaraos una funcions para crear los divs donde se mostraran los numeros
  function createDivs(nums){
    //declaramos un nuevo arreglo
    var nums2 = [];

    //Recorremos el arreglo de numeros
    for (var i = 0; i < nums.length; i++) {

      //Creamos un div para el numero
      var html = "<div class='num num-"+i+"'>"+nums[i]+"</div>";

      //Agregamos el div a la caja de reultados
      $('.resultados').append(html);

      //Transformamos el numero de string a numero y lo agregamos al nuevo arreglo.
      nums2.push(Number(nums[i]));
    };

    //Llamamos a la funcion que asignara el orden a cada elemento.
    return sortDiv(nums2);

  };

  //Declaramos la funcion que asignara el orden
  function sortDiv(nums){

    //Declaramos una variable que guardara la posicion de cada div
    var ll = 0;

    //Declaramos una variable para guardar el ancho de la caja de resultados
    var widthR = 0;

    //Ordenamos el arreglo de numeros de menor a mayor
    nums.sort(function(a, b){return a-b});

    //Recorremos todos los divs con la clase num
    $('.num').each(function(index, el) {

      //Recorremos el arreglo de numeros
      for (var i = 0; i < nums.length; i++) {

        //Comparamos el numero en el div con el numero en el array
        if (nums[i] == $(this).text()) {

          //Asignamos en un atributo data el orden del numero
          $(this).attr('data-pos', i);

        };

      };

      //Calculamos el ancho de la caja de resultados
      widthR = widthR + $(this).width()+10;

      //Le asignamos el ancho a la caja de resultados
      $('.resultados').width(widthR);

      //Verificamos si es el primer elemento
      if (index == 0) {

        //Le asignamos su posicion anicial
        $(this).css('left', '10px');

        //Calculamos la siguiente posicion
        ll = 20 + $(this).width();

      }
      //verificamos que no sea el primer elemento
      else {

        //le asignamos su posicion inicial
        $(this).css('left', ll);

        //Calculamos la siguiente posicion
        ll = ll + $(this).width() + 10;

      };

    });

  };

  //Declaramos la funcion de animacion
  function anim(){

    //Recorremos los divs de los numeros
    for (var i = 0; i < $('.num').length; i++) {

      //Declaramos una variable que guardara la posicion final. La inicialisamos con la posicion del primer elemento.
      var cuWidth = 10;

      //Recorremos todos los divs.num anteriores al elemento actual
      for (var ii = 0; ii < i; ii++){

        //Medimos los anchos para poder obtener la posicion final
        cuWidth = cuWidth + $('[data-pos="'+ii+'"]').width() + 10;

      };

      //Animamos el orden
      $('[data-pos="'+i+'"]').animate({
        left: cuWidth}, 
        1500)
    };

  };
  
});

//Funcion para que solo se pueda ingresar números y espacios
function isNumber(evt) {

  //Capturamos el evento
  evt = (evt) ? evt : window.event;

  //Capturamos el valor ingresado
  var charCode = (evt.which) ? evt.which : evt.keyCode;

  //Comprobamos si es no es un numero o espacio
  if (charCode > 32 && (charCode < 48 || charCode > 57)) {

    //Retornamos falso para impedir que se ingrese la información
    return false;
  };

  //Retornamos verdadero para que se puede ingresar la información
  return true;

};