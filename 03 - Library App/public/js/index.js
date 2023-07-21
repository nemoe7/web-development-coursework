document.addEventListener("DOMContentLoaded", function (event) {

    /*
    DONE:   The code below attaches a `keyup` event to `#isbn` text field.
            The code checks if the current reference number entered by the user
            in the text field does not exist in the database.

            If the current reference number exists in the database:
            - `#isbn` text field background color turns to `#FFB4AB`
            - `#error` paragraph element displays an error message `ISBN already in
            the database`
            - `#submit` is disabled

            else if the current reference number does not exist in the
            database:
            - `#isbn` text field background color turns back to `#E3E3E3`
            - `#error` displays no error message
            - `#submit` is enabled
    */
    const isbnInput = document.querySelector('#isbn');
    isbnInput.addEventListener('input', function () {
        // your code here
        fetch(`/checkISBN?isbn=${isbnInput.value}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    isbnInput.style.backgroundColor = '#FFB4AB';
                    document.querySelector("#error").innerHTML = "ISBN already in the database";
                    document.querySelector("#submit").disabled = true;
                } else {
                    isbnInput.style.backgroundColor = '#E3E3E3';
                    document.querySelector("#error").innerHTML = "";
                    document.querySelector("#submit").disabled = false;
                }
            })
            .catch(err => err);
    });

    /*
    TODO:   The code below attaches a `click` event to `#submit` button.
            The code checks if all text fields are not empty. The code
            should communicate asynchronously with the server to save
            the information in the database.

            If at least one field is empty, the `#error` paragraph displays
            the error message `Fill up all fields.`

            If there are no errors, the new book should be displayed
            immediately, and without refreshing the page, after the values
            are saved in the database.

            The title, author, and ISBN fields are reset to empty
            values.
    */
    const submitBtn = document.querySelector('#submit');
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const form = document.querySelector("#book_form");

        const formData = new FormData(form);

        const title = formData.get("title");
        const author = formData.get("author");
        const isbn = formData.get("ISBN");

        if (title == "" || author == "" || isbn == "") {
            document.querySelector("#error").innerHTML = "Fill up all fields.";
        } else {
            document.querySelector("#error").innerHTML = "";
            form.reset();
            fetch('/books', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    title: title,
                    author: author,
                    isbn: isbn
                })
            })
            .then(response => response.text())
            .then(text => document.querySelector('#cards').innerHTML += text)
            .catch(err => console.error(err));
        }
    });

    /*
    TODO:   The code below attaches a `click` event to `.remove` buttons
            inside the `<div>` `#cards`.
            The code deletes the specific book associated to the
            specific `.remove` button, then removes the its parent `<div>` of
            class `.card`.
    */
    const cardsDiv = document.querySelector('#cards');
    cardsDiv.addEventListener('click', function (e) {
        if (e.target.matches('.remove')) {
            // your code here
            const cardDiv = e.target.closest('.card');
            const isbn = cardDiv.querySelector('.isbnLbl').innerHTML.substring(7);

            fetch(`/delete?isbn=${isbn}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            }).catch(error => {
                console.error('Error deleting book:', error);
            });
            cardDiv.remove();
        }
    }, true);

});