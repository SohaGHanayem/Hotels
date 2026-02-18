/* ===================================
   LocalStorage Management
=================================== */

const Storage = {
    ITEMS_KEY: 'review_platform_items',
    REVIEWS_KEY: 'review_platform_reviews',

    /* ===============================
       Items Management
    =============================== */

    saveItems(items) {
        localStorage.setItem(this.ITEMS_KEY, JSON.stringify(items));
    },

    loadItems() {
        const items = localStorage.getItem(this.ITEMS_KEY);
        return items ? JSON.parse(items) : this.getDefaultItems();
    },

    getItemById(id) {
        const items = this.loadItems();
        return items.find(item => item.id === parseInt(id));
    },

    addItem(item) {
        const items = this.loadItems();
        item.id = this.generateId(items);
        item.createdAt = new Date().toISOString();
        items.push(item);
        this.saveItems(items);
        return item;
    },

    updateItem(id, updatedData) {
        const items = this.loadItems();
        const index = items.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedData };
            this.saveItems(items);
            return items[index];
        }
        return null;
    },

    deleteItem(id) {
        const items = this.loadItems();
        const filtered = items.filter(item => item.id !== parseInt(id));
        this.saveItems(filtered);

        const reviews = this.loadReviews();
        const cleanedReviews = reviews.filter(r => r.itemId !== parseInt(id));
        this.saveReviews(cleanedReviews);
    },

    /* ===============================
       Reviews Management
    =============================== */

    saveReviews(reviews) {
        localStorage.setItem(this.REVIEWS_KEY, JSON.stringify(reviews));
    },

    loadReviews() {
        const reviews = localStorage.getItem(this.REVIEWS_KEY);
        return reviews ? JSON.parse(reviews) : [];
    },

    getReviewsByItemId(itemId) {
        const reviews = this.loadReviews();
        return reviews.filter(review => review.itemId === parseInt(itemId));
    },

    addReview(review) {
        const reviews = this.loadReviews();
        review.id = this.generateId(reviews);
        review.createdAt = new Date().toISOString();
        review.helpful = 0;
        review.notHelpful = 0;
        reviews.push(review);
        this.saveReviews(reviews);
        this.updateItemRating(review.itemId);
        return review;
    },

    updateReview(id, updatedData) {
        const reviews = this.loadReviews();
        const index = reviews.findIndex(review => review.id === parseInt(id));
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...updatedData };
            this.saveReviews(reviews);
            return reviews[index];
        }
        return null;
    },

    deleteReview(reviewId) {
        const reviews = this.loadReviews();
        const reviewToDelete = reviews.find(r => r.id === parseInt(reviewId));

        if (reviewToDelete) {
            const updatedReviews = reviews.filter(r => r.id !== parseInt(reviewId));
            this.saveReviews(updatedReviews);
            this.updateItemRating(reviewToDelete.itemId);
        }
    },

    markReviewHelpful(reviewId, isHelpful) {
        const reviews = this.loadReviews();
        const review = reviews.find(r => r.id === parseInt(reviewId));
        if (review) {
            if (isHelpful) review.helpful++;
            else review.notHelpful++;
            this.saveReviews(reviews);
        }
    },

    updateItemRating(itemId) {
        const reviews = this.getReviewsByItemId(itemId);
        if (reviews.length === 0) return;

        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = (totalRating / reviews.length).toFixed(1);

        const categories = ['cleanliness', 'service', 'location', 'value', 'facilities'];
        const categoryRatings = {};

        categories.forEach(category => {
            const ratings = reviews
                .filter(r => r.categoryRatings && r.categoryRatings[category])
                .map(r => r.categoryRatings[category]);

            if (ratings.length > 0) {
                categoryRatings[category] =
                    (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1);
            }
        });

        this.updateItem(itemId, {
            ratingAvg: parseFloat(avgRating),
            reviewCount: reviews.length,
            categoryRatings
        });
    },

    generateId(array) {
        if (array.length === 0) return 1;
        return Math.max(...array.map(item => item.id)) + 1;
    },

    /* ===============================
       DEFAULT ITEMS (MATCHES HOME)
    =============================== */

    getDefaultItems() {
        return [
            {
                id: 1,
                name: "Crown Eilat",
                category: "Hotels",
                location: "Eilat, Israel",
                image: "./images/crown_eilat_hotel.jpg",
                gallery: ["./images/crown_eilat_hotel.jpg"],
                ratingAvg: 5.0,
                reviewCount: 2,
                instagram: "#",
                facebook: "#",
                categoryRatings: {
                    cleanliness: 5.0,
                    service: 5.0,
                    location: 5.0,
                    value: 4.8,
                    facilities: 5.0
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Pool", "📶 Wi-Fi", "🍽️ Restaurant", "🌊 Beach Access"],
                locationDetails: "Red Sea Views | Promenade Area | Family Friendly",
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                name: "Caesarea Resort",
                category: "Hotels",
                location: "Caesarea, Israel",
                image: "./images/hotel_2.jfif",
                gallery: ["./images/hotel_2.jfif"],
                ratingAvg: 4.4,
                reviewCount: 1,
                instagram: "#",
                facebook: "#",
                categoryRatings: {
                    cleanliness: 4.0,
                    service: 5.0,
                    location: 4.5,
                    value: 4.0,
                    facilities: 4.3
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Pool", "📶 Wi-Fi", "🍽️ Restaurant"],
                locationDetails: "Near Caesarea Port | Peaceful Atmosphere",
                createdAt: new Date().toISOString()
            },
            {
                id: 3,
                name: "Sharon's Villa",
                category: "Villas",
                location: "Hod Hasharon, Israel",
                image: "./images/villa_1.jpg",
                gallery: ["./images/villa_1.jpg"],
                ratingAvg: 5.0,
                reviewCount: 1,
                instagram: "#",
                facebook: "#",
                categoryRatings: {
                    cleanliness: 5.0,
                    service: 4.5,
                    location: 4.7,
                    value: 4.8,
                    facilities: 5.0
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Free",
                    pets: "On Request"
                },
                amenities: ["🏊 Private Pool", "📶 Wi-Fi", "🌳 Garden"],
                locationDetails: "Quiet Residential Area | Spacious & Private",
                createdAt: new Date().toISOString()
            },
            {
                id: 4,
                name: "Aria Eilat",
                category: "Hotels",
                location: "Eilat, Israel",
                image: "./images/hotel_3.jpg",
                gallery: ["./images/hotel_3.jpg"],
                ratingAvg: 5.0,
                reviewCount: 1,
                instagram: "#",
                facebook: "#",
                categoryRatings: {
                    cleanliness: 5.0,
                    service: 5.0,
                    location: 5.0,
                    value: 4.7,
                    facilities: 5.0
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Available",
                    pets: "No"
                },
                amenities: ["🏊 Pool", "📶 Wi-Fi", "🍽️ Restaurant", "🌊 Beachfront"],
                locationDetails: "Beachfront Hotel | Luxury Experience",
                createdAt: new Date().toISOString()
            },
            {
                id: 5,
                name: "Amirim Boutique B&B",
                category: "B&B",
                location: "Amirim, Israel",
                image: "./images/B&B_amirim.jpg",
                gallery: ["./images/B&B_amirim.jpg"],
                ratingAvg: 4.5,
                reviewCount: 1,
                instagram: "#",
                facebook: "#",
                categoryRatings: {
                    cleanliness: 4.5,
                    service: 4.5,
                    location: 4.6,
                    value: 4.4,
                    facilities: 4.5
                },
                info: {
                    checkIn: "15:00",
                    checkOut: "11:00",
                    wifi: "Free",
                    parking: "Free",
                    pets: "No"
                },
                amenities: ["📶 Wi-Fi", "🍳 Breakfast Included", "🌄 Mountain Views"],
                locationDetails: "Romantic & Peaceful | Galilee Mountains",
                createdAt: new Date().toISOString()
            }
        ];
    },

    initializeDefaultReviews() {
        const reviews = this.loadReviews();
        if (reviews.length === 0) {
            this.saveReviews([]);
        }
    },

    resetToDefaults() {
        this.saveItems(this.getDefaultItems());
        localStorage.removeItem(this.REVIEWS_KEY);
        this.initializeDefaultReviews();
    }
};

Storage.initializeDefaultReviews();
