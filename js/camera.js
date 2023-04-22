const initializeCamera = document.querySelector("[data-video-botao]");
const fieldCamera = document.querySelector("[data-camera]");
const videoCamera = document.querySelector("[data-video]");
const takePicture = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const message = document.querySelector("[data-mensagem]");
const sendPicture = document.querySelector("[data-enviar]")

let imageURL = "";

initializeCamera.addEventListener("click", async function () {
    const initializeVideo = await navigator.mediaDevices
    .getUserMedia({video: true, audio: false})

    initializeCamera.style.display = "none";
    fieldCamera.style.display = "block";

    videoCamera.srcObject = initializeVideo;
})

takePicture.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(videoCamera, 0, 0, canvas.width, canvas.height);

    imageURL = canvas.toDataURL("image/jpeg");

    fieldCamera.style.display = "none";
    message.style.display = "block";
})

sendPicture.addEventListener("click", () => {
    const receiveData = localStorage.getItem("register");
    const receiveConverted = JSON.parse(receiveData)

    receiveConverted.image = imageURL;

    localStorage.setItem('register', JSON.stringify(receiveConverted));

    window.location.href = "./abrir-conta-form-3.html"
})