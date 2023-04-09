import { KUTYALISTA, KUTYAKULCS } from "./adat.js";
import { osszeallit, osszeallit2 } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";

let ARTICLE;
let kartyak;
let tablazat;
let kosarKutyak = [];

$(function () {
  kezdes();
  kosar();
  rendezBarmiSzerint(KUTYALISTA, "Név", 1);

  ARTICLE = $("article");
  kartyak = $("section.kartyak");
  tablazat = $("section.tablazat");
  kartyak.html(osszeallit(KUTYALISTA));
  tablazat.html(osszeallit2(KUTYALISTA));

  torlesGomb();
  const SUBMIT = $("#rogzites");
  SUBMIT.on("click", ujKutya);
  
});

function kezdes() {
  const KEZD = $("main").prepend("<h2>IMÁDNIVALÓ KEDVENCEK!</h2>");
}

function kosar(){
  const NAV = $("nav").append(`<div id='kosarTarolo'><button id='kosarGomb'><img src="cart.png" alt="icon"></button></div>`);
  let kosarTarolo = $("#kosarTarolo");
  kosarTarolo.append("<div id='kosarMaga' hidden='hidden'></div>");
  $("#kosarGomb").on("click", function() {
    if ($("#kosarMaga").is(":hidden")) {
      console.log(true);
      $("#kosarMaga").removeAttr("hidden");
      $("#kosarMaga").html("");
      for (let index = 0; index < kosarKutyak.length; index++) {
        console.log(kosarKutyak[index]);
        $("#kosarMaga").append(`<div><p>${kosarKutyak[index]}</p><button id='${kosarKutyak[index]}Torles''>Törlés</button>`);
        $(`#${kosarKutyak[index]}Torles`).on("click", function(){
          kosarKutyak.splice(index, 1);
          $(this).parent().remove();
          console.log(kosarKutyak);
        });
      }
    } else {
      console.log(false);
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
    AD.on("click", function(){
      console.log(Object.entries(KUTYALISTA[index])[1][1]);
      kosarKutyak.push(Object.entries(KUTYALISTA[index])[1][1]);
      if (!$("#kosarMaga").is(":hidden")){
        $("#kosarMaga").append(`<div><p>${Object.entries(KUTYALISTA[index])[1][1]}</p><button id='${Object.entries(KUTYALISTA[index])[1][1]}Torles''>Törlés</button>`);
        $(`#${Object.entries(KUTYALISTA[index])[1][1]}Torles`).on("click", function(){
          kosarKutyak.splice(index, 1);
          $(this).parent().remove();
          console.log(kosarKutyak);
        });
      }
    })

  }
}

function torlesFunkcio(index) {
  KUTYALISTA.splice(index, 1);
  kartyak.html(osszeallit(KUTYALISTA));
  tablazat.html(osszeallit2(KUTYALISTA));
  torlesGomb();
}

function ujKutya() {
  const kutya = {};
  const ADAT = $("input");
  console.log("Vauka");

  kutya.Kép = "kutya8.jpg";

  const NevInputElem = $("#kneve");
  kutya.Név = NevInputElem.val();

  const KorInputElem = $("#kkor");
  kutya.Kor = KorInputElem.val();

  const FajtaInputElem = $("#kfajta");
  kutya.Fajta = FajtaInputElem.val();

  const labInputElement = $("#klaba");
  kutya.Láb = labInputElement.val();

  const NemInputElem = $("#szuka");
  if (NemInputElem.prop("checked")) {
    kutya.Nem = "szuka";
  } else {
    kutya.Nem = "kan";
  }

  const magassagInputElement = $("#mmag");
  kutya.Magasság = magassagInputElement.val();

  console.log(kutya);

  KUTYALISTA.push(kutya);
  console.log(KUTYALISTA);
  kartyak.html(osszeallit(KUTYALISTA));
  tablazat.html(osszeallit2(KUTYALISTA));
  torlesGomb();
}
