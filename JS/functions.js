// Variabls
var addedSign = $(".added"),
    adminPage = $(".admin"),
    newItemForm = $("#new-Item"),
    totalCartCost = 0,
    cartTableBody = $(".table tbody"),
    addedSign = $(".added"),
    removedSign = $(".removed"),
    loginForm = $("#login"),
    signupForm = $("#signup"),
    newItemForm = $("#new-Item"),
    newCatForm = $("#new-cat"),
    catList = $(".category-list"),
    catDropDown = $("#cat-select"),
    itemsList = $(".items-list"),
    catalogUrl = "../Sources/catalog.json";
var loadAdminContent = function() {
    $.ajax({
        url: catalogUrl,
        dataType: 'json',
        success: function(result) {
            var catogeryContainer = [],
                itemsNameContainer = [],
                catSelectOptions = [];
            for (i = 0; i < result.category.length; i++) {
                catogeryContainer.push("<li>" + result.category[i] + "</li>");
                catSelectOptions.push("<option>" + result.category[i] + "</option>")
            }
            catList.append(catogeryContainer.join(""));
            catDropDown.append(catSelectOptions.join(""));
            for (i = 0; i < result.items.length; i++) {
                itemsNameContainer.push("<li>" + result.items[i].Title + "</li>");
            }
            itemsList.append(itemsNameContainer.join(""));
        },
    })
};
var loadHomeCatalog = function() {
    $.ajax({
        url: catalogUrl,
        dataType: 'json',
        success: function(result) {
            var catlogItemsContainer = []
            for (i = 0; i < result.items.length; i++) {
                var name = result.items[i].Title,
                    url = result.items[i].ImgUrl,
                    desc = result.items[i].desc,
                    price = result.items[i].price,
                    cat = result.items[i].category;
                catlogItemsContainer.push('<div class="item col-sm-6 col-lg-4"><img src="' + url + '" alt="item-picture" class="item-pic center-block"><h3 class="item-title text-center">' + name + '</h3><p class="description text-center">' + desc + '</p><h4 class="price text-center">' + price + '</h4><form action=""><div class="center-block order-number"><label for="item-number">Number of items to order:</label><input class="pull-right" type="number" value="1" min="1" id="item-number" required><p class="notification">*Please Fill Number of Items</p></div><input type="submit" value="Order" class="btn btn-info center-block add-to-cart"></input></form></div>');
            }
            $(".catalog").append(catlogItemsContainer.join(""));
        }
    });
};
var toggleSign = function(sign) {
    sign.fadeIn(500, function() {
        sign.delay(1500).fadeOut(500);
    })
};

$(document).ready(function() {
// Forms Validation
    loginForm.validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        }
    });

    signupForm.validate({
        rules: {
            username: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 15
            }
        }
    });

    newItemForm.validate({
        rules: {
            "itemname": {
                required: true
            },
            "itemurl": {
                required: true
            },
            "itemdesc": {
                required: true
            },
            "itemprice": {
                required: true,
                min: 1
            }
        }
    });

    newCatForm.validate({
        rules: {
            newcat: {
                required: true
            }
        }
    });

// Forms Submit Function
    loginForm.on("submit", function(event) {
        event.preventDefault();
        if (loginForm.valid()) {
            // Admin Login Form validition
            var loginUser = $("#login input[name='username']").val(),
                loginPassword = $("#login input[type='password']").val(),
                adminCred = "admin";
            console.log(loginPassword, loginUser);
            if (loginUser == adminCred && loginPassword == adminCred) {
                window.location.href = '../admin.html';
            } else {
                window.location.href = '../';
            }
        }
    });

    newCatForm.on("submit", function(event) {
        event.preventDefault();
        if (newCatForm.valid()) {
            var catName = $(this).find("input[name='newcat']").val();
            catList.append("<li>" + catName + "</li>")
            toggleSign(addedSign);
        }
    });

    newItemForm.on("submit", function(event) {
        event.preventDefault();
        if (newItemForm.valid()) {
            var itemName = $(this).find("input[name='itemname']").val();
            itemsList.append("<li>" + itemName + "</li>")
            toggleSign(addedSign);
        }
    });

    signupForm.on("submit", function(event) {
        event.preventDefault();
        if (signupForm.valid()) {
            toggleSign(addedSign);
        }
    });


// Load Home Catalog
    loadHomeCatalog();

// Open/Close Cart
    $(".cart-toggle").on("click", function(event) {
        $(".cart").toggleClass("out");
    });
});

$(window).on("load", function() {

// Load Admin Page
    if (adminPage.length) {
        loadAdminContent();
    };

// Add Items to Cart
    $(".catalog").on("click", "input[value='Order']", function(event) {
        event.preventDefault();
        var that = $(this).parents(".item"),
            numberOfItems = that.find("#item-number").val(),
            itemTitle = that.find(".item-title").html(),
            itemPrice = that.find(".price").html(),
            itemsPrice = (numberOfItems * itemPrice),
            ItemNumberField = that.find("#item-number"),
            notification = that.find(".notification");
        if (numberOfItems > 0) {
            if (notification.hasClass("out")) {
                ItemNumberField.removeClass("required");
                notification.removeClass("out");
            };
            cartTableBody.append('<tr><td>' + itemTitle + '</td><td>' + numberOfItems + '</td><td class="price">' + itemsPrice + '</td><td class="remove-item">X</td></tr>');
            totalCartCost += itemsPrice;
            $(".total").html(totalCartCost);
            toggleSign(addedSign)
        } else {
            ItemNumberField.addClass("required");
            notification.addClass("out");
        }
    });

// Remove Items From Cart
    cartTableBody.on("click", ".remove-item", function() {
        var that = $(this),
            row = that.parent("tr"),
            ItemsValue = that.siblings(".price").html();
        row.remove();
        totalCartCost -= ItemsValue;
        $(".total").html(totalCartCost);
        toggleSign(removedSign);
    });

});
