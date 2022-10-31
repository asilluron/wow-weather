exports.id = "src_server_render_tsx";
exports.ids = ["src_server_render_tsx"];
exports.modules = {

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_App_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



/**
 * Our Web Application
 */
function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "App"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("header", {
    className: "App-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h1", {
    className: "App-title"
  }, "Owen Wilson Weather Generator")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("p", {
    className: "App-intro"
  }, "wow"));
}

/***/ }),

/***/ "./src/server/config.ts":
/*!******************************!*\
  !*** ./src/server/config.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_manifest_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/manifest.json */ "./public/manifest.json");
/**
 * Configuration
 */


/** Whether we're running on a local desktop or on AWS Lambda */
const isLocal = process.env.IS_LOCAL || process.env.IS_OFFLINE;

/**
 * Configuration Options
 *
 * IMPORTANT:
 * The config is injected into the client (browser) and accessible through the {@link useConfig}
 * hook. However, due to this behavior, it is important NOT to expose any sensitive information
 * such as passwords or tokens through the config.
 */
const config = {
  /** Application Config */
  app: {
    /** Name of the app is loaded from the `manifest.json` */
    TITLE: _public_manifest_json__WEBPACK_IMPORTED_MODULE_0__.short_name,
    /** Theme is also loaded from the `manifest.json` */
    THEME_COLOR: _public_manifest_json__WEBPACK_IMPORTED_MODULE_0__.theme_color,
    /** URL to our public API Gateway endpoint */
    URL: isLocal ? `http://localhost:3000` : String(process.env.APIGATEWAY_URL),
    /** Where the bundled distribution files (`main.js`, `main.css`) are hosted */
    DIST_URL: isLocal ? "http://localhost:8080" : String(process.env.APP_DIST_URL),
    /** Where the contents of the `public` folder are hosted (might be the same as `config.app.DIST_URL`) */
    PUBLIC_URL: isLocal ? "http://localhost:8080" : String(process.env.APP_PUBLIC_URL)
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);

/***/ }),

/***/ "./src/server/html.tsx":
/*!*****************************!*\
  !*** ./src/server/html.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This HTML file acts as a template that we insert all our generated
 * application code into before sending it to the client as regular HTML.
 * Note we're returning a template string from this function.
 */
const html = ({
  stats,
  content,
  config,
  css = ''
}) => `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <meta name="theme-color" content="${config.app.THEME_COLOR}" />
      <title>${config.app.TITLE}</title>
      <link rel="manifest" href="${config.app.PUBLIC_URL}/manifest.json" />
      <link rel="shortcut icon" href="${config.app.PUBLIC_URL}/favicon.ico" />
      ${stats.styles.map(filename => `<link rel="stylesheet" href="${config.app.DIST_URL}/${filename}" />`).join('\n')}
      <style id="jss-server-side">${css}</style>
      <script id="config-server-side">
        window.__CONFIG__ = ${JSON.stringify(config)};
      </script>
    </head>
    <body>
      <div id="root">${content}</div>
      ${stats.scripts.map(filename => `<script src="${config.app.DIST_URL}/${filename}" crossorigin></script>`).join('\n')}
    </body>
  </html>`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (html);

/***/ }),

/***/ "./src/server/providers.ts":
/*!*********************************!*\
  !*** ./src/server/providers.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigContext": () => (/* binding */ ConfigContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Provide configuration settings
 */

const ConfigContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);

/***/ }),

/***/ "./src/server/render.tsx":
/*!*******************************!*\
  !*** ./src/server/render.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ "./node_modules/react-dom/server.node.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../App */ "./src/App.tsx");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/server/config.ts");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./html */ "./src/server/html.tsx");
/* harmony import */ var _providers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./providers */ "./src/server/providers.ts");
/**
 * Server Side Rendering
 */








/**
 * Server-side rendering
 */
async function render(_event) {
  // The stats are generated by the Webpack Stats Plugin (`webpack-stats-plugin`)
  const stats = await __webpack_require__.e(/*! import() */ "dist_stats_json").then(__webpack_require__.t.bind(__webpack_require__, /*! ../../dist/stats.json */ "./dist/stats.json", 19));
  const content = (0,react_dom_server__WEBPACK_IMPORTED_MODULE_1__.renderToString)( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_providers__WEBPACK_IMPORTED_MODULE_5__.ConfigContext.Provider, {
    value: _config__WEBPACK_IMPORTED_MODULE_3__["default"]
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_App__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
  return (0,_html__WEBPACK_IMPORTED_MODULE_4__["default"])({
    stats,
    content,
    config: _config__WEBPACK_IMPORTED_MODULE_3__["default"]
  });
}

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/***/ (() => {



/***/ }),

/***/ "./public/manifest.json":
/*!******************************!*\
  !*** ./public/manifest.json ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"short_name":"Wow Weather","name":"Wow Weather","icons":[{"src":"favicon.ico","sizes":"64x64 32x32 24x24 16x16","type":"image/x-icon"}],"display":"standalone","theme_color":"#000000","background_color":"#ffffff"}');

/***/ })

};
;
//# sourceMappingURL=src_server_render_tsx.js.map