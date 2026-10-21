"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["src_Application_Application_ts"],{

/***/ "./src/Application/UI/App.tsx"
/*!************************************!*\
  !*** ./src/Application/UI/App.tsx ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUI: () => (/* binding */ createUI),
/* harmony export */   createVolumeUI: () => (/* binding */ createVolumeUI),
/* harmony export */   disposeUI: () => (/* binding */ disposeUI)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/components/MotionConfig/index.mjs");
/* harmony import */ var _components_LoadingScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LoadingScreen */ "./src/Application/UI/components/LoadingScreen.tsx");
/* harmony import */ var _components_HelpPrompt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/HelpPrompt */ "./src/Application/UI/components/HelpPrompt.tsx");
/* harmony import */ var _components_InterfaceUI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/InterfaceUI */ "./src/Application/UI/components/InterfaceUI.tsx");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style.css */ "./src/Application/UI/style.css");
/* harmony import */ var _components_CinematicControls__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/CinematicControls */ "./src/Application/UI/components/CinematicControls.tsx");
/* harmony import */ var _components_HardwareControls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/HardwareControls */ "./src/Application/UI/components/HardwareControls.tsx");
/* harmony import */ var _components_ExperienceSettings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/ExperienceSettings */ "./src/Application/UI/components/ExperienceSettings.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;










var App = function App(_ref) {
  var hardware = _ref.hardware,
    quality = _ref.quality;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    intro = _useState4[0],
    setIntro = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    inMonitor = _useState6[0],
    setInMonitor = _useState6[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var enter = _EventBus__WEBPACK_IMPORTED_MODULE_6__["default"].on('enterMonitor', function () {
      return setInMonitor(true);
    });
    var leave = _EventBus__WEBPACK_IMPORTED_MODULE_6__["default"].on('leftMonitor', function () {
      return setInMonitor(false);
    });
    return function () {
      enter();
      leave();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_6__["default"].on('cinematicState', function (state) {
      return setIntro(state.active);
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_6__["default"].on('loadingScreenDone', function () {
      setLoading(false);
    });
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    id: "ui-app"
  }, !loading && !intro && !inMonitor && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_HelpPrompt__WEBPACK_IMPORTED_MODULE_4__["default"], null), !loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_HardwareControls__WEBPACK_IMPORTED_MODULE_9__["default"], {
    hardware: hardware
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_ExperienceSettings__WEBPACK_IMPORTED_MODULE_10__["default"], {
    quality: quality,
    started: !loading
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_CinematicControls__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_LoadingScreen__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
var createUI = function createUI(hardware, quality) {
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_2__.MotionConfig, {
    reducedMotion: "user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(App, {
    hardware: hardware,
    quality: quality
  })), document.getElementById('ui'));
};
var createVolumeUI = function createVolumeUI() {
  react_dom__WEBPACK_IMPORTED_MODULE_1__.render(/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_2__.MotionConfig, {
    reducedMotion: "user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_InterfaceUI__WEBPACK_IMPORTED_MODULE_5__["default"], null)), document.getElementById('ui-interactive'));
};
var disposeUI = function disposeUI() {
  ['ui', 'ui-interactive'].forEach(function (id) {
    var root = document.getElementById(id);
    if (root) react_dom__WEBPACK_IMPORTED_MODULE_1__.unmountComponentAtNode(root);
  });
};


/***/ },

/***/ "./src/Application/UI/components/CinematicControls.tsx"
/*!*************************************************************!*\
  !*** ./src/Application/UI/components/CinematicControls.tsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CinematicControls)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;

function CinematicControls() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].on('cinematicState', function (state) {
      return setActive(state.active);
    });
  }, []);
  if (!active) return null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "cinematic-controls",
    onMouseDown: function onMouseDown(event) {
      return event.stopPropagation();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    role: "status"
  }, "Room introduction"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch('skipCinematic', {});
    }
  }, "Skip intro"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch('enterPortfolio', {});
    }
  }, "Open portfolio"));
}

/***/ },

/***/ "./src/Application/UI/components/ExperienceSettings.tsx"
/*!**************************************************************!*\
  !*** ./src/Application/UI/components/ExperienceSettings.tsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ExperienceSettings)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/GraphicsQuality */ "./src/Application/Utils/GraphicsQuality.ts");
/* harmony import */ var _World_MonitorConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../World/MonitorConfig */ "./src/Application/World/MonitorConfig.ts");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;



function ExperienceSettings(_ref) {
  var quality = _ref.quality,
    started = _ref.started;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(quality.getSnapshot),
    _useState2 = _slicedToArray(_useState, 2),
    mode = _useState2[0],
    setMode = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('ready'),
    _useState4 = _slicedToArray(_useState3, 2),
    status = _useState4[0],
    setStatus = _useState4[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return quality.subscribe(function () {
      return setMode(quality.getSnapshot());
    });
  }, [quality]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].on('graphicsStatus', function (state) {
      return setStatus(state.status);
    });
  }, []);
  var url = (0,_World_MonitorConfig__WEBPACK_IMPORTED_MODULE_2__.resolveInnerSiteUrl)(window.location.search);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "experience-settings",
    onMouseDown: function onMouseDown(event) {
      return event.stopPropagation();
    }
  }, url && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", {
    className: "direct-portfolio",
    href: url
  }, "Open portfolio directly"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("details", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("summary", {
    tabIndex: 0
  }, "Experience options"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("label", {
    htmlFor: "graphics-quality"
  }, "Rendering quality"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("select", {
    id: "graphics-quality",
    "aria-describedby": "quality-description",
    value: mode,
    onChange: function onChange(event) {
      return quality.setMode(event.target.value);
    }
  }, Object.entries(_Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_1__.QUALITY_PRESETS).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      value = _ref3[0],
      preset = _ref3[1];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("option", {
      key: value,
      value: value
    }, preset.label);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    id: "quality-description"
  }, _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_1__.QUALITY_PRESETS[mode].description), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Quality changes apply to this visit. Portfolio screen resolution is unchanged."), started && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "experience-actions"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return _EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('enterPortfolio', {});
    }
  }, "Focus portfolio monitor"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return _EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('returnToRoom', {});
    }
  }, "Return to room"))), status !== 'ready' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    role: "alert",
    className: "graphics-recovery"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "The 3D view is paused while graphics recover. You can still open the portfolio directly."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return window.location.reload();
    }
  }, "Reload room")));
}

/***/ },

/***/ "./src/Application/UI/components/FreeCamToggle.tsx"
/*!*********************************************************!*\
  !*** ./src/Application/UI/components/FreeCamToggle.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Animation */ "./src/Application/UI/Animation.ts");
/* harmony import */ var _Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/MonitorSyntheticEvents */ "./src/Application/Utils/MonitorSyntheticEvents.ts");
/* harmony import */ var _static_textures_UI_camera_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../static/textures/UI/camera.svg */ "./static/textures/UI/camera.svg");
/* harmony import */ var _static_textures_UI_mouse_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../static/textures/UI/mouse.svg */ "./static/textures/UI/mouse.svg");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
;




// @ts-ignore

// @ts-ignore

var MuteToggle = function MuteToggle(_ref) {
  _objectDestructuringEmpty(_ref);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isHovering = _useState2[0],
    setIsHovering = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isActive = _useState4[0],
    setIsActive = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    freeCamActive = _useState6[0],
    setFreeCamActive = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState8 = _slicedToArray(_useState7, 2),
    blockEvents = _useState8[0],
    setBlockEvents = _useState8[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].on('freeCamReset', function () {
      return setFreeCamActive(false);
    });
  }, []);
  var onMouseDownHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    setIsActive(true);
    event.preventDefault();
    setFreeCamActive(!freeCamActive);
  }, [freeCamActive]);
  var iconSize = freeCamActive ? window.innerWidth < 768 ? 8 : 10 : window.innerWidth < 768 ? 4 : 6;
  var onMouseUpHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setIsActive(false);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var timer = setTimeout(function () {
      return setBlockEvents(false);
    }, 100);
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!blockEvents) {
      (0,_Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_4__.dispatchSyntheticMonitorKey)('_AUTO_');
      _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch('freeCamToggle', freeCamActive);
    }
  }, [freeCamActive]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.wrapper
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setIsHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovering(false);
    },
    style: styles.container,
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
    className: "icon-control-container",
    id: "prevent-click",
    role: "button",
    tabIndex: 0,
    "aria-label": "Toggle free camera",
    "aria-pressed": freeCamActive,
    onKeyDown: function onKeyDown(event) {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) onMouseDownHandler(event);
    },
    onKeyUp: onMouseUpHandler
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.img, {
    id: "prevent-click",
    src: freeCamActive ? _static_textures_UI_mouse_svg__WEBPACK_IMPORTED_MODULE_6__ : _static_textures_UI_camera_svg__WEBPACK_IMPORTED_MODULE_5__,
    style: {
      opacity: isActive ? 0.2 : isHovering ? 0.8 : 1
    },
    height: iconSize,
    animate: isActive ? 'active' : isHovering ? 'hovering' : 'default',
    variants: iconVars
  })));
};
var iconVars = {
  hovering: {
    // scale: 1.2,
    opacity: 0.8,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  },
  active: {
    scale: 0.8,
    opacity: 0.5,
    transition: {
      duration: 0.1,
      ease: _Animation__WEBPACK_IMPORTED_MODULE_3__.Easing.expOut
    }
  },
  "default": {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};
var indicatorVars = {
  active: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: _Animation__WEBPACK_IMPORTED_MODULE_3__.Easing.expOut
    }
  },
  hidden: {
    x: -4,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: _Animation__WEBPACK_IMPORTED_MODULE_3__.Easing.expOut
    }
  }
};
var styles = {
  container: {
    background: 'black',
    // padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    display: 'flex',
    // position: 'absolute',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MuteToggle);

/***/ },

/***/ "./src/Application/UI/components/HardwareControls.tsx"
/*!************************************************************!*\
  !*** ./src/Application/UI/components/HardwareControls.tsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HardwareControls)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;
function HardwareControls(_ref) {
  var hardware = _ref.hardware;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(hardware.getSnapshot),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setState(hardware.getSnapshot());
    return hardware.subscribe(setState);
  }, [hardware]);
  if (!state.available) return null;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("details", {
    className: "room-controls",
    onMouseDown: function onMouseDown(event) {
      return event.stopPropagation();
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("summary", {
    tabIndex: 0
  }, "Room controls"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    role: "group",
    "aria-label": "Room hardware controls"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    "aria-pressed": state.lampOn,
    onClick: function onClick() {
      return hardware.toggle('lamp');
    }
  }, "Desk lamp: ", state.lampOn ? 'On' : 'Off'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    "aria-pressed": state.pcLedsOn,
    onClick: function onClick() {
      return hardware.toggle('pc');
    }
  }, "PC accent LEDs: ", state.pcLedsOn ? 'On' : 'Off'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "The lamp base and PC front control also respond to clicks. PC LEDs are decorative.")));
}

/***/ },

/***/ "./src/Application/UI/components/HelpPrompt.tsx"
/*!******************************************************!*\
  !*** ./src/Application/UI/components/HelpPrompt.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Utils/MonitorSyntheticEvents */ "./src/Application/Utils/MonitorSyntheticEvents.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;
// import eventBus from '../EventBus';



var HELP_TEXT = 'Click anywhere to begin';
var HelpPrompt = function HelpPrompt() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    helpText = _useState2[0],
    setHelpText = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    setVisible = _useState4[1];
  var visRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(visible);
  var timers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  var _typeHelpText = function typeHelpText(i, curText) {
    if (i < HELP_TEXT.length && visRef.current) {
      timers.current.push(setTimeout(function () {
        (0,_Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_3__.dispatchSyntheticMonitorKey)("_AUTO_".concat(HELP_TEXT[i]));
        setHelpText(curText + HELP_TEXT[i]);
        _typeHelpText(i + 1, curText + HELP_TEXT[i]);
      }, Math.random() * 120 + 50));
    }
  };

  // make a document listener to listen to clicks

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    visRef.current = true;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var initial = setTimeout(function () {
      if (reducedMotion) setHelpText(HELP_TEXT);else _typeHelpText(0, '');
    }, 500);
    var hide = function hide() {
      return setVisible(false);
    };
    document.addEventListener('mousedown', hide);
    var unsubscribe = _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].on('enterMonitor', hide);
    return function () {
      visRef.current = false;
      clearTimeout(initial);
      timers.current.forEach(clearTimeout);
      document.removeEventListener('mousedown', hide);
      unsubscribe();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (visible == false) {
      (0,_Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_3__.dispatchSyntheticMonitorKey)('_AUTO_');
    }
    visRef.current = visible;
  }, [visible]);
  return helpText.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
    variants: vars,
    animate: visible ? 'visible' : 'hide',
    transition: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? {
      duration: 0
    } : undefined,
    style: styles.container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, helpText), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.blinkingContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "blinking-cursor"
  }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
var vars = {
  visible: {
    opacity: 1
  },
  hide: {
    y: 12,
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
var styles = {
  container: {
    position: 'absolute',
    bottom: 64,
    background: 'black',
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'flex-end'
  },
  blinkingContainer: {
    // width: 100,
    // height: 100,
    marginLeft: 8,
    paddingBottom: 2,
    paddingRight: 4
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpPrompt);

/***/ },

/***/ "./src/Application/UI/components/InfoOverlay.tsx"
/*!*******************************************************!*\
  !*** ./src/Application/UI/components/InfoOverlay.tsx ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _FreeCamToggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FreeCamToggle */ "./src/Application/UI/components/FreeCamToggle.tsx");
/* harmony import */ var _MuteToggle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MuteToggle */ "./src/Application/UI/components/MuteToggle.tsx");
/* harmony import */ var _portfolioIdentity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../portfolioIdentity */ "./src/Application/UI/portfolioIdentity.ts");
/* harmony import */ var _Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Utils/MonitorSyntheticEvents */ "./src/Application/Utils/MonitorSyntheticEvents.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;




var NAME_TEXT = _portfolioIdentity__WEBPACK_IMPORTED_MODULE_3__["default"].displayName;
var TITLE_TEXT = _portfolioIdentity__WEBPACK_IMPORTED_MODULE_3__["default"].roleTitle;
var MULTIPLIER = 1;
var InfoOverlay = function InfoOverlay(_ref) {
  var visible = _ref.visible;
  var visRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(visible);
  var mounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
  var timers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  var later = function later(callback, delay) {
    return timers.current.push(setTimeout(function () {
      if (mounted.current) callback();
    }, delay));
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      mounted.current = false;
      timers.current.forEach(clearTimeout);
    };
  }, []);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    nameText = _useState2[0],
    setNameText = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    titleText = _useState4[0],
    setTitleText = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(new Date().toLocaleTimeString()),
    _useState6 = _slicedToArray(_useState5, 2),
    time = _useState6[0],
    setTime = _useState6[1];
  var timeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(time);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var _media$addEventListen;
    var media = window.matchMedia('(prefers-reduced-motion: reduce)');
    var changed = function changed() {
      if (!media.matches) return;
      timers.current.forEach(clearTimeout);
      setNameText(NAME_TEXT);
      setTitleText(TITLE_TEXT);
      setTimeText(timeRef.current);
      setTextDone(true);
      setVolumeVisible(true);
      setFreeCamVisible(true);
    };
    (_media$addEventListen = media.addEventListener) === null || _media$addEventListen === void 0 || _media$addEventListen.call(media, 'change', changed);
    return function () {
      var _media$removeEventLis;
      return (_media$removeEventLis = media.removeEventListener) === null || _media$removeEventLis === void 0 ? void 0 : _media$removeEventLis.call(media, 'change', changed);
    };
  }, []);
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    timeText = _useState8[0],
    setTimeText = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState0 = _slicedToArray(_useState9, 2),
    textDone = _useState0[0],
    setTextDone = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    volumeVisible = _useState10[0],
    setVolumeVisible = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState12 = _slicedToArray(_useState11, 2),
    freeCamVisible = _useState12[0],
    setFreeCamVisible = _useState12[1];
  var _typeText = function typeText(i, curText, text, setText, callback, refOverride) {
    if (refOverride) {
      text = refOverride.current;
    }
    if (i < text.length) {
      later(function () {
        if (visRef.current === true) {
          (0,_Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_4__.dispatchSyntheticMonitorKey)("_AUTO_".concat(text[i]));
        }
        setText(curText + text[i]);
        _typeText(i + 1, curText + text[i], text, setText, callback, refOverride);
      }, Math.random() * 50 + 50 * MULTIPLIER);
    } else {
      callback();
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (visible && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timers.current.forEach(clearTimeout);
      setNameText(NAME_TEXT);
      setTitleText(TITLE_TEXT);
      setTimeText(timeRef.current);
      setTextDone(true);
      setVolumeVisible(true);
      setFreeCamVisible(true);
    } else if (visible && nameText == '') {
      later(function () {
        _typeText(0, '', NAME_TEXT, setNameText, function () {
          _typeText(0, '', TITLE_TEXT, setTitleText, function () {
            _typeText(0, '', time, setTimeText, function () {
              setTextDone(true);
            }, timeRef);
          });
        });
      }, 400);
    }
    visRef.current = visible;
  }, [visible]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (textDone) {
      later(function () {
        setVolumeVisible(true);
        later(function () {
          setFreeCamVisible(true);
        }, 250);
      }, 250);
    }
  }, [textDone]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    (0,_Utils_MonitorSyntheticEvents__WEBPACK_IMPORTED_MODULE_4__.dispatchSyntheticMonitorKey)('_AUTO_');
  }, [freeCamVisible, volumeVisible]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!visible) return;
    setTime(new Date().toLocaleTimeString());
    var interval = setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return function () {
      return clearInterval(interval);
    };
  }, [visible]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    timeRef.current = time;
    textDone && setTimeText(time);
  }, [time]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.wrapper
  }, nameText !== '' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, nameText)), titleText !== '' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.container
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, titleText)), timeText !== '' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.lastRow
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: Object.assign({}, styles.container, styles.lastRowChild)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, timeText)), volumeVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.lastRowChild
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_MuteToggle__WEBPACK_IMPORTED_MODULE_2__["default"], null)), freeCamVisible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.lastRowChild
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_FreeCamToggle__WEBPACK_IMPORTED_MODULE_1__["default"], null))));
};
var styles = {
  container: {
    background: 'var(--portfolio-panel)',
    borderLeft: '2px solid var(--portfolio-cyan)',
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
    textAlign: 'center',
    display: 'flex',
    marginBottom: 4,
    boxSizing: 'border-box'
  },
  wrapper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  blinkingContainer: {
    // width: 100,
    // height: 100,
    marginLeft: 8,
    paddingBottom: 2,
    paddingRight: 4
  },
  lastRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  lastRowChild: {
    marginRight: 4
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InfoOverlay);

/***/ },

/***/ "./src/Application/UI/components/InterfaceUI.tsx"
/*!*******************************************************!*\
  !*** ./src/Application/UI/components/InterfaceUI.tsx ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _InfoOverlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InfoOverlay */ "./src/Application/UI/components/InfoOverlay.tsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
;



var InterfaceUI = function InterfaceUI(_ref) {
  _objectDestructuringEmpty(_ref);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState2 = _slicedToArray(_useState, 2),
    initLoad = _useState2[0],
    setInitLoad = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visible = _useState4[0],
    setVisible = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var interfaceRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var unsubscribe = _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].on('loadingScreenDone', function () {
      setLoading(false);
    });

    // find element by id and set ref
    var element = document.getElementById('ui-interactive');
    if (element) {
      // @ts-ignore
      interfaceRef.current = element;
    }
    return unsubscribe;
  }, []);
  var initMouseDownHandler = function initMouseDownHandler() {
    setVisible(true);
    setInitLoad(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!loading && initLoad) {
      document.addEventListener('mousedown', initMouseDownHandler);
      return function () {
        document.removeEventListener('mousedown', initMouseDownHandler);
      };
    }
  }, [loading, initLoad]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var enter = _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].on('enterMonitor', function () {
      setVisible(false);
      setInitLoad(false);
      if (interfaceRef.current) {
        interfaceRef.current.style.pointerEvents = 'none';
      }
    });
    var leave = _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].on('leftMonitor', function () {
      setVisible(true);
      if (interfaceRef.current) {
        interfaceRef.current.style.pointerEvents = 'auto';
      }
    });
    return function () {
      enter();
      leave();
    };
  }, []);
  return !loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
    initial: "hide",
    variants: vars,
    animate: visible ? 'visible' : 'hide',
    style: styles.wrapper,
    className: "interface-wrapper",
    id: "prevent-click"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_InfoOverlay__WEBPACK_IMPORTED_MODULE_3__["default"], {
    visible: visible
  })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null);
};
var vars = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.3,
      ease: 'easeOut'
    }
  },
  hide: {
    x: -32,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};
var styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    boxSizing: 'border-box'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InterfaceUI);

/***/ },

/***/ "./src/Application/UI/components/LoadingScreen.tsx"
/*!*********************************************************!*\
  !*** ./src/Application/UI/components/LoadingScreen.tsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _portfolioIdentity__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../portfolioIdentity */ "./src/Application/UI/portfolioIdentity.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
;


