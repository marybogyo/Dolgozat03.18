//import { KUTYALISTA, kulcs } from "./adat.js";
import { divBerak, tablabaRak } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";

let KUTYALISTA= [];

let ARTICLE;
let tablazat;


$(async function () {
  let vegpont = "adat.json"; 
  await adatBeolvas(vegpont, megjelenit)
  console.log(KUTYALISTA)

  kezdes();
  rendezBarmiSzerint(KUTYALISTA, "Név", 1);

  ARTICLE = $("article");
  tablazat = $("section.tablazat");
  tablazat.html(tablabaRak(KUTYALISTA));

  torlesGomb();
  const SUBMIT = $("#rogzites");
  SUBMIT.on("click", ujKutya);
});

function megjelenit(data){ 
  KUTYALISTA=data
  console.log(KUTYALISTA)
}

function listabaRak(data)
{
    KUTYALISTA.push(data);
}

async function adatBeolvas(vegpont, callbackFV){
  await fetch(vegpont, {
    method:"GET"
  })
  .then((response)=>response.json())
  .then((data)=> {
    callbackFV(data.KUTYALISTA)
  })
  .catch((err)=>console.log(err));
}

function adatPost(vegpont,adat,callbackFv){
    console.log("json:");
    console.log(adat);
    console.log(JSON.stringify(adat));
    console.log("megvan a json")
    fetch(vegpont, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(adat)
        })
        .then((response) => response.json())
        .then((data) => {
                  
            callbackFv(adat.KUTYALISTA)
        })
        .catch((err) => console.log(err));
}


function kezdes() {
  
  $("main").prepend("<h2>IMÁDNIVALÓ KEDVENCEK!</h2>");
  
}


function torlesGomb() {
  const TR = $("tr");

  for (let index = 0; index < KUTYALISTA.length; index++) {
    const TD = $("<td>");
    const TORLES = $("<button>").text("Törlés");
    TR.eq(index).append(TD);
    TD.append("<br>");
    TD.append(TORLES);
    TORLES.on("click", function () {
      torlesFunkcio(index);
    });
  }
}

function torlesFunkcio(index) {
  KUTYALISTA.splice(index, 1);
  tablazat.html(tablabaRak(KUTYALISTA));
  torlesGomb();
}

function ujKutya() {
  const kutya = {};
  console.log("Vauka");

  kutya.Kep = "kutya8.jpg";

  const NevInputElem = $("#kneve");
  kutya.Nev = NevInputElem.val();

  const KorInputElem = $("#kkor");
  kutya.Kor = KorInputElem.val();

  const FajtaInputElem = $("#kfajta");
  kutya.Fajta = FajtaInputElem.val();

  const labInputElement = $("#klaba");
  kutya.Lab = labInputElement.val();

  const NemInputElem = $("#szuka");
  if (NemInputElem.prop("checked")) {
    kutya.Nem = "szuka";
  } else {
    kutya.Nem = "kan";
  }

  const magassagInputElement = $("#mmag");
  kutya.Magassag = magassagInputElement.val();

  console.log(kutya);

  console.log(KUTYALISTA);
  KUTYALISTA.push(kutya);
  localStorage.setItem("adat.json", JSON.stringify(KUTYALISTA));
  tablazat.html(tablabaRak(KUTYALISTA));
  torlesGomb();
}
