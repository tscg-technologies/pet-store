/* ==========================================================================
   PET STORE — GLOBAL VANILLA JAVASCRIPT APPLICATION
   Handles Navigation, Search, Filters, Sorting, Quick View, Cart, Wishlist,
   Demo Checkout, Accordion & Contact Form Validation
   ========================================================================== */

(function () {
  "use strict";

  const STORAGE_KEYS = {
    CART: "petstore_demo_cart_v1",
    WISHLIST: "petstore_demo_wishlist_v1"
  };

  /* --------------------------------------------------------------------------
     STATE MANAGEMENT (localStorage for non-sensitive demo state only)
     -------------------------------------------------------------------------- */
  function getCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CART);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      // Ignore storage errors in private mode
    }
    updateHeaderBadges();
  }

  function getWishlist() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(list) {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    } catch (e) {
      // Ignore storage errors
    }
    updateHeaderBadges();
  }

  function findProduct(id) {
    return (typeof DEMO_PRODUCTS !== "undefined")
      ? DEMO_PRODUCTS.find(p => p.id === id)
      : null;
  }

  /* --------------------------------------------------------------------------
     CART & WISHLIST ACTIONS
     -------------------------------------------------------------------------- */
  function addToCart(productId, qty = 1) {
    const product = findProduct(productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: productId, qty: qty });
    }
    saveCart(cart);
    showToast(`Added "${product.name}" to Demo Cart`);
  }

  function updateCartQty(productId, newQty) {
    let cart = getCart();
    if (newQty <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) item.qty = newQty;
    }
    saveCart(cart);
    if (document.getElementById("cart-items-container")) {
      renderCartAndWishlistPage();
    }
  }

  function clearCart() {
    saveCart([]);
    if (document.getElementById("cart-items-container")) {
      renderCartAndWishlistPage();
    }
    showToast("Demo Cart cleared");
  }

  function toggleWishlist(productId) {
    const product = findProduct(productId);
    if (!product) return;

    let list = getWishlist();
    const exists = list.includes(productId);
    if (exists) {
      list = list.filter(id => id !== productId);
      showToast(`Removed "${product.name}" from Demo Wishlist`);
    } else {
      list.push(productId);
      showToast(`Saved "${product.name}" to Demo Wishlist`);
    }
    saveWishlist(list);

    // Refresh wishlist buttons on page
    document.querySelectorAll(`.js-wishlist-toggle[data-id="${productId}"]`).forEach(btn => {
      btn.classList.toggle("active", !exists);
      const svg = btn.querySelector("svg");
      if (svg) svg.setAttribute("fill", !exists ? "currentColor" : "none");
    });

    if (document.getElementById("wishlist-items-container")) {
      renderCartAndWishlistPage();
    }
  }

  function updateHeaderBadges() {
    const cart = getCart();
    const wishlist = getWishlist();
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const wishCount = wishlist.length;

    document.querySelectorAll(".js-cart-count").forEach(el => {
      el.textContent = cartCount;
    });
    document.querySelectorAll(".js-wishlist-count").forEach(el => {
      el.textContent = wishCount;
    });
  }

  /* --------------------------------------------------------------------------
     TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  function showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     QUICK VIEW MODAL
     -------------------------------------------------------------------------- */
  function openQuickView(productId) {
    const product = findProduct(productId);
    if (!product) return;

    let modal = document.getElementById("quick-view-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "quick-view-modal";
      modal.className = "modal-backdrop";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-dialog">
        <button type="button" class="modal-close js-modal-close" aria-label="Close Quick View">✕</button>
        <div class="product-detail-grid" style="gap: 1.75rem;">
          <div>
            ${createImagePlaceholderHTML(product.imageFilename, product.imageSubject, "img-placeholder-aspect-4-3")}
            <span class="demo-not-for-sale">DEMO PRODUCT — NOT AVAILABLE FOR PURCHASE</span>
          </div>
          <div>
            <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
              <span class="pet-badge">${product.petType}</span>
              <span class="demo-pill">${product.category}</span>
            </div>
            <h2 style="font-size:1.5rem; font-weight:800; margin-bottom:0.4rem;">${product.name}</h2>
            <div class="product-card-rating">
              <span class="stars">★★★★★</span>
              <span><strong>${product.rating}</strong> (${product.reviewsCount} Illustrative Demo Ratings)</span>
            </div>
            <p style="font-size:1.4rem; font-weight:900; margin:0.75rem 0;">
              ₹${product.price.toLocaleString("en-IN")}
              <span style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);"> (Illustrative Sample Price)</span>
            </p>
            <p style="color:var(--text-secondary); font-size:0.92rem; margin-bottom:1rem;">${product.description}</p>
            <div class="product-meta-grid" style="margin:1rem 0;">
              <div class="meta-item"><span>Pack / Size</span><strong>${product.packSize}</strong></div>
              <div class="meta-item"><span>Suitable For</span><strong>${product.lifeStage}</strong></div>
            </div>
            <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:1.25rem;">
              <button type="button" class="btn btn-primary js-add-to-cart" data-id="${product.id}">Add to Demo Cart</button>
              <a href="product.html?id=${product.id}" class="btn btn-outline">Full Product Details</a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("open");
  }

  /* --------------------------------------------------------------------------
     HOME PAGE INITIALIZATION
     -------------------------------------------------------------------------- */
  function initHomePage() {
    const featuredContainer = document.getElementById("home-featured-products");
    if (!featuredContainer || typeof DEMO_PRODUCTS === "undefined") return;

    const wishlist = getWishlist();
    const featured = DEMO_PRODUCTS.filter(p => p.featured).slice(0, 6);
    featuredContainer.innerHTML = featured.map(p => renderProductCardHTML(p, wishlist)).join("");
  }

  /* --------------------------------------------------------------------------
     SHOP PAGE INITIALIZATION (SEARCH, FILTERS, SORTING)
     -------------------------------------------------------------------------- */
  function initShopPage() {
    const grid = document.getElementById("shop-products-grid");
    if (!grid || typeof DEMO_PRODUCTS === "undefined") return;

    const searchInput = document.getElementById("shop-search-input");
    const sortSelect = document.getElementById("shop-sort-select");
    const countLabel = document.getElementById("shop-results-count");
    const resetBtn = document.getElementById("shop-reset-filters");

    // Pre-fill filters from URL query parameters if present
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get("q");
    const petParam = params.get("pet");
    const catParam = params.get("category");

    if (qParam && searchInput) searchInput.value = qParam;
    if (petParam) {
      const cb = document.querySelector(`input[name="petType"][value="${petParam}"]`);
      if (cb) cb.checked = true;
    }
    if (catParam) {
      const cb = document.querySelector(`input[name="category"][value="${catParam}"]`);
      if (cb) cb.checked = true;
    }

    function applyFiltersAndRender() {
      const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
      const selectedPets = Array.from(document.querySelectorAll('input[name="petType"]:checked')).map(i => i.value);
      const selectedCats = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(i => i.value);
      const selectedTypes = Array.from(document.querySelectorAll('input[name="productType"]:checked')).map(i => i.value);
      const selectedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(i => i.value);
      const selectedAvail = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(i => i.value);
      const priceRadio = document.querySelector('input[name="priceRange"]:checked');
      const priceRange = priceRadio ? priceRadio.value : "all";

      let filtered = DEMO_PRODUCTS.filter(product => {
        if (query) {
          const hay = `${product.name} ${product.category} ${product.petType} ${product.shortDesc}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        if (selectedPets.length > 0 && !selectedPets.includes(product.petType)) return false;
        if (selectedCats.length > 0 && !selectedCats.includes(product.category)) return false;
        if (selectedTypes.length > 0 && !selectedTypes.includes(product.productType)) return false;
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
        if (selectedAvail.length > 0 && !selectedAvail.includes(product.availability)) return false;

        if (priceRange === "under-800" && product.price >= 800) return false;
        if (priceRange === "800-1500" && (product.price < 800 || product.price > 1500)) return false;
        if (priceRange === "over-1500" && product.price <= 1500) return false;

        return true;
      });

      const sortVal = sortSelect ? sortSelect.value : "featured";
      if (sortVal === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortVal === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortVal === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }

      if (countLabel) {
        countLabel.textContent = `Showing ${filtered.length} of ${DEMO_PRODUCTS.length} illustrative demo products`;
      }

      const wishlist = getWishlist();
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:0.5rem;">No Matching Demo Products Found</h3>
            <p style="color:var(--text-secondary); margin-bottom:1.25rem;">Try clearing one or more sidebar filters or searching for another pet category.</p>
            <button type="button" class="btn btn-primary" id="empty-reset-btn">Reset All Filters</button>
          </div>
        `;
        const emptyReset = document.getElementById("empty-reset-btn");
        if (emptyReset) emptyReset.addEventListener("click", resetAllFilters);
      } else {
        grid.innerHTML = filtered.map(p => renderProductCardHTML(p, wishlist)).join("");
      }
    }

    function resetAllFilters() {
      if (searchInput) searchInput.value = "";
      document.querySelectorAll('.filter-sidebar input[type="checkbox"]').forEach(cb => { cb.checked = false; });
      const allPrice = document.querySelector('input[name="priceRange"][value="all"]');
      if (allPrice) allPrice.checked = true;
      if (sortSelect) sortSelect.value = "featured";
      applyFiltersAndRender();
    }

    if (searchInput) searchInput.addEventListener("input", applyFiltersAndRender);
    if (sortSelect) sortSelect.addEventListener("change", applyFiltersAndRender);
    if (resetBtn) resetBtn.addEventListener("click", resetAllFilters);
    document.querySelectorAll(".filter-sidebar input").forEach(input => {
      input.addEventListener("change", applyFiltersAndRender);
    });

    applyFiltersAndRender();
  }

  /* --------------------------------------------------------------------------
     PRODUCT DETAILS PAGE INITIALIZATION
     -------------------------------------------------------------------------- */
  function initProductDetailsPage() {
    const detailRoot = document.getElementById("product-detail-root");
    if (!detailRoot || typeof DEMO_PRODUCTS === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "p1";
    const product = findProduct(productId) || DEMO_PRODUCTS[0];
    const wishlist = getWishlist();
    const isWishlisted = wishlist.includes(product.id);

    // Update breadcrumb & selector
    const breadcrumbName = document.getElementById("breadcrumb-product-name");
    if (breadcrumbName) breadcrumbName.textContent = product.name;

    const switcher = document.getElementById("demo-product-switcher");
    if (switcher) {
      switcher.innerHTML = DEMO_PRODUCTS.map(p =>
        `<option value="${p.id}" ${p.id === product.id ? "selected" : ""}>${p.name} (₹${p.price})</option>`
      ).join("");
      switcher.addEventListener("change", (e) => {
        window.location.href = `product.html?id=${e.target.value}`;
      });
    }

    const foodFieldsHTML = product.isFood ? `
      <div class="food-nutrition-box">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1rem; font-weight:800; color:var(--forest-green);">Illustrative Pet Food Information</h3>
          <span class="demo-pill">Sample Non-Medical Data</span>
        </div>
        <div class="food-nutrition-grid">
          <div>
            <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--text-secondary); display:block;">Sample Ingredients</strong>
            <p style="font-size:0.88rem; margin-top:0.2rem;">${product.ingredients}</p>
          </div>
          <div>
            <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--text-secondary); display:block;">Illustrative Nutritional Info</strong>
            <p style="font-size:0.88rem; margin-top:0.2rem;">${product.nutrition}</p>
          </div>
          <div>
            <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--text-secondary); display:block;">General Feeding Guidance</strong>
            <p style="font-size:0.88rem; margin-top:0.2rem;">${product.feedingGuide}</p>
          </div>
          <div>
            <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--text-secondary); display:block;">Suitable Life Stage</strong>
            <p style="font-size:0.88rem; margin-top:0.2rem;">${product.lifeStage}</p>
          </div>
        </div>
      </div>
    ` : "";

    const specsRows = Object.entries(product.specs || {}).map(([k, v]) =>
      `<li><strong>${k}:</strong> ${v}</li>`
    ).join("");

    detailRoot.innerHTML = `
      <div class="product-detail-grid">
        <div class="product-gallery-card">
          <div id="main-gallery-slot">
            ${createImagePlaceholderHTML(product.imageFilename, product.imageSubject + " — Front View", "img-placeholder-aspect-4-3")}
          </div>
          <div class="product-thumbs">
            <button type="button" class="product-thumb-btn active" data-view="Front Packaging View">1. Front View</button>
            <button type="button" class="product-thumb-btn" data-view="Texture & Scale Detail">2. Detail View</button>
            <button type="button" class="product-thumb-btn" data-view="Lifestyle Context View">3. Lifestyle View</button>
          </div>
          <span class="demo-not-for-sale" style="margin-top:1rem;">DEMO PRODUCT — NOT AVAILABLE FOR PURCHASE</span>
        </div>

        <div class="product-info-panel">
          <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
            <span class="pet-badge">${product.petType}</span>
            <span class="demo-pill">${product.category}</span>
            <span class="demo-pill">${product.availability}</span>
          </div>
          <h1 style="font-size:clamp(1.6rem, 2.8vw, 2.2rem); font-weight:900; line-height:1.2; margin-bottom:0.65rem;">${product.name}</h1>
          <div class="product-card-rating" style="margin-bottom:1rem;">
            <span class="stars">★★★★★</span>
            <span><strong>${product.rating} / 5.0</strong> (${product.reviewsCount} Illustrative Demo Ratings)</span>
          </div>

          <div style="background:var(--bg-cream); padding:1rem 1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-color); margin-bottom:1.25rem;">
            <span style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:var(--text-secondary); display:block;">Illustrative Demo Price (INR)</span>
            <span style="font-size:1.85rem; font-weight:900; color:var(--forest-green);">₹${product.price.toLocaleString("en-IN")}</span>
            <span style="font-size:0.8rem; color:var(--text-secondary); margin-left:0.5rem;">Inclusive of sample taxes • Not a real offer</span>
          </div>

          <p style="color:var(--text-secondary); font-size:1rem; margin-bottom:1.25rem;">${product.description}</p>

          <div class="product-meta-grid">
            <div class="meta-item"><span>Suitable Pet Type</span><strong>${product.petType}</strong></div>
            <div class="meta-item"><span>Product Category</span><strong>${product.category}</strong></div>
            <div class="meta-item"><span>Pack / Product Size</span><strong>${product.packSize}</strong></div>
            <div class="meta-item"><span>Suitable Stage</span><strong>${product.lifeStage}</strong></div>
          </div>

          <div class="qty-action-row">
            <div class="qty-control" aria-label="Quantity Selector">
              <button type="button" class="qty-btn" id="detail-qty-minus" aria-label="Decrease quantity">−</button>
              <input type="number" id="detail-qty-input" class="qty-input" value="1" min="1" max="20" aria-label="Quantity">
              <button type="button" class="qty-btn" id="detail-qty-plus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="btn btn-primary" id="detail-add-cart-btn">Add to Demo Cart</button>
            <button type="button" class="btn btn-outline js-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${product.id}">
              ${isWishlisted ? "♥ Saved in Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>

          ${foodFieldsHTML}
        </div>
      </div>

      <div class="accordion">
        <div class="accordion-item open">
          <button type="button" class="accordion-header">
            <span>Product Details (Illustrative Demo Content)</span>
            <span>▾</span>
          </button>
          <div class="accordion-body">
            <p>${product.description} This entry is part of the PET STORE demonstration template and illustrates how product narratives, suitability tags, and clear layout hierarchy help pet owners shop confidently.</p>
          </div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-header">
            <span>Specifications & Materials</span>
            <span>▾</span>
          </button>
          <div class="accordion-body">
            <ul style="list-style:disc; padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem;">
              ${specsRows}
              <li><strong>Demo Label:</strong> Sample specification values for layout demonstration only.</li>
            </ul>
          </div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-header">
            <span>Usage & Care Information</span>
            <span>▾</span>
          </button>
          <div class="accordion-body">
            <p>Always check product sizing and suitability for your pet before routine use. Ensure fresh drinking water is available during meal and play sessions. For specific dietary or health questions, consult a qualified veterinarian.</p>
          </div>
        </div>
        <div class="accordion-item">
          <button type="button" class="accordion-header">
            <span>Frequently Asked Questions</span>
            <span>▾</span>
          </button>
          <div class="accordion-body">
            <p><strong>Can I purchase this item on this website?</strong><br>No. All items, prices, and ratings on PET STORE are illustrative demo content created to showcase e-commerce design and frontend capabilities.</p>
          </div>
        </div>
      </div>
    `;

    // Thumbnail switcher
    detailRoot.querySelectorAll(".product-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        detailRoot.querySelectorAll(".product-thumb-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const viewLabel = btn.getAttribute("data-view");
        const slot = document.getElementById("main-gallery-slot");
        if (slot) {
          slot.innerHTML = createImagePlaceholderHTML(product.imageFilename, `${product.imageSubject} — ${viewLabel}`, "img-placeholder-aspect-4-3");
        }
      });
    });

    // Quantity controls
    const qtyInput = document.getElementById("detail-qty-input");
    const minusBtn = document.getElementById("detail-qty-minus");
    const plusBtn = document.getElementById("detail-qty-plus");
    const addBtn = document.getElementById("detail-add-cart-btn");

    if (minusBtn && qtyInput) {
      minusBtn.addEventListener("click", () => {
        const val = Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1);
        qtyInput.value = val;
      });
    }
    if (plusBtn && qtyInput) {
      plusBtn.addEventListener("click", () => {
        const val = Math.min(20, (parseInt(qtyInput.value, 10) || 1) + 1);
        qtyInput.value = val;
      });
    }
    if (addBtn && qtyInput) {
      addBtn.addEventListener("click", () => {
        const qty = Math.max(1, parseInt(qtyInput.value, 10) || 1);
        addToCart(product.id, qty);
      });
    }

    // Related products
    const relatedGrid = document.getElementById("related-products-grid");
    if (relatedGrid) {
      const related = DEMO_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
      relatedGrid.innerHTML = related.map(p => renderProductCardHTML(p, wishlist)).join("");
    }
  }

  /* --------------------------------------------------------------------------
     CART & WISHLIST PAGE RENDERER
     -------------------------------------------------------------------------- */
  function renderCartAndWishlistPage() {
    const cartContainer = document.getElementById("cart-items-container");
    const wishlistContainer = document.getElementById("wishlist-items-container");
    if (!cartContainer || !wishlistContainer) return;

    const cart = getCart();
    const wishlist = getWishlist();

    if (cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="empty-state">
          <h3 style="font-size:1.25rem; font-weight:800; margin-bottom:0.4rem;">Your Demo Shopping Cart is Empty</h3>
          <p style="color:var(--text-secondary); margin-bottom:1.25rem;">Explore our illustrative pet products and click "Add to Cart" to test the cart experience.</p>
          <a href="shop.html" class="btn btn-primary">Explore Demo Shop</a>
        </div>
      `;
    } else {
      cartContainer.innerHTML = cart.map(item => {
        const product = findProduct(item.id);
        if (!product) return "";
        const lineTotal = product.price * item.qty;
        return `
          <div class="cart-item-row">
            <div>
              ${createImagePlaceholderHTML(product.imageFilename, product.name, "img-placeholder-aspect-1-1")}
            </div>
            <div>
              <span class="demo-pill">${product.petType} • ${product.category}</span>
              <h3 style="font-size:1.05rem; font-weight:800; margin:0.25rem 0;">
                <a href="product.html?id=${product.id}">${product.name}</a>
              </h3>
              <p style="font-size:0.85rem; color:var(--text-secondary);">Sample Unit Price: ₹${product.price.toLocaleString("en-IN")}</p>
              <span class="demo-not-for-sale" style="display:inline-block; margin-top:0.35rem;">DEMO PRODUCT — NOT AVAILABLE FOR PURCHASE</span>
            </div>
            <div class="qty-control">
              <button type="button" class="qty-btn js-cart-qty-btn" data-id="${product.id}" data-qty="${item.qty - 1}">−</button>
              <span class="qty-input" style="display:inline-flex; align-items:center; justify-content:center;">${item.qty}</span>
              <button type="button" class="qty-btn js-cart-qty-btn" data-id="${product.id}" data-qty="${item.qty + 1}">+</button>
            </div>
            <div style="font-weight:900; font-size:1.1rem;">
              ₹${lineTotal.toLocaleString("en-IN")}
            </div>
            <div>
              <button type="button" class="btn btn-outline btn-sm js-cart-qty-btn" data-id="${product.id}" data-qty="0" aria-label="Remove ${product.name}">Remove</button>
            </div>
          </div>
        `;
      }).join("");
    }

    // Update Summary Totals
    const subtotal = cart.reduce((sum, item) => {
      const p = findProduct(item.id);
      return sum + (p ? p.price * item.qty : 0);
    }, 0);
    const shipping = subtotal > 0 ? 99 : 0;
    const total = subtotal + shipping;

    const subEl = document.getElementById("summary-subtotal");
    const shipEl = document.getElementById("summary-shipping");
    const totEl = document.getElementById("summary-total");

    if (subEl) subEl.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    if (shipEl) shipEl.textContent = subtotal > 0 ? `₹${shipping} (Demo Flat Rate)` : "₹0";
    if (totEl) totEl.textContent = `₹${total.toLocaleString("en-IN")}`;

    // Render Wishlist
    if (wishlist.length === 0) {
      wishlistContainer.innerHTML = `
        <div class="empty-state">
          <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:0.4rem;">Your Demo Wishlist is Empty</h3>
          <p style="color:var(--text-secondary);">Click the heart icon on any product card to save items here for comparison.</p>
        </div>
      `;
    } else {
      wishlistContainer.innerHTML = `<div class="products-grid">` + wishlist.map(id => {
        const product = findProduct(id);
        if (!product) return "";
        return `
          <article class="product-card">
            <div class="product-card-media">
              ${createImagePlaceholderHTML(product.imageFilename, product.imageSubject, "img-placeholder-aspect-4-3")}
            </div>
            <div class="product-card-body">
              <div class="product-card-cat">${product.petType} • ${product.category}</div>
              <h3 class="product-card-title"><a href="product.html?id=${product.id}">${product.name}</a></h3>
              <p class="product-price" style="margin:0.5rem 0;">₹${product.price.toLocaleString("en-IN")} <span style="font-size:0.75rem; font-weight:600; color:var(--text-secondary);">(Demo Price)</span></p>
              <div style="display:flex; gap:0.5rem; margin-top:auto; padding-top:0.75rem;">
                <button type="button" class="btn btn-primary btn-sm js-move-to-cart" data-id="${product.id}" style="flex:1;">Move to Cart</button>
                <button type="button" class="btn btn-outline btn-sm js-wishlist-toggle" data-id="${product.id}">Remove</button>
              </div>
              <span class="demo-not-for-sale">DEMO PRODUCT — NOT AVAILABLE FOR PURCHASE</span>
            </div>
          </article>
        `;
      }).join("") + `</div>`;
    }
  }

  /* --------------------------------------------------------------------------
     CONTACT FORM VALIDATION
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("demo-contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = document.getElementById("contact-name");
      const emailInput = document.getElementById("contact-email");
      const phoneInput = document.getElementById("contact-phone");
      const subjectInput = document.getElementById("contact-subject");
      const msgInput = document.getElementById("contact-message");

      function setValidity(input, valid) {
        const group = input.closest(".form-group");
        if (!group) return;
        group.classList.toggle("invalid", !valid);
        if (!valid) isValid = false;
      }

      setValidity(nameInput, nameInput.value.trim().length >= 2);
      setValidity(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
      setValidity(phoneInput, /^[0-9+\-\s()]{7,15}$/.test(phoneInput.value.trim()));
      setValidity(subjectInput, subjectInput.value.trim().length >= 3);
      setValidity(msgInput, msgInput.value.trim().length >= 10);

      if (isValid) {
        const successBox = document.getElementById("contact-success-box");
        if (successBox) {
          successBox.style.display = "block";
        }
        form.reset();
        showToast("Demo inquiry validated locally (no data transmitted).");
      }
    });
  }

  /* --------------------------------------------------------------------------
     GLOBAL EVENT LISTENERS & UI INITIALIZATION
     -------------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    updateHeaderBadges();
    initHomePage();
    initShopPage();
    initProductDetailsPage();
    renderCartAndWishlistPage();
    initContactForm();

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const navLinks = document.getElementById("main-nav-links");
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener("click", () => {
        const open = navLinks.classList.toggle("mobile-open");
        mobileBtn.setAttribute("aria-expanded", String(open));
      });
    }

    // Header Search Toggle
    const searchToggle = document.getElementById("header-search-toggle");
    const searchBar = document.getElementById("header-search-bar");
    if (searchToggle && searchBar) {
      searchToggle.addEventListener("click", () => {
        searchBar.classList.toggle("active");
        const inp = searchBar.querySelector("input");
        if (inp && searchBar.classList.contains("active")) inp.focus();
      });
    }

    // Clear Cart & Demo Checkout Modal
    const clearCartBtn = document.getElementById("clear-cart-btn");
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", clearCart);
    }

    const checkoutBtn = document.getElementById("proceed-demo-checkout-btn");
    const checkoutModal = document.getElementById("demo-checkout-modal");
    if (checkoutBtn && checkoutModal) {
      checkoutBtn.addEventListener("click", () => {
        if (getCart().length === 0) {
          showToast("Add at least one demo item to preview the checkout screen.");
          return;
        }
        checkoutModal.classList.add("open");
      });
    }

    const demoOrderPreviewBtn = document.getElementById("simulate-demo-order-btn");
    if (demoOrderPreviewBtn) {
      demoOrderPreviewBtn.addEventListener("click", () => {
        const notice = document.getElementById("demo-checkout-confirmation");
        if (notice) notice.style.display = "block";
        showToast("DEMO MODE — No real order or payment was processed.");
      });
    }

    // Delegated click handlers for dynamic buttons
    document.body.addEventListener("click", (e) => {
      const addBtn = e.target.closest(".js-add-to-cart");
      if (addBtn) {
        addToCart(addBtn.getAttribute("data-id"), 1);
        return;
      }

      const wishBtn = e.target.closest(".js-wishlist-toggle");
      if (wishBtn) {
        toggleWishlist(wishBtn.getAttribute("data-id"));
        return;
      }

      const qvBtn = e.target.closest(".js-quick-view");
      if (qvBtn) {
        openQuickView(qvBtn.getAttribute("data-id"));
        return;
      }

      const qtyBtn = e.target.closest(".js-cart-qty-btn");
      if (qtyBtn) {
        const id = qtyBtn.getAttribute("data-id");
        const qty = parseInt(qtyBtn.getAttribute("data-qty"), 10);
        updateCartQty(id, qty);
        return;
      }

      const moveBtn = e.target.closest(".js-move-to-cart");
      if (moveBtn) {
        const id = moveBtn.getAttribute("data-id");
        addToCart(id, 1);
        toggleWishlist(id);
        return;
      }

      const closeBtn = e.target.closest(".js-modal-close");
      if (closeBtn) {
        const backdrop = closeBtn.closest(".modal-backdrop");
        if (backdrop) backdrop.classList.remove("open");
        return;
      }

      if (e.target.classList.contains("modal-backdrop")) {
        e.target.classList.remove("open");
        return;
      }

      const accHeader = e.target.closest(".accordion-header");
      if (accHeader) {
        const item = accHeader.closest(".accordion-item");
        if (item) item.classList.toggle("open");
      }
    });

    // Sticky Header & Back to Top
    const backToTop = document.getElementById("back-to-top");
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 20);
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 400);
    });

    if (backToTop) {
      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