var LoadingScreen = function LoadingScreen() {
  var started = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var timers = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
  var later = function later(callback, delay) {
    return timers.current.push(setTimeout(callback, delay));
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      return timers.current.forEach(clearTimeout);
    };
  }, []);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loadError = _useState2[0],
    setLoadError = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    progress = _useState4[0],
    setProgress = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState6 = _slicedToArray(_useState5, 2),
    toLoad = _useState6[0],
    setToLoad = _useState6[1];
  var _useState7 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState8 = _slicedToArray(_useState7, 2),
    loaded = _useState8[0],
    setLoaded = _useState8[1];
  var _useState9 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState0 = _slicedToArray(_useState9, 2),
    overlayOpacity = _useState0[0],
    setLoadingOverlayOpacity = _useState0[1];
  var _useState1 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1),
    _useState10 = _slicedToArray(_useState1, 2),
    loadingTextOpacity = _useState10[0],
    setLoadingTextOpacity = _useState10[1];
  var _useState11 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState12 = _slicedToArray(_useState11, 2),
    startPopupOpacity = _useState12[0],
    setStartPopupOpacity = _useState12[1];
  var _useState13 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState14 = _slicedToArray(_useState13, 2),
    firefoxPopupOpacity = _useState14[0],
    setFirefoxPopupOpacity = _useState14[1];
  var _useState15 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState16 = _slicedToArray(_useState15, 2),
    webGLErrorOpacity = _useState16[0],
    setWebGLErrorOpacity = _useState16[1];
  var _useState17 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState18 = _slicedToArray(_useState17, 2),
    showBiosInfo = _useState18[0],
    setShowBiosInfo = _useState18[1];
  var _useState19 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState20 = _slicedToArray(_useState19, 2),
    showLoadingResources = _useState20[0],
    setShowLoadingResources = _useState20[1];
  var _useState21 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState22 = _slicedToArray(_useState21, 2),
    doneLoading = _useState22[0],
    setDoneLoading = _useState22[1];
  var _useState23 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState24 = _slicedToArray(_useState23, 2),
    webGLError = _useState24[0],
    setWebGLError = _useState24[1];
  var _useState25 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),
    _useState26 = _slicedToArray(_useState25, 2),
    counter = _useState26[0],
    setCounter = _useState26[1];
  var _useState27 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState28 = _slicedToArray(_useState27, 1),
    resources = _useState28[0];
  var _useState29 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(window.innerWidth < 768),
    _useState30 = _slicedToArray(_useState29, 2),
    mobileWarning = _useState30[0],
    setMobileWarning = _useState30[1];
  var onResize = function onResize() {
    if (window.innerWidth < 768) {
      setMobileWarning(true);
    } else {
      setMobileWarning(false);
    }
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    window.addEventListener('resize', onResize);
    var unsubscribe = _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].on('resourceLoadError', function () {
      return setLoadError(true);
    });
    return function () {
      window.removeEventListener('resize', onResize);
      unsubscribe();
    };
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('debug')) {
      // Debug also waits for resources; it must not bypass scene readiness.
    } else if (!detectWebGLContext()) {
      setWebGLError(true);
    } else {
      setShowBiosInfo(true);
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].on('loadedSource', function (data) {
      setProgress(data.progress);
      setToLoad(data.toLoad);
      setLoaded(data.loaded);
      resources.push("Loaded ".concat(data.sourceName).concat(getSpace(data.sourceName), " ... ").concat(Math.round(data.progress * 100), "%"));
      if (resources.length > 8) {
        resources.shift();
      }
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    setShowLoadingResources(true);
    setCounter(counter + 1);
  }, [loaded]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (progress >= 1 && !webGLError) {
      setDoneLoading(true);
      later(function () {
        setLoadingTextOpacity(0);
        later(function () {
          setStartPopupOpacity(1);
        }, 500);
      }, 1000);
    }
  }, [progress]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (webGLError) {
      later(function () {
        setWebGLErrorOpacity(1);
      }, 500);
    }
  }, [webGLError]);
  var start = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (started.current || progress < 1 || webGLError || loadError) return;
    started.current = true;
    setLoadingOverlayOpacity(0);
    _EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch('loadingScreenDone', {});
    var ui = document.getElementById('ui');
    if (ui) {
      ui.style.pointerEvents = 'none';
    }
  }, [progress, webGLError, loadError]);
  var getSpace = function getSpace(sourceName) {
    var spaces = '';
    for (var i = 0; i < 24 - sourceName.length; i++) spaces += '\xa0';
    return spaces;
  };
  var getCurrentDate = function getCurrentDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    // add leading zero
    var monthFormatted = month < 10 ? "0".concat(month) : month;
    var dayFormatted = day < 10 ? "0".concat(day) : day;
    return "".concat(monthFormatted, "/").concat(dayFormatted, "/").concat(year);
  };
  var detectWebGLContext = function detectWebGLContext() {
    var canvas = document.createElement('canvas');

    // Get WebGLRenderingContext from canvas element.
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    // Report the result.
    if (gl && gl instanceof WebGLRenderingContext) {
      return true;
    }
    return false;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    "aria-hidden": overlayOpacity === 0,
    style: Object.assign({}, styles.overlay, {
      visibility: overlayOpacity === 0 ? 'hidden' : 'visible',
      opacity: overlayOpacity,
      transform: "scale(".concat(overlayOpacity === 0 ? 1.1 : 1, ")")
    })
  }, startPopupOpacity === 0 && loadingTextOpacity === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.blinkingContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "blinking-cursor"
  })), loadError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    role: "alert",
    className: "scene-load-error"
  }, "Room resources could not load. Check your connection and ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return window.location.reload();
    }
  }, "Reload"), "."), !webGLError && !loadError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: Object.assign({}, styles.overlayText, {
      opacity: loadingTextOpacity
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.header,
    className: "loading-screen-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.logoContainer
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: styles.green
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, _portfolioIdentity__WEBPACK_IMPORTED_MODULE_2__["default"].brandTitle)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.headerInfo
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "PORTFOLIO SYSTEM // BUILD 01"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "INTERACTIVE WORKSTATION"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.body,
    className: "loading-screen-body"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "SOFTWARE ENGINEERING // WORKSTATION INTERFACE"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), showBiosInfo && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "INITIALIZING INTERACTIVE PORTFOLIO"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Checking RAM : ", 14000, " OK"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), showLoadingResources ? progress == 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "FINISHED LOADING RESOURCES") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "loading"
  }, "LOADING RESOURCES (", loaded, "/", toLoad === 0 ? '-' : toLoad, ")") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    className: "loading"
  }, "WAIT")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.resourcesLoadingList
  }, resources.map(function (sourceName) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      key: sourceName
    }, sourceName);
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), showLoadingResources && doneLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "All Content Loaded, launching", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", {
    style: styles.green
  }, _portfolioIdentity__WEBPACK_IMPORTED_MODULE_2__["default"].launchTitle), ' ', "V1.0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "blinking-cursor"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.footer,
    className: "loading-screen-footer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Press ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, "DEL"), " to enter SETUP , ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, "ESC"), " to skip memory test"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, getCurrentDate()))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: Object.assign({}, styles.popupContainer, {
      opacity: startPopupOpacity
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.startPopup
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, _portfolioIdentity__WEBPACK_IMPORTED_MODULE_2__["default"].displayName, " | ", _portfolioIdentity__WEBPACK_IMPORTED_MODULE_2__["default"].roleTitle), mobileWarning && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: styles.warning
  }, "WARNING: This experience is best viewed on"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
    style: styles.warning
  }, "a desktop or laptop computer.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Click start to begin", '\xa0'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "blinking-cursor"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '16px'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "bios-start-button",
    onClick: start,
    role: "button",
    tabIndex: startPopupOpacity === 1 && overlayOpacity > 0 ? 0 : -1,
    "aria-disabled": startPopupOpacity !== 1 || loadError,
    onKeyDown: function onKeyDown(event) {
      if (startPopupOpacity === 1 && !event.repeat && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        start();
      }
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "START"))))), webGLError && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: Object.assign({}, styles.popupContainer, {
      opacity: webGLErrorOpacity
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.startPopup
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("b", {
    style: {
      color: 'red'
    }
  }, "CRITICAL ERROR:"), " No WebGL Detected"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    style: styles.spacer
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "WebGL is required to run this site."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "Please enable it or switch to a browser which supports WebGL"))));
};
var styles = {
  overlay: {
    backgroundColor: 'var(--portfolio-bg)',
    width: '100%',
    height: '100%',
    display: 'flex',
    transition: 'opacity 0.2s, transform 0.2s',
    MozTransition: 'opacity 0.2s, transform 0.2s',
    WebkitTransition: 'opacity 0.2s, transform 0.2s',
    OTransition: 'opacity 0.2s, transform 0.2s',
    msTransition: 'opacity 0.2s, transform 0.2s',
    transitionTimingFunction: 'ease-in-out',
    MozTransitionTimingFunction: 'ease-in-out',
    WebkitTransitionTimingFunction: 'ease-in-out',
    OTransitionTimingFunction: 'ease-in-out',
    msTransitionTimingFunction: 'ease-in-out',
    boxSizing: 'border-box',
    fontSize: 16,
    letterSpacing: 0
  },
  spacer: {
    height: 16
  },
  header: {
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row'
  },
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning: {
    color: 'var(--portfolio-magenta)'
  },
  blinkingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    padding: 48
  },
  startPopup: {
    backgroundColor: 'var(--portfolio-panel)',
    padding: 24,
    border: '1px solid var(--portfolio-cyan)',
    boxShadow: '0 0 32px rgba(0, 229, 255, 0.16)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: 500
    // alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 64
  },
  red: {
    color: 'var(--portfolio-violet)'
  },
  link: {
    // textDecoration: 'none',
    color: 'var(--portfolio-cyan)',
    cursor: 'pointer'
  },
  overlayText: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  body: {
    flex: 1,
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    flexDirection: 'column'
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  resourcesLoadingList: {
    display: 'flex',
    paddingLeft: 32,
    paddingBottom: 32,
    flexDirection: 'column'
  },
  logoImage: {
    width: 64,
    height: 42,
    imageRendering: 'pixelated',
    marginRight: 16
  },
  footer: {
    boxSizing: 'border-box',
    width: '100%'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoadingScreen);

/***/ },

/***/ "./src/Application/UI/components/MuteToggle.tsx"
/*!******************************************************!*\
  !*** ./src/Application/UI/components/MuteToggle.tsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/dom/motion.mjs");
/* harmony import */ var _EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _Animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Animation */ "./src/Application/UI/Animation.ts");
/* harmony import */ var _static_textures_UI_volume_on_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../static/textures/UI/volume_on.svg */ "./static/textures/UI/volume_on.svg");
/* harmony import */ var _static_textures_UI_volume_off_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../static/textures/UI/volume_off.svg */ "./static/textures/UI/volume_off.svg");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }
;



// @ts-ignore

// @ts-ignore

var MuteToggle = function MuteToggle(_ref) {
  _objectDestructuringEmpty(_ref);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isHovering = _useState2[0],
    setIsHovering = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isActive = _useState4[0],
    setIsActive = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    muted = _useState6[0],
    setMuted = _useState6[1];
  var onMouseDownHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    setIsActive(true);
    event.preventDefault();
    setMuted(!muted);
  }, [muted]);
  var onMouseUpHandler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setIsActive(false);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    _EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch('muteToggle', muted);
  }, [muted]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    onMouseEnter: function onMouseEnter() {
      return setIsHovering(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setIsHovering(false);
    },
    style: styles.container,
    onMouseDown: onMouseDownHandler,
    onMouseUp: onMouseUpHandler,
    className: "icon-control-container",
    id: "prevent-click",
    role: "button",
    tabIndex: 0,
    "aria-label": muted ? 'Unmute audio' : 'Mute audio',
    "aria-pressed": muted,
    onKeyDown: function onKeyDown(event) {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) onMouseDownHandler(event);
    },
    onKeyUp: onMouseUpHandler
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.img, {
    id: "prevent-click",
    src: muted ? _static_textures_UI_volume_off_svg__WEBPACK_IMPORTED_MODULE_5__ : _static_textures_UI_volume_on_svg__WEBPACK_IMPORTED_MODULE_4__,
    style: {
      opacity: isActive ? 0.2 : isHovering ? 0.8 : 1
    },
    width: window.innerWidth < 768 ? 8 : 10,
    animate: isActive ? 'active' : isHovering ? 'hovering' : 'default',
    variants: iconVars
  }));
};
var iconVars = {
  hovering: {
    // scale: 1.2,
    opacity: 0.8,
    transition: {
      duration: 0.1,
      ease: 'easeOut'
    }
  },
  active: {
    scale: 0.8,
    opacity: 0.5,
    transition: {
      duration: 0.1,
      ease: _Animation__WEBPACK_IMPORTED_MODULE_3__.Easing.expOut
    }
  },
  "default": {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};
var styles = {
  container: {
    background: 'black',
    // padding: 4,
    // paddingLeft: 8,
    // paddingRight: 8,
    textAlign: 'center',
    display: 'flex',
    // position: 'absolute',
    boxSizing: 'border-box',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MuteToggle);

/***/ },

/***/ "./src/Application/Shaders/coffee/fragment.glsl"
/*!******************************************************!*\
  !*** ./src/Application/Shaders/coffee/fragment.glsl ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nuniform float uTime;\nuniform float uTimeFrequency;\nuniform vec2 uUvFrequency;\nuniform vec3 uColor;\n\nvarying vec2 vUv;\n\nvec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }\nvec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }\n\nfloat perlin2d(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm =\n      1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01),\n                                                 dot(g10, g10), dot(g11, g11));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\nvoid main() {\n  vec2 uv = vUv * uUvFrequency;\n  uv.y -= uTime * uTimeFrequency;\n\n  float borderAlpha = min(vUv.x * 4.0, (1.0 - vUv.x) * 4.0);\n  borderAlpha = borderAlpha * (1.0 - vUv.y);\n\n  float perlin = perlin2d(uv);\n  perlin *= borderAlpha;\n  perlin *= 0.6;\n  perlin = min(perlin, 1.0);\n\n  gl_FragColor = vec4(uColor, perlin);\n}");

/***/ },

/***/ "./src/Application/Shaders/coffee/vertex.glsl"
/*!****************************************************!*\
  !*** ./src/Application/Shaders/coffee/vertex.glsl ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nuniform float uTime;\n\nvarying vec2 vUv;\n\nvec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }\nvec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }\n\nfloat perlin2d(vec2 P) {\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n  vec4 i = permute(permute(ix) + iy);\n  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...\n  vec4 gy = abs(gx) - 0.5;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n  vec2 g00 = vec2(gx.x, gy.x);\n  vec2 g10 = vec2(gx.y, gy.y);\n  vec2 g01 = vec2(gx.z, gy.z);\n  vec2 g11 = vec2(gx.w, gy.w);\n  vec4 norm =\n      1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01),\n                                                 dot(g10, g10), dot(g11, g11));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\nvoid main() {\n  vec3 newPosition = position;\n  vec2 displacementUv = uv;\n  displacementUv *= 5.0;\n  displacementUv.y -= uTime * 0.0002;\n\n  float displacementStrength = pow(uv.y * 3.0, 2.0);\n  float perlin = perlin2d(displacementUv) * displacementStrength;\n\n  newPosition.y += perlin * 0.1;\n\n  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);\n  vec4 viewPosition = viewMatrix * modelPosition;\n  vec4 projectionPosition = projectionMatrix * viewPosition;\n  gl_Position = projectionPosition;\n\n  vUv = uv;\n}");

/***/ },

/***/ "./src/Application/Shaders/screen/fragment.glsl"
/*!******************************************************!*\
  !*** ./src/Application/Shaders/screen/fragment.glsl ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#ifdef GL_ES\nprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nconst float PHI = 1.61803398874989484820459; // Φ = Golden Ratio\nuniform float u_time;\n\n// float gold_noise(vec2 xy, float seed) {\n//   return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);\n// }\n\nfloat noise(vec2 xy, float seed) {\n  return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);\n}\n\nvoid main() {\n  gl_FragColor = vec4(noise(gl_FragCoord.xy, fract(u_time) + 1.0),\n                      noise(gl_FragCoord.xy, fract(u_time) + 2.0),\n                      noise(gl_FragCoord.xy, fract(u_time) + 3.0), 0.01);\n}");

/***/ },

/***/ "./src/Application/Shaders/screen/vertex.glsl"
/*!****************************************************!*\
  !*** ./src/Application/Shaders/screen/vertex.glsl ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 1.0);\n}");

/***/ },

/***/ "./src/Application/UI/style.css"
/*!**************************************!*\
  !*** ./src/Application/UI/style.css ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/Application/Application.ts"
/*!****************************************!*\
  !*** ./src/Application/Application.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Application)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Utils_Debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/Debug */ "./src/Application/Utils/Debug.ts");
/* harmony import */ var _Utils_Sizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Sizes */ "./src/Application/Utils/Sizes.ts");
/* harmony import */ var _Utils_Time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/Time */ "./src/Application/Utils/Time.ts");
/* harmony import */ var _Camera_Camera__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Camera/Camera */ "./src/Application/Camera/Camera.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Renderer */ "./src/Application/Renderer.ts");
/* harmony import */ var _Utils_Mouse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utils/Mouse */ "./src/Application/Utils/Mouse.ts");
/* harmony import */ var _World_World__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./World/World */ "./src/Application/World/World.ts");
/* harmony import */ var _Utils_Resources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Utils/Resources */ "./src/Application/Utils/Resources.ts");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sources */ "./src/Application/sources.ts");
/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! stats.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var stats_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(stats_js__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Utils_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Utils/Loading */ "./src/Application/Utils/Loading.ts");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UI */ "./src/Application/UI/index.ts");
/* harmony import */ var _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Utils/GraphicsQuality */ "./src/Application/Utils/GraphicsQuality.ts");
/* harmony import */ var _Utils_Dispose__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Utils/Dispose */ "./src/Application/Utils/Dispose.ts");







//@ts-ignore








let instance = null;
class Application {
    constructor() {
        this.destroyed = false;
        this.updateMedia = () => {
            var _a;
            const pause = this.destroyed || this.time.paused || ((_a = this.mediaMotion) === null || _a === void 0 ? void 0 : _a.matches);
            document.querySelectorAll('#monitor-videos video').forEach(video => {
                if (pause)
                    video.pause();
                else
                    void video.play().catch(() => { });
            });
        };
        // Singleton
        if (instance) {
            return instance;
        }
        instance = this;
        // Global access
        //@ts-ignore
        // window.Application = this;
        // Setup
        this.quality = new _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_13__["default"]();
        this.debug = new _Utils_Debug__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.sizes = new _Utils_Sizes__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.mouse = new _Utils_Mouse__WEBPACK_IMPORTED_MODULE_6__["default"]();
        this.loading = new _Utils_Loading__WEBPACK_IMPORTED_MODULE_11__["default"]();
        this.time = new _Utils_Time__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.cssScene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.overlayScene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.resources = new _Utils_Resources__WEBPACK_IMPORTED_MODULE_8__["default"](_sources__WEBPACK_IMPORTED_MODULE_9__["default"]);
        this.camera = new _Camera_Camera__WEBPACK_IMPORTED_MODULE_4__["default"]();
        try {
            this.renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_5__["default"]();
        }
        catch (error) {
            this.destroy();
            throw error;
        }
        this.camera.createControls();
        this.world = new _World_World__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.ui = new _UI__WEBPACK_IMPORTED_MODULE_12__["default"]();
        this.resources.on('ready.rendererQuality', () => this.renderer.invalidateQuality());
        this.time.on('pause.application', () => { this.camera.resize(); this.updateMedia(); });
        this.time.on('resume.application', this.updateMedia);
        this.mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.mediaMotion.addEventListener('change', this.updateMedia);
        this.updateMedia();
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('debug')) {
            this.stats = new (stats_js__WEBPACK_IMPORTED_MODULE_10___default())();
            this.stats.showPanel(0);
            document.body.appendChild(this.stats.dom);
        }
        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        });
        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }
    update() {
        if (this.stats)
            this.stats.begin();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.stats)
            this.stats.end();
    }
    destroy() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        if (this.destroyed)
            return;
        this.destroyed = true;
        (_a = this.mediaMotion) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', this.updateMedia);
        document.querySelectorAll('#monitor-videos video').forEach(video => video.pause());
        (_b = this.time) === null || _b === void 0 ? void 0 : _b.dispose();
        (_c = this.sizes) === null || _c === void 0 ? void 0 : _c.dispose();
        (_d = this.ui) === null || _d === void 0 ? void 0 : _d.dispose();
        (_e = this.camera) === null || _e === void 0 ? void 0 : _e.dispose();
        (_f = this.world) === null || _f === void 0 ? void 0 : _f.dispose();
        const disposed = new WeakSet();
        if (this.scene)
            (0,_Utils_Dispose__WEBPACK_IMPORTED_MODULE_14__.disposeScene)(this.scene, disposed);
        (_g = this.resources) === null || _g === void 0 ? void 0 : _g.dispose(disposed);
        (_h = this.renderer) === null || _h === void 0 ? void 0 : _h.dispose();
        (_j = this.cssScene) === null || _j === void 0 ? void 0 : _j.clear();
        (_k = this.overlayScene) === null || _k === void 0 ? void 0 : _k.clear();
        (_l = this.scene) === null || _l === void 0 ? void 0 : _l.clear();
        (_m = this.quality) === null || _m === void 0 ? void 0 : _m.dispose();
        (_o = this.stats) === null || _o === void 0 ? void 0 : _o.dom.remove();
        if ((_p = this.debug) === null || _p === void 0 ? void 0 : _p.active)
            this.debug.ui.destroy();
    }
}


/***/ },

/***/ "./src/Application/Audio/AudioManager.ts"
/*!***********************************************!*\
  !*** ./src/Application/Audio/AudioManager.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Audio)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _AudioSources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AudioSources */ "./src/Application/Audio/AudioSources.ts");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");




