let recorderVideo = document.getElementById('recorder');
let captureButton = document.getElementById('capture-button');
let streaming = false;
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
    let stream = null;
    try{
        streaming = true;
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        recorderVideo.srcObject = stream;
        recorderVideo.play();
        //Defino configuraciones del gif a grabar
        recorder = RecordRTC(stream, {
            type: 'gif',
            recorderType: GifRecorder,
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: ()=>{ 
                console.log('started'); 
                captureButton.innerHTML = "Stop";
            }
        });
        //inicia la grabación
        recorder.startRecording()
        // arroja un mensaje para poder descargar el gif
        // podría usarse con un listener para la descarga
        //invokeSaveAsDialog(blob);
    }catch(err){
        streaming = false;
        throw new Error(err);
    };
};
//Stop record
async function stopAndPost(){
    await recorder.stopRecording();
    //detengo la grabación
    let blob = await recorder.getBlob();
    //configuramos lo que irá en el body del método post
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    //realizo el post a giphy
    try{
        let urlPost = `https://upload.giphy.com/v1/gifs?api_key=${APIKey}&username=Joangs`;
        let responsePost = await fetch(urlPost, {
            method: 'POST',
            body: form
        });
        let dataPost = await responsePost.json();
        //asigno la id del gif enviado a una variable
        const dataPostId = dataPost.data.id;
        //dejo de grabar e indico  el nuevo estado
        streaming = false;
        captureButton.innerHTML = "Listo";
        //desaparezco before-start-box y aparezco vista previa

        // //!para hacerlo en otra funcion probablemente
        // let urlGet = `https://api.giphy.com/v1/gifs/${dataPostId}?api_key=${APIKey}`;
        // let responseGet = await fetch(urlGet);
        // let dataGet = await responseGet.json();
        // console.log(dataGet)
    }catch(fail){
        streaming = false;
        captureButton.innerHTML = "Don't work";
        throw new Error(fail);
    };
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
});
//play al guifo ya grabado
forwardArrow.addEventListener('click', ()=>{
    //!repite el movimiento del guifo
});
//cambio de preview con subir guifo a uploading guifo
subirGuifo.addEventListener('click', ()=>{
    preview.style.display = "none";
    uploading.style.display = "block";
    setTimeout(() => {
        uploading.style.display = "none";
        successCreateBox.style.display = "block";
    }, 5000);
});
//Cancelar la subida del guifo
cancelUpload.addEventListener('click', ()=>{
    uploading.style.display = "none";
    mainCreateBox.style.display = "block";
    //!Falta prevenir el evento de subir el guifo
    //aquí también se hace el cambio de uploading a success-create-box
});
//Descargar guifo
downloadGuifo.addEventListener('click', ()=>{
    //!Descargar guifo
});
//copiar enlace del guifo
copyLinkButton.addEventListener('click', ()=>{
    //!Copiar enlace del guifo
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