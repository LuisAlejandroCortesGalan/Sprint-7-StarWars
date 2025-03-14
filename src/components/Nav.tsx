import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function Nav() {
  return (
    <div className="d-flex justify-content-center align-items-center nav-div p-0 m-0 p-sm-1 m-sm-1">
      <ul className="nav nav-underline p-1" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link fs-6"
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            HOME
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active fs-6"
            id="pills-starships-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-starships"
            type="button"
            role="tab"
            aria-controls="pills-starships"
            aria-selected="false"
          >
            STARSHIPS
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