const POS_DEBUG = false;
const DEFAULT_REF_DISTANCE = 10000;
class Audio {
    constructor() {
        this.disposed = false;
        this.subscriptions = [];
        this.nextAudio = 0;
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.listener = new three__WEBPACK_IMPORTED_MODULE_0__.AudioListener();
        this.application.camera.instance.add(this.listener);
        this.loadedAudio = this.application.resources.items.audio;
        this.scene = this.application.scene;
        this.audioPool = {};
        this.audioSources = {
            computer: new _AudioSources__WEBPACK_IMPORTED_MODULE_2__.ComputerAudio(this),
            ambience: new _AudioSources__WEBPACK_IMPORTED_MODULE_2__.AmbienceAudio(this),
        };
        this.context = this.listener.context;
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].on('loadingScreenDone', () => {
            if (!this.disposed)
                void this.context.resume().catch(() => { });
        }));
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].on('muteToggle', (mute) => {
            this.listener.setMasterVolume(mute ? 0 : 1);
        }));
    }
    playAudio(sourceName, options = {}) {
        if (this.disposed)
            return '';
        // Resume context if it's suspended
        if (this.context)
            void this.context.resume().catch(() => { });
        // Get the audio source
        sourceName = this.getRandomVariant(sourceName);
        // Setup
        const buffer = this.loadedAudio[sourceName];
        if (!buffer)
            return '';
        const poolKey = sourceName + '_' + this.nextAudio++;
        let audio = new three__WEBPACK_IMPORTED_MODULE_0__.Audio(this.listener);
        if (options.position) {
            audio = new three__WEBPACK_IMPORTED_MODULE_0__.PositionalAudio(this.listener);
            // @ts-ignore
            audio.setRefDistance(options.refDistance || DEFAULT_REF_DISTANCE);
            // @ts-ignore
            // audio.setDistanceModel('linear');
            const extraMaterialOptions = !POS_DEBUG
                ? {
                    transparent: true,
                    opacity: 0,
                }
                : {};
            const sphere = POS_DEBUG ? new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(100, 8, 8) : undefined;
            const material = POS_DEBUG ? new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial(Object.assign({ color: 0xff0000 }, extraMaterialOptions)) : undefined;
            const mesh = POS_DEBUG ? new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphere, material) : new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
            mesh.position.copy(options.position);
            mesh.name = poolKey;
            this.scene.add(mesh);
        }
        audio.setBuffer(buffer);
        if (options.filter) {
            const ac = audio.context;
            const filter = ac.createBiquadFilter();
            filter.type = options.filter.type; // Low pass filter
            filter.frequency.setValueAtTime(options.filter.frequency, ac.currentTime);
            // filter.frequency.linearRampToValueAtTime(2400, ac.currentTime + 2);
            audio.setFilter(filter);
        }
        // Set options
        audio.setLoop(options.loop ? true : false);
        audio.setVolume(options.volume || 1);
        audio.play();
        // add a filter to the audio
        // Calculate detune
        const detuneAmount = (Math.random() * 200 - 100) *
            (options.randDetuneScale ? options.randDetuneScale : 0);
        // Set detune after .play is called
        audio.setDetune(detuneAmount);
        if (options.pitch) {
            audio.setDetune(options.pitch * 100);
        }
        // Add to pool
        if (audio.source) {
            audio.source.onended = () => {
                audio.isPlaying = false;
                audio.disconnect();
                delete this.audioPool[poolKey];
                if (options.position) {
                    const positionalObject = this.scene.getObjectByName(poolKey);
                    if (positionalObject) {
                        this.scene.remove(positionalObject);
                    }
                }
            };
            this.audioPool[poolKey] = audio;
        }
        return poolKey;
    }
    setAudioFilterFrequency(audio, frequency) {
        const a = this.audioPool[audio];
        if (a) {
            const ac = a.context;
            const filter = a.getFilter();
            // clamp the frequency between 0 and 22500
            const f = Math.max(0, Math.min(22050, frequency));
            filter.frequency.setValueAtTime(f, ac.currentTime);
        }
    }
    setAudioVolume(audio, volume) {
        const a = this.audioPool[audio];
        if (a) {
            a.setVolume(volume);
        }
    }
    getRandomVariant(sourceName) {
        const variants = [];
        for (const key in this.loadedAudio) {
            if (key.includes(sourceName)) {
                variants.push(key);
            }
        }
        return variants[Math.floor(Math.random() * variants.length)];
    }
    update() {
        if (this.disposed)
            return;
        for (const key in this.audioSources) {
            const _key = key;
            this.audioSources[_key].update();
        }
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
        Object.values(this.audioSources).forEach(source => source.dispose());
        Object.entries(this.audioPool).forEach(([key, audio]) => {
            var _a;
            if (audio.source)
                audio.source.onended = null;
            if (audio.isPlaying)
                audio.stop();
            audio.disconnect();
            (_a = this.scene.getObjectByName(key)) === null || _a === void 0 ? void 0 : _a.removeFromParent();
        });
        this.audioPool = {};
        this.loadedAudio = {};
        this.listener.removeFromParent();
        this.listener.gain.disconnect();
    }
}


/***/ },

/***/ "./src/Application/Audio/AudioSources.ts"
/*!***********************************************!*\
  !*** ./src/Application/Audio/AudioSources.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AmbienceAudio: () => (/* binding */ AmbienceAudio),
/* harmony export */   AudioSource: () => (/* binding */ AudioSource),
/* harmony export */   ComputerAudio: () => (/* binding */ ComputerAudio)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");


class AudioSource {
    listen(type, listener) {
        document.addEventListener(type, listener);
        this.cleanup.push(() => document.removeEventListener(type, listener));
    }
    dispose() { this.cleanup.forEach(clean => clean()); this.cleanup = []; }
    constructor(manager) {
        this.cleanup = [];
        this.manager = manager;
    }
    update() { }
}
class ComputerAudio extends AudioSource {
    constructor(manager) {
        super(manager);
        this.listen('mousedown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('mouseDown', {
                    volume: 0.8,
                    position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(800, -300, 1200),
                });
            }
        });
        this.listen('mouseup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('mouseUp', {
                    volume: 0.8,
                    position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(800, -300, 1200),
                });
            }
        });
        this.listen('keyup', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                this.lastKey = '';
            }
        });
        this.listen('keydown', (event) => {
            if (typeof event.key !== 'string' || (!event.inComputer && !event.key.startsWith('_AUTO_')))
                return;
            if (event.key.includes('_AUTO_')) {
                this.manager.playAudio('ccType', {
                    volume: 0.1,
                    randDetuneScale: 0,
                    pitch: 20,
                });
                return;
            }
            if (this.lastKey === event.key)
                return;
            this.lastKey = event.key;
            // @ts-ignore
            if (event.inComputer) {
                this.manager.playAudio('keyboardKeydown', {
                    volume: 0.8,
                    position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-300, -400, 1200),
                });
            }
        });
    }
}
class AmbienceAudio extends AudioSource {
    constructor(manager) {
        super(manager);
        this.cleanup.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_1__["default"].on('loadingScreenDone', () => {
            this.poolKey = this.manager.playAudio('office', {
                volume: 1,
                loop: true,
                randDetuneScale: 0,
                filter: {
                    type: 'lowpass',
                    frequency: 1000,
                },
            });
            this.manager.playAudio('startup', {
                volume: 0.4,
                randDetuneScale: 0,
            });
        }));
    }
    mapValues(input, input_start, input_end, output_start, output_end) {
        return (output_start +
            ((output_end - output_start) / (input_end - input_start)) *
                (input - input_start));
    }
    update() {
        const cameraPosition = this.manager.application.camera.instance.position;
        const y = cameraPosition.y;
        const x = cameraPosition.x;
        const z = cameraPosition.z;
        // calculate distance to origin
        const distance = Math.sqrt(x * x + y * y + z * z);
        const freq = this.mapValues(distance, 0, 10000, 100, 22000);
        const volume = this.mapValues(distance, 1200, 10000, 0, 0.2);
        const volumeClamped = Math.min(Math.max(volume, 0.05), 0.1);
        this.manager.setAudioFilterFrequency(this.poolKey, freq - 3000);
        this.manager.setAudioVolume(this.poolKey, volumeClamped);
    }
}


/***/ },

/***/ "./src/Application/Camera/Camera.ts"
/*!******************************************!*\
  !*** ./src/Application/Camera/Camera.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraKey: () => (/* binding */ CameraKey),
/* harmony export */   "default": () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/EventEmitter */ "./src/Application/Utils/EventEmitter.ts");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var bezier_easing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bezier-easing */ "./node_modules/bezier-easing/src/index.js");
/* harmony import */ var bezier_easing__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bezier_easing__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CameraKeyframes */ "./src/Application/Camera/CameraKeyframes.ts");








var CameraKey;
(function (CameraKey) {
    CameraKey["IDLE"] = "idle";
    CameraKey["MONITOR"] = "monitor";
    CameraKey["LOADING"] = "loading";
    CameraKey["DESK"] = "desk";
    CameraKey["ORBIT_CONTROLS_START"] = "orbitControlsStart";
})(CameraKey || (CameraKey = {}));
class Camera extends _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.introActive = false;
        this.started = false;
        this.disposed = false;
        this.pendingStart = false;
        this.ownedTweens = [];
        this.subscriptions = [];
        this.onMouseDown = (event) => {
            var _a;
            if (this.freeCam || (event.target instanceof Element && event.target.closest('button, a, input, textarea, select, summary, [role="button"], .room-controls, .cinematic-controls')))
                return;
            if (this.introActive) {
                this.skipIntro();
                return;
            }
            if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.id) === 'prevent-click')
                return;
            if (this.currentKeyframe === CameraKey.IDLE || this.targetKeyframe === CameraKey.IDLE)
                this.transition(CameraKey.DESK);
            else if (this.currentKeyframe === CameraKey.DESK || this.targetKeyframe === CameraKey.DESK)
                this.transition(CameraKey.IDLE);
        };
        this.introStep = false;
        this.startExperience = () => {
            if (this.started || this.disposed)
                return;
            if (this.resources.loaded !== undefined && this.resources.loaded < this.resources.toLoad) {
                this.pendingStart = true;
                return;
            }
            this.started = true;
            this.pendingStart = false;
            if (this.reducedMotion.matches || this.sizes.width < 768) {
                this.settle(CameraKey.IDLE);
                return;
            }
            this.introActive = true;
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('cinematicState', { active: true });
            try {
                this.introStep = true;
                this.transition(CameraKey.DESK, 3000, _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Easing.Quintic.InOut, () => {
                    if (!this.introActive || this.disposed)
                        return;
                    try {
                        this.introStep = true;
                        this.transition(CameraKey.IDLE, 1800, _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Easing.Cubic.InOut, () => this.endIntro());
                    }
                    catch (error) {
                        console.error('Cinematic settle failed; returning to room.', error);
                        this.endIntro();
                        this.settle(CameraKey.IDLE);
                    }
                    finally {
                        this.introStep = false;
                    }
                });
            }
            catch (error) {
                console.error('Cinematic entrance failed; returning to room.', error);
                this.endIntro();
                this.settle(CameraKey.IDLE);
            }
            finally {
                this.introStep = false;
            }
        };
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.time = this.application.time;
        this.position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
        this.focalPoint = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 0);
        this.freeCam = false;
        this.keyframes = {
            idle: new _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__.IdleKeyframe(),
            monitor: new _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__.MonitorKeyframe(),
            loading: new _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__.LoadingKeyframe(),
            desk: new _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__.DeskKeyframe(),
            orbitControlsStart: new _CameraKeyframes__WEBPACK_IMPORTED_MODULE_7__.OrbitControlsStart(),
        };
        document.addEventListener('mousedown', this.onMouseDown);
        this.setPostLoadTransition();
        this.setInstance();
        this.setMonitorListeners();
        this.setFreeCamListeners();
    }
    transition(key, duration = 1000, easing, callback) {
        if (this.disposed)
            return;
        if (this.introActive && !this.introStep)
            this.endIntro();
        if (this.targetKeyframe === key && !this.reducedMotion.matches)
            return;
        this.cancelTransition();
        const keyframe = this.keyframes[key];
        keyframe.update();
        if (this.reducedMotion.matches || duration <= 0 || this.currentKeyframe === key) {
            this.settle(key);
            callback === null || callback === void 0 ? void 0 : callback();
            return;
        }
        this.currentKeyframe = undefined;
        this.targetKeyframe = key;
        this.completion = callback;
        const finish = () => {
            this.currentKeyframe = key;
            this.targetKeyframe = undefined;
            this.completion = undefined;
            this.ownedTweens = [];
            callback === null || callback === void 0 ? void 0 : callback();
        };
        this.ownedTweens = [
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Tween(this.position).to(keyframe.position, duration).easing(easing || _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Easing.Quintic.InOut),
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Tween(this.focalPoint).to(keyframe.focalPoint, duration).easing(easing || _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Easing.Quintic.InOut).onComplete(finish),
        ];
        this.ownedTweens.forEach(tween => tween.start());
    }
    cancelTransition() {
        this.ownedTweens.forEach(tween => tween.stop());
        this.ownedTweens = [];
        this.completion = undefined;
        this.targetKeyframe = undefined;
    }
    settle(key) {
        this.cancelTransition();
        this.keyframes[key].update();
        this.currentKeyframe = key;
        this.position.copy(this.keyframes[key].position);
        this.focalPoint.copy(this.keyframes[key].focalPoint);
        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }
    endIntro() {
        if (!this.introActive)
            return;
        this.introActive = false;
        _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('cinematicState', { active: false });
    }
    skipIntro() {
        if (!this.introActive || this.disposed)
            return;
        this.endIntro();
        this.settle(CameraKey.IDLE);
    }
    setInstance() {
        this.instance = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 10, 900000);
        this.currentKeyframe = CameraKey.LOADING;
        this.scene.add(this.instance);
    }
    setMonitorListeners() {
        this.on('enterMonitor', () => {
            // Orbit mode owns the camera until its explicit exit; ignore queued iframe hover.
            if (this.freeCam || this.targetKeyframe === CameraKey.ORBIT_CONTROLS_START)
                return;
            this.transition(CameraKey.MONITOR, 2000, bezier_easing__WEBPACK_IMPORTED_MODULE_6___default()(0.13, 0.99, 0, 1));
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('enterMonitor', {});
        });
        this.on('leftMonitor', () => {
            if (this.freeCam || this.targetKeyframe === CameraKey.ORBIT_CONTROLS_START)
                return;
            this.transition(CameraKey.DESK);
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('leftMonitor', {});
        });
    }
    setFreeCamListeners() {
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].on('freeCamToggle', (toggle) => {
            if (this.disposed)
                return;
            this.endIntro();
            if (toggle && this.freeCam)
                return;
            this.freeCam = false;
            if (toggle) {
                this.transition(CameraKey.ORBIT_CONTROLS_START, 750, bezier_easing__WEBPACK_IMPORTED_MODULE_6___default()(0.13, 0.99, 0, 1), () => {
                    this.instance.position.copy(this.keyframes.orbitControlsStart.position);
                    this.orbitControls.update();
                    this.freeCam = true;
                });
                // @ts-ignore
                document.getElementById('webgl').style.pointerEvents = 'auto';
            }
            else {
                this.freeCam = false;
                this.transition(CameraKey.IDLE, 4000, _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].Easing.Exponential.Out);
                // @ts-ignore
                document.getElementById('webgl').style.pointerEvents = 'none';
            }
        }));
    }
    setPostLoadTransition() {
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].on('loadingScreenDone', this.startExperience));
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].on('skipCinematic', () => this.skipIntro()));
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].on('enterPortfolio', () => {
            if (this.started && !this.disposed)
                this.trigger('enterMonitor');
        }));
        this.subscriptions.push(_UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].on('returnToRoom', () => {
            if (!this.started || this.disposed)
                return;
            if (this.freeCam || this.targetKeyframe === CameraKey.ORBIT_CONTROLS_START) {
                _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('freeCamToggle', false);
                _UI_EventBus__WEBPACK_IMPORTED_MODULE_5__["default"].dispatch('freeCamReset', {});
            }
            else
                this.trigger('leftMonitor');
        }));
        this.resources.on('ready.cinematic', () => { if (this.pendingStart)
            this.startExperience(); });
    }
    resize() {
        if (this.introActive)
            this.skipIntro();
        else if (this.targetKeyframe) {
            const key = this.targetKeyframe, callback = this.completion;
            this.settle(key);
            callback === null || callback === void 0 ? void 0 : callback();
        }
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }
    createControls() {
        this.renderer = this.application.renderer;
        this.orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_3__.OrbitControls(this.instance, this.renderer.instance.domElement);
        const { x, y, z } = this.keyframes.orbitControlsStart.focalPoint;
        this.orbitControls.target.set(x, y, z);
        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;
        this.orbitControls.object.position.copy(this.keyframes.orbitControlsStart.position);
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minDistance = 4000;
        this.orbitControls.maxDistance = 29000;
        this.orbitControls.update();
    }
    update() {
        if (this.disposed)
            return;
        if (this.introActive && (this.reducedMotion.matches || this.sizes.width < 768))
            this.skipIntro();
        if (this.reducedMotion.matches && this.targetKeyframe) {
            const key = this.targetKeyframe, callback = this.completion;
            this.settle(key);
            callback === null || callback === void 0 ? void 0 : callback();
        }
        for (const key in this.keyframes) {
            // Keep the reveal stable, but follow the idle target during settling.
            // Updating before Tween.js prevents a moving-keyframe snap at completion.
            if (this.introActive && this.targetKeyframe !== CameraKey.IDLE)
                continue;
            const _key = key;
            if (this.reducedMotion.matches && (_key === CameraKey.IDLE || _key === CameraKey.DESK))
                continue;
            this.keyframes[_key].update();
        }
        _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_4__["default"].update();
        if (this.orbitControls)
            this.orbitControls.enableDamping = !this.reducedMotion.matches;
        if (this.freeCam && this.orbitControls) {
            this.position.copy(this.orbitControls.object.position);
            this.focalPoint.copy(this.orbitControls.target);
            this.orbitControls.update();
            return;
        }
        if (this.currentKeyframe) {
            const keyframe = this.keyframes[this.currentKeyframe];
            this.position.copy(keyframe.position);
            this.focalPoint.copy(keyframe.focalPoint);
        }
        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }
    dispose() {
        var _a;
        if (this.disposed)
            return;
        this.disposed = true;
        this.endIntro();
        this.cancelTransition();
        document.removeEventListener('mousedown', this.onMouseDown);
        this.subscriptions.forEach(unsubscribe => unsubscribe());
        this.subscriptions = [];
        this.resources.off('ready.cinematic');
        this.off('enterMonitor');
        this.off('leftMonitor');
        (_a = this.orbitControls) === null || _a === void 0 ? void 0 : _a.dispose();
    }
}


/***/ },

/***/ "./src/Application/Camera/CameraKeyframes.ts"
/*!***************************************************!*\
  !*** ./src/Application/Camera/CameraKeyframes.ts ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CameraKeyframeInstance: () => (/* binding */ CameraKeyframeInstance),
/* harmony export */   DeskKeyframe: () => (/* binding */ DeskKeyframe),
/* harmony export */   IdleKeyframe: () => (/* binding */ IdleKeyframe),
/* harmony export */   LoadingKeyframe: () => (/* binding */ LoadingKeyframe),
/* harmony export */   MonitorKeyframe: () => (/* binding */ MonitorKeyframe),
/* harmony export */   OrbitControlsStart: () => (/* binding */ OrbitControlsStart)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");


class CameraKeyframeInstance {
    constructor(keyframe) {
        this.position = keyframe.position;
        this.focalPoint = keyframe.focalPoint;
    }
    update() { }
}
const keys = {
    idle: {
        position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-20000, 12000, 20000),
        focalPoint: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -1000, 0),
    },
    monitor: {
        position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 950, 2000),
        focalPoint: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 950, 0),
    },
    desk: {
        position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 1800, 5500),
        focalPoint: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 500, 0),
    },
    loading: {
        position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-35000, 35000, 35000),
        focalPoint: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -5000, 0),
    },
    orbitControlsStart: {
        position: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-15000, 10000, 15000),
        focalPoint: new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-100, 350, 0),
    },
};
class MonitorKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.monitor;
        super(keyframe);
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.sizes = this.application.sizes;
        this.origin = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.position);
        this.targetPos = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.position);
    }
    update() {
        const aspect = this.sizes.height / this.sizes.width;
        const additionalZoom = this.sizes.width < 768 ? 0 : 600;
        this.targetPos.z = this.origin.z + aspect * 1200 - additionalZoom;
        this.position.copy(this.targetPos);
    }
}
class LoadingKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.loading;
        super(keyframe);
    }
    update() { }
}
class DeskKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.desk;
        super(keyframe);
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.mouse = this.application.mouse;
        this.sizes = this.application.sizes;
        this.origin = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.position);
        this.targetFoc = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.focalPoint);
        this.targetPos = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.position);
    }
    update() {
        this.targetFoc.x +=
            (this.mouse.x - this.sizes.width / 2 - this.targetFoc.x) * 0.05;
        this.targetFoc.y +=
            (-(this.mouse.y - this.sizes.height) - this.targetFoc.y) * 0.05;
        this.targetPos.x +=
            (this.mouse.x - this.sizes.width / 2 - this.targetPos.x) * 0.025;
        this.targetPos.y +=
            (-(this.mouse.y - this.sizes.height * 2) - this.targetPos.y) *
                0.025;
        const aspect = this.sizes.height / this.sizes.width;
        this.targetPos.z = this.origin.z + aspect * 3000 - 1800;
        this.focalPoint.copy(this.targetFoc);
        this.position.copy(this.targetPos);
    }
}
class IdleKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.idle;
        super(keyframe);
        this.origin = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3().copy(keyframe.position);
        this.time = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]().time;
    }
    update() {
        this.position.x =
            Math.sin((this.time.elapsed + 19000) * 0.00008) * this.origin.x;
        this.position.y =
            Math.sin((this.time.elapsed + 1000) * 0.000004) * 4000 +
                this.origin.y -
                3000;
        this.position.z = this.position.z;
    }
}
class OrbitControlsStart extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.orbitControlsStart;
        super(keyframe);
    }
    update() { }
}


/***/ },

/***/ "./src/Application/Renderer.ts"
/*!*************************************!*\
  !*** ./src/Application/Renderer.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_renderers_CSS3DRenderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/renderers/CSS3DRenderer.js */ "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Application */ "./src/Application/Application.ts");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI/EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _Shaders_screen_vertex_glsl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shaders/screen/vertex.glsl */ "./src/Application/Shaders/screen/vertex.glsl");
