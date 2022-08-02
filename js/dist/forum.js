/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forum/components/ConnectWalletModal.tsx":
/*!*****************************************************!*\
  !*** ./src/forum/components/ConnectWalletModal.tsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConnectWalletModal)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/utils/ItemList */ "flarum/common/utils/ItemList");
/* harmony import */ var flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/utils/classList */ "flarum/common/utils/classList");
/* harmony import */ var flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _polkadot_util__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @polkadot/util */ "./node_modules/@polkadot/util/string/toHex.js");













var ConnectWalletModal = /*#__PURE__*/function (_Modal) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(ConnectWalletModal, _Modal);

  function ConnectWalletModal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Modal.call.apply(_Modal, [this].concat(args)) || this;
    _this.selectedWallet = null;
    _this.accounts = null;
    _this.loading = false;
    return _this;
  }

  var _proto = ConnectWalletModal.prototype;

  _proto.className = function className() {
    return 'ConnectWalletModal';
  };

  _proto.title = function title() {
    return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.title');
  };

  _proto.content = function content() {
    return m("div", {
      className: flarum_common_utils_classList__WEBPACK_IMPORTED_MODULE_10___default()("Modal-body", {
        "Modal-body--loading": this.loading
      })
    }, this.selectedWallet ? this.selectedWalletView() : this.walletKindItems().toArray());
  };

  _proto.walletKindItems = function walletKindItems() {
    var _this2 = this;

    var items = new (flarum_common_utils_ItemList__WEBPACK_IMPORTED_MODULE_5___default())();
    Object.keys((flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().wallets)).forEach(function (key, index) {
      var walletKind = (flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().wallets)[key];
      if (!walletKind.wallets.length) return;
      items.add(key, _this2.walletKindView(walletKind, index));
    });
    return items;
  };

  _proto.walletKindView = function walletKindView(walletKind, index) {
    var _this3 = this;

    if (index === void 0) {
      index = 0;
    }

    return m("div", {
      className: "ConnectWalletModal-walletKind",
      key: index
    }, m("div", {
      className: "ConnectWalletModal-walletKind-title"
    }, walletKind.title), m("div", {
      className: "ConnectWalletModal-walletKind-list"
    }, walletKind.wallets.map(function (wallet, walletIndex) {
      return _this3.walletView(wallet, walletIndex);
    })));
  };

  _proto.walletView = function walletView(wallet, walletIndex) {
    if (walletIndex === void 0) {
      walletIndex = 0;
    }

    var Tag = wallet.installed ? (flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()) : (flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_8___default());
    var attrs = {};

    if (!wallet.installed) {
      attrs = {
        href: wallet.installUrl,
        target: '_blank',
        rel: 'noopener noreferrer'
      };
    } else {
      attrs = {
        onclick: this.listWalletAccounts.bind(this, wallet)
      };
    }

    return m(Tag, Object.assign({
      className: "Button ConnectWalletModal-wallet",
      key: walletIndex
    }, attrs), m("div", {
      className: "ConnectWalletModal-wallet-logo"
    }, m("img", wallet.logo)), m("div", {
      className: "ConnectWalletModal-wallet-title"
    }, wallet.title), m("div", {
      className: "ConnectWalletModal-wallet-indicator"
    }, wallet.installed ? flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-arrow-right') : flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_7___default()('fas fa-download')));
  };

  _proto.selectedWalletView = function selectedWalletView() {
    var _this4 = this;

    if (this.accounts === null) {
      this.selectedWallet.getAccounts().then(function (accs) {
        _this4.accounts = accs || [];
        m.redraw();
      });
      return m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_9___default()), null);
    }

    return m('[', null, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "Button Button--text ConnectWalletModal-goback",
      icon: "fas fa-arrow-left",
      onclick: this.listWallets.bind(this)
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.goback')), m("div", {
      className: "ConnectWalletModal-selectedWallet"
    }, m("div", {
      className: "ConnectWalletModal-selectedWallet-title"
    }, this.selectedWallet.title), m("div", {
      className: "ConnectWalletModal-selectedWallet-list"
    }, this.accounts.map(function (account, accountIndex) {
      return _this4.accountView(account, accountIndex);
    }))));
  };

  _proto.accountView = function accountView(account, accountIndex) {
    return m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default()), {
      className: "Button ConnectWalletModal-account",
      key: accountIndex,
      onclick: this.connectWallet.bind(this, account)
    }, m("div", {
      className: "ConnectWalletModal-account-title"
    }, account.name), m("div", {
      className: "ConnectWalletModal-account-address"
    }, account.address));
  };

  _proto.listWalletAccounts = function listWalletAccounts(wallet) {
    this.accounts = null;
    this.selectedWallet = wallet;
  };

  _proto.listWallets = function listWallets() {
    this.accounts = null;
    this.selectedWallet = null;
  };

  _proto.connectWallet = /*#__PURE__*/function () {
    var _connectWallet = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().mark(function _callee(account) {
      var wallet, signer, _yield, signature, savedAccount;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              wallet = account.wallet;

              if (!this.loading) {
                this.loading = true;
                m.redraw();
              }

              _context.next = 4;
              return wallet.enable();

            case 4:
              if (!wallet.signer) {
                _context.next = 21;
                break;
              }

              _context.prev = 5;
              signer = wallet.signer; // Trigger the extension popup

              _context.next = 9;
              return signer.signRaw({
                type: 'bytes',
                data: (0,_polkadot_util__WEBPACK_IMPORTED_MODULE_11__.stringToHex)(flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().session.user.username()),
                address: account.address
              });

            case 9:
              _yield = _context.sent;
              signature = _yield.signature;
              _context.next = 13;
              return flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().store.createRecord('web3-accounts').save({
                address: account.address,
                source: account.source,
                // @ts-ignore
                type: account.type || ''
              }, {
                meta: {
                  signature: signature
                }
              });

            case 13:
              savedAccount = _context.sent;
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](5);
              flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().alerts.show({
                type: 'error'
              }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_3___default().translator.trans('blomstra-web3-wallets.forum.connect-wallet-modal.could-not-sign'));

            case 19:
              this.loading = false;
              m.redraw();

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[5, 16]]);
    }));

    function connectWallet(_x) {
      return _connectWallet.apply(this, arguments);
    }

    return connectWallet;
  }();

  return ConnectWalletModal;
}((flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_4___default()));



