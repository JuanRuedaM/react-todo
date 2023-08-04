import PropTypes from 'prop-types'

function AlertText ({ conditionalRendering }) {
  return (
    !conditionalRendering ? (<p className='alert-text'>Write some text please</p>) : (<p className='alert-text'></p>)
  )
}

export default AlertText

AlertText.propTypes = {
  conditionalRendering: PropTypes.any,
}