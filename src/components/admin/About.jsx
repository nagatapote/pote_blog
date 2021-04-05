import pote from "assets/img/pote.jpg";

export const About = () => {
  return (
    <div className="center">
      <h1>ぽてぶろぐ。について</h1>
      <div className="centerLeft">
        <div className="center">
          <h2>ぽてってどんな人？</h2>
          <img src={pote} width="200px" />
        </div>
        <p>
          見た目はこんな感じです。
          <br />
          だいたい笑ってるので真剣なときは怖い(サイコパス)と言われます。笑
          <br />
          趣味は、ボードゲームです。
          <br />
          仲良くしてくれる人は、以下をフォロー！
          <br />
          <li>
            <a target="_blank" href="https://twitter.com/pote_nagata">
              Twitter
            </a>
          </li>
          <li>
            <a target="_blank" href="https://github.com/nagatapote">
              GitHub
            </a>
          </li>
        </p>
        <div className="center">
          <h2>Skills</h2>
        </div>
        <p>最近のブーム</p>
        <li>React(HTML,CSS,TypeScript)</li>
        <li>Firebase(Hosting,Authentication,Firestore,Storage)</li>
        <p>興味あるもの(ちょっとだけ触れているもの)</p>
        <li>Nextjs(HTML,CSS,TypeScript)</li>
        <li>Nestjs(TypeScript)</li>
        <li>AWS</li>
        <li>GitHub Action</li>
        <p>このブログに関して</p>
        <li>React(HTML,CSS,JavaScript)</li>
        <li>React-Redux</li>
        <li>Material-UI</li>
        <li>Firebase(Hosting,Authentication,Firestore,Storage)</li>
        <p>仕事</p>
        <li>Linux</li>
        <li>LDAP</li>
        <li>OracleDB(SQL)</li>
        <li>Eclipse(Java)</li>
        <p>その他</p>
        <li>スマイル0円6年経験</li>
        <li>営業経験</li>
        <li>スライサーで牛肉と豚肉を切れたりもします。</li>
      </div>
      <div className="space-l" />
    </div>
  );
};
