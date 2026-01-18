import{r as l,j as n,c as d}from"./client-B_pnGUEq.js";const r={COAG:{DISS_MAX_VOL:20,DISS_AREA:8,SOL_AREA:37.21,SOL_MAX_H:3.2}};function u(c,i){const s=parseFloat(c),o=parseFloat(i)/100;if(isNaN(s)||isNaN(o)||s<=0||o<=0)return"请输入有效数值";const t=s/o;let e="";if(t<=r.COAG.DISS_MAX_VOL)e+=`✓ 工况一
`,e+=`总体积：${t.toFixed(2)} m³
`,e+=`液位：${(t/r.COAG.DISS_AREA).toFixed(2)} m`;else{const a=t-r.COAG.DISS_MAX_VOL,A=t/r.COAG.SOL_AREA;e+=`⚠ 工况二
`,e+=`补水体积：${a.toFixed(2)} m³
`,e+=A>r.COAG.SOL_MAX_H?"⚠ 溢流":"✓ 安全"}return e}function S(){const[c,i]=l.useState(""),[s,o]=l.useState(""),[t,e]=l.useState("");return n.jsxs("div",{style:{padding:20},children:[n.jsx("h1",{children:"配药计算（工业模块）"}),n.jsx("input",{placeholder:"投加量",value:c,onChange:a=>i(a.target.value)}),n.jsx("input",{placeholder:"浓度 %",value:s,onChange:a=>o(a.target.value)}),n.jsx("button",{onClick:()=>e(u(c,s)),children:"计算一期混凝"}),n.jsx("pre",{children:t})]})}d.createRoot(document.getElementById("root")).render(n.jsx(S,{}));
