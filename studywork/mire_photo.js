function onLoad(){
    //패턴검색
    const idPattern = /^[\w]{3,}$/; 
    const pwdPattern =/^[\w]{6,10}$/; 
    const namePattern =/^[가-힣]{2,4}$/; 
    const nicknamePattern =/^[\w가-힣]{4,}$/;   
    const emailPattern =/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const telPattern =/^[\d]{2,3}-[\d]{3,4}-[\d]{4}$/; 
    const mobilePattern =/^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/; 
    const datePattern =/^[\d]{4}-[\d]{2}-[\d]{2}$/; 
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
 

    myform.addEventListener("submit",(e)=>{
        e.preventDefault(); 
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
   
        alert("서버로 전송.");
        myform.submit();  
    });
     
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



  
     let slideshow = document.querySelector(".slideshow");
     let slideshow_slides = document.querySelector(".slideshow_slides");
     let slidesArray = document.querySelectorAll(".slideshow_slides a");
     let prev = document.querySelector(".prev");
     let next = document.querySelector(".next");
     let indicatorArray = document.querySelectorAll(".shlideshow_indicator a");
  

     let currentIndex = 0; 
     let timerID = null; 
     let slideCount = slidesArray.length;
     
   
     for(let i=0; i<slideCount; i++){
      let newLeft = `${i*100}%`;
      slidesArray[i].style.left = newLeft; 
     }
  
   
     function gotoslide(index){
      currentIndex = index;
      let newLeft = `${index* -100}%`;
      slideshow_slides.style.left = newLeft;
      
      
      for(let i=0;i<slideCount;i++){
          indicatorArray[i].classList.remove('active');
      }
      indicatorArray[index].classList.add('active');
     } 
     gotoslide(1);
  

     function startTimer(){
      timerID = setInterval(()=>{
          let index = (currentIndex + 1) % slideCount;
          currentIndex = index; 
          gotoslide(index);  
      }, 3000); 
     }
     startTimer(); 
  
     
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
          event.preventDefault();  
          currentIndex = currentIndex - 1; 
          if(currentIndex < 0){
              currentIndex = slideCount -1; 
          }
          gotoslide(currentIndex);
     });
     
     next.addEventListener("click", (event)=>{
          event.preventDefault();  
          currentIndex = currentIndex + 1; 
          if(currentIndex > (slideCount -1)){
              currentIndex = 0; 
          }
          gotoslide(currentIndex);
     });

  
     indicatorArray.forEach((obj)=>{
      obj.addEventListener("mouseenter",(event)=>{
          clearInterval(timerID);
      });
     });
  

     
     indicatorArray.forEach((obj)=>{
      obj.addEventListener("mouseleave",(event)=>{
          startTimer();
      });
     });

     indicatorArray.forEach((obj,index)=>{
      obj.addEventListener("click",(event)=>{
          event.preventDefault();
          gotoslide(index);
      });
     });
  
  
     
}
