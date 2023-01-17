function introduce(strings, ...values) {
    console.log('strings', strings);
    console.log('values', values);
  
    return 'introduce...';
  }
  
  const name = 'Joe';
  const color = 'purple';
  let string1="merhaba"
  let dizi=[1,3,6]
let dizi2=[11,13,16]

let birleşim=[...dizi,...dizi2] //spread operator
console.log(birleşim)
  const mesaj2= introduce(string1,...dizi)//rest operator kullandık


  const message = introduce`Hello, I'm ${name} and ${color} is my favorite color!`;
  
  function introduce2(strings, ...values) {                                                        
    let msg = 
      `<span style="color:${values[1]}">
            Hello ${values[0]}, Have a Nice Day! We know your favorite color is <u>${values[1]}</u>
       </span>`;
 
    return msg;
 }

 
const name2 = 'Mert';
const color2 = 'Kırmızı';

const message2 = introduce2`Hello, I'm ${name2} and ${color2} is my favorite color!`;

console.log(message2);
 