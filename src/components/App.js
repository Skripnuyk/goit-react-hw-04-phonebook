import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { GlobalStyle } from './GlobalStyled';
import { AppWrap, AppTitle, SecondTitle } from './App.styled';
import ContactForm from './contactForm';
import Filter from './filter';
import ContactList from './contactList'
import data from '../data/data.json'



function App() {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(localStorage.getItem('contacts')) ?? data
      )
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const newContact = { id: nanoid(), name, number };
    
    contacts.some(contact => contact.name === name)
      ? Report.warning(
          `${name}`,
          'This user is already in the contact list.',
          'OK'
        )
      : setContacts(contacts => [newContact, ...contacts]);
  };

  const deleteContact = contactId => {
    setContacts(contacts => 
      contacts.filter(contact => contact.id !== contactId),);
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

    return (
      <AppWrap>
        <AppTitle>Phonebook</AppTitle>
        <ContactForm onSubmit={addContact} />
        <SecondTitle>Contacts</SecondTitle>
        <Filter filter={filter} changeFilter={changeFilter} />
        <ContactList
          contacts={filtredContacts()}
          onDeleteContact={deleteContact}
        />
        <GlobalStyle />
      </AppWrap>
    );
  };

export default App;