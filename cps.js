(function() {
    let ran = false;
    let before = Date.now();
    let fps = 0;
    let gameJoined = undefined;
    let cps = 0;
    let peakCps = 0;

    if (ran == false) {
        ran = true;
        let outputmon = document.createElement("div");
        outputmon.id = 'outputmon';
        outputmon.style.color = '#1B4A12';
        outputmon.style.font = '25px Arial';
        outputmon.style.position = 'fixed';
        outputmon.style.top = "20px";
        outputmon.style.left = "20px";
        document.body.append(outputmon);
    }

    document.getElementById("enterGame").addEventListener('click', runMonitor);
    function runMonitor() {
        before = Date.now();
        requestAnimationFrame(updateFPS);
        updateMonitor();
        document.getElementById('gameCanvas').addEventListener('mousedown', incrementCps);
        document.getElementById('gameCanvas').addEventListener('touchstart', incrementCps);
        document.addEventListener('keydown', keyIncCPS);
        if (gameJoined == undefined) {
            gameJoined = Date.now();
        }
    }

    function updateFPS() {
        let now = Date.now();
        fps = Math.round(1000 / (now - before));
        before = now;
        requestAnimationFrame(updateFPS);
    }

    function updateMonitor() {
        setInterval(function() {
            let duration = Math.floor((Date.now() - gameJoined) / 1000);
            let hours = Math.floor(duration / 3600);
            let minutes = Math.floor((duration % 3600) / 60);
            let seconds = duration % 60;
            document.getElementById('outputmon').innerHTML = 'FPS: ' + fps.toString() + '<br>Ping: ' + window.pingTime.toString() + '<br>Clock: ' + hours.toString() + ':' + minutes.toString() + ':' + seconds.toString() + '<br>CPS: ' + cps.toString() + '<br> Peak CPS: ' + peakCps.toString();
        }, 300);
    }

    function incrementCps(e) {
        cps += 1;
        if (cps > peakCps) {
            peakCps = cps;
        }
        setTimeout(function() {
            cps -= 1;
        }, 1000);
    }

    function keyIncCPS(e) {
        if (e.keyCode == 32) {
            incrementCps();
        }
    }
})();
