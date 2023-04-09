export function rendezBarmiSzerint(lista, kulcs, irany) {
  //**név szerint abc sorrendbe rendezzük az adatokat */
  //**ezzeel az eredeti lista is megváltozik */
  console.log(lista);
 
  lista.sort(function (a, b) {
    console.log(a.Név);
    console.log(b.Név);
    console.log("következő a,b");
    let ertek = 1;
    if (a[kulcs] < b[kulcs]) {
      ertek = -1;
    }
    ertek*=irany;
    return ertek; //**visszatérünk pozitív vagy negatív számmal */
  });
}
//filter metódus-szűrés
//új listát hoz létre
