$(document).ready(function() {
    //localStorage.clear();
    // Constantes de los ID de los botones principales
    const menuPpal = $("#Menu");
    const menuAdd = $("#IDJugador");
    const menuLogin = $("#InicioSesion");
    const menuSearch = $("#SearchPlayer");
    const menuScoreBoard = $("#ScoreBoard1");
    const buscarPuntaje = $("#buscarPuntaje");
    const crearJug = $("#crearJug");
    const logIn = $("#logIn");
    const searchJug = $("#searchJug");

    // Variables de clase
    var Jugadores = JSON.parse(localStorage.getItem("Jugador")) || [];
    console.log(Jugadores);

    // Click listeners para cada pantalla
    $("#adicionarJug").click(function() {
        MostrarCosas(menuAdd);
        OcultarCosas(menuPpal);
        $("#Nombjug").focus();

        $(crearJug).off().click(function() {
            CrearJugador();
        });

        $("#regresarAdd").click(function() {
            LimpiaFormulario($("#FJ"));
            MostrarCosas(menuPpal);
            OcultarCosas(menuAdd);
        });
    });

    $("#iniciarSesion").click(function() {
        MostrarCosas(menuLogin);
        OcultarCosas(menuPpal);
        $("#AJUGa").focus();

        $(logIn).off().click(function() {
            PassValidation();

            $("#comprarJueg").click(function() {
                MostrarCosas($("#IDJuego"));
                OcultarCosas($("#MenuJugador"));

                $("#registroComp").off().click(function() {
                    CrearJuego();
                });

                $("#regresarComp").click(function() {
                    LimpiaFormulario($("#IJ"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#IDJuego"));
                });
            });
            $("#registroPuntj").click(function() {
                MostrarCosas($("#IDPuntaje"));
                OcultarCosas($("#MenuJugador"));

                $("#puntaje").off().click(function() {
                    RegistrarPuntaje();
                });

                $("#regresarPuntj").click(function() {
                    LimpiaFormulario($("#FPUN"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#IDPuntaje"));
                });
            });
            $("#mostrarBibl").click(function() {
                MostrarCosas($("#BibliotecaJuegos"));
                OcultarCosas($("#MenuJugador"));

                $("#BTNBuscar").off().click(function() {
                    BorrarTablita();
                    Buscar();
                    //LimpiaFormulario($("#FBNK"));
                });

                $("#regresarBibl").click(function() {
                    BorrarTablita();
                    LimpiaFormulario($("#FBNK"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#BibliotecaJuegos"));
                    OcultarCosas($("#TablitaChingona"));
                });
            });
            $("#verCompras").click(function() {
                MostrarCosas($("#ComprasRango"));
                OcultarCosas($("#MenuJugador"));

                $("#BTNBuscar1").click(function() {
                    BorrarTablita2;
                    BuscarRF();
                    LimpiaFormulario($("#RF"));
                });

                $("#regresarCompras").click(function() {
                    BorrarTablita2();
                    LimpiaFormulario($("#RF"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#ComprasRango"));
                    OcultarCosas($("#TablitaChingona2"));
                });
            });
            $("#back2LogIn").click(function() {
                MostrarCosas(menuLogin);
                OcultarCosas($("#MenuJugador"));
            });
        });

        $("#regresarLogIn").click(function() {
            LimpiaFormulario($("#IS"));
            MostrarCosas(menuPpal);
            OcultarCosas(menuLogin);
        });
    });

    $("#buscarJugador").click(function() {
        MostrarCosas(menuSearch);
        OcultarCosas(menuPpal);
        $("#SNK").focus();

        $(searchJug).off().click(function() {
            SearchPlayer();
        });

        $("#regresarBusc").click(function() {
            LimpiaFormulario($("#FNK"));
            MostrarCosas(menuPpal);
            OcultarCosas(menuSearch);
        });
    });

    $("#puntajes").click(function() {
        MostrarCosas(menuScoreBoard);
        OcultarCosas(menuPpal);
        $("#CD").focus();

        $(buscarPuntaje).off().click(function() {
            ScoreBoard();
        });
        $("#regresarSC").click(function() {
            LimpiaFormulario($("#SCC"));
            MostrarCosas(menuPpal);
            OcultarCosas(menuScoreBoard);
        });
    });

    // Metodos para crear un nuevo objeto de tipo jugador
    function CrearJugador() {
        if (validarFormCrear() == true) {
            var existe = false;
            for (var vc = 0; vc < Jugadores.length; vc = vc + 1) {
                var jug = Jugadores[vc].Alias;
                if (jug.localeCompare($("#Nick").val()) == 0) {
                    $("#Nick").css("border", "1px solid red");
                    errorMsg("Nick Name ya existente, intenta con uno nuevo");
                    existe = true;
                }
            }
            if (existe == false) {
                newPlayer($("#Nombjug").val(), $("#DocID").val(), $("#Direcc").val(), $("#EM").val(), $("#Nick").val(), $("#Pass").val());
            }
        }
    }

    function newPlayer(Nombre, id, direccion, eMail, Nick, password) {
        if ((Nombre === "") || (id === "") || (direccion === "") || (eMail === "") || (Nick === "") || (password === "")) {
            errorMsg("Ingresa tus datos en las casillas correspondientes");
        } else {
            var jugador = {
                "Nombre": Nombre,
                "DI": id,
                "Direccion": direccion,
                "Mail": eMail,
                "Alias": Nick,
                "Pass": password,
                "Games": JSON.parse(localStorage.getItem("Juego")) || []
            };
            Jugadores.push(jugador);
            localStorage.setItem("Jugador", JSON.stringify(Jugadores));

            swal("Jugador creado", ("Jugador " + $("#Nombjug").val() + " agregado correctamente"), "success");

            LimpiaFormulario($("#FJ"));
            MostrarCosas(menuPpal);
            OcultarCosas(menuAdd);
        }
    }

    function validarFormCrear() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingresa tus datos en las casillas correspondientes");
                if (rowDatos == $("#Nombjug").val()) {
                    $("#Nombjug").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa un nombre");
                }
                if (rowDatos == $("#DocID").val()) {
                    $("#DocID").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa un ID");
                }
                if (rowDatos == $("#Direcc").val()) {
                    $("#Direcc").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa una direccion");
                }
                if (rowDatos == $("#EM").val()) {
                    $("#EM").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa un e-Mail");
                }
                if (rowDatos == $("#Nick").val()) {
                    $("#Nick").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa un Nick Name");
                }
                if (rowDatos == $("#Pass").val()) {
                    $("#Pass").css("border", "1px solid red");
                    error = true;
                    //errorMsg("Ingresa una contraseña");
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo para agregar un juego
    function CrearJuego() {
        if (validarFormComprar() == true) {
            var existe = false;
            for (var VC1 = 0; VC1 < Jugadores.length; VC1 = VC1 + 1) {
                var jugador = Jugadores[VC1];
                var juegos = jugador.Games;
                if (jugador.Alias.localeCompare($("#NICKVAL").val()) == 0) {
                    for (var i = 0; i <= juegos.length; i = i + 1) {
                        var posJueg = juegos[i];
                        if (posJueg != null) {
                            if (posJueg.ID === parseInt($("#CodJuego").val())) {
                                console.log("hola codigo igual");
                                $("#CodJuego").css("border", "1px solid red");
                                errorMsg("Este codigo de juego ya se encuentra en uso, intenta con uno nuevo");
                                existe = true;
                            }
                        }
                    }
                    if (existe == false) {
                        console.log("hola");
                        newGame($("#NombJueg").val(), parseInt($("#CodJuego").val()), $("#FDC").val(), jugador);
                    }
                }
            }
        }
    }

    function newGame(Nombre, Codigo, Fecha, jugador) {
        if ((Nombre === "") || (Codigo === "") || (Fecha === "")) {
            errorMsg("Ingresa tus datos en las casillas correspondientes");
        } else {
            var juego = {
                "Name": Nombre,
                "ID": Codigo,
                "ADDate": Fecha,
                "Scores": JSON.parse(localStorage.getItem("PuntajeJuego")) || []
            };
            jugador.Games.push(juego);
            localStorage.setItem("Juego", JSON.stringify(jugador.Games));
            localStorage.setItem("Jugador", JSON.stringify(Jugadores));
            console.log("Juego agregado: " + juego);

            swal("Compra", "La compra del juego " + juego.Name + " ha sido registrada exitosamente", "success");

            LimpiaFormulario($("#IJ"));
            MostrarCosas($("#MenuJugador"));
            OcultarCosas($("#IDJuego"));
        }
    }

    function validarFormComprar() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingresa tus datos en las casillas correspondientes");
                if (rowDatos == $("#NICKVAL").val()) {
                    $("#NICKVAL").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#NombJueg").val()) {
                    $("#NombJueg").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#CodJuego").val()) {
                    $("#CodJuego").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#FDC").val()) {
                    $("#FDC").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo que registra el puntaje de un jugador en un juego
    function RegistrarPuntaje() {
        console.log("hola reg");
        if (validarFormPunt() == true) {
            var existe = false;
            console.log("hola");
            for (var B = 0; B < Jugadores.length; B = B + 1) {
                console.log("hola1");
                if (Jugadores[B].Alias.localeCompare($("#NICKVAL1").val()) == 0) {
                    console.log("hola2");
                    for (var C = 0; C < Jugadores[B].Games.length; C = C + 1) {
                        console.log("hola3");
                        if ((Jugadores[B].Games[C].ID) == (parseInt($("#CDJ").val()))) {
                            console.log("hola4");
                            newPunt(parseInt($("#PUNJ").val()), $("#FDP").val(), Jugadores[B].Games[C]);
                        }
                    }
                }
            }
        }
    }

    function newPunt(Puntaje, Fecha, juego) {
        if ((Puntaje === "") || (Fecha === "")) {
            errorMsg("Ingresa tus datos en las casillas correspondientes");
        } else {
            var puntaje = {
                "PuntajeF": Puntaje,
                "GameDate": Fecha
            };
            juego.Scores.push(puntaje);
            localStorage.setItem("Puntaje", JSON.stringify(juego.Scores));
            localStorage.setItem("Juego", JSON.stringify(juego));
            localStorage.setItem("Jugador", JSON.stringify(Jugadores));
            console.log("Puntaje agregado: " + puntaje);

            swal("Agregar Puntaje", "El puntaje: " + $("#PUNJ").val() + " del juego: " + juego.Name + " fue registrado exitosamente", "success");

            LimpiaFormulario($("#FPUN"));
            MostrarCosas($("#MenuJugador"));
            OcultarCosas($("#IDPuntaje"))
        }
    }

    function validarFormPunt() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingresa tus datos en las casillas correspondientes");
                if (rowDatos == $("#NICKVAL1").val()) {
                    $("#NICKVAL1").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#CDJ").val()) {
                    $("#CDJ").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#PUNJ").val()) {
                    $("#PUNJ").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#FDP").val()) {
                    $("#FDP").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo para realizar la validacion de la contraseña en el login
    function PassValidation() {
        if (validarLogIn() == true) {
            for (var vc = 0; vc < Jugadores.length; vc = vc + 1) {
                if ($("#AJUGa").val().localeCompare(Jugadores[vc].Alias) == 0) {
                    if (Jugadores[vc].Pass.localeCompare($("#Passw").val()) == 0) {
                        swal("Log-In exitoso", ("Bienvenido: " + Jugadores[vc].Alias), "success");
                        LimpiaFormulario($("#IS"));
                        OcultarCosas(menuLogin);
                        MostrarCosas($("#MenuJugador"));
                        $("#Nom").text(Jugadores[vc].Nombres);
                        $("#DMT").text(Jugadores[vc].DI);
                        $("#EMa").text(Jugadores[vc].EMail);
                        $("#NCK").text(Jugadores[vc].Alias);
                    }
                    /*else {
                                           errorMsg("Contraseña incorrecta");
                                       }*/
                }
                /*else {
                                   errorMsg("Usuario incorrecto");
                               }*/
            }
        }
    }

    function validarLogIn() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingresa tus datos en las casillas correspondientes");
                if (rowDatos == $("#AJUGa").val()) {
                    $("#AJUGa").css("border", "1px solid red");
                    error = true;
                }
                if (rowDatos == $("#Passw").val()) {
                    $("#Passw").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo para buscar la biblioteca de un jugador
    function Buscar() {
        if (validarBusqB() == true) {
            $("#BTNBuscar").prop("disables", true);
            $("#BLNK").prop("disables", true);

            for (var i = 0; i < Jugadores.length; i = i + 1) {
                if (Jugadores[i].Alias.localeCompare($("#BLNK").val()) == 0) {
                    $("#BD").text(Jugadores[i].Alias);
                    for (var j = 0; j < Jugadores[i].Games.length; j = j + 1) {
                        MostrarCosas($("#TablitaChingona"));
                        var arr = Jugadores[i].Games[j];
                        var tr = $('<tr>');
                        ['Name', 'ID', 'ADDate'].forEach(function(attr) {
                            tr.append('<td>' + arr[attr] + '</td>');
                        });
                        $("#TBody").append(tr);
                    }
                }
            }
        }
    }

    function validarBusqB() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingresa tus datos en las casillas correspondientes");
                if (rowDatos == $("#BLNK").val()) {
                    $("#BLNK").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo que muestra las compras de un usuario en un rango de fechas
    function BuscarRF() {
        $("#BTNBuscar1").prop("disabled", true);
        $("#BLNK1").prop("disabled", true);

        for (var i = 0; i < Jugadores.length; i = i + 1) {
            if (Jugadores[i].Alias.localeCompare($("#BLNK1").val()) == 0) {
                for (var j = 0; j < Jugadores[i].Games.length; j = j + 1) {
                    var arr = Jugadores[i].Games[j];
                    if ((arr.ADDate >= $("#D1").val()) && (arr.ADDate <= $("#D2").val())) {
                        MostrarCosas($("#TablitaChingona2"));
                        var tr = $('<tr>');
                        ['Name', 'ID', 'ADDate'].forEach(function(attr) {
                            tr.append('<td>' + arr[attr] + '</td>');
                        });
                        $("#TBody2").append(tr);
                    }
                }
            }
        }
    }

    // Metodos que reinician las tablas
    function BorrarTablita() {
        $("#TBody").empty();
        $("#BTNBuscar").prop("disabled", false);
        $("#BLNK").prop("disabled", false);
    }

    function BorrarTablita2() {
        $("#TBody2").empty();
        $("#BTNBuscar1").prop("disabled", false);
        $("#BLNK1").prop("disabled", false);
    }

    // Metodo para buscar un jugador
    function SearchPlayer() {
        if (validarBusq() == true) {
            for (var VC = 0; VC < Jugadores.length; VC = VC + 1) {
                if (Jugadores[VC].Alias.localeCompare($("#SNK").val()) == 0) {
                    var player = ("Nombre: " + Jugadores[VC].Nombres + " \n Documento: " + Jugadores[VC].DI +
                        " \n Dirección: " + Jugadores[VC].Direccion + " \n Email: " + Jugadores[VC].EMail + " \n Nickname: " + Jugadores[VC].Alias);

                    swal("Resultados de busqueda:", player.toString(), "success");
                    LimpiaFormulario($("#FNK"));
                }
                /*else {
                                   errorMsg("Jugador no encontrado");
                               }*/
            }
        }
    }

    function validarBusq() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingrese el Nick Name a buscar");
                if (rowDatos == $("#SNK").val()) {
                    $("#SNK").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo para cargar la tabla de puntajes
    function ScoreBoard() {
        if (validarScore() == true) {
            for (var c = 0; c < Jugadores.length; c = c + 1) {
                for (var a = 0; a < Jugadores[c].Games.length; a = a + 1) {
                    if ((Jugadores[c].Games[a].ID) == (parseInt($("#CD").val()))) {
                        for (var d = 0; d < Jugadores[c].Games[a].Scores.length; d = d + 1) {
                            var Score = Score + ("- Nickname: " + Jugadores[c].Alias + " Puntaje: " + Jugadores[c].Games[a].Scores[d].PuntajeF + "\n");
                        }

                        swal("Resultado de Búsqueda: ", Score.toString());
                        LimpiaFormulario($("#SCC"));
                    }
                    /*else {
                                           errorMsg("Juego no encontrado");
                                       }*/
                }
            }
        }
    }

    function validarScore() {
        var error = false;
        var exito = false;
        $("table td:nth-child(2) :input").each(function() {
            var rowDatos = $(this).val()
            if (rowDatos === "") {
                errorMsg("Ingrese el codigo de juego a buscar");
                if (rowDatos == $("#CD").val()) {
                    $("#CD").css("border", "1px solid red");
                    error = true;
                }
            }
        });
        if (error != true) {
            exito = true;

            return exito;
        }
    }

    // Metodo para volver visible una division
    function MostrarCosas(DID) {
        $(DID).css("display", "block");
    }

    // Metodo para volver ocultar una division
    function OcultarCosas(DID) {
        $(DID).css("display", "none");
    }

    // Metodo para limpiar los input de una pantalla
    function LimpiaFormulario(DID) {
        $("input").css("border", "1px solid black");
        $(DID).trigger("reset");
    }

    // Actualizar el arreglo de juegos.
    const updateJuegos = () => {
        localStorage.setItem("Juego", JSON.stringify(Games));
    };

    // Actualizar el arreglo de puntajes.
    const updatePuntajes = () => {
        localStorage.setItem("PuntajeJuego", JSON.stringify(Scores));
    };

    // Metodo de alertas de error
    function errorMsg(eMsg) {
        swal("Error", eMsg, "error");
    }
});