/* harmony import */ var _Shaders_screen_fragment_glsl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Shaders/screen/fragment.glsl */ "./src/Application/Shaders/screen/fragment.glsl");
/* harmony import */ var _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utils/GraphicsQuality */ "./src/Application/Utils/GraphicsQuality.ts");
/* harmony import */ var _World_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./World/Cyberpunk/RoomMode */ "./src/Application/World/Cyberpunk/RoomMode.ts");




// @ts-ignore

// @ts-ignore



class Renderer {
    constructor() {
        this.qualityDirty = true;
        this.disposed = false;
        this.lost = new Set();
        this.contextLost = (event) => {
            event.preventDefault();
            if (event.currentTarget)
                this.lost.add(event.currentTarget);
            this.application.time.setPaused('context', true);
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('graphicsStatus', { status: 'lost' });
        };
        this.contextRestored = (event) => {
            if (event.currentTarget)
                this.lost.delete(event.currentTarget);
            if (this.lost.size)
                return;
            this.qualityDirty = true;
            this.resize();
            this.application.time.setPaused('context', false);
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('graphicsStatus', { status: 'ready' });
        };
        this.invalidateQuality = () => { this.qualityDirty = true; };
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.time = this.application.time;
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.overlayScene = this.application.overlayScene;
        this.camera = this.application.camera;
        try {
            this.setInstance();
        }
        catch (error) {
            this.dispose();
            throw error;
        }
        this.unsubscribe = this.application.quality.subscribe(this.invalidateQuality);
        [this.instance, this.overlayInstance].forEach(renderer => {
            renderer.domElement.setAttribute('aria-hidden', 'true');
            renderer.domElement.addEventListener('webglcontextlost', this.contextLost);
            renderer.domElement.addEventListener('webglcontextrestored', this.contextRestored);
        });
    }
    setInstance() {
        var _a, _b, _c;
        this.instance = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        // Settings
        // this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;
        // One bounded practical-light shadow map; no new renderer or postprocessing pass.
        this.instance.shadowMap.enabled = !(0,_World_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_7__.usesLegacyRoom)(window.location.search);
        this.instance.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_0__.PCFSoftShadowMap;
        // this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        // this.instance.toneMappingExposure = 0.9;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.instance.setClearColor(0x000000, 0.0);
        // Style
        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1px';
        this.instance.domElement.style.top = '0px';
        (_a = document.querySelector('#webgl')) === null || _a === void 0 ? void 0 : _a.appendChild(this.instance.domElement);
        this.overlayInstance = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.domElement.style.position = 'absolute';
        this.overlayInstance.domElement.style.top = '0px';
        this.overlayInstance.domElement.style.mixBlendMode = 'soft-light';
        this.overlayInstance.domElement.style.opacity = '0.12';
        // this.overlayInstance.domElement.style.mixBlendMode = 'luminosity';
        // this.overlayInstance.domElement.style.opacity = '1';
        this.overlayInstance.domElement.style.pointerEvents = 'none';
        (_b = document
            .querySelector('#overlay')) === null || _b === void 0 ? void 0 : _b.appendChild(this.overlayInstance.domElement);
        this.cssInstance = new three_examples_jsm_renderers_CSS3DRenderer_js__WEBPACK_IMPORTED_MODULE_1__.CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';
        (_c = document
            .querySelector('#css')) === null || _c === void 0 ? void 0 : _c.appendChild(this.cssInstance.domElement);
        this.uniforms = {
            u_time: { value: 1 },
        };
        this.overlay = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(10000, 10000), new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({
            vertexShader: _Shaders_screen_vertex_glsl__WEBPACK_IMPORTED_MODULE_4__["default"],
            fragmentShader: _Shaders_screen_fragment_glsl__WEBPACK_IMPORTED_MODULE_5__["default"],
            uniforms: this.uniforms,
            depthTest: false,
            depthWrite: false,
        }));
        this.overlayScene.add(this.overlay);
    }
    resize() {
        if (this.disposed)
            return;
        this.qualityDirty = true;
        this.applyQuality();
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.overlayInstance.setSize(this.sizes.width, this.sizes.height);
    }
    applyQuality() {
        const preset = _Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_6__.QUALITY_PRESETS[this.application.quality.getSnapshot()];
        const deviceRatio = Number.isFinite(this.sizes.pixelRatio) && this.sizes.pixelRatio > 0 ? this.sizes.pixelRatio : 1;
        const ratio = Math.min(deviceRatio, preset.dpr);
        this.instance.setPixelRatio(ratio);
        this.overlayInstance.setPixelRatio(Math.min(ratio, 1));
        this.overlayInstance.domElement.style.display = preset.overlay ? '' : 'none';
        const shadowsEnabled = preset.shadow > 0 && !(0,_World_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_7__.usesLegacyRoom)(window.location.search);
        const shadowModeChanged = this.instance.shadowMap.enabled !== shadowsEnabled;
        this.instance.shadowMap.enabled = shadowsEnabled;
        const updatedMaterials = new Set();
        this.scene.traverse(object => {
            var _a;
            // r137 does not invalidate a lit program just because shadowMap.enabled changes.
            if (shadowModeChanged && object instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach(material => {
                    if (material instanceof three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial && !updatedMaterials.has(material)) {
                        material.needsUpdate = true;
                        updatedMaterials.add(material);
                    }
                });
            }
            const shadow = object.shadow;
            if (!shadow)
                return;
            const size = preset.shadow || 512;
            if (shadow.mapSize.x !== size || shadow.mapSize.y !== size || !preset.shadow) {
                (_a = shadow.map) === null || _a === void 0 ? void 0 : _a.dispose();
                // r137 initializes this to null; its installed declaration omits nullability.
                shadow.map = null;
                shadow.mapSize.set(size, size);
                shadow.needsUpdate = true;
            }
        });
        this.qualityDirty = false;
    }
    update() {
        if (this.disposed || this.lost.size)
            return;
        if (this.qualityDirty)
            this.applyQuality();
        if (this.uniforms)
            this.uniforms.u_time.value = this.camera.reducedMotion.matches ? 0 : Math.sin(this.time.current * 0.01);
        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
        if (_Utils_GraphicsQuality__WEBPACK_IMPORTED_MODULE_6__.QUALITY_PRESETS[this.application.quality.getSnapshot()].overlay) {
            this.overlay.position.copy(this.camera.instance.position);
            this.overlayInstance.render(this.overlayScene, this.camera.instance);
        }
    }
    dispose() {
        var _a, _b;
        if (this.disposed)
            return;
        this.disposed = true;
        (_a = this.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(this);
        [this.instance, this.overlayInstance].forEach(renderer => {
            if (!renderer)
                return;
            renderer.domElement.removeEventListener('webglcontextlost', this.contextLost);
            renderer.domElement.removeEventListener('webglcontextrestored', this.contextRestored);
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
        });
        (_b = this.cssInstance) === null || _b === void 0 ? void 0 : _b.domElement.remove();
        if (this.overlay) {
            this.overlay.geometry.dispose();
            this.overlay.material.dispose();
            this.overlay.removeFromParent();
        }
        this.lost.clear();
    }
}


/***/ },

/***/ "./src/Application/UI/Animation.ts"
/*!*****************************************!*\
  !*** ./src/Application/UI/Animation.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Easing: () => (/* binding */ Easing)
/* harmony export */ });
const Easing = {
    sHard: [0.95, 0, 0.5, 1],
    sMedium: [0.8, 0, 0.2, 1],
    sSoft: [0.6, 0, 0.4, 1],
    expIn: [0.9, 0.05, 1, 0.3],
    expOut: [0.05, 0.7, 0.1, 1],
    expInOut: [0.9, 0.05, 0.1, 1],
};


/***/ },

/***/ "./src/Application/UI/EventBus.ts"
/*!****************************************!*\
  !*** ./src/Application/UI/EventBus.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const UIEventBus = {
    on(event, callback) {
        const listener = (e) => callback(e.detail);
        document.addEventListener(event, listener);
        return () => document.removeEventListener(event, listener);
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UIEventBus);


/***/ },

/***/ "./src/Application/UI/index.ts"
/*!*************************************!*\
  !*** ./src/Application/UI/index.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/Application/UI/App.tsx");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");


class UI {
    constructor() {
        (0,_App__WEBPACK_IMPORTED_MODULE_0__.createUI)(new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]().world.hardware, new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]().quality);
        (0,_App__WEBPACK_IMPORTED_MODULE_0__.createVolumeUI)();
    }
    dispose() { ;(0,_App__WEBPACK_IMPORTED_MODULE_0__.disposeUI)(); }
}


/***/ },

/***/ "./src/Application/Utils/BakedModel.ts"
/*!*********************************************!*\
  !*** ./src/Application/Utils/BakedModel.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BakedModel)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

class BakedModel {
    constructor(model, texture, scale) {
        this.model = model;
        this.texture = texture;
        this.texture.flipY = false;
        this.texture.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;
        this.material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({
            map: this.texture,
        });
        this.model.scene.traverse((child) => {
            if (child instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh) {
                if (scale)
                    child.scale.set(scale, scale, scale);
                child.material.map = this.texture;
                child.material = this.material;
            }
        });
        return this;
    }
    getModel() {
        return this.model.scene;
    }
}


/***/ },

/***/ "./src/Application/Utils/Debug.ts"
/*!****************************************!*\
  !*** ./src/Application/Utils/Debug.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Debug)
/* harmony export */ });
/* harmony import */ var lil_gui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lil-gui */ "./node_modules/lil-gui/dist/lil-gui.esm.js");

class Debug {
    constructor() {
        this.active = window.location.hash === '#debug';
        if (this.active) {
            this.ui = new lil_gui__WEBPACK_IMPORTED_MODULE_0__.GUI();
        }
    }
}


/***/ },

/***/ "./src/Application/Utils/Dispose.ts"
/*!******************************************!*\
  !*** ./src/Application/Utils/Dispose.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   disposeOnce: () => (/* binding */ disposeOnce),
/* harmony export */   disposeScene: () => (/* binding */ disposeScene)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

function disposeOnce(resource, seen) {
    if (!resource || seen.has(resource))
        return;
    seen.add(resource);
    resource.dispose();
}
function disposeScene(root, seen) {
    root.traverse(object => {
        const mesh = object;
        if (mesh.geometry)
            disposeOnce(mesh.geometry, seen);
        if (object instanceof three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh)
            disposeOnce(object, seen);
        const materials = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
        materials.forEach(material => {
            Object.values(material).forEach(value => { if (value instanceof three__WEBPACK_IMPORTED_MODULE_0__.Texture)
                disposeOnce(value, seen); });
            if (material instanceof three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial)
                Object.values(material.uniforms).forEach(uniform => {
                    if (uniform.value instanceof three__WEBPACK_IMPORTED_MODULE_0__.Texture)
                        disposeOnce(uniform.value, seen);
                });
            disposeOnce(material, seen);
        });
        const shadow = object.shadow;
        if (shadow)
            disposeOnce(shadow.map, seen);
    });
}


/***/ },

/***/ "./src/Application/Utils/EventEmitter.ts"
/*!***********************************************!*\
  !*** ./src/Application/Utils/EventEmitter.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    /**
     * Constructor
     */
    constructor() {
        this.callbacks = {};
        this.callbacks.base = {};
    }
    on(_names, callback) {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong names');
            return false;
        }
        if (typeof callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }
        // Resolve names
        const names = this.resolveNames(_names);
        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name);
            // Create namespace if not exist
            if (!(this.callbacks[name.namespace] instanceof Object))
                this.callbacks[name.namespace] = {};
            // Create callback if not exist
            if (!(this.callbacks[name.namespace][name.value] instanceof Array))
                this.callbacks[name.namespace][name.value] = [];
            // Add callback
            this.callbacks[name.namespace][name.value].push(callback);
        });
        return this;
    }
    off(_names) {
        // Errors
        if (typeof _names === 'undefined' || _names === '') {
            console.warn('wrong name');
            return false;
        }
        // Resolve names
        const names = this.resolveNames(_names);
        // Each name
        names.forEach((_name) => {
            // Resolve name
            const name = this.resolveName(_name);
            // Remove namespace
            if (name.namespace !== 'base' && name.value === '') {
                delete this.callbacks[name.namespace];
            }
            // Remove specific callback in namespace
            else {
                // Default
                if (name.namespace === 'base') {
                    // Try to remove from each namespace
                    for (const namespace in this.callbacks) {
                        if (this.callbacks[namespace] instanceof Object &&
                            this.callbacks[namespace][name.value] instanceof
                                Array) {
                            delete this.callbacks[namespace][name.value];
                            // Remove namespace if empty
                            if (Object.keys(this.callbacks[namespace])
                                .length === 0)
                                delete this.callbacks[namespace];
                        }
                    }
                }
                // Specified namespace
                else if (this.callbacks[name.namespace] instanceof Object &&
                    this.callbacks[name.namespace][name.value] instanceof Array) {
                    delete this.callbacks[name.namespace][name.value];
                    // Remove namespace if empty
                    if (Object.keys(this.callbacks[name.namespace]).length === 0)
                        delete this.callbacks[name.namespace];
                }
            }
        });
        return this;
    }
    trigger(_name, _args) {
        // Errors
        if (typeof _name === 'undefined' || _name === '') {
            console.warn('wrong name');
            return false;
        }
        const that = this;
        let finalResult = null;
        let result = null;
        // Default args
        const args = !(_args instanceof Array) ? [] : _args;
        // Resolve names (should on have one event)
        let _names = this.resolveNames(_name);
        // Resolve name
        const name = this.resolveName(_names[0]);
        // Default namespace
        if (name.namespace === 'base') {
            // Try to find callback in each namespace
            for (const namespace in this.callbacks) {
                if (this.callbacks[namespace] instanceof Object &&
                    this.callbacks[namespace][name.value] instanceof Array) {
                    this.callbacks[namespace][name.value].forEach(function (callback) {
                        result = callback.apply(that, args);
                        if (typeof finalResult === 'undefined') {
                            finalResult = result;
                        }
                    });
                }
            }
        }
        // Specified namespace
        else if (this.callbacks[name.namespace] instanceof Object) {
            if (name.value === '') {
                console.warn('wrong name');
                return this;
            }
            this.callbacks[name.namespace][name.value].forEach(function (callback) {
                result = callback.apply(that, args);
                if (typeof finalResult === 'undefined')
                    finalResult = result;
            });
        }
        return finalResult;
    }
    resolveNames(_names) {
        let names = _names;
        names = names.replace(/[^a-zA-Z0-9 ,/.]/g, '');
        names = names.replace(/[,/]+/g, ' ');
        return names.split(' ');
    }
    resolveName(name) {
        const parts = name.split('.');
        const newName = {
            original: name,
            value: parts[0],
            namespace: 'base',
        };
        // Specified namespace
        if (parts.length > 1 && parts[1] !== '') {
            newName.namespace = parts[1];
        }
        return newName;
    }
}


/***/ },

/***/ "./src/Application/Utils/GraphicsQuality.ts"
/*!**************************************************!*\
  !*** ./src/Application/Utils/GraphicsQuality.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QUALITY_PRESETS: () => (/* binding */ QUALITY_PRESETS),
/* harmony export */   "default": () => (/* binding */ GraphicsQuality)
/* harmony export */ });
const QUALITY_PRESETS = {
    high: { label: 'High', dpr: 2, shadow: 1024, overlay: true, description: 'Full room lighting and surface effects; up to 2× resolution.' },
    balanced: { label: 'Balanced', dpr: 1.5, shadow: 512, overlay: false, description: 'Lower resolution and shadow detail; no decorative overlay.' },
    performance: { label: 'Performance', dpr: 1, shadow: 0, overlay: false, description: 'Up to 1× CSS-pixel resolution, no real-time shadows or decorative overlay. Portfolio input stays available.' },
};
/** Session-only, explicit user preference. No device ranking or automatic switching. */
class GraphicsQuality {
    constructor() {
        this.mode = 'high';
        this.listeners = new Set();
        this.getSnapshot = () => this.mode;
        this.subscribe = (listener) => {
            this.listeners.add(listener);
            return () => { this.listeners.delete(listener); };
        };
        this.setMode = (mode) => {
            if (!Object.prototype.hasOwnProperty.call(QUALITY_PRESETS, mode) || mode === this.mode)
                return;
            this.mode = mode;
            this.listeners.forEach(listener => listener());
        };
    }
    dispose() { this.listeners.clear(); }
}


/***/ },

/***/ "./src/Application/Utils/Loading.ts"
/*!******************************************!*\
  !*** ./src/Application/Utils/Loading.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Loading)
/* harmony export */ });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventEmitter */ "./src/Application/Utils/EventEmitter.ts");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");



class Loading extends _EventEmitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.resources = this.application.resources;
        this.scene = this.application.scene;
        this.on('loadedSource', (sourceName, loaded, toLoad) => {
            this.progress = loaded / toLoad;
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_2__["default"].dispatch('loadedSource', {
                sourceName: sourceName,
                progress: loaded / toLoad,
                toLoad: toLoad,
                loaded: loaded,
            });
        });
    }
}


/***/ },

/***/ "./src/Application/Utils/MonitorSyntheticEvents.ts"
/*!*********************************************************!*\
  !*** ./src/Application/Utils/MonitorSyntheticEvents.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dispatchSyntheticMonitorKey: () => (/* binding */ dispatchSyntheticMonitorKey)
/* harmony export */ });
function dispatchSyntheticMonitorKey(key) {
    if (typeof key !== 'string' || !key.length || key.length > 64 || /[\u0000-\u001f\u007f]/.test(key))
        return;
    const iframe = document.getElementById('computer-screen');
    if (!iframe)
        return;
    const event = new CustomEvent('keydown', {
        bubbles: true,
        cancelable: false,
    });
    Object.assign(event, { inComputer: true, key });
    iframe.dispatchEvent(event);
}


/***/ },

/***/ "./src/Application/Utils/Mouse.ts"
/*!****************************************!*\
  !*** ./src/Application/Utils/Mouse.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mouse)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/Application/Utils/EventEmitter.ts");

class Mouse extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        // Setup
        this.x = 0;
        this.y = 0;
        this.inComputer = false;
        // this.application = new Application();
        // this.audio = this.application.world.audio;
        // Resize event
        this.on('mousemove', (event) => {
            if (event.clientX && event.clientY) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
            this.inComputer = event.inComputer ? true : false;
        });
    }
}


/***/ },

/***/ "./src/Application/Utils/Resources.ts"
/*!********************************************!*\
  !*** ./src/Application/Utils/Resources.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Resources)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/loaders/GLTFLoader.js */ "./node_modules/three/examples/jsm/loaders/GLTFLoader.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventEmitter */ "./src/Application/Utils/EventEmitter.ts");
/* harmony import */ var _Dispose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Dispose */ "./src/Application/Utils/Dispose.ts");






class Resources extends _EventEmitter__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor(sources) {
        super();
        this.disposed = false;
        this.released = new WeakSet();
        this.sources = sources;
        this.items = { texture: {}, cubeTexture: {}, gltfModel: {}, audio: {} };
        this.toLoad = this.sources.length;
        this.loaded = 0;
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.loading = this.application.loading;
        this.setLoaders();
        this.startLoading();
    }
    setLoaders() {
        this.loaders = {
            gltfLoader: new three_examples_jsm_loaders_GLTFLoader_js__WEBPACK_IMPORTED_MODULE_1__.GLTFLoader(),
            textureLoader: new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(),
            cubeTextureLoader: new three__WEBPACK_IMPORTED_MODULE_0__.CubeTextureLoader(),
            audioLoader: new three__WEBPACK_IMPORTED_MODULE_0__.AudioLoader(),
        };
    }
    startLoading() {
        const failed = () => { if (!this.disposed)
            _UI_EventBus__WEBPACK_IMPORTED_MODULE_3__["default"].dispatch('resourceLoadError', {}); };
        // Load each source
        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                }, undefined, failed);
            }
            else if (source.type === 'texture') {
                this.loaders.textureLoader.load(source.path, (file) => {
                    file.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;
                    this.sourceLoaded(source, file);
                }, undefined, failed);
            }
            else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(source.path, (file) => {
                    this.sourceLoaded(source, file);
                }, undefined, failed);
            }
            else if (source.type === 'audio') {
                this.loaders.audioLoader.load(source.path, (buffer) => {
                    this.sourceLoaded(source, buffer);
                }, undefined, failed);
            }
        }
    }
    sourceLoaded(source, file) {
        if (this.disposed) {
            this.release(file, this.released);
            return;
        }
        this.items[source.type][source.name] = file;
        this.loaded++;
        this.loading.trigger('loadedSource', [
            source.name,
            this.loaded,
            this.toLoad,
        ]);
        if (this.loaded === this.toLoad) {
            this.trigger('ready');
        }
    }
    release(file, seen) {
        if (file instanceof three__WEBPACK_IMPORTED_MODULE_0__.Texture)
            (0,_Dispose__WEBPACK_IMPORTED_MODULE_5__.disposeOnce)(file, seen);
        const scene = file.scene;
        if (scene instanceof three__WEBPACK_IMPORTED_MODULE_0__.Object3D)
            (0,_Dispose__WEBPACK_IMPORTED_MODULE_5__.disposeScene)(scene, seen);
    }
    dispose(seen = new WeakSet()) {
        if (this.disposed)
            return;
        this.disposed = true;
        this.released = seen;
        this.off('ready');
        Object.values(this.items).forEach(items => Object.values(items).forEach(file => this.release(file, seen)));
        this.items = { texture: {}, cubeTexture: {}, gltfModel: {}, audio: {} };
    }
}


/***/ },

