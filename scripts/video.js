let recorderVideo = document.getElementById('recorder');
let captureButton = document.getElementById('capture-button');
let cameraButton = document.getElementById('camera-button');
let camera = document.getElementById('camera');
let previewGif = document.getElementById('preview-gif');
let previewMiniGif = document.getElementById('preview-mini-gif');
let streaming = false;

let stream;
let recorder;
let blob;
let form;
let urlBlobPreview;
let dataPostId;
let gifLink;
//Evento para capturar el video
captureButton.addEventListener('click', ()=>{
    if(streaming){
        stopAndPost();
    }else{
        getStreamAndRecord({
            audio: false,
            video: {
                height: { max: 480 }
            } 
        });
    };
});
//Play record
async function getStreamAndRecord(constraints){
    stream = null;
    try{
        streaming = true;
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        recorderVideo.srcObject = stream;
        //indico un mensaje antes del STOP
        captureButton.innerHTML = "Espera...";
        //Defino configuraciones del gif a grabar
        recorder = RecordRTC(stream, {
            type: 'gif',
            recorderType: GifRecorder,
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: ()=>{ 
                recorderVideo.play();
                captureButton.innerHTML = "Stop";
                if(nightTheme){
                    camera.setAttribute('src','./assets/recording_dark.svg');
                }else{
                    camera.setAttribute('src','./assets/recording.svg');
                };
            }
        });
        //inicia la grabación
        recorder.startRecording()
    }catch(err){
        streaming = false;
        throw new Error(err);
    };
};
//Stop record
async function stopAndPost(){
    await recorder.stopRecording();
    //detengo la grabación
    blob = await recorder.getBlob();
    //configuramos lo que irá en el body del método post
    form = new FormData();
    form.append('file', blob, 'myGif.gif');
    // Cambio el estado de streaming
    streaming = false;
    //realizo el post a giphy
    captureButton.innerHTML = "Listo";
    //apago la cámara
    stream.getTracks().forEach(track => {
        track.stop();
    });
    //reinicio la cámara y así desaparece el video
    recorderVideo.load();
    //envíamos el gif creado a la siguiente sección para que sea posible verlo
    urlBlobPreview = URL.createObjectURL(blob);
    previewGif.setAttribute('src',urlBlobPreview);
};
//states - sections
let comenzar = document.getElementById('comenzar');
let mainCreateBox = document.getElementById('main-create-box');
let beforeStartBox = document.getElementById('before-start-box');
let preview = document.getElementById('preview');
let uploading = document.getElementById('uploading');
let successCreateBox = document.getElementById('success-create-box');
//botones
let subirGuifo = document.getElementById('subir-guifo');
let repetirCaptura = document.getElementById('repetir-captura');
let forwardArrow = document.getElementById('forward-arrow');
let cancelUpload = document.getElementById('cancel-upload');
let copyLinkButton = document.getElementById('copy-link-button');
let downloadGuifo = document.getElementById('download-guifo');
let listo = document.getElementById('listo');
//botones de close
let closeUploadBox = document.getElementById('close-upload-box');
let closeSuccessCreatorBox = document.getElementById('close-success-creator-box');
//cambio de caja Crear Guifos a Un checkeo antes de comenzar
comenzar.addEventListener('click',()=>{
    mainCreateBox.style.display = "none";
    beforeStartBox.style.display = "block";
});
captureButton.addEventListener('click', ()=>{
    if(captureButton.innerHTML == "Listo"){
        beforeStartBox.style.display = "none";
        preview.style.display = "block"
    };
});
//repetir captura
repetirCaptura.addEventListener('click', ()=>{
    preview.style.display = "none";
    mainCreateBox.style.display = "block";
    captureButton.innerHTML = "Capturar";
    if(nightTheme){
        camera.setAttribute('src','./assets/camera_light.svg');
    }else{
        camera.setAttribute('src','./assets/camera.svg');
    };
});
//cambio de preview con subir guifo a uploading guifo
subirGuifo.addEventListener('click', async ()=>{
    preview.style.display = "none";
    uploading.style.display = "block";
    try{
        let urlPost = `https://upload.giphy.com/v1/gifs?api_key=${APIKey}&username=Joangs`;
        //en el método post, en el body, agrego el form
        let responsePost = await fetch(urlPost, {
            method: 'POST',
            body: form
        });
        let dataPost = await responsePost.json();
        //asigno la id del gif enviado a una variable
        dataPostId = dataPost.data.id;
        console.log(dataPostId);
        //envío el id a la función que llena la galería
        fillMisGuifosGallery(dataPostId);
        //asigno el gif al mini preview
        previewMiniGif.setAttribute('src',urlBlobPreview);
        //desaparezco uploading y aparezco success
        uploading.style.display = "none";
        successCreateBox.style.display = "block";

    }catch(fail){
        streaming = false;
        captureButton.innerHTML = "Don't work";
        throw new Error(fail);
    };
});
//Cancelar la subida del guifo
cancelUpload.addEventListener('click', ()=>{
    uploading.style.display = "none";
    mainCreateBox.style.display = "block";
});
//Descargar guifo
downloadGuifo.addEventListener('click', ()=>{
    invokeSaveAsDialog(blob);
});
//copiar enlace del guifo
copyLinkButton.addEventListener('click', async ()=>{
    let urlGet = `https://api.giphy.com/v1/gifs/${dataPostId}?api_key=${APIKey}`;
    let responseGet = await fetch(urlGet);
    let dataGet = await responseGet.json();

    gifLink = dataGet.data.bitly_url;

    await navigator.clipboard.writeText(gifLink);

    alert(`Este es el link que copiaste:): ${gifLink}`);
});
//listo
listo.addEventListener('click', ()=>{
    successCreateBox.style.display = "none";
});
//botones para cerrar ventanas
let closeBeforeStartBox = document.getElementById('close-before-start-box');
closeBeforeStartBox.addEventListener('click', ()=>{
    beforeStartBox.style.display = "none";
    mainCreateBox.style.display = "block";
});
let cancelarButton = document.getElementById('cancelar');
cancelarButton.addEventListener('click', ()=>{
    mainCreateBox.style.display = "none";
});
closeUploadBox.addEventListener('click', ()=>{
    uploading.style.display = "none";
    mainCreateBox.style.display = "block";
});
closeSuccessCreatorBox.addEventListener('click', ()=>{
    successCreateBox.style.display = "none";
});