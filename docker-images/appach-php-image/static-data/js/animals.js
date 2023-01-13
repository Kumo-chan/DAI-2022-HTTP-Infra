setInterval(async() => {
	
	const animals = await fetch('/api/').then(response => response.json());
	
	let send = "Wait one second until first request."
	if (animals.length > 0) {
		send = animals[0].animal + " : [type : " + animals[0].type + "] " +
			" [age : " + animals[0].age + "]";
	}
	
	document.getElementById("api-animals").innerHTML = send
}, 1000)