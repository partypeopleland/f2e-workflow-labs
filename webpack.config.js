module.exports = {
  entry: {
    bundle: './app/app.module.js'
  },
  output: {
    filename: './app/[name].js'
  },
  module:{
    loaders: [
      { test: /\.css$/, loader: "style!css"}
      //,
      //{ test: /\.jpg$/, loader: "url?limit=8000"},
      //{ test: /\.jpg$/, loader: "file?name=img/google-[hash:6].[ext]?[hash]"} 
      ]
  }
};
