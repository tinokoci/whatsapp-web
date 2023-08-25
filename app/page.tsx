import { NextPage } from "next";

const Home: NextPage = () => (
  <>
    <div></div> {/*Boja iza aplikacije zelena sa abslute*/}
    <div>
      {/*Glavni div*/}
      <div className="flex">
        <div>
          <div>User bar</div> {/*User bar*/}
          <div>Kontakti</div> {/*Svi kontakti*/}
        </div>
        {/*Left menu*/}
        <div>Desni menu</div> {/*Right menu*/}
      </div>
    </div>
  </>
);

export default Home;
