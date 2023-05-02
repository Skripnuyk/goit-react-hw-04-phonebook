import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Span, Input, AddButton } from './ContactForm.styled';

function ContactForm({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');


 
  const onChangeName = evt => setName(evt.currentTarget.value);
  const onChangeNumber = evt => setNumber(evt.currentTarget.value);

  const onSubmitForm = evt => {
    evt.preventDefault();
    onSubmit({name, number});
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
 
  return (
      <Form onSubmit={onSubmitForm}>
        <Label>
          <Span>Name</Span>
          <Input
            onChange={onChangeName}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          <Span>Number</Span>
          <Input
            onChange={onChangeNumber}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default ContactForm;
