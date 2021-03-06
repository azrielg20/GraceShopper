'use strict'
const faker = require('faker')
const db = require('../server/db')
const {
  User,
  Order,
  Payment,
  Product,
  OrderProducts
} = require('../server/db/models')
const fs = require('fs')

const imageArr = fs.readFileSync('urls.txt', 'utf8').split('\n')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Ned',
      email: 'ned@email.com',
      password: '123',
      adminStatus: true
    }),
    User.create({
      name: 'Morgan',
      email: 'morgan@email.com',
      password: '123',
      adminStatus: false
    }),
    User.create({
      name: 'Azriel',
      email: 'azriel@email.com',
      password: '123',
      adminStatus: true
    }),
    User.create({
      name: 'Ricky',
      email: 'ricky@email.com',
      password: '123',
      adminStatus: false
    })
  ])

  const product = await Promise.all([
    Product.create({
      title: 'Plateaus',
      description: 'Along the River',
      price: 1314,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/cnklqqwz1c9ai0z/201025_PRS_Idaho_013.jpg?dl=0',
      totalDownloads: 25,
      likes: 1,
      tags: ['landscape', 'large', 'water']
    }),

    Product.create({
      title: 'Rockslide',
      description: 'A nice picture of Idaho',
      price: 2311,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/64e2u0tlu3iqwoz/201026_PRS_Idaho_026.jpg?dl=0',
      totalDownloads: 2,
      likes: 100,
      tags: ['landscape', 'large']
    }),
    Product.create({
      title: 'Above The Snake River',
      description: 'A nice picture of Idaho',
      price: 1252,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/tm1xhepeq179ugp/201026_PRS_Idaho_028.jpg?dl=0',
      totalDownloads: 256,
      likes: 5,
      tags: ['landscape', 'large']
    }),
    Product.create({
      title: 'Boise Foothills',
      description: 'A nice picture of Idaho',
      price: 1256,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/3wjtbumusl0eh0v/201027_PRS_Idaho_106.jpg?dl=0',
      totalDownloads: 1000,
      likes: 9,
      tags: ['landscape', 'small']
    }),

    Product.create({
      title: 'Shoshone Falls River Valley',
      description: 'A nice picture of Idaho',
      price: 5056,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/ddmldq22ks4vsgu/201026_PRS_Idaho_063.jpg?dl=0',
      totalDownloads: 5,
      likes: 2463,
      tags: ['landscape', 'large']
    }),
    Product.create({
      title: 'Looking',
      description: 'Maui Overlook',
      price: 1256,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/mce445jaarutki9/190328_PRS_Maui_160.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['landscape', 'water', 'mountains']
    }),
    Product.create({
      title: 'Skimming',
      description: 'Maui',
      price: 1999,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/fcd7z3la3j6gjqj/190328_PRS_Maui_510.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['landscape', 'water', 'mountains', 'small']
    }),
    Product.create({
      title: 'Waterfalls',
      description: 'Maui hiking',
      price: 2999,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/152o6jszzb9mqif/190330_PRS_Maui_1450.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['landscape', 'mountains', 'large']
    }),
    Product.create({
      title: 'VW Vanagon',
      description: 'Kipalui Camping',
      price: 2399,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/pjuzuaj5kudze47/190330_PRS_Maui_1459.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['landscape', 'water', 'large']
    }),
    Product.create({
      title: 'Maui Sunrise',
      description: 'Waves on the black rocks',
      price: 599,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/q6q1p2u0jugko2p/190331_PRS_Maui_1522.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['landscape', 'water', 'small']
    }),
    Product.create({
      title: 'Fruit Stand',
      description: 'Getting groceries',
      price: 199,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/utw8cquijdnh4i6/190331_PRS_Maui_1577.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['small']
    }),
    Product.create({
      title: 'Cozy',
      description: 'Reading by the fire',
      price: 199,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/fcws864f8r2skmg/191019_HighPointMountainHouse_116.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['large']
    }),
    Product.create({
      title: 'Morning Coffee',
      description: 'Morning light coming through',
      price: 1299,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/5mrfy7fqjrmpx1f/191019_HighPointMountainHouse_259.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['small']
    }),
    Product.create({
      title: 'Lazy Suny',
      description: 'Morning light coming through',
      price: 1299,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/vxgz2qhuq2enb8z/191019_HighPointMountainHouse_448.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['large']
    }),
    Product.create({
      title: 'Roadtrip',
      description: 'Heading to the hot springs',
      price: 2299,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/y49l3vbatiwwz9d/201029_PRS_Idaho_139.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['large', 'mountains', 'landscape']
    }),
    Product.create({
      title: 'Sawtooths',
      description: 'At Redfish Lake',
      price: 7299,
      imageUrl:
        'https://dl.dropboxusercontent.com/s/s38qklo7pu59kbf/201029_PRS_Idaho_164.jpg?dl=0',
      totalDownloads: faker.random.number(),
      likes: faker.random.number(),
      tags: ['large', 'mountains', 'landscape', 'water']
    })
  ])

  const ned = await User.findByPk(1)
  const morgan = await User.findByPk(2)
  const azriel = await User.findByPk(3)
  const ricky = await User.findByPk(4)

  const imgOne = await Product.findByPk(1)
  const imgTwo = await Product.findByPk(2)
  const imgThree = await Product.findByPk(3)
  const imgFour = await Product.findByPk(4)
  const imgFive = await Product.findByPk(5)
  const imgSix = await Product.findByPk(6)

  await ned.addProduct(imgOne)
  await morgan.addProducts([imgTwo, imgSix])
  await azriel.addProduct(imgThree)
  await ricky.addProducts([imgFour, imgFive])

  // Creating carts
  await Order.findOrCreate({
    where: {
      userId: ricky.id,
      paid: false
    }
  })

  await Order.findOrCreate({
    where: {
      userId: morgan.id,
      paid: false
    }
  })

  await Order.findOrCreate({
    where: {
      userId: azriel.id,
      paid: false
    }
  })

  await Order.findOrCreate({
    where: {
      userId: ned.id,
      paid: false
    }
  })

  const firstCart = await Order.findByPk(1)
  const secondCart = await Order.findByPk(2)
  const thirdCart = await Order.findByPk(3)
  const fourthCart = await Order.findByPk(4)

  await firstCart.addProducts([imgOne, imgTwo, imgThree])
  await secondCart.addProducts([imgFour, imgSix])
  await thirdCart.addProducts([imgOne, imgSix, imgFour])
  await fourthCart.addProducts([imgTwo, imgOne, imgThree])

  // Create Order History
  const closedOrderRicky = await Order.create({
    userId: ricky.id,
    paid: true
  })

  const closedOrderMorgan = await Order.create({
    userId: morgan.id,
    paid: true
  })

  const closedOrderAzriel = await Order.create({
    userId: azriel.id,
    paid: true
  })

  const closedOrderNed = await Order.create({
    userId: ned.id,
    paid: true
  })
  const closedOrderNedTwo = await Order.create({
    userId: ned.id,
    paid: true
  })
  const closedOrderNedThree = await Order.create({
    userId: ned.id,
    paid: true
  })
  const closedOrderNedFour = await Order.create({
    userId: ned.id,
    paid: true
  })

  await closedOrderRicky.addProducts([
    imgOne,
    imgTwo,
    imgThree,
    imgFour,
    imgSix
  ])
  await closedOrderMorgan.addProducts([
    imgFour,
    imgSix,
    imgOne,
    imgTwo,
    imgThree
  ])

  await closedOrderAzriel.addProducts([imgTwo, imgOne, imgThree])
  await closedOrderNed.addProducts([imgOne, imgTwo, imgThree])
  await closedOrderNedTwo.addProducts([imgOne, imgThree])
  await closedOrderNedThree.addProducts([imgFour, imgFive, imgSix])
  await closedOrderNedFour.addProducts([imgOne, imgFour])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${product.length} cart`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
