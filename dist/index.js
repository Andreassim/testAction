/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 241:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(37));
const utils_1 = __nccwpck_require__(278);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 186:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(241);
const file_command_1 = __nccwpck_require__(717);
const utils_1 = __nccwpck_require__(278);
const os = __importStar(__nccwpck_require__(37));
const path = __importStar(__nccwpck_require__(17));
const oidc_utils_1 = __nccwpck_require__(41);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('ENV', file_command_1.prepareKeyValueMessage(name, val));
    }
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueFileCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('OUTPUT', file_command_1.prepareKeyValueMessage(name, value));
    }
    process.stdout.write(os.EOL);
    command_1.issueCommand('set-output', { name }, utils_1.toCommandValue(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    command_1.issueCommand('error', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    command_1.issueCommand('warning', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    command_1.issueCommand('notice', utils_1.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return file_command_1.issueFileCommand('STATE', file_command_1.prepareKeyValueMessage(name, value));
    }
    command_1.issueCommand('save-state', { name }, utils_1.toCommandValue(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(327);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(327);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(981);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__nccwpck_require__(147));
const os = __importStar(__nccwpck_require__(37));
const uuid_1 = __nccwpck_require__(840);
const utils_1 = __nccwpck_require__(278);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${uuid_1.v4()}`;
    const convertedValue = utils_1.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 41:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(255);
const auth_1 = __nccwpck_require__(526);
const core_1 = __nccwpck_require__(186);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                core_1.debug(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                core_1.setSecret(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 981:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(17));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 327:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(37);
const fs_1 = __nccwpck_require__(147);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 278:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 526:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 255:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(685));
const https = __importStar(__nccwpck_require__(687));
const pm = __importStar(__nccwpck_require__(835));
const tunnel = __importStar(__nccwpck_require__(294));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
    readBodyBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                const chunks = [];
                this.message.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                this.message.on('end', () => {
                    resolve(Buffer.concat(chunks));
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 835:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        try {
            return new URL(proxyVar);
        }
        catch (_a) {
            if (!proxyVar.startsWith('http://') && !proxyVar.startsWith('https://'))
                return new URL(`http://${proxyVar}`);
        }
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const reqHost = reqUrl.hostname;
    if (isLoopbackAddress(reqHost)) {
        return true;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperNoProxyItem === '*' ||
            upperReqHosts.some(x => x === upperNoProxyItem ||
                x.endsWith(`.${upperNoProxyItem}`) ||
                (upperNoProxyItem.startsWith('.') &&
                    x.endsWith(`${upperNoProxyItem}`)))) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
function isLoopbackAddress(host) {
    const hostLower = host.toLowerCase();
    return (hostLower === 'localhost' ||
        hostLower.startsWith('127.') ||
        hostLower.startsWith('[::1]') ||
        hostLower.startsWith('[0:0:0:0:0:0:0:1]'));
}
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 294:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(219);


/***/ }),

/***/ 219:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(808);
var tls = __nccwpck_require__(404);
var http = __nccwpck_require__(685);
var https = __nccwpck_require__(687);
var events = __nccwpck_require__(361);
var assert = __nccwpck_require__(491);
var util = __nccwpck_require__(837);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 840:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "v1", ({
  enumerable: true,
  get: function () {
    return _v.default;
  }
}));
Object.defineProperty(exports, "v3", ({
  enumerable: true,
  get: function () {
    return _v2.default;
  }
}));
Object.defineProperty(exports, "v4", ({
  enumerable: true,
  get: function () {
    return _v3.default;
  }
}));
Object.defineProperty(exports, "v5", ({
  enumerable: true,
  get: function () {
    return _v4.default;
  }
}));
Object.defineProperty(exports, "NIL", ({
  enumerable: true,
  get: function () {
    return _nil.default;
  }
}));
Object.defineProperty(exports, "version", ({
  enumerable: true,
  get: function () {
    return _version.default;
  }
}));
Object.defineProperty(exports, "validate", ({
  enumerable: true,
  get: function () {
    return _validate.default;
  }
}));
Object.defineProperty(exports, "stringify", ({
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
}));
Object.defineProperty(exports, "parse", ({
  enumerable: true,
  get: function () {
    return _parse.default;
  }
}));

var _v = _interopRequireDefault(__nccwpck_require__(628));

var _v2 = _interopRequireDefault(__nccwpck_require__(409));

var _v3 = _interopRequireDefault(__nccwpck_require__(122));

var _v4 = _interopRequireDefault(__nccwpck_require__(120));

var _nil = _interopRequireDefault(__nccwpck_require__(332));

var _version = _interopRequireDefault(__nccwpck_require__(595));

var _validate = _interopRequireDefault(__nccwpck_require__(900));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ 569:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function md5(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('md5').update(bytes).digest();
}

var _default = md5;
exports["default"] = _default;

/***/ }),

/***/ 332:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports["default"] = _default;

/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports["default"] = _default;

/***/ }),

/***/ 814:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports["default"] = _default;

/***/ }),

/***/ 807:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = rng;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate

let poolPtr = rnds8Pool.length;

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    _crypto.default.randomFillSync(rnds8Pool);

    poolPtr = 0;
  }

  return rnds8Pool.slice(poolPtr, poolPtr += 16);
}

/***/ }),

/***/ 274:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _crypto = _interopRequireDefault(__nccwpck_require__(113));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sha1(bytes) {
  if (Array.isArray(bytes)) {
    bytes = Buffer.from(bytes);
  } else if (typeof bytes === 'string') {
    bytes = Buffer.from(bytes, 'utf8');
  }

  return _crypto.default.createHash('sha1').update(bytes).digest();
}

var _default = sha1;
exports["default"] = _default;

/***/ }),

/***/ 950:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports["default"] = _default;

/***/ }),

/***/ 628:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports["default"] = _default;

/***/ }),

/***/ 409:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _md = _interopRequireDefault(__nccwpck_require__(569));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports["default"] = _default;

/***/ }),

