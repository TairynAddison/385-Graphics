// Assignment 2, CS 385, Tairyn Addison

function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    gl.clearColor(0.05, 0.3, 0.0, 0.3);
    cone = new Cone(gl, 60);

    render();
}

function render(){
    gl.clear(gl.COLOR_BUFFER_BIT);
    cone.render();

}

window.onload = init;
