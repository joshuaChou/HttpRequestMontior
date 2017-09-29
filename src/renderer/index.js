
import {remote,ipcRenderer} from 'electron';
const emt = remote.require('./index.js');



document.getElementById('routerResponseText').innerHTML = ipcRenderer.sendSync('list-router', "");

function check(){
    var result = document.getElementById('resultContent').value
    document.getElementById('errorResponseText').innerHTML =ipcRenderer.sendSync('content-message', result);
}


emt.on("queryMsg", (arg) => {
    var ciResponseText = document.getElementById('queryResponseText');
    var obj = JSON.parse(arg);
    ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
});

emt.on("resultMsg", (arg) => {
    var ciResponseText = document.getElementById('resultResponseText');
    var obj = JSON.parse(arg);
    ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
});

emt.on("headerMsg", (arg) => {
    var ciResponseText = document.getElementById('headerResponseText');
    var obj = JSON.parse(arg);
    ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
});

emt.on("methodMsg", (arg) => {
    var ciResponseText = document.getElementById('methodResponseText');
    var obj = JSON.parse(arg);
    ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
});

emt.on("paramsMsg", (arg) => {
    var ciResponseText = document.getElementById('paramsResponseText');
    var obj = JSON.parse(arg);
    ciResponseText.innerHTML = JSON.stringify(obj, undefined, 2);
});