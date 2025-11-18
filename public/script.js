sendData = (event) =>{
    event.preventDefault()

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const result = document.getElementById("result");

    fetch("/api/user",{
 headers: { "Content-Type": "application/json" },
method: "POST",
body:JSON.stringify({firstName,lastName})
    })
    .then(res => res.json())
    .then(data => {
        if(data.ok){
            result.innerText = data.message;
            result.style.color = "green";
      }else{
        result.innerText = data.error;
        result.style.color = "red"
      }

      })

    .catch(err => {
      result.innerText = "Error: " + err;
    });

    }


    function getHistory() {
  fetch("/api/history")
    .then(res => res.json())
    .then(data => {
      const historyDiv = document.getElementById("history");
      historyDiv.innerHTML = ""; 

      data.forEach(call => {
        historyDiv.innerHTML += `
          <p>
            ${call.success ? "✔️ Success" : " Error"} |
            ${call.name ? call.name : "No Name"} |
            ${new Date(call.time).toLocaleString()}
          </p>`;
      });
    })
    .catch(err => {
      console.log("Error: ", err);
    });
}
