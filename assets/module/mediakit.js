document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with the "updatable" class
    const updatableElements = document.querySelectorAll('.updatable');
    
    // Process each element
    updatableElements.forEach(function(element) {
        const elementId = element.id;
        
        // Skip elements without ID
        if (!elementId) return;
        
        // Check if there's a matching key in localStorage
        const storedValue = localStorage.getItem(elementId);
        
        // If value exists in localStorage, update the element
        if (storedValue) {
            // Handle different types of elements
            if (element.tagName === 'IMG') {
                // For images, update the src attribute
                element.src = storedValue;
            } else if (element.tagName === 'A') {
                // For links, update based on type
                if (elementId === 'email') {
                    // For email links
                    element.href = `mailto:${storedValue}`;
                    element.innerHTML = storedValue; // Also update the visible text
                } else if (elementId === 'phone') {
                    // For phone links
                    element.href = `tel:${storedValue}`;
                    element.innerHTML = storedValue; // Also update the visible text
                } else if (elementId.includes('link')) {
                    // For social media links, just update the href
                    element.href = storedValue;
                }
                // Make sure the link is visible
                element.style.display = '';
            } else {
                // For other elements, update the inner HTML
                element.innerHTML = storedValue;
            }
        } else if (element.tagName === 'A') {
            // Hide links if their ID doesn't exist in localStorage
            element.style.display = 'none';
        }
    });
    
    // Special handling for the background image
    const bgElement = document.querySelector('.bg_image--2');
    if (bgElement) {
        const bgImageUrl = localStorage.getItem('background-image');
        if (bgImageUrl) {
            bgElement.style.backgroundImage = `url(${bgImageUrl})`;
        }
    }
    
    // Handle values that need special treatment for odometer
    const odometerElements = document.querySelectorAll('.odometer');
    odometerElements.forEach(function(element) {
        const elementId = element.id;
        if (elementId && localStorage.getItem(elementId)) {
            // Extract numeric value for odometer elements
            const value = parseFloat(localStorage.getItem(elementId));
            if (!isNaN(value)) {
                element.setAttribute('data-count', value);
            }
        }
    });
    
    // Handle price elements
    ['price-1', 'price-2', 'price-3', 'price-4'].forEach(function(priceId) {
        const priceElement = document.getElementById(priceId);
        if (priceElement) {
            const priceValue = localStorage.getItem(priceId);
            if (priceValue) {
                console.log(priceValue);
                // Ensure we're just showing the price value, not any HTML
                priceElement.textContent = priceValue;
            }
        }
    });
    
    // Handle price divs visibility - hide if no price is set
    ['price-1-div', 'price-2-div', 'price-3-div', 'price-4-div'].forEach(function(divId) {
        const priceDiv = document.getElementById(divId);
        if (priceDiv) {
            // Extract the price number from the div id
            const priceNum = divId.split('-')[1];
            // Check if corresponding price name exists
            const priceName = localStorage.getItem(`price-${priceNum}-name`);
            
            if (!priceName) {
                // Hide the entire price card if no name is defined
                priceDiv.style.display = 'none';
            } else {
                // Make sure it's visible
                priceDiv.style.display = '';
            }
        }
    });
});