import React, {useState, useRef} from 'react';
import Card from '../UI/Card'

import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

import classes from './AddUser.module.css';

const AddUser = props => {
const nameInputRef = useRef();
const ageInputRef = useRef();

const [error, setError] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    const nameValue = nameInputRef.current.value;
    const ageValue = ageInputRef.current.value;
    if (nameValue.trim().length === 0 || ageValue.trim().length === 0) {
      setError({
      title: 'Invalid Input', 
      message: 'Please enter a valid name and age (no empty values).'
    });
      return;
    }

    if (+ageValue < 1) {
      setError({
        title: 'Invalid Age', 
        message: 'Please enter a valid age (>0).'
      })
      return;
    }
    props.onAddUser(nameValue, ageValue);

    // this is okay becasue we are just changing what the user entered
    nameValue.current.value = '';
    ageValue.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
  <Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/> }
    <Card className={classes.input}>
    <form onSubmit={addUserHandler}>
      <label htmlFor='username'>Username</label>
      <input id='username' type='text' ref={nameInputRef} />
      <label htmlFor='age'>Age (years)</label>
      <input id='age' type='number' ref={ageInputRef} />
      <Button type='submit'>Add User</Button>
    </form>
    </Card>
  </Wrapper> 
  )
};

export default AddUser;