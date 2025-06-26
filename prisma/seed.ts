import { prisma } from "@/uitls/db";

async function main() {
  try {
    // Create Users
    console.log("Seeding Users...");
    await prisma.user.createMany({
      data: [
        {
          full_name: "John Doe",
          phone_number: "+8801712345678",
          email: "john@example.com",
          city: "Dhaka",
          address: "123 Mirpur Road, Dhaka",
          role: "CLIENT",
        },
        {
          full_name: "Jane Smith",
          phone_number: "+8801712345679",
          email: "jane@example.com",
          city: "Chittagong",
          address: "456 Agrabad, Chittagong",
          role: "EMPLOYEE",
        },
        {
          full_name: "Admin User",
          phone_number: "+8801712345680",
          email: "admin@example.com",
          city: "Dhака",
          address: "789 Banani, Dhaka",
          role: "ADMIN",
        },
        {
          full_name: "Rahim Khan",
          phone_number: "+8801712345681",
          email: "rahim@example.com",
          city: "Sylhet",
          address: "321 Zindabazar, Sylhet",
          role: "CLIENT",
        },
        {
          full_name: "Fatima Begum",
          phone_number: "+8801712345682",
          email: "fatima@example.com",
          city: "Rajshahi",
          address: "654 Shaheb Bazar, Rajshahi",
          role: "CLIENT",
        },
      ],
      skipDuplicates: true, // Prevent duplicate email/phone_number errors
    });

    // Create Main Services
    console.log("Seeding Main Services...");
    await prisma.service.createMany({
      data: [
        {
          name: "Electrical",
          short_description: "Electrical installation and repair services",
          active: true,
        },
        {
          name: "Plumbing Services",
          short_description: "Professional plumbing solutions",
          active: true,
        },
        {
          name: "Plaster Ceiling and Partition",
          short_description: "Ceiling and partition work",
          active: true,
        },
        {
          name: "Sliding Doors and Windows",
          short_description: "Sliding door and window installation",
          active: true,
        },
        {
          name: "Painting",
          short_description: "Interior and exterior painting",
          active: true,
        },
        {
          name: "Cabinets",
          short_description: "Custom cabinets for home and office",
          active: true,
        },
        {
          name: "Locksmith",
          short_description: "Lock installation and repair",
          active: true,
        },
        {
          name: "Tiles Work",
          short_description: "Tile installation and repair",
          active: true,
        },
        {
          name: "Air-cond Service and Install",
          short_description: "AC installation and maintenance",
          active: true,
        },
        {
          name: "Fridge and Washing Machine Repair",
          short_description: "Appliance repair services",
          active: true,
        },
      ],
      skipDuplicates: true,
    });

    // Fetch main service IDs for sub-services
    const mainServices = await prisma.service.findMany({
      where: { parent_id: null },
      select: { id: true, name: true },
    });
    const serviceMap = mainServices.reduce<Record<string, number>>(
      (map, service) => {
        map[service.name] = service.id;
        return map;
      },
      {}
    );

    // Create Sub-Services (5 per main service)
    console.log("Seeding Sub-Services...");
    const imageUrls = [
      "https://www.spectrumelectricinc.com/blog/admin/uploads/2022/electrical_panel_2_1668762979.jpg",
      "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1565608438257-fac3c27beb36?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1728663593731-0dc0280fd18b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGx1c3RlciUyMGNlbGxpbmd8ZW58MHx8MHx8fDA%3D",
      "https://unsplash.com/photos/brown-wooden-framed-glass-window-JHpU4Wn2qKk",
      "https://images.unsplash.com/photo-1610733374054-59454fe657cd?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1721544364147-bde956e843ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxvY2slMjBzbWl0aHxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ];

    const getRandomImage = () =>
      imageUrls[Math.floor(Math.random() * imageUrls.length)];

    await prisma.service.createMany({
      data: [
        {
          name: "Wiring Installation",
          short_description: "Complete electrical wiring",
          parent_id: serviceMap["Electrical"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Lighting Setup",
          short_description: "Indoor and outdoor lighting",
          parent_id: serviceMap["Electrical"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Circuit Breaker Repair",
          short_description: "Circuit breaker maintenance",
          parent_id: serviceMap["Electrical"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Fan Installation",
          short_description: "Ceiling and exhaust fan setup",
          parent_id: serviceMap["Electrical"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Power Backup Systems",
          short_description: "UPS and generator installation",
          parent_id: serviceMap["Electrical"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Pipe Repair",
          short_description: "Fixing leaks and blockages",
          parent_id: serviceMap["Plumbing Services"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Water Heater Installation",
          short_description: "Geyser setup and repair",
          parent_id: serviceMap["Plumbing Services"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Drain Cleaning",
          short_description: "Clearing clogged drains",
          parent_id: serviceMap["Plumbing Services"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Faucet Installation",
          short_description: "Sink and tap installation",
          parent_id: serviceMap["Plumbing Services"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Sewage System Maintenance",
          short_description: "Sewage line repair",
          parent_id: serviceMap["Plumbing Services"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "False Ceiling",
          short_description: "Decorative ceiling installation",
          parent_id: serviceMap["Plaster Ceiling and Partition"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Partition Walls",
          short_description: "Room divider installation",
          parent_id: serviceMap["Plaster Ceiling and Partition"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Gypsum Board Setup",
          short_description: "Gypsum board installation",
          parent_id: serviceMap["Plaster Ceiling and Partition"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Ceiling Repair",
          short_description: "Fixing damaged ceilings",
          parent_id: serviceMap["Plaster Ceiling and Partition"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Acoustic Panels",
          short_description: "Soundproof panel installation",
          parent_id: serviceMap["Plaster Ceiling and Partition"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Glass Sliding Doors",
          short_description: "Glass door installation",
          parent_id: serviceMap["Sliding Doors and Windows"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Aluminum Windows",
          short_description: "Aluminum window setup",
          parent_id: serviceMap["Sliding Doors and Windows"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Sliding Gate Systems",
          short_description: "Automatic sliding gates",
          parent_id: serviceMap["Sliding Doors and Windows"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Window Frame Repair",
          short_description: "Fixing window frames",
          parent_id: serviceMap["Sliding Doors and Windows"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Patio Doors",
          short_description: "Sliding patio door setup",
          parent_id: serviceMap["Sliding Doors and Windows"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Interior Painting",
          short_description: "Indoor wall painting",
          parent_id: serviceMap["Painting"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Exterior Painting",
          short_description: "Outdoor wall painting",
          parent_id: serviceMap["Painting"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Decorative Painting",
          short_description: "Custom paint designs",
          parent_id: serviceMap["Painting"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Wallpaper Installation",
          short_description: "Wallpaper application",
          parent_id: serviceMap["Painting"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Fence Painting",
          short_description: "Painting outdoor fences",
          parent_id: serviceMap["Painting"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Kitchen Cabinets",
          short_description: "Custom kitchen storage",
          parent_id: serviceMap["Cabinets"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Office Cabinets",
          short_description: "Office storage solutions",
          parent_id: serviceMap["Cabinets"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Wardrobe Cabinets",
          short_description: "Bedroom wardrobe setup",
          parent_id: serviceMap["Cabinets"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Bathroom Cabinets",
          short_description: "Bathroom storage units",
          parent_id: serviceMap["Cabinets"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Custom Shelving",
          short_description: "Bespoke shelving units",
          parent_id: serviceMap["Cabinets"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Lock Installation",
          short_description: "New lock setup",
          parent_id: serviceMap["Locksmith"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Lock Repair",
          short_description: "Fixing broken locks",
          parent_id: serviceMap["Locksmith"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Key Duplication",
          short_description: "Making spare keys",
          parent_id: serviceMap["Locksmith"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Smart Lock Systems",
          short_description: "Digital lock installation",
          parent_id: serviceMap["Locksmith"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Safe Installation",
          short_description: "Home safe setup",
          parent_id: serviceMap["Locksmith"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Ceramic Tiles",
          short_description: "Ceramic tile installation",
          parent_id: serviceMap["Tiles Work"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Porcelain Tiles",
          short_description: "Porcelain tile setup",
          parent_id: serviceMap["Tiles Work"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Mosaic Tiles",
          short_description: "Decorative mosaic tiling",
          parent_id: serviceMap["Tiles Work"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Tile Repair",
          short_description: "Fixing damaged tiles",
          parent_id: serviceMap["Tiles Work"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Outdoor Tiles",
          short_description: "Outdoor tile installation",
          parent_id: serviceMap["Tiles Work"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "AC Installation",
          short_description: "New AC unit setup",
          parent_id: serviceMap["Air-cond Service and Install"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "AC Maintenance",
          short_description: "Regular AC servicing",
          parent_id: serviceMap["Air-cond Service and Install"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "AC Repair",
          short_description: "Fixing AC units",
          parent_id: serviceMap["Air-cond Service and Install"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Duct Cleaning",
          short_description: "AC duct cleaning",
          parent_id: serviceMap["Air-cond Service and Install"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "AC Gas Refilling",
          short_description: "Refilling AC coolant",
          parent_id: serviceMap["Air-cond Service and Install"],
          active: true,
          image_url: getRandomImage(),
        },

        {
          name: "Fridge Repair",
          short_description: "Refrigerator repair",
          parent_id: serviceMap["Fridge and Washing Machine Repair"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Washing Machine Repair",
          short_description: "Washing machine repair",
          parent_id: serviceMap["Fridge and Washing Machine Repair"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Dryer Repair",
          short_description: "Clothes dryer repair",
          parent_id: serviceMap["Fridge and Washing Machine Repair"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Compressor Replacement",
          short_description: "Fridge compressor repair",
          parent_id: serviceMap["Fridge and Washing Machine Repair"],
          active: true,
          image_url: getRandomImage(),
        },
        {
          name: "Appliance Maintenance",
          short_description: "Routine appliance checkup",
          parent_id: serviceMap["Fridge and Washing Machine Repair"],
          active: true,
          image_url: getRandomImage(),
        },
      ],
      skipDuplicates: true,
    });

    // Create Service Details (for main services)
    console.log("Seeding Service Details...");
    await prisma.serviceDetail.createMany({
      data: [
        {
          service_id: serviceMap["Electrical"],
          price: 5000,
          short_description: "Electrical wiring",
          long_description:
            "Complete electrical wiring and installation services",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          price: 4000,
          short_description: "Pipe repair",
          long_description: "Comprehensive plumbing and pipe repair services",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          price: 6000,
          short_description: "Ceiling installation",
          long_description: "Professional ceiling and partition installation",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          price: 8000,
          short_description: "Sliding door setup",
          long_description: "Installation of sliding doors and windows",
        },
        {
          service_id: serviceMap["Painting"],
          price: 3000,
          short_description: "Wall painting",
          long_description: "Interior and exterior wall painting services",
        },
        {
          service_id: serviceMap["Cabinets"],
          price: 10000,
          short_description: "Custom cabinets",
          long_description: "Custom cabinet design and installation",
        },
        {
          service_id: serviceMap["Locksmith"],
          price: 2000,
          short_description: "Lock repair",
          long_description: "Lock installation and repair services",
        },
        {
          service_id: serviceMap["Tiles Work"],
          price: 4500,
          short_description: "Tile installation",
          long_description: "Ceramic and porcelain tile installation",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          price: 7000,
          short_description: "AC maintenance",
          long_description: "Air conditioner installation and servicing",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          price: 3500,
          short_description: "Appliance repair",
          long_description: "Fridge and washing machine repair services",
        },
      ],
      skipDuplicates: true,
    });

    // Create Service Features (5 per main service)
    console.log("Seeding Service Features...");
    await prisma.serviceFeature.createMany({
      data: [
        // Electrical Features
        {
          service_id: serviceMap["Electrical"],
          feature_text: "24/7 emergency electrical services",
        },
        {
          service_id: serviceMap["Electrical"],
          feature_text: "Certified electricians",
        },
        {
          service_id: serviceMap["Electrical"],
          feature_text: "Energy-efficient solutions",
        },
        {
          service_id: serviceMap["Electrical"],
          feature_text: "Warranty on repairs",
        },
        {
          service_id: serviceMap["Electrical"],
          feature_text: "Quick response time",
        },
        // Plumbing Features
        {
          service_id: serviceMap["Plumbing Services"],
          feature_text: "Leak detection services",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          feature_text: "24/7 plumbing support",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          feature_text: "High-quality materials",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          feature_text: "Fast pipe repairs",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          feature_text: "Water-saving solutions",
        },
        // Plaster Ceiling and Partition Features
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          feature_text: "Custom ceiling designs",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          feature_text: "Soundproof partitions",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          feature_text: "Durable materials",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          feature_text: "Quick installation",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          feature_text: "Modern aesthetics",
        },
        // Sliding Doors and Windows Features
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          feature_text: "Smooth sliding mechanisms",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          feature_text: "Energy-efficient glass",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          feature_text: "Custom designs",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          feature_text: "Secure locking systems",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          feature_text: "Weather-resistant materials",
        },
        // Painting Features
        {
          service_id: serviceMap["Painting"],
          feature_text: "Eco-friendly paints",
        },
        {
          service_id: serviceMap["Painting"],
          feature_text: "Color consultation",
        },
        {
          service_id: serviceMap["Painting"],
          feature_text: "Long-lasting finish",
        },
        {
          service_id: serviceMap["Painting"],
          feature_text: "Surface preparation",
        },
        { service_id: serviceMap["Painting"], feature_text: "Quick cleanup" },
        // Cabinets Features
        {
          service_id: serviceMap["Cabinets"],
          feature_text: "Customizable designs",
        },
        {
          service_id: serviceMap["Cabinets"],
          feature_text: "High-quality wood",
        },
        {
          service_id: serviceMap["Cabinets"],
          feature_text: "Space-saving solutions",
        },
        {
          service_id: serviceMap["Cabinets"],
          feature_text: "Durable hardware",
        },
        {
          service_id: serviceMap["Cabinets"],
          feature_text: "Professional installation",
        },
        // Locksmith Features
        {
          service_id: serviceMap["Locksmith"],
          feature_text: "High-security locks",
        },
        {
          service_id: serviceMap["Locksmith"],
          feature_text: "24/7 lockout service",
        },
        {
          service_id: serviceMap["Locksmith"],
          feature_text: "Smart lock integration",
        },
        {
          service_id: serviceMap["Locksmith"],
          feature_text: "Fast key duplication",
        },
        {
          service_id: serviceMap["Locksmith"],
          feature_text: "Reliable repairs",
        },
        // Tiles Work Features
        {
          service_id: serviceMap["Tiles Work"],
          feature_text: "Variety of tile patterns",
        },
        {
          service_id: serviceMap["Tiles Work"],
          feature_text: "Precision installation",
        },
        { service_id: serviceMap["Tiles Work"], feature_text: "Durable grout" },
        {
          service_id: serviceMap["Tiles Work"],
          feature_text: "Non-slip options",
        },
        {
          service_id: serviceMap["Tiles Work"],
          feature_text: "Easy maintenance",
        },
        // Air-cond Service and Install Features
        {
          service_id: serviceMap["Air-cond Service and Install"],
          feature_text: "Energy-efficient AC units",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          feature_text: "Regular maintenance plans",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          feature_text: "Fast repair service",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          feature_text: "Quiet operation",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          feature_text: "Certified technicians",
        },
        // Fridge and Washing Machine Repair Features
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          feature_text: "Quick diagnosis",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          feature_text: "Genuine spare parts",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          feature_text: "Warranty on repairs",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          feature_text: "Same-day service",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          feature_text: "Affordable rates",
        },
      ],
      skipDuplicates: true,
    });

    // Create Review Permissions (before Reviews)
    console.log("Seeding Review Permissions...");
    await prisma.reviewPermission.createMany({
      data: [
        { phone_number: "+8801712345678" },
        { phone_number: "+8801712345679" },
        { phone_number: "+8801712345680" },
        { phone_number: "+8801712345681" },
        { phone_number: "+8801712345682" },
      ],
      skipDuplicates: true,
    });

    // Create Reviews (5 per main service)
    console.log("Seeding Reviews...");
    await prisma.review.createMany({
      data: [
        // Electrical Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Electrical"],
          comment: "Great electrical service!",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Electrical"],
          comment: "Fast and professional wiring",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Electrical"],
          comment: "Excellent lighting setup",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Electrical"],
          comment: "Reliable circuit repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Electrical"],
          comment: "Quick emergency response",
          rating: 5,
        },
        // Plumbing Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Plumbing Services"],
          comment: "Quick plumbing fix",
          rating: 4,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Plumbing Services"],
          comment: "Great water heater installation",
          rating: 5,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Plumbing Services"],
          comment: "Efficient drain cleaning",
          rating: 4,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Plumbing Services"],
          comment: "Professional faucet setup",
          rating: 5,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Plumbing Services"],
          comment: "Reliable sewage repair",
          rating: 4,
        },
        // Plaster Ceiling and Partition Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Plaster Ceiling and Partition"],
          comment: "Beautiful ceiling design",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Plaster Ceiling and Partition"],
          comment: "Sturdy partition walls",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Plaster Ceiling and Partition"],
          comment: "Great gypsum board work",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Plaster Ceiling and Partition"],
          comment: "Fast ceiling repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Plaster Ceiling and Partition"],
          comment: "Excellent acoustic panels",
          rating: 5,
        },
        // Sliding Doors and Windows Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Sliding Doors and Windows"],
          comment: "Smooth sliding doors",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Sliding Doors and Windows"],
          comment: "Nice aluminum windows",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Sliding Doors and Windows"],
          comment: "Great sliding gate",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Sliding Doors and Windows"],
          comment: "Fast window repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Sliding Doors and Windows"],
          comment: "Lovely patio doors",
          rating: 5,
        },
        // Painting Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Painting"],
          comment: "Perfect interior paint job",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Painting"],
          comment: "Great exterior finish",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Painting"],
          comment: "Beautiful decorative paint",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Painting"],
          comment: "Nice wallpaper work",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Painting"],
          comment: "Clean fence painting",
          rating: 5,
        },
        // Cabinets Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Cabinets"],
          comment: "Awesome kitchen cabinets",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Cabinets"],
          comment: "Sturdy office cabinets",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Cabinets"],
          comment: "Great wardrobe design",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Cabinets"],
          comment: "Nice bathroom cabinets",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Cabinets"],
          comment: "Perfect shelving",
          rating: 5,
        },
        // Locksmith Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Locksmith"],
          comment: "Fast lock installation",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Locksmith"],
          comment: "Reliable lock repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Locksmith"],
          comment: "Quick key duplication",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Locksmith"],
          comment: "Great smart locks",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Locksmith"],
          comment: "Secure safe setup",
          rating: 5,
        },
        // Tiles Work Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Tiles Work"],
          comment: "Beautiful ceramic tiles",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Tiles Work"],
          comment: "Great porcelain tiles",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Tiles Work"],
          comment: "Lovely mosaic design",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Tiles Work"],
          comment: "Fast tile repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Tiles Work"],
          comment: "Nice outdoor tiles",
          rating: 5,
        },
        // Air-cond Service and Install Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Air-cond Service and Install"],
          comment: "Efficient AC installation",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Air-cond Service and Install"],
          comment: "Great AC maintenance",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Air-cond Service and Install"],
          comment: "Fast AC repair",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Air-cond Service and Install"],
          comment: "Clean duct service",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Air-cond Service and Install"],
          comment: "Quick gas refilling",
          rating: 5,
        },
        // Fridge and Washing Machine Repair Reviews
        {
          phone_number: "+8801712345678",
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          comment: "Fast fridge repair",
          rating: 5,
        },
        {
          phone_number: "+8801712345681",
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          comment: "Reliable washer repair",
          rating: 4,
        },
        {
          phone_number: "+8801712345682",
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          comment: "Great dryer repair",
          rating: 5,
        },
        {
          phone_number: "+8801712345679",
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          comment: "Quick compressor fix",
          rating: 4,
        },
        {
          phone_number: "+8801712345680",
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          comment: "Good maintenance service",
          rating: 5,
        },
      ],
      skipDuplicates: true,
    });

    // Create FAQs (5 per main service)
    console.log("Seeding FAQs...");
    await prisma.faq.createMany({
      data: [
        // Electrical FAQs
        {
          service_id: serviceMap["Electrical"],
          question: "Do you provide emergency services?",
          answer: "Yes, we offer 24/7 emergency electrical services.",
        },
        {
          service_id: serviceMap["Electrical"],
          question: "Are your electricians certified?",
          answer: "All our electricians are certified and experienced.",
        },
        {
          service_id: serviceMap["Electrical"],
          question: "What is the warranty period?",
          answer: "We provide a 1-year warranty on all repairs.",
        },
        {
          service_id: serviceMap["Electrical"],
          question: "Can you install energy-efficient lighting?",
          answer: "Yes, we specialize in energy-efficient solutions.",
        },
        {
          service_id: serviceMap["Electrical"],
          question: "How long does wiring take?",
          answer: "Wiring typically takes 1-3 days depending on the project.",
        },
        // Plumbing FAQs
        {
          service_id: serviceMap["Plumbing Services"],
          question: "How long does pipe repair take?",
          answer: "Most pipe repairs are completed within 2-4 hours.",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          question: "Do you fix water heaters?",
          answer: "Yes, we install and repair all types of water heaters.",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          question: "Can you detect hidden leaks?",
          answer: "We use advanced tools for leak detection.",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          question: "Are materials guaranteed?",
          answer: "We use high-quality materials with a warranty.",
        },
        {
          service_id: serviceMap["Plumbing Services"],
          question: "Do you offer maintenance plans?",
          answer: "Yes, we provide annual plumbing maintenance plans.",
        },
        // Plaster Ceiling and Partition FAQs
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          question: "Can you customize ceiling designs?",
          answer: "We offer a variety of custom ceiling designs.",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          question: "How long does installation take?",
          answer: "Installation typically takes 2-5 days.",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          question: "Are partitions soundproof?",
          answer: "We offer soundproof partition options.",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          question: "What materials do you use?",
          answer: "We use high-quality gypsum and other materials.",
        },
        {
          service_id: serviceMap["Plaster Ceiling and Partition"],
          question: "Do you repair old ceilings?",
          answer: "Yes, we provide ceiling repair services.",
        },
        // Sliding Doors and Windows FAQs
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          question: "Are sliding doors energy-efficient?",
          answer: "We use energy-efficient glass for all installations.",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          question: "Can you repair window frames?",
          answer: "Yes, we specialize in window frame repairs.",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          question: "Do you install sliding gates?",
          answer: "We offer automatic sliding gate systems.",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          question: "What is the installation time?",
          answer: "Most installations are completed in 1-2 days.",
        },
        {
          service_id: serviceMap["Sliding Doors and Windows"],
          question: "Are locks secure?",
          answer: "We use high-security locking systems.",
        },
        // Painting FAQs
        {
          service_id: serviceMap["Painting"],
          question: "What paints do you use?",
          answer: "We use eco-friendly and durable paints.",
        },
        {
          service_id: serviceMap["Painting"],
          question: "Do you offer color consultation?",
          answer: "Yes, we provide professional color consultation.",
        },
        {
          service_id: serviceMap["Painting"],
          question: "How long does painting take?",
          answer: "Painting typically takes 1-3 days per room.",
        },
        {
          service_id: serviceMap["Painting"],
          question: "Do you clean up after painting?",
          answer: "We ensure a thorough cleanup post-painting.",
        },
        {
          service_id: serviceMap["Painting"],
          question: "Can you paint exteriors?",
          answer: "We specialize in both interior and exterior painting.",
        },
        // Cabinets FAQs
        {
          service_id: serviceMap["Cabinets"],
          question: "Can you customize cabinets?",
          answer: "We offer fully customizable cabinet designs.",
        },
        {
          service_id: serviceMap["Cabinets"],
          question: "What materials are used?",
          answer: "We use high-quality wood and hardware.",
        },
        {
          service_id: serviceMap["Cabinets"],
          question: "How long does installation take?",
          answer: "Cabinet installation takes 2-5 days.",
        },
        {
          service_id: serviceMap["Cabinets"],
          question: "Do you make office cabinets?",
          answer: "Yes, we provide office storage solutions.",
        },
        {
          service_id: serviceMap["Cabinets"],
          question: "Is there a warranty?",
          answer: "We offer a 1-year warranty on cabinets.",
        },
        // Locksmith FAQs
        {
          service_id: serviceMap["Locksmith"],
          question: "Do you offer 24/7 lockout service?",
          answer: "Yes, we provide 24/7 lockout assistance.",
        },
        {
          service_id: serviceMap["Locksmith"],
          question: "Can you install smart locks?",
          answer: "We specialize in smart lock systems.",
        },
        {
          service_id: serviceMap["Locksmith"],
          question: "How fast is key duplication?",
          answer: "Key duplication is done within minutes.",
        },
        {
          service_id: serviceMap["Locksmith"],
          question: "Are repairs guaranteed?",
          answer: "All lock repairs come with a warranty.",
        },
        {
          service_id: serviceMap["Locksmith"],
          question: "Do you install safes?",
          answer: "Yes, we provide home safe installation.",
        },
        // Tiles Work FAQs
        {
          service_id: serviceMap["Tiles Work"],
          question: "What types of tiles do you offer?",
          answer: "We offer ceramic, porcelain, and mosaic tiles.",
        },
        {
          service_id: serviceMap["Tiles Work"],
          question: "How long does tiling take?",
          answer: "Tiling typically takes 2-4 days.",
        },
        {
          service_id: serviceMap["Tiles Work"],
          question: "Are tiles durable?",
          answer: "We use high-quality, durable tiles.",
        },
        {
          service_id: serviceMap["Tiles Work"],
          question: "Do you repair tiles?",
          answer: "Yes, we provide tile repair services.",
        },
        {
          service_id: serviceMap["Tiles Work"],
          question: "Can you install outdoor tiles?",
          answer: "We specialize in outdoor tile installation.",
        },
        // Air-cond Service and Install FAQs
        {
          service_id: serviceMap["Air-cond Service and Install"],
          question: "Are your AC units energy-efficient?",
          answer: "We install energy-efficient AC units.",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          question: "How often should ACs be serviced?",
          answer: "We recommend servicing ACs annually.",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          question: "Can you repair old AC units?",
          answer: "Yes, we repair all types of AC units.",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          question: "Do you clean AC ducts?",
          answer: "We provide professional duct cleaning services.",
        },
        {
          service_id: serviceMap["Air-cond Service and Install"],
          question: "What is the repair time?",
          answer: "Most AC repairs are completed within a day.",
        },
        // Fridge and Washing Machine Repair FAQs
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          question: "How fast is appliance repair?",
          answer: "We offer same-day repair services.",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          question: "Do you use genuine parts?",
          answer: "We use only genuine spare parts.",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          question: "Is there a warranty on repairs?",
          answer: "We provide a 90-day warranty on repairs.",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          question: "Can you repair dryers?",
          answer: "Yes, we repair dryers and other appliances.",
        },
        {
          service_id: serviceMap["Fridge and Washing Machine Repair"],
          question: "Do you offer maintenance?",
          answer: "We provide routine appliance maintenance.",
        },
      ],
      skipDuplicates: true,
    });

    // Create Free Quotes
    console.log("Seeding Free Quotes...");
    await prisma.freeQuote.createMany({
      data: [
        {
          user_id: 1,
          task_description: "Need electrical wiring for new apartment",
          status: "REQUESTED",
        },
        {
          user_id: 1,
          task_description: "Plumbing issue in bathroom",
          status: "ACCEPTED",
        },
        {
          user_id: 4,
          task_description: "Ceiling installation for office",
          status: "REQUESTED",
        },
      ],
      skipDuplicates: true,
    });

    // Create Orders
    console.log("Seeding Orders...");
    await prisma.order.createMany({
      data: [
        { user_id: 1, status: "REQUESTED" },
        { user_id: 1, status: "IN_PROGRESS" },
        { user_id: 4, status: "COMPLETED" },
      ],
      skipDuplicates: true,
    });

    // Fetch order IDs
    const orders = await prisma.order.findMany({
      select: { id: true, user_id: true, status: true },
    });
    const orderMap = orders.reduce<Record<number, number>>(
      (map, order, index) => {
        map[index + 1] = order.id;
        return map;
      },
      {}
    );

    // Create Order Items
    console.log("Seeding Order Items...");
    await prisma.orderItem.createMany({
      data: [
        {
          order_id: orderMap[1],
          service_id: serviceMap["Electrical"],
          quantity: 1,
          unit_price: 5000,
          total_price: 5000,
        },
        {
          order_id: orderMap[2],
          service_id: serviceMap["Plumbing Services"],
          quantity: 1,
          unit_price: 4000,
          total_price: 4000,
        },
        {
          order_id: orderMap[3],
          service_id: serviceMap["Plaster Ceiling and Partition"],
          quantity: 1,
          unit_price: 6000,
          total_price: 6000,
        },
      ],
      skipDuplicates: true,
    });

    // Create Gallery Items
    console.log("Seeding Gallery Items...");
    await prisma.gallery.createMany({
      data: [
        {
          label: "Electrical Work",
          key: "electrical_1",
          url: "https://example.com/images/electrical.jpg",
        },
        {
          label: "Plumbing Work",
          key: "plumbing_1",
          url: "https://example.com/images/plumbing.jpg",
        },
        {
          label: "Ceiling Installation",
          key: "ceiling_1",
          url: "https://example.com/images/ceiling.jpg",
        },
      ],
      skipDuplicates: true,
    });

    console.log("Seeding completed successfully!");
  } catch (e) {
    console.error("Seeding failed:", e);
    throw e;
  }
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
