let totalResult;
let newsList = []
let page=1
let GroupSize=5;
let pageGroup=0
let lastPage;
let firstpage;
let keyword=''
let GroupLastPage=''
let loading=document.querySelector('.loading-cotainer');

const getList = async () => {
    const response = await fetch('https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=d6f706a93495480b8f4f0efed1c5dd88&Type=json&pIndex=1&pSize=100&');
    let data = await response.json();
    totalResult = data.AbdmAnimalProtect[0].head[0].list_total_count;
    newsList = data.AbdmAnimalProtect[1].row;
    console.log(newsList)
    console.log(totalResult)
    loading.classList.add('start')
    GroupLastPage=Math.ceil(totalResult/10);
}


let buttons = document.querySelectorAll('.head button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        keyword=e.target.textContent
        getListBylocation()
    })
})
const getListBylocation = async () => {
    loading.classList.remove('start')
    const response = await fetch(`https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=d6f706a93495480b8f4f0efed1c5dd88&Type=json&pIndex=1&pSize=10&SIGUN_NM=${keyword}`);
    let data = await response.json();
    totalResult = data.AbdmAnimalProtect[0].head[0].list_total_count;
    newsList = data.AbdmAnimalProtect[1].row;
    console.log(newsList)
    
    GroupLastPage=Math.ceil(totalResult/10);
    console.log('ggg',GroupLastPage)
    render()
    
    loading.classList.add('start')
}
const render = () => {
    let content = document.getElementById('content');
    console.log(newsList)
    newsHTML = newsList.map((news) => {
        return (
            `<div class="row">
                <div class="col-lg-4">
                    <img src=${news.THUMB_IMAGE_COURS} alt="">
                </div>
                <div class="col-lg-8">
                    <p>${news.JURISD_INST_NM}</p>
                    <p>${news.AGE_INFO}</p>
                    <p>보호장소: ${news.PROTECT_PLC} </p>
                    <p>보호소 전화번호: ${news.SHTER_TELNO}</p>
                </div>
        `
        )
    }).join('')
    
    content.innerHTML=newsHTML
    pageNation()
}
const pageNation=()=>{
    let pageNA=document.querySelector('.pagination');
    
    pageGroup =Math.ceil(page/GroupSize);
    lastPage=pageGroup*GroupSize;
    console.log('grouplast',GroupLastPage);
    console.log('lastpage',lastPage)
    if(lastPage>GroupLastPage){
        lastPage=GroupLastPage;
    }
    firstpage=lastPage-(GroupSize-1);
    if(page===1){
        firstpage=1
    }
    let pageHtml=''
    pageHtml+=`<li class="page-item " onclick="minusPage()">
      <a class="page-link">Previous</a>
    </li>`
    for(let i=firstpage; i<=lastPage; i++){
        pageHtml+=`<li class="page-item ${i===page ? 'active': ''}"  onclick=" moveTopage(${i})"><a class="page-link" href="#">${i}</a></li>`
    }
    pageHtml+=` <li class="page-item" onclick="plusPage()"><a class="page-link" >Next</a></li`
    pageNA.innerHTML=pageHtml
    
}


const moveTopage=async(i)=>{
    loading.classList.remove('start')
    page=i;
    console.log(i,page)
    const response = await fetch(`https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=d6f706a93495480b8f4f0efed1c5dd88&Type=json&pIndex=${i}&pSize=10&SIGUN_NM=${keyword}`);
    let data = await response.json();
    totalResult = data.AbdmAnimalProtect[0].head[0].list_total_count;
    newsList = data.AbdmAnimalProtect[1].row;
    console.log(newsList)
    console.log(totalResult)
    loading.classList.add('start')
    render()
    pageNation()
}
const plusPage =async()=>{
    page+=1;
    const response = await fetch(`https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=d6f706a93495480b8f4f0efed1c5dd88&Type=json&pIndex=${page}&pSize=10&SIGUN_NM=${keyword}`);
    let data = await response.json();
    totalResult = data.AbdmAnimalProtect[0].head[0].list_total_count;
    newsList = data.AbdmAnimalProtect[1].row;
    console.log(newsList)
    console.log(totalResult)
    render()
    pageNation()
    console.log(page)
}
const minusPage=async()=>{
    if(page===1){
        return
    }
    page-=1
    const response = await fetch(`https://openapi.gg.go.kr/AbdmAnimalProtect?KEY=d6f706a93495480b8f4f0efed1c5dd88&Type=json&pIndex=${page}&pSize=10&SIGUN_NM=${keyword}`);
    let data = await response.json();
    totalResult = data.AbdmAnimalProtect[0].head[0].list_total_count;
    newsList = data.AbdmAnimalProtect[1].row;
    console.log(newsList)
    console.log(totalResult)
    render()
    pageNation()
}
//새롭게 추가된 코드 333

const start=async()=>{
   await getList()
    
    render()
    
    
}
//사제 했듬
window.onload=function(){
    start()
  }
