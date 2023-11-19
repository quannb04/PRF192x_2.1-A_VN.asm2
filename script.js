'use strict';

//bắt sự kiện vào nút submit
submit1.addEventListener('click', function() {
  const data = {
    id: id1.value,
    name: name1.value,
    age: parseInt(age1.value),//string convert into a number
    type: type1.value,
    weight: parseInt(weight1.value),
    length: parseInt(length1.value),
    breed: breed1.value,
    color: color1.value,
    vaccinated: vaccinated1.checked,
    dewormed: dewormed1.checked,
    sterilized: sterilized1.checked,
    date: new Date(),
    bmi: '?',
  };
  console.log(data);
  //khai báo biến kiểm tra dữ liệu
  const checkdata = validate(data);
  //nếu dữ liệu thoả mãn các điều kiện kiểm tra
  if (checkdata) {
    //thêm dữ liệu
    petArr.push(data);
    //hiển thị dữ liệu
    renderTableData(petArr);
    //lưu danh sách thú cưng vào LocalStorage
    saveToStorage('petArr', petArr);
    //xoá thông tin form nhập
    clear1();
  }
})

//hàm check dữ liệu
function validate (data) {
  let checkPet = true;
  //kiểm tra độ dài text nhập sau khi đã xoá dấu cách
  if(data.id.trim().length === 0) {
    alert('ID must unique!')
    checkPet = false;
  }
  //kiểm tra id có phải duy nhất hay không
  for (let i = 0; i < petArr.length; i++) {
    if(data.id === petArr[i].id) {
      alert('ID had exited, Please select another ID!');
      checkPet = false;
    }
  }
  //kiểm tra name được nhập dữ liệu hay chưa
  if(data.name.trim().length === 0) {
    alert('Name must input')
    checkPet = false;
  }
  //age phải là số, có giá trị trong khoảng 1 và 15
  if(isNaN(data.age) || data.age < 1 || data.age > 15) {
    alert('Age must be between 1 and 15')
    checkPet = false;
  }
  //chọn một loại
  if(data.type === 'Select Type') {
    alert('Please select Type!');
    checkPet = false;
  }
  //weight phải là số, trong khoảng 1 đến 20
  if(isNaN(data.weight) || data.weight < 1 || data.weight > 20) {
    alert('Weight must be between 1 and 20')
    checkPet = false;
  }
  //length phải là số, trong khoảng 10 đến 100
  if(isNaN(data.length) || data.length < 10 || data.length > 100) {
    alert('Length must be between 10 and 100')
    checkPet = false;
  }
  //chọn một giống
  if(data.breed === 'Select Breed') {
    alert('Please select Breed!');
    checkPet = false;
  }
  return checkPet;
}

renderTableData(petArr);
//hiển thị thông tin thú cưng lên màn hình
function renderTableData(petArr) {
  tbody.innerHTML = '';
  //mỗi thú cưng tạo 1 hàng dữ liệu trên bảng
  petArr.forEach((pet) => {
    //chuyển đổi dữ liệu pet.Date từ string sang object
    const petTime = new Date(pet.date);
    // console.log(petTime, typeof petTime);
    const row = document.createElement('tr')
    row.innerHTML = `
    <tr>
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
    <td>${pet.bmi}</td>
    <td>${petTime.getDate()}/${petTime.getMonth()}/${petTime.getFullYear()}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${pet.id}')">Delete</button></td>
    </tr>
    `
      tbody.appendChild(row);
  })
}

//xoá thông tin form nhập
function clear1() {
  id1.value = '';
  name1.value = '';
  age1.value = '';
  type1.value = 'Select Type';
  weight1.value = '';
  length1.value = '';
  color1.value = '';
  breed1.value = '';
  vaccinated1.checked = false;
  dewormed1.checked = false;
  sterilized1.checked = false;
}

//xoá một thú cưng
function deletePet(petId) {
  //hỏi lại một lần nữa
  const ask = confirm('Are you sure?');
  if(ask) {
    for (let i = 0; i < petArr.length; i++) {
      //lầm lượt kiểm tra xem id nào trùng với phần xoá
      if(petId === petArr[i].id) {
        petArr.splice(i, 1);
        //Cập nhật lại dữ liệu vào LocalStorage
        saveToStorage('petArr', petArr);
        //hiển thị lại bảng pet
        renderTableData(petArr);
        break;
      }
    }
  }
}

//Thú cưng khoẻ mạnh
let healthyCheck = true;
//gắn sự kiện vào nút show healthy pets
healthy.addEventListener('click', function() {
  let perArrHealthy = [];
  if(healthyCheck) {
    for (let i = 0; i < petArr.length; i++) {
      if(petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        perArrHealthy.push(petArr[i]);
      }
      //hiển thị các thú cưng khoẻ mạnh
      renderTableData(perArrHealthy);
    }
    healthy.textContent = 'Show All Pets'
    healthyCheck = false;
  } else {
    renderTableData(petArr);
    healthy.textContent = 'Show Healthy Pets'
    healthyCheck = true;
  }
})

//tính chỉ số BMI
//gắn sự kiện vào nút Calculate BMI
calculate.onclick = function() {
  for (let i = 0; i < petArr.length; i++) {
    petArr[i].bmi = petArr[i].type === 'Dog' ? 
    (petArr[i].weight*703 / petArr[i].length**2).toFixed(2) : 
    (petArr[i].weight*886 / petArr[i].length**2).toFixed(2)
  }
  renderTableData(petArr);
}

// bắt sự kiện khi chọn vào typeEl để hiển thị loại giống theo đúng loại Dog - Cat
type1.addEventListener('click',renderBreed);
function renderBreed () {
  ////Khi chọn lại loài vật thì phần breed không bị lỗi trùng lặp
  breed1.innerHTML = "<option>Select Breed</option>";
  if (type1.value === "Dog") {
    //lọc ra mảng chứa những giống chó
    const breedDogs = breedArr.filter((dogs) => dogs.type === "Dog");
    breedDogs.forEach(function (dogs){
      const option = document.createElement("option");
      option.innerHTML = `${dogs.breed}`;
      breed1.appendChild(option);
    });
  } else if (type1.value === "Cat") {
    //lọc ra mảng chứa những giống mèo
    const breedCats = breedArr.filter((cats) => cats.type === "Cat");
    breedCats.forEach(function (cats){
      const option = document.createElement('option');
      option.innerHTML = `${cats.breed}`;
      breed1.appendChild(option);
    });
  }
};

