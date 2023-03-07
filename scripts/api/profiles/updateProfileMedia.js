import { getUserName } from '../../utils.js';
import { put } from '../../client.js';

/**
 * Update the profile media
 * @param {string} name - Name of profile to update
 * @param {updateProfileData} requestBody - Data to update profile with
 * @returns {Promise<void>} - No return value, but throws error if something goes wrong
 */
async function updateProfileMedia(requestBody) {
    const name = getUserName();
    await put(`/profiles/${name}/media`, requestBody);
}

export { updateProfileMedia };