/***/ }),

/***/ "./src/forum/index.tsx":
/*!*****************************!*\
  !*** ./src/forum/index.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/HeaderSecondary */ "flarum/forum/components/HeaderSecondary");
/* harmony import */ var flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_ConnectWalletModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ConnectWalletModal */ "./src/forum/components/ConnectWalletModal.tsx");
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/Tooltip */ "flarum/common/components/Tooltip");
/* harmony import */ var flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _subwallet_wallet_connect_dotsama_wallets__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @subwallet/wallet-connect/dotsama/wallets */ "./node_modules/@subwallet/wallet-connect/dotsama/wallets.js");
/* harmony import */ var _models_Web3Account__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/Web3Account */ "./src/forum/models/Web3Account.ts");








flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('blomstra/web3-wallets', function () {
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().store.models["web3-accounts"]) = _models_Web3Account__WEBPACK_IMPORTED_MODULE_6__["default"];
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().wallets) = {
    polkadot: {
      key: 'polkadot',
      title: 'Polkadot',
      wallets: (0,_subwallet_wallet_connect_dotsama_wallets__WEBPACK_IMPORTED_MODULE_7__.getWallets)()
    },
    ethereum: {
      key: 'ethereum',
      title: 'Ethereum',
      wallets: []
    }
  };
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'items', function (items) {
    if ((flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().session.user)) {
      items.add('wallet-connect', m((flarum_common_components_Tooltip__WEBPACK_IMPORTED_MODULE_5___default()), {
        text: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label'),
        position: "bottom"
      }, m((flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_3___default()), {
        icon: "fas fa-wallet",
        className: "Button Button--flat Button--icon",
        "aria-label": flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('blomstra-web3-wallets.forum.header.wallet-connect-label'),
        onclick: function onclick() {
          return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().modal.show(_components_ConnectWalletModal__WEBPACK_IMPORTED_MODULE_4__["default"]);
        }
      })), 5);
    }
  });
});

/***/ }),

/***/ "./src/forum/models/Web3Account.ts":
/*!*****************************************!*\
  !*** ./src/forum/models/Web3Account.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Web3Account)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



var Web3Account = /*#__PURE__*/function (_Model) {
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Web3Account, _Model);

  function Web3Account() {
    return _Model.apply(this, arguments) || this;
  }

  var _proto = Web3Account.prototype;

  _proto.address = function address() {
    return flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('address').call(this);
  };

  _proto.source = function source() {
    return flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('source').call(this);
  };

  _proto.type = function type() {
    return flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('type').call(this);
  };

  _proto.apiEndpoint = function apiEndpoint() {
    return _Model.prototype.apiEndpoint.call(this).replace('/web3-accounts', '/web3/accounts');
  };

  return Web3Account;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));



