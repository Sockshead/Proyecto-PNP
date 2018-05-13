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

    // Constantes de los DIV a limpiar (se borra cada inpit de sus formularios)
    //const formJug = ;

    // Variables de clase
    var Jugadores = [];
    var Controlador = 0;
    var Controlador2 = 0;

    // Constructores de cada objeto
    function Jugador(Nomb, DId, Dir, Mail, Alias, Pass) {
        this.Nombres = Nomb;
        this.DI = DId;
        this.Direccion = Dir;
        this.EMail = Mail;
        this.Alias = Alias;
        this.Pass = Pass;
        this.Games = [];
        this.AddGame = AddGame;

        function AddGame(GM) {
            this.Games.push(GM);
        }
    }

    function Juego(Name, Dat, ADDate) {
        this.Name = Name;
        this.ID = Dat;
        this.ADDate = ADDate;
        this.Scores = [];
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
            LimpiaFormulario($("#FJ"));
            alert("Se ha agregado un jugador Correctamente");
            MostrarCosas(menuPpal);
            OcultarCosas(menuAdd);
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

        $("#regresarLogIn").click(function() {
            MostrarCosas(menuPpal);
            OcultarCosas(menuLogin);
        });
    });

    $("#buscarJugador").click(function() {
        MostrarCosas(menuSearch);
        OcultarCosas(menuPpal);
        $("#SNK").focus();

        $("#regresarBusc").click(function() {
            MostrarCosas(menuPpal);
            OcultarCosas(menuSearch);
        });
    });

    $("#puntajes").click(function() {
        MostrarCosas(menuScoreBoard);
        OcultarCosas(menuPpal);
        $("#CD").focus();

        $("#regresarSC").click(function() {
            MostrarCosas(menuPpal);
            OcultarCosas(menuScoreBoard);
        });
    });

    // Metodo para crear un nuevo objeto de tipo jugador
    function CrearJugador() {
        var jug = new Jugador($("#Nombjug").value, $("#DocID").value,
            $("#Direcc").value, $("#EM").value, $("#Nick").value,
            $("#Pass").value);
        Jugadores[Jugadores.length] = jug;
        var creado = true;
        return creado;
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
        $(DID).trigger("reset");
    }
});


