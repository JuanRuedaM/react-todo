import PropTypes from 'prop-types'

function Form ({ handleSubmit, handleChange, inputValue }) {
  return (
    <>
      <h1 className='title-app'>Todo React App</h1>
      <form onSubmit={handleSubmit}>
        <input className='send-input' type="text" placeholder='Write todo task' onChange={handleChange} value={inputValue} autoFocus />
        <button className='send-button'>
          Save
        </button>
      </form>
    </>

  )
}

export default Form

Form.propTypes = {
  handleSubmit: PropTypes.any,
  handleChange: PropTypes.any,
  inputValue: PropTypes.any
}