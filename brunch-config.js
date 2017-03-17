module.exports = {
  files: {
    javascripts: {
      joinTo: {
        "vendor.js": /^(?!app)/,
        "app.js": /^app/
      }
    },
    stylesheets: {
      joinTo: {
        "vendor.css": /^(?!app)/,
        "app.css": /^app/
      }
    }
  },

  plugins: {
    babel: {
      presets: ["es2015", "react"]
    },
    sass: {
      options: {
        includePaths: [
          "node_modules/bootstrap-sass/assets/stylesheets"
        ], // tell sass-brunch where to look for files to @import
        precision: 8 // minimum precision required by bootstrap-sass
      }
    },
    copycat: {
      // copy node_modules/bootstrap-sass/assets/fonts/bootstrap/* to priv/static/fonts/
      "fonts/bootstrap": ["node_modules/bootstrap-sass/assets/fonts/bootstrap"]
    }
  }
};
