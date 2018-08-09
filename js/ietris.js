//当页面加载完后
window.onload = function(){

    //获取Div元素
    var oDiv = document.getElementById("moveBox");

    //创建各个方向条件判断初始变量
    var left = false;
    var right = false;
    var top = false;
    var bottom = false;

    //当按下对应方向键时，对应变量为true
    document.onkeydown = function(ev){
        var oEvent = ev || event;
        var keyCode = oEvent.keyCode;
        switch(keyCode){
            case 37:
                left=true;
                break;
            case 38:
                top=true;
                break;
            case 39:
                right=true;
                break;
            case 40:
                bottom=true;
                break;
        }
        //当其中一个条件为true时，则执行当前函数（移动对应方向）
        if(left){
            oDiv.style.left = oDiv.offsetLeft-50+"px";
        }else if(top){
            oDiv.style.top = oDiv.offsetTop-50+"px";
        }else if(right){
            oDiv.style.left = oDiv.offsetLeft+50+"px";
        }else if(bottom){
            oDiv.style.top = oDiv.offsetTop+50+"px";
        }
    };

    // //设置一个定时，时间为50左右，不要太高也不要太低
    // setInterval(function(){

    //     //当其中一个条件为true时，则执行当前函数（移动对应方向）
    //     if(left){
    //         oDiv.style.left = oDiv.offsetLeft-50+"px";
    //     }else if(top){
    //         oDiv.style.top = oDiv.offsetTop-50+"px";
    //     }else if(right){
    //         oDiv.style.left = oDiv.offsetLeft+50+"px";
    //     }else if(bottom){
    //         oDiv.style.top = oDiv.offsetTop+50+"px";
    //     }
    // },50);

    //执行完后，所有对应变量恢复为false，保持静止不动
    document.onkeyup = function(ev){
        var oEvent = ev || event;
        var keyCode = oEvent.keyCode;

        switch(keyCode){
            case 37:
                left=false;
                break;
            case 38:
                top=false;
                break;
            case 39:
                right=false;
                break;
            case 40:
                bottom=false;
                break;
        }
    }
}
setInterval(function(){
    var x = Math.floor(Math.random()*10)%7;
        //当其中一个条件为true时，则执行当前函数（移动对应方向）
    var descDiv = document.createElement('div');
    document.body.appendChild(descDiv);
    //获取输入框dom元素
    var text = document.getElementById('moveBox');
    //计算div的确切位置
    var seatX = 480 + x * 50;//横坐标
    var seatY = 0;//纵坐标
    //给div设置样式，比如大小、位置
    var cssStr = "z-index:5;width:50px;height:50px;background-color:#FFFF99;border:1px solid black;position:absolute;left:" 
    + seatX + 'px;top:' + seatY + 'px;';
    //将样式添加到div上，显示div
    descDiv.style.cssText = cssStr;
    // descDiv.innerHTML = '这是一个测试的div显示的内容';
    descDiv.id = 'descDiv';
    descDiv.style.display = 'block';
    
    },1000);
// function createDiv(){
//     //首先创建div
   
//     var descDiv = document.createElement('div');
//     document.body.appendChild(descDiv);
//     //获取输入框dom元素
//     var text = document.getElementById('moveBox');
//     //计算div的确切位置
//     var seatX = 478;//横坐标
//     var seatY = 0;//纵坐标
//     //给div设置样式，比如大小、位置
//     var cssStr = "z-index:5;width:50px;height:50px;background-color:#FFFF99;border:1px solid black;position:absolute;left:" 
//     + seatX + 'px;top:' + seatY + 'px;';
//     //将样式添加到div上，显示div
//     descDiv.style.cssText = cssStr;
//     // descDiv.innerHTML = '这是一个测试的div显示的内容';
//     descDiv.id = 'descDiv';
//     descDiv.style.display = 'block';
// }

