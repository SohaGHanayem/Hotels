/* ===================================
   Item Details Page Logic
   =================================== */

$(document).ready(function() {
    const itemId = Common.getUrlParameter('id');
    
    if (!itemId) {
        Common.showMessage('Item ID not found', 'error');
        setTimeout(() => window.location.href = 'items-list.html', 2000);
        return;
    }
    
    const item = Storage.getItemById(itemId);
    
    if (!item) {
        Common.showMessage('Item not found', 'error');
        setTimeout(() => window.location.href = 'items-list.html', 2000);
        return;
    }
    
    let reviews = Storage.getReviewsByItemId(itemId);
    let currentSort = 'date-new';
    let currentFilter = 'all';
    
    // Load item details
    loadItemDetails(item);
    loadReviews();
    
    // Attach search listeners after header loads
    setTimeout(function() {
        $(document).on('click', '#searchBtn', function() {
            const query = $('#searchInput').val();
            window.location.href = `items-list.html?search=${encodeURIComponent(query)}`;
        });
        
        $(document).on('keyup', '#searchInput', function(e) {
            if (e.key === 'Enter') {
                const query = $(this).val();
                window.location.href = `items-list.html?search=${encodeURIComponent(query)}`;
            }
        });
    }, 100);
    
    // Load item details
    function loadItemDetails(item) {
        // Gallery
        loadGallery(item);
        
        // Item header
        $('#itemTitle').text(item.name);
        $('#itemLocation').text(item.location);
        $('#overallRating').html(`
            <div class="rating-number">${item.ratingAvg}</div>
            <div>/5</div>
            ${Common.createStars(item.ratingAvg, false)}
            <div style="font-size: 14px; color: #666; margin-top: 5px;">
                Based on ${item.reviewCount} reviews
            </div>
        `);
        
        // Rating summary
        if (item.categoryRatings) {
            loadRatingSummary(item.categoryRatings);
        }
        
        // General info
        if (item.info) {
            loadGeneralInfo(item.info);
        }
        
        // Amenities
        if (item.amenities) {
            loadAmenities(item.amenities);
        }
        
        // Location with map
        loadMap(item);
    }
    
    // Load gallery
    function loadGallery(item) {
        const mainImage = item.image || '';
        const gallery = item.gallery || [];
        
        if (mainImage) {
            $('#galleryMain').html(`<img src="${mainImage}" alt="${item.name}">`);
        }
        
        // Add main image as first thumbnail
        if (mainImage) {
            $('#galleryThumbnails').append(`
                <div class="gallery-thumb active" data-image="${mainImage}">
                    <img src="${mainImage}" alt="Image 1">
                </div>
            `);
        }
        
        // Add other thumbnails
        gallery.forEach((img, index) => {
            $('#galleryThumbnails').append(`
                <div class="gallery-thumb" data-image="${img}">
                    <img src="${img}" alt="Image ${index + 2}">
                </div>
            `);
        });
        
        // If no images, show placeholders
        if (!mainImage && gallery.length === 0) {
            for (let i = 1; i <= 5; i++) {
                $('#galleryThumbnails').append(`
                    <div class="gallery-thumb">Image ${i}</div>
                `);
            }
        }
        
        // Thumbnail click
        $('.gallery-thumb').on('click', function() {
            $('.gallery-thumb').removeClass('active');
            $(this).addClass('active');
            
            const imageUrl = $(this).data('image');
            if (imageUrl) {
                $('#galleryMain').html(`<img src="${imageUrl}" alt="${item.name}">`);
            }
        });
    }
    
    // Load rating summary
    function loadRatingSummary(ratings) {
        const categories = {
            cleanliness: 'Cleanliness',
            service: 'Service',
            location: 'Location',
            value: 'Value for Money',
            facilities: 'Facilities'
        };
        
        $('#ratingSummary').empty();
        
        Object.keys(categories).forEach(key => {
            const rating = ratings[key] || 0;
            const percentage = (rating / 5) * 100;
            
            $('#ratingSummary').append(`
                <div class="rating-item">
                    <div class="rating-label">
                        <span>${categories[key]}</span>
                        <span>${rating}</span>
                    </div>
                    <div class="rating-bar">
                        <div class="rating-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
            `);
        });
    }
    
    // Load general info
    function loadGeneralInfo(info) {
        $('#generalInfo').empty();
        
        Object.keys(info).forEach(key => {
            const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
            $('#generalInfo').append(`
                <div class="info-item">
                    <span class="info-label">${label}:</span>
                    <span class="info-value">${info[key]}</span>
                </div>
            `);
        });
    }
    
    // Load amenities
    function loadAmenities(amenities) {
        $('#amenitiesGrid').empty();
        
        amenities.forEach(amenity => {
            $('#amenitiesGrid').append(`
                <div class="amenity-item">${amenity}</div>
            `);
        });
    }
    

    // Load map with location name
    function loadMap(item) {
        // Simple map embed using the item location string
        const locationQuery = encodeURIComponent(item.location);
        const mapUrl = `https://maps.google.com/maps?q=${locationQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        
        $('#locationMap').html(`
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                style="border:0; border-radius:10px;" 
                src="${mapUrl}" 
                allowfullscreen>
            </iframe>
        `);

        if (item.locationDetails) {
            $('#locationDetails').text(item.locationDetails);
        }
    }
    
    // Load reviews
    function loadReviews() {
        // Sort and filter
        let filteredReviews = currentFilter !== 'all' ? 
            Common.filterReviews(reviews, currentFilter) : reviews;
        
        filteredReviews = Common.sortReviews(filteredReviews, currentSort);
        
        $('#reviewsContainer').empty();
        
        if (filteredReviews.length === 0) {
            $('#reviewsContainer').html(`
                <div style="text-align: center; padding: 40px; color: #666;">
                    <h3>No Reviews to Display</h3>
                    <p>Be the first to write a review!</p>
                </div>
            `);
            return;
        }
        
        filteredReviews.forEach(review => {
            $('#reviewsContainer').append(createReviewCard(review));
        });
    }
    
    // Create review card
    function createReviewCard(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <span class="review-user">👤 ${review.userName} (${review.country})</span>
                    <div class="review-rating">
                        ${Common.createStars(review.rating, false)}
                        <span>⭐ Rating: ${review.rating}/5</span>
                    </div>
                </div>
                <div class="review-content">
                    ${review.title ? `<strong>"${review.title}"</strong><br>` : ''}
                    ${review.text}
                </div>
                ${review.pros || review.cons ? `
                    <div class="review-pros-cons">
                        ${review.pros ? `<div class="review-pros">👍 ${review.pros}</div>` : ''}
                        ${review.cons ? `<div class="review-cons">👎 ${review.cons}</div>` : ''}
                    </div>
                ` : ''}
                <div class="review-footer">
                    <span class="review-date">📅 Stay Date: ${review.date}</span>
                    <div class="review-helpful">
                        <button class="helpful-btn" onclick="markHelpful(${review.id}, true)">
                            👍 Helpful (${review.helpful})
                        </button>
                        <button class="helpful-btn" onclick="markHelpful(${review.id}, false)">
                            👎 Not Helpful (${review.notHelpful})
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Mark review as helpful
    window.markHelpful = function(reviewId, isHelpful) {
        Storage.markReviewHelpful(reviewId, isHelpful);
        reviews = Storage.getReviewsByItemId(itemId);
        loadReviews();
        Common.showMessage(isHelpful ? 'Thank you for your feedback!' : 'Thank you for your feedback', 'success');
    };
    
    // Sort reviews
    $('#sortReviews').on('change', function() {
        currentSort = $(this).val();
        loadReviews();
    });
    
    // Filter reviews
    $('#filterReviews').on('change', function() {
        currentFilter = $(this).val();
        loadReviews();
    });
    
    // Back button
    $('#backBtn').on('click', function() {
        window.location.href = 'items-list.html';
    });
    
    // Add review button (in form)
    $('#addReviewBtn').on('click', function() {
        window.location.href = `add-review.html?itemId=${itemId}`;
    });
    
    // Submit quick review form
    $('#quickReviewForm').on('submit', function(e) {
        e.preventDefault();
        
        const rating = parseInt($('#quickRating').data('rating')) || 0;
        const text = $('#quickReviewText').val().trim();
        
        if (rating === 0) {
            Common.showMessage('Please select a rating', 'error');
            return;
        }
        
        if (!text) {
            Common.showMessage('Please write a review', 'error');
            return;
        }
        
        const review = {
            itemId: parseInt(itemId),
            userName: 'Anonymous User',
            country: 'Unknown',
            rating: rating,
            text: text,
            date: new Date().toISOString().split('T')[0]
        };
        
        Storage.addReview(review);
        reviews = Storage.getReviewsByItemId(itemId);
        
        // Reload page to show updated data
        Common.showMessage('Review saved successfully!', 'success');
        setTimeout(() => location.reload(), 1500);
    });
    
    // Initialize quick rating stars
    Common.createInteractiveStars('quickRating', 0);
});