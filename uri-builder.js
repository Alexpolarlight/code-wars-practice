// Create a basic UriBuilder object that will be used specifically to build
// query params on an existing URI. It should support a params property and a
// build method. It will handle the URL having pre-existing params that need
// to be managed. The URL must be properly encoded (i.e. "a b" should be encoded as "a%20b")

// Examples of how the builder will be used:
// var builder = new UriBuilder('http://www.codewars.com')
// builder.params.page = 1
// builder.params.language = 'javascript'

// // new builder instance to demonstrate pre-existing params.
// builder = new UriBuilder('http://www.codewars.com?page=1')

// builder.params.page = 2
// // should return 'http://www.codewars.com?page=2'
// builder.build()

// // if you delete params then they will disappear from the url string
// delete builder.params.page
// // should return 'http://www.codewars.com'
// builder.build()

// Note: For extra style points you can have your solution handle array values
// as query parameters, however there are no tests that explicitly test for them.

class UriBuilder {
  constructor(url) {
    var a = url.split('?'); // ['www.codewars.com', 'a=1&b=2&c=3']
    if (a.length>1) {
      var splitAnd = a[1].split('&'); // ['a=1','b=2','c=3']
      this.url = a[0];
      // fill in given params
      this.params = {};
      for (var i=0; i<splitAnd.length; i++) {
        var [key, value] = splitAnd[i].split('='); // ['a', '1'] destructuring assignment
        this.params[key] = value;
      }
    } else {
      this.url = url;
      this.params = {};
    }
  }

  build() {
    if (Object.keys(this.params).length > 0) {
      var arr = Object.keys(this.params); // {a:1, b:2} ==> ['a', 'b']
      var temp = [];
      for (var i=0; i<arr.length; i++) {
        temp.push(arr[i]+ '=' + encodeURI(this.params[arr[i]]));
      }
      return this.url + '?' + temp.join('&');
    } else {
      return this.url;
    }
  }
}

var {test} = require('tap')

// BEGIN TEST ----------------------
// SETUP
// EXAMPLE OF USER INPUT

test('2 params', t => {
  var builder = new UriBuilder('http://www.codewars.com')
  builder.params.page = 1
  builder.params.language = 'javascript'
  // RESULT
  t.equal(builder.build(), "http://www.codewars.com?page=1&language=javascript")
  t.end()
})
// END TEST -----------------------

test('simple', t => {
  // BEGIN TEST ----------------------
  // SETUP
  // EXAMPLE OF USER INPUT
  var builder1 = new UriBuilder('http://www.codewars.com')
  // RESULT
  t.equal(builder1.build(), "http://www.codewars.com")
  t.end()
  // END TEST -----------------------
})

test('two', t => {
  var builder2 = new UriBuilder('http://www.codewars.com');
  builder2.params.page=2;
  t.equal(builder2.build(), "http://www.codewars.com?page=2");
  t.end();
})

test('three', t => {
  var builder3 = new UriBuilder('http://www.codewars.com');
  builder3.params.page=2;
  delete builder3.params.page
  t.equal(builder3.build(), "http://www.codewars.com");
  t.end();
})

test('four', t => {
  var builder4 = new UriBuilder('http://www.codewars.com');
  builder4.params.page=2;
  builder4.params.language = 'javascript'
  delete builder4.params.page
  t.equal(builder4.build(), "http://www.codewars.com?language=javascript");
  t.end();
})

test('five', t => {
  var builder5 = new UriBuilder('http://www.codewars.com');
  builder5.params.language = 'ruby on rails'
  t.equal(builder5.build(), "http://www.codewars.com?language=ruby%20on%20rails");
  t.end();
})

test('six', t => {
  var builder6 = new UriBuilder('http://www.codewars.com');
  builder6.params.page = 'one hundred'
  t.equal(builder6.build(), "http://www.codewars.com?page=one%20hundred");
  t.end();
})


test('random', t => {
  // var builder5 = new UriBuilder('http://www.codewars.com');
  // var randomParamName = 't' + Date.now()
  // builder5.params[randomParamName] = 'test'
  // t.equal(builder5.build(), `http://www.codewars.com?${randomParamName}=test`);

  var params = {
    page: 1,
    language: 'javascript',
    animal: 'monkey',
    fruit: 'apples and bananas'
  }

  var arr = Object.keys(params) // [ 'page', 'language' ]
  console.log(params[arr[0]]); // 1
  console.log(params[arr[1]]) // javascript
  var out = '?'
  // var out = '?' + arr[0] + '=' + params[arr[0]] + '&' + arr[1] + '=' + params[arr[1]]
  var temp = []
  for (var i=0; i<arr.length; i++) {
    temp.push(arr[i] + '=' + encodeURI(params[arr[i]]))
  }
  out = out + temp.join('&')

  t.equal(out, '?page=1&language=javascript&animal=monkey&fruit=apples%20and%20bananas')
  t.end();
})

test('seven', t => {
  var builder7 = new UriBuilder('http://www.codewars.com');
  builder7.params.page = 1
  builder7.params.unknown = 'bananas'
  t.equal(builder7.build(), "http://www.codewars.com?page=1&unknown=bananas");
  t.end();
})

test('params { a:2, b:1 }', t => {
  var builder8 = new UriBuilder('http://www.codewars.com');
  builder8.params.a = 2;
  builder8.params.b = 1;
  t.equal(builder8.build(), "http://www.codewars.com?a=2&b=1");
  t.end();
})

test('params { a:2, b:1 }', t => {
  var builder9 = new UriBuilder('http://www.codewars.com?a=1');
  builder9.params.a = 2;
  t.equal(builder9.build(), "http://www.codewars.com?a=2");
  t.end();
})

test('params = {} but includes param in given url', t => {
  var builder9 = new UriBuilder('http://www.codewars.com?a=1');
  t.equal(builder9.params.a, '1');
  t.equal(builder9.build(), "http://www.codewars.com?a=1");
  t.end();
})

test('params = {} but includes more than one param in given url', t => {
  var builder10 = new UriBuilder('http://www.codewars.com?a=1&b=2');
  t.equal(builder10.params.a, '1');
  t.equal(builder10.params.b, '2');
  t.equal(builder10.build(), "http://www.codewars.com?a=1&b=2");
  t.end();
})

test('more params in given url', t => {
  var builder10 = new UriBuilder('http://www.codewars.com?a=1&b=2&c=50&bananas=pineapple');
  t.equal(builder10.params.a, '1');
  t.equal(builder10.params.b, '2');
  t.equal(builder10.params.c, '50');
  t.equal(builder10.params.bananas, 'pineapple');
  t.equal(builder10.build(), "http://www.codewars.com?a=1&b=2&c=50&bananas=pineapple");
  t.end();
})

test('change given query param to new value', t => {
  var builder10 = new UriBuilder('http://www.codewars.com?a=1&b=2&c=50&bananas=pineapple');
  builder10.params.c = '30';
  t.equal(builder10.params.a, '1');
  t.equal(builder10.params.b, '2');
  t.equal(builder10.params.c, '30');
  t.equal(builder10.params.bananas, 'pineapple');
  t.equal(builder10.build(), "http://www.codewars.com?a=1&b=2&c=30&bananas=pineapple");
  t.end();
})
