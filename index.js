//创建表格
var mask = document.getElementById("mask")
document.getElementById("restart").addEventListener("click",function () {
    location.reload()
})
createTable(8,8)
function createTable(X,Y) {
    var table = document.getElementById("table")
    var tableNode = document.createElement("table")
    tableNode.style="background:#ccc;border-spacing:0px;display:inline-table;margin-top:20px"
    var tdNode_style="border: 3px solid #808080;border-left-color:#eee;border-top-color:#eee;width:20px;height:20px"
    for(let x=0;x<X;x++){
        var trNode = tableNode.insertRow()
        for(let y=0;y<Y;y++){
            var tdNode = trNode.insertCell()
            tdNode.classList.add("hover")
            tdNode.style=tdNode_style
        }
    }
    table.appendChild(tableNode)
    mask.style.height = tableNode.offsetHeight + "px"
    mask.style.top = tableNode.getBoundingClientRect().top + "px"
    mask.style.display = "none"
}
game(8,8,10)
function game(X,Y,N) {
    var randomX
    var randomY
    var table
    var tr
    var td
    var clicked = false
    function firstClick(it) {
        for(let i=0;i<N;i++){
            select_td()
            function select_td(){
                randomX = Math.floor(Math.random()*X)
                randomY = Math.floor(Math.random()*Y)
                table = document.getElementsByTagName("tr")
                tr = table[randomY].childNodes
                td = tr[randomX]
            }
            test_td()
            function test_td() {
                if(td.classList.contains("lei")||td===it){
                    select_td()
                    test_td()
                }else{
                    td.classList.add("lei")
                }
            }
        }
        for(let i=0;i<Y;i++){
            tr = table[i].childNodes
            for (let j=0;j<X;j++){
                var num = 0
                td = tr[j]
                if (td.classList.contains("lei")==false){
                    if(i-1>=0&&j-1>=0){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左上
                    if(i-1>=0){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[j]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断上
                    if(i-1>=0&&j+1<X){
                        let trFind = table[(i-1)].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右上
                    if(j-1>=0){
                        let trFind = table[i].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左
                    if(j+1<X){
                        let trFind = table[i].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右
                    if(i+1<Y&&j-1>=0){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[(j-1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断左下
                    if(i+1<Y){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[j]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断下
                    if(i+1<Y&&j+1<X){
                        let trFind = table[(i+1)].childNodes
                        let tdFind = trFind[(j+1)]
                        if(tdFind.classList.contains("lei")){
                            num++
                        }
                    }//判断右下
                    td.classList.add("num"+num)
                }
            }
        }
    }
    var tdAggregate = document.getElementsByTagName("td")
    for(let i=0;i<tdAggregate.length;i++){
        function click() {
            if(clicked==false){
                firstClick(this)
                clicked=true
                this.click()
            }
            if(clicked==true){
                if (this.classList.contains("lei")==false){
                    this.classList.add("clicked")
                    this.classList.remove("hover")
                    this.style.cssText="background: #bbb;border:1px solid #808080 !important;width:24px;height:24px"
                    if(this.classList.contains("num1")){this.innerText="1"}
                    if(this.classList.contains("num2")){this.innerText="2"}
                    if(this.classList.contains("num3")){this.innerText="3"}
                    if(this.classList.contains("num4")){this.innerText="4"}
                    if(this.classList.contains("num5")){this.innerText="5"}
                    if(this.classList.contains("num6")){this.innerText="6"}
                    if(this.classList.contains("num7")){this.innerText="7"}
                    if(this.classList.contains("num8")){this.innerText="8"}
                    if(this.classList.contains("num0")){
                        let a = Math.floor(i/Y)
                        let b = i-(a*Y)
                        class0Click(a,b)
                        function class0Click(a,b) {
                            if(a-1>=0&&b-1>=0){
                                let findTd = table[a-1].childNodes[b-1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }
                            if(a-1>=0){
                                let findTd = table[a-1].childNodes[b]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断上
                            if(a-1>=0&&b+1<X){
                                let findTd = table[a-1].childNodes[b+1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断右上
                            if(b-1>=0){
                                let findTd = table[a].childNodes[b-1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断左
                            if(b+1<X){
                                let findTd = table[a].childNodes[b+1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断右
                            if(a+1<Y&&b-1>=0){
                                let findTd = table[a+1].childNodes[b-1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断左下
                            if(a+1<Y){
                                let findTd = table[a+1].childNodes[b]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断下
                            if(a+1<Y&&b+1<X){
                                let findTd = table[a+1].childNodes[b+1]
                                if(findTd.classList.contains("hover")==true){
                                    judgeClass(findTd)
                                }
                            }//判断右下
                            function judgeClass(findTd) {
                                for(let i=0;i<=8;i++){
                                    setClass(i)
                                }
                                function setClass(i) {
                                    if(findTd.classList.contains("num"+i)){
                                        console.log(findTd)
                                        findTd.innerText=i
                                        findTd.classList.remove("hover")
                                        findTd.style.cssText="background: #bbb;border:1px solid #808080 !important;width:24px;height:24px"
                                    }
                                    if(findTd.classList.contains("num0")){
                                        findTd.innerText=""
                                        findTd.click()
                                    }
                                }
                            }
                        }
                    }
                } else {
                    this.style.cssText+="background:red !important"
                    var lei = document.getElementsByClassName("lei")
                    for (let i=0;i<lei.length;i++){
                        var imgLei = document.createElement("img")
                        imgLei.src = "雷.png"
                        lei[i].innerHTML = ""
                        lei[i].appendChild(imgLei)
                        lei[i].style.cssText+="background:rgb(187,187,187);border:1px solid #808080 !important;width:24px;height:24px"
                    }
                    mask.style.display = "block"
                    alert("游戏结束")
                }
                let success = true
                for(let i =0;i<=8;i++){
                    Success(i)
                    if(success == false){
                        break
                    }
                }
                function Success(i){
                    let successNum = document.getElementsByClassName("num"+i)
                    for(let it of successNum){
                        if(it.classList.contains("hover")==true){
                            success = false
                            break
                        }
                    }
                }
                if(success == true){
                    alert("游戏胜利")
                    mask.style.display = "block"
                }
            }
        }
        tdAggregate[i].addEventListener("click",click)
        tdAggregate[i].oncontextmenu = function (e) {
            e.preventDefault()
        }
        var qiNum = 0
        tdAggregate[i].onmouseup = function (oEvent) {
            if(!oEvent) oEvent=window.event
            if(oEvent.button == 2){
                var imgQi = document.createElement("img")
                imgQi.src = "旗子.png"
                if(this.classList.contains("clicked")==false&&this.classList.contains("qi")==false&&qiNum<=N){
                    qiNum++
                    this.appendChild(imgQi)
                    this.classList.add("qi")
                    this.classList.remove("hover")
                    this.removeEventListener("click",click)
                }else if(this.classList.contains("qi")==true){
                    this.innerHTML = ""
                    this.classList.remove("qi")
                    this.classList.add("hover")
                    this.addEventListener("click",click)
                }
            }
        }
    }
}
