let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1", "#FFFFFF"];


// When clicked, mark selected button and save selection
function handleButtonClick(event){
	// Remove styling from previous color
	let current = event.target.parentElement.querySelector(
	`.${selectedClassName}`
	);
	if (current && current !== event.target) {
		current.classList.remove(selectedClassName);
	}
	
	// Mark the button as selected
	let color = event.target.dataset.color;
	event.target.classList.add(selectedClassName);
	chrome.storage.sync.set({color});
}

// Add a button to the page for each supplied color
function constructOptions(buttonColors){
	chrome.storage.sync.get("color", (data) => {
		let currentColor = data.color;
		// For each color
		for (let buttonColor of buttonColors) {
			// create button with color
			let button = document.createElement("button");
			button.dataset.color = buttonColor;
			button.style.backgroundColor = buttonColor;
			
			// mark current color selection
			if (buttonColor === currentColor) {
				button.classList.add(selectedClassName);
			}
			
			// register a listener for when that button is clicked
			button.addEventListener("click", handleButtonClick);
			page.appendChild(button);
		}
	});
}

// Initialize page with color options
constructOptions(presetButtonColors);