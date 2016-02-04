/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeedX:number;
        public rotationSpeedY:number;
        public rotationSpeedZ:number;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeedX:number,rotationSpeedY:number,rotationSpeedZ:number) {
           this.rotationSpeedX = rotationSpeedX;
           this.rotationSpeedY = rotationSpeedY;
           this.rotationSpeedZ = rotationSpeedZ;
        }
        
       
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++

    }
}
