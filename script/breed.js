'use strict';

//lấy DOM element
const breedEl = document.getElementById('input-breed');
const typeEl = document.getElementById('input-type');
const subEl = document.getElementById('submit-btn');
const tbodyEL = document.getElementById('tbody');


//bắt sự kiện vào nút submit
subEl.addEventListener('click', function(){
  const data = {
    breed: breedEl.value,
    type: typeEl.value,
  };

  //validate dữ liệu
  const validate = validateDate(data);
  if (validate) {
    //thêm thú cưng vào danh sách
    breedArr.push(data);
    //hiển thị danh sách thú cưng
    renderBreedTable(breedArr);
    //lưu danh sách thú cưng vào localStorage
    saveToStorage('breedArr', breedArr);
    //xoá các dữ liệu nhập trong Form đầu vào
    clearInput();
  }
});

//dữ liệu đầu vào thoả mãn các điều kiện
function validateDate (data) {
  //khai báo biến cờ hiệu
  let isValidate = true;
  //yêu cầu chọn giống
  if (breedEl.value.trim().length === 0) {
    alert(`Please input your pet's Breed`);
    isValidate = false;
  }
  //yêu cầu chọn loài vật
  if (data.type === "Select Type") {
    alert(`Please select Type!`);
    isValidate = false;
  }
  return isValidate;
};

//hàm hiển thị danh sách thú cưng
renderBreedTable(breedArr);
function renderBreedTable(breedArr) {
  tbodyEL.innerHTML = "";
  //mỗi thú cưng tạo 1 hàng dữ liệu trên bảng
  breedArr.forEach(function(pet, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td scope="col">${index + 1}</td>
      <td scope="col">${pet.breed}</td>
      <td scope="col">${pet.type}</td>
      <td><button scope=""col type= "button" class="btn btn-danger" onclick="deleteBreed('${pet.breed}')">Delete</button></td>
      `;
    tbodyEL.appendChild(row);
  });
}

//xoá dữ liệu trên form khi bấm submit
function clearInput() {
  breedEl.value = "";
  typeEl.value = "Select Type";
};

// -------Xoá dữ liệu pet khi click Delete
function deleteBreed(breed) {
  const isDelete = confirm('Are you sure !');
  if (isDelete) {
    for (let i = 0; i < breedArr.length; i++){
      if (breed === breedArr[i].breed){
        //xoá khỏi mảng
        breedArr.splice(i, 1);
        //cập nhật lại dữ liệu dưới local storage
        saveToStorage("breedArr", breedArr);
        //gọi lại hàm hiển thị
        renderBreedTable(breedArr);
        break;
      }
    }
  }
};

