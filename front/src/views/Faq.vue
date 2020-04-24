<template>
    <v-expansion-panels focusable>
        <v-expansion-panel>
            <v-expansion-panel-header>How to instal the extension</v-expansion-panel-header>
            <v-expansion-panel-content>
                <ol>
                    <li>
                        Download and unzip the last version of extension here:
                        <a
                            href="https://github.com/ytvnr/gif-of-the-day/raw/master/extension/extension_1.0.0.release.zip"
                            target="_blank"
                            rel="noopener noreferrer"
                        >GOD last release 🗂</a>
                    </li>
                    <li>Open the Extension Management page by navigating to a chrome://extensions.</li>
                    <ul>
                        <li>The Extension Management page can also be opened by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.</li>
                    </ul>
                    <li>Enable Developer Mode by clicking the toggle switch next to Developer mode. 👨🏻‍💻</li>
                    <li>Click the LOAD UNPACKED button and select the extension directory.</li>
                </ol>

                <img
                    class="preview"
                    src="https://developer.chrome.com/static/images/get_started/load_extension.png"
                    alt="Chrome load extension preview"
                />

                <div class="strong">Ta-da! 🎉 The extension has been successfully installed.</div>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>


<style scoped lang="scss">
li {
    padding: 10px 0px;
}

.preview {
    margin: 25px auto;
    display: block;
    max-width: 100%;
}

.strong {
    font-weight: bold;
}
</style>
