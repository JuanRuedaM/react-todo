import PropTypes from 'prop-types'

function TodoCard ({ title = 'Titulo', id, handleDelete }) {
  return (
    <div className='todo-card'>
      <h1>
        {title}
      </h1>

      <div className='delete-btn'>
        <button onClick={() => handleDelete(id)}>
          <img src="/check.png" alt="Check Button" srcSet="" />
        </button>
      </div>
    </div>
  )
}

export default TodoCard

TodoCard.propTypes = {
  title: PropTypes.string,
  id: PropTypes.any,
  handleDelete: PropTypes.any
}