import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
  image: string;
  rating: number;
}

export default function Card({ title, description, image, rating }: Props) {
  return (
    <Link
      to={`/games/title/${title}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid hsl(0, 0%, 80%)',
        width: '300px',
        height: '300px',
        boxShadow: '5px 5px 5px hsla(0, 0%, 0%, 0.056)',
        borderRadius: '10px',
        transition: 'transform 0.3s ease-in-out',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={image}
        alt="Game Picture"
        style={{
          height: '150px',
          width: '100%',
          borderRadius: '9px 9px 0px 0px',
          display: 'block',
          objectFit: 'cover',
        }}
      />
      <h2
        style={{
          paddingLeft: '10px',
          paddingTop: '10px',
          fontSize: '150%',
          textAlign: 'left',
        }}
      >
        {title}
      </h2>

      <div
        style={{
          position: 'absolute',
          top: '160px',
          right: '10px',
          height: '30px',
          width: '75px',
          border: '1.5px solid hsl(0, 0%, 80%)',
          boxShadow: '2px 2px 2px hsla(0, 0%, 0%, 0.056)',
          borderRadius: '9px',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: '13px',
            lineHeight: '1',
          }}
        >
          ⭐ {rating}
        </p>
      </div>

      <p
        style={{
          paddingLeft: '10px',
          textAlign: 'left',
        }}
      >
        {description}
      </p>
    </Link>
  );
}
