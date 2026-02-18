document.addEventListener("DOMContentLoaded", function () {
    const navbarHTML = `
    <nav class="navbar">
        <ul class="nav-links">
            <li><a href="index.html"><span>⌂</span> Home</a></li>
            <li><a href="#"><span>⚙️</span> Settings</a></li>
            <li><a href="#"><span>ⓘ</span> About</a></li>
            <li><a href="#"><span>❓</span>Help</a></li>
        </ul>
        <div class="nav-logo">
            <img src="./images/image.png" alt="Logo" height="50">
        </div>
    </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);

    const leftSidebarHTML = `
    <div class="filters-sidebar">
        <div class="action-bar">
            <div class="add-review-wrapper">
                <a href="review-form.html">
                    <button class="btn-add">+</button>
                    <h3 class="action-title">Add Review</h3>
                </a>
            </div>
            <div class="search-container">
                <input class="search-input" type="text" placeholder="search a place">
            </div>
        </div>
        <h3 class="sidebar-title">Find Your Perfect Stay</h3>
        <ul class="filters-list">
            <li>Location</li>
            <input type="checkbox"><label for="North">North District</label><br>
            <input type="checkbox"><label for="Sharon">Sharon</label><br>
            <input type="checkbox"><label for="Center">Center District</label><br>
            <input type="checkbox"><label for="Jerousalem">Jerousalem</label><br>
            <input type="checkbox"><label for="South">South District</label><br>
            <input type="checkbox"><label for="Eilat">Eilat</label><br><br>
            <li>Stay Place</li>
            <input type="checkbox"><label for="hotels">Hotels</label><br>
            <input type="checkbox"><label for="hotels">B&B's</label><br>
            <input type="checkbox"><label for="hotels">Boutique Hotels</label><br>
            <input type="checkbox"><label for="hotels">Guests houses</label><br>
            <input type="checkbox"><label for="hotels">Villas</label><br><br>
            <li>Vacation Style</li>
            <input type="checkbox"><label for="urban">Urban</label><br>
            <input type="checkbox"><label for="beach Getaway">Beach Getaway</label><br>
            <input type="checkbox"><label for="nature">Nature</label><br>
            <input type="checkbox"><label for="romantic">Romantic</label><br>
            <input type="checkbox"><label for="family friendly">Family Friendly</label><br><br>
            <li>Meal Plans</li>
            <input type="checkbox"><label for="Breakfast Included">Breakfast Included</label><br>
            <input type="checkbox"><label for="Half Board">Half Board</label><br>
            <input type="checkbox"><label for="Full Board">Full Board</label><br>
            <input type="checkbox"><label for="All-Inclusive">All-Inclusive</label><br>
            <input type="checkbox"><label for="Self-Catering">Self-Catering</label><br><br>
            <a href="Item-List.html"><button class="btn-apply">Apply Filters</button></a>
        </ul>
    </div>
    `;

    const rightSidebarHTML = `
    <div class="filters-sidebar" style="margin-top: 50px;">
        <h3 class="sidebar-title">More Filters</h3>
        <ul class="filters-list">
            <li>Star Rating</li>
            <input type="checkbox" id="star5"><label for="star5">★★★★★</label><br>
            <input type="checkbox" id="star4"><label for="star4">★★★★☆</label><br>
            <input type="checkbox" id="star3"><label for="star3">★★★☆☆</label><br>
            <input type="checkbox" id="star2"><label for="star2">★★☆☆☆</label><br>
            <input type="checkbox" id="star1"><label for="star1">★☆☆☆☆</label><br><br>
            <li>Price Range</li>
            <input type="range" min="0" max="1000" value="500" class="slider" id="priceRange" style="width: 100%;" oninput="document.getElementById('priceValue').innerText = this.value">
            <p>Max Price: $<span id="priceValue">500</span></p><br>
            <li>Accessibility</li>
            <input type="checkbox" id="acc_wheel"><label for="acc_wheel">Wheelchair Access</label><br>
            <input type="checkbox" id="acc_elevator"><label for="acc_elevator">Elevator</label><br><br>
            <li>Facilities</li>
            <input type="checkbox" id="prop_pool"><label for="prop_pool">Pool</label><br>
            <input type="checkbox" id="prop_spa"><label for="prop_spa">Spa</label><br>
            <input type="checkbox" id="prop_gym"><label for="prop_gym">Gym</label><br>
            <input type="checkbox" id="prop_wifi"><label for="prop_wifi">Free Wi-Fi</label><br>
            <input type="checkbox" id="prop_parking"><label for="prop_parking">Parking</label><br>
            <br><a href="Item-List.html"><button class="btn-apply">Apply Filters</button></a>
        </ul>
    </div>
    `;

    const pageContainer = document.querySelector('.page-container');
    if (pageContainer) {
        pageContainer.insertAdjacentHTML('afterbegin', leftSidebarHTML);
        pageContainer.insertAdjacentHTML('beforeend', rightSidebarHTML);
    }
});