//创建表格
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
}
createLei(8,8,10)
function createLei(X,Y,N) {
    var randomX
    var randomY
    var table
    var tr
    var td
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
            if(td.classList.contains("lei")){
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
                }
                td.classList.add(num)
            }
        }
    }
}
var td = document.getElementsByTagName("td")
for(let i=0;i<td.length;i++){
    td[i].addEventListener("click",function () {
        if (this.classList.contains("lei")==false){
            this.classList.remove("hover")
            this.style.cssText="background: #bbb;border:1px solid #808080 !important;width:24px;height:24px"
            if(this.classList.contains("1")){this.innerText="1"}
            if(this.classList.contains("2")){this.innerText="2"}
            if(this.classList.contains("3")){this.innerText="3"}
            if(this.classList.contains("4")){this.innerText="4"}
            if(this.classList.contains("5")){this.innerText="5"}
            if(this.classList.contains("6")){this.innerText="6"}
            if(this.classList.contains("7")){this.innerText="7"}
            if(this.classList.contains("7")){this.innerText="8"}
        } else {
            var lei = document.getElementsByClassName("lei")
            for (let i=0;i<lei.length;i++){
                lei[i].style.cssText+="background:red"
            }

        }
    })
}


