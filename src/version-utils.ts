// import * as core from "@actions/core";
import semverParse from "semver/functions/parse";
import SemVer from "semver/classes/semver";

function isStableSemverVersion(version: SemVer) {
    return version.prerelease.length === 0 && version.build.length === 0
}

export function getMajorTagFromFullTag(fullTag: string) {
    return fullTag.split(".")[0];
}

export function validateSemverVersionFromTag(tag: string) {
    const semverVersion = semverParse(tag);
    if (!semverVersion) {
        throw new Error(
            `The '${tag}' doesn't satisfy semantic versioning specification`
        );
    }

    if (!isStableSemverVersion(semverVersion)) {
        throw new Error(
            "It is not allowed to specify pre-release version to update the major tag"
        );
    }
}
