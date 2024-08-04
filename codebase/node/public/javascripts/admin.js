
async function addUserData(){
    var name = document.getElementById("name").value;
    var date = document.getElementById("date").value;
    var totalDistance = document.getElementById("totalDistance").value;
    var totalSteps = document.getElementById("totalSteps").value;
    var veryActiveDist = document.getElementById("veryActiveDist").value;
    var veryActiveMins = document.getElementById("veryActiveMins").value;
    var moderateActiveDist = document.getElementById("moderateActiveDist").value;
    var fairlyActiveMins = document.getElementById("fairlyActiveMins").value;
    var lightlyActiveDist = document.getElementById("lightlyActiveDist").value;
    var lightlyActiveMins = document.getElementById("lightlyActiveMins").value;
    var predictionDiv = document.getElementById("predictionDiv");
    var predictionScore = document.getElementById("predictionScore");
    if(!name || !date || !totalDistance || !totalSteps || !veryActiveDist || !veryActiveMins || !moderateActiveDist ||
        !fairlyActiveMins || !lightlyActiveDist || !lightlyActiveMins){
            alert("Please fill all the fields!");
    }
    else{
        let resp = await fetch('/analysis',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            ,body: JSON.stringify({
                "name": name,
                "date": date,
                "totalSteps": totalSteps,
                "totalDistance": totalDistance,
                "veryActiveDist": veryActiveDist,
                "veryActiveMins": veryActiveMins,
                "moderateActiveDist": moderateActiveDist,
                "fairlyActiveMins": fairlyActiveMins,
                "lightActiveDist": lightlyActiveDist,
                "lightlyActiveMins": lightlyActiveMins
            }
            )});

            let respJson = await resp.json();

            if(respJson.status == 200){
                console.log(respJson.msg);
                predictionDiv.classList.remove('hidden');
                predictionScore.innerHTML = respJson.msg.score;
            }
            else{
                alert(respJson.msg);
            }
    }
    
}

