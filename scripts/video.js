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


//states
let comenzar = document.getElementById('comenzar');
let mainCreateBox = document.getElementById('main-create-box');
let beforeStartBox = document.getElementById('before-start-box');
//cambio de caja Crear Guifos a Un checkeo antes de comenzar
comenzar.addEventListener('click',()=>{
    mainCreateBox.style.display = "none";
    beforeStartBox.style.display = "block";
});

captureButton.addEventListener('click', ()=>{
    if(captureButton.innerHTML == "Listo"){
        beforeStartBox.style.display = "none";
    }
});