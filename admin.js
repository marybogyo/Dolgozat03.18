//import { KUTYALISTA, kulcs } from "./adat.js";
import { divBerak, tablabaRak } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";

let KUTYALISTA = [];

let ARTICLE;
let tablazat;

$(async function () {
  let vegpont = "adat.json";
  await adatBeolvas(vegpont, megjelenit);
  console.log(KUTYALISTA);

  kezdes();
  rendezBarmiSzerint(KUTYALISTA, "Név", 1);
  kosar(), (ARTICLE = $("article"));
  tablazat = $("section.tablazat");
  tablazat.html(tablabaRak(KUTYALISTA));

  torlesGomb();
  szerkesztGomb();
  const SUBMIT = $("#rogzites");
  SUBMIT.on("click", ujKutya);
});

function kosar() {
  const NAV = $("nav").append(
    `<div id='kosarTarolo'><a href='http://127.0.0.1:5500/index.html'>Főoldal</a></div>`
  );
  $("a")
    .css("margin-left", "15rem")
    .css("text-decoration", "none")
    .css("font-size", "20px")
    .css("border", "2px solid grey")
    .css("border-radius", "7px")
    .css("padding", "15px")
    .css("background-color", "rgb(243, 220, 171)");
}

function megjelenit(data) {
  KUTYALISTA = data;
  console.log(KUTYALISTA);
}

function listabaRak(data) {
  KUTYALISTA.push(data);
}

async function adatBeolvas(vegpont, callbackFV) {
  await fetch(vegpont, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      callbackFV(data.KUTYALISTA);
    })
    .catch((err) => console.log(err));
}

function adatPost(vegpont, adat, callbackFv) {
  console.log("json:");
  console.log(adat);
  console.log(JSON.stringify(adat));
  console.log("megvan a json");
  fetch(vegpont, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(adat),
  })
    .then((response) => response.json())
    .then((adat) => {
      callbackFv(adat.KUTYALISTA);
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

    TR.eq(index + 1).append(TD);
    TD.append("<br>");
    TD.append(TORLES);
    TORLES.on("click", function () {
      torlesFunkcio(index);
    });
  }
}

function szerkesztGomb() {
  const TR = $("tr");

  for (let index = 0; index < KUTYALISTA.length; index++) {
    const TD = $("<td>");
    const SZERKESZT = $("<button>").text("Szerkeszt");

    TR.eq(index + 1).append(TD);
    TD.append("<br>");
    TD.append(SZERKESZT);
    SZERKESZT.on("click", function () {
      szerkesztFunkcio(index);
    });
  }
}

function torlesFunkcio(index) {
  KUTYALISTA.splice(index, 1);
  tablazat.html(tablabaRak(KUTYALISTA));
  torlesGomb();
  szerkesztGomb();
}

function szerkesztFunkcio(index) {
  let kutya = KUTYALISTA[index];
  $("#szerkdiv").remove();
  let div = "<div id='szerkdiv'>";
  div += `Név: <input id="sznev" type="text" value="${kutya.Név}">`;
  div += `Kor: <input id="szkor" type="text" value="${kutya.Kor}">`;
  div += `Fajta: <input id="szfajta" type="text" value="${kutya.Fajta}">`;
  div += `Láb: <input id="szlab" type="text" value="${kutya.Láb}">`;
  div += `Nem: szuka <input id="szszuka" type="radio" name="szerknem" value="szuka" ${
    kutya.Nem == "szuka" ? "checked" : ""
  }>`;
  div += `kan <input id="szkan" type="radio" name="szerknem" value="kan" ${
    kutya.Nem == "kan" ? "checked" : ""
  }>`;
  div += `Magasság: <input id="szmagassag" type="text" value="${kutya.Magasság}">`;
  div += `<button id="szerkesztes">Szerkesztés</button>`
  div += `</div>`;
  tablazat.append(div);
  $("#szerkesztes").on("click", function () {
    KUTYALISTA[index].Név = $("#sznev").val();
    KUTYALISTA[index].Kor = $("#szkor").val();
    KUTYALISTA[index].Fajta = $("#szfajta").val();
    KUTYALISTA[index].Láb = $("#szlab").val();
    KUTYALISTA[index].Magasság = $("#szmagassag").val();

    const NemInputElem = $("#szszuka");
    if (NemInputElem.prop("checked")) {
      KUTYALISTA[index].Nem = "szuka";
    } else {
      KUTYALISTA[index].Nem = "kan";
    }
    tablazat.html(tablabaRak(KUTYALISTA));
    torlesGomb();
    szerkesztGomb();
  })

}

function rendezes() {}

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
  szerkesztGomb();
}
