const t={bodyColor:document.querySelector("body"),startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e,o=!1;t.stopBtn.disabled=!0,t.startBtn.addEventListener("click",(()=>{o||(e=setInterval((()=>{t.bodyColor.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`,o=!0,t.startBtn.disabled=!0,t.stopBtn.disabled=!1}),1e3))})),t.stopBtn.addEventListener("click",(()=>{clearInterval(e),o=!1,t.startBtn.disabled=!1,t.stopBtn.disabled=!0,console.log(`Интервал с идентификатором ${e} остановлен!`)}));
//# sourceMappingURL=01-color-switcher.5a09f469.js.map
