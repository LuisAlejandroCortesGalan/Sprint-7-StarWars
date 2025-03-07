import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

function Nav() {
  return (
    <div className="d-flex justify-content-center align-items-center nav-div pt-3">
      <ul className="nav nav-underline mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
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
            className="nav-link active"
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
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="pills-films-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-films"
            type="button"
            role="tab"
            aria-controls="pills-films"
            aria-selected="false"
          >
            FILMS
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
