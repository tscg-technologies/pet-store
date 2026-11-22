/* ==========================================================================
   PET STORE — ILLUSTRATIVE DEMO DATA & SHARED COMPONENTS
   Strictly Sample Data — All Products, Prices & Ratings are Illustrative
   ========================================================================== */

const DEMO_PRODUCTS = [
  {
    id: "p1",
    name: "Wholesome Chicken & Brown Rice Adult Dog Kibble",
    petType: "Dogs",
    category: "Dog Food",
    productType: "Dry Food",
    brand: "DemoLine Nutrition",
    price: 1450,
    rating: "4.8",
    reviewsCount: 42,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "3 kg Bag",
    lifeStage: "Adult Dogs (1–7 Years)",
    imageFilename: "product-dog-food-kibble.jpeg",
    imageSubject: "Premium Kraft Bag of Adult Dog Kibble with Bowl",
    shortDesc: "Balanced everyday dry kibble crafted with culinary chicken, brown rice, and garden vegetables for adult dogs.",
    description: "An illustrative everyday dry food blend formulated for adult dogs. Features wholesome chicken protein paired with digestible brown rice and crunchy kibble texture suitable for daily feeding routines.",
    isFood: true,
    ingredients: "Deboned Chicken, Brown Rice, Oatmeal, Barley, Green Peas, Flaxseed, Carrots, Dried Kelp, Essential Minerals & Vitamins (Illustrative Sample List).",
    nutrition: "Crude Protein (min) 24%, Crude Fat (min) 14%, Crude Fiber (max) 4.5%, Moisture (max) 10% (Sample Values).",
    feedingGuide: "Small Dogs (5–10 kg): 1 to 1.5 cups daily. Medium Dogs (10–25 kg): 1.5 to 2.75 cups daily. Always provide fresh drinking water.",
    specs: {
      "Item Form": "Dry Kibble Pellets",
      "Package Weight": "3 kg",
      "Storage": "Store in a cool, dry place away from sunlight"
    }
  },
  {
    id: "p2",
    name: "Ocean Salmon & Herb Grain-Free Indoor Cat Food",
    petType: "Cats",
    category: "Cat Food",
    productType: "Dry Food",
    brand: "DemoLine Nutrition",
    price: 1290,
    rating: "4.7",
    reviewsCount: 36,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "2 kg Bag",
    lifeStage: "Adult Indoor Cats",
    imageFilename: "product-cat-food-salmon.jpeg",
    imageSubject: "Salmon Indoor Cat Food Bag with Ceramic Dish",
    shortDesc: "Aromatic salmon-based dry nutrition tailored for adult indoor cats with balanced fiber and crunch.",
    description: "Illustrative premium cat nutrition featuring ocean salmon meal, sweet potato, and botanical herbs. Designed as a sample showcase for indoor feline daily feeding.",
    isFood: true,
    ingredients: "Salmon Meal, Sweet Potatoes, Peas, Chicken Fat, Dried Chicory Root, Cranberries, Rosemary Extract (Illustrative Sample List).",
    nutrition: "Crude Protein (min) 32%, Crude Fat (min) 15%, Crude Fiber (max) 5%, Taurine (min) 0.15% (Sample Values).",
    feedingGuide: "Adult Cats (3–5 kg): 45g to 70g per day divided into two meals. Ensure clean water is available at all times.",
    specs: {
      "Item Form": "Bite-Sized Kibble",
      "Package Weight": "2 kg",
      "Storage": "Reseal pouch tightly after opening"
    }
  },
  {
    id: "p3",
    name: "Handwoven Cotton Rope & Natural Rubber Tug Toy",
    petType: "Dogs",
    category: "Toys",
    productType: "Interactive Toy",
    brand: "DemoPlay Studio",
    price: 490,
    rating: "4.6",
    reviewsCount: 28,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "Medium (32 cm)",
    lifeStage: "Puppies & Adult Dogs",
    imageFilename: "product-dog-rope-toy.jpeg",
    imageSubject: "Braided Cotton Rope & Natural Rubber Ring Dog Toy",
    shortDesc: "Durable braided cotton rope combined with a textured rubber ring for interactive fetch and gentle tug play.",
    description: "Designed for supervised interactive playtime, this sample toy pairs soft braided cotton fibers with a grip-friendly rubber loop.",
    isFood: false,
    specs: {
      "Material": "100% Braided Cotton & Natural Rubber",
      "Dimensions": "32 cm x 11 cm",
      "Care": "Hand wash with mild soap and air dry"
    }
  },
  {
    id: "p4",
    name: "Cloud-Soft Bolster Lounger Pet Bed",
    petType: "Dogs",
    category: "Beds",
    productType: "Bedding",
    brand: "DemoHome Pets",
    price: 2490,
    rating: "4.9",
    reviewsCount: 54,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "Large (85 x 65 cm)",
    lifeStage: "All Life Stages",
    imageFilename: "product-orthopedic-pet-bed.jpeg",
    imageSubject: "Oatmeal Linen Bolster Lounger Pet Bed",
    shortDesc: "Supportive cushioned pet bed with raised bolster edges and removable washable oatmeal-toned fabric cover.",
    description: "A cozy lounging sanctuary for dogs and cats alike. Features a plush inner cushion, supportive side bolsters for head resting, and a non-slip bottom base.",
    isFood: false,
    specs: {
      "Outer Fabric": "Woven Oatmeal Polyester-Linen Blend",
      "Base": "Anti-skid dotted fabric",
      "Care": "Removable zippered cover, cold gentle wash"
    }
  },
  {
    id: "p5",
    name: "Padded Botanical Green Everyday Harness & Leash Set",
    petType: "Dogs",
    category: "Collars & Leashes",
    productType: "Walk Gear",
    brand: "DemoWalk Co.",
    price: 1150,
    rating: "4.7",
    reviewsCount: 31,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "Medium Chest (50–68 cm)",
    lifeStage: "Adult Dogs",
    imageFilename: "product-harness-leash-set.jpeg",
    imageSubject: "Forest Green Padded Dog Harness and Matching Leash",
    shortDesc: "Breathable mesh-lined step-in chest harness with brushed brass hardware and matching 1.5m walking leash.",
    description: "Engineered for comfortable daily walks, this sample harness set features adjustable straps, soft breathable lining, and sturdy clips.",
    isFood: false,
    specs: {
      "Webbing": "High-density soft nylon",
      "Hardware": "Brushed matte brass alloy",
      "Leash Length": "150 cm"
    }
  },
  {
    id: "p6",
    name: "Oatmeal & Aloe Gentle Pet Grooming Wash & Brush Duo",
    petType: "Cats",
    category: "Grooming",
    productType: "Coat Care",
    brand: "DemoCare Botanicals",
    price: 780,
    rating: "4.8",
    reviewsCount: 24,
    availability: "In Stock (Demo)",
    featured: true,
    packSize: "300 ml + Bamboo Brush",
    lifeStage: "Dogs & Cats",
    imageFilename: "product-grooming-shampoo-brush.jpeg",
    imageSubject: "Gentle Oatmeal Pet Wash Bottle and Bamboo Brush",
    shortDesc: "Mild coat cleansing wash paired with a rounded-pin bamboo grooming brush for everyday coat maintenance.",
    description: "An illustrative grooming set designed for routine bath and brushing sessions. Leaves coats clean, soft, and tangle-free.",
    isFood: false,
    specs: {
      "Bottle Volume": "300 ml",
      "Brush Material": "Natural Bamboo with Cushioned Pins",
      "Usage": "External coat grooming only"
    }
  },
  {
    id: "p7",
    name: "Tropical Seed, Millet & Fruit Blend for Companion Birds",
    petType: "Birds",
    category: "Bird Food",
    productType: "Seed Mix",
    brand: "DemoAvian Pantry",
    price: 540,
    rating: "4.6",
    reviewsCount: 19,
    availability: "In Stock (Demo)",
    featured: false,
    packSize: "1 kg Pouch",
    lifeStage: "Parakeets, Finches & Cockatiels",
    imageFilename: "product-bird-seed-blend.jpeg",
    imageSubject: "Tropical Bird Seed and Dried Fruit Pouch with Wooden Scoop",
    shortDesc: "Clean, dust-screened blend of white millet, canary seed, oats, and dried papaya pieces for companion birds.",
    description: "Illustrative avian pantry staple combining a variety of seeds and grains to encourage natural foraging behaviors.",
    isFood: true,
    ingredients: "White Proso Millet, Canary Grass Seed, Oat Groats, Red Millet, Dried Papaya, Dried Apple, Flaxseed (Illustrative Sample List).",
    nutrition: "Crude Protein (min) 13%, Crude Fat (min) 5.5%, Crude Fiber (max) 8% (Sample Values).",
    feedingGuide: "Provide 1–3 tablespoons daily per bird depending on species size. Refresh seed cup and clean water daily.",
    specs: {
      "Packaging": "Resealable Stand-Up Pouch",
      "Net Weight": "1 kg",
      "Suitable For": "Budgies, Cockatiels, Finches"
    }
  },
  {
    id: "p8",
    name: "Sun-Cured Timothy Hay & Herbal Meadow Mix",
    petType: "Small Pets",
    category: "Small Pet Food",
    productType: "Forage Hay",
    brand: "DemoMeadow Small Pets",
    price: 620,
    rating: "4.9",
    reviewsCount: 29,
    availability: "In Stock (Demo)",
    featured: false,
    packSize: "1.2 kg Bag",
    lifeStage: "Rabbits, Guinea Pigs & Chinchillas",
    imageFilename: "product-small-pet-timothy-hay.jpeg",
    imageSubject: "Sun-Cured Green Timothy Hay Bag with Chamomile Blossoms",
    shortDesc: "Long-strand aromatic Timothy hay blended with dried chamomile and marigold petals for small herbivores.",
    description: "High-fiber forage sample product designed to support everyday nibbling and habitat enrichment for rabbits and guinea pigs.",
    isFood: true,
    ingredients: "100% Sun-Cured Timothy Grass Hay, Dried Chamomile Flowers, Dried Marigold Petals (Illustrative Sample List).",
    nutrition: "Crude Protein (min) 8%, Crude Fat (min) 1.8%, Crude Fiber (max) 32% (Sample Values).",
    feedingGuide: "Offer unlimited fresh hay daily in a clean hay rack alongside fresh water.",
    specs: {
      "Cut Type": "Second Cut Long-Strand",
      "Weight": "1.2 kg",
      "Origin": "Sample Demo Harvest"
    }
  },
  {
    id: "p9",
    name: "Oven-Baked Pumpkin & Peanut Butter Crunchy Dog Biscuits",
    petType: "Dogs",
    category: "Treats",
    productType: "Biscuit Treats",
    brand: "DemoLine Nutrition",
    price: 380,
    rating: "4.8",
    reviewsCount: 47,
    availability: "In Stock (Demo)",
    featured: false,
    packSize: "400 g Jar",
    lifeStage: "All Dogs",
    imageFilename: "product-peanut-pumpkin-treats.jpeg",
    imageSubject: "Jar of Bone-Shaped Pumpkin & Peanut Butter Dog Biscuits",
    shortDesc: "Small-batch style crunchy biscuit treats made with oat flour, pumpkin puree, and roasted peanut butter.",
    description: "Ideal as an illustrative training reward or afternoon snack. Conveniently sized for pockets and treat pouches.",
    isFood: true,
    ingredients: "Oat Flour, Pumpkin Puree, Peanut Butter, Rolled Oats, Cinnamon, Coconut Oil (Illustrative Sample List).",
    nutrition: "Crude Protein (min) 14%, Crude Fat (min) 11%, Crude Fiber (max) 3.5% (Sample Values).",
    feedingGuide: "Feed as an occasional reward treat alongside a balanced diet.",
    specs: {
      "Texture": "Crunchy Oven-Baked",
      "Net Weight": "400 g",
      "Shape": "Mini Bone Biscuits"
    }
  },
  {
    id: "p10",
    name: "Elevated Bamboo Double Ceramic Feeding Station",
    petType: "Cats",
    category: "Feeding Accessories",
    productType: "Bowls & Feeders",
    brand: "DemoHome Pets",
    price: 1350,
    rating: "4.7",
    reviewsCount: 33,
    availability: "In Stock (Demo)",
    featured: false,
    packSize: "2 x 400 ml Bowls",
    lifeStage: "Cats & Small Dogs",
    imageFilename: "product-ceramic-bamboo-bowls.jpeg",
    imageSubject: "Elevated Bamboo Stand with Two Matte Cream Ceramic Pet Bowls",
    shortDesc: "Ergonomic angled bamboo stand holding two heavy-duty glazed ceramic bowls for food and water.",
    description: "Combines warm natural bamboo wood with easy-to-clean ceramic dishes, keeping feeding areas tidy and elevated.",
    isFood: false,
    specs: {
      "Bowl Material": "Lead-Free Glazed Ceramic",
      "Stand Material": "Water-Resistant Natural Bamboo",
      "Capacity": "400 ml per bowl"
    }
  },
  {
    id: "p11",
    name: "Ventilated Soft-Sided Cabin & Car Pet Travel Carrier",
    petType: "Cats",
    category: "Travel Accessories",
    productType: "Carriers",
    brand: "DemoWalk Co.",
    price: 2850,
    rating: "4.8",
    reviewsCount: 21,
    availability: "Limited Demo Sample",
    featured: false,
    packSize: "45 x 28 x 28 cm",
    lifeStage: "Cats & Small Pets up to 7 kg",
    imageFilename: "product-pet-travel-carrier.jpeg",
    imageSubject: "Soft-Sided Sage and Beige Ventilated Pet Travel Carrier Bag",
    shortDesc: "Lightweight structured travel carrier with four-sided breathable mesh windows and fleece base pad.",
    description: "Designed to showcase convenient pet transport solutions with top and side zippered entry points and a padded shoulder strap.",
    isFood: false,
    specs: {
      "Dimensions": "45 cm L x 28 cm W x 28 cm H",
      "Features": "Breathable Mesh Panels, Safety Tether, Fleece Mat",
      "Folding": "Folds flat for closet storage"
    }
  },
  {
    id: "p12",
    name: "Cozy Ribbed Cotton Knit All-Season Pet Sweater",
    petType: "Dogs",
    category: "Pet Clothing",
    productType: "Apparel",
    brand: "DemoHome Pets",
    price: 890,
    rating: "4.7",
    reviewsCount: 18,
    availability: "In Stock (Demo)",
    featured: false,
    packSize: "Small / Medium",
    lifeStage: "Small & Medium Dogs",
    imageFilename: "product-dog-knit-sweater.jpeg",
    imageSubject: "Warm Terracotta & Cream Ribbed Knit Dog Sweater",
    shortDesc: "Stretchable soft cotton-blend knit pullover with leash keyhole opening for breezy morning walks.",
    description: "A comfortable, non-restrictive knit layer in warm earth tones designed for easy pull-on dressing.",
    isFood: false,
    specs: {
      "Fabric": "100% Combed Cotton Knit",
      "Cut": "High tummy cut with harness slot",
      "Care": "Machine wash cold, dry flat"
    }
  }
];