/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/PolkadotLogo.svg":
/*!******************************************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/PolkadotLogo.svg ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='15 15 140 140' style='enable-background:new 0 0 170 170;zoom: 1;' xml:space='preserve'%3e%3cstyle type='text/css'%3e.bg0%7bfill:%23FF8C00%7d .st0%7bfill:%23FFFFFF%7d%3c/style%3e%3cg%3e%3ccircle class='bg0' cx='85' cy='85' r='70'%3e%3c/circle%3e%3cg%3e%3cpath class='st0' d='M85,34.7c-20.8,0-37.8,16.9-37.8,37.8c0,4.2,0.7,8.3,2,12.3c0.9,2.7,3.9,4.2,6.7,3.3c2.7-0.9,4.2-3.9,3.3-6.7 c-1.1-3.1-1.6-6.4-1.5-9.7C58.1,57.6,69.5,46,83.6,45.3c15.7-0.8,28.7,11.7,28.7,27.2c0,14.5-11.4,26.4-25.7,27.2 c0,0-5.3,0.3-7.9,0.7c-1.3,0.2-2.3,0.4-3,0.5c-0.3,0.1-0.6-0.2-0.5-0.5l0.9-4.4L81,73.4c0.6-2.8-1.2-5.6-4-6.2 c-2.8-0.6-5.6,1.2-6.2,4c0,0-11.8,55-11.9,55.6c-0.6,2.8,1.2,5.6,4,6.2c2.8,0.6,5.6-1.2,6.2-4c0.1-0.6,1.7-7.9,1.7-7.9 c1.2-5.6,5.8-9.7,11.2-10.4c1.2-0.2,5.9-0.5,5.9-0.5c19.5-1.5,34.9-17.8,34.9-37.7C122.8,51.6,105.8,34.7,85,34.7z M87.7,121.7 c-3.4-0.7-6.8,1.4-7.5,4.9c-0.7,3.4,1.4,6.8,4.9,7.5c3.4,0.7,6.8-1.4,7.5-4.9C93.3,125.7,91.2,122.4,87.7,121.7z'%3e%3c/path%3e%3c/g%3e%3c/g%3e%3c/svg%3e"

/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/SubWalletLogo.svg":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/SubWalletLogo.svg ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg width='134' height='134' viewBox='0 0 134 134' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cmask id='mask0_699_5101' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='134' height='134'%3e %3crect width='134' height='134' fill='%23C4C4C4'/%3e %3c/mask%3e %3cg mask='url(%23mask0_699_5101)'%3e %3cpath d='M87.9615 64.3201L87.9456 47.7455L27.1191 16.2236V64.3041L66.0589 85.106L80.2884 78.8367L37.4403 56.1046L37.4722 37.887L87.9615 64.3201Z' fill='url(%23paint0_linear_699_5101)'/%3e %3cpath d='M50.7607 44.8421V50.5052L37.3926 56.2321L37.4883 37.6636L50.7607 44.8421Z' fill='url(%23paint1_linear_699_5101)'/%3e %3cpath d='M50.8095 91.822L80.2895 78.8368L37.4414 56.2163L50.6819 50.5054L105.765 79.2835L50.9212 103.212L50.8095 91.822Z' fill='url(%23paint2_linear_699_5101)'/%3e %3cpath d='M37.4886 87.9773L50.6493 82.2982L50.9365 103.196L105.765 79.2832V97.118L37.377 127.077L37.4886 87.9773Z' fill='url(%23paint3_linear_699_5101)'/%3e %3cpath d='M27.1191 82.5857L37.4403 87.9776L37.3765 127.013L27.1191 121.86V82.5857Z' fill='url(%23paint4_linear_699_5101)'/%3e %3cpath d='M40.1522 76.7791L50.6489 82.2986L37.4403 87.9776L27.1191 82.5857L40.1522 76.7791Z' fill='url(%23paint5_linear_699_5101)'/%3e %3cpath d='M105.765 56.5993L105.702 39.9131L87.9785 47.7457V64.3362L105.765 56.5993Z' fill='url(%23paint6_linear_699_5101)'/%3e %3cpath d='M27.1191 16.2237L45.0337 7.97632L105.732 39.8811L87.9775 47.7456L27.1191 16.2237Z' fill='url(%23paint7_linear_699_5101)'/%3e %3c/g%3e %3cdefs%3e %3clinearGradient id='paint0_linear_699_5101' x1='11.9006' y1='50.6648' x2='119.372' y2='50.6648' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%23FFD4B2'/%3e %3cstop offset='0.36' stop-color='%239ACEB7'/%3e %3cstop offset='0.67' stop-color='%2347C8BB'/%3e %3cstop offset='0.89' stop-color='%2314C5BE'/%3e %3cstop offset='1' stop-color='%2300C4BF'/%3e %3c/linearGradient%3e %3clinearGradient id='paint1_linear_699_5101' x1='44.0766' y1='62.8524' x2='44.0766' y2='21.2167' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%2300FECF'/%3e %3cstop offset='0.08' stop-color='%2300E5D0'/%3e %3cstop offset='0.24' stop-color='%2300A5D1'/%3e %3cstop offset='0.48' stop-color='%230040D4'/%3e %3cstop offset='0.54' stop-color='%230025D5'/%3e %3cstop offset='1'/%3e %3c/linearGradient%3e %3clinearGradient id='paint2_linear_699_5101' x1='37.4414' y1='76.8587' x2='146.891' y2='76.8587' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%23FDEC9F'/%3e %3cstop offset='0.08' stop-color='%23E4D8A4'/%3e %3cstop offset='0.24' stop-color='%23A4A6B2'/%3e %3cstop offset='0.47' stop-color='%233F57C8'/%3e %3cstop offset='0.61' stop-color='%230025D5'/%3e %3cstop offset='1'/%3e %3c/linearGradient%3e %3clinearGradient id='paint3_linear_699_5101' x1='15.0596' y1='103.18' x2='155.01' y2='103.18' gradientUnits='userSpaceOnUse'%3e %3cstop offset='0.05' stop-color='%2362A5FF'/%3e %3cstop offset='0.45' stop-color='%231032D1'/%3e %3cstop offset='1'/%3e %3c/linearGradient%3e %3clinearGradient id='paint4_linear_699_5101' x1='628.741' y1='3244.93' x2='797.782' y2='3247.12' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%23FFD4B2'/%3e %3cstop offset='0.36' stop-color='%239ACEB7'/%3e %3cstop offset='0.67' stop-color='%2347C8BB'/%3e %3cstop offset='0.89' stop-color='%2314C5BE'/%3e %3cstop offset='1' stop-color='%2300C4BF'/%3e %3c/linearGradient%3e %3clinearGradient id='paint5_linear_699_5101' x1='24.5987' y1='82.3783' x2='72.5834' y2='82.3783' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%2300FECF'/%3e %3cstop offset='0.08' stop-color='%2300E5D0'/%3e %3cstop offset='0.25' stop-color='%2300A5D1'/%3e %3cstop offset='0.49' stop-color='%230040D4'/%3e %3cstop offset='0.56' stop-color='%230025D5'/%3e %3c/linearGradient%3e %3clinearGradient id='paint6_linear_699_5101' x1='70.9573' y1='52.5952' x2='189.069' y2='50.4576' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%2300FECF'/%3e %3cstop offset='0.05' stop-color='%2300E5D0'/%3e %3cstop offset='0.15' stop-color='%2300A5D1'/%3e %3cstop offset='0.29' stop-color='%230040D4'/%3e %3cstop offset='0.33' stop-color='%230025D5'/%3e %3c/linearGradient%3e %3clinearGradient id='paint7_linear_699_5101' x1='27.1191' y1='27.8689' x2='173.642' y2='27.8689' gradientUnits='userSpaceOnUse'%3e %3cstop stop-color='%23FFD4AF'/%3e %3cstop offset='0.1' stop-color='%23E6D5BA'/%3e %3cstop offset='0.31' stop-color='%23A7D6D5'/%3e %3cstop offset='0.61' stop-color='%2343D9FF'/%3e %3cstop offset='0.63' stop-color='%2337B1D0'/%3e %3cstop offset='0.65' stop-color='%232B8CA5'/%3e %3cstop offset='0.67' stop-color='%23216B7D'/%3e %3cstop offset='0.7' stop-color='%23184E5B'/%3e %3cstop offset='0.72' stop-color='%2310353F'/%3e %3cstop offset='0.75' stop-color='%230A2228'/%3e %3cstop offset='0.78' stop-color='%23061316'/%3e %3cstop offset='0.82' stop-color='%23020809'/%3e %3cstop offset='0.88' stop-color='%23010202'/%3e %3cstop offset='1'/%3e %3c/linearGradient%3e %3c/defs%3e %3c/svg%3e"

/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/TalismanLogo.svg":
/*!******************************************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/TalismanLogo.svg ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3crect width='24' height='24' rx='4' fill='%23D5FF5C'/%3e %3cpath fill-rule='evenodd' clip-rule='evenodd' d='M16.5349 12.9159C16.6871 13.2472 17.135 13.3643 17.3929 13.1065L17.8651 12.6345C18.3535 12.1464 19.1453 12.1464 19.6337 12.6345C20.1221 13.1227 20.1221 13.9141 19.6337 14.4023L15.8097 18.2246C14.8921 19.3104 13.5198 20 11.9865 20C10.3851 20 8.95942 19.2478 8.04385 18.0777L4.36629 14.4018C3.87791 13.9136 3.87791 13.1222 4.36629 12.634C4.85467 12.1459 5.64649 12.1459 6.13487 12.634L6.60044 13.0994C6.85253 13.3514 7.29002 13.238 7.43894 12.9141V12.9141C7.46838 12.8501 7.48439 12.7814 7.48439 12.711L7.48438 7.00059C7.48438 6.30991 8.04428 5.75001 8.73496 5.75001C9.42563 5.75001 9.98553 6.30991 9.98553 7.00058L9.98553 9.88892C9.98553 10.1376 10.2403 10.3065 10.4774 10.2315V10.2315C10.6276 10.1841 10.736 10.0474 10.736 9.89001L10.736 5.25041C10.736 4.55974 11.2959 3.99984 11.9866 3.99984C12.6773 3.99984 13.2372 4.55974 13.2372 5.25041L13.2372 9.89018C13.2372 10.0476 13.3456 10.1842 13.4957 10.2316V10.2316C13.7327 10.3065 13.9874 10.1377 13.9874 9.88909L13.9874 7.00059C13.9874 6.30991 14.5473 5.75001 15.2379 5.75001C15.9286 5.75001 16.4885 6.30991 16.4885 7.00058L16.4885 12.7086C16.4885 12.7805 16.5049 12.8506 16.5349 12.9159V12.9159Z' fill='%23FD4848'/%3e %3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z' fill='%23D5FF5C'/%3e %3cpath d='M13.8543 15.5C13.8543 16.5311 13.018 17.3671 11.9863 17.3671C10.9545 17.3671 10.1183 16.5311 10.1183 15.5C10.1183 14.4689 10.9545 13.6329 11.9863 13.6329C13.018 13.6329 13.8543 14.4689 13.8543 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e %3cpath d='M13.1041 15.5C13.1041 16.1169 12.6037 16.6171 11.9864 16.6171C11.3691 16.6171 10.8688 16.1169 10.8688 15.5C10.8688 14.8831 11.3691 14.3829 11.9864 14.3829C12.6037 14.3829 13.1041 14.8831 13.1041 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e %3cpath d='M14.605 15.5C14.605 16.9453 13.4327 18.1171 11.9866 18.1171C10.5405 18.1171 9.36827 16.9453 9.36827 15.5C9.36827 14.0547 10.5405 12.8829 11.9866 12.8829C13.4327 12.8829 14.605 14.0547 14.605 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e %3cpath d='M15.3552 15.5C15.3552 17.3595 13.847 18.8671 11.9865 18.8671C10.1259 18.8671 8.61778 17.3595 8.61778 15.5C8.61778 13.6405 10.1259 12.1329 11.9865 12.1329C13.847 12.1329 15.3552 13.6405 15.3552 15.5Z' stroke='%23FD4848' stroke-width='0.265831'/%3e %3cpath d='M12.3534 15.5C12.3534 15.7027 12.1891 15.8671 11.9863 15.8671C11.7836 15.8671 11.6192 15.7027 11.6192 15.5C11.6192 15.2973 11.7836 15.1329 11.9863 15.1329C12.1891 15.1329 12.3534 15.2973 12.3534 15.5Z' fill='%23162BEB' stroke='%23FD4848' stroke-width='0.265831'/%3e %3cellipse cx='11.9863' cy='15.5' rx='0.5' ry='0.5' fill='%23FD4848'/%3e %3cmask id='path-10-inside-1_4684_17034' fill='white'%3e %3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z'/%3e %3c/mask%3e %3cpath d='M15.9885 15.5C15.9885 15.5 14.1969 18 11.9867 18C9.77655 18 7.98486 15.5 7.98486 15.5C7.98486 15.5 9.77655 13 11.9867 13C14.1969 13 15.9885 15.5 15.9885 15.5Z' stroke='%23D5FF5C' stroke-width='0.531663' mask='url(%23path-10-inside-1_4684_17034)'/%3e %3c/svg%3e"

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Link":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Link']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Link'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Tooltip":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['common/components/Tooltip']" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Tooltip'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/utils/ItemList":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/ItemList']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/ItemList'];

/***/ }),

