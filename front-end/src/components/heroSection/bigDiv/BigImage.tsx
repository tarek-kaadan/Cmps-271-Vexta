import GradientCard from '../gameTitle';
import { useNavigate } from 'react-router-dom';

interface Props {
  name: string;
  image: string;
  link: string;
}

export default function BigImage({ name, image }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/title/${name}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '600px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingBottom: '4rem',
        boxSizing: 'border-box',
      }}
    >
      <GradientCard name={name} onClick={handleClick} />
    </div>
  );
}
