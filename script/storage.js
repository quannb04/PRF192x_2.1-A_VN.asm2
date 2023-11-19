'use strict';

//Bổ sung Animation cho Sidebar
const sideBar = document.getElementById('sidebar');
//bắt sự kiện vào nút click
sideBar.addEventListener('click', function() {
  this.classList.toggle('active');
})

//lấy DOM element
const id1 = document.getElementById('input-id');
const name1 = document.getElementById('input-name');
const age1 = document.getElementById('input-age');
const type1 = document.getElementById('input-type');
const weight1 = document.getElementById('input-weight');
const length1 = document.getElementById('input-length');
const color1 = document.getElementById('input-color-1');
const breed1 = document.getElementById('input-breed');
const vaccinated1 = document.getElementById('input-vaccinated');
const dewormed1 = document.getElementById('input-dewormed');
const sterilized1 = document.getElementById('input-sterilized');

const submit1 = document.getElementById('submit-btn');
const tbody = document.getElementById('tbody');
const healthy = document.getElementById('healthy-btn');
const calculate = document.getElementById('calculate-btn');

//khai báo 4 biến mẫu data cho tab Home
const data1 = {
  id: 'P001',
  name: 'Tom',
  age: 3,
  type: 'Cat',
  weight: 5,
  length: 50,
  breed: 'Tabby',
  color: 'red',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 3, 1),
  bmi: '?',
}
const data2 = {
  id: 'P002',
  name: 'Tyke',
  age: 5,
  type: 'Dog',
  weight: 3,
  length: 40,
  breed: 'Mixed Breed',
  color: 'green',
  vaccinated: false,
  dewormed: false,
  sterilized: false,
  date: new Date(2022, 3, 2),
  bmi: '?',
}
const data3 = {
  id: 'P003',
  name: 'Lucy',
  age: 6,
  type: 'Cat',
  weight: 2,
  length: 35,
  breed: 'Domestic Medium Hair',
  color: 'gray',
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(2022, 5, 2),
  bmi: '?',
}
const data4 = {
  id: 'P004',
  name: 'Mik',
  age: 7,
  type: 'Dog',
  weight: 15,
  length: 87,
  breed: 'Terrier',
  color: 'orange',
  vaccinated: true,
  dewormed: true,
  sterilized: false,
  date: new Date(2022, 7, 15),
  bmi: '?',
}
//khai báo 8 biến mẫu data cho tab Breed
const breeda = {
  breed: 'Tabby',
  type: 'Dog',
};
const breedb = {
  breed: 'Domestic Medium Hair',
  type: 'Cat',
};
const breedc = {
  breed: 'Mixed Breed',
  type: 'Cat',
};
const breedd = {
  breed: 'Domestic Short Hair',
  type: 'Cat',
};
const breede = {
  breed: 'Terrier',
  type: 'Dog',
};
const breedf = {
  breed: 'Greyhound',
  type: 'Dog',
};
const breedg = {
  breed: 'Persian',
  type: 'Cat',
};
const breedh = {
  breed: 'Rottweiler',
  type: 'Dog',
};
//kiểm tra biến petArr đã có giá trị gì chưa, nếu chưa thì bổ sung giá trị
const petArr = getFromStorage('petArr');
if(!getFromStorage('petArr')){
  saveToStorage('petArr', [data1, data2, data3, data4]);
};
console.log(typeof petArr, petArr, petArr.length);

//kiểm tra biến BreedArr đã có giá trị gì chưa, nếu chưa thì bổ sung giá trị
const breedArr = getFromStorage('breedArr');
if(!getFromStorage('breedArr')){
  saveToStorage('breedArr', [breeda, breedb, breedc, breedd, breede, breedf, breedg, breedh]);
};
console.log(typeof breedArr, breedArr, breedArr.length);


//Lưu dữ liệu vào LocalStorage
function saveToStorage(key, value) {
  //chuyển dạng array sang dạng string
  localStorage.setItem(key, JSON.stringify(value));
}
//lấy dữ liệu từ LocalStorage
function getFromStorage(key) {
  //chuyển dạng string sang dạng array
  return JSON.parse(localStorage.getItem(key));
}

