export function randomArray(arr1) {
  let arr = arr1;
  let i = arr.indexOf("text");
  if (i > -1) {
    arr.splice(i, 1);
  }
  let ctr = arr.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  //   arr.sort(function () {
  //     return 0.5 - Math.random();
  //   });
  return arr;
}
export function randomArray2(arr) {
  let arr1 = JSON.parse(JSON.stringify(arr));
  let arr2 = arr1.filter((value) => value !== "text");
  let arr3 = [];
  let ctr, temp;
  while (ctr > 0) {
    ctr = Math.floor(Math.random() * arr2.length);
    temp = arr2[ctr];
    arr2.splice(ctr, 1);
    arr3.push(temp);
    ctr--;
  }
  if (arr3.length > 0) return arr3;
}
