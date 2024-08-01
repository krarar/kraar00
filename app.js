// اختيار العنصر الذي سيتم عرض البطاقات فيه
const container = document.querySelector(".container");

// بيانات القهوة مع روابط الصور
const coffees = [
  { name: "Perspiciatis", image: "https://via.placeholder.com/150" },
  { name: "Voluptatem", image: "https://via.placeholder.com/150" },
  { name: "Explicabo", image: "https://via.placeholder.com/150" },
  { name: "Rchitecto", image: "https://via.placeholder.com/150" },
  { name: " Beatae", image: "https://via.placeholder.com/150" },
  { name: " Vitae", image: "https://via.placeholder.com/150" },
  { name: "Inventore", image: "https://via.placeholder.com/150" },
  { name: "Veritatis", image: "https://via.placeholder.com/150" },
  { name: "Accusantium", image: "https://via.placeholder.com/150" },
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
