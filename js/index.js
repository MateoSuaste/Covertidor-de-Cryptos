//Asignacion de las constantes

const crypto = document.querySelector("#crypto1");
const crypto_1 = document.querySelector("#crypto2");
const cantidad1 = document.getElementById("cantidad1");
const cantidad2 = document.getElementById("cantidad2");
const btnConvertir = document.getElementById("convertir");
const btnCambio = document.getElementById("taza");
const divCambio = document.getElementById("cambio");

const getValue = (json) => {
  for (const key in json) {
    if (Object.hasOwnProperty.call(json, key)) {
      const element = json[key];
      cantidad2.value = (element * cantidad1.value).toFixed(5); 
    }
  }
};

//Fetch
function convertir() {
  const crypto1 = crypto.value;
  const crypto2 = crypto_1.value;

  fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=${crypto1}&tsyms=${crypto2}`
  )
    .then((res) => res.json())
    .then((data) => {
      dataJson = JSON.stringify(data);
      getValue(data)
     
      
      
    });
}

//Eventos
function presionar() {
  let enter = event.keyCode;

  enter == 13 && convertir();
}

//Lista de eventos
btnConvertir.addEventListener("click", convertir);
document.addEventListener("keydown", presionar);
btnCambio.addEventListener('click', ()=>{
  const provisoria = crypto1.value;
  crypto1.value = crypto2.value;
  crypto2.value = provisoria;
  convertir();
})



//constantes inisio de sesion

const inicioSesion = document.querySelector("#inicioSesion");
const registro = document.querySelector("#registro");

//function registrarse

let Base = [];

const getBase = () => {
  if (
    localStorage.getItem("baseDeDatos") != "undefined" &&
    localStorage.getItem("baseDeDatos") != null
  ) {
    return JSON.parse(localStorage.getItem("baseDeDatos"));
  }
  return [];
};

const setBase = () => {
  localStorage.setItem("baseDeDatos", JSON.stringify(Base));
};

//Funcion Registrarse
async function registrarse() {
  let validarEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let { value: registroForm } = await Swal.fire({
    title: "Registro",
    confirmButtomText: "Registrarse",
    showCancelButton: true,
    html:
      '<input id="email" type="email" class="swal2-input registro" placeholder="Email" name="email">' +
      '<input id="contrasenia" class="swal2-input registro1" placeholder="Contraseña"  type="password" name="contrasenia">',
    preConfirm: () => {
      (email = document.querySelector("#email").value),
        (contrasenia = document.querySelector("#contrasenia").value);

      //FUNCION AGREGAR USUARIO
      function agregarUser() {
        Base = getBase();
        let validarEmailUsado = Base.find((user) => {
          return user.Email == email;
        });
        if (validarEmailUsado) {
          swal.showValidationMessage("Email ya registrado");
          return false;
        }
        let newUser = {
          Email: email,
          Contrasenia: contrasenia,
        };
        Base.push(newUser);
        setBase(Base);
        console.log("usuario agregado");
        swal.fire({
          icon: "success",
          title: "Usuario Registrado con Exito",
          text: "Para continuar Inicie Sesion",
          confirmButtomText: "OK",
        });
      }

      if (!validarEmail.test(email)) {
        swal.showValidationMessage("Email invalido");
        return false;
      }
      if (contrasenia.length < 8) {
        swal.showValidationMessage(
          "La contraseña debe tener mas de 8 caracteres"
        );
        return false;
      } else {
        agregarUser();
      }
    },
  });
}

//EVENTO DE REGISTRO
registro.addEventListener("click", registrarse);

//FUNCION LOGIN
async function iniciarSesion() {
  let validarEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  let { value: sesionForm } = await Swal.fire({
    title: "Iniciar Sesion",
    confirmButtomText: "Iniciar Sesion",
    showCancelButton: true,
    html:
      '<input id="email" type="email" class="swal2-input" placeholder="Email" name="email">' +
      '<input id="contrasenia" class="swal2-input" placeholder="Contraseña"  type="password" name="contrasenia">',
    preConfirm: () => {
      (email = document.querySelector("#email").value),
        (contrasenia = document.querySelector("#contrasenia").value);

      //FUNCION VALIDAR USUARIO
      function validarUserLogin() {
        let validarEmailUsado = Base.find((user) => {
          return user.Email == email;
        });
        let validarPassUsada = Base.find((user) => {
          return user.Contrasenia == contrasenia;
        });
        if (validarEmailUsado && validarPassUsada) {
          window.location = "./pages/index2.html";
        } else {
          swal.showValidationMessage("Email o Contraseña incorrectos");
          return false;
        }
      }

      if (!validarEmail.test(email)) {
        swal.showValidationMessage("Email invalido");
        return false;
      }
      if (contrasenia.length < 8) {
        swal.showValidationMessage(
          "La contraseña debe tener mas de 8 caracteres"
        );
        return false;
      } else {
        validarUserLogin();
      }
    },
  });
}

//evento inicio de sesion
inicioSesion.addEventListener("click", iniciarSesion);
