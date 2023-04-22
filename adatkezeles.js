
export function divBerak(lista) {
  let txt = "";
  txt += `<div class="container">`;
  for (let index = 0; index < lista.length; index++) {
    txt += `<div class="kartya">`;
    txt += `<h3>Kutya adatai</h3>`;
    txt += `<img src='${Object.entries(lista[index])[0][1]}'/>`
    for (let i = 1; i < Object.entries(lista[index]).length; i++) {
      const kulcs = Object.entries(lista[index])[i][0];
      const ertek = Object.entries(lista[index])[i][1];
      txt += `<p>${kulcs}: ${ertek}</p>`;
    }
    txt+=`<button>Mutat</button>`
    txt+=`<button id="kosarba">Kosárba</button>`
    txt += `</div>`;
  }
  
  txt += `</div>`;

  return txt;
}
  

export function tablabaRak(lista) {
    let txt2 = "";
    txt2 += `<div class = "container">`;
    txt2 += `<table>`;
    for (let index = 0; index < lista.length; index++) {
   
      txt2 += `<tr>`;
      txt2 += `<td><img src='${Object.entries(lista[index])[0][1]}'/></td>`;
      for (let i = 1; i < Object.entries(lista[index]).length; i++) {
        const kulcs = Object.entries(lista[index])[i][0];
        const ertek = Object.entries(lista[index])[i][1];
        txt2 += `<td>${kulcs}: ${ertek}</td>`;
      }
      txt2 += `</tr>`;
    }
    txt2 += `</table>`;
    txt2 += `</div>`;
    return txt2;
  }
  