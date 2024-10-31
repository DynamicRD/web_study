function carousel(){
    //객체를 가져온다
    const article = document.querySelector(".article");
    const imageset = document.querySelector(".a_slides");
    const imageArray = document.querySelectorAll(".a_slides a");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");
    const indicater = document.querySelectorAll(".a_indicator a");

    //변수
    let count = 0;

    function slideGoOn(){
        count++;
        if(count === imageArray.length)
        {
            count = 0;
        }
        imageArray[(count)%4].style.Zindex=0;
        imageArray[(count + 1)%4].style.Zindex=1; 
    }

    function startTimer(){
        timerID = setInterval(slideGoOn, 3000); 
       }
    startTimer();







}