/*
function CrearJuego() {
    for (var VC1 = 0; VC1 < Jugadores.length; VC1 = VC1 + 1) {
        if (Jugadores[VC1].Alias.localeCompare(document.getElementById("NICKVAL").value) == 0) {
            var jueg = new Juego(document.getElementById("NombJueg").value, parseInt(document.getElementById("CodJuego").value),
                document.getElementById("FDC").value);
            Jugadores[VC1].AddGame(jueg);
            alert("Compra Registrada exitosamente");

        }

    }
}

function PassValidation() {
    for (var vc = 0; vc < Jugadores.length; vc = vc + 1) {
        if (Jugadores[vc].Alias.localeCompare(document.getElementById("AJUGa").value) == 0) {
            if (Jugadores[vc].Pass.localeCompare(document.getElementById("Passw").value) == 0) {
                alert("Bienvenido: " + Jugadores[vc].Alias);
                document.getElementById("InicioSesion").style.display = 'none';
                document.getElementById("MenuJuego").style.display = 'block';
                document.getElementById("Nom").innerHTML = Jugadores[vc].Nombres;
                document.getElementById("DMT").innerHTML = Jugadores[vc].DI;
                document.getElementById("EMa").innerHTML = Jugadores[vc].EMail;
                document.getElementById("NCK").innerHTML = Jugadores[vc].Alias;
            } else {
                alert("Usuario y/o contraseña incorrectas");
            }
        }
    }
}

function RegistrarPuntaje() {
    for (var B = 0; B < Jugadores.length; B = B + 1) {
        if (Jugadores[B].Alias.localeCompare(document.getElementById("NICKVAL1").value) == 0) {
            for (var C = 0; C < Jugadores[B].Games.length; C = C + 1) {
                if ((Jugadores[B].Games[C].ID) == (parseInt(document.getElementById("CDJ").value))) {
                    var pun = new PuntajeJuego((parseInt(document.getElementById("PUNJ").value)), document.getElementById("FDP").value);
                    Jugadores[B].Games[C].AddScore(pun);
                    alert("Puntaje: " + document.getElementById("PUNJ").value + " Del juego: " + Jugadores[B].Games[C].Name + " Registrado exitosamente");
                }
            }
        }
    }
}

function Buscar() {

    document.getElementById("BTNBuscar").disabled = true;
    document.getElementById("BLNK").disabled = true;
    for (var B = 0; B < Jugadores.length; B = B + 1) {
        if (Jugadores[B].Alias.localeCompare(document.getElementById("BLNK").value) == 0) {
            document.getElementById("BD").innerHTML = Jugadores[B].Alias;
            for (var C = 0; C < Jugadores[B].Games.length; C = C + 1) {

                document.getElementById("TablitaChingona").style.display = 'block'
                var y = document.createElement("TR");

                y.setAttribute("id", C);
                var t = document.createTextNode(Jugadores[B].Games[C].Name);
                y.appendChild(t);
                document.getElementById("TBody").appendChild(y);

                var y = document.createElement("TD");
                var t = document.createTextNode(Jugadores[B].Games[C].ID);
                y.appendChild(t);
                document.getElementById(C).appendChild(y);

                var y = document.createElement("TD");
                var t = document.createTextNode(Jugadores[B].Games[C].ADDate);
                y.appendChild(t);
                document.getElementById(C).appendChild(y);

            }
        }
    }
}

function BuscarRF() {

    document.getElementById("BTNBuscar1").disabled = true;
    document.getElementById("BLNK1").disabled = true;
    for (var B = 0; B < Jugadores.length; B = B + 1) {
        if (Jugadores[B].Alias.localeCompare(document.getElementById("BLNK1").value) == 0) {
            document.getElementById("BD").innerHTML = Jugadores[B].Alias;
            for (var C = 0; C < Jugadores[B].Games.length; C = C + 1) {
                if ((Jugadores[B].Games[C].ADDate > document.getElementById("D1").value) && (Jugadores[B].Games[C].ADDate < document.getElementById("D2").value)) {
                    document.getElementById("ComprasRango").style.display = 'block'
                    var y = document.createElement("TR");

                    y.setAttribute("id", C);
                    var t = document.createTextNode(Jugadores[B].Games[C].Name);
                    y.appendChild(t);
                    document.getElementById("TBody2.0").appendChild(y);

                    var y = document.createElement("TD");
                    var t = document.createTextNode(Jugadores[B].Games[C].ID);
                    y.appendChild(t);
                    document.getElementById(C).appendChild(y);

                    var y = document.createElement("TD");
                    var t = document.createTextNode(Jugadores[B].Games[C].ADDate);
                    y.appendChild(t);
                    document.getElementById(C).appendChild(y);
                    Controlador2 = Controlador2 + 1;
                }
            }
        }
    }
}

function BorrarTablita() {
    for (var D = 0; D <= Controlador; D = D + 1) {
        var element = document.getElementById(D);
        element.parentNode.removeChild(element);
        document.getElementById("BTNBuscar").disabled = false;
        document.getElementById("BLNK").disabled = false;
        Controlador = 0;
    }
}

function BorrarTablita2() {
    for (var D = 0; D <= Controlador2; D = D + 1) {
        var element = document.getElementById(D);
        element.parentNode.removeChild(element);
        document.getElementById("BTNBuscar1").disabled = false;
        document.getElementById("BLNK1").disabled = false;
        Controlador2 = 0;
    }
}

function SearchPlayer() {
    for (var VC = 0; VC < Jugadores.length; VC = VC + 1) {
        if (Jugadores[VC].Alias.localeCompare(document.getElementById("SNK").value) == 0) {
            var player = ("Resultado de Búsqueda: \n Nombre: " + Jugadores[VC].Nombres + " \n Documento: " + Jugadores[VC].DI +
                " \n Dirección: " + Jugadores[VC].Direccion + " \n Email: " + Jugadores[VC].EMail + " \n Nickname: " + Jugadores[VC].Alias);
            alert(player.toString());
        }

    }

}

function ScoreBoard() {
    var Score = "Resultado de Búsqueda: \n";
    for (var c = 0; c < Jugadores.length; c = c + 1) {
        for (var a = 0; a < Jugadores[c].Games.length; a = a + 1) {
            if ((Jugadores[c].Games[a].ID) == (parseInt(document.getElementById("CD").value))) {
                for (var d = 0; d < Jugadores[c].Games[a].Scores.length; d = d + 1) {
                    Score = Score + ("- Nickname: " + Jugadores[c].Alias + " Puntaje: " + Jugadores[c].Games[a].Scores[d].PuntajeF + "\n");

                }
            }
        }
    }
    alert(Score.toString());
}*/