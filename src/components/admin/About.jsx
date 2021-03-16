import pote from "assets/img/pote.jpg";

export const About = () => {
  return (
    <div className="center">
      <h1>ぽてぶろぐ。について</h1>
      <div className="centerLeft">
        <div>
          <h2>ぽて</h2>
          <img src={pote} width="300px" />
          <p>*本文*</p>
        </div>
      </div>
      <div className="space-l" />
    </div>
  );
};
