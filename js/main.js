var hoursContainer = document.querySelector('#hours');
var minutesContainer = document.querySelector('#minutes');
var secondsContainer = document.querySelector('#seconds');
var dayContainer = document.querySelector('#day');
var weekContainer = document.querySelector('#week');
var monthContainer = document.querySelector('#month');
var yearContainer = document.querySelector('#year');
var quote = document.querySelector('.quote');
var person = document.querySelector('.person');
var total = document.querySelector("#total");
var remaining = document.querySelector("#remaining");
var done = document.querySelector("#done");
var letter = "";



const quotes = [{
    quote: `"The best way to find yourself is to lose yourself in the service of others."`,
    person: `Mahatma Gandhi`
},{
    quote: `"If you want to live a happy life, tie it to a goal, not to person or things."`,
    person: `Albert Einstein`
}, {
    quote: `"At his best, man is the noblest of all animals; separated from law and justice he is the worst."`,
    person: `Aristotle`
}, {
    quote: `"Your time is limited, so don't waste it living someone else's life."`,
    person: `Steve Jobs`
}, {
    quote: `"Tell me and I forget. Teach me and I remember. Involve me and I learn."`,
    person: `Benjamin Franklin`
}, {
    quote: `"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough."`,
    person: `Oprah Winfrey`
}, {
    quote: `"It does not matter how slowly you go as long as you do not stop."`,
    person: `Confucius`
}, {
    quote: `"Our lives begin to end the day we become silent about things that matters."`,
    person: `Martin Luther King, Jr.`
}, {
    quote: `"Remember that not getting what you want is sometimes a wonderful stroke of luck."`,
    person: `Dalai lama`
}, {
    quote: `"The journey of a thousand miles begins with one step."`,
    person: `Lao Tzu`
},];

window.addEventListener("DOMContentLoaded", () => {
    let random = Math.floor(Math.random() * quotes.length);

    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;
});

window.addEventListener('load', () => {
    
    function timer(){
        var hours =  new Date().getUTCHours() + 1;
        var minutes = new Date().getUTCMinutes()
        var date = new Date().getDate();
        var weekday = new Date().toLocaleDateString('en-US', {weekday: 'long'});
        var month =  new Date().toLocaleDateString('en-US', {month: 'long'});
        
        var num = date % 10;
       
        
        
        var leadingMinutes = 0;
        var leadingHours = 0;
        var checkHour = hours - 12;
        const amPM = hours > 11 ? 'PM' : 'AM';
        
        if (minutes < 10){
                leadingMinutes="0" + minutes;
                }else{
                    leadingMinutes = minutes;
           
             }
        if (hours <= 12){
                leadingHours = hours;
        
            }
        else if (hours > 12){
            leadingHours = checkHour;
        
        }
        
        else{
            leadingHours = hours;
           
        }
        
        if (num == 1){
            letter = "st";
        }
        else if (num == 2){
            letter = "nd";
        } 
        else if (num == 3){
            letter = "rd";
        }
        else{
            letter = "th";
        }
        hoursContainer.innerHTML =  leadingHours;
                    
        minutesContainer.innerHTML =  "<span>:</span>" + leadingMinutes;
                    
        secondsContainer.innerHTML = "<span></span>" + amPM;
        weekContainer.innerHTML = "<span></span>" + weekday + ",";
        dayContainer.innerHTML = "<span></span>" + date + letter;
        
        monthContainer.innerHTML = "<span></span>" + month;
        
        
        
        }
        setInterval(timer, 1000);
        
       
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#task-input');
    const list_el = document.querySelector('#tasks');
    const msg = document.querySelector(".msg")
    var total_count = 0;
    var remaining_count = 0;
    var done_count = 0;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        total_count++;
        remaining_count++;
        
        total.innerHTML = "<span></span>" +  total_count;
        
        

        const task = input.value;

        if (!task) {
            msg.classList.add("error");
            msg.innerHTML = "Please fill out your task!";
            total_count = 0;
            total.innerHTML = "<span></span>" +  total_count;

            setTimeout(() => msg.remove(), 3000);
            return;
        }
       
       
        
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);
        

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");
        const task_complete_el = document.createElement("button");
        task_complete_el.setAttribute("id","click");
        task_complete_el.classList.add("edit");
        task_complete_el.innerHTML = "Complete";
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";


        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";
        task_actions_el.appendChild(task_complete_el);
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";
        const d = document.getElementById("click");
        done.innerHTML = done_count;
        task_complete_el.addEventListener("click", (e) => {
            e.preventDefault();
            
            
            remaining_count--;
            
            done_count++;
            
            done.innerHTML = "<span></span>" + done_count;
            remaining.innerHTML = "<span></span>" + remaining_count;
            
            
           
            
            
            
            task_input_el.style.textDecoration = "line-through";
            task_complete_el.innerText = "Completed";
            
            
            task_edit_el.remove();
        });
        remaining.innerHTML = "<span></span>" + remaining_count;
        task_edit_el.addEventListener("click", () => {
            if(task_edit_el.innerText.toLowerCase() == "edit") {
            task_input_el.removeAttribute("readonly");
            task_input_el.focus();
            task_edit_el.innerText = "save";
            } else{
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            remaining_count--;
            total_count--;

            remaining.innerHTML = "<span></span>" + remaining_count;
            total.innerHTML = "<span></span>" +  total_count;

        });

        
    });
    
   
    
        const year = new Date().getFullYear();
        
        yearContainer.innerHTML = year;
});
