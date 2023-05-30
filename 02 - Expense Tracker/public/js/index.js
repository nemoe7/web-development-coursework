/* You have full freedom on what to write inside this js file */

const Item = function(date, category, amount, desc) {

    this.date = date;
    this.category = category;
    this.amount = amount;
    this.desc = desc;

}

let total = 0;
let items = [];

document.addEventListener("DOMContentLoaded", () => {

    items.push(new Item("2020-03-05", "Bills", 25550, "Rent Payment for March"));
    items.push(new Item("2020-02-30", "Food", 150, "Chowking"));
    items.push(new Item("2020-02-25", "Leisure", 1999.95, "Elden Ring"));

    document.querySelector("#submitBtn")?.addEventListener("click", function(e) {

        const formData = new FormData(document.querySelector("#financesForm"));

        // for (let pair of formData.entries())
        //     console.log(pair[0] + ": " + pair[1]);

        let newItem = new Item(formData.get("date"), formData.get("category"), formData.get("amount"), formData.get("desc"));

        // Validate newItem
        if (validateFields(newItem)) {

            // Log newItem
            console.log(newItem);

            // Add newItem to items
            items.push(newItem);

            // Sort items by date
            items.sort(function(a, b) {
                var aDate = new Date(a.date);
                var bDate = new Date(b.date);
                if (aDate < bDate) return 1;
                if (aDate > bDate) return -1;
                return 0;
            });

            // Display all items;
            displayItems(items);

        }

    });

    document.querySelector("#filter")?.addEventListener("change", function(e) {

        // Log current filter
        console.log("User set filter to: " + this.value);

        const filter = this.value;
        const filtered = filterItems(items, filter);
        displayItems(filtered);

    });

    function filterItems(items, filter) {

        let filtered = [];

        if (filter == "All") {
            return items;
        } else {
            items.forEach(item => {
                if (item.category == filter) {
                    filtered.push(item);
                }
            });
        }
        return filtered;

    }

    function displayItems(items) {

        // Reset total
        total = 0;

        // Outer div
        const itemDiv = document.querySelector(".itemsList");

        itemDiv.innerHTML = "";

        items.forEach(item => {

            // Add to total
            total += parseFloat(item.amount);

            // Inner div
            const financeItem = document.createElement("div");
            itemDiv.append(financeItem);
            financeItem.classList.add("financeItem");

            // Header div
            const itemHeader = document.createElement("div");
            financeItem.append(itemHeader);
            itemHeader.classList.add("itemHeader");
            itemHeader.classList.add(item.category);

            // Header
            const itemCategory = document.createElement("span");
            itemHeader.append(itemCategory);
            itemCategory.classList.add("itemCategory");
            itemCategory.append(item.category);

            // Body
            const itemBody = document.createElement("div");
            financeItem.append(itemBody);
            itemBody.classList.add("itemBody");

            // Date
            const itemDate = document.createElement("span");
            itemBody.append(itemDate);
            itemDate.classList.add("itemDate");
            itemDate.innerHTML = item.date;

            // Description
            const itemDescription = document.createElement("span");
            itemBody.append(itemDescription);
            itemDescription.classList.add("itemDescription");
            itemDescription.innerHTML = item.desc;

            // Amount
            const itemAmount = document.createElement("span");
            itemBody.append(itemAmount);
            itemAmount.classList.add("itemAmount");
            itemAmount.innerHTML = parseFloat(item.amount).toFixed(2);

        });

        document.querySelector("#financesTotal").innerHTML = total;
    }

    function validateFields(item) {

        document.querySelector("#errorText").innerHTML = "";

        let errorCount = 0;

        if (item.date == "") {
            errorCount++;
            error("Date cannot be left unset.");
        }

        if (item.desc == "") {
            errorCount++;
            error("Description cannot be left blank.");
        }

        if (item.amount == "") {
            errorCount++;
            error("Amount cannot be left blank.");
        }

        if (errorCount > 1) {
            error("Multiple input fields are blank/unset!");
        }

        if (errorCount == 0) {
            return true;
        } else {
            return false;
        }

    }

    function error(message) {

        document.querySelector("#errorText").innerHTML = message;

    }
});