/***/ "./src/Application/Utils/Sizes.ts"
/*!****************************************!*\
  !*** ./src/Application/Utils/Sizes.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sizes)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./src/Application/Utils/EventEmitter.ts");

class Sizes extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.pixelRatio = window.devicePixelRatio || 1;
        this.disposed = false;
        this.changed = () => {
            if (this.disposed)
                return;
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.pixelRatio = window.devicePixelRatio || 1;
            this.watchScale();
            this.trigger('resize');
        };
        window.addEventListener('resize', this.changed);
        this.watchScale();
    }
    watchScale() {
        var _a, _b, _c, _d;
        (_b = (_a = this.media) === null || _a === void 0 ? void 0 : _a.removeEventListener) === null || _b === void 0 ? void 0 : _b.call(_a, 'change', this.changed);
        this.media = window.matchMedia('(resolution: ' + this.pixelRatio + 'dppx)');
        (_d = (_c = this.media).addEventListener) === null || _d === void 0 ? void 0 : _d.call(_c, 'change', this.changed);
    }
    dispose() {
        var _a, _b;
        if (this.disposed)
            return;
        this.disposed = true;
        window.removeEventListener('resize', this.changed);
        (_b = (_a = this.media) === null || _a === void 0 ? void 0 : _a.removeEventListener) === null || _b === void 0 ? void 0 : _b.call(_a, 'change', this.changed);
        this.off('resize');
    }
}


/***/ },

/***/ "./src/Application/Utils/Time.ts"
/*!***************************************!*\
  !*** ./src/Application/Utils/Time.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Time)
/* harmony export */ });
/* harmony import */ var _UI_EventBus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../UI/EventBus */ "./src/Application/UI/EventBus.ts");
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventEmitter */ "./src/Application/Utils/EventEmitter.ts");


class Time extends _EventEmitter__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;
        this.frame = null;
        this.reasons = new Set();
        this.pausedAt = 0;
        this.disposed = false;
        this.visibility = () => this.setPaused('visibility', document.hidden);
        this.unsubscribe = _UI_EventBus__WEBPACK_IMPORTED_MODULE_0__["default"].on('loadingScreenDone', () => {
            this.start = Date.now();
            this.elapsed = 0;
            if (this.reasons.size)
                this.pausedAt = this.start;
        });
        document.addEventListener('visibilitychange', this.visibility);
        this.visibility();
        this.schedule();
    }
    get paused() { return this.reasons.size > 0; }
    schedule() {
        if (!this.disposed && !this.reasons.size && this.frame === null)
            this.frame = window.requestAnimationFrame(() => this.tick());
    }
    setPaused(reason, paused) {
        if (this.disposed)
            return;
        const wasPaused = this.reasons.size > 0;
        if (paused)
            this.reasons.add(reason);
        else
            this.reasons.delete(reason);
        if (!wasPaused && this.reasons.size) {
            this.pausedAt = Date.now();
            if (this.frame !== null)
                window.cancelAnimationFrame(this.frame);
            this.frame = null;
            this.trigger('pause');
        }
        else if (wasPaused && !this.reasons.size) {
            const now = Date.now();
            this.start += now - this.pausedAt;
            this.current = now;
            this.delta = 16;
            this.trigger('resume');
            this.schedule();
        }
    }
    tick() {
        this.frame = null;
        if (this.disposed || this.reasons.size)
            return;
        const now = Date.now();
        this.delta = Math.min(Math.max(now - this.current, 0), 100);
        this.current = now;
        this.elapsed = now - this.start;
        this.trigger('tick');
        this.schedule();
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        if (this.frame !== null)
            window.cancelAnimationFrame(this.frame);
        this.frame = null;
        document.removeEventListener('visibilitychange', this.visibility);
        this.unsubscribe();
        this.off('tick');
        this.off('pause');
        this.off('resume');
    }
}


/***/ },

/***/ "./src/Application/World/CoffeeSteam.ts"
/*!**********************************************!*\
  !*** ./src/Application/World/CoffeeSteam.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CoffeeSteam)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Shaders_coffee_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Shaders/coffee/fragment.glsl */ "./src/Application/Shaders/coffee/fragment.glsl");
/* harmony import */ var _Shaders_coffee_vertex_glsl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Shaders/coffee/vertex.glsl */ "./src/Application/Shaders/coffee/vertex.glsl");


// @ts-ignore

// @ts-ignore

class CoffeeSteam {
    constructor() {
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.resources = this.application.resources;
        this.scene = this.application.scene;
        this.time = this.application.time;
        this.setModel();
    }
    setModel() {
        this.model = {};
        this.model.color = '#c9c9c9';
        // Material
        this.model.material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader: _Shaders_coffee_vertex_glsl__WEBPACK_IMPORTED_MODULE_3__["default"],
            fragmentShader: _Shaders_coffee_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__["default"],
            uniforms: {
                uTime: { value: 0 },
                uTimeFrequency: { value: 0.001 },
                uUvFrequency: { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(3, 5) },
                uColor: { value: new three__WEBPACK_IMPORTED_MODULE_0__.Color(this.model.color) },
            },
        });
        this.model.mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(280, 700), this.model.material);
        this.model.mesh.position.copy(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(1670, 200, 900));
        this.scene.add(this.model.mesh);
    }
    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed;
    }
}


/***/ },

/***/ "./src/Application/World/Computer.ts"
/*!*******************************************!*\
  !*** ./src/Application/World/Computer.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/BakedModel */ "./src/Application/Utils/BakedModel.ts");


class Computer {
    constructor() {
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.bakeModel();
        this.setModel();
    }
    bakeModel() {
        this.bakedModel = new _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__["default"](this.resources.items.gltfModel.computerSetupModel, this.resources.items.texture.computerSetupTexture, 900);
    }
    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/Architecture.ts"
/*!*********************************************************!*\
  !*** ./src/Application/World/Cyberpunk/Architecture.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createArchitecture: () => (/* binding */ createArchitecture)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

function createArchitecture(kit, materials) {
    const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    root.name = 'Architecture';
    // Open front/left: the established idle/orbit camera can see into the room.
    kit.box(root, materials.black, [14200, 180, 11000], [0, -2810, 2100], 'Foundation');
    for (let index = 0; index < 20; index++) {
        kit.box(root, materials.floor, [694, 40, 11000], [-6593 + index * 694, -2700, 2100]);
    }
    kit.box(root, materials.wall, [14200, 9400, 180], [0, 2000, -3490], 'BackWall');
    kit.box(root, materials.wall, [180, 9400, 7600], [7010, 2000, 200], 'RightWall');
    kit.box(root, materials.metal, [14000, 160, 50], [0, -2560, -3370], 'Skirting');
    kit.box(root, materials.metal, [50, 160, 7500], [6890, -2560, 200]);
    for (let x = -6000; x <= 6000; x += 2000) {
        kit.box(root, materials.black, [16, 9200, 10], [x, 2000, -3390], 'WallSeam');
    }
    for (let index = 0; index < 7; index++) {
        const x = -2250 + index * 750;
        kit.box(root, materials.black, [650, 2300, 150], [x, 1750, -3310], 'AcousticPanel');
        for (let rib = 0; rib < 6; rib++) {
            kit.box(root, materials.fabric, [55, 2180, 65], [x - 245 + rib * 98, 1750, -3200]);
        }
    }
    kit.box(root, materials.violet, [4700, 14, 20], [0, 3030, -3240], 'PanelEdgeLight');
    const shelf = kit.group(root, 'Shelving', [-4100, 1800, -2950]);
    for (const y of [0, 1200]) {
        kit.box(shelf, materials.desk, [2200, 90, 650], [0, y, 0], 'Shelf');
        for (const x of [-800, 800]) {
            kit.box(shelf, materials.metal, [60, 380, 60], [x, y - 200, -230]);
            kit.box(shelf, materials.metal, [60, 60, 440], [x, y - 70, -80]);
        }
    }
    for (let index = 0; index < 6; index++) {
        kit.box(shelf, index % 3 ? materials.graphite : materials.metal, [110 + index * 9, 450 + (index % 3) * 90, 340], [-700 + index * 180, 300, -20], 'UnlabelledBook');
    }
    kit.box(shelf, materials.graphite, [550, 300, 430], [550, 1410, 20], 'Storage');
    // A recessed service channel is architectural detail, not another neon strip.
    kit.box(root, materials.black, [5300, 70, 100], [-350, -700, -3320], 'CableChannel');
    kit.batchBoxes(root);
    return root;
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/CyberpunkRoom.ts"
/*!**********************************************************!*\
  !*** ./src/Application/World/Cyberpunk/CyberpunkRoom.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CyberpunkRoom)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _RoomKit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RoomKit */ "./src/Application/World/Cyberpunk/RoomKit.ts");
/* harmony import */ var _Materials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Materials */ "./src/Application/World/Cyberpunk/Materials.ts");
/* harmony import */ var _Architecture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Architecture */ "./src/Application/World/Cyberpunk/Architecture.ts");
/* harmony import */ var _Workstation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Workstation */ "./src/Application/World/Cyberpunk/Workstation.ts");
/* harmony import */ var _MonitorArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MonitorArray */ "./src/Application/World/Cyberpunk/MonitorArray.ts");
/* harmony import */ var _PCTower__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PCTower */ "./src/Application/World/Cyberpunk/PCTower.ts");
/* harmony import */ var _Lighting__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Lighting */ "./src/Application/World/Cyberpunk/Lighting.ts");
/* harmony import */ var _HardwareState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./HardwareState */ "./src/Application/World/Cyberpunk/HardwareState.ts");









/** Original room; all animation is driven by World through the existing frame loop. */
class CyberpunkRoom extends three__WEBPACK_IMPORTED_MODULE_0__.Group {
    constructor(hardware) {
        super();
        this.kit = new _RoomKit__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.lampLevel = 1;
        this.pcLevel = 1;
        this.disposed = false;
        this.fanSpeed = 0;
        this.hardware = hardware || new _HardwareState__WEBPACK_IMPORTED_MODULE_8__["default"]();
        this.ownsHardware = !hardware;
        this.name = 'CyberpunkRoom';
        const materials = (0,_Materials__WEBPACK_IMPORTED_MODULE_2__.createMaterials)(this.kit);
        this.add((0,_Architecture__WEBPACK_IMPORTED_MODULE_3__.createArchitecture)(this.kit, materials));
        this.add((0,_Workstation__WEBPACK_IMPORTED_MODULE_4__.createWorkstation)(this.kit, materials));
        this.add((0,_MonitorArray__WEBPACK_IMPORTED_MODULE_5__.createMonitorArray)(this.kit, materials));
        const pc = (0,_PCTower__WEBPACK_IMPORTED_MODULE_6__.createPCTower)(this.kit, materials);
        this.rotors = pc.rotors;
        this.add(pc.root, (0,_Lighting__WEBPACK_IMPORTED_MODULE_7__.createLighting)());
        const byMaterial = (name) => [...this.kit.materials].find(material => material.name === name);
        this.practical = this.getObjectByName('WarmPractical');
        this.practicalIntensity = this.practical.intensity;
        this.diffuser = byMaterial('warm');
        this.diffuserIntensity = this.diffuser.emissiveIntensity;
        this.pcAccents = ['PCCyan', 'PCViolet', 'PCMagenta'].map(name => {
            const material = byMaterial(name);
            return { material, intensity: material.emissiveIntensity };
        });
        this.keyboardStatus = byMaterial('KeyboardStatus');
        this.targets = [
            { id: 'lamp', objects: ['LampBaseControl', 'LampSwitch'].map(name => this.getObjectByName(name)), highlight: byMaterial('LampControl') },
            { id: 'pc', objects: ['PCAccentControl', 'PCPowerButton'].map(name => this.getObjectByName(name)), highlight: byMaterial('PCControl') },
        ];
        this.hardware.setAvailable(true);
        this.userData.provenance = 'Original procedural geometry and locally generated textures; inherited center compositor is separate.';
        // Only the three rotors animate transforms; retain root placement and skip
        // redundant local matrix composition for the remaining original hardware.
        this.updateMatrixWorld(true);
        const animated = new Set(this.rotors);
        this.traverse(object => {
            if (object !== this && !animated.has(object))
                object.matrixAutoUpdate = false;
        });
    }
    update(deltaMilliseconds, reducedMotion = false) {
        if (this.disposed || !Number.isFinite(deltaMilliseconds))
            return;
        const delta = Math.min(Math.max(deltaMilliseconds, 0), 50);
        const state = this.hardware.getSnapshot();
        const blend = reducedMotion ? 1 : 1 - Math.exp(-delta / 90);
        this.lampLevel += ((state.lampOn ? 1 : 0) - this.lampLevel) * blend;
        this.pcLevel += ((state.pcLedsOn ? 1 : 0) - this.pcLevel) * blend;
        this.practical.intensity = this.practicalIntensity * this.lampLevel;
        this.practical.visible = this.lampLevel > 0.001;
        this.diffuser.emissiveIntensity = this.diffuserIntensity * this.lampLevel;
        this.pcAccents.forEach(({ material, intensity }) => { material.emissiveIntensity = intensity * this.pcLevel; });
        this.hardware.typingEnergy = reducedMotion ? 0 : Math.max(0, this.hardware.typingEnergy - delta / 180);
        this.keyboardStatus.emissiveIntensity = 0.12 + this.hardware.typingEnergy * 0.24;
        if (reducedMotion)
            this.fanSpeed = 0;
        if (!reducedMotion) {
            this.fanSpeed += (1 - this.fanSpeed) * (1 - Math.exp(-delta / 400));
            const angle = delta * 0.0012 * this.fanSpeed;
            this.rotors.forEach(rotor => { rotor.rotation.z = (rotor.rotation.z + angle) % (Math.PI * 2); });
        }
    }
    dispose() {
        if (this.disposed)
            return;
        this.disposed = true;
        this.traverse(object => {
            var _a;
            if (object instanceof three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh)
                object.dispose();
            if (object instanceof three__WEBPACK_IMPORTED_MODULE_0__.SpotLight)
                (_a = object.shadow.map) === null || _a === void 0 ? void 0 : _a.dispose();
        });
        this.kit.dispose();
        this.hardware.setAvailable(false);
        if (this.ownsHardware)
            this.hardware.dispose();
        this.targets.length = 0;
        this.rotors.length = 0;
        this.removeFromParent();
        this.clear();
    }
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/Displays.ts"
/*!*****************************************************!*\
  !*** ./src/Application/World/Cyberpunk/Displays.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayTexture: () => (/* binding */ displayTexture)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

/** Original static illustrations, deliberately not personal projects or live telemetry. */
function displayTexture(kit, mode) {
    const fallback = () => {
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__.DataTexture(new Uint8Array([8, 11, 20, 255]), 1, 1);
        texture.needsUpdate = true;
        return kit.texture(texture);
    };
    if (typeof document === 'undefined')
        return fallback();
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = 480;
    const context = canvas.getContext('2d');
    if (!context) {
        console.warn('[CyberpunkRoom] Decorative display unavailable; portfolio monitor is preserved.');
        return fallback();
    }
    context.fillStyle = '#080b14';
    context.fillRect(0, 0, 768, 480);
    context.fillStyle = '#101827';
    context.fillRect(0, 0, 768, 54);
    context.font = '19px monospace';
    context.fillStyle = '#8b9bb2';
    context.fillText(mode === 'terminal' ? 'WORKSPACE / TERMINAL' : 'SYSTEM / DISPLAY STUDY', 28, 34);
    for (let index = 0; index < 3; index++) {
        context.fillStyle = ['#466075', '#385a68', '#514067'][index];
        context.fillRect(675 + index * 24, 22, 8, 8);
    }
    context.fillStyle = '#00e5ff';
    context.fillRect(26, 72, 3, 320);
    context.font = '18px monospace';
    if (mode === 'terminal') {
        const lines = [
            '$ preview --local', '',
            'function frame(time) {',
            '  const view = scene.update(time);',
            '  renderer.draw(view);',
            '}', '',
            '> awaiting input_',
        ];
        lines.forEach((line, index) => {
            context.fillStyle = '#46546b';
            context.fillText(String(index + 1).padStart(2, '0'), 12, 105 + index * 36);
            context.fillStyle = index === 0 || index === 7 ? '#00e5ff' : '#b5c3d8';
            context.fillText(line, 52, 105 + index * 36);
        });
    }
    else {
        context.fillStyle = '#142032';
        for (let row = 0; row < 4; row++)
            context.fillRect(52, 220 + row * 32, 650, 1);
        for (let column = 0; column < 3; column++) {
            const x = 52 + column * 226;
            context.fillStyle = '#1b2436';
            context.fillRect(x, 92, 200, 92);
            context.fillStyle = '#b5c3d8';
            context.fillText(['DISPLAY', 'INPUT', 'LOCAL'][column], x + 16, 126);
            context.fillStyle = '#8b5cf6';
            context.fillText('CONCEPT', x + 16, 158);
        }
        context.strokeStyle = '#00a8bd';
        context.lineWidth = 2;
        context.beginPath();
        for (let index = 0; index < 64; index++) {
            const x = 52 + index * 10;
            const y = 282 + Math.sin(index * 0.22) * 26 + Math.sin(index * 0.49) * 13;
            if (index)
                context.lineTo(x, y);
            else
                context.moveTo(x, y);
        }
        context.stroke();
        context.fillStyle = '#8b9bb2';
        context.fillText('Illustrative signal / no live metrics', 52, 360);
    }
    context.font = '15px monospace';
    context.fillStyle = '#65758e';
    context.fillText('STATIC DEMO  /  ORIGINAL DISPLAY ART', 28, 447);
    const texture = kit.texture(new three__WEBPACK_IMPORTED_MODULE_0__.CanvasTexture(canvas));
    texture.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;
    texture.anisotropy = 2;
    return texture;
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/HardwareDetails.ts"
/*!************************************************************!*\
  !*** ./src/Application/World/Cyberpunk/HardwareDetails.ts ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fasteners: () => (/* binding */ fasteners),
/* harmony export */   monitorDetails: () => (/* binding */ monitorDetails),
/* harmony export */   sculptedKeycap: () => (/* binding */ sculptedKeycap)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

