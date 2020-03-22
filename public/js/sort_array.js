function sortARR(arr, indices) {
  var newArr = []
  for (var i = 0; i < arr.length; i++) {
    newArr.push(arr[indices[i]])
  }
  return newArr;

}
