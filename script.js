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
  tableau.forEach((element, y) => {
    tableBody.innerHTML += `
    <tr class='ligne'>
      <td>${y+1}</td>
      <td>${element.date}</td>
      <td>${element.titre}</td>
      <td>${element.catego}</td>
      <td>
        <box-icon name='trash' onclick = 'event.stopPropagation(); deleteTask(this)' id='trash' class='bg-danger' type='button'></box-icon> 
        <box-icon name='show' id='show'  onclick = 'event.stopPropagation(); displayTask(this)'  class='bg-secondary'></box-icon>
        <box-icon name='pencil' id='pencil'  onclick = 'event.stopPropagation();' class='bg-primary' ></box-icon>
      </td>
    </tr>
    `
  });
  showDescription()
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

// =============== Configuration crud ===============================
// =====================delete========================================

const deleteTask = (event) => {
  
let taskIndex = +event.parentElement.parentElement.children[0].textContent
console.log(taskIndex);
descriptSet.textContent = ""
tableau = tableau.filter((el, sofi) => sofi != taskIndex-1)
addTask();
}

// ===============affichage des taches=============================



const displayTask = (event, show) => {
 
 
  tableau.forEach(element => {
    let eyeIcone = document.getElementById('show')
    eyeIcone.innerHTML =`<div class="modal" tabindex="-1">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Information Tâche</h5>
          </div>
          <div class="modal-body">
              <table class="table table-borderless">
                  <thead>
                      <tr>
                          <th>Colonne 1</th>
                          <th>Colonne ${element.date}</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Donnée 1-1</td>
                          <td>Donnée ${element.titre}</td>
                      </tr>
                      <tr>
                          <td>Donnée 2-1</td>
                          <td>Donnée ${element.catego}</td>
                      </tr>
                      <!-- Ajoutez d'autres lignes selon vos besoins -->
                  </tbody>
              </table>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              <button type="button" class="btn btn-primary">Enregistrer</button>
          </div>
      </div>
  </div>
</div>
  `
  });
  
 }
console.log(displayTask);


// ===============localstorage=======================
// Création d'un tableau
let tableauLocal = localStorage.setItem('tableauLocal', JSON.stringify(tableau));
const aStr = localStorage.getItem('tableauLocal');
const a = JSON.parse(aStr)


// Ajouter la description
const showDescription = () => {
  const trRows = document.querySelectorAll('.ligne');
  for (let i = 0; i < trRows.length; i++) {
    let trRow = trRows[i];
    trRow.addEventListener('click', () => {
      const rowId = +trRow.children[0].textContent;
      const clickedRowData = tableau.find((el, sofi) => sofi ==rowId - 1)
      console.log(clickedRowData);
      descriptSet.textContent = clickedRowData.description
    })
  }
}


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