/** Original low-poly keycap: tapered walls, bevel rim and a shallow dished top. */
function sculptedKeycap() {
    const positions = [];
    const indices = [];
    const quad = (a, b, c, d) => {
        const start = positions.length / 3;
        positions.push(...a, ...b, ...c, ...d);
        indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
    };
    const corners = [[-1, -1], [-1, 1], [1, 1], [1, -1]];
    for (let side = 0; side < 4; side++) {
        const [x, z] = corners[side];
        const [nx, nz] = corners[(side + 1) % 4];
        quad([x * 0.5, -0.5, z * 0.5], [nx * 0.5, -0.5, nz * 0.5], [nx * 0.46, 0.36, nz * 0.46], [x * 0.46, 0.36, z * 0.46]);
        quad([x * 0.46, 0.36, z * 0.46], [nx * 0.46, 0.36, nz * 0.46], [nx * 0.4, 0.5, nz * 0.4], [x * 0.4, 0.5, z * 0.4]);
    }
    const start = positions.length / 3;
    for (let z = 0; z <= 4; z++)
        for (let x = 0; x <= 4; x++) {
            const px = x / 4 * 0.8 - 0.4;
            const pz = z / 4 * 0.8 - 0.4;
            const y = 0.5 - 0.1 * (1 - Math.pow((px / 0.4), 2)) * (1 - Math.pow((pz / 0.4), 2));
            positions.push(px, y, pz);
        }
    for (let z = 0; z < 4; z++)
        for (let x = 0; x < 4; x++) {
            const a = start + z * 5 + x;
            indices.push(a, a + 5, a + 1, a + 1, a + 5, a + 6);
        }
    quad([-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]);
    const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
    geometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(positions, 3));
    const uvs = [];
    for (let index = 0; index < positions.length; index += 3)
        uvs.push(positions[index] + 0.5, positions[index + 2] + 0.5);
    geometry.setAttribute('uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}
function fasteners(kit, parent, materials, points, rotation = [Math.PI / 2, 0, 0]) {
    return kit.instances(parent, kit.sharedGeometry('HexFastener', () => new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(1, 1, 1, 6)), materials.metal, points.map(position => ({ position, scale: [9, 5, 9], rotation })), 'HexFasteners');
}
function monitorDetails(kit, materials, monitor, width, height) {
    const rear = kit.group(monitor, 'RearVentilation');
    kit.box(rear, materials.black, [width * 0.56, 290, 6], [0, 0, -124], 'VentRecess');
    for (let index = 0; index < 16; index++) {
        kit.box(rear, materials.graphite, [18, 265, 8], [-width * 0.25 + index * width / 30, 0, -130]);
    }
    kit.box(rear, materials.metal, [310, 280, 36], [0, -225, -150], 'VESAMount');
    fasteners(kit, rear, materials, [
        [-width / 2 + 24, height / 2 - 20, -126], [width / 2 - 24, height / 2 - 20, -126],
        [-width / 2 + 24, -height / 2 + 20, -126], [width / 2 - 24, -height / 2 + 20, -126],
    ]);
    kit.cable(rear, materials.black, [[60, -300, -166], [100, -500, -175], [130, -700, -180]], 9);
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/HardwareInteraction.ts"
/*!****************************************************************!*\
  !*** ./src/Application/World/Cyberpunk/HardwareInteraction.ts ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HardwareInteraction)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

/** Explicit hardware registry, independent of the disabled legacy hitbox system. */
class HardwareInteraction {
    constructor(options) {
        this.options = options;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster();
        this.pointer = null;
        this.hover = null;
        this.elapsed = 0;
        this.lastRay = -Infinity;
        this.disposed = false;
        this.idleIntensities = new Map();
        this.onMove = (event) => {
            if (this.blocked(event.target)) {
                this.pointer = null;
                this.setHover(null);
                return;
            }
            this.pointer = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(event.clientX, event.clientY);
        };
        this.onLeave = (event) => {
            if (!event.relatedTarget || this.blocked(event.relatedTarget)) {
                this.pointer = null;
                this.setHover(null);
            }
        };
        this.onValidatedKey = (event) => {
            const bridged = event;
            // Observe the existing normalized relay only; never intercept native/child typing.
            if (!(event instanceof CustomEvent) || !bridged.inComputer || typeof bridged.key !== 'string')
                return;
            if (bridged.key.startsWith('_AUTO_') || this.options.reducedMotion())
                return;
            this.options.hardware.pulseTyping();
        };
        this.onDown = (event) => {
            if (!(event instanceof MouseEvent) || event.button !== 0 || this.blocked(event.target))
                return;
            if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
                return;
            if (!this.options.active() || !this.options.hardware.getSnapshot().available)
                return;
            const hit = this.pick(event.clientX, event.clientY);
            if (!hit)
                return;
            // Only a confirmed hardware hit consumes this camera-toggle mousedown.
            event.preventDefault();
            event.stopPropagation();
            this.setHover(hit);
            this.options.hardware.toggle(hit.id);
        };
        this.cursor = options.surface.style.cursor;
        options.surface.style.cursor = 'default';
        options.targets.forEach(target => this.idleIntensities.set(target, target.highlight.emissiveIntensity));
        document.addEventListener('pointermove', this.onMove, { passive: true });
        document.addEventListener('pointerout', this.onLeave, { passive: true });
        document.addEventListener('mousedown', this.onDown, true);
        document.addEventListener('keydown', this.onValidatedKey);
    }
    blocked(target) {
        return target instanceof Element && !!target.closest('iframe, button, a, input, textarea, select, summary, [role="button"], [contenteditable="true"], .room-controls, .experience-settings, .cinematic-controls, .scene-load-error');
    }
    pick(clientX, clientY) {
        const rect = this.options.surface.getBoundingClientRect();
        if (!Number.isFinite(clientX) || !Number.isFinite(clientY) || rect.width <= 0 || rect.height <= 0)
            return null;
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        if (x < 0 || x > 1 || y < 0 || y > 1)
            return null;
        const camera = this.options.camera();
        camera.updateMatrixWorld();
        this.options.targets.forEach(target => target.objects.forEach(object => object.updateWorldMatrix(true, false)));
        this.raycaster.setFromCamera(new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(x * 2 - 1, 1 - y * 2), camera);
        const visible = (object) => {
            for (let parent = object; parent; parent = parent.parent)
                if (!parent.visible)
                    return false;
            return true;
        };
        const candidates = this.options.targets.flatMap(target => target.objects).filter(visible);
        const hit = this.raycaster.intersectObjects(candidates, false)[0];
        if (!hit)
            return null; // Most moves avoid the full-scene occlusion query.
        const control = this.options.targets.find(target => target.objects.includes(hit.object));
        if (!control)
            return null;
        this.options.scene.updateMatrixWorld(true);
        const blocker = this.raycaster.intersectObjects(this.options.scene.children, true).find(intersection => {
            const object = intersection.object;
            if (!visible(object) || !object.material)
                return false;
            const material = Array.isArray(object.material) ? object.material : [object.material];
            // Transparent glass permits visibility; the CSS3D alpha cutout remains a depth barrier.
            return material.some(m => m.visible && (!m.transparent || (m.depthWrite && m.blending === three__WEBPACK_IMPORTED_MODULE_0__.NoBlending)));
        });
        if (blocker && blocker.distance < hit.distance - 0.5 && !control.objects.includes(blocker.object))
            return null;
        return control;
    }
    setHover(target) {
        if (target === this.hover)
            return;
        if (this.hover)
            this.hover.highlight.emissiveIntensity = this.idleIntensities.get(this.hover) || 0;
        this.hover = target;
        if (target)
            target.highlight.emissiveIntensity = 0.16;
        this.options.surface.style.cursor = target ? 'pointer' : 'default';
    }
    update(delta) {
        if (this.disposed)
            return;
        if (!this.options.active() || !this.options.hardware.getSnapshot().available) {
            this.setHover(null);
            return;
        }
        this.elapsed += Number.isFinite(delta) ? Math.min(Math.max(delta, 0), 50) : 0;
        if (!this.pointer || this.elapsed - this.lastRay < 33)
            return;
        this.lastRay = this.elapsed;
        this.setHover(this.pick(this.pointer.x, this.pointer.y));
    }
    dispose() {
        if (this.disposed)
            return;
        this.setHover(null);
        document.removeEventListener('pointermove', this.onMove);
        document.removeEventListener('pointerout', this.onLeave);
        document.removeEventListener('mousedown', this.onDown, true);
        document.removeEventListener('keydown', this.onValidatedKey);
        this.options.surface.style.cursor = this.cursor;
        this.pointer = null;
        this.disposed = true;
    }
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/HardwareState.ts"
/*!**********************************************************!*\
  !*** ./src/Application/World/Cyberpunk/HardwareState.ts ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HardwareState)
/* harmony export */ });
/** Shared boolean controls only. No keys, text, telemetry or frame-by-frame React state. */
class HardwareState {
    constructor() {
        this.snapshot = { available: false, lampOn: true, pcLedsOn: true };
        this.listeners = new Set();
        this.disposed = false;
        this.typingEnergy = 0;
        this.getSnapshot = () => this.snapshot;
        this.subscribe = (listener) => {
            if (this.disposed)
                return () => { };
            this.listeners.add(listener);
            return () => { this.listeners.delete(listener); };
        };
    }
    publish(update) {
        if (this.disposed)
            return;
        if (Object.entries(update).every(([key, value]) => this.snapshot[key] === value))
            return;
        this.snapshot = Object.assign(Object.assign({}, this.snapshot), update);
        this.listeners.forEach(listener => listener(this.snapshot));
    }
    setAvailable(available) { this.publish({ available }); }
    toggle(id) {
        if (!this.snapshot.available || this.disposed)
            return;
        if (id === 'lamp')
            this.publish({ lampOn: !this.snapshot.lampOn });
        if (id === 'pc')
            this.publish({ pcLedsOn: !this.snapshot.pcLedsOn });
    }
    pulseTyping() { if (!this.disposed && this.snapshot.available)
        this.typingEnergy = 1; }
    dispose() {
        if (this.disposed)
            return;
        this.publish({ available: false });
        this.listeners.clear();
        this.typingEnergy = 0;
        this.disposed = true;
    }
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/Lighting.ts"
/*!*****************************************************!*\
  !*** ./src/Application/World/Cyberpunk/Lighting.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLighting: () => (/* binding */ createLighting)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

function createLighting() {
    const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    root.name = 'Lighting';
    const ambient = new three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight('#9cb1ce', '#080b14', 0.28);
    ambient.name = 'AmbientFill';
    root.add(ambient);
    const key = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight('#cbd6e7', 1.05);
    key.name = 'SoftRoomKey';
    key.position.set(-4000, 6500, 5000);
    key.target.position.set(0, -450, 300);
    root.add(key, key.target);
    const practical = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight('#ffb46b', 3.2, 7000, Math.PI / 3, 0.8, 1);
    practical.name = 'WarmPractical';
    practical.position.set(-2430, 620, 360);
    practical.target.position.set(-1700, -500, 1000);
    practical.castShadow = true;
    practical.shadow.mapSize.set(1024, 1024);
    practical.shadow.camera.near = 80;
    practical.shadow.camera.far = 7000;
    practical.shadow.bias = -0.00015;
    practical.shadow.normalBias = 4;
    root.add(practical, practical.target);
    const cyan = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight('#00e5ff', 2.1, 4200, 2);
    cyan.name = 'ScreenGlow';
    cyan.position.set(1650, 1050, 650);
    const violet = new three__WEBPACK_IMPORTED_MODULE_0__.PointLight('#8b5cf6', 1.8, 4800, 2);
    violet.name = 'WallAccent';
    violet.position.set(-2200, 2000, -2400);
    root.add(cyan, violet);
    root.traverse(object => {
        if (object instanceof three__WEBPACK_IMPORTED_MODULE_0__.Light)
            object.color.convertSRGBToLinear();
        if (object instanceof three__WEBPACK_IMPORTED_MODULE_0__.HemisphereLight)
            object.groundColor.convertSRGBToLinear();
    });
    return root;
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/Materials.ts"
/*!******************************************************!*\
  !*** ./src/Application/World/Cyberpunk/Materials.ts ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMaterials: () => (/* binding */ createMaterials)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

function createMaterials(kit) {
    // Deterministic original grain, generated locally; no inherited bitmap asset.
    const pixels = new Uint8Array(128 * 128 * 4);
    let seed = 137;
    for (let y = 0; y < 128; y++) {
        for (let x = 0; x < 128; x++) {
            seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
            const grain = 192 + (seed % 24) + Math.round(Math.sin(y * 1.8 + x * 0.025) * 12);
            const index = (y * 128 + x) * 4;
            pixels.set([grain, grain, grain, 255], index);
        }
    }
    const grain = kit.texture(new three__WEBPACK_IMPORTED_MODULE_0__.DataTexture(pixels, 128, 128, three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat));
    grain.wrapS = grain.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
    grain.repeat.set(3, 8);
    grain.encoding = three__WEBPACK_IMPORTED_MODULE_0__.sRGBEncoding;
    grain.needsUpdate = true;
    // Roughness is data, so it must not use the color map's sRGB decoding.
    const roughness = kit.texture(grain.clone());
    roughness.encoding = three__WEBPACK_IMPORTED_MODULE_0__.LinearEncoding;
    roughness.needsUpdate = true;
    const mineralPixels = new Uint8Array(64 * 64 * 4);
    for (let index = 0; index < 64 * 64; index++) {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        const value = 192 + (seed % 48);
        mineralPixels.set([value, value, value, 255], index * 4);
    }
    const mineral = kit.texture(new three__WEBPACK_IMPORTED_MODULE_0__.DataTexture(mineralPixels, 64, 64, three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat));
    mineral.wrapS = mineral.wrapT = three__WEBPACK_IMPORTED_MODULE_0__.RepeatWrapping;
    mineral.repeat.set(6, 6);
    mineral.needsUpdate = true;
    const materials = {
        wall: kit.material({ color: '#182236', roughness: 0.98, roughnessMap: mineral }),
        floor: kit.material({ color: '#25262c', roughness: 0.88, roughnessMap: mineral }),
        graphite: kit.material({ color: '#182333', roughness: 0.62, roughnessMap: mineral, metalness: 0.18 }),
        metal: kit.material({ color: '#718092', roughness: 0.34, metalness: 0.65, roughnessMap: roughness }),
        black: kit.material({ color: '#0c111b', roughness: 0.72 }),
        desk: kit.material({ color: '#493f35', roughness: 0.68, map: grain, roughnessMap: roughness, metalness: 0.03 }),
        fabric: kit.material({ color: '#18212a', roughness: 1, roughnessMap: mineral, bumpMap: mineral, bumpScale: 0.6 }),
        keys: kit.material({ color: '#3c485a', roughness: 0.5, roughnessMap: mineral, bumpMap: mineral, bumpScale: 0.15 }),
        ceramic: kit.material({ color: '#505a63', roughness: 0.3, metalness: 0.05 }),
        coffee: kit.material({ color: '#20150e', roughness: 0.24 }),
        cyan: kit.material({ color: '#0b5662', emissive: '#00e5ff', emissiveIntensity: 0.65, roughness: 0.4 }),
        violet: kit.material({ color: '#32234f', emissive: '#8b5cf6', emissiveIntensity: 0.6, roughness: 0.45 }),
        magenta: kit.material({ color: '#36142b', emissive: '#ff2d95', emissiveIntensity: 0.2 }),
        warm: kit.material({ color: '#e4b68c', emissive: '#ffca8b', emissiveIntensity: 0.85 }),
    };
    Object.entries(materials).forEach(([name, material]) => { material.name = name; });
    return materials;
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/MonitorArray.ts"
/*!*********************************************************!*\
  !*** ./src/Application/World/Cyberpunk/MonitorArray.ts ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CENTER_SCREEN: () => (/* binding */ CENTER_SCREEN),
/* harmony export */   createMonitorArray: () => (/* binding */ createMonitorArray)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _Displays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Displays */ "./src/Application/World/Cyberpunk/Displays.ts");
/* harmony import */ var _HardwareDetails__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HardwareDetails */ "./src/Application/World/Cyberpunk/HardwareDetails.ts");



// This immutable contract mirrors MonitorScreen, which remains untouched.
const CENTER_SCREEN = {
    width: 1280, height: 1024,
    position: [0, 950, 255],
    tilt: -3 * Math.PI / 180,
};
function createMonitorArray(kit, materials) {
    const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    root.name = 'MonitorArray';
    const center = kit.group(root, 'CenterMonitor', CENTER_SCREEN.position);
    center.rotation.x = CENTER_SCREEN.tilt;
    // Aperture is slightly larger than the full CSS rectangle, including its padding.
    // Bezel starts outside +/-640 and +/-512; rear shell remains behind Z=0.
    const width = CENTER_SCREEN.width;
    const height = CENTER_SCREEN.height;
    kit.box(center, materials.graphite, [width + 110, height + 110, 105], [0, 0, -70], 'BackPanel', true);
    for (const side of [-1, 1]) {
        kit.box(center, materials.black, [44, height + 100, 130], [side * (width / 2 + 30), 0, 18], 'SideBezel', true);
        kit.box(center, materials.black, [width + 16, 44, 130], [0, side * (height / 2 + 30), 18], 'HorizontalBezel', true);
    }
    kit.box(center, materials.cyan, [20, 5, 5], [width / 2 - 45, -height / 2 - 26, 86], 'PowerIndicator');
    const aperture = kit.group(center, 'InteractiveAperture');
    aperture.userData = { width, height, padding: 32, compositorDepth: 96 };
    (0,_HardwareDetails__WEBPACK_IMPORTED_MODULE_2__.monitorDetails)(kit, materials, center, width, height);
    kit.box(root, materials.metal, [170, 760, 160], [0, -40, 25], 'CenterStand', true);
    kit.box(root, materials.graphite, [820, 50, 590], [0, -420, 140], 'CenterFoot', true);
    for (const side of [-1, 1]) {
        const monitor = kit.group(root, side < 0 ? 'LeftMonitor' : 'RightMonitor', [side * 1530, 950, 110]);
        monitor.rotation.y = side * -0.15;
        monitor.rotation.x = CENTER_SCREEN.tilt;
        kit.box(monitor, materials.graphite, [1510, 970, 105], [0, 0, -65], 'RearShell', true);
        kit.box(monitor, materials.black, [1500, 960, 50], [0, 0, 0], 'Bezel', true);
        const screen = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ map: (0,_Displays__WEBPACK_IMPORTED_MODULE_1__.displayTexture)(kit, side < 0 ? 'terminal' : 'system'), toneMapped: false });
        screen.name = 'OriginalDemoScreen';
        kit.materials.add(screen);
        const face = kit.mesh(monitor, new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(1440, 900), screen, [0, 0, 30], [0, 0, 0], 'DemoDisplay');
        face.castShadow = false;
        (0,_HardwareDetails__WEBPACK_IMPORTED_MODULE_2__.monitorDetails)(kit, materials, monitor, 1440, 900);
        kit.box(monitor, side < 0 ? materials.violet : materials.cyan, [22, 4, 5], [660, -463, 30], 'PowerIndicator');
        kit.box(root, materials.metal, [120, 850, 130], [side * 1530, -20, -10], 'SideStand', true);
        kit.box(root, materials.graphite, [700, 45, 480], [side * 1530, -420, 20], 'SideFoot', true);
        kit.cable(root, materials.black, [[side * 1530, 700, -30], [side * 1530, 40, -140], [side * 1900, -370, -450]]);
    }
    kit.instances(root, kit.sharedGeometry('StandHinge', () => new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(80, 80, 190, 16)), materials.metal, [-1530, 0, 1530].map(x => ({
        position: [x, x === 0 ? 400 : 455, 80],
        scale: [1, 1, 1], rotation: [0, 0, Math.PI / 2],
    })), 'StandHinges');
    kit.batchBoxes(root);
    return root;
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/PCTower.ts"
/*!****************************************************!*\
  !*** ./src/Application/World/Cyberpunk/PCTower.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPCTower: () => (/* binding */ createPCTower)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _HardwareDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HardwareDetails */ "./src/Application/World/Cyberpunk/HardwareDetails.ts");


function createPCTower(kit, materials) {
    // PC LEDs must be switchable without altering room/monitor accent materials.
    materials = Object.assign(Object.assign({}, materials), { cyan: kit.cloneMaterial(materials.cyan, 'PCCyan'), violet: kit.cloneMaterial(materials.violet, 'PCViolet'), magenta: kit.cloneMaterial(materials.magenta, 'PCMagenta') });
    const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    root.name = 'PCTower';
    root.position.set(2820, 400, 650);
    const rotors = [];
    kit.box(root, materials.graphite, [920, 85, 1350], [0, -795, 0], 'BottomChassis', true);
    kit.box(root, materials.graphite, [920, 85, 1350], [0, 795, 0], 'TopChassis', true);
    kit.box(root, materials.black, [65, 1550, 1290], [430, 0, 0], 'SolidSide', true);
    kit.box(root, materials.graphite, [850, 1550, 65], [0, 0, -635], 'RearPanel');
    for (const x of [-420, 420]) {
        for (const z of [-625, 625]) {
            kit.box(root, materials.metal, [45, 1550, 45], [x, 0, z], 'ChassisRail');
        }
    }
    for (const x of [-340, 340]) {
        kit.box(root, materials.black, [120, 55, 850], [x, -832, 0], 'CaseFoot', true);
    }
    const glass = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhysicalMaterial({
        color: '#607d92', metalness: 0.05, roughness: 0.24,
        transparent: true, opacity: 0.1, depthWrite: false,
        clearcoat: 0.5, clearcoatRoughness: 0.24, side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
    });
    glass.color.convertSRGBToLinear();
    glass.name = 'SingleTemperedGlassPanel';
    kit.materials.add(glass);
    const panel = kit.mesh(root, new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(1240, 1480), glass, [-458, 0, 0], [0, -Math.PI / 2, 0], 'TemperedGlass');
    panel.castShadow = false;
    const internals = kit.group(root, 'InternalComponents');
    kit.box(internals, materials.black, [40, 1320, 1000], [290, 30, -70], 'Motherboard');
    for (let index = 0; index < 4; index++) {
        kit.box(internals, materials.metal, [60, 410, 28], [230, 370, 170 + index * 65], 'MemoryModule');
    }
    kit.instances(internals, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(1, 1, 1, 10), materials.metal, Array.from({ length: 18 }, (_, index) => ({
        position: [248, 50 + Math.floor(index / 6) * 145, -480 + index % 6 * 65],
        scale: [18, 48, 18], rotation: [0, 0, Math.PI / 2],
    })), 'MotherboardCapacitors');
    kit.box(internals, materials.graphite, [660, 160, 960], [-40, -210, -30], 'GPU', true);
    for (let fin = 0; fin < 12; fin++) {
        kit.box(internals, materials.metal, [550, 6, 850], [-40, -265 + fin * 11, -30], 'GPUFin');
    }
    kit.box(internals, materials.violet, [8, 6, 680], [-375, -170, 0], 'GPUEdgeLight');
    kit.instances(internals, new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(92, 8, 6, 24), materials.black, [-260, 260].map(z => ({ position: [-375, -210, z],
        scale: [1, 1, 1], rotation: [0, Math.PI / 2, 0] })), 'GPUShroudIntakes');
    kit.box(internals, materials.graphite, [790, 260, 600], [0, -615, -230], 'PowerSupplyShroud');
    kit.mesh(internals, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(135, 135, 100, 24), materials.metal, [140, 350, -160], [0, 0, Math.PI / 2], 'CPUCoolingBlock');
    kit.mesh(internals, new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(105, 7, 6, 32), materials.cyan, [85, 350, -160], [0, Math.PI / 2, 0], 'PumpRing');
    kit.box(internals, materials.black, [750, 100, 880], [0, 670, -50], 'Radiator');
    for (let index = 0; index < 16; index++) {
        kit.box(internals, materials.metal, [720, 5, 14], [0, 724, -440 + index * 50], 'RadiatorFin');
    }
    kit.cable(internals, materials.black, [[80, 420, -160], [-100, 540, -190], [-150, 570, -420], [0, 670, -460]], 28);
    kit.cable(internals, materials.black, [[80, 310, -180], [-80, 400, -340], [-170, 570, -510], [100, 670, -460]], 28);
    for (let index = 0; index < 4; index++) {
        kit.cable(internals, materials.black, [[-240 + index * 22, -170, 200], [-260 + index * 22, -380, 220], [-210 + index * 22, -500, -200]], 9);
    }
    for (let index = 0; index < 3; index++) {
        kit.box(internals, materials.graphite, [120, 12, 40], [-200, -300 - index * 70, 170 - index * 75], 'CableComb');
    }
    const cooling = kit.group(root, 'CoolingFans');
    const fanPositions = [];
    const cyanRings = [];
    const violetRings = [];
    for (let index = 0; index < 3; index++) {
        const fan = kit.group(cooling, `Fan${index + 1}`, [0, -450 + index * 450, 655]);
        for (const side of [-1, 1]) {
            kit.box(fan, materials.black, [410, 32, 65], [0, side * 205, 0]);
            kit.box(fan, materials.black, [32, 410, 65], [side * 205, 0, 0]);
        }
        fanPositions.push({ position: [0, -450 + index * 450, 655], scale: [1, 1, 1] });
        (index === 1 ? violetRings : cyanRings).push({ position: [0, -450 + index * 450, 675], scale: [1, 1, 1] });
        const rotor = kit.group(fan, 'Rotor');
        const blades = Array.from({ length: 7 }, (_, blade) => {
            const angle = blade * Math.PI * 2 / 7;
            return {
                position: [Math.sin(angle) * 100, Math.cos(angle) * 100, -10],
                scale: [68, 157, 16],
                rotation: [0, 0, -angle + 0.35],
            };
        });
        kit.instances(rotor, kit.rounded, materials.black, blades, 'InstancedFanBlades');
        rotors.push(rotor);
        // Fixed protective grille stays outside the rotating blade group.
        for (const angle of [0, Math.PI / 2]) {
            const grille = kit.box(fan, materials.metal, [9, 380, 8], [0, 0, 42]);
            grille.rotation.z = angle;
        }
        for (let bar = -4; bar <= 4; bar++) {
            const x = bar * 35;
            const length = Math.sqrt(175 * 175 - x * x) * 2;
            kit.box(fan, materials.metal, [4, length, 5], [x, 0, 48], 'GrilleWire');
        }
    }
    kit.instances(cooling, kit.sharedGeometry('FanHousing', () => new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(194, 15, 6, 40)), materials.graphite, fanPositions, 'InstancedFanHousings');
    const ring = kit.sharedGeometry('FanRing', () => new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(184, 7, 6, 40));
    kit.instances(cooling, ring, materials.cyan, cyanRings, 'CyanFanRings');
    kit.instances(cooling, ring, materials.violet, violetRings, 'VioletFanRing');
    kit.instances(cooling, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(45, 45, 30, 16), materials.metal, fanPositions.map(({ position }) => ({ position: [position[0], position[1], position[2] + 12],
        scale: [1, 1, 1], rotation: [Math.PI / 2, 0, 0] })), 'StaticFanHubs');
    const controlMaterial = kit.cloneMaterial(materials.graphite, 'PCControl');
    controlMaterial.emissive.copy(materials.violet.emissive);
    controlMaterial.emissiveIntensity = 0.02;
    const control = kit.box(root, controlMaterial, [500, 110, 35], [0, 700, 690], 'PCAccentControl', true);
    control.userData.hardwareControl = 'pc';
    kit.mesh(root, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(28, 28, 8, 16), materials.metal, [0, 700, 712], [Math.PI / 2, 0, 0], 'PCPowerButton');
    for (const x of [-140, 140])
        kit.box(root, materials.black, [65, 18, 4], [x, 700, 710], 'FrontPort');
    (0,_HardwareDetails__WEBPACK_IMPORTED_MODULE_1__.fasteners)(kit, root, materials, [-1, 1].flatMap(side => [-740, -250, 250, 740].map(y => [side * 415, y, 652])));
    for (let index = 0; index < 18; index++) {
        kit.box(root, materials.black, [630, 13, 8], [0, -650 + index * 70, -672], 'RearVent');
    }
    kit.box(root, materials.magenta, [28, 7, 8], [320, 700, 680], 'PowerLED');
    // Rotor blades are already InstancedMeshes and are deliberately excluded by batchBoxes.
    kit.batchBoxes(internals);
    kit.batchBoxes(root);
    return { root, rotors };
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/RoomKit.ts"
/*!****************************************************!*\
  !*** ./src/Application/World/Cyberpunk/RoomKit.ts ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RoomKit)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_geometries_RoundedBoxGeometry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/geometries/RoundedBoxGeometry */ "./node_modules/three/examples/jsm/geometries/RoundedBoxGeometry.js");


