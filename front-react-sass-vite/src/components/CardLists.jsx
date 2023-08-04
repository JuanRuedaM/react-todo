import PropTypes from 'prop-types'

function CardLists ({ store, TodoCard, handleDelete }) {
  return (
    (store.length != 0) ? (
      store.map((todoD) => {
        return (
          <div key={todoD.id}>
            <TodoCard title={todoD.title} id={todoD.id} handleDelete={handleDelete} />
          </div>
        )
      })
    ) : (<h1>All done</h1>)

  )
}

export default CardLists

CardLists.propTypes = {
  store: PropTypes.any,
  TodoCard: PropTypes.any,
  handleDelete: PropTypes.any,
}