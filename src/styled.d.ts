import { DefaultTheme } from "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        bgColor: string;
        cardColor: string;
        textColor: string;
        cardTextColor: string;
        accentColor: string;

        name: string;
    }
}
