const core = require('@actions/core')
const LokaliseApi = require('@lokalise/node-api')

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