/***/ 998:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

var _parse = _interopRequireDefault(__nccwpck_require__(746));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}

/***/ }),

/***/ 122:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _rng = _interopRequireDefault(__nccwpck_require__(807));

var _stringify = _interopRequireDefault(__nccwpck_require__(950));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports["default"] = _default;

/***/ }),

/***/ 120:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _v = _interopRequireDefault(__nccwpck_require__(998));

var _sha = _interopRequireDefault(__nccwpck_require__(274));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports["default"] = _default;

/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _regex = _interopRequireDefault(__nccwpck_require__(814));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports["default"] = _default;

/***/ }),

/***/ 595:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;

var _validate = _interopRequireDefault(__nccwpck_require__(900));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports["default"] = _default;

/***/ }),

/***/ 713:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const core = __nccwpck_require__(186)
const LokaliseApi = __nccwpck_require__(838)

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const API_KEY = core.getInput('API_KEY', { required: true })
    const PROJECT_KEY = core.getInput('PROJECT_KEY', { required: true })

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    core.debug(`API_KEY = ${API_KEY}`)
    core.debug(`PROJECT_KEY = ${PROJECT_KEY}`)
    if (!(API_KEY && PROJECT_KEY)) {
      throw new Error('Missing API_KEY or PROJECT_KEY')
    }

    console.log('Setting up lokaliseAPI')
    const lokaliseApi = new LokaliseApi({ apiKey: API_KEY })

    console.log('Download Translations')
    const downloads = await lokaliseApi.files().download(PROJECT_KEY, {
      format: 'xlf',
      original_filenames: false,
      bundle_structure: 'frontend/src/i18n/messages.%LANG_ISO%.%FORMAT%',
      triggers: ['github']
    })

    // Set outputs for other workflow steps to use
    core.setOutput('result', 'success')
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}


/***/ }),

/***/ 491:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 685:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 687:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 808:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 37:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 17:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 404:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 837:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 838:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  "LokaliseApi": () => (/* reexport */ LokaliseApi),
  "LokaliseApiOAuth": () => (/* reexport */ LokaliseApiOAuth),
  "LokaliseApiOta": () => (/* reexport */ LokaliseApiOta),
  "LokaliseAuth": () => (/* reexport */ LokaliseAuth),
  "LokaliseOtaBundles": () => (/* reexport */ LokaliseOtaBundles)
});

;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/base_client.js
class BaseClient {
    clientData = {
        token: "",
        tokenType: "",
        authHeader: "x-api-token",
        enableCompression: false,
    };
    /*
     * Instantiate LokaliseApi to call API methods
     * @param params  object, mandatory
     * @returns       LokaliseApi object to work with.
     */
    constructor(params) {
        const apiKey = params["apiKey"];
        if (apiKey === null || apiKey === undefined || apiKey.length === 0) {
            throw new Error("Error: Instantiation failed: Please pass an API key");
        }
        this.clientData.token = apiKey;
        const compression = params["enableCompression"];
        if (compression !== null && compression !== undefined) {
            this.clientData.enableCompression = compression;
        }
        this.clientData.host = params.host;
    }
}
//# sourceMappingURL=base_client.js.map
;// CONCATENATED MODULE: external "fs/promises"
const promises_namespaceObject = require("fs/promises");
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/pkg.js

class LokalisePkg {
    static pkgPath() {
        return "../../package.json";
    }
    static async getVersion() {
        let pkg;
        try {
            pkg = JSON.parse((await (0,promises_namespaceObject.readFile)(new URL(LokalisePkg.pkgPath(), import.meta.url))).toString());
        }
        catch (_e) {
            pkg = null;
        }
        return pkg ? pkg.version : "unknown";
    }
}
//# sourceMappingURL=pkg.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/http_client/base.js

class ApiRequest {
    promise;
    params = {};
    urlRoot = "https://api.lokalise.com/api2/";
    constructor(uri, method, body, params, clientData) {
        // Since we modify params, we need to make a copy of it so we don't modify the original
        this.params = { ...params };
        this.promise = this.createPromise(uri, method, body, clientData);
        return this;
    }
    async createPromise(uri, method, body, clientData) {
        uri = `/${clientData.version}/${uri}`;
        const url = this.composeURI(uri);
        const prefixUrl = clientData.host ?? this.urlRoot;
        const options = {
            method: method,
        };
        const headers = new Headers({
            Accept: "application/json",
            "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
        });
        headers.append(clientData.authHeader, `${clientData.tokenType} ${clientData.token}`);
        if (clientData.enableCompression) {
            headers.append("Accept-Encoding", "gzip,deflate");
        }
        if (method !== "GET" && body) {
            options.body = JSON.stringify(body);
            headers.append("Content-type", "application/json");
        }
        options.headers = headers;
        const target = new URL(url, prefixUrl);
        target.search = new URLSearchParams(this.params).toString();
        try {
            const response = await fetch(target, options);
            let responseJSON;
            if (response.status === 204) {
                responseJSON = null;
            }
            else {
                responseJSON = await response.json();
            }
            if (response.ok) {
                return Promise.resolve({
                    json: responseJSON,
                    headers: response.headers,
                });
            }
            return Promise.reject(this.getErrorFromResp(responseJSON));
        }
        catch (err) {
            return Promise.reject({ message: err.message });
        }
    }
    getErrorFromResp(respJson) {
        if (typeof respJson["error"] === "object") {
            return respJson["error"];
        }
        else {
            return respJson;
        }
    }
    composeURI(rawUri) {
        const regexp = /{(!{0,1}):(\w*)}/g;
        const uri = rawUri.replace(regexp, this.mapUriParams());
        return uri.endsWith("/") ? uri.slice(0, -1) : uri;
    }
    mapUriParams() {
        return (_entity, isMandaratory, paramName) => {
            if (this.params[paramName] != null) {
                const t_param = this.params[paramName];
                // We delete the param so we don't send it as a query param as well.
                delete this.params[paramName];
                return t_param;
            }
            else {
                if (isMandaratory === "!") {
                    throw new Error("Missing required param: " + paramName);
                }
                else {
                    return "";
                }
            }
        };
    }
}
//# sourceMappingURL=base.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/paginated_result.js
class PaginatedResult {
    totalResults;
    totalPages;
    resultsPerPage;
    currentPage;
    items;
    constructor(items, headers) {
        this.totalResults = this.safeParseInt(headers.get("x-pagination-total-count"));
        this.totalPages = this.safeParseInt(headers.get("x-pagination-page-count"));
        this.resultsPerPage = this.safeParseInt(headers.get("x-pagination-limit"));
        this.currentPage = this.safeParseInt(headers.get("x-pagination-page"));
        this.items = items;
        return this;
    }
    hasNextPage() {
        return this.currentPage > 0 && this.currentPage < this.totalPages;
    }
    hasPrevPage() {
        return this.currentPage > 1;
    }
    isLastPage() {
        return !this.hasNextPage();
    }
    isFirstPage() {
        return !this.hasPrevPage();
    }
    nextPage() {
        if (this.isLastPage()) {
            return this.currentPage;
        }
        else {
            return this.currentPage + 1;
        }
    }
    prevPage() {
        if (this.isFirstPage()) {
            return this.currentPage;
        }
        else {
            return this.currentPage - 1;
        }
    }
    safeParseInt(str) {
        if (!str)
            return 0;
        return parseInt(str, 10);
    }
}
//# sourceMappingURL=paginated_result.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/base_collection.js


