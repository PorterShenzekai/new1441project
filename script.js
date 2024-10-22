/*porter*/
// New function: Delete stored username and password  
function deleteCredentials() {    
    localStorage.removeItem('username');    
    localStorage.removeItem('password');    
    // If you want, you can also delete the expiration time    
    localStorage.removeItem('expiration');    
    
    alert('Credentials deleted successfully!');    
    // Additional logic can be added here as needed, such as redirecting to the login page
//For example: window. location. ref='login. html';
//Get button elements
var deleteCredentialsButton = document.getElementById('deleteCredentialsButton');  
  
// Add a click event listener to the button  
deleteCredentialsButton.addEventListener('click', deleteCredentials);  
}  
  
  
function createUser() {    
    var username = document.getElementById('username').value;  
    var password = document.getElementById('password').value;  
  
    
    // Simple client verification    
    if (username === '' || password === '') {    
        alert('Please fill in both username and password.');    
        return;    
    }    
    
    // Assuming successful verification, store username and password    
    localStorage.setItem('username', username);    
    localStorage.setItem('password', password);    
    // Set expiration time (only storing timestamps here, additional logic is needed to check for expiration)    
    localStorage.setItem('expiration', new Date().getTime() + 2 * 24 * 60 * 60 * 1000); // Expires in 2 days    
    
    // Prompt the user for successful registration and redirect to the login page (if necessary)    
    alert('Registration successful!');    
    window.location.href = 'login.html'; // Assuming you have a login.HTML as the login page    
}
function login() {  
    var loginUsername = document.getElementById('loginUsername').value;  
    var loginPassword = document.getElementById('loginPassword').value;  
  
    // Attempt to obtain username and password from localStorage 
    var storedUsername = localStorage.getItem('username');  
    var storedPassword = localStorage.getItem('password');  
    var expiration = localStorage.getItem('expiration');  
  
    // Check if the username and password have been set and have not expired 
    if (expiration && new Date().getTime() < parseInt(expiration)) {  
        // If the user has not entered a username and password, and the username and password are remembered and have not expired, attempt automatic login  
        if (loginUsername === '' && loginPassword === '') {  
            if (storedUsername && storedPassword) {  
                // This is just a simulation of the client, and there will be server verification in real applications  
                alert('Auto login successful!');  
                // Jump to shopping page  
                window.location.href = 'shopping.html';  
                return;  
            }  
        }  
    }  
  
    // The username or password is empty, expired, or manually entered by the user  
    if (loginUsername !== '' && loginPassword !== '') {  
        // The username and password have been entered, perform login verification  
        if (loginUsername === storedUsername && loginPassword === storedPassword) {  
            alert('Login successful!');  
            // Jump to shopping page  
            window.location.href = 'shopping.html';  
        } else {  
            alert('Incorrect username or password!');  
        }  
    } else {  
        alert('Please fill in both username and password.');  
    }  
}

let cartData = [];
        let cartTotal = 0;

        function updateCartTotal() {
            cartTotal = cartData.reduce((acc, item) => acc + item.quantity * item.price, 0);
            $('#cart-total').text(cartTotal.toFixed(2));
        }

        function addToCart(productId, productName, productPrice, quantity) {
            let existingItem = cartData.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cartData.push({ id: productId, name: productName, price: productPrice, quantity: quantity });
            }
            updateCartItems();
            updateCartTotal();
        }

        function removeFromCart(productId) {
            cartData = cartData.filter(item => item.id !== productId);
            updateCartItems();
            updateCartTotal();
        }

        function updateCartItems() {
            let cartItemsHtml = cartData.map(item => `
                <li>
                    ${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-from-cart-item-btn" data-product-id="${item.id}">Remove</button>
                </li>`).join('');
            $('#cart-items').html(cartItemsHtml);
        }

        function clearCart() {
            cartData = [];
            updateCartItems();
            updateCartTotal();
        }

        $(document).ready(function() {
            $('.add-to-cart-btn').on('click', function() {
                let $this = $(this);
                let $productBox = $this.closest('.product-box');
                let productId = $productBox.data('product-id');
                let productName = $productBox.data('product-name');
                let productPrice = parseFloat($productBox.data('product-price'));
                let quantity = parseInt($productBox.find('.quantity-input').val(), 10);

                if (quantity > 0) {
                    addToCart(productId, productName, productPrice, quantity);
                    $productBox.find('.quantity-input').val(0); 
                }
            });

            $('#checkout').on('click', function() {
                if (cartData.length > 0) {
                    alert('Checkout process simulated. Total: $' + cartTotal.toFixed(2));
                } else {
                    alert('Cart is empty.');
                }
            });

            $('#cart').on('click', '.remove-from-cart-item-btn', function() {
                let productId = $(this).data('product-id');
                removeFromCart(productId);
            });

            $('#clear-cart').on('click', function() {
                clearCart();
            });
        });

        document.getElementById('myForm').addEventListener('submit', function(event) {  
            var formValid = true;  
            // Find all input elements with the required attribute  
            var requiredFields = document.querySelectorAll('input[required], textarea[required]');  
          
            requiredFields.forEach(function(field) {  
                if (!field.value.trim()) { // Check if the field value (after removing spaces before and after) is empty 
                    alert('表单不能为空');  
                    formValid = false;  
                    event.preventDefault(); // Block form submission  
                    field.focus(); // Move focus to unfilled fields  
                    return false; // Break out of the loop  
                }  
            });  
          
            if (formValid) {  
                alert('表单提交成功');  
            }  
        });  