'use strict';

//Lấy DOM element
const findBtn = document.getElementById('find-btn');

//hiển thị toàn bộ dữ liệu thú cưng
renderTableData(petArr);
//gắn sự kiện tìm kiến thú cưng vào nút Find
findBtn.addEventListener('click', function(){
  //tạo mảng mới (trỏ 2 đối tượng khác nhau trong vùng nhớ heap) sau đó dọc dần các điều kiện thoả mãn thông qua các hàm if
  let petArrFind = petArr;
  //chọn ra những con pet có trong petArr chứa id tìm kiếm rồi cập nhật lại petArrFind
  if (id1.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(id1.value));//includes kiểm tra 1 chuỗi có tồn tại hay ko
  };
  //nhập vào name thì tìm theo name
  if (name1.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(name1.value));
  };
  //nếu chọn 1 trong 2 cái type
  if (type1.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === type1.value);
  };
  //nếu chọn 1 trong các Breed
  if (breed1.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breed1.value);
    //khi chọn loài thì giống của loài tương ứng sẽ được chọn
    renderBreed;
  };
  //nếu chọn vaccinated
  if (vaccinated1.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  };
  //nếu chọn Dewormed
  if (dewormed1.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  };
  //nếu chọn Sterilized
  if (sterilized1.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  };
  //hiển thị các thú cưng thoả mãn các điều kiện nhập vào
  renderTableData(petArrFind);
});

//hàm hiển thị toàn bộ thú cưng
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
      `;
    tbody.appendChild(row);
  });
};

// //C1: Hiển thị tất cả các thú cưng không phân biệt loài
// renderBreed();
// function renderBreed(){
//   breedArr.forEach(function(breedItem){
//     const option = document.createElement('option');
//     option.innerHTML = `${breedItem.breed}`;
//     breed1.appendChild(option);
//   });
// };


//C2: Nếu muốn hiển thị giống theo loài giêng
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

