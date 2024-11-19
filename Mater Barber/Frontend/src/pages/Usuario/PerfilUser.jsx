import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PerfilUser() {
  return (
    <div className="">
      <div className="min-vh-100 align-content-center mx-5 justify-content-end">
        <div className="container p-sm-5  border border-2 shadow border-white rounded-4 ">
          <a href="/IndexUser">
            <i className="bi bi-arrow-left-circle-fill text-white fs-2"></i>
          </a>
          <div className="row justify-content-center align-items-center">
            <div className="col col-lg-6 bi-text-lg-center ">
              <i className="bi bi-person-circle icono mt-5"></i>
            </div>
            <div className="col-12 col-lg-6 container">
              <h1 className="text-warning text-center anton mb-4">¡Perfil!</h1>

              <form className="row g-1 mb-5">
                <div className="mb-1 row">
                  <label
                    for="staticNombre"
                    className="col-sm-2 col-form-label text-white antonparabackend"
                  >
                    Nombre:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      readonly
                      className="form-control-plaintext text-white antonparabackend "
                      id="staticEmail"
                      value="SAYAAAA"
                    />
                  </div>
                </div>
                <div className="form-floating mb-3 mx-2">
                  <input
                    type="text"
                    className="form-control bg-dark text-white mt-2"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput" className="text-dark">
                    Nombre
                  </label>
                </div>
                <div className=" container row mt-3">
                  <p className="text-white antonparabackend">
                    Actualzar Foto De Perfil
                  </p>
                  <div className="input-group">
                    <input
                      type="file"
                      className="form-control bg-dark text-white"
                      id="inputGroupFile04"
                      aria-describedby="inputGroupFileAddon04"
                      aria-label="Upload"
                    />
                    <button
                      className="btn btn-outline-danger mx-1"
                      type="button"
                      id="inputGroupFileAddon04"
                    >
                      Actualizar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
