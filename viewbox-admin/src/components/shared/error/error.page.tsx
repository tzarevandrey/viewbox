type TProps = {
  message?: string;
}

export const Error = ({ message }: TProps) => {

  const name = message ?? 'Произошла ошибка';

  return (
    <div>
      <div>{name}</div>
      <div>Попробуйте зайти в приложение позже или обратитесь в техническую поддержку</div>
    </div>
  )
}