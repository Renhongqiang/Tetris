// 10 * 20

var table = document.getElementById("board"); //整个table表格
//初始化 10 * 20 二维数组 0代表无方块 1代表在移动的  2代表底部固定的
var board = new Array(20);   
        for(var i=0;i<20;i++){   
            board[i] = new Array(10);    
        }   
        for(var i=0;i<20;i++){    
            for(var j=0; j<10; j++){    
                board[i][j] = 0;    
            }    
        }
var downSpeed = 1000;  //向下加速
//移动许可
var left,right,bottom;
left = right = bottom = false;
//7种方块
var ii = new Array(4);         
var ll = new Array(4);         
var lr = new Array(4);         
var o = new Array(4);         
var zl = new Array(4);         
var zr = new Array(4);         
var t = new Array(4);
var tempShape = new Array(4);  //记住当前方块

tempShape[0] = {x:0, y:0};    
tempShape[1] = {x:0, y:0};    
tempShape[2] = {x:0, y:0};    
tempShape[3] = {x:0, y:0};

ii[0] = {x:0, y:2};    
ii[1] = {x:0, y:0};    
ii[2] = {x:0, y:1};    
ii[3] = {x:0, y:3};

ll[0] = {x:1, y:1};    
ll[1] = {x:2, y:0};    
ll[2] = {x:0, y:1};    
ll[3] = {x:2, y:1};

lr[0] = {x:1, y:1};    
lr[1] = {x:2, y:2};    
lr[2] = {x:0, y:1};    
lr[3] = {x:2, y:1};

o[0] = {x:0, y:0};    
o[1] = {x:0, y:1};    
o[2] = {x:1, y:0};    
o[3] = {x:1, y:1};

zl[0] = {x:1, y:1};    
zl[1] = {x:0, y:0};    
zl[2] = {x:0, y:1};    
zl[3] = {x:1, y:2};

zr[0] = {x:1, y:1};    
zr[1] = {x:0, y:1};    
zr[2] = {x:0, y:2};    
zr[3] = {x:1, y:0};

t[0] = {x:1, y:1};    
t[1] = {x:0, y:1};    
t[2] = {x:1, y:0};    
t[3] = {x:1, y:2};

//初始化产生第一个方块
window.onload = function(){
    undateTable(tempShape = creatShape());
}

//循环刷新执行函数
setInterval(function(){
    print();
    check();
    },10);

//循环向下函数
setInterval(function(){
    downTable();
    },downSpeed);

//边界检测
function check(){
    //1、左边界
    var lf = true;
    //检测第一列左边界
    for(var i = 0; i < 20 ;i++){
        if(board[i][0] == 1)
            lf = false;
    }
    //检测是否触碰左侧已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i][j - 1] == 2){
                lf = false;
            }
        }    
    }
    if(lf)
        left = true;
    else
        left = false;
    //2、右边界
    var rf = true;
    //检测第十列右侧边界
    for(var i = 0; i < 20 ;i++){
        if(board[i][9] == 1)
            rf = false;
    }
    // 检测是否触碰右侧已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i][j + 1] == 2){
                rf = false;
            }
        }    
    }
    if(rf)
        right = true;
    else
        right = false;
    //3、下边界
    var bf = true;
    //底20行边界
    for(var i = 0; i < 10 ;i++){
        if(board[19][i] == 1){
            bf = false;
            //1 ——> 2 触底后当前方块置2，表示不可移动
            oneToTwo();
            undateTable(tempShape = creatShape()); //触底后产生新方块
        }   
    }
    //本方块底部是否触碰到已存在块
    for(var i = 0; i < 20 ;i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1 && board[i + 1][j] == 2){
                bf = false;
                //1 ——> 2 触底后当前方块置2，表示不可移动
                oneToTwo();
                undateTable(tempShape = creatShape()); //触底后产生新方块
            }
        }    
    }
    if(bf)
        bottom = true;
    else
        bottom = false;
}

//1置2 可移动方块变为不可以动方块
function oneToTwo(){
    for(var i = 19; i >= 0; i--){
        for(var j = 19; j >= 0; j--){
            if(board[i][j] == 1){
                    board[i][j] = 2;
            } 
        }
    }
}

//检测键盘
document.onkeydown = function(ev){
    var oEvent = ev || event;
    var keyCode = oEvent.keyCode;
    switch(keyCode){
        case 37:{
            if(left){
                moveShape("l");
            }break;
        }
        case 38:{
            topShape(tempShape);
            break;
        }
        case 39:{
            if(right){
                moveShape("r");
            }break;
        }
        case 40:{
            if(bottom){
                moveShape("b");
            } break;
        }
    }
}
//向下
function downTable(){
    //右、下移 倒序遍历
    for(var i = 19; i >= 0; i--){
        for(var j = 19; j >= 0; j--){
            if(board[i][j] == 1){
                    board[i + 1][j] = 11;
                    board[i][j] = 0;
            } 
        }
    }
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 11){
                board[i][j] = 1;
            }
            
        }
    }
}

//top变形
function topShape(ts){
    if(ts === ii)
        alert("top change");
}

//左右下移动方块
function moveShape(target){
    //左移 正序遍历
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1){
                if(target == "l") {
                    board[i][j - 1] = 11;
                    board[i][j] = 0;
                }
            } 
        }
    }
    //右、下移 倒序遍历
    for(var i = 19; i >= 0; i--){
        for(var j = 19; j >= 0; j--){
            if(board[i][j] == 1){
                if(target == "r") {   
                    board[i][j + 1] = 11;
                    board[i][j] = 0;
                }
                if(target == "b") {
                    board[i + 1][j] = 11;
                    board[i][j] = 0;
                }
            } 
        }
    }
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 11){
                board[i][j] = 1;
            }
            
        }
    }
}

//绘制界面
function print(){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            if(board[i][j] == 1){
                table.rows[i].cells[j].style.backgroundColor = "red"; 
            }
            if(board[i][j] == 0){
                table.rows[i].cells[j].style.backgroundColor = "#FFF"; 
            }
                
        }
    }
}

//根据生成方块种类更新出生方块
function undateTable(cShape){
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 10; j++){
            for(var k = 0;k < 4; k++){
                if(cShape[k].x == i && cShape[k].y + 3 == j){
                    board[i][j] = 1;
                }
            }
        }
    }
}

//随机生成方块 返回种类
function creatShape(){
    var num = (Math.floor(Math.random()*20)+1)%7;    
            switch(num){  
                case 0:{    
                    return ii;      
                }    
                case 1:{    
                    return ll;       
                }    
                case 2:{    
                    return lr;      
                }    
                case 3:{    
                    return o;      
                }    
                case 4:{    
                    return zl;      
                }    
                case 5:{    
                    return zr;      
                }    
                case 6:{    
                    return t;     
                }   
            }  
}