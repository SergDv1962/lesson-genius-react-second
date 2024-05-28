import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
  return (
    <div className="box-text">
      <h2>Home</h2>
      <Link to={'/apptodo'} className="btn btn-start">START</Link>
      <p className="p-1">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum unde
        accusamus temporibus incidunt voluptatem quos molestiae! Ea, eveniet
        placeat quos suscipit alias distinctio vitae quaerat ducimus. Eum,
        excepturi. Molestiae, sint.
      </p>
      <p className="p-1">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio sequi,
        dolor aliquam deserunt ullam, possimus maxime neque ut facilis quibusdam
        labore velit, quidem magni corrupti ipsa? Molestias accusantium eaque
        ratione. Mollitia neque non atque ex blanditiis, eos itaque consequuntur
        iure quae qui. Magnam commodi temporibus quibusdam id ratione quia enim
        asperiores delectus laudantium? Numquam corporis facilis vitae quo sunt
        ex? Repudiandae consectetur debitis iste perferendis sunt minus expedita
        doloribus voluptatum assumenda adipisci ex odio facilis veniam
        doloremque ullam beatae possimus quasi officiis quidem odit quae cum,
        dolorum consequuntur? Totam, inventore? Aliquid voluptates commodi eius
        sapiente culpa corporis totam quis magnam odit omnis fugit aut ipsa
        magni in corrupti neque soluta quam, assumenda quod odio, porro dolor
        velit laborum nemo? Pariatur. Incidunt quibusdam recusandae, doloremque
        voluptatum at, amet porro et, ad esse earum voluptates est officiis sint
        laudantium minus vitae dolorem dolore temporibus. Eos, vitae. Debitis
        ipsam est quos totam. Earum.
      </p>
    </div>
  );
};

export default Home;
