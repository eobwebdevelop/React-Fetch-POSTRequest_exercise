import React, { Component } from "react";
import './App.css';



class FilmRecorder extends Component{
            
    // We start by initializing our component with a state, and create the binds method to prevent this from losing its context.
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        poster: '',
        comment: '',
      }
      this.onChange = this.onChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
    }
    

    //   Then we are going to create our onChange method enabling us to update the controlled fields in our form.

    onChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    //   In order to manually manage the form dispatch, we will have to “deactivate” the behavior of the browser
    //    when submitting the form. Then we’ll create our onSubmit method,
    //    which will be called in by the form. (see "preventDefault" document in the ‘Resources’ section)

    submitForm(e) {
        e.preventDefault();
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        };
        const url = "https://post-a-form.herokuapp.com/api/movies/";
    
        fetch(url, config)
        .then(res => res.json())
          .then(res => {
            if (res.error) {
              alert(res.error);
            } else {
              alert(`The film has been added successfully ${res}!`);
            }
          }).catch(e => {
            console.error(e);
            alert("Error during the addition");
          });
      }
      

      render(){
      
          return(
          <>
            <div className="FormEmployee">
            <h1> Film Recorder</h1>
            <form onSubmit={this.submitForm}>
              <fieldset>
                <legend>Information</legend>
                <div className="form-data">
                  <label htmlFor="title">Title </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={this.onChange}
                    value={this.state.title}
                    required
                  />
                </div>
          
                <div className="form-data">
                  <label htmlFor="poster">URL </label>
                  <input
                    type="text"
                    id="poster"
                    name="poster"
                    onChange={this.onChange}
                    value={this.state.poster}
                    required
                  />
                </div>
          
                <div className="form-data">
                  <label htmlFor="comment">Comment </label>
                  <textarea
                    type="text"
                    id="comment"
                    name="comment"
                    onChange={this.onChange}
                    value={this.state.comment}
                    placeholder="why do you like this film?"
                    required
                  />
                </div>
                <hr />
                <div className="form-data">
                  <input type="submit" value="Send" onClick={this.handlerSumbit}/>
                </div>
              </fieldset>
            </form>
          </div>
          </>
          )
      }

}




export default FilmRecorder;