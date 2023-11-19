'use strict';
console.log(petArr);  
//lấy DOM element

const sub1 = document.getElementById('submit-btn');
const form1 = document.getElementById('container-form');

//bắt sự kiện vào nút submit
sub1.addEventListener('click', function(){
  const data = {
    id: id1.value,
    name: name1.value,
    age: parseInt(age1.value),
    type: type1.value,
    weight: parseInt(weight1.value),
    length: parseInt(length1.value),
    color: color1.value,
    breed: breed1.value,
    vaccinated: vaccinated1.checked,
    dewormed: dewormed1.checked,
    sterilized: sterilized1.checked,
    bmi: "?",
  };
  console.log(data);

  //validate dữ liệu
  const validate = validateDate(data);
  if (validate) {
    //findIndex trả về vị trí Index mà phần tử đầu tiên thoả mãn điều kiện hay cập nhật lại đúng phần tử trong array vừa được chỉnh sửa
    const index = petArr.findIndex((pet) => pet.id === data.id);
    console.log(index);
    //giữ ngày thêm thú cưng
    data.date = petArr[index].date;
    //cập nhật dữ liệu thú cưng đó
    petArr[index] = data;
    //hiển thị danh sách thú cưng
    renderTableData(petArr);
    //lưu danh sách thú cưng vào localStorage
    saveToStorage('petArr', petArr);
    //ẩn form chỉnh sửa thông tin
    form1.classList.add('hide');
    //xoá các dữ liệu nhập trong Form đầu vào
    clearInput();
  }
});

//hàm điều kiện dữ liệu đầu vào thoả mãn
function validateDate (data) {
  //khai báo biến cờ hiệu
  let isValidate = true;
  
  //name không được trống
  if(data.name.trim().length === 0) {
    alert('Your pet does not have a name?');
    isValidate = false;
  }
  //tuổi là số, trong khoảng 1-15
  if(isNaN(data.age) || data.age < 1 || data.age > 15){
    alert(`Please input your pet's age between 1 and 15!`)
    isValidate = false;
  }
  //chọn chó hoặc mèo
  if (data.type === "Select Type") {
    alert(`Please select your pet's Type`);
    isValidate = false;
  }
  //cân nặng là số, trong khoảng 1-15
  if(isNaN(data.weight) || data.weight < 1 || data.weight > 15){
    alert(`Please input your pet's weight between 1 and 15!`)
    isValidate = false;
  }
  //chiều dài là số, trong khoảng 10-100
  if(isNaN(data.length) || data.length < 10 || data.length > 100){
    alert(`Please input your pet's length between 10 and 100!`)
    isValidate = false;
  }
  //yêu cầu chọn giống vật nuôi
  if (data.breed === "Select Breed") {
    alert(`Please select your pet's Breed`);
    isValidate = false;
  }
  return isValidate;
};

//hiển thị danh sách thú cưng
renderTableData(petArr);
function renderTableData(petArr) {
  tbody.innerHTML = "";
  //mỗi thú cưng tạo 1 hàng dữ liệu trên bảng
  petArr.forEach((pet) => {
    //chuyển đổi dữ liệu petArr từ sting sang array
    const petTime = new Date(pet.date);
    const row = document.createElement('tr');
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td><i class="bi bi-square-fill" style="color: ${pet.color}"></i></td>
      <td><i class="bi ${pet.vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td><i class="bi ${pet.dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td><i class="bi ${pet.sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
      <td>${petTime.getDate()}/${petTime.getMonth()}/${petTime.getFullYear()}</td>
      <td><button class="btn btn-danger" style="background-color:#FCAF45; color: #000000" onclick="editPet('${pet.id }')">Edit</button></td>
      `;
    tbody.appendChild(row);
  });
}

//xoá dữ liệu trên form nhập sau khi click submit
function clearInput() {
  id1.value = '';
  name1.value = '';
  age1.value = '';
  type1.value = 'Select Type';
  weight1.value = '';
  length1.value = '';
  color1.value = '#000000';
  breed1.value = 'Select Breed';
  vaccinated1.checked = false;
  dewormed1.checked = false;
  sterilized1.checked = false;
};

//chỉnh sửa dữ liệu sau khi bấm edit
function editPet(id) {
  //hiện lại form nhập dữ liệu
  form1.classList.remove('hide');
  //tìm đến dữ liệu cần được chỉnh sửa
  const pet = petArr.find((petInfor) => petInfor.id === id);//find: tìm thú cưng có id được truyền vào
  console.log(pet);
  //hiển thị những thông tin của thú cưng trên form nhập
  id1.value = id;
  name1.value = pet.name;
  age1.value = pet.age;
  type1.value = pet.type;
  weight1.value = pet.weight;
  length1.value = pet.length;
  color1.value = pet.value;
  breed1.value = '${pet.breed}';
  vaccinated1.checked = pet.vaccinated;
  dewormed1.checked = pet.dewormed;
  sterilized1.checked = pet.sterilized;
  //hiện thị đúng giống từng loại
  renderBreed();
  //hiển thi dữ liệu loại giống thú cưng
  breed1.value = `${pet.breed}`;
};

//gắn sư kiện hiển thị giống thú cưng theo loài
type1.addEventListener('click', renderBreed);
//hàm hiển thị giống thú cưng theo từng loại
function renderBreed() {
  //Khi chọn lại loài vật thì phần breed không bị lỗi trùng lặp
  breed1.innerHTML = "<option>Select Breed</option>";
  if (type1.value === "Dog") {
    //mảng chứa các giống chó
    const breedDogs = breedArr.filter((dogs) => dogs.type === "Dog");
    breedDogs.forEach(function (dogs){
      const option = document.createElement("option");
      option.innerHTML = `${dogs.breed}`;
      breed1.appendChild(option);
    });
  } else if (type1.value === "Cat") {
    //mảng chứa các giống mèo
    const breedCats = breedArr.filter((cats) => cats.type === "Cat");
    breedCats.forEach(function (cats){
      const option = document.createElement('option');
      option.innerHTML = `${cats.breed}`;
      breed1.appendChild(option);
    });
  }
};
