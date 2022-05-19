//Assignment 3, CS 385, Tairyn Addison

var angle = 0;

function init(){
    var canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    
    gl.clearColor(1, .667, .109, 1);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);    
        
    cube = new Cube(gl);
    requestAnimationFrame(render);
    render();
}

function render(){
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        angle += .75;
        cube.MV = rotate(angle, [2, -1 ,1]);
        //numbers just to play around

        
        
        cube.render();
        requestAnimationFrame(render);

}

window.onload = init;