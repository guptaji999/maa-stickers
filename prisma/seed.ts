import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { name: "Custom Stickers", slug: "stickers", description: "Die-cut, sheet & transparent stickers personalised with your photos", imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop", sortOrder: 1 },
  { name: "Fridge Magnets", slug: "magnets", description: "High-quality photo magnets for your fridge", imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop", sortOrder: 2 },
  { name: "Keychains", slug: "keychains", description: "Personalised acrylic & metal keychains", imageUrl: "https://images.unsplash.com/photo-1583394293214-41cb213e2e55?w=400&h=300&fit=crop", sortOrder: 3 },
  { name: "Wall Decor", slug: "wall-decor", description: "Framed prints, collages & acrylic wall art", imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop", sortOrder: 4 },
  { name: "Photo Albums", slug: "albums", description: "Beautifully crafted personalised photo albums", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop", sortOrder: 5 },
  { name: "Name Plates", slug: "nameplates", description: "Elegant acrylic & wooden name plates", imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=300&fit=crop", sortOrder: 6 },
];

async function main() {
  console.log("🌱 Seeding database…");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();

  const categories: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    const c = await prisma.category.create({ data: cat });
    categories[cat.slug] = c.id;
    console.log(`  ✅ Category: ${cat.name}`);
  }

  const PRODUCTS = [
    {
      name: "Custom Photo Sticker Sheet",
      slug: "custom-photo-sticker-sheet",
      description: "Create your own sticker sheet with 12 premium die-cut stickers from your favourite photos. Waterproof, UV-resistant, and perfect for laptops, bottles, notebooks, and more!",
      basePrice: 249, comparePrice: 399,
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1571935300617-d81a4c37a573?w=600&h=600&fit=crop"]),
      categorySlug: "stickers", isCustomizable: true, isFeatured: true,
      tags: JSON.stringify(["stickers","popular","bestseller"]),
      variants: [
        { name: "Size", options: JSON.stringify([{label:"Small (3×3 cm)",value:"small"},{label:"Medium (4×4 cm)",value:"medium"},{label:"Large (5×5 cm)",value:"large"}]), priceAdj: 0 },
        { name: "Finish", options: JSON.stringify([{label:"Glossy",value:"glossy"},{label:"Matte",value:"matte"},{label:"Transparent",value:"transparent"}]), priceAdj: 0 },
      ],
    },
    {
      name: "Round Sticker Pack (30 pcs)",
      slug: "round-sticker-pack",
      description: "Set of 30 circular stickers with your design or photo. Waterproof & UV-resistant coating. Perfect for gifting.",
      basePrice: 199, comparePrice: 299,
      imageUrl: "https://images.unsplash.com/photo-1571935300617-d81a4c37a573?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1571935300617-d81a4c37a573?w=600&h=600&fit=crop"]),
      categorySlug: "stickers", isCustomizable: true, isFeatured: false,
      tags: JSON.stringify(["stickers"]),
      variants: [
        { name: "Size", options: JSON.stringify([{label:"2cm diameter",value:"2cm"},{label:"3cm diameter",value:"3cm"},{label:"5cm diameter",value:"5cm"}]), priceAdj: 0 },
      ],
    },
    {
      name: "Personalised Fridge Magnet",
      slug: "personalised-fridge-magnet",
      description: "High-resolution fridge magnet printed with your photo. Strong magnetic backing holds firmly. Available in multiple shapes and sizes.",
      basePrice: 179, comparePrice: 279,
      imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"]),
      categorySlug: "magnets", isCustomizable: true, isFeatured: true,
      tags: JSON.stringify(["magnets","popular"]),
      variants: [
        { name: "Shape", options: JSON.stringify([{label:"Square",value:"square"},{label:"Round",value:"round"},{label:"Heart",value:"heart"}]), priceAdj: 0 },
        { name: "Size", options: JSON.stringify([{label:"2\" × 2\"",value:"2x2"},{label:"3\" × 3\"",value:"3x3"},{label:"4\" × 4\"",value:"4x4"}]), priceAdj: 0 },
      ],
    },
    {
      name: "Magnetic Photo Collage (4-in-1)",
      slug: "magnetic-photo-collage",
      description: "A beautiful 4-photo magnetic collage for your fridge. Tell your story through your favourite moments.",
      basePrice: 349, comparePrice: 499,
      imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"]),
      categorySlug: "magnets", isCustomizable: true, isFeatured: false,
      tags: JSON.stringify(["magnets"]),
      variants: [],
    },
    {
      name: "Acrylic Photo Keychain",
      slug: "acrylic-photo-keychain",
      description: "Crystal-clear acrylic keychain with your favourite photo. Lightweight, durable, and the perfect gift. Comes with a silver stainless steel key ring.",
      basePrice: 149, comparePrice: 249,
      imageUrl: "https://images.unsplash.com/photo-1583394293214-41cb213e2e55?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1583394293214-41cb213e2e55?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop"]),
      categorySlug: "keychains", isCustomizable: true, isFeatured: true,
      tags: JSON.stringify(["keychains","popular","bestseller"]),
      variants: [
        { name: "Shape", options: JSON.stringify([{label:"Square",value:"square"},{label:"Round",value:"round"},{label:"Heart",value:"heart"}]), priceAdj: 0 },
      ],
    },
    {
      name: "Metal Engraved Keychain",
      slug: "metal-engraved-keychain",
      description: "Premium stainless steel keychain with laser-engraved name or message. Ideal for couples, best friends, and corporate gifting.",
      basePrice: 299, comparePrice: 449,
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop"]),
      categorySlug: "keychains", isCustomizable: true, isFeatured: false,
      tags: JSON.stringify(["keychains"]),
      variants: [],
    },
    {
      name: "Wall Photo Collage (6 Photos)",
      slug: "wall-photo-collage",
      description: "Beautiful 6-photo premium wall collage printed on photo paper. Perfect for birthdays, anniversaries, and housewarming gifts.",
      basePrice: 449, comparePrice: 699,
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=600&fit=crop"]),
      categorySlug: "wall-decor", isCustomizable: true, isFeatured: true,
      tags: JSON.stringify(["wall-decor","popular"]),
      variants: [
        { name: "Size", options: JSON.stringify([{label:"A4 (21×29 cm)",value:"a4"},{label:"A3 (29×42 cm)",value:"a3"}]), priceAdj: 0 },
      ],
    },
    {
      name: "Acrylic Name Plate",
      slug: "acrylic-name-plate",
      description: "Elegant laser-cut acrylic name plate for homes and offices. Customise with your family name, monogram or business name.",
      basePrice: 599, comparePrice: 899,
      imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop",
      images: JSON.stringify(["https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=600&fit=crop"]),
      categorySlug: "nameplates", isCustomizable: true, isFeatured: false,
      tags: JSON.stringify(["nameplates"]),
      variants: [
        { name: "Color", options: JSON.stringify([{label:"Clear",value:"clear"},{label:"Gold",value:"gold"},{label:"Rose Gold",value:"rose-gold"},{label:"Black",value:"black"}]), priceAdj: 0 },
      ],
    },
  ];

  for (const { categorySlug, variants, ...product } of PRODUCTS) {
    const p = await prisma.product.create({
      data: {
        ...product,
        categoryId: categories[categorySlug],
        variants: { create: variants },
      },
    });
    console.log(`  ✅ Product: ${p.name}`);
  }

  // Seed coupons
  await prisma.coupon.createMany({
    data: [
      { code: "MAA20", type: "percent", value: 20, minOrder: 0, maxUses: 1000, isActive: true },
      { code: "FIRST50", type: "flat", value: 50, minOrder: 299, maxUses: 500, isActive: true },
      { code: "FREESHIP", type: "flat", value: 59, minOrder: 199, isActive: true },
    ],
  });
  console.log("  ✅ Coupons seeded");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
