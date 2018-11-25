$(document).ready(function(){
    $('select').formSelect();
    var array_principal = [5,1,1,1,1,2,2,2,3,3,3,4,5,5,7,8,9,10,12,15,17,19,23,27,31,37,43,51,59,69];
    var array_cuartel = [7,1,2,1,2,2,3,3,4,4,5,5,7,8,9,11,12,15,17,20,24,27,32,38,44];
    var array_cuadra = [8,1,2,2,2,3,3,3,4,5,5,7,8,9,10,12,15,16,20,23];
    var array_taller = [8,1,2,2,2,3,3,3,4,5,5,7,8,9,10];
    var array_corte = [80,14,16];
    var array_herreria = [20,3,4,5,5,7,7,9,10,12,14,16,20,22,26,31,36,42,49,57];
    var array_mercado = [20,3,4,5,5,7,7,9,10,12,14,16,20,22,26,31,36,42,49,57,67,79,92,107,126];
    var array_lenador = [5,1,1,1,1,1,2,2,2,2,3,3,4,5,5,5,7,8,9,10,12,14,16,19,21,24,29,33,38,43];
    var array_barrera = [10,1,2,2,2,2,3,3,4,4,4,5,6,7,8,8,10,12,13,15,16,20,22,25,28,33,37,42,48,55];
    var array_hierro = [10,2,2,2,3,3,4,4,5,6,7,8,10,11,13,15,18,21,25,28,34,39,46,54,63,74,86,100,118,138];
    var array_granja = [0,240,281,329,386,452,530,622,729,854,1002,1174,1376,1613,1891,2216,2598,3045,3569,4183,4904,5748,6737,7896,9255,10848,12715,14904,17469,20476,24000];
    var array_escondrijo = [2,0,1,0,1,0,1,1,1,1];
    var array_muralla = [5,1,1,1,1,2,2,2,3,3,3,4,5,5,7,8,9,10,12,15];
    var array_torre = [500,90,106,126,147,175,206,243,286,339,399,471,556,656,774,913,1078,1271,1501,1770];
    var estatua = 10;
    var granja_edificios =0;
    var poblacion=0;
    var id;
    var valor;
    function getSelection(name){
      id = document.getElementById(name);
      valor = id.options[id.selectedIndex].value;
      aux = "array_"+name;
      calcularGranja(eval(aux),valor);
    }
    function calcularGranja(array,nivel){
      for (var i = 0; i < nivel; i++) {
        granja_edificios += array[i];
      }
    }
    function calcularTropas(){
      poblacion=0;
      var hacha = document.getElementById('axe').value;
      poblacion += parseInt(hacha);
      var lija = document.getElementById('light').value;
      poblacion += parseInt(lija*4);
      var arcab = document.getElementById('marcher').value;
      poblacion += parseInt(arcab*5);
      var ariete = document.getElementById('ram').value;
      poblacion += parseInt(ariete*5);
      var cata = document.getElementById('catapult').value;
      poblacion += parseInt(cata*8);
      var noble = document.getElementById('snob').value;
      poblacion += parseInt(noble*100);
      var lanza = document.getElementById('spear').value;
      poblacion += parseInt(lanza);
      var espada = document.getElementById('sword').value;
      poblacion += parseInt(espada);
      var arquero = document.getElementById('archer').value;
      poblacion += parseInt(arquero);
      var espia = document.getElementById('spy').value;
      poblacion += parseInt(espia*2);
      var pesada = document.getElementById('heavy').value;
      poblacion += parseInt(pesada*6);
      var pala = $('#knight').is(':checked');
      if(pala==true){
        poblacion +=10;
      }
    }
    function default1(name,nivel){
      $("#"+name+" option").each(function(){
        if($(this).text() == nivel){
          $(this).attr("selected","selected");
        }
      });
    }

    $("#calcular").on("click",function(){
      granja_total=0;
      granja_edificios =0;
      $("input").each(function(){
        if($(this).val() == ""){
          $(this).val(0);
        }
      });

      getSelection("principal");
      getSelection("cuartel");
      getSelection("cuadra");
      getSelection("taller");
      getSelection("corte");
      getSelection("herreria");
      getSelection("mercado");
      getSelection("lenador");
      getSelection("barrera");
      getSelection("hierro");
      getSelection("escondrijo");
      getSelection("muralla");
      getSelection("torre");
      calcularTropas();
      var estatua = document.getElementById('estatua');
      estatua = estatua.options[estatua.selectedIndex].value;
      if(estatua==1){
        granja_edificios +=10;
      }
      //calculo granja total con bonus
      var granja_total = document.getElementById('granja');
      granja_total = granja_total.options[granja_total.selectedIndex].value;
      granja_total = array_granja[granja_total];
      if($('#cultivo').is(':checked')){
        granja_total = granja_total + (granja_total * 0.10);
      }
      if($('#bgranja').is(':checked')){
        granja_total = granja_total + (granja_total * 0.10);
      }
      var bandera = document.getElementById('bandera');
      bandera = bandera.options[bandera.selectedIndex].value;
      granja_total = granja_total + (granja_total * bandera/100);
      //---------------------------------------------
      granja_libre = granja_total - granja_edificios - poblacion;
      if(granja_libre<0){
        color="red";
      }else if(granja_libre>0){
        color="green";
      }
      $("#print").html("<b>Granja Total:</b> "+granja_total+"<br>");
      $("#print").append("<b>Granja Edificios:</b> "+granja_edificios+"<br>");
      $("#print").append("<b>Granja Troopas:</b> "+poblacion+"<br>");
      $("#print").append("<span style='color:"+color+";font-weight:bold'>Granja Libre: "+granja_libre+"</span>");

    });
    $("#plantilla1").on("click",function(){
      default1("principal",20);
      default1("cuartel",25);
      default1("cuadra",20);
      default1("taller",15);
      default1("corte",1);
      default1("herreria",20);
      default1("estatua",1);
      default1("mercado",20);
      default1("lenador",30);
      default1("barrera",30);
      default1("hierro",30);
      default1("granja",30);
      default1("escondrijo",10);
      default1("muralla",20);
      default1("torre",0);
    });
    $("#plantilla2").on("click",function(){
      $("select").each(function(){
        console.log($(this));
        $(this).children().last().attr("selected","selected");
      });
    });
  });
