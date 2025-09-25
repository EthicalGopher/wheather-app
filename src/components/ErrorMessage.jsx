import './ErrorMessage.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">
        <img src="/assets/images/icon-error.svg" alt="Error" />
      </div>
      <h3>Oops! Something went wrong</h3>
      <p>{message}</p>
      <button className="retry-button" onClick={onRetry}>
        <img src="/assets/images/icon-retry.svg" alt="Retry" />
        Try again
      </button>
    </div>
  )
}

export default ErrorMessage