/***/ "flarum/common/utils/classList":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/utils/classList']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/classList'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/HeaderSecondary":
/*!*************************************************************************!*\
  !*** external "flarum.core.compat['forum/components/HeaderSecondary']" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/HeaderSecondary'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// TODO(Babel 8): Remove this file.
var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();

module.exports = runtime; // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@polkadot/util/string/toHex.js":
/*!*****************************************************!*\
  !*** ./node_modules/@polkadot/util/string/toHex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringToHex": () => (/* binding */ stringToHex)
/* harmony export */ });
/* harmony import */ var _u8a_toHex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../u8a/toHex.js */ "./node_modules/@polkadot/util/u8a/toHex.js");
/* harmony import */ var _toU8a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toU8a.js */ "./node_modules/@polkadot/util/string/toU8a.js");
// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0


/**
 * @name stringToHex
 * @summary Creates a hex string from a utf-8 string
 * @description
 * String input values return the actual encoded hex value.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToHex } from '@polkadot/util';
 *
 * stringToU8a('hello'); // 0x68656c6c6f
 * ```
 */

function stringToHex(value) {
  return (0,_u8a_toHex_js__WEBPACK_IMPORTED_MODULE_0__.u8aToHex)((0,_toU8a_js__WEBPACK_IMPORTED_MODULE_1__.stringToU8a)(value));
}

