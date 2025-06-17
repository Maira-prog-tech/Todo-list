(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(e){if(e.ep)return;e.ep=!0;const n=a(e);fetch(e.href,n)}})();function v(){const b=document.getElementById("app");b.innerHTML=`
    <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg mt-10">
      <!-- Только табы в тёмной теме, остальное — светлое -->
      <div data-theme="dark" class="tabs tabs-boxed rounded-t-lg">
        <button data-tab="active" class="tab flex-1">Активные</button>
        <button data-tab="completed" class="tab flex-1">Завершённые</button>
        <button data-tab="deleted" class="tab flex-1">Удалённые</button>
      </div>
      <div class="p-4">
        <div id="formSection" class="mb-4">
          <input id="taskInput"
                 type="text"
                 class="input input-bordered w-full mb-2"
                 placeholder="Добавить новую задачу" />
          <button id="addBtn" class="btn btn-primary w-full">Добавить</button>
        </div>
        <ul id="taskList" class="space-y-2"></ul>
      </div>
    </div>
  `;const t={active:[],completed:[],deleted:[]};let a="active";const i=document.getElementById("taskInput"),e=document.getElementById("addBtn"),n=document.getElementById("taskList"),l=document.querySelectorAll(".tab"),f=document.getElementById("formSection");function r(){n.innerHTML="",t[a].forEach((c,d)=>{const m=document.createElement("li");m.className="flex justify-between items-center bg-gray-100 p-2 rounded";const p=document.createElement("span");p.className="text-gray-800",p.textContent=c;const u=document.createElement("div");if(u.className="flex gap-2",a==="active"){const s=document.createElement("button");s.className="btn btn-sm btn-success",s.textContent="✔",s.onclick=()=>{t.completed.push(c),t.active.splice(d,1),r()};const o=document.createElement("button");o.className="btn btn-sm btn-error",o.textContent="🗑",o.onclick=()=>{t.deleted.push(c),t.active.splice(d,1),r()},u.append(s,o)}else if(a==="completed"){const s=document.createElement("button");s.className="btn btn-sm btn-error",s.textContent="🗑",s.onclick=()=>{t.deleted.push(c),t.completed.splice(d,1),r()},u.append(s)}else{const s=document.createElement("button");s.className="btn btn-sm btn-warning",s.textContent="↺",s.onclick=()=>{t.active.push(c),t.deleted.splice(d,1),r()};const o=document.createElement("button");o.className="btn btn-sm btn-error",o.textContent="✖",o.onclick=()=>{t.deleted.splice(d,1),r()},u.append(s,o)}m.append(p,u),n.append(m)})}e.onclick=()=>{const c=i.value.trim();c&&(t.active.push(c),i.value="",a==="active"&&r())},l.forEach(c=>{c.addEventListener("click",()=>{a=c.dataset.tab,l.forEach(d=>d.classList.remove("tab-active")),c.classList.add("tab-active"),a==="active"?f.classList.remove("hidden"):f.classList.add("hidden"),r()})}),l[0].click()}v();
