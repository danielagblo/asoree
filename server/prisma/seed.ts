import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@asoree.com'
  const existingAdmin = await prisma.admin.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10)
    await prisma.admin.create({
      data: { email: adminEmail, passwordHash },
    })
    console.log(`Admin created: ${adminEmail} / admin123`)
  }

  const existingProducts = await prisma.product.count()
  if (existingProducts === 0) {
    await prisma.product.createMany({
      data: [
        { title: 'Silk Tie and Dye Fabric', price: 149.99, originalPrice: 165.00, category: 'Dresses', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80' },
        { title: "Ase' Luxury Wide Pants", price: 289.99, originalPrice: 300.00, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80' },
        { title: 'Royal Touch Linen Shirt Set', price: 179.99, originalPrice: 190.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80' },
        { title: 'Tie and Dye Street Wear Hoodie', price: 159.55, originalPrice: 170.00, category: 'Tops', image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=600&q=80' },
        { title: 'Asoree Aso Oke & Linen Pants', price: 269.77, originalPrice: 285.00, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80' },
        { title: 'Afroset Linen Rouged Shorts', price: 149.99, originalPrice: 160.00, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&w=600&q=80' },
        { title: 'White Silky Afroset Dress', price: 249.55, originalPrice: 270.00, category: 'Dresses', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80' },
        { title: 'Olive Afroset Jumpsuit', price: 169.55, originalPrice: 180.00, category: 'Dresses', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80' },
      ],
    })
    console.log('8 products seeded')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
