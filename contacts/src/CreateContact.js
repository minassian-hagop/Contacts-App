import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ImageInput from './ImageInput.js';
import serializeForm from 'form-serialize';

class CreateContact extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        if(this.props.onCreateContact)
            this.props.onCreateContact(values);
    }

    render(){
        return(
            <div>
                <Link className='close-create-contact' to='/'>Close</Link>
                <form onSubmit={this.handleSubmit} className='create-contact-form'>
                    <ImageInput 
                        className='create-contact-avatar-input'
                        maxHeight={64}
                        name='avatarURL'
                    />
                    <div className="create-contact-details">
                        <input type="text" name="name" placeholder="Name" />
                        <input type="text" name="email" placeholder="E-Mail" />
                        <button>Add Contact</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateContact;