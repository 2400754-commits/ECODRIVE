/* =========================================================
   ECODRIVE 2.0
   SCRIPT.JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        console.log(
            "ECODRIVE 2.0 iniciado"
        );


        /* =================================================
           ELEMENTOS
        ================================================= */

        const menuButton =
            document.getElementById(
                "menu-btn"
            );

        const menu =
            document.getElementById(
                "menu"
            );

        const header =
            document.getElementById(
                "header"
            );

        const themeButton =
            document.getElementById(
                "theme-btn"
            );

        const progress =
            document.getElementById(
                "scroll-progress"
            );


        /* =================================================
           MENU MOBILE
        ================================================= */

        if (
            menuButton &&
            menu
        ) {

            menuButton.addEventListener(
                "click",
                function () {

                    menu.classList.toggle(
                        "active"
                    );


                    if (
                        menu.classList.contains(
                            "active"
                        )
                    ) {

                        menuButton.textContent =
                            "✕";

                    } else {

                        menuButton.textContent =
                            "☰";

                    }

                }
            );


            menu.querySelectorAll(
                "a"
            ).forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            menu.classList.remove(
                                "active"
                            );

                            menuButton.textContent =
                                "☰";

                        }
                    );

                }
            );

        }


        /* =================================================
           ROLAGEM SUAVE
        ================================================= */

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function (event) {

                            const id =
                                this.getAttribute(
                                    "href"
                                );


                            if (
                                !id ||
                                id === "#"
                            ) {

                                return;

                            }


                            const destino =
                                document.querySelector(
                                    id
                                );


                            if (
                                destino
                            ) {

                                event.preventDefault();

                                destino.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth"
                                    }
                                );

                            }

                        }
                    );

                }
            );


        /* =================================================
           HEADER + PROGRESSO
        ================================================= */

        window.addEventListener(
            "scroll",
            function () {


                if (
                    header
                ) {

                    if (
                        window.scrollY >
                        50
                    ) {

                        header.classList.add(
                            "scrolled"
                        );

                    } else {

                        header.classList.remove(
                            "scrolled"
                        );

                    }

                }


                if (
                    progress
                ) {

                    const altura =
                        document.documentElement
                            .scrollHeight -
                        window.innerHeight;


                    if (
                        altura > 0
                    ) {

                        const porcentagem =
                            (
                                window.scrollY /
                                altura
                            ) *
                            100;


                        progress.style.width =
                            porcentagem +
                            "%";

                    }

                }

            }
        );


        /* =================================================
           DARK MODE
        ================================================= */

        if (
            themeButton
        ) {

            const tema =
                localStorage.getItem(
                    "ecodrive-theme"
                );


            if (
                tema ===
                "dark"
            ) {

                document.body.classList.add(
                    "dark"
                );

                themeButton.textContent =
                    "☀️";

            }


            themeButton.addEventListener(
                "click",
                function () {

                    document.body.classList.toggle(
                        "dark"
                    );


                    if (
                        document.body.classList.contains(
                            "dark"
                        )
                    ) {

                        themeButton.textContent =
                            "☀️";

                        localStorage.setItem(
                            "ecodrive-theme",
                            "dark"
                        );

                    } else {

                        themeButton.textContent =
                            "🌙";

                        localStorage.setItem(
                            "ecodrive-theme",
                            "light"
                        );

                    }

                }
            );

        }


        /* =================================================
           ELEMENTOS DO SIMULADOR
        ================================================= */

        const emissionValue =
            document.getElementById(
                "emission-value"
            );

        const emissionBar =
            document.getElementById(
                "emission-bar"
            );

        const emissionStatus =
            document.getElementById(
                "emission-status"
            );


        const co2Value =
            document.getElementById(
                "co2-value"
            );

        const coValue =
            document.getElementById(
                "co-value"
            );

        const hcValue =
            document.getElementById(
                "hc-value"
            );


        const co2Bar =
            document.getElementById(
                "co2-bar"
            );

        const coBar =
            document.getElementById(
                "co-bar"
            );

        const hcBar =
            document.getElementById(
                "hc-bar"
            );


        const startButton =
            document.getElementById(
                "start-system"
            );

        const stopButton =
            document.getElementById(
                "stop-system"
            );


        const normalButton =
            document.getElementById(
                "test-normal"
            );

        const warningButton =
            document.getElementById(
                "test-warning"
            );

        const dangerButton =
            document.getElementById(
                "test-danger"
            );


        const presentationButton =
            document.getElementById(
                "presentation-mode"
            );


        const systemIndicator =
            document.getElementById(
                "system-indicator"
            );


        const sensorStatus =
            document.getElementById(
                "sensor-status"
            );


        const arduinoBoard =
            document.querySelector(
                ".arduino-board"
            );


        const heroCo2 =
            document.getElementById(
                "hero-co2"
            );

        const heroStatus =
            document.getElementById(
                "hero-status"
            );


        const chart =
            document.getElementById(
                "chart"
            );

        const chartCurrent =
            document.getElementById(
                "chart-current"
            );


        /* =================================================
           VARIÁVEIS
        ================================================= */

        let emissao =
            25;

        let sistemaLigado =
            false;

        let intervalo =
            null;

        let historico =
            [];


        /* =================================================
           CRIAR GRÁFICO
        ================================================= */

        if (
            chart
        ) {

            for (
                let i = 0;
                i < 35;
                i++
            ) {

                const barra =
                    document.createElement(
                        "div"
                    );

                barra.className =
                    "chart-bar";

                barra.style.height =
                    "25%";

                chart.appendChild(
                    barra
                );

                historico.push(
                    25
                );

            }

        }


        /* =================================================
           CRIAR FUMAÇA
        ================================================= */

        const smokeContainer =
            document.getElementById(
                "smoke-container"
            );


        if (
            smokeContainer
        ) {

            for (
                let i = 0;
                i < 7;
                i++
            ) {

                const smoke =
                    document.createElement(
                        "div"
                    );

                smoke.className =
                    "smoke-particle";

                smoke.style.left =
                    Math.random() *
                    50 +
                    "px";

                smoke.style.top =
                    Math.random() *
                    50 +
                    "px";

                smoke.style.animationDelay =
                    Math.random() *
                    3 +
                    "s";

                smokeContainer.appendChild(
                    smoke
                );

            }

        }


        /* =================================================
           ATUALIZAR COR
        ================================================= */

        function definirCor(
            nivel
        ) {

            if (
                nivel <
                40
            ) {

                return "#22c55e";

            }


            if (
                nivel <
                70
            ) {

                return "#f59e0b";

            }


            return "#ef4444";

        }


        /* =================================================
           ATUALIZAR SISTEMA
        ================================================= */

        function atualizarSistema(
            nivel
        ) {

            nivel =
                Math.round(
                    nivel
                );


            if (
                nivel < 0
            ) {

                nivel =
                    0;

            }


            if (
                nivel > 100
            ) {

                nivel =
                    100;

            }


            emissao =
                nivel;


            /* GASES */

            const co2 =
                nivel;

            const co =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round(
                            nivel *
                            0.72
                        )
                    )
                );

            const hc =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round(
                            nivel *
                            0.48
                        )
                    )
                );


            /* COR */

            const cor =
                definirCor(
                    nivel
                );


            /* VALOR */

            if (
                emissionValue
            ) {

                emissionValue.textContent =
                    nivel +
                    "%";

                emissionValue.style.color =
                    cor;

            }


            /* BARRA */

            if (
                emissionBar
            ) {

                emissionBar.style.width =
                    nivel +
                    "%";

                emissionBar.style.background =
                    cor;

            }


            /* CO2 */

            if (
                co2Value
            ) {

                co2Value.textContent =
                    co2 +
                    "%";

            }


            if (
                co2Bar
            ) {

                co2Bar.style.width =
                    co2 +
                    "%";

                co2Bar.style.background =
                    cor;

            }


            /* CO */

            if (
                coValue
            ) {

                coValue.textContent =
                    co +
                    "%";

            }


            if (
                coBar
            ) {

                coBar.style.width =
                    co +
                    "%";

                coBar.style.background =
                    cor;

            }


            /* HC */

            if (
                hcValue
            ) {

                hcValue.textContent =
                    hc +
                    "%";

            }


            if (
                hcBar
            ) {

                hcBar.style.width =
                    hc +
                    "%";

                hcBar.style.background =
                    cor;

            }


            /* STATUS */

            if (
                emissionStatus
            ) {

                emissionStatus.classList.remove(
                    "normal",
                    "warning",
                    "danger"
                );


                if (
                    nivel <
                    40
                ) {

                    emissionStatus.textContent =
                        "🟢 EMISSÃO NORMAL";

                    emissionStatus.classList.add(
                        "normal"
                    );

                }

                else if (
                    nivel <
                    70
                ) {

                    emissionStatus.textContent =
                        "🟡 NÍVEL DE ATENÇÃO";

                    emissionStatus.classList.add(
                        "warning"
                    );

                }

                else {

                    emissionStatus.textContent =
                        "🔴 EMISSÃO CRÍTICA";

                    emissionStatus.classList.add(
                        "danger"
                    );

                }

            }


            /* HERO */

            if (
                heroCo2
            ) {

                heroCo2.textContent =
                    nivel +
                    "%";

                heroCo2.style.color =
                    cor;

            }


            if (
                heroStatus
            ) {

                if (
                    nivel <
                    40
                ) {

                    heroStatus.textContent =
                        "NORMAL";

                }

                else if (
                    nivel <
                    70
                ) {

                    heroStatus.textContent =
                        "ATENÇÃO";

                }

                else {

                    heroStatus.textContent =
                        "CRÍTICO";

                }

                heroStatus.style.color =
                    cor;

            }


            /* SENSOR */

            if (
                sensorStatus
            ) {

                if (
                    sistemaLigado
                ) {

                    sensorStatus.textContent =
                        "MONITORANDO";

                } else {

                    sensorStatus.textContent =
                        "AGUARDANDO";

                }

            }


            /* GRÁFICO */

            atualizarGrafico(
                nivel
            );

        }


        /* =================================================
           GRÁFICO
        ================================================= */

        function atualizarGrafico(
            nivel
        ) {

            if (
                !chart
            ) {

                return;

            }


            historico.push(
                nivel
            );


            if (
                historico.length >
                35
            ) {

                historico.shift();

            }


            const barras =
                chart.querySelectorAll(
                    ".chart-bar"
                );


            barras.forEach(
                function (
                    barra,
                    index
                ) {

                    const valor =
                        historico[
                            index
                        ] || 25;


                    barra.style.height =
                        Math.max(
                            5,
                            valor
                        ) +
                        "%";


                    barra.style.background =
                        definirCor(
                            valor
                        );

                }
            );


            if (
                chartCurrent
            ) {

                chartCurrent.textContent =
                    nivel +
                    "%";

                chartCurrent.style.color =
                    definirCor(
                        nivel
                    );

            }

        }


        /* =================================================
           INICIAR SISTEMA
        ================================================= */

        if (
            startButton
        ) {

            startButton.addEventListener(
                "click",
                function () {


                    if (
                        sistemaLigado
                    ) {

                        return;

                    }


                    sistemaLigado =
                        true;


                    if (
                        systemIndicator
                    ) {

                        systemIndicator.classList.add(
                            "online"
                        );

                        systemIndicator.innerHTML =
                            "<i></i> ONLINE";

                    }


                    if (
                        arduinoBoard
                    ) {

                        arduinoBoard.classList.add(
                            "running"
                        );

                    }


                    if (
                        startButton
                    ) {

                        startButton.textContent =
                            "● SISTEMA FUNCIONANDO";

                    }


                    intervalo =
                        setInterval(
                            function () {

                                const variacao =
                                    Math.floor(
                                        Math.random() *
                                        21
                                    ) -
                                    10;


                                atualizarSistema(
                                    emissao +
                                    variacao
                                );

                            },
                            1200
                        );

                }
            );

        }


        /* =================================================
           PARAR SISTEMA
        ================================================= */

        if (
            stopButton
        ) {

            stopButton.addEventListener(
                "click",
                function () {

                    sistemaLigado =
                        false;


                    clearInterval(
                        intervalo
                    );


                    intervalo =
                        null;


                    if (
                        systemIndicator
                    ) {

                        systemIndicator.classList.remove(
                            "online"
                        );

                        systemIndicator.innerHTML =
                            "<i></i> OFFLINE";

                    }


                    if (
                        arduinoBoard
                    ) {

                        arduinoBoard.classList.remove(
                            "running"
                        );

                    }


                    if (
                        startButton
                    ) {

                        startButton.textContent =
                            "▶ INICIAR SISTEMA";

                    }


                    if (
                        sensorStatus
                    ) {

                        sensorStatus.textContent =
                            "AGUARDANDO";

                    }

                }
            );

        }


        /* =================================================
           SIMULAÇÃO NORMAL
        ================================================= */

        if (
            normalButton
        ) {

            normalButton.addEventListener(
                "click",
                function () {

                    atualizarSistema(
                        15 +
                        Math.floor(
                            Math.random() *
                            20
                        )
                    );

                }
            );

        }


        /* =================================================
           SIMULAÇÃO ATENÇÃO
        ================================================= */

        if (
            warningButton
        ) {

            warningButton.addEventListener(
                "click",
                function () {

                    atualizarSistema(
                        45 +
                        Math.floor(
                            Math.random() *
                            20
                        )
                    );

                }
            );

        }


        /* =================================================
           SIMULAÇÃO CRÍTICA
        ================================================= */

        if (
            dangerButton
        ) {

            dangerButton.addEventListener(
                "click",
                function () {

                    atualizarSistema(
                        75 +
                        Math.floor(
                            Math.random() *
                            25
                        )
                    );

                }
            );

        }


        /* =================================================
           MODO APRESENTAÇÃO
        ================================================= */

        function alternarApresentacao() {

            document.body.classList.toggle(
                "presentation-mode"
            );

        }


        if (
            presentationButton
        ) {

            presentationButton.addEventListener(
                "click",
                alternarApresentacao
            );

        }


        const topPresentation =
            document.getElementById(
                "presentation-btn"
            );


        if (
            topPresentation
        ) {

            topPresentation.addEventListener(
                "click",
                alternarApresentacao
            );

        }


        /* ESC */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    document.body.classList.remove(
                        "presentation-mode"
                    );

                }

            }
        );


        /* =================================================
           CONTADORES
        ================================================= */

        const counters =
            document.querySelectorAll(
                "[data-count]"
            );


        const counterObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (
                            entry
                        ) {

                            if (
                                !entry.isIntersecting
                            ) {

                                return;

                            }


                            const element =
                                entry.target;


                            const target =
                                Number(
                                    element.getAttribute(
                                        "data-count"
                                    )
                                );


                            let current =
                                0;


                            const duration =
                                1200;


                            const stepTime =
                                Math.max(
                                    10,
                                    duration /
                                    target
                                );


                            const timer =
                                setInterval(
                                    function () {

                                        current++;


                                        element.textContent =
                                            current;


                                        if (
                                            current >=
                                            target
                                        ) {

                                            clearInterval(
                                                timer
                                            );

                                        }

                                    },
                                    stepTime
                                );


                            observer.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold:
                        0.5
                }
            );


        counters.forEach(
            function (
                counter
            ) {

                counterObserver.observe(
                    counter
                );

            }
        );


        /* =================================================
           ANIMAÇÕES AO ENTRAR NA TELA
        ================================================= */

        const animatedElements =
            document.querySelectorAll(
                ".gas-card, .solution-card, .timeline-item, .team-card, .impact-main, .impact-list > div"
            );


        const animationObserver =
            new IntersectionObserver(
                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (
                            entry
                        ) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "show-animation"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        0.12
                }
            );


        animatedElements.forEach(
            function (
                element
            ) {

                element.style.opacity =
                    "0";

                element.style.transform =
                    "translateY(25px)";

                element.style.transition =
                    "opacity .7s ease, transform .7s ease";


                animationObserver.observe(
                    element
                );

            }
        );


        /* =================================================
           ESTILO DA ANIMAÇÃO
        ================================================= */

        const animationStyle =
            document.createElement(
                "style"
            );


        animationStyle.textContent = `

            .show-animation {

                opacity: 1 !important;

                transform:
                    translateY(0)
                    !important;

            }

        `;


        document.head.appendChild(
            animationStyle
        );


        /* =================================================
           VALOR INICIAL
        ================================================= */

        atualizarSistema(
            25
        );


        console.log(
            "✓ Simulador carregado"
        );

        console.log(
            "✓ Gráfico carregado"
        );

        console.log(
            "✓ Arduino virtual carregado"
        );

        console.log(
            "✓ ECODRIVE 2.0 pronto"
        );

    }
);