/** Resource owner for the original procedural room. No loaders or renderer required. */
class RoomKit {
    constructor() {
        this.geometries = new Set();
        this.materials = new Set();
        this.textures = new Set();
        this.cube = this.geometry(new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(1, 1, 1));
        this.rounded = this.geometry(new three_examples_jsm_geometries_RoundedBoxGeometry__WEBPACK_IMPORTED_MODULE_1__.RoundedBoxGeometry(1, 1, 1, 2, 0.06));
        this.transform = new three__WEBPACK_IMPORTED_MODULE_0__.Object3D();
        this.shared = new Map();
    }
    sharedGeometry(name, create) {
        let geometry = this.shared.get(name);
        if (!geometry) {
            geometry = this.geometry(create());
            this.shared.set(name, geometry);
        }
        return geometry;
    }
    cloneMaterial(material, name) {
        const clone = material.clone(); // Colors are already linear; do not convert twice.
        clone.name = name;
        this.materials.add(clone);
        return clone;
    }
    material(parameters) {
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshStandardMaterial(parameters);
        // Palette literals are authored in sRGB; Three r137 material colors are linear.
        material.color.convertSRGBToLinear();
        material.emissive.convertSRGBToLinear();
        this.materials.add(material);
        return material;
    }
    geometry(geometry) {
        this.geometries.add(geometry);
        return geometry;
    }
    texture(texture) {
        this.textures.add(texture);
        return texture;
    }
    group(parent, name, position = [0, 0, 0]) {
        const group = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
        group.name = name;
        group.position.set(...position);
        parent.add(group);
        return group;
    }
    box(parent, material, size, position, name = '', rounded = false) {
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(rounded ? this.rounded : this.cube, material);
        mesh.scale.set(...size);
        mesh.position.set(...position);
        mesh.name = name;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }
    mesh(parent, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0], name = '') {
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(this.geometry(geometry), material);
        mesh.position.set(...position);
        mesh.rotation.set(...rotation);
        mesh.name = name;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }
    cable(parent, material, points, radius = 10) {
        const curve = new three__WEBPACK_IMPORTED_MODULE_0__.CatmullRomCurve3(points.map(point => new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(...point)));
        return this.mesh(parent, new three__WEBPACK_IMPORTED_MODULE_0__.TubeGeometry(curve, 24, radius, 6, false), material);
    }
    instances(parent, geometry, material, transforms, name) {
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh(this.geometry(geometry), material, transforms.length);
        mesh.name = name;
        transforms.forEach(({ position, scale, rotation = [0, 0, 0] }, index) => {
            this.transform.position.set(...position);
            this.transform.scale.set(...scale);
            this.transform.rotation.set(...rotation);
            this.transform.updateMatrix();
            mesh.setMatrixAt(index, this.transform.matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        parent.add(mesh);
        return mesh;
    }
    /** Batch static box primitives within a module, preserving the named module hierarchy. */
    batchBoxes(root) {
        root.updateWorldMatrix(true, true);
        const inverse = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().copy(root.matrixWorld).invert();
        const buckets = new Map();
        root.traverse(object => {
            if (!(object instanceof three__WEBPACK_IMPORTED_MODULE_0__.Mesh) || object instanceof three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh)
                return;
            if (object.userData.hardwareControl)
                return;
            if (object.geometry !== this.cube && object.geometry !== this.rounded)
                return;
            if (Array.isArray(object.material) || object.material.transparent)
                return;
            const key = object.geometry.uuid + object.material.uuid;
            const bucket = buckets.get(key) || [];
            bucket.push(object);
            buckets.set(key, bucket);
        });
        buckets.forEach(meshes => {
            const first = meshes[0];
            const material = first.material;
            const batch = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedMesh(first.geometry, material, meshes.length);
            batch.name = `Static/${material.name || material.type}`;
            meshes.forEach((mesh, index) => {
                batch.setMatrixAt(index, new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4().multiplyMatrices(inverse, mesh.matrixWorld));
                mesh.removeFromParent();
            });
            batch.instanceMatrix.needsUpdate = true;
            batch.castShadow = true;
            batch.receiveShadow = true;
            root.add(batch);
        });
    }
    dispose() {
        this.geometries.forEach(geometry => geometry.dispose());
        this.materials.forEach(material => material.dispose());
        this.textures.forEach(texture => texture.dispose());
        this.geometries.clear();
        this.materials.clear();
        this.textures.clear();
        this.shared.clear();
    }
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/RoomMode.ts"
/*!*****************************************************!*\
  !*** ./src/Application/World/Cyberpunk/RoomMode.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usesLegacyRoom: () => (/* binding */ usesLegacyRoom)
/* harmony export */ });
/** Explicit comparison/rollback only. The secure ?dev iframe selection is independent. */
function usesLegacyRoom(search) {
    return new URLSearchParams(search).has('legacyRoom');
}


/***/ },

/***/ "./src/Application/World/Cyberpunk/Workstation.ts"
/*!********************************************************!*\
  !*** ./src/Application/World/Cyberpunk/Workstation.ts ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createWorkstation: () => (/* binding */ createWorkstation)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _HardwareDetails__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HardwareDetails */ "./src/Application/World/Cyberpunk/HardwareDetails.ts");


function createKeyboard(kit, materials, parent) {
    const keyboard = kit.group(parent, 'MechanicalKeyboard', [-260, -355, 1320]);
    kit.box(keyboard, materials.graphite, [1660, 110, 620], [0, 0, 0], 'KeyboardCase', true);
    kit.box(keyboard, materials.black, [1610, 20, 570], [0, 65, 0], 'SwitchPlate', true);
    kit.box(keyboard, materials.violet, [1580, 5, 8], [0, -22, 311], 'KeyboardUnderglow');
    const keys = [];
    for (let row = 0; row < 4; row++) {
        for (let column = 0; column < 15; column++) {
            keys.push({ position: [-728 + column * 104, 103 - row * 2, -225 + row * 105], scale: [91, 48, 89] });
        }
    }
    for (const x of [-728, -614, -500, 500, 614, 728]) {
        keys.push({ position: [x, 97, 200], scale: [94, 48, 89] });
    }
    keys.push({ position: [0, 97, 200], scale: [740, 48, 89] });
    kit.instances(keyboard, kit.sharedGeometry('SculptedKeycap', _HardwareDetails__WEBPACK_IMPORTED_MODULE_1__.sculptedKeycap), materials.keys, keys, 'Keycaps/67');
    for (const side of [-1, 1]) {
        kit.box(keyboard, materials.black, [1600, 3, 3], [0, 20, side * 308], 'CaseSeam');
    }
    kit.box(keyboard, materials.metal, [110, 35, 35], [-270, 0, -320], 'CableConnector', true);
    (0,_HardwareDetails__WEBPACK_IMPORTED_MODULE_1__.fasteners)(kit, keyboard, materials, [[-800, 58, -280], [800, 58, -280], [-800, 58, 280], [800, 58, 280]], [0, 0, 0]);
    const status = kit.cloneMaterial(materials.cyan, 'KeyboardStatus');
    status.emissiveIntensity = 0.12;
    kit.box(keyboard, status, [22, 4, 8], [660, 78, 276], 'TypingStatusLED');
    kit.box(keyboard, materials.black, [22, 4, 8], [715, 78, 276], 'SecondaryStatusLED');
    // Recessed light gaps, not one material/light per key.
    for (let row = 0; row < 4; row++) {
        kit.box(keyboard, row % 2 ? materials.violet : materials.cyan, [1540, 3, 4], [0, 76, -175 + row * 105]);
    }
    kit.cable(parent, materials.black, [[-280, -340, 1000], [-260, -400, 760], [-520, -400, 300], [-700, -400, -550]], 10);
}
function createAccessories(kit, materials, parent) {
    const mouse = kit.group(parent, 'Mouse', [1040, -365, 1330]);
    const body = kit.mesh(mouse, new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(1, 24, 16), materials.graphite);
    body.scale.set(155, 85, 245);
    kit.box(mouse, materials.black, [8, 10, 180], [0, 79, -65], 'ButtonSeparation');
    kit.mesh(mouse, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(27, 27, 30, 16), materials.metal, [0, 83, -95], [0, 0, Math.PI / 2], 'ScrollWheel');
    kit.instances(mouse, kit.cube, materials.black, Array.from({ length: 12 }, (_, index) => {
        const angle = index * Math.PI / 6;
        return { position: [0, 83 + Math.cos(angle) * 28, -95 + Math.sin(angle) * 28],
            scale: [31, 3, 5], rotation: [angle, 0, 0] };
    }), 'WheelTreads');
    kit.box(mouse, materials.cyan, [35, 3, 9], [0, 65, 166], 'MouseIndicator', true);
    kit.cable(parent, materials.black, [[1040, -370, 1090], [1030, -410, 900], [1200, -420, 700], [1380, -420, 420], [1500, -420, -600]], 8);
    const headphones = kit.group(parent, 'Headphones', [-2240, -310, 1180]);
    kit.mesh(headphones, new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(210, 25, 8, 28, Math.PI), materials.graphite);
    kit.mesh(headphones, new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(197, 14, 8, 28, Math.PI), materials.fabric, [0, 0, 0], [0, 0, 0], 'HeadbandPadding');
    for (const [name, material, radius, width, offset] of [
        ['EarCushions', materials.black, 85, 60, 205], ['EarCups', materials.metal, 91, 25, 245],
    ]) {
        kit.instances(headphones, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(radius, radius, width, 20), material, [-1, 1].map(side => ({ position: [side * offset, -45, 0], scale: [1, 1, 1],
            rotation: [0, 0, Math.PI / 2] })), name);
    }
    const mug = kit.group(parent, 'CoffeeMug', [1840, -430, 1450]);
    kit.mesh(mug, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(138, 142, 18, 24), materials.black, [0, -10, 0], [0, 0, 0], 'Coaster');
    const profile = [[0, 0], [88, 0], [98, 25], [105, 240], [91, 240], [84, 20], [0, 20]];
    kit.mesh(mug, new three__WEBPACK_IMPORTED_MODULE_0__.LatheGeometry(profile.map(([x, y]) => new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(x, y)), 32), materials.ceramic);
    kit.mesh(mug, new three__WEBPACK_IMPORTED_MODULE_0__.CircleGeometry(90, 32), materials.coffee, [0, 211, 0], [-Math.PI / 2, 0, 0], 'Coffee');
    kit.mesh(mug, new three__WEBPACK_IMPORTED_MODULE_0__.TorusGeometry(70, 18, 8, 24), materials.ceramic, [128, 135, 0], [0, 0, 0], 'MugHandle');
    const lamp = kit.group(parent, 'DeskLamp', [-2780, -430, 360]);
    const lampControl = kit.cloneMaterial(materials.graphite, 'LampControl');
    lampControl.emissive.copy(materials.cyan.emissive);
    lampControl.emissiveIntensity = 0.02;
    const base = kit.mesh(lamp, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(220, 240, 45, 28), lampControl, [0, 22, 0], [0, 0, 0], 'LampBaseControl');
    base.userData.hardwareControl = 'lamp';
    kit.mesh(lamp, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(38, 38, 12, 16), materials.black, [100, 51, 100], [0, 0, 0], 'LampSwitch');
    kit.box(lamp, materials.metal, [45, 1330, 45], [0, 690, 0], 'LampStem', true);
    kit.box(lamp, materials.metal, [390, 45, 45], [165, 1350, 0], 'LampArm', true);
    kit.mesh(lamp, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(130, 245, 300, 28, 1, true), materials.graphite, [350, 1220, 0]);
    kit.mesh(lamp, new three__WEBPACK_IMPORTED_MODULE_0__.CircleGeometry(220, 28), materials.warm, [350, 1073, 0], [Math.PI / 2, 0, 0], 'LampDiffuser');
}
function createChair(kit, materials, parent) {
    const chair = kit.group(parent, 'TaskChair', [120, 0, 3080]);
    kit.box(chair, materials.fabric, [1140, 150, 950], [0, -1300, 0], 'Seat', true);
    const back = kit.box(chair, materials.fabric, [1080, 1470, 150], [0, -450, 430], 'Backrest', true);
    back.rotation.x = -0.12;
    for (const x of [-590, 590]) {
        kit.box(chair, materials.graphite, [70, 540, 100], [x, -1120, 120], 'ArmSupport', true);
        kit.box(chair, materials.black, [150, 75, 660], [x, -835, 0], 'ArmRest', true);
    }
    kit.mesh(chair, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(62, 80, 1170, 16), materials.metal, [0, -1970, 0], [0, 0, 0], 'GasLift');
    kit.mesh(chair, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(105, 105, 140, 16), materials.black, [0, -2440, 0], [0, 0, 0], 'LiftCollar');
    kit.box(chair, materials.metal, [360, 24, 28], [-460, -1410, 80], 'HeightLever', true);
    const casters = [];
    for (let index = 0; index < 5; index++) {
        const angle = index * Math.PI * 2 / 5;
        const spoke = kit.box(chair, materials.graphite, [90, 70, 760], [Math.sin(angle) * 350, -2550, Math.cos(angle) * 350], 'BaseSpoke', true);
        spoke.rotation.y = angle;
        casters.push({ position: [Math.sin(angle) * 680, -2615, Math.cos(angle) * 680],
            scale: [1, 1, 1], rotation: [0, 0, Math.PI / 2] });
    }
    kit.instances(chair, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(65, 65, 75, 12), materials.black, casters, 'InstancedCasters');
}
function createWorkstation(kit, materials) {
    const root = new three__WEBPACK_IMPORTED_MODULE_0__.Group();
    root.name = 'Workstation';
    kit.box(root, materials.desk, [6600, 145, 2700], [0, -525, 650], 'Desktop', true);
    for (const x of [-2920, 2920]) {
        for (const z of [-450, 1700]) {
            kit.box(root, materials.graphite, [140, 2050, 140], [x, -1660, z], 'DeskLeg', true);
            kit.box(root, materials.black, [185, 60, 185], [x, -2665, z], 'LevellingFoot', true);
        }
        kit.box(root, materials.metal, [140, 110, 2300], [x, -650, 650], 'DeskFrame');
    }
    kit.box(root, materials.graphite, [5800, 160, 120], [0, -730, -450], 'CrossBrace');
    kit.box(root, materials.black, [2640, 18, 1110], [-50, -442, 1260], 'DeskMat', true);
    for (let index = 0; index < 40; index++) {
        kit.box(root, materials.keys, [30, 2, 3], [-1280 + index * 63, -431, 1815], 'MatStitch');
    }
    kit.box(root, materials.black, [4200, 170, 250], [0, -730, -380], 'CableTray');
    for (const x of [-1900, 1900]) {
        kit.mesh(root, new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(75, 75, 8, 20), materials.black, [x, -448, -400], [0, 0, 0], 'CableGrommet');
    }
    kit.box(root, materials.cyan, [5100, 8, 16], [0, -580, -707], 'RearDeskLight');
    for (let index = 0; index < 8; index++) {
        kit.box(root, materials.metal, [55, 25, 130], [-1800 + index * 500, -650, -430], 'CableClip');
    }
    createKeyboard(kit, materials, root);
    createAccessories(kit, materials, root);
    createChair(kit, materials, root);
    kit.cable(root, materials.black, [[2450, -410, -450], [2500, -850, -570], [2600, -1600, -570], [2600, -2620, -580], [4100, -2670, -3100]], 18);
    kit.batchBoxes(root);
    return root;
}


/***/ },

/***/ "./src/Application/World/Decor.ts"
/*!****************************************!*\
  !*** ./src/Application/World/Decor.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Decor)
/* harmony export */ });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/BakedModel */ "./src/Application/Utils/BakedModel.ts");


class Decor {
    constructor() {
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.bakeModel();
        this.setModel();
    }
    bakeModel() {
        this.bakedModel = new _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__["default"](this.resources.items.gltfModel.decorModel, this.resources.items.texture.decorTexture, 900);
    }
    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
}


/***/ },

/***/ "./src/Application/World/Environment.ts"
/*!**********************************************!*\
  !*** ./src/Application/World/Environment.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Environment)
/* harmony export */ });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/BakedModel */ "./src/Application/Utils/BakedModel.ts");


class Environment {
    constructor() {
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.bakeModel();
        this.setModel();
    }
    bakeModel() {
        this.bakedModel = new _Utils_BakedModel__WEBPACK_IMPORTED_MODULE_1__["default"](this.resources.items.gltfModel.environmentModel, this.resources.items.texture.environmentTexture, 900);
    }
    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
    update() { }
}


/***/ },

/***/ "./src/Application/World/MonitorScreen.ts"
/*!************************************************!*\
  !*** ./src/Application/World/MonitorScreen.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MonitorScreen)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_renderers_CSS3DRenderer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three/examples/jsm/renderers/CSS3DRenderer.js */ "./node_modules/three/examples/jsm/renderers/CSS3DRenderer.js");
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/EventEmitter */ "./src/Application/Utils/EventEmitter.ts");
/* harmony import */ var _MonitorConfig__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MonitorConfig */ "./src/Application/World/MonitorConfig.ts");





