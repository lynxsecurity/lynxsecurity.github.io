const form = document.getElementById('contact-lynx')
const status = document.getElementById('contact-status')
const url = 'https://udfplmuvnf.execute-api.us-east-1.amazonaws.com/dev/email/send'

function post(url, body, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function () {
        if (req.status < 400) {
            callback(null, JSON.parse(req.responseText));
        } else {
            callback(new Error("Request failed: " + req.statusText));
        }
    });
    req.send(JSON.stringify(body));
}
function error(err) {
    form.style.display = "none";
    status.innerHTML = '<h3 style="font-family:"Raleway";>There was an error with sending your message. Please email contact@lynxsecurity.io</h3>.'
    console.log(err)
}
function success() {
    form.style.display = "none";
    status.innerHTML = '<h3 style="font-family:"Raleway";>Thank you for contacting us! We will get back to you as quickly as possible.</h3>';
}
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const payload = {
        name: form.name.value,
        email: form.email.value,
        content: form.content.value
    }
    post(url, payload, function (err, res) {
        if (err) { return error(err) }
        success();
    })
})
