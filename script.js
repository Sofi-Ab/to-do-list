// recuperation des donnes 
// Récupérer l'élément input par son ID
let inputElement1 = document.querySelector('.input1');
let inputElement2 = document.querySelector('.input2');
let inputElement3 = document.querySelector('.input3');
let tableBody = document.querySelector('.tableBody');
let descriptInput = document.getElementById('exampleFormControlTextarea1');
let statutInput = document.querySelector('.input4')
let submitBtn = document.querySelector('.btn');
let statut = document.getElementById('statut');
let descriptSet = document.getElementById('decript_set')

// initialisation des valeurs du statut
let id = 0
let terminer = 0
let debut = 0
let moyen = 0
// tableau des objets
let tableau = [];

let object = {
  id: '',
  catego: '',
  date: '',
  description: '',
  statut: '',
  titre: ''
}

// mettre les objets dans le tableau
// tableau.push(object)

// =============== soumettre le formulaire d'ajout de tache ===============
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  object.id = id++
  object.catego = inputElement1.value
  object.date = inputElement3.value
  object.description = descriptInput.value
  object.titre = inputElement2.value
  object.statut = statut.value

  inputElement1.value = ''
  inputElement2.value = ''
  descriptInput.value = ''
  inputElement3.value = ''
  statut.value = ''

  // description des taches 
  if (object.statut === 'terminer') {
    terminer++
    console.log(terminer);
  } else if (object.statut === 'en-cours') {
    moyen++
  }
  else if (object.statut === 'en-cours') {
    moyen++
  }
  else if (object.statut === 'fini') {
    debut++
  }
  tableau.push({...object})
  addTask();
  createChart();
  
})

// =============== creation tr tache ===============
const addTask = () => {

  console.log(tableau);
  tableBody.innerHTML = ''
  tableau.forEach((element) => {
    tableBody.innerHTML += `
    <tr class='ligne'>
		<td>${element.id}</td>
		<td>${element.date}</td>
		<td>${element.titre}</td>
		<td>${element.catego}</td>
		<td>
			<box-icon name='trash' onclick = 'deleteTask()' id='trash' class='bg-danger' type='button'></box-icon> 
			<box-icon name='show' id='show' class='bg-secondary'></box-icon>
			<box-icon name='pencil' id='pencil' class='bg-primary' ></box-icon>
		</td>
    </tr>
    `
    

    // founction pour faire afficher la description dans le contenaire description
    // tableBody.addEventListener('click', () => {
    // descriptSet.innerHTML = object.description;
    // object.description = descriptInput.value

    // });
  });
}

// =============== creation js chart ===============
const ctx = document.getElementById('myChart');
let myNewChart;

// =============== function ppour mettre à jour la charte ===============
function createChart() {
  if (myNewChart) {
    myNewChart.destroy();
  }
  myNewChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: 'taches',
        data: [debut, moyen, terminer],
        backgroundColor: ["red", "blue", "black"],
        borderWidth: 2
      }]
    },
    options: {
      cutout: 2,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },

      }
    }
  });

  myNewChart.update();

}

// =============== Configuration crud ===============
// fonction delete
function deleteTask() {

}

// ===============localstorage=======================
// Création d'un tableau
let tableauLocal = localStorage.setItem('tableauLocal', JSON.stringify(tableau));
const aStr = localStorage.getItem('tableauLocal');
console.log(aStr);
const a = JSON.parse(aStr)
console.log(a);



// ================ Recuperation de l'index ==================
// var table = document.querySelector(".table").querySelector('.tableBody');
// console.log(table);
// var rows = table.getElementsByTagName("tr");
// console.log(rows);
// // console.log(rows.length);
// for (var i = 0; i < rows.length; i++) {
//   rows[i].addEventListener("click", function () {
//     // Récupérer l'index de la ligne cliquée
//     console.log('heheheh');
//     var index = this.rowIndex;

//     // Afficher l'index dans la console (vous pouvez le manipuler comme vous le souhaitez)
//     console.log("Index de la ligne cliquée : " + index);
//   });
// }
// ================ Recuperation de l'index ==================
