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

let tableau = [];

  let object = {
    id: '',
    catego: '',
    date: '',
    description: '',
    statut: '',
    titre :''
  }
  // tableau.push(object)
  console.log("tab l23",tableau);

  localStorage.setItem('tab',JSON.stringify(tableau));


let tableau2= []
let id = 0
let terminer =0
let debut =0
let moyen =0

// =============== Ajouter une tache ===============
submitBtn.addEventListener('click', (e) =>{	
e.preventDefault();
  object.id = id++
  object.catego = inputElement1.value
  object.date = inputElement3.value
  object.description = descriptInput.value
  object.titre  = inputElement2.value
  object.statut = statut.value
// description des taches 
tableau.push(object);
console.log("tab l44",tableau);

if (object.statut === 'terminer') {
  terminer++
console.log(terminer);
}else if(object.statut === 'en-cours'){
  moyen++
}
else if(object.statut === 'en-cours'){
  moyen++
}
else if(object.statut === 'fini')
{
  debut++
}

// addTask();
createChart()
})
// =============== Ajouter une tache ===============
// =============== creation tr tache ===============

const addTask = () => {
  tableBody.innerHTML="";
	tableau.forEach((element) => {
		tableBody.innerHTML += `
    <tr>
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

    // tableBody.addEventListener('click', () => {
    //    descriptSet.innerHTML = object.description;
    //  object.description = descriptInput.value
      
    //  });

	}); 
	

}
// fonction delet

function deleteTask(index){

console.log(tableau);
}



// =============== creation js chart ===============
    // setup 
    const ctx = document.getElementById('myChart');
    let myNewChart;
    function createChart(){  
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
          display : false,
        },
       
      }
    }
    });
    
    myNewChart.update();
    
    }
    
   // =============== Configuration crud ===============
   