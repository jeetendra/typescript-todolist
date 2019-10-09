// Import stylesheets
import './style.css';
// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('list');
const noteText:HTMLInputElement = document.querySelector('#noteText');
const colorSelector:HTMLSelectElement = document.querySelector('#colorSelector');


export type ColorType = 'Red' | 'Green' |'Blue';
interface IColorEnum {
  RED:ColorType;
  GREEN:ColorType;
  BLUE:ColorType;
  getColors(): Array<ColorType> 
} 
const color: IColorEnum = {
  get RED():ColorType {
    return 'Red';
  },
  get GREEN():ColorType {
    return 'Green';
  },
  get BLUE():ColorType {
    return 'Blue';
  },
  getColors() {
    return [
      'Red' , 'Green' , 'Blue'
      ]
  }
}

interface INote {
  label:string;
  color: ColorType;
}

class Note implements INote {
  constructor(public label:string, public color:ColorType) {

  }
}

class Notes {
  private notes: Map<number, Note>;
  static ids:number = 2;
  constructor() {
    this.notes = new Map([[0, {
      label: 'apple',
      color: color.RED
    }], [1, {
      label: 'book',
      color: color.GREEN
    }]]);
  }

  addNote(note: Note) { 
    this.notes.set(++Notes.ids, note);
  }

  deleteNote(id: number) {
    if( this.notes.has(id) ) {
      const note = this.notes.get(id);
      this.notes.delete(id);
      return note;
    } else {
      return null;
    }
  }

  editNote(id:number) {

  }

  getNotes() {
    return this.notes;
  }
}

var notes = new Notes();


color.getColors().forEach((el) => {
  var option = document.createElement("option");
  option.text = el;
  colorSelector.add(option);

})

window.UIAction = {
  isEditMode: false,
  addItem: (e) => {
    e.preventDefault();
    this.isEditMode = false;
    const label:string = noteText.value.trim();
    const color:ColorType = colorSelector.value as ColorType;
    if(label) {
      const note:Note = new Note(label, color);
      noteText.value = '';
      notes.addNote(note);
      render()
    }
    
  },
  editItem: (id) => {
    if(this.isEditMode) return; 
    this.isEditMode = true;
    const note:Note = notes.deleteNote(id);
    if(note) {
      noteText.value = note.label;
      colorSelector.value = note.color;
    }
   
    //notes.editNote(id);
    render()
  },
  deleteItem: (id) => {
    notes.deleteNote(id);
    render()
  }

}

function render() {
  let noteStr = '<ul>';
  notes.getNotes().forEach((note: Note, key: number) => {
    noteStr += `<li style="background-color:${note.color}" >${note.label} 
    <button onClick="UIAction.editItem(${key})" >Edit</button>
    <button onClick="UIAction.deleteItem(${key})" >Delete</button> </li>`;
  });
  noteStr += '</ul>';
  appDiv.innerHTML = noteStr; 
  
}

render();
