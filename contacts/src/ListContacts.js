import React from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import {Link} from 'react-router-dom';

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim()
        });
    }

    resetQuery = () => {
        this.setState({
            query: ''
        })
    }
    
    render(){
        let showContacts;
        const {query} = this.state;
        const {contacts, onDelete} = this.props;

        if(query){
            const match = new RegExp(escapeRegExp(query), 'i');
            showContacts = contacts.filter((contact)=> match.test(contact.name));
        }else{
            showContacts = contacts;
        };

        showContacts.sort(sortBy('name'));

        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to='/create'
                        className='add-contact'
                    >
                        Add Contact
                    </Link>
                </div>

                {
                    showContacts.length !== contacts.length && 
                    (
                        <div className='showing-contacts'>
                            <span>Showing {showContacts.length} of {contacts.length} total</span>
                            <button onClick={()=>this.resetQuery()}>See all</button>
                        </div>
                    )
                }

                <ol className='contact-list'>
                    {showContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}></div>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDelete(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        );
    }
}

export default ListContacts;