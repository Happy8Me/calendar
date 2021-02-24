import BasictView from './BasicView.js';
import CellError from '../components/CellError.js';
import { navigateTo } from '../index.js';
import { days, hours, participants } from '../data.js';

export default class extends BasictView {
        constructor() {
        super();
        this.setTitle('Event');
        this.participants = participants;
        this.days = days; 
        this.time = hours;
    }

    async getHtml() {
        return `  
            <div class="container main">

           ${CellError('Failed to create an event. Time slot is already booked.')}

            <fieldset class="col-12">
                <div class="form-field row">
                    <label class="col-3" for="event">Name of the event:</label>
                    <input type="text" id="event" class="validation col-5" required>
                </div>
                <div class="form-field row">
                    <label class="col-3" for="participant">Participants:</label>
                    <div class="col-5 relative">
                        <option class="selected-opts drop-down" id="participant">Choose...</option>
                        <select class=" drop-list validation" multiple required>
                            <option selected disabled value="">Choose...</option>
                            ${this.options(this.participants)}
                        </select>
                    </div>
                    
                </div>

                <div class="form-field row">
                    <label class="col-3 for="day">Participants:</label>
                    <select name="day" id="day" class="validation col-5" required>
                        <option value="">Choose...</option>
                        ${this.options(this.days)}
                    </select>
                </div>

                <div class="form-field row">
                    <label class="col-3 for="time">Participants:</label>
                    <select name="time" id="time" class="validation col-5" required>
                        <option value="">Choose...</option>
                        ${this.options(this.time)}
                    </select>
                </div>

                <div class="form-field d-flex flex-row-reverse">
                    <button id="submit-btn" class="btn btn-secondary col-2">Create</button> 
                    <a href="/calendar" data-link class="btn btn-secondary col-2">Cancel</a> 
                </div>
            </fieldset> 
        </div>
        `;
    }
    
    async showOpts(){
        let dropDown = document.querySelector('.drop-down');
        let drop = document.querySelector('.drop-list');
        dropDown.addEventListener('click', (e) => {
            if(e.target === dropDown && !drop.classList.contains('show')) {
                drop.classList.add('show')
            } 
        });
        document.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.parentElement !== drop && e.target !== dropDown && drop.classList.contains('show')) {
                drop.classList.remove('show')

                let selectedParticipants = [...drop.selectedOptions].map(opt => ' ' + opt.value);
                dropDown.innerText = selectedParticipants
            }
        });
    } 

    async addEvent() {

        document.querySelector('#submit-btn').addEventListener('click', () => {

            const day = document.querySelector('#day').value;
            const time = document.querySelector('#time').value;
            const dayIndex = this.days.indexOf(day)+1;
            const timeIndex = this.time.indexOf(time)+1;
            const cell = timeIndex + '' + dayIndex;
            const forValidation = Array.prototype.slice.call(document.querySelectorAll('.validation')) // array of iputs for validation

            const cellsTaken = Array.apply(0, new Array(localStorage.length)).map(function (_, i) { return localStorage.key(i)})
          
            const validation = input => {
                if (input.value == '') {
                    input.closest('.form-field').classList.add('unval')
                    return false;
                } else {
                    input.closest('.form-field').classList.remove('unval');
                    return true;
                }
            }

            const validInput = forValidation
                                .map(input => validation(input))  //returns array of true/false (for each input)
                                .every(input => input === true);  //returns true/false

            const validDate = cell => {
                if ( cellsTaken.includes(cell) ) {
                    document.querySelector('.error').classList.add('show');
                    return false
                } else {
                    return true
                }
            }

            if (validInput && validDate(cell)) {
                let ev = {
                    title: document.querySelector('#event').value,
                    participant: document.querySelector('#participant').value,
                    day,
                    time,
                }
                window.localStorage.setItem(cell, JSON.stringify(ev));
                navigateTo('/calendar');
            }
        });
        
        document.querySelector('.error-close').addEventListener('click', function()  {
            document.querySelector('.error').classList.remove('show');
        })
           
    }
}


