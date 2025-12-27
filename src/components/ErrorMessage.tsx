interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#ff6b6b',
          marginBottom: '16px',
        }}
      >
        Ошибка загрузки данных
      </div>
      <div
        style={{
          fontSize: '16px',
          color: '#666',
          maxWidth: '500px',
        }}
      >
        {message}
      </div>
      <div
        style={{
          fontSize: '14px',
          color: '#999',
          marginTop: '24px',
        }}
      >
        Пожалуйста, проверьте подключение к интернету и попробуйте обновить страницу.
      </div>
    </div>
  );
}

export default ErrorMessage;
