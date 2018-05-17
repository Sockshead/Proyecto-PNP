$(document).ready(function() {
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
    var Jugadores = JSON.parse(localStorage.getItem("Jugador")) || []; //

    // Constructores de cada objeto
    function Jugador(Nomb, DId, Dir, Mail, Alias, Pass) {
        this.Nombres = Nomb;
        this.DI = DId;
        this.Direccion = Dir;
        this.EMail = Mail;
        this.Alias = Alias;
        this.Pass = Pass;
        this.Games = JSON.parse(localStorage.getItem("Juego")) || [];
        this.AddGame = AddGame;

        function AddGame(GM) {
            this.Games.push(GM);
        }
    }

    function Juego(Name, Dat, ADDate) {
        this.Name = Name;
        this.ID = Dat;
        this.ADDate = ADDate;
        this.Scores = JSON.parse(localStorage.getItem("PuntajeJuego")) || [];
        this.AddScore = AddScore;

        function AddScore(PN) {
            this.Scores.push(PN);
        }
    }

    function PuntajeJuego(PuntajeF, GameDate) {
        this.PuntajeF = PuntajeF;
        this.GameDate = GameDate;
    }

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
            LimpiaFormulario($("#IS"));

            $("#comprarJueg").click(function() {
                MostrarCosas($("#IDJuego"));
                OcultarCosas($("#MenuJugador"));

                $("#registroComp").off().click(function() {
                    CrearJuego();
                    LimpiaFormulario($("#IJ"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#IDJuego"));
                });

                $("#regresarComp").click(function() {
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#IDJuego"));
                });
            });
            $("#registroPuntj").click(function() {
                MostrarCosas($("#IDPuntaje"));
                OcultarCosas($("#MenuJugador"));

                $("#puntaje").off().click(function() {
                    RegistrarPuntaje();
                    LimpiaFormulario($("#FPUN"));
                    MostrarCosas($("#MenuJugador"));
                    OcultarCosas($("#IDPuntaje"))
                });

                $("#regresarPuntj").click(function() {
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
                    LimpiaFormulario($("#FBNK"));
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
            LimpiaFormulario($("#FNK"));
        });

        $("#regresarBusc").click(function() {
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
            LimpiaFormulario($("#SCC"));
        });
        $("#regresarSC").click(function() {
            MostrarCosas(menuPpal);
            OcultarCosas(menuScoreBoard);
        });
    });

    // Metodos para crear un nuevo objeto de tipo jugador
    function CrearJugador() {
        if (validarFormCrear() == true) {
            if (Jugadores.length == 0) {
                newPlayer($("#Nombjug").val(), $("#DocID").val(), $("#Direcc").val(), $("#EM").val(), $("#Nick").val(), $("#Pass").val());
            } else {
                var existe = false;
                for (var vc = 0; vc < Jugadores.length; vc = vc + 1) {
                    if (Jugadores[vc].Alias.localeCompare($("#Nick").val()) == 0) {
                        $("#Nick").css("border", "1px solid red");
                        errorMsg("Nick Name ya existente, intenta con uno nuevo");
                        //$("#Nick").val("");
                        existe = true;
                    }
                }
                if (existe == false) {
                    newPlayer($("#Nombjug").val(), $("#DocID").val(), $("#Direcc").val(), $("#EM").val(), $("#Nick").val(), $("#Pass").val());
                }
            }
        }
    }

    function errorMsg(eMsg) {
        swal("Error", eMsg, "error");
    }

    function newPlayer(Nombre, id, direccion, eMail, Nick, password) {
        if ((Nombre === "") || (id === "") || (direccion === "") || (eMail === "") || (Nick === "") || (password === "")) {
            errorMsg("Ingresa tus datos en las casillas correspondientes");
        } else {
            var jug = new Jugador(Nombre, id, direccion, eMail, Nick, password);
            Jugadores[Jugadores.length] = jug;
            updateJugadores();
            console.log(jug);

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
            console.log(exito);

            return exito;
        }
    }

    // Metodo para agregar un juego
    function CrearJuego() {
        for (var VC1 = 0; VC1 < Jugadores.length; VC1 = VC1 + 1) {
            if (Jugadores[VC1].Alias.localeCompare($("#NICKVAL").val()) == 0) {
                var jueg = new Juego($("#NombJueg").val(), parseInt($("#CodJuego").val()),
                    $("#FDC").val());
                console.log(jueg);
                Jugadores[VC1].AddGame(jueg);
                alert("Compra Registrada exitosamente");
            } else {
                alert("Por favor verifique su NickName");
            }
        }
    }

    // Metodo que registra el puntaje de un jugador en un juego
    function RegistrarPuntaje() {
        for (var B = 0; B < Jugadores.length; B = B + 1) {
            if (Jugadores[B].Alias.localeCompare($("#NICKVAL1").val()) == 0) {
                for (var C = 0; C < Jugadores[B].Games.length; C = C + 1) {
                    if ((Jugadores[B].Games[C].ID) == (parseInt($("#CDJ").val()))) {
                        var pun = new PuntajeJuego((parseInt($("#PUNJ").val())), $("#FDP").val());
                        console.log(pun);
                        Jugadores[B].Games[C].AddScore(pun);
                        alert("El puntaje: " + $("#PUNJ").val() + " del juego: " + Jugadores[B].Games[C].Name + " fue registrado exitosamente");
                    } else {
                        alert("Por favor verifique el codigo de juego y/o el puntaje ingresados");
                    }
                }
            } else {
                alert("Por favor verifique su NickName");
            }
        }
    }

    // Metodo para realizar la validacion de la contraseña en el login
    function PassValidation() {
        for (var vc = 0; vc < Jugadores.length; vc = vc + 1) {
            if (($("#AJUGa").val() === "") && ($("#Passw").val() === "")) {
                alert("Por favor ingrese sus datos en las casillas correspondientes");
            } else if ($("#AJUGa").val() === "") {
                alert("Por favor ingrese su usuario");
            } else if ($("#Passw").val() === "") {
                alert("Por favor ingrese su contraseña");
            } else {
                if (Jugadores[vc].Alias.localeCompare($("#AJUGa").val()) == 0) {
                    if (Jugadores[vc].Pass.localeCompare($("#Passw").val()) == 0) {
                        alert("Bienvenido: " + Jugadores[vc].Alias);
                        OcultarCosas(menuLogin);
                        MostrarCosas($("#MenuJugador"));
                        $("#Nom").text(Jugadores[vc].Nombres);
                        $("#DMT").text(Jugadores[vc].DI);
                        $("#EMa").text(Jugadores[vc].EMail);
                        $("#NCK").text(Jugadores[vc].Alias);
                    } else {
                        alert("Contraseña incorrecta");
                    }
                } else {
                    alert("Usuario incorrecto");
                }
            }
        }
    }

    // Metodo para buscar la biblioteca de un jugador
    function Buscar() {
        $("#BTNBuscar").disabled = true;
        $("#BLNK").disabled = true;

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
        for (var VC = 0; VC < Jugadores.length; VC = VC + 1) {
            if (Jugadores[VC].Alias.localeCompare($("#SNK").val()) == 0) {
                var player = ("Resultado de Búsqueda: \n Nombre: " + Jugadores[VC].Nombres + " \n Documento: " + Jugadores[VC].DI +
                    " \n Dirección: " + Jugadores[VC].Direccion + " \n Email: " + Jugadores[VC].EMail + " \n Nickname: " + Jugadores[VC].Alias);
                alert(player.toString());
            }
        }
    }

    // Metodo para cargar la tabla de puntajes
    function ScoreBoard() {
        var Score = "Resultado de Búsqueda: \n";
        for (var c = 0; c < Jugadores.length; c = c + 1) {
            for (var a = 0; a < Jugadores[c].Games.length; a = a + 1) {
                if ((Jugadores[c].Games[a].ID) == (parseInt($("#CD").val()))) {
                    for (var d = 0; d < Jugadores[c].Games[a].Scores.length; d = d + 1) {
                        Score = Score + ("- Nickname: " + Jugadores[c].Alias + " Puntaje: " + Jugadores[c].Games[a].Scores[d].PuntajeF + "\n");
                    }
                }
            }
        }
        alert(Score.toString());
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

    // Actualizar el arreglo de jugadores.
    const updateJugadores = () => {
        localStorage.setItem("Jugadores", JSON.stringify(Jugador));
    };

    // Actualizar el arreglo de juegos.
    const updateJuegos = () => {
        localStorage.setItem("Games", JSON.stringify(Juego));
    };

    // Actualizar el arreglo de puntajes.
    const updatePuntajes = () => {
        localStorage.setItem("Scores", JSON.stringify(PuntajeJuego));
    };
});