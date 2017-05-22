import React, { Component } from 'react'
import axios from 'axios'
import $ from 'JQuery'
import { Link } from 'react-router'
import style from './book.scss';
import { browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const customDialog = {
  width: '25%',
  maxWidth: 'none',
};


class Book extends Component {
  constructor() {
    super();

    this.state = {
      Name: 'Name',
      ID: 'ID',
      AuthorID: 'aID',
      Author: 'Author',
      FirstPublished: 'FP',
      Award: 'None',
      Genre: 'Genre',
      open: false,
    };
  }


  handleBorrow = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });

  };
  // componentWillMount() {
  //     // axios.get(`http://localhost:3943/book/${this.props.params.id}`).then(res => res.data).then((data) => {
  //     //     this.state.Name = data[0].Author_Name;
  //     //     document.getElementById('body').innerHTML = this.state.Name;
  //     // })
  // }
  componentWillMount() {

    injectTapEventPlugin();
    axios.get(`http://localhost:3943/book/${this.props.params.id}`).then(res => res.data).then((data) => {
      this.state.ID = data[0].Book_ID;
      this.state.Name = data[0].BookName;
      this.state.FirstPublished = data[0].FirstPublished;
      this.state.Author = data[0].authorName;
      for(var i=0;i<data.length;i++){
        this.state.Genre += data[i].Genre;
        if (i<data.length-1) this.state.Genre += ', ';
      }
      this.state.AuthorID = data[0].author_ID;
      document.getElementById('name').innerHTML = this.state.Name;
      document.getElementById('author').innerHTML = this.state.Author;
      document.getElementById('fp').innerHTML = this.state.FirstPublished;
      document.getElementById('genre').innerHTML = this.state.Genre;
      axios.get(`http://localhost:3943/bookAward/${this.props.params.id}`).then(res => res.data).then((data) => {
        if (data[0].AwardName != null){
          for(var i=0;i<data.length;i++){
            this.state.Award += data[i].AwardName + " " + data[i].Year;
            if (i<data.length-1) this.state.Award += ', ';
          }
        }

        document.getElementById('award').innerHTML = this.state.Award;
      })

    })

  }
  linkToAuthor() {

    browserHistory.push(`/${this.props.params.user}/author/${this.state.AuthorID}`);
  }

  borrowBook() {

    axios.post('http://localhost:3943/borrowBook',{
      user: this.props.params.user,
      bookID: this.state.ID
    }).then(res => res.data).then((data) => {

    })
    this.handleClose();
    window.location.href = "http://localhost:8080/" + this.props.params.user;
    // browserHistory.push(`/${this.props.params.user}/a`);
  }

  render() {

    const actions = [
      <RaisedButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onTouchTap={(e) => this.borrowBook(e)}
      />,
      <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={this.handleClose}
      />
    ];


    return (
      <div style={{marginTop: '80px'}}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <Paper zDepth={4} style={{opacity: '0.95'}}>
      <div className={style['container']}>
      <header className={style['title']}>
      <h1><div id="name">Loading</div></h1>
      </header>

      <img src={require(`./bookimages/${this.props.params.id}.jpg`)} style={{marginTop: '10px', marginLeft: '90px', float: 'LEFT'}} />

      <div style={{textAlign: 'center', fontSize: '20px', marginLeft: '290px'}}>
      Author <a onClick={(e) => this.linkToAuthor(e)} style={{color: 'white', textDecoration: 'underline'}}><div id="author" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div></a>
      FirstPublished <div id="fp" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      Award <div id="award" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      This Movie is about<div id="genre" style={{fontSize: '15px',marginTop: '10px', marginBottom: '10px'}}>Loading</div>
      </div>

      <RaisedButton
      onTouchTap={this.handleBorrow}
      label="Borrow"
      secondary={true}
      style={{marginLeft: '60px',marginRight: '15px', marginBottom: '15px', width: '80%'}}/>
      <Dialog
      title="Confirm"
      actions={actions}
      modal={false}
      contentStyle={customDialog}
      open={this.state.open}
      onRequestClose={this.handleClose}
      >
      Do you want to borrow this book ?
      </Dialog>
      </div>
      </Paper>




      </MuiThemeProvider>

      </div>




    )
  }
}

export default Book
