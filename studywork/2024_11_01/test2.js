function onLoad(){
    //패턴 검색
    const pwdpattern = /^[\w]{8,32}$/;
 
    //객체가져오기
    const id = document.querySelector("#id")
    const pwd1 = document.querySelector("#pwd1");
    const pwd2 = document.querySelector("#pwd2");
    const btn = document.querySelector("button");
    const myform = document.querySelector("#myform");

    //핸들러 처리
    pwd1.addEventListener("blur",vaildate(pwd1,pwdpattern,"영문자 대/소문자 특수문자, 숫자 포함 8 ~ 32자"));
    //버튼 이벤트 활성화
    btn.addEventListener("click",(e)=>{
        e.preventDefault();
        noInput(id);
        noInput(pwd1);
        noInput(pwd2);
        btn.nextSibling.inputHTML = "제출성공했습니다."
        myform.submit();
    });
    

    //패턴검색 함수
    function vaildate(object,pattern,message){
        if(object.value.match(pattern))
        {
            object.nextSibling.inputHTML = "성공";
        }else{
            object.nextSibling.inputHTML = message;
            object.value = "";
            object.focus();
            return;
        }
    }

    //입력여부 확인함수
    function noInput(object){
        if(object.value === "")
        {
            object.nextSibling.inputHTML = "필수 입력 항목 입니다";
            object.focus();
            return;
        }
    }
    
}