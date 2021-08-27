(()=>{
    const wrapper = document.getElementsByClassName("wrapper")[0];
    function init(){
        event();
    }
    function event(){
        function showImg(imgArray){
            imgArray.forEach(ele => {
                const div = document.createElement("div");
                div.className = "box";
                const img = new Image();
                img.src = ele;
                console.log("ele=",ele, "div=", div, "img=", img);
                div.appendChild(img);
                wrapper.appendChild(div);
            })
        }
        ajax({
            url : "http://127.0.0.1:8086/static/image",
            methed : "GET",
            data : {
                page: 1,
                count: 20
            },
            successful: showImg,
        })
    }
    init();
})()