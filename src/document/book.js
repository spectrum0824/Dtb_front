import React, { Component } from 'react'
import axios from 'axios'
import $ from 'JQuery'

class Book extends Component {
    constructor() {
        super();

        this.state = {
            Name: 'k'
        };
    }
    componentWillMount() {
        // axios.get(`http://localhost:3943/book/${this.props.params.id}`).then(res => res.data).then((data) => {
        //     this.state.Name = data[0].Author_Name;
        //     document.getElementById('body').innerHTML = this.state.Name;
        // })
    }

    render() {
        return (
            <div>
                <div id="body">
                    Loading
                </div>
                <div>{this.props.params.user}</div>
                <img src={require(`./bookimages/${this.props.params.id}.jpg`)}/>
            </div>
        )
    }
}

export default Book
