document.addEventListener("DOMContentLoaded", () => {
  // ---------- Review saving ----------
  const saveBtn = document.getElementById("saveReviewBtn");
  const hotelSelect = document.getElementById("hotelSelect");
  const overallText = document.querySelector('textarea[name="overall_review"]');

  function getSelectedValue(groupName) {
    const checked = document.querySelector(`input[name="${groupName}"]:checked`);
    return checked ? checked.value : "";
  }

  function setSelectedValue(groupName, value) {
    if (!value) return;
    const radio = document.querySelector(`input[name="${groupName}"][value="${value}"]`);
    if (radio) radio.checked = true;
  }

  function getHotelKey(hotelId) {
    return `review_${hotelId}`;
  }

  function clearRatings() {
    document
      .querySelectorAll('input[name="cleanliness"], input[name="service"], input[name="overall"]')
      .forEach(r => (r.checked = false));
    if (overallText) overallText.value = "";
  }

  function loadHotelReview(hotelId) {
    const saved = localStorage.getItem(getHotelKey(hotelId));
    if (!saved) {
      clearRatings();
      return;
    }

    const data = JSON.parse(saved);
    setSelectedValue("cleanliness", data.cleanliness);
    setSelectedValue("service", data.service);
    setSelectedValue("overall", data.overall);
    if (overallText) overallText.value = data.text || "";
  }

  function saveReview() {
    if (!hotelSelect) return;

    const hotelId = hotelSelect.value;
    if (!hotelId) {
      alert("Please choose a hotel first.");
      return;
    }

    const data = {
      cleanliness: getSelectedValue("cleanliness"),
      service: getSelectedValue("service"),
      overall: getSelectedValue("overall"),
      text: overallText ? overallText.value.trim() : ""
    };

    localStorage.setItem(getHotelKey(hotelId), JSON.stringify(data));
    alert("The review was saved successfully!");
  }

  if (saveBtn) saveBtn.addEventListener("click", saveReview);

  if (hotelSelect) {
    hotelSelect.addEventListener("change", () => loadHotelReview(hotelSelect.value));
  }

  const navbarHTML = `
    <nav class="navbar">
      <ul class="nav-links">
        <li><a href="./index.html"><span>Home</span></a></li>
        <li><a href="#"><span>Settings</span></a></li>
        <li><a href="#"><span>About</span></a></li>
        <li><a href="#"><span>Help</span></a></li>
      </ul>
      <div class="nav-logo">
        <img src="./images/image.png" alt="Logo" height="50">
      </div>
    </nav>
  `;
  if (!document.querySelector(".navbar")) {
    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
  }
const leftSidebarHTML = `
    <div class="filters-sidebar">
      <div class="action-bar">
        <div class="add-review-wrapper">
          <a href="review form.html">
            <button class="btn-add" type="button">+</button>
            <h3 class="action-title">Add Review</h3>
          </a>
        </div>
        <div class="search-container">
          <input class="search-input" type="text" placeholder="search a place">
        </div>
      </div>

      <h3 class="sidebar-title">Find Your Perfect Stay</h3>

      <ul class="filters-list">
        <li><b>Location</b></li>
        <label><input type="checkbox"> North District</label><br>
        <label><input type="checkbox"> Sharon</label><br>
        <label><input type="checkbox"> Center District</label><br>
        <label><input type="checkbox"> Jerusalem</label><br>
        <label><input type="checkbox"> South District</label><br>
        <label><input type="checkbox"> Eilat</label><br><br>

        <li><b>Stay Place</b></li>
        <label><input type="checkbox"> Hotels</label><br>
        <label><input type="checkbox"> B&B's</label><br>
        <label><input type="checkbox"> Boutique Hotels</label><br>
        <label><input type="checkbox"> Guest houses</label><br>
        <label><input type="checkbox"> Villas</label><br><br>

        <li><b>Vacation Style</b></li>
        <label><input type="checkbox"> Urban</label><br>
        <label><input type="checkbox"> Beach Getaway</label><br>
        <label><input type="checkbox"> Nature</label><br>
        <label><input type="checkbox"> Romantic</label><br>
        <label><input type="checkbox"> Family Friendly</label><br><br>

        <li><b>Meal Plans</b></li>
        <label><input type="checkbox"> Breakfast Included</label><br>
        <label><input type="checkbox"> Half Board</label><br>
        <label><input type="checkbox"> Full Board</label><br>
        <label><input type="checkbox"> All-Inclusive</label><br>
        <label><input type="checkbox"> Self-Catering</label><br><br>

        <a href="Item-List.html"><button class="btn-apply" type="button">Apply Filters</button></a>
      </ul>
    </div>
  `;

  const rightSidebarHTML = `
    <div class="filters-sidebar" style="margin-top: 50px;">
      <h3 class="sidebar-title">More Filters</h3>

      <ul class="filters-list">
        <li><b>Star Rating</b></li>
        <label><input type="checkbox"> ★★★★★</label><br>
        <label><input type="checkbox"> ★★★★☆</label><br>
        <label><input type="checkbox"> ★★★☆☆</label><br>
        <label><input type="checkbox"> ★★☆☆☆</label><br>
        <label><input type="checkbox"> ★☆☆☆☆</label><br><br>

        <li><b>Price Range</b></li>
        <input type="range" min="0" max="1000" value="500" class="slider" id="priceRange" style="width:100%;">
        <p>Max Price: $<span id="priceValue">500</span></p><br>

        <li><b>Accessibility</b></li>
        <label><input type="checkbox"> Wheelchair Access</label><br>
        <label><input type="checkbox"> Elevator</label><br><br>

        <li><b>Facilities</b></li>
        <label><input type="checkbox"> Pool</label><br>
        <label><input type="checkbox"> Spa</label><br>
        <label><input type="checkbox"> Gym</label><br>
        <label><input type="checkbox"> Free Wi-Fi</label><br>
        <label><input type="checkbox"> Parking</label><br><br>

        <a href="Item-List.html"><button class="btn-apply" type="button">Apply Filters</button></a>
      </ul>
    </div>
  `;

  // אם יש page-container בדף הזה — נוסיף. אם אין — לא עושים כלום.
  const pageContainer = document.querySelector(".page-container");
  if (pageContainer) {
    pageContainer.insertAdjacentHTML("afterbegin", leftSidebarHTML);
    pageContainer.insertAdjacentHTML("beforeend", rightSidebarHTML);

    // range price update (בלי oninput בתוך HTML)
    const priceRange = document.getElementById("priceRange");
    const priceValue = document.getElementById("priceValue");
    if (priceRange && priceValue) {
      priceRange.addEventListener("input", () => {
        priceValue.textContent = priceRange.value;
      });
    }
  }
});



