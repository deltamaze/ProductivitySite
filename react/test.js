/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
console.log('test quick javascript stuff');
const x = '13';
const a = x.includes(':');
let y = -1;
let z = -1;
if (a) {
  y = x.split(':')[0];
  z = x.split(':')[1];
} else {
  y = 0;
}
console.log(y);
