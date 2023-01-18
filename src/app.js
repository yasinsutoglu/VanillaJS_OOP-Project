//! Book Class : Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//!UI Class: Handle UI Tasks
class UI {
    static displayBooks(){
        const storedBooks = [{
            title: "misserables",
            author: "yaso",
            isbn: '35215234'
        }];

        const books = storedBooks;

        books.forEach((book)=> UI.addBookToList(book) )
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-primary btn-sm delete">X</a></td>
        `;

        list.appendChild(row)
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            //* el.closest("tr").remove(); --> alternative solution
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form)

        //vanish in 2 seconds
        setTimeout(()=>{
            document.querySelector('.alert').remove()
        }, 2000)
    }

    static clearFields(){
        document.querySelector("#title").value = "";
        document.querySelector('#author').value = '';
        document.querySelector("#isbn").value = "";
    }
}

//! Store Class: Handles Storage

//! Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

//!Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    e.preventDefault()

    //Get Form Values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector("#isbn").value;

    //Validate
    if(!title || !author || !isbn){
        UI.showAlert('Please fill in all fields' , 'warning')
    }else{
      //Instantiate Book
      const book = new Book(title, author, isbn);

      // Add Book to UI
      UI.addBookToList(book);

      //Show success message
      UI.showAlert('Book added!' , 'success')

      //clear form fields
      UI.clearFields();
      //* document.querySelector("#book-form").reset() --> alternative solution
    }    
})

//!Event: Remove a Book
document.querySelector('#book-list').addEventListener('click' , (e)=>{
  UI.deleteBook(e.target);
  //Show success message
  UI.showAlert("Book deleted!", "success");
})