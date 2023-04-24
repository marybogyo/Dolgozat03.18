/*import { KUTYALISTA, kulcs } from "./adat.js";*/
import { divBerak } from "./adatkezeles.js";
import { rendezBarmiSzerint } from "./rendezesSzures.js";

let KUTYALISTA = [];

let ARTICLE;
let kartyak;
let tablazat;
let kosarKutyak = [];

$(async function () {
  console.log("ez van");
  let vegpont = "adat.json";
  await adatBeolvas(vegpont, megjelenit);
  console.log(KUTYALISTA);

  kezdes();
  kosar();
  rendezBarmiSzerint(KUTYALISTA, "Név", 1);

  ARTICLE = $("article");
  kartyak = $("section.kartyak");
  tablazat = $("section.tablazat");
  kartyak.html(divBerak(KUTYALISTA));
  //tablazat.html(tablabaRak(KUTYALISTA));

  kosarbaTesz();
});

function megjelenit(data) {
  KUTYALISTA = data;
  console.log(KUTYALISTA);
}

async function adatBeolvas(vegpont, callbackFv) {
  await fetch(vegpont, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.KUTYALISTA);
      callbackFv(data.KUTYALISTA);
    })
    .catch((err) => console.log(err));
}

function kezdes() {
  $("main").prepend("<h2>IMÁDNIVALÓ KEDVENCEK!</h2>");
}

function kosar() {
  const NAV = $("nav").append(
    `<div id='kosarTarolo'><button id='kosarGomb'><img id="cart" src="cart.png" alt="icon"></button><a href='http://127.0.0.1:5500/admin.html'>Admin</a></div>`
  );
  $("a")
    .css("text-decoration", "none")
    .css("font-size", "20px")
    .css("border", "2px solid grey")
    .css("border-radius", "7px")
    .css("padding", "15px")
    .css("background-color", "rgb(243, 220, 171)");
  $("#kosarGomb").css("margin-right", "15rem");

  let kosarTarolo = $("#kosarTarolo");
  kosarTarolo.append("<div id='kosarMaga' hidden='hidden'></div>");
  $("#kosarGomb").on("click", function () {
    if ($("#kosarMaga").is(":hidden")) {
      $("#kosarMaga").removeAttr("hidden");
      $("#kosarMaga").html("");
      for (let index = 0; index < kosarKutyak.length; index++) {
        console.log(kosarKutyak[index]);
        $("#kosarMaga").append(
          `<div id="${index}kosar"><p>${kosarKutyak[index]}</p>`
        );

        const torleskosar = $("<button>").text("Törlés");
        torleskosar.on("click", function () {
          kosarKutyak.splice(index, 1);
          $(this).parent().remove();
          console.log(kosarKutyak);
        });

        $(`#${index}kosar`).append(torleskosar);
      }
    } else {
      $("#kosarMaga").attr("hidden", true);
    }
  });
}

function kosarbaTesz() {
  let kosarbaLista = $(".kosarba");
  console.log(kosarbaLista);
  console.log(kosarbaLista.length);
  for (let index = 0; index < kosarbaLista.length; index++) {
    kosarbaLista[index].addEventListener("click", function () {
      console.log(Object.entries(KUTYALISTA[index]));
      let szoveg = `<b>Név:</b> ${
        Object.entries(KUTYALISTA[index])[1][1]
      } <b>Kor:</b> ${Object.entries(KUTYALISTA[index])[2][1]} <b>Fajta:</b> ${
        Object.entries(KUTYALISTA[index])[3][1]
      }`;
      kosarKutyak.push(szoveg);

      if (!$("#kosarMaga").is(":hidden")) {
        $("#kosarMaga").append(
          `<div id="${kosarKutyak.length - 1}kosar"><p>${szoveg}</p>`
        );

        const torleskosar = $("<button>").text("Törlés");
        torleskosar.on("click", function () {
          kosarKutyak.splice(kosarKutyak.length - 1, 1);
          $(this).parent().remove();
          console.log(kosarKutyak);
        });
        $(`#${kosarKutyak.length - 1}kosar`).append(torleskosar);
      }
    });
  }
}

function mutatraNyom() {
  let mutatlista = $(".mutat");
  for (let index = 0; index < mutatlista.length; index++) {
    mutatlista[index].addEventListener("click", function () {
      if (!$("#profil").is(":hidden")) {
        $("#profil").removeAttr("hidden");
      }
      $("#profil").html("");
    });

  }
}

// function torlesGomb() {
//   const TR = $("tr");

//   for (let index = 0; index < KUTYALISTA.length; index++) {
//     const TD = $("<td>");
//     const AD = $("<button>").text("Kosárba tesz");
//     const TORLES = $("<button>").text("Törlés");
//     TR.eq(index).append(TD);
//     TD.append(AD);
//     TD.append("<br>");
//     TD.append(TORLES);
//     TORLES.on("click", function () {
//       torlesFunkcio(index);
//     });
//     AD.on("click", function () {
//       kosarKutyak.push(Object.entries(KUTYALISTA[index])[1][1]);
//       if (!$("#kosarMaga").is(":hidden")) {
//         $("#kosarMaga").append(
//           `<div><p>${Object.entries(KUTYALISTA[index])[1][1]}</p><button id='${
//             Object.entries(KUTYALISTA[index])[1][1]
//           }Torles''>Törlés</button>`
//         );
//         $(`#${Object.entries(KUTYALISTA[index])[1][1]}Torles`).on(
//           "click",
//           function () {
//             kosarKutyak.splice(index, 1);
//             $(this).parent().remove();
//             console.log(kosarKutyak);
//           }
//         );
//       }
//     });
//   }
// }

/*function torlesFunkcio(index) {
  KUTYALISTA.splice(index, 1);
  kartyak.html(divBerak(KUTYALISTA));
  tablazat.html(tablabaRak(KUTYALISTA));
  torlesGomb();
}*/

/* function ujKutya() {
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
} */
