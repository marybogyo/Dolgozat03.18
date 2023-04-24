
export function divBerak(lista) {
  let txt = "";
  txt += `<div id="profil" hidden='hidden'><div><button id="elozoProfil"><</button></div><div id="profilkartya" class="kartya">kártya</div><div><button id="kovetkezoProfil">></button></div></div>` //hidden=hidden
  txt += `<div class="container">`;
  for (let index = 0; index < lista.length; index++) {
    txt += `<div class="kartya">`;
    txt += `<h3>Kutya adatai</h3>`;
    txt += `<img src='${Object.entries(lista[index])[0][1]}'/>`
    txt += `<p>${Object.entries(lista[index])[1][0]}: ${Object.entries(lista[index])[1][1]}</p>`;
   
    txt+=`<button class="mutat">Mutat</button>`
    txt+=`<button class="kosarba">Kosárba</button>`
    txt += `</div>`;
  }
  
  txt += `</div>`;

  return txt;
}
  

export function tablabaRak(lista) {
    let txt2 = "";
    txt2 += `<div class = "container">`;
    txt2 += `<table>`;
    txt2 += `<thead><tr>`
    for (let index = 0; index < Object.entries(lista[0]).length; index++) {
      txt2 += `<th>${Object.entries(lista[0])[index][0]}<span id="sortArrow">&#8595;&#8593;</span></th>`
    }
    txt2 += `<th>Törlés</th>`
    txt2 += `<th>Szerkesztés</th>`
    txt2 += `</tr></thead>`
    for (let index = 0; index < lista.length; index++) {
      
      txt2 += `<tr>`;
      txt2 += `<td><img src='${Object.entries(lista[index])[0][1]}'/></td>`;
      for (let i = 1; i < Object.entries(lista[index]).length; i++) {
        const kulcs = Object.entries(lista[index])[i][0];
        const ertek = Object.entries(lista[index])[i][1];
               txt2 += `<td>${ertek}</td>`;
      }
      txt2 += `</tr>`;
    }
    txt2 += `</table>`;
    txt2 += `</div>`;
    
    return txt2;
  }

  // export function kucsErtek(lista){
  //   let txt3 = "";
  //   txt3 +=`<div class ="kulcs">`;
  //   txt3+=`<table id="tabla">`;
  //   for (let index = 0; index < lista.length; index++) {
  //     txt3+=`<tr>`;
  //     txt3+=`<th>${kulcs}<span id="nyil"></span></th>`
  //     txt3+=`</tr>`
  //   }
  //   txt3+=`</table>`;
  //   txt3+=`</div>`;
  //   return txt3;
  // }
  