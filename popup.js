// Initialize button with user's preferred color
let changeColor= document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color}) => {
	changeColor.style.backgroundColor = color;
});

// Every 1000 seconds do something
var time = 1000
setInterval(async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
	
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setPageBackgroundColor,
	});
}, time);


// When the button is clicked, inject setPageBackgroundColor into current page

changeColor.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});
	
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: setPageBackgroundColor,
	});
});


// Execute body of function as content script inside current page
function setPageBackgroundColor() {
	chrome.storage.sync.get("color", ({ color }) => {
		document.body.style.backgroundColor = color;
	});
}