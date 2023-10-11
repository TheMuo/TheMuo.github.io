(function ($) {
  "use strict";

  // Preloader
  $("#page").css("display", "none");
  $(window).on("load", function () {
    $("#loader").addClass("loaded");
    $("#page").css("display", "");
  });

  // Copy IP Button
  if (document.getElementById("header")) {
    document.getElementById("copyip").addEventListener("click", () => {
      navigator.clipboard.writeText("mc.hypixel.net").then((error) => {
        if (error) console.error(error);
        else
          Swal.fire({
            icon: "success",
            title: "Server IP Copied",
            html: "Server IP successfully copied to the clipboard.",
          });
      });
    });
  }

  // Background Particles
  const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
  const numBalls = 50;
  const balls = [];

  for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;

    balls.push(ball);
    $("#header").append(ball);
  }

  balls.forEach((el, i) => {
    let to = {
      x: Math.random() * (i % 2 === 0 ? -11 : 11),
      y: Math.random() * 12,
    };

    el.animate([{ transform: "translate(0, 0)" }, { transform: `translate(${to.x}rem, ${to.y}rem)` }], {
      duration: (Math.random() + 1) * 2000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out",
    });
  });

  // Players Counter
  function initServerData(serverIp, serverPort) {
    fetch("https://mcapi.us/server/status?ip=" + serverIp + "&port=" + serverPort)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  function initServerData(serverIp, serverPort) {
    const serverIpElement = document.getElementById("server-ip");
    serverIpElement.innerHTML = serverIp;
    fetch("https://mcapi.us/server/status?ip=" + serverIp + "&port=" + serverPort)
      .then((response) => response.json())
      .then((data) => handleServerStatus(data));

    function handleServerStatus(data) {
      if (data.status == "error") {
        console.log(data.error);
        return false;
      }

      const playerCounter = document.getElementById("player-counter");
      playerCounter.innerHTML = data.players.now;
    }
  }

  initServerData("play.hypixel.net", "25565");
})(window.jQuery);