/***/ }),

/***/ "./node_modules/@polkadot/util/string/toU8a.js":
/*!*****************************************************!*\
  !*** ./node_modules/@polkadot/util/string/toU8a.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stringToU8a": () => (/* binding */ stringToU8a)
/* harmony export */ });
/* harmony import */ var _polkadot_x_textencoder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @polkadot/x-textencoder */ "./node_modules/@polkadot/x-textencoder/browser.js");
// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

var encoder = new _polkadot_x_textencoder__WEBPACK_IMPORTED_MODULE_0__.TextEncoder();
/**
 * @name stringToU8a
 * @summary Creates a Uint8Array object from a utf-8 string.
 * @description
 * String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringToU8a } from '@polkadot/util';
 *
 * stringToU8a('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
 * ```
 */

function stringToU8a(value) {
  return value ? encoder.encode(value.toString()) : new Uint8Array();
}

/***/ }),

/***/ "./node_modules/@polkadot/util/u8a/toHex.js":
/*!**************************************************!*\
  !*** ./node_modules/@polkadot/util/u8a/toHex.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u8aToHex": () => (/* binding */ u8aToHex)
/* harmony export */ });
// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0
var U8 = new Array(256);
var U16 = new Array(256 * 256);

for (var n = 0; n < 256; n++) {
  U8[n] = n.toString(16).padStart(2, '0');
}

