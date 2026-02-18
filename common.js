/* ===================================
   Common Functions - Used across all pages
   =================================== */

const Common = {
    // Create Header
    createHeader() {
        return `
            <header class="header">
                <div class="container">
                    <div class="header-top">
                        <div>
                            <h1 class="logo">CHOICY</h1>
                            <p class="tagline">Save Your Reviews</p>
                        </div>
                    </div>
                    <div class="search-bar">
                        <input type="text" id="searchInput" placeholder="Search items, reviews, places...">
                        <button id="searchBtn">Search</button>
                    </div>
                </div>
            </header>
        `;
    },
    
    // Create Footer
    createFooter() {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-links">
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">FAQ</a>
                    </div>
                    <div class="footer-copyright">
                        © 2026 CHOICY - Review Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        `;
    },
    
    // Create Star Rating Display (non-interactive)
    createStars(rating, showNumber = true) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let starsHTML = '<div class="stars">';
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<span class="star filled">★</span>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<span class="star half">★</span>';
            } else {
                starsHTML += '<span class="star">★</span>';
            }
        }
        
        starsHTML += '</div>';
        
        if (showNumber) {
            starsHTML += ` <span class="rating-value">${rating}/5</span>`;
        }
        
        return starsHTML;
    },
    
    // Create Interactive Star Rating
    createInteractiveStars(containerId, currentRating = 0) {
        const $container = $(`#${containerId}`);
        let selectedRating = currentRating;
        
        let starsHTML = '<div class="stars interactive">';
        for (let i = 5; i >= 1; i--) {
            starsHTML += `<span class="star ${i <= currentRating ? 'filled' : ''}" data-rating="${i}">★</span>`;
        }
        starsHTML += '</div>';
        
        $container.html(starsHTML);
        
        // Handle hover
        $container.find('.star').on('mouseenter', function() {
            const rating = $(this).data('rating');
            $container.find('.star').each(function() {
                if ($(this).data('rating') <= rating) {
                    $(this).addClass('filled');
                } else {
                    $(this).removeClass('filled');
                }
            });
        });
        
        // Handle mouse leave
        $container.find('.stars').on('mouseleave', function() {
            $container.find('.star').each(function() {
                if ($(this).data('rating') <= selectedRating) {
                    $(this).addClass('filled');
                } else {
                    $(this).removeClass('filled');
                }
            });
        });
        
        // Handle click
        $container.find('.star').on('click', function() {
            selectedRating = $(this).data('rating');
            $container.data('rating', selectedRating);
            
            $container.find('.star').each(function() {
                if ($(this).data('rating') <= selectedRating) {
                    $(this).addClass('filled');
                } else {
                    $(this).removeClass('filled');
                }
            });
        });
        
        return $container;
    },

    // Validate Form
    validateForm(formData, requiredFields) {
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].toString().trim() === '') {
                this.showMessage(`השדה "${field}" הוא שדה חובה`, 'error');
                return false;
            }
        }
        return true;
    },
    
    // Show Message
    showMessage(message, type = 'success') {
        // Remove existing messages
        $('.message').remove();
        
        const messageClass = type === 'error' ? 'message-error' : 'message-success';
        const bgColor = type === 'error' ? '#f44336' : '#4CAF50';
        
        const messageHTML = `
            <div class="message ${messageClass}" style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: ${bgColor};
                color: white;
                padding: 15px 30px;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                font-weight: bold;
            ">
                ${message}
            </div>
        `;
        
        $('body').append(messageHTML);
        
        setTimeout(() => {
            $('.message').fadeOut(300, function() {
                $(this).remove();
            });
        }, 3000);
    },
    
    // Get URL Parameter
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    

    
    // Search Items
    searchItems(query, items) {
        query = query.toLowerCase().trim();
        if (!query) return items;
        
        return items.filter(item => {
            return item.name.toLowerCase().includes(query) ||
                   item.category.toLowerCase().includes(query) ||
                   item.location.toLowerCase().includes(query);
        });
    },
    
    
    // Filter Reviews
    filterReviews(reviews, filterBy) {
        if (!filterBy || filterBy === 'all') return reviews;
        
        const rating = parseInt(filterBy);
        return reviews.filter(review => review.rating === rating);
    },
    
    // Sort Reviews
    sortReviews(reviews, sortBy) {
        const reviewsCopy = [...reviews];
        
        switch(sortBy) {
            case 'date-new':
                return reviewsCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            case 'date-old':
                return reviewsCopy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            case 'rating-high':
                return reviewsCopy.sort((a, b) => b.rating - a.rating);
            case 'rating-low':
                return reviewsCopy.sort((a, b) => a.rating - b.rating);
            case 'helpful':
                return reviewsCopy.sort((a, b) => b.helpful - a.helpful);
            default:
                return reviewsCopy;
        }
    }
};

// Initialize header and footer on page load
$(document).ready(function() {
    // Insert header
    if ($('#headerPlaceholder').length) {
        $('#headerPlaceholder').html(Common.createHeader());
    }
    
    // Insert footer
    if ($('#footerPlaceholder').length) {
        $('#footerPlaceholder').html(Common.createFooter());
    }
});