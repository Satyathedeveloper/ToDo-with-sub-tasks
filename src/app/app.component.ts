import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO';
  userTimeDt: any;
  userTimeHH: any;
  userTimeMM: any;
  userTimeSS: any;
  userTimerHH: any;
  userTimerMM: any;
  userTimerSS: any;
  userInput: any = '';
  parentTask: any = []
  subTasks: any = []
  timerDiv: any = document.getElementById('timer')
  timeDiv: any = document.getElementById('time')
  ngOnInit() {
    this.timedifffunction("ngon")
    this.createDiv();
    if (!localStorage.getItem('totalnumoftasks')) localStorage.setItem('totalnumoftasks', '0')
    if (!localStorage.getItem('delscore')) localStorage.setItem('delscore', '0')
    if (!localStorage.getItem('donescore')) localStorage.setItem("donescore", "0")
    this.showthediv('');
  }
  constructor() {
    this.alertask = this.alertask.bind(this);
    this.score = this.score.bind(this);

  }


  showthediv(show: any) {
    var profiileDiv = document.getElementById("profcon")?.style
    if (show == "show") {

      if (profiileDiv) {
        profiileDiv.display = "flex";
        profiileDiv.scale = "1";
      }
    }
    if (profiileDiv) {
      if (!localStorage.getItem("UserName")) { profiileDiv.display = "flex"; }
      else {
        this.genderconfirmation(localStorage.getItem("GendeR"))
        this.username = localStorage.getItem("UserName")
      }
    }
  }


  usergender: any = "hie.... "
  genderconfirmation(gender: any) {
    var containerforimg = document.getElementById("imgcon");
    var conforprofileimg = document.getElementById('userimg');
    if (containerforimg) containerforimg.innerHTML = "";
    if (conforprofileimg) conforprofileimg.innerHTML = "";
    var createimg = document.createElement('img');
    var createimge = document.createElement('img');
    createimg.style.width = '105px';
    createimg.style.margin = '-5px 0px 0px -2px '
    createimge.style.width = '105px';
    createimge.style.margin = '-5px 0px 0px -2px '

    if (gender == "Mr. ") {
      createimg.src = "/assets/icons/man.png";
      createimge.src = "/assets/icons/man.png"
      localStorage.setItem('GendeR', "Mr. ")
    }
    else if (gender == "Ms. ") {
      createimg.src = "/assets/icons/woman.png";
      createimge.src = "/assets/icons/woman.png";
      localStorage.setItem('GendeR', "Ms. ")
    }
    else {

    }
    this.usergender = " "
    this.usergender += gender + ".....   "
    containerforimg?.appendChild(createimg);
    conforprofileimg?.appendChild(createimge)
  }

  username: any = '';

  validateName() {
    var ele = document.getElementById('profcon')?.style;
    var mrred = document.getElementById("ms")?.style;
    var msred = document.getElementById('mr')?.style;
    if (ele) {
      if (this.username.length > 0) {
        localStorage.setItem("UserName", this.username);
        if (!localStorage.getItem("GendeR") && (mrred && msred)) {
          msred.border = "2px solid red";
          mrred.border = '2px solid red';
        }

        else {
          ele.scale = "0"
        }

      }
      else {
        var inputred = document.getElementById("nameinput")?.style
        if (inputred) inputred.border = "2px solid red"

      }

    }
  }


  alertTimeOrTask(task: any, cat: any, notime: any) {
    if (this.userInput.length > 0) {
      var sdf = document.querySelector<HTMLInputElement>("input[name='catagory']:checked")
      if (sdf?.value) {
        if (notime == 'noTime') {
          if (task == 'parentTask') { this.storeTaskInLocalStorage(null, notime); }
          if (task == 'subTask') {
            this.createSubTask(cat, notime);

          }
          var close = document.getElementById("totaltimeinput")?.style
            if (close) close.display = 'none';
          return this.createDiv();
        }
        if ((this.userTimerHH || this.userTimerMM || this.userTimerSS) > 0 || ((this.userTimeHH) || this.userTimeMM || (this.userTimeSS)) >= 0) {
          if (this.userTimeHH < 25 && this.userTimeMM < 61 && this.userTimeSS < 61) {
            if (task == 'parentTask') { this.storeTaskInLocalStorage(null, null); }
            if (task == 'subTask') {
              this.createSubTask(cat, notime);
            }
            var close = document.getElementById("totaltimeinput")?.style
            if (close) close.display = 'none';
          }
          else {
            alert("Give proper Time")
          }
        }
        else { alert("Time") }
      }
      else {
        alert("Type of task")
      }
    }
    else { alert("TASK") }
    this.createDiv();
  }




  storeTaskInLocalStorage(par: any, noTime: any) {

    var tempKey: any;
    if (!par) {
      tempKey = Date.now().toString();
    }
    else {
      tempKey = par;
    }
    var catagory = document.querySelector<HTMLInputElement>("input[name='catagory']:checked");
    var suio: any = [];
    if (noTime == 'noTime') {
      suio.push(this.userInput, catagory?.value);
    }

    if (noTime !== "noTime") {
      this.userInput = this.userInput.replace(/,/, " ")
      var calltime= this.setTime(tempKey)
      console.log(calltime);
      
      if(calltime !== null){
      suio.push(this.userInput, catagory?.value, Date.now().toString(), calltime)
      }
      else{
        return
      }
    }
    localStorage.setItem(tempKey, suio);
    this.gettotaltasksnum();
    this.userTimeDt = ""; this.userTimeHH = ""; this.userTimeMM = ""; this.userTimeSS = ""; this.userTimerHH = ''; this.userTimerMM = ''; this.userTimerSS = ''; this.userInput = '';

  }
  createSubTask(specifickey: any, noTime: any) {
    var localStorageKeys = Object.keys(localStorage);

    var tempstorage: any = [];
    for (let keys of localStorageKeys) {
      if (+keys) {
        if (keys > specifickey && keys < (specifickey + 1)) {
          tempstorage.push(keys)
        }
      }
    }
    if (tempstorage.length > 0) {
      var nkey = +(Math.max(...tempstorage)) + .01;
      this.storeTaskInLocalStorage(nkey.toString(), noTime);
    }
    else {
      var fkey = +specifickey + 0.01;
      this.storeTaskInLocalStorage(fkey.toString(), noTime);
    }

    this.userTimeDt = ""; this.userTimeHH = ""; this.userTimeMM = ""; this.userTimeSS = ""; this.userTimerHH = ''; this.userTimerMM = ''; this.userTimerSS = ''; this.userInput = '';

  }




  createDiv() {
    this.parentTask = [];
    this.subTasks = [];
    var tempParentTask = [];
    var keys = [];
    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
    for (var i = 0; i < Object.keys(localStorage).length; i++) {
      if (Object.keys(localStorage)[i].startsWith('1')) {
        keys.push(+Object.keys(localStorage)[i])
      }
    }
    keys = keys.sort((a: any, b: any) => +a - +b);
    for (let key of keys) {
      if (+key % 1 == 0) {
        var arrOfval = (localStorage.getItem(key.toString()))?.split(',')
        if (arrOfval) this.parentTask.push([arrOfval[0], key]);
        this.subTasks.push([]);
        tempParentTask.push(key);

      }
    }
    for (let key = 0; key < keys.length; key++) {
      for (let task = 0; task < tempParentTask.length; task++) {
        if (+tempParentTask[task] < +keys[key] && (+tempParentTask[task] + 1) > +keys[key]) {
          for (let subtask = 0; subtask < this.subTasks.length; subtask++) {
            if (subtask == task) {
              var arrOfval = (localStorage.getItem(keys[key].toString()))?.split(',')
              if (arrOfval) this.subTasks[subtask].push([arrOfval[0], keys[key]]);
            }
          }
        }
      }
    }
    this.navarray = [];
    var show = document.getElementById("shoempty")?.style
    if (show) {
      if (this.parentTask.length == 0) {
        show.display = "block"
      }
      else {
        show.display = "none"
      }
    }
  }

  displayTimeDiv(divclick: any) {
    const inputDiv = document.getElementById('showinput') as HTMLDivElement
    const inputDivwDte = document.getElementById('showinputwdt') as HTMLDivElement
    if (divclick == 'timer') {
      inputDiv.style.display = 'block';
      inputDivwDte.style.display = 'none';
      this.userTimeHH = ''; this.userTimeMM = ''; this.userTimeSS = ''; this.userTimeDt = "";
    }
    else {
      inputDiv.style.display = 'none';
      inputDivwDte.style.display = 'block';
      this.userTimerHH = ""; this.userTimerMM = ""; this.userTimerSS = "";
    }


    
  }
  setTime(key: any) {
    var temp: any;
    if (this.userTimerHH || this.userTimerMM || this.userTimerSS) {
      var HH = this.userTimerHH ? 3600 * this.userTimerHH * 1000 : 0;
      var MM = this.userTimerMM ? 60 * this.userTimerMM * 1000 : 0;
      var SS = this.userTimerSS ? this.userTimerSS * 1000 : 0;
      temp = HH + MM + SS
    }
    else if (this.userTimeDt && this.userTimeHH && this.userTimeMM || this.userTimeSS) {
      var HHp = this.userTimeHH ? +this.userTimeHH : 0;
      var MMp = this.userTimeMM ? +this.userTimeMM : 0;
      var SSp = this.userTimeSS ? + this.userTimeSS : 0;
      const now = new Date();
      const targetTime = new Date(this.userTimeDt);
      targetTime.setHours(HHp, MMp, SSp);
      temp = (targetTime.getTime() - now.getTime());
    }
    if (temp > 0) {
      setTimeout(this.alertask, temp, key);
      return temp
    }
    else {
      alert("Given time is already expired");
      return null
    }
  }



  del(keyNum: any) {
    var keys = Object.keys(localStorage)
    for (let key of keys) {
      if (keyNum % 1 == 0 && keyNum < key && keyNum + 1 > key) {

        localStorage.removeItem(key);
      }
    }
    localStorage.removeItem(keyNum);
    this.createDiv();
    this.score('delscore');
  }



  alertask(key: any) {
    this.remindData.push(key);

    this.showdiv(key)
  }





  showdiv(key: any) {
    if ('Notification' in window) {
      Notification.requestPermission()
        .then( (permission) => {
          if (permission === 'granted') {
            var notification = new Notification("Satya's TODO list", {
              body:localStorage.getItem(this.remindData[0])?.split(",")[0].toString(),
            });
            var website="http://localhost:4200/"
            notification.onclick = function () {
             window.open(website,'_blank')
            };
          }
        });
    }

    for (let keyg of Object.keys(localStorage)) {
      if (key == keyg) {
        if (this.remindData.includes(this.remindData[0])) {
          var para = document.getElementById("box");
          if (para) {
            var p = document.getElementById("taskCon")
            let input = localStorage.getItem(this.remindData[0])?.split(",")[0].toString()
            if (input && p) p.innerHTML = input
            para.style.display = "block";
            para.style.scale = "100%";
          }
        }
      }
    }
  }

  remindData: any = []



  score(typo: any) {
    var additionalscore = localStorage.getItem(typo);

    if (additionalscore) localStorage.setItem(typo, (+additionalscore + 1).toString());
    this.removedatafunction();
  }

  donefunction(keymaybe: any) {

    let additionalscore = localStorage.getItem('donescore')
    if (keymaybe % 1 == 0) {
      var arrayforkey: any = [];
      for (let keys of Object.keys(localStorage)) {
        if ((+keymaybe) < +keys && (+keymaybe + 1) > +keys) {
          arrayforkey.push(keys);

        }
      }

      if (arrayforkey.length == 0) {
        localStorage.removeItem(keymaybe)
        if (additionalscore) {
          localStorage.setItem('donescore', (+additionalscore + 1).toString());
        }

        else {
          localStorage.setItem('donescore', '1');
        }
        this.removedatafunction();
      }
      else {
        this.removedatafunction();
        alert("Main TASK is completed waiting for subTASK/s Completion");
      }
    }
    else {
      localStorage.removeItem(keymaybe)
      if (additionalscore) {
        localStorage.setItem('donescore', (+additionalscore + 1).toString());
      }
      else {
        localStorage.setItem('donescore', '1');
      }
      this.removedatafunction();
    }
    this.createDiv();
  }

  removedatafunction() {
    this.remindData.shift();
    if (this.remindData[0]) {
      this.showdiv(this.remindData[0])
    }
    else {
      var para = document.getElementById("box");
      if (para) {
        para.style.display = "none";
        para.style.scale = "1%";
      }
    }
    this.createDiv();
  }


  remindmelater() {
    var time: any = localStorage.getItem(this.remindData[0])?.split(",")
    if (time) {
      var newval: any = [time[0], [1], Date.now(), 300000]
      localStorage.setItem(this.remindData[0].toString(), newval);
      setTimeout(this.alertask, 300000, this.remindData[0]);
      this.removedatafunction();
    }

  }


  navarray: any;

  searchtaskinput: any;
  searchanytask(process: any) {
    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
    var searchele = document.getElementById('searchcon');
    if (searchele) searchele.style.display = 'block';
    if (process == 'close') if (searchele) searchele.style.display = 'none';
    if (process == null) {
      var reshtml = ''
      for (let key = 0; key < this.parentTask.length; key++) {
        if (this.searchtaskinput) if (this.searchtaskinput.length > 0) {
          if (this.parentTask[key][0].startsWith(this.searchtaskinput)) {
            reshtml += `<div>${key + 1})  ${this.parentTask[key][0]}</div>`
          }
          else {
            for (let subtask = 0; subtask < this.subTasks[key].length; subtask++) {
              if (this.subTasks[key][subtask][0].startsWith(this.searchtaskinput)) {
                reshtml += `<div>${key + 1}.${subtask + 1})  ${this.subTasks[key][subtask][0]}</div>`;
              }
            }
          }
        }


      }

      let res = document.getElementById("showresult");
      if (res) {
        res.innerHTML = reshtml;
        res.style.marginLeft = '10px'
      }
      else {

      }
    }

    this.createDiv()
  }




  yourtasks(type: any) {
    this.navarray = [];
    var keys = Object.keys(localStorage)

    this.parentTask = [];
    if (type == 'personal') {
      for (let key of keys) {
        if (localStorage.getItem(key)?.split(',')[1] == 'Personal') {
          this.navarray.push([localStorage.getItem(key)?.split(',')[0], key])
        }
      }
    }
    if (type == 'Work') {
      for (let key of keys) {
        if (localStorage.getItem(key)?.split(',')[1] == 'Work Or Team') {
          this.navarray.push([localStorage.getItem(key)?.split(',')[0], key])
        }
      }
    }
    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
  }



  gettotaltasksnum() {
    var totalnumoftask: any = localStorage.getItem('totalnumoftasks')
    if (localStorage.getItem('totalnumoftasks')) localStorage.setItem("totalnumoftasks", (+totalnumoftask + 1).toString());
    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
  }



  youractivity() {
    var show = document.getElementById('shoempty')?.style
    if (show) show.display = 'none'
    var delscore = localStorage.getItem('delscore')
    var donescore = localStorage.getItem('donescore')

    var totalnumoftasks = localStorage.getItem("totalnumoftasks")
    var someret = this.close()

    someret.innerHTML = ''
    someret.innerHTML = `<div>Total Tasks Number : ${totalnumoftasks}</div>
    <div>Total Deleted or unDone Tasks : ${delscore}</div>
    <div>Total done or Completed Tasks : ${donescore}</div>
    <div>Progressing Tasks:${Object.keys(localStorage).length - 5}</div>`
  }
  close() {

    this.parentTask = [];
    this.navarray = [];
    var div = document.getElementById('cont');
    if (div) div.style.display = 'flex'
    var showdiv = document.getElementById('content')
    if (showdiv) {
      showdiv.style.display = "block";
      showdiv.innerHTML = '';
      var close = document.getElementById("navclose") as HTMLImageElement;
      if (close) close.style.display = "block"; close.addEventListener('click', () => { this.createDiv() })

    }

    var creatediv = document.createElement('Div');
    creatediv.id = 'contentDiv';
    creatediv.style.margin = '10px';

    if (showdiv) { showdiv.appendChild(creatediv); }
    return creatediv
  }





  notimefunction() {
    this.navarray = [];
    this.parentTask = [];
    var keys = Object.keys(localStorage);
    for (let key = 0; key < keys.length; key++) {
      var val = localStorage.getItem(keys[key])?.split(',')
      if (val) if (val.length > 1 && val.length < 3) {
        this.navarray.push(val)
      }
    }

    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
  }



  timedifffunction(from: any) {
    var login = Date.now()
    var keys = Object.keys(localStorage);// chnage this line from values to key
    this.navarray = []; this.parentTask = [];
    for (let key = 1; key < keys.length; key++) {
      const usercertTime = localStorage.getItem(keys[key])?.split(',')[3];  // time stamp value
      var usertime: any = localStorage.getItem(keys[key])?.split(',')[2]   // time stamp value
      if (usertime && usercertTime) {
        usertime = new Date(+usertime)
        var timeDiff = login - usertime;
        if (from == "ngon") {
          if (timeDiff > +usercertTime) {
            this.alertask(keys[key]);
          }
          if (timeDiff < +usercertTime) {
            timeDiff = +usercertTime - timeDiff
            setTimeout(this.alertask, timeDiff, keys[key]);
          }
        }
        if (from == 'upcoming') {
          if (timeDiff < 3600000) {
            this.navarray.push([localStorage.getItem(keys[key])?.split(',')[0], keys[key]])
          }
        }
      }
    }

    var div = document.getElementById('cont');
    if (div) div.style.display = 'none';
  }


  todaysmotivation() {

    var show = document.getElementById('shoempty')?.style
    if (show) show.display = 'none'
    var motivationalQuotes = [
      "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
      "The only way to do great work is to love what you do.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Don't watch the clock; do what it does. Keep going.",
      "Your time is limited, don't waste it living someone else's life.",
      "The only person you are destined to become is the person you decide to be.",
      "You are never too old to set another goal or to dream a new dream.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "Believe you can and you're halfway there.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "It always seems impossible until it's done.",
      "The harder you work for something, the greater you'll feel when you achieve it.",
      "Your life does not get better by chance, it gets better by change.",
      "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.",
      "You are the only limit you have. If you want to achieve great things, you need to set great goals.",
      "The secret of getting ahead is getting started.",
      "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.",
      "Don't wait for opportunity. Create it.",
      "Believe in your infinite potential. Your only limitations are those you set upon yourself.",
      "Challenges are what make life interesting and overcoming them is what makes life meaningful."
    ];
    var randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    var showdiv = this.close()
    if (showdiv) showdiv.innerText = randomQuote;
  }
  changebg() {
    var selectDiv = document.querySelectorAll("#navkeycon > div");
    selectDiv.forEach(function (div: any) {
      div.style.backgroundColor = '';
      div.style.marginLeft = '20px'

      div.addEventListener('click', function (this: any) {

        this.style.backgroundColor = 'cadetblue';
        this.style.marginLeft = '50px'
      })
    })
  }


  edit(key: any) {

    var get = localStorage.getItem(key)
    this.userInput = get?.split(',')[0]
    var imgcon = document.getElementById("foredit");
    if (imgcon?.style.display == "inline-block") {
      imgcon.style.display = "none"
      this.userInput = ''

    }
    else {
      if (imgcon) imgcon.style.display = "inline-block"
      var foredit = document.getElementById("foredit");
      foredit?.addEventListener("click", () => {
        this.afteredit(key, get, foredit)
      })
    }
  }

  afteredit(key: any, val: any, ele: any) {//one:any,two:any,three:any
    var value: any = [this.userInput, val.split(',')[1], val.split(',')[2], val.split(',')[3]]
    console.log(value);

    localStorage.setItem(key, value);
    if (ele) ele.style.display = 'none'
    this.userInput = ''
    return this.createDiv();
  }

  toggleContent() {
    var showinput = document.getElementById("totaltimeinput")?.style
    if (showinput?.display == 'block') {
      showinput.display = 'none'
    }
    else {
      if (showinput) showinput.display = 'block'
    }
  }
  showcatagory() {
    var catg = document.getElementById("totalcat")
    if (catg?.style.display == "none") {
      catg.style.display = 'inline-block'
    }
    else {
      if (catg) catg.style.display = "none"
    }
  }
}

