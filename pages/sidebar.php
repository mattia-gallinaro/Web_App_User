<?php

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sidebar</title>
    <link rel="stylesheet" href="/Web_App_User/css/sidebar.css" />

    <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</head>

<body>
    <section class="sidebar">
        <div class="nav-header">
            <p class="logo">Sandwech</p>
            <i class="bx bx-menu btn-menu"></i>
        </div>
        <ul class="nav-links">
            <li>
                <i class="bx bx-search search-btn"></i>
                <input type="text" placeholder="search..." />
                <span class="tooltip">Search</span>
            </li>
            <li>
                <a href="">
                    <i class="bx bx-home-alt-2"></i>
                    <span class="title">Casetta</span>
                </a>
                <span class="tooltip">Casetta</span>
            </li>
            <li>
                <a id="cart" onclick="showCartUser()">
                    <i class="bx bx-cart bx-tada-hover"></i>
                    <span class="title">Carrello</span>
                </a>
                <span class="tooltip">Carrello</span>
            </li>
            <li>
                <a>
                    <i class="bx bx-category"></i>
                    <span class="title">Categorie</span>
                </a>
                <span class="tooltip">Categorie</span>
            </li>
            <li>
                <a onclick="getOrders()">
                    <i class="bx bx-task"></i>
                    <span class="title">Ordini</span>
                </a>
                <span class="tooltip">Ordini</span>
            </li>
            <li>
                <a onclick="showLogin()">
                    <i class='bx bxs-user-account'></i>
                    <span class="title">Profilo</span>
                </a>
                <span class="tooltip">Profilo</span>
            </li>
        </ul>
        <div class="theme-wrapper">
            <i class="bx bxs-moon theme-icon"></i>
            <p>Dark Theme</p>
            <div class="theme-btn">
                <span class="theme-ball"></span>
            </div>
        </div>
    </section>
    <section class="home">
        <div id="content"></div>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
        crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script type="text/javascript" src="/Web_App_User/js/categories.js"></script>
    <script>
        const btn_menu = document.querySelector(".btn-menu");
        const side_bar = document.querySelector(".sidebar");

        btn_menu.addEventListener("click", function () {
            side_bar.classList.toggle("expand");
            changebtn();
        });

        function changebtn() {
            if (side_bar.classList.contains("expand")) {
                btn_menu.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                btn_menu.classList.replace("bx-menu-alt-right", "bx-menu");
            }
        }

        const btn_theme = document.querySelector(".theme-btn");
        const theme_ball = document.querySelector(".theme-ball");

        const localData = localStorage.getItem("theme");

        if (localData == null) {
            localStorage.setItem("theme", "light");
        }

        if (localData == "dark") {
            document.body.classList.add("dark-mode");
            theme_ball.classList.add("dark");
        } else if (localData == "light") {
            document.body.classList.remove("dark-mode");
            theme_ball.classList.remove("dark");
        }

        btn_theme.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            theme_ball.classList.toggle("dark");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    </script>
</body>

</html>