/*import { KUTYALISTA, kulcs } from "./adat.js";*/
import { divBerak, tablabaRak } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";

let KUTYALISTA = [];

let ARTICLE;
let kartyak;
let tablazat;
let kosarKutyak = [];

$(async function () {
  console.log("ez van")
  let vegpont = "adat.json"; 
  await adatBeolvas(vegpont, megjelenit)
  console.log(KUTYALISTA)

  kezdes();
  kosar();
  console.log("itt vagyok")
  rendezBarmiSzerint(KUTYALISTA, "Név", 1);
  console.log("itt vagyok2")

  ARTICLE = $("article");
  kartyak = $("section.kartyak");
  tablazat = $("section.tablazat");
  kartyak.html(divBerak(KUTYALISTA));
  tablazat.html(tablabaRak(KUTYALISTA));

  torlesGomb();
  const SUBMIT = $("#rogzites");
  SUBMIT.on("click", ujKutya);
});

function megjelenit(data){ 
  KUTYALISTA = data
  //console.log(KUTYALISTA)
}

async function adatBeolvas(vegpont,callbackFv){
  await fetch(vegpont, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.KUTYALISTA)
        callbackFv(data.KUTYALISTA)
      })
      .catch((err) => console.log(err));
  }

  

function kezdes() {
  
  $("main").prepend("<h2>IMÁDNIVALÓ KEDVENCEK!</h2>");
  
}

function kosar() {
  const NAV = $("nav").append(
    `<div id='kosarTarolo'><button id='kosarGomb'><img src="cart.png" alt="icon"></button><a href='http://127.0.0.1:5500/admin.html'>Admin</a></div>`
  );
  $("a").css("padding-left","15rem").css("text-decoration","none").css("font-size","20px");
  
  let kosarTarolo = $("#kosarTarolo");
  kosarTarolo.append("<div id='kosarMaga' hidden='hidden'></div>");
  $("#kosarGomb").on("click", function () {
    if ($("#kosarMaga").is(":hidden")) {
      $("#kosarMaga").removeAttr("hidden");
      $("#kosarMaga").html("");
      for (let index = 0; index < kosarKutyak.length; index++) {
        console.log(kosarKutyak[index]);
        $("#kosarMaga").append(
          `<div><p>${kosarKutyak[index]}</p><button id='${kosarKutyak[index]}Torles''>Törlés</button>`
        );
        $(`#${kosarKutyak[index]}Torles`).on("click", function () {
          kosarKutyak.splice(index, 1);
          $(this).parent().remove();
          console.log(kosarKutyak);
        });
      }
    } else {
      $("#kosarMaga").attr("hidden", true);
    }
  });
}

function torlesGomb() {
  const TR = $("tr");

  for (let index = 0; index < KUTYALISTA.length; index++) {
    const TD = $("<td>");
    const AD = $("<button>").text("Kosárba tesz");
    const TORLES = $("<button>").text("Törlés");
    TR.eq(index).append(TD);
    TD.append(AD);
    TD.append("<br>");
    TD.append(TORLES);
    TORLES.on("click", function () {
      torlesFunkcio(index);
    });
    AD.on("click", function () {
      kosarKutyak.push(Object.entries(KUTYALISTA[index])[1][1]);
      if (!$("#kosarMaga").is(":hidden")) {
        $("#kosarMaga").append(
          `<div><p>${Object.entries(KUTYALISTA[index])[1][1]}</p><button id='${
            Object.entries(KUTYALISTA[index])[1][1]
          }Torles''>Törlés</button>`
        );
        $(`#${Object.entries(KUTYALISTA[index])[1][1]}Torles`).on(
          "click",
          function () {
            kosarKutyak.splice(index, 1);
            $(this).parent().remove();
            console.log(kosarKutyak);
          }
        );
      }
    });
  }
}

function torlesFunkcio(index) {
  KUTYALISTA.splice(index, 1);
  kartyak.html(divBerak(KUTYALISTA));
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

  KUTYALISTA.push(kutya);
  console.log(KUTYALISTA);
  kartyak.html(divBerak(KUTYALISTA));
  tablazat.html(tablabaRak(KUTYALISTA));
  torlesGomb();
}
