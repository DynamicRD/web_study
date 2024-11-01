function onLoad(){
    //패턴검색
    const idPattern = /^[\w]{3,}$/; //[\w]는 영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern =/^[\w]{6,10}$/; //영문자와 숫자, _ 6~10  
    const namePattern =/^[가-힣]{2,4}$/; //한글 2~4글자,영문자 2-20 첫글자는대문자 공백가능   
    const nicknamePattern =/^[\w가-힣]{4,}$/;//공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)   
    const emailPattern =/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const telPattern =/^[\d]{2,3}-[\d]{3,4}-[\d]{4}$/; //\d 숫자만가능
    const mobilePattern =/^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/; //\d 숫자만가능
    const datePattern =/^[\d]{4}-[\d]{2}-[\d]{2}$/; //\d 숫자만가능
    //객체찾기
    const inputID = document.querySelector("#input-id"); 
    const inputPW1 = document.querySelector("#input-pw1"); 
    const inputPW2 = document.querySelector("#input-pw2"); 
    const inputName = document.querySelector("#input-name"); 
    const inputNickname= document.querySelector("#input-nickname"); 
    const inputEmail= document.querySelector("#input-email"); 
    const inputTel= document.querySelector("#input-tel"); 
    const inputMobile= document.querySelector("#input-mobile");
    const inputDate= document.querySelector('#input-date');
    //주소객체찾기
    const zipcode= document.querySelector("#zipcode");
    const addr1= document.querySelector("#addr1");
    const addr2= document.querySelector("#addr2");
    const btnSearchAddr= document.querySelector("#btn-searchAddr");
    //폼객체찾기
    const myform= document.querySelector(".myform");

    //이벤트리스너등록및 핸들러처리
    inputID.addEventListener("blur",()=>validate(inputID, idPattern, "형식 불일치" ));
    inputPW1.addEventListener("blur",()=>validate(inputPW1,pwdPattern, "형식 불일치" ));
    inputPW2.addEventListener("blur",()=>{
        validate(inputPW2,pwdPattern, "형식 불일치" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드 불일치";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName,namePattern, "형식 불일치" ));
    inputNickname.addEventListener("blur",()=>validate(inputNickname,nicknamePattern, "형식 불일치" ));
    inputEmail.addEventListener("blur",()=>validate(inputEmail,emailPattern, "형식 불일치" ));
    inputTel.addEventListener("blur",()=>validate(inputTel,telPattern, "형식 불일치" ));
    inputMobile.addEventListener("blur",()=>validate(inputMobile,mobilePattern, "형식 불일치" ));
    inputDate.addEventListener("blur",()=>validate(inputDate,datePattern, "날짜를 선택해주세요" ));
    btnSearchAddr.addEventListener("click",()=>{
        new daum.Postcode({
            oncomplete: function(data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
              zipcode.value = data.zonecode;
              addr1.value = data.roadAddress;
            }
          }).open();
    });
    //폼 이벤트등록및 핸들러처리
    myform.addEventListener("submit",(e)=>{
        e.preventDefault();  //서버에 전송하는 기본기능막는다.
        validate(inputID, idPattern, "형식 불일치" );
        validate(inputPW1,pwdPattern, "형식 불일치" );
        validate(inputPW2,pwdPattern, "형식 불일치" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드 불일치";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
        validate(inputName,namePattern, "형식 불일치" );
        validate(inputNickname,nicknamePattern, "형식 불일치" );
        validate(inputEmail,emailPattern, "형식 불일치" );
        validate(inputTel,telPattern, "형식 불일치" );
        validate(inputMobile,mobilePattern, "형식 불일치" );
        validate(inputDate,datePattern,"날짜를 선택해주세요");
        if(zipcode.value === "" ||  addr1.value  === ""){
            zipcode.nextSibling.textContent ="주소선택해주세요";
            zipcode.focus();
            return;  
        }
        alert("서버로 전송하겠습니다.");
        myform.submit();  
    });
    //핸들러처리기능    
    function validate(userInput, pattern, message ){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "성공";
            userInput.nextSibling.style.color ="blue";
           }else{
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color ="red";
            userInput.value = "";
            userInput.focus();
            return; 
           }
    }



     //화면객체 가져온다.
     let slideshow = document.querySelector(".slideshow");
     let slideshow_slides = document.querySelector(".slideshow_slides");
     let slidesArray = document.querySelectorAll(".slideshow_slides a");
     let prev = document.querySelector(".prev");
     let next = document.querySelector(".next");
     let indicatorArray = document.querySelectorAll(".shlideshow_indicator a");
  
     //현재이미지 인덱스, 인터벌아이디, 슬라이드갯수
     let currentIndex = 0; 
     let timerID = null; 
     let slideCount = slidesArray.length;
     
     //현재이미지를 한줄로 정렬한다.
     for(let i=0; i<slideCount; i++){
      let newLeft = `${i*100}%`;
      slidesArray[i].style.left = newLeft; 
     }
  
     //화면전환해주는 함수
     function gotoslide(index){
      currentIndex = index;
      let newLeft = `${index* -100}%`;
      slideshow_slides.style.left = newLeft;
      
      //indicater 그 위치를 가르켜줘야 한다. 
      for(let i=0;i<slideCount;i++){
          indicatorArray[i].classList.remove('active');
      }
      indicatorArray[index].classList.add('active');
     } //end of gotoslide
  
     gotoslide(1);
  
     //3초마다 gotoslide() 불러주자. 
     //불러주되, index 0,1,2,3,0,1,..
     function startTimer(){
      timerID = setInterval(()=>{
          let index = (currentIndex + 1) % slideCount;
          currentIndex = index; 
          gotoslide(index);  
      }, 3000); 
     }
     startTimer(); 
  
     //이벤트등록 핸들러기능
     slideshow_slides.addEventListener("mouseenter", (event)=>{
      clearInterval(timerID);
     });
     
     slideshow_slides.addEventListener("mouseleave", (event)=>{
      startTimer();
     });
     
     prev.addEventListener("mouseenter", (event)=>{
      clearInterval(timerID);
     });
     prev.addEventListener("mouseleave", (event)=>{
      startTimer();
     });
  
     next.addEventListener("mouseenter", (event)=>{
      clearInterval(timerID);
     });
     next.addEventListener("mouseleave", (event)=>{
      startTimer();
     });
  
     prev.addEventListener("click", (event)=>{
          event.preventDefault();  //anchor tag 가지고 있는 페이지이동 기본기능을 막아라
          currentIndex = currentIndex - 1; 
          if(currentIndex < 0){
              currentIndex = slideCount -1; 
          }
          gotoslide(currentIndex);
     });
     
     next.addEventListener("click", (event)=>{
          event.preventDefault();  //anchor tag 가지고 있는 페이지이동 기본기능을 막아라
          currentIndex = currentIndex + 1; 
          if(currentIndex > (slideCount -1)){
              currentIndex = 0; 
          }
          gotoslide(currentIndex);
     });
  
     //indicator 클릭하면 해당된 페이지로 이동한다.
  //    for(let i=0;i<slideCount;i++){
  //     indicatorArray[i].addEventListener("mouseenter",(event)=>{
  //         clearInterval(timerID);
  //     });
  //    }    
  
     indicatorArray.forEach((obj)=>{
      obj.addEventListener("mouseenter",(event)=>{
          clearInterval(timerID);
      });
     });
  
  
  //    for(let i=0;i<slideCount;i++){
  //     indicatorArray[i].addEventListener("mouseleave",(event)=>{
  //         startTimer(); 
  //     });
  //    } 
     
     indicatorArray.forEach((obj)=>{
      obj.addEventListener("mouseleave",(event)=>{
          startTimer();
      });
     });
  
  //    for(let i=0;i<slideCount;i++){
  //     indicatorArray[i].addEventListener("click",(event)=>{
  //         event.preventDefault();
  //         gotoslide(i);
  //     });
  //    }   
     
     indicatorArray.forEach((obj,index)=>{
      obj.addEventListener("click",(event)=>{
          event.preventDefault();
          gotoslide(index);
      });
     });
  
  
     
}
