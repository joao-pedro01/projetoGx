import {createGlobalStyle, withTheme} from 'styled-components'; //Import da Biblioteca 'styled-components'

/*Variavei LightMode*/
export const lightTheme = {
    body: "#F7FFF7",
    inputthemecheck: "#1E1E1E",
    th: "#C4E8CB !important",
    td: "#F7FFF7 !important",
    thrad: "10px",
};

/*Variavei DarkMode*/
export const darkTheme = {
    body: "#1E1E1E",
    color: "#F7FFF7 !important",
    border: "#F7FFF7 2px solid",
    buttoncolor: "#303030",
    buttoncolorhover: "#404040",
    buttoncoloractive: "#515151",
    buttonborder: "solid 2px #1E1E1E",
    buttonbordertop: "solid 4px #1E1E1E",
    inputthemecheck: "#F7FFF7",
    labelinputball: "#1E1E1E",
    th: "#4E4E51 !important",
    thrad: "10px",
    td: "#686466 !important",
    borderboxcad: "#F7FFF7 1px solid",
    borderbuttonmenutop: "#1E1E1E solid 4px",
};

/*Export do 'Style Global'*/
export const GlobalStyle = createGlobalStyle`
    .react-switch-label .react-switch-button{
        background-color: ${props => props.theme.labelinputball};
    }
    .react-switch-label{
        background-color: ${props => props.theme.inputthemecheck};
    }

    .formCPecas span{
        color: ${props => props.theme.color};
    }
    .box{
        border: ${props => props.theme.borderboxcad};
    }
    .boxCAD h3{
        color: ${props => props.theme.color};
    }

    .tabletest th{
        background-color: ${props => props.theme.th};
        color: ${props => props.theme.color};
    }

    .tabletest td{
        background-color: ${props => props.theme.td};
        color: ${props => props.theme.color};
    }

    .buttonArea{
        background-color: ${props => props.theme.body};
    }


    body {
        background-color: ${props => props.theme.body};
    }


    .container{
        background-color: ${props => props.theme.body};
    }
    .boxLogin{
        background-color: ${props => props.theme.body};
    }
    .loginTitulo{
        color: ${props => props.theme.color};
    }
    .login{
        border: ${props => props.theme.border};
    }


    .buttonOne{
        border-right: ${props => props.theme.buttonborder};
        background-color: ${props => props.theme.buttoncolor};
        border-top: ${props => props.theme.borderbuttonmenutop};
    }
    .buttonTwo{
        background-color: ${props => props.theme.buttoncolor};
        border-left: ${props => props.theme.buttonborder};
        border-top: ${props => props.theme.borderbuttonmenutop};
    }
    .buttonThree{
        background-color: ${props => props.theme.buttoncolor};
        border-top: ${props => props.theme.buttonbordertop};
        border-right: ${props => props.theme.buttonborder};
    }
    .buttonFour{
        background-color: ${props => props.theme.buttoncolor};
        border-top: ${props => props.theme.buttonbordertop};
        border-left: ${props => props.theme.buttonborder};
    }
    .top a:hover, .down a:hover{
        background-color: ${props => props.theme.buttoncolorhover};
    }
    .text-button{
        color: ${props => props.theme.color};
    }
    .top a:active, .down a:active{
        background-color: ${props => props.theme.buttoncoloractive};
    }


    .boxCAD{
        background-color: ${props => props.theme.buttoncoloractive};
    }

`

/*
#686466
#7B6AA0
*/
