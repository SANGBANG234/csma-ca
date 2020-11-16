/*variables*/

var x;
var y;
var ifs = 4000;
var k = [0,0,0,0,0,0];
var tp = 1000;
var channel = 0;
var r;
var clsrts=document.querySelectorAll(".rts");
var clscts=document.querySelectorAll(".cts");
var clsdata=document.querySelectorAll(".sending-data");
var swp=0;

/*variables end*/

/*functions*/


function display(a,b){
  if(channel==0)
  {
    x=a;
    y=b;
  }
}

function checkChannel(){
  if(channel == 0 )
  { var n = document.querySelectorAll(".d-none");
    n[x-1].classList.remove('d-none');
    n[x-1].classList.add('d-block');
    setTimeout(sendSignal,ifs);
  }
  else
  {
    alert("Transmisión en proceso");
  }
}

function sendSignal(){
  var n = document.querySelectorAll(".ifs");
  n[x-1].classList.remove('d-block');
  n[x-1].classList.add('d-none');
  r = tp*parseInt(Math.random()*k[x-1]);
  sendRTS();
}

function sendRTS()
{ var a = "station"+ x;
  clsrts[x-1].innerHTML="RTS : Enviado";
  clsrts[y-1].innerHTML="RTS : Recibido";
  var n = Math.random();
  if(n>0.85)
  {
    k[x-1]=k[x-1]+1;
    if(k[x-1]>15)
    {
      abortSignal();
    }
    else{
      clscts[x-1].innerHTML="CTS : No recibido, intenta denuevo";
      clscts[y-1].innerHTML="CTS : No se pudo enviar";
      setTimeout(checkChannel,tp*r);
    }
  }
  else{
    checkIFS();
  }
}

function checkIFS(){
  for(let n=0;n<6;n++)
  {
    if(n!=y-1)
      clscts[n].innerHTML="CTS : Recibido";
  }
  document.getElementById("station1").innerHTML="Equipo "+x;
  document.getElementById("station2").innerHTML="Equipo "+y;
  clscts[y-1].innerHTML="CTS : Enviado"
  clsdata[x-1].innerHTML="Transferencia de datos : Enviando";
  clsdata[y-1].innerHTML="Transferencia de datos : Recibiendo";
  channel = 1;
  document.getElementById("channel").innerHTML="Canal : no libre";
  swap();
  setTimeout(sendFrame,ifs);
}

function swap(){
  if(swp==0)
  {
    var none = document.querySelectorAll(".for-swap");
    none[0].classList.remove('d-none');
    none[0].classList.add('d-block','d-flex');
    none[1].classList.remove('d-none');
    none[1].classList.add('d-block','d-flex');
    swp=1;
  }
  else{
    var block = document.querySelectorAll(".for-swap");
    block[0].classList.remove('d-block','d-flex');
    block[0].classList.add('d-none');
    block[1].classList.remove('d-block','d-flex');
    block[1].classList.add('d-none');
    
    swp=0;
  }
}

function sendFrame(){  
  var n = Math.random();
  if(n>0.1)
  {
    success();
  }
  else{
    k[x-1]=k[x-1]+1;
    if(k[x-1]>15)
    { swap();
      abortSignal();
    }
    else{
      clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Se acabó el tiempo, intenta de nuevo";
      channel = 0; 
      for(let i =0;i<6;i++)
      {
        clscts[i].innerHTML="CTS : -";
        clsrts[i].innerHTML="CTS : -";
        document.getElementById("channel").innerHTML="Canal : gratis";
        clsdata[i].innerHTML="Transferencia de datos: -";
      }
      document.getElementById("channel").innerHTML="Canal : gratis";
      setTimeout(checkChannel,tp*r);
    }
  } 
}

function success(){
  clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Datos enviados correctamente!";
  alert("Datos enviados correctamente!");
  swap();
  setDefault();
}

function abortSignal(){
  clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Datos no enviados, procceso abortado";
  setDefault();
  alert("Datos no enviados, procceso abortado");
}

function setDefault(){
  k = [0,0,0,0,0,0];
  r = 0;
  channel = 0;
  for(let i =0;i<6;i++)
  {
    clscts[i].innerHTML="CTS : -";
    clsrts[i].innerHTML="RTS : -";
    document.getElementById("channel").innerHTML="Canal : gratis";
    clsdata[i].innerHTML="Transferencia de datos : -";
  }
}


/*functions end*/