class BaseCollection {
    clientData;
    static rootElementName;
    static rootElementNameSingular;
    static endpoint;
    static prefixURI;
    static elementClass;
    // Secondaries are used when an instance of a different class has to be created
    // For example, uploading a File may return a QueuedProcess
    static secondaryElementNameSingular;
    static secondaryElementClass;
    constructor(clientData) {
        this.clientData = clientData;
    }
    doList(req_params) {
        const params = {
            ...req_params,
        };
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null);
    }
    doGet(id, req_params = {}) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
    doDelete(id, req_params = {}) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("DELETE", params, this.returnBareJSON, this.handleReject, null);
    }
    doCreate(body, req_params = {}, resolveFn = this.populateObjectFromJson) {
        const params = {
            ...req_params,
        };
        return this.createPromise("POST", params, resolveFn, this.handleReject, body);
    }
    doUpdate(id, body, req_params, resolveFn = this.populateObjectFromJsonRoot, method = "PUT") {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise(method, params, resolveFn, this.handleReject, body);
    }
    populateObjectFromJsonRoot(json, headers) {
        const childClass = this.constructor;
        if (childClass.rootElementNameSingular) {
            json = Object(json)[childClass.rootElementNameSingular];
        }
        return this.populateObjectFromJson(json, headers);
    }
    populateSecondaryObjectFromJsonRoot(json, headers) {
        const childClass = this.constructor;
        json = Object(json)[childClass.secondaryElementNameSingular];
        return this.populateObjectFromJson(json, headers, true);
    }
    populateObjectFromJson(json, _headers, secondary = false) {
        const childClass = this.constructor;
        if (secondary) {
            return new childClass.secondaryElementClass(json);
        }
        else {
            return new childClass.elementClass(json);
        }
    }
    populateArrayFromJsonBulk(json, headers) {
        const childClass = this.constructor;
        const arr = [];
        const jsonArray = json[childClass.rootElementName];
        for (const obj of jsonArray) {
            arr.push(this.populateObjectFromJson(obj, headers));
        }
        const result = {
            errors: json["errors"],
            items: arr,
        };
        return result;
    }
    populateArrayFromJson(json, headers) {
        const childClass = this.constructor;
        const arr = [];
        const jsonArray = json[childClass.rootElementName];
        for (const obj of jsonArray) {
            arr.push(this.populateObjectFromJson(obj, headers));
        }
        if (headers.get("x-pagination-total-count") &&
            headers.get("x-pagination-page")) {
            const result = new PaginatedResult(arr, headers);
            return result;
        }
        else {
            return arr;
        }
    }
    populateApiErrorFromJson(json) {
        return json;
    }
    returnBareJSON(json) {
        return json;
    }
    handleReject(data) {
        return this.populateApiErrorFromJson(data);
    }
    async createPromise(method, params, resolveFn, rejectFn, body, uri = null) {
        const request = this.prepareRequest(method, body, params, uri);
        try {
            const data = await request.promise;
            let result = null;
            if (resolveFn !== null) {
                result = resolveFn.call(this, data["json"], data["headers"]);
            }
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(rejectFn.call(this, err));
        }
    }
    prepareRequest(method, body, params, uri) {
        return new ApiRequest(this.getUri(uri), method, body, params, this.clientData);
    }
    getUri(uri) {
        const childClass = this.constructor;
        if (!uri) {
            uri = childClass.prefixURI;
        }
        return uri;
    }
    objToArray(raw_body) {
        if (!Array.isArray(raw_body)) {
            return Array(raw_body);
        }
        else {
            return raw_body;
        }
    }
}
//# sourceMappingURL=base_collection.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/base_model.js
class BaseModel {
    constructor(params) {
        for (const key of Object.keys(params)) {
            this[key] = params[key];
        }
    }
}
//# sourceMappingURL=base_model.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/branch.js

class Branch extends BaseModel {
}
//# sourceMappingURL=branch.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/branches.js


