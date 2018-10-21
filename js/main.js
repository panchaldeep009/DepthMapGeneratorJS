"use strict";
(() => {
    function imagesToDepthMap(img_l,img_r,canvas){
        if(img_l.offsetWidth != img_r.offsetWidth ||
            img_l.offsetHeight != img_r.offsetHeight ){
                throw new  Error('Both images should be in equal size');
            }
        let newWidth = img_l.offsetWidth;
        let newHeight = img_l.offsetHeight;
        let leftImgCanvas = document.createElement('canvas');
        let rightImgCanvas = document.createElement('canvas');
        canvas.width = leftImgCanvas.width = rightImgCanvas.width = newWidth;
        canvas.height = leftImgCanvas.height = rightImgCanvas.height = newHeight;
        leftImgCanvas.getContext('2d').drawImage(img_l, 0, 0, newWidth, newHeight);
        rightImgCanvas.getContext('2d').drawImage(img_r, 0, 0, newWidth, newHeight);
        let ctx = canvas.getContext('2d');
        for(let x = 0; x < newWidth; x++){
            for(let y = 0; y < newHeight; y++){
                let leftImgPixel = leftImgCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
                let rightImgPixel = rightImgCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
                let leftIntensity = Math.round(((0.3 * leftImgPixel[0]) + (0.59 * leftImgPixel[1]) + (0.11 * leftImgPixel[2]) ));
                let rightIntensity = Math.round(((0.3 * rightImgPixel[0]) + (0.59 * rightImgPixel[1]) + (0.11 * rightImgPixel[2]) ));
                let outPixel = Math.abs(rightIntensity - leftIntensity);
                if(outPixel < 10){
                    ctx.fillStyle = "#FFFFFF";
                } else {
                    ctx.fillStyle = "#000000";
                }
                // ctx.fillStyle = `rgb(${outPixel},${outPixel},${outPixel})`;
                ctx.fillRect(x,y,1,1);
            }
        }
    }

    let left = document.querySelector('#stereoImagesToDepthMap #left');
    let right = document.querySelector('#stereoImagesToDepthMap #right');
    let canvas = document.querySelector('#outputCanvas');
    setInterval(() => {
        imagesToDepthMap(left,right,canvas);
    }, 500);
})()