const SCREEN_SIZE = { w: 1280, h: 1024 };
const IFRAME_PADDING = 32;
const IFRAME_SIZE = {
    w: SCREEN_SIZE.w - IFRAME_PADDING * 2,
    h: SCREEN_SIZE.h - IFRAME_PADDING * 2,
};
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function hasExactKeys(value, keys) {
    const actualKeys = Object.keys(value).sort();
    const expectedKeys = [...keys].sort();
    return (actualKeys.length === expectedKeys.length &&
        actualKeys.every((key, index) => key === expectedKeys[index]));
}
function isMonitorMessage(value) {
    if (!isRecord(value) || typeof value.type !== 'string')
        return false;
    if (value.type === 'mousemove') {
        return (hasExactKeys(value, [
            'type',
            'clientX',
            'clientY',
            'viewportWidth',
            'viewportHeight',
        ]) &&
            typeof value.clientX === 'number' &&
            Number.isFinite(value.clientX) &&
            typeof value.clientY === 'number' &&
            Number.isFinite(value.clientY) &&
            typeof value.viewportWidth === 'number' &&
            Number.isFinite(value.viewportWidth) &&
            value.viewportWidth > 0 &&
            value.viewportWidth <= 16384 &&
            typeof value.viewportHeight === 'number' &&
            Number.isFinite(value.viewportHeight) &&
            value.viewportHeight > 0 &&
            value.viewportHeight <= 16384 &&
            value.clientX >= 0 &&
            value.clientX <= value.viewportWidth &&
            value.clientY >= 0 &&
            value.clientY <= value.viewportHeight);
    }
    if (value.type === 'ready' || value.type === 'mousedown' || value.type === 'mouseup') {
        return hasExactKeys(value, ['type']);
    }
    if (value.type === 'keydown' || value.type === 'keyup') {
        return (hasExactKeys(value, ['type', 'key']) &&
            typeof value.key === 'string' &&
            value.key.length > 0 &&
            value.key.length <= 64 &&
            !/[\u0000-\u001f\u007f]/.test(value.key));
    }
    return false;
}
class MonitorScreen extends _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor() {
        super();
        this.screenListeners = [];
        this.loadTimeout = null;
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.sizes = this.application.sizes;
        this.resources = this.application.resources;
        this.screenSize = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
        this.camera = this.application.camera;
        this.position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 950, 255);
        this.rotation = new three__WEBPACK_IMPORTED_MODULE_0__.Euler(-3 * three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.DEG2RAD, 0, 0);
        this.videoTextures = {};
        this.iframe = null;
        this.messageHandler = null;
        this.mouseClickInProgress = false;
        this.shouldLeaveMonitor = false;
        // Create screen
        this.initializeScreenEvents();
        this.createIframe();
        const maxOffset = this.createTextureLayers();
        this.createEnclosingPlanes(maxOffset);
        this.createPerspectiveDimmer(maxOffset);
    }
    addScreenListener(type, listener, capture) {
        this.screenListeners.push([type, listener]);
        document.addEventListener(type, listener, capture);
    }
    initializeScreenEvents() {
        this.addScreenListener('mousemove', (event) => {
            var _a;
            // @ts-ignore
            const id = (_a = event.target) === null || _a === void 0 ? void 0 : _a.id;
            if (id === 'computer-screen') {
                // @ts-ignore
                event.inComputer = true;
            }
            // @ts-ignore
            this.inComputer = event.inComputer;
            if (this.inComputer && !this.prevInComputer) {
                this.camera.trigger('enterMonitor');
            }
            if (!this.inComputer &&
                this.prevInComputer &&
                !this.mouseClickInProgress) {
                this.camera.trigger('leftMonitor');
            }
            if (!this.inComputer &&
                this.mouseClickInProgress &&
                this.prevInComputer) {
                this.shouldLeaveMonitor = true;
            }
            else {
                this.shouldLeaveMonitor = false;
            }
            this.application.mouse.trigger('mousemove', [event]);
            this.prevInComputer = this.inComputer;
        }, false);
        this.addScreenListener('mousedown', (event) => {
            // @ts-ignore
            this.inComputer = event.inComputer;
            this.application.mouse.trigger('mousedown', [event]);
            this.mouseClickInProgress = true;
            this.prevInComputer = this.inComputer;
        }, false);
        this.addScreenListener('mouseup', (event) => {
            // @ts-ignore
            this.inComputer = event.inComputer;
            this.application.mouse.trigger('mouseup', [event]);
            if (this.shouldLeaveMonitor) {
                this.camera.trigger('leftMonitor');
                this.shouldLeaveMonitor = false;
            }
            this.mouseClickInProgress = false;
            this.prevInComputer = this.inComputer;
        }, false);
    }
    /**
     * Creates the iframe for the computer screen
     */
    createIframe() {
        // Create container
        const container = document.createElement('div');
        container.style.width = this.screenSize.width + 'px';
        container.style.height = this.screenSize.height + 'px';
        container.style.opacity = '1';
        container.style.background = '#1d2e2f';
        const iframeUrl = (0,_MonitorConfig__WEBPACK_IMPORTED_MODULE_4__.resolveInnerSiteUrl)(window.location.search);
        if (!iframeUrl) {
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.justifyContent = 'center';
            container.style.padding = '64px';
            container.style.boxSizing = 'border-box';
            container.style.color = '#d8e2f0';
            container.style.background = '#080b14';
            container.style.fontFamily = 'system-ui, sans-serif';
            container.style.fontSize = '28px';
            container.style.lineHeight = '1.5';
            container.style.textAlign = 'center';
            container.style.whiteSpace = 'pre-line';
            container.setAttribute('role', 'status');
            container.textContent = 'Portfolio desktop is not configured yet.\n\nYou can still explore the room and use its controls.';
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                container.textContent += '\n\nFor the local desktop, open this page with ?dev.';
            }
            this.createCssPlane(container);
            return;
        }
        const iframe = document.createElement('iframe');
        const expectedOrigin = new URL(iframeUrl).origin;
        iframe.style.width = this.screenSize.width + 'px';
        iframe.style.height = this.screenSize.height + 'px';
        iframe.style.padding = IFRAME_PADDING + 'px';
        iframe.style.boxSizing = 'border-box';
        iframe.style.opacity = '1';
        iframe.className = 'jitter';
        iframe.id = 'computer-screen';
        iframe.frameBorder = '0';
        iframe.title = 'Portfolio workstation desktop';
        this.iframe = iframe;
        container.style.position = 'relative';
        const status = document.createElement('div');
        Object.assign(status.style, {
            position: 'absolute', inset: '32px', padding: '48px',
            background: '#080b14', color: '#d8e2f0', boxSizing: 'border-box',
        });
        status.setAttribute('role', 'status');
        status.textContent = 'Connecting to portfolio desktop...';
        container.append(iframe, status);
        this.loadTimeout = window.setTimeout(() => {
            status.hidden = false;
            status.textContent = 'Portfolio desktop did not connect. Check the inner-site server, URL, and allowed parent origin, then reload.';
        }, 20000);
        this.messageHandler = (event) => {
            var _a;
            if (!((_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) || event.source !== this.iframe.contentWindow)
                return;
            if (event.origin !== expectedOrigin || !isMonitorMessage(event.data))
                return;
            const message = event.data;
            if (this.loadTimeout !== null)
                window.clearTimeout(this.loadTimeout);
            this.loadTimeout = null;
            status.hidden = true;
            if (message.type === 'ready')
                return;
            const bridgedEvent = new CustomEvent(message.type, {
                bubbles: true,
                cancelable: false,
            });
            Object.assign(bridgedEvent, { inComputer: true });
            if (message.type === 'mousemove') {
                const rect = this.iframe.getBoundingClientRect();
                const contentWidth = rect.width * (IFRAME_SIZE.w / SCREEN_SIZE.w);
                const contentHeight = rect.height * (IFRAME_SIZE.h / SCREEN_SIZE.h);
                Object.assign(bridgedEvent, {
                    clientX: rect.left +
                        rect.width * (IFRAME_PADDING / SCREEN_SIZE.w) +
                        (message.clientX / message.viewportWidth) * contentWidth,
                    clientY: rect.top +
                        rect.height * (IFRAME_PADDING / SCREEN_SIZE.h) +
                        (message.clientY / message.viewportHeight) * contentHeight,
                });
            }
            else if (message.type === 'keydown' || message.type === 'keyup') {
                Object.assign(bridgedEvent, { key: message.key });
            }
            this.iframe.dispatchEvent(bridgedEvent);
        };
        window.addEventListener('message', this.messageHandler);
        iframe.src = iframeUrl;
        // Create CSS plane
        this.createCssPlane(container);
    }
    dispose() {
        this.screenListeners.forEach(([type, listener]) => document.removeEventListener(type, listener, false));
        this.screenListeners = [];
        if (this.loadTimeout !== null)
            window.clearTimeout(this.loadTimeout);
        this.loadTimeout = null;
        if (this.messageHandler) {
            window.removeEventListener('message', this.messageHandler);
            this.messageHandler = null;
        }
        this.iframe = null;
    }
    /**
     * Creates a CSS plane and GL plane to properly occlude the CSS plane
     * @param element the element to create the css plane for
     */
    createCssPlane(element) {
        // Create CSS3D object
        const object = new three_examples_jsm_renderers_CSS3DRenderer_js__WEBPACK_IMPORTED_MODULE_1__.CSS3DObject(element);
        // copy monitor position and rotation
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);
        // Add to CSS scene
        this.cssScene.add(object);
        // Create GL plane
        // Punch an RGBA(0, 0, 0, 0) hole in the WebGL canvas for CSS3D.
        // A lit white Lambert mask writes bright RGB at zero alpha with NoBlending.
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({
            color: 0x000000,
            side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
            opacity: 0,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_0__.NoBlending,
            premultipliedAlpha: true,
            depthTest: true,
            depthWrite: true,
            toneMapped: false,
            fog: false,
        });
        // Create plane geometry
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(this.screenSize.width, this.screenSize.height);
        // Create the GL plane mesh
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);
        // Copy the position, rotation and scale of the CSS plane to the GL plane
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        mesh.scale.copy(object.scale);
        // Add to gl scene
        this.scene.add(mesh);
    }
    /**
     * Creates the texture layers for the computer screen
     * @returns the maximum offset of the texture layers
     */
    createTextureLayers() {
        const textures = this.resources.items.texture;
        this.getVideoTextures('video-1');
        this.getVideoTextures('video-2');
        // Scale factor to multiply depth offset by
        const scaleFactor = 4;
        // Construct the texture layers
        const layers = {
            smudge: {
                texture: textures.monitorSmudgeTexture,
                blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
                opacity: 0.12,
                offset: 24,
            },
            innerShadow: {
                texture: textures.monitorShadowTexture,
                blending: three__WEBPACK_IMPORTED_MODULE_0__.NormalBlending,
                opacity: 1,
                offset: 5,
            },
            video: {
                texture: this.videoTextures['video-1'],
                blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
                opacity: 0.5,
                offset: 10,
            },
            video2: {
                texture: this.videoTextures['video-2'],
                blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
                opacity: 0.1,
                offset: 15,
            },
        };
        // Declare max offset
        let maxOffset = -1;
        // Add the texture layers to the screen
        for (const [_, layer] of Object.entries(layers)) {
            const offset = layer.offset * scaleFactor;
            this.addTextureLayer(layer.texture, layer.blending, layer.opacity, offset);
            // Calculate the max offset
            if (offset > maxOffset)
                maxOffset = offset;
        }
        // Return the max offset
        return maxOffset;
    }
    getVideoTextures(videoId) {
        const video = document.getElementById(videoId);
        if (!video) {
            setTimeout(() => {
                this.getVideoTextures(videoId);
            }, 100);
        }
        else {
            this.videoTextures[videoId] = new three__WEBPACK_IMPORTED_MODULE_0__.VideoTexture(video);
        }
    }
    /**
     * Adds a texture layer to the screen
     * @param texture the texture to add
     * @param blending the blending mode
     * @param opacity the opacity of the texture
     * @param offset the offset of the texture, higher values are further from the screen
     */
    addTextureLayer(texture, blendingMode, opacity, offset) {
        // Create material
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({
            map: texture,
            blending: blendingMode,
            side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
            opacity,
            transparent: true,
        });
        // Create geometry
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(this.screenSize.width, this.screenSize.height);
        // Create mesh
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);
        // Copy position and apply the depth offset
        mesh.position.copy(this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, offset)));
        // Copy rotation
        mesh.rotation.copy(this.rotation);
        this.scene.add(mesh);
    }
    /**
     * Creates enclosing planes for the computer screen
     * @param maxOffset the maximum offset of the texture layers
     */
    createEnclosingPlanes(maxOffset) {
        // Create planes, lots of boiler plate code here because I'm lazy
        const planes = {
            left: {
                size: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(-this.screenSize.width / 2, 0, maxOffset / 2)),
                rotation: new three__WEBPACK_IMPORTED_MODULE_0__.Euler(0, 90 * three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.DEG2RAD, 0),
            },
            right: {
                size: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this.screenSize.width / 2, 0, maxOffset / 2)),
                rotation: new three__WEBPACK_IMPORTED_MODULE_0__.Euler(0, 90 * three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.DEG2RAD, 0),
            },
            top: {
                size: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, this.screenSize.height / 2, maxOffset / 2)),
                rotation: new three__WEBPACK_IMPORTED_MODULE_0__.Euler(90 * three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.DEG2RAD, 0, 0),
            },
            bottom: {
                size: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -this.screenSize.height / 2, maxOffset / 2)),
                rotation: new three__WEBPACK_IMPORTED_MODULE_0__.Euler(90 * three__WEBPACK_IMPORTED_MODULE_0__.MathUtils.DEG2RAD, 0, 0),
            },
        };
        // Add each of the planes
        for (const [_, plane] of Object.entries(planes)) {
            this.createEnclosingPlane(plane);
        }
    }
    /**
     * Creates a plane for the enclosing planes
     * @param plane the plane to create
     */
    createEnclosingPlane(plane) {
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({
            side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
            color: 0x48493f,
        });
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(plane.size.x, plane.size.y);
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);
        mesh.position.copy(plane.position);
        mesh.rotation.copy(plane.rotation);
        this.scene.add(mesh);
    }
    createPerspectiveDimmer(maxOffset) {
        const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({
            side: three__WEBPACK_IMPORTED_MODULE_0__.DoubleSide,
            color: 0x000000,
            transparent: true,
            blending: three__WEBPACK_IMPORTED_MODULE_0__.AdditiveBlending,
        });
        const plane = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(this.screenSize.width, this.screenSize.height);
        const mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(plane, material);
        mesh.position.copy(this.offsetPosition(this.position, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, maxOffset - 5)));
        mesh.rotation.copy(this.rotation);
        this.dimmingPlane = mesh;
        this.scene.add(mesh);
    }
    /**
     * Offsets a position vector by another vector
     * @param position the position to offset
     * @param offset the offset to apply
     * @returns the new offset position
     */
    offsetPosition(position, offset) {
        const newPosition = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        newPosition.copy(position);
        newPosition.add(offset);
        return newPosition;
    }
    update() {
        if (this.dimmingPlane) {
            const planeNormal = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, 0, 1);
            const viewVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
            viewVector.copy(this.camera.instance.position);
            viewVector.sub(this.position);
            viewVector.normalize();
            const dot = viewVector.dot(planeNormal);
            // calculate the distance from the camera vector to the plane vector
            const dimPos = this.dimmingPlane.position;
            const camPos = this.camera.instance.position;
            const distance = Math.sqrt(Math.pow((camPos.x - dimPos.x), 2) +
                Math.pow((camPos.y - dimPos.y), 2) +
                Math.pow((camPos.z - dimPos.z), 2));
            const opacity = 1 / (distance / 10000);
            const DIM_FACTOR = 0.7;
            // @ts-ignore
            this.dimmingPlane.material.opacity =
                (1 - opacity) * DIM_FACTOR + (1 - dot) * DIM_FACTOR;
        }
    }
}


/***/ },

/***/ "./src/Application/World/World.ts"
/*!****************************************!*\
  !*** ./src/Application/World/World.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ World)
/* harmony export */ });
/* harmony import */ var _Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Application */ "./src/Application/Application.ts");
/* harmony import */ var _Computer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Computer */ "./src/Application/World/Computer.ts");
/* harmony import */ var _MonitorScreen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MonitorScreen */ "./src/Application/World/MonitorScreen.ts");
/* harmony import */ var _Environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Environment */ "./src/Application/World/Environment.ts");
/* harmony import */ var _Decor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Decor */ "./src/Application/World/Decor.ts");
/* harmony import */ var _CoffeeSteam__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CoffeeSteam */ "./src/Application/World/CoffeeSteam.ts");
/* harmony import */ var _Audio_AudioManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Audio/AudioManager */ "./src/Application/Audio/AudioManager.ts");
/* harmony import */ var _Cyberpunk_CyberpunkRoom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Cyberpunk/CyberpunkRoom */ "./src/Application/World/Cyberpunk/CyberpunkRoom.ts");
/* harmony import */ var _Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Cyberpunk/RoomMode */ "./src/Application/World/Cyberpunk/RoomMode.ts");
/* harmony import */ var _Cyberpunk_HardwareState__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Cyberpunk/HardwareState */ "./src/Application/World/Cyberpunk/HardwareState.ts");
/* harmony import */ var _Cyberpunk_HardwareInteraction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Cyberpunk/HardwareInteraction */ "./src/Application/World/Cyberpunk/HardwareInteraction.ts");











class World {
    constructor() {
        this.hardware = new _Cyberpunk_HardwareState__WEBPACK_IMPORTED_MODULE_9__["default"]();
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.application = new _Application__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        // Wait for resources
        this.resources.on('ready.world', () => {
            var _a;
            // Setup
            if ((0,_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_8__.usesLegacyRoom)(window.location.search)) {
                this.environment = new _Environment__WEBPACK_IMPORTED_MODULE_3__["default"]();
                this.decor = new _Decor__WEBPACK_IMPORTED_MODULE_4__["default"]();
                this.computerSetup = new _Computer__WEBPACK_IMPORTED_MODULE_1__["default"]();
                this.coffeeSteam = new _CoffeeSteam__WEBPACK_IMPORTED_MODULE_5__["default"]();
            }
            else {
                this.cyberpunkRoom = new _Cyberpunk_CyberpunkRoom__WEBPACK_IMPORTED_MODULE_7__["default"](this.hardware);
                this.scene.add(this.cyberpunkRoom);
                const surface = (_a = this.application.renderer.cssInstance) === null || _a === void 0 ? void 0 : _a.domElement;
                if (surface)
                    this.hardwareInteraction = new _Cyberpunk_HardwareInteraction__WEBPACK_IMPORTED_MODULE_10__["default"]({
                        scene: this.scene, surface,
                        camera: () => this.application.camera.instance,
                        active: () => {
                            const camera = this.application.camera;
                            return !camera.freeCam && !camera.targetKeyframe &&
                                (camera.currentKeyframe === 'idle' || camera.currentKeyframe === 'desk');
                        },
                        reducedMotion: () => this.reducedMotion.matches,
                        hardware: this.hardware, targets: this.cyberpunkRoom.targets,
                    });
            }
            this.monitorScreen = new _MonitorScreen__WEBPACK_IMPORTED_MODULE_2__["default"]();
            this.audioManager = new _Audio_AudioManager__WEBPACK_IMPORTED_MODULE_6__["default"]();
            // const hb = new Hitboxes();
            // this.cursor = new Cursor();
        });
    }
    update() {
        var _a, _b;
        (_a = this.cyberpunkRoom) === null || _a === void 0 ? void 0 : _a.update(this.application.time.delta, this.reducedMotion.matches);
        (_b = this.hardwareInteraction) === null || _b === void 0 ? void 0 : _b.update(this.application.time.delta);
        if (this.monitorScreen)
            this.monitorScreen.update();
        if (this.environment)
            this.environment.update();
        if (this.coffeeSteam)
            this.coffeeSteam.update();
        if (this.audioManager)
            this.audioManager.update();
    }
    dispose() {
        var _a, _b, _c, _d, _e;
        this.resources.off('ready.world');
        (_b = (_a = this.audioManager) === null || _a === void 0 ? void 0 : _a.dispose) === null || _b === void 0 ? void 0 : _b.call(_a);
        (_c = this.hardwareInteraction) === null || _c === void 0 ? void 0 : _c.dispose();
        (_d = this.cyberpunkRoom) === null || _d === void 0 ? void 0 : _d.dispose();
        this.hardware.dispose();
        (_e = this.monitorScreen) === null || _e === void 0 ? void 0 : _e.dispose();
    }
}


/***/ },

/***/ "./src/Application/sources.ts"
/*!************************************!*\
  !*** ./src/Application/sources.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _World_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./World/Cyberpunk/RoomMode */ "./src/Application/World/Cyberpunk/RoomMode.ts");

const sources = [
    {
        name: 'computerSetupModel',
        type: 'gltfModel',
        path: 'models/Computer/computer_setup.glb',
    },
    {
        name: 'computerSetupTexture',
        type: 'texture',
        path: 'models/Computer/baked_computer.jpg',
    },
    {
        name: 'environmentModel',
        type: 'gltfModel',
        path: 'models/World/environment.glb',
    },
    {
        name: 'environmentTexture',
        type: 'texture',
        path: 'models/World/baked_environment.jpg',
    },
    {
        name: 'decorModel',
        type: 'gltfModel',
        path: 'models/Decor/decor.glb',
    },
    {
        name: 'decorTexture',
        type: 'texture',
        path: 'models/Decor/baked_decor_modified.jpg',
    },
    {
        name: 'monitorSmudgeTexture',
        type: 'texture',
        path: 'textures/monitor/layers/compressed/smudges.jpg',
    },
    {
        name: 'monitorShadowTexture',
        type: 'texture',
        path: 'textures/monitor/layers/compressed/shadow-compressed.png',
    },
    {
        name: 'mouseDown',
        type: 'audio',
        path: 'audio/mouse/mouse_down.mp3',
    },
    {
        name: 'mouseUp',
        type: 'audio',
        path: 'audio/mouse/mouse_up.mp3',
    },
    {
        name: 'keyboardKeydown1',
        type: 'audio',
        path: 'audio/keyboard/key_1.mp3',
    },
    {
        name: 'keyboardKeydown2',
        type: 'audio',
        path: 'audio/keyboard/key_2.mp3',
    },
    {
        name: 'keyboardKeydown3',
        type: 'audio',
        path: 'audio/keyboard/key_3.mp3',
    },
    {
        name: 'keyboardKeydown4',
        type: 'audio',
        path: 'audio/keyboard/key_4.mp3',
    },
    {
        name: 'keyboardKeydown5',
        type: 'audio',
        path: 'audio/keyboard/key_5.mp3',
    },
    {
        name: 'keyboardKeydown6',
        type: 'audio',
        path: 'audio/keyboard/key_6.mp3',
    },
    {
        name: 'startup',
        type: 'audio',
        path: 'audio/startup/startup.mp3',
    },
    {
        name: 'office',
        type: 'audio',
        path: 'audio/atmosphere/office.mp3',
    },
    {
        name: 'ccType',
        type: 'audio',
        path: 'audio/cc/type.mp3',
    },
];
const legacyRoomResources = new Set([
    'computerSetupModel', 'computerSetupTexture', 'environmentModel',
    'environmentTexture', 'decorModel', 'decorTexture',
]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_World_Cyberpunk_RoomMode__WEBPACK_IMPORTED_MODULE_0__.usesLegacyRoom)(window.location.search)
    ? sources
    : sources.filter(source => !legacyRoomResources.has(source.name)));


/***/ },

/***/ "./static/textures/UI/camera.svg"
/*!***************************************!*\
  !*** ./static/textures/UI/camera.svg ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/0a262c7c9669cd40.svg";

/***/ },

/***/ "./static/textures/UI/mouse.svg"
/*!**************************************!*\
  !*** ./static/textures/UI/mouse.svg ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/e2b639cbd11be706.svg";

/***/ },

/***/ "./static/textures/UI/volume_off.svg"
/*!*******************************************!*\
  !*** ./static/textures/UI/volume_off.svg ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/8bbd53f7e797a91c.svg";

/***/ },

/***/ "./static/textures/UI/volume_on.svg"
/*!******************************************!*\
  !*** ./static/textures/UI/volume_on.svg ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/fa9623e40006eda6.svg";

/***/ }

}]);
//# sourceMappingURL=bundle.82801d0349fffefa.js.map