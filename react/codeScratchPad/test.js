/* eslint-disable no-console */
const input = '156 178 165 171 187';
const splitInput = input.split(' ');

let count = 0;
let sum = 0;

splitInput.forEach((number) => {
    count += 1;
    sum += parseInt(number, 10);
});

const result = sum / count;
console.log(parseInt(result, 10));
// 171
