!function(){var t,o={bodyColor:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")},n=!1;o.startBtn.addEventListener("click",(function(){n||(t=setInterval((function(){o.bodyColor.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")),n=!0,o.startBtn.disabled=!0,o.stopBtn.disabled=!1}),1e3))})),o.stopBtn.addEventListener("click",(function(){clearInterval(t),n=!1,o.startBtn.disabled=!1,o.stopBtn.disabled=!0,console.log("Интервал с идентификатором ".concat(t," остановлен!"))}))}();
//# sourceMappingURL=01-color-switcher.255f0b8b.js.map