class Branches extends BaseCollection {
    static rootElementName = "branches";
    static rootElementNameSingular = "branch";
    static prefixURI = "projects/{!:project_id}/branches/{:id}";
    static elementClass = Branch;
    list(request_params) {
        return this.doList(request_params);
    }
    create(branch_params, request_params) {
        return this.doCreate(branch_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(branch_id, request_params) {
        return this.doGet(branch_id, request_params);
    }
    update(branch_id, branch_params, request_params) {
        return this.doUpdate(branch_id, branch_params, request_params);
    }
    delete(branch_id, request_params) {
        return this.doDelete(branch_id, request_params);
    }
    merge(branch_id, request_params, body = {}) {
        const params = {
            ...request_params,
            ...{ id: branch_id },
        };
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, body, "projects/{!:project_id}/branches/{:id}/merge");
    }
}
//# sourceMappingURL=branches.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/comment.js

class Comment extends BaseModel {
}
//# sourceMappingURL=comment.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/comments.js


class Comments extends BaseCollection {
    static rootElementName = "comments";
    static rootElementNameSingular = "comment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/comments/{:id}";
    static elementClass = Comment;
    list(request_params) {
        return this.doList(request_params);
    }
    create(comment_params, request_params) {
        const body = { comments: this.objToArray(comment_params) };
        return this.doCreate(body, request_params, this.populateArrayFromJson);
    }
    get(comment_id, request_params) {
        return this.doGet(comment_id, request_params);
    }
    delete(comment_id, request_params) {
        return this.doDelete(comment_id, request_params);
    }
    list_project_comments(params) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "projects/{!:project_id}/comments");
    }
}
//# sourceMappingURL=comments.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/contributor.js

class Contributor extends BaseModel {
}
//# sourceMappingURL=contributor.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/contributors.js


class Contributors extends BaseCollection {
    static rootElementName = "contributors";
    static rootElementNameSingular = "contributor";
    static prefixURI = "projects/{!:project_id}/contributors/{:id}";
    static elementClass = Contributor;
    list(request_params) {
        return this.doList(request_params);
    }
    create(contributor_params, request_params) {
        const body = { contributors: this.objToArray(contributor_params) };
        return this.doCreate(body, request_params, this.populateArrayFromJson);
    }
    get(contributor_id, request_params) {
        return this.doGet(contributor_id, request_params);
    }
    update(contributor_id, contributor_params, request_params) {
        return this.doUpdate(contributor_id, contributor_params, request_params);
    }
    delete(contributor_id, request_params) {
        return this.doDelete(contributor_id, request_params);
    }
}
//# sourceMappingURL=contributors.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/file.js

class File extends BaseModel {
}
//# sourceMappingURL=file.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/queued_process.js

class QueuedProcess extends BaseModel {
}
//# sourceMappingURL=queued_process.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/files.js



class Files extends BaseCollection {
    static rootElementName = "files";
    static prefixURI = "projects/{!:project_id}/files/{:id}";
    static elementClass = File;
    static secondaryElementNameSingular = "process";
    static secondaryElementClass = QueuedProcess;
    list(request_params) {
        return this.doList(request_params);
    }
    upload(project_id, upload) {
        return this.createPromise("POST", { project_id: project_id }, this.populateSecondaryObjectFromJsonRoot, this.handleReject, upload, "projects/{!:project_id}/files/upload");
    }
    download(project_id, download) {
        return this.createPromise("POST", { project_id: project_id }, this.returnBareJSON, this.handleReject, download, "projects/{!:project_id}/files/download");
    }
    delete(file_id, request_params) {
        return this.doDelete(file_id, request_params);
    }
}
//# sourceMappingURL=files.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/jwt.js

class jwt_Jwt extends BaseModel {
}
//# sourceMappingURL=jwt.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/jwt.js


class Jwt extends BaseCollection {
    static prefixURI = "projects/{!:project_id}/tokens";
    static elementClass = jwt_Jwt;
    create(project_id, body = { service: "ota" }) {
        const request_params = { project_id: project_id };
        return this.doCreate(body, request_params, this.populateObjectFromJson);
    }
}
//# sourceMappingURL=jwt.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/key.js

class Key extends BaseModel {
}
//# sourceMappingURL=key.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/keys.js


class Keys extends BaseCollection {
    static rootElementName = "keys";
    static rootElementNameSingular = "key";
    static prefixURI = "projects/{!:project_id}/keys/{:id}";
    static elementClass = Key;
    list(request_params) {
        return this.doList(request_params);
    }
    create(key_params, request_params) {
        return this.doCreate(key_params, request_params, this.populateArrayFromJsonBulk);
    }
    get(key_id, request_params) {
        return this.doGet(key_id, request_params);
    }
    update(key_id, key_params, request_params) {
        return this.doUpdate(key_id, key_params, request_params);
    }
    delete(key_id, request_params) {
        return this.doDelete(key_id, request_params);
    }
    bulk_update(key_params, request_params) {
        return this.createPromise("PUT", request_params, this.populateArrayFromJsonBulk, this.handleReject, key_params, "projects/{!:project_id}/keys");
    }
    bulk_delete(key_ids, request_params) {
        const keys = { keys: this.objToArray(key_ids) };
        return this.createPromise("DELETE", request_params, this.returnBareJSON, this.handleReject, keys, "projects/{!:project_id}/keys");
    }
}
//# sourceMappingURL=keys.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/language.js

class Language extends BaseModel {
}
//# sourceMappingURL=language.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/languages.js


class Languages extends BaseCollection {
    static rootElementName = "languages";
    static rootElementNameSingular = "language";
    static prefixURI = "projects/{!:project_id}/languages/{:id}";
    static elementClass = Language;
    system_languages(params = {}) {
        return this.createPromise("GET", params, this.populateArrayFromJson, this.handleReject, null, "system/languages");
    }
    list(request_params) {
        return this.doList(request_params);
    }
    create(raw_body, request_params) {
        const body = { languages: this.objToArray(raw_body) };
        return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
    }
    get(lang_id, request_params) {
        return this.doGet(lang_id, request_params);
    }
    update(lang_id, lang_params, request_params) {
        return this.doUpdate(lang_id, lang_params, request_params);
    }
    delete(lang_id, request_params) {
        return super.doDelete(lang_id, request_params);
    }
}
//# sourceMappingURL=languages.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/order.js

class Order extends BaseModel {
}
//# sourceMappingURL=order.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/orders.js


