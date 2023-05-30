// GIVEN: Create a User constructor
const User = function(name) {
				this.name = name;
				this.lname = this.name.toLowerCase();
				this.uname = this.name.toUpperCase();
				this.nav = "#nav-" + this.lname;
				this.img = "./images/user-" + name + ".png";
			}

// TODO: Create object constructors as you see fit
const Post = function(title, content, date, user) {
				this.title = title;
				this.content = content;
				this.date = date;
				this.user = user;
}



// GIVEN: These will store all the posts/messages locally
let posts = [];
let messages = [];  // OPTIONAL: Use this if you will implement Messenger
let postCtr = 0;

// GIVEN: Do not change the values below
let currentUser = new User("Rachel");
const errorTitle = "  Please write a title  ";
const errorContent = "  Please write a content  ";

// GIVEN: variables to check against Filter Select (the drop-down box)
let selectNone = "None";
let selectRachel = "Rachel";
let selectJack = "Jack";
let selectAshley = "Ashley";

// This event listener is equivalent to JQuery's $(document).ready
document.addEventListener("DOMContentLoaded",function() {
	// GIVEN: Do not remove
	switchUser(currentUser);
	toggleFilter();  // This functionality is already GIVEN

	// TODO: Set the Create Post's date to the current date
	const today = new Date();
	// Use the given "formatDate" function present in this file to convert "today" to the correct format
	document.querySelector("#post-date").value = formatDate(today);

	// .________________________________________________________________________.
	// ||																	   ||
	// || Fill up the element behaviours below, you may change it if necessary ||
	// ||______________________________________________________________________||
	// '																	    '

	// TODO: Complete the functionality when clicking Submit Post
	document.querySelector("#submit-post")?.addEventListener("click", function(e){
		e.preventDefault();  // Prevents page refresh
		// HINT: Fill up the contents of validateFields() first
		const formElement = document.querySelector("#post-form");
		const formData = new FormData(formElement);
		const title = formData.get("post-title");
		const content = formData.get("post-body");
		const date = document.querySelector("#post-date").value;
		if (validateFields(title, content)) {
			// HINT: If the number of Posts is ZERO, clear post-container first
			if (posts.length == 0) {
				document.querySelector("#post-container").innerHTML = "";
			}

			// Create a new post and add it to posts
			const post = new Post(title, content, date, currentUser);
			console.log(post);
			posts.push(post);
			console.log(posts);
			// Refresh the displayed posts
			refreshDisplay(posts);  // Fill up the contents of refreshDisplay() first

			// Reset the contents of Create Post
			formElement.querySelector("#post-title").value = "";
			formElement.querySelector("#post-body").value = "";
		}
	});

	// Called when Sort by Date button is clicked
	document.querySelector("div#sort-by-date")?.addEventListener("click", function(e) {
		sortByPostDate();  // Fill up the contents of sortByPostDate()
	});

	// Called when Filter button is clicked
	document.querySelector("div#filter")?.addEventListener("click", function(e) {
		toggleFilter();  // This functionality is already GIVEN
	});

	// Called when Filter Drop-down value is changed
	document.querySelector("#select-users")?.addEventListener("change", function (e) {
		let selectedValue =  this.value;
		applyFilter(selectedValue);  // Fill up the contents of applyFilter() first
	});

	// Called when Sort by Post Order button is clicked
	document.querySelector("div#sort-by-order")?.addEventListener("click", function(e) {
		sortByPostOrder();  // Fill up the contents of sortByPostOrder()
	});

	// Called when To Top button is clicked
	document.querySelector("div#to-top")?.addEventListener("click", function(e) {
		scrollToTop();  // Fill up the contents of scrollToTop() first
	});

	// NOTE: Change the function below if you want to implement Messenger
	// Called when Send Message button is clicked
	document.querySelector("#send-msg")?.addEventListener("click", function(e) {
		e.preventDefault();  // Prevents page refresh
	});


	// .__________________________________________________________.
	// ||														 ||
	// || Fill up the functions below, you may also add your own ||
	// ||________________________________________________________||
	// '														  '

	// TODO: Complete the validateFields() function below TO CHECK IF WORKS
	function validateFields(title, content) {
		// HINT: Return 'true' if title and content is NOT empty
		// else, use the showError() function to show the proper
		// error text. Then, return false

		// If title is invalid, show errorTitle
		if (title == "")
			showError(errorTitle);

		// If content is invalid, show errorContent
		if (content == "")
			showError(errorContent);

		// If invalid, return false
		if (title == "" || content == "")
			return false;

		// If valid, return true
		return true;
	}

	// TODO: Complete the sortByPostDate() function below
	function sortByPostDate() {
		// Sort posts by their Date

		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the sortByPostOrder() function below
	function sortByPostOrder() {
		let post, number;
		let sortedPosts = [];

		// HINT: Use splice() for inserting values to an array index

		// Refresh the displayed posts according to the result of the sorting
		refreshDisplay(sortedPosts);  // Fill up the contents of refreshDisplay() first
	}

	// TODO: Complete the applyFilter() function below
	function applyFilter(selectedValue) {
		// If, selectedValue is equal to selectNone, show all posts

		// Else, (meaning, if a name filter is selected)
		let filteredPosts = [];
		// For each post in posts, if the post name is equal to selectedValue,
		// add it to filteredPosts (filteredPosts.push(post);)

		// Refresh the displayed posts according to the result of filtering
		refreshDisplay(filteredPosts);  // Fill up the contents of refreshDisplay() first

	}

	// TODO: Complete the scrollToTop() function below
	function scrollToTop() {

	}

	// Refreshes the post-container according to the post contents of displayedPosts
	function refreshDisplay(displayedPosts) {
		// If displayedPosts is empty, show "▓▒░(°◡°)░▒▓<br>Wow such empty..."
		// in the post-container (with a "filler-text" class)
		const container = document.querySelector("#post-container");
		if (displayedPosts.length == 0)
			container.innerHTML = "<p class='filler-text'>▓▒░(°◡°)░▒▓<br>Wow such empty...</p>";
		// Else, add each post inside displayedPosts to post-container
		else
			displayPosts(displayedPosts);
	}
	function displayPosts(newPosts) {
		// Clear post-container and add each post inside newPosts inside it instead
		document.querySelector("#post-container").innerHTML = "";
		let n = 1;
		newPosts.array.forEach(element => {
			element.title = n + ". " + element.title;
			n++;
		});
		newPosts.forEach(element => displayPost(element));
	}
	function displayPost(newPost) {

		// Create elements/tags
		// HINT: You can use document.createElement("tag");
		const container = document.querySelector("#post-container");
		let post_main = document.createElement("div");
		let post = document.createElement("div");
		let post_left = document.createElement("div");
		let post_right = document.createElement("div");
		let image = document.createElement("img");
		let content = document.createElement("div");
		let title = document.createElement("p");
		let body = document.createElement("p");
		let footer = document.createElement("div");
		let name = document.createElement("p");
		let date = document.createElement("p");

		// Add classes to your created elements so you don't have to style repeatedly
		// HINT: You can use $(element1).addClass("class-name");
		post_main.classList.add("single-post-main");
		post.classList.add("single-post");
		post_left.classList.add("sp-left");
		post_right.classList.add("sp-right");
		image.classList.add("sp-picture");
		title.classList.add("sp-title");
		body.classList.add("sp-body");
		body.classList.add("sp-right-content");
		// content.classList.add("sp-right-content");
		footer.classList.add("sp-right-bottom");
		name.classList.add("sp-name");
		date.classList.add("sp-date");

		// Set the proper hierarchy of the created elements
		// HINT: $(element1).append(element2); will place element2 within element1
		footer.append(name, date);
		content.append(title, body, footer);
		post_right.append(content);
		post_left.append(image);
		post.append(post_left, post_right);
		post_main.append(post);
		container.append(post_main);

		// Set the proper content/values to the correct elements/tags
		// HINT: You can use $(element2).text("Text to Add"); OR $(imgElement).attr("src", "./images/user.png");
		date.innerHTML = newPost.date.split("T")[0] + " | Time: " + newPost.date.split("T")[1];
		name.innerHTML = newPost.user.name;
		body.innerHTML = newPost.content;
		title.innerHTML = newPost.title;
		image.src = newPost.user.img;

		// Place the outermost element (single-post-main) inside post-container
		// $("div#post-container").append(single-post-main);
	}

	// Reset the values of Create Post
	function resetCreatePost() {
		// Empty the contents of Title and Content
		// Set the Date to the current Date today
	}


	// ._____________________________________.
	// ||									||
	// || Do not change the functions below ||
	// ||___________________________________||
	// '									 '
	function formatDate(today) {  // GIVEN: For date formatting
		let formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0) + 'T' + today.getHours().toString().padStart(2, 0) + ':' + today.getMinutes().toString().padStart(2, 0);
		return formattedDate;
	}

	document.querySelector("input#post-title")?.addEventListener("click", function(e) {	// GIVEN: For error handling
		hideError();
	});
	document.querySelector("textarea#post-body")?.addEventListener("click", function(e) {
		hideError();
	});

	function hideError() {
		document.getElementById("post-error").innerHTML = "";
	}

	function showError(errorText) {
		document.querySelector("#post-error").innerHTML = "";
		document.querySelector("#post-error").innerHTML += "      [ERROR]    " + "<span>" + errorText + "</span>" + "    !     ";
	}

	document.querySelector("#nav-rachel")?.addEventListener("click", function(e) {  // GIVEN: For user switching
		let user = new User("Rachel");
		switchUser(user);
	});
	document.querySelector("#nav-jack")?.addEventListener("click",function(e) {
		let user = new User("Jack");
		switchUser(user);
	});
	document.querySelector("#nav-ashley")?.addEventListener("click",function(e) {
		let user = new User("Ashley");
		switchUser(user);
	});

	function switchUser(newUser) {
		showAllUsers();
		document.querySelector("#nav-current-name").textContent = newUser.name;
		document.querySelector("#nav-selected").src = newUser.img;
		showAllUsers();
		document.querySelector(newUser.nav).hidden = true;
		currentUser = newUser;
	}
	function showAllUsers() {
		document.querySelector("#nav-rachel").hidden = false;
		document.querySelector("#nav-jack").hidden = false;
		document.querySelector("#nav-ashley").hidden = false;
	}
	function toggleFilter() {
		const selectUsers = document.getElementById("select-users");
		selectUsers.hidden = !selectUsers.hidden;
		if (!selectUsers.hidden){
			let selectedFilter = selectUsers.value;
			applyFilter(selectedFilter);
		}
		else {
			refreshDisplay(posts);
		}
	}
});
