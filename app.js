// اختيار العنصر الذي سيتم عرض البطاقات فيه
const container = document.querySelector(".container");

// بيانات القهوة مع روابط الصور
const coffees = [
  { name: "Perspiciatis", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Voluptatem", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Explicabo", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Rchitecto", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Beatae", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Vitae", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Inventore", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Veritatis", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
  { name: "Accusantium", image: "https://firebasestorage.googleapis.com/v0/b/messageemeapp.appspot.com/o/ads%2F%D8%AA%D8%B5%D9%85%D9%8A%D9%85-%D9%85%D8%AA%D8%AC%D8%B1-%D8%A7%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A.jpg?alt=media&token=0b48f422-d863-4a43-98f9-c5f43c2d531b" },
];

// وظيفة لعرض القهوة
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image }) =>
      (output += `
        <div class="card">
          <img class="card--avatar" src=${image} />
          <h1 class="card--title">${name}</h1>
          <a class="card--link" href="#">Taste</a>
        </div>
      `)
  );
  // إضافة المحتوى إلى الحاوية
  container.innerHTML = output;
};

// تنفيذ دالة العرض بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", showCoffees);
