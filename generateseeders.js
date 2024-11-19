const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Sample products data
const products = [
  {
    uuid: uuidv4(),
    title: 'PerfectX',
    description: 'Joint Cream Relieve Knee Lumbar Spine Leg Neck Soreness Body Health Active Joint Care Cream',
    price: 3000,
    discount: 0,
    imageURL: 'https://i.ibb.co/P4GHB1N/pf.webp'
  },
  {
    uuid: uuidv4(),
    title: 'Pile Spray',
    description: 'Natural Herbal Hemorrhoids Spray for Powerful Anal Pain Relief Effective Personal Care Product for Butt Itch Relief',
    price: 3000,
    discount: 0,
    imageURL: 'https://i.ibb.co/hykT5K5/Pile-Spray.webp'
  },
  {
    uuid: uuidv4(),
    title: 'Electric Pressure Cooker',
    description: `## Electric Pressure Cooker

The Electric Pressure Cooker is a brand-new kitchen tool developed using our latest technology. This product combines the fine qualities of a pressure cooker, electric cooker, and braising cooker. It features programmable temperature and pressure control with a new and distinctive structure and outlook design. It is reliable, safe to operate, power-saving, and delivers quality cooking. It is an ideal cooking tool for a modern family and an excellent substitute for a conventional pressure cooker.

### Combined Functions
- **Cooking, Stewing, and Braising**: The time range is labeled on the knob. You can adjust it according to food, personal taste, and cooking experience.

### Time and Power Saving
- **Power and Time Saving**: Saves over 60% in power and time compared to common electric cookers.

### Airtight Cooking
- **Retains Nutrient and Original Taste**: Ensures that nutrients and the original taste of the food are preserved.

### Easy to Clean
- **Non-Stick Inner Pot**: Easy to clean.
- **Stainless Lid and Outer Tank**: Ensures a long service life.

### 5 Built-In Safety Features
1. **Lid Auto Lock**: The cooker cannot gain pressure when the lid is not well closed, and the lid cannot be opened when the inner pressure is too high.
2. **Pressure Auto-Relief Function**: Discharges steam through the pressure discharging valve when temperature and pressure exceed normal values.
3. **De-Pressure Function**: Automatically de-pressures around the lid to avoid explosion if the pressure limit fails.
4. **Temperature Limit**: Power automatically cuts off when the temperature inside the cooker exceeds the preset limit.
5. **Ultra-High Temperature Safe**: Power automatically cuts off when the temperature inside the cooker exceeds the limit value.`,
    price: 8499,
    discount: 0,
    imageURL: 'https://i.ibb.co/9h5tgjN/Dessini.jpg'
  },
  {
    uuid: uuidv4(),
    title: 'Water Purifier',
    description: `## Water Purifier
The Water Purifier is designed to filter cold tap and well water, effectively removing rust, dissolved iron, heavy metals, chlorine, organic compounds, and other impurities. This improves the taste and smell of the water and removes objectionable odors.

**Features:**
- **Automatic Cover**: For easy water handling and operation.
- **Ease of Use**: Very handy with straightforward operation. Simply follow the steps in the manual for assembly.
- **Protection**: Provides 100% protection against viruses and bacteria.
- **Patented Technology**: Advanced purification technology that eliminates the need for further boiling.

**Specifications:**
- **Capacity**: 16 liters
- **Filter Stages**: Seven stages of filtration
  - **Ceramic Filter**: Removes rust stains and waste materials
  - **Active Carbon Filter**: High absorptive capability for impurities
  - **Mineral Stone**: Absorbs heavy metals and bacteria
  - **Zeolite**: Removes impurities
  - **Active Carbon**: Softens the water
  - **Far Infrared Mineral Ball**: Takes out various micro-elements
  - **Mineral Stone**: Additional filtration`,
    price: 3700,
    discount: 0,
    imageURL: 'https://i.ibb.co/fMGMLFg/Water-Purifier1.jpg'
  },
  {
    uuid: uuidv4(),
    title: '3 in 1 Rechargeable Hair Trimmer',
    description: `## 3-in-1 Rechargeable Electric Hair, Beard & Nose Shaver/Trimmer
The 3-in-1 Rechargeable Electric Hair, Beard & Nose Shaver/Trimmer provides a convenient cordless hair shaving and trimming experience at home or on the go. Its compact size and rechargeable battery make it ideal for travel, ensuring you can maintain a well-groomed look wherever you are.

**Features:**
- **Rechargeable and Replaceable Battery**: Ensures convenience and portability, perfect for travel.
- **Compact Size**: Easy to pack and carry.
- **Detachable Trimmers**: Includes 3 trimmers suitable for hair, beard, ears, and nose.
- **Adjustable Attachment Comb**: Offers a wide range of shaving lengths for your desired look.

**Design:**
- **Ergonomic Design**: Features a soft grip that provides comfort and prevents finger strain.
- **Precision Ground Steel Blades**: Designed to stay sharp longer.
- **Cordless Operation**: Reduces the risk of injury.
- **Chrome Finish**: Gives a stunning look and feel.
- **Assorted Colors**: Available in a variety of colors.

**Ideal For:**
- **Both Children and Adults**: Suitable for all ages.
- **Multiple Uses**: Functions as a hair shaver, beard trimmer, and hair remover.

**Order Online:**
Order your barber hair shaver and beard trimmer online on Jumia and have it delivered to your home, office, or nearest drop-off point.`,
    price: 2900,
    discount: 0,
    imageURL: 'https://i.ibb.co/vYkrmLF/Greamy.jpg'
  },
  {
    uuid: uuidv4(),
    title: 'Weighing Scale',
    description: 'Weighing Scale',
    price: 2999,
    discount: 0,
    imageURL: 'https://i.ibb.co/YpDPcd0/Weighingscale.png'
  },
  {
    uuid: uuidv4(),
    title: 'Chest Pull',
    description: 'Chest Pull',
    price: 3700,
    discount: 0,
    imageURL: 'https://i.ibb.co/HF4x3qB/Chest-Pull.webp'
  },
  {
    uuid: uuidv4(),
    title: 'Car Fridge',
    description: 'Car Fridge',
    price: 6950,
    discount: 0,
    imageURL: 'https://i.ibb.co/khPfXN4/Car-Fridge-2.png'
  },
  {
    uuid: uuidv4(),
    title: 'Female Fertility Tea',
    description: 'Female Fertility Tea',
    price: 3000,
    discount: 1,
    imageURL: 'https://i.ibb.co/FsVCDyG/femalefertilitytea.png'
  },
  {
    uuid: uuidv4(),
    title: 'Male Fertility Tea',
    description: 'Male Fertility Tea',
    price: 3000,
    discount: 1,
    imageURL: 'https://i.ibb.co/sm68pQb/malefertilitytea.jpg'
  },
  {
    uuid: uuidv4(),
    title: 'Matcha Tea',
    description: 'Matcha Tea',
    price: 7000,
    discount: 0,
    imageURL: 'https://i.ibb.co/0JR5PvM/matchatea.webp'
  },
  {
    uuid: uuidv4(),
    title: 'Tummy Trimmer',
    description: 'Tummy Trimmer',
    price: 2500,
    discount: 1,
    imageURL: 'https://i.ibb.co/DLT9xnF/tummytrimmer.jpg'
  },
  {
    uuid: uuidv4(),
    title: 'Strongman Syrup',
    description: 'The Most Effective Way To End Quick EjacuIation and restore your confidence – Without Any Side Effect. Last 1 To 2 Hours Tonight.',
    price: 3500,
    discount: 1,
    imageURL: 'https://i.ibb.co/8bXtTfw/Strongman.webp'
  },
  {
    uuid: uuidv4(),
    title: 'Smart Airfryer',
    description: `## Cook Fast With Our Smart Air Fryer!
Say goodbye to greasy, unhealthy meals and hello to crispy, delicious perfection with our state-of-the-art Smart Air Fryer! 

Healthy cooking made easy.

Fast & efficient and save energy.

Cook breakfast, lunch, and dinner in 10 minutes.`,
    price: 9800,
    discount: 0,
    imageURL: 'https://i.ibb.co/wycFBPn/fryer7.jpg'
  },
];

// Function to generate the seeders file
const generateSeederFile = () => {
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
  const seederFilePath = path.join(__dirname, 'src', 'database', 'seeders', `productSeeder-${timestamp}.js`);

  const seederContent = `
  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Products', [
        ${products.map(product => {
          return `{
            uuid: '${product.uuid}',
            title: '${product.title}',
            description: '${product.description}',
            price: ${product.price},
            discount: ${product.discount},
            imageURL: '${product.imageURL}',
            createdAt: new Date(),
            updatedAt: new Date()
          }`;
        }).join(',\n')}
      ], {});
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Products', null, {});
    }
  };
  `;

  // Write the seeder content to a file
  fs.writeFileSync(seederFilePath, seederContent);
  console.log(`Seeder file generated at ${seederFilePath}`);
};

// Generate the seeder file
generateSeederFile();
