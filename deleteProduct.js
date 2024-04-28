//Creates a function that sends data to the server to delete a product
function deleteProduct(id) {
    //Verifies that the user wants to delete the product and only continues if they say yes
    if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }    //Sends the product id to the /deleteProduct endpoint to handle the server side of deletion
    fetch(`/deleteProduct/${id}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Product deleted successfully');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function deleteProduct(id) {
    // Ask for confirmation and only proceed if user clicks "yes"
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) {
      return;
    }
  
    // Send the delete request to the server
    fetch(`/deleteProduct/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          alert('Product deleted successfully');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  

//Sets up an event listener to run the deleteProduct function when the delete button is clicked
const deleteButton = document.querySelectorAll('.delete-button');
deleteButton.forEach(button =>{
    button.addEventListener('click', () =>{
        //Gets the productId from the data from the form to run deleteProduct with the correct id
        const productId = button.dataset.productId;
        //Runs deleteProduct with the id from the previous line
        deleteProduct(productId);
    });

});

