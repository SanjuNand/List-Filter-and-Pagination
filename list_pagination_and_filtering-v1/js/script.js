/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing





// store student list item elements in student list variable
// variable to store number of items per page

   const studentList = document.querySelectorAll('.student-item');
   const itemsPerPage = 10;

//Create a function to hide all of the items in the list except for the ten you want to show.
   const showPage = (list, page) => {
   const startIndex = (page * itemsPerPage ) - itemsPerPage;
   const endIndex = (page * itemsPerPage);

   for (let i = 0; i < list.length; i ++) {

      if(i >= startIndex && i <= endIndex) {
       list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
      }

   }

 };

//dynamically creatting the pagination div 
   const mainDiv = document.querySelector('.page');
   const paginationDiv = document.createElement('div');
     paginationDiv.className = 'pagination';
     mainDiv.appendChild(paginationDiv);

//function create, append, and add functionality to the pagination buttons.

   function appendPageLinks(list) {


     
      paginationDiv.innerHTML='';
      const totalPages = list.length / itemsPerPage;
      const ul = document.createElement('ul');
  
   

    for(let i = 0; i <totalPages; i += 1 ) {

      const li = document.createElement('li');
      let a = document.createElement('a');
         a.href = '#';
      const pageNum = a.textContent = i + 1;
         li.appendChild(a);
         ul.appendChild(li);
         paginationDiv.appendChild(ul);

         if (i === 0) {
          a.className = 'active';
      } 

    a.addEventListener('click', (e) => {
                
    for(let i = 0; i < ul.children.length; i ++) {

      ul.children[i].firstElementChild.className = '';

    }

      e.target.className = "active";
       showPage(studentList, pageNum);

      });
   
     }
  
  }







 //Exceeds - extra credit 



 //student search bar and button added dynamically
 

 //obtain parent  element
 const header = document.querySelector('.page-header');
 //create Div for search bar and button
 const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search'

  header.appendChild(searchDiv)

//create search bar for input
 const input = document.createElement('input');
  
  input.placeholder = "Search for students..."

  searchDiv.appendChild(input)
 

 // create search button
 const button = document.createElement('button');
  button.textContent = 'Search';

  searchDiv.appendChild(button);

 //function to preform search
 function performSearch(searchInput, names) {



  const searchItem = searchInput.value.toLowerCase();
  const listArr = [];
 

  for(let i = 0; i < names.length; i++) {
    const name = names[i].querySelector('h3').textContent;

    if(searchInput.value.length !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase()) ){
      names[i].style.display = 'block';
      listArr.push(names[i])
     
     }else {
       names[i].style.display = 'none';
      }
   } 

 //creating div for error message
   const errorDiv = document.createElement('div');
   const h2 = document.createElement('h2');
    errorDiv.appendChild(h2);
    mainDiv.appendChild(errorDiv);

//checking the listarr and set error message or pagination links as required
    if (listArr.length == 0) {
      paginationDiv.innerHTML='';
      errorDiv.textContent = 'no result found';
     }else {
      appendPageLinks(listArr);

   }
}



//button listener 
 button.addEventListener('click', (event) => {
  event.preventDefault();

        performSearch(input, studentList);
  
});

//input listener 
 input.addEventListener('keyup', () => {

      performSearch(input, studentList);

});




//calling the functions 
showPage(studentList, 1);

appendPageLinks(studentList);