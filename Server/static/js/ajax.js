/**
 * 封装ajax
 * 传入参数为一个对象
 * obj = {
 *  url：xxxx，
 *  menthed : get/post
 *  data: {
 *      xxx
 *      xxx
 *  },
 *  successful : function
 *  err: function
 * }
 */
function objToString(obj){
    const keys = Object.keys(obj);
    let str = "?"
    keys.forEach(ele => {
        str += ele + "=" + String(obj[ele]) + "&";
    })
    return str.slice(0, -1);
}
function ajax({url, methed, data, successful: sucss, err}={}){
    xml = new XMLHttpRequest();
    url = url + objToString(data);
    xml.open(methed, url);
    console.log(url,objToString(data) );
    xml.send();
    xml.onreadystatechange = ()=>{
        if(xml.status === 200 && xml.readyState === 4){
            sucss(JSON.parse(xml.responseText).url);
        }
    }
}