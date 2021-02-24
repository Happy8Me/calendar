import BasictView from './BasicView.js';
import { participants } from '../data.js';

export default class extends BasictView {
      constructor() {
      super();
      this.setTitle('Calendar');
      this.participants = participants;       
    }

      async getHtml() {
        return `
        <div class="container main">
        <div class="container">
          <div class="row">
            <div class="col-5"> 
              <h3>Calendar</h3> 
            </div>
            <div class="col-4 d-flex align-items-center">
              <select class="form-select form-select-md" aria-label=".form-select-md ">
                <option selected value="All members">All members</option>
               ${this.options(this.participants)}
              </select>
            </div>
            <div class="col-3 d-flex justify-content-end">
              <a class="btn btn-secondary" href="/event" data-link>New event+</a>
            </div>
          </div>
        </div>
  
      
        <div id="table" class="container"></div>

        <div class="popup"></div>
  
      </div>
        `;
    }

    getData(){
      let data = [];  //all saved events

      for ( let i = 0; i < localStorage.length; i++ ) {
        let key = JSON.parse(localStorage.key( i ));
        let val = JSON.parse(localStorage.getItem( localStorage.key( i )));  

        data.push({ key, val })
      }
      return data
    }

    setBooked(cell) {
      let data = this.getData();
        
      let td = document.querySelector(`.a${cell}`);
      td.classList.add('table-success');
      let cellEvent = data.find(ev => ev.key == cell).val.title

      td.innerHTML = `
        <div class="cell-event d-flex justify-content-between"> 
          ${cellEvent} 
          <span class="event-delete">&#10060;</span>
        </div>`       
    }

    clearBooked(cell){        
        let td = document.querySelector(`.a${cell}`);
        td.classList.remove('table-success');
        td.innerHTML = '';       
    }
    
    async addEventToCalendar(){
      let data = this.getData();
      data.map(ev => this.setBooked(ev.key))
      this.deleteEvent();
    }

    deleteEvent(){
      const deleteBtns = document.querySelectorAll('.event-delete');

      deleteBtns.forEach(btn=> {  
        btn.addEventListener('click', handler)
        function handler(e) {

          let popup = document.querySelector('.popup');
          popup.classList.add('show');

          popup.innerHTML = ` 
            <p>Are you sure you want to delete "${e.target.parentElement.childNodes[0].textContent}" event?</p>
            <div>
              <button class="no">No</button>
              <button class="yes">Yes</button>
            </div>`
         
          document.querySelector('.no').addEventListener('click', () => {
            popup.classList.remove('show');
          })

          document.querySelector('.yes').addEventListener('click', () => {
            
            let td = btn.closest('td');
            const cellIndex = td.classList.value  // finds td class (ex. "a63") and converts it to index (63)
                            .match(/a[1-9]+/g)
                            .toString()
                            .substring(1)
      
            td.innerHTML = '';
            td.classList.remove('table-success');
            localStorage.removeItem(cellIndex);
            popup.classList.remove('show');

          })
          
        }
        
      })
    }

    sortEvents(){
      let participant = document.querySelector('select')
      participant.addEventListener('change', () => { 
        let data = this.getData();

        let cells = data.filter(ev => ev.val.participant.indexOf(participant.value) !== -1) //arrays of objects - patticipant's events 
                        .map(ev => ev.key);  //array of keys

        if(participant.value === 'All members')
          cells = data.map(ev => ev.key)
 
        data.map(ev => this.clearBooked(ev.key))
        cells.map(ev => this.setBooked(ev))
        this.deleteEvent();
      })
    }
}

