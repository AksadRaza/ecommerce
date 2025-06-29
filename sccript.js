document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = () => {
        const menuItems = document.getElementById('MenuItems');
        menuItems.classList.toggle('active');
    }
    
    // Shopping Cart Toggle
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    const goToSlide = (slideIndex) => {
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
            dots[index].classList.toggle('active', index === slideIndex);
        });
        currentSlide = slideIndex;
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    };
    
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    };
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(dot => dot.addEventListener('click', resetInterval));
    
    // Product Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Quick View Modal
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            // In a real application, you would fetch product details based on productId
            // For demo, we'll use placeholder content
            const modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML = `
                <div class="modal-product-image">
                    <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80" alt="Product ${productId}">
                </div>
                <div class="modal-product-details">
                    <h3 class="modal-product-title">Product ${productId} Title</h3>
                    <div class="modal-product-price">$${(Math.random() * 100 + 20).toFixed(2)}</div>
                    <div class="modal-product-rating">
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <span class="review-count">(24 reviews)</span>
                    </div>
                    <p class="modal-product-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc eu nisl.
                    </p>
                    <div class="modal-product-options">
                        <h5 class="option-title">Size</h5>
                        <div class="size-options">
                            <span class="size-option">S</span>
                            <span class="size-option active">M</span>
                            <span class="size-option">L</span>
                            <span class="size-option">XL</span>
                        </div>
                        <h5 class="option-title">Color</h5>
                        <div class="color-options">
                            <span class="color-option" style="background-color: #ff6b6b;"></span>
                            <span class="color-option active" style="background-color: #794afa;"></span>
                            <span class="color-option" style="background-color: #28a745;"></span>
                        </div>
                    </div>
                    <div class="modal-product-actions">
                        <div class="quantity-selector">
                            <button class="quantity-btn minus">-</button>
                            <input type="text" class="quantity-input" value="1">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                </div>
            `;
            
            // Add event listeners to the new elements
            const sizeOptions = modalBody.querySelectorAll('.size-option');
            const colorOptions = modalBody.querySelectorAll('.color-option');
            const minusBtn = modalBody.querySelector('.minus');
            const plusBtn = modalBody.querySelector('.plus');
            const quantityInput = modalBody.querySelector('.quantity-input');
            
            sizeOptions.forEach(option => {
                option.addEventListener('click', () => {
                    sizeOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                });
            });
            
            colorOptions.forEach(option => {
                option.addEventListener('click', () => {
                    colorOptions.forEach(opt => opt.classList.remove('active'));
                    option.classList.add('active');
                });
            });
            
            minusBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value);
                if (value > 1) {
                    quantityInput.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let value = parseInt(quantityInput.value);
                quantityInput.value = value + 1;
            });
            
            quickViewModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    modalOverlay.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Wishlist Functionality
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    const wishlistCount = document.querySelector('#wishlistCount span');
    let wishlistItems = 0;
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                wishlistItems++;
            } else {
                wishlistItems--;
            }
            wishlistCount.textContent = wishlistItems;
            
            // Show confirmation message
            const message = button.classList.contains('active') ? 'Added to wishlist' : 'Removed from wishlist';
            showToast(message);
        });
    });
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('#cartCount span');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Get product details
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h4 a').textContent;
            const productPrice = productCard.querySelector('.discounted-price').textContent;
            const productImage = productCard.querySelector('img').src;
            
            // Add to cart sidebar
            const emptyCart = document.querySelector('.empty-cart');
            if (emptyCart) emptyCart.style.display = 'none';
            
            const cartItemsContainer = document.querySelector('.cart-items');
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="${productImage}" alt="${productName}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${productName}</h4>
                    <div class="cart-item-price">${productPrice}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <span class="quantity">1</span>
                        <button class="quantity-btn plus">+</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
            
            // Update cart total
            updateCartTotal();
            
            // Show confirmation message
            showToast(`${productName} added to cart`);
            
            // Add event listeners to the new cart item
            const minusBtn = cartItem.querySelector('.minus');
            const plusBtn = cartItem.querySelector('.plus');
            const removeBtn = cartItem.querySelector('.remove-item');
            const quantitySpan = cartItem.querySelector('.quantity');
            
            minusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                if (quantity > 1) {
                    quantitySpan.textContent = quantity - 1;
                    updateCartTotal();
                }
            });
            
            plusBtn.addEventListener('click', () => {
                let quantity = parseInt(quantitySpan.textContent);
                quantitySpan.textContent = quantity + 1;
                updateCartTotal();
            });
            
            removeBtn.addEventListener('click', () => {
                cartItem.remove();
                cartItems--;
                cartCount.textContent = cartItems;
                updateCartTotal();
                
                if (cartItems === 0) {
                    const emptyCart = document.querySelector('.empty-cart');
                    if (emptyCart) emptyCart.style.display = 'flex';
                }
            });
        });
    });
    
    // Update Cart Total
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity').textContent);
            total += price * quantity;
        });
        
        document.querySelector('.total-price').textContent = `$${total.toFixed(2)}`;
    }
    
    // Compare Products
    const compareButtons = document.querySelectorAll('.compare-btn');
    const compareModal = document.querySelector('.compare-modal');
    let compareProducts = [];
    
    compareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            
            if (button.classList.contains('active')) {
                // Remove from compare
                button.classList.remove('active');
                compareProducts = compareProducts.filter(id => id !== productId);
            } else {
                // Add to compare
                if (compareProducts.length >= 3) {
                    showToast('You can compare up to 3 products');
                    return;
                }
                button.classList.add('active');
                compareProducts.push(productId);
            }
            
            // Update compare modal if it's open
            if (compareModal.classList.contains('active')) {
                renderCompareTable();
            }
        });
    });
    
    // Show Compare Modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('compare-icon') || 
            (e.target.closest('.compare-icon'))) {
            e.preventDefault();
            if (compareProducts.length === 0) {
                showToast('Please select products to compare');
                return;
            }
            renderCompareTable();
            compareModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    function renderCompareTable() {
        const compareTable = document.querySelector('.compare-table');
        compareTable.innerHTML = '';
        
        // Create table header
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Features</th>';
        
        compareProducts.forEach((productId, index) => {
            headerRow.innerHTML += `
                <th>
                    <div class="compare-product">
                        <div class="compare-product-image">
                            <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80" alt="Product ${productId}">
                        </div>
                        <h5 class="compare-product-title">Product ${productId} Title</h5>
                        <div class="compare-product-price">$${(Math.random() * 100 + 20).toFixed(2)}</div>
                        <a href="#" class="remove-compare" data-product="${productId}">Remove</a>
                    </div>
                </th>
            `;
        });
        
        compareTable.appendChild(headerRow);
        
        // Add comparison rows
        const features = [
            'Brand', 'Material', 'Color', 'Size', 'Weight', 'Warranty', 
            'Rating', 'Price', 'Availability', 'Description'
        ];
        
        features.forEach(feature => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="compare-attribute">${feature}</td>`;
            
            compareProducts.forEach(productId => {
                let value = '';
                switch(feature) {
                    case 'Brand':
                        value = ['AKSAD', 'Premium', 'Elite'][Math.floor(Math.random() * 3)];
                        break;
                    case 'Material':
                        value = ['Cotton', 'Polyester', 'Leather', 'Silk'][Math.floor(Math.random() * 4)];
                        break;
                    case 'Color':
                        value = ['Red', 'Blue', 'Black', 'White'][Math.floor(Math.random() * 4)];
                        break;
                    case 'Size':
                        value = ['S', 'M', 'L', 'XL'][Math.floor(Math.random() * 4)];
                        break;
                    case 'Weight':
                        value = `${(Math.random() * 2 + 0.5).toFixed(1)} kg`;
                        break;
                    case 'Warranty':
                        value = `${Math.floor(Math.random() * 3) + 1} year${Math.floor(Math.random() * 3) + 1 > 1 ? 's' : ''}`;
                        break;
                    case 'Rating':
                        const stars = Math.floor(Math.random() * 3) + 3;
                        value = `${'★'.repeat(stars)}${'☆'.repeat(5 - stars)} (${Math.floor(Math.random() * 50)})`;
                        break;
                    case 'Price':
                        value = `$${(Math.random() * 100 + 20).toFixed(2)}`;
                        break;
                    case 'Availability':
                        value = ['In Stock', 'Limited Stock', 'Pre-order'][Math.floor(Math.random() * 3)];
                        break;
                    case 'Description':
                        value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
                        break;
                }
                
                row.innerHTML += `<td>${value}</td>`;
            });
            
            compareTable.appendChild(row);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-compare').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = button.getAttribute('data-product');
                compareProducts = compareProducts.filter(id => id !== productId);
                
                // Update compare buttons
                document.querySelectorAll(`.compare-btn[data-product="${productId}"]`).forEach(btn => {
                    btn.classList.remove('active');
                });
                
                if (compareProducts.length === 0) {
                    compareModal.classList.remove('active');
                    modalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    renderCompareTable();
                }
            });
        });
    }
    
    // Toast Notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Loading Spinner
    const loadingSpinner = document.querySelector('.loading-spinner');
    
    // Show spinner (for demo purposes)
    loadingSpinner.classList.add('active');
    
    setTimeout(() => {
        loadingSpinner.classList.remove('active');
    }, 1500);
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        // In a real application, you would send this to your backend
        console.log('Subscribed with email:', email);
        showToast('Thanks for subscribing!');
        newsletterForm.reset();
    });
    
    // Initialize cart and wishlist counts
    cartCount.textContent = cartItems;
    wishlistCount.textContent = wishlistItems;
});

// Make menuToggle function available globally
function menutoggle() {
    const menuItems = document.getElementById('MenuItems');
    menuItems.classList.toggle('active');
}