for (var i = 0; i < 256; i++) {
  var s = i << 8;

  for (var j = 0; j < 256; j++) {
    U16[s | j] = U8[i] + U8[j];
  }
}
/** @internal */


function hex(value, result) {
  var mod = value.length % 2 | 0;
  var length = value.length - mod | 0;

  for (var _i = 0; _i < length; _i += 2) {
    result += U16[value[_i] << 8 | value[_i + 1]];
  }

  if (mod) {
    result += U8[value[length] | 0];
  }

  return result;
}
/**
 * @name u8aToHex
 * @summary Creates a hex string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToHex } from '@polkadot/util';
 *
 * u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 * ```
 */


function u8aToHex(value, bitLength, isPrefixed) {
  if (bitLength === void 0) {
    bitLength = -1;
  }

  if (isPrefixed === void 0) {
    isPrefixed = true;
  }

  // this is not 100% correct sinmce we support isPrefixed = false....
  var empty = isPrefixed ? '0x' : '';

  if (!value || !value.length) {
    return empty;
  } else if (bitLength > 0) {
    var length = Math.ceil(bitLength / 8);

    if (value.length > length) {
      return hex(value.subarray(0, length / 2), empty) + "\u2026" + hex(value.subarray(value.length - length / 2), '');
    }
  }

  return hex(value, empty);
}

/***/ }),

/***/ "./node_modules/@polkadot/x-global/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@polkadot/x-global/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "exposeGlobal": () => (/* binding */ exposeGlobal),
/* harmony export */   "extractGlobal": () => (/* binding */ extractGlobal),
/* harmony export */   "packageInfo": () => (/* reexport safe */ _packageInfo_js__WEBPACK_IMPORTED_MODULE_0__.packageInfo),
/* harmony export */   "xglobal": () => (/* binding */ xglobal)
/* harmony export */ });
/* harmony import */ var _packageInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./packageInfo.js */ "./node_modules/@polkadot/x-global/packageInfo.js");
// Copyright 2017-2022 @polkadot/x-global authors & contributors
// SPDX-License-Identifier: Apache-2.0
 // Ensure that we are able to run this without any @types/node definitions
// and without having lib: ['dom'] in our TypeScript configuration
// (may not be available in all environments, e.g. Deno springs to mind)

function evaluateThis(fn) {
  return fn('return this');
}

var xglobal = typeof globalThis !== 'undefined' ? globalThis : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : evaluateThis(Function);
function extractGlobal(name, fallback) {
  // Not quite sure why this is here - snuck in with TS 4.7.2 with no real idea
  // (as of now) as to why this looks like an "any" when we do cast it to a T
  //
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return typeof xglobal[name] === 'undefined' ? fallback : xglobal[name];
}
function exposeGlobal(name, fallback) {
  if (typeof xglobal[name] === 'undefined') {
    xglobal[name] = fallback;
  }
}

/***/ }),

/***/ "./node_modules/@polkadot/x-global/packageInfo.js":
/*!********************************************************!*\
  !*** ./node_modules/@polkadot/x-global/packageInfo.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "packageInfo": () => (/* binding */ packageInfo)
/* harmony export */ });
// Copyright 2017-2022 @polkadot/x-global authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Do not edit, auto-generated by @polkadot/dev
var packageInfo = {
  name: '@polkadot/x-global',
  path:  true ? new URL("file:///home/samilyas/www/flarum/packages/flarum-ext-web3/js/node_modules/@polkadot/x-global/packageInfo.js").pathname.substring(0, new URL("file:///home/samilyas/www/flarum/packages/flarum-ext-web3/js/node_modules/@polkadot/x-global/packageInfo.js").pathname.lastIndexOf('/') + 1) : 0,
  type: 'esm',
  version: '10.1.1'
};

/***/ }),

/***/ "./node_modules/@polkadot/x-textencoder/browser.js":
/*!*********************************************************!*\
  !*** ./node_modules/@polkadot/x-textencoder/browser.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextEncoder": () => (/* binding */ TextEncoder),
/* harmony export */   "packageInfo": () => (/* reexport safe */ _packageInfo_js__WEBPACK_IMPORTED_MODULE_0__.packageInfo)
/* harmony export */ });
/* harmony import */ var _polkadot_x_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @polkadot/x-global */ "./node_modules/@polkadot/x-global/index.js");
/* harmony import */ var _fallback_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fallback.js */ "./node_modules/@polkadot/x-textencoder/fallback.js");
/* harmony import */ var _packageInfo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./packageInfo.js */ "./node_modules/@polkadot/x-textencoder/packageInfo.js");
// Copyright 2017-2022 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0



var TextEncoder = (0,_polkadot_x_global__WEBPACK_IMPORTED_MODULE_1__.extractGlobal)('TextEncoder', _fallback_js__WEBPACK_IMPORTED_MODULE_2__.TextEncoder);

