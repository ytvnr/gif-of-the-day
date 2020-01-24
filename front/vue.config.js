module.exports = {
  "pages": {
    "index": {
      "entry": "src/main.js",
      "template": "public/index.html",
      "filename": "index.html"
    },
    "extension": {
      "entry": "public/extension/index.js",
      "template": "public/extension/index.html",
      "filename": "extension/index.html"
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}