window.onload = function() {
	try {
		var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
	} catch(err) {
		alert('!Your browser does not support Web Audio API!');
	};
	var myCanvas = document.getElementById('myCanvas'),
		canvasCtx = myCanvas.getContext("2d"),
		myAudio = document.getElementById("myAudio"),
		source = audioCtx.createMediaElementSource(myAudio),
		analyser = audioCtx.createAnalyser();
	analyser.fftSize = 4096;
	source.connect(analyser);
	analyser.connect(audioCtx.destination);
	myAudio.oncanplaythrough = function draw() {
		var array = new Uint8Array(128),
		    cwidth= myCanvas.width,
		    cheight= myCanvas.height;
		analyser.getByteFrequencyData(array);
		canvasCtx.clearRect(0, 0, cwidth, cheight);

		for(var i = 0; i < array.length; i++) {
			canvasCtx.fillRect(i * 3, 400 - array[i], 1, cheight);
			/*canvasCtx.fillRect(i * 3, 200, 1, array[i] / 5);*/
//			canvasCtx.fillRect(i * 3 + 400, 200, 1, array[127 - i] / 8);
			/*var arr1 = array[7] / 6;
			var arr2 = array[80] / 6;

			canvasCtx.arc(90, 100, arr1, 0, 2 * Math.PI);
			canvasCtx.arc(290, 100, arr2, 0, 2 * Math.PI);
			canvasCtx.fillStyle = "sandybrown";
			canvasCtx.fill();*/
			

		}
		//i与频率值成正比，进行for循环时，i从0一直变化到127，所以i成为了填充方块的横坐标
		//array[i]表示的是i的频率值，当i的频率值为0时，那么，填充方块的纵坐标就是cheight
		//而cheight表示的是canvas的高度值400px，表示从纵坐标为400px的地方开始填充
		requestAnimationFrame(draw);
	}
}