function onLoad(){
    //객체찾기
    const btnopen = document.querySelector("#open");
    const btnclose = document.querySelector("#close");
    const idobj = document.querySelector("#userid");
    const pwdobj = document.querySelector("#pwd");
    //팝업윈도우 핸들변수
    let win = null;
  
    
    //이벤트 리스너 등록및 핸들러 처리
    btnopen.addEventListener("click",()=>{
      
        win = window.open("./ex8_2_formName.html","_blank","width=400, height=400, left=30, top=30");
        setTimeout(()=>{
            win.document.querySelector("#userid").value = idobj.value;
            win.document.querySelector("#pwd").value = idobj.value;
         }, 100);
        
        
    });
    btnclose.addEventListener("click",()=>{
        win.close();
    });
}