import * as core from '@actions/core';
import * as github from '@actions/github';
import { updateTag, validateIfReleaseIsPublished } from './api-utils';
import { validateSemverVersionFromTag, getMajorTagFromFullTag } from './version-utils';

async function run(): Promise<void> {
    try {
        const token = core.getInput('token');
        const octokitClient = github.getOctokit(token);
        const sourceTagName = core.getInput('tag-name');

        validateSemverVersionFromTag(sourceTagName);

        await validateIfReleaseIsPublished(sourceTagName, octokitClient);

        const majorTag = getMajorTagFromFullTag(sourceTagName);
        await updateTag(sourceTagName, majorTag, octokitClient);

        core.setOutput('major-tag', majorTag);
        core.info(`The '${majorTag}' major tag now points to the '${sourceTagName}' tag`);
    } catch (error) {
        core.setFailed(error.message);
    }
};

run();