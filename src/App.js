import React, { useState } from 'react';

const style = {
  body: {
    width: "100%",
    heigth: "100vh"
  },
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm(props) {
  const { addEntryToPhoneBook, err } = props
  const [input, setInput] = useState(null)
  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }
  return (
    <form onSubmit={e => addEntryToPhoneBook(e, input)} onChange={e => handleChange(e)} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
      />
      <br />
      {err}
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
      />
    </form>
  )
}

function InformationTable(props) {
  const { inputs } = props
  return (
    <div>
      <p>Please add a new contact</p>
    <table style={style.table} className='informationTable'>
      <thead>
        {inputs && inputs.sort(function (a, b) {
          return a.userLastname < b.userLastname ? -1 : 1;
        }).map((input, index) =>
          <tr key={index}>
            <th style={style.tableCell}>{input.userFirstname}</th>
            <th style={style.tableCell}>{input.userLastname}</th>
            <th style={style.tableCell}>{input.userPhone}</th>
          </tr>
        )}
      </thead>
    </table>
    </div>
  );
}

function App(props) {
  const [inputArray, setInputArray] = useState([])
  const [err,setErr] = useState("")
  const addEntryToPhoneBook = (e, input) => {
    e.preventDefault();
    console.log(input)
    if(input) {
      setInputArray([...inputArray, input])
      setErr("")
    } else {
      setErr("Please enter something")
    }
  }
  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} err={err} />
      <InformationTable inputs={inputArray} />
    </section>
  );
}

export default App