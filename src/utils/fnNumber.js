export function randomArray2(arr) {
  let arr1 = JSON.parse(JSON.stringify(arr));
  let arr2 = arr1.filter((value) => typeof value === "object");
  let arr3 = [];
  let ctr, temp;
  while (arr2.length > 0) {
    ctr = Math.floor(Math.random() * arr2.length);
    temp = arr2[ctr];
    arr2.splice(ctr, 1);
    arr3.push(temp);
    ctr--;
  }
  if (arr3.length > 0) return arr3;
}
