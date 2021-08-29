(()=>{
    class AddPic{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }
    const wrapper = document.getElementsByClassName("wrapper")[0];
    const fourArray = new Array(new AddPic(0, 0), new AddPic(450, 0), new AddPic(900, 0), new AddPic(1350, 0));//用于存放每一列图片的高度
    //选取其中最小的一个添加图片，并刷新数组
    const promiseArray = [];
    let maxHeight = 0;
    let count = 1;//记录请求图片次数
    function init(){
        event();
    }
    function event(){
        function findMin(objArray, prot){//传入一个对象数组，以对象的某一个属性为基准，寻找最小值
            return objArray.reduce((a, b)=>{
                return a[prot] <= b[prot] ? a : b;
            });
        }
        function findMax(objArray, prot){//传入一个对象数组，以对象的某一个属性为基准，寻找最大值
            return objArray.reduce((a, b)=>{
                return a[prot] >= b[prot] ? a : b;
            });
        }
        function showImg(imgArray){
            imgArray.forEach(ele => {
                const div = document.createElement("div");
                div.className = "box";
                const img = new Image();
                img.src = ele;
                div.appendChild(img);
                wrapper.appendChild(div);
                promiseArray.push(new Promise((resolve, regect)=>{
                    img.onload = ()=>{
                        resolve();
                    }
                }).then(data=>{
                    const loc = findMin(fourArray, "y");
                        console.log(loc);
                        div.style.position = "absolute";
                        if(loc.y != 0){
                            loc.y += 20;
                            div.style.top = loc.y + "px";
                        }else{
                            div.style.top = loc.y + "px";
                        }
                        div.style.left = loc.x + "px";
                        loc.y += div.offsetHeight;
                        console.log(fourArray);
                }));
            })
            Promise.all(promiseArray).then(data=>{
                const loc = findMax(fourArray, "y");
                wrapper.style.height = loc.y + "px";
                maxHeight = loc.y;
            })
        }
        ajax({
            url : "http://127.0.0.1:8086/static/image",
            methed : "GET",
            data : {
                page: count ++,
                count: 20
            },
            successful: showImg,
        })
        document.onscroll = function(e){
            if(document.documentElement.scrollTop + window.innerHeight >= maxHeight){
                ajax({
                    url : "http://127.0.0.1:8086/static/image",
                    methed : "GET",
                    data : {
                        page: count++,
                        count: 20
                    },
                    successful: showImg,
                })
            }
        }
    }
    init();
})()