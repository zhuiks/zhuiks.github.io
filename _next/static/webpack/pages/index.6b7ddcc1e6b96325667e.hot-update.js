webpackHotUpdate_N_E("pages/index",{

/***/ "./lib/use-scroll.ts":
/*!***************************!*\
  !*** ./lib/use-scroll.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar _s = $RefreshSig$();\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n\nvar DELTA_STEP = 7;\nvar TRESHHOLD = 3 * DELTA_STEP;\nvar DRAG_THRESHOLD = 3 * DELTA_STEP;\n\nvar initState = function initState(init) {\n  return _objectSpread(_objectSpread({}, init), {}, {\n    index: 0,\n    offset: 0,\n    dragY: -1,\n    pageScrolled: false\n  });\n};\n\nvar isFirstPage = function isFirstPage(state) {\n  return state.index === 0;\n};\n\nvar isLastPage = function isLastPage(state) {\n  return state.index === state.totalPages - 1;\n};\n\nfunction isTouch(e) {\n  return e.touches !== undefined;\n}\n\nvar getClient = function getClient(event) {\n  console.log(isTouch(event) ? \"touchY: \".concat(event.touches[0].clientY) : \"mouseY: \".concat(event.clientY));\n  return isTouch(event) ? event.touches[0] : event;\n};\n\nvar preventDefault = function preventDefault(event) {\n  event.preventDefault();\n  event.stopPropagation();\n};\n\nvar reducer = function reducer(state, action) {\n  if (state.pageScrolled) {\n    return action.type === 'UNFREEZE' ? _objectSpread(_objectSpread({}, state), {}, {\n      pageScrolled: false\n    }) : state;\n  }\n\n  switch (action.type) {\n    case 'BY_AMOUNT':\n      var amount = action.payload;\n      var newOffset = state.offset + amount;\n      console.log(\"relDelta=\".concat(amount, \", offset=\").concat(newOffset));\n      if (isFirstPage(state) && amount < 0 && newOffset < 0) return state;\n      if (isLastPage(state) && amount > 0 && newOffset > TRESHHOLD) return state;\n\n      if (Math.abs(newOffset) > TRESHHOLD) {\n        return _objectSpread(_objectSpread({}, state), {}, {\n          index: state.index + Math.sign(newOffset),\n          offset: 0,\n          pageScrolled: true\n        });\n      }\n\n      return _objectSpread(_objectSpread({}, state), {}, {\n        offset: newOffset\n      });\n\n    case 'TO_INDEX':\n      return _objectSpread(_objectSpread({}, state), {}, {\n        index: action.payload,\n        offset: 0,\n        pageScrolled: true\n      });\n\n    case 'DRAG_START':\n      if (state.dragY !== -1) return state;\n      preventDefault(action.payload);\n      return _objectSpread(_objectSpread({}, state), {}, {\n        dragY: getClient(action.payload).clientY\n      });\n\n    case 'DRAG':\n      if (state.dragY <= 0) return state;\n      preventDefault(action.payload);\n      var newY = getClient(action.payload).clientY;\n      var deltaY = state.dragY - newY;\n      return _objectSpread(_objectSpread({}, state), {}, {\n        dragY: newY,\n        offset: state.offset + 100 * deltaY / state.pageSize\n      });\n\n    case 'DRAG_END':\n      return _objectSpread(_objectSpread({}, state), {}, {\n        dragY: -1,\n        index: Math.abs(state.offset) > DRAG_THRESHOLD ? state.index + Math.sign(state.offset) : state.index,\n        offset: 0,\n        pageScrolled: true\n      });\n\n    case 'RESIZE':\n      return _objectSpread(_objectSpread({}, state), {}, {\n        pageSize: action.payload,\n        offset: 0,\n        dragY: -1\n      });\n\n    default:\n      return state;\n  }\n};\n\nvar useScroll = function useScroll(initParams) {\n  _s();\n\n  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useReducer\"])(reducer, initParams, initState),\n      state = _useReducer[0],\n      dispatch = _useReducer[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {\n    if (state.pageScrolled) {\n      setTimeout(function () {\n        dispatch({\n          type: 'UNFREEZE'\n        });\n      }, 1000);\n    }\n  }, [state.pageScrolled]);\n  return {\n    index: state.index,\n    offset: state.offset,\n    absOffset: state.offset / DELTA_STEP,\n    activeEnd: isLastPage(state) && state.offset / DELTA_STEP > 1,\n    scrollByAmount: function scrollByAmount(val) {\n      return dispatch({\n        type: 'BY_AMOUNT',\n        payload: val\n      });\n    },\n    scrollByStep: function scrollByStep(dir) {\n      return dispatch({\n        type: 'BY_AMOUNT',\n        payload: dir < 0 ? -DELTA_STEP : DELTA_STEP\n      });\n    },\n    scrollToIndex: function scrollToIndex(index) {\n      return dispatch({\n        type: 'TO_INDEX',\n        payload: index\n      });\n    },\n    startDrag: function startDrag(event) {\n      return dispatch({\n        type: 'DRAG_START',\n        payload: event\n      });\n    },\n    drag: function drag(event) {\n      return dispatch({\n        type: 'DRAG',\n        payload: event\n      });\n    },\n    endDrag: function endDrag() {\n      return dispatch({\n        type: 'DRAG_END'\n      });\n    },\n    resize: function resize(h) {\n      return dispatch({\n        type: 'RESIZE',\n        payload: h\n      });\n    }\n  };\n};\n\n_s(useScroll, \"m2z0qhC7ztC64kKVDga+TYLfOuQ=\");\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (useScroll);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbGliL3VzZS1zY3JvbGwudHM/NTlkOCJdLCJuYW1lcyI6WyJERUxUQV9TVEVQIiwiVFJFU0hIT0xEIiwiRFJBR19USFJFU0hPTEQiLCJpbml0U3RhdGUiLCJpbml0IiwiaW5kZXgiLCJvZmZzZXQiLCJkcmFnWSIsInBhZ2VTY3JvbGxlZCIsImlzRmlyc3RQYWdlIiwic3RhdGUiLCJpc0xhc3RQYWdlIiwidG90YWxQYWdlcyIsImlzVG91Y2giLCJlIiwidG91Y2hlcyIsInVuZGVmaW5lZCIsImdldENsaWVudCIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsImNsaWVudFkiLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsInJlZHVjZXIiLCJhY3Rpb24iLCJ0eXBlIiwiYW1vdW50IiwicGF5bG9hZCIsIm5ld09mZnNldCIsIk1hdGgiLCJhYnMiLCJzaWduIiwibmV3WSIsImRlbHRhWSIsInBhZ2VTaXplIiwidXNlU2Nyb2xsIiwiaW5pdFBhcmFtcyIsInVzZVJlZHVjZXIiLCJkaXNwYXRjaCIsInVzZUVmZmVjdCIsInNldFRpbWVvdXQiLCJhYnNPZmZzZXQiLCJhY3RpdmVFbmQiLCJzY3JvbGxCeUFtb3VudCIsInZhbCIsInNjcm9sbEJ5U3RlcCIsImRpciIsInNjcm9sbFRvSW5kZXgiLCJzdGFydERyYWciLCJkcmFnIiwiZW5kRHJhZyIsInJlc2l6ZSIsImgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsVUFBVSxHQUFHLENBQW5CO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLElBQUlELFVBQXRCO0FBQ0EsSUFBTUUsY0FBYyxHQUFHLElBQUlGLFVBQTNCOztBQTZDQSxJQUFNRyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxJQUFEO0FBQUEseUNBQ2JBLElBRGE7QUFFaEJDLFNBQUssRUFBRSxDQUZTO0FBR2hCQyxVQUFNLEVBQUUsQ0FIUTtBQUloQkMsU0FBSyxFQUFFLENBQUMsQ0FK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UyxFQUFFLG1CQUFDL0IsS0FBRDtBQUFBLGFBQXNCcUIsUUFBUSxDQUFDO0FBQUViLFlBQUksRUFBRSxZQUFSO0FBQXNCRSxlQUFPLEVBQUVWO0FBQS9CLE9BQUQsQ0FBOUI7QUFBQSxLQVJOO0FBU0xnQyxRQUFJLEVBQUUsY0FBQ2hDLEtBQUQ7QUFBQSxhQUFzQnFCLFFBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUUsTUFBUjtBQUFnQkUsZUFBTyxFQUFFVjtBQUF6QixPQUFELENBQTlCO0FBQUEsS0FURDtBQVVMaUMsV0FBTyxFQUFFO0FBQUEsYUFBTVosUUFBUSxDQUFDO0FBQUViLFlBQUksRUFBRTtBQUFSLE9BQUQsQ0FBZDtBQUFBLEtBVko7QUFXTDBCLFVBQU0sRUFBRSxnQkFBQ0MsQ0FBRDtBQUFBLGFBQWVkLFFBQVEsQ0FBQztBQUFFYixZQUFJLEVBQUUsUUFBUjtBQUFrQkUsZUFBTyxFQUFFeUI7QUFBM0IsT0FBRCxDQUF2QjtBQUFBO0FBWEgsR0FBUDtBQWFELENBdkJEOztHQUFNakIsUzs7QUF5QlNBLHdFQUFmIiwiZmlsZSI6Ii4vbGliL3VzZS1zY3JvbGwudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVkdWNlciwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXG5cbmNvbnN0IERFTFRBX1NURVAgPSA3XG5jb25zdCBUUkVTSEhPTEQgPSAzICogREVMVEFfU1RFUFxuY29uc3QgRFJBR19USFJFU0hPTEQgPSAzICogREVMVEFfU1RFUFxuXG50eXBlIE1vdXNlRXZlbnQgPSBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxFbGVtZW50PlxudHlwZSBUb3VjaEV2ZW50ID0gUmVhY3QuVG91Y2hFdmVudDxIVE1MRWxlbWVudD5cblxudHlwZSBEcmFnRXZlbnQgPSBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudFxuXG5pbnRlcmZhY2UgVW5mcmVlemVBY3Rpb24ge1xuICB0eXBlOiAnVU5GUkVFWkUnXG59XG5pbnRlcmZhY2UgVG9JbmRleEFjdGlvbiB7XG4gIHR5cGU6ICdUT19JTkRFWCdcbiAgcGF5bG9hZDogbnVtYmVyXG59XG5pbnRlcmZhY2UgQnlBbW91bnRBY3Rpb24ge1xuICB0eXBlOiAnQllfQU1PVU5UJ1xuICBwYXlsb2FkOiBudW1iZXJcbn1cbmludGVyZmFjZSBEcmFnU3RhcnRBY3Rpb24ge1xuICB0eXBlOiAnRFJBR19TVEFSVCdcbiAgcGF5bG9hZDogRHJhZ0V2ZW50XG59XG5pbnRlcmZhY2UgRHJhZ0FjdGlvbiB7XG4gIHR5cGU6ICdEUkFHJ1xuICBwYXlsb2FkOiBEcmFnRXZlbnRcbn1cbmludGVyZmFjZSBEcmFnRW5kQWN0aW9uIHtcbiAgdHlwZTogJ0RSQUdfRU5EJ1xufVxuaW50ZXJmYWNlIFJlc2l6ZUFjdGlvbiB7XG4gIHR5cGU6ICdSRVNJWkUnLFxuICBwYXlsb2FkOiBudW1iZXJcbn1cbnR5cGUgVGhlQWN0aW9uID0gVW5mcmVlemVBY3Rpb24gfCBUb0luZGV4QWN0aW9uIHwgQnlBbW91bnRBY3Rpb24gfCBEcmFnU3RhcnRBY3Rpb24gfCBEcmFnQWN0aW9uIHwgRHJhZ0VuZEFjdGlvbiB8IFJlc2l6ZUFjdGlvblxuXG5pbnRlcmZhY2UgSW5pdFN0YXRlIHtcbiAgdG90YWxQYWdlczogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyXG59XG5pbnRlcmZhY2UgU2Nyb2xsU3RhdGUgZXh0ZW5kcyBJbml0U3RhdGUge1xuICBpbmRleDogbnVtYmVyXG4gIG9mZnNldDogbnVtYmVyXG4gIGRyYWdZOiBudW1iZXJcbiAgcGFnZVNjcm9sbGVkOiBib29sZWFuXG59XG5jb25zdCBpbml0U3RhdGUgPSAoaW5pdDogSW5pdFN0YXRlKTogU2Nyb2xsU3RhdGUgPT4gKHtcbiAgLi4uaW5pdCxcbiAgaW5kZXg6IDAsXG4gIG9mZnNldDogMCxcbiAgZHJhZ1k6IC0xLFxuICBwYWdlU2Nyb2xsZWQ6IGZhbHNlLFxufSlcblxuY29uc3QgaXNGaXJzdFBhZ2UgPSAoc3RhdGU6IFNjcm9sbFN0YXRlKSA9PiBzdGF0ZS5pbmRleCA9PT0gMFxuY29uc3QgaXNMYXN0UGFnZSA9IChzdGF0ZTogU2Nyb2xsU3RhdGUpID0+IHN0YXRlLmluZGV4ID09PSBzdGF0ZS50b3RhbFBhZ2VzIC0gMVxuXG5cbmZ1bmN0aW9uIGlzVG91Y2goZTogRHJhZ0V2ZW50KTogZSBpcyBUb3VjaEV2ZW50IHtcbiAgcmV0dXJuIChlIGFzIFJlYWN0LlRvdWNoRXZlbnQ8SFRNTEVsZW1lbnQ+KS50b3VjaGVzICE9PSB1bmRlZmluZWRcbn1cblxuY29uc3QgZ2V0Q2xpZW50ID0gKGV2ZW50OiBEcmFnRXZlbnQpID0+IHtcbiAgY29uc29sZS5sb2coaXNUb3VjaChldmVudCkgPyBgdG91Y2hZOiAke2V2ZW50LnRvdWNoZXNbMF0uY2xpZW50WX1gIDogYG1vdXNlWTogJHtldmVudC5jbGllbnRZfWApXG4gIHJldHVybiAoXG4gICAgaXNUb3VjaChldmVudCkgPyBldmVudC50b3VjaGVzWzBdIDogZXZlbnRcbiAgKVxufVxuXG5jb25zdCBwcmV2ZW50RGVmYXVsdCA9IChldmVudDogRHJhZ0V2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbn1cblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZTogU2Nyb2xsU3RhdGUsIGFjdGlvbjogVGhlQWN0aW9uKSA9PiB7XG4gIGlmIChzdGF0ZS5wYWdlU2Nyb2xsZWQpIHtcbiAgICByZXR1cm4gYWN0aW9uLnR5cGUgPT09ICdVTkZSRUVaRScgPyB7IC4uLnN0YXRlLCBwYWdlU2Nyb2xsZWQ6IGZhbHNlIH0gOiBzdGF0ZVxuICB9XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlICdCWV9BTU9VTlQnOlxuICAgICAgY29uc3QgYW1vdW50ID0gYWN0aW9uLnBheWxvYWRcbiAgICAgIGNvbnN0IG5ld09mZnNldCA9IHN0YXRlLm9mZnNldCArIGFtb3VudFxuICAgICAgY29uc29sZS5sb2coYHJlbERlbHRhPSR7YW1vdW50fSwgb2Zmc2V0PSR7bmV3T2Zmc2V0fWApXG4gICAgICBpZiAoaXNGaXJzdFBhZ2Uoc3RhdGUpICYmIGFtb3VudCA8IDAgJiYgbmV3T2Zmc2V0IDwgMCkgcmV0dXJuIHN0YXRlXG4gICAgICBpZiAoaXNMYXN0UGFnZShzdGF0ZSkgJiYgYW1vdW50ID4gMCAmJiBuZXdPZmZzZXQgPiBUUkVTSEhPTEQpIHJldHVybiBzdGF0ZVxuICAgICAgaWYgKE1hdGguYWJzKG5ld09mZnNldCkgPiBUUkVTSEhPTEQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBpbmRleDogc3RhdGUuaW5kZXggKyBNYXRoLnNpZ24obmV3T2Zmc2V0KSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgcGFnZVNjcm9sbGVkOiB0cnVlLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgb2Zmc2V0OiBuZXdPZmZzZXRcbiAgICAgIH1cbiAgICBjYXNlICdUT19JTkRFWCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaW5kZXg6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIHBhZ2VTY3JvbGxlZDogdHJ1ZSxcbiAgICAgIH1cbiAgICBjYXNlICdEUkFHX1NUQVJUJzpcbiAgICAgIGlmIChzdGF0ZS5kcmFnWSAhPT0gLTEpIHJldHVybiBzdGF0ZVxuICAgICAgcHJldmVudERlZmF1bHQoYWN0aW9uLnBheWxvYWQpXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZHJhZ1k6IGdldENsaWVudChhY3Rpb24ucGF5bG9hZCkuY2xpZW50WVxuICAgICAgfVxuICAgIGNhc2UgJ0RSQUcnOlxuICAgICAgaWYgKHN0YXRlLmRyYWdZIDw9IDApIHJldHVybiBzdGF0ZVxuICAgICAgcHJldmVudERlZmF1bHQoYWN0aW9uLnBheWxvYWQpXG4gICAgICBjb25zdCBuZXdZID0gZ2V0Q2xpZW50KGFjdGlvbi5wYXlsb2FkKS5jbGllbnRZXG4gICAgICBjb25zdCBkZWx0YVkgPSBzdGF0ZS5kcmFnWSAtIG5ld1lcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBkcmFnWTogbmV3WSxcbiAgICAgICAgb2Zmc2V0OiBzdGF0ZS5vZmZzZXQgKyAxMDAgKiBkZWx0YVkgLyBzdGF0ZS5wYWdlU2l6ZSxcbiAgICAgIH1cbiAgICBjYXNlICdEUkFHX0VORCc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZHJhZ1k6IC0xLFxuICAgICAgICBpbmRleDogTWF0aC5hYnMoc3RhdGUub2Zmc2V0KSA+IERSQUdfVEhSRVNIT0xEID8gc3RhdGUuaW5kZXggKyBNYXRoLnNpZ24oc3RhdGUub2Zmc2V0KSA6IHN0YXRlLmluZGV4LFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIHBhZ2VTY3JvbGxlZDogdHJ1ZVxuICAgICAgfVxuICAgIGNhc2UgJ1JFU0laRSc6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgcGFnZVNpemU6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgIGRyYWdZOiAtMSxcbiAgICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuXG5cbmNvbnN0IHVzZVNjcm9sbCA9IChpbml0UGFyYW1zOiBJbml0U3RhdGUpID0+IHtcbiAgY29uc3QgW3N0YXRlLCBkaXNwYXRjaF0gPSB1c2VSZWR1Y2VyKHJlZHVjZXIsIGluaXRQYXJhbXMsIGluaXRTdGF0ZSlcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc3RhdGUucGFnZVNjcm9sbGVkKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnVU5GUkVFWkUnIH0pXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfSwgW3N0YXRlLnBhZ2VTY3JvbGxlZF0pXG5cbiAgcmV0dXJuIHtcbiAgICBpbmRleDogc3RhdGUuaW5kZXgsXG4gICAgb2Zmc2V0OiBzdGF0ZS5vZmZzZXQsXG4gICAgYWJzT2Zmc2V0OiBzdGF0ZS5vZmZzZXQgLyBERUxUQV9TVEVQLFxuICAgIGFjdGl2ZUVuZDogaXNMYXN0UGFnZShzdGF0ZSkgJiYgc3RhdGUub2Zmc2V0IC8gREVMVEFfU1RFUCA+IDEsXG4gICAgc2Nyb2xsQnlBbW91bnQ6ICh2YWw6IG51bWJlcikgPT4gZGlzcGF0Y2goeyB0eXBlOiAnQllfQU1PVU5UJywgcGF5bG9hZDogdmFsIH0pLFxuICAgIHNjcm9sbEJ5U3RlcDogKGRpcjogbnVtYmVyKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdCWV9BTU9VTlQnLCBwYXlsb2FkOiBkaXIgPCAwID8gLSBERUxUQV9TVEVQIDogREVMVEFfU1RFUCB9KSxcbiAgICBzY3JvbGxUb0luZGV4OiAoaW5kZXg6IG51bWJlcikgPT4gZGlzcGF0Y2goeyB0eXBlOiAnVE9fSU5ERVgnLCBwYXlsb2FkOiBpbmRleCB9KSxcbiAgICBzdGFydERyYWc6IChldmVudDogRHJhZ0V2ZW50KSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdEUkFHX1NUQVJUJywgcGF5bG9hZDogZXZlbnQgfSksXG4gICAgZHJhZzogKGV2ZW50OiBEcmFnRXZlbnQpID0+IGRpc3BhdGNoKHsgdHlwZTogJ0RSQUcnLCBwYXlsb2FkOiBldmVudCB9KSxcbiAgICBlbmREcmFnOiAoKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdEUkFHX0VORCcgfSksXG4gICAgcmVzaXplOiAoaDogbnVtYmVyKSA9PiBkaXNwYXRjaCh7IHR5cGU6ICdSRVNJWkUnLCBwYXlsb2FkOiBoIH0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlU2Nyb2xsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/use-scroll.ts\n");

/***/ })

})