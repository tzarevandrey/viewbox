import './card.css';

type TProps = {
  Title: React.ReactNode;
  Body: React.ReactNode;
  isHoverable?: boolean;
}

export const CardTitled = ({ Title, Body, isHoverable = false }: TProps) => {
  return (
    <div className='base-card base-card_hoverable'>
      <div></div>
    </div>
  )
}