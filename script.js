// recuperation des donnes 
// Récupérer l'élément input par son ID
let inputElement1 = document.querySelector('.input1');
let inputElement2 = document.querySelector('.input2');
let inputElement3 = document.querySelector('.input3');
let tableBody = document.querySelector('.tableBody');
let descriptInput = document.getElementById('exampleFormControlTextarea1');
let statutInput = document.querySelector('.input4');
let OptionValueSelect = document.querySelector('.valueOptionSelect');
let submitBtn = document.querySelector('.boutton_submit');
const btnEdit = document.querySelector('#boutton_edit');
let statut = document.getElementById('statut');
let descriptSet = document.getElementById('decript_set');
let tableau_info = document.querySelector('#info_modal');

// initialisation des valeurs du statut
let id = 0;
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
  else if (object.statut === 'nouveau') {
    debut++
  }
  tableau.push({ ...object })

  // ===============Ajouter mon tableau d'objet dans le localstorage=======================
  localStorage.setItem('table', JSON.stringify(tableau))

  addTask();
  createChart();
})

// ===============Recuperer les elements du localstorage=======================
let geTtableau = JSON.parse(localStorage.getItem('table'))




// Ajouter la description
const showDescription = () => {
  const trRows = document.querySelectorAll('.ligne');
  for (let i = 0; i < trRows.length; i++) {
    let trRow = trRows[i];
    trRow.addEventListener('click', () => {
      const rowId = +trRow.children[0].textContent;
      const clickedRowData = tableau.find((el, sofi) => sofi == rowId - 1)
      descriptSet.textContent = clickedRowData.description
    })
  }
}

// =============== creation tr tache ===============
const addTask = () => {
  // console.log(tableau);
  tableBody.innerHTML = ''
  tableau.forEach((element, y) => {
    tableBody.innerHTML += `
    <tr class='ligne'>
      <td>${y + 1}</td>
      <td>${element.date}</td>
      <td>${element.titre}</td>
      <td>${element.catego}</td>
      <td>
        <box-icon name='trash' onclick = 'event.stopPropagation(); deleteTask(${element.id})' id='trash' class='bg-danger' type='button'></box-icon> 
        <box-icon name='show' id='show'  onclick = 'event.stopPropagation(); displayTask(this)'  class='bg-secondary'></box-icon>
        <box-icon name='pencil' id='edit'  onclick = 'event.stopPropagation(); editTask(${element.id}) '  class='bg-primary' ></box-icon>
      </td>
    </tr>
    `
  });
  
  showDescription()
}

//condition pour verifier les si le geTtableau exite dans le localstorage 
// si oui tableau recoit geTtableau
if (geTtableau) {
  tableau = geTtableau
  addTask();
}

// =============== creation js chart ===============
const ctx = document.getElementById('myChart');
let myNewChart;

// =============== function pour mettre à jour la charte ===============
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
  const chartData = JSON.stringify(myNewChart);
  localStorage.setItem('chartData', chartData);

  myNewChart.update();

}

// ===============recuperer  ma charte du localstorage=======================


// =============== Configuration crud ===============================
// =====================delete task========================================
const deleteTask = (event) => {
  supprimerElementParId(event);
  addTask();
}

// ===============affichage des taches=============================
const displayTask = (event,) => {
  let tableau_info = document.querySelector('#info_modal');
  console.log(tableau_info);

  tableau.forEach(element => {
    tableau.innerHTML = ''
    console.log(tableau);
    tableau_info.innerHTML =
      `
    <table class="table-info-td d-flex justify-content-center border border-2 di" >
        <h4 class="bg-primary d-flex justify-content-center">Information tache</h4>
        <!-- date -->
        <tr>
            <td>Date :</td>
            <td>${element.date}</td>
        </tr>
        <!-- Titre -->
        <tr>
            <td>Titre:</td>
            <td>${element.titre}</td>
        </tr>
         <!-- categorie -->
        <tr>
            <td>Categorie :</td>
            <td>${element.catego}</td>
        </tr>
         <!-- description -->
        <tr>
            <td>Description :</td>
            <td>${element.description}</td>
        </tr>
         <!-- statut -->
        <tr>
            <td>Statut :</td>
            <td>${element.statut}</td>
        </tr>
       
    </table>
  `
    tableau_info.style.display = 'block';
  });
}

// =============== fonction pour modifier une tache ajoutée ===============
const editTask = (event,) => {
  let taskIndex = event;
  console.log(taskIndex);
  submitBtn.style.display = 'none';
  tableau.forEach(element => {
    inputElement1.value = element.catego;
    inputElement2.value = element.titre;
    inputElement3.value = element.date;
    descriptInput.value = element.description;
    setSelectedOption(element.statut);
    createChart();
  });
  submitBtn.style.display = 'none';
  btnEdit.style.display = 'block';

  // =============== fonction pour soumettre le formulaire ===============
  btnEdit.addEventListener('click', function () {

    let nouvellesDonnees = { catego: inputElement1.value, date: inputElement3.value, description: descriptInput.value, titre: inputElement2.value, statut: statut.value };
    mettreAJourDonneesParId(taskIndex, nouvellesDonnees);
    addTask()
    inputElement1.value = ''
    inputElement2.value = ''
    inputElement3.value = ''
    descriptInput.value = ''
    createChart();
    submitBtn.style.display = 'block';
    btnEdit.style.display = 'none';
  });
}
btnEdit.style.display = 'none';

// Fonction pour mettre à jour les données en fonction de l'id
function mettreAJourDonneesParId(idRecherche, nouvellesDonnees) {
  // Étape 1 : Trouver l'index de l'élément avec l'id spécifique
  const indexElement = tableau.findIndex(element => element.id === idRecherche);

  // Étape 2 : Mettre à jour les données de cet élément
  if (indexElement !== -1) {
    tableau[indexElement] = { ...tableau[indexElement], ...nouvellesDonnees };
    // Utilisation de l'opérateur de propagation (...) pour fusionner les anciennes et nouvelles données
    // Vous pouvez également mettre à jour spécifiquement les propriétés nécessaires selon vos besoins.
  } else {
    console.log("Aucun élément trouvé avec l'id spécifié.");
  }
}

// Fonction pour supprimer un élément en fonction de l'id
function supprimerElementParId(idASupprimer) {
  // Utilisez la méthode filter pour créer un nouveau tableau sans l'élément à supprimer
  tableau = tableau.filter(element => element.id !== idASupprimer);
}

// =============== fonction pour faire disparaitre le modal d'information ===============
document.addEventListener('mouseup', function (e) {
  let tableau_info = document.querySelector('#info_modal');
  let container = document.querySelector('.container-md');
  if (container.contains(e.target)) {
    tableau_info.style.display = 'none';
  }
});

// Fonction pour définir l'option sélectionnée en fonction de la valeur
function setSelectedOption(value) {
  var selectElement = document.getElementById('statut');
  for (var i = 0; i < selectElement.options.length; i++) {
    var option = selectElement.options[i];
    if (option.value === value) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  }
}



/* const tab = [
  {
    id : 0,
    nom : 'sofy'
  }
]

localStorage.setItem('tab', JSON.stringify(tab))
let getString =  JSON.parse(localStorage.getItem('tab'))
console.log( getString); */