class Orders extends BaseCollection {
    static rootElementName = "orders";
    static prefixURI = "teams/{!:team_id}/orders/{:id}";
    static elementClass = Order;
    list(request_params) {
        return this.doList(request_params);
    }
    create(order_params, request_params) {
        return this.doCreate(order_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(order_id, request_params) {
        return this.doGet(order_id, request_params);
    }
}
//# sourceMappingURL=orders.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/payment_card.js

class PaymentCard extends BaseModel {
}
//# sourceMappingURL=payment_card.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/payment_cards.js


class PaymentCards extends BaseCollection {
    static rootElementName = "payment_cards";
    static rootElementNameSingular = "payment_card";
    static prefixURI = "payment_cards/{:id}";
    static elementClass = PaymentCard;
    list(request_params = {}) {
        return this.doList(request_params);
    }
    create(card_params) {
        return this.doCreate(card_params);
    }
    get(card_id) {
        return this.doGet(card_id);
    }
    delete(card_id) {
        return this.doDelete(card_id);
    }
}
//# sourceMappingURL=payment_cards.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/project.js

class Project extends BaseModel {
}
//# sourceMappingURL=project.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/projects.js


class Projects extends BaseCollection {
    static rootElementName = "projects";
    static prefixURI = "projects/{:id}";
    static elementClass = Project;
    list(request_params = {}) {
        return this.doList(request_params);
    }
    create(project_params) {
        return this.doCreate(project_params);
    }
    get(project_id) {
        return this.doGet(project_id);
    }
    update(project_id, project_params) {
        return this.doUpdate(project_id, project_params, {}, this.populateObjectFromJson);
    }
    delete(project_id) {
        return this.doDelete(project_id);
    }
    empty(project_id) {
        return this.createPromise("PUT", { project_id: project_id }, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/empty");
    }
}
//# sourceMappingURL=projects.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/queued_processes.js


class QueuedProcesses extends BaseCollection {
    static rootElementName = "processes";
    static rootElementNameSingular = "process";
    static prefixURI = "projects/{!:project_id}/processes/{:id}";
    static elementClass = QueuedProcess;
    list(request_params) {
        return this.doList(request_params);
    }
    get(process_id, request_params) {
        return this.doGet(process_id, request_params);
    }
}
//# sourceMappingURL=queued_processes.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/screenshot.js

class Screenshot extends BaseModel {
}
//# sourceMappingURL=screenshot.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/screenshots.js


class Screenshots extends BaseCollection {
    static rootElementName = "screenshots";
    static rootElementNameSingular = "screenshot";
    static prefixURI = "projects/{!:project_id}/screenshots/{:id}";
    static elementClass = Screenshot;
    list(request_params) {
        return this.doList(request_params);
    }
    create(raw_body, request_params) {
        const body = { screenshots: this.objToArray(raw_body) };
        return this.doCreate(body, request_params, this.populateArrayFromJsonBulk);
    }
    get(screnshot_id, request_params) {
        return this.doGet(screnshot_id, request_params);
    }
    update(screenshot_id, screenshot_params, request_params) {
        return this.doUpdate(screenshot_id, screenshot_params, request_params);
    }
    delete(screenshot_id, request_params) {
        return this.doDelete(screenshot_id, request_params);
    }
}
//# sourceMappingURL=screenshots.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/segment.js

class Segment extends BaseModel {
}
//# sourceMappingURL=segment.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/segments.js


class Segments extends BaseCollection {
    static rootElementName = "segments";
    static rootElementNameSingular = "segment";
    static prefixURI = "projects/{!:project_id}/keys/{!:key_id}/segments/{!:language_iso}/{:id}";
    static elementClass = Segment;
    list(request_params) {
        return this.doList(request_params);
    }
    get(segment_number, request_params) {
        return this.doGet(segment_number, request_params);
    }
    update(segment_number, segment_params, request_params) {
        return this.doUpdate(segment_number, segment_params, request_params);
    }
}
//# sourceMappingURL=segments.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/snapshot.js

class Snapshot extends BaseModel {
}
//# sourceMappingURL=snapshot.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/snapshots.js


class Snapshots extends BaseCollection {
    static rootElementName = "snapshots";
    static rootElementNameSingular = "snapshot";
    static prefixURI = "projects/{!:project_id}/snapshots/{:id}";
    static elementClass = Snapshot;
    list(request_params) {
        return this.doList(request_params);
    }
    create(snapshot_params, request_params) {
        return this.doCreate(snapshot_params, request_params, this.populateObjectFromJsonRoot);
    }
    restore(snapshot_id, request_params) {
        const params = {
            ...request_params,
            ...{ id: snapshot_id },
        };
        return this.createPromise("POST", params, this.returnBareJSON, this.handleReject, {});
    }
    delete(snapshot_id, request_params) {
        return this.doDelete(snapshot_id, request_params);
    }
}
//# sourceMappingURL=snapshots.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/task.js

class Task extends BaseModel {
}
//# sourceMappingURL=task.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/tasks.js


class Tasks extends BaseCollection {
    static rootElementName = "tasks";
    static rootElementNameSingular = "task";
    static prefixURI = "projects/{!:project_id}/tasks/{:id}";
    static elementClass = Task;
    list(request_params) {
        return this.doList(request_params);
    }
    create(task_params, request_params) {
        return this.doCreate(task_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(task_id, request_params) {
        return this.doGet(task_id, request_params);
    }
    update(task_id, task_params, request_params) {
        return this.doUpdate(task_id, task_params, request_params);
    }
    delete(task_id, request_params) {
        return this.doDelete(task_id, request_params);
    }
}
//# sourceMappingURL=tasks.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/team.js

class Team extends BaseModel {
}
//# sourceMappingURL=team.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/teams.js


class Teams extends BaseCollection {
    static rootElementName = "teams";
    static prefixURI = "teams";
    static elementClass = Team;
    list(request_params = {}) {
        return this.doList(request_params);
    }
}
//# sourceMappingURL=teams.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/team_user.js

class TeamUser extends BaseModel {
}
//# sourceMappingURL=team_user.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/team_users.js


class TeamUsers extends BaseCollection {
    static rootElementName = "team_users";
    static rootElementNameSingular = "team_user";
    static prefixURI = "teams/{!:team_id}/users/{:id}";
    static elementClass = TeamUser;
    list(request_params) {
        return this.doList(request_params);
    }
    get(team_user_id, request_params) {
        return this.doGet(team_user_id, request_params);
    }
    update(team_user_id, team_user_params, request_params) {
        return this.doUpdate(team_user_id, team_user_params, request_params);
    }
    delete(team_user_id, request_params) {
        return this.doDelete(team_user_id, request_params);
    }
}
//# sourceMappingURL=team_users.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/team_user_billing_details.js

class team_user_billing_details_TeamUserBillingDetails extends BaseModel {
}
//# sourceMappingURL=team_user_billing_details.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/team_user_billing_details.js


class TeamUserBillingDetails extends BaseCollection {
    static rootElementName = "";
    static prefixURI = "teams/{!:team_id}/billing_details";
    static elementClass = team_user_billing_details_TeamUserBillingDetails;
    get(team_id) {
        const params = { team_id: team_id };
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
    create(billing_details_params, request_params) {
        return this.doCreate(billing_details_params, request_params);
    }
    update(team_id, billing_details_params) {
        const params = { team_id: team_id };
        return this.createPromise("PUT", params, this.populateObjectFromJson, this.handleReject, billing_details_params);
    }
}
//# sourceMappingURL=team_user_billing_details.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/translation.js

class Translation extends BaseModel {
}
//# sourceMappingURL=translation.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/translations.js


class Translations extends BaseCollection {
    static rootElementName = "translations";
    static rootElementNameSingular = "translation";
    static prefixURI = "projects/{!:project_id}/translations/{:id}";
    static elementClass = Translation;
    list(request_params) {
        return this.doList(request_params);
    }
    get(translation_id, request_params) {
        return this.doGet(translation_id, request_params);
    }
    update(translation_id, translation_params, request_params) {
        return this.doUpdate(translation_id, translation_params, request_params);
    }
}
//# sourceMappingURL=translations.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/translation_provider.js

class TranslationProvider extends BaseModel {
}
//# sourceMappingURL=translation_provider.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/translation_providers.js


class TranslationProviders extends BaseCollection {
    static rootElementName = "translation_providers";
    static prefixURI = "teams/{!:team_id}/translation_providers/{:id}";
    static elementClass = TranslationProvider;
    list(request_params) {
        return this.doList(request_params);
    }
    get(provider_id, request_params) {
        return this.doGet(provider_id, request_params);
    }
}
//# sourceMappingURL=translation_providers.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/translation_status.js

class TranslationStatus extends BaseModel {
}
//# sourceMappingURL=translation_status.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/translation_statuses.js


class TranslationStatuses extends BaseCollection {
    static rootElementName = "custom_translation_statuses";
    static prefixURI = "projects/{!:project_id}/custom_translation_statuses/{:id}";
    static elementClass = TranslationStatus;
    static rootElementNameSingular = "custom_translation_status";
    list(request_params) {
        return this.doList(request_params);
    }
    create(translation_status_params, request_params) {
        return this.doCreate(translation_status_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(translation_status_id, request_params) {
        return this.doGet(translation_status_id, request_params);
    }
    update(translation_status_id, translation_status_params, request_params) {
        return this.doUpdate(translation_status_id, translation_status_params, request_params);
    }
    delete(translation_status_id, request_params) {
        return this.doDelete(translation_status_id, request_params);
    }
    available_colors(request_params) {
        return this.createPromise("GET", request_params, this.returnBareJSON, this.handleReject, {}, "projects/{!:project_id}/custom_translation_statuses/colors");
    }
}
//# sourceMappingURL=translation_statuses.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/user_group.js

class UserGroup extends BaseModel {
}
//# sourceMappingURL=user_group.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/user_groups.js


class UserGroups extends BaseCollection {
    static rootElementName = "user_groups";
    static prefixURI = "teams/{!:team_id}/groups/{:id}";
    static elementClass = UserGroup;
    list(request_params) {
        return this.doList(request_params);
    }
    create(user_group_params, request_params) {
        return this.doCreate(user_group_params, request_params, this.populateGroupFromJsonRoot);
    }
    get(user_group_id, request_params) {
        return this.doGet(user_group_id, request_params);
    }
    update(user_group_id, user_group_params, request_params) {
        return this.doUpdate(user_group_id, user_group_params, request_params, this.populateGroupFromJsonRoot);
    }
    delete(user_group_id, request_params) {
        return this.doDelete(user_group_id, request_params);
    }
    add_members_to_group(team_id, group_id, user_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: user_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/add");
    }
    remove_members_from_group(team_id, group_id, user_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { users: user_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/members/remove");
    }
    add_projects_to_group(team_id, group_id, project_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: project_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/add");
    }
    remove_projects_from_group(team_id, group_id, project_ids) {
        const params = {
            team_id: team_id,
            group_id: group_id,
        };
        const body = { projects: project_ids };
        return this.createPromise("PUT", params, this.populateGroupFromJsonRoot, this.handleReject, body, "teams/{!:team_id}/groups/{!:group_id}/projects/remove");
    }
    populateGroupFromJsonRoot(json, headers) {
        const formatted_json = json["group"];
        return this.populateObjectFromJson(formatted_json, headers);
    }
}
//# sourceMappingURL=user_groups.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/webhook.js

class Webhook extends BaseModel {
}
//# sourceMappingURL=webhook.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/collections/webhooks.js


class Webhooks extends BaseCollection {
    static rootElementName = "webhooks";
    static rootElementNameSingular = "webhook";
    static prefixURI = "projects/{!:project_id}/webhooks/{:id}";
    static elementClass = Webhook;
    list(request_params) {
        return this.doList(request_params);
    }
    create(webhook_params, request_params) {
        return this.doCreate(webhook_params, request_params, this.populateObjectFromJsonRoot);
    }
    get(webhook_id, request_params) {
        return this.doGet(webhook_id, request_params);
    }
    update(webhook_id, webhook_params, request_params) {
        return this.doUpdate(webhook_id, webhook_params, request_params);
    }
    delete(webhook_id, request_params) {
        return this.doDelete(webhook_id, request_params);
    }
    regenerate_secret(webhook_id, request_params) {
        const params = {
            ...request_params,
            ...{ id: webhook_id },
        };
        return this.createPromise("PATCH", params, this.returnBareJSON, this.handleReject, null, "projects/{!:project_id}/webhooks/{:id}/secret/regenerate");
    }
}
//# sourceMappingURL=webhooks.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/lokalise_api.js
























class LokaliseApi extends BaseClient {
    constructor(params) {
        super(params);
        this.clientData.version = params.version ?? "api2";
    }
    branches() {
        return new Branches(this.clientData);
    }
    comments() {
        return new Comments(this.clientData);
    }
    contributors() {
        return new Contributors(this.clientData);
    }
    files() {
        return new Files(this.clientData);
    }
    jwt() {
        return new Jwt(this.clientData);
    }
    keys() {
        return new Keys(this.clientData);
    }
    languages() {
        return new Languages(this.clientData);
    }
    orders() {
        return new Orders(this.clientData);
    }
    paymentCards() {
        return new PaymentCards(this.clientData);
    }
    projects() {
        return new Projects(this.clientData);
    }
    queuedProcesses() {
        return new QueuedProcesses(this.clientData);
    }
    screenshots() {
        return new Screenshots(this.clientData);
    }
    segments() {
        return new Segments(this.clientData);
    }
    snapshots() {
        return new Snapshots(this.clientData);
    }
    tasks() {
        return new Tasks(this.clientData);
    }
    teams() {
        return new Teams(this.clientData);
    }
    teamUsers() {
        return new TeamUsers(this.clientData);
    }
    teamUserBillingDetails() {
        return new TeamUserBillingDetails(this.clientData);
    }
    translations() {
        return new Translations(this.clientData);
    }
    translationProviders() {
        return new TranslationProviders(this.clientData);
    }
    translationStatuses() {
        return new TranslationStatuses(this.clientData);
    }
    userGroups() {
        return new UserGroups(this.clientData);
    }
    webhooks() {
        return new Webhooks(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/lokalise_api_oauth.js

class LokaliseApiOAuth extends LokaliseApi {
    constructor(params) {
        super(params);
        const tokenType = params["tokenType"];
        this.clientData.tokenType = tokenType ?? "Bearer";
        this.clientData.authHeader = "Authorization";
    }
}
//# sourceMappingURL=lokalise_api_oauth.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_collection.js

class OtaCollection extends BaseCollection {
    populateApiErrorFromJson(json) {
        return json;
    }
    doDelete(id, req_params) {
        const params = {
            ...req_params,
            id,
        };
        return this.createPromise("DELETE", params, this.returnJSONFromData, this.handleReject, null);
    }
    returnJSONFromData(json) {
        return json["data"];
    }
}
//# sourceMappingURL=ota_collection.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/ota_sdk_token.js

class OtaSdkToken extends BaseModel {
}
//# sourceMappingURL=ota_sdk_token.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_sdk_tokens.js


class OtaSdkTokens extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/tokens/{:id}";
    static elementClass = OtaSdkToken;
    list(request_params) {
        return this.doList(request_params);
    }
    create(request_params) {
        return this.doCreate(null, request_params, this.populateObjectFromJsonRoot);
    }
    delete(tokenId, request_params) {
        return this.doDelete(tokenId, request_params);
    }
}
//# sourceMappingURL=ota_sdk_tokens.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/ota_bundle.js

class OtaBundle extends BaseModel {
}
//# sourceMappingURL=ota_bundle.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_bundle_management.js


class OtaBundleManagement extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundles/{:id}";
    static elementClass = OtaBundle;
    list(request_params) {
        return this.doList(request_params);
    }
    get(bundleId, requestParams) {
        return this.doGet(bundleId, requestParams);
    }
    update(bundleId, bundleParams, requestParams) {
        return this.doUpdate(bundleId, bundleParams, requestParams, this.populateObjectFromJsonRoot, "PATCH");
    }
    delete(bundleId, requestParams) {
        return this.doDelete(bundleId, requestParams);
    }
}
//# sourceMappingURL=ota_bundle_management.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_bundle_publishing.js

class OtaBundlePublishing extends OtaCollection {
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/frameworks/{!:framework}/{!:action}";
    publish(bundleId, request_params) {
        const params = {
            ...request_params,
            ...{ action: "publish" },
        };
        return this.createPromise("POST", params, null, this.handleReject, {
            bundleId,
        });
    }
    stage(bundleId, request_params) {
        const params = {
            ...request_params,
            ...{ action: "stage" },
        };
        return this.createPromise("POST", params, null, this.handleReject, {
            bundleId,
        });
    }
}
//# sourceMappingURL=ota_bundle_publishing.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/ota_statistics.js

class OtaStatistics extends BaseModel {
}
//# sourceMappingURL=ota_statistics.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_usage_statistics.js


class OtaUsageStatistics extends OtaCollection {
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/stats";
    static elementClass = OtaStatistics;
    get(bundle_params, request_params) {
        const params = {
            ...request_params,
            ...bundle_params,
        };
        return this.createPromise("GET", params, this.populateObjectFromJson, this.handleReject, null);
    }
}
//# sourceMappingURL=ota_usage_statistics.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/ota_freeze_period.js

class OtaFreezePeriod extends BaseModel {
}
//# sourceMappingURL=ota_freeze_period.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_freeze_periods.js


class OtaFreezePeriods extends OtaCollection {
    static rootElementName = "data";
    static rootElementNameSingular = "data";
    static prefixURI = "teams/{!:teamId}/projects/{!:lokaliseProjectId}/bundle-freezes/{:id}";
    static elementClass = OtaFreezePeriod;
    list(requestParams) {
        return this.doList(requestParams);
    }
    create(freezeParams, requestParams) {
        return this.doCreate(freezeParams, requestParams, this.populateObjectFromJsonRoot);
    }
    update(freezeId, freezeParams, requestParams) {
        return this.doUpdate(freezeId, freezeParams, requestParams);
    }
    delete(freezeId, requestParams) {
        return this.doDelete(freezeId, requestParams);
    }
}
//# sourceMappingURL=ota_freeze_periods.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/lokalise_api_ota.js






class LokaliseApiOta extends BaseClient {
    constructor(params) {
        super(params);
        this.clientData.tokenType = params["tokenType"] ?? "Bearer";
        this.clientData.authHeader = "Authorization";
        this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
        this.clientData.version = params.version ?? "v3";
    }
    otaBundleManagement() {
        return new OtaBundleManagement(this.clientData);
    }
    otaBundlePublishing() {
        return new OtaBundlePublishing(this.clientData);
    }
    otaUsageStatistics() {
        return new OtaUsageStatistics(this.clientData);
    }
    otaFreezePeriods() {
        return new OtaFreezePeriods(this.clientData);
    }
    otaSdkTokens() {
        return new OtaSdkTokens(this.clientData);
    }
}
//# sourceMappingURL=lokalise_api_ota.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/models/ota_bundle_archive.js

class OtaBundleArchive extends BaseModel {
}
//# sourceMappingURL=ota_bundle_archive.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/ota_collections/ota_bundles.js


class OtaBundles extends OtaCollection {
    static rootElementNameSingular = "data";
    static prefixURI = "lokalise/projects/{!:lokaliseProjectId}/frameworks/{!:framework}";
    static elementClass = OtaBundleArchive;
    get(bundle_params, request_params) {
        const params = {
            ...request_params,
            ...bundle_params,
        };
        return this.createPromise("GET", params, this.populateObjectFromJsonRoot, this.handleReject, null);
    }
}
//# sourceMappingURL=ota_bundles.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/lokalise/lokalise_ota_bundles.js


class LokaliseOtaBundles extends BaseClient {
    constructor(params) {
        super(params);
        this.clientData.authHeader = "x-ota-api-token";
        this.clientData.host = this.clientData.host ?? "https://ota.lokalise.com";
        this.clientData.version = params.version ?? "v3";
    }
    otaBundles() {
        return new OtaBundles(this.clientData);
    }
}
//# sourceMappingURL=lokalise_ota_bundles.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/oauth2/auth_request.js

class AuthRequest {
    static async createPromise(uri, method, body, clientData) {
        const prefixUrl = clientData.host;
        uri = `/${clientData.version}/${uri}`;
        const options = {
            method: method,
            headers: {
                Accept: "application/json",
                "User-Agent": `node-lokalise-api/${await LokalisePkg.getVersion()}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const target = new URL(uri, prefixUrl);
        try {
            const response = await fetch(target, options);
            const responseJSON = await response.json();
            if (response.ok) {
                return Promise.resolve({
                    json: responseJSON,
                    headers: response.headers,
                });
            }
            return Promise.reject({
                ...{ code: response.status },
                ...responseJSON,
            });
        }
        catch (err) {
            return Promise.reject({ message: err.message });
        }
    }
}
//# sourceMappingURL=auth_request.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/oauth2/lokalise_auth.js

class LokaliseAuth {
    authData = {
        client_id: "",
        client_secret: "",
    };
    /*
     * Instantiate LokaliseAuth to work with OAuth 2 tokens
     * @param clientId      string, mandatory
     * @param clientSecret  string, mandatory
     * @returns             LokaliseAuth object to work with.
     */
    constructor(clientId, clientSecret, host, version) {
        if (clientId == null ||
            clientId.length == 0 ||
            clientSecret == null ||
            clientSecret.length == 0) {
            throw new Error("Error: Instantiation failed: Please pass client id and client secret");
        }
        this.authData.client_id = clientId;
        this.authData.client_secret = clientSecret;
        this.authData.host = host ?? "https://app.lokalise.com";
        this.authData.version = version ?? "oauth2";
    }
    auth(scope, redirect_uri, state) {
        if (scope instanceof Array) {
            scope = scope.join(" ");
        }
        const params = {
            client_id: this.authData.client_id,
            scope: scope,
        };
        if (state) {
            params["state"] = state;
        }
        if (redirect_uri) {
            params["redirect_uri"] = redirect_uri;
        }
        return this.buildUrl(params);
    }
    async token(code) {
        const params = {
            ...this.base_params(),
            ...{
                code: code,
                grant_type: "authorization_code",
            },
        };
        return await this.doRequest(params);
    }
    async refresh(refresh_token) {
        const params = {
            ...this.base_params(),
            ...{
                refresh_token: refresh_token,
                grant_type: "refresh_token",
            },
        };
        return await this.doRequest(params);
    }
    async doRequest(params) {
        try {
            const data = await AuthRequest.createPromise("token", "POST", params, this.authData);
            return Promise.resolve(data["json"]);
        }
        catch (err) {
            return Promise.reject(this.handleReject(err));
        }
    }
    buildUrl(params) {
        const url = new URL("auth", this.authData.host);
        const sParams = new URLSearchParams(params);
        url.search = sParams.toString();
        return url.toString();
    }
    base_params() {
        return {
            client_id: this.authData.client_id,
            client_secret: this.authData.client_secret,
        };
    }
    handleReject(data) {
        return data;
    }
}
//# sourceMappingURL=lokalise_auth.js.map
;// CONCATENATED MODULE: ./node_modules/@lokalise/node-api/dist/main.js








//# sourceMappingURL=main.js.map

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
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
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/**
 * The entrypoint for the action.
 */
const { run } = __nccwpck_require__(713)

run()

})();

module.exports = __webpack_exports__;
/******/ })()
;