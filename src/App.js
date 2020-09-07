import React, {Component} from 'react';
import './App.css';
import styled from 'styled-components';
import Person from './Components/Person/Person';

const StyledButton = styled.button`
      background-color: ${props => props.alt ? 'red' : 'green'};
      color: white;
      font:inherit;
      border: 1px solid blue;
      padding: 8px;
      cursor: pointer;
      &:hover {
        background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
        color: black;
      }
`;

class App extends Component {
    state = {
        persons: [
            {id: '1302055', name: 'Mijan', age: 25},
            {id: '1302056', name: 'Saumen Mondal', age: 23},
            {id: '1302057', name: 'Nazmul Hasan', age: 27},
            {id: '1302058', name: 'Juyel Rana', age: 26}
        ],
        otherState: 'Somer Other Value',
        showPersons: false
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState({persons: persons})
    }

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow})
    }

    render() {

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>
                    })}
                </div>
            )

        }

        const classes = [];

        if (this.state.persons.length <= 2) {
            classes.push('red');
        }

        if (this.state.persons.length <= 1) {
            classes.push('bold');
        }

        return (<div className="App">
            <h1>React Developer</h1>
            <p className={classes.join(' ')}>Working with react</p>
            <StyledButton onClick={this.togglePersonHandler} alt={this.state.showPersons}>
                Toggle Person
            </StyledButton>
            {persons}
        </div>)
    }
}

export default App;
