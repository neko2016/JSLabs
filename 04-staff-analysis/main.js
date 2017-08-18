// turn on popup permission first
// chrome://settings/content/popups

var data = [];
var cid ;
var page = 3;
var timer = 10000;

function navigate(){
    for (var i = 1; i < (page+1); i++){
        openURL(i, cid);
    }
    setTimeout(analysis, timer * (page+1));
}

function openURL(i, cid){
    setTimeout(function(){
        
        var baseURL = "https://www.linkedin.com/search/results/people/?facetCurrentCompany=%5B%22"+ cid + "%22%5D&page=";
        var path = baseURL + i; 
        var wd = window.open(path,  String(i)); 
        wd.focus();
        console.log(path, window.performance.now());

        wd.onload = function(){
            console.log('window loaded', window.performance.now());
            
            setTimeout(function(){
                wd.scrollTo(0, wd.document.body.scrollHeight);
                console.log('finished scrolling', window.performance.now());
                setTimeout(function(){
                    var names = wd.document.getElementsByClassName("actor-name");
                    var titles = wd.document.getElementsByClassName("subline-level-1");
                    for (var i = 0; i < names.length; i++){
                        var n = names[i].textContent;
                        var t = titles[i].innerHTML;
                        data.push({name:n, title: t});
                    }
                    console.log(data, window.performance.now());
                }, 1000);
            }, 1000)
        }

    }, timer * i); 

function analysis(){
    var tech = 0;
    var techArr = [];
    var commercial = 0;
    var support = 0;
    var saleArr = [];
    var design = 0
    var designArr = [];
    var finance = 0;
    var financeArr = [];
    var student = 0;
    var stArr =[];
    var hr = 0;
    var hrArr = [];

    for (var i = 0; i < data.length; i++){
        var t = data[i].title.toLowerCase();
        if (t.indexOf("developer") !== -1 || t.includes("engineer") || t.includes("software") || t.includes("system") || t.includes("technical") || t.includes("tester") || t.includes("mobile") || t.includes("android") || t.includes("ios") || t.includes("automation")){
            tech +=1;
            techArr.push({name: data[i].name, title: data[i].title});
        } else if (t.includes("marketing") || t.includes("marketer") || t.includes("market") || t.includes("sale") || t.includes("account") || t.includes("manager" || t.includes("project"))){
            commercial +=1;
            saleArr.push({name: data[i].name, title: data[i].title});
        } else if (t.includes("support") || t.includes("customer") || t.includes("service")){
            support += 1;
            saleArr.push({name: data[i].name, title: data[i].title});
        } else if (t.includes("designer") || t.includes("design")){
            design += 1;
            designArr.push({name: data[i].name, title: data[i].title});
        } else if (t.includes("finance") || t.includes("financial")){
            finance +=1;
            financeArr.push({name: data[i].name, title: data[i].title});
        } else if(t.includes("student") || t.includes("intern")){
            student +=1;
            stArr.push({name: data[i].name, title: data[i].title});
        } else if (t.includes("talent") || t.includes("people")){
            hr += 1;
            hrArr.push({name: data[i].name, title: data[i].title});
        }
    }

    var counted = tech + commercial + support + design + finance + student + hr;

    console.log("total", data.length);
    console.log('counted', counted);

    console.log('tech:', techArr);
    console.log('sales:', saleArr);
    console.log('design:', designArr);
    console.log('finance:', financeArr);
    console.log('student:', stArr);
    console.log('HR:', hrArr);
}


navigate();

