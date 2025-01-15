import{r as L,o as O,a as l,c as d,b as o,d as D,w as C,u as R,e as u,f as k,R as K,g as M,h as F,t as h,F as y,i as A,n as S,j as $,k as T,v as N,l as x,m as z,p as w,q as H,s as j,x as Y,y as W}from"./vue-vendor-CaE-17CA.js";import{g as U,o as V,s as X,i as J,a as Q,b as g,c as f,q as I,w as B,d as Z}from"./vendor-BoDgcQ-v.js";import{C as q,r as ee}from"./chartjs-v-CiLEzH.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const _=(a,e)=>{const s=a.__vccOpts||a;for(const[n,t]of e)s[n]=t;return s},te={id:"app"},ae={class:"app-header"},se={class:"app-nav"},oe={class:"app-main"},re={__name:"App",setup(a){const e=U(),s=L(!1);O(()=>{V(e,t=>{s.value=!!t})});function n(){X(e).then(()=>{alert("Você saiu com sucesso!"),window.location.href="/login"}).catch(t=>{console.error("Erro ao sair:",t.message)})}return(t,r)=>(l(),d("div",te,[o("header",ae,[o("nav",se,[D(R(K),{to:"/",class:"nav-link"},{default:C(()=>r[0]||(r[0]=[k("Dashboard")])),_:1}),s.value?(l(),d("button",{key:0,class:"logout-button",onClick:n}," Sair ")):u("",!0)])]),o("main",oe,[D(R(M))])]))}},ne=_(re,[["__scopeId","data-v-4aff2a07"]]),ie={name:"GenericCard",props:{title:{type:String,required:!1},showNewButton:{type:Boolean,default:!0}}},le={class:"card generic-card"},de={class:"card-header d-flex justify-content-between align-items-center"},ce={class:"mb-0"},pe={class:"card-body"},he={key:0,class:"card-footer"};function ue(a,e,s,n,t,r){return l(),d("div",le,[o("div",de,[F(a.$slots,"title",{},()=>[o("h5",ce,h(s.title),1)]),s.showNewButton?(l(),d("button",{key:0,class:"btn btn-sm btn-primary",onClick:e[0]||(e[0]=i=>a.$emit("newItem"))},e[1]||(e[1]=[o("i",{class:"fas fa-plus"},null,-1),k(" Novo ")]))):u("",!0)]),o("div",pe,[F(a.$slots,"content",{},()=>[e[2]||(e[2]=o("p",{class:"text-muted"},"Sem conteúdo disponível.",-1))])]),a.$slots.footer?(l(),d("div",he,[F(a.$slots,"footer",{},void 0)])):u("",!0)])}const me=_(ie,[["render",ue],["__scopeId","data-v-03dd9fa7"]]);q.register(...ee);const ge={props:{title:{type:String,default:""},labels:{type:Array,required:!0,validator(a){return a.every(e=>typeof e=="string")}},data:{type:Array,required:!0,validator(a){return a.every(e=>typeof e=="number"&&e>=0)}},colors:{type:Array,required:!0,validator(a){return a.every(e=>typeof e=="string")}},width:{type:String,default:"100%"},height:{type:String,default:"400px"},centerText:{type:String,default:""}},data(){return{selectedIndex:null}},mounted(){this.createChart()},methods:{createChart(){const a=this.$refs.chartCanvas.getContext("2d");this.chart=new q(a,{type:"doughnut",data:{labels:this.labels,datasets:[{data:this.data,backgroundColor:this.colors,hoverOffset:15}]},options:{responsive:!0,plugins:{tooltip:{enabled:!0,textInside:!0},beforeDraw:e=>{const s=e.ctx,n=e.chartArea.width,t=e.chartArea.height,r=n/2,i=e.chartArea.top+t/2;this.centerText&&this.centerText.trim()!==""?(s.save(),s.font="30px Arial",s.fillStyle="#000",s.textAlign="center",s.textBaseline="middle",s.fillText(this.centerText,r,i),s.restore()):(s.save(),s.font="30px Arial",s.fillStyle="#000",s.textAlign="center",s.textBaseline="middle",s.fillText("Sem dados",r,i),s.restore())}},onHover:(e,s)=>{if(s.length){const n=s[0],t=this.chart.data.datasets[n.datasetIndex];t.hoverOffset=20,this.chart.update()}},onLeave:()=>{this.chart.data.datasets.forEach((e,s)=>{e.hoverOffset=this.selectedIndex===s?20:15}),this.chart.update()},onClick:(e,s)=>{if(s.length){const t=s[0].index;this.selectedIndex=t,this.chart.data.datasets.forEach((i,c)=>{i.hoverOffset=c===this.selectedIndex?20:15}),this.chart.update();const r=this.labels[t];this.$emit("section-clicked",r)}}}})}},beforeUnmount(){this.chart&&this.chart.destroy()}},fe={ref:"chartCanvas"};function ve(a,e,s,n,t,r){return l(),d("div",null,[o("canvas",fe,null,512)])}const be=_(ge,[["render",ve],["__scopeId","data-v-b7d9108a"]]),Ce={props:{headers:{type:Array,default:()=>[]},rows:{type:Array,default:()=>[]},descriptionKey:{type:String,default:"comments"}},data(){return{tooltipVisible:!1,tooltipContent:"",filters:{},filteredRows:[]}},watch:{rows:{handler(a){this.filteredRows=[...a]},immediate:!0}},methods:{getColumnAlignment(a){const e=this.headers.find(s=>s.value===a);return(e==null?void 0:e.align)||"text-center"},applyFilters(){this.filteredRows=this.rows.filter(a=>Object.keys(this.filters).every(e=>{var t,r;const s=((t=this.filters[e])==null?void 0:t.toLowerCase())||"";return(((r=a[e])==null?void 0:r.toString().toLowerCase())||"").includes(s)}))}}},De={class:"table-responsive"},_e={class:"table table-striped table-hover"},ye={key:0,class:"mt-2"},Ae=["onUpdate:modelValue"],we=["onClick"],xe={key:0},Te=["title"],Ue={key:1},Fe={key:0},Se=["colspan"],Ne={class:"tooltip-content"};function ke(a,e,s,n,t,r){var i;return l(),d("div",De,[o("table",_e,[o("thead",null,[o("tr",null,[(l(!0),d(y,null,A(s.headers,c=>(l(),d("th",{key:c.value,class:S(c.align||"text-center"),style:$({verticalAlign:c.verticalAlign||"middle"})},[k(h(c.text)+" ",1),c.filterable?(l(),d("div",ye,[T(o("input",{type:"text",class:"form-control form-control-sm","onUpdate:modelValue":m=>t.filters[c.value]=m,onInput:e[0]||(e[0]=(...m)=>r.applyFilters&&r.applyFilters(...m)),placeholder:"Filtrar"},null,40,Ae),[[N,t.filters[c.value]]])])):u("",!0)],6))),128))])]),o("tbody",null,[(l(!0),d(y,null,A(t.filteredRows,(c,m)=>(l(),d("tr",{key:m,onClick:p=>a.$emit("rowClick",c)},[(l(!0),d(y,null,A(c,(p,b)=>(l(),d("td",{key:b,class:S(r.getColumnAlignment(b))},[b===s.descriptionKey&&p?(l(),d("span",xe,[o("span",{class:"info-icon",title:p},e[3]||(e[3]=[o("i",{class:"fas fa-info-circle"},null,-1)]),8,Te)])):(l(),d("span",Ue,h(p),1))],2))),128))],8,we))),128)),t.filteredRows.length===0?(l(),d("tr",Fe,[o("td",{colspan:((i=s.headers)==null?void 0:i.length)||1,class:"text-center"},"Nenhum dado disponível",8,Se)])):u("",!0)])]),t.tooltipVisible?(l(),d("div",{key:0,class:"tooltip-container",onClick:e[2]||(e[2]=c=>t.tooltipVisible=!1)},[o("div",Ne,[o("p",null,h(t.tooltipContent),1),o("button",{class:"btn btn-primary",onClick:e[1]||(e[1]=c=>t.tooltipVisible=!1)},"Fechar")])])):u("",!0)])}const Re=_(Ce,[["render",ke],["__scopeId","data-v-2f895af4"]]),Ie={apiKey:"AIzaSyB3-kGIIrzMp3il9BMmB7e9YIw8MVi7eqY",authDomain:"carreiras-usp.firebaseapp.com",databaseURL:"https://carreiras-usp-default-rtdb.firebaseio.com",projectId:"carreiras-usp",storageBucket:"carreiras-usp.firebasestorage.app",messagingSenderId:"870850312201",appId:"1:870850312201:web:edc7a5a5e757c9187620d8"},G=J(Ie);U(G);const v=Q(G),Be={name:"DashBoardComponent",components:{GenericCard:me,GenericGraph:be,GenericTable2:Re},data(){return{graphKeyCongregacao:1,graphKeyDepartamentos:2,temas:[],CampusDropdown:[],selectedCampus:[],allCampi:[],selectedUnidade:"Todas",uniqueUnidadeSiglas:[],selectedTema:"",votacoesCongregacao:[],votacoesDepartamentos:[],graphDataCongregacao:[0,0,0],graphDataDepartamentos:[0,0,0],totalUnidades:0,totalDepartamentos:0,unidades:[],tableHeadersUnidades:[{text:"Sigla",value:"Sigla",filterable:!0},{text:"Aprovado",value:"Aprovado",filterable:!1},{text:"Favoráveis",value:"Favoráveis",filterable:!1},{text:"Contrários",value:"Contrários",filterable:!1},{text:"Abstenções",value:"Abstenções",filterable:!1}],tableHeadersDepartamentos:[{text:"Nome",value:"Nome",filterable:!0},{text:"Aprovado",value:"Aprovado",filterable:!1},{text:"Favoráveis",value:"Favoráveis",filterable:!1},{text:"Contrários",value:"Contrários",filterable:!1},{text:"Abstenções",value:"Abstenções",filterable:!1}],Comentarios:"Comentários",tableRowsUnidades:[],tableRowsDepartamentos:[]}},computed:{hasData(){return a=>a&&a.length>0},graphDataFormatted(){const a=this.unidades.filter(t=>this.selectedCampus.includes(t.Campus)).length,e=this.selectedUnidade==="Todas"?this.departamentos.length:this.departamentos.filter(t=>t.UnidadeID===this.selectedUnidade).length,s=[this.graphDataCongregacao[0]||0,this.graphDataCongregacao[1]||0,a-(this.graphDataCongregacao[0]||0)-(this.graphDataCongregacao[1]||0)-(this.graphDataCongregacao[2]||0),this.graphDataCongregacao[2]||0,this.totalUnidades],n=[this.graphDataDepartamentos[0]||0,this.graphDataDepartamentos[1]||0,e-(this.graphDataDepartamentos[0]||0)-(this.graphDataDepartamentos[1]||0)-(this.graphDataDepartamentos[2]||0),this.graphDataDepartamentos[2]||0];return[s,n]}},watch:{handler(a){a.length===0&&this.selectedCampus.length!==this.allCampi.length&&(this.selectedCampus=[...this.allCampi]),this.filterTableRowsByCampus(a),this.calculateGraphData()},immediate:!0,deep:!0,selectedCampus:{handler(a){a.length===0&&this.selectedCampus.length!==this.allCampi.length&&(this.selectedCampus=[...this.allCampi]),this.filterTableRowsByCampus(a)},immediate:!0,deep:!0},selectedUnidade(a){a==="Todas"?this.filterTableRowsByUnidade("Todas"):a&&this.uniqueUnidadeSiglas.includes(a)&&this.filterTableRowsByUnidade(a)},selectedTema(a){a&&this.loadDashboardData()}},methods:{selectUnidade(a){this.selectedUnidade=a},toggleCampusSelection(a){this.selectedCampus.includes(a)?this.selectedCampus=this.selectedCampus.filter(e=>e!==a):this.selectedCampus.push(a)},async fetchTemas(){try{const a=await g(f(v,"Temas"));this.temas=a.docs.map(e=>({id:e.id,...e.data()}))}catch(a){console.error("Erro ao buscar temas:",a)}},async loadDashboardData(){try{await this.fetchVotacoes(),this.calculateGraphData(),this.populateTables(),this.populateDepartamentosTable()}catch(a){console.error("Erro ao carregar dados do dashboard:",a)}},async fetchVotacoes(){try{const a=await g(I(f(v,"VotacoesCongregacao"),B("temaID","==",this.selectedTema)));this.votacoesCongregacao=a.docs.map(n=>({id:n.id,...n.data()}));const e=await g(I(f(v,"VotacoesDepartamentos"),B("temaID","==",this.selectedTema)));this.votacoesDepartamentos=e.docs.map(n=>({id:n.id,...n.data()}));const s=await g(f(v,"Unidades"));this.unidades=s.docs.map(n=>({id:n.id,...n.data()}))}catch(a){console.error("Erro ao buscar votações ou unidades:",a)}},async fetchTotalUnidades(){try{const a=await g(f(v,"Unidades"));this.totalUnidades=a.size}catch(a){console.error("Erro ao buscar total de unidades:",a)}},async fetchTotalDepartamentos(){try{const a=await g(f(v,"Departamentos"));this.totalDepartamentos=a.size}catch(a){console.error("Erro ao buscar total de unidades:",a)}},calculateGraphData(){const a=this.tableRowsUnidades.filter(i=>i.Aprovado==="Sim").length,e=this.tableRowsUnidades.filter(i=>i.Aprovado==="Não"&&i.Comentários.trim()!=="").length,s=this.tableRowsUnidades.filter(i=>i.Aprovado==="Não"&&i.Comentários.trim()==="").length;this.graphDataCongregacao=[a,e,s,this.tableRowsUnidades.length-a-e-s];const n=this.tableRowsDepartamentos.filter(i=>i.Aprovado==="Sim").length,t=this.tableRowsDepartamentos.filter(i=>i.Aprovado==="Não"&&i.Comentários.trim()!=="").length,r=this.tableRowsDepartamentos.filter(i=>i.Aprovado==="Não"&&i.Comentários.trim()==="").length;this.graphDataDepartamentos=[n,t,r,this.tableRowsDepartamentos.length-n-t,-r],this.graphKeyCongregacao++,this.graphKeyDepartamentos++},populateTables(){const a=new Set;this.CampusDropdown=this.votacoesCongregacao.map(e=>{const s=this.unidades.find(n=>n.id===e.unidadeID);return s?s.Campus:null}).filter(e=>e&&!a.has(e)?(a.add(e),!0):!1).map(e=>({Campus:e})),this.allCampi=this.CampusDropdown.map(e=>e.Campus),this.selectedCampus=[...this.allCampi],this.filterTableRowsByCampus(this.selectedCampus),this.calculateGraphData()},filterTableRowsByCampus(a){this.tableRowsUnidades=this.votacoesCongregacao.map(e=>{var n,t,r;const s=this.unidades.find(i=>i.id===e.unidadeID);return{Campus:s?s.Campus:"N/A",Sigla:s?s.Sigla:"N/A",Aprovado:e.Aprovado||"N/A",Apoio:e.Apoio||"N/A",Favoráveis:((n=e.Placar)==null?void 0:n.Favoraveis)||0,Contrários:((t=e.Placar)==null?void 0:t.Contrarios)||0,Abstenções:((r=e.Placar)==null?void 0:r.Abstencoes)||0,Comentários:e.Comentarios||""}}).filter(e=>a.includes(e.Campus)).map(e=>({Sigla:e.Sigla,Aprovado:e.Aprovado,Favoráveis:e.Favoráveis,Contrários:e.Contrários,Abstenções:e.Abstenções,Comentários:e.Comentários})),this.calculateGraphData()},populateDepartamentosTable(){const a=new Set;this.tableRowsDepartamentos=this.votacoesDepartamentos.map(e=>{var t,r,i;const s=this.departamentos.find(c=>c.id===e.dptID),n=this.unidades.find(c=>c.id===(s==null?void 0:s.UnidadeID));return n&&n.Sigla&&a.add(n.Sigla),{Nome:s?s.Nome:"N/A",Aprovado:e.Aprovado||"N/A",Favoráveis:((t=e.Placar)==null?void 0:t.Favoraveis)||0,Contrários:((r=e.Placar)==null?void 0:r.Contrarios)||0,Abstenções:((i=e.Placar)==null?void 0:i.Abstencoes)||0,Comentários:e.Comentarios||""}}),this.uniqueUnidadeSiglas=["Todas",...Array.from(a)],(!this.selectedUnidade||!this.uniqueUnidadeSiglas.includes(this.selectedUnidade))&&(this.selectedUnidade="Todas"),this.calculateGraphData()},filterTableRowsByUnidade(a){a==="Todas"?this.tableRowsDepartamentos=this.votacoesDepartamentos.map(e=>{var n,t,r;const s=this.departamentos.find(i=>i.id===e.dptID);return{Nome:s?s.Nome:"N/A",Sigla:s?s.UnidadeID:"N/A",Aprovado:e.Aprovado||"N/A",Favoráveis:((n=e.Placar)==null?void 0:n.Favoraveis)||0,Contrários:((t=e.Placar)==null?void 0:t.Contrarios)||0,Abstenções:((r=e.Placar)==null?void 0:r.Abstencoes)||0,Comentários:e.Comentarios||""}}):this.tableRowsDepartamentos=this.votacoesDepartamentos.map(e=>{var n,t,r;const s=this.departamentos.find(i=>i.id===e.dptID);return{Nome:s?s.Nome:"N/A",Sigla:s?s.UnidadeID:"N/A",Aprovado:e.Aprovado||"N/A",Favoráveis:((n=e.Placar)==null?void 0:n.Favoraveis)||0,Contrários:((t=e.Placar)==null?void 0:t.Contrarios)||0,Abstenções:((r=e.Placar)==null?void 0:r.Abstencoes)||0,Comentários:e.Comentarios||""}}).filter(e=>e.Sigla===a),this.tableRowsDepartamentos=this.tableRowsDepartamentos.map(e=>({Nome:e.Nome,Aprovado:e.Aprovado,Favoráveis:e.Favoráveis,Contrários:e.Contrários,Abstenções:e.Abstenções,Comentários:e.Comentários})),this.calculateGraphData()},async fetchDepartamentosData(){try{const a=await g(f(v,"Departamentos"));this.departamentos=a.docs.map(n=>({id:n.id,...n.data()}));const e=await g(f(v,"Unidades"));this.unidades=e.docs.map(n=>({id:n.id,...n.data()}));const s=await g(f(v,"VotacoesDepartamentos"));this.votacoesDepartamentos=s.docs.map(n=>({id:n.id,...n.data()})),this.populateDepartamentosTable()}catch(a){console.error("Erro ao buscar dados dos departamentos:",a)}}},async mounted(){await this.fetchTemas(),await this.fetchTotalUnidades(),await this.fetchTotalDepartamentos(),await this.fetchDepartamentosData(),await this.fetchVotacoes(),this.filterTableRowsByCampus(this.selectedCampus),this.temas.length>0&&(this.selectedTema=this.temas[0].id)}},Ve={class:"container-fluid layout-view py-3"},qe={class:"mb-1"},Ge=["value"],Pe={class:"mt-4"},Ee={key:0,class:"col-md-12"},Le={class:"row gx-3"},Oe={class:"col-md-6"},Ke={class:"mb-3"},Me={class:"collapse mt-3",id:"campusCollapse"},$e={class:"d-flex flex-wrap gap-2"},ze=["onClick"],He={class:"row text-center mb-3"},je={class:"col-3"},Ye={class:"col-3"},We={class:"col-3"},Xe={class:"row"},Je={class:"col-md-12"},Qe={class:"row"},Ze={class:"col-md-6"},et={class:"col-md-6"},tt={class:"col-md-6"},at={class:"mb-3 dropdown"},st={class:"btn btn-primary dropdown-toggle",type:"button",id:"dropdownUnidadeButton","data-bs-toggle":"dropdown","aria-expanded":"false"},ot={class:"dropdown-menu","aria-labelledby":"dropdownUnidadeButton"},rt=["onClick"],nt={key:0},it={class:"row text-center mb-3"},lt={class:"col-3"},dt={class:"col-3"},ct={class:"col-3"},pt={class:"row"},ht={class:"col-md-12"},ut={class:"row"},mt={class:"col-md-6"},gt={class:"col-md-6"},ft={key:1,class:"text-center text-muted"};function vt(a,e,s,n,t,r){const i=x("GenericGraph"),c=x("GenericTable2"),m=x("GenericCard");return l(),d("div",Ve,[D(m,{showNewButton:!1},{title:C(()=>[o("div",qe,[T(o("select",{id:"tema-dropdown",class:"form-select","onUpdate:modelValue":e[0]||(e[0]=p=>t.selectedTema=p)},[(l(!0),d(y,null,A(t.temas,(p,b)=>(l(),d("option",{key:b,value:p.id},h(p.Titulo),9,Ge))),128))],512),[[z,t.selectedTema]])])]),content:C(()=>[o("div",Pe,[t.selectedTema?(l(),d("div",Ee,[o("div",Le,[o("div",Oe,[D(m,{showNewButton:!1},{title:C(()=>[o("div",Ke,[e[2]||(e[2]=o("button",{class:"btn btn-primary dropdown-toggle",type:"button","data-bs-toggle":"collapse","data-bs-target":"#campusCollapse","aria-expanded":"false","aria-controls":"campusCollapse"}," Campus ",-1)),o("div",Me,[e[1]||(e[1]=o("p",null,[o("strong",null,"Campi Disponíveis:")],-1)),o("div",$e,[(l(!0),d(y,null,A(t.CampusDropdown,(p,b)=>(l(),d("button",{key:b,class:S(["btn","btn-outline-primary",{"active btn-primary":t.selectedCampus.includes(p.Campus)}]),onClick:Ut=>r.toggleCampusSelection(p.Campus)},h(p.Campus),11,ze))),128))])])])]),content:C(()=>[o("div",He,[o("div",je,[e[3]||(e[3]=o("h6",null,"Aprovados",-1)),o("p",null,h(t.graphDataCongregacao[0]),1)]),o("div",Ye,[e[4]||(e[4]=o("h6",null,"Apoios",-1)),o("p",null,h(t.graphDataCongregacao[1]),1)]),o("div",We,[e[5]||(e[5]=o("h6",null,"Total Unidades",-1)),o("p",null,h(r.graphDataFormatted[0][2])+" de "+h(r.graphDataFormatted[0][4]),1)])]),o("div",Xe,[o("div",Je,[o("div",Qe,[o("div",Ze,[t.graphDataCongregacao.length?(l(),w(i,{key:t.graphKeyCongregacao,title:"Distribuição de Apoio nas Unidades",labels:["Aprovaram Texto","Apoiam","Faltam Posicionar","Não Aprovam"],data:[r.graphDataFormatted[0][0],r.graphDataFormatted[0][1],r.graphDataFormatted[0][2],r.graphDataFormatted[0][3]],colors:["#4caf50","#00A8FF","#FFC222","#FF0000"],centerText:t.totalUnidades.toString()},null,8,["data","centerText"])):u("",!0)]),o("div",et,[t.graphDataCongregacao.length?(l(),w(i,{key:t.graphKeyCongregacao,title:"Distribuição de Apoio nas Unidades",labels:["Aprovaram Texto","Apoiam"],data:[t.graphDataCongregacao.slice()[0],t.graphDataCongregacao.slice()[1]],colors:["#4caf50","#00A8FF"]},null,8,["data"])):u("",!0)])]),D(c,{headers:t.tableHeadersUnidades,rows:t.tableRowsUnidades,"description-key":"Comentários"},null,8,["headers","rows"])])])]),_:1})]),o("div",tt,[D(m,{showNewButton:!1},{title:C(()=>[o("div",at,[o("button",st,h(t.selectedUnidade==="Todas"?"Selecione a Unidade":t.selectedUnidade),1),o("ul",ot,[o("li",null,[(l(!0),d(y,null,A(t.uniqueUnidadeSiglas,p=>(l(),d("button",{key:p,class:"dropdown-item",onClick:b=>r.selectUnidade(p)},h(p),9,rt))),128))])])])]),content:C(()=>[t.tableRowsDepartamentos.length?(l(),d("div",nt,[o("div",it,[o("div",lt,[e[6]||(e[6]=o("h6",null,"Aprovados",-1)),o("p",null,h(t.graphDataDepartamentos[0]),1)]),o("div",dt,[e[7]||(e[7]=o("h6",null,"Apoios",-1)),o("p",null,h(t.graphDataDepartamentos[1]),1)]),o("div",ct,[e[8]||(e[8]=o("h6",null,"Total Departamentos",-1)),o("p",null,h(r.graphDataFormatted[1][2]),1)])]),o("div",pt,[o("div",ht,[o("div",ut,[o("div",mt,[t.graphDataDepartamentos.length?(l(),w(i,{centerText:"10",key:t.graphKeyDepartamentos,title:"Distribuição de Apoio nos Departamentos",labels:["Aprovaram Texto","Apoiam","Faltam Posicionar","Não Aprovam "],data:r.graphDataFormatted[1],colors:["#4caf50","#00A8FF","#FFC222","#FF0000"]},null,8,["data"])):u("",!0)]),o("div",gt,[t.graphDataDepartamentos.length?(l(),w(i,{centerText:"10",key:t.graphKeyDepartamentos,title:"Distribuição de Apoio nos Departamentos",labels:["Aprovaram Texto","Apoiam"],data:[t.graphDataDepartamentos.slice()[0],t.graphDataDepartamentos.slice()[1]],colors:["#4caf50","#00A8FF"]},null,8,["data"])):u("",!0)])]),D(c,{headers:t.tableHeadersDepartamentos,rows:t.tableRowsDepartamentos,"description-key":"Comentários"},null,8,["headers","rows"])])])])):(l(),d("p",ft,"Nenhum dado disponível para Departamentos."))]),_:1})])])])):u("",!0)])]),_:1})])}const bt=_(Be,[["render",vt],["__scopeId","data-v-3b4768a0"]]),Ct={name:"DashBoardView",components:{DashBoardComponent:bt}};function Dt(a,e,s,n,t,r){const i=x("DashBoardComponent");return l(),w(i)}const _t=_(Ct,[["render",Dt]]),yt={data(){return{email:"",password:"",errorMessage:""}},methods:{async login(){const a=U();try{await Z(a,this.email,this.password),this.$router.push("/")}catch(e){this.errorMessage="Erro ao fazer login: "+e.message}}}},At={class:"login-page"},wt={key:0};function xt(a,e,s,n,t,r){return l(),d("div",At,[e[6]||(e[6]=o("h1",null,"Login",-1)),o("form",{onSubmit:e[2]||(e[2]=H((...i)=>r.login&&r.login(...i),["prevent"]))},[o("div",null,[e[3]||(e[3]=o("label",{for:"email"},"E-mail",-1)),T(o("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=i=>t.email=i),required:""},null,512),[[N,t.email]])]),o("div",null,[e[4]||(e[4]=o("label",{for:"password"},"Senha",-1)),T(o("input",{type:"password",id:"password","onUpdate:modelValue":e[1]||(e[1]=i=>t.password=i),required:""},null,512),[[N,t.password]])]),e[5]||(e[5]=o("button",{type:"submit"},"Entrar",-1))],32),t.errorMessage?(l(),d("p",wt,h(t.errorMessage),1)):u("",!0)])}const Tt=_(yt,[["render",xt]]),P=j({history:Y(),routes:[{path:"/login",name:"Login",component:Tt},{path:"/",name:"Dash",component:_t,meta:{requiresAuth:!0}}]});P.beforeEach((a,e,s)=>{const n=U();a.matched.some(r=>r.meta.requiresAuth)?V(n,r=>{r?s():s("/login")}):s()});const E=W(ne);E.use(P);E.mount("#app");
