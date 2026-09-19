const fs = require('fs');
const path = require('path');

const menuDataPath = path.resolve(__dirname, '..', 'client', 'src', 'data', 'menuData.ts');
let content = fs.readFileSync(menuDataPath, 'utf8');

const descriptions = {
  // Category 1: Non-Veg Gravy
  "Chettinad Chicken Gravy": "Tender chicken simmered in a rich, aromatic gravy inspired by the bold flavors of Chettinad cuisine. A flavorful choice for those who enjoy deep, spicy South Indian-style gravies.",
  "Butter Chicken Gravy": "Juicy pieces of chicken enveloped in a rich, creamy and mildly spiced gravy with a smooth buttery finish. A comforting combination that pairs beautifully with naan, parotta or rice.",
  "Ginger Chicken Gravy": "Tender chicken cooked in a flavorful gravy with the warm, aromatic character of ginger. A satisfying choice for anyone who enjoys a bold yet balanced chicken preparation.",
  "Chili Chicken Gravy": "Succulent chicken combined with a rich, chili-infused gravy delivering a delicious spicy kick. Perfect for those who enjoy their chicken with a lively and flavorful finish.",
  "Garlic Chicken Gravy": "Tender chicken prepared in a rich gravy with the distinctive aroma and savory character of garlic. A hearty, flavorful option that goes well with parotta, naan or rice.",
  "Prawn Masala": "Succulent prawns cooked in a rich and flavorful masala with an aromatic blend of spices. A delicious seafood choice for those looking for something bold and satisfying.",

  // Category 2: Parotta Varieties
  "Parotta": "A classic South Indian favorite with soft, flaky and beautifully layered texture. Perfect on its own or paired with your favorite gravy or side dish.",
  "Bun Parotta": "A soft and fluffy variation of the traditional parotta with a distinctive bun-like shape. Enjoy its delicate layers with a flavorful gravy for a satisfying meal.",
  "Chili Parotta": "Flaky parotta brought together with a flavorful chili-infused preparation for an exciting twist. A delicious option for those who enjoy their parotta with extra spice and flavor.",
  "Nool Parotta": "Delicate, fine layers come together to create this unique and soft parotta variety. A light and enjoyable choice that pairs wonderfully with rich gravies.",
  "Kothu Parotta": "Flaky parotta chopped and tossed into a flavorful preparation for the classic South Indian kothu experience. A hearty street-food favorite packed with texture and satisfying flavor.",
  "Chicken Kothu Parotta": "Flaky parotta and tender chicken come together in a flavorful, chopped and tossed preparation. A filling favorite for anyone craving a rich and satisfying combination.",
  "Ceylon Parotta": "A beautifully layered parotta with a distinctive texture and rich, satisfying bite. A flavorful choice for enjoying with your favorite Hotel Sneha gravy.",
  "Veechu Parotta": "A traditionally prepared parotta featuring delicate layers and a soft, satisfying texture. Perfect for pairing with spicy gravies, curries or your favorite side dish.",
  "Veg Kothu Parotta": "Flaky parotta tossed together with flavorful vegetables in a delicious chopped preparation. A satisfying vegetarian choice packed with texture and comforting flavors.",
  "Veg Parotta": "A classic layered parotta offering a soft interior with delicious flaky layers. A simple and versatile choice that pairs perfectly with vegetarian or non-vegetarian gravies.",
  "VNR Parotta": "A distinctive parotta variety prepared for a unique and satisfying dining experience. Enjoy its soft, layered texture alongside your favorite gravy or curry.",
  "Egg Veechu Parotta": "Flaky veechu parotta combined with egg for a deliciously rich and satisfying preparation. A flavorful option for egg lovers looking for something hearty and filling.",
  "Kili Parotta": "A distinctive and indulgent parotta preparation created for those looking beyond the classics. Enjoy its flavorful layers with a delicious accompaniment for a satisfying meal.",

  // Category 3: Tandoori & Grill
  "Grilled Chicken Half": "Juicy chicken grilled to bring out a deliciously smoky and savory character. A satisfying choice for anyone who enjoys beautifully grilled chicken with bold flavor.",
  "Grilled Chicken Full": "A generous full serving of succulent chicken prepared on the grill for a rich, smoky finish. Perfect for sharing or enjoying as a hearty centerpiece for your meal.",
  "Tandoori Chicken Half": "Tender chicken prepared in the classic tandoori style with aromatic flavors and a beautifully grilled finish. A timeless favorite for lovers of smoky, flavorful chicken.",
  "Tandoori Chicken Full": "A generous full serving of classic tandoori chicken with a deliciously charred and aromatic finish. Perfect for sharing and enjoying with your favorite accompaniments.",
  "Tandoori Chicken Quarter": "A smaller serving of classic tandoori chicken with tender meat and a delicious smoky, grilled character. An ideal choice when you want to enjoy a tandoori favorite without a larger portion.",

  // Category 4: Breads
  "Plain Naan": "Soft and tender naan with a delicate texture, freshly prepared to complement your meal. A classic pairing for rich gravies, curries and flavorful side dishes.",
  "Butter Naan": "Soft, warm naan finished with a rich buttery touch for an extra layer of indulgence. Perfect for soaking up your favorite Hotel Sneha gravies and curries.",
  "Garlic Butter Naan": "Soft naan enhanced with aromatic garlic and a rich buttery finish. A flavorful bread choice that pairs beautifully with creamy and spicy gravies.",

  // Category 5: Noodles
  "Chicken Noodles": "Flavorful noodles tossed together with tender chicken for a satisfying and hearty meal. A delicious choice for anyone craving a classic chicken noodle preparation.",
  "Egg Noodles": "Delicious noodles combined with egg for a satisfying balance of texture and flavor. A comforting favorite that's perfect for a quick and fulfilling meal.",
  "Veg Noodles": "Noodles tossed with flavorful vegetables for a colorful and satisfying vegetarian preparation. A simple, delicious choice for those looking for a lighter noodle option.",
  "Gobi Noodles": "Flavorful noodles paired with gobi for a delicious vegetarian twist on the classic noodle favorite. A satisfying combination of texture and savory flavor in every bite.",
  "Paneer Noodles": "Delicious noodles combined with soft paneer for a rich and satisfying vegetarian preparation. A great choice for paneer lovers looking for something filling and flavorful.",
  "Mushroom Noodles": "Savory noodles paired with mushrooms for a delicious combination of texture and earthy flavor. A comforting vegetarian choice that's both satisfying and flavorful.",
  "Veg Mixed Noodles": "A generous noodle preparation bringing together a flavorful mix of vegetarian ingredients. A satisfying option for those who want variety and plenty of flavor in every bite."
};

let updatedCount = 0;
for (const [name, desc] of Object.entries(descriptions)) {
  // Regex to match the dish block: name: "...", followed shortly by description: "..."
  const regex = new RegExp(`(name:\\s*"${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",\\s*description:\\s*)"[^"]*"`, 'g');
  if (regex.test(content)) {
    content = content.replace(regex, `$1${JSON.stringify(desc)}`);
    updatedCount++;
    console.log(`Updated: ${name}`);
  } else {
    console.warn(`NOT FOUND: ${name}`);
  }
}

fs.writeFileSync(menuDataPath, content, 'utf8');
console.log(`Total updated: ${updatedCount} / ${Object.keys(descriptions).length}`);