/***/ }),

/***/ "./node_modules/@polkadot/x-textencoder/fallback.js":
/*!**********************************************************!*\
  !*** ./node_modules/@polkadot/x-textencoder/fallback.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextEncoder": () => (/* binding */ TextEncoder)
/* harmony export */ });
// Copyright 2017-2022 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0
// This is very limited, only handling Ascii values
var TextEncoder = /*#__PURE__*/function () {
  function TextEncoder() {}

  var _proto = TextEncoder.prototype;

  _proto.encode = function encode(value) {
    var u8a = new Uint8Array(value.length);

    for (var i = 0; i < value.length; i++) {
      u8a[i] = value.charCodeAt(i);
    }

    return u8a;
  };

  return TextEncoder;
}();

/***/ }),

/***/ "./node_modules/@polkadot/x-textencoder/packageInfo.js":
/*!*************************************************************!*\
  !*** ./node_modules/@polkadot/x-textencoder/packageInfo.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "packageInfo": () => (/* binding */ packageInfo)
/* harmony export */ });
// Copyright 2017-2022 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0
// Do not edit, auto-generated by @polkadot/dev
var packageInfo = {
  name: '@polkadot/x-textencoder',
  path:  true ? new URL("file:///home/samilyas/www/flarum/packages/flarum-ext-web3/js/node_modules/@polkadot/x-textencoder/packageInfo.js").pathname.substring(0, new URL("file:///home/samilyas/www/flarum/packages/flarum-ext-web3/js/node_modules/@polkadot/x-textencoder/packageInfo.js").pathname.lastIndexOf('/') + 1) : 0,
  type: 'esm',
  version: '10.1.1'
};

/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/BaseDotSamaWallet.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/BaseDotSamaWallet.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseDotSamaWallet": () => (/* binding */ BaseDotSamaWallet)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");




// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
// This file is get idea from https://github.com/TalismanSociety/talisman-connect/blob/master/libs/wallets/src/lib/base-dotsama-wallet/index.ts
var DAPP_NAME = 'SubWallet Connect';
var BaseDotSamaWallet = /*#__PURE__*/function () {
  function BaseDotSamaWallet(_ref) {
    var _this = this;

    var extensionName = _ref.extensionName,
        installUrl = _ref.installUrl,
        logo = _ref.logo,
        title = _ref.title;
    this.enable = /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.mark(function _callee() {
      var injectedExtension, rawExtension, extension;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.installed) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              _context.prev = 2;
              injectedExtension = _this.rawExtension;
              _context.next = 6;
              return injectedExtension === null || injectedExtension === void 0 ? void 0 : injectedExtension.enable(DAPP_NAME);

            case 6:
              rawExtension = _context.sent;

              if (rawExtension) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return");

            case 9:
              extension = (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, rawExtension, {
                // Manually add `InjectedExtensionInfo` so as to have a consistent response.
                name: _this.extensionName,
                version: injectedExtension.version
              });
              _this._extension = extension;
              _this._signer = extension === null || extension === void 0 ? void 0 : extension.signer;
              _this._metadata = extension === null || extension === void 0 ? void 0 : extension.metadata;
              _this._provider = extension === null || extension === void 0 ? void 0 : extension.provider;
              _context.next = 19;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](2);
              console.error(_context.t0);

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 16]]);
    }));

    this.generateWalletAccount = function (account) {
      var _this$_extension, _this$_extension2;

      return (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, account, {
        source: (_this$_extension = _this._extension) === null || _this$_extension === void 0 ? void 0 : _this$_extension.name,
        // Added extra fields here for convenience
        wallet: _this,
        signer: (_this$_extension2 = _this._extension) === null || _this$_extension2 === void 0 ? void 0 : _this$_extension2.signer
      });
    };

    this.subscribeAccounts = /*#__PURE__*/function () {
      var _ref3 = (0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.mark(function _callee2(callback) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (_this._extension) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _this === null || _this === void 0 ? void 0 : _this.enable();

              case 3:
                if (_this._extension) {
                  _context2.next = 6;
                  break;
                }

                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                callback(undefined);
                return _context2.abrupt("return", null);

              case 6:
                return _context2.abrupt("return", _this._extension.accounts.subscribe(function (accounts) {
                  var accountsWithWallet = accounts.map(_this.generateWalletAccount); // eslint-disable-next-line @typescript-eslint/no-floating-promises

                  callback(accountsWithWallet);
                }));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    this.getAccounts = /*#__PURE__*/(0,_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.mark(function _callee3() {
      var accounts;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (_this._extension) {
                _context3.next = 3;
                break;
              }

              _context3.next = 3;
              return _this === null || _this === void 0 ? void 0 : _this.enable();

            case 3:
              if (_this._extension) {
                _context3.next = 5;
                break;
              }

              return _context3.abrupt("return", null);

            case 5:
              _context3.next = 7;
              return _this._extension.accounts.get();

            case 7:
              accounts = _context3.sent;
              return _context3.abrupt("return", accounts.map(_this.generateWalletAccount));

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    this.extensionName = extensionName;
    this.title = title;
    this.installUrl = installUrl; // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    this.logo = logo;
    return this;
  } // API docs: https://polkadot.js.org/docs/extension/


  (0,_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(BaseDotSamaWallet, [{
    key: "extension",
    get: function get() {
      return this._extension;
    } // API docs: https://polkadot.js.org/docs/extension/

  }, {
    key: "signer",
    get: function get() {
      return this._signer;
    }
  }, {
    key: "metadata",
    get: function get() {
      return this._metadata;
    }
  }, {
    key: "provider",
    get: function get() {
      return this._provider;
    }
  }, {
    key: "installed",
    get: function get() {
      var _injectedWindow$injec;

      var injectedWindow = window;
      var injectedExtension = injectedWindow === null || injectedWindow === void 0 ? void 0 : (_injectedWindow$injec = injectedWindow.injectedWeb3) === null || _injectedWindow$injec === void 0 ? void 0 : _injectedWindow$injec[this.extensionName];
      return !!injectedExtension;
    }
  }, {
    key: "rawExtension",
    get: function get() {
      var _injectedWindow$injec2;

      var injectedWindow = window;
      return injectedWindow === null || injectedWindow === void 0 ? void 0 : (_injectedWindow$injec2 = injectedWindow.injectedWeb3) === null || _injectedWindow$injec2 === void 0 ? void 0 : _injectedWindow$injec2[this.extensionName];
    }
  }]);

  return BaseDotSamaWallet;
}();

/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/index.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/index.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PREDEFINED_WALLETS": () => (/* binding */ PREDEFINED_WALLETS)
/* harmony export */ });
/* harmony import */ var _PolkadotLogo_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolkadotLogo.svg */ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/PolkadotLogo.svg");
/* harmony import */ var _SubWalletLogo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SubWalletLogo.svg */ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/SubWalletLogo.svg");
/* harmony import */ var _TalismanLogo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TalismanLogo.svg */ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/TalismanLogo.svg");
// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
// @ts-ignore
 // @ts-ignore

 // @ts-ignore


var PREDEFINED_WALLETS = [{
  extensionName: 'polkadot-js',
  title: 'Polkadot{.js}',
  installUrl: 'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd',
  logo: {
    src: _PolkadotLogo_svg__WEBPACK_IMPORTED_MODULE_0__,
    alt: 'Polkadot{.js} Extension'
  }
}, {
  extensionName: 'subwallet-js',
  title: 'SubWallet',
  installUrl: 'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
  logo: {
    src: _SubWalletLogo_svg__WEBPACK_IMPORTED_MODULE_1__,
    alt: 'SubWallet'
  }
}, {
  extensionName: 'talisman',
  title: 'Talisman',
  installUrl: 'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
  logo: {
    src: _TalismanLogo_svg__WEBPACK_IMPORTED_MODULE_2__,
    alt: 'Talisman'
  }
}];

/***/ }),

/***/ "./node_modules/@subwallet/wallet-connect/dotsama/wallets.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@subwallet/wallet-connect/dotsama/wallets.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addWallet": () => (/* binding */ addWallet),
/* harmony export */   "getWalletBySource": () => (/* binding */ getWalletBySource),
/* harmony export */   "getWallets": () => (/* binding */ getWallets),
/* harmony export */   "isWalletInstalled": () => (/* binding */ isWalletInstalled)
/* harmony export */ });
/* harmony import */ var _subwallet_wallet_connect_dotsama_BaseDotSamaWallet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @subwallet/wallet-connect/dotsama/BaseDotSamaWallet */ "./node_modules/@subwallet/wallet-connect/dotsama/BaseDotSamaWallet.js");
/* harmony import */ var _subwallet_wallet_connect_dotsama_predefinedWallet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @subwallet/wallet-connect/dotsama/predefinedWallet */ "./node_modules/@subwallet/wallet-connect/dotsama/predefinedWallet/index.js");
// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0
// This file is get idea from https://github.com/TalismanSociety/talisman-connect/blob/master/libs/wallets/src/lib/wallets.ts


var walletList = []; // Add more wallet, please sure you call this method before any getWallets or getWalletBySource

function addWallet(data) {
  var wallet = new _subwallet_wallet_connect_dotsama_BaseDotSamaWallet__WEBPACK_IMPORTED_MODULE_0__.BaseDotSamaWallet(data);
  walletList.push(wallet);
} // Implement predefined wallets

_subwallet_wallet_connect_dotsama_predefinedWallet__WEBPACK_IMPORTED_MODULE_1__.PREDEFINED_WALLETS.forEach(function (walletInfo) {
  addWallet(walletInfo);
}); // Get all wallet

function getWallets() {
  return walletList;
}
function getWalletBySource(source) {
  return getWallets().find(function (wallet) {
    return wallet.extensionName === source;
  });
}
function isWalletInstalled(source) {
  var wallet = getWalletBySource(source);
  return wallet === null || wallet === void 0 ? void 0 : wallet.installed;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.tsx");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map