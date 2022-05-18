const DefaultNumSides = 8;

function Cube(gl) {

    var program = initShaders(gl, "Cube-vertex-shader", "Cube-fragment-shader");

    var positions = [
        0,0,0,
        1,0,0,
        1,1,0,
        0,1,0,
        0,0,1,
        1,0,1,
        1,1,1,
        0,1,1
    ];
    
    var indices = [
        0,1,2,
        0,2,3,
        1,6,2,
        1,5,6,
        5,7,6,
        5,4,7,
        2,6,7,
        2,7,3,
        4,3,7,
        4,0,3,
        4,1,0,
        4,5,1
    ];

    positions.numComponents = 3;

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );

    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );

    MV = gl.getUniformLocation(program, "MV");
    this.MV = mat4();

    P = gl.getUniformLocation(program, "P");
    this.P = mat4();

    V = gl.getUniformLocation(program, "V");
    this.V = mat4();

    this.render = function () {
        gl.useProgram( program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( positions.aPosition, positions.numComponents,
            gl.FLOAT, false, 0, 0 );

        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));
        gl.uniformMatrix4fv(V, false, flatten(this.V));

        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};

//Disregard
function Cube_firstAttempt( gl) {

    

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    var n = numSides || DefaultNumSides; // Number of sides 
    
    positions.numComponents = 3;
    
    // Initialize temporary arrays for the Cube's indices and vertex positions
    
    
    var positions = [ 
        0.0, 0.0, 0.0,//0
        1,0,0, //1
        1,1,0, //2
        0,1,0,//3
        0,0,1,//4
        1,0,1,//5
        1,1,1,//6
        0,1,1//7

    ];

    var indices = [
        0,1,2,0,2,3,1,6,2,1,5,6,5,7,6,5,4,7,2,6,7,2,7,3,4,3,7,4,0,3,4,1,0,4, 5, 1
    ];
/*
    var indices = [ 
        0,  1,  2,  0,  2,  3,  // front
        4,  5,  6,  4,  6,  7,  // back
        0, 1, 6,    0, 5, 6,        // top
        2, 3, 4,    2, 4, 7,        // BT
        0, 3, 4,    0,4,5,          // L
        1,2,7,      1,6,7,          // R

    ];
    */
    var edges = [
            0, 1,  // Front
            1, 2,
            2, 3,
            3, 0,
            4, 5,  // Back
            5, 6,
            6, 7,
            7, 4,
            0, 4,  // Side
            1, 5,
            2, 6,
            3, 7
        ];

/*
    var edges = [
        0, 1, // Front Frame, top left vert
        1, 2,
        2, 3,
        0, 3,
        4, 5, //Back
        5, 6,
        6, 7,
        4, 7,
        0, 5, //Top
        1, 6,
        2, 7, // Bottom
        3, 4, 
       
    ];
   */
    //Unused:
    //positions.push( 0.0, 0.0, 1.0 );    
    //this.indices = { count : indices.length };
    //indices.push(n + 1);

    positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW );
    
    indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW );
    
    edges.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(edges), gl.STATIC_DRAW );

    positions.aPosition = gl.getAttribLocation( program, "aPosition" );
    gl.enableVertexAttribArray( positions.aPosition );
    
    this.uniform = { 
        MV : gl.getUniformLocation(this.program, "MV"),
        P : gl.getUniformLocation(this.program, "P"),        
        V : gl.getUniformLocation(this.program, "V")
    };
    
    this.MV = mat4();
    this.P = mat4();
    this.V = mat4();

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );        
            
        
        gl.uniformMatrix4fv(MV, false, flatten(this.MV));
        gl.uniformMatrix4fv(P, false, flatten(this.P));
        gl.uniformMatrix4fv(V, false, flatten(this.V));

       //Render the wireframe version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, edges.buffer );
        gl.drawElements( gl.LINES, edges.length, gl.UNSIGNED_SHORT, 0 );

        // Render the solid version of the cube
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, indices.buffer );
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0 );
    }
};