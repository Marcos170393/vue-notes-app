import { openDropBoxUrl, openGitUrl, openLinkedInUrl } from "../renderer";

export const sendGitHubBrowser = () => {
    openGitUrl();
}
export const sendLinkdeInBrowser = () => {
    openLinkedInUrl();
}

export const sendDropBoxBrowser = () => {
    openDropBoxUrl();
}

