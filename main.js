var learned = [];
var MCLearned = [];
var terms = [];
var temp = [];
var rand;
var q;
var a;
var questions = document.getElementById("questions");
var cori = document.getElementById("cori");
var textDiv = document.getElementById("text");
var textInput;
var termList = document.getElementById("terms");
var allTerms = document.getElementsByClassName("enterValues");
var numTerms = document.getElementById("numTerms");
numTerms.addEventListener("keypress",makeTerms)
var prmpt = document.getElementById("prompt");
var again = document.getElementById("again");
//var alphabet = "abcdefghijklmnopqrstuvwxyz";
//for (var i = 0; i < 13; i++){
//    terms[terms.length] = [alphabet.substring(2*i,2*i+1),alphabet.substring(2*i+1,2*i+2)];
//}

var buttons = document.getElementById("buttons");


//probably make a function that gets updated every time a button is pressed

var MCorWrite = false;

var choices = ["a","b","c","d"];

var blist;

var trm, def;

var strt = document.getElementById("start");
var st = strt.parentElement
st.innerHTML = "";

function makeTerms(e){
    if(e.keyCode==13&&numTerms.value>=4){
        for (var k = 0; k < numTerms.value; k++){
        termList.innerHTML = termList.innerHTML+"<li class=\"term\"><input type=\"text\" class=\"enterValues\"></li>"
        termList.innerHTML = termList.innerHTML+"<li class=\"term\"><input type=\"text\" class=\"enterValues\"></li>"
        }
        allTerms = document.getElementsByClassName("enterValues");
        for(var i = 0; i < allTerms.length;i++){
            allTerms[i].addEventListener("keydown",n);
        }
        prmpt.innerHTML = "Enter your terms";
        numTerms.parentElement.innerHTML = "";
        st.innerHTML = "<button id=\"start\">start</button>";
        strt = document.getElementById("start");
        strt.addEventListener("click",start);
    }
}

function makeButtons(){
    for (var i = 0; i < 4; i++)
        buttons.innerHTML = buttons.innerHTML + "<li class=\"bli\"><button class=\"button\">button</button></li>";
    blist = document.getElementsByClassName("button");
    blist[0].addEventListener("click", f0);
    blist[1].addEventListener("click", f1);
    blist[2].addEventListener("click", f2);
    blist[3].addEventListener("click", f3);
}

function start(){
    //allTerms = document.getElementsByClassName("enterValues");
    var count = 0;
    for (var i = 0; i < allTerms.length/2;i++){
        trm = allTerms[2*i].value;
        def = allTerms[2*i+1].value;
        if(def!=""&&trm!=""){
            terms[terms.length] = [trm,def];
            count+=1;
        }
    }
    if(count>=4){
        st.parentElement.innerHTML = "";
        update();
    }
}

function n(e){
    if(e.keyCode==13){
        start();
    }
}

function finished(){
    cori.innerHTML = "Party Party Everywhere!";
    again.innerHTML = "<button id=\"studyAgain\">Study Again!</button>"
    var studyAgain = document.getElementById("studyAgain");
    studyAgain.addEventListener("click",restart);
    questions.innerHTML = "";
    textDiv.innerHTML= "";
}

function restart(){
    learned = [];
    update();
}

function f0(){
    if (q!=undefined){
        checkAnswer(0);
        setTimeout(update,2000)
    }
    else
        update();
}
function f1(){
    if (q!=undefined){
        checkAnswer(1);
        setTimeout(update,2000)
    }
    else
        update();
}
function f2(){
    if (q!=undefined){
        checkAnswer(2);
        setTimeout(update,2000)
    }
    else
        update();
}
function f3(){
    if (q!=undefined){
        checkAnswer(3);
        setTimeout(update,2000)
    }
    else
        update();
}

function allLearned(){
    if(temp.length == 0)
        return true;
    for(var k = 0; k < temp.length;k++)
        if (!inLearned(k))
            return false;
    return true;
}

function inLearned(num){
    return !(learned.indexOf(temp[num])==-1&&MCLearned.indexOf(temp[num])==-1);
}

function checkAnswer(input){
    if (!MCorWrite){
    if (input==q){
        cori.innerHTML = "Correct";
        MCLearned[MCLearned.length] = temp[q];
    }
    else
        cori.innerHTML = "Incorrect";
    if (MCLearned.length == 7||MCLearned.length+learned.length==terms.length)
        MCorWrite=true;
    temp = [];}
    else{
    if (input ==a[1]){
        MCLearned.splice(MCLearned.indexOf(a),1);
        learned[learned.length] = a;
        cori.innerHTML = "correct";
    }
    else{
        MCLearned.splice(MCLearned.indexOf(a),1);
        cori.innerHTML = "incorrect";
    }
    if (MCLearned.length == 0){
        MCorWrite = false;
    }
    }
}

function update(){
    if (learned.length!=terms.length){
        cori.innerHTML = "";
        again.innerHTML = "";
        if (!MCorWrite){
            textDiv.innerHTML = "";
            
            while(allLearned()){
                temp = [];
                for(var k = 0; k < 4; k++){
                    rand = Math.floor(Math.random()*terms.length);
                    while (temp.indexOf(terms[rand])!=-1)
                        rand = Math.floor(Math.random()*terms.length);
                    temp[temp.length] = terms[rand];
                }

            }
            

            q = Math.floor(Math.random()*4);
            while(inLearned(q)){
                q = Math.floor(Math.random()*4);
            }

            questions.innerHTML = temp[q][0];
            if (blist == undefined)
                makeButtons();
            for (var i = 0; i < 4; i++){
                blist[i].innerHTML = choices[i] + ") " + temp[i][1];
            }

        }
        else{
            buttons.innerHTML = ""
            textDiv.innerHTML = "<input type=\"text\" id=\"input\">";
            textInput = document.getElementById("input");
            textInput.addEventListener("keydown",pkey);

            a = MCLearned[Math.floor(Math.random()*MCLearned.length)];
            questions.innerHTML = a[0];
        }
    }
}
function pkey(e){
    if(e.keyCode==13){
        input = textInput.value;
        checkAnswer(input);
        if (learned.length!=terms.length){
            setTimeout(update,2000);}
        else
            finished();
    }
}

