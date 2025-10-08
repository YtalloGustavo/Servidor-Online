import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
// As imagens de fundo não foram alteradas, você pode mantê-las ou removê-las se não for usar.
import lightBackground from '../src/assets/wa-background-light.png';
import darkBackground from '../src/assets/wa-background-dark.jpg';
import { ptBR } from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    // INÍCIO DA SEÇÃO ALTERADA: Paleta de Cores do ServidorON
    const theme = createTheme(
        {
            // Cores principais da marca ServidorON
            servidoron: {
                blue: "#4682B4", // Azul principal do logo
                white: "#FFFFFF",
                lightGray: "#F5F5F5", // Cinza claro para fundos
                darkGray: "#333333", // Cinza escuro para textos e elementos
                black: "#121212" // Fundo do modo escuro
            },
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                    borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#4682B4", // Azul principal na barra de rolagem
                    borderRadius: "8px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                    borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
                    borderRadius: "8px",
                },
            },
            palette: {
                type: mode,
                primary: { main: "#4682B4" }, // Azul principal em ambos os modos
                secondary: { main: "#FFFFFF" }, // Cor secundária (pode ajustar conforme necessário)
                quicktags: { main: "#4682B4" },
                sair: { main: mode === "light" ? "#4682B4" : "#333" },
                vcard: { main: mode === "light" ? "#4682B4" : "#666" },
                textPrimary: mode === "light" ? "#333333" : "#FFFFFF", // Texto escuro no modo claro, branco no modo escuro
                borderPrimary: "#4682B4",
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
                tabHeaderBackground: mode === "light" ? "#EEE" : "#222",
                ticketlist: mode === "light" ? "#fafafa" : "#1C1C1C",
                optionsBackground: mode === "light" ? "#fafafa" : "#1C1C1C",
                options: mode === "light" ? "#fafafa" : "#333",
                fontecor: mode === "light" ? "#4682B4" : "#fff",
                fancyBackground: mode === "light" ? "#fafafa" : "#1C1C1C",
                bordabox: mode === "light" ? "#eee" : "#333",
                newmessagebox: mode === "light" ? "#eee" : "#1C1C1C",
                inputdigita: mode === "light" ? "#fff" : "#333",
                contactdrawer: mode === "light" ? "#fff" : "#222",
                announcements: mode === "light" ? "#ededed" : "#1C1C1C",
                login: mode === "light" ? "#fff" : "#121212",
                announcementspopover: mode === "light" ? "#fff" : "#333",
                chatlist: mode === "light" ? "#eee" : "#333",
                boxlist: mode === "light" ? "#ededed" : "#333",
                boxchatlist: mode === "light" ? "#ededed" : "#1C1C1C",
                total: mode === "light" ? "#fff" : "#222",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#222",
                barraSuperior: "linear-gradient(to right, #4682B4, #5A94C8, #4682B4)", // Gradiente com o azul
                boxticket: mode === "light" ? "#EEE" : "#333",
                campaigntab: mode === "light" ? "#ededed" : "#333",
                mediainput: mode === "light" ? "#ededed" : "#1C1C1C",
                contadordash: mode == "light" ? "#fff" : "#fff",
                background: {
                    default: mode === "light" ? "#FFFFFF" : "#121212", // Fundo principal
                    paper: mode === "light" ? "#F5F5F5" : "#1E1E1E" // Fundo de "papéis" e cards
                }
            },
            mode,
        },
        locale
    );
    // FIM DA SEÇÃO ALTERADA

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        if (i18nlocale) {
            const browserLocale =
                i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

            if (browserLocale === "ptBR") {
                setLocale(ptBR);
            }
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);

    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <SocketContext.Provider value={SocketManager}>
                        <Routes />
                    </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