/* ==========================================================================
   PLACEHOLDER RENDERER HELPER
   ========================================================================== */
function createImagePlaceholderHTML(filename, subject, aspectClass = "img-placeholder-aspect-4-3") {
  const cleanFile = filename.replace(/\.(jpg|jpeg)$/i, "") + ".jpeg";
  return `
    <div class="img-placeholder has-image ${aspectClass}" role="img" aria-label="${subject}">
      <img src="images/${cleanFile}" alt="${subject}" loading="lazy" onerror="this.onerror=null; this.src='assets/images/${cleanFile}';">
    </div>
  `;
}

/* ==========================================================================
   REUSABLE PRODUCT CARD RENDERER
   ========================================================================== */
function renderProductCardHTML(product, wishlistIds = []) {
  const isWishlisted = wishlistIds.includes(product.id);
  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card-media">
        <div class="product-card-badges">
          <span class="pet-badge">${product.petType}</span>
          <span class="demo-pill">Demo Item</span>
        </div>
        <div class="product-card-actions-overlay">
          <button type="button" class="card-action-btn js-wishlist-toggle ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Toggle Wishlist for ${product.name}" title="Add to Wishlist">
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button type="button" class="card-action-btn js-quick-view" data-id="${product.id}" aria-label="Quick View ${product.name}" title="Quick View">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
        <a href="product.html?id=${product.id}">
          ${createImagePlaceholderHTML(product.imageFilename, product.imageSubject, "img-placeholder-aspect-4-3")}
        </a>
      </div>
      <div class="product-card-body">
        <div class="product-card-cat">${product.category} • ${product.packSize}</div>
        <h3 class="product-card-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-card-rating" title="Illustrative Demo Rating">
          <span class="stars" aria-hidden="true">★★★★★</span>
          <span><strong>${product.rating}</strong> (${product.reviewsCount} Demo Rating — Illustrative)</span>
        </div>
        <p class="product-card-desc">${product.shortDesc}</p>
        <div class="product-card-footer">
          <div class="product-price-wrap">
            <span class="product-price-label">Illustrative Demo Price</span>
            <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          </div>
          <div class="product-card-btns">
            <button type="button" class="btn btn-primary btn-sm js-add-to-cart" data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
        <span class="demo-not-for-sale">DEMO PRODUCT — NOT AVAILABLE FOR PURCHASE</span>
      </div>
    </article>
  `;
}
