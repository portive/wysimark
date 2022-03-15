import { css } from "@emotion/core"

/* prettier-ignore */
export const resetCss = css`
.wm-reset-1.wm-reset-2.wm-reset-3 {

/* Add Box Sizing Fix -SH */
box-sizing: border-box;
*, *::before, *:after {
	box-sizing: inherit;
}

/* Add back in the font awesome icons */
.fa {
  font-family: "Font Awesome 5 Pro";
  font-weight: 900;
}

/* A reset for the Div itself. Custom. */
-moz-osx-font-smoothing: grayscale;
-webkit-font-smoothing: antialiased;
border: 0;
font-family: -apple-system, BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
font-size: 16px;
line-height: 1;
margin: 0;
padding: 0;
vertical-align: baseline;

/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
textarea,
time, mark, audio, video,
/* Added hr to this list as it was missing -sh */
hr {
	border: 0;
	font-size: 100%;
	font: inherit;
	margin: 0;
	padding: 0;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
/* body {
	line-height: 1;
} */
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
}
`
