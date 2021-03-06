// You need to write a function that reverses the words in a given string. A
// word can also fit an empty string. If this is not clear enough, here are
// some examples:
// reverse('Hello World') === 'World Hello'
// reverse('Hi There.') === 'There. Hi'

function reverse(string) {
  var stringArr = string.split(' ');
  var output = [];
  for (var i=stringArr.length-1; i>=0; i--) {
    output.push(stringArr[i]);
  }
  return output.join(' ');
}
console.log(reverse('Hello World'), '|', 'World Hello');

function reverse1(string) {
  return string.split(' ').reverse().join(' ');
}
console.log(reverse1('Hello World'), '|', 'World Hello');
