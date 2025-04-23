import bgImage from "/images/Background.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 20px;

  @media (min-width: 768px) {
    gap: 40px;
    padding: 40px;
  }

  @media (min-width: 1201px) {
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`;

const CardStyles = `
  height: 200px;
  min-height: 250px;
  width: 90%;
  max-width: 700px;
  border-radius: 15px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const Card = styled.div`
  ${CardStyles}
  background-color: #1f2937;
`;

const Card2 = styled.div`
  ${CardStyles}
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: clamp(20px, 5vw, 25px);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: clamp(13px, 3.5vw, 15px);
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
  line-height: 1.5;
`;

export default function Culture() {
  return (
    <section>
      <Container>
        <Card>
          <Title>More Than Just Games</Title>
          <Text>
            Traditional games often serve multiple purposes in their cultures -
            from religious rituals to military training, social bonding to
            political symbolism.
          </Text>
          <Text>
            Many games were originally designed to teach important life skills
            or values central to the culture's worldview.
          </Text>
        </Card>

        <Card2>
          <Title>Preservation of Heritage</Title>
          <Text>
            As globalization spreads, many traditional games risk being
            forgotten. Organizations worldwide are working to preserve these
            cultural treasures.
          </Text>
          <Text>
            Some games have evolved into modern sports while maintaining their
            cultural roots.
          </Text>
        </Card2>
      </Container>
    </section>
  );
}
