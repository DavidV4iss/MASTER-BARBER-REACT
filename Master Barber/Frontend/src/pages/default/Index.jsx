import React, { useState, useEffect } from "react";
import NavbarIndex from '../../Components/NavbarIndex'
import CarrouselShop from '../../Components/CarrouselShop'
import Calificaciones from '../../Components/Calificaciones'
import Darkandlight from "../../Components/Dark and light";
import axios from 'axios'

export default function Index() {
    const [theme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    // Efecto para aplicar la clase correspondiente al body según el tema
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const [barberos, setBarberos] = useState([]);
    
    useEffect(() => {
        const fetchBarberos = async () => {
            try {
                const res = await axios.get("http://localhost:8081/GetBarberos");
                setBarberos(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        }
        fetchBarberos()
    }, [])

    return (
        <div>
            <div><Darkandlight /></div>
            <NavbarIndex />

            <div className="img position-fixed top-50 start-50 translate-middle row h-100 col-1 col-sm-12"><img src="/LOGO.png" alt="" className='' /></div>
            <div className='container p-5 mt-5 table-responsive col col-sm-12' id='home'>

                <h1 className={`text-center display-1 anton fw-bold mt-5 pt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                    <small>TE DAMOS LA BIENVENIDA A</small> <p>MASTER BARBER VIP</p>
                  
                </h1>
                <ul className="nav-item">
                    <a className="nav-link active mt-5 fs-1 text-center pt-5">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-facebook m-5 text-white"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter m-5 text-white"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram m-5 text-white"></i>
                        </a>
                    </a>
                </ul>
                <h1 className="text-center antonparabackend fw-bold mt-5 pt-5">
                    <p>
                        <span className="text-danger">"DONDE LA BARBERIA </span>
                        <span className="text-warning">SE CONVIERTE EN ARTE"</span>
                        
                    </p>
                    
                </h1>
               
          
                <div className={`text-center mt-5 p-5 ${theme === "light" ? "dark" : "text-white"}`}>
          
                </div>
            
            </div>

            <div className="welcomeindex ">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12 col-sm-5 d-none d-sm-block">
                            <img src="/MB1.JPG" alt="" className='img-fluid' />
                        </div>
                        <div class="col-12 col-sm-7 text-center p-5">
                            <h2 className='welcome-2 text-danger anton display-1'>Sobre Nosotros</h2>
                            <p className={`pt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                                dolorem laborum corrupti est officiis magni,
                                soluta nemo nobis eligendi repellat id!
                            </p>
                        </div>
                    </div>
                </div>
            </div>




            <div className="welcome container" id='services'>
                <h1 className={`text-center display-1 anton  ${theme === "light" ? "dark" : "text-white"}`}>NUESTROS SERVICIOS</h1>
                <p className={`mt-5 p-5 pt-5 text-center ${theme === "light" ? "dark" : "text-white"}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                    dolorem laborum corrupti est officiis magni,
                    soluta nemo nobis eligendi repellat id!
                </p>
                <div className="row justify-content-center mt-5 pt-5">
                    <div class="row">
                        <div class="col w-50">
                            <div class="card h-100 bg-dark">
                                <div class="card-body">
                                    <div className="text-center">
                                        <img src="/LOGO.png" class="w-50" alt="..." />
                                    </div>
                                    <h5 class="card-title text-danger text-center bebas mt-2">Servicio 1</h5>
                                    <p class="card-text text-center text-white mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta at reprehenderit saepe debitis dolorum doloremque eligendi eveniet quis fuga nam, eos minima consequatur culpa ex, excepturi accusantium, doloribus illo laborum.</p>
                                    <div className="text-start">
                                        <button type="button" class="btn btn-outline-danger mt-5" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Ver</button>
                                    </div>
                                </div>
                                <div class="offcanvas offcanvas-start bg-dark" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                                    <div class="offcanvas-header">
                                        <h5 class=" mt-5 pt-5 text-warning anton" id="staticBackdropLabel">Servicio 1</h5>
                                        <button type="button" class="btn-close mb-5 bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body text-white">
                                        <div>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet ex eos pariatur voluptatibus porro nemo harum ducimus excepturi placeat sed illum, iusto dolore expedita minima, eaque nostrum. Rerum, architecto culpa.
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-white text-white">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                        <div class="col w-50">
                            <div class="card h-100 bg-dark">
                                <div className="text-center">
                                    <img src="/LOGO.png" class="w-50" alt="..." />
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title text-danger text-center bebas">Servicio 2</h5>
                                    <p class="card-text text-white text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut aspernatur excepturi quas qui sint recusandae! Doloribus, maiores cumque debitis at deserunt ullam corporis, veniam nesciunt sequi cupiditate delectus autem qui.</p>
                                    <div className="text-end">
                                        <button type="button" class="btn btn-outline-danger mt-5" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="staticBackdrop">Ver</button>
                                    </div>
                                </div>
                                <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title text-warning anton mt-5 pt-5" id="offcanvasRightLabel">Servicio 2</h5>
                                        <button type="button" class="btn-close mb-5 bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body text-white">
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur ratione itaque dicta, amet dolorem, ea repellat aut asperiores accusantium quasi explicabo eum ipsam inventore quia ullam culpa. Ad, ab culpa!</p>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <small class="text-body-white text-white">Last updated 3 mins ago</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






            <div className="welcome" id='prices'>
                <div className="container-fluid mt-5 pt-5">
                    <div className="row">
                        <div class="col-12 col-sm-8 text-center p-5 pt-5 mt-5">
                            <h2 className={`display-5 anton  ${theme === "light" ? "dark" : "text-white"}`}>Lista de precios</h2>
                            <p className={`mt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                                dolorem laborum corrupti est officiis magni,
                                soluta nemo nobis eligendi repellat id!
                            </p>
                            <div className="mt-5 pt-5">
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Corte Basico</p>
                                    <p className='text-warning mx-3 antonparabackend'>20.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Cejas</p>
                                    <p className='text-warning mx-3 antonparabackend'>5.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Figuras</p>
                                    <p className='text-warning mx-3 antonparabackend'>5.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Mascarillas</p>
                                    <p className='text-warning mx-3 antonparabackend'>25.0000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Barbas</p>
                                    <p className='text-warning mx-3 antonparabackend'>12.0000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Tintes</p>
                                    <p className='text-warning mx-3 antonparabackend'>Depende Del Tinte</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Corte Premium</p>
                                    <p className='text-warning mx-3 antonparabackend'>55.000</p>
                                </div>
                            </div>

                        </div>
                        <div class="row col-sm-4 col">
                            <img src="/MB2.JPG" alt="" className="d-none d-sm-block" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="welcome" id='barbers'>
                <h1 className={`text-center display-1 anton  ${theme === "light" ? "dark" : "text-white"}`}>CONOCE A NUESTROS ESTILISTAS</h1>
                <p className={`mt-5 p-5 pt-5 text-center ${theme === "light" ? "dark" : "text-white"}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                    dolorem laborum corrupti est officiis magni,
                    soluta nemo nobis eligendi repellat id!
                </p>
                <div className="container mt-5 pt-5">
                    <div class="row row-cols-1 row-cols-md-3">
                        {barberos.map((barbero) => (
                            console.log(barbero),
                            <div class="col" key={barbero.id_usuario}>
                                <div class="card bg-dark mt-5">
                                        <img src={`/images/imagesBarbero/${barbero.Foto}`} class="card-img-top img-fluid" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title text-danger text-center bebas fs-2 m-2">{barbero.nombre_usuario}</h5>
                                        <p class="card-text text-white text-center mt-3 m-3">{barbero.descripcion}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="welcome" id='shop'>
                <h1 className='text-center text-danger display-1 bebas'>¡¡MASTER SHOP!!</h1>
                <CarrouselShop />
            </div>

            <div className='welcome' id='turno'>
                <h1 className={`text-center display-1 bebas ${theme === "light" ? "dark" : "text-white"}`}>¿PORQUE RESERVAR CON NOSOTROS?</h1>

                <div className='container mt-5 p-5'>
                    <div class="accordion" id="accordionPanelsStayOpenExample">
                        <div class="accordion-item bg-dark">
                            <h2 class="accordion-header">
                                <button class="accordion-button bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                    Accordion Item #1
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show text-white">
                                <div class="accordion-body">
                                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                    Accordion Item #2
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse bg-dark text-white">
                                <div class="accordion-body">
                                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed bg-dark text-white" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Accordion Item #3
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse bg-dark text-white">
                                <div class="accordion-body">
                                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




            <div className="welcome" id='ubicacion'>
                <h1 className={`text-center display-1 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Donde Nos Puedes Ubicar</h1>
                <div className="container-fluid d-flex mt-5  justify-content-center">
                    <iframe class="map mt-5 mx-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.224597345888!2d-74.09438192628066!3d4.553574442918059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99e5c678c39f%3A0xe8d6bf03bd32ac11!2sMASTER%20BARBER%20VIP!5e0!3m2!1ses!2sco!4v1717791930339!5m2!1ses!2sco" height="560px"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    {/* <img src="/Ubicacion.JPG" alt="" className=' mx-auto map mt-5 col m-3' height="560px" /> */}
                </div>
            </div>
            

            <div className={`antonparabackend text-center pt-5 mt-5 ${theme === "light" ? "dark" : "text-white"}`} id='calificaciones'>
                <h1 className="display-1">LO QUE PIENSAN NUESTRO CLIENTES</h1>
                <div className="mt-5 pt-5"><Calificaciones /></div> 
            
            </div> 


            <footer className="mt-5">
                <p className={`text-center ${theme === "light" ? "dark" : "text-white"}`}>Copyright © 2022. Todos los derechos reservados. MASTER BARBER VIP </p>
            </footer>

        </div >


    )
}