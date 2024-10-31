function onLoad(){
    //패턴검색내용
    const idPattern =  /^[\w]{3,}$/; //[\w]는 영문자,숫자,_만 입력가능 {3,}은 3글자 이상 가능
    const pwdPattern = /^[\w]{6,10}$/;  //영문숫자 6~10;
    const namePattern = /^[가-힣]{2,4}|[A-Z]{1}|[a-zA-Z\x20]{1,19}$/;   //한글 2~4글자,영문자 2-10 첫글자는 대문자 공백가능
    const nicknamePattern = /^[\w가-힣]{4,}$/;   //공백없이 한글,영문,숫자만 입력 가능(4글자 이상)
    const emailPattern = /^[a-z0-9_+.-]+@([a-z0-9-]+.)+[a-z0-9]{2,4}$/;
    const telPattern = /^\d{2,3}-\d{3,4}-\d{4}$/;   //숫자만 가능
    const mobilePattern = /^010-(?:\d{3}|\d{4})-\d{4}$/;   //숫자만 가능
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;   //숫자만 가능

    //폼객체찾기
    const myform = document.querySelector(".myform");

    //주소객체찾기
    const zipcode = document.querySelector("#zipcode");
    const addr1 = document.querySelector("#addr1");
    const addr2 = document.querySelector("#ddr2");
    const btnSerchAddr = document.querySelector("#btn-searchAddr");
  

    //객체찾기
    const inputID=document.querySelector("#input-id");
    const inputPW1=document.querySelector("#input-pw1");
    const inputPW2=document.querySelector("#input-pw2");
    const inputName=document.querySelector("#input-name");
    const inputNickname=document.querySelector("#input-nickname");
    const inputEmail=document.querySelector("#input-email");
    const inputTel=document.querySelector("#input-tel");
    const inputMoblie=document.querySelector("#input-mobile");
    const inputDate=document.querySelector('[type="date"]');



    //이벤트 리스너 등록 및 핸들러 처리
    inputID.addEventListener("blur",()=>validate(inputID,idPattern,"영문자, 숫자, _만 입력 가능" ));
    inputPW1.addEventListener("blur",()=>validate(inputPW1,pwdPattern,"영문자, 숫자, _만 입력 가능" ));
    inputPW2.addEventListener("blur",()=>{validate(inputPW2,pwdPattern,"영문자, 숫자, _만 입력 가능" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color = "red";
            inputPW1.value = "";
            inputPW2.value = "";
            inputPW1.focus();
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName,namePattern,"한글 2~4글자,영문자 2-10 첫글자는 대문자 공백가능" ));
    inputNickname.addEventListener("blur",()=>validate(inputNickname,nicknamePattern,"한글 2~4글자,영문자 2-10 첫글자는 대문자 공백가능" ));
    inputEmail.addEventListener("blur",()=>validate(inputEmail,emailPattern,"이메일 양식에 맞지 않음" ));
    inputTel.addEventListener("blur",()=>validate(inputTel,telPattern,"전화번호형식이 아니다" ));
    inputMoblie.addEventListener("blur",()=>validate(inputMoblie,mobilePattern,"휴대전화형식이 아니다" ));
    inputDate.addEventListener("blur",()=>validate(inputDate,datePattern,"날짜를 선택해주세요" ));
 
    btnSerchAddr.addEventListener("click",()=>{
        new daum.Postcode({
            oncomplete: function(data) {
              zipcode.value = data.zonecode;
              addr1.value = data.roadAddress;
            }
          }).open();
    });
        //폼 이벤트 등록 및 핸들러 처리
        myform.addEventListener("submit",(e)=>{
            e.preventDefault();//서버에 전송하는 기본기능을 막는다.
            validate(inputID,idPattern,"영문자, 숫자, _만 입력 가능" );
            validate(inputPW1,pwdPattern,"영문자, 숫자, _만 입력 가능" );
            validate(inputPW2,pwdPattern,"영문자, 숫자, _만 입력 가능" );
            if(inputPW1.value !== inputPW2.value){
                inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
                inputPW2.nextSibling.style.color = "red";
                inputPW1.value = "";
                inputPW2.value = "";
                inputPW1.focus();
            }
            validate(inputName,namePattern,"한글 2~4글자,영문자 2-10 첫글자는 대문자 공백가능" );
            validate(inputNickname,nicknamePattern,"한글 2~4글자,영문자 2-10 첫글자는 대문자 공백가능" );
            validate(inputEmail,emailPattern,"이메일 양식에 맞지 않음" );
            validate(inputTel,telPattern,"전화번호형식이 아니다" );
            validate(inputMoblie,mobilePattern,"휴대전화형식이 아니다" );
            validate(inputDate,datePattern,"날짜를 선택해주세여" );
            if(zipcode.value ==="" || addr1.value ===""){
                zipcode.nextSibling.textContent ="주소선택해주세요";
                zipcode.focus();
                return;
            }
            alert();
        });
    


        //핸들러
    function validate(userInput,pattern,message){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "성공";
            userInput.nextSibling.style.color = "blue";
        }else{
            userInput.nextSibling.innerHTML = message;
            userInput.value = "";
            userInput.nextSibling.style.color = "red";
            userInput.focus();
            return;
        }
    }
}