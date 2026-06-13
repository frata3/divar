document.addEventListener("DOMContentLoaded", function () {
    const navItems = document.querySelectorAll("#sidebar .nav-item > a");
  
    navItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();
        const submenu = item.nextElementSibling;
        const allSubmenus = document.querySelectorAll("#sidebar .submenu");
  
        allSubmenus.forEach((menu) => {
          if (menu !== submenu) {
            menu.style.display = "none";
          }
        });
  
        if (submenu) {
          submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        }
      });
    });
  });
  