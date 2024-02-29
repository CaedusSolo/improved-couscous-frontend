const endpoint = "https://apis.scrimba.com/bored/api/activity"
const activityEl = document.getElementById("activity")
const getBtn = document.getElementById("get-btn")


getBtn.addEventListener('click',() => {
    fetch(endpoint)
     .then(response => response.json())
     .then(data => {
        activityEl.textContent = data.